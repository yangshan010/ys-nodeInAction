const fs = require('fs')
const path = require('path')

console.log('process.argv======>',process.argv)
var args = process.argv.splice(2) // 去掉"node clic_tacks.js"
var command = args.shift() // 去除第一个命令
var taskDescription = args.join(' ') // 合并剩余的参数
var file = path.join(process.cwd(),'/.tasks')

switch(command) {
    case 'list':
            listTasks(file)
            break;
    case 'add' : 
            addTask(file,taskDescription)
            break
    default: // 其他任何参数都都会显示帮助
        console.log('Usage:' + process.argv[0] + 'list| add [taskDescript]')                
}
// function listTasks(file) {
//     loadOrInitialixeTaskArray(file,function(tasks) {
//         for (var i in tasks) {
//             console.log(tasks[i])
//         }
//     })
// }
// function addTask(file,taskDescription){   // 添加
//     loadOrInitialixeTaskArray(file,function (tasks) {
//         tasks.push(taskDescription)
//         storeTasks(file,tasks)
//     })
// }
// function loadOrInitialixeTaskArray(file,cb) { // 辅助函数  检查文件，格式化文件
//     fs.exists(file,function (exists){
//         if (exists) {
//             fs.readFile(file,function (err,data) {
//                 if (err) throw err;
//                 var data = data.toString()
//                 var tasks = JSON.parse(data || '[]')
//                 cb(tasks)
//             })
//         } else {
//             cb([])
//         }
//     })
// }
// function storeTasks(file,tasks){
//     fs.writeFile(file,JSON.stringify(tasks),'utf8',function(err) {  //写入
//         if (err) throw err;
//         console.log('Saved.')
//     })
// }
function listTasks (file) {
    loadOrintialTasksArrya(file,function (tasks) {
        for (var i in tasks) {
            console.log(tasks[i])
        }
    })
}
function addTask (file,taskDescription) {
    loadOrintialTasksArrya(file,function (tasks) {
        tasks.push(taskDescription)
        stroeTasks(file,tasks)
    })
}
function stroeTasks (file,tasks) {
    fs.writeFile(file,JSON.stringify(tasks),'utf8',function (err) {
        if (err) throw err;
        console.log('Saved.')
    })
}
function loadOrintialTasksArrya (file,cb) {
    fs.exists(file,function (exists) {
        if (exists) {
            fs.readFile(file,function(err,data) {
                if (err) throw err ;
                var data = data.toString()
                var tasks = JSON.parse(data || '[]')
                // tasks.push()
                cb(tasks)
            })
        }else {
            cb([])
        }
    })
}