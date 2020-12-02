import Layout from '@/layout'
import { getByEleCode, rule } from '@/api/menus/user'
var leftMenu = [];

/*角色(全局共享)*/
let roleGlobal = {
        path: '/roleGlobal',
        component: Layout,
        redirect: '/nested/menu1/menu1-1',
        name: 'RoleGlobal',
        meta: { title: '角色(全局共享)', id: 1, icon: 'pt-jiaosequanju' },
        children: []
    };
    leftMenu.push(roleGlobal);

/*角色(租户)*/
var roleTenant = {
        path: '/roleTenant',
        component: Layout,
        redirect: '/nested/menu1/menu1-1',
        name: 'RoleTenant',
        meta: { title: '角色(租户)', id: 2, icon: 'pt-jiaosezuhu' },
        children: []
    };
    leftMenu.push(roleTenant);

/*组织(租户)*/
let organTenant = {
        path: '/organTenant',
        component: Layout,
        redirect: '/nested/menu1/menu1-1',
        name: 'OrganTenant',
        meta: { title: '组织(租户)', id: 3, icon: 'pt-zuzhizuhu' },
        children: []
    };
    leftMenu.push(organTenant);

/*用户管理(租户)*/
let userManage = {
        path: '/userManage',
        component: Layout,
        redirect: '/nested/menu1/menu1-1',
        name: 'UserManage',
        meta: { title: '用户管理(租户)', id: 4, icon: 'pt-yonghuguanlizuhu' },
        children: []
    };
    getByEleCode().then(res => {
        generaMenu(roleGlobal.children, res.data)
        generaMenu(roleTenant.children, res.data)
        generaMenu(organTenant.children, res.data)
        generaMenu(userManage.children, res.data)
    });
    leftMenu.push(userManage);
    
/*数据权限*/
let dataPermission = {
        path: '/dataPermission',
        component: Layout,
        redirect: '/nested/menu1/menu1-1',
        name: 'DataPermission',
        meta: { title: '数据权限', id: 5, icon: 'pt-shujuquanxian' },
        children: []
    };
    rule().then(res => {
        generaMenu(dataPermission.children, res.data)
    });
    leftMenu.push(dataPermission);
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