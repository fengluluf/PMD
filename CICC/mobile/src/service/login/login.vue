<template>
    <div class="login">
        <div class="login-title">登录</div>
        <div class="login-logo"><img src="../../assets/images/logo.jpg"></div>
        <div class="login-welcome">欢迎登录中金PMD</div>
        <div class="form-wrapper">
            <div class="input-wrapper">
                <span class="input-title">用户名</span>
                <input type="text" placeholder="请输入用户名" v-model="userName" />
                <!-- <span class="iconfont icon-delete" @click="clearName"></span> -->
            </div>
            <div class="input-wrapper">
                <span class="input-title">密码</span>
                <input type="password" placeholder="请输入密码" v-model="password" />
                <!-- <span class="iconfont icon-delete" @click="clearPwd"></span> -->
            </div>
            <button class="login-btn" @click="login">登录</button>
        </div>
    </div>
</template>
<script>
import pageData from "../../api/login/login.js"
import "../../assets/style/font-icon/iconfont.css"
import base from '../../util/base'
import { MessageBox,Toast } from 'mint-ui';

export default {
    data() {
        return {
            userName: '',
            password: '',
            agree: true,
            submiting: false,
            disabled: false,
            errorMsg:"",
        }
    },
    computed: {
    },
    created() {
        
    },
    mounted() {
    },
    methods: {
        //清空用户名
        clearName(){
            this.userName = "";
        },
        //清空密码
        clearPwd(){
            this.password = "";
        },
        //校验用户名
        checkName(){
            if(this.userName === '') {
                this.errorMsg = '请输入用户名';
                MessageBox.alert(this.errorMsg);
                return false;
            }else{
                return true;
            }
        },
        //校验密码
        checkPwd(){
            if(this.password === '') {
                this.errorMsg = '请输入密码';
                MessageBox.alert(this.errorMsg);
                return false;
            }else{
                return true;
            }
        },
        //登录
        login(){
            var _this = this;
            var data = {
                userName: this.userName,
                password: this.password
            }
            if(this.checkName() && this.checkPwd()){
                pageData.login(data).then(function (d) {
                    if(d.resultCode == 200) {
                        _this.$router.push('/home');
                        localStorage.setItem("userIdPMD", d.resultJson.id);
                        localStorage.setItem("userNamePMD", d.resultJson.userName);
                    }
                })
            }
            
        },
    },
    components: {
    }
}
</script>
<style scoped>
.login{
    padding:40px;
    height:100%;
    background:#fafafa;
    box-sizing: border-box;
}
.login .login-logo{
    text-align: center;
    margin-top:40px;
}
.login .login-logo img{
    height:136px;
    width:110px;
}
.login-title{
    text-align: center;
    font-size:36px;/*px*/
}
.login-welcome{
    font-size:36px;/*px*/
    padding-top:80px;
    padding-bottom:80px;
}
.input-wrapper{
    position: relative;
    margin-bottom:40px;
    border:1px solid #c8c8c8;/*no*/
    height:80px;
    border-radius:40px;
}
.input-wrapper > .input-title{
    position: absolute;
    height:80px;
    line-height: 80px;
    top:0;
    left:20px;
    font-size: 28px;/*px*/
}
.input-wrapper > input{
    border:none;
    width:100%;
    height:80px;
    border-radius:40px;
    padding-left:130px;
    box-sizing: border-box;
    outline: none
}
.input-wrapper > .icon-delete{
    position:absolute;
    height:80px;
    line-height:80px;
    top :0;
    right:40px;
    font-size:48px;/*px*/
    color:#999;
}
.login-btn{
    width:100%;
    height:80px;
    background:#4f89d0;
    line-height:80px;
    border-radius:40px;
    border :0;
    color:#fff;
    font-size:32px;/*px*/
    outline: none
}
</style>
