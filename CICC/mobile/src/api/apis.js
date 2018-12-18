
const API_PREFIX = '/api'

// 新闻接口
const newsUrl = {
    NEWS_LIST:'/business-server/news/list', // 新闻列表
    EDITOR_NEWS_LIST:'/business-server/news/listByEditor', // 编辑这发布新闻列表
    NEWS_INSERT:'/business-server/news/insert', // 发布新闻
    NEWS_ONE:'/business-server/news/one', //单条新闻查询
    NEWS_SLIDER:'/business-server/slideShow/list', // 新闻轮播图
    NEWS_LIKE:'/business-server/news/addOrCancelNewsConcern', // 点赞接口
}


// 新闻评论接口
const commentsUrl = {
    COMMENTS_LIST:'/business-server/newsComment/list',  // 获取评论列表
    COMMENTS_ONE:'/business-server/newsComment/one',   // 通过id查询评论
    COMMENTS_iNSERT:'/business-server/newsComment/insert', // 发布评论
    COMMENTS_DELETE:'/business-server/newsComment/delete', // 删除评论
}




export {
    API_PREFIX,
    newsUrl,
    commentsUrl
}