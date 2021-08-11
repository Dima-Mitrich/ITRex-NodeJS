import { dischargeInput, addButtonStatusChange } from './common.js';

let currentPatient = null;

const nextPatientButton = document.getElementById('nextButton');
const addNewResolutionButton = document.getElementById('addNewResolutionButton');
const showResolutionToDoctorButton = document.getElementById('showResolutionButton__doctorInterface');
const deleteResolutionButton = document.getElementById('deleteResolutionButton');

const newResolutionInput = document.getElementById('newResolutionInput');
const searchResolutionDoctorInput = document.getElementById('searchResolution__doctorInterface');
const addResolutionWithTTLCheckbox = document.getElementById('add-ttl-checkbox');

const queueListDoctorInterface = document.getElementById('currentPatientName_doctorInterface');
const queueListUserInterface = document.getElementById('currentPatientName_userInterface');
const doctorFieldWithFoundedResolution = document.getElementById('foundResolutionField__doctorInterface');

nextPatientButton.addEventListener('click', callNextPatient);
addNewResolutionButton.addEventListener('click', addNewResolutionForCurrentPatient);
showResolutionToDoctorButton.addEventListener('click', findResolutionForDoctor);
deleteResolutionButton.addEventListener('click', deleteResolution);

newResolutionInput.addEventListener('input', addButtonStatusChange(addNewResolutionButton));
searchResolutionDoctorInput.addEventListener('input', addButtonStatusChange(showResolutionToDoctorButton));

async function callNextPatient() {
    const response = await fetch('/doctor/next');

    const { patient, isEmpty } = await response.json();

    currentPatient = patient;

    queueListDoctorInterface.innerHTML = currentPatient.name;
    queueListUserInterface.innerHTML = currentPatient.name;

    if (isEmpty) {
        nextPatientButton.disabled = true;
    }
}

async function addNewResolutionForCurrentPatient() {
    if (!currentPatient) {
        alert('You dont have patient at the time');
        dischargeInput(newResolutionInput, addNewResolutionButton);

        return;
    }

    const newResolutionContent = newResolutionInput.value;
    const ttl = addResolutionWithTTLCheckbox.checked;

    const response = await fetch('/doctor/new-resolution', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ newResolutionContent, currentPatient, ttl }),
    });

    const text = await response.text();
    console.log(text);

    dischargeInput(newResolutionInput, addNewResolutionButton);
}

async function findResolutionForDoctor() {
    const patientName = searchResolutionDoctorInput.value;

    const response = await fetch(`/doctor/resolution/${patientName}`, {
        method: 'GET',
        headers: {
            isDoctor: true,
        },
    });

    if (response.status !== 200) {
        doctorFieldWithFoundedResolution.innerHTML = 'There is no such patient';
    } else {
        const foundResolution = await response.text();
        doctorFieldWithFoundedResolution.innerHTML = foundResolution;
    }

    deleteResolutionButton.disabled = false;
}

async function deleteResolution() {
    const resolutionContent = doctorFieldWithFoundedResolution.innerHTML;

    if (resolutionContent && resolutionContent !== 'There is no such patient') {
        const response = await fetch(`doctor/resolution/${searchResolutionDoctorInput.value}`, {
            method: 'DELETE',
        });
        const res = await response.text();
        console.log(res);

        dischargeInput(doctorFieldWithFoundedResolution, deleteResolutionButton);
        dischargeInput(searchResolutionDoctorInput, showResolutionToDoctorButton);
    }
}
