import snow from './modules/snow';

snow();

const pushUserBtn = document.querySelector('.push-user');

pushUserBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const userNameInput = document.querySelector('.user-name');
  const userName = document.querySelector('.name');
  const comma = document.createElement('span');
  comma.className = 'comma';
  comma.innerHTML = ',';

  userName.innerHTML = userNameInput.value;
  userName.appendChild(comma);
}, false);