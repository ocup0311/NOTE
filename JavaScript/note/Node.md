# Node.js

## V8 Javascript Engine

#### 1. Processors, Machine Language, and C++

- microprocessor
  - 使用 Machine code (Machine language)
    - 現流行的有：IA-32 or x86-64 or ARM or MIPS
- JavaScript or Java were inspired by what's called **C syntax**
- **V8** (the Javascript engine) is written in C++
- **Node** (add onto V8) is also written in C++
- Level of Abstraction:
  - JS
  - C/C++ (feature-filled programming language)
  - Assembly language (組合語言)
  - Machine code
    ![Level of Abstraction](../image/Node/Level_of_Abstraction.png)(箭頭反過來？)
    [ref](https://www.udemy.com/course/understand-nodejs/learn/lecture/3453110)
- JS --> machine code
  - C++ is compiled into machine code by a C++ compiler.
  - V8 is written in C++. It converts JS directly to machine code.
  - NodeJS lets JS get access to extra functionality written in C++.

#### 2. Javascript Engines and The ECMAScript Specification

- ECMAScript is the standard specification that says how the JS should work.

#### 3. V8

- V8 is used in Chrome and in Node.js, among others. It implements ECMAScript and WebAssembly, and runs on Windows 7 or later, macOS 10.12+, and Linux systems that use x64, IA-32, ARM, or MIPS processors.
- 可以將 V8 嵌入 C++ application，即可用 C++ 開發更多功能給 JS 使用。(ex. fs)
- [How to JIT(Just In Time)](https://eli.thegreenplace.net/2013/11/05/how-to-jit-an-introduction)

## Servers and Clients
