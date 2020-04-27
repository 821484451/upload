
const Koa =  require('koa');
const app =  new Koa();
const router =  require('./router.js');
const koaBody = require("koa-body");
const koaStatic = require('koa-static');
const path = require('path');
const session = require('koa-session');
app.keys =[ "venus key" ];
const CONFIG = {
    key: 'koa:sess',
    maxAge: 3600000,
    autoCommit:true ,
    httpOnly: true,
}

app.use(session(CONFIG, app));

app.use(async (ctx, next) => { 
    if (ctx.url == '/login' || ctx.url == '/' || ctx.url.indexOf('login') > -1) { 
      await next() 
    } else { 
      if (JSON.stringify(ctx.session) == "{}" || !ctx.session.userInfo) { 
        ctx.body = {status: 403, msg: "未登录！", data: [] } 
      } else { 
        await next() 
      } 
    } 
});

const static = require('koa-static');
app.use(koaStatic(path.join(__dirname,'./assets')));
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