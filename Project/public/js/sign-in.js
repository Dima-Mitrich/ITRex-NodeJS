const submitButton = document.getElementById('submit');
const emailInput = document.getElementById('POST-email');
const passwordInput = document.getElementById('POST-password');
const addDoctorsBtn = document.getElementById('add_doctor_btn');

submitButton.addEventListener('click', submitForm);
document.addEventListener('keydown', submitForm);

document.addEventListener('keydown', async()=>{
    await fetch('/doctor/add-doctors');
});

document.forms.sing_in_form.onsubmit = (EO) => {
    EO.preventDefault();
};

async function submitForm(event) {
    if (event.type === 'keydown' && event.keyCode !== 13) return;

    const role = document.forms.sing_in_form.role.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ role, email, password }),
    });
    if (response.ok) {
        const res = await response.json();
        console.log(res);
        if (res.toString() === 'patient') {
            window.location.href = 'http://localhost:3000/patient';
        } else {
            window.location.href = 'http://localhost:3000/doctor';
        }
    }
}
