<template>
    <div class="activityDetail">
        <div slot="header" class="activityDetail-header">
            <Header1 :title="title"></Header1>
        </div>
        <div slot="main" ref="main" class="activityDetail-main">
            <div class="activity-detail-img">
                <img :src="activityDetail.banner" v-if="activityDetail.banner">
                <img src="../../../assets/images/zhongjin1.gif" v-else> 
            </div>
            <div class="activity-detail-con">
                <div class="activity-detail-name">{{activityDetail.title}}</div>
                <div class="activity-detail-main">
                    <div class="activity-detail-time bf" v-if="activityDetail.showStatus!=6">
                        <span>时间：</span>
                        <span>{{activityDetail.beginDate}}---{{activityDetail.endDate}}</span>
                    </div>
                    <div class="activity-detail-place bf" v-if="activityDetail.showStatus!=6">
                        <span>地点：</span>
                        <span>{{activityDetail.address}}</span>
                    </div>
                    <div class="activity-detail-author bf" v-if="activityDetail.showStatus!=6">
                        <span>发起人：</span>
                        <span>{{activityDetail.editorName}}</span>
                    </div>
                    <div class="activity-detail-content">
                        <div class="detTitle">活动详情</div>
                        <div class="detCon">&emsp;&emsp;{{activityDetail.content}}</div>
                        <div class="detTitle">报名人数：{{activityDetail.applyCount}}人</div>
                    </div>
                </div>
            </div>
            <div class="activity-detail-applyPer" v-if="itemUserId==userId">
                <div class="applyPerItem" v-for="(item,key) in applyUser" :key="key">
                    <div class="applyPer-img">
                        <img :src="item.headImg" class="img" v-if="item.headImg"> 
                        <img src="../../../assets/images/head.jpg" class="img" v-else>
                    </div>
                    <div class="applyPer-name">{{item.nickName}}</div>
                </div>
            </div>
            <div class="activity-detail-apply" v-if="itemUserId==userId">
                <mt-button type="danger" class="hasEnd" disabled v-html="'已结束'" v-if="activityDetail.showStatus==6"></mt-button>
                <mt-button type="default" class="apply" disabled v-html="'进行中'" v-else></mt-button>
            </div>
            <div class="activity-detail-apply" v-else>
                <mt-button type="default" class="hasEnd" disabled v-html="'已结束'" v-if="activityDetail.showStatus==6"></mt-button>
                <mt-button type="default" class="apply" @click="handleClick" v-html="applyData.statu" v-else></mt-button>
            </div>
        </div>
    </div>
</template> 
<script>
import pageData from "../../../api/activityDetail/activityDetail.js"
import Header1 from "../../../components/header/header1.vue"
import "../../../assets/style/font-icon/iconfont.css"
import { Button,Toast,MessageBox } from 'mint-ui';

