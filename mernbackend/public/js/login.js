// public/js/login.js

// Handle Registration Form Submission
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});


document.querySelector('.form-container.sign-up form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    const name = document.querySelector('input[placeholder="Name"]').value;
    const email = document.querySelector('input[placeholder="Email"]').value;
    const password = document.querySelector('input[placeholder="Password"]').value;

    const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    console.log(data);
    // Handle the response appropriately (e.g., show a message, redirect, etc.)
});


// Handle Login Form Submission
document.querySelector('.form-container.sign-in form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    const email = document.querySelector('.form-container.sign-in input[placeholder="Email"]').value;
    const password = document.querySelector('.form-container.sign-in input[placeholder="Password"]').value;

    const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(data);
    // Handle the response appropriately (e.g., show a message, redirect, etc.)
});
