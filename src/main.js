import Vue from 'vue'
import App from './App'
import router from './router'
import "common/less/index.less";
import axios from 'axios'
import VueLazyload from 'vue-lazyload'
import store from './store'

Vue.prototype.axios = axios
Vue.config.productionTip = false;

//图片懒加载
Vue.use(VueLazyload, {
  loading: require('common/image/default.jpg'),
  error:require('common/image/default.jpg')
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