export default {
    name:"ActivityDetail",
    components: {Header1},
    beforeRouteLeave(to, from, next) {  
        to.meta.keepAlive = true;  
        next();  
    },
    data() {
        return {
            title:"活动详情",
            activityDetail:{},
            applyData:{
                statu:'报名',
                isApply:false,
            },
            userId:'',
            itemUserId:'',
            applyUser:[],
        }
    },
    created(){
        this.userId = localStorage.getItem("userIdPMD")
        if(this.$route.query.itemUserId){
            this.itemUserId = this.$route.query.itemUserId
        }
        this.getActivityDetail();
        this.getApplyUser();
    },
    methods: {
        //根据id获取活动详情
        getActivityDetail(){
            var _this = this;
            var data = {
                id:this.$route.query.id,
                userId:localStorage.getItem("userIdPMD"),
            }
            pageData.getDetail(data).then(function (d) {
                if(d.resultCode == 200) {
                    _this.activityDetail = d.resultJson;
                    if(d.resultJson.activityUser.applyStatus){
                        _this.applyData.isApply = true;
                        _this.applyData.statu = "已报名"
                    }else{
                        _this.applyData.isApply = false;
                        _this.applyData.statu = "报名"
                    }
                }else{
                    Toast(d.resultMessage);
                }
            })
        },
        //根据id获取报名人数
        getApplyUser(){
            var _this = this;
            var data = {
                id:this.$route.query.id,
                userId:localStorage.getItem('userIdPMD'),
            }
            pageData.getApplyUser(data).then(function (d) {
                if(d.resultCode == 200) {
                    _this.applyUser = d.resultJson.activityUserList
                }else{
                    Toast(d.resultMessage);
                }
            })
        },
        //点击报名
        handleClick(){
            var _this = this; 
            
            if(!this.applyData.isApply){
                var data = {
                    id:this.$route.query.id,
                    userId:localStorage.getItem("userIdPMD"),
                }
                pageData.apply(data).then(function (d) {
                    if(d.resultCode == 200) {
                        Toast({message: "报名成功"});
                        _this.applyData.statu = "已报名";
                        _this.applyData.isApply = true;
                        // _this.getActivityDetail(this.itemId);
                    }else{
                        Toast(d.resultMessage);
                    }
                })
            }else{
                MessageBox({
                    title:'',
                    message: '确定取消报名?',
                    showCancelButton: true
                }).then(action => {
                    var data = {
                        activityId:this.$route.query.id,
                        userId:localStorage.getItem("userIdPMD"),
                    }
                    pageData.cancelApply(data).then((d) => {
                        if(d.resultCode == 200) {
                            _this.applyData.statu = "报名";
                            _this.applyData.isApply = false;
                            // _this.getActivityDetail(this.itemId);
                        }else{
                            Toast(d.resultMessage);
                        }
                    })
                });
                
            }
        },
    }
    
}
</script>
<style scoped lang="less">
.activityDetail .activityDetail-header{
    background-color: #f5f7f8;
    padding:0 20px;
    width:100%;
    box-sizing: border-box;
    text-align: center;
    height: 80px;
    line-height: 80px;
    position: fixed;
    top:0
}
.activityDetail .icon-fanhui{
    float: left;
    font-size:32px;/*px*/
}
.activityDetail .activityDetail-main{
    margin-top:80px;
    overflow-y: scroll
}
.activityDetail .activity-detail-img{
    height:420px;
    width:100%;
    text-align: center;
    padding:10px 0;
}
.activityDetail .activity-detail-img img{
    height:400px;
    width:96%;
}
.activityDetail .activity-detail-name{
    border-bottom: 1px solid #999;
    padding:0 20px;
    line-height:70px;
    text-align:center;
}
.activityDetail .activity-detail-main{
    padding:0 20px;
    
}
.activityDetail .bf{
    font-size: 28px;/*px*/
    border-bottom: 1px solid #999;
    line-height:80px;
    height:auto;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
}
.activityDetail .detTitle{
    height:80px;
    line-height:80px;
    font-size: 28px;/*px*/
}
.activityDetail .detCon{
    font-size: 24px;/*px*/
}
.activityDetail .applyPerItem{
    margin:10px 10px;
    height:162px;
    border: 1px solid #999;
    .applyPer-img{
        display: inline-block;
        padding:10px;
        .img{
            height:140px;
            width:140px;
            border-radius: 70px;
        }
    }
    .applyPer-name{
        height: 160px;
        display: inline-block;
        vertical-align: middle;
    }
}
.activityDetail .activity-detail-apply{
    width:100%;
    box-sizing: border-box;
    text-align: center;
    margin-top:20px;
    padding:20px 0;
}
.activityDetail .activity-detail-apply .apply{
    height:60px;
    width:200px;
    font-size:28px;/*px*/
    background-color: #8bc34a;
    color: #fff;
}
.activityDetail .activity-detail-apply .hasEnd{
    height:60px;
    width:200px;
    font-size:28px;/*px*/
}
</style>
