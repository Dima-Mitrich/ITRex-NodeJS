export default function calculateAge(dob) {
    const arr = dob.split('-');
    const patientYear = parseInt(arr[0], 10);
    const patientMonth = parseInt(arr[1], 10);
    const patientDay = parseInt(arr[2], 10);
    dob = new Date(patientYear, patientMonth, patientDay);
    const diffMs = Date.now() - dob.getTime();
    const ageDt = new Date(diffMs);

    return Math.abs(ageDt.getUTCFullYear() - 1970);
}
