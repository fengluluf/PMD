import { newApi } from  '@/api'

const state = {
    singleNewData:{}, // 单条新闻详情
    newSliderData:[], // 轮播图
}

const actions = {
    singleNewReq({commit},data){  // 单条新闻查询
        return newApi.singleNew(data).then(res=>{

           commit('singleNewState',res.data.resultJson)
           return res.data
        })
    },
    newSliderReq({commit},data){ // 新闻轮播图请求
        return newApi.newSlider(data).then(res=>{
            commit('newSliderState',res.data)
            return res.data
        })
    },
    newLikeReq({commit},data){ // 新闻点赞请求
        return newApi.newSlider(data).then(res=>{
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
        state.newSliderData = Object.assign([],obj)
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}