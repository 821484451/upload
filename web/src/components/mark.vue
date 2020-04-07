<template>
    <div>
        <textarea  id="md" v-model="md" cols="30" rows="10"></textarea>
        <div v-html="mark()">
        </div>
    </div>
</template>

<script>
import marked from 'marked'
export default {
    data(){
        return {
            md: "## 首页"
        }
    },
    methods: {
        mark(){
            return marked(this.md);
        }
    },
    mounted(){

    }

}
</script>

<style lang="less">
    
</style>