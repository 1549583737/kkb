const say = (...args)=>{ // 剩余运算符 可以将参数转换成一个数组
    console.log('说话', args);
}
say(1,3,5) // ...args两种用法 ...args拆开 ...args延展

Function.prototype.before = function(cb) {
    return (...args) => { // 箭头函数中没有this指向
        cb(); // 调用用户提前传入的before方法
        // ... 有两个作用 在函数参数中 叫剩余运算符。展开运算符 有一个函数传送到另一个函数并展开
        this(...args); 
    }
}

let newSay = say.before(function(){
    console.log('before say');
})

newSay('a', 'b', 'c')