const doLogin = function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Clear local storage to avoid potential conflicts
    localStorage.removeItem('authToken');

    fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Login response data:', data); // Debug statement
        if (data.auth && data.access_token) {
            localStorage.setItem('authToken', data.access_token); // Store the token in local storage
            console.log('Token stored:', data.access_token); // Debug statement
            window.location.href = 'home.html'; // Redirect to home.html
        } else {
            console.error('Login failed response data:', data); // Debug statement
            throw new Error('Login failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Login failed. Please check your credentials.');
    });
};

const doRegister = function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.msg === 'New user created!') {
            window.location.href = 'login.html'; // Redirect to login.html after registration
        } else {
            throw new Error('Registration failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Registration failed. Please try again.');
    });
};

const doLogout = function(e) {
    e.preventDefault();
    localStorage.removeItem('authToken');
    window.location.href = 'login.html'; // Redirect to login.html after logout
};

// Add country function
const addCountry = function(e) {
    e.preventDefault();
    const nation = document.getElementById('nation').value;
    const status = document.getElementById('status').value;
    const visitDate = document.getElementById('Visit_date').value;
    const authToken = localStorage.getItem('authToken'); // Get the token from local storage

    console.log('Adding country with data:', { nation, status, visitDate }); // Debug statement

    fetch('http://localhost:3000/api/countries', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}` // Include the token
        },
        body: JSON.stringify({ nation, status, Visit_date: visitDate })
    })
    .then(response => {
        console.log('Add country response status:', response.status); // Debug statement
        return response.json();
    })
    .then(data => {
        console.log('Add country response data:', data); // Debug statement
        if (data.msg === 'Added country successfully!') {
            window.location.href = 'home.html'; // Redirect to home.html after adding the country
        } else {
            console.error('Failed to add country response data:', data); // Debug statement
            throw new Error('Failed to add country');
        }
    })
    .catch(error => {
        console.error('Error adding country:', error.message); // Debug statement
        alert('Failed to add country. Please try again.');
    });
};


// Event listeners for authentication and adding country
document.getElementById('loginForm').addEventListener('submit', doLogin);
document.getElementById('registerForm').addEventListener('submit', doRegister);
document.getElementById('logoutButton').addEventListener('click', doLogout);

if (document.getElementById('addCountryForm')) {
    document.getElementById('addCountryForm').addEventListener('submit', addCountry);
}
