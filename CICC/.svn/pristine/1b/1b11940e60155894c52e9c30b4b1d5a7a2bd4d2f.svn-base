<template>
    <div class="header">
        <div class="headerBox">
            <span @click="goBack" class="iconfont icon-fanhui"></span>
            <span class="title">{{title}}</span>
            <span class="iconfont icon-wodexuanzhong" @click="goPersonal"></span>
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
.header{
    height:80px;
    line-height:80px;
    background-color: #f5f7f8;
    text-align: center;
    width:100%;
}
.header .headerBox{
    background-color: #f5f7f8;
    padding:0 20px;
    width:100%;
    box-sizing: border-box;
    text-align: center;
    height: 40px;/*no*/
    line-height: 40px;/*no*/
}
.header .icon-fanhui{
    float: left;
    font-size:32px;/*px*/
}
.header .headerBox .icon-wodexuanzhong{
    float: right;
    font-size:40px;/*px*/
    color:rgb(141, 141, 141);
}
</style>
