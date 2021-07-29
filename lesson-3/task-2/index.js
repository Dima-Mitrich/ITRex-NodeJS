"use strict";

class Converter {

    toMorze(result) {
        let numArr = result.toString().split('');

        let morzeRes = numArr.map(elem => {

            elem = parseInt(elem);

            switch (elem) {
                case (0):
                    return '-----';
                case (1):
                    return '.----'
                case (2):
                    return '..---';
                case (3):
                    return '...--';
                case (4):
                    return '....-';
                case (5):
                    return '.....';
                case (6):
                    return '-....';
                case (7):
                    return '--...';
                case (8):
                    return '---..';
                case (9):
                    return '----.';
                default:
                    return elem;
            }
        })

        return morzeRes.join('');
    }

    toRomanian(result) {

        let romNum = '';
        let decimals = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
        let roman = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

        decimals.map(function (value, index) {
            while (result >= value) {
                romNum += roman[index];
                result -= value;
            }
        });

        return romNum;
    }
}



class MultiplicationNumbers {

    constructor(converter, resView) {

        this.resView = resView.toLowerCase();
        this.converter = converter;
    }

    calculate(x, y) {
        let result = x * y;

        if (result < 0) {
            console.log("can't convert negative numbers");
            return result;
        }

        switch (this.resView) {
            case ('morze'):
                return this.converter.toMorze(result);
            case ('romanian'):
                return this.converter.toRomanian(result);
            case ('arabian'):
                return result;
            default:
                return result
        }
    }
}


class AdditionNumbers {

    constructor(converter, resView) {

        this.resView = resView.toLowerCase();
        this.converter = converter;
    }

    calculate(x, y) {
        let result = x + y;

        if (result < 0) {
            console.log("can't convert negative numbers");
            return result;
        }

        switch (this.resView) {
            case ('morze'):
                return this.converter.toMorze(result);
            case ('romanian'):
                return this.converter.toRomanian(result);
            case ('arabian'):
                return result;
            default:
                return result
        }
    }
}


class SubtractionNumbers {

    constructor(converter, resView) {

        this.resView = resView.toLowerCase();
        this.converter = converter;
    }

    calculate(x, y) {
        let result = x - y;

        if (result < 0) {
            console.log("can't convert negative numbers");
            return result;
        }

        switch (this.resView) {
            case ('morze'):
                return this.converter.toMorze(result);
            case ('romanian'):
                return this.converter.toRomanian(result);
            case ('arabian'):
                return result;
            default:
                return result
        }
    }
}


class DivisionNumbers {

    constructor(converter, resView) {

        this.resView = resView.toLowerCase();
        this.converter = converter;
    }

    calculate(x, y) {
        let result = x / y;
        result = Math.floor(result);

        if (result < 0) {
            console.log("can't convert negative numbers");
            return result;
        }

        switch (this.resView) {
            case ('morze'):
                return this.converter.toMorze(result);
            case ('romanian'):
                return this.converter.toRomanian(result);
            case ('arabian'):
                return result;
            default:
                return result
        }
    }
}


let converter = new Converter;

let add = new AdditionNumbers(converter, 'romanian');
let sub = new SubtractionNumbers(converter, 'morze');
let mult = new MultiplicationNumbers(converter, 'arabic');
let division = new DivisionNumbers(converter, 'romanian');

console.log(add.calculate(2, 2));
console.log(sub.calculate(5, 3));
console.log(mult.calculate(2, 4));
console.log(division.calculate(8, 2));



