<template>
    <div class="myNews">
        <div slot="header" class="header">
            <Header1 :title="title"></Header1>
        </div>
    </div>
</template>
<script>
import Header1 from "../../components/header/header1.vue"
// import pageData from "../../api/myNews/myNews.js"
import "../../assets/style/font-icon/iconfont.css"
import base from '../../util/base'

export default {
    components: {Header1},
    data() {
        return {
            title:"我的新闻",
            userName:'',
        }
    },
    computed: {
    },
    created() {
        this.userName = localStorage.getItem("userNamePMD")
    },
    mounted() {
    },
    methods: {
    },
    
}
</script>
<style scoped>
.myNews{
    height: 100%;
}
.myNews .header{
    background-color: #fff;
    z-index:999;
    width:100%;
    height:80px;
    line-height:80px;
    position: fixed;
    top:0
}
</style>
