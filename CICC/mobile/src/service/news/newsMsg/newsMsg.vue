<template>
    <!-- <Layout @on-loadBottom="loadBottom" @on-loadTop="loadTop" :allLoaded="allLoaded"> -->
    <div class="newsMsg" @scroll="watchScroll" ref="news">
        <div class="newsMsg-header" slot="header">
            <Header1 :title="title"></Header1>
        </div>
        <div class="newsMsg-main" slot="main" ref="main">
            <div class="main-detail">
                <div class="newsTitle">
                    <div class="titleImg"><img src="../../../assets/images/swipe1.jpg" class="avatar"></div>
                    <div class="titleName">
                        <div class="name">张力老师</div>
                        <div class="time">{{newsMsg.createDate}}</div>
                    </div>
                </div>
                <div class="newsMain">
                    <div class="mainTitle">{{newsMsg.title}}</div>
                    <div class="mainDetail">&emsp;&emsp;{{newsMsg.content}}</div>
                </div>
            </div>
            <div class="main-msg">
                <div class="messageTitle" :class="navBarFixed == true ? 'navBarWrap' :''" ref="messageTitle">评论</div>
                <div :class="navBarFixed == true ? 'listWrap' :''">
                    <div class="messageList" v-for="(item,key) in messageList" :key="key">
                        <div class="titleImg"><img src="../../../assets/images/head.jpg" class="avatar"></div>
                        <div class="titleName">
                            <div class="name">张力老师</div>
                            <div class="con">newsMsg.createDatenewsMsg.createDatenewsMsg.createDatenewsMsg.createDatenewsMsg.createDate</div>
                            <div class="time">item.createDate</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="newsMsg-footer" slot="footer">
            <div class="msgInput">
                <!-- <textarea rows="1"> -->
            </div>
            <div class="msgClick">
                <div class="zan">
                    <span class="iconfont icon-dianzan1"></span>
                    <!-- <span>66</span> -->
                </div>
                <div class="message">
                    <span class="iconfont icon-liuyan"></span>
                    <!-- <span>66</span> -->
                </div>
            </div>
        </div>
    </div>
    <!-- </Layout> -->
</template>
<script>
import Layout from "../../../components/layout/layout.vue"
import Header1 from "../../../components/header/header1.vue"
import pageData from "../../../api/news/newsMsg/newsMsg.js"
import "../../../assets/style/font-icon/iconfont.css"

