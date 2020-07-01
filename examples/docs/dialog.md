<span></span>

## Dialog 弹出框

<br />

### 基础用法
:::demo
```html
<el-button type="primary" @click="visible = true">显示</el-button>

<jm-dialog
    :visible.sync="visible"
>
</jm-dialog>

<script>
export default {
    data() {
        return {
            visible: false
        };
    }
};
</script>
```
:::

<br />

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| custom-class | 自定义弹窗样式 | String | — | - |
| visible | 是否显示弹窗,支持sync | Boolean | — | false |
| title | 弹窗标题 | String | — | 请传入需要显示的标题 |
| top | Dialog CSS 中的 margin-top 值 | string | - | 15vh |
| width | 弹窗宽度 | string | - | 500px |
| content | 弹窗内容 | String | - | 请传入需要显示的内容 |
| show-close | 是否显示关闭按钮 | Boolean | - | true |
| destroy-on-close | 关闭弹窗是否清除dom元素 | Boolean | - | false |
| close-on-click-modal | 点击旁边是否关闭弹窗 | Boolean | - | false |

<br />

### Slot
| name | 说明 |
| ---- | ---- |
| body | Dialog 的内容 |
| footer | Dialog 按钮操作区的内容 |

<br />

### Events
| 方法名 | 说明 | 参数 |
| ------ | ------- | ------- |
| opened | Dialog 打开动画结束时的回调 |  |
| close | Dialog 关闭 |  |
| closed | Dialog 关闭动画结束时的回调 |  |
