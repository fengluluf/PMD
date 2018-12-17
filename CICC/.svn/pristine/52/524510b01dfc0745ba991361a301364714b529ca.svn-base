<template>
    <div class="home">
        <div class="title">
            <p>{{msg}}</p>
        </div>
        <div class="con">
            <div class="con-img">
                <img src="../../assets/images/avatar-default.png">
            </div>
            <div class="con-msg">
                <p>{{userName}}&emsp;&emsp;管理员</p>
                <p>{{nowTime}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import pageData from "../../api/home/home.js"
import {formatDate} from '../../util/base'

export default {
  name: 'home',
  data () {
    return {
        msg:"欢迎登录中金后台管理系统",
        nowTime: '',
        userId:"",
    }
  },
  created(){
      this.getUserMsg();
  },
  methods:{
      getUserMsg(){
          this.nowTime = formatDate(new Date());
          this.userName = sessionStorage.getItem("userName");
      }
  }
}
</script>

<style scoped>
.home .con{
    padding:20px 40px;
    vertical-align: middle;
}
.home .con-img{
    display: inline-block;
}
.home .con-img img{
    height:50px;
    width:50px;
}
.home .con-msg{
    display: inline-block;
    margin-left:20px;
    
}
.home .con-msg p{
    height:25px;
    line-height: 25px;
}
</style>
