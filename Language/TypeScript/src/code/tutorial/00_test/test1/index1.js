"use strict";
const message1 = ['Hello, world!', 0];
const array1 = [];
array1.push(1);
array1.push('1');
const array2 = [];
array2.push(null);
array2.push('null');
array2.push(null);
console.log(array1, array2);
const fn1 = (input) => {
    let output = 1;
    if (input)
        output = input;
    return output;
};
fn1('false');
function fn2() { }
const loggedInUsername = 'Oby';
const users = [
    { name: 'Oby', age: 12 },
    { name: 'Heera', age: 32 },
];
const loggedInUser = users.find((u) => u.name === loggedInUsername);
console.log(loggedInUser.age);
