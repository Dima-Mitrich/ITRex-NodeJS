import PatientList from './PatientList.js';
import Patient from './Patient.js';
import Resolution from './Resolution.js';
import ResolutionList from './ResolutionList.js';

const queue = new PatientList();
const resolutionList = new ResolutionList();
let currentPatient = null;

// находим все кнопки
const nextPatientButton = document.getElementById('nextButton');
const addNewPatientButton = document.getElementById('addNewPatientButton');
const addNewResolutionButton = document.getElementById('addNewResolutionButton');
const showResolutionToDoctorButton = document.getElementById('showResolutionButton__doctorInterface');
const deleteResolutionButton = document.getElementById('deleteResolutionButton');

// находим все инпуты
const newPatinetNameInput = document.getElementById('newPatientName');
const newResolutionInput = document.getElementById('newResolutionInput');
const searchResolutionDoctorInput = document.getElementById('searchResolution__doctorInterface');
const searchResolutionPatientInput = document.getElementById('searchResolution__patientInterface');
const addResolutionWithTTLCheckbox = document.getElementById('add-ttl-checkbox');

// находим все дивы
const queueListDoctorInterface = document.getElementById('currentPatientName_doctorInterface');
const queueListUserInterface = document.getElementById('currentPatientName_userInterface');
const doctorFieldWithFoundedResolution = document.getElementById('foundResolutionField__doctorInterface');
const patientFieldWithFoundedResolution = document.getElementById('foundResolutionField__patientInterface');

// добавляем обработчики на кнопки
addNewPatientButton.addEventListener('click', addNewPatient);
nextPatientButton.addEventListener('click', callNextPatient);
addNewResolutionButton.addEventListener('click', addNewResolutionForCurrentPatient);
showResolutionToDoctorButton.addEventListener('click', findResolutionForDoctor);
deleteResolutionButton.addEventListener('click', deleteResolution);

// добавляем обработчики на инпуты
newPatinetNameInput.addEventListener('input', addButtonStatusChange(addNewPatientButton));
newResolutionInput.addEventListener('input', addButtonStatusChange(addNewResolutionButton));
searchResolutionDoctorInput.addEventListener('input', addButtonStatusChange(showResolutionToDoctorButton));

document.addEventListener('keydown', findResolutionForPatient);

// интерфейс пациента
function addNewPatient() {
    const patientName = newPatinetNameInput.value;

    const newPatinet = new Patient(patientName);
    queue.addPatient(newPatinet);
    nextPatientButton.disabled = false;
    dischargeInput(newPatinetNameInput, addNewPatientButton);
}

function findResolutionForPatient(event) {
    if (searchResolutionPatientInput.value && event.keyCode === 13) {
        const patientName = searchResolutionPatientInput.value;
        const foundResolution = resolutionList.findResolution(patientName, false);

        if (!foundResolution) {
            patientFieldWithFoundedResolution.innerHTML = 'there is no such resolution, or timeout';
        } else {
            patientFieldWithFoundedResolution.innerHTML = foundResolution;
        }
    }
}

// интерфейс доктора
function callNextPatient() {
    currentPatient = queue.takePatient();

    queueListDoctorInterface.innerHTML = currentPatient.name;
    queueListUserInterface.innerHTML = currentPatient.name;

    if (queue.isEmpty()) {
        nextPatientButton.disabled = true;
    }
}

function addNewResolutionForCurrentPatient() {
    if (!currentPatient) {
        alert('You dont have patient at the time');
        dischargeInput(newResolutionInput, addNewResolutionButton);

        return;
    }

    const newResolution = new Resolution(newResolutionInput.value, currentPatient);

    currentPatient.addResolution(newResolution);

    if (addResolutionWithTTLCheckbox.checked) resolutionList.addNewResolution(newResolution, true);
    else resolutionList.addNewResolution(newResolution);

    dischargeInput(newResolutionInput, addNewResolutionButton);
}

function findResolutionForDoctor() {
    const patientName = searchResolutionDoctorInput.value;
    const foundResolution = resolutionList.findResolution(patientName, true);

    if (!foundResolution) {
        doctorFieldWithFoundedResolution.innerHTML = 'There is no such patient';
    } else {
        doctorFieldWithFoundedResolution.innerHTML = foundResolution;
    }

    deleteResolutionButton.disabled = false;
}

function deleteResolution() {
    resolutionList.deleteResolution(currentPatient.name);

    dischargeInput(doctorFieldWithFoundedResolution, deleteResolutionButton);
    dischargeInput(searchResolutionDoctorInput, showResolutionToDoctorButton);
}

// вспомогательные функции
function dischargeInput(element, button) {
    element.tagName === 'INPUT' ? element.value = '' : element.innerHTML = '';
    button.disabled = true;
}

function addButtonStatusChange(button) {
    return (event) => event.target.value ? button.disabled = false : button.disabled = true;
}
