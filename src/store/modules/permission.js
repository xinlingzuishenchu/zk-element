import { asyncRoutes, constantRoutes } from '@/router'
import router from '../../router'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    let leftMenu = routes;
    if(sessionStorage.getItem('leftMenu')){
        leftMenu =require("@/router/modules/workflow").default;
    }
    router.addRoutes(leftMenu)
    state.addRoutes = leftMenu;
    state.routes = constantRoutes.concat(leftMenu)
  }
}

const actions = {
  defaultMenu({ commit }, roles){
      return new Promise(resolve => {
        let accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
  },
  activeMenu({ commit }, type) {
      return new Promise(resolve => {
        if(type == "0"){
            that.leftmenus = require("@/router/modules/tenant");
        }else if(type == "1"){
            that.leftmenus = require("@/router/modules/user");
        }else if(type == "6"){
            let leftmenu = require("@/router/modules/workflow");
            commit('SET_ROUTES', leftmenu.default)
            leftmenu.default.push({ path: '*', redirect: '/404', hidden: true })
            console.log(leftmenu.default)
            sessionStorage.setItem('leftMenu', 6);
            
            resolve('/workGlobal')
        }
      })
      
  },
  generateRoutes({ commit }, roles) {
    console.log(roles)
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      console.log(roles)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
