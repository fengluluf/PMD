<template>
    <mt-header :title="title" fixed>
        <mt-button icon="back" slot="left" @click="back"></mt-button>
        <mt-button :icon="rightIcon" slot="right" @click="operating">
            <span :class="spanIcon" class="iconfont"></span>
            {{rightTitle}}
        </mt-button>
    </mt-header>
</template>

<script>
export default {
    name: 'Header1',
    props:{
        title:{
            type: String,
            default: ''
        },
        rightIcon:{
            type: String,
            default: ''
        },
        rightTitle:{
            type: String,
            default: ''
        },
        spanIcon:{
            type: String,
            default: ''
        },
    },
    data () {
        return {
        }
    },
    methods:{
        back() {
            this.$router.go(-1)
        },
        operating(){
            this.$emit("on-tellFather")
        }
    }
}
</script>

<style scoped>
.mint-header{
    background-color: #f5f7f8;
    color: #000;
    border: 1px solid #F3F3F3;
    height: 80px;
    font-size: 32px!important;/*px*/
}
</style>
