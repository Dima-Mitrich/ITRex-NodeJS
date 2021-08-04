"use strict";

function magicSquare(n) {
    if (n === 1) return [1];

    if (n === 2) return 'impossible';

    let startArrWithNumbers = [[]];
    let magicSquareArr = new Array(n);

    for (let i = 0; i < n; i++) {
        magicSquareArr[i] = new Array(n);
    }

    (function fillArrWithNumbers() {
        let j = 0;

        for (let i = 1; i <= n * n; i++) {
            startArrWithNumbers[j].push(i);

            if (i % n === 0 && j < n - 1) {
                startArrWithNumbers.push([]);
                j++;
            }
        }
    }());

    let middle = Math.floor(n / 2);

    /*
    (function fillBothDiagonal() {
        for (let i = 0, j = n - 1; i < n, j >= 0; i++, j--) {
            magicSquareArr[i][i] = startArrWithNumbers[i][middle];
            magicSquareArr[j][i] = startArrWithNumbers[middle][i];
        }
    }());*/

    (function () {
        let x = 0;
        let y = middle;

        let z = 1;
        let q = middle;

        for (let i = 0; i < n; i++) {

            if (i % 2 === 0) {
                let a = x;
                let b = y;

                for (let j = 0; j < n; j += 2) {
                    magicSquareArr[i][j] = startArrWithNumbers[a][b];
                    b++;
                    a++;
                }

                x += 1;
                y -= 1;
            }
            else if (i % 2 !== 0) {
                let a = z;
                let b = q;

                for (let j = 1; j < n; j += 2) {
                    magicSquareArr[i][j] = startArrWithNumbers[a][b];
                    a++;
                    b++;
                }

                z += 1;
                q -= 1;
            }
        }
    }());

    /*
    (function () {
        for (let i = 0; i < n; i++) {

            if (i % 2 === 0) {
                let x = middle + 1;
                let y = 0;

                for (let j = 1; j < n; j += 2) {
                    magicSquareArr[i][j] = startArrWithNumbers[x][y];
                    x++;
                    y++;
                    if (x > n - 1) {
                        x = 0;
                    }
                    if (y > n - 1) {
                        y = 0
                    }
                }
            }
            if (i % 2 !== 0) {
                for (let j = 1; j < n; j += 2) {

                }
            }

        }
    }());*/

    console.log(magicSquareArr);
}

magicSquare(7);