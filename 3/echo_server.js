const net = require('net')

const server = net.createServer(function(socket) {
    socket.on('data',function(data) {
        console.log('连接telnet')
        socket.write(data)
    })
})
server.listen(8888,function(){
    console.log('监听 8888 端口')
})
