<span></span

## Table 表格组件
> 待完善

<br />

### 基础用法
:::demo
```html
<base-table
    :table-data="data"
    :table-config="config"
/>

<script>
export default {
    data() {
        return {
            data: [
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                }
            ],
            config: {
                tableHead: [
                    {
                        label: '日期',
                        prop: 'date',
                    },
                    {
                        label: '姓名',
                        prop: 'name',
                    },
                    {
                        label: '地址',
                        prop: 'address',
                    },
                ],
                hasOperation: false,
                operation: {
                    data: []
                }
            }
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
| table-data | 显示的数据 | array | - | - |
| table-config | 属性配置 | Object | - | - |

<br />

### Events
| 方法名 | 说明 | 参数 |
| ------ | ------- | ------- |
| event | event | event |
