/*
Задание 5
Компания из N человек собирается пойти в байдарочный поход, i-ый человек характеризуется своей массой Mi кг.
На лодочной базе имеется в наличии неограниченное количество одинаковых байдарок.
Каждая байдарка может вмещать одного или двух людей. Байдарки имеют грузоподъемность D кг.
Какое наименьшее количество байдарок придется арендовать компании, чтобы всем отправиться в поход?

## Input
N: number[]; // array of people weights
D: number; // array of people weights

## Output
kayakAmount: number;

## Example

```jsx
// Ex. 1
findKayakAmount([50, 74, 60, 82], 135);

// Ex. 2
findKayakAmount([50, 120, 74, 60, 100, 82], 135);*/

"use strict";

function findKayakAmount(peopleWeights, kayakCapasity) {

    peopleWeights.sort((a, b) => b - a);
    let numberOfKayak = 0;

    for (let i = 0; i < peopleWeights.length; i++) {

        if (peopleWeights[i] + peopleWeights[peopleWeights.length - 1] > kayakCapasity) {
            numberOfKayak++;
        } else {
            numberOfKayak++;
            peopleWeights.pop();
        }
    }

    return numberOfKayak;
}

console.log(findKayakAmount([50, 74, 60, 82], 135));
console.log(findKayakAmount([50, 120, 74, 60, 100, 82], 135));