import $ from 'jquery'
import _ from 'lodash'
import netAjax from '../../net/net-ajax'
import {develop, baseUrl} from '../../../config'

export default {

    /**
     * 新闻列表
     * @param data
     */
    isLike: function (data) {
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