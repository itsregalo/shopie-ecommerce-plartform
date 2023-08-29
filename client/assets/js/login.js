document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('form');
  const emailInput = document.querySelector('input[type="text"]');
  const passwordInput = document.querySelector('input[type="password"]');
  const loginErrorMessage = document.getElementById('loginErrorMessage');
  const loginSuccessMessage = document.getElementById('loginSuccessMessage');

  form.addEventListener('submit', async function(event) {
      event.preventDefault();

      const email = emailInput.value;
      const password = passwordInput.value;

      // Checking the error message
      function showError(message) {
          loginErrorMessage.textContent = message;
          loginSuccessMessage.textContent = '';
      }

      // Removing the error message
      function removeError() {
          loginErrorMessage.textContent = '';
          loginSuccessMessage.textContent = '';
      }

      // Checking if the email is valid
      function isValidEmail(email) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailPattern.test(email);
      }

      if (!email || !password) {
          showError('All fields are required');
          return;
      }

      if (!isValidEmail(email)) {
          showError('Please enter a valid email address');
          return;
      }

      removeError();

      try {
          const response = await axios.post(
              'http://localhost:8005/users/login',
              {
                  email: email,
                  password: password
              }
          );

          if (response.status === 200) {
              const responseData = response.data;
              if (responseData.token) {
                  // Save the token and user data locally
                  localStorage.setItem('token', responseData.token);
                  localStorage.setItem('user', JSON.stringify(responseData.user));
              }
              removeError();
              loginSuccessMessage.textContent = responseData.message;
              // Redirect to appropriate dashboard based on user type
              console.log(responseData.user);
              if (responseData.user.is_admin === 1) {
                
                  window.location.href = '/client/Admin/dashboard/index.html';
              } else {
                  window.location.href = '../products/products.html';
              }
          } else {
              if (response.data && response.data.error) {
                  showError(response.data.error);
              } else {
                  showError('Invalid credentials');
              }
          }
      } catch (error) {
          if (error.response && error.response.data && error.response.data.error) {
              showError(error.response.data.error);
          } else {
              showError('Invalid credentials');
          }
      }
  });
});
