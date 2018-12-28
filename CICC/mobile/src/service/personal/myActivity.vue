<template>
    <div class="myActivity">
        <Layout @on-loadBottom="loadBottom" @on-loadTop="loadTop" :allLoaded="allLoaded">
            <div class="header" slot="header">
                <mt-header :title="title" fixed>
                    <mt-button icon="back" slot="left" @click="back"></mt-button>
                </mt-header>
                <mt-navbar v-model="selected" :fixed="true">
                    <mt-tab-item id="1">我参加的活动</mt-tab-item>
                    <mt-tab-item id="2">我创建的活动</mt-tab-item>
                </mt-navbar>
            </div>
            <div class="main" slot="main" ref="main">
                
                <mt-tab-container v-model="selected">
                    <mt-tab-container-item id="1">
                        <div class="processing">
                            <div class="listTitle" v-show="JSON.stringify(this.listDataPro)!='[]'">进行中的活动</div>
                            <div>
                                <div class="activity-item" v-for="(item,index) in listDataPro" :key="index" @click="activityItemDetail(item)" >
                                    <div class="activity-img"><img :src="item.banner"></div>
                                    <div class="activity-con">
                                        <div class="title">{{item.title}}</div>
                                        <div class="place">{{item.address}}</div>
                                        <div class="ts"><div class="time">{{item.beginDate}}</div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="over">
                            <div class="listTitle" v-show="JSON.stringify(this.listDataOver)!='[]'">已结束的活动</div>
                            <div>
                                <div class="activity-item" v-for="(item,index) in listDataOver" :key="index" @click="activityItemDetail(item)" >
                                    <div class="activity-img"><img :src="item.banner"></div>
                                    <div class="activity-con">
                                        <div class="title">{{item.title}}</div>
                                        <div class="place">{{item.address}}</div>
                                        <div class="ts"><div class="time">{{item.beginDate}}</div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="noMore" v-show="noMore">没有更多了</div>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="2">
                        <div class="processing">
                            <div class="listTitle" v-show="JSON.stringify(this.listDataPro)!='[]'">进行中的活动</div>
                            <div>
                                <div class="activity-item" v-for="(item,index) in listDataPro" :key="index" @click="activityItemDetail(item)" >
                                    <div class="activity-img"><img :src="item.banner"></div>
                                    <div class="activity-con">
                                        <div class="title">{{item.title}}</div>
                                        <div class="place">{{item.address}}</div>
                                        <div class="ts">
                                            <div class="time">{{item.beginDate}}</div>
                                            <div class="status">
                                                <div class="watting statusDisplay" v-if="item.status==1">待审核</div>
                                                <div class="success statusDisplay" v-else-if="item.status==2">已通过</div>
                                                <div class="error statusDisplay" v-else-if="item.status==3">未通过</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="over">
                            <div class="listTitle" v-show="JSON.stringify(this.listDataOver)!='[]'">已结束的活动</div>
                            <div>
                                <div class="activity-item" v-for="(item,index) in listDataOver" :key="index" @click="activityItemDetail(item)" >
                                    <div class="activity-img"><img :src="item.banner"></div>
                                    <div class="activity-con">
                                        <div class="title">{{item.title}}</div>
                                        <div class="place">{{item.address}}</div>
                                        <div class="ts"><div class="time">{{item.beginDate}}</div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="noMore" v-show="noMore">没有更多了</div>
                    </mt-tab-container-item>
                </mt-tab-container>
            </div>
        </Layout>
        <div class="edit" @click="release">
            <span class="iconfont icon-tubiao09"></span>
        </div>
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
            listData:[],
            listDataPro:[],
            listDataOver:[],
            homescrollTops:0,
            pager: {
                pageNo: 1,
                pageSize: 10
            },
            allLoaded: false,
            allowLoadMore: true,
            selected:'1',
            spanIcon:'icon-bianji',
            noMore:false   //是否显示没有更多
        }
    },
    watch: {
        selected(val){
            this.noMore = false;
            this.listDataPro = [];
            this.listDataOver = [];
            this.getDataList();
        },
        $route(to, from){
            const fromDepth = from.name
            if(fromDepth == "activityRelease"){
                this.noMore = false;
                this.selected = "2"
                this.getDataList();
            }
            if(fromDepth == "personal"){
                this.noMore = false;
                this.selected = "1"
                this.getDataList();
            }
        },
    },
    created() {
        // this.getDataList();
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
                pageData.getApplyedList(data).then((d) => {
                    _this.getResult(d);
                })
            }else{
                pageData.getPublishedList(data).then((d) => {
                    _this.getResult(d);
                })
            }
        },
        getResult(d){
            if(d.resultCode == 200){                    
                if(d.resultJson.pageNum === 1) {
                    this.listDataPro = [];
                    this.listDataOver = [];
                    this.listData = d.resultJson.pageContent
                    for(var i=0;i<d.resultJson.pageContent.length;i++){
                        if(d.resultJson.pageContent[i].showStatus == 6){
                            this.listDataOver.push(d.resultJson.pageContent[i])
                        }else{
                            this.listDataPro.push(d.resultJson.pageContent[i])
                        }
                    }
                } else {
                    for(var i=0;i<d.resultJson.pageContent.length;i++){
                        if(JSON.stringify(this.listData).indexOf(JSON.stringify(d.resultJson.pageContent[i])) == -1){
                            for(var j=0;j<d.resultJson.pageContent.length;j++){
                                if(d.resultJson.pageContent[j].showStatus == 6){
                                    this.listDataOver = this.listDataOver.concat(d.resultJson.pageContent[j])   
                                }else{
                                    this.listDataPro = this.listDataPro.concat(d.resultJson.pageContent[j])
                                }
                            }
                        }
                    }
                }
                if(d.resultJson.totalPage <= this.pager.pageNo) {   // 数据加载完毕
                    this.allLoaded = true;
                    this.noMore = true;
                } else {
                    this.allLoaded = false;
                    this.noMore = false;
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
            this.homescrollTops = this.$children[0].$refs.main.scrollTop;
        },
        //进入活动详情页
        activityItemDetail(item){
            this.$router.push({path:'/activityDetail',query:{id:item.id,itemUserId:item.editorId}});
            this.getscrollTops();
        },
        //发布活动
        release(){
            this.$router.push('/activityRelease');
        },
        //返回个人中心
        back() {
            this.$router.push('/personal');
        },
    },
    
}
</script>
<style scoped lang="less">
.myActivity{
    // height: 100%;
    background-color: #f5f7f8;
    .mint-navbar{
        width: 100%;
        top:90px;
        height:75px;
        box-shadow:0 2px 1px 0px rgba(0,0,0,0.10);/*no*/
    }
    .mint-navbar .mint-tab-item.is-selected{
        background-color: #d9bc92;
        color:#fff;
        border-bottom: none;
        z-index: 999;
    }
    .mint-navbar .mint-tab-item{
        padding:26px 0;
    }
    .edit{
        background-color: #fff;
        border-radius: 40px;
        text-align: center;
        position: fixed;
        bottom:60px;
        right:50px;
        height:80px;
        width: 80px;
        line-height: 80px;
        z-index: 1000;
        box-shadow:0 2px 10px 0px rgba(0,0,0,0.3);/*no*/
    }
    .edit .iconfont{
        font-size: 35px;/*px*/
        color: #b99052
    }
}
.myActivity .header{
    background-color: #f5f7f8;
    z-index:999;
    width:100%;
    height:90px;
    line-height:90px;
    position: fixed;
    top:0;
    .mint-header{
        background-color: #b99052;
        color: #fff;
        border: 1px solid #F3F3F3;
        height: 90px;
        font-size: 32px!important;/*px*/
    }
}
.myActivity .main{
    background-color: #f5f7f8;
    margin-top:170px;
    
    // .mint-tab-container-item{
    //      margin-top:160px;
    // }
    .over{
        margin-top:-20px;
    }
    .noMore{
        height: 140px;
        text-align: center;
        padding-top:40px;
        font-size: 28px;
        color:#999
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
        height:200px;
        width:100%;
        display: flex;
    }
    .activity-img{
        flex: 1.3;
        display: inline-block;
        height:100%;
        padding:10px;
    }
    .activity-img img{
        height:180px;
        width:100%;
    }
    .activity-con{
        flex: 2;
        display: inline-block;
        height:100%;
        padding:10px;
        position: relative;
        .title{
            height:90px;
            line-height: 45px;
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
        .time{
            font-size:28px;/*px*/
            color:rgb(139, 139, 139);
            // position: absolute;
            // bottom:10px;
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
                    height:30px;
                    line-height: 30px;
                    position: absolute;
                    // bottom: 10px;
                    right:20px;
                    padding:2px 10px;
                    font-size: 24px;/*px*/
                    color:#fff;
                    border-radius: 20px; 
                    vertical-align: middle;
                }
                .success{
                    background-color:#8bc34a;
                }
                .error{
                    background-color:#e51c23;
                }
                .watting{
                    background-color:#c9c500;
                }
            }
        }
    }
    .activity-status{
        flex:1;
        position: relative;
        text-align: center;
        .statusDisplay{
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
        .success{
            background-color:#8bc34a;
        }
        .error{
            background-color:#e51c23;
        }
        .watting{
            background-color:#c9c500;
        }
    }
}
</style>
