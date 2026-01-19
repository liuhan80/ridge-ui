/* eslint-disable max-len */
import InterpreteRender from './interprete_render.js';

/**
 * 进行基于页面图纸标准规范的JSON解析，生成对应的页面元素节点实例，并渲染布局信息到指定的容器
 * @class
 */
class HTPageRender extends InterpreteRender {
    /**
     * @constructor
     * @param {object} pageConfig 页面图纸JSON
     * @param {object} queryVariableValues 打开页面的查询变量 （query）
     */
    constructor(pageConfig, queryVariableValues) {
        super();
        this.pageConfig = pageConfig;
        this.queryVariableValues = queryVariableValues || {};
        // 所有根级渲染的节点
        this.rootElements = [];
        // 所有节点
        this.flaternedElements = [];
        // 所有图片
        this.images = [];
        // 页面变量
        this.pageVariables = [];
        // 需要进行动态数据获取的页面节点 按id为key列表
        this.dynamicBindingDependencies = {};
        // 属性取值依赖变量的节点  按id为key列表
        this.variableEvaluatedNodes = {};
        // 属性的动态绑定信息
        this.nodePropertiesDynamicBindings = {};
        // 节点隐藏信息列表 按id为key
        this.nodesVisible = {};
        // 位置变动的节点列表， 以id为key 格式为{'guid': {x, y}}
        this.positionExpression = {};
        // 节点动态绑定的属性信息
        this.expressionBind = {};
        // 页面变量的实时值
        this.variableValues = null;
    }

    /**
     * 解析布局信息文件
     * @override
     */
    interprete() {
        if (!this.pageConfig) {
            return;
        }
        const { d, a } = this.pageConfig;

        if (a && a.params && Array.isArray(a.params)) {
            this.pageVariables = a.params;
        }
        let index = 1;

        if (d) {
            // 解析所有节点
            for (const node of d) {
                const element = this.interpretNode(node);

                element.zIndex = index;
                index++;
                this.flaternedElements.push(element);
            }
        }
        // 解析图元对变量的依赖情况
        this.interpretVariableDependency();

        // 解析出节点树， 这其中非根节点将由其父节点进行调度和渲染
        const rootElements = this.interpretElementTrees(this.flaternedElements);

        // 只为根节点创建div，并设置为绝对布局。
        for (const element of rootElements) {
            element.el = document.createElement('div');
            element.el.setAttribute('fcid', element.guid);
            element.el.style.zIndex = element.zIndex;
            Object.assign(element.el.style, this.getRootElementDivStyle(element));
            if (element.fillUpBody) {
                delete element.el.style.zIndex;
            }
        }
        this.rootElements = rootElements;
    }

