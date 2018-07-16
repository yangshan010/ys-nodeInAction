const http = require('http')
const fs = require('fs')

const server = http.createServer(function(req,res){
    if(req.url == '/') {
        fs.readFile('./title.json',function(err,data) {
            if (err) {
                console.log('读取文件失败')
                res.send('Server Error')
            } else {
                // console.log(data.toString())
                const titles = JSON.parse(data.toString())
                fs.readFile('./temp.html',function(err,data) {
                    if (err) {
                        console.log('文件读取失败')
                        res.send('Server Error')
                    } else {
                        const temp = data.toString()
                        var html = temp.replace('%',titles.join('</li><li>'))
                        res.writeHead(200,{'Content-Type':'text/html'})
                        res.end(html)
                    }
                })
            }
        })
    }
})
server.listen(8000,function(){
    console.log('监听在 8000 端口')
})