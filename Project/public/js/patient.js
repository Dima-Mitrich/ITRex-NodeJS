const specList = document.getElementById('spec_list');
const addNewPatientButton = document.getElementById('addNewPatientButton');
const showResolution = document.getElementById('showResolution');

const patientFieldWithFoundedResolution = document.getElementById('foundResolutionField__patientInterface');
const patientCurrentStatus = document.getElementById('patient-current-status');

document.forms.add_in_queue_form.onsubmit = (EO) => {
    EO.preventDefault();
};

addNewPatientButton.addEventListener('click', addNewPatient);
window.addEventListener('load', findResolutionForPatient);
window.addEventListener('load', getSpecData);

async function addNewPatient() {
    try {
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
    } catch (err) {
        console.log(err);
    }
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
        console.log(foundResolution);
        patientFieldWithFoundedResolution.innerHTML = '';

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

        patientFieldWithFoundedResolution.appendChild(resTable);
    }
}

async function getSpecData() {
    try {
        const response = await fetch('/doctor/spec-list', {
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
    } catch (err) {
        console.log(err);
    }
}
