import { dischargeInput, addButtonStatusChange } from './common.js';

let currentPatient = null;
const foundedPatient = null;
let spec = null;

const nextPatientButton = document.getElementById('nextButton');
const addNewResolutionButton = document.getElementById('addNewResolutionButton');
const showResolutionToDoctorButton = document.getElementById('showResolutionButton__doctorInterface');
const deleteResolutionButton = document.getElementById('deleteResolutionButton');
const delInput = document.getElementById('del_input');

const newResolutionInput = document.getElementById('newResolutionInput');
const searchResolutionDoctorInput = document.getElementById('searchResolution__doctorInterface');
const addResolutionWithTTLCheckbox = document.getElementById('add-ttl-checkbox');

const queueListDoctorInterface = document.getElementById('currentPatientName_doctorInterface');
const patientCurrentStatus = document.getElementById('patient-current-status');
const doctorFieldWithFoundedResolution = document.getElementById('foundResolutionField__doctorInterface');
const doctorName = document.getElementById('doc_name');
const doctorSpec = document.getElementById('spec');

nextPatientButton.addEventListener('click', callNextPatient);
addNewResolutionButton.addEventListener('click', addNewResolutionForCurrentPatient);
showResolutionToDoctorButton.addEventListener('click', findResolutionForDoctor);
deleteResolutionButton.addEventListener('click', deleteResolution);

newResolutionInput.addEventListener('input', addButtonStatusChange(addNewResolutionButton));
searchResolutionDoctorInput.addEventListener('input', addButtonStatusChange(showResolutionToDoctorButton));

window.addEventListener('load', async () => {
    const response = await fetch('/doctor/doctor-data');
    const data = await response.json();
    for (const elem of data) {
        const item = document.createElement('option');
        item.textContent = elem;
        item.value = elem;
        doctorSpec.appendChild(item);
    }
});

async function callNextPatient() {
    spec = doctorSpec.value;
    const response = await fetch(`/patient/next?spec=${spec}`);

    const patient = await response.json();

    console.log(patient);

    currentPatient = patient.value;
    console.log(currentPatient);

    queueListDoctorInterface.innerHTML = currentPatient.name;
    // patientCurrentStatus.innerHTML = 'at an appointment'; //при разделении страниц отвалилось
    //
    // if (patient.last) {
    //     nextPatientButton.disabled = true;
    // }
}

async function addNewResolutionForCurrentPatient() {
    if (!currentPatient) {
        alert('You dont have patient at the time');
        dischargeInput(newResolutionInput, addNewResolutionButton);

        return;
    }

    const newResolutionContent = newResolutionInput.value;
    const ttl = addResolutionWithTTLCheckbox.checked;

    const response = await fetch('/resolutions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            newResolutionContent, currentPatient, ttl, spec,
        }),
    });

    const text = await response.text();
    console.log(text);

    dischargeInput(newResolutionInput, addNewResolutionButton);
}

async function findResolutionForDoctor() {
    const patientName = searchResolutionDoctorInput.value;

    const response = await fetch(`resolutions/${patientName}`, {
        method: 'GET',
        headers: {
            isDoctor: true,
        },
    });

    if (response.status !== 200) {
        doctorFieldWithFoundedResolution.innerHTML = 'There is no such patient';
    } else {
        const foundResolution = await response.json();
        console.log(foundResolution);
        // doctorFieldWithFoundedResolution.innerHTML = foundResolution.content;
        // foundedPatient = foundResolution.patientID;

        doctorFieldWithFoundedResolution.innerHTML = '';

        const resTable = document.createElement('table');
        resTable.setAttribute('class', 'resolution_table');
        resTable.setAttribute('id', 'res_table');

        const tabHeaders = document.createElement('tr');

        const numberHeader = document.createElement('th');
        numberHeader.innerHTML = 'number';
        tabHeaders.appendChild(numberHeader);

        const resIdHeader = document.createElement('th');
        resIdHeader.innerHTML = 'Resolution ID';
        tabHeaders.appendChild(resIdHeader);

        const contentHeader = document.createElement('th');
        contentHeader.innerHTML = 'Content';
        tabHeaders.appendChild(contentHeader);

        const specHeader = document.createElement('th');
        specHeader.innerHTML = 'Speciality';
        tabHeaders.appendChild(specHeader);

        const patientNameHeader = document.createElement('th');
        patientNameHeader.innerHTML = 'Patient name';
        tabHeaders.appendChild(patientNameHeader);

        const doctorNameHeader = document.createElement('th');
        doctorNameHeader.innerHTML = 'Doctor name';
        tabHeaders.appendChild(doctorNameHeader);

        const timeHeader = document.createElement('th');
        timeHeader.innerHTML = 'Created At';
        tabHeaders.appendChild(timeHeader);

        resTable.appendChild(tabHeaders);

        foundResolution.forEach((elem, i) => {
            const tabRow = document.createElement('tr');

            const number = document.createElement('td');
            number.innerHTML = i;
            tabRow.appendChild(number);

            const resID = document.createElement('td');
            resID.innerHTML = elem.id;
            tabRow.appendChild(resID);

            const content = document.createElement('td');
            content.innerHTML = elem.content;
            tabRow.appendChild(content);

            const spec = document.createElement('td');
            spec.innerHTML = elem.speciality;
            tabRow.appendChild(spec);

            const patientName = document.createElement('td');
            patientName.innerHTML = elem.patient.name;
            tabRow.appendChild(patientName);

            const docName = document.createElement('td');
            docName.innerHTML = elem.doctor.name;
            tabRow.appendChild(docName);

            const createdAt = document.createElement('td');
            createdAt.innerHTML = new Date(elem.createdAt);
            tabRow.appendChild(createdAt);

            resTable.appendChild(tabRow);
        });

        doctorFieldWithFoundedResolution.appendChild(resTable);
    }

    deleteResolutionButton.disabled = false;
}

async function deleteResolution() {
    const resolutionId = delInput.value;
    console.log(resolutionId);

    const response = await fetch(`resolutions/${resolutionId}`, {
        method: 'DELETE',
    });
    const res = await response.text();
    console.log(res);

    dischargeInput(doctorFieldWithFoundedResolution, deleteResolutionButton);
    dischargeInput(searchResolutionDoctorInput, showResolutionToDoctorButton);
}
