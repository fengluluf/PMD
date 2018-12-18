<template>
    <div class="newsList">
            <div class="swipe">
                <van-swipe :autoplay="3000" indicator-color="white">
                     <van-swipe-item v-for="(item,index) in newSliderData" :key="index" @click="swipeTo(item.link)">
                        <img :src="item.imageUrl" class="swipeImg" :alt="item.name">
                    </van-swipe-item>
                </van-swipe>
            </div>
            <div class="news">
                <div class="newsItem" v-for="(item,index) in listData" :key="index">
                    <div class="newsTitle">
                        <div class="titleImg"><img src="@/assets/images/swipe1.jpg" class="avatar"></div>
                        <div class="titleName">{{item.editorName}}</div>
                    </div>
                    <div class="newsMain" @click="leaveMsg(item)">
                        <div class="mainTitle">{{item.title}}</div>
                        <div class="mainDetail">{{item.content}}</div>
                    </div>
                    <div class="newsFooter">
                        <div class="footerTime">{{item.createDate}}</div>
                         <LikeComment :likeData="item" 
                          v-on:commentBack="callbackComment"/>
                    </div>
                </div>
            </div>
    </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import pageData from "../../../api/news/newsList/newsList.js"
import base from '../../../util/base'
import {LikeComment} from "@/components/news"


export default { 
    name:"NewsList",
    components: {LikeComment},
    props:{
        listData:{
            type:Array,
            default: () => []
        }
    },
    data() {
        return {
            title:"中金",
            red:'red',
            list:[],
            likeIndex:'',
            likeObj:{}, // 新闻点赞存储

            sliderReqData:{ // 轮播图请求
                search:'',
                pageNo:1,
                pageSize:10
            }
        }
    },
    created(){
        this.newSliderRequest()
    },
    computed:{
       ...mapState('news/news',['newSliderData']),
    },
    methods: {
        ...mapActions('news/news',['newSliderReq']),
        newSliderRequest(){ // 轮播图请求
            this.newSliderReq(this.sliderReqData).then(res=>{
                
            })
        },
        swipeTo(url){  // 轮播图跳转
            if(url){
              this.$router.push(url)
            }
        },
        newsDetials(){//跳转到新闻发布页
            this.$router.push('/newsDetials')
        },
        leaveMsg(item){ //跳转详情 
            this.$router.push({path:'/newsDetials',query:{id:item.id}});
            // this.$emit('on-tellFather')
        },
        callbackComment(item){  // 点击评论跳转
            this.$router.push({path:'/newsDetials',query:{id:item.id,isComment:true}});
        }
    },
    
}
</script>


<style lang="less" scoped>
.newsList{
    // margin-bottom: 80px;
}
.newsList .swipe{
    height:400px;
    width:100%;
}
.newsList .swipeImg{
    height:400px;
    width:100%;
}
.newsList  .news{
    padding-top:28px;
    background-color: #f3f3f3;
}
.newsList  .newsItem{
    /* height:320px; */
    margin-bottom:28px;
    background-color: #fff;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
}
.newsList  .newsItem .newsTitle{
    padding:20px 20px 0 20px;
    height:70px;
    line-height: 70px;
    display: flex;
}
.newsList  .newsItem .newsTitle .titleImg{
    display: inline;
}
.newsList  .newsItem .avatar{
    height:70px;
    width:70px;
    border-radius: 35px;
}
.newsList  .newsItem .newsTitle .titleName{
    display: inline;
    margin-left:30px;
}
.newsList  .newsItem .newsMain{
    padding:20px 20px;
}
.newsList  .newsItem .newsMain .mainTitle{
    padding:30px 0 10px;
    font-weight: bold;
    font-size: 32px;/*px*/
}
.newsList  .newsItem .newsMain .mainDetail{
    font-size: 26px;/*px*/
    margin-top:10px;
    word-break:break-all;
    text-indent:30px;
}
.newsList  .newsItem .newsFooter{
    padding:0 20px;
    position: relative;
    height:90px;
    display:flex;
    align-items: center;
    justify-content: space-between;
    font-size: 24px;/*px*/
    color:rgb(139, 139, 139);
    .footerTime{
        display:flex;
        align-items: center;
        height:100%;
    }
    .footerClick{
        display:flex;
        align-items: center;
        height:100%;
        >div{
            display:flex;
            align-items: center;
            height: 100%;
            padding:0 20px;
            .icon-liuyan{
                padding-top:8px;
            }
            .active{
                color: rgb(139, 139, 139);
            }
        }
        .animateLike{
            color: #e83f48;
            animation: animateLike 0.6s 0.3s;
        }
    }
    
    .iconfont{
        font-size: 36px;/*px*/
        vertical-align: middle
    }
    .red{
        color: #e83f48;
    }
    .zan{
        display: inline-block;
    }
    #active{
        color: #e83f48;
     }
    .message{
        display: inline-block;
    
    }
}

</style>
