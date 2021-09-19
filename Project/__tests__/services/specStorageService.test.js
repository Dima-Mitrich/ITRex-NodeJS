import specStorageService from '../../src/api/specialization/services/SpecStorageService.js';

const specializationRepository = specStorageService.specializationRepository;
const spec = 'dentist';

describe('doctor service have to', () => {

  test('add spec', async () => {
    specializationRepository.addSpec = jest.fn(() =>({dataValues:{spec:'111'}}));
    const res = await specStorageService.addSpec(spec);

    expect(specializationRepository.addSpec).toBeCalled();
    expect(res).toEqual({dataValues:{spec:'111'}});
  });

  test('get specializations', async () => {
    specializationRepository.getAllSpec = jest.fn(() =>(['dentist', 'ppp']));
    const res = await specStorageService.getSpecializations();

    expect(specializationRepository.getAllSpec).toBeCalled();
    expect(res).toEqual(['dentist', 'ppp']);
  });

  test('get specializations by user id', async () => {
    specializationRepository.getSpecByUserId = jest.fn(() =>(['dentist', 'ppp']));
    const res = await specStorageService.getSpecByUserId('222');

    expect(specializationRepository.getSpecByUserId).toBeCalled();
    expect(res).toEqual(['dentist', 'ppp']);
  });

  test('get specializations list', async () => {
    specializationRepository.getAllSpec = jest.fn(() =>([{ dataValues:{specialization:'dentist'}}]));
    const res = await specStorageService.getSpecList('222');

    expect(specializationRepository.getAllSpec).toBeCalled();
    expect(res).toEqual(['dentist']);
  });

});
