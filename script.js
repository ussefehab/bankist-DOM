'use strict';

///////////////////////////////////////
//variables
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const section1 = document.querySelector('#section--1');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const navLinks = document.querySelector('.nav__links');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const imgTargets = document.querySelectorAll('img[data-src]');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight)

// creating the open and close modal
//functions
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
//events
btnsOpenModal.forEach(acc=>acc.addEventListener('click',openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown',function (e) {
if (  e.key==='Escape'&& !modal.classList.contains('hidden')) closeModal();
});

//creating the smooth scroll on learn more btn
btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

//propagation 
navLinks.addEventListener('click',function(e){
  e.preventDefault();
  if (e.target.classList.contains('nav__link')){
    const id =e.target.getAttribute('href');
    // console.log(id);
    document.querySelector(id).scrollIntoView({behavior:'smooth'});
  }
});
//tabs
tabsContainer.addEventListener('click',function (e) {
  const clicked =e.target.closest('.operations__tab');
  //guard clause
  if (!clicked) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  //activate content area
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
})
//menu fade animation
//function
const handelHover =function(e){
  if (e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings =link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el=>{
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;

  
  }
}
nav.addEventListener('mouseover',handelHover.bind(0.5))
nav.addEventListener('mouseout',handelHover.bind(1))

//sticky navigation
//function
const stickyNav = function(entries){
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(stickyNav,
{
  root:null,
  threshold:0,
  rootMargin:`-${navHeight}px`
})

headerObserver.observe(header);

//reveal sections 
const revealSection = function (entries,observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}
const sectionObserver = new IntersectionObserver(revealSection,
{
  root:null,
  threshold:0.15
})
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
//lazy loading images
const loadImg = function(entries,observer){
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  //replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load',function(){
    entry.target.classList.remove('lazy-img');
  })
  observer.unobserve(entry.target);
}
const imgObserver = new IntersectionObserver(loadImg,
{
  root:null,
  threshold:0.1,
  // rootMargin:'-200px'
})
imgTargets.forEach((img => imgObserver.observe(img)));

//slider
const slider=function(){
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  let curSlide = 0;
  const maxSlide = slides.length-1;
  //functions
  const createDots = function(){
    slides.forEach(function(_,i){
      dotContainer.insertAdjacentHTML('beforeend',`<button class="dots__dot" data-slide="${i}"></button>`);
    });
  };

  const activateDot = function(slide){
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach((s,i) => s.style.transform = `translateX(${100 *(i-slide)}%)`);
  };

  const nextSlide =function(){
    if (curSlide===maxSlide){
      curSlide = 0;
    }
    else{
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  } 

  const prevSlide =function(){
    if (curSlide===0){
      curSlide = maxSlide;
    }
    else{
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  } 

  const init = function(){
    goToSlide(0);
    createDots();
    activateDot(0);
  }
  init();

  btnRight.addEventListener('click',nextSlide);
  btnLeft.addEventListener('click',prevSlide); 

}
slider();