import request from '@/utils/request'

//获取角色、组织、用户
export function getByEleCode(data) {
  return request({
    url: '/element-server2/elementValue/getByEleCode?eleCode=Organize_type',
    method: 'get'
  })
}
//数据权限
export function rule(data) {
  return request({
    url: '/framework-server2/rightmodel/rule',
    method: 'get'
  })
}

