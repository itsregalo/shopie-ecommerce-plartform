document.addEventListener('DOMContentLoaded', function() {
    const forgotPwdForm = document.getElementById('forgotPwdForm');
    const forgotPwdEmailInput = document.getElementById('forgotPwdEmail');
    const forgotPwdErrorMessage = document.getElementById('forgotPwdErrorMessage');
    const forgotPwdSuccessMessage = document.getElementById('forgotPwdSuccessMessage');

    forgotPwdForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const email = forgotPwdEmailInput.value;

        // Checking the error message
        function showError(message) {
            forgotPwdErrorMessage.textContent = message;
            forgotPwdSuccessMessage.textContent = '';
        }

        // Removing the error message
        function removeError() {
            forgotPwdErrorMessage.textContent = '';
            forgotPwdSuccessMessage.textContent = '';
        }

        // Checking if the email is valid
        function isValidEmail(email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(email);
        }

        if (!email) {
            showError('Please enter your email');
            return;
        }

        if (!isValidEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }

        removeError();

        try {
            const response = await axios.post(
                'http://localhost:8005/users/forgot-password',
                {
                    email: email
                }
            );

            if (response.status === 200) {
                forgotPwdSuccessMessage.textContent = response.data.message;
                
                // should redirect you to token page
                window.location.href = `../Auth/token.html?email=${email}`;
            } else {
                if (response.data && response.data.error) {
                    showError(response.data.error);
                } else {
                    showError('An error occurred. Please try again later.');
                }
            }
        } catch (error) {
            if ( error.response.data.error  ||  error.response.data || error.response ) {
                showError(error.response.data.error);
            } else {
                console.error(error);
            }
        }
    });
});
