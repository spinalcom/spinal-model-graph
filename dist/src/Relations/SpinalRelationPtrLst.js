"use strict";
/*
 * Copyright 2018 SpinalCom - www.spinalcom.com
 *
 * This file is part of SpinalCore.
 *
 * Please read all of the following terms and conditions
 * of the Free Software license Agreement ("Agreement")
 * carefully.
 *
 * This Agreement is a legally binding contract between
 * the Licensee (as defined below) and SpinalCom that
 * sets forth the terms and conditions that govern your
 * use of the Program. By installing and/or using the
 * Program, you agree to abide by all the terms and
 * conditions stated or referenced herein.
 *
 * If you do not agree to abide by these terms and
 * conditions, do not demonstrate your acceptance and do
 * not install or use the Program.
 * You should have received a copy of the license along
 * with this file. If not, see
 * <http://resources.spinalcom.com/licenses.pdf>.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const BaseSpinalRelation_1 = require("./BaseSpinalRelation");
const SpinalRelationFactory_1 = require("./SpinalRelationFactory");
const index_1 = require("../index");
const SpinalNodePointer_1 = require("../SpinalNodePointer");
/**
 * Relation where the children are in Ptr to a Lst.
 * @class SpinalRelationPtrLst
 * @extends {BaseSpinalRelation}
 * @property {spinal.Str} name
 * @property {spinal.Str} id
 * @property {SpinalNodePointer<SpinalNodeAny>} parent
 * @property {SpinalMap<spinal.Val>} contextIds
 * @property {SpinalRelationPtrLstNodePointer} children
 */
class SpinalRelationPtrLst extends BaseSpinalRelation_1.BaseSpinalRelation {
    /**
     * Constructor for the SpinalRelationPtrLst class.
     * @param {SpinalNode} parent Parent of the relation
     * @param {string} name Name of the relation
     * @throws {TypeError} If the parent is not a node
     * @throws {TypeError} If the name is not a string
     */
    constructor(parent, name) {
        super(parent, name);
        if (spinal_core_connectorjs_type_1.FileSystem._sig_server === false)
            return;
        this.add_attr({
            children: new SpinalNodePointer_1.SpinalNodePointer(new spinal_core_connectorjs_type_1.Lst()),
        });
        this.children.info.add_attr('ids', new spinal_core_connectorjs_type_1.Lst());
    }
    /**
     * Retrieves all the ids of the children of the relation and return them inside an array.
     * @returns {String[]} Array containing all the children ids of the relation
     * @memberof SpinalRelationPtrLst
     */
    getChildrenIds() {
        const idLst = this.children.info.ids;
        const ids = [];
        for (let i = 0; i < idLst.length; i += 1) {
            ids.push(idLst[i].get());
        }
        return ids;
    }
    /**
     * returns the number of children of the relation.
     * @returns {number}
     * @memberof SpinalRelationPtrLst
     */
    getNbChildren() {
        return this.children.info.ids.length;
    }
    /**
     * Return all the children of the relation.
     * @returns {Promise<SpinalNodeAny[]>} The children of the relation
     * @memberof SpinalRelationPtrLst
     */
    async getChildren() {
        const childrenLst = await this.children.load();
        const children = [];
        for (let i = 0; i < childrenLst.length; i += 1) {
            children.push(childrenLst[i]);
        }
        return children;
    }
    /**
     * Return all the children of the relation associated to a certain context.
     * @param {SpinalContext} context Context to use for the search
     * @returns {Promise<Array<SpinalNodeAny>>} The children associated to the context
     * @throws {TypeError} If the context is not a SpinalContext
     * @memberof SpinalRelationPtrLst
     */
    async getChildrenInContext(context) {
        const childrenLst = await this.children.load();
        const children = [];
        if (!(context instanceof index_1.SpinalContext)) {
            throw TypeError('context must be a SpinalContext');
        }
        for (let i = 0; i < childrenLst.length; i += 1) {
            const child = childrenLst[i];
            if (child.belongsToContext(context)) {
                children.push(child);
            }
        }
        return children;
    }
    /**
     * Returns the type of the relation.
     * @returns {string} Type of the relation
     * @memberof SpinalRelationPtrLst
     */
    getType() {
        return SpinalRelationFactory_1.SPINAL_RELATION_PTR_LST_TYPE;
    }
    /**
     * Adds a child to the relation.
     * @template T extends spinal.Model = Node Element Type
     * @param {(T|SpinalNode<T>)} node Node or model to add
     * @throws {TypeError} If the node is not a Model
     * @throws {Error} If the node is already a child of the relation
     * @returns {Promise<SpinalNode<T>>} Promise containing the node that was added
     * @memberof SpinalRelationPtrLst
     */
    async addChild(node) {
        let nodeCreate = node;
        if (!(node instanceof spinal_core_connectorjs_type_1.Model)) {
            throw new Error('Cannot add a child witch is not an instance of SpinalNode or Model.');
        }
        else if (!(node instanceof index_1.SpinalNode)) {
            nodeCreate = new index_1.SpinalNode(undefined, undefined, node);
        }
        const tmpNodeCreate = nodeCreate;
        if (this.getChildrenIds().indexOf(tmpNodeCreate.getId().get()) !== -1) {
            throw new Error('Cannot add a child twice to the same relation.');
        }
        this.children.info.ids.push(tmpNodeCreate.getId());
        tmpNodeCreate._addParent(this);
        await this.children.load().then((children) => {
            children.push(tmpNodeCreate);
        });
        return tmpNodeCreate;
    }
    /**
     * Removes a child from the relation.
     * @param {SpinalNodeAny} node Child to remove
     * @returns {Promise<void>} An empty promise
     * @throws {Error} If the given node is not a child
     * @memberof SpinalRelationPtrLst
     */
    async removeChild(node) {
        const childrenLst = await this.children.load();
        if (!childrenLst.contains(node)) {
            throw Error('The node is not a child');
        }
        childrenLst.remove(node);
        this.children.info.ids.remove(node.getId());
        node._removeParent(this);
    }
    /**
     * Removes children from the relation.
     * @override
     * @param {SpinalNodeAny[]} [nodes=[]] Childs to remove
     * @returns {Promise<void>} An empty promise
     * @throws {TypeError} If nodes is not an array or omitted
     * @throws {Error} If one of the nodes is not a child
     * @memberof SpinalRelationPtrLst
     */
    async removeChildren(nodes = []) {
        if (!Array.isArray(nodes)) {
            throw TypeError('node must be an array');
        }
        const childrenLst = await this.children.load();
        let error = false;
        if (nodes.length === 0) {
            childrenLst.clear();
            this.children.info.ids.clear();
            return;
        }
        for (const node of nodes) {
            const index = childrenLst.indexOf(node);
            if (index !== -1) {
                childrenLst.remove(node);
                this.children.info.ids.remove(node.getId());
                node._removeParent(this);
            }
            else {
                error = true;
            }
        }
        if (error) {
            throw Error('Could not remove all nodes');
        }
    }
}
exports.SpinalRelationPtrLst = SpinalRelationPtrLst;
spinal_core_connectorjs_type_1.spinalCore.register_models([SpinalRelationPtrLst]);
exports.default = SpinalRelationPtrLst;
//# sourceMappingURL=SpinalRelationPtrLst.js.map