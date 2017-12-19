import snow from './modules/snow';

snow();

window.onload = () => {
  document.body.classList.add('fixed');

  const preloader = document.querySelector('.preloader');
  const merry = document.querySelector('.merry-christmas');
  const startForm = document.querySelector('.start-form');
  const header = document.querySelector('.header');
  preloader.classList.add('show');

  setTimeout(() => {
    preloader.classList.remove('show');
    preloader.classList.add('delete');
    merry.classList.add('show');

    setTimeout(() => {
      merry.classList.remove('show');

      setTimeout(() => {
        merry.classList.add('delete');
        startForm.classList.add('show');
      }, 1800);
    }, 3000);
  }, 3000);

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

    startForm.classList.remove('show');
    setTimeout(() => {
      startForm.classList.add('delete');
      document.body.classList.remove('fixed');
      header.classList.add('show');
    }, 2000);
  }, false);
};
