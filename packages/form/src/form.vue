<template>
    <div
        class="jimi-form"
        data-automation="jimi-form"
    >
        <el-form
            :ref="refName"
            :model="formModelBox"
            :rules="rules"
            :inline="inline"
            :label-width="labelWidth"
        >
            <el-form-item
                v-for='item in formConfigBox'
                :key='item.prop'
                :label="item.label"
                :ref="item.ref || item.prop"
                :prop="item.prop"
            >
                <!-- 输入框 -->
                <el-input
                    v-if="item.type === 'input' || item.type === undefined"
                    v-model="formModelBox[item.prop]"
                    :placeholder="item.placeholder"
                    :disabled="item.disabled"
                    :size="item.size"
                ></el-input>
                <!-- 带按钮的输入框 -->
                <el-input
                    v-if="item.type === 'inputAndBtn'"
                    v-model="formModelBox[item.prop]"
                    :placeholder="item.placeholder"
                    :size="item.size"
                >
                    <el-button
                        slot="append"
                        :size="item.size"
                        :disabled="item.disabled"
                        @click="!item.disabled ? $emit(item.func) : null"
                    >{{item.btnLabel}}</el-button>
                </el-input>
                <!-- textarea 输入框 -->
                <el-input
                    v-if="item.type === 'textarea'"
                    v-model="formModelBox[item.prop]"
                    type="textarea"
                    resize="none"
                    :rows="4"
                    :autosize="{ minRows: 4, maxRows: 5}"
                    :disabled="item.disabled"
                    :placeholder="item.placeholder"
                ></el-input>
                <!-- 密码输入框 -->
                <el-input
                    v-if="item.type === 'pass'"
                    v-model="formModelBox[item.prop]"
                    type="password"
                    :disabled="item.disabled"
                    :placeholder="item.placeholder"
                    :size="item.size"
                ></el-input>
                <!-- 下拉框 -->
                <el-select
                    v-if="item.type === 'select'"
                    v-model="formModelBox[item.prop]"
                    :placeholder="item.placeholder"
                >
                    <el-option
                        v-for="(op, index) in item.options"
                        :key="index"
                        :label="op.label"
                        :value="op.value"
                    ></el-option>
                </el-select>
                <!-- 单选框组 -->
                <el-radio-group
                    v-if="item.type === 'radio' && !item.func"
                    v-model="formModelBox[item.prop]"
                    :disabled="item.disabled"
                >
                    <el-radio
                        v-for="(radio, index) in item.options"
                        :key="index"
                        :label="radio.value"
                    >{{radio.label}}</el-radio>
                </el-radio-group>
                <!-- 带额外方法的单选框组 -->
                <el-radio-group
                    ref="radio"
                    v-if="item.type === 'radio' && item.func"
                    v-model="formModelBox[item.prop]"
                    :disabled="item.disabled"
                    @change="handleRadioChange(item.func, formModelBox[item.prop])"
                >
                    <el-radio
                        v-for="(radio, index) in item.options"
                        :key="index"
                        :label="radio.value"
                    >{{radio.label}}</el-radio>
                </el-radio-group>
                <!-- 多选框组 -->
                <el-checkbox-group
                    v-if="item.type === 'checkbox'"
                    v-model="formModelBox[item.prop]"
                    :disabled="item.disabled"
                >
                    <el-checkbox
                        v-for="(checkbox, index) in item.options"
                        :key="index"
                        :label="checkbox.value"
                    >{{checkbox.label}}</el-checkbox>
                </el-checkbox-group>
                <!-- 日期选择 -->
                <el-date-picker
                    v-if="item.type === 'datetime'"
                    v-model="formModelBox[item.prop]"
                    type="datetime"
                    :placeholder="item.placeholder"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :pickerOptions="item.pickerOptions"
                    :default-time="item.defaultTime"
                >
                </el-date-picker>
                <!-- 日期范围选择 -->
                <el-date-picker
                    v-if="item.type === 'datetimerange'"
                    v-model="formModelBox[item.prop]"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :pickerOptions="item.pickerOptions ? item.pickerOptions : null"
                    :default-time="item.defaultTime"
                >
                </el-date-picker>
                <!-- 文字 -->
                <div v-if="item.type === 'text'">{{item.value}}</div>
                <!-- 多行提示 -->
                <div
                    v-if="item.tip"
                    class="form-tip-item"
                >
                    <p
                        v-for="(tip, index) in item.tip"
                        :key="index"
                    >{{tip}}</p>
                </div>
                <slot
                    v-if="item.type === 'custom'"
                    :name="item.slotName"
                ></slot>
            </el-form-item>
            <slot name="submit"></slot>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'JmForm',
    props: {
        refName: {
            type: String,
            default: ''
        },
        model: {
            type: Object,
            default: {}
        },
        config: {
            type: Array,
            default: []
        },
        rules: {
            type: Object,
            default: function () {
                return {};
            }
        },
        inline: {
            type: Boolean,
            default: false
        },
        labelWidth: {
            type: String,
            default: ''
        },
        labelPosition: {
            type: String,
            default: 'right'
        }
    },
    data() {
        return {
            formModelBox: {...this.model},
            formConfigBox: [...this.config]
        };
    },
    watch: {
        model: {
            handler(newFormModel) {
                this.$nextTick(() => {
                    this.formModelBox = {...newFormModel};
                });
            },
            deep: true
        },
        config: {
            handler(newFormConfig) {
                this.formConfigBox = [...newFormConfig];
            },
            deep: true
        }
    },
    methods: {
        /**
         * 处理单选改变
         * @author lzz
         * @version jimi-ui 0.0.1
         * @param {String} func 回调方法名称
         * @param {Number} newVal 改变的值
         */
        handleRadioChange(func, newVal) {
            this.$emit(func, newVal);
        },
        /**
         * 提交表单
         * @author lzz
         * @version jimi-ui 0.0.1
         */
        submitForm() {
            let validate = false;
            this.$refs[this.refName].validate((valid) => {
                if (valid) {
                    validate = true;
                }
            });
            return validate;
        },
        /**
         * 重置表单
         * @author lzz
         * @version jimi-ui 0.0.1
         */
        resetForm() {
            let ref = this.refName;
            this.$refs[ref].clearValidate();
            this.$refs[ref].resetFields();
        },
        /**
         * 获取表单字段属性值
         * @author lzz
         * @version jimi-ui 0.0.1
         */
        getFormModel() {
            this.$emit('get-form-model', this.formModelBox);
        }
    }
};
</script>

<style lang="scss" scoped>
.jm-form {
    .el-select {
        width: 100%;
    }
    .form-tip-item {
        font-size: 12px;
        color: #c0c4cc;
    }
}
</style>