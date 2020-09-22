import VueRouter from 'vue-router';

const theModules = DIRECTORY || [];

var routes = [];

theModules.forEach(item => {
    routes.push({
        path: '/' + item,
        name: item,
        component: (resolve) => require(['@/modules/' + item], resolve)
    })
});

const router = new VueRouter({
    routes
});

export default router;