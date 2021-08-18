import config from '../../../../config.js';
import InMemoryResolutionStorageService from './InMemoryResolutionStorageService.js';
import RedisResolutionStorageService from './RedisResolutionStorageService.js';

class ResolutionServiceFactory {
    create(type) {
        let service = null;
        if (type === 'redis') {
            service = new RedisResolutionStorageService();
        } else if (type === 'inMemory') {
            service = new InMemoryResolutionStorageService();
        }

        return service;
    }
}

const service = new ResolutionServiceFactory();
const resolutionListService = service.create(config.app.storageType);
export default resolutionListService;
