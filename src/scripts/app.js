"use strict";

const age = document.querySelector('.age');

const random = (max,min) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
age.innerHTML = random(9,0);
