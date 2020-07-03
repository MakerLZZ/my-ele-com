<template>
    <el-dialog
        :custom-class="customClass"
        :visible.sync="dialogVisible"
        :title="title"
        :top="top"
        :width="width"
        :show-close="showClose"
        :destroy-on-close="destroyOnClose"
        :close-on-click-modal="closeOnClickModal"
        append-to-body
        data-automation="jimi-dialog"
        @open="$emit('open')"
        @opened="$emit('opened')"
        @close="handleCloseDia"
        @closed="$emit('closed')"
    >
        <slot name="body">{{this.content}}</slot>
        <slot
            name="footer"
            slot="footer"
        >
        </slot>
    </el-dialog>
</template>

<script>
export default {
    name: 'JmDialog',
    props: {
        customClass: {
            type: String,
            default: ''
        },
        visible: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: '请传入需要显示的标题'
        },
        top: {
            type: String,
            default: '15vh'
        },
        width: {
            type: String,
            default: '500px'
        },
        showClose: {
            type: Boolean,
            default: true
        },
        /* 关闭弹窗是否清除dom元素 */
        destroyOnClose: {
            type: Boolean,
            default: false
        },
        /* 点击旁边是否关闭弹窗 */
        closeOnClickModal: {
            type: Boolean,
            default: false
        },
        content: {
            type: String,
            default: '请传入需要显示的内容'
        }
    },
    data() {
        return {
            dialogVisible: this.visible // 弹框显示隐藏
        };
    },
    watch: {
        /**
         * 监听显示隐藏属性（父）
         * @author lzz
         * @version jimi-ui 0.0.1
         * @param {Boolean} isShow 是否显示
         */
        visible(isShow) {
            this.dialogVisible = isShow;
        }
    },
    methods: {
        /**
         * 处理弹框关闭
         * @author lzz
         * @version jimi-ui 0.0.1
         */
        handleCloseDia() {
            this.$emit('update:visible', false);
            this.$emit('close');
        }
    }
};
</script>

<style lang="scss" scoped>
</style>