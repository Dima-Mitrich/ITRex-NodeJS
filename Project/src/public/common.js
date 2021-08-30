export function dischargeInput(element, button) {
    element.tagName === 'INPUT' ? element.value = '' : element.innerHTML = '';
    button.disabled = true;
}

export function addButtonStatusChange(button) {
    return (event) => event.target.value ? button.disabled = false : button.disabled = true;
}
