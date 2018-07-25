const express = require('express')
const singup = require('./routes/singup')
const app = express()
const bodyParser = require('body-parser')  // 解析post 的body

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8081');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    next();
};

app.use(allowCrossDomain)
app.get('/',function (req,res,next) {
    // res.sendFile('index.html',__dirname,function (err) {
    //     if (err) throw err
    // })
    res.json({name:'yangshan'})
})
app.use('/api/singup',singup)
app.use(express.static('public'))
app.listen(3000,function (){
    console.log('监听端口3000')
})
