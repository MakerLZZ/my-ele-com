<span></span>

## BatchSearch 批量搜索

<br />

### 基础用法
:::demo
```html
<jm-batch-increase @increase="increase"/>

<script>
export default {
    methods: {
        increase(arr) {
            console.log(arr);
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
| increaseText | 添加文本 | String | — | 添加设备 |
| cancelText | 取消文本 | String | — | 取消添加 |
| placeholder | 输入框占位符 | String | — | 添加设备IMEI号，多个回车换行 |
| countText | 计数提示文本 | string | - | IMEI计数 |

<br />

### Events
| 方法名 | 说明 | 参数 |
| ------ | ------- | ------- |
| increase | 确定添加 | (value: array &#124; string) |
