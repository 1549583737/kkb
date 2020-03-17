// 函数柯里化(高阶函数)AOP
// 函数柯里化一定会导致闭包吗？

// 判断一个变量的类型
// 判断类型 有四种方式 constructor instanceof typeof Object.prototype.toString.call
// function checkType(content, type) {
//     return Object.prototype.toString.call(content) === `[object ${type}]`
// }
// let bool = checkType('hello', 'String');
// console.log(bool);
// 什么叫函数柯里化 把一个函数的范围进行缩小 让函数变的更具体一些
// 在函数内定义在执行
// 函数闭包: 在当前作用域下定义在外界作用域下调用

function checkType(type) {
    // 私有化，这个函数 可以拿到上层函数的参数，这个空间不会被释放掉 因此第一次调用时String 被保存在了当前作用域下
    return function(content) {
        // [object String] [object Number] [object Boolean]
        return Object.prototype.toString.call(content) === `[object ${type}]`
    }
}

let isString = checkType('String');
let flag = isString('aaa');
console.log(flag);

// 通用的函数柯里化 我希望可以分开传递参数
function checkType(content, type) {
    return Object.prototype.toString.call(content) === `[object ${type}]`
}

// 如何实现通用的函数柯里化
const add = (a,b,c,d,e) => {
    return a + b + c + d + e
}
const curring = (fn, arr = []) => {
    let len = fn.length; // 长度指代的是函数的参数个数
    return (...args)=>{ // 保存用户传入的参数
        arr = arr.concat(args)
        if (arr.length < len) { // 通过传递的参数 不停地判断是否达到函数执行的参数个数
            return curring(fn, arr)
        }
        return fn(...arr); // 如果达到了执行个数之后 会让函数执行
    }
}

const curring2 = (fn, arr=[]) => {
    let len = fn.length; // 长度指代的是函数的参数个数

    return (...args)=>{ // 保存用户传入的参数
        arr = [...arr, ...args] // 扁平化
        if (arr.length < len) { // 通过传递的参数 不停地判断是否达到函数执行的参数个数
            return curring(fn, arr)
        }
        return fn(...arr); // 如果达到了执行个数之后 会让函数执行
    }
}
console.log(curring(add)(1)(2)(3)(4)(5));
console.log(curring2(add,[1,2])(3,4)(5));


// 通用的函数柯里化 我希望可以分开传递参数
// 分批传递参数
function checkType2(type, content) {
    return Object.prototype.toString.call(content) === `[object ${type}]`
}
let util = {};
['Number', 'String', 'Boolean'].forEach((item)=>{
    util['is' + item] = curring(checkType2)(item)
})
let r = util.isString('hello');
let b = util.isBoolean(true)
console.log(r,b);

// 函数反柯里化  是让一个函数的范围变大
// Object.prototype.toString
// toString
//Vue中 编译 属性处理 公共库使用的时候用到了柯里化
