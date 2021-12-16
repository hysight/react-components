<!--
 * @Author: zhangb
 * @Date: 2019-06-17 09:25:53
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-04 15:09:32
 * @Description: 
 -->

# hysight-tree

## Examples

```
import Tree from '@hysight/tree';

const {TreeNode, TreeMore} = Tree;
const {MenuItem} = ContextMenu;
or
class App extends Component {
    constructor(props, context) {

        super(props, context);
        this.state = {
            treeNodeData: []
        };
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onSelect = this.onSelect.bind(this);

    }

    componentDidMount() {

        this.handleFetch();

    }

    handleFetch() {

        const url = 'http://192.168.1.207:4000/hysightdata/dataset/project/16ce8f13f6994abd9b3dc8fbde8caf7a/tree';

        fetchUrl(url).then((res) => {

            if(res.code === 0) {

                return;

            }

            this.setState({
                treeNodeData: res.result
            });

        });

    }

    onDragEnter(info) {

        console.log('onDragEnter---->', info);

    }

    onDrop(info) {

        console.log('onDrop---->', info);

        const {id: dropKey, pid: targetParentId, type: targetType} = info.node.props;
        const {id: dragKey, pid: sourceParentId, type: sourceType} = info.dragNode.props;
        // this.handleMoveFolder(dragKey, dropKey);
        // const dragNodesKeys = info.dragNodesKeys;
        const loop = (data, id, callback) => {

            data.forEach((item, index, arr) => {

                if(item.id === id) {

                    return callback(item, index, arr);

                }
                if(item.children) {

                    return loop(item.children, id, callback);

                }

            });

        };
        const data = [...this.state.treeNodeData];
        let dragObj;
        loop(data, dragKey, (item, index, arr) => {

            arr.splice(index, 1);
            // dragObj = item;
            dragObj = Object.assign(
                {},
                {...item},
                {pid: info.dragOverGapTop || info.dragOverGapBottom ? targetParentId : dropKey});

        });
        if(info.dragOverGapTop) {

            let ar;
            let i;
            loop(data, dropKey, (item, index, arr) => {

                ar = arr;
                i = index;

            });
            ar.splice(i, 0, dragObj);

        } else if(info.dragOverGapBottom) {

            let ar;
            let i;
            loop(data, dropKey, (item, index, arr) => {

                ar = arr;
                i = index + 1;

            });
            ar.splice(i, 0, dragObj);

        } else {

            loop(data, dropKey, (item) => {

                item.children = item.children || [];
                // where to insert 示例添加到尾部，可以是随意位置
                item.children.push(dragObj);

            });

        }
        this.setState({
            treeNodeData: data
        });

    }

    onSelect(selectedKeys, e) {

        console.log('都是非法链接', selectedKeys, e);

    }

    toRenderTreeNodes() {

        const loop = data => data.map((item) => {

            const {children, id, name, type, pid, dataSourceId} = item;
            if(item.children && item.children.length) {

                // <TreeMore onClick={() => console.log(111)} />
                return (
                    <TreeNode
                        key={id}
                        title={name}
                        draggable={true}
                        isLeaf={type !== 'dir'}
                        isMore={type === 'dir'}
                        moreComponent={
                            <ContextMenu
                                eventTrigger={['onClick']}
                                render={() => <TreeMore />}
                            >
                                <MenuItem onClick={() => console.log(1)} >测试1</MenuItem>
                                <MenuItem onClick={() => console.log(2)} >测试2</MenuItem>
                                <MenuItem onClick={() => console.log(3)} >测试3</MenuItem>
                            </ContextMenu>
                        }
                        isPrefixIcon={false}
                        prefixIconComponent={
                            <ContextMenu
                                eventTrigger={['onClick']}
                                render={() => {

                                    return <TreeMore />;

                                }}
                            >
                                <MenuItem onClick={(event) => console.log(4, event)} >测试1</MenuItem>
                                <MenuItem onClick={() => console.log(5)} >测试2</MenuItem>
                                <MenuItem onClick={() => console.log(6)} >测试3</MenuItem>
                            </ContextMenu>
                        }
                        // icon={type}
                        id={id}
                        pid={pid}
                    >
                        {loop(children)}
                    </TreeNode>
                );

            }
            return (
                <TreeNode
                    key={id}
                    title={name}
                    isLeaf={type !== 'dir'}
                    draggable={false}
                    isMore={type !== 'dir'}
                    moreComponent={
                        <ContextMenu
                            eventTrigger={['onClick']}
                            render={() => {

                                return <TreeMore />;

                            }}
                        >
                            <MenuItem onClick={(event) => console.log(4, event)} >测试1</MenuItem>
                            <MenuItem onClick={() => console.log(5)} >测试2</MenuItem>
                            <MenuItem onClick={() => console.log(6)} >测试3</MenuItem>
                        </ContextMenu>
                    }
                    isPrefixIcon={true}
                    prefixIconComponent={
                        <ContextMenu
                            eventTrigger={['onClick']}
                            render={() => {

                                return <TreeMore />;

                            }}
                        >
                            <MenuItem onClick={(event) => console.log(4, event)} >测试1</MenuItem>
                            <MenuItem onClick={() => console.log(5)} >测试2</MenuItem>
                            <MenuItem onClick={() => console.log(6)} >测试3</MenuItem>
                        </ContextMenu>
                    }
                    // icon={type}
                    id={id}
                    pid={pid}
                    dbId={dataSourceId}
                />
            );

        });
        return (
            <Tree
                className='draggable-tree'
                defaultExpandedKeys={this.state.expandedKeys}
                // draggable={true}
                disabledProviderEvents={true}
                onDrop={this.onDrop}
                onRightClick={() => console.log('onRightClick')}
                onExpand={() => console.log('onExpand')}
                // onSelect={this.onSelect}
                onDragStart={(info) => console.log('onDragStart', info)}
                onDragEnter={this.onDragEnter}
                onDragOver={() => console.log('onDragOver')}
                onDragLeave={() => console.log('onDragLeave')}
                onDragEnd={() => console.log('onDragEnd')}
                onMoreClick={() => console.log('onMoreClick')}
            >
                {loop(this.state.treeNodeData)}
            </Tree>
        );

    }
    render() {

        const {treeNodeData} = this.state;
        if(!treeNodeData.length) {

            return null;

        }
        return (
            <div>
                {this.toRenderTreeNodes()}
            </div>
        );

    }
}

export default App;
```

