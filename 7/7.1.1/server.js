const connect = require('connect')
const fs= require('fs')
const join = require('path').join
const parse = require('url').parse
const root = __dirname
const app = connect()

// app.use('/',indexPage)
//     .use(connect.cookieParser('yangshan is a cool ferret'))
//     .use(function (req,res) {
//         console.log(req.cookies)
//         console.log(req.singedCookies)
//         console.log()
//     })

app.use(connect.cookieParser('ttas'))
.use(function (req,res) {
            console.log(req.cookies)
            console.log(req.singedCookies)
            console.log()
        })
function indexPage (req,res,next) {
    const path = join(root,'/index.html')
    fs.stat(path,function (err,stat) {
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
            var  stream = fs.createReadStream(path)
            res.setHeader('Content-Length',stat.size)
            stream.pipe(res)
            next()
        }
    })
}
function  test (){
    console.log('test')
}
app.listen(5000)