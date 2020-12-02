import Layout from '@/layout'
import { buildWorkflowTree } from '@/api/menus/workflow'
var leftMenu = [];

/*工作流(全局共享)*/
let workGlobal = {
        path: '/workGlobal',
        component: Layout,
        redirect: '/workGlobal/workDay',
        name: 'WorkGlobal',
        meta: { title: '工作流(全局共享)', id: 1, icon: 'pt-gongzuoliuquanjugongxiang' },
        children: [
            {
              path: 'workDay',
              component: () => import('@/views/workflow/work-day'),
              name: 'workDay',
              meta: { title: '工作日管理(全局)' },
              children: []
            }
        ]
    };
    leftMenu.push(workGlobal);

/*工作流(模板共享)*/
var workTemplate = {
        path: '/workTemplate',
        component: Layout,
        redirect: '/nested/menu1/menu1-1',
        name: 'WorkTemplate',
        meta: { title: '工作流(模板共享)', id: 2, icon: 'pt-gongzuoliumobangongxiang' },
        children: []
    };
    leftMenu.push(workTemplate);

/*工作流(租户)*/
let workTenant = {
        path: '/workTenant',
        component: Layout,
        redirect: '/nested/menu1/menu1-1',
        name: 'WorkTenant',
        meta: { title: '工作流(租户)', id: 3, icon: 'pt-gongzuoliuzuhu' },
        children: [
            {
              path: 'workDay',
              component: () => import('@/views/nested/menu1/menu1-2'),
              name: 'workDay',
              meta: { title: '工作日管理(租户)' },
              children: []
            }
        ]
    };
    buildWorkflowTree().then(res => {
        generaMenu(workGlobal.children, res[0])
        generaMenu(workTemplate.children, res[1])
        generaMenu(workTenant.children, res[2])
    });
    leftMenu.push(workTenant);
    
/*接口数据处理*/
function generaMenu(routes, data) {
  data.forEach(item => {
    const menu = {
      path: 'menu',
      component: () => import('@/views/nested/menu1/menu1-2'),
      name: 'Menu1-2',
      redirect: '/nested/menu1/menu1-2/menu1-2-1',
      meta: { title: item.text },
      children: []
    }
    if (item.children) {
      generaMenu(menu.children, item.children)
    }
    routes.push(menu)
  })
  return routes
}
export default leftMenu