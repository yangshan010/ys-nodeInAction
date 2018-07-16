const http = require('http')
/**
 * 创建http 服务器要调用createServer，只接受一个参数，是个回调函数，服务器每次收到http请求后都会跳用这个回调函数，
 * 
 * 
 * 
 * node不会往客户端主动写任何响应，在调用完请求回调函数之后，主动发送res.end() 方法结束响应。
*/
const server = http.createServer(function (req,res) {
    // res.end('hello word')
    var url = 'http://www.baidu.com'
    var body = `<p>readirecting to <a href= ${url}>${url}</a></p>`
    res.setHeader('Location',url)
    // res.setHeader('Content-Length',url.length)
    res.setHeader('Content-Type','text/html')
    res.statusCode = 302
    res.end(body)
    
})
server.listen(3000)