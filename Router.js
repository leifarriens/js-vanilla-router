// Router.js
import style from './style.css';
import animate from 'animate.css';

const Router = function() {
  let options = {
    suffix: '§',
    pageClass: 'page',
    linkClass: 'nav-link',
    htmlAttribute: 'data-target',
    pageName: '',
    titleSpacer: '-',
    pageTransition: '',
    pageTransitionDuration: '1000',
    contentTransition: '',
    contentTransitionDuration: '600',
  };
  let pages = [];
  let navLinks = [];
  const show = new Event('show');

  function init(settings) {
    // check user custom settings
    if(settings) {
      for(let key in settings) {
        for(let key2 in options) {
          if(key == key2) {
            if(options[key] != settings[key2]) {
              options[key] = settings[key2];
            }
          }
        }
      }
    }

    // check if user has set pageName
    if(!options.pageName) {
      options.pageName = document.title;
    } else {
      document.title = options.pageName;
    }
    pages = document.querySelectorAll(`.${options.pageClass}`);
    navLinks = document.querySelectorAll(`.${options.linkClass}`);

    // set first page to active
    pages[0].classList.add('active');

    // loop all pages
    pages.forEach(pg => {
      pg.addEventListener('show', pageShown);
      if(options.pageTransition) {
        pg.classList.add('animated', options.pageTransition);
        pg.style.animationDuration = `${options.pageTransitionDuration}ms`;
      }
      if(options.contentTransition) {
        pg.childNodes[1].style.animationDelay = `${options.pageTransitionDuration}ms`;
        pg.childNodes[1].classList.add('animated', options.contentTransition);
      }
    });

    // loop all nav-links
    navLinks.forEach(link => {
      link.addEventListener('click', nav);
    });

    let hash = location.hash.replace('#', '');
    if(hash) {
      navigate(hash);
    }
    window.addEventListener('popstate', poppin);

    return 'routerinit'
  }

  function nav(e) {
    e.preventDefault();
    const currentPage = e.target.getAttribute(options.htmlAttribute);
    navigate(currentPage);
  }

  function pageShown(e) {
    console.log('Page,', e.target.id, 'shown');
  }

  function poppin(e) {
    const hash = location.hash.replace('#', '');
    navigate(hash);
  }

  function navigate(target) {
    const oldPage = document.querySelector('.active');
    const newPage = document.getElementById(target);

    if(newPage === oldPage) {
      // scroll top when page is the same
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if(oldPage) {
      if(options.pageTransition) {
        oldPage.classList.add('page-passiv');
      }
      history.pushState({}, target, `#${target}`);
    }

    window.scrollTo({ top: 0 });

    if(!newPage) {
      // nav to 404
      console.log('not found');
    } else {
      document.title = `${options.pageName} ${options.titleSpacer} ${target.charAt(0).toUpperCase()}${target.slice(1)}`;
      newPage.classList.add('active');
      newPage.dispatchEvent(show);

      // wait until new page is loaded
      if(oldPage) {
        if(options.pageTransition) {
          setTimeout(() => {
            oldPage.classList.remove('active', 'page-passiv');
          }, options.pageTransitionDuration);
        } else {
          oldPage.classList.remove('active', 'page-passiv');

        }
      }
    }
  }

  return {
    init,
    navigate
  }
};

module.exports = new Router();
// module.exports = Router;
