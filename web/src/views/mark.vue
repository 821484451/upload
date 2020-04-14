<template>
    <div class="mark">
        <h2>markdown:(<span class="red">利用marked模块做的仿照mardown功能，你可以在框中输入markdown语法</span>)</h2>
        <Mark/>
    </div>
</template>

<script>
import Mark from '@/components/mark.vue';
export default {
    data(){
        return {

        }
    },
    components: {
        Mark
    },
    methods: {

    },
    mounted(){

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
</style>