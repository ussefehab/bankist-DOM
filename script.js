'use strict';

///////////////////////////////////////
//variables
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');


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
