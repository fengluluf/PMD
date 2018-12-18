<template>
    <div class="setting">
        <div slot="header" class="header">
            <Header1 :title="title"></Header1>
        </div>
        <div class="main">
            <div class="list">
                <div class="listItem" @click="modifyPwd">
                    <span class="listCon">修改密码</span>
                    <span class="iconfont icon-buoumaotubiao52 goDetail"></span>
                </div>
                <div class="listItemLast">
                    <span class="listCon">版本更新</span>
                    <span class="goDetail">v1.0</span>
                </div>
            </div>
            <div class="button">
                <mt-button type="danger" @click="signOut">退出登录</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import Header1 from "../../components/header/header1.vue"
import pageData from "../../api/personal/setting.js"
import "../../assets/style/font-icon/iconfont.css"
import base from '../../util/base'

export default {
    components: {Header1},
    data() {
        return {
            title:"设置",
        }
    },
    computed: {
    },
    created() {
    },
    mounted() {
    },
    methods: {
        //修改密码
        modifyPwd(){
            this.$router.push("/modifyPwd")
        },
        //退出登录
        signOut(){
            var _this = this;
            var data = "userId=" + localStorage.getItem("userIdPMD");
            pageData.signOut(data).then(function (d) {
                if(d.resultCode == 200) {
                    _this.$router.push('/')
                    // appnest.navigation.closeWindow();
                    localStorage.removeItem("userIdPMD");
                    localStorage.removeItem("userNamePMD");
                }
            })
        }
    },
    
}
</script>
<style scoped lang="less">
.setting{
    height: 100%;
    background-color:#f5f7f8;
    .header{
        background-color: #fff;
        z-index:999;
        width:100%;
        height:80px;
        line-height:80px;
        position: fixed;
        top:0
    }
    .main{
        padding-top:80px;
        .list{
            background-color: #fff;
            padding:0 20px;
            margin-bottom:20px;
            .listItem{
                border-bottom: 1px solid #999;/*no*/
                padding:0 10px;
                height:80px;
                line-height:80px;
            }
            .listItemLast{
                padding:0 10px;
                height:80px;
                line-height:80px;
            }
            .goDetail{
                float: right;
            }
        }
        .button{
            position: absolute;
            bottom: 180px;
            text-align: center;
            width: 100%;
            .mint-button{
                height:70px;
                width:300px;
                font-size:28px;/*px*/
            }
        }
    }
}
</style>
