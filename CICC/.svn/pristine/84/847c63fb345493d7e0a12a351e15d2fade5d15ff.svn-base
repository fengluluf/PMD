<template>
    <div class="myNews">
        <div slot="header" class="header">
            <Header1 :title="title"></Header1>
        </div>
        <div class="newsList">
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                :immediate-check="false"
                :offset="50"
                @load="listUpload"
            >
                <div class="newsItem"   v-for="(item,index) in newsList" :key="index">
                    <div class="newsTitle"  @click="leaveMsg(item)">
                        <div class="msg">
                           <div class="titleImg"><img src="@/assets/images/swipe1.jpg" class="avatar"></div>
                          <div class="titleName">{{item.editorName}}</div>
                        </div>
                       
                        <div :class="`result ${item.statusClass}`">
                            {{item.statusName}}
                        </div>
                    </div>
                    <div class="newsMain"   @click="leaveMsg(item)">
                        <div class="mainTitle">{{item.title}}</div>
                        <div class="mainDetail">{{item.content}}</div>
                    </div>
                    <div class="newsFooter">
                        <div class="footerTime">{{item.createDate}}</div>
                        <LikeComment :likeData="item" 
                          v-on:commentBack="callbackComment"/>
                    </div>
                </div>
            </van-list>    
        </div>
        <div class="edit" @click="newsDetials">
            <span class="iconfont icon-bianji"></span>
        </div>
    </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import Header1 from "../../components/header/header1.vue"
import {LikeComment} from "@/components/news"

export default {
    components: {Header1,LikeComment},
    data() {
        return {
            title:"我的新闻",
             // 下拉列表
            loading: false,
            finished: false,
            newsListData:{ // 新闻列表请求
                pageNo:1,
                pageSize:10,
            },
            newsList:[] // 新闻列表
        }
    },
    computed: {
    },
    created() {
        this.editorNewsRequest()
    },
    methods: {
         ...mapActions('news/news',['editorNewsReq']),
         listUpload() {
            this.editorNewsRequest()
         },
         editorNewsRequest(){
             this.editorNewsReq(this.newsListData).then(res=>{
                 this.loading = false;
                 if(res.resultCode === 200){
                    if(!res.resultJson.pageContent.length){
                       this.finished = true;
                       return;
                    }
                    this.newsList = [...this.newsList,...res.resultJson.pageContent]
                    this.newsListData.pageNo = this.newsListData.pageNo + 1;
                 }else{
                     this.Toast(res.resultMessage)
                 }
             })
        },
        leaveMsg(item){ //跳转详情 
            if(item.status == 0){
                this.Toast('已删除')
                return
            }
            this.$router.push({path:'/newsDetials',query:{id:item.id}});
        },
        callbackComment(item){ // 点击评论跳转
            this.$router.push({path:'/newsDetials',query:{id:item.id,isComment:true}});
        },
        newsDetials(){ //跳转到新闻发布页
            this.$router.push('/newsPublish')
        },
    },
    
}
</script>
<style lang="less" scoped>
.myNews{
    height: 100%;
    .header{
        background-color: #fff;
        z-index:999;
        width:100%;
        height:80px;
        line-height:80px;
        position: fixed;
        top:0
    }
    .newsList{
        padding-top:90px;
        background:rgb(241, 241, 241);
        .newsItem{
            margin-bottom:10px;
            background-color: #fff;
            border-top: 1px solid #eee;
            border-bottom: 1px solid #eee;
            .newsTitle{
                padding:20px 20px 0 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .msg{
                    display: flex;
                    align-items: center;
                   .titleName{
                       display: inline;
                       margin-left:30px;
                   }
                   .titleImg{
                        display: inline;
                        .avatar{
                            height:70px;
                            width:70px;
                            border-radius: 35px;
                        }
                    }
                }
                .result{
                    font-size:15px;
                    color:#fff;
                    padding:4px 12px;
                    border-radius: 12px;
                }
                .error{
                    background:#ef4454;
                }
                .success{
                    background:#0aa538;
                }
                .watting{
                    background:#c9c500;
                }
                
            }
            .newsMain{
                padding:0 20px;
                .mainTitle{
                    padding:30px 0 10px;
                    font-weight: bold;
                    font-size: 32px;/*px*/
                }
                .mainDetail{
                    font-size: 26px;/*px*/
                    margin-top:10px;
                    word-break:break-all;
                    text-indent:30px;
                }
            }
            .newsFooter{
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
        }
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
        .iconfont{
            font-size: 35px;/*px*/
        }
    }

}

</style>
