import '../dist/styles/xue.css';
import Vue from 'vue';
import App from './App';
import router from './src/router/router';
import VueRouter from 'vue-router';
import xue from 'xue';
import demoBlock from './src/components/demo_block';

Vue.use(VueRouter);
Vue.use(xue);
Vue.component('demo-block', demoBlock);

new Vue({
    render: h => h(App),
    router
}).$mount('#app')
