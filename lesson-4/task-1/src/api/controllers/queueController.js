import queue from '../service/PatientList.js';
import Patient from '../service/Patient.js';

export async function addInQueue(req, res) {
    const patientName = req.body;
    const patient = new Patient(patientName);

    await queue.addPatient(patient);
    res.send(true);
}

export async function getPatient(req, res) {
    const patient = await queue.takePatient();
    const isEmpty = await getLength();

    res.send(JSON.stringify({ patient, isEmpty }));
}

export async function getLength() {
    return queue.isEmpty();
}
