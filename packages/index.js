import Pagination from './base/pagination/index.js';
import Table from './base/table/index.js';
import Dialog from './base/dialog/index.js';
import Form from './base/form/index.js';

const components = [
    Pagination,
    Table,
    Dialog,
    Form
];

const install = function (Vue) {
    // 判断是否安装
    if (install.installed) return;

    components.forEach(component => {
        Vue.component(component.name, component);
    });
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    ...components
};