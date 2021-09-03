const nextPatientButton = document.getElementById('nextButton');
const addNewPatientButton = document.getElementById('addNewPatientButton');
const showResolution = document.getElementById('showResolution');

const patientFieldWithFoundedResolution = document.getElementById('foundResolutionField__patientInterface');
const patientCurrentStatus = document.getElementById('patient-current-status');

addNewPatientButton.addEventListener('click', addNewPatient);
showResolution.addEventListener('click', findResolutionForPatient);

async function addNewPatient() {
    const response = await fetch('/patients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    });

    const text = await response.json();
    console.log(text);

    patientCurrentStatus.innerHTML = 'waiting';
    nextPatientButton.disabled = false;
}

async function findResolutionForPatient() {
    console.log('herererer');
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
