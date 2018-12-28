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
                <input placeholder="请输入标题(2-30)" type="text" class="newsInput" v-model="newReqData.title" maxlength="30">
            </div>
            <div class="newsDetail">
                <div contenteditable="true" ref="editor" 
                     @focus="focusEditor" 
                     @blur="blurEditor"
                     @input="changeEditor" class="content" placeholder="请输入正文(30-500)......">
                    <!-- <p v-if="contentTip" id="tip">请输入正文(30-500)......</p> -->
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
    beforeRouteEnter(to, from, next) {  
        next(vm => {
            if(from.path=="/home"){
                vm.isFromHome = true
            }else{
                vm.isFromHome = false
            }
        });
    }, 
    data() {
        return {
            rightTitle:"发布",
            title:"",
            content:"", 
            newReqData:{ // 文章发布内容
                title:"", // 文章标题
                newsContent:"", 
            },
            contentTip:true,
            isFromHome:false
        }
    },
    methods: {
        ...mapActions('news/news',['newsPublishReq']),
       
        //发布新闻请求
        newsPublishRequest(){
            if(this.newReqData.title.replace(/\n/ig,"") === ''){
                  this.Toast('请输入新闻标题')
                  return false;
            }else{
                if(this.newReqData.title.length<2||this.newReqData.title.length>30){
                    this.Toast('请输入正确的新闻标题字数')
                    return;
                }
            }
            this.newReqData.newsContent =   this.newReqData.newsContent.replace("<!---->","")
            if(this.newReqData.newsContent.replace(/\n/ig,"") === ''){
                  this.Toast('请输入新闻内容')
                  return false;
            }else{
                if(this.newReqData.newsContent.length<30||this.newReqData.newsContent.length>500){
                    this.Toast('请输入正确的新闻内容字数')
                    return;
                }
            }
            
            
            let obj = {
                params: JSON.stringify(this.newReqData)
            }
            this.newsPublishReq(obj).then(res=>{
                 if(res.resultCode === 200){
                     this.Toast('发布成功')
                     if(this.isFromHome){
                        this.$router.push('/home');
                     }else{
                         this.$router.push('/myNews');
                     }
                     
                 }
            })
        },
        focusEditor(){  // 编辑器获取焦点
            this.contentTip = false;
        },
        blurEditor(){  // 编辑器失去焦点
            if(!this.newReqData.newsContent){
                 this.contentTip = true;
            }
        },
        changeEditor(){ // 编辑器change事件
           this.newReqData.newsContent =  this.$refs.editor.innerHTML;
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
            text-indent: 52px;
            #tip{
               color:rgb(143, 143, 143);
            }
        }
        .content:empty:before{
            content: attr(placeholder);
            color:rgb(143, 143, 143);
            margin-left:-52px;
        }
        .content:focus:before{
            content:none;
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
