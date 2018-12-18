<template>
   <div class="findDetailsWrap">
        <div class="headerWrap">
           <Header1 :title="title"></Header1>
        </div>
        
                <div class="detailsWrap">
                <h3 class="title">{{singleNewData.title}}</h3>
                <div class="userHeader">
                    <div class="portrait">
                        <img src="" alt="">
                    </div>
                    <div class="userMsg">
                        <div class="userName">{{singleNewData.editorName}}</div>
                        <div class="time">{{singleNewData.createDate}}</div>
                    </div>
                </div>

                <!-- 新闻内容 -->
                </div>
                <div class="articleComments">
                    <div class="title" id="allComment" ref="comment">全部评论 ({{commentsListData.count}})</div>
                    <div  class="commentList">
                         <van-list
                            v-model="loading"
                            :finished="finished"
                            finished-text="没有更多了"
                            :immediate-check="false"
                            :offset="50"
                            @load="listUpload"
                        >
                        <div v-if="commentList.length" class="commentItem" v-for="(item,index) in commentList" :key="index">
                                <div class="userHeader">
                                    <div class="portrait">
                                        <img src="" alt="">
                                    </div>
                                    <div class="userMsg">
                                        <div class="userName">用户名 {{item.editorName}}</div>
                                        <div>{{item.createDate}}</div>
                                    </div>
                                </div>
                                <div class="commentContent">
                                    <p class="mainComment">{{item.content}}</p>
                                </div>
                        </div>
                       </van-list>    

                        <!-- <div v-if="!commentList.length" class="noComment">
                            暂无评论
                        </div> -->
                    </div>
                </div>
        <div class="btnWrap" v-show="singleNewData.status == 2">
           <div class="btnCenter">
                <ul class="btnUl" :id="isFocus?'focusClass':''">
                    <li class="inpComment">
                        <i class="iconfont icon-bi"></i>
                        <textarea @focus="commentFocusBlur(true)" 
                                  @blur="commentFocusBlur(false)" 
                                  type="textarea" 
                                  :rows="isFocus?4:1" 
                                  maxlength="150" 
                                  placeholder="写下你的评论"
                                  v-model="commentText">
                        </textarea>
                    </li>
                </ul>
                <div class="send" v-show="isFocus" @click="publishCommentRequest">
                        发布
                </div>
                <div v-show="!isFocus">
                    <LikeComment :likeData="likeObj" 
                    v-on:commentBack="callbackComment"/>
                    <a ref="jumpA" href="#allComment" style="display:none"></a>
                </div>
           </div>
        </div>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
import Header1 from "@/components/header/header1.vue"
import LikeComment from "@/components/news/LikeComment.vue"

export default {
    components: {Header1,LikeComment},
    data() {
        return {
          title:"新闻详情",
          // 下拉列表
          loading: false,
          finished: false,
          isFocus:false, // 表单是否获取焦点
          query:{}, // 路径query
          commentList:[], // 评论列表
          commentText:'', // 评论内容
          commentListReqData:{ // 评论列表请求数据
             pageNo:1,
             pageSize:10
          },
          likeObj:{ // 点赞组件数据
              status:'',
              id:'',
              concernCount:'',
              commentSum:'',
          }
        }
    },
    computed:{
       ...mapState('news/news',['singleNewData']),
       ...mapState('news/comments',['commentsListData'])
    },
    created(){
      this.query = this.$route.query;
      this.singleNewRequest()
      this.commentsListRequest()
    },
    mounted () {
        // 锚点定位
       if(this.query.isComment){
         this.callbackComment()
       }
    },
    methods: {
        ...mapActions('news/news',['singleNewReq']),
        ...mapActions('news/comments',[
                'commentsListReq',
                'singleCommentReq',
                'publishCommentReq',
                'deleteCommentReq',
        ]),
        listUpload() {
            this.commentsListRequest()
        },
        singleNewRequest(){ // 新闻详情请求
            let data = {}
            data.id = this.query.id
            this.singleNewReq(data).then(res=>{
                let result = res.resultJson
                this.likeObj.status = result.status
                this.likeObj.id = result.id
                this.likeObj.concernCount = result.concernCount
                this.likeObj.commentCount = result.commentCount
                this.likeObj.isConcern = result.isConcern
               
            })
        },
        commentFocusBlur(bol){ // 评论获取/失去焦点时
            this.isFocus = bol
        },
        commentsListRequest(){ // 获取评论列表
            this.commentListReqData.newsId = this.query.id
            this.commentsListReq(this.commentListReqData).then(res=>{
                this.loading = false;

                if(res.resultCode === 200){
                    if(!res.resultJson.pageContent.length){
                       
                       this.finished = true;
                       return;
                    }
                    this.commentList = [...this.commentList,...res.resultJson.pageContent]
                    this.commentListReqData.pageNo = this.commentListReqData.pageNo + 1;
                }else{
                    this.Toast(res.resultMessage)
                }


            })
        },
        publishCommentRequest(){ // 发布评论
           if(!this.commentText){
               this.Toast("请输入评论")
               return 
           }

           let text = this.commentText.replace(/\n/gi,"")
           let obj = {
               newsId:this.singleNewData.id,
               content:text
           }
           this.publishCommentReq(obj).then(res=>{
               this.Toast("评论成功")
               this.commentText ="";
               
               // 初始化评论列表
               this.commentListReqData.pageNo = 1;
               this.commentList = []
               this.finished = false;
               this.commentsListRequest()
               this.callbackComment()
           })
        },
        callbackComment(){ // 定位到全部评论
             let comEl = this.$refs.comment
             document.scrollY = comEl.offsetTop;
        }
       
    },
    
}
</script>

