let fs = require('fs');

// 有关联的请求 需要先通过第一个读取操作拿到返回结果，通过这个结果再去读取另一个文件
// 上一个人的输出是下一个人的输入

// fs.readFile('./name.txt', 'utf8', function (err, data) {
//     fs.readFile(data, 'utf8', function(err, data) {
//         console.log(data);
//     })    
// })
function read(...args) {
    return new Promise((resolve, reject)=>{
        fs.readFile(...args, function (err, data) {
            if (err) {
                reject(err)
            }
            resolve(data);
        })
    })
}

// 普通值 成功的promise
// 抛出异常 失败的promise


// promise 是通过 链式调用的方式解决了这个问题

// 成功的回调和失败的回调都可以返回一个结果
// 情况1: 如果返回的是一个promise, 那么会让这个promise执行，并且采用他的状态，将成功或失败的结果传递给 外层的下一个then中
// 情况2: 如果返回的是一个普通值会把这个值作为外界的下一次then的成功的回调中
// 情况3: 抛出一个异常
read('name.txt', 'utf8').then((data)=>{
    read(data, 'utf8').then(data=>{
        console.log(data);
    })
})

read('name.txt', 'utf8').then((data)=>{
    return read(data + '1', 'utf8')
}).then((data)=>{
    console.log(data);
}, err=>{
    return 100
}).then(data=>{
    console.log(data); // 我希望让这个then走到下一次then的失败
    throw new Error('error');
}).then(null, (err)=>{
    console.log(err);
}).catch(err=>{
    console.log('只要上面没有捕获错误 就会执行 这个catch', err);
}).then(data=>{
    console.log(data);
})

// promise 如何实现链式调用的 jq返回的this, promise的链式调用 返回一个新的promise