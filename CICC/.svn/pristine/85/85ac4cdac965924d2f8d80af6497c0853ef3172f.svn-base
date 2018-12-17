<template>
  <div class="header">
    <div class="header-logo">
        <img src="../../assets/images/loginLogo.jpg">
    </div>
    <div class="header-msg">
        <span>欢迎&emsp;用户名</span>
        <el-button type="primary" size="mini" plain @click="goLogin" class="logout">注销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
      goLogin(){
          this.$router.push("/login")
          sessionStorage.clear()
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
    width: 100%;
    font-size: 12px;
}
.header .header-logo{
    display: inline-block;
    line-height: 60px;
    height:60px;
}
.header .header-logo img{
    width: 120px;
    height:40px;
    vertical-align: middle;
}
.header .header-msg{
    float: right;
}
.header .logout:hover {
    background: rgba(236,245,255,.8);
    color: #409EFF;
    border-color: #b3d8ff;
}
</style>
