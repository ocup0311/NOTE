"use strict";
const myName = 'Ocup';
let age = 18;
let nothingLiterally = null;
let isMarried = false;
let nothing = undefined;
// 一開始 x 被 assign 為 undefined
let x;
console.log(x);
x = 1;
console.log(x);
x = 'test';
console.log(x);
// 一開始 y 還沒被 assign，則不能 use y
// let z: string
let y;
y = 'test';
console.log(y);
//
let info = {
    name: 'Maxwell',
    age: 20,
    hasPet: undefined,
    obj: {
        x: 1,
        y: '1',
    },
};
// 似乎無法之後再指定型別？
let e;
e = 1;
e = 'asdf';
console.log(e);
//
let obj3 = { hello: 'Another World' };
let obj4 = Object.assign(obj3, {
    goodbye: 'Cruel World',
});
console.log(4444, obj4);
//
let obj6;
obj6 = {
    x: '1',
    y: '2',
};
let obj7;
obj7 = {
    x: '1',
    y: '2',
};
console.log(6666, obj6);
console.log(7777, obj7);
