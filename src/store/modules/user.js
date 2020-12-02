import { getRegion, getYear, getHomeMenu, login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  yearList: [],
  regionList:[]
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_YEARS: (state, years) => {
    state.yearList = years
  },
  SET_REGIONS: (state, regions) => {
    state.regionList = regions
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const {region, year, username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({region: region, year: year, username: username.trim(), password: password }).then(response => {
        const data = response
        console.log(data)
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  region({ commit }) {
      return new Promise((resolve, reject) => {
        getRegion().then(response => {
          if(response){
            localStorage.setItem("regionList", JSON.stringify(response));
            commit('SET_REGIONS', response)
          }else{
            commit('SET_REGIONS', [])
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
  },
  year({ commit }) {
      return new Promise((resolve, reject) => {
        getYear().then(response => {
          if(response){
            localStorage.setItem("yearList", JSON.stringify(response));
            commit('SET_YEARS', response)
          }else{
            commit('SET_YEARS', [])
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
  },
  homeMenu({ commit }) {
      return new Promise((resolve, reject) => {
        getHomeMenu().then(response => {
          const { data } = response
          if (!data) {
            reject('获取菜单失败，请检查数据！')
          }
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response
        if (!data) {
          reject('验证失败，请重新登录.')
        }
        data.introduction = "I am a super administrator";
        data.roles = ["admin"];
        const { roles, userCode, introduction } = data
        const avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles 必须是非空数组!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', userCode)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
