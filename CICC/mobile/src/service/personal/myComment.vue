<template>
    <div class="myComment">
        <Layout @on-loadBottom="loadBottom" @on-loadTop="loadTop" :allLoaded="allLoaded">
            <div class="header" slot="header">
                <Header1 :title="title"></Header1>
            </div>
            <div class="main" slot="main" ref="main">
                <div class="listItem" v-for="(item,key) in listData" :key="key" @click="newsDetail(item)">
                    <div class="commentTitle">
                        <div class="titleImg"><img :src="userInfor.headImg" class="avatar"></div>
                        <div class="titleName">
                            <div class="name">{{userInfor.userName}}</div>
                            <div class="time">{{item.createDate}}</div>
                        </div>
                    </div>
                    <div class="itemComment">
                        {{item.content}}
                    </div>
                    <div class="newsMain">
                        <div class="mainTitle">{{item.newsBO.title}}</div>
                        <div class="mainDetail">&emsp;&emsp;{{item.newsBO.newsContent}}</div>
                    </div>
                </div>
                <div class="noMore" v-show="noMore">没有更多了</div>
            </div>
        </Layout>
    </div>
</template>
<script>
import Header1 from "../../components/header/header1.vue"
import Layout from "../../components/layout/layout.vue"
import pageData from "../../api/personal/myComment.js"
import "../../assets/style/font-icon/iconfont.css"
import base from '../../util/base'

export default {
    components: {Header1,Layout},
    beforeRouteEnter(to, from, next) {  
        next(vm => {
            if(from.path=="/newsDetials"){
                // vm.$parent.$refs.app.scrollTop = vm.homescrollTops;
                vm.$children[0].$refs.main.scrollTop = vm.homescrollTops
            }else{
                vm.loadTop();
                vm.homescrollTops=0;
            }
        });
    }, 
    data() {
        return {
            title:"我的评论",//头部标题
            listData:[], //评论列表
            homescrollTops:0, //页面滚动高度
            pager: {  //页数设置
                pageNo: 1,
                pageSize: 10
            },
            allLoaded: false, //是否全部加载
            allowLoadMore: true, //是否允许加载更多
            userInfor:{}, //用户信息
            noMore:false,   //是否显示没有更多
        }
    },
    computed: {
    },
    created() {
        this.getDataList();
        this.getUser();
    },
    methods: {
        //获取列表上数据
        getDataList(){
            var data = {
                userId:localStorage.getItem("userIdPMD"),
                pageSize: this.pager.pageSize,
                pageNo: this.pager.pageNo,
            };
            pageData.getDataList(data).then(d => {
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
                        this.noMore = true;
                    } else {
                        this.allLoaded = false;
                        this.allLoaded = false;
                    }
                    this.allowLoadMore = true
                }
            })
        },
        //新闻详情
        newsDetail(item){
            this.$router.push({path:'/newsDetials',query:{id:item.newsBO.id,isComment:true}});
            this.getscrollTops()
        },
        //获取用户信息
        getUser(){
            var _this = this;
            var data = {
                search:"",
                userId:localStorage.getItem('userIdPMD')
            }
            pageData.getUser(data).then(d => {
                if(d.resultCode == 200) {
                    _this.userInfor = d.resultJson
                }
            })
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
            // this.homescrollTops = this.$parent.$refs.app.scrollTop;
            this.homescrollTops = this.$children[0].$refs.main.scrollTop
        },
    },
    
}
</script>
<style scoped lang="less">
.myComment{
    height: 100%;
    // background-color: #f5f7f8;
}
.myComment .header{
    z-index:999;
    width:100%;
    height:90px;
    line-height:90px;
    position: fixed;
    top:0
}
.myComment .main{
    margin-top:90px;
    background-color: #f3f3f3;
    .noMore{
        height: 140px;
        text-align: center;
        padding-top:40px;
        font-size: 28px;
        color:#999
    }
}
.myComment .main .listItem{
    margin-bottom: 20px;
    background-color: #fff;
    padding:10px 20px!important;
    .commentTitle{
        padding:10px 0;
        height:120px;
        line-height:50px;
        display: flex;
        .titleImg{
            display: inline;
            .avatar{
                height:100px;
                width:100px;
                border-radius: 50%;
            }
        }
        .titleName{
            display: inline;
            margin-left:40px;
            .time{
                color: rgb(139, 139, 139);
                font-size: 28px;/*px*/
            }
        }
    }
    .itemComment{
        word-break: break-all;
        padding:10px 0;
    }
    .newsMain{
        padding:10px 10px;
        background-color: #f5f7f8;
        .mainTitle{
            font-weight: bold;
            font-size: 32px;/*px*/
        }
        .mainDetail{
            font-size: 28px;/*px*/
            margin-top:10px;
            word-break:break-all;
            letter-spacing: -1px;
        }
    }
}
</style>
