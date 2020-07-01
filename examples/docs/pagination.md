## Pagination 分页

常用的分页组件。

<br />

### 基础用法

页数较少时。

:::demo
```html
<jm-pagination :total="50" :page-size="20"></jm-pagination>
```
:::

mini模式。

:::demo

```html
<jm-pagination mini :total="10" :page-size="5"></jm-pagination>
```
:::

<br />


### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| total | 总数量 | number | — | 0 |
| page-size | 每页数量 | number | — |  20  |
| page-sizes | 每页显示个数选择器的选项设置 | number[]	 | — |  [20, 50, 100]  |
| current-page | 当前页 | number[]	 | — | 1 |
| pager-count | 页码按钮的数量，当总页数超过该值时会折叠 | number | 大于等于 5 且小于等于 21 的奇数 | 7 |
| layout | 组件布局，子组件名用逗号分隔 | String | sizes, prev, pager, next, jumper, ->, total, slot | prev, pager, next, sizes |
| mini | 是否使用mini分页 | Boolean | - | false |

<br />

### Events
| 方法名 | 说明 | 参数 |
| ------ | ------- | ------- |
| current-change | currentPage 改变时会触发 | 当前页 |
| size-change | pageSize 改变时会触发 | 每页条数 |
