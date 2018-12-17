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
                            <input type="text" placeholder="(4-20个字)" v-model="activityData.title" class="title"/>
                            <mt-button type="default" class="updateImg">上传图片</mt-button>
                            <input type="file" class="chooseImg" @change="chooseImg" id="upfile">
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
                                :endDate="endDate">
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
                            <textarea class="activityDetail" rows="10"></textarea>
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
import { Actionsheet,DatetimePicker,Toast,Button } from 'mint-ui';

export default {
    components: {Header1},
    data() {
        return {
            title:"活动发布",
            rightTitle:'发布',
            selectBegin:'',
            selectEnd:'',
            activityData:{
                banner:'',
                title:'',
                beginTime:'',
                endTime:'',
                address:'',
                content:''
            },
            showBegin:true,  //是否显示时间选择器
            showEnd:true,  //是否显示时间选择器
            pickerBeginValue:'2018-06-06', //选择的活动开始时间
            pickerEndValue:'2018-06-06', //选择的活动结束时间
            beginDate:new Date('2018-01-01'),//开始时间
            endDate:new Date('2050-12-31')//结束时间
        }
    },
    created() {
        
    },
    methods: {
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
        //时间选择器确定事件
        handleBegin(){ 
            this.selectBegin = base.formatDate(this.pickerBeginValue,'yyyy-MM-dd hh:mm')
            this.activityData.beginTime = this.pickerBeginValue
        },
        handleEnd(){ 
            this.selectEnd = base.formatDate(this.pickerEndValue,'yyyy-MM-dd hh:mm')
            this.activityData.endTime = this.pickerEndValue;
        },
        //发布
        release(){
            var data = {};
            data = this.activityData;
            data.userId = localStorage.getItem('userIdPMD');
            pageData.insert(data).then(function (d) {
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
                        _this.activityData.banner = d.resultJson[0]
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
    },
    
}
</script>
<style scoped>
.activityRelease{
    height: 100%;
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
    border: none;
}
.activityRelease .bf{
    font-size: 28px;/*px*/
    border-bottom: 1px solid #999;
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
