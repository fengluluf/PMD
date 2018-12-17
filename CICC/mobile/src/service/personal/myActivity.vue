<template>
    <div class="myActivity">
        <Layout @on-loadBottom="loadBottom" @on-loadTop="loadTop" :allLoaded="allLoaded">
            <div class="header" slot="header">
                <Header1 :title="title" :spanIcon="spanIcon" @on-tellFather="release"></Header1>
            </div>
            <div class="main" slot="main" ref="main">
                <mt-navbar v-model="selected" :fixed="true">
                    <mt-tab-item id="1">我参加的活动</mt-tab-item>
                    <mt-tab-item id="2">我创建的活动</mt-tab-item>
                </mt-navbar>
                <mt-tab-container v-model="selected">
                    <mt-tab-container-item id="1">
                        <div class="processing">
                            <div class="listTitle">进行中的活动</div>
                            <div>
                                <div class="activity-item" v-for="(item,index) in listDataPro" :key="index" @click="activityItemDetail(item)" >
                                    <div class="activity-img">
                                        <img :src="item.banner"> 
                                    </div>
                                    <div class="activity-con">
                                        <div class="title">{{item.title}}</div>
                                        <div class="place">
                                            {{item.address}}
                                        </div>
                                        <div class="time">
                                            {{item.beginDate}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="over">
                            <div class="listTitle">已结束的活动</div>
                            <div>
                                <div class="activity-item" v-for="(item,index) in listDataOver" :key="index" @click="activityItemDetail(item)" >
                                    <div class="activity-img">
                                        <img :src="item.banner"> 
                                    </div>
                                    <div class="activity-con">
                                        <div class="title">{{item.title}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="2">
                        <div class="processing">
                            <div class="listTitle">进行中的活动</div>
                            <div>
                                <div class="activity-item" v-for="(item,index) in listDataPro" :key="index" @click="activityItemDetail(item)" >
                                    <div class="activity-img">
                                        <img :src="item.banner"> 
                                    </div>
                                    <div class="activity-con">
                                        <div class="title">{{item.title}}</div>
                                        <div class="place">
                                            {{item.address}}
                                        </div>
                                        <div class="time">
                                            {{item.beginDate}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="over">
                            <div class="listTitle">已结束的活动</div>
                            <div>
                                <div class="activity-item" v-for="(item,index) in listDataOver" :key="index" @click="activityItemDetail(item)" >
                                    <div class="activity-img">
                                        <img :src="item.banner"> 
                                    </div>
                                    <div class="activity-con">
                                        <div class="title">{{item.title}}</div>
                                        <div class="place">
                                            {{item.address}}
                                        </div>
                                        <div class="time">
                                            {{item.beginDate}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </mt-tab-container-item>
                </mt-tab-container>
            </div>
        </Layout>
    </div>
</template>
<script>
import Header1 from "../../components/header/header1.vue"
import Layout from "../../components/layout/layout.vue"
import pageData from "../../api/personal/myActivity.js"
import "../../assets/style/font-icon/iconfont.css"
import { Navbar, TabItem } from 'mint-ui';

export default {
    name:"myActivity",
    components: {Header1,Layout},
    beforeRouteEnter(to, from, next) {  
        next(vm => {
            if(from.path=="/activityDetail"){
                vm.$children[0].$refs.main.scrollTop=vm.homescrollTops;
            }else{
                vm.loadTop();
                vm.homescrollTops=0;
            }
        });
    }, 
    data() {
        return {
            title:"我的活动",
            listDataPro:[{},{},{},{},{}],
            listDataOver:[{},{},{},{},{}],
            homescrollTops:0,
            pager: {
                pageNo: 1,
                pageSize: 10
            },
            allLoaded: false,
            allowLoadMore: true,
            selected:'1',
            spanIcon:'icon-bianji'
        }
    },
    watch: {
        selected(val){
            this.getDataList();
        }
    },
    created() {
        this.getDataList();
    },
    methods: {
        //获取列表上数据
        getDataList(){
            var data = {
                userId:localStorage.getItem("userIdPMD"),
                pageSize: this.pager.pageSize,
                pageNo: this.pager.pageNo,
            };
            var _this = this;
            if(this.selected == 1){
                pageData.getPublishedList(data).then((d) => {
                    _this.getResult(d);
                })
            }else{
                pageData.getApplyedList(data).then((d) => {
                    _this.getResult(d);
                })
            }
        },
        getResult(d){
            if(d.resultCode == 200){                    
                if(d.resultJson.pageNum === 1) {
                    // this.listData = d.resultJson.pageContent;
                    for(var i=0;i<d.resultJson.pageContent.length;i++){
                        if(d.resultJson.pageContent[i].status == 1){
                            this.listDataPro.push(d.resultJson.pageContent[i])
                        }else{
                            this.listDataOver.push(d.resultJson.pageContent[i])
                        }
                    }
                } else {
                    for(var i=0;i<d.resultJson.pageContent.length;i++){
                        if(JSON.stringify(this.listData).indexOf(JSON.stringify(d.resultJson.pageContent[i])) == -1){
                            // this.listData = this.listData.concat(d.resultJson.pageContent);
                            for(var j=0;j<d.resultJson.pageContent.length;j++){
                                if(d.resultJson.pageContent[j].status == 1){
                                    this.listDataPro = this.listDataPro.concat(d.resultJson.pageContent[j])
                                }else{
                                    this.listDataOver = this.listDataOver.concat(d.resultJson.pageContent[j])
                                }
                            }
                        }
                    }
                }
                if(d.resultJson.totalPage <= this.pager.pageNo) {   // 数据加载完毕
                    this.allLoaded = true;
                } else {
                    this.allLoaded = false;
                }
                this.allowLoadMore = true
            }
        },
        //上拉加载
        loadBottom() {
            if(this.allowLoadMore){
                this.pager.pageNo++;
                this.getDataList();
                this.allowLoadMore = false;
            }
            setTimeout(() => {
                this.allowLoadMore = true
            }, 2000);
        },
        //下拉刷新
        loadTop() {
            if(this.allowLoadMore){
                this.pager.pageNo=1;
                this.getDataList();
                this.allowLoadMore = false;
            }
            setTimeout(() => {
                this.allowLoadMore = true
            }, 2000);
        },
        //获取滚动的高度
        getscrollTops(){
            this.homescrollTops=this.$children[0].$refs.main.scrollTop;
        },
        //进入活动详情页
        activityItemDetail(item){
            this.$router.push({path:'/activityDetail',query:{id:item.id,itemUserId:item.activityUser.userId}});
            this.getscrollTops();
        },
        //发布活动
        release(){
            this.$router.push('/activityRelease');
        }
    },
    
}
</script>
<style scoped lang="less">
.myActivity{
    height: 100%;
    background-color: #f5f7f8;
}
.myActivity .header{
    background-color: #f5f7f8;
    z-index:999;
    width:100%;
    height:80px;
    line-height:80px;
    position: fixed;
    top:0
}
.myActivity .main{
    .mint-navbar{
        width: 100%;
        top:80px;
        height:80px;
        box-shadow:0 2px 1px 0px rgba(0,0,0,0.10);/*no*/
    }
    .mint-navbar .mint-tab-item.is-selected{
        background-color: #d9bc92;
        color:#fff;
        border-bottom: none;
        z-index: 999;
    }
    .mint-tab-container-item{
        margin-top:160px;
    }
    .over{
        margin-top:-20px;
    }
    .listTitle{
        padding:10px 20px;
        font-size: 28px;/*px*/
        font-weight: 600;
    }
    .activity-item{
        margin-bottom:20px;
        background-color: #fff;
    }
    .activity-item{
        height:190px;
        width:100%;
        display: flex;
    }
    .activity-img{
        flex: 1;
        display: inline-block;
        height:100%;
        padding:10px;
    }
    .activity-img img{
        height:170px;
        width:230px;
    }
    .activity-con{
        flex: 3;
        display: inline-block;
        height:100%;
        padding:10px;
    }
    .activity-con .title{
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
    .activity-con .place{
        font-size:28px;/*px*/
        color:rgb(139, 139, 139);
    }
    .activity-con .time{
        font-size:28px;/*px*/
        color:rgb(139, 139, 139);
    }
}
</style>
