import doctorStorageService from '../services/DoctorStorageServise.js';
import {NOT_FOUND_MESSAGE} from '../../../constants';

const doctorRepository = doctorStorageService.doctorRepository;


const drData = {
  id:'222',
  name: 'dimoz',
  email: 'dimoz@mail.ru',
  password: '1111',
  gender: 'man',
  birthday: '1993-02-19',
  education: 'BBSY',
  experience: '3,5 year ',
  user_id: '222',
  specialization: ['otolaryngologist', 'obstetrician'], }

describe('doctor service have to', () => {

  test('add doctor', async () => {
    doctorRepository.push = jest.fn(( ) =>({dataValues:{id:'111'}}));
    const res = await doctorStorageService.addDoctor(drData);

    expect(doctorRepository.push).toBeCalled();
    expect(res).toEqual({dataValues:{id:'111'}});
  });

  test('get doctor by id', async () => {
    doctorRepository.getById = jest.fn(( ) =>('aaa'));

    const res = await doctorStorageService.getDoctor( null,  4 ,null, null);
    expect(res).toEqual('aaa');
    expect(doctorRepository.getById).toBeCalled();
  });

  test('get doctor by name', async () => {
    doctorRepository.getByName = jest.fn(( ) =>('aaa'));

    const res = await doctorStorageService.getDoctor( 'www',  null,null, null);
    expect(res).toEqual('aaa');
    expect(doctorRepository.getByName).toBeCalled();
  });

  test('get doctor by email', async () => {
    doctorRepository.getByEmail = jest.fn(( ) =>('aaa'));

    const res = await doctorStorageService.getDoctor( null,  null,'a@a', null);
    expect(res).toEqual('aaa');
    expect(doctorRepository.getByEmail).toBeCalled();
  });

  test('get doctor by userId', async () => {
    doctorRepository.getByUserId = jest.fn(( ) =>('aaa'));

    const res = await doctorStorageService.getDoctor( null,  null,null, '222');
    expect(res).toEqual('aaa');
    expect(doctorRepository.getByUserId).toBeCalled();
  });


  test('get doctor result false', async () => {
    doctorRepository.getByUserId = jest.fn(( ) =>false);

    const res = await doctorStorageService.getDoctor( null,  null,null, '222');

    expect(res).toBeInstanceOf(Error)
    expect(doctorRepository.getByUserId).toBeCalled();
    expect(res.message).toBe(NOT_FOUND_MESSAGE);
  });
});
