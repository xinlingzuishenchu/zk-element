const state = {
  activeRouter:'/',
  workflow:[]
}

const mutations = {
  SET_ACTIVROUTER: (state, activeRouter) => {
    state.activeRouter = activeRouter
  },
  SET_WORKFLOW: (state, data) => {
    state.workflow = data
  },
}

const actions = {
  activeMenu({ commit }, type) {
      return new Promise(resolve => {
        if(type == "0"){
            that.leftmenus = require("@/router/modules/tenant");
        }else if(type == "1"){
            that.leftmenus = require("@/router/modules/user");
        }else if(type == "6"){
            if(state.workflow.length == 0){
                let leftmenu = require("@/router/modules/workflow");
                commit('SET_WORKFLOW', leftmenu.default)
                commit('SET_ACTIVROUTER', '/workGlobal')
                console.log(state.workflow)
                console.log(state.activeRouter)
                resolve()
            }
            
            
        }
      })
      
  },
  workflow({ commit }, workflow) {
    console.log(workflow)
      return new Promise(resolve => {
        console.log(workflow)
          commit('SET_WORKFLOW', workflow)
          resolve()
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
