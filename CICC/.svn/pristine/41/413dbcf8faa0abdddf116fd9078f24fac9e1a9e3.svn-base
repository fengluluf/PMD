<template>
    <div class="newsRelease">
        <div slot="header" class="newsRelease-header">
            <Header1 :rightTitle="rightTitle" @on-tellFather="release"></Header1>
            <!-- <div class="headerBox">
                <span class="iconfont icon-fanhui" @click="goBack"></span>
                <span class="release" @click="release">发布</span>
            </div> -->
        </div>
        <div slot="main" ref="main" class="newsRelease-main">
            <div class="newsTitle">
                <input placeholder="请输入标题" type="text" class="newsInput" v-model="title">
            </div>
            <div class="newsDetail">
                <textarea placeholder="请输入正文......" class="newsInput" v-model="content"></textarea>
            </div>
        </div>
    </div>
</template>
<script>
import Header1 from "../../components/header/header1.vue"
import pageData from "../../api/newsRelease/newsRelease.js"
import "../../assets/style/font-icon/iconfont.css"
import { MessageBox,Toast } from 'mint-ui';

export default {
    components: {Header1},
    data() {
        return {
            rightTitle:"发布",
            title:"",
            content:"",
        }
    },
    computed: {
    },
    created() {
        
    },
    mounted() {
    },
    methods: {
        //校验标题
        checkTitle(){
            if(this.title === '') {
                this.errorMsg = '请输入新闻标题';
                MessageBox.alert(this.errorMsg);
                return false;
            }else{
                return true;
            }
        },
        //校验内容
        checkCon(){
            if(this.content === '') {
                this.errorMsg = '请输入新闻主体内容';
                MessageBox.alert(this.errorMsg);
                return false;
            }else{
                return true;
            }
        },
        //发布
        release(){
            var _this = this;
            var data = {};
            data.params = {};
            data.params.title = this.title;
            data.params.content = this.content;
            data.params = JSON.stringify(data.params);
            data.userId = localStorage.getItem("userIdPMD");
            if(this.checkTitle() && this.checkCon()){
                pageData.release(data).then(function (d) {
                    if(d.resultCode === 200) {
                        MessageBox.alert("发布成功").then(action => {
                            _this.$router.push('/home');
                        });
                    }else{
                        MessageBox.alert(d.resultMessage);
                    }
                })
            }
        }
    },
    
}
</script>
<style scoped>
.newsRelease{
    overflow: hidden;
}
.newsRelease .newsRelease-header{
    background-color: #f5f7f8;
    z-index:999;
    width:100%;
    height:80px;
    line-height:80px;
    position: fixed;
    top:0;
}
/* .newsRelease .headerBox{
    padding:0 20px;
    height: 80px;
    line-height: 80px;
    
}
.newsRelease .headerBox .icon-fanhui{
    font-size: 16px;
}
.newsRelease .header .release{
    float: right;
} */
.newsRelease .newsRelease-main{
    margin-top:80px;
    padding:0 20px;
}
.newsRelease .newsTitle{
    height: 80px;
    line-height: 80px;
    padding:0 10px;
    border-bottom:1px solid #c8c8c8;/*no*/
}
.newsRelease .newsTitle input{
    border:none;
    width:100%;
    height:70px;
    outline: none;
    font-size: 36px;/*px*/
    font-weight: bold
}
.newsRelease .newsTitle input::-webkit-input-placeholder{
    font-size: 36px;/*px*/
    font-weight: bold
}
.newsRelease .newsDetail{
    padding:20px 10px;
}
.newsRelease .newsDetail textarea{
    border:none;
    width:100%;
    height:600px;
    outline: none;
    font-size:28px;/*px*/
    overflow-y:scroll;
}
</style>
