<template>
   <div class="Index" @click="editData(null)">
        <h1 class="title">对于列表实现增删查改</h1>
        <h2>1.增加数据</h2>
        <div class="addBox">
            姓名：<el-input
                placeholder="请输入姓名"
                v-model="userName"
                clearable>
            </el-input>
            性别： <el-input
                placeholder="请输入性别"
                v-model="gender"
                clearable>
            </el-input>
            年龄： <el-input
                placeholder="请输入年龄"
                v-model="age"
                type="number"
                clearable>
            </el-input>
            地址：<el-input
                placeholder="请输入地址"
                v-model="adress"
                clearable>
            </el-input>
            电话：<el-input
                placeholder="请输入电话"
                v-model="tel"
                clearable>
            </el-input>
            <el-button type="primary" class="add" @click="addData">添加</el-button>
        </div>
        <div class="tbBox">
            <table @click.stop>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>姓名</th>
                        <th>性别</th>
                        <th>年龄</th>
                        <th>地址</th>
                        <th>电话</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in list" :key="index">
                        <td>
                            {{item.id}}
                        </td>
                        <td>
                            <el-input v-model="item.userName" v-if="idShow == item.id"></el-input>
                            <span v-else>{{item.userName}}</span>
                        </td>
                        <td>
                            <el-input v-model="item.gender" v-if="idShow == item.id"></el-input>
                            <span v-else>{{item.gender}}</span>
                            
                        </td>
                        <td>
                            <el-input v-model="item.age" v-if="idShow == item.id"></el-input>
                            <span  v-else>{{item.age}}</span>
                            
                        </td>
                        <td>
                            <el-input v-model="item.adress" v-if="idShow == item.id"></el-input>
                            <span v-else>{{item.adress}}</span>
                        </td>
                        <td>
                            <el-input v-model="item.tel" v-if="idShow == item.id"></el-input>
                            <span v-else>{{item.tel}}</span>
                            
                        </td>
                        <td>
                            <el-button @click="delData(item.id)" type="danger" icon="el-icon-delete" title="删除" circle></el-button>
                            <el-button @click="editData(item.id)" type="primary" icon="el-icon-edit" title="编辑" circle></el-button>
                            <el-button @click="saveData(item)" type="success" icon="el-icon-check" title="保存" circle></el-button>
                        </td>
                    </tr>
                </tbody>
            </table> 
        </div>
   </div> 
</template>

<script>
import qs from 'qs';
export default {
    data(){
        return {
            userName: '',
            gender: '',
            age: '',
            adress: '',
            tel: '',
            list: [],
            idShow: null
        }
    },
    methods: {
        getData(){
            // 判断是否登陆
            this.$axios.get('/api/userList').then(res => {
                if (res.data.status === 200) {
                    this.list = res.data.data;
                }
            }).catch(err => {
               alert(err);
            })
        },
        // 增加数据
        addData(){
            if (!this.userName.trim()) {
                this.$message({
                    message: '用户名不能为空！',
                    type: 'warning'
                });
                return false;
            }else if(!this.gender) {
                this.$message({
                    message: '性别不能为空！',
                    type: 'warning'
                });
                return false;
                
            }else if (!this.age) {
                this.$message({
                    message: '年龄不能为空，且格式必须为数字',
                    type: 'warning'
                });
                return false;
            }else if (!this.adress) {
                this.$message({
                    message: '住址不能为空！',
                    type: 'warning'
                });
                return false;
            }else if (!this.tel) {
                this.$message({
                    message: '电话不能为空！',
                    type: 'warning'
                });
                return false;
            }

            this.$axios.post('/api/addUser',qs.stringify({
                userName: this.userName,
                age: this.age,
                adress: this.adress,
                gender: this.gender,
                tel: this.tel
            })).then(res => {
                if (res.data.status === 200) {
                    this.$message({
                        message: res.data.desc,
                        type: 'success'
                    });
                    this.userName = '';
                    this.age = '';
                    this.adress = '';
                    this.gender = '';
                    this.tel = '';
                    this.getData();
                }
            }).catch(err => {
               alert(err);
            })
        },
        delData(id){
            this.$axios.post('/api/del', qs.stringify({
                id: id
            })).then(res => {
                if (res.data.status == 200) {
                    this.$message({
                        message: res.data.desc,
                        type: 'success'
                    });
                    this.getData();
                }
            }).catch(err => {
                alert(err);
            })
        },
        editData(id) {
            if (id == this.idShow) {
                this.idShow = null;
                return false;
            }
            this.idShow = id;

        },
        saveData(item){
            this.$axios.post('/api/edit', qs.stringify({
                userName: item.userName,
                age: item.age,
                adress: item.adress,
                gender: item.gender,
                tel: item.tel,
                id: item.id
            })).then(res => {
                if (res.data.status == 200) {
                    this.$message({
                        message: res.data.desc,
                        type: 'success'
                    });
                    this.idShow = null;
                    this.getData();
                }
            }).catch((err) => {
                alert(err);
            });
        }
    },
    mounted(){
        this.getData();
        
    }
}
</script>
<style lang="less" scoped>
    tr, th,td{
        border: 1px solid #ccc;
    }
    th, td{
        text-align: center;
    }
    thead{
        background-color: #f0f0f0;
    }
    table, tr{
        border-collapse: collapse;
    }
    .Index{
        width: 100%;
        height: 100%;
        table{
            width: 100%;
            th,td{
                padding: 10px 20px;
            }
        }
        
    }
    .title{
        text-align: center;
        line-height: 50px;
    }
    .el-input{
        width: 180px;
    }
    .add{
        margin-left: 20px;
    }
    .addBox{
        padding: 20px 0;
    }
</style>