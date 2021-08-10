import resolutionList from '../service/ResolutionList.js';
import Resolution from '../service/Resolution.js';

export function addResolution(newResolutionContent, currentPatient, ttl) {
    const resolution = new Resolution(newResolutionContent, currentPatient);

    try {
        (async () => {
            await resolutionList.addNewResolution(resolution, ttl);
        })();

        return true;
    } catch (err) {
        console.log(err);

        return false;
    }
}

export function deleteResolution(name) {
    try {
        (async () => { await resolutionList.deleteResolution(name); })();

        return true;
    } catch (err) {
        console.log(err);

        return false;
    }
}

export function findResolution(name, isDoctor) {
    const result = resolutionList.findResolution(name, isDoctor);

    return result;
}
