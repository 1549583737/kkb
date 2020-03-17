let Promise = require('./promise')

let p = new Promise((resolve, reject)=>{
    resolve(new Promise((resolve, reject)=>{ // 去这个promise的成功的结果
        setTimeout(()=>{
            resolve('hello')
        }, 1000);
    }))
})

p.then((resolve)=>{
    return new Promise((resolve)=>{
        resolve(new Promise())
    })
})


read().catch(err=>{
    console.log(err);
})