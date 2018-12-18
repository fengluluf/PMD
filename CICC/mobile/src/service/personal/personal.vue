<template>
    <div class="personal">
        <div slot="header" class="header">
            <Header1 :title="title"></Header1>
        </div>
        <div slot="main" ref="main" class="main">
            <div class="per" @click="goModifyInfor">
                <img :src="userMsg.headImg" class="img" v-if="userMsg.headImg"> 
                <img src="../../assets/images/head.jpg" class="img" v-else>
                <p class="name">{{userMsg.nickName}}</p>
                <p class="sign">个签：{{userMsg.signature}}</p>
            </div>
            <div class="listBox">
                <div class="list">
                    <div class="listItem" @click="goMyNews">
                        <span class="iconfont icon-xinwenzixun"></span>
                        <span class="listCon">我的新闻</span>
                        <span class="iconfont icon-buoumaotubiao52 goDetail"></span>
                    </div>
                    <div class="listItem" @click="goMyActivity">
                        <span class="iconfont icon-baobiaoxinwen"></span>
                        <span class="listCon">我的活动</span>
                        <span class="iconfont icon-buoumaotubiao52 goDetail"></span>
                    </div>
                    <div class="listItemLast" @click="goMyComment">
                        <span class="iconfont icon-pinglun"></span>
                        <span class="listCon">我的评论</span>
                        <span class="iconfont icon-buoumaotubiao52 goDetail"></span>
                    </div>
                </div>
                <div class="list">
                    <div class="listItemLast" @click="goSetting">
                        <span class="iconfont icon-shezhi"></span>
                        <span class="listCon">设置</span>
                        <span class="iconfont icon-buoumaotubiao52 goDetail"></span>
                    </div>
                    <!-- <div class="listItemLast">
                        <span class="iconfont icon-xinwenzixun"></span>
                        <span class="listCon">意见反馈</span>
                        <span class="iconfont icon-buoumaotubiao52 goDetail"></span>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Header1 from "../../components/header/header1.vue"
import pageData from "../../api/personal/personal.js"
import "../../assets/style/font-icon/iconfont.css"
import base from '../../util/base'

export default {
    components: {Header1},
    data() {
        return {
            title:"个人中心",
            userMsg:{
                nickName:'',
                headImg:'',
                signature:''
            },
        }
    },
    created() {
        this.getUserMsg();
    },
    mounted() {
    },
    methods: {
        //获取用户信息
        getUserMsg(){
            var _this = this;
            var data = 'userId='+localStorage.getItem('userIdPMD');
            pageData.getUserMsg(data).then(function (d) {
                if(d.resultCode == 200) {
                    _this.userMsg = d.resultJson;
                }else{
                    Toast(d.resultMessage);
                }
            })
        },
        //进入修改个人信息页
        goModifyInfor(){
            this.$router.push("/modifyInfor")
        },
        goMyNews(){
            this.$router.push("/myNews")
        },
        goMyActivity(){
            this.$router.push("/myActivity")
        },
        goMyComment(){
            this.$router.push("/myComment")
        },
        goSetting(){
            this.$router.push("/setting")
        }
    },
    
}
</script>
<style scoped>
.personal{
    height: 100%;
    background-color: #f5f7f8;
}
.personal .header{
    background-color: #fff;
    z-index:999;
    width:100%;
    height:80px;
    line-height:80px;
    position: fixed;
    top:0
}
.personal .headerBox{
    background-color: #f5f7f8;
    padding:0 10px;
    width:100%;
    box-sizing: border-box;
    text-align: center
}
.personal .headerBox .icon-fanhui{
    float: left;
}
.personal .headerBox .title{
    text-align: center;
    width:100%;
}
.personal .main{
    padding-top:80px;
    background-color:#f5f7f8;
}
.personal .main .per{
    background-color:#BD8C43;
    /* background: url("../../assets/images/personal_bg.jpg") no-repeat; */
    /* background-size: 100% 400px; */
    height:500px;
    width:100%;
    padding:40px auto;
    text-align: center;
}
.personal .main .per .img{
    width:180px;
    height:180px;
    margin-top:70px;
    border-radius: 90px;
}
.personal .main .per .name{
    padding:40px;
}
.personal .main .per .sign{
    padding:0 10px;
    word-break: break-all;
    height:60px;
    line-height: 60px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.personal .main .listBox .list{
    margin-top:20px;
    background-color: #fff;
    padding:0 20px;
}
.personal .main .listBox .listItem{
    border-bottom: 1px solid #999;/*no*/
    padding:0 10px;
    height:80px;
    line-height:80px;
}
.personal .main .listBox .listItemLast{
    padding:0 10px;
    height:80px;
    line-height:80px;
}
.personal .main .listBox .listIcon{
    float: right;
    height:80px;
    line-height:80px;
    display: flex;
    align-items: center;
    font-size: 24px;/*px*/
    color:#999
}
.personal .main .listBox .listIcon img{
    width: 36px;
    height:36px;
}
.personal .main .listBox .listCon{
    width:196px;
    display: inline-block;
}
.personal .main .listBox .goDetail{
    float: right;
}
.personal .main .listBox .perImg{
    padding:10px 0;
    display: inline-block;
}
.personal .main .listBox .perImg img{
    width:80px;
    height:80px;
    border-radius: 40px;
}
.personal .main .listBox .perMsg{
    display: inline-block;
}
.personal .main .listBox .perActivity{
    padding-bottom: 40px;
}
</style>
