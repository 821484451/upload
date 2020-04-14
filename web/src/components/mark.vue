<template>
    <div class="marked">
        <textarea  id="md" v-model="md" cols="30" rows="10"></textarea>
        <div v-html="mark()" class="markHtml">
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

<style lang="less" scoped>
    .marked{
        width: 100%;
        height: 100%;
        display: flex;
        textarea{
            flex: 1;

        }
        .markHtml{
            flex: 1;
        }
    }

</style>