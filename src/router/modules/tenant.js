import Layout from '@/layout'
import { physicsMenu } from '@/api/menus/tenant'
var leftMenu = [];

/*逻辑库管理*/
let logic = {
        path: '/logic',
        component: Layout,
        redirect: '/nested/menu1/menu1-1',
        name: 'Logic',
        meta: { title: '逻辑库管理', id: 1, icon: 'pt-luojikuguanli' },
        children: []
    };
    leftMenu.push(logic);

/*物理库管理*/
var physics = {
        path: '/physics',
        component: Layout,
        redirect: '/nested/menu1/menu1-1',
        name: 'Physics',
        meta: { title: '物理库管理', id: 2, icon: 'pt-wulikuguanli' },
        children: []
    };
    physicsMenu().then(res => {
        generaMenu(physics.children, res.data)
    });
    leftMenu.push(physics);

/*系统租户*/
let system = {
        path: '/system',
        component: Layout,
        redirect: '/nested/menu1/menu1-1',
        name: 'System',
        meta: { title: '系统租户', id: 3, icon: 'pt-zuhu' },
        children: []
    };
    leftMenu.push(system);

/*接口数据处理*/
function generaMenu(routes, data) {
  data.forEach(item => {
    const menu = {
      path: 'menu1-2',
      component: () => import('@/views/nested/menu1/menu1-2'),
      name: 'Menu1-2',
      redirect: '/nested/menu1/menu1-2/menu1-2-1',
      meta: { title: item.name },
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