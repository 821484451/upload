<template>
   <div class="Index">
       <table>
            <thead>
                <tr>
                    <th>姓名</th>
                    <th>性别</th>
                    <th>年龄</th>
                    <th>年级</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in list" :key="index">
                    <td>{{item.name}}</td>
                    <td>{{item.gender}}</td>
                    <td>{{item.age}}</td>
                    <td>{{item.grade}}</td>
                    <td><el-checkbox v-model="item.checked"></el-checkbox></td>
                </tr>
            </tbody>

       </table> 
   </div> 
</template>

<script>
export default {
    data(){
        return {
            list: []
        }
    },
    methods: {
        isLogin(){
            // 判断是否登陆
            this.$axios.post('/api/isLogin').then(res => {
                console.log(res);
            }).catch(err => {
               alert(err);
            })
        }
    },
    mounted(){
        this.isLogin();
        this.$set(this.list, 0, {
            name: '小明',
            gender: '男',
            age: '13',
            grade: '三年级',
            checked: false
        })
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
</style>