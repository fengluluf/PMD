

import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import news from "./module/news";

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'





export default new Vuex.Store({
    namespaced: true,
    state: {
        name:111
    },
    modules: {
        news
    },
    actions: {
      
    },
    mutations: {
    },
    strict: false,
    plugins: debug ? [createLogger()] : []
})