    /**
     * 对单个节点配置进行解析
     * @param {object} node 基于ht标准的单个节点描述
     * @returns {Object} element 解析后节点定义
     */
    interpretNode(node) {
        const element = {
            i: node.i,
            parent: node.p.parent ? node.p.parent.__i : null,
            width: node.p.width,
            height: node.p.height
        };

        if (node.a) {
            Object.assign(element, {
                name: node.p?.name || node.a?.pel?.title,
                fcpName: node.a?.pel?.title,
                customName: node.p?.name || node.a?.pel?.title,
                guid: node.a.guid,
                slotTemplate: node.a.slotTemplate,
                isTemplate: node.a.template,
                syncWith: node.a.syncWith,
                nodeType: node.a.nodeType,
                flexIndex: node.a.zIndex,
                containerState: node.a.containerState, // 切换容器专用属性
                containerTypes: node.a.containerType,
                props: node.a.propsData || {}, // 节点配置的静态属性信息
                opacity: node.a.opacity, // 透明度
                visible: node.a.visible, // 可见属性
                // expression: node.a.expressionBind || {}, // 节点其他属性的解析处理
                in: node.a.in, // 交互属性
                db: node.a.db, // 数据绑定
                reactiveProps: {}, // 按变量联动的属性
                reactiveStyle: {}, // 变量联动样式
                reactiveBuildInProps: {},
                showLoading: node.a.showLoading, // 加载中状态
                showNoData: node.a.showNoData, // 空状态样式  默认true/自定义false
                emptyMessage: node.a.emptyMessage, // 空状态提示
                hideOnEmpty: node.a.hideOnEmpty, // 空状态隐藏 默认为否
                animation: node.a.animation // 动画
            });

            if (node.a.expressionBind) {
                if (node.a.expressionBind.a) {
                    element.reactiveProps = node.a.expressionBind.a;
                }
                if (node.a.expressionBind.s) {
                    element.reactiveStyle = node.a.expressionBind.s;
                }
                if (node.a.expressionBind.p) {
                    element.reactiveBuildInProps = node.a.expressionBind.p;
                }
            }
            if (node.a.pel) {
                element.packageName = node.a.pel.packageName; // 图元包
                element.version = node.a.pel.version; // 图元库版本
                element.path = node.a.pel.path; // 图元所在路径
            }

            if (node.a.template) {
                element.isTemplate = true;
            }
        }

        if (node.p.rotation) {
            element.rotation = node.p.rotation;
        }

        // 设置node的位置信息
        if (!node.p.position) {
            // 对无位置信息的默认处理
            element.x = 0;
            element.y = 0;
        } else if (node.p.anchor) {
            element.anchor = node.p.anchor;
            // 有锚点按锚点定位
            element.x = node.p.position.x - node.p.width * node.p.anchor.x;
            element.y = node.p.position.y - node.p.height * node.p.anchor.y;
        } else {
            // 无锚点按正中心定位
            element.x = node.p.position.x - node.p.width / 2;
            element.y = node.p.position.y - node.p.height / 2;
        }
        // 配置指定元素编辑态的大小 （原始大小）
        element.editRect = {
            x: element.x,
            y: element.y,
            width: element.width,
            height: element.height
        };
        if (node.a && node.a.propsData && node.a.propsData.fillUpBody === true) {
            element.x = 0;
            element.y = 0;
            element.width = '100%';
            element.height = '100%';
            element.fillUpBody = true;
        }
        if (node.c === 'ht.Block') {
            element.isRelativeBlockContainer = true;
        }

        return element;
    }

    /**
     * 获取根节点 （绝对布局）的基础样式
     * @param {object} element 解析处理后的节点数据
     * @returns {object} style - 节点css样式
     */
    getRootElementDivStyle(element) {
        const style = {};

        style.position = 'absolute';
        // style.zIndex = element.i;

        if (element.opacity != null) {
            style.opacity = element.opacity;
        }
        if (element.visible === false) {
            style.display = 'none';
        }

        // 模板的节点不显示加载中状态
        if (!element.isTemplate) {
            style.background = 'rgba(255,255,255, .2)';
        }
        style.position = 'absolute';

        style.left = element.x + 'px';
        style.top = element.y + 'px';

        if (typeof element.width === 'number') {
            style.width = element.width + 'px';
        } else {
            style.width = element.width;
        }

        if (typeof element.height === 'number') {
            style.height = element.height + 'px';
        } else {
            style.height = element.height;
        }

        // 对旋转的处理
        if (element.rotation) {
            style.transform = `rotate(${element.rotation * 180 / Math.PI}deg)`;
            if (element.anchor) {
                style.transformOrigin = `${element.width * element.anchor.x}px ${element.height * element.anchor.y}px`;
            }
        }
        return style;
    }

    getChildElementStyle(node) {
        const style = {};

        if (node.a.nodeType === 'flex-node') {
            if (node.a.propsData.flex !== '') {
                style.flex = node.a.propsData.flex;
            } else {
                style.width = node.p.width + 'px';
            }
        }
        return style;
    }

