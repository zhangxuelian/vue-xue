import VueRouter from 'vue-router';

const theModules = DIRECTORY || [];
const componentChild = [];
theModules.forEach(item => {
        componentChild.push({
        path:  item,
        name: item,
        component: (resolve) => require(['@/modules/' + item], resolve)
    })
});
const routes=[{
    path:'*',
    redirect:'/getting_started'
},{
    path:'/getting_started',
    name: 'getting_started',
    component:(resolve) => require(['@root/README.md'], resolve)
},{
    path:'/component',
    name:'component',
    component: (resolve) => require(['@/component'], resolve),
    children: componentChild
},{
    path:'/ui'
},{
    path:'/tool'
}]


const router = new VueRouter({
    routes
});

export default router;