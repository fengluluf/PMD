<template>
    <div class="modifySign">
        <div slot="header" class="header">
            <Header1 :title="title" :rightTitle="rightTitle" @on-tellFather="saveMsg"></Header1>
        </div>
        <div class="main">
            <textarea rows="10" class="text" v-model="signature"></textarea>
        </div>
    </div>
</template>
<script>
import Header1 from "../../components/header/header1.vue"
import pageData from "../../api/personal/modifySign.js"
import "../../assets/style/font-icon/iconfont.css"
import { MessageBox,Toast } from 'mint-ui';

export default {
    components: {Header1},
    data() {
        return {
            rightTitle:"保存",
            title:"修改个签",
            userMsg:'',
            signature:''
        }
    },
    computed: {
    },
    created() {
        this.userMsg = this.$route.params.userMsg;
        this.signature = this.userMsg.signature;
    },
    mounted() {
    },
    methods: {
        //保存修改信息
        saveMsg(){
            var data = {
                nickName:this.userMsg.nickName,
                sex:this.userMsg.sex,
                birthdayStr:this.userMsg.birthday,
                headImg:this.userMsg.headImg,
                userId:localStorage.getItem('userIdPMD')
            }
            data.signature = this.signature;
            MessageBox.confirm('确认修改?').then(action => {
                pageData.modifySign(data).then(function (d) {
                    if(d.resultCode == 200) {
                        Toast('修改成功');
                    }
                })
            }).catch(()=>{
                
            });
            
        },
    },
    
}
</script>
<style scoped lang="less">
.modifySign{
    height: 100%;
    background-color:#f5f7f8;
    .header{
        background-color: #fff;
        z-index:999;
        width:100%;
        height:80px;
        line-height:80px;
        position: fixed;
        top:0
    }
    .main{
        padding:100px 3% 20px 3%;
        background-color: #fff;
        .text{
            width: 97%;
            border: 1px solid #000;
            border-radius: 10px;
            padding:10px;
        }
    }
}
</style>
