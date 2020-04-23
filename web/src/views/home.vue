<template>
    <div id="app" class="home">
        <h1>通过前端去做上传进度条和下载进度条</h1>
        <h2>上传功能：(<span class="red">说明：以下两个上传使用的nodejs模块不同，一个fs原生，一个是第三方fs-extra</span>)</h2>
        <input type="file" ref="upload" @change="handleUpload">
        <el-progress :text-inside="true" :stroke-width="24" :percentage="per" status="success"></el-progress>
        <input type="file" ref="upload1" @change="handleUpload1">
        <el-progress :text-inside="true" :stroke-width="24" :percentage="per1" status="exception"></el-progress>
        <h2>下载功能：(<span class="red">说明：列表的获取需要的是glob模块来遍历文件</span>)</h2>
        <el-button type="primary" style="width: 188px;" @click="getList">刷新列表</el-button> 
        <table>
            <thead>
                <tr>
                    <th>文件名</th>
                    <th>大小</th>
                    <th>文件路径</th>
                    <th>进度</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in fileList" :key="index">
                    <td>{{item.fileName}}</td>
                    <td>{{Math.ceil(item.size/1024)}}&nbsp;kb</td>
                    <td>{{item.path}}</td>
                    <td>
                        <el-progress :text-inside="true" :stroke-width="24" :percentage="item.process" status="success"></el-progress>
                    </td>
                    <td>
                       <el-button type="primary" @click="downLoadProcess(item.fileName, item)">下载</el-button>
                       <el-button type="danger" @click="deleteFile(item.fileName)">删除</el-button>  
                    </td>
                </tr>
            </tbody>
        </table>
       
    </div>
</template>

<script>

// import qs from 'qs';
export default {
    data(){
        return {
            file: '',
            file1:'',
            per: 0,
            per1: 0,
            fileName: '',
            downloadProgress: 0,
            fileList: null,
        }
    },
    mounted(){
        this.getList();
    },
    methods: {
        getList(){
            this.$axios.get('/api/getFileList').then(res => {
                if(res.data.status == 200) {
                    this.fileList = res.data.data;
                }
            })
        },
        handleUpload(){
            this.per = 0;
            this.file = this.$refs.upload.files[0];
            var form = new FormData()
            form.append('file', this.file)
            form.append('id', this.file.id)
            form.append('type', this.file.type)
            form.append('name', this.file.name)
            var config = {
                onUploadProgress: progressEvent => {
                    this.per = (progressEvent.loaded / progressEvent.total * 100 | 0);
                    if (this.per === 100) {
                        this.getList();
                        
                    }
                }
            }
            this.$axios.post(`/api/uploadFile`,
                form, config).then((res) => {
                if (res.data.status === 'success') {
                    alert('上传成功')
                }
            })
        },
        handleUpload1(){
            this.per1 = 0;
            this.file1 = this.$refs.upload1.files[0];
            let form = new FormData();
            form.append('file', this.file1)
            form.append('type', this.file1.type)
            form.append('name', this.file1.name)
            var config = {
                onUploadProgress: progressEvent => {
                    this.per1 = (progressEvent.loaded / progressEvent.total * 100 | 0);
                    if (this.per1 === 100) {
                        this.getList();
                    }
                }
            }
            this.$axios.post(`/api/upload`,
                form, config).then((res) => {
                if (res.data.status === 'success') {
                    alert('上传成功')
                }
            })
        },
        download(){
            let self = this;
            self.downloadProgress = 0;
            // 创建xhr对象
            var xhr = new XMLHttpRequest(); 
            xhr.open("GET", `/api/download?name=${self.fileName}`, true);    //(method-GET/POST ,url, async) 
           
            xhr.addEventListener("progress", function(evt){
                if (evt.lengthComputable) {
                    self.downloadProgress = ( evt.loaded / evt.total * 100 | 0 )
                }
            }, false);
            xhr.responseType = "blob";
            
            xhr.onreadystatechange = function () {  //同步的请求无需onreadystatechange      
                if (xhr.readyState === 4 && xhr.status === 200) {                    
                    var filename = self.fileName;                    
                    if (typeof window.chrome !== 'undefined') {                        
                        // Chrome version
                        var link = document.createElement('a');
                        link.href = window.URL.createObjectURL(xhr.response);
                        link.download = filename;
                        link.click();
                    } else if (typeof window.navigator.msSaveBlob !== 'undefined') {                        
                        // IE version
                        var blob = new Blob([xhr.response], { type: 'application/force-download' });
                        window.navigator.msSaveBlob(blob, filename);
                    } else {
                        // Firefox version
                        var file = new File([xhr.responseText], filename, { type: 'application/force-download' });
                        window.open(URL.createObjectURL(file));
                    }
                }
            };
            
            xhr.send();
        },
        downLoadProcess(fileName, item){
            let self = this;
            // 创建xhr对象
            var xhr = new XMLHttpRequest(); 
            xhr.open("GET", `/api/download?name=${fileName}`, true);    //(method-GET/POST ,url, async) 
           
            xhr.addEventListener("progress", function(evt){
                if (evt.lengthComputable) {
                    self.fileList.map(i => {
                        if (i.id === item.id) {
                            i.process = ( evt.loaded / evt.total * 100 | 0 )
                        }
                        return i;
                    });
                }
            }, false);
            xhr.responseType = "blob";
            
            xhr.onreadystatechange = function () {  //同步的请求无需onreadystatechange      
                if (xhr.readyState === 4 && xhr.status === 200) {                    
                            
                    if (typeof window.chrome !== 'undefined') {                        
                        // Chrome version
                        var link = document.createElement('a');
                        link.href = window.URL.createObjectURL(xhr.response);
                        link.download = fileName;
                        link.click();
                    } else if (typeof window.navigator.msSaveBlob !== 'undefined') {                        
                        // IE version
                        var blob = new Blob([xhr.response], { type: 'application/force-download' });
                        window.navigator.msSaveBlob(blob, fileName);
                    } else {
                        // Firefox version
                        var file = new File([xhr.responseText], fileName, { type: 'application/force-download' });
                        window.open(URL.createObjectURL(file));
                    }
                }
            };
            
            xhr.send();
        },
        deleteFile(fileName){
            this.$axios.post('/api/deleteFile',this.$qs.stringify({
                fileName: fileName
            })).then(res => {
                if (res.status == 200) {
                    this.$message({
                        message: res.data.desc,
                        type: 'success'
                    });
                    this.getList();
                }else{
                    this.$message({
                        message: res.data.desc,
                        type: 'warning'
                    });
                }
            }).catch(err => {
                alert(err);
            })

        } 
    }
    
}
</script>

<style lang="less" scoped>
    h1{
        text-align: center;
    }
    .red{
        color: red;
        font-size: 20px;
    }
    table{
        width: 100%;
        border-collapse: collapse;
    }
    th, td{
        padding: 5px;
        text-align: center;
        border-collapse: collapse;
        border: 1px solid #dddddd;
    }
    thead tr{
        background-color: #ccc;
    }
    tr td:nth-child(1){
        width: 15%;
    }
    tr td:nth-child(2){
        width: 10%;
    }
    tr td:nth-child(3){
        width: 20%;
    }
    tr td:nth-child(4){
        width: 40%;
    }
    tr td:nth-child(5){
        width: 15%;
    }
    
</style>