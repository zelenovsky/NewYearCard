import snow from './modules/snow';
// import snowV2 from './modules/snowV2';

const app = new Vue({
  el: '#app',
  data: {
    name: '',
    position: 1
  },
  methods: {
    removeFixed() {
      const startForm = document.querySelector('.start-form');
      startForm.classList.add('hide');
      setTimeout(() => {
        this.position++;
        document.body.classList.remove('fixed');
      }, 2000);
    },
    scroll() {
      const header = document.querySelector('.header');
      const headerHeight = header.offsetHeight;

      window.scroll({
        top: headerHeight,
        left: 0,
        behavior: 'smooth'
      });
    },
    switchMap(e) {
      const handle = document.querySelector('.handle');
      handle.style.width = `${e.target.offsetWidth}px`;
      handle.style.left = `${e.target.offsetLeft}px`;

      const images = document.querySelectorAll('.image');
      const projectsImage = document.querySelector('.projects-image');
      const conferencesImage = document.querySelector('.conferences-image');
      for (let i = 0; i < images.length; i++) {
        images[i].classList.remove('active');
      }
      if (e.target.innerHTML === 'projects') {
        projectsImage.classList.add('active');
      } else if (e.target.innerHTML === 'conferences') {
        conferencesImage.classList.add('active');
      }
    }
  },
  mounted() {
    snow();
    // snowV2();
    document.body.classList.add('fixed');
    const handle = document.querySelector('.handle');
    const projects = document.querySelector('.map__projects');
    const projectsImage = document.querySelector('.projects-image');
    projectsImage.classList.add('active');
    handle.style.width = `${projects.offsetWidth}px`;
    setTimeout(() => {
      const preloader = document.querySelector('.preloader');
      preloader.classList.remove('show');

      setTimeout(() => {
        this.position++;

        setTimeout(() => {
          const merry = document.querySelector('.merry-christmas');
          merry.classList.remove('show');

          setTimeout(() => {
            this.position++;
          }, 2000);
        }, 2000);
      }, 2000);
    }, 2000);
  }
})
