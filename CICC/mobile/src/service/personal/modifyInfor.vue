<template>
    <div class="modifyInfor">
        
        <div class="header">
            <Header1 :title="title" :rightTitle="rightTitle" @on-tellFather="saveMsg"></Header1>
        </div>
        <div class="main">
            <div class="list">
                <div class="imgItem">
                    <span class="listCon">头像</span>
                    <img :src="userMsg.headImg" class="img" id="imagebg" @click="chooseImg"> 
                    <!-- <input type="file" accept="image/*"  class="chooseImg" @change="chooseImg" id="upfile"> -->
                </div>
                <div class="listItem">
                    <span class="listCon">用户名</span>
                    <span class="goDetail">
                        <input type="text" class='userName' v-model="userMsg.userName" readonly>  
                    </span>
                </div>
                <div class="listItemLast" @click="setMsg">
                    <span class="listCon">个性签名</span>
                    <span class="iconfont icon-jinru goDetail"></span>
                </div>
            </div>
            
            <div class="list">
                <div class="listItem" @click="showSex=true">
                    <mt-actionsheet :actions="sexOption" v-model="showSex" :closeOnClickModal='false'></mt-actionsheet>
                    <span class="listCon">性别</span>
                    <span class="iconfont icon-jinru goDetail"></span>
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
                    <span class="iconfont icon-jinru goDetail"></span>
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
import { Actionsheet,DatetimePicker,Toast,MessageBox,Indicator } from 'mint-ui';
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
                headImg:'',
                userName:'',
                sex:'',
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
            endDate:new Date('2018-12-12'),//结束时间
            base64Image:'',
        }
    },
    created() {
        this.getUserMsg();
    },
    methods: {
        //获取用户信息
        getUserMsg(){
            var data = 'userId='+localStorage.getItem('userIdPMD');
            pageData.getUserMsg(data).then(d => {
                if(d.resultCode == 200) {
                    this.userMsg = d.resultJson;
                    this.userMsg.birthday = this.userMsg.birthday.substring(0,10)
                    if(d.resultJson.sex==0){
                        this.selectedSex = "男"
                    }else{
                        this.selectedSex = "女"
                    }
                }else{
                    Toast(d.resultMessage);
                }
            })
        },
         //base64转
        dataURLtoBlob(dataurl,filename) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, {type:mime});
        },
        toBase64(imgFile){
            appnest.photo.getBase64Image({
                imagePath: imgFile, // 图片全路径
                success: res => {
                    this.base64Image = res.data; // 返回图片的base64编码数据
                    // var blod = this.dataURLtoBlob(this.base64Image,"file_"+Date.parse(new Date())+".png");
                    this.fdAjax(this.base64Image);
                },
                fail: res => {
                    Toast(res.errMsg);
                }
            });
        },
        fdAjax(blod){
            var _this = this;
            // var fd = new FormData();
            // fd.append("userId", localStorage.getItem("userIdPMD"));
            // fd.append("upfile", blod);
            var data = {base64File:blod};
            $.ajax({
                url: "http://118.144.88.221:8040/uploadBase64Servletbase64File",
                type: "POST",
                // processData: false,//不处理发送的数据，因为data值是FormData对象，不需要对数据做处理
                // contentType: false,//不设置Content-type请求头
                data: data,
                success: function(d) {
                    var d = JSON.parse(d);
                    if(d.resultCode == 200){
                        _this.userMsg.headImg = d.resultJson[0]
                        Toast('图片上传成功')
                    }else{
                        Toast(d.resultMessage)
                    }
                },
                error:function(err){
                    Toast("网络错误")
                }
            });
        },
      //选择图片
        chooseImg(){
            var _this = this;
            appnest.photo.album({
                success: res => {
                    this.imgFile = res.thumbnailPath;
                    if(this.imgFile){
                        _this.toBase64(this.imgFile);
                    }else{
                        _this.toBase64(res.thumbnailPath);
                    }
                    // this.imgFile = res.imagePath; // 拍照生成本地图片路径
                    // $('#imagebg').attr('src',this.getObjectURL(this.imgFile));
                },
                fail: res => {
                    Toast(res.errMsg);
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
                sex:this.userMsg.sex,
                birthdayStr:this.userMsg.birthday,
                headImg:this.userMsg.headImg,
                userId:localStorage.getItem('userIdPMD')
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
            this.$router.push('/modifySign');
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
            this.userMsg.birthday =base.formatDate(this.pickerValue,'yyyy-MM-dd')
        },
    },
    
}
</script>
<style scoped lang="less">
.modifyInfor{
    height: 100%;
    background-color:#f3f3f3;
}
.modifyInfor .header{
    background-color: #fff;
    z-index:999;
    width:100%;
    height:90px;
    line-height:90px;
    position: fixed;
    top:0
}
.modifyInfor .main{
    padding-top:90px;
    background-color:#f3f3f3;
    .list{
        background-color: #fff;
        padding:0 20px;
        margin-bottom:20px;
        .imgItem{
            border-bottom: 1px solid #ececec;/*no*/
            padding:10px 0;
            height:160px;
            line-height:160px;
        }
        .listItem{
            border-bottom: 1px solid #ececec;/*no*/
            // padding:0 10px;
            height:90px;
            line-height:90px;
            position: relative;
        }
        .listItemLast{
            // padding:0 10px;
            height:90px;
            line-height:90px;
        }
        .goDetail{
            float: right;
        }
        .icon-jinru{
            color: #999;
            font-size:38px;
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
        .userName{
            border: none;
            height: 70px;
            width:200px;
            text-align: right;
        }
    }
}
</style>
