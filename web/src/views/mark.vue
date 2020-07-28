<template>
    <div class="mark">
        <h2>markdown:(<span class="red">利用marked模块做的仿照mardown功能，你可以在框中输入markdown语法</span>)</h2>
        <div class="btn-box">
            <el-input v-model="fileName" placeholder="请输入下载文件名"></el-input>
            <el-progress type="circle" :percentage="progress"></el-progress>
            <el-button @click="downloadMd()" type="primary" >下载markdown文件</el-button>
            <el-button @click="downloadHtml()" type="primary" >下载html文件</el-button>
        </div>
        <Mark :md.sync="md"/> 
    </div>
</template>

<script>
import marked from 'marked'
import Mark from '@/components/mark.vue';
export default {
    data(){
        return {
            md: "## 首页",
            fileName: '',
            progress: 0
        }
    },
    components: {
        Mark
    },
    methods: {
        isLogin(){
            this.$axios.post('/api/isLogin')
        },
        downloadMd(){
            let self = this;
            self.progress = 0;
            let fileName = (this.fileName ? this.fileName : 'aa') + '.md';
            let xhr = new XMLHttpRequest();
            let url = "/api/markdown"
            xhr.open('POST', url, true);

            xhr.addEventListener("progress", function(evt){
                if (evt.lengthComputable) {
                    self.progress = ( evt.loaded / evt.total * 100 | 0 )
                }
            }, false);

            xhr.responseType = "blob";
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
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
            let formData = new FormData();
            formData.append('markData',encodeURIComponent(self.md));
            formData.append('fileName', fileName);
            xhr.send(formData);
        },
        downloadHtml(){
            let self = this;
            self.progress = 0;
            let fileName = this.fileName + '.html';
            let xhr = new XMLHttpRequest();
            let url = "/api/markdownTohtml";
            xhr.open('POST', url, true);

            xhr.addEventListener("progress", function(evt){
                if (evt.lengthComputable) {
                    self.progress = ( evt.loaded / evt.total * 100 | 0 )
                }
            }, false);

            xhr.responseType = "blob";
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
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
            }
            let formData = new FormData();
            formData.append('markData',encodeURIComponent(marked(self.md)));
            formData.append('fileName', fileName);
            xhr.send(formData);
        }
    },
    mounted(){
        this.isLogin();
    }
}
</script>

<style lang="less" scoped>
    .mark{
        width: 100%;
        height: 100%;
    }
    h1{
        text-align: center;
    }
    .red{
        color: red;
        font-size: 20px;
    }
    .btn-box{
        padding: 10px;
    }
    .el-input{
        width: 200px;
    }
</style>