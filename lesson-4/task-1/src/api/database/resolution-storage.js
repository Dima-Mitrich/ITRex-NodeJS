import redis from 'redis';
import config from '../../../config.js';

class Storage {
    create(type) {
        let storage = null;

        if (type === 'redis') {
            storage = redis.createClient();

            storage.on('error', (error) => {
                console.error(error);
            });
        } else if (type === 'inMemory') {
            storage = {};
        }

        return storage;
    }
}

const storage = new Storage();
const resolutionStorage = storage.create(config.app.storageType);

export default resolutionStorage;
