<template>
    <div class="activityRelease">
        <div slot="header" class="header">
            <Header1 :title="title" :rightTitle="rightTitle" @on-tellFather="release"></Header1>
        </div>
        <div class="main">
             <div class="activity-detail-img">
                <img :src="activityData.banner" v-if="activityData.banner" id="imagebg">
                <img src="../../assets/images/zhongjin1.gif" id="imagebg" v-else> 
            </div>
            <div class="activity-detail-con">
                <div class="activity-detail-main">
                    <div class="activity-detail-time bf">
                        <span class="bfTitle">活动名称：</span>
                        <span class="bfCon">
                            <input type="text" placeholder="请输入活动名称" v-model="activityData.title" class="title" maxlength="30"/>
                            <mt-button type="default" class="updateImg" @click="chooseImg">上传图片</mt-button>
                            <!-- <input type="file" class="chooseImg" @change="chooseImg" id="upfile"> -->
                        </span>
                    </div>
                    <div class="activity-detail-time bf" @click="setBeginDate">
                        <span class="bfTitle">开始时间：</span>
                        <span class="bfCon">
                            <mt-datetime-picker ref="pickerBegin" 
                                :visible="showBegin" 
                                type="datetime" 
                                v-model="pickerBeginValue"
                                @confirm="handleBegin"
                                :startDate="beginDate"
                                :endDate="endDate"
                                year-format="{value} 年"
                                month-format="{value} 月"
                                date-format="{value} 日">
                            </mt-datetime-picker>
                            <span class="iconfont icon-buoumaotubiao52 bfRight"></span>
                            <span>{{selectBegin}}</span>
                        </span>
                        
                    </div>
                    <div class="activity-detail-time bf" @click="setEndDate">
                        <span class="bfTitle">结束时间：</span>
                        <span class="bfCon">
                            <mt-datetime-picker ref="pickerEnd" 
                                :visible="showEnd" 
                                type="datetime" 
                                v-model="pickerEndValue"
                                @confirm="handleEnd"
                                :startDate="beginDate"
                                :endDate="endDate"
                                year-format="{value} 年"
                                month-format="{value} 月"
                                date-format="{value} 日">
                            </mt-datetime-picker>
                            <span class="iconfont icon-buoumaotubiao52 bfRight"></span>
                            <span>{{selectEnd}}</span>
                        </span>
                    </div>
                    <div class="activity-detail-place bf">
                        <span class="bfTitle">地点：</span>
                        <span class="bfCon">
                            <input type="text" placeholder="请输入活动地点" v-model="activityData.address" class="place"/>
                        </span>
                    </div>
                    <div class="activity-detail-content">
                        <div class="detTitle">活动详情</div>
                        <div class="detCon">
                             <!-- ref="activityDetail" @scroll="handleScroll" -->
                            <textarea style="resize:none" class="activityDetail" rows="15" v-model="activityData.content" maxlength="2000"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Header1 from "../../components/header/header1.vue"
import pageData from "../../api/personal/activityRelease.js"
import "../../assets/style/font-icon/iconfont.css"
import base from '../../util/base'
import $ from 'jquery'
import { Actionsheet,DatetimePicker,Toast,Button,MessageBox } from 'mint-ui';

