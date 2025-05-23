"use strict";

//formulaire

const age = document.querySelector('.age');

const random = (max,min) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
age.innerHTML = random(9,0);

//nav
document.querySelectorAll('.nav__trigger').forEach(function(trigger) {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentElement.classList.toggle('nav--active');
    });
  });

//calendrier