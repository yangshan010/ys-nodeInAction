const EventEmitter = require('events').EventEmitter
const channel = new EventEmitter()
channel.on('join',function(data) {
    console.log('welcome')
    console.log(data)
})
channel.emit('join','node')