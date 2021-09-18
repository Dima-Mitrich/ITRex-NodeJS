import doctorController from '../../src/api/doktor/controller/DoctorController.js';
import { STATUSES, EMAIL_IS_EXIST } from '../../src/constants.js';

const {doctorStorageService, specStorageService} = doctorController

const drData = {
  name: 'dimoz',
  email: 'dimoz@mail.ru',
  password: '1111',
  gender: 'man',
  birthday: '1993-02-19',
  education: 'BBSY',
  experience: '3,5 year ',
  specialization: ['otolaryngologist', 'obstetrician'], }

describe('doctor controller have to', () => {

  test('add doctor', async () => {

    doctorStorageService.addDoctor = jest.fn(() => (drData));
    const res = await doctorController.addDoctor(drData);

    expect(doctorStorageService.addDoctor).toBeCalled();
    expect(res.status).toBe(STATUSES.Created);
    expect(res.value).toEqual(drData);
  });


  test('add doctor(db fall)', async () => {
    doctorStorageService.addDoctor = jest.fn(() => (new Error('not found')));
    const res = await doctorController.addDoctor(drData);

    expect(doctorStorageService.addDoctor).toBeCalled();
    expect(res.status).toBe(STATUSES.NotFound);
    expect(res.value.message).toBe('not found');
  });

  test('add specialization', async () => {

    doctorStorageService.addSpec = jest.fn(() => ({specialization: 'dentist'}));
    const res = await doctorController.addSpec({specialization: 'dentist'});

    expect(doctorStorageService.addSpec).toBeCalled();
    expect(res.status).toBe(STATUSES.Created);
    expect(res.value).toEqual({specialization: 'dentist'});
  });

  test('add specialization(db fall)', async () => {

    doctorStorageService.addSpec = jest.fn(() => ((new Error('not found'))));
    const res = await doctorController.addSpec({specialization: 'dentist'});

    expect(doctorStorageService.addSpec).toBeCalled();
    expect(res.status).toBe(STATUSES.NotFound);
    expect(res.value.message).toBe('not found');
  });

  test('get specializations list ', async () => {

    specStorageService.getSpecList = jest.fn(() => (['sss','aaa','dentist']));
    const res = await doctorController.getSpecList();

    expect(specStorageService.getSpecList).toBeCalled();
    expect(res.status).toBe(STATUSES.OK);
    expect(res.value).toEqual(['sss','aaa','dentist']);
  });

  test('get specializations list(db fall) ', async () => {

    specStorageService.getSpecList = jest.fn(() => ((new Error('not found'))));
    const res = await doctorController.getSpecList();

    expect(specStorageService.getSpecList).toBeCalled();
    expect(res.status).toBe(STATUSES.NotFound);
    expect(res.value.message).toBe('not found');
  });

  test('get specializations by user id', async () => {

    specStorageService.getSpecByUserId = jest.fn(() => (['sss','aaa','dentist']));
    const res = await doctorController.getSpecByUserId('2a2');

    expect(specStorageService.getSpecByUserId).toBeCalled();
    expect(res.status).toBe(STATUSES.OK);
    expect(res.value).toEqual(['sss','aaa','dentist']);
  });

  test('get specializations by user id(db fall)', async () => {

    specStorageService.getSpecByUserId = jest.fn(() => ((new Error('not found'))));
    const res = await doctorController.getSpecByUserId('2a2');

    expect(specStorageService.getSpecByUserId).toBeCalled();
    expect(res.status).toBe(STATUSES.NotFound);
    expect(res.value.message).toBe('not found');
  });


  test('get doctor', async () => {
    doctorStorageService.getDoctor = jest.fn(() => ({ name: 'dimoz' }));
    const res = await doctorController.getDoctor({ id: 3 });

    expect(doctorStorageService.getDoctor).toBeCalled();
    expect(res.status).toBe(STATUSES.OK);
    expect(res.value.name).toBe('dimoz');
  });


  test('failed with take patient', async () => {
    doctorStorageService.getDoctor = jest.fn((name, id) => new Error('not found'));

    const res = await doctorController.getDoctor({ name: 'dima', id: null });

    expect(doctorStorageService.getDoctor).toBeCalled();
    expect(res.status).toBe(STATUSES.NotFound);
    expect(res.value).toBeInstanceOf(Error);
    expect(res.value.message).toBe('not found');
  });


  test('return is exist true value', async () => {
    doctorController.getDoctor = jest.fn((email) => ({ status: 200, value: { id: 1 } }));

    const res = await doctorController.isExist({ email: 'email', name: 'dima' });

    expect(res).toBeInstanceOf(Error);
    expect(res.message).toBe(EMAIL_IS_EXIST);
    expect(doctorController.getDoctor).toBeCalled();
  });

  test('return is exist false value', async () => {
    doctorController.getDoctor = jest.fn((email) => ({ status: 404, value: 'not found' }));

    const res = await doctorController.isExist({ email: 'email', name: 'dima' });

    expect(res).toBe(false);
    expect(doctorController.getDoctor).toBeCalled();
  });

});
