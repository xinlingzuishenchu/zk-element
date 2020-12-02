import request from '@/utils/request'

//获取流程中心
export function buildWorkflowTree(data) {
  return request({
    url: '/workflow-server2/workflowNew/buildWorkflowTree',
    method: 'get'
  })
}


