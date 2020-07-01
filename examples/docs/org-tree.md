<span></span>

## OrgTree 组织树
用清晰的层级结构展示信息，可展开或折叠。


<br />

### 基本用法
:::demo

```html
<el-button size="mini" @click="showSearch = !showSearch">显示隐藏搜索框</el-button>
<el-button size="mini" @click="showLine = !showLine">显示隐藏伸缩线</el-button>
<el-button size="mini" @click="showCheckbox = !showCheckbox">显示隐藏复选框</el-button>

<div style="height: 300px">
<jm-org-tree
    :data="data"
    :show-line="showLine"
    :is-search="showSearch"
    :is-checkbox ="showCheckbox"
    :box-style="{padding: '5px 0'}"
    :props="{label: 'name'}"
    default-expand-all
/>
</div>

<script>
export default {
    data() {
        return {
            showLine: true,
            showSearch: false,
            showCheckbox: false,
            data: [
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
            ]
        };
    },
};
</script>
```
:::


<br />

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| box-style | 树盒子样式 | Object | — | {padding: '4px 16px'} |
| data | 树结构数据 | Array | — |  []  |
| is-checkbox | 是否多选 | Boolean | — | false |
| is-search | 是否显示筛选树节点功能 | Boolean | — | false |
| default-expanded-keys | 默认展开节点数组 | Array | — | [] |
| default-checked-keys | 默认选中节点数组 | Array | — | [] |
| default-expand-all | 是否默认展开所有节点 | boolean | — | false |
| expand-on-click-node | 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点 | boolean | — | false |
| render-content | 自定义节点的渲染函数 | Function(node, data, store) | — |  |
| node-key | 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的 | String | — |  |
| props | 配置选项，具体看下表 | object | — |  |

<br />

### Props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label | 指定节点标签为节点对象的某个属性值 | string, function(data, node) | — | - |
| children | 指定子树为节点对象的某个属性值 | string | — | - |
| disabled | 指定节点选择框是否禁用为节点对象的某个属性值 | boolean, function(data, node) | — | - |
| isLeaf | 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效 | boolean, function(data, node) | — | - |

<br />

### Events
| 方法名 | 说明 | 参数 |
| ------ | ------- | ------- |
| select-change | 节点点击事件 | 参数为一个对象， 分别为 `nodeObj` 节点所对应的对象、`node` 节点对应的 Node、`nodeComponent` 节点组件本身 |
| node-expand | 节点展开事件 | `nodeObj` 节点所对应的对象 |
| node-collapse | 节点收起事件 | `nodeObj` 节点所对应的对象 |
| check | 节点多选选择事件 | 参数为一个对象，分别为 `nodeObj` 传递给 data 属性的数组中该节点所对应的对象、`allCheck` 树目前的选中状态对象 包含 `checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys` 四个属性 |