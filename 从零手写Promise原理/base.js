// 什么是promise 解决哪些问题的 (基于回调)
// 1. 回调地狱 (代码不好维护，错误处理非常的麻烦不能统一处理错误)
// 2. 多个请求的并发问题 (之前写的并发读取文件，自己定义定时器)

// 1.Promise 是一个类 类只需要用的时候new 一下
// 2.在 new Promise是需要传递一个执行器函数，executor 这个函数默认就会被执行 立即执行
// 3.每个promise都有三个状态 pending 等待状态 fulfilled 成功状态 rejected 失败状态
// 4.默认创建一个promise 是等待状态 默认提供给你两个函数 resolve 让promise变成成功状态，reject让promise变成失败状态
// 5.每个promise的实例都具备一个then方法 then方法中传递两个函数 1.成功的回调 2.失败的回调
// 6. 如何让promise变成reject() // 可以抛出一个错误
// 7. 如果多次调用成功或者失败 只会执行第一次，一旦状态变化了 就不能子啊变成成功或者失败了

// 1. 自己实现基本的promise
// 2.语法 commonjs 规范 我们可以在一个模块中导出一个变量, 另一个模块来引用变量
let Promise = require('./promise');
let promise = new Promise((resolve, reject)=>{
    // resolve('value');
    // throw new Error('我失败了');
    // reject('reason');
    setTimeout(()=>{ // 异步的
        resolve('value') // 此时如果调用了resolve 就让刚才存储的成功的回调用函数执行
    }, 1000);
})
// 同一个promise实例 可以then多次
// 核心就是发布订阅模式
promise.then((success)=>{ // 如果调用then的时候没有成功也没有失败，我可以先保存成功和失败的回调
    console.log('success', success);
},(err)=>{
    console.log('fail',err);
})


// $.ajax({
//     success:()=>{
//         $.ajax({
//             success: ()=>{
//                 $.ajax({
//                     success: ()=>{

//                     }
//                 })
//             }
//         })
//     }
// })