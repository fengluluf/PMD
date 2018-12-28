<template>
    <div class="header">
        <div class="headerBox">
            <span @click="goBack" class="iconfont icon-fanhui"></span>
            <span class="title">{{title}}</span>
            <span class="iconfont icon-weibiaoti2fuzhi12" @click="goPersonal"></span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    props:{
        title:{
            type: String,
            default: '中金'
        },
    },
    data () {
        return {

        }
    },
    methods:{
        handleClose(){
            this.$router.back();
        },
        goPersonal(){
            this.$router.push("/personal")
        },
        goBack(){
            appnest.navigation.closeWindow();
        }
    }
}
</script>

<style scoped>
.header .headerBox{
    background-color: #b99052;
    padding:0 20px;
    width:100%;
    box-sizing: border-box;
    text-align: center;
    height: 80px;
    line-height: 80px;
    color:#fff;
}
.header .icon-fanhui{
    float: left;
    font-size:28px;/*px*/
}
.header .headerBox .icon-weibiaoti2fuzhi12{
    float: right;
    font-size:40px;/*px*/
    color:#fff;
}
</style>
