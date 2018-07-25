const sha1 = require('sha1')
const express = require('express')

const router = express.Router()
let resobj = {
    errorCode:200,
    data:{},
    errorMsg:''
    
}
router.get('/',function (req,res,next) {
    res.json({})
})
router.post('/',function (req,res,next) {
    console.log(req.body)
    const name = req.body.name
    const password = req.body.password
    const gender = req.body.gender
    try {
        if (!(name.length >= 1 && name.length <= 10)) {
            throw new Error('名字请限制在1-10个字符')
        }
        if (['m', 'f', 'x'].indexOf(gender) === -1) {
            throw new Error('性别只能是 m、f 或 x')
        } if (!(bio.length >= 1 && bio.length <= 30)) {
            throw new Error('个人简介请限制在 1-30 个字符')
        }
      
        if (password.length < 6) {
            throw new Error('密码至少 6 个字符')
        }
            res.json(req.body)

    } catch(e) {
        resobj = {...resobj,errorCode:100001,errorMsg:e}
        res.json(resobj)
    }
})

module.exports = router