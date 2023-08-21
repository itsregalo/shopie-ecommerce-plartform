document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const email = form.querySelector('input[type="text"]');
      const password = form.querySelector('input[type="password"]');
      
      // Checking the error message
      function showError(message) {
        const errorElement = document.getElementById('loginErrorMessage');
        errorElement.innerText = message;
      }
      
      // Removing the error message
      function removeError() {
        const errorElement = document.getElementById('loginErrorMessage');
        errorElement.innerText = '';
      }
      
      // Checking if all fields are filled
      if (email.value.trim() === '' || password.value.trim() === '') {
        showError('Please fill in all fields');
        return;
      } else {
        axios.post(
          'http://127.0.0.1:8005/users/login', 
          {
            email: email.value.trim(),
            password: password.value.trim()
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((result) => {
            removeError();
            localStorage.setItem('token', result.data.token);
            localStorage.setItem('user', JSON.stringify(result.data.user));
            const successElement = document.getElementById('loginSuccessMessage');
            successElement.innerText = result.data.message;
            const redirectUrl = result.data.user.is_admin == 0 ? '../employee/html/dashboard.html' : '../dashboard/dashboard.html';
            window.location.href = redirectUrl;
          })
          .catch((e) => {
            console.log(e);
            if (e?.message) {
              showError('Oops! You entered wrong credentials');
            } else if (e?.response.data.error) {
              showError(e.response.data.error);
            }
          });
      }
    });
  });
  