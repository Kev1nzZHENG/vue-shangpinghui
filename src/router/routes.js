// 路由配置信息
export default [
    {
        name: 'home',
        path: '/home',
        component: () => import('@/pages/Home'),
        meta: {
            show: true
        },
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: () => import('@/pages/Search'),
        meta: {
            show: true
        },
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('@/pages/Login'),
        meta: {
            show: false
        },
    },
    {
        name: 'register',
        path: '/register',
        component: () => import('@/pages/Register'),
        meta: {
            show: false
        },
    },
    {
        name: 'detail',
        path: '/detail/:skuId',
        component: () => import('@/pages/Detail'),
        meta: {
            show: false
        },
    },
    {
        name: 'addshopcar',
        path: '/addcartsuccess',
        component: () => import('@/pages/AddCartSuccess'),
        meta: {
            show: false
        },
    },
    {
        name: 'shopcar',
        path: '/shopcar',
        component: () => import('@/pages/ShopCart'),
        meta: {
            show: false
        },
    },
    {
        name: 'trade',
        path: '/trade',
        component: () => import('@/pages/Trade'),
        meta: {
            show: false
        },
        // 去交易页面，必须是从购物车而来
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcar') {
                next();
            } else {
                next(false)
            }
        }
    },
    {
        name: 'pay',
        path: '/pay',
        component: () => import('@/pages/Pay'),
        meta: {
            show: false
        },
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next();
            } else {
                next(false)
            }
        }
    },
    {
        name: 'paysuccess',
        path: '/paysuccess',
        component: () => import('@/pages/PaySuccess'),
        meta: {
            show: false
        },
        beforeEnter: (to, from, next) => {
            if (from.path == '/pay') {
                next();
            } else {
                next(false)
            }
        }
    },
    {
        name: 'center',
        path: '/center',
        component: () => import('@/pages/Center'),
        meta: {
            show: false
        },
        // 二级路由组件
        children: [
            {
                name: 'myorder',
                path: 'myorder',
                component: () => import("@/pages/Center/myOrder")
            },
            {
                name: 'grouporder',
                path: 'grouporder',
                component: () => import("@/pages/Center/groupOrder")
            },
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },
    // 重定向：在项目跑起来的时候，访问/，立马让他定向到首页
    {
        path: '/',
        redirect: '/home'
    }

]