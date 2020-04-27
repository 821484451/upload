<template>
    <div>
        <viewer :images="images">
            <img  v-for="item in images" :src="item.src" :key="item.src">
        </viewer>
    </div>
</template>

<script>
export default {
    data(){
        return {
            images: [

            ]
        }
    },
    methods: {
        getImgList(){
            this.$axios.get('/api/imgList').then(res => {
                let baseUrl = process.env.NODE_ENV === 'development' ? "http://localhost:8081" : '';
                if (res.data.status == 200) {
                    this.images = res.data.data.map(item => {
                        item.src = baseUrl + item.src;
                        return item;
                    });
                    
                }
            }).catch(err => {
                this.$message.error(err);
            })
        }
    },
    mounted(){
        this.getImgList();
    }
}
</script>

<style lang="less">
    img{
        width: 150px;
        height: 200px;
        display: inline-block;
        margin: 5px;
    }
</style>
