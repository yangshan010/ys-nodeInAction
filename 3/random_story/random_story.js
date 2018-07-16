const fs = require('fs')
const request = require('request')
const htmlparser = require('htmlparser')
const configFilename = './rss_feeds.txt'
/**
 * 思想：将异步任务放在一个数组中
 *      每次用数组中拿出一个任务出来
 *      完成一个任务后，继续中数组中拿出一个任务出来
 * 
 * 
 * 
*/
function checkForRSSFile() {
    // 任务1 ：确保包含rss预定源URL 列表的文件存在
    console.log('任务1')
    fs.exists(configFilename,function(exists) {
        if (!exists) {
            return next(new Error ('Missing Rss File'))
        }
        next(null,configFilename)
    })
}

function readRSSFile (configFilename) {
    // 任务2 读取并解析包含预定源URL的文件
    console.log('任务2')
    fs.readFile(configFilename,function(err,feedList) {
        if (err) return next (err)
        feedList = feedList.toString().replace(/^\s+|\s+$/g,'').split("\n")
        const random = Math.floor(Math.random()*feedList.length)
        next(null,feedList[random])
    })
}
function downloadRSSFeed (feedUrl) {
    console.log('任务3')
    // 任务三 向选定的预定源发送http请求以获取数据
    request({url:feedUrl},function (err,res,body) {
        if(err) return next (err)
        if (res.statusCode != 200) return next(new Error ('连接错误'))
        next(null,body)
    })
}
function parseRSSFeed(rss) {
    console.log('任务4')
    // 任务4 将数据 解析
    var handler = new htmlparser.RssHandler()
    var parser = new htmlparser.Parser(handler)
    parser.parseComplete(rss)
    if (!handler.dom.items.length) return next(new Error ('No Rss'))
    var item = handler.dom.items.shift();
    console.log(item.title)
    console.log(item.link)
}
var tasks = [checkForRSSFile,readRSSFile,downloadRSSFeed,parseRSSFeed]

function next (err,result) {
    if (err) throw err 
    var currentTask = tasks.shift()
    if (currentTask) {
        currentTask(result)
    }
}
next()