<template>
    <div class="activityList">
        <div slot="main" class="activitymain" >
            <div class="activity-item" v-for="(item,index) in listData" :key="index" @click="activityItemDetail(item)" >
                <div class="activity-img">
                    <img src="../../../assets/images/zhongjin1.gif"> 
                </div>
                <div class="activity-con">
                    <div class="title">{{item.title}}</div>
                    <div class="place" v-if="item.status==1">
                        {{item.address}}
                    </div>
                    <div class="time" v-if="item.status==1">
                        {{item.beginDate}}
                    </div>
                </div>
                <div class="activity-status">
                    <div :class="[item.status==1?'green':'red','statusDisplay']">{{item.status==1?'报名中':'已结束'}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import "../../../assets/style/font-icon/iconfont.css"
import base from '../../../util/base'
import { Swipe, SwipeItem } from 'mint-ui';

export default {
    name:"ActivityList",
    components: {},
    props:{
        listData:{
            type:Array,
            default: () => []
        }
    },
    data() {
        return {
            title:"中金",
            homescrollTops:0,
        }
    },
    created(){

    },

    methods: {
        //跳转到活动详情页
        activityItemDetail(item) {
            this.$router.push({path:'/activityDetail',query:{id:item.id}});
            this.$emit('on-tellFather')  
        },
    },
    
}
</script>
<style scoped>
.activityList{
    background-color: #f3f3f3;
}
.activityList .activity-item{
    margin-bottom:20px;
    background-color: #fff;
}
.activityList .activity-item{
    height:190px;
    width:100%;
    display: flex;
}
.activityList .activity-img{
    flex: 1.3;
    display: inline-block;
    height:100%;
    padding:10px;
}
.activityList .activity-img img{
    height:170px;
    width:230px;
}
.activityList .activity-con{
    flex: 2;
    display: inline-block;
    height:100%;
    padding:10px;
}
.activityList .activity-con .title{
    height:90px;
    line-height: 45px;
    margin-bottom:10px;
    overflow: hidden;
    word-break: break-all;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; 
}
.activityList .activity-con .place{
    font-size:28px;/*px*/
    color:rgb(139, 139, 139);
}
.activityList .activity-con .time{
    font-size:28px;/*px*/
    color:rgb(139, 139, 139);
}
.activityList .activity-status{
    flex:1;
    position: relative;
    text-align: center;
}
.activityList .activity-status .statusDisplay{
    height:40px;
    line-height: 40px;
    position: absolute;
    bottom: 10px;
    right:20px;
    padding:2px 10px;
    font-size: 28px;/*px*/
    color:#fff;
    border-radius: 20px;
    
}
.activityList .green{
    background-color:#8bc34a;
}
.activityList .red{
    background-color:#e51c23;
}
</style>
