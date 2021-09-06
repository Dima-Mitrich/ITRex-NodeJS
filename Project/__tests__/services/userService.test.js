import bcrypt from 'bcrypt';
import userService from '../../src/api/auth/services/UserService.js';
import { NOT_FOUND_MESSAGE } from '../../src/constants.js';

const userRepository = userService.repository;

describe('user service have to', () => {

    test('create new user', async () => {
        userRepository.addNewUser = jest.fn((user) => user);

        const res = await userService.createNewUser({ password: '1234', name: 'dima', email: 'email' });

        expect(res.name).toBe('dima');
        expect(res.email).toBe('email');
        expect(res.password).not.toBe('1234');
        expect(userRepository.addNewUser).toBeCalled();
    });

    test('fail with create new user', async () => {
        userRepository.addNewUser = jest.fn((user) => { throw new Error('error') });

        const res = await userService.createNewUser({ password: '1234', name: 'dima', email: 'email' });

        expect(res).toBeInstanceOf(Error);
        expect(userRepository.addNewUser).toBeCalled();
        expect(res.message).toBe('error');
    });

    test('get user', async () => {
        userRepository.getUser = jest.fn((userID) => ({ password: '1234', userID }));

        const res = await userService.getUser('1');

        expect(userRepository.getUser).toBeCalled();
        expect(res).toEqual({ password: '1234', userID: '1' });
    });

    test('not found user', async () => {
        userRepository.getUser = jest.fn((userID) => null);

        const res = await userService.getUser('1');

        expect(userRepository.getUser).toBeCalled();
        expect(res).toBeInstanceOf(Error);
        expect(res.message).toBe(NOT_FOUND_MESSAGE);
    });

    test('match a password', async () => {
        userRepository.getUser = jest.fn((userID) => ({userID, password: bcrypt.hashSync('1234', 10)}));

        const res = await userService.isPasswordMatches('1', '1234');
    
        expect(res).toBe(true);
    });

    test('not match a password', async () => {
        userRepository.getUser = jest.fn((userID) => ({userID, password: bcrypt.hashSync('12345', 10)}));

        const res = await userService.isPasswordMatches('1', '1234');
    
        expect(res).toBe(false);
    })
});
