<template>
    <div class="myComment">
        <Layout @on-loadBottom="loadBottom" @on-loadTop="loadTop" :allLoaded="allLoaded">
            <div class="header" slot="header">
                <Header1 :title="title"></Header1>
            </div>
            <div class="main" slot="main" ref="main">
                <div class="listItem" v-for="(item,key) in listData" :key="key" @click="newsDetail(item)">
                    <div class="commentTitle">
                        <div class="titleImg"><img :src="item.banner" class="avatar"></div>
                        <div class="titleName">
                            <div class="name">{{item.editorName}}</div>
                            <div class="time">{{item.createDate}}</div>
                        </div>
                    </div>
                    <div class="itemComment">
                        {{item.content}}
                    </div>
                    <div class="newsMain">
                        <div class="mainTitle">{{item.title}}</div>
                        <div class="mainDetail">&emsp;&emsp;{{item.newsContent}}</div>
                    </div>
                </div>
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
            if(from.path=="/newsMsg"){
                vm.$children[0].$refs.main.scrollTop=vm.homescrollTops;
            }else{
                vm.loadTop();
                vm.homescrollTops=0;
            }
        });
    }, 
    data() {
        return {
            title:"我的评论",
            userName:'',
            listData:[{},{},{},{},{}],
            homescrollTops:0,
            pager: {
                pageNo: 1,
                pageSize: 10
            },
            allLoaded: false,
            allowLoadMore: true,
            userInfor:{}
        }
    },
    computed: {
    },
    created() {
        this.userName = localStorage.getItem("userNamePMD")
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
            pageData.getDataList(data).then(function (d) {
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
            })
        },
        //新闻详情
        newsDetail(item){
            this.$router.push({path:'/newsMsg',query:{id:item.id}});
            this.getscrollTops()
        },
        //获取用户信息
        getUser(){
            var _this = this;
            var data = {
                search:"",
                userId:localStorage.getItem('userIdPMD')
            }
            pageData.getUser(data).then(function (d) {
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
            this.homescrollTops=this.$children[0].$refs.main.scrollTop;
        },
    },
    
}
</script>
<style scoped lang="less">
.myComment{
    height: 100%;
    background-color: #f5f7f8;
}
.myComment .header{
    background-color: #f5f7f8;
    z-index:999;
    width:100%;
    height:80px;
    line-height:80px;
    position: fixed;
    top:0
}
.myComment .main .listItem{
    margin-bottom: 20px;
    background-color: #fff;
    padding:10px 20px!important;
    .commentTitle{
        padding:10px 0;
        height:100px;
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
        margin:10px 0;
        padding:10px 10px;
        background-color: #f5f7f8;
        .mainTitle{
            font-weight: bold;
            font-size: 32px;/*px*/
        }
        .mainDetail{
            font-size: 26px;/*px*/
            margin-top:10px;
            word-break:break-all;
        }
    }
}
</style>