export default {
    name:"NewsMsg",
    components: {Layout,Header1},
    data() {
        return {
            title:"新闻详情",
            navBarFixed:false,
            scrollTop:0,
            offsetTop:0,
            allLoaded: false,
            pager: {
                pageNo: 1,
                pageSize: 10
            },
            newsMsg:{},//新闻详情
            messageList:[{},{},{},{},{}],//评论列表
            myMsg:'',//我的评论
        }
    },
    created(){
        // this.getNews();
        // this.getMessage();
    },
    mounted(){
        this.offsetTop = this.$refs.messageTitle.getBoundingClientRect().top -40;
        this.$refs.news.scrollTop = this.offsetTop;
        this.navBarFixed = true;
    },
    methods: {
        //获取新闻详情
        getNews(){
            var data ={
                userId:localStorage.getItem("userIdPMD"),
                id:this.$route.query.id
            }
            pageData.getItem(data).then((d) => {
                if(d.resultCode == 200){
                    this.newsMsg = d.resultJson
                }
            })
        },
        //获取数据列表
        getMessage() {
            this.isLoad = false;
            var data = {
                userId:localStorage.getItem("userIdPMD"),
                pageSize: this.pager.pageSize,
                pageNo: this.pager.pageNo,
            }
            var _this = this;
            pageData.getMessage(data).then((d) => {
                if(d.resultCode == 200){                    
                    if(d.resultJson.pageNum === 1) {
                        this.messageList = d.resultJson.pageContent;
                    } else {
                        for(var i=0;i<d.resultJson.pageContent.length;i++){
                            if(JSON.stringify(this.messageList).indexOf(JSON.stringify(d.resultJson.pageContent[i])) == -1){
                                this.messageList = this.messageList.concat(d.resultJson.pageContent);
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
        watchScroll () {
            this.scrollTop = this.$refs.news.scrollTop;
            if (this.scrollTop >= this.offsetTop) {
                this.navBarFixed = true;
            } else {
                this.navBarFixed = false;
            }
        },
        loadBottom() {
            if(this.allowLoadMore){
                this.pager.pageNo++;
                this.getNews();
                this.allowLoadMore = false;
            }
            setTimeout(() => {
                this.allowLoadMore = true
            }, 2000);
        },
        loadTop() {
            if(this.allowLoadMore){
                this.pager.pageNo=1;
                this.getNews();
                this.allowLoadMore = false;
            }
            setTimeout(() => {
                this.allowLoadMore = true
            }, 2000);
        },
    },
    
}
</script>
<style scoped>
.newsMsg{
    height:100%;
    background-color: #f3f3f3;
    overflow-y: scroll;
}
.newsMsg .newsMsg-header{
    background-color: #f5f7f8;
    width:100%;
    height:80px;
}
.newsMsg .main-detail{
    background-color: #fff;
}
.newsMsg .main-detail .newsTitle{
    padding:20px;
    height:100px;
    line-height:50px;
    display: flex;
}
.newsMsg .main-detail .titleImg{
    display: inline;
}
.newsMsg .main-detail .titleImg .avatar{
    height:100px;
    width:100px;
    border-radius: 50%;
}
.newsMsg .main-detail .titleName{
    display: inline;
    margin-left:40px;
}
.newsMsg .main-detail .titleName .time{
    color: rgb(139, 139, 139);
    font-size: 28px;/*px*/
}
.newsMsg .main-detail .newsMain{
    padding:20px 20px;
}
.newsMsg .main-detail .newsMain .mainTitle{
    font-weight: bold;
    font-size: 32px;/*px*/
}
.newsMsg .main-detail .newsMain .mainDetail{
    font-size: 26px;/*px*/
    margin-top:10px;
    word-break:break-all;
}
.newsMsg .main-msg{
    margin-top:20px;
    margin-bottom: 80px;
}
.newsMsg .main-msg .messageTitle{
    height:80px;
    line-height: 80px;
    background-color: #fff;
    padding-left: 20px; 
}
.newsMsg .main-msg .navBarWrap {
    position:fixed;
    top:80px;
    z-index:999;
    width: 100%;
    box-shadow:0 2px 1px 0px rgba(0,0,0,0.10);/*no*/
}
.newsMsg .main-msg .listWrap{
    margin-top:90px;
}
.newsMsg .main-msg .messageList{
    border:1px solid #f3f3f3;
    background-color: #fff;
    padding:10px 20px;
    line-height: 45px;
    display:flex;
    margin-bottom: 20px;
}
.newsMsg .main-msg .messageList .titleImg{
    flex: 1;
}
.newsMsg .main-msg .titleImg .avatar{
    height:80px;
    width:80px;
    border-radius: 50%;
}
.newsMsg .main-msg .messageList .titleName{
    flex: 5;
}
.newsMsg .main-msg .titleName .con{
    word-break: break-all;
} 
.newsMsg .main-msg .titleName .time{
    color: rgb(139, 139, 139)
}
.newsMsg .newsMsg-footer{
    background-color: #f5f7f8;
    width:100%;
    line-height:80px;
    position: fixed;
    bottom:-2px;
    display: flex;
}
.newsMsg .newsMsg-footer .msgInput{
    display: inline-block;
    flex:3
}
.newsMsg .newsMsg-footer .msgClick{
    display: inline-block;
    /* position: absolute;
    right:20px; */
    flex: 1
}
.newsMsg .newsMsg-footer .iconfont{
    font-size: 36px;/*px*/
    vertical-align: middle
}
.newsMsg .newsMsg-footer .red{
    color: #e83f48;
}
.newsMsg .newsMsg-footer .zan{
    display: inline-block;
}
.newsMsg .newsMsg-footer .message{
    display: inline-block;
}
</style>
