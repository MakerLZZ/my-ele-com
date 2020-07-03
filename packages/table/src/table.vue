<template>
    <el-table
        ref="jimi-table"
        :class="config.tableClass || ''"
        :data="data"
        v-loading="config.loading"
        row-key="id"
        :height="config.height ? config.height : '100%'"
        :border="config.border"
        highlight-current-row
        header-row-class-name="table-header-row"
        row-class-name="table-body-row"
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        @current-change="handleCurrentChange"
        @selection-change="handleSelectChange"
        data-automation="jimi-table"
    >
        <!-- 操作列 -->
        <el-table-column
            v-if="config.hasSelect"
            type="selection"
            :width="config.selectWidth || 55"
            :align="config.selectAlign || 'center'"
        >
        </el-table-column>
        <!-- 序号列 -->
        <el-table-column
            v-if="config.hasIndex"
            type="index"
            :width="config.indexWidth || 55"
            :label="config.indexLabel || '序号'"
            :align="config.indexAlign || 'left'"
            :index="getIndex"
        >
        </el-table-column>
        <template v-for="(item, key) in tableHeadNow">
            <!-- 普通列 -->
            <el-table-column
                :class-name="item.className || null"
                v-if="item.isShow !== false && item.isShow !== 'template'"
                :key="key"
                :prop="item.prop"
                :label="item.label"
                :width="item.width || null"
                :min-width="item.minWidth || null"
                :fixed="item.align || null"
                :formatter="item.formatter || handleFormat"
                show-overflow-tooltip
            >
            </el-table-column>
            <!-- render列 -->
            <el-table-column
                :class-name="item.className || null"
                v-if="item.isShow !== false && item.isShow === 'template'"
                :key="key"
                :prop="item.prop"
                :label="item.label"
                :width="item.width || null"
                :min-width="item.minWidth || null"
                :fixed="item.align || null"
                show-overflow-tooltip
            >
                <template slot-scope="scope">
                    <jm-table-expand
                        :render="scope.row[item.prop]"
                        :row="scope.row"
                        :index="key"
                        :column="item"
                    />
                </template>
            </el-table-column>
        </template>
        <!-- 操作列 -->
        <el-table-column
            :class-name="tableOperation.className || ''"
            v-if="config.hasOperation"
            column-key="operation"
            :label="tableOperation.label || '操作'"
            :width="tableOperation.width ? config.hasSetHead ? null : tableOperation.width : null"
            :min-width="tableOperation.minWidth ? tableOperation.minWidth : config.hasSetHead ? tableOperation.width : 100"
            :fixed="tableOperation.fixed || 'right'"
            :align="tableOperation.align || 'left'"
        >
            <template
                slot="header"
                slot-scope="scope"
            >
                <span>{{config.operation.label || '操作'}}</span>
                <i
                    :class="config.setHeadIcon || ''"
                    v-if="config.hasSetHead"
                    @click="isShowSelectColumnDialog = true"
                ></i>
                <!-- 动态修改表头弹框 -->
                <jm-dialog
                    :visible.sync="isShowSelectColumnDialog"
                    :title="config.dialogTitle || '设置显示字段'"
                >
                    <template slot="body">
                        <el-checkbox-group
                            class="checkbox-group"
                            v-model="checkListBox"
                        >
                            <el-checkbox
                                v-for="(item, key) in tableHeadBox"
                                :label="item.label"
                                :key="key"
                                :disabled="item.disabled"
                            ></el-checkbox>
                        </el-checkbox-group>
                    </template>
                    <template slot="footer">
                        <el-button @click="isShowSelectColumnDialog = false">{{config.dialogCancleText || '取消'}}</el-button>
                        <el-button
                            type="primary"
                            @click="handleSetTableHead"
                        >{{config.dialogConfirmText || '确定'}}</el-button>
                    </template>
                </jm-dialog>
            </template>
            <template slot-scope="scope">
                <el-button
                    :class="scope.row.cond !== undefined && btn.id === 0 ? scope.row.btnClassName : btn.btnClassName"
                    v-for="(btn, key) in tableOperation.data"
                    v-if="validateBtn(btn.permissionStr, btn.needValidAttr, scope.row)"
                    :key="key"
                    :type="btn.type || null"
                    :size="btn.size"
                    @click.stop="handleOperation(scope.row, btn.id)"
                >{{scope.row.cond !== undefined && btn.id === 0 ? scope.row.btnLabel : btn.label}}</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<style lang="scss" scoped>
</style>

<script>
import JmTableExpand from './render.js';
import JmDialog from '~/dialog';

