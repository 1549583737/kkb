let fs = require('fs');
// Q.deferred 可以帮我们产生一个延迟对象
let Promise = require('./promise');
function read() { // promise 为了解决嵌套问题
    let dfd = Promise.deferred();
    // return new Promise((resolve, reject)=>{
        fs.readFile('name.txt', 'utf8', function(err, data) {
            if (err) {
                dfd.reject(err);
            }
            dfd.resolve(data);
        })
        return dfd.promise;
    // })
}
// read().then(data=>{
//     console.log(data);
// })
// promise 中的catch
read().catch(err=>{
    console.log(err);
})