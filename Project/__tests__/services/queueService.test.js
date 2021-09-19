import queueService from '../../src/api/queue/services/QueueService.js';
import { NOT_FOUND_MESSAGE } from '../../src/constants.js';

const { queueRepository } = queueService;

describe('queue service have to', () => {

    test('add patient in queue', async () => {
        queueRepository.push = jest.fn((id) => ({ id }));

        const res = await queueService.addPatient(4);

        expect(queueRepository.push).toBeCalled();
        expect(res.id).toBe(4);
    });

    test('take patient from queue', async () => {
        queueRepository.shift = jest.fn(() => ({ id: 4 }));

        const res = await queueService.takePatient();
        expect(queueRepository.shift).toBeCalled();
        expect(res.id).toBe(4);
    });

    test('return isEmpty value', async () => {
        queueRepository.isEmpty = jest.fn(() => true);
        const res = await queueService.isEmpty();

        expect(queueRepository.isEmpty).toBeCalled();
        expect(res).toBe(true);
    });

    test('failed with get patient from queue', async () => {
        queueRepository.shift = jest.fn(() => undefined);
        const res = await queueService.takePatient();

        expect(queueRepository.shift).toBeCalled();
        expect(res).toBeInstanceOf(Error);
        expect(res.message).toBe(NOT_FOUND_MESSAGE);
    });
});
