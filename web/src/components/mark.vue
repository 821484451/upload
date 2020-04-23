<template>
    <div class="marked">
        <textarea  id="md" v-model="mdData"  cols="30" rows="10"></textarea>
        <div v-html="mark(mdData)" class="markHtml markdown-body">
        </div>
    </div>
</template>

<script>
import 'github-markdown-css/github-markdown.css'
import marked from 'marked'
export default {
    data(){
        return {
            mdData: ''
        }
    },
    props: [
        'md'
    ],
    methods: {
        mark(mdStr){
            return marked(mdStr);
        }
    },
    watch: {
        mdData(curVal) {
            this.$emit('update:md', curVal)
        }
    },
    mounted(){
        this.mdData = this.md;
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
    .markdown-body {
        box-sizing: border-box;
        min-width: 200px;
        max-width: 980px;
        margin: 0 auto;
        padding: 45px;
    }
    #md{
        font-size: 20px;
        font-weight: bold;
        padding: 15px;
    }
    @media (max-width: 767px) {
        .markdown-body {
            padding: 15px;
        }
    }
</style>