export default {
    components: {Header1},
    data() {
        return {
            //头部信息
            title:"活动发布",
            rightTitle:'发布',
            selectBegin:'', //开始时间选中数据
            selectEnd:'',   //结束时间选中数据
            activityData:{  //新闻数据
                banner:'http://118.144.88.221/group1/M00/00/00/dpBY3VwXaC6AIPCgAABHTbE9hIw001.gif',
                title:'',
                beginTime:'',
                endTime:'',
                address:'',
                content:''
            },
            errorMsg:{   //错误信息
                title:'活动标题不可为空',
                beginTime:'活动开始时间不可为空',
                endTime:'活动结束时间不可为空',
                address:'活动地址不可为空',
                content:'活动内容不可为空'
            },
            showBegin:true,  //是否显示时间选择器
            showEnd:true,  //是否显示时间选择器
            pickerBeginValue:'2018-06-06 12:30', //选择的活动开始时间
            pickerEndValue:'2018-06-06 12:30', //选择的活动结束时间
            // pickerBeginValue:base.formatDate(new Date(),'yyyy-MM-dd hh:mm'), //选择的活动开始时间
            // pickerEndValue:base.formatDate(new Date(),'yyyy-MM-dd hh:mm'), //选择的活动结束时间
            beginDate:new Date('2000-01-01'),//开始时间
            endDate:new Date('2050-12-31'),//结束时间
            nowTime:'',//当前时间
            base64Image:''
        }
    },
    created() {
        this.nowTime = new Date().getTime();
    },
    methods: {
        handleScroll(){
            // document.querySelector('.activityDetail').offsetHeight = this.$refs.activityDetail.scrollHeight
            this.$refs.activityDetail.style.height = this.$refs.activityDetail.scrollHeight
            console.log(this.$refs)
        },
        //设置活动开始时间
        setBeginDate(){
            if(!this.showBegin){
                this.showBegin = true;
                this.$refs.pickerBegin.close()
            }else{
                this.showBegin = false;
                this.$refs.pickerBegin.open()
            }
        },
        //设置活动结束时间
        setEndDate(){
            if(!this.showEnd){
                this.showEnd = true;
                this.$refs.pickerEnd.close()
            }else{
                this.showEnd = false;
                this.$refs.pickerEnd.open()
            }
        },
        //开始时间选择器确定事件
        handleBegin(){ 
            var bt = this.pickerBeginValue.getTime();
            if(bt<this.nowTime){
                MessageBox.alert('活动开始时间不可小于当前时间!').then(action => { });
                return;
            }
            if(this.activityData.endTime&&this.activityData.endTime>=bt){
                MessageBox.alert('活动开始时间需小于结束时间!').then(action => { });
                return;
            }else{
                this.selectBegin = base.formatDate(this.pickerBeginValue,'yyyy-MM-dd hh:mm')
                this.activityData.beginTime = bt;
            }
        },
        //结束时间选择器确定事件
        handleEnd(){ 
            var et = this.pickerEndValue.getTime();
            if(et<this.nowTime){
                MessageBox.alert('活动结束时间不可小于当前时间!').then(action => { });
                return;
            }
            if(this.activityData.beginTime&&this.activityData.beginTime>=et){
                MessageBox.alert('活动结束时间需大于开始时间!').then(action => { });
                return;
            }else{
                this.selectEnd = base.formatDate(this.pickerEndValue,'yyyy-MM-dd hh:mm')
                this.activityData.endTime = et;
            }
        },
        //发布
        release(){
            var data = {};
            for(var key in this.activityData){
                if(this.activityData[key]){
                    this.errorMsg[key] == "";
                }else{
                    Toast(this.errorMsg[key]);
                    return;
                }
            }
            //校验活动标题字数
            if(this.activityData.title.length<2){
                Toast("活动标题字数不可少于2");
                return;
            }
            //检验活动内容字数
            if(this.activityData.content.length<30){
                Toast("活动内容字数不可少于30");
                return;
            }
            data = this.activityData;
            data.userId = localStorage.getItem('userIdPMD');
            pageData.insert(data).then(d=>{
                if(d.resultCode == 200) {
                    Toast("发布成功");
                    this.$router.push('/myActivity');
                }else{
                    Toast(d.resultMessage);
                }
            })
        },
        //将图片转为base64
        toBase64(imgFile){
            appnest.photo.getBase64Image({
                imagePath: imgFile, // 图片全路径
                success: res => {
                    this.base64Image = res.data; // 返回图片的base64编码数据
                    this.fdAjax(this.base64Image);
                },
                fail: res => {
                    Toast(res.errMsg);
                }
            });
        },
        //上传图片
        fdAjax(blod){
            var _this = this;
            var data = {base64File:blod};
            $.ajax({
                url: "http://118.144.88.221:8040/uploadBase64Servletbase64File",
                type: "POST",
                data: data,
                success: function(d) {
                    var d = JSON.parse(d);
                    if(d.resultCode == 200){
                        _this.activityData.banner = d.resultJson[0]
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
                },
                fail: res => {
                    Toast(res.errMsg);
                }
            });
        
        },
    },
    
}
</script>
<style scoped>
.activityRelease{
    height: 100%;
}
.picker-item{
    padding:0px!important;
}
.activityRelease .header{
    background-color: #fff;
    z-index:999;
    width:100%;
    height:80px;
    line-height:80px;
    position: fixed;
    top:0
}
.activityRelease .main{
    padding-top:80px;
}
.activityRelease .activityRelease-main{
    margin-top:80px;
    overflow-y: scroll
}
.activityRelease .activity-detail-img{
    height:400px;
    width:100%;
    text-align: center;
    margin:10px 0;
}
.activityRelease .activity-detail-img img{
    height:400px;
    width:96%;
}
.activityRelease .activity-detail-name{
    border-bottom: 1px solid #999;
    padding:0 20px;
    line-height:70px;
    text-align:center;
}
.activityRelease .activity-detail-main{
    padding:0 20px;
}
.activityRelease .activity-detail-main .activityDetail{
    width: 100%;
    border: 1px solid #f5f7f8;
    border-radius: 10px;
    overflow: scroll;
}
.activityRelease .bf{
    font-size: 28px;/*px*/
    border-bottom: 1px solid #f5f7f8;
    line-height:80px;
    height:auto;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    display: flex;
}
.activityRelease .bf .updateImg{
    height:70px;
    width: 27%;
    padding: 0;
    font-size: 28px;/*px*/
}
.activityRelease .bf .chooseImg{
    opacity: 0;
    position: absolute;
    top:0;
    right:0;
    width: 27%;
}
.activityRelease .bfTitle{
    flex: 1;
}
.activityRelease .bfCon{
    flex: 3;  
    text-align: right;
    position: relative;
}
.activityRelease .bfRight{
    float: right;
}
.activityRelease .bfCon input{
    border:none;
    height:70px;
    line-height: 70px;
}
.activityRelease .bfCon .title{
    width: 70%;
}
.activityRelease .bfCon .place{
    width: 100%;
}
.activityRelease .detTitle{
    height:80px;
    line-height:80px;
    font-size: 28px;/*px*/
}
.activityRelease .detCon{
    font-size: 24px;/*px*/
}
</style>
