<template>
    <div class="newsPublish">
        <div slot="header" class="newsPublish-header">
            <Header1 :rightTitle="rightTitle" @on-tellFather="newsPublishRequest"></Header1>
            <!-- <div class="headerBox">
                <span class="iconfont icon-fanhui" @click="goBack"></span>
                <span class="release" @click="release">发布</span>
            </div> -->
        </div>
        <div slot="main" ref="main" class="newsPublish-main">
            <div class="newsTitle">
                <input placeholder="请输入标题" type="text" class="newsInput" v-model="newReqData.title">
            </div>
            <div class="newsDetail">
                <!-- <textarea placeholder="请输入正文......" class="newsInput" v-model="content"></textarea> -->
                <div contenteditable="true" ref="editor" 
                     @focus="focusEditor" 
                     @blur="blurEditor"
                     @input="changeEditor" class="content">
                    <p v-if="contentTip" id="tip">请输入正文......</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
import Header1 from "../../components/header/header1.vue"

export default {
    components: {Header1},
    data() {
        return {
            rightTitle:"发布",
            title:"",
            content:"", 
            newReqData:{ // 文章发布内容
                title:"", // 文章标题
                content:"", 
            },
            contentTip:true,
        }
    },
    computed: {
    },
    created() {
        
    },
    mounted() {
    },
    methods: {
        ...mapActions('news/news',['newsPublishReq']),
       
        //发布新闻请求
        newsPublishRequest(){
            if(this.newReqData.title.replace(/\n/ig,"") === ''){
                  this.Toast('请输新闻入标题')
                  return false;
            }

            if(this.newReqData.content.replace(/\n/ig,"") === ''){
                  this.Toast('请输入新闻内容')
                  return false;
            }

            let obj = {
                params: JSON.stringify(this.newReqData)
            }
            this.newsPublishReq(obj).then(res=>{
                 if(res.resultCode === 200){
                     this.Toast('发布成功')
                     this.$router.push('/home');
                 }
            })
        },
        focusEditor(){  // 编辑器获取焦点
            this.contentTip = false;
        },
        blurEditor(){  // 编辑器失去焦点
            if(!this.newReqData.content){
                 this.contentTip = true;
            }
        },
        changeEditor(){ // 编辑器change事件
           this.newReqData.content =  this.$refs.editor.innerHTML;
        }
    },
    
}
</script>

<style lang="less" scoped>
.newsPublish{
    overflow: hidden;
    .newsPublish-header{
        background-color: #f5f7f8;
        z-index:999;
        width:100%;
        height:80px;
        line-height:80px;
        position: fixed;
        top:0;
    }
    .newsPublish-main{
        margin-top:80px;
        padding:0 20px;
    }
    .newsTitle{
        height: 80px;
        line-height: 80px;
        padding:0 10px;
        margin-top:100px;
        input{
            border:none;
            width:100%;
            height:70px;
            outline: none;
            font-size: 34px;/*px*/
            font-weight: bold;
            text-indent: 10px;
            border-bottom:1px solid #d8d8d8;/*no*/

        }
        input::-webkit-input-placeholder{
            font-size: 36px;/*px*/
            font-weight: bold
        }
    }
    .newsDetail{
        padding:20px 10px;
        .content{
            width:100%;
            height:400px;
            padding:20px;
            overflow-y:scroll;
            overflow-scrolling: touch;
            border:1px solid rgb(214, 214, 214);
            outline: none;
            background:#fff;

            #tip{
               color:rgb(143, 143, 143);
            }
        }
    }
}

.newsPublish .newsDetail textarea{
    border:none;
    width:100%;
    height:600px;
    outline: none;
    font-size:28px;/*px*/
    overflow-y:scroll;
}
</style>
