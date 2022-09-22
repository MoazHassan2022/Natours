import { showAlert } from '/js/alerts.js';

const updateData = async (data, type) => {
  try {
    const route = type === 'password' ? 'updateMyPassword' : 'updateMe';
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:8000/api/v1/users/${route}`,
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Updated data successfully!');
      window.setTimeout(() => {
        location.reload(true);
      }, 1000);
    }
  } catch (err) {
    console.log(err.response.data.stack);
    showAlert('error', err.response.data.message);
  }
};

const updateUserDataForm = document.querySelector('#save-settings');
const updatePasswordForm = document.querySelector('#save-password');

if (updateUserDataForm) {
  updateUserDataForm.addEventListener('click', async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('updatePhoto').files[0]);
    await updateData(form, 'data');
  });
}

if (updatePasswordForm) {
  updatePasswordForm.addEventListener('click', async (e) => {
    e.preventDefault();
    const currentPassword = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateData(
      { currentPassword, password, passwordConfirm },
      'password'
    );
  });
}
