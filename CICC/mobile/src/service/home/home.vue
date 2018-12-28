<template>
    <div class="home">
        <Layout @on-loadBottom="loadBottom" @on-loadTop="loadTop" :allLoaded="allLoaded">
            <div slot="header" id="header">
                <Header :title="title"></Header>
                <!-- <mt-header :title="title">
                    <mt-button icon="back" slot="left" @click="back"></mt-button>
                    <mt-button slot="right" @click="goPersonal">
                        <span class="iconfont icon-weibiaoti2fuzhi12"></span>
                    </mt-button>
                </mt-header> -->
                <TitleNav class="titleNav" @on-tabChange="changeTab"></TitleNav>   
            </div>
            <div slot="main" ref="main" class="main" v-if="this.type == 'news'">
                <NewsList :listData="listData" @on-tellFather="getscrollTops"></NewsList>
                <div class="noMore" v-show="noMore">没有更多了</div>
            </div>
            <div slot="main" ref="main" class="main" v-else-if="this.type == 'activity'" >
                <ActivityList :listData="listData" @on-tellFather="getscrollTops"></ActivityList>
                <div class="noMore" v-show="noMore">没有更多了</div>
            </div>
            <div slot="main" ref="main" class="main" v-else>
                <div class="nothing">此模块待开发中......</div>
            </div>
        </Layout>
        <div class="edit" @click="newsDetials" v-if="this.type == 'news'">
            <span class="iconfont icon-tubiao09"></span>
        </div>
    </div>
</template>
<script>
import pageData from "../../api/home/home.js"
import Layout from "../../components/layout/layout.vue"
import Header from "../../components/header/header.vue"
import TitleNav from "../../components/titleNav/titleNav.vue"
import Search from "../../components/search/search.vue"
import NewsList from "../news/newsList/newsList.vue"
import ActivityList from "../activity/activityList/activityList.vue"

import "../../assets/style/font-icon/iconfont.css"
import base from '../../util/base'
import { Indicator } from 'mint-ui';

export default {
    components: {Layout,Header,TitleNav,Search,NewsList,ActivityList},
    beforeRouteEnter(to, from, next) {  
        next(vm => {
            if(from.path=="/activityDetail"){
                vm.$children[0].$refs.main.scrollTop = vm.homescrollTops;
            }else if(from.path=="/newsDetials"){
                vm.$children[0].$refs.main.scrollTop = vm.homescrollTops-200;
            }else{
                // vm.loadTop();
                vm.homescrollTops=0;
            }
        });
    }, 
    data() {
        return {
            title:"中金",
            searchWord:"",
            listData:[],
            pager: {
                pageNo: 1,
                pageSize: 10
            },
            allLoaded: false,
            allowLoadMore: true,
            type:"news",
            homescrollTops:0,
            pageName:'',
            noMore:false
        }
    },
    created(){
        this.getDataList();
    },
    // activated(){
    //     this.getDataList()
    // },
    watch:{
        $route(to, from){
            const fromDepth = from.name;
            const toParams = to.params;
            if(fromDepth == "newsDetials"){
                for(var i=0;i<this.listData.length;i++){
                    if(toParams.id==this.listData[i].id){
                        this.listData[i].commentCount = toParams.commentCount
                        this.listData[i].concernCount = toParams.concernCount
                        this.listData[i].isConcern = toParams.isConcern
                    }
                }
            }
        },
        type(){
            this.listData = []
        }
    },
    methods: {
        //返回中金通
        back(){
            appnest.navigation.closeWindow();
        },
        //进入个人中心
        goPersonal(){
            this.$router.push("/personal")
        },
        //获取数据列表
        getDataList() {
            var data = {
                userId:localStorage.getItem("userIdPMD"),
                pageSize: this.pager.pageSize,
                pageNo: this.pager.pageNo,
            }
            var _this = this;
            if(this.type == 'news'){
                pageData.getNewsList(data).then((d) => {
                    this.getResult(d);
                })
            }else if(this.type == 'activity'){
                pageData.getActivityList(data).then((d) => {
                    _this.getResult(d);
                })
            }
        },
        getResult(d){
            if(d.resultCode == 200){ 
                if(d.resultJson.pageNum === 1) {
                    this.listData = d.resultJson.pageContent;
                } else {
                    for(var i=0;i<d.resultJson.pageContent.length;i++){
                        if(JSON.stringify(this.listData).indexOf(JSON.stringify(d.resultJson.pageContent[i])) == -1){
                            this.listData = this.listData.concat(d.resultJson.pageContent);
                        }
                    }
                }
                if(d.resultJson.totalPage <= this.pager.pageNo) {   // 数据加载完毕
                    this.noMore = true;
                    this.allLoaded = true;
                } else {
                    this.noMore = false;
                    this.allLoaded = false;
                }
                this.allowLoadMore = true
            }
            
        },
        //跳转到新闻发布页
        newsDetials(){
            this.$router.push('/newsPublish')
        },
        changeTab(item) {
            this.type = item.id;
            this.pager.pageNo=1;
            this.allLoaded = false;
            this.noMore = false;
            this.getDataList();
        },
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
        getscrollTops(data){
            this.homescrollTops = this.$children[0].$refs.main.scrollTop;
        },
    },
    
}
</script>
<style scoped>
.home #header{
    background-color: #f3f3f3;
    z-index:999;
    width:100%;
    box-shadow:0 2px 1px 0px rgba(0,0,0,0.10);/*no*/
    box-sizing: border-box;
}
.home .mint-header{
    background-color: #b99052;
    color: #fff;
    border: 1px solid #F3F3F3;
    height: 90px;
    font-size: 32px!important;/*px*/
}
.home .main{
    margin-top:164px;
}
.home .main .noMore{
    height: 140px;
    text-align: center;
    padding-top:40px;
    font-size: 28px;
    color:#999
}
.home .main .nothing{
    padding-top:60px;
    width:100%;
    text-align: center;
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
</style>
