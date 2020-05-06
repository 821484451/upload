# <center>vue + nodejs全栈学习</center>

## 1 、项目介绍
### &nbsp;&nbsp;&nbsp;&nbsp;  1） cd ./web npm run serve

    cd ./web 
    npm run serve // 监听localhost:8080启动web端
### &nbsp;&nbsp;&nbsp;&nbsp;  2） cd ./server npm run dev
    cd ./server
    npm run dev // 监听localhost:8081启动服务端
## 2 、功能点(http://localhost:8080/home 页面)
### &nbsp;&nbsp;&nbsp;&nbsp;  1）上传文件功能，并在前端添加进度条，体现上传进度；
### &nbsp;&nbsp;&nbsp;&nbsp;  2）下载文件功能，渲染下载列表，并在其前端显示下载进度条，体现下载进度；
### &nbsp;&nbsp;&nbsp;&nbsp;  3）文件列表管理，对文件列表进行删除功能；
## 3 、功能点(http://localhost:8080 页面)
### &nbsp;&nbsp;&nbsp;&nbsp;  1）该页面体现的是nodejs对于数据库的处理功能，主要针对user表进行增删查改的功能；

## 4 、功能点(http://localhost:8080/mark 页面)
### &nbsp;&nbsp;&nbsp;&nbsp;  1）该页面主要利用marked的第三方模块，把markdown的语言转成html语句，可以下载markdown文件，也可以下载html文件；

## 5 、功能点(http://localhost:8080/lover 页面)
### &nbsp;&nbsp;&nbsp;&nbsp;  1）该页面主要是利用vue-waterfall-easy对图片进行排列的，采用瀑布流的方式；
### &nbsp;&nbsp;&nbsp;&nbsp;  2） 利用v-viewer对图片进行点击放大处理；
### &nbsp;&nbsp;&nbsp;&nbsp;  3）该页面做了权限处理，利用后台根据不同用户判断权限，是否返回数据；
### 6 、功能点(http://localhost:8080/login 页面)
### &nbsp;&nbsp;&nbsp;&nbsp;  1）登陆操作，登陆判断的依据是user.json文件，也就nodejs对文件的读取功能；

## 项目目的：<font color=blue>本次项目主要是练习koa以及vue全站，主要练习nodejs对文件处理（上传，下载，删除，读取, 生成），对mysql表的处理（增删查改），权限思维（不同用户拥有不同权限，从后端的角度），以及登陆的鉴权行为；</font>