const addNewPatientButton = document.getElementById('addNewPatientButton');

const patientFieldWithFoundedResolution = document.getElementById('foundResolutionField__patientInterface');
const dropDownSpec = document.getElementById('speciality-list');
const selectDoctorContainer = document.getElementById('select-doctor');

addNewPatientButton.addEventListener('click', addNewPatient);
window.addEventListener('load', findResolutionForPatient);
window.addEventListener('load', getSpecData);

async function addNewPatient() {
    try {
        const specSelect = document.getElementById('doctors-list');
        console.log(specSelect.value);
        const response = await fetch('/patient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ docID: specSelect.value }),
        });

        const text = await response.json();
        console.log(text);
    } catch (err) {
        console.log(err);
    }
}

async function findResolutionForPatient() {
    const response = await fetch('/resolutions/me');

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
        numberHeader.innerHTML = 'Number';
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
            const arr = elem.createdAt.split('T');
            const time = arr[1].substr(0, 8);
            const tabRow = document.createElement('tr');

            const number = document.createElement('td');
            number.innerHTML = i + 1;
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
            createdAt.innerHTML = `${arr[0]} | ${time}`;
            tabRow.appendChild(createdAt);

            resTable.appendChild(tabRow);
        });

        patientFieldWithFoundedResolution.appendChild(resTable);
    }
}

async function getSpecData() {
    try {
        const response = await fetch('/doctor/specialties');
        const specData = await response.json();

        const list = document.createElement('select');
        list.id = 'queueSelect';
        console.log(specData);

        specData.forEach((elem) => {
            const opt = document.createElement('option');
            opt.setAttribute('value', `${elem.specialization}`);
            opt.innerHTML = elem.specialization;
            dropDownSpec.appendChild(opt);
        });

        dropDownSpec.addEventListener('change', (event) => {
            const dropDownDoc = document.getElementById('doctors-list');
            const spec = event.target.value;
            const docList = specData.find((elem) => elem.specialization === spec).doctors;
            console.log(docList);

            dropDownDoc.remove();
            const select = document.createElement('select');
            select.setAttribute('id', 'doctors-list');
            selectDoctorContainer.appendChild(select);

            docList.forEach((elem) => {
                const opt = document.createElement('option');
                opt.setAttribute('value', `${elem.id}`);
                opt.innerHTML = elem.name;
                select.appendChild(opt);
            });
        });
    } catch (err) {
        console.log(err);
    }
}