    /**
     * 获取页面变量的默认值 （这里考虑从query中来的变量）
     * @returns Object 页面变量默认值
     */
    getPageVariableDefaultValue() {
        const defaultValue = {};

        for (const variable of this.pageVariables) {
            if (this.queryVariableValues[variable.key]) {
                defaultValue[variable.key] = this.queryVariableValues[variable.key];
            } else {
                if (variable.type == null) {
                    try {
                        // 优先作为对象形式解析
                        defaultValue[variable.key] = JSON.parse(variable.defaultValue);
                    } catch (e) {
                        defaultValue[variable.key] = variable.defaultValue;
                    }
                } else {
                    defaultValue[variable.key] = variable.defaultValue;
                }
            }
        }
        return defaultValue;
    }

    /**
     * 获取页面变量的实时值
     * @returns {Object} 变量值对象组件
     */
    getPageVaraiblesValues() {
        if (!this.variableValues) {
            this.variableValues = this.getPageVariableDefaultValue();
        }
        return this.variableValues;
    }

    /**
     * 获取页面定义的变量
     * @returns 页面变量定义列表
     */
    getPageVariables() {
        return this.pageVariables;
    }

    getNodesVisible() {
        return this.nodesVisible;
    }

    /**
     * 获取位置属性联动的信息
     */
    getPositionExpressions() {
        return this.positionExpression;
    }

    getVariableEvaluatedNodesByName(variableName) {
        const nodes = [];

        for (const nodeKey of Object.keys(this.variableEvaluatedNodes)) {
            if (variableName) {
                if (Object.values(this.variableEvaluatedNodes[nodeKey]).indexOf(variableName) > -1) {
                    nodes.push(nodeKey);
                }
            } else {
                // 对variableName为空的情况,就是获取所有变量组件
                nodes.push(nodeKey);
            }
        }
        return nodes;
    }

    getVariableEvaluatedNodes() {
        return this.variableEvaluatedNodes;
    }

    /**
     * 获取页面变量关联到的node节点
     */
    getVariableRelatedNodes(variableName) {
        return this.dynamicBindingDependencies[variableName] || [];
    }

    /**
     * 解析所有节点生成页面节点树及模板节点
     * @param {Array} flaternedElements 所有节点列表
     */
    interpretElementTrees(flaternedElements) {
        const rootElements = [],
            blockElements = new Map(),
            templateElements = new Map();
            // templateElements = [];

        // 首先筛选出块级节点和模板节点
        for (const element of flaternedElements) {
            if (element.isRelativeBlockContainer) {
                blockElements.set(element.i, element);
            }
            if (element.isTemplate) {
                templateElements.set(element.guid, element);
            }
        }

        for (const element of flaternedElements) {
            // 配置了插槽后，查找对应插槽组件
            if (element.slotTemplate) {
                element.slotElements = {};
                for (const propName in element.slotTemplate) {
                    if (Array.isArray(element.slotTemplate[propName])) {
                        for (const elId of element.slotTemplate[propName]) {
                            const slotElementFound = templateElements.get(elId);

                            if (slotElementFound) {
                                element.slotElements[elId] = slotElementFound;
                            }
                        }
                    } else {
                        const slotElementFound = templateElements.get(element.slotTemplate[propName]);

                        if (slotElementFound) {
                            element.slotElements[element.slotTemplate[propName]] = slotElementFound;
                        }
                    }
                }
            }
            if (element.parent && !element.syncWith) { // 对于有父节点的情况，将其挂载到父节点的children信息中
                // 获取所属的根Block节点
                const parentBlockNode = this.getParentRoot(element, blockElements);

                if (parentBlockNode) {
                    // 存在定制化的父容器  Block节点只是一个布局容器
                    if (parentBlockNode.syncWith) {
                        // 找到真正的Container节点
                        const parentElement = flaternedElements.filter(el => el.guid === parentBlockNode.syncWith)[0];

                        if (parentElement) {
                            // 组件所属的分组 用于切换容器的特殊处理
                            if (parentBlockNode.containerState) {
                                element.containerState = parentBlockNode.containerState;
                            }
                            if (!parentElement.children) {
                                parentElement.children = [];
                            }
                            parentElement.children.push(element);
                        }
                    } else {
                        if (parentBlockNode.isRelativeBlockContainer && !element.isRelativeBlockContainer) {
                            // 元素也不是block类型节点
                            rootElements.push(element);
                        }
                        // if (parentBlockNode.children == null) {
                        //     parentBlockNode.children = [];
                        // }
                        // parentBlockNode.children.push(element);
                    }
                } else {
                    // 正常保存的图纸不应该有
                    if (!element.isRelativeBlockContainer) {
                        rootElements.push(element);
                    }
                }
            } else if (element.syncWith || element.isTemplate || element.isRelativeBlockContainer) {
                // 布局期间承担容器功能的节点， 运行时不需要
                // 模版类型节点，忽略
                // Block类型节点： 忽略
                // ignore node
            } else {
                rootElements.push(element);
            }
        }
        return rootElements;
    }