## Usage
```
    npm install @hysight/tree --save --registry=http://192.168.1.207:5000
    or
    yarn add @hysight/tree --registry=http://192.168.1.207:5000
    then
    import Tree from '@hysight/tree'
```

## Tree Props

Prop|Default|Type|Description
:----|:-----|:-----|:-----
className|无|string|根组件className
defaultExpandAll|false|bool|首次记载默认是否展开所有父节点
defaultExpandedKeys|[]|array<id>|首次加载默认展开的节点id
expandedKeys|[]|array|（受控）展开指定的树节点
autoExpandParent|false|bool|（受控）是否自动展开父节点
selectedKeys|[]|array<id>|（受控）设置选中的树节点
onExpand|func(expandedKeys, {expanded: bool, node})|func|展开/收起节点时触发
onSelect|func(selectedKeys, event)|func|点击树节点触发
onDoubleClick|func(selectedKeys, event, isLeaf)|func|双击点击树节点触发（onDoubleClick会触发onSelect事件，最好不要同时使用）
onRightClick|func({event, event})|func|响应右键点击
draggable|false|bool|设置节点可拖拽（IE>8）
onDragStart|func({event, node})|func|开始拖拽时调用
onDragEnter|func({event, node})|func|dragenter 触发时调用
onDragOver|func({event, node})|func|onDragOver 触发时调用
onDragLeave|func({event, node})|func|onDragLeave 触发时调用
onDragEnd|func({event, node})|func|onDragEnd 触发时调用
onDrop|func({event, node, dragNode, dragNodesKeys, dropPosition, ?dragOverGapTop, ?dragOverGapBottom})|func|onDrop 触发时调用
disabledProviderEvents|false|bool|默认不禁止Tree组件中提供onDrag*/onDrop*前缀事件，否则禁止
iconEye|false|bool/array:['icon-buyincang', 'icon-yincang']|是否节点前显示眼睛,默认不显示眼睛,传递数组(2)可自定义眼睛className
onEyeChange|func(selectedEyeKey, {selected, node})|func|切换眼睛状态回调函数


