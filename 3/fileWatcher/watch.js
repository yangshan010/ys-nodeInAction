const events= require('events')
const util = require('util')
const fs = require('fs')
const watchDir = './watch'
const processDir = './done2'
// function Watcher (watchDir,processDir) {
//     this.watchDir = watchDir;
//     this.processDir = processDir
// }
// util.inherits(Watcher,events.EventEmitter); //Wachter.prototype = new events.EventEmitter()  inherits node 自带的 继承 
// Watcher.prototype.watch = function() {
//     // 拓展EventEmitter，添加处理文件的方法
//     const watcher = this
//     fs.readdir(this.watchDir,function(err,files) {
//         if (err) throw err;
//         for (let index in files) {
//             watcher.emit('process',files[index])  // 处理watch目录中的所有文件
//         }
//     })
// }
// Watcher.prototype.start = function () {
//     // 拓展EventEmitter，添加开始监控方法
//     const watcher = this
//     fs.watchFile(watchDir,function (){  // 所有这个目录中的文件有发生变化时，出发watch  fs.watchFile就是监听函数
//         watcher.watch()
//     })
// }
// var  watcher = new Watcher(watchDir,processDir)
// watcher.on('process',function (file) {
//     var watcheFile = this.watchDir + '/'+ file
//     var processFile = this.processDir + '/'+ file.toLowerCase()
//     console.log('processFile=====>',processFile)
//     fs.rename(watcheFile,processFile,function (err) {
//         if (err) throw err;
//         console.log('文件移动成功')
//     })
// })
// watcher.start()
function Watcher (watchDir,processDir) {
    this.watchDir = watchDir
    this.processDir = processDir
}
util.inherits(Watcher,events.EventEmitter)
Watcher.prototype.start = function () {  // 添加监听
    const watcher = this
    fs.watchFile(this.watchDir,function (files) {
        console.log('<=======检查到文件变化=======>',files)
        watcher.watch()
    })
}
Watcher.prototype.watch = function () {  // 发送emit
    const watcher = this
    fs.readdir(this.watchDir,function (err,files) {
        console.log('<=======开始读取文件=======>',files.toString())
        if (err) throw err;
        for (let index in files) {
            watcher.emit('process',files[index])
        }
    })
    console.log('测试读取文件是否是异步的')
}
const watcher = new Watcher(watchDir,processDir)
watcher.on('process',function (file)  {  
    /**
     * 1:获取观察的文件路径
     * 2：更改后的路径
     * 3:调用fs.rename
    */
    const watchFile = this.watchDir +'/' +file
    const processFile = this.processDir + '/'+ file.toLowerCase()
    fs.rename(watchFile,processFile,function(err) {
        if (err) throw  error 
        console.log('<=======文件移动成功=======>')
    })
})
watcher.start()