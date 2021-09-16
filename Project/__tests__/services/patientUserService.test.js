import bcrypt from 'bcrypt';
import SequelizeMock from 'sequelize-mock';
import UserRepository from '../../src/api/users/repositories/UserRepository';
import patientUserService from '../../src/api/users/services/UserService.js';
import { NOT_FOUND_MESSAGE } from '../../src/constants.js';

patientUserService.repository = new UserRepository(new SequelizeMock())

const repository = patientUserService.repository;

describe('user service have to', () => {

  test('create new user', async () => {
    repository.addNewUser = jest.fn((user) => user);

    const res = await patientUserService.createNewUser({ password: '1234', name: 'dima', email: 'email' });

    expect(res.name).toBe('dima');
    expect(res.email).toBe('email');
    expect(res.password).not.toBe('1234');
    expect(repository.addNewUser).toBeCalled();
  });

  test('fail with create new user', async () => {
    repository.addNewUser = jest.fn((user) => { throw new Error('error') });

    const res = await patientUserService.createNewUser({ password: '1234', name: 'dima', email: 'email' });

    expect(res).toBeInstanceOf(Error);
    expect(repository.addNewUser).toBeCalled();
    expect(res.message).toBe('error');
  });

  test('get user', async () => {
    repository.getUser = jest.fn((userID) => ({ password: '1234', userID }));

    const res = await patientUserService.getUser('1');

    expect(repository.getUser).toBeCalled();
    expect(res).toEqual({ password: '1234', userID: '1' });
  });

  test('not found user', async () => {
    repository.getUser = jest.fn((userID) => null);

    const res = await patientUserService.getUser('1');

    expect(repository.getUser).toBeCalled();
    expect(res).toBeInstanceOf(Error);
    expect(res.message).toBe(NOT_FOUND_MESSAGE);
  });

  test('match a password', async () => {
    repository.getUser = jest.fn((userID) => ({userID, password: bcrypt.hashSync('1234', 10)}));

    const res = await patientUserService.isPasswordMatches('1', '1234');

    expect(res).toBe(true);
  });

  test('not match a password', async () => {
    repository.getUser = jest.fn((userID) => ({userID, password: bcrypt.hashSync('12345', 10)}));

    const res = await patientUserService.isPasswordMatches('1', '1234');

    expect(res).toBe(false);
  })
});