## TreeNode Props

Prop|Default|Type|Description
:----|:-----|:-----|:-----
className|无|string|TreeNode节点上className名称
title|'---'|string/ReactNode|标题
prompt|无|string|标题提示，不设置默认为 `title`
key|内部计算出的节点位置|string|被树的 (default)ExpandedKeys / (default)CheckedKeys / (default)SelectedKeys 属性所用。注意：整个树范围内的所有节点的 key 值不能重复！
isLeaf|false|bool|设置为叶子节点，假如强制设置true，则会把属于文件夹的TreeNode设置成不可展开的节点，并且图标默认是文件格式
isMore|false|bool|设置是否限制鼠标浮动时候显示图标[更多]，if true 配合moreComponent props一起使用
moreComponent|'---'|node/element(react)|if isMore true， 图标后缀组件内容
isPrefixIcon|false|bool|设置是否限制鼠标浮动时候显示其他图标组件（[展开/折叠]位置是否被替换），if true 配合prefixIconComponent props一起使用
prefixIconComponent|'-'|node/element(react)|if isPrefixIcon true， 图标前缀组件内容
draggable|false|bool|设置节点可拖拽（IE>8）(TreeNode节点会覆盖Tree draggable props)
iconLeaf|true|bool/string:className|控制节点上文件/子节点图标，传递false即不显示图标，也可传递string可自定义className
iconDir|true|bool/arr:['icon-wenjianjiaguanbi', 'icon-wenjianjiadakai']|控制展开/折叠图标，传递false即不显示图标，也可传递数组(2)可自定义className
***|***|***|其他props需要携带的参数均可在props中体现


## TreeMore Props

Prop|Default|Type|Description
:----|:-----|:-----|:-----
onClick|无|func|点击[更多]图标事件


# change logs

### 0.3.8
  + 发布到公网npm 2

### 0.3.7
  + 发布到公网npm

### 0.3.6
  + 扩展Tree组件内可传递多个null

### 0.3.5
  + 因扩展出问题，回退到0.3.3上，后续再扩展

### 0.3.4
  + 扩展defaultExpandAll/defaultExpandedKeys， 矫正autoExpandParent用法

### 0.3.3
  + 修复0.3.2中遗漏一处修改地方；

### 0.3.2
  + 增加children可传递单个object类型；

### 0.3.1
  + 修复0.3.0版本中tree强制为null导致报错问题；

### 0.3.0
  + 修复0.2.9版本异常

### 0.2.9
  + Tree 新增onDoubleClick事件

### 0.2.8
  + TreeNode 移除文字color蓝色

### 0.2.7
  + TreeNode 接收 null
  
### 0.2.6
  + TreeNode 增加className props

### 0.2.5
  + 更好的通过title去扩展修改节点信息交互

### 0.2.4
  + 优化

### 0.2.3
  + 同步icon图标

### 0.2.2
  + 增加props iconLeaf | iconDir | iconEye, 可实现图表部分隐藏/更换等操作

### 0.2.1
  + 增加节点eye与事件

### 0.2.0
  + 按照新版设计图重新构思

### 0.1.9
  + 扩展 `prompt` props

### 0.1.8
  + 修复bug

### 0.1.7
  + 追加展开/选中/全展开props

### 0.1.6
  + 修复prefixIconComponent类型不严格问题

### 0.1.5
  + 完善md
  
### 0.1.4
  + 增加TreeNode props(isPrefixIcon/prefixIconComponent)功能
  
### 0.1.3
  + 修复3个点位置

### 0.1.2
  + 根据iconfont被修正后重新设置className的版本

### 0.1.1
  + 修复新版UI props key未设置导致报错
  
### 0.1.0
  + 细节调整

### 0.0.9
  + 按照设计图新出的UI模式调整样式

### 0.0.8
  + 修复TreeNode上draggable的细节,完善md

### 0.0.7
  + 增强isLeaf api

### 0.0.6
  + 修复onSelect事件

### 0.0.5
  + 增强more/ContextMenu组件联动效果

### 0.0.4
  + 移除event target

### 0.0.3
  + 修复bug

### 0.0.2
  + 完善md等功能|性能优化|事件机制追加

### 0.0.1
  + 初始化项目
