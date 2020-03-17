// Promise.all
const fs = require('fs'); // fs 是一个node中 file system 有文件的读写操作
// 有异步的api (异步是要等待同步的代码执行完成之后 才会执行)
// node中异步方法都有回调 并发 同时去读取文件，读取完毕的实机不一样
// 并发 两个操作互不影响
const after = (times, fn) => ()=> --times == 0 && fn();

let out = after(2, ()=>{ // 并发的解决核心就是靠定时来维护    
    console.log(renderObj)
})

function after2(times, say) {
    let renderObj = {};
    
    return function (key, value) {
        renderObj[key] = value;
        if (--times == 0) {
            say(renderObj);
        }
    }
    
}

let renderObj = {};
// node中异步方法都有回调
fs.readFile('./name.txt', 'utf8', function(err, data) {
    renderObj.name = data;
    out();
    out2('name', after2)
})
fs.readFile('./age.txt', 'utf8', function(err, data) {
    renderObj.age = data;
    out();
    out2('name', after2)
})

// console.log(renderObj);
// console.log('hello');
