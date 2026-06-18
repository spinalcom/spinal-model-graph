"use strict";
/*
 * Copyright 2026 SpinalCom - www.spinalcom.com
 *
 * This file is part of SpinalCore.
 *
 * Please read all of the following terms and conditions
 * of the Software license Agreement ("Agreement")
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
    function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
    function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpinalRelationPtrLst = void 0;
const spinal_core_connectorjs_1 = require("spinal-core-connectorjs");
const SpinalContext_1 = require("../Nodes/SpinalContext");
const SpinalNode_1 = require("../Nodes/SpinalNode");
const SpinalNodePointer_1 = require("../SpinalNodePointer");
const BaseSpinalRelation_1 = require("./BaseSpinalRelation");
const SpinalRelationFactory_1 = require("./SpinalRelationFactory");
/**
 * Relation where the children are in Ptr to a Lst.
 * @class SpinalRelationPtrLst
 * @extends {BaseSpinalRelation}
 * @property {Str} name
 * @property {Str} id
 * @property {SpinalNodePointer<SpinalNode<any>>} parent
 * @property {SpinalMap<Val>} contextIds
 * @property {SpinalRelationPtrLstNodePointer} children
 */
class SpinalRelationPtrLst extends BaseSpinalRelation_1.BaseSpinalRelation {
    /**
     * Constructor for the SpinalRelationPtrLst class.
     * @param {SpinalNode} [parent] Parent of the relation
     * @param {string} [name] Name of the relation
     * @throws {TypeError} If the parent is not a node
     * @throws {TypeError} If the name is not a string
     */
    constructor(parent, name) {
        super(parent, name);
        this._constructorName = 'SpinalRelationPtrLst';
        if (spinal_core_connectorjs_1.FileSystem._sig_server === false)
            return;
        this.add_attr({
            children: new SpinalNodePointer_1.SpinalNodePointer(new spinal_core_connectorjs_1.Lst()),
        });
        this.children.info.add_attr('ids', new spinal_core_connectorjs_1.Lst());
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
     * @return {*}  {AsyncGenerator<SpinalNode<any>, void, unknown>}
     * @memberof SpinalRelationPtrLst
     */
    getChildrenGen() {
        return __asyncGenerator(this, arguments, function* getChildrenGen_1() {
            const childrenLst = yield __await(this.children.load());
            for (let i = 0; i < childrenLst.length; i += 1) {
                yield yield __await(childrenLst[i]);
            }
        });
    }
    /**
     * Return all the children of the relation associated to a certain context.
     * @param {SpinalContext} context Context to use for the search
     * @returns {AsyncGenerator<SpinalNode<any>, void, unknown>} The children associated to the context
     * @throws {TypeError} If the context is not a SpinalContext
     * @memberof SpinalRelationPtrLst
     */
    getChildrenInContextGen(context) {
        return __asyncGenerator(this, arguments, function* getChildrenInContextGen_1() {
            const childrenLst = yield __await(this.children.load());
            if (!(context instanceof SpinalContext_1.SpinalContext)) {
                throw TypeError('context must be a SpinalContext');
            }
            for (let i = 0; i < childrenLst.length; i += 1) {
                const child = childrenLst[i];
                if (child.belongsToContext(context)) {
                    yield yield __await(child);
                }
            }
        });
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
     * @template T extends Model = Node Element Type
     * @param {(T|SpinalNode<T>)} node Node or model to add
     * @throws {TypeError} If the node is not a Model
     * @throws {Error} If the node is already a child of the relation
     * @returns {Promise<SpinalNode<T>>} Promise containing the node that was added
     * @memberof SpinalRelationPtrLst
     */
    addChild(node) {
        return __awaiter(this, void 0, void 0, function* () {
            let nodeCreate = node;
            if (!(node instanceof spinal_core_connectorjs_1.Model)) {
                throw new Error('Cannot add a child witch is not an instance of SpinalNode or Model.');
            }
            else if (!(node instanceof SpinalNode_1.SpinalNode)) {
                nodeCreate = new SpinalNode_1.SpinalNode(undefined, undefined, node);
            }
            const tmpNodeCreate = nodeCreate;
            if (this.getChildrenIds().indexOf(tmpNodeCreate.getId().get()) !== -1) {
                throw new Error('Cannot add a child twice to the same relation.');
            }
            yield this.children.load().then((children) => {
                this.children.info.ids.push(tmpNodeCreate.getId());
                tmpNodeCreate._addParent(this);
                children.push(tmpNodeCreate);
            });
            return tmpNodeCreate;
        });
    }
    /**
     * Removes a child from the relation.
     * @param {SpinalNode<any>} node Child to remove
     * @returns {Promise<void>} An empty promise
     * @throws {Error} If the given node is not a child
     * @memberof SpinalRelationPtrLst
     */
    removeChild(node) {
        return __awaiter(this, void 0, void 0, function* () {
            const childrenLst = yield this.children.load();
            if (!childrenLst.contains(node)) {
                throw Error('The node is not a child');
            }
            childrenLst.remove(node);
            this.children.info.ids.remove(node.getId());
            node._removeParent(this);
        });
    }
    /**
     * Removes children from the relation.
     * @override
     * @param {SpinalNode<any>[]} [nodes=[]] Childs to remove, if empty or missing all the children will be removed
     * @returns {Promise<void>} An empty promise
     * @throws {TypeError} If nodes is not an array or omitted
     * @throws {Error} If one of the nodes is not a child
     * @memberof SpinalRelationPtrLst
     */
    removeChildren() {
        return __awaiter(this, arguments, void 0, function* (nodes = []) {
            if (!Array.isArray(nodes)) {
                throw TypeError('node must be an array');
            }
            const childrenLst = yield this.children.load();
            if (nodes.length === 0) {
                for (let idx = 0; idx < childrenLst.length; idx++) {
                    childrenLst[idx]._removeParent(this);
                }
                childrenLst.clear();
                this.children.info.ids.clear();
                return;
            }
            for (const node of nodes) {
                // const index: number = childrenLst.indexOf(node);
                childrenLst.remove(node);
                this.children.info.ids.remove(node.getId());
                node._removeParent(this);
            }
        });
    }
}
exports.SpinalRelationPtrLst = SpinalRelationPtrLst;
SpinalRelationPtrLst._constructorName = 'SpinalRelationPtrLst';
spinal_core_connectorjs_1.spinalCore.register_models(SpinalRelationPtrLst, 'SpinalRelationPtrLst');
exports.default = SpinalRelationPtrLst;
//# sourceMappingURL=SpinalRelationPtrLst.js.map