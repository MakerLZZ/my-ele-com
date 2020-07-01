import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import exampleBlock from './components/code-block.vue';

import JimiUI from '~';

Vue.config.productionTip = false;

Vue.component('code-block', exampleBlock);
Vue.use(ElementUI);
Vue.use(JimiUI);

Vue.prototype.$ELEMENT = {size: 'small'};

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');