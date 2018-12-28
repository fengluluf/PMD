<template>
    <div class="titleNav">
        <div>
            <nav>
                <span v-for="(item,index) in arr" @click="toggle(index,item)" :class="{active:index==active}" :key="index">{{item.name}}</span>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TitleNav',
    props:{
        // arr:{
        //     type:Array,
        //     default:null
        // },
    },
    data () {
        return {
            active:1,
            arr:[{id:"recommend",name:"推荐"},
                {id:"news",name:"头条"},
                {id:"activity",name:"活动"},
                {id:"topic",name:"话题"},
                {id:"research",name:"研究"},
                // {id:"personal",name:"个人"}
            ],
        }
    },
    created(){
        // this.$emit('on-tabChange', this.arr[1])
    },
    methods:{
        toggle(index,item){
            this.active = index;
            this.$emit('on-tabChange', item)
        },
    },
}
</script>

<style scoped>
.titleNav{
    width: 100%;
    overflow:hidden;
}
.titleNav nav{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: middle;
    -ms-flex-align: middle;
    align-items: middle;
    overflow: auto;
    background-color: #fff;
}
.titleNav span{
    text-align: center;
    font-size: 28px;/*px*/
    -ms-flex-negative: 0;
    flex-shrink: 0;
    margin: 2px 40px;
    padding:15px 0;
    display: inline;
    color:#999;
    font-size: 32px;/*px*/
    font-weight: bold
}
.titleNav span.active{
    color: #b99052;
    border-bottom:2px solid #b99052;
    /* background-color: #999; */
}
.titleNav span.active::after{
    /* content:"︒" */
}
</style>
