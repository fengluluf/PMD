<template>
    <div class="search">
        <mt-search v-model="value"></mt-search>
    </div>
</template>

<script>
export default {
    name: 'Search',
    props:{
        // value:{
        //     type: String,
        //     default: ''
        // },
    },
    data () {
        return {
            value:""
        }
    },
    methods:{
        
    }
}
</script>

<style scoped>
.search .mint-search{
    height:100%!important;
}
.mint-searchbar{
    background-color: #fff!important;
}
.search .mint-searchbar-inner{
    height:18px;
    border:1px solide #999;
}
.search .mint-searchbar-cancel{
    color:#999;
}
</style>
