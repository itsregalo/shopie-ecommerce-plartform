// Get the reset token from the URL parameter
const resetToken = window.location.pathname.split('/').pop();


// Get the form element
const resetPwdForm = document.getElementById('resetpwd-form');

// Function to display error messages
function showError(message) {
    const errorElement = document.getElementById('resetPwdErrorMessage');
    errorElement.textContent = message;
}

// Function to clear error messages
function clearError() {
    const errorElement = document.getElementById('resetPwdErrorMessage');
    errorElement.textContent = '';
}

// Function to validate password format
function validatePassword(password) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&,.])[A-Za-z\d@$!%*?&,.]{8,}$/;
    return passwordPattern.test(password);
}

// Event listener for form submission
resetPwdForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const password = resetPwdForm.querySelector('#password').value;
    const confirmPassword = resetPwdForm.querySelector('#confirmpassword').value;

    // Clear previous error messages
    clearError();

    if (password.trim() === '' || confirmPassword.trim() === '') {
        showError("Please fill in all fields");
        return;
    }

    if (!validatePassword(password)) {
        showError("Password must have at least 8 characters with a combination of capital letters, small letters, and numbers");
        return;
    }

    if (password !== confirmPassword) {
        showError("Passwords do not match");
        return;
    }

    try {
        const response = await fetch(`http://localhost:8005/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                resetToken,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            // Password reset successful
            // Redirect the user to the login page or show a success message
            window.location.href = '../Auth/login.html';
        } else {
            showError(data.error || 'Password reset failed');
        }
    } catch (error) {
        window.location.href = '../Auth/login.html';
        // showError('An error occurred during password reset');
    }
});
