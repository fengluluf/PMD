import { commentsApi } from  '@/api'

const state = {
    commentsListData:{ // 评论列表
        pageContent:[]
    }
}

const actions = {
      commentsListReq({commit},data){ // 评论列表请求
       return commentsApi.commentList(data).then(res=>{
           commit('commentsListState',res.data)
           return res.data
        })
      },
      singleCommentReq({commit},data){ // 新闻单条评论请求
        return commentsApi.singleComment(data).then(res=>{

            return res.data
        })
      },
      publishCommentReq({commit},data){ // 发表评论请求
        return commentsApi.publishComment(data).then(res=>{

            return res.data
        })
      },
      deleteCommentReq({commit},data){ // 删除评论请求
        return commentsApi.deleteComment(data).then(res=>{

            return res.data
        })
      }
}

const mutations = {
      commentsListState(state,obj){
          state.commentsListData = Object.assign({},obj)
      }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}