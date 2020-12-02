import request from '@/utils/request'
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据

//获取区划
export function getRegion() {
  return request({
    url: '/framework-server2/tenant/tenantTreeByType/2/0',
    method: 'get'
  })
}
//获取年度
export function getYear() {
  return request({
    url: '/grp-sso-server/loginController/html/year',
    method: 'post'
  })
}
//获取首页列表
export function getHomeMenu() {
  return request({
    url: '/framework-engin2/menu',
    method: 'get'
  })
}
export function login(data) {
  return request({
    url: '/grp-sso-server/TokenController/login',
    method: 'post',
    data: QS.stringify(data)
  })
}
export function getInfo() {
  return request({
    url: '/framework-engin2/userSession/user',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
