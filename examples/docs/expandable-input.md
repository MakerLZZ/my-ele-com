<span></span

## ExpandableInput 可展开输入框


<br />

### 用法
:::demo
```html
<el-input value="sfsafs" ></el-input>

<jm-expandable-input
    multiple
    :value="defaultValue"
    :closable="false"
    placeholder="占位符"
    @remove-tag="handleRemoveTag"
>
    <jm-org-tree
        ref="orgTree"
        slot="dropdownContent"
        :data="treeData"
        :box-style="{padding: '5px 0'}"
        :props="{label: 'name'}"
        :default-checked-keys="defaultValue"
        :render-content="renderContent"
        check-on-click-node
        default-expand-all
        is-checkbox
        check-strictly
        @check="handleOrgTreeChange"
    />
</jm-expandable-input>

<script>
export default {
    data() {
        return {
            defaultValue1: [9,91,19,1921,192,1129],
            defaultValue: [1],
            treeData: [
                {
                    id: 1,
                    name: '一级 1',
                    children: [{
                        id: 2,
                        name: '二级 1-1',
                        children: [{
                            id: 9,
                            name: '三级'
                        }]
                    },{
                        id: 5,
                        name: '二级 1-2',
                        children: [{
                            id: 91,
                            name: '三级'
                        }]
                    },{
                        id: 6,
                        name: '二级 1-2',
                        children: [{
                            id: 19,
                            name: '三级'
                        },
                        {
                            id: 1921,
                            name: '三级'
                        },
                        {
                            id: 192,
                            name: '三级'
                        },
                        {
                            id: 1129,
                            name: '三级'
                        }]
                    },{
                        id: 7,
                        name: '二级 1-2',
                        children: [{
                            id: 92,
                            name: '三级'
                        }]
                    },{
                        id: 8,
                        name: '二级 1-2',
                        children: [{
                            id: 229,
                            name: '三级',
                            children: [{
                                id: 'xa',
                                name: 'asfsfs'
                            }]
                        }, {
                            id: '098',
                            name: 'owiew',
                            children: [{
                                id: 'xa1',
                                name: 'asfsfs'
                            }]
                        }, {
                            id: 'fasfsaf',
                            name: 'sfasfdsdf'
                        }]
                    }]
                },
                {
                    id: 3,
                    name: '一级 2',
                    children: [{
                        id: 4,
                        name: '二级 2-1',
                    }, {
                        id: 'x1',
                        name: 'xxxx'
                    }]
                }
            ],
        }
    },
    methods: {
        handleOrgTreeChange(val) {
            this.defaultValue = val.allCheck.checkedNodes.map(node => node.name);
            this.defaultKeys = val.allCheck.checkedKeys;
        },
        handleRemoveTag(tag) {
            if (tag.index === 0) return
            this.defaultValue = this.defaultValue.filter(item => item !== tag.tag)
            this.defaultKeys.splice(tag.index,1)
            this.$refs.orgTree.$refs.orgTree.setCheckedKeys(this.defaultKeys)
        },
        renderContent(h, {node, data}) {
            if (node.id === 1) {
                data.disabled = true
            }
            return h('span', {}, data.name)
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
| value | 输入框默认值 | String | - | - |
| multiple | 是否多选, 多选时，value传数组 | Boolean | - | false |
| closable | 多选时，tag是否显示关闭按钮 | Boolean | - | true |
| placeholder | 输入框占位符 | String | - | - |
| input-style | 输入框样式 | Object | - | { width: '100%' } |
| dropdown-menu-style | 下拉菜单样式 | Object | - | { width: '215px', height: '300px' } |

<br />

### Events
| 方法名 | 说明 | 参数 |
| ------ | ------- | ------- |
| get-dropdown-cond | 处理是否显示菜单 | isShow |
