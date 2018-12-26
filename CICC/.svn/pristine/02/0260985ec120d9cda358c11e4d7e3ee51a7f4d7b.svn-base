<template>
    <div class="home">
        <Layout @on-loadBottom="loadBottom" @on-loadTop="loadTop" :allLoaded="allLoaded">
            <div slot="header" id="header">
                <Header :title="title" ></Header>
                <!-- <Search></Search> -->
                <TitleNav class="titleNav" @on-tabChange="changeTab"></TitleNav>   
            </div>
            <div slot="main" ref="main" class="main" v-if="this.type == 'news'">
                <NewsList :listData="listData" @on-tellFather="getscrollTops"></NewsList>
            </div>
            <div slot="main" ref="main" class="main" v-else-if="this.type == 'activity'" >
                <ActivityList :listData="listData" @on-tellFather="getscrollTops"></ActivityList>
            </div>
            <div slot="main" ref="main" class="main" v-else>
                <div class="nothing">此模块待开发中......</div>
            </div>
        </Layout>
        <div class="edit" @click="newsDetials" v-if="this.type == 'news'">
            <span class="iconfont icon-bianji"></span>
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
            if(from.path=="/activityDetail"||from.path=="/newsMsg"){
                vm.$children[0].$refs.main.scrollTop=vm.homescrollTops;
            }else{
                vm.loadTop();
                vm.homescrollTops=0;
            }
        });
    }, 
    data() {
        return {onRead:"",
            title:"中金",
            searchWord:"",
            listData:[{}],
            pager: {
                pageNo: 1,
                pageSize: 10
            },
            allLoaded: false,
            allowLoadMore: true,
            type:"news",
            homescrollTops:0,
            pageName:'',
            dataidx:1,
            isLoad:false,
        }
    },
    created(){
        this.getDataList();
    },
    watch:{
        $route(to, from){
            const fromDepth = from.name
            if(fromDepth == "newsDetials"){
                this.getDataList();
            }
        },
        isLoad(val,oldVal){
            if(val){
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
                setTimeout(() => {
                    Indicator.close();
                }, 5000);
            }
        },
        type(){
            this.listData = []
            this.isLoad = false
        }
    },
    methods: {
        //获取数据列表
        getDataList() {
            this.isLoad = false;
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
                if(_this.dataidx == 1){
                    _this.dataidx++;
                    _this.getDataList();  
                }
                pageData.getActivityList(data).then((d) => {
                    _this.getResult(d);
                })
            }
        },
        getResult(d){
            if(d){
                this.isLoad = false;
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
                        this.allLoaded = true;
                    } else {
                        this.allLoaded = false;
                    }
                    this.allowLoadMore = true
                }
            }else{
                this.isLoad = true;
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
    background-color: #fff;
    z-index:999;
    width:100%;
    box-shadow:0 2px 1px 0px rgba(0,0,0,0.10);/*no*/
    box-sizing: border-box;
}
.home .main .nothing{
    padding-top:60px;
    width:100%;
    text-align: center;
}
.edit{
    background-color: #cac7c7;
    border-radius: 40px;
    text-align: center;
    position: fixed;
    bottom:60px;
    right:50px;
    height:80px;
    width: 80px;
    line-height: 80px;
    z-index: 1000;
}
.edit .iconfont{
    font-size: 35px;/*px*/
}
</style>
