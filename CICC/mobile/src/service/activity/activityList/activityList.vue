<template>
    <div class="activityList">
        <div slot="main" class="activitymain" >
            <div class="activity-item" v-for="(item,index) in listData" :key="index" @click="activityItemDetail(item)" >
                <div class="activity-img">
                    <img  :src="item.banner"> 
                </div>
                <div class="activity-con">
                    <div class="title">{{item.title}}</div>
                    <div class="place" v-if="item.showStatus!=6">
                        {{item.address}}
                    </div>
                    <div class="ts">
                        <div class="time" v-if="item.showStatus!=6">
                            {{item.beginDate}}
                        </div>
                        <div class="status">
                            <div class="watting statusDisplay" v-if="item.showStatus==4">未开始</div>
                            <div class="success statusDisplay" v-else-if="item.showStatus==5">进行中</div>
                            <div class="warn statusDisplay" v-else-if="item.showStatus==6">已结束</div>
                            <!-- <div :class="[item.showStatus!=6?'success':'warn','statusDisplay']">{{item.showStatus!=6?'进行中':'已结束'}}</div> -->
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="activity-item" v-for="(item,index) in processingList" :key="index" @click="activityItemDetail(item)" >
                <div class="activity-img">
                    <img  :src="item.banner"> 
                </div>
                <div class="activity-con">
                    <div class="title">{{item.title}}</div>
                    <div class="place" v-if="item.showStatus!=6">
                        {{item.address}}
                    </div>
                    <div class="ts">
                        <div class="time" v-if="item.showStatus!=6">
                            {{item.beginDate}}
                        </div>
                        <div class="status">
                            <div class="watting statusDisplay" v-if="item.showStatus==4">未开始</div>
                            <div class="success statusDisplay" v-else-if="item.showStatus==5">进行中</div>
                            <div class="warn statusDisplay" v-else-if="item.showStatus==6">已结束</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="activity-item" v-for="(item,index) in overList" :key="index" @click="activityItemDetail(item)" >
                <div class="activity-img">
                    <img  :src="item.banner"> 
                </div>
                <div class="activity-con">
                    <div class="title">{{item.title}}</div>
                    <div class="place" v-if="item.showStatus!=6">
                        {{item.address}}
                    </div>
                    <div class="ts">
                        <div class="time" v-if="item.showStatus!=6">
                            {{item.beginDate}}
                        </div>
                        <div class="status">
                            <div class="watting statusDisplay" v-if="item.showStatus==4">未开始</div>
                            <div class="success statusDisplay" v-else-if="item.showStatus==5">进行中</div>
                            <div class="warn statusDisplay" v-else-if="item.showStatus==6">已结束</div>
                        </div>
                    </div>
                </div>
            </div> -->
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
            notStartedList:[],
            processingList:[],
            overList:[]
        }
    },
    created(){
        // this.partList();
    },
    methods: {
        //跳转到活动详情页
        activityItemDetail(item) {
            this.$router.push({path:'/activityDetail',query:{id:item.id}});
            this.$emit('on-tellFather')  
        },
        partList(){
            console.log(this.listData)
            for(var i=0;i<this.listData.length;i++){
                switch(this.listData[i].showStatus){
                    case 4:
                        this.notStartedList.push(this.listData[i])
                        break;
                    case 5:
                        this.notStartedList.push(this.listData[i])
                        break;
                    case 6:
                        this.notStartedList.push(this.listData[i])
                        break;
                    default:
                        break;
                }
            }
        }
    },
    
}
</script>
<style scoped lang="less">
.activityList{
    background-color: #f3f3f3;
    padding-top:20px;
}
.activityList .activity-item{
    margin-bottom:15px;
    background-color: #fff;
}
.activityList .activity-item{
    height:200px;
    width:100%;
    display: flex;
}
.activityList .activity-img{
    flex: 1;
    display: inline-block;
    height:100%;
    padding:10px;
}
.activityList .activity-img img{
    height:180px;
    width:100%;
}
.activityList .activity-con{
    flex: 2;
    display: inline-block;
    height:100%;
    padding:10px;
    position: relative;
    .title{
        height:90px;
        line-height: 45px;
        // margin-bottom:10px;
        overflow: hidden;
        word-break: break-all;
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; 
    }
    .place{
        line-height: 30px;
        font-size:26px;/*px*/
        color:rgb(139, 139, 139);
        word-break: break-all;
        position: absolute;
        bottom:40px;
    }
    .ts{
        height:30px;
        line-height: 30px;
        position: absolute;
        bottom:10px;
        width:100%;
        .time{
            font-size:26px;/*px*/
            color:rgb(139, 139, 139);
            display: inline-block;
        }
        .status{
            display: inline-block;
            // position: relative;
            text-align: center;
            float: right;
            .statusDisplay{
                height:36px;
                line-height: 36px;
                position: absolute;
                // bottom: 10px;
                right:20px;
                bottom: 5px;
                padding:2px 10px;
                font-size: 24px;/*px*/
                color:#fff;
                border-radius: 20px; 
                vertical-align: middle;
            }
        }
    }
}
.activityList .watting{
    background-color: #f57260;
}
.activityList .success{
    background-color:#b99052;
}
.activityList .warn{
    background-color:#cfcfcf;
}
</style>
