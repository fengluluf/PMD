import Vue from 'vue';
import store from './store'
import router from './router/router';
import App from './App';

import 'lib-flexible/flexible.js'
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import './assets/style/font-icon/iconfont.css'

import {
 Button,
 Swipe,
 SwipeItem,
 List,
 Dialog,
 Toast
} from 'vant'

Vue.use(Button)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(List)
Vue.use(Dialog)

Vue.prototype.Dialog = Dialog;
Vue.prototype.Toast = Toast;
// import './assets/css/my-mint.scss';//全局修改mint-UI样式

Vue.config.productionTip = false;
Vue.use(MintUI);

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
