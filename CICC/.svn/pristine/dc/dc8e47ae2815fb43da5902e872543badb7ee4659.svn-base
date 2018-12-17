import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
//登录
const login = (resolve) => {
  import('../service/login/login.vue').then((module) => {
      resolve(module)
  })
}
//首页
const home = (resolve) => {
    import('../service/home/home.vue').then((module) => {
        resolve(module)
    })
}
//用户列表
const userList = (resolve) => {
    import('../service/userList/userList.vue').then((module) => {
        resolve(module)
    })
}
//用户详情
const userDetail = (resolve) => {
    import('../service/userDetail/userDetail.vue').then((module) => {
        resolve(module)
    })
}
//新闻发布
const newsPub = (resolve) => {
    import('../service/news/newsPub.vue').then((module) => {
        resolve(module)
    })
}
//新闻编辑
const newsEdit = (resolve) => {
    import('../service/news/newsEdit.vue').then((module) => {
        resolve(module)
    })
}
//新闻列表
const newsList = (resolve) => {
    import('../service/news/newsList.vue').then((module) => {
        resolve(module)
    })
}
//活动列表
const activityList = (resolve) => {
    import('../service/activityList/activityList.vue').then((module) => {
        resolve(module)
    })
}
//活动发布
const activityRelease = (resolve) => {
    import('../service/activityRelease/activityRelease.vue').then((module) => {
        resolve(module)
    })
}
//评论管理
const commentManage = (resolve) => {
    import('../service/contentManage/commentManage.vue').then((module) => {
        resolve(module)
    })
}
//轮播图管理
const bannerManage = (resolve) => {
    import('../service/contentManage/bannerManage.vue').then((module) => {
        resolve(module)
    })
}

const router =  new Router({
    routes: [
        // {
        //     path: '/dist/index.html',  
        //     name:"login",
        //     component: login
        // },
        //登录
        {
            path: '/',  
            name:"login",
            component: login
        },
        //首页
        {
            path: '/home',  
            name:"home",
            component: home
        },
        {   //用户列表
            path: '/userList',  
            name:"userList",
            component: userList
        },
        {   //用户详情
            path: '/userDetail',  
            name:"userDetail",
            component: userDetail
        },
        {   //新闻列表
            path: '/newsList',  
            name:"newsList",
            component: newsList
        },
        {   //新闻编辑
            path: '/newsEdit',  
            name:"newsEdit",
            component: newsEdit
        },
        {   //新闻发布
            path: '/newsPub',  
            name:"newsPub",
            component: newsPub
        },
        {   //活动列表
            path: '/activityList',  
            name:"activityList",
            component: activityList
        },
        {   //活动发布
            path: '/activityRelease',  
            name:"activityRelease",
            component: activityRelease
        },
        {   //评论管理
            path: '/commentManage',  
            name:"commentManage",
            component: commentManage
        },
        {   //轮播图管理
            path: '/bannerManage',  
            name:"bannerManage",
            component: bannerManage
        },
    ]
})

export default  router;


