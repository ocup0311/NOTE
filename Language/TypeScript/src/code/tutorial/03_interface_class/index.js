"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
// 1. class 基本
;
(() => {
    class CustomPersonInfo {
        //建構子函式
        constructor(name, age, hasPet = true) {
            this.hasCar = true;
            this.name = name;
            this.age = age;
            this.hasPet = hasPet;
        }
        printInfo() {
            console.log(`Name: ${this.name}. Age: ${this.age}. Owns a pet? ${this.hasPet}.`);
        }
    }
    const obj1 = new CustomPersonInfo('Ocup', 23);
    const obj2 = new CustomPersonInfo('Ocup');
})();
(() => {
    class C {
        m1() {
            return '1';
        }
        m2() {
            return '1';
        }
    }
    const fn = () => {
        return 1;
    };
})();
(() => {
    class C1 {
        fn1(p1) { }
        fn2(p1) { }
        fn3(p1) { }
    }
    // Error2: 繼承至 interface 的 method 不能被定為 private、protected
    class C3 {
        fn1(p1) { }
    }
    // 繼承至 interface 的 method 只能被定為 public
    class C4 {
        fn1(p1) { }
    }
})();
(() => {
    var _C1_d;
    class C1 {
        constructor(a, b, c, d) {
            _C1_d.set(this, void 0);
            this.a = a;
            this.b = b;
            this.c = c;
            __classPrivateFieldSet(this, _C1_d, d, "f");
        }
    }
    _C1_d = new WeakMap();
    const x = new C1('a', 'b', 'c', 'd');
    console.log(x.a); // error
    console.log(x.b); // b
    console.log(x.c); // error
    console.log(x.); // error
    const y = JSON.parse(JSON.stringify(x));
    console.log(y.a); // a
    console.log(y.b); // b
    console.log(y.c); // c
    console.log(y.); // error
    // class CashMachine implements TransactionSystem, AccountSystem {}
})();
(() => {
    class C1 {
        constructor(a) {
            this.a = a;
        }
    }
    class C2 {
        constructor(a) {
            this.a = a;
        }
    }
    class C100 {
        constructor(a, b, c) {
            this.a = a;
            this.b = b;
            this.c = c;
        }
        fn1(p1) { }
    }
    // class CashMachine implements TransactionSystem, AccountSystem {}
})();
(() => { })();
(() => {
    class CashMachine {
        constructor(users) {
            this.users = users;
            // this.users = users
            this.currentUser = { account: '', password: '', money: 1 };
        }
        signIn(account, password) {
            console.log(this.users, this.currentUser, this.x);
        }
        signOut() { }
        deposit(amount) { }
        withdraw(amount) { }
    }
    // class CashMachine implements TransactionSystem, AccountSystem {}
})();
