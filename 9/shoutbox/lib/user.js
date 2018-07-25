//  存储用户模型

const redis = require('redis')
const bcrypt = require('bcrypt')
const db = redis.createClient(6379,'120.0.01')
db.on('error',function (err) {
    console.log('Error'+err)
})

module.exports = User

function User(obj) {
    for (let key in obj) {
        this[key] = obj[key]
    }
}
User.prototype.save = function (fn) {
    console.log('12312312 \n')
    if (this.id) {
        this.update(fn)
    } else {
        const user = this;
        db.incr('user:ids',function (err,id) {  //创建唯一id
        console.log('创建id')

            if (err) return fn(err)
            user.id = id
            console.log('创建id成功')
            user.hashPassword(function (err) {  // 设定id 以便保存
                if (err) return fn(err);
                user.update(fn)   // 保存
            })
        })
    }


}
User.prototype.update = function (fn) {
    var user = this
    var id = user.id
    db.set('user:id:'+user.name,id,function (err) { // 用名称索引用户id
        if(err) return fn(err)
        db.hmset('user:'+id,user,function (err) {   // 用redis 哈希存储数据
            fn(err)

        })
    })
}
User.prototype.hashPassword = function (fn) {
    console.log('hashpassword')
    var user = this 
    bcrypt.genSalt(12,function(err,salt) {
        if(err) return fn(err)
        user.salt = salt // 设定盐以便保存
        bcrypt.hash(user.pass,salt,function (err,hash) {
            if (err) return fn (err)
            user.pass = hash
            fn()
        })
    })
}
var tobi = new User({ 
     //创建用户 
       name: 'Tobi23',   pass: 'im a ferret',   age: '2' }); 
     tobi.save(function(err){ 
          //保存用户 
            if (err) {
            console.log('发生错误')  ;   
            return
          } 
          console.log('user id %d', tobi.id); });
