const connect = require('connect')

const app  = connect()
app.use(logger)
app.use(hello)
app.listen(3000)

function hello (req,res,next) {
    res.setHeader('Content-Type','text/plain')
    res.end('hello world \n')
}

function logger (req,res,next) {
    console.log('%s %s',req.method,req.url)
    next()
}