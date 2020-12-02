import request from '@/utils/request'

//获取物理库
export function physicsMenu(data) {
  return request({
    url: '/framework-server2/physicalDatabase/getGroupByRdbToTree',
    method: 'get'
  })
}


