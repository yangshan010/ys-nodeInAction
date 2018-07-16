const http = require('http')
const qs = require('querystring')
let items = []
const server = http.createServer(function(req,res) {
    if ('/' == req.url) {
        switch (req.method) {
            case 'GET': 
                show(res)
                break;
            case 'POST':
                add(req,res)
                break;
            default: 
                badRequest(res)    
        }
    } else {
        // res.statusCode = 400
        // res.end('Invaild')
        notFound(res)
    }

})
function notFound (res) {
    res.statusCode = 404
    res.setHeader('Content-Type','text/plain')
    res.end('Not found')
}
function badRequest (res) {
    res.statusCode = 400 
    res.setHeader('Content-Type','text/plain')
    res.end(`${req.method} is invaild`)
}
function add (req,res) {
    let body = ''
    req.setEncoding('utf8')
    req.on('data',function (chunk) {
        console.log('chunk=====>',chunk)
        body+=chunk
    })
    req.on('end',function () {
        console.log('body======>',body)
        obj = qs.parse(body)
        console.log('obj======>',obj)
        items.push(obj.item)
        show(res)
    })
}
function show(res) {
    var html = '<html><head><title>Todo List </title></head><body>' + '<h1>Todo List</h1>'+'<ul>'+items.map(function (item){
        return '<li>' + item +'</li>'
    }).join('') +'</ul>' + '<form method="post" action="/">' + '<p><input type="text" name="item" /> </p>'+ '<p><input type="submit" value="Add Item"></p>' +'<form/></body></html>'
    res.setHeader('Content-Type','text/html')
    res.setHeader('Content-Length',Buffer.byteLength(html))
    res.end(html)
}
server.listen(3000)