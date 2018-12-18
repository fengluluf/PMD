import request from '@/util/request'
import {newsUrl} from '../apis'
const qs = require('qs');

export default {
    editorNews(obj){ // 获取编辑人员发布的新闻
        return request(newsUrl.EDITOR_NEWS_LIST,{
            params:obj
        })
    },
    singleNew(obj){ // 单条新闻查询
        return request(newsUrl.NEWS_ONE,{
            params:obj
        })
    },
    newSlider(obj){   // 头条新闻录播图
        return request(newsUrl.NEWS_SLIDER,{
            params:obj
        })
    },
    like(obj){ // 点赞请求
        return request(newsUrl.NEWS_LIKE,{
            method:"post",
            data:obj,
            headers:{
                "Content-Type":'application/x-www-form-urlencoded',
            }
        })
    },
    newsPublish(obj){ // 发布新闻
        return request(newsUrl.NEWS_INSERT,{
            method:"post",
            data:obj,
            headers:{
                "Content-Type":'application/x-www-form-urlencoded',
            }
        })
    },
   
}