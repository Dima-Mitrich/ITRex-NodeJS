"use strict";

function setABS(num) { console.log(`ABS:${num}`) };
function setTraction(num) { console.log(`Traction Control:${num}`) };
function setStability(num) { console.log(`Stability Control:${num}`) };

function setSameCarSettings(num) {
    setABS(num);
    setTraction(num);
    setStability(num);
}

function beginner() {
    setSameCarSettings(5);
}

function goodDriver() {
    setSameCarSettings(3);
}

function maniac() {
    setSameCarSettings(1);
}

beginner();
console.log('*********************');
goodDriver();
console.log('*********************');
maniac();