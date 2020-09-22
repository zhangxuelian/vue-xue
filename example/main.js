import Vue from 'vue';
import App from './App';
import router from './src/router/router';
import VueRouter from 'vue-router';
import xue from 'xue';

Vue.use(VueRouter);
Vue.use(xue);

new Vue({
    render: h => h(App),
    router
}).$mount('#app')
