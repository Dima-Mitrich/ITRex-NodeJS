import SequelizeMock from 'sequelize-mock';
import doctorStorageService from '../../src/api/doktor/services/DoctorStorageServise.js';
import MySQLDoctor from '../../src/api/doktor/repositories/MySQLDoctor.js';
import MySQLSpecialization from '../../src/api/doktor/repositories/MySQLSpecialization.js';
import MySQLSpecDoctor from '../../src/api/doktor/repositories/MySQLSpecDoctor.js';



doctorStorageService.doctorRepository = new MySQLDoctor(
  new SequelizeMock(),
  new SequelizeMock(),
  new SequelizeMock(),
  new SequelizeMock());
doctorStorageService.specializationRepository = new MySQLSpecialization(new SequelizeMock());
doctorStorageService.specDoctorRepository = new MySQLSpecDoctor(new SequelizeMock());

const doctorRepository = doctorStorageService.doctorRepository;
const specializationRepository = doctorStorageService.specializationRepository;
const specDoctorRepository = doctorStorageService.specDoctorRepository

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
    doctorRepository.push = jest.fn(() =>({dataValues:{id:'111'}}));
    specializationRepository.getSpecByName = jest.fn(() =>({dataValues: {id: '222'}}));


    const res = await doctorStorageService.addDoctor(drData);


    expect(res).toEqual(drData);
    expect(specializationRepository.getSpecByName).toBeCalled();
    // expect(res.email).toBe('email');
    // expect(res.password).not.toBe('1234');
    // expect(repository.addNewUser).toBeCalled();
  });

  test('add specialization', async () => {
    specializationRepository.addSpec = jest.fn(() =>('aaa'));


    const res = await doctorStorageService.addSpec('aaa');

    expect(res).toEqual('aaa');
    expect(specializationRepository.addSpec).toBeCalled();
  });

  test('get specialization', async () => {
    specializationRepository.getAllSpec = jest.fn(() =>('aaa'));

    const res = await doctorStorageService.getSpecializations();
    expect(res).toEqual('aaa');
    expect(specializationRepository.getAllSpec).toBeCalled();
  });

  test('get doctor by id', async () => {
    doctorRepository.getById = jest.fn(() =>('aaa'));

    const res = await doctorStorageService.getDoctor({ name: null, id: 4 });
    expect(res).toEqual('aaa');
    expect(doctorRepository.getById).toBeCalled();
  });

  test('get specialization by id', async () => {
    doctorRepository.getSpecByUserId = jest.fn(() =>({specializations: ['aaa','bbb']}));

    const res = await doctorStorageService.getSpecByUserId('222');
    expect(res).toEqual('aaa');
    expect(doctorRepository.getById).toBeCalled();
  });





});