export default {
    name: 'JmTable',
    components: {
        JmTableExpand, // 自定义列
        JmDialog
    },
    props: {
        /* 表格数据 */
        data: {
            default: function() {
                return [];
            },
            type: Array
        },
        /* 表格配置属性 */
        config: {
            default: function() {
                return {};
            },
            type: Object
        },
        /* 默认选中表头列表 */
        checkList: {
            default: function() {
                return [];
            },
            type: Array
        },
        page: {
            default: 0,
            type: Number
        },
        pageSize: {
            default: 0,
            type: Number
        },
        buttonPower: {
            default: function() {
                return {};
            },
            type: Object
        }
    },
    data() {
        return {
            /* 表格配置 */
            tableHeadBox: this.config.tableHead, // 表头数据容器
            tableOperation: this.config.operation,
            /* 动态表头 */
            isShowSelectColumnDialog: false, // 弹框显示隐藏
            tableHeadNow: this.config.tableHead, // 当前表头数据
            newCheckList: [],
            checkListBox: this.checkList, // 选中表头列表容器
            /* 表格属性 */
            currentRow: null, // 当前行高亮
            /* 分页 */
            pageBox: this.page,
            pageSizeBox: this.pageSize,
            /* 权限 */
            buttonPowerBox: this.buttonPower
        };
    },
    watch: {
        checkList(val) {
            this.newCheckList = [...val];
            this.checkListBox = [...val];
        },
        config: {
            handler(newTableVal) {
                if (this.config.hasSetHead) {
                    this.tableHeadBox = this.config.tableHead;
                    this.tableHeadNow = newTableVal.tableHead.filter(item => this.newCheckList.indexOf(item.label) >= 0);
                }
                this.tableOperation = this.config.operation;
            },
            deep: true
        },
        checkListBox(newCheckList) {
            this.newCheckList = [...newCheckList];
        },
        isShowSelectColumnDialog(val) {
            if (!val) {
                this.$emit('get-check-list');
            }
        },
        page(newPage) {
            this.pageBox = newPage;
        },
        pageSize(newPageSize) {
            this.pageSizeBox = newPageSize;
        },
        buttonPower(newPower) {
            this.buttonPowerBox = newPower;
        }
    },
    updated() {
        /* 解决表头显示隐藏重绘错位问题 */
        this.$refs['jimi-table'].doLayout();
        this.config.loading = false;
    },
    methods: {
        /**
         * 处理当前行变化事件
         * @author lzz
         * @version jimi-ui 0.0.1
         * @param {Number} val 点击当前行的index
         */
        handleCurrentChange(val) {
            this.currentRow = val;
            this.$emit('current-change', val);
        },
        /**
         * 处理选项变化
         * @author lzz
         * @version jimi-ui 0.0.1
         * @param {Number} val 选项
         */
        handleSelectChange(val) {
            this.$emit('select-change', val);
        },
        /**
         * 获取行下标
         * @author lzz
         * @version jimi-ui 0.0.1
         * @param {Number} index 当前下标
         */
        getIndex(index) {
            return (this.pageBox - 1) * this.pageSizeBox + index + 1;
        },
        /**
         * 处理格式化
         * @author lzz
         * @version jimi-ui 0.0.1
         * @param {Object} row 行数据
         * @param {Object} column 列数据
         * @param {Object} cellValue 元素值
         */
        handleFormat(row, column, cellValue) {
            if (!cellValue) {
                return '—';
            } else {
                return cellValue;
            }
        },
        /**
         * 处理设置表头
         * @author lzz
         * @version jimi-ui 0.0.1
         */
        handleSetTableHead() {
            this.tableHeadNow = this.tableHeadBox.filter(item => this.newCheckList.indexOf(item.label) >= 0);
            if (this.$emit('table-head-change', this.newCheckList)) {
                this.isShowSelectColumnDialog = false;
            }
        },
        /**
         * 验证按钮
         * @author lzz
         * @version jimi-ui 0.0.1
         * @param {String} permissionStr 需要校验的按钮权限
         * @param {String} needValidAttr 需要校验的自定义权限
         * @param {Object} row 行对象
         */
        validateBtn(permissionStr, needValidAttr, row) {
            if (!permissionStr && !needValidAttr) {
                return true;
            }
            if (permissionStr && !needValidAttr) {
                return this.buttonPowerBox[permissionStr];
            }
            if (!permissionStr && needValidAttr) {
                const flag = needValidAttr.flag ? '1' : '0';
                return row[needValidAttr.attrName] == flag;
            }
            if (permissionStr && needValidAttr) {
                const flag = needValidAttr.flag ? '1' : '0';
                return this.buttonPowerBox[permissionStr] && row[needValidAttr.attrName] == flag;
            }
        },
        /**
         * 处理操作
         * @author lzz
         * @version jimi-ui 0.0.1
         * @param {Object} row 行数据
         * @param {Number} funcId 方法id
         */
        handleOperation(row, funcId) {
            const func = this.tableOperation.data.find(val => val.id === funcId).func;
            this.$emit(func, row);
        }
    }
};
</script>
