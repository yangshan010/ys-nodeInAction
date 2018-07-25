const config = require('config-lite')(__dirname) // 读取配置用
const Mongolass = require('mongolass')
const monent = require('moment') //  时间格式化工具
const objectIdToTimestamp = require('objectid-to-timestamp')  // 根据id生成时间戳
const mongolass = new Mongolass()

mongolass.connect(config.mongodb)

exports.User = mongolass.model('User',{
    name:{type:'string',require:true},
    password:{type:'string',require:true},
    gender:{type:'string',enum:['m','f','x'],default:'x'}
})
exports.User.index({name:1},{unique:true}).exec()