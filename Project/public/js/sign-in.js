const submitButton = document.getElementById('submit');
const emailInput = document.getElementById('POST-email');
const passwordInput = document.getElementById('POST-password');

submitButton.addEventListener('click', submitForm);
document.addEventListener('keydown', submitForm);

async function submitForm(event) {
    if (event.type === 'keydown' && event.keyCode !== 13) return;

    const email = emailInput.value;
    const password = passwordInput.value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
        const res = await response.json();
        console.log(res);
        window.location.href = 'http://localhost:3000/cabinet';
    }
}
