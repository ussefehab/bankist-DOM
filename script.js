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
