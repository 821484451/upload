<template>
    <div class="loveBox" >
        <vue-waterfall-easy v-if="nowayflag" ref="waterfall" :imgsArr="images" @scrollReachBottom="getImgList" v-viewer>
            <div slot="waterfall-over">已经到底了</div>
        </vue-waterfall-easy>
        <div class="nowayBox" v-else>
            <img src="@/assets/img/noway.jpeg" alt="">
        </div>
    </div>
    
</template>

<script>
import vueWaterfallEasy from 'vue-waterfall-easy'
export default {
    data(){
        return {
            images: [

            ],
            pageIndex: 0,
            nowayflag: true
        }
    },
    components: {
        vueWaterfallEasy
    },
    methods: {
        getImgList(){
            if (this.pageIndex >= 10){
                this.$refs.waterfall.waterfallOver()
                return false;
            }
            this.$axios.get('/api/imgList').then(res => {
                
                this.pageIndex ++;
                let baseUrl = process.env.NODE_ENV === 'development' ? "http://localhost:8081" : '';
                if (res.data.status == 200) {
                    
                    this.images = this.images.concat(res.data.data.map(item => {
                        item.src = baseUrl + item.src;
                        return item;
                    }));
                    
                }else if (res.data.status == 405){
                    this.nowayflag = false;
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
    h1{
        text-align: center;
    }
    .loveBox{
        width: 100%;
        height: 100%;
    }
    .nowayBox{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
