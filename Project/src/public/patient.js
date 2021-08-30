import { dischargeInput, addButtonStatusChange } from './common.js';

const nextPatientButton = document.getElementById('nextButton');
const addNewPatientButton = document.getElementById('addNewPatientButton');
addNewPatientButton.addEventListener('click', addNewPatient);

const newPatinetNameInput = document.getElementById('newPatientName');
const searchResolutionPatientInput = document.getElementById('searchResolution__patientInterface');
newPatinetNameInput.addEventListener('input', addButtonStatusChange(addNewPatientButton));

const patientFieldWithFoundedResolution = document.getElementById('foundResolutionField__patientInterface');

document.addEventListener('keydown', findResolutionForPatient);

async function addNewPatient() {
    const response = await fetch('/patients/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ name: newPatinetNameInput.value }),
    });

    const text = await response.text();
    console.log(text);

    nextPatientButton.disabled = false;
    dischargeInput(newPatinetNameInput, addNewPatientButton);
}

async function findResolutionForPatient(event) {
    if (searchResolutionPatientInput.value && event.keyCode === 13) {
        const patientName = searchResolutionPatientInput.value;

        const response = await fetch(`resolutions/${patientName}`, {
            method: 'GET',
            headers: {
                isDoctor: false,
            },
        });

        if (response.status !== 200) {
            patientFieldWithFoundedResolution.innerHTML = 'there is no such resolution, or timeout';
        } else {
            const foundResolution = await response.json();
            patientFieldWithFoundedResolution.innerHTML = foundResolution.content;
        }
    }
}
