/* eslint-disable max-len */
import debug from 'debug';
const log = debug('runtime:ht-page-parser');

/**
 * 解析HT布局，生成对应的页面元素节点实例
 */
export default class HTPageParser {
    // 加载页面配置及对应的FC资源
    constructor(pageConfig, queryVariableValues) {
        this.type = 'ht';
        // ht 图纸JSON数据
        this.pageConfig = pageConfig;
        this.queryVariableValues = queryVariableValues || {};
        // 所有根级渲染的节点
        this.rootElements = [];
        // 所有节点
        this.flaternedElements = [];

        // 模板类型节点
        this.templateElements = {};

        // ht.Block类型节点
        this.htBlockNodeMap = new Map();

        // 页面变量定义
        this.pageVariables = [];
        // 页面变量的实时值
        this.variableValues = null;

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
            // 解析所有ht.Block类型节点
            for (const node of d.filter(n => n.c === 'ht.Block')) {
                // 对ht.block类型节点不进行解析处理
                this.htBlockNodeMap.set(node.i, node);
            }
            // 解析非Block节点
            for (const node of d.filter(n => n.c !== 'ht.Block')) {
                // 通常的配置节点
                const fcOptions = this.parseNodeConfig(node);

                log('解析到配置节点', fcOptions);
                fcOptions.position.zIndex = index;
                index++;
                this.flaternedElements.push(fcOptions);
            }
        }
        // 解析图元数据绑定对变量的依赖情况
        // this.interpretVariableDependency();

        // 解析出节点树， 这其中非根节点将由其父节点进行调度和渲染
        this.rootElements = this.buildPageNodeTree(this.flaternedElements);
        log('解析完成， 页面配置节点树', this.rootElements);
    }

    /**
     * 300版本解析节点的保存方式 New！
     * @param {ht.Node} node 单独的节点配置
     * @param {Array} allNodes 页面内所有节点
     * @returns
     */
    parseNodeConfig(node) {
        const fcOptions = {
            position: {
                type: 'absolute',
                width: node.p.width,
                height: node.p.height,
                opacity: node.a.opacity,
                visible: node.a.visible
            },
            fcInstanceConfig: {},
            interactions: [],
            component: node.a.pel,
            fcId: node.a.guid,
            relations: {}
        };

        // 旋转
        if (node.p.rotation) {
            fcOptions.position.rotation = node.p.rotation;
        }

        // 设置node的位置信息
        if (!node.p.position) {
            // 对无位置信息的默认处理
            fcOptions.position.x = 0;
            fcOptions.position.y = 0;
        } else if (node.p.anchor) {
            fcOptions.position.anchor = node.p.anchor;
            // 有锚点按锚点定位
            fcOptions.position.x = node.p.position.x - node.p.width * node.p.anchor.x;
            fcOptions.position.y = node.p.position.y - node.p.height * node.p.anchor.y;
        } else {
            // 无锚点按正中心定位
            fcOptions.position.x = node.p.position.x - node.p.width / 2;
            fcOptions.position.y = node.p.position.y - node.p.height / 2;
        }
        if (node.a && node.a.propsData && node.a.propsData.fillUpBody === true) {
            fcOptions.position.fillUp = true;
        }

        // 按变量进行动态绑定的配置
        if (node.a.expressionBind) {
            if (node.a.expressionBind.a) {
                for (const key of Object.keys(node.a.expressionBind.a)) {
                    if (!fcOptions.fcInstanceConfig[key]) {
                        fcOptions.fcInstanceConfig[key] = {};
                    }
                    fcOptions.fcInstanceConfig[key].expression = node.a.expressionBind.a[key];
                }
            }
            if (node.a.expressionBind.s) {
                // TODO
            }
            if (node.a.expressionBind.p) {
                if (node.a.expressionBind.p.visible) {
                    fcOptions.visible = node.a.expressionBind.p.visible;
                }
                // TODO
                // element.reactiveBuildInProps = node.a.expressionBind.p;
            }
        }

        // 配置的直接数据
        if (node.a.propsData) {
            for (const key of Object.keys(node.a.propsData)) {
                if (!fcOptions.fcInstanceConfig[key]) {
                    fcOptions.fcInstanceConfig[key] = {};
                }
                fcOptions.fcInstanceConfig[key].value = node.a.propsData[key];
            }
        }

        // 属性是模板方法
        if (node.a.slotTemplate) {
            for (const key of Object.keys(node.a.slotTemplate)) {
                if (!fcOptions.fcInstanceConfig[key]) {
                    fcOptions.fcInstanceConfig[key] = {};
                }
                fcOptions.fcInstanceConfig[key].templateFcId = node.a.slotTemplate[key];
            }
        }

        // 定义了交互事件
        if (node.a.in) {
            fcOptions.interactions = node.a.in;
        }

        // 组件定义信息
        if (node.a.pel) {
            fcOptions.component = node.a.pel;
        }

        // 最后处理节点之间的布局、引用关系
        if (node.a.template) { // 节点也作为模板使用
            fcOptions.relations.asTemplate = true;
        }

        if (node.p.parent) { // 在ht中作为block子节点
            fcOptions.relations.htParent = node.p.parent.__i;
        }

        return fcOptions;
    }

    getRootHtBlock(parentId) {
        const parentNode = this.htBlockNodeMap.get(parentId);

        if (!parentNode) {
            return null;
        }
        if (parentNode.parent) {
            return this.getRootHtBlock(parentNode.parent.__i);
        } else {
            return parentNode;
        }
    }

    /**
     * 300版本对节点树进行构建 New！
     * @param {*} flaternedElements
     */
    buildPageNodeTree(flaternedElements) {
        const roots = [];

        for (const fcOptions of flaternedElements) {
            if (fcOptions.relations.htParent) {
                // 节点在ht布局中作为子节点存在的
                const parentBlockNode = this.getRootHtBlock(fcOptions.relations.htParent);

                if (parentBlockNode) {
                    if (parentBlockNode.a.syncWith) { // 存在定制化的父容器  Block节点只是一个布局容器
                        // 找到真正的Container节点
                        const parentContainer = flaternedElements.filter(el => el.fcId === parentBlockNode.a.syncWith)[0];

                        if (parentContainer) {
                            // 210 Tab容器的情况
                            if (parentBlockNode.a.containerState) {
                                fcOptions.containerState = parentBlockNode.a.containerState;
                            }

                            if (!parentContainer.fcInstanceConfig.children) {
                                parentContainer.fcInstanceConfig.children = {
                                    value: []
                                };
                            }
                            parentContainer.fcInstanceConfig.children.value.push(fcOptions);
                        }
                    } else {
                        // 父ht.Block节点无其他标志信息，不做相关处理 认为是个根级别节点
                        roots.push(fcOptions);
                    }
                } else {
                    console.error('节点定义的父节点不存在');
                }
            } else {
                // 根节点不需要
                roots.push(fcOptions);
            }
        }
        return roots;
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
                try {
                    // 优先作为对象形式解析
                    defaultValue[variable.key] = JSON.parse(variable.defaultValue);
                } catch (e) {
                    defaultValue[variable.key] = variable.defaultValue;
                }
            }
        }
        return defaultValue;
    }

    /**
     * 获取页面变量的实时值
     * @returns
     */
    getPageVaraiblesValues() {
        if (!this.variableValues) {
            this.variableValues = this.getPageVariableDefaultValue();
        }
        return this.variableValues;
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
     * 获取节点属性值中含有变量的情况
     * @param db
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
    getRootElements() {
        return this.rootElements;
    }

    getPageConfig() {
        return this.pageConfig;
    }
}
