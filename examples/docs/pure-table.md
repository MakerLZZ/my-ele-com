<span></span>

##


<br />

### 基础用法
:::demo
```html
<el-button @click="selection = !selection">显示隐藏选择框</el-button>
<el-button @click="index = !index">显示隐藏索引</el-button>
<el-button @click="visible = true">自定义列</el-button>

<jm-pure-table
    ref="pureTable"
    :data="tableData"
    :columns="tableColumns"
    :total="total"
    :selection="selection"
    :index="index"
    height="400"
    empty-text="123123"
    @cell-click="cellClick"
>
</jm-pure-table>

<jm-dialog :visible.sync="visible" title="自定义列数据" >
    <div slot="body">
        <el-checkbox-group v-model="checkList">
            <el-checkbox
                v-for="item in columns"
                :key="item.prop"
                :label="item.prop || 'default'"
            >
            {{item.label}}
            </el-checkbox>
        </el-checkbox-group>
    </div>

    <span slot="footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="handleCustomTableColumns">确定</el-button>
    </span>
</jm-dialog>

<script>
export default {
    data() {
        return {
            visible: false,
            selection: false,
            index: true,
            checkList: ['name', 'email', 'createTime', 'action'],
            tableData2: [],
            columns: [
                { label: '成员名称', prop: 'name', tooltip: true },
                { label: '邮箱', prop: 'email', tooltip: true },
                { label: '创建时间', prop: 'createTime', tooltip: true,
                    formatter: (row, col, cell) => {
                        return cell + '|'
                    }
                },
                { label: '备注', prop: 'remark', tooltip: true },
                {
                    label: '操作',
                    prop: 'action',
                    fixed: 'right',
                    render: (h) => {
                        return h('action', {});
                    },
                    header: (h, column) => {
                        return h('span', {}, [
                            `${column.label} `,
                            h('i', {
                                'class': 'el-icon-s-tools',
                                style: {
                                    cursor: 'pointer'
                                },
                                on: {
                                    click: () => this.visible = true
                                }
                            })
                        ])
                    }
                },
            ],
            tableData: [
                { name: '张三', email: 'test@jimimax.com', createTime: +new Date(), remark: '-' },
                { name: '李四', email: 'test@jimimax.com', createTime: +new Date(), remark: '-' },
                { name: '王五', email: 'test@jimimax.com', createTime: +new Date(), remark: '-' },
                { name: '王五', email: 'test@jimimax.com', createTime: +new Date(), remark: '-' },
                { name: '王五', email: 'test@jimimax.com', createTime: +new Date(), remark: '-' },
                { name: '王五', email: 'test@jimimax.com', createTime: +new Date(), remark: '-' },
                { name: '王五', email: 'test@jimimax.com', createTime: +new Date(), remark: '-' },
                { name: '王五', email: 'test@jimimax.com', createTime: +new Date(), remark: '-' },
                { name: '王五', email: 'test@jimimax.com', createTime: +new Date(), remark: '-' },
                { name: '王五', email: 'test@jimimax.com', createTime: +new Date(), remark: '-' },
                { name: '王五', email: 'test@jimimax.com', createTime: +new Date(), remark: '-' },
                { name: '王五', email: 'test@jimimax.com', createTime: +new Date(), remark: '-' },
            ],
            tableColumns: [],
            total: 90
        }
    },
    created() {
        this.handleCustomTableColumns()
    },
    methods: {
        handleCustomTableColumns() {
            this.tableColumns = this.columns.filter(item => this.checkList.includes(item.prop))
            this.visible = false
        },
        cellClick(row, column, cell, event) {
            console.log("cellClick -> cell", cell)
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
| columns | 表头数据 | Array | - | - |
| data | 表格数据 | Array | - | - |
| xborder | 外边框 | Boolean | - | false |
| selection | 可勾选 | Boolean | - | false |
| index | 索引 | Boolean | - | false |
| total | 总条数 (`0` 不显示分页) | Number | - | 0 |
| sizes | 页容量 | Array | - | [10, 20, 50] |
| current | 当前页 | Number | - | 1 |
| page-size | 当前页容量 | Number | - | 10 |
| height | 表格高度 | String | - | - |
| highlight-current-row | 是否高亮当前行 | Boolean | - | false |
| row-key | 行数据的 Key | String | - | - |
| indent | 缩进 | Number | - | 0 |

> 其他属性参考`element-ui table组件`

<br />

### Events
| 方法名 | 说明 | 参数 |
| ------ | ------- | ------- |
| page-change | currentPage 改变时会触发 | 当前页 |
| size-change | pageSize 改变时会触发 | 每页条数 |
| select | 当用户手动勾选数据行的 Checkbox 时触发的事件 | selection, row |
| current-change | 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性 | currentRow |

> 其他事件参考`element-ui table组件`