    getParentRoot(element, blockElements) {
        let parent = element;

        // 找到含有sync的父节点
        while (parent && !parent.syncWith) {
            parent = blockElements.get(parent.parent);
        }

        return parent;
    }

    /**
     * 解析图元的数据绑定部分对变量的依赖情况
     * 110版本的配置写法
     */
    interpretVariableDependency() {
        const dependencies = {},
            variableEvaluatedNodes = {},
            nodesVisible = {},
            nodePropertiesDynamicBindings = {},
            positionExpression = {};

        for (const node of this.flaternedElements) {
            // 解析在db.prop.dynamicBind.$data定义之下，所依赖到的页面变量列表
            const nodePageVars = this.getNodeDynamicBindsVariables(node.db),
                // 解析 db.prop.dynamicBind.$variable 的情况
                propWithExpressionValue = this.getNodePropertyExpression(node.db);

            // 旧的节点可见性处理
            if (node.visible) {
                nodesVisible[node.guid] = node.visible;
            }

            // 处理节点的组件属性、固有属性的动态绑定情况
            // 可见性绑定
            if (node.reactiveBuildInProps) {
                if (node.reactiveBuildInProps.visible) {
                    nodesVisible[node.guid] = node.reactiveBuildInProps.visible;
                }
                // 位置联动
                if (node.reactiveBuildInProps.x || node.reactiveBuildInProps.y) {
                    positionExpression[node.guid] = {
                        x: node.reactiveBuildInProps.x,
                        y: node.reactiveBuildInProps.y
                    };
                }
            }
            // 组件属性绑定
            if (node.reactiveProps && Object.keys(node.reactiveProps).length) {
                nodePropertiesDynamicBindings[node.guid] = node.reactiveProps;
            }

            if (Object.keys(propWithExpressionValue).length > 0) {
                variableEvaluatedNodes[node.guid] = propWithExpressionValue;
            }

            // 将页面变量数组反向组织为  var: [node1.guid, node2.guid] 的格式
            for (const variableName of nodePageVars) {
                if (!dependencies[variableName]) {
                    dependencies[variableName] = [node.guid];
                } else {
                    dependencies[variableName].push(node.guid);
                }
            }
        }
        this.dynamicBindingDependencies = dependencies;
        this.variableEvaluatedNodes = variableEvaluatedNodes;
        this.nodePropertiesDynamicBindings = nodePropertiesDynamicBindings;
        this.nodesVisible = nodesVisible;
        this.positionExpression = positionExpression;
    }

    /**
     * 获取节点属性值中含有变量的情况
     * @param {object} db - 数据绑定配置信息
     */
    getNodePropertyExpression(db) {
        const propWithExpressionValue = {};

        if (db) {
            for (const key of Object.keys(db)) {
                if (db[key].dynamicBind && db[key].dynamicBind.$variable) {
                    propWithExpressionValue[key] = db[key].dynamicBind.$variable;
                }
            }
        }
        return propWithExpressionValue;
    }

