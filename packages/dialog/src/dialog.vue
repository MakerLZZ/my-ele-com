<template>
    <el-dialog
        :visible.sync="diaVisible"
        :title="title"
        :width="width"
        :fullscreen="fullscreen"
        :top="top"
        :modal="modal"
        :modal-append-to-body="modalAppendToBody"
        :append-to-body="appendToBody"
        :lock-scroll="lockScroll"
        :custom-class="customClass"
        :close-on-click-modal="closeOnClickModal"
        :close-on-press-escape="closeOnPressEscape"
        :show-close="showClose"
        :before-close="beforeClose"
        :center="center"
        :destroy-on-close="destroyOnClose"
        @open="$emit('open')"
        @opened="$emit('opened')"
        @close="onClose"
        @closed="$emit('closed')"
    >
        <slot name="body"></slot>
        <slot
            name="footer"
            slot="footer"
        >
            <el-button @click="onClose">取消</el-button>
            <el-button
                type="primary"
                @click="onClickConfimBtn"
            >确定</el-button>
        </slot>
    </el-dialog>
</template>

<script>
export default {
    name: 'BaseDialog',
    props: {
        /* 是否显示 Dialog */
        visible: {
            type: Boolean,
            default: false
        },
        /* 标题 */
        title: {
            type: String,
            default: ''
        },
        /* Dialog 的宽度 */
        width: {
            type: String,
            default: '500px'
        },
        /* 是否为全屏 Dialog */
        fullscreen: {
            type: Boolean,
            default: false
        },
        /* Dialog CSS 中的 margin-top 值 */
        top: {
            type: String,
            default: '15vh'
        },
        /* 是否需要遮罩层 */
        modal: {
            type: Boolean,
            default: true
        },
        /* 遮罩层是否插入至 body 元素上，若为 false，则遮罩层会插入至 Dialog 的父元素上 */
        modalAppendToBody: {
            type: Boolean,
            default: true
        },
        /* Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true */
        appendToBody: {
            type: Boolean,
            default: false
        },
        /* 是否在 Dialog 出现时将 body 滚动锁定 */
        lockScroll: {
            type: Boolean,
            default: true
        },
        /* Dialog 的自定义类名 */
        customClass: {
            type: String,
            default: ''
        },
        /* 是否可以通过点击 modal 关闭 Dialog */
        closeOnClickModal: {
            type: Boolean,
            default: true
        },
        /* 是否可以通过按下 ESC 关闭 Dialog */
        closeOnPressEscape: {
            type: Boolean,
            default: true
        },
        /* 是否显示关闭按钮 */
        showClose: {
            type: Boolean,
            default: true
        },
        /* 关闭前的回调，会暂停 Dialog 的关闭 */
        beforeClose: {
            type: Function,
            default: (done) => {
                done();
            }
        },
        /* 是否对头部和底部采用居中布局 */
        center: {
            type: Boolean,
            default: false
        },
        /* 关闭弹窗是否清除dom元素 */
        destroyOnClose: {
            type: Boolean,
            default: false
        },
        /* 弹框中的确定按钮点击事件 */
        onClickConfimBtn: {
            type: Function,
            default: () => {
                this.onClose();
            }
        }
    },
    data() {
        return {
            diaVisible: this.visible // 弹框显示隐藏
        };
    },
    watch: {
        /**
         * 监听显示隐藏属性（父）
         * @param {Boolean} isShow 是否显示
         */
        visible(isShow) {
            this.diaVisible = isShow;
        }
    },
    methods: {
        /**
         * 处理弹框关闭
         */
        onClose() {
            this.$emit('update:visible', false);
            this.$emit('close');
        }
    }
};
</script>