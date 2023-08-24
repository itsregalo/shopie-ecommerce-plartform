document.addEventListener('DOMContentLoaded', function() {
    const tokenForm = document.getElementById('token-form');
    const tokenInput = document.getElementById('password-token');
    const tokenErrorMessage = document.getElementById('tokenErrorMessage');
    const tokenSuccessMessage = document.getElementById('tokenSuccessMessage');

    tokenForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const token = tokenInput.value;
        document.addEventListener('DOMContentLoaded', function() {
            const tokenForm = document.getElementById('token-form');
            const tokenInput = document.getElementById('password-token');
            const tokenErrorMessage = document.getElementById('tokenErrorMessage');
            const tokenSuccessMessage = document.getElementById('tokenSuccessMessage');
        
            tokenForm.addEventListener('submit', async function(event) {
                event.preventDefault();
        
                const token = tokenInput.value;
        
                // Checking the error message
                function showError(message) {
                    tokenErrorMessage.textContent = message;
                    tokenSuccessMessage.textContent = '';
                }
        
                // Removing the error message
                function removeError() {
                    tokenErrorMessage.textContent = '';
                    tokenSuccessMessage.textContent = '';
                }
        
                if (!token) {
                    showError('Please enter the token');
                    return;
                }
        
                removeError();
        
                try {
                    const response = await axios.post(
                        'http://localhost:8005/users/verify-token',
                        {
                            token: token
                        }
                    );
        
                    if (response.status === 200) {
                        // tokenSuccessMessage.textContent = response.data.message;
                        if(response.data.message === 'Token is valid') {
                            // Redirect to reset password page if the token is valid
                            window.location.href = '../Auth/resetpassword.html';
                        }
                    } else {
                        if (response.data && response.data.error) {
                            showError(response.data.error);
                        } else {
                            showError('Invalid Token.');
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
        
        // Checking the error message
        function showError(message) {
            tokenErrorMessage.textContent = message;
            tokenSuccessMessage.textContent = '';
        }

        // Removing the error message
        function removeError() {
            tokenErrorMessage.textContent = '';
            // tokenSuccessMessage.textContent = '';
        }

        if (!token) {
            showError('Please enter the token');
            return;
        }

        removeError();

        try {
            const tokenString = document.querySelector('#password-token').value
            const response = await axios.post(
                'http://localhost:8005/users/verify-token',
                {
                    token: tokenString
                }
            );

            console.log(response);

            if (response.status === 200) {
                // tokenSuccessMessage.textContent = response.data.message;
                // Redirect to reset password page if the token is valid
                // window.location.href = '../Auth/resetpassword.html';
            } else {
                if (response.data && response.data.error) {
                    showError(response.data.error);
                } else {
                    showError('An error occurred. Please try again later.');
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
