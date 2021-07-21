"use strict";

function crasher(a) {
    delete a.bla;
}

const a = {
    bla: 'bla',
};

// начало блока изменений
{
    let a = {};
    crasher(a);
};
// конец блока изменений

console.log(a);