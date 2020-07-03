<template>
    <div
        class="jimi-pagination"
        data-automation="jimi-pagination"
    >
        <div
            class="mini-total"
            v-if="mini"
        >
            {{current}} / {{totalPage}}
        </div>
        <el-pagination
            :hide-on-single-page="value"
            :total="total"
            :page-size="pageSize"
            :page-sizes="pageSizes"
            :current-page="current"
            :pager-count="pagerCount"
            :layout="layoutBtns"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        >
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: 'JmPagination',
    props: {
        total: {
            type: Number,
            default: 0
        },
        pageSize: {
            type: Number,
            default: 20
        },
        pageSizes: {
            type: Array,
            default: function () {
                return [20, 50, 100];
            }
        },
        currentPage: {
            type: Number,
            default: 1
        },
        pagerCount: {
            type: Number,
            default: 7
        },
        layout: {
            type: String,
            default: 'prev, pager, next, sizes'
        },
        mini: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            current: this.currentPage
        };
    },
    computed: {
        value() {
            return this.total <= 0;
        },
        totalPage() {
            let remainder = this.total % this.pageSize;
            let quotient = this.total / this.pageSize;
            if (remainder === 0) {
                return quotient;
            } else {
                return Math.ceil(quotient);
            }
        },
        layoutBtns() {
            if (this.mini) {
                return 'prev,next';
            } else {
                return this.layout;
            }
        }
    },
    watch: {
        currentPage(val) {
            this.current = val;
        }
    },
    methods: {
        /**
         * 处理切换每页条数
         * @author lzz
         * @version jimi-ui 0.0.1
         * @param {Number} val 每页条数
         */
        handleSizeChange(val) {
            this.$emit('size-change', val);
        },
        /**
         * 处理切换分页
         * @author lzz
         * @version jimi-ui 0.0.1
         * @param {Number} val 页码
         */
        handleCurrentChange(val) {
            this.current = val;
            this.$emit('current-change', val);
        }
    }
};
</script>

<style lang="scss" scoped>
.jimi-pagination {
    display: flex;
    justify-content: flex-end;
    .mini-total {
        font-size: 12px;
        line-height: 32px;
    }
}
</style>