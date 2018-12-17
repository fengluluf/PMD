import $ from 'jquery'
import _ from 'lodash'
import netAjax from '../../net/net-ajax'
import {develop, baseUrl} from '../../../config'

export default {

    /**
     * 新闻评论
     * @param data
     */
    //根据id获取新闻详情
    getItem: function (data) {
        if(develop) {
            var def = $.Deferred();
            setTimeout(function () {
                var d = {
                    resultCode: 200
                }
                def.resolve(d);
            }, 100);
            return def;
        }else {
            var def = $.Deferred();
            netAjax.singleRequest({
                url: baseUrl + '/news-server/news/one',
                data:data,
                type: 'GET',
                success: function (d) {
                    def.resolve(d)
                },
                error: function (d) {
                    def.reject(d)
                }
            })
            return def;
        }
    },
    //获取评论
    getMessage: function (data) {
        if(develop) {
            var def = $.Deferred();
            setTimeout(function () {
                var d = {
                    resultCode: 200
                }
                def.resolve(d);
            }, 100);
            return def;
        }else {
            var def = $.Deferred();
            netAjax.singleRequest({
                url: baseUrl + '/news-server/news/insert',
                data:data,
                type: 'POST',
                success: function (d) {
                    def.resolve(d)
                },
                error: function (d) {
                    def.reject(d)
                }
            })
            return def;
        }
    },
    //发送评论
    sendMessage: function (data) {
        if(develop) {
            var def = $.Deferred();
            setTimeout(function () {
                var d = {
                    resultCode: 200
                }
                def.resolve(d);
            }, 100);
            return def;
        }else {
            var def = $.Deferred();
            netAjax.singleRequest({
                url: baseUrl + '/news-server/news/insert',
                data:data,
                type: 'POST',
                success: function (d) {
                    def.resolve(d)
                },
                error: function (d) {
                    def.reject(d)
                }
            })
            return def;
        }
    },

}