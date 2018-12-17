<template>
   <div class="likeComment">
        <div :class="likeData.status == 1?`${like} zan`:'zan'" @click="newlikeRequest">
            <i :class="likeActive?'iconfont icon-dianzan1 animateLike':'iconfont icon-dianzan1 noActive'" ></i>
            <span :class="likeActive?'active':'noActive'">{{likeData.concernCount}}</span>
        </div>
        <div class="message" @click="commentClick">
            <i class="iconfont icon-liuyan"></i>
            <span>11</span>
        </div>
    </div>
</template>


<script>
import {mapState,mapActions} from 'vuex'

export default {
    data(){
        return {
           likeObj:{}, // 新闻点赞存储
           likeActive:''
        }
    },
    props:['likeData'],
    created(){
     
    },
    methods:{
        ...mapActions('news/news',['newLikeReq']),
        commentClick(){
           this.$emit("commentBack")
        },
        newlikeRequest(){//点赞
          if(this.likeActive === ''){ // 首次点击点赞
             if(this.likeData.status == 1){ // 点赞状态
                this.likeActive = false;
             }else{
                this.likeActive = true;
             }
          }else{
             this.likeActive = !this.likeActive;
          }
          
        //   this.newLikeReq()  // 点赞请求
        },
    }
}
</script>


<style lang="less" scoped>
.likeComment{
    display:flex;
    align-items: center;
    height:100%;
    >div{
        display:flex;
        align-items: center;
        height: 100%;
        padding:0 20px;
        font-size:30px;
        color: rgb(139, 139, 139);
        i{
            font-size:36px;
            margin-right:4px;
        }
        .icon-liuyan{
            padding-top:8px;
        }
        .active{
            color: #e83f48;
        }
        .noActive{
            color: rgb(139, 139, 139);
        }
    }
    .like{
        color: #e83f48;
    }
    .message{
    }
    .animateLike{
        color: #e83f48;
        animation: animateLike 0.6s 0.3s;
    }
}

@keyframes animateLike {
    from {
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
    }
    10%,
    20% {
        -webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
        transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
    }
    30%,
    50%,
    70%,
    90% {
        -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
        transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
    }
    40%,
    60%,
    80% {
        -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
        transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
    }
    to {
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
    }
}
</style>
