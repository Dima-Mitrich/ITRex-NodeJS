const specList = document.getElementById('spec_list');
const addNewPatientButton = document.getElementById('addNewPatientButton');
const showResolution = document.getElementById('showResolution');

const patientFieldWithFoundedResolution = document.getElementById('foundResolutionField__patientInterface');
const patientCurrentStatus = document.getElementById('patient-current-status');

document.forms.add_in_queue_form.onsubmit = (EO) => {
    EO.preventDefault();
};

addNewPatientButton.addEventListener('click', addNewPatient);
showResolution.addEventListener('click', findResolutionForPatient);
window.addEventListener('load', getSpecData);

async function addNewPatient() {
    const specSelect = document.getElementById('queueSelect');
    console.log(specSelect.value);
    const response = await fetch('/patient', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ spec: specSelect.value }),
    });

    const text = await response.json();
    console.log(text);

    patientCurrentStatus.innerHTML = 'waiting';
    // nextPatientButton.disabled = false;
}

async function findResolutionForPatient() {
    const response = await fetch('/resolutions', {
        method: 'GET',
        headers: {
            isDoctor: false,
        },
    });

    if (response.status === 404) {
        patientFieldWithFoundedResolution.innerHTML = 'there is no such resolution, or timeout';
    } else if (response.status === 403) {
        window.location.href = 'http://localhost:3000/login';
    } else {
        const foundResolution = await response.json();
        patientFieldWithFoundedResolution.innerHTML = foundResolution.content;
    }
}

async function getSpecData() {
    const response = await fetch('/patient/spec-list', {
        method: 'GET',
        headers: {
            isDoctor: false,
        },
    });
    const specData = await response.json();

    const list = document.createElement('select');
    list.id = 'queueSelect';
    for (const elem of specData) {
        const item = document.createElement('option');
        item.value = elem;
        item.textContent = elem;
        list.appendChild(item);
    }
    specList.appendChild(list);
}
