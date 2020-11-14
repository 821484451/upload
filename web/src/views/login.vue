<template>
    <div class="login">
        <h1>星梅系统</h1>
        <div class="loginBox">
            <h5>登陆</h5>
            <div class="loginBox-input">
                <label>用户名：</label>    <el-input
                    placeholder="请输入用户名"
                    v-model="userName"
                    @keyup.enter.native="login"
                    clearable>
                </el-input>
            </div>
            <div class="loginBox-input">
               <label >密码：</label> <el-input  placeholder="请输入密码" v-model="passWord" show-password @keyup.enter.native="login"></el-input>
            </div>
            <div class="loginBox-btn">
             <el-button type="primary" @click="login()" >登陆</el-button> 
            </div>
        </div>
    </div>
</template>    

<script>

import qs from 'qs';
export default {
    data(){
        return{
            userName: '',
            passWord: '',
            userArr: ['xingmei', 'xing', 'mei', 'qita']
        }
    },
    methods: {
        login(){
            if (!this.userName){
                this.$message({
                    message: '用户名不能为空！',
                    type: 'warning'
                });
                return false;
            }else if(!this.passWord){
                this.$message({
                    message: '密码不能为空！',
                    type: 'warning'
                });
                return false;
            }else{
                this.$axios.post('/api/login', qs.stringify({
                    userName: this.userName,
                    password: this.passWord
                })).then(res => {
                    if (res.data.status == 200) {
                        this.$store.commit('changeToken',{token: this.userName});
                        this.$router.push({
                            path: '/'
                        });
                    }else{
                        this.$message.error('账号或者密码错误！');
                    }
                }).catch(err => {
                    this.$message.error(err);
                })
            }
        },
        isLogin(){
            this.$axios.post('/api/isLogin').then(res => {
                if (res.data.status == 200) {
                    this.$router.replace({
                        path: '/'
                    })
                }
            })
        }
    },
    mounted(){
        this.isLogin();
    }
}
</script>

<style lang="less" scoped>
    .login{
        width: 100%;
        height: 100%;
        background: url('../assets/img/bg.jpg') no-repeat center center;
        background-size: cover;
        position: relative;
    }   
    h1{
        text-align: center;
        font-size: 40px;
        
    }
    .loginBox{
        width: 500px;
        height: 300px;
        background-color: rgba(0, 140, 255, 0.5);
        border-radius: 7px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        h5{
            font-size: 30px;
            font-weight: bold;
            line-height: 50px;
            text-align: center;
        }
        &-btn{
            padding-left: 170px;
            margin-top: 20px;
        }
        &-input{
            display: flex;
            margin-top: 20px;
            label{
                width: 170px;
                text-align: right;
                line-height: 40px;
            }
           
        }
    }

    .el-input{
        width: 200px;
    }
</style>