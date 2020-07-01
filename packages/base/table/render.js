export default {
    name: 'JmTableExpand',
    functional: true,
    props: {
        row: Object, // 行数据
        render: Function, // render函数
        index: Number, // 下标
        /* 列 */
        column: {
            type: Object,
            default: null
        }
    },
    /**
     * 渲染函数
     * @param {Function} h render函数
     * @param {Object} ctx 参数
     */
    render: (h, ctx) => {
        const params = {
            row: ctx.props.row,
            index: ctx.props.index
        };
        if (ctx.props.column) {
            params.column = ctx.props.column;
        }
        return ctx.props.render(h, params);
    }
};