<template>
    <div class="modifyInfor">
        <div class="header">
            <Header1 :title="title" :rightTitle="rightTitle" @on-tellFather="saveMsg"></Header1>
        </div>
        <div class="main">
            <div class="list">
                <div class="imgItem">
                    <span class="listCon">头像</span>
                    <img :src="userMsg.headImg" class="img" id="imagebg" v-if="userMsg.headImg"> 
                    <img src="../../assets/images/head.jpg" class="img" id="imagebg" v-else>
                    <input type="file" class="chooseImg" @change="chooseImg" id="upfile">
                </div>
                <div class="listItem">
                    <span class="listCon">昵称</span>
                    <span class="goDetail">
                        <input type="text" class='nickName' v-model="userMsg.nickName">
                    </span>
                </div>
                <div class="listItemLast" @click="setMsg">
                    <span class="listCon">个性签名</span>
                    <span class="iconfont icon-buoumaotubiao52 goDetail"></span>
                </div>
            </div>
            
            <div class="list">
                <div class="listItem" @click="showSex=true">
                    <mt-actionsheet :actions="sexOption" v-model="showSex" :closeOnClickModal='false'></mt-actionsheet>
                    <span class="listCon">性别</span>
                    <span class="iconfont icon-buoumaotubiao52 goDetail"></span>
                    <span class="goDetail">{{selectedSex}}</span>
                </div>
                <div class="listItemLast" @click="setBirthday">
                    <mt-datetime-picker ref="picker" 
                        :visible="showBir" 
                        type="date" 
                        v-model="pickerValue"
                        @confirm="handleConfirm"
                        :startDate="startDate"
                        :endDate="endDate"
                        year-format="{value} 年"
                        month-format="{value} 月"
                        date-format="{value} 日">
                    </mt-datetime-picker>
                    <span class="listCon">生日</span>
                    <span class="iconfont icon-buoumaotubiao52 goDetail"></span>
                    <span class="goDetail">{{userMsg.birthday}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Header1 from "../../components/header/header1.vue"
import pageData from "../../api/personal/modifyInfor.js"
import "../../assets/style/font-icon/iconfont.css"
import { Actionsheet,DatetimePicker,Toast } from 'mint-ui';
import $ from 'jquery'
import base from '../../util/base'

export default {
    components: {Header1},
    data() {
        return {
            title:"个人信息",
            rightTitle:"保存",
            selectedSex:'',
            userMsg:{
                birthday:'',
                birthdayStr:'',
                headImg:'',
                nickName:'',
                sex:'',
                signature:'',
                userName:''
            },
            imgFile:'',
            sexOption:[ //性别选项
                {
                    id:1,
                    name:'男',
                    method:this.chooseSex
                },
                {
                    id:0,
                    name:'女',
                    method:this.chooseSex
                }],
            showSex:false,  //是否显示性别操作表
            showBir:true,  //是否显示时间选择器
            pickerValue:'1980-06-06', //选择的出生日期
            startDate:new Date('1930-01-01'),//开始时间
            endDate:new Date('2018-12-12')//结束时间
        }
    },
    created() {
        this.getUserMsg();
    },
    methods: {
        //获取用户信息
        getUserMsg(){
            var data = 'userId:'+localStorage.getItem('userIdPMD');
            pageData.getUserMsg(data).then(function (d) {
                if(d.resultCode == 200) {
                    this.userMsg = d.resultJson;
                }else{
                    Toast(d.resultMessage);
                }
            })
        },
        //选择图片
        chooseImg(){
            this.imgFile = $("#upfile").get(0).files[0]
            $('#imagebg').attr('src',this.getObjectURL(this.imgFile));
            
            var _this = this;
            var fd = new FormData();
            fd.append("userId", 1);
            fd.append("upfile", this.imgFile);
            $.ajax({
                url: "http://118.144.88.221:8040/uploadImageServlet",
                type: "POST",
                processData: false,//不处理发送的数据，因为data值是FormData对象，不需要对数据做处理  
                contentType: false,//不设置Content-type请求头  
                data: fd,
                success: function(d) {
                    var d = JSON.parse(d);
                    if(d.resultCode == 200){
                        _this.userMsg.headImg = d.resultJson[0]
                    }else{
                        Toast(d.resultMessage)
                    }
                },
                error:function(err){
                    Toast("网络错误")
                }
            });
        },
        //不同浏览器下的路径不同
        getObjectURL(file) {
            var url = null;
            if (window.createObjectURL != undefined) { // basic
                url = window.createObjectURL(file);
            } else if (window.URL != undefined) { // mozilla(firefox)
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) { // webkit or chrome
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        },
        //保存修改信息
        saveMsg(){
            var data = {
                nickName:this.userMsg.nickName,
                sex:this.userMsg.sex,
                birthdayStr:this.userMsg.birthdayStr,
                headImg:this.userMsg.headImg,
                userId:localStorage.getItem('userIdPWD')
            }
            pageData.update(data).then(function (d) {
                if(d.resultCode == 200) {
                    Toast("修改成功")
                }else{
                    Toast(d.resultMessage)
                }
            })
        },
        //修改个性签名
        setMsg(){
            this.$router.push({name:'modifySign',params:{userMsg:this.userMsg}});
        },
        //选择性别
        chooseSex(data){
            this.userMsg.sex = data.id;
            this.selectedSex = data.name;
        },
        //设置出生日期
        setBirthday(){
            if(!this.showBir){
                this.showBir = true;
                this.$refs.picker.close()
            }else{
                this.showBir = false;
                this.$refs.picker.open()
            }
        },
        //时间选择器确定事件
        handleConfirm(){ 
            this.userMsg.birthdayStr =this.pickerValue 
            this.userMsg.birthday = base.formatDate(this.pickerValue,'yyyy-MM-dd')
        },
    },
    
}
</script>
<style scoped lang="less">
.modifyInfor{
    height: 100%;
    background-color:#f5f7f8;
}
.modifyInfor .header{
    background-color: #fff;
    z-index:999;
    width:100%;
    height:80px;
    line-height:80px;
    position: fixed;
    top:0
}
.modifyInfor .main{
    padding-top:80px;
    background-color:#f5f7f8;
    .list{
        background-color: #fff;
        padding:0 20px;
        margin-bottom:20px;
        .imgItem{
            border-bottom: 1px solid #999;/*no*/
            padding:10px 0;
            height:160px;
            line-height:160px;
        }
        .listItem{
            border-bottom: 1px solid #999;/*no*/
            // padding:0 10px;
            height:80px;
            line-height:80px;
            position: relative;
        }
        .listItemLast{
            // padding:0 10px;
            height:80px;
            line-height:80px;
        }
        .goDetail{
            float: right;
        }
        .img{
            height:140px;
            width:140px;
            border-radius: 80px;
            float: right;
        }
        .chooseImg{
            height: 140px;
            width: 140px;
            position: absolute;
            right: 20px;
            opacity: 0;
        }
        .nickName{
            border: none;
            height: 70px;
            width:200px;
            text-align: right;
        }
    }
}
</style>
