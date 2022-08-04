import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store/'

// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav)
// 轮播图————全局组件
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name, Carousel)
// 分页组件
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name, Pagination)
// 引入MockServer.js---mock数据
import '@/mock/mockServer';
// 引入swiper样式
import "swiper/css/swiper.min.css"
// 引入element ui
import { Icon, MessageBox } from 'element-ui'
Vue.component(Icon.name, Icon)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入懒加载插件
import VueLazyload from 'vue-lazyload'
import loading from '@/assets/loading.gif'
// 注册插件
Vue.use(VueLazyload, {
  loading
});

// 引入表单校验插件
import '@/plugins/validate'

// 生产提示关闭
Vue.config.productionTip = false
// 引入统一接口API文件里的全部请求函数
import * as API from '@/api'
new Vue({
  // 全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  render: h => h(App),
  router,
  store,
}).$mount('#app')
