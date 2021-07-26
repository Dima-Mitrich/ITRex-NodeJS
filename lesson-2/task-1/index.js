"use strict";

function bulbs(numberOfBulbs, inversArr) {

    let bulbArr = new Array(numberOfBulbs).fill(false);

    for (let i of inversArr) {
        for (let j = i - 1; j < numberOfBulbs; j += i) {
            bulbArr[j] = !bulbArr[j]
        }
    }

    return bulbArr.filter((elem) => elem).length
}

console.log(bulbs(172, [19, 2, 7, 13, 40, 23, 16, 1, 45, 9]));

