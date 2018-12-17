import request from '@/util/request'
import {newsUrl} from '../apis'


export default {
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
            params:obj
        })
    },
    newsPublish(obj){ // 发布新闻
        return request(newsUrl.NEWS_INSERT,{
            method:"post",
            data:obj
        })
    },
   
}