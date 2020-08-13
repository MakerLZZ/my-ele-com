import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import exampleBlock from './components/code-block.vue';

import Component from '../packages';

Vue.config.productionTip = false;

Vue.component('code-block', exampleBlock);
Vue.use(ElementUI);
Vue.use(Component);

Vue.prototype.$ELEMENT = {
    size: 'mini'
};

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');