import Pagination from './pagination';
import Table from './table';
import Dialog from './dialog';
import Form from './form';

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