<style lang="less" scoped>
.findDetailsWrap{
    user-select:none;
    -webkit-user-select:none;
    background:#f5f5f5;
    div,a,ul,li,span,i,p,img,h1,h2,h3,h4,h5,h6{
        padding:0;
        margin:0;
        box-sizing: border-box;
    }
    .van-list{
        padding-bottom:90px;
    }
    .headerWrap{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        height:80px;
        width:100%;
        .findDetails-header{
            height:80px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background:#fff;
            font-size:36px;
            .iconfont{
                padding:10px 15px 10px 12px;
            }
            .issueBtn{
                padding:10px 15px 10px 15px;
                font-size:30px;
            }
        }
    }   
    .detailsWrap{
        width: 100%;
        padding:10px 20px 20px 20px;
        margin-top:90px;
        background:#fff;
        .title{
            margin:20px 0 40px;
            font-style:normal;
            font-size:36px;
            color:#343434;
        }
        .userHeader{
            width:100%;
            height:94px;
            margin:30px 0;
            display: flex;
           
            .portrait{
                width:94px;
                height:94px;
                border-radius: 50%;
                background:#ccc;
                img{
                    width:100%;
                    height:100%;
                    border-radius: 50%;
                }
            }
            .userMsg{
                height:94px;
                margin-left:18px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                .userName{
                    font-size:28px;
                    color:#333;
                    margin-bottom:6px;
                }
                .time{
                    font-size:24px;
                    color:#666666;
                }
               
            }
           
        }
        .commentContent{
            padding:0 0 0 80px;
            color:#343434;
            .mainComment{
                font-size:28px;
                line-height:32px;
            }
        }
        .articleContent{
            padding:20px 0;
        }
    }
    .articleComments{
        margin-top:2px;
        background:#fff;
        .title{
            padding:30px 20px 10px;
            font-size:32px;
            color:#343434;
        }
        .commentList{
            .commentItem{
                padding:10px 20px 20px;
                border-bottom:1px solid #eee;
                .userHeader{
                    width:100%;
                    height:65px;
                    margin:20px 0;
                    position: relative;
                    display: flex;
                    .portrait{
                        width:65px;
                        height:65px;
                        border-radius: 50%;
                        background:#ccc;
                        img{
                            width:100%;
                            height:100%;
                            border-radius: 50%;
                        }
                    }
                    .userMsg{
                        height:65px;
                        margin-left:18px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        font-size:22px;
                        .userName{
                            color:#ef4454;
                            margin-bottom:5px;
                        }
                        .time{
                            font-size:20px;
                        }
                    }
                }
            }
            .noComment{
                margin-top:50px;
                padding:50px 0;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size:22px;
                color:#666;
                background: rgb(243, 243, 243);
            }
        }
        
    }
    .btnWrap{
        width: 100%;
        min-height:86px;
        position: fixed;
        bottom:0;
        background:#fff;
        border-top:1px solid rgb(233, 233, 233);
        .btnCenter{
            min-height:86px;
            display:flex;
            align-items: center;
            .btnUl{
                width:70%;
                min-height:86px;
                display: flex;
                align-items: center;
                padding:0 10px;
                li{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size:30px;
                    color:#666666;
                   i{
                       vertical-align: middle;
                       color:#666666;
                   }
                   span{
                     margin-left:5px;
                   }
                }
                .inpComment{
                    width:100%;
                    height:58px;
                    margin:0 4% 0 2%;
                    background:#f4f5f6;
                    border:1px solid #ccc;
                    border-radius:30px;
                    textarea{
                        width:80%;
                        position: relative;
                        border:none;
                        outline: none;
                        background:#f4f5f6;
                        resize: none;
                    }
                }
               
            }
            .send{
                width:30%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
        // 获取焦点时的样式
        #focusClass{
            padding:10px 0;
            .inpComment{
                width:100%;
                height:auto;
                margin:0 0 0 2%;
                border:1px solid #ccc;
                .iconfont{
                    display:none;
                }
                textarea{
                    width:100%;
                }
            }
        }
    }

}

</style>
