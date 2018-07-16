const fs = require('fs')
let completeTasks = 0
let tasks = []
let wordCounts = {}
var filesDir = './text'

function checkIfComplete () {
     completeTasks++
    if (completeTasks == tasks.length) {
        for (var index in wordCounts) {
            console.log(`${index} : ${wordCounts[index]}`)
        }
    }
}
function countWordsInText(text) {
    console.log('text=======>',text.toString())
    var words = text.toString().toLowerCase().split(' ').sort()
    console.log("word========>",words)
    for (var index in words) {
        // 对文本中出现的单词进行计数
        var word = words[index] 
        if (word) {
            wordCounts[word] = (wordCounts[word]) ? wordCounts[word] + 1 : 1
        }
    }
} 
fs.readdir(filesDir,function (err,files) {
    if (err) throw err
    for (let index in files) {
        var task = (function (file) {
            return function (){
                fs.readFile(file,function (err,text) {
                    if (err) throw err
                    countWordsInText(text)
                    checkIfComplete()
                })
            }
        })(filesDir+'/'+files[index])
        tasks.push(task) 
    }
    for (var task in tasks) {
        tasks[task]()
    }
})