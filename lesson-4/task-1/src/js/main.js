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
async function addNewPatient() {
    const response = await fetch('/queue/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain;charset=utf-8',
        },
        body: newPatinetNameInput.value,
    });

    const text = await response.text();
    console.log(text);

    nextPatientButton.disabled = false;
    dischargeInput(newPatinetNameInput, addNewPatientButton);
}

async function findResolutionForPatient(event) {
    if (searchResolutionPatientInput.value && event.keyCode === 13) {
        const patientName = searchResolutionPatientInput.value;

        const response = await fetch(`/queue/getResolution/${patientName}`, {
            method: 'GET',
            headers: {
                isDoctor: false,
            },
        });
        const foundResolution = await response.text();

        if (!foundResolution) {
            patientFieldWithFoundedResolution.innerHTML = 'there is no such resolution, or timeout';
        } else {
            patientFieldWithFoundedResolution.innerHTML = foundResolution;
        }
    }
}

// интерфейс доктора
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

    const response = await fetch('/doctor/addResolution', {
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
    const foundResolution = await response.text();

    if (!foundResolution) {
        doctorFieldWithFoundedResolution.innerHTML = 'There is no such patient';
    } else {
        doctorFieldWithFoundedResolution.innerHTML = foundResolution;
    }

    deleteResolutionButton.disabled = false;
}

async function deleteResolution() {
    // resolutionList.deleteResolution(currentPatient.name);

    const response = await fetch(`doctor/deleteResolution/${searchResolutionDoctorInput.value}`, {
        method: 'DELETE',
    });
    const res = await response.text();
    console.log(res);

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
