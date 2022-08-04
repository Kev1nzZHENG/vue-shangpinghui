// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
// 引入store
import store from '@/store'
// 使用插件
Vue.use(VueRouter)

// 配置路由
let router = new VueRouter({
  // 配置路由
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  },
})

// 全局守卫
router.beforeEach(async (to, from, next) => {
  let token = store.state.user.token; //是否登陆的标志，若登陆有token，没登陆为null
  let name = store.state.user.userInfo.name;  //用户信息
  // 如果登陆了跳转login页面跳转至home页面
  if (token) {
    if (to.name == "login") {
      next('/home');
    } else {
      if (name) {
        next();
      }
      else {
        try {
          await store.dispatch('user/getUserInfo');
          next();
        } catch (error) {
          // token失效，重新登陆
          await store.dispatch('user/userLogout');
          next('/login')
        }
      }
    }
  } else {
    // 未登录，不能去trade、pay、paysuccess、center【含其子路由】页面
    let toPath = to.path;
    if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1 || toPath.indexOf('car') != -1) {
      next('/login?redirect=' + toPath);
    }
    else {
      next();
    }
  }
})

export default router;