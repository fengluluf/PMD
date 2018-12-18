<template>
    <div class="layout">
        <div class="headerBox"><slot name="header"></slot></div>
        <div class="mainBox" ref="main">
            <mt-loadmore 
                :bottom-method="loadBottom" 
                :top-method="loadTop" 
                :bottom-all-loaded="allLoaded"
                :bottomDistance="bottomDistance"
                :autoFill="autoFill"
                :startY=150
                ref="loadmore"
            >
                <slot name="main"></slot>
            </mt-loadmore>
        </div>
        <div class="footerBox"><slot name="footer"></slot></div>
    </div>
</template>

<script>

export default {
    name:"Layout",
    props:{
        allLoaded:{
            type:Boolean,
            default: false
        }
    },
    data() {
        return {
            bottomDistance: 2,
            autoFill: false
        }
    },
    created() {
        
    },
    mounted() {
        setTimeout(() => {
            // this.resizeMainHeight();
        }, 200)
    },
    methods: {
        resizeMainHeight() {
            let header = document.querySelector('.header');
            let footer = document.querySelector('.footer');
            let headerHeight = header ? header.offsetHeight : 0;
            let footerHeight = footer ? footer.offsetHeight : 0;
            let windowHeight = document.documentElement.clientHeight;
            let mainH = windowHeight - headerHeight - footerHeight + 'px';
            this.$refs.main.style.height = mainH;
        },
        loadBottom() {
            setTimeout(() => {
                this.$emit('on-loadBottom');
                this.$refs.loadmore.onBottomLoaded();
            }, 200);
        },
        loadTop() {
            setTimeout(() => {
                this.$emit('on-loadTop')
                this.$refs.loadmore.onTopLoaded();
            }, 200);
        },
    },
}
</script>

<style scoped>
.headerBox{
    min-height: 80px;
    z-index: 1000;
    position: fixed;
    top: 0;
    width: 100%;
}
.mainBox {
    overflow: scroll;
    width:100%;
    margin-top:160px;
    -webkit-overflow-scrolling: touch;
}
.mint-loadmore{
    width:100%
}
.mint-loadmore-content{
    width:100%;
}
</style>
