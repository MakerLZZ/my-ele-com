## Search 搜索框组件


<br />

### 基础用法
:::demo
```html
<jm-search />
```
:::

<br />

### 搜索
:::demo
```html
<jm-search :isAccurate="true" empty-search  @search="handleSearch" />
```
:::

<br />

### 带 icon 的输入框
:::demo
```html
<jm-search
    :isAccurate="true"
    prefix-icon="el-icon-search"
/>

<script>
export default {
    methods: {
        handleSearch(value) {
            console.log('input ', value)
        }
    }
}
</script>
```
:::


<br />


### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value | 绑定值 | string | — | - |
| placeholder | 输入框占位文本 | string	 | — |  请输入内容  |
| custom-style | 自定义行内样式 | Object | — | - |
| prefix-icon | 输入框头部图标 | string	 | — | - |
| size | 输入框尺寸 | string | medium / small / mini | small |
| clearable | 是否显示可清空按钮 | boolean | — | false |
| is-accurate | 是否显示输入框尾部按钮 | boolean | — | false |
| is-loading | 搜索时是否显示loading | boolean | — | false |
| empty-search | 没有搜索关键字时是否可搜索 | boolean | — | false |

<br />

### Events
| 方法名 | 说明 | 参数 |
| ------ | ------- | ------- |
| change | 输入框发生变化时触发 |  (value: string &#124; number)  |
| search | 输入框尾部按钮点击时触发 |  (value: string &#124; number)  |
| clear | 可清空按钮点击时触发 | - |
