<span></span>

## BatchSearch 批量搜索

<br />

### 基础用法
:::demo
```html
<jm-batch-search
    :custom-style="{
        'width': '200px'
    }"
    @change="handleBatchSearch"
/>

<script>
export default {
    methods: {
        handleBatchSearch(value) {
            console.log(value);
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
| value | 绑定值 | String | — | - |
| placeholder | 输入框占位文本 | String | — | - |
| custom-style | 搜索框自定义行内样式 | Object | — | {width: '155px'} |
| size | 输入框尺寸 | string | medium / small / mini | small |

<br />

### Events
| 方法名 | 说明 | 参数 |
| ------ | ------- | ------- |
| change | 输入框发生变化时触发 | (value: string &#124; number) |
