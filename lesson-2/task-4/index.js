"use strict";

function oddMagicSquare(n) {

    let magicSquareArr = new Array(n);

    for (let i = 0; i < n; i++) {
        magicSquareArr[i] = new Array(n);
    }

    let middle = Math.floor(n / 2);
    let i = 0;
    let j = middle;

    for (let a = 1; a <= n * n; a++) {

        magicSquareArr[i][j] = a;

        let test_i = i
        test_i -= 1;

        let test_j = j;
        test_j += 1;

        if (test_i < 0) {
            test_i = n - 1;
        }

        if (test_j > n - 1) {
            test_j = 0;
        }

        if (magicSquareArr[test_i][test_j]) {
            i = i + 1;
            j = j;
        }
        else if (!magicSquareArr[test_i][test_j]) {
            i = test_i;
            j = test_j
        }
    }

    return magicSquareArr;
}


function evenMagicSquare(n) {

    let magicSquareArr = new Array(n);

    for (let i = 0; i < n; i++) {
        magicSquareArr[i] = new Array(n);
    }
    let a = 1;
    let b = n * n;

    for (let i = 0; i < n; i += 1) {

        for (let j = 0; j < n; j += 1) {

            if (i % 4 === j % 4 || (i + j) % 4 === 3) {
                magicSquareArr[i][j] = b;
            }
            else {
                magicSquareArr[i][j] = a;
            }

            b -= 1;
            a += 1;
        }
    }

    return magicSquareArr;
}


function buildMagicSquare(n) {

    switch (n) {
        case 1:
            return [1];
        case 2:
            return 'Impossible';
        default:
            return (
                n % 2 === 0 ? evenMagicSquare(n) : oddMagicSquare(n)
            );
    }
    
}

console.log(buildMagicSquare(3));
console.log(buildMagicSquare(4));
console.log(buildMagicSquare(5));
console.log(buildMagicSquare(6));
console.log(buildMagicSquare(7));