    /**
     * 获取节点绑定的变量信息
     * @param {object} db - 数据绑定配置信息
     */
    getNodeDynamicBindsVariables(db) {
        let variables = [];

        if (db) {
            for (const prop of Object.values(db)) {
                if (prop.dynamicBind && prop.dynamicBind.$data) {
                    if (prop.dynamicBind.$data.bind) {
                        // 处理不可枚举的情况
                        variables = variables.concat(this.getBindVariablesRecursively(prop.dynamicBind.$data.bind));
                    } else if (Array.isArray(prop.dynamicBind.$data)) {
                        // 处理数组的情况
                        for (const item of prop.dynamicBind.$data) {
                            variables = variables.concat(this.getBindVariablesRecursively(item.bind));
                        }
                    } else {
                        // 处理枚举的情况
                        for (const enumKey in prop.dynamicBind.$data) {
                            if (prop.dynamicBind.$data[enumKey].bind) {
                                variables = variables.concat(this.getBindVariablesRecursively(prop.dynamicBind.$data[enumKey].bind));
                            }
                        }
                    }
                }
                // if (prop.bind) {
                //     variables = variables.concat(this.getBindVariablesRecursively(prop.bind));
                // }
            }
        }
        // 去重
        return Array.from(
            new Set(variables.filter(v => v.startsWith('@')).map(v => v.substring(1)))
        );
    }

    /**
     * 处理bind为数组的情况
     * @param {} bind
     */
    getBindVariablesRecursively(bind) {
        if (typeof bind === 'string') {
            return Object.values(this.analysisBdmParams(bind));
        } else if (Array.isArray(bind)) {
            let result = [];

            for (const item of bind) {
                if (item.bind) {
                    result = result.concat(this.getBindVariablesRecursively(item.bind));
                }
            }
            return result;
        }
    }

    /**
     * 从bind表达式中提取变量
     * @param _str
     * @returns {{}}
     */
    analysisBdmParams(_str) {
        const re = /<.*\]/,
            paramsMap = {},
            r = _str.match(re);

        if (r && r[0]) {
            let t = r[0].substring(1, r[0].length - 2);

            t = t.split(',');
            for (let i = 0, l = t.length; i < l; i++) {
                const p = t[i].split('=');

                if (p && p[0]) {
                    if (p[1] || p[1] === 0) {
                        paramsMap[p[0]] = p[1];
                    } else {
                        paramsMap[p[0]] = '';
                    }
                }
            }
        }
        return paramsMap;
    }

    /**
     * 获取页面变量列表
     * @returns {*}
     */
    getPageVaraibles() {
        return this.pageVariables;
    }

    /**
     * 获取所有节点
     * @override
     */
    getAllElements() {
        return this.rootElements;
    }

    /**
     * 将图纸的所有根节点挂载到指定DOM元素上
     * @param {Element} div 加载到的元素
     */
    mount(div) {
        div.style.position = 'relative';

        if (this.pageConfig.a.layout === 'wh_fit') {
            div.style.width = '100%';
            div.style.height = '100%';
            div.style.overflow = 'hidden';
        } else if (this.pageConfig.a.layout === 'w_fit') {
            div.style.width = '100%';
        } else {
            div.style.width = this.pageConfig.contentRect.width + 'px';
            div.style.height = this.pageConfig.contentRect.height + 'px';
            div.style.overflow = 'hidden';
        }

        // 设置显示图纸的背景
        if (this.pageConfig.p && this.pageConfig.p.background) {
            div.style.background = this.pageConfig.p.background;
        }
        // 增加对背景图片的展示功能
        if (this.pageConfig.a && this.pageConfig.a.bgImage) {
            div.style.backgroundImage = `url('${this.pageConfig.a.bgImage}')`;
            div.style.backgroundSize = '100% 100%';
        }
        // for (const element of this.rootElements) {
        //     div.appendChild(element.el);
        // }

        // for (const img of this.images) {
        //     div.appendChild(img);
        // }
        // 设置根节点到$el
        // this.$el = div;
    }
}

export default HTPageRender;
