const Koa =  require('koa');
const app =  new Koa();
const router =  require('./router.js');
const koaBody = require("koa-body");
const koaStatic = require('koa-static');
const path = require('path')

const static = require('koa-static');
app.use(koaStatic(path.join(__dirname,'./public')));
app.use(koaBody({
    multipart: true,
    strict: false,//解析所有请求
    formidable: {
        maxFileSize: 1024 * 1024 * 1024 * 1024//文件大小限制
    }
}));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen('8081', ()=>{
    console.log('启动8081服务')
});