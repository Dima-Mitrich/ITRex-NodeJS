import resolutionList from '../src/js/ResolutionList.js';
import Resolution from '../src/js/Resolution.js';

export function addResolution(req, res) {
    const { newResolutionContent, currentPatient, ttl } = req.body;
    const resolution = new Resolution(newResolutionContent, currentPatient);

    resolutionList.addNewResolution(resolution, ttl);
    res.send(true);
}

export function deleteResolution(req, res) {
    console.log(req.params.name);
    resolutionList.deleteResolution(req.params.name);
    res.send(true);
}

export function findResolution(req, res) {
    const result = resolutionList.findResolution(req.params.name, req.headers.isdoctor);

    res.send(result);
}
