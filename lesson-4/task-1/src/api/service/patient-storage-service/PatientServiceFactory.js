import config from '../../../../config.js';
import RedisPatientStorageService from './RedisPatientStorageService.js';
import InMemoryPatientStorageService from './InMemoryPatientStorageService.js';

class PatientServiceFactory {
    create(type) {
        let service = null;

        if (type === 'redis') {
            service = new RedisPatientStorageService();
        } else if (type === 'inMemory') {
            service = new InMemoryPatientStorageService();
        }

        return service;
    }
}

const service = new PatientServiceFactory();
const queueService = service.create(config.app.storageType);
export default queueService;
