"use strict";

function setABS(num) { console.log(`ABS:${num}`) };
function setTraction(num) { console.log(`Traction Control:${num}`) };
function setStability(num) { console.log(`Stability Control:${num}`) };

function setSameCarSettings(num) {
    setABS(num);
    setTraction(num);
    setStability(num);
}

function setBeginnerLevel() {
    console.log('Beginner level: ')
    setSameCarSettings(5);
}

function setGoodDriverLevel() {
    console.log('Good driver level: ')
    setSameCarSettings(3);
}

function setManiacLevel() {
    console.log('Maniac level: ')
    setSameCarSettings(1);
}

setBeginnerLevel();
setGoodDriverLevel();
setManiacLevel();