"use strict";

class StringFormatter {

    removeNonUniqueChars(str) {
        let setString = new Set(str);
        let arrayString = [...setString];

        return arrayString.join('');
    }
}



class StringFormatterDeleteNumbers extends StringFormatter {

    removeNonUniqueChars(str) {
        let numberSet = new Set();
        let strArr = str.split('');

        let filtredStr = strArr.filter((elem) => {
            if (!Number.isNaN(+elem)) {

                if (numberSet.has(+elem)) {
                    return false;
                }
                else {
                    numberSet.add(+elem);
                    return true;
                }

            } else {

                return true;
            }
        })

        return filtredStr.join('');
    }
}



class StringFormatterDeleteDates extends StringFormatter {

    removeNonUniqueChars(str) {
        let reg = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/g;
        let dataArr = str.match(reg);
        let uniqDateArr = Array.from(new Set(dataArr));

        uniqDateArr.forEach(elem => {

            let startIndex = str.indexOf(elem);

            str = str.replace(new RegExp(elem, 'g'), (match, offset) => {

                if (offset !== startIndex) {
                    return '';
                }
                else {
                    return elem;
                }
            })
        })

        return str;
    }
}



class StringFormatterDeleteRegExp extends StringFormatter {

    constructor(strToDelete) {
        super();
        this.reg = new RegExp(strToDelete, 'g');
    }

    removeNonUniqueChars(str) {
        let strArray = str.match(this.reg);
        let uniqStrArray = Array.from(new Set(strArray));

        uniqStrArray.forEach(elem => {

            let startIndex = str.indexOf(elem);

            str = str.replace(new RegExp(elem, 'g'), (match, offset) => {

                if (offset !== startIndex) {
                    return '';
                }
                else {
                    return elem;
                }
            })
        })

        return str;
    }
}



let stringFormatter = new StringFormatter;
let stringFormatterDeleteNumbers = new StringFormatterDeleteNumbers;
let stringFormatterDeleteDates = new StringFormatterDeleteDates;
let stringFormatterDeleteRegExp = new StringFormatterDeleteRegExp('abc');

console.log(stringFormatter.removeNonUniqueChars('abcaabcbabcbabcbabbbccbaaabf'));
console.log(stringFormatterDeleteNumbers.removeNonUniqueChars('abc1211'));
console.log(stringFormatterDeleteDates.removeNonUniqueChars('07/01/2000 abc 07/01/2000 123 07/01/2000 lorem 07/01/2000 02/03/1995'))
console.log(stringFormatterDeleteRegExp.removeNonUniqueChars('abc cde abc defg abc 34 abc sdrf'));

