const http = require('http')
const fs = require('fs')
const join = require('path').join
const parse = require('url').parse
const root = __dirname

// const server = http.createServer(function (req,res) {
//     var url = parse(req.url)
//     var path = join(root,url.pathname)  //  构建绝对路径
//     var stream = fs.createReadStream(path)
//     // stream.on('data',function (chunk){
//     //     // 将文件数据写到响应中
//     //     res.write(chunk)
//     // })
//     // stream.on('end',function(){
//     //     res.end()
//     // })
//     stream.pipe(res)
//     // 添加错误收集，不然会被一个错误 拖垮整个服务
//     stream.on('error',function(err) {
//         res.statusCode = 500
//         res.end('Internal Server Error')
//     })
// })


//使用fs.stat 检查文件  可以获取到文件的信息
 
const server  = http.createServer(function (req,res) {
    const url = parse(req.url)
    console.log(url.pathname)
    const path = join(root,url.pathname)
    console.log(path)
    fs.stat(path,function(err,stat) {
       if(err) {
           console.log('stat-err',err.code)
        if ('ENOENT' == err.code) {
            res.statusCode = 404
            res.end('Not Found')
        } else {
            res.statusCode = 500
            res.end('Internet Server Error')
        }
       } else {
           var stream = fs.createReadStream(path)
           res.setHeader('Content-Length',stat.size) // 为了节约性能
           stream.pipe(res)
           stream.on('error',function(err){
               res.statusCode = 500
               res.end('Inter Server Error')
           })
       }
    }) 
})

server.listen(5000)