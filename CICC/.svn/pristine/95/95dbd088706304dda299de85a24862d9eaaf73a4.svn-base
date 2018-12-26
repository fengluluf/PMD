import request from '@/util/request'
import {commentsUrl} from '../apis'


export default {
    commentList(obj){ // 评论列表
        return request(commentsUrl.COMMENTS_LIST,{
            params:obj
        })
    },
    singleComment(obj){ // 新闻单条评论
        return request(commentsUrl.COMMENTS_ONE,{
            params:obj
        })
    },
    publishComment(obj){ // 发表评论
        return request(commentsUrl.COMMENTS_iNSERT,{
            method:'post',
            data:obj,
            headers:{
                "Content-Type":'application/x-www-form-urlencoded',
            }
        })
    },
}