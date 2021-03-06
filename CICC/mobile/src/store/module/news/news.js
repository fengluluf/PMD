import { newApi } from  '@/api'

const state = {
    singleNewData:{}, // 单条新闻详情
    newSliderData:{},// 轮播图 
}

const actions = {
    editorNewsReq({commit},data){  // 个人发布新闻查询
        return newApi.editorNews(data).then(res=>{

           res.data.resultJson.pageContent =  res.data.resultJson.pageContent.map(item=>{
                switch(item.status){
                    case 0:
                        item.statusName = '已删除'
                        item.statusClass = 'error'
                    break;
                     case 1:
                       item.statusName = '未审核'
                       item.statusClass = 'watting'
                     break;
                     case 2:
                       item.statusName = '审核通过'
                       item.statusClass = 'success'
                     break;
                     case 3:
                       item.statusName = '未通过'
                       item.statusClass = 'error'
                     break;
                }

                return item
            })
           return res.data
        })
    },
    singleNewReq({commit},data){  // 单条新闻查询
        return newApi.singleNew(data).then(res=>{

           commit('singleNewState',res.data.resultJson)
           return res.data
        })
    },
    newSliderReq({commit},data){ // 新闻轮播图请求
        return newApi.newSlider(data).then(res=>{
            commit('newSliderState',res.data.resultJson)
            return res.data
        })
    },
    newLikeReq({commit},data){ // 新闻点赞请求
        return newApi.like(data).then(res=>{
            return res.data
        })
    },
    newsPublishReq({commit},data){ // 发布新闻
        return newApi.newsPublish(data).then(res=>{
            return res.data
        })
    },
}
const mutations = {
    singleNewState(state,obj){
       state.singleNewData = Object.assign({},obj)
    },
    newSliderState(state,obj){
        state.newSliderData = Object.assign({},obj)
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}