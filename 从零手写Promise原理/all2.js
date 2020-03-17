// Promise.all 方法表示等待所有的promise全部成功后 才会执行回调 如果有一个promise失败则Promise.all失败
let fs = require('fs').promises
// promise 化把异步的node中的api转化成promise方法 只针对node方法
function promisify(fn) {
    return function(...args) {
        return new Promise((resolve, reject)=>{
            fn(...args, function (err, data) {
                if (err) reject();
                resolve(data)
            })
        })
    }
}


// 我们可以将node中的api 转换成promise的写法
fs.readFile('name.txt','utf8').then((data)=>{
    console.log(data)
})



let fs2 = require('fs');
// promise 化把异步的node中的api转化成promise方法 只针对node方法
let util = require('util');
let read = util.promisify(fs2.readFile)
read('name.txt', 'utf8').then(data=>console.log(data));

// 各种node模块只要遵循这个参数合理 =>将异步方法转化成promise


let fs3 = require('fs').promises;
// Promise.all 方法表示等待所有的promise全部成功后，才会执行回调
// 如果有一个promise失败则promise就失败了
const isPromise = value => {
    if ((typeof value === 'object') && value !== null || typeof value === 'function' ) {
        return typeof value.then === 'function'
    } 
    return false;
}
Promise.all = function(promises) {
    return new Promise((resolve, reject)=>{
        let arr = []; // 返回的数组
        let i = 0;

        let processData = (index, data)=>{
            arr[index] = data;
            if (++i === promises.length) {
            // if (arr.length === promises.length) {
                resolve(arr);
            }
        }
        for(let i = 0; i < promises.length; i++) {
            let current = promises[i];
            if (isPromise(current)) {
                current.then((data)=>{
                    processData(i, data)
                })
            } else {
                processData(i , current)
            }
        }
    })
}

Promise.all([
    1,
    2,
    3,
    fs.readFile('name.txt'),
fs.readFile('age.txt', 'utf8')
]).then((values)=>{
    console.log(values);
}, err=>{
    console.log(err);
})

// Promise.race()赛跑
Promise.race([fs.readFile('name1.txt', 'utf8'), 
fs.readFile('age.txt', 'utf8').then((values)=>{
    console.log(values);
}, err=>{
    console.log(err);
})
]); // 先到先得
// promise.finally 不是类上的方法
new Promise((resolve,reject)=>{
    // resolve(100);
    // reject('hello100');
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve();
            // finally也是一个then方法
        }, 1000)
    })
}).finally((hello)=>{ // 无论成功和失败都会执行的方法, 如果finally中反悔了一个promise会等promise执行完成后继续执行
    console.log(hello);
}).then(data=>{
    console.log('success'+data)
}).catch(err=>{
    console.log(err);
})

// 3.Promise.resolve //Promise.reject 创建成功或创建失败的promise
// 把今天的内容好好的整理下（必会的）