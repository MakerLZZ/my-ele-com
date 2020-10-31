<!--
 * @Author: lizhenzhen
 * @Date: 2020-06-30 17:13:55
 * @LastEditors: lizhenzhen
 * @LastEditTime: 2020-10-31 16:13:00
 * @FilePath: \my-ele-com\packages\pagination\src\pagination.vue
-->
<template>
    <div class="base-pagination">
        <div
            class="mini-total"
            v-if="mini"
        >
            {{current}} / {{totalPage}}
        </div>
        <el-pagination
            v-bind="$props"
            v-on="$listeners"
            :layout="layoutBtns"
            @current-change="test"
        >
        </el-pagination>
    </div>
</template>

<script>
import {Pagination} from 'element-ui';

export default {
    // inheritAttrs: false,
    name: 'BasePagination',
    props: {
        ...Pagination.props,
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
    methods: {
        test(val) {
            this.current = val;
            this.$emit('current-change', val);
        }
    }
};
</script>

<style lang="scss" scoped>
.base-pagination {
    display: flex;
    .mini-total {
        font-size: 12px;
        line-height: 32px;
    }
}
</style>