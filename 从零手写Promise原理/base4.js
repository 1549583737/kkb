let Promise = require('./promise');

let p = new Promise((resolve, reject)=> {
    resolve('hello');
})
let p1 =  new Promise((resolve, reject)=>{
    reject('hello');
})

// 穿透 不传或传null
p.then(null).then().then().then((data)=>{
    console.log(data);
})
p.then(function(data) {
    return data
}).then(function(data) {
    return data
}).then(function(data) {

})
p.then(null, function(err) {
    throw err
}).then().then().then((null, (err)=>{
    console.log(err);
}))