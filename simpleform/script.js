const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;

}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';

}

function isValidEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    re.test(input.value.trim()) ? showSuccess(input) : showError(input, "Email is not valid.")
}

function checkLength(input, min, max) {
    input.value.length < min ? showError(input, `${getFieldName(input)} minimum is ${min} characters`) :
        input.length > max ? showError(input, `${getFieldName(input)} minimum is ${min} characters`) :
            showSuccess(input);

}

function checkPasswordMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
    }
}

function checkFields(inputArr) {
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input)
        }
    })

}

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


form.addEventListener('submit', function (e) {
    e.preventDefault();

    checkFields([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 15);
    isValidEmail(email);
    checkPasswordMatch(password, password2)

    // if (!username.value) {
    //     showError(username, 'Username is required');
    // } else {
    //     showSuccess(username);
    // }
    // if (!email.value) {
    //     showError(email, 'Email is required');
    // } else if (!isValidEmail(email.value)) {
    //     showError(email, 'Email is not in valid format');
    // } else {
    //     showSuccess(email);
    // }
    // if (!password.value) {
    //     showError(password, 'Password is required');
    // } else {
    //     showSuccess(password);
    // }
})