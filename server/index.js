//引入Koa
const Koa = require('koa')
const app = new Koa();
const config = require('./app/config')
const useRoutes = require('./router')
const bodyParser = require('koa-bodyparser')

app.use(bodyParser())
app.useRoutes = useRoutes
app.useRoutes()

//监听端口
app.listen(config.APP_PORT, () => {
  console.log(`服务器在${config.APP_PORT}端口启动成功~`)
})
