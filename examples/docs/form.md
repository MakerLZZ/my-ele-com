<span></span

## Form 表单组件


<br />

### 基础用法
:::demo 同时展示了其他用法
```html
<jm-form
    :model="form"
    :config="config"
    inline
    label-position="left"
    label-width="100px"
    @btnFn="handleBtnFn"
>
</jm-form>

<script>
export default {
    data() {
        return {
            form: {},
            config: [
                {
                    label: '姓名',
                    ref: 'name',
                    prop: 'prop',
                    type: 'inputAndBtn',
                    btnLabel: 'submit',
                    func: 'btnFn'
                }
            ]
        };
    },
    methods: {
        handleBtnFn() {
            console.log('234234;');
        }
    }
};
</script>
```
:::

<br />

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| model | 表单数据对象 | Object | - | - |
| config | Form-Item 数据列表 | object[] | - | - |
| ref-name | 注册引用信息名称 | String | - | - |
| rules | 表单验证规则 | object | - | - |
| label-width | 表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。 | string | - | - |
| label-position | 表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width | string | right/left/top | top |
| inline | 行内表单模式 | Boolean | - | false |

<br />

### config options
| 名称 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | --- | --- | ----- | ----- |
| label | 标签文本的内容 | string | - | - |
| ref | 注册引用信息名称 | string | - | - |
| prop | 表单域 model 字段 | string | - | - |
| type | Form-Item 内控件类型 | string | input / inputAndBtn / textarea / pass / select / radio / checkbox / datetime / datetimerange / text / custom | input |
| placeholder | 输入框占位符 | string | - | - |
| disabled | 输入框是否禁用 | boolean | - | false |
| size | 输入框尺寸 | string | medium / small / mini | small |
| btnLabel | 按钮文字 | string | - | - |
| func | 按钮/单选按钮触发事件 | Function | - | - |
| slotName | type 为 `custom` 时，slot名称 | String | - | - |

<br />

### Slot
| name | 说明 |
| ---- | ---- |
| slotName | 自定义 Form-Item 内容 |
| submit | 表单提交按钮内容 |

<br />

### Events
| 方法名 | 说明 | 参数 |
| ------ | ------- | ------- |
| func | config item 填写的事件名称 | - |
| get-form-model | 获取表单字段属性值 | - |
