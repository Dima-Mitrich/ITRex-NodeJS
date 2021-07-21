"use strict";

const foo = (function () {
    let accumVal = 0;
    let addVal = 2;

    return function () {
        if (accumVal % 5 === 0 && accumVal) {
            addVal = 3;
            accumVal /= 5;

            return accumVal;
        }
        
        else if (accumVal % 7 === 0 && accumVal) {
            addVal = 1;
            accumVal -= 7;

            return accumVal;
        } 
        
        else return accumVal += addVal;
    }
}());

foo();
foo();
console.log(foo());