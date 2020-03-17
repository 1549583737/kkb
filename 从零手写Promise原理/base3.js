let fs = require('fs');
let Promise = require('./promise')
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

let promise = read('name.txt', 'utf8').then(data=>{
    return data; // 如何将data向下传递 就是调用promise2的resolve方法
})
let promise2 = promise.then(data=>{
    // console.log(data);
    // return data;
    // return new Promise((resolve, reject)=>{
    //    resolve('hello');
    //  })
    //return new Promise((resolve, reject)=>{
    //    resolve(new Promise((resolve, reject)=>{
        // setTimeout(()=>{
            // resolove('hello world');
        // })
    //    });
    //  })
    throw new Error('reject')
})
promise2.then(data=>{
    console.log('success', data);
}, err=>{
    console.log('-----', err);
})
// read('name.txt', 'utf8').then((data)=>{
//     return data
// }).then((data)=>{
//     console.log(data)
// })

