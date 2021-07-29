/*Нужно сделать N копий одного документа. 
В нашем распоряжении две копировальные машины, одна из которых копирует лист за х секунд, вторая – за y секунд. 
(Разрешается использовать как один ксерокс, так и оба одновременно. Можно копировать не только с оригинала, но и с копии.) 
Помогите ей выяснить, какое минимальное время для этого потребуется.*/

"use strict";

function copy(numberOfCopy, xerox1, xerox2) {

    let fastestXerox = Math.min(xerox1, xerox2);
    let slowestXerox = Math.max(xerox1, xerox2);

    let totalTime = 0;

    //делаем первую копию на быстром ксероксе
    totalTime += fastestXerox;
    numberOfCopy -= 1;

    while (numberOfCopy > 0) {

        totalTime++;

        if (totalTime % fastestXerox === 0) {
            numberOfCopy -= 1;

            if (numberOfCopy === 0) break;
        }

        if (totalTime % slowestXerox === 0) {
            numberOfCopy -= 1
        }
    }

    return totalTime;
}

console.log(copy(5, 1, 2)); //4
console.log(copy(4, 1, 1)); //3