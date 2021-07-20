"use strict";

const foo = (function () {
    let num = 0;
    let i = 2;

    return function () {
        if (num % 5 === 0 && num) {
            i = 3;
            num /= 5;
            return num;
        } else if (num % 7 === 0 && num) {
            i = 1;
            num -= 7;
            return num;
        } else return num += i;
    }
}());

foo();
foo();
console.log(foo());