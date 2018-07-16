const http = require('http')
const url = require('url')
let items = [] //用常规的javascript 数组存放数据

const server = http.createServer(function (req,res) {
    switch (req.method) {  // req.method  是请求的方法
        case 'POST':
            var  item = ''
            req.setEncoding('utf-8')
            req.on('data',function(chunk) {
                item += chunk
            })
            req.on('end',function(){
                items.push(item)

                res.end('OK\n')
            })
            break;
        case 'GET':
            var body = items.map(function(item,i) {
                return `${i} ) ${item}`
            }).join(' \n')
            res.setHeader('Content-Length',Buffer.byteLength(body))  // content-length 应该是字节长度，而不是字符长度
            res.setHeader('Content-Type','text/plain;charset="utf-8"')
            let obj = {
                code:200,
                data:body
            }
            console.log(obj)
            res.end(body)
        break;
        case 'DELETE':
            var path = url.parse(req.url).pathname
            var index = parseInt(path.slice(1),10)
            if (isNaN(index)) {
                res.statusCode = 400
                res.end('invalid item id')
            }
             else if (!items[index]) {
                res.statusCode = 404
                res.end('item not found')
            } else {
                items.splice(index,1)
                res.end('OK\n')
            }
            break;
        case 'PUT':
          var path = url.parse(req.url).pathname
          var index = parseInt(path.slice(1),10)
          var item = ''
          if (isNaN(index)) {
              res.statusCode = 400
              res.end('invalid item id ')
          } else if (!items[index]) {
              res.statusCode = 404
              res.end('item nor found')
          } else {
              req.on('data',function(chunk) {
                  item += chunk
              })
              req.on('end',function (){
                  items.splice(index,1,item)
                  res.end('ok')
              })
          }



        
    }
})
server.listen(3000)
