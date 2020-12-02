import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import Home from '@/views/home'

// import tenantRouter from '@/router/modules/workflow'

/**
 *
 * hidden: true                   如果设置为true，则不会在侧边栏中显示该项(默认为false)
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                如果不设置 alwaysShow, 当项目有多个子路径时,
 *                                它将变成嵌套模式，否则不显示根菜单
 * redirect: noRedirect           如果设置为noRedirect，则在面包屑中不会重定向
 * name:'router-name'             该名称由<keep-alive>使用 (必须设置!!!)
 * meta : {
    roles: ['admin','editor']    可设置多个角色页面
    title: 'title'               在边栏和面包屑中显示的名称（推荐设置）
    icon: 'svg-name'/'el-icon-x' 图标显示在侧栏中
    noCache: true                如果设置为true, 不会缓存该页（默认值为false）
    affix: true                  如果设置为true, the tag will affix in the tags-view
    breadcrumb: false            如果设置为false, 该项将隐藏在面包屑中（默认值为true）
    activeMenu: '/example/list'  如果设置路径, 选中侧边栏菜单将高亮显示
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
    // 404 page must be placed at the end !!!
    // { path: '*', redirect: '/404', hidden: true }
];

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
