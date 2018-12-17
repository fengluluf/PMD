<template>
    <div class="modifyPwd">
        <div slot="header" class="header">
            <Header1 :title="title"></Header1>
        </div>
        <div class="main">
            <div class="list">
                <div class="listItem">
                    <span class="itemTitle">原始密码</span>
                    <span class="itemCon">
                        <input type="password" placeholder="请输入旧密码" v-model="oldPwd" />
                    </span>
                </div>
                <div class="listItem">
                    <span class="itemTitle">新密码</span>
                    <span class="itemCon">
                        <input type="password" placeholder="请输入新密码" v-model="newPwdOnce" />
                    </span>
                </div>
                <div class="listItemLast">
                    <span class="itemTitle">确认密码</span>
                    <span class="itemCon">
                        <input type="password" placeholder="再次输入新密码" v-model="newPwdSec" />
                    </span>
                </div>
            </div>
            <div class="button">
                <mt-button type="primary" @click="confirm">确认修改</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import Header1 from "../../components/header/header1.vue"
import pageData from "../../api/personal/modifyPwd.js"
import "../../assets/style/font-icon/iconfont.css"
import { MessageBox,Toast } from 'mint-ui';

export default {
    components: {Header1},
    data() {
        return {
            title:"修改密码",
            oldPwd:'',
            newPwdOnce:'',
            newPwdSec:''
        }
    },
    methods: {
        //校验是否为空
        checkOldPwd(){
            if(this.oldPwd === '') {
                MessageBox.alert("请输入旧密码");
                return false;
            }else{
                return true;
            }
        },
        checknewOnce(){
            if(this.newPwdOnce === '') {
                MessageBox.alert("请输入新密码");
                return false;
            }else{
                return true;
            }
        },
        checknewSec(){
            if(this.newPwdSec === '') {
                MessageBox.alert("请再次输入密码");
                return false;
            }else{
                return true;
            }
        },
        //修改密码
        confirm(){
            var _this = this;
            var data = {
                userId:localStorage.getItem("userIdPWD"),
                oldPassword:this.oldPwd,
                newPassWord:this.newPwdOnce
            }
            if(this.checkOldPwd()&&this.checknewOnce()&&this.checknewSec()){
                if(this.newPwdOnce==this.newPwdSec){
                    pageData.modifyPwd(data).then(function (d) {
                        if(d.resultCode == 200) {
                            Toast("修改成功");
                        }else{
                            Toast(d.resultMessage);
                        }
                    })
                }else{
                    MessageBox.alert("两次输入的密码不一致");
                }  
            }
        },
    },
    
}
</script>
<style scoped lang="less">
.modifyPwd{
    height:100%;
    background-color:#f5f7f8;
}
.modifyPwd .header{
    background-color: #fff;
    z-index:999;
    width:100%;
    height:80px;
    line-height:80px;
    position: fixed;
    top:0
}
.modifyPwd .main{
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
            display: flex;
        }
        .itemTitle{
            flex: 1;
        }
        .itemCon{
            flex: 3;
        }
        input{
            border:none;
            height:70px;
            line-height: 70px;
            width:100%;
        }
        .listItemLast{
            padding:0 10px;
            height:80px;
            line-height:80px;
            display: flex;
        }
    }
    .button{
        margin-top:100px;
        text-align: center;
        width: 100%;
        .mint-button{
            height:70px;
            width:300px;
            font-size:28px;/*px*/
        }
    }
}
</style>
