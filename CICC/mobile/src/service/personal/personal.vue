<template>
    <div class="personal">
        <div slot="header" class="header">
            <!-- <Header1 :title="title"></Header1> -->
            <mt-header :title="title" fixed>
                <mt-button icon="back" slot="left" @click="back"></mt-button>
            </mt-header>
        </div>
        <div slot="main" ref="main" class="main">
            <div class="per" @click="goModifyInfor">
                <img :src="userMsg.headImg" class="img"> 
                <p class="name">{{userMsg.userName}}</p>
                <p class="sign">{{userMsg.signature}}</p>
            </div>
            <div class="listBox">
                <div class="list">
                    <div class="listItem" @click="goMyNews">
                        <span class="iconfont icon-xinwen"></span>
                        <span class="listCon">我的新闻</span>
                        <span class="iconfont icon-jinru goDetail"></span>
                    </div>
                    <div class="listItem" @click="goMyActivity">
                        <span class="iconfont icon-huodong"></span>
                        <span class="listCon">我的活动</span>
                        <span class="iconfont icon-jinru goDetail"></span>
                    </div>
                    <div class="listItemLast" @click="goMyComment">
                        <span class="iconfont icon-pinglun"></span>
                        <span class="listCon">我的评论</span>
                        <span class="iconfont icon-jinru goDetail"></span>
                    </div>
                </div>
                <div class="list">
                    <div class="listItemLast" @click="goSetting">
                        <span class="iconfont icon-shezhi"></span>
                        <span class="listCon">设置</span>
                        <span class="iconfont icon-jinru goDetail"></span>
                    </div>
                    <!-- <div class="listItemLast">
                        <span class="iconfont icon-xinwenzixun"></span>
                        <span class="listCon">意见反馈</span>
                        <span class="iconfont icon-jinru goDetail"></span>
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
            userMsg:{      //用户信息
                userName:'',
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
        },
        //返回首页
        back() {
            this.$router.push('/home');
        },
    },
    
}
</script>
<style scoped lang="less">
.personal{
    height: 100%;
    background-color: #f3f3f3;
}
.personal .header{
    z-index:999;
    width:100%;
    height:90px;
    line-height:90px;
    position: fixed;
    top:0
}
.personal .header .mint-header{
    background-color: #b99052;
    color: #fff;
    height: 90px;
    font-size: 32px!important;/*px*/
}
.personal .headerBox{
    background-color: #b99052;
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
    background-color:#f3f3f3;
}
.personal .main .per{
    // background-color:#BD8C43;
    background: url("../../assets/images/personal_bg.png") no-repeat; 
    background-size: 100% 400px; 
    height:400px;
    width:100%;
    padding:40px auto;
    text-align: center;
    color:#fff
}
.personal .main .per .img{
    width:160px;
    height:160px;
    margin-top:30px;
    border-radius: 80px;
}
.personal .main .per .name{
    padding:30px;
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
    .icon-xinwen{
        color: #2bbff8;
    }
    .icon-huodong{
        color:#ffd800;
    }
    .icon-pinglun{
        color:#ffa360;
    }
    .icon-shezhi{
        color:#9f9f9f
    }
}
.personal .main .listBox .listItem{
    border-bottom: 1px solid #ececec;/*no*/
    padding:0 10px;
    height:90px;
    line-height:90px;
}
.personal .main .listBox .listItemLast{
    padding:0 10px;
    height:90px;
    line-height:90px;
}
.personal .main .listBox .listCon{
    width:196px;
    display: inline-block;
    padding-left:10px;
}
.personal .main .listBox .goDetail{
    float: right;
    font-size: 38px;/*px*/
    color: #999;
}
.personal .main .listBox .iconfont{
    vertical-align: middle;
}
</style>
