console.log('---------- my ----------');
// 宏 为了快捷而使用
const PENDING = 'PENDING'; // 等待态
const FULFILLED = 'FULFILLED'; // 成功态
const REJECTED = 'REJECTED' // 失败态

Object.defineProperty(x. then, {
    i: 0,
    get() {
        // setTimeout(()=>{
        //     resolve()
        // }, 0);
        // throw new Error();
        // this.i++
        // if (this.i == 2) {
        //     new Error('错误');
        // }
    }
})



const resolvePromise = (promise2, x, resolve, reject)=>{
    // 判断可能你的promise要和别人的promise来混用
    // 可能不同的promise库之间要相互调用
    // let promise2 = promise.then(data=>{return promise2})
    // promise2.then(data=>{console.log('success', data)}, err=>{console.log('-----', err)});
    // 这种情况报错
    if (promise2 === x) { 
        // x 如果和promise2是同一个人 x永远不能成功或者失败，所以就卡死了，我们需要直接报错即可
        // 不能自己等待自己返回
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
    }
    // ------ 我们要判断x的状态 ------
    //  1. 先判断他是不是对象或者函数
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        // x 需要是一个对象或者是函数
        let called; // 为了考虑别人的promise不健壮所以我们需要自己去判断一下，如果调用失败不能成功，调用成功不能调用失败，不能多次调用成功和失败
        try {
            let then = x.then; // 取出then方法 这个then方法是采用defineProperty来定义的
            if (typeof then === 'function') {
                // 判断then是不是一个函数，如果then 不是一个函数 说明不是 promise
                // 只能认准他是一个promise了
                // x.then(()=>{})
                then.call(x, (y)=>{ // 如果x是一个promise 就采用这个promise的返回结果
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject); // 继续解析成功的值
                },(r)=>{ 
                    if (called) return;
                    called = true;
                    reject(r); // 直接用r 作为失败的结果
                });
                // x.then(()=>{},()=>{})
            } else {
                // x = {then: '123'}
                resolve(x);
            }
        }catch(e) {
            if (called) return;
            reject(e); // 取then失败了 直接触发promise2的失败逻辑
        }
    } else {
        // 肯定不是promise
        resolve(x)
    }
}

class Promise {
    constructor(executor) {
        this.status = PENDING; // 默认是等待态
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = []; // 存放成功的回调
        this.onRejectedCallbacks = []; // 存放失败的回调
        // 只有状态是等待态的时候 才可以更新状态
        let resolve = (value) => {
            if (value instanceof Promise) { // 直到解析出一个普通值来
                return value.then(resolve,reject);
            }
            if (this.status == PENDING) { // 很重要
                this.status = FULFILLED;
                this.value = value;
                this.onResolvedCallbacks.forEach(fn=>fn());
            }
        }
        let reject = (reason) => {
            if (this.status == PENDING) { // 很重要
                this.status = REJECTED;
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn=>fn());
            }
        }
        // executor 执行的时候 需要传入两个参数，给用户来改变状态的
        try{
            executor(resolve, reject);
        }catch(e) {// 表示当前有异常，那就使用这个异常作为promise失败的原因
            this.reject(e) 
        }
    }
    // 只要x是一个普通值 就会让下一个promise变成成功态
    // 这个x有可能是一个promise
    then(onFulfilled, onRejected) {
        // 可选参数的处理
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
        onRejected = typeof onRejected === 'function' ? onRejected : err => {throw err}
        // 递归
        let promise2 = new Promise((resolve, reject)=>{
            if (this.status === FULFILLED) {
                setTimeout(()=>{
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2,x,resolve,reject);
                    }catch(e) {
                        reject(e);
                    }
                }, 0)
            }
            if (this.status === REJECTED) {
                try{
                    setTimeout(()=>{
                        let x = onRejected(this.reason)
                        resolvePromise(promise2,x,resolve,reject);
                    }, 0) 
                }catch(e){
                    reject(e);
                }
            }
            if (this.status === PENDING) {
                this.onResolvedCallbacks.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2,x,resolve,reject);
                        }catch(e){
                            reject(e);
                        }
                    }, 0)
                });
                this.onRejectedCallbacks.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x = onRejected(this.reason);
                            resolvePromise(promise2,x,resolve,reject);
                        }catch(e){
                            reject(e);
                        }
                    }, 0)
                });
            }
        })

        return promise2;
    }
    catch(errCallback) { // 就是一个没有成功的then
        return this.then(null, errCallback)
    }
}

// 静态方法，类上的方法
Promise.deferred = function() { // 产生以一个延迟对象
    let dfd = {};
    dfd.promise = new Promise((resolve, reject)=>{
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd;
}

// npm i promises-aplus-tests -g
// promises-aplus-tests promise.js
module.exports = Promise
