"use strict";

function generateVolumes(pages, amountOfTom) {

    let sumPages = pages.reduce((acc, elem) => acc + elem, 0);
    let averagePages = sumPages / amountOfTom;


    //функция смотрит возможно ли заданное количество глав с посчитанным average Pages
    function iterationStep(averagePages) {

        let copyPages = [...pages];
        let tomes = [];

        copyPages.forEach((element, index) => {
            if (element + copyPages[index + 1] < averagePages) {
                copyPages[index + 1] += element;
            } else {
                tomes.push(element)
            }
        });

        if (tomes.length === amountOfTom) {

            return Math.max(...tomes);
        }
        else return iterationStep(averagePages + 1); //если количество томов не совпадает с заданным в условии делаем следующий шаг с увеличенным averagePages
    }

    return iterationStep(averagePages);
}

console.log(generateVolumes([1, 2, 1, 1], 3));