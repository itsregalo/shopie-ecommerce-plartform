document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const registerErrorMessage = document.getElementById('registerErrorMessage');

    registerForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const firstName = firstNameInput.value;
        const lastName = lastNameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Checking the error message
        function showError(message) {
            registerErrorMessage.textContent = message;
        }

        // Removing the error message
        function removeError() {
            registerErrorMessage.textContent = '';
        }

        // Checking if the email is valid
        function isValidEmail(email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(email);
        }

        // Checking if the password meets the requirements
        function isValidPassword(password) {
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&,.])[A-Za-z\d@$!%*?&,.]{8,}$/;
            return passwordPattern.test(password);
        }

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            showError('All fields are required');
            return;
        }

        if (!isValidEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }

        if (!isValidPassword(password)) {
            showError('Password must have at least 8 characters with a combination of capital letters, small letters, numbers, and special characters');
            return;
        }

        if (password !== confirmPassword) {
            showError('Passwords do not match');
            return;
        }

        removeError();

        try {
            const response = await axios.post(
                'http://localhost:8005/users/register',
                {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                }
            );
        if (response.status === 201) {
            const responseData = response.data;
            if (responseData.token) {
                // Save the token and user data locally
                localStorage.setItem('token', responseData.token);
                localStorage.setItem('user', JSON.stringify(responseData.user));
            }
            // Registration successful, redirect to login page
            window.location.href = '../Auth/login.html';
        }
        else {
            if (response.data && response.data.error) {
                showError(response.data.error);
            } else {
                showError('An error occurred during registration');
            }
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            showError(error.response.data.error);
        } else {
            console.error(error);
        }
    }

    });
});

