const router = require('koa-router')();
const fs = require("fs");
const path = require('path');
const fse = require('fs-extra');
const send = require('koa-send');
const glob = require("glob");
// 是否登录接口
router.post('/api/isLogin', async (ctx, next) => {
    ctx.body = {
        status: 200,
        data: 0,
        desc: "已登录"
    }
})
// 登陆接口
router.post('/api/login', async (ctx, next) => {
    let name = ctx.request.body.userName;
    let password = ctx.request.body.password;
    let res = fs.readFileSync('./data/user.json', {encoding: 'utf-8'});
    
    let data = JSON.parse(res).filter(item => {
        return item.userName === name && item.password === password
    })[0];
    if(data) {
        ctx.session.userInfo = name;
        ctx.body = {status: 200, data: data, msg: "登陆成功！"}; 
    }else{
        
        ctx.body = {status: 400, data: data, msg: "登陆失败！"}; 
    }
});
// 文件上传方法1
router.post('/api/uploadFile', async (ctx, next) => {
    const file = ctx.request.files.file;
    const reader = fs.createReadStream(file.path);
    let filePath = path.join(__dirname, 'public/') + `/${file.name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);

    ctx.body = {
        msg: '请求成功！',
        code: 200
    }

});
// 文件上传方法2
router.post('/api/upload', async (ctx, next) => {
    const rFile = ctx.request.files.file;
    let oldPath = rFile.path;
    let newPath = path.join(__dirname, 'public/') + `/${rFile.name}`;
    await fse.move(oldPath, newPath);
    ctx.body = {
        msg: '请求成功！',
        code: 200
    };
});
// 文件下载1
router.get('/api/download', async (ctx) =>{
    const name = ctx.query.name;
    console.log(name);
    const downLoadPath =  `./public/${name}`;
    let info = fs.statSync(downLoadPath);
    let len =  info.size;
    ctx.set("Content-Length", len.toString());
    ctx.attachment(name);
    await send(ctx,downLoadPath);
});
// 获取文件列表
router.get('/api/getFileList', async (ctx) => {
    let fileList = await glob.sync('public/*');
    let res = fileList.map((item, index) => {
        return {
            fileName: item.replace('public/', ''),
            path: item,
            id: index,
            process: 0
        }
    })
    ctx.body = {
        data: res,
        status: 200,
        desc: "访问成功！"
    };
});

// 文件下载1
// router.get('/api/download2', async (ctx) =>{
    
//     let fileName = ctx.query.name;
//     console.log(fileName);
//     let downLoadPath2 = path.join(__dirname, 'public/');
//     let info = fs.statSync(downLoadPath2 + `${fileName}`);
//     let len =  info.size;
//     ctx.set("Content-Length", len.toString());
//     ctx.body = fs.createReadStream(downLoadPath2 + `${fileName}`, {encoding:'utf8'});
// });

module.exports = router;
