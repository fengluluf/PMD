import Vue from 'vue'
import Router from 'vue-router'
import base from '../util/base'
import { MessageBox } from 'mint-ui';

let appStatus = {
    isLogin: base.getCookie('ECO_USER_LOGIN_COOKIE_KEY') || '',
    access_token: 'asdf1234',
    uuid: 'qwer7890'
}

var isLogin = appStatus.isLogin

Vue.use(Router)

const router =  new Router({
    mode: 'history',
    routes: [
        {    //图标
            path: '/icon', 
            name:"icon",  
            component: ()=>import('../service/HelloWorld.vue')
        },
        {   // 登录页
            path: '/',   
            name:"login",
            component: ()=>import('../service/login/login.vue')
        },
        {    //首页
            path: '/home',   
            name:"home",
            component:  ()=>import('../service/home/home.vue'),
            meta: {
                keepAlive: true, //此组件需要被缓存 
            },
            // beforeEnter: function (to, from, next) {
            //     if(isLogin) {
            //         next();
            //     }else {
            //         next('/login');
            //     }
            // }   
        },
        {   // 新闻列表
            path: '/newsList',  
            name:"newsList", 
            component: ()=>import('../service/news/newsList/newsList.vue')
        },
        {   // 新闻发布
            path: '/newsRelease',  
            name:"newsRelease", 
            component: ()=>import('../service/newsRelease/newsRelease.vue')
        },
        {   // 新闻发布
            path: '/newsPublish',  
            name:"newsPublish", 
            component: ()=>import('../service/news/newsPublish.vue')
        },
        {   // 新闻详情
            path: '/newsDetials',  
            name:"newsDetials", 
            component: ()=>import('../service/news/newsDetials.vue')
        },
        {   // 活动列表
            path: '/activityList',  
            name:"activityList", 
            component: ()=>import('../service/activity/activityList/activityList.vue')
        },
        {   // 活动详情
            path: '/activityDetail',  
            name:"activityDetail", 
            component: ()=>import('../service/activity/activityDetail/activityDetail.vue')
        },
        {   // 个人中心
            path: '/personal',
            name:'personal',
            component: ()=>import('../service/personal/personal.vue')
        },
        {   // 活动发布
            path: '/activityRelease',
            name:'activityRelease',
            component: ()=>import('../service/personal/activityRelease.vue')
        },
        {   // 个人信息
            path: '/modifyInfor',
            name:'modifyInfor',
            component: ()=>import('../service/personal/modifyInfor.vue')
        },
        {   // 修改个签
            path: '/modifySign',
            name:'modifySign',
            component: ()=>import('../service/personal/modifySign.vue')
        },
        {   // 我的活动
            path: '/myActivity',
            name:'myActivity',
            component: ()=>import('../service/personal/myActivity.vue'),
            meta: {
                keepAlive: true,
            },
        },
        {   // 我的新闻
            path: '/myNews',
            name:'myNews',
            component: ()=>import('../service/personal/myNews.vue')
        },
        {   // 设置
            path: '/setting',
            name:'setting',
            component: ()=>import('../service/personal/setting.vue')
        },
        {   // 修改密码
            path: '/modifyPwd',
            name:'modifyPwd',
            component: ()=>import('../service/personal/modifyPwd.vue')
        },
    ]
})

router.beforeEach(function (to, from, next) {
    MessageBox.close();
    isLogin = base.getCookie('ECO_USER_LOGIN_COOKIE_KEY') || '';
    next();

});

export default  router;

