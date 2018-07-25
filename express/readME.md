models: 存放操作数据库的文件
public: 存放静态文件，如样式、图片等
routes: 存放路由文件
views: 存放模板文件
index.js: 程序主文件
package.json: 存储项目名、描述、作者、依赖等等信息
对应模块的用处：
express: web 框架
express-session: session 中间件
connect-mongo: 将 session 存储于 mongodb，结合 express-session 使用
connect-flash: 页面通知的中间件，基于 session 实现
ejs: 模板
express-formidable: 接收表单及文件上传的中间件
config-lite: 读取配置文件
marked: markdown 解析
moment: 时间格式化
mongolass: mongodb 驱动
objectid-to-timestamp: 根据 ObjectId 生成时间戳
sha1: sha1 加密，用于密码加密
winston: 日志
express-winston: express 的 winston 日志中间件


1：前端post请求时，不同的content-type  后端获取body里的内容的方式也不同。一般都是用application/x-www-form-urlencoded，所以前端需要每次提交的时候，进行序列化操作
网址：https://blog.csdn.net/zuoyixiao/article/details/78717585

2：express要body里的内容，需要第三方的中间件 body-parser  
