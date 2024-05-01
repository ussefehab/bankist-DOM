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
