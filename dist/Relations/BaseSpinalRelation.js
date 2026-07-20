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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSpinalRelation = void 0;
const spinal_core_connectorjs_1 = require("spinal-core-connectorjs");
const SpinalContext_1 = require("../Nodes/SpinalContext");
const SpinalNode_1 = require("../Nodes/SpinalNode");
const SpinalMap_1 = require("../SpinalMap");
const SpinalNodePointer_1 = require("../SpinalNodePointer");
const Utilities_1 = require("../Utilities");
/**
 * Base for all relation in a SpinalGraph.
 * @abstract
 * @class BaseSpinalRelation
 * @abstract
 * @property {Str} name
 * @property {Str} id
 * @property {SpinalNodePointer<SpinalNode>} parent
 * @property {SpinalMap<Val>} contextIds
 * @extends {Model}
 */
class BaseSpinalRelation extends spinal_core_connectorjs_1.Model {
    /**
     * Constructor for the BaseSpinalRelation class.
     * @param {SpinalNode<Model>} parent Parent of the relation
     * @param {string} name Name of the relation
     * @throws {TypeError} If the parent is not a node
     * @throws {TypeError} If the name is not a string
     */
    constructor(parent, name) {
        super();
        if (spinal_core_connectorjs_1.FileSystem._sig_server === false)
            return;
        // instanceof doesn't work here
        if (!SpinalNode_1.SpinalNode.prototype.isPrototypeOf(parent)) {
            throw new TypeError('parent must be a node');
        }
        if (typeof name !== 'string') {
            throw new TypeError('name must be a string');
        }
        this.add_attr({
            name,
            id: (0, Utilities_1.guid)(),
            parent: new SpinalNodePointer_1.SpinalNodePointer(parent, true),
            contextIds: new SpinalMap_1.SpinalMap(),
        });
    }
    /**
     * Shortcut to id.
     * @returns {Str} Id of the relation
     */
    getId() {
        return this.id;
    }
    /**
     * Returns the name of the relation.
     * @returns {Str} Name of the relation
     */
    getName() {
        return this.name;
    }
    // /**
    //  * @returns {Promise<SpinalNode<Model>>} Returns a promise where the resolve is the parent
    //  */
    /**
     * Returns the parent of the relation.
     * @template T
     * @return {*}  {Promise<SpinalNode<T>>} Returns a promise where the resolve is the parent
     */
    getParent() {
        return this.parent.load();
    }
    /**
     * Adds an id to the context ids of the relation.
     * @param {string} id Id of the context
     * @throws {TypeError} If the id is not a string
     */
    addContextId(id) {
        if (typeof id !== 'string') {
            throw new TypeError('id must be a string');
        }
        if (!this.contextIds.has(id)) {
            this.contextIds.setElement(id, new spinal_core_connectorjs_1.Val(0));
        }
    }
    /**
     * Returns a list of the contexts the relation is associated to.
     * @returns {Array<string>} A list of ids of the associated contexts
     */
    getContextIds() {
        return this.contextIds.keys();
    }
    /**
     * Returns true if the relation belongs to the context.
     * @param {SpinalContext<T>} context The context that might own the node
     * @returns {boolean} A boolean
     * @throws {TypeError} If the context is not a SpinalContext
     */
    belongsToContext(context) {
        if (!(context instanceof SpinalContext_1.SpinalContext)) {
            throw new TypeError('context must be a SpinalContext');
        }
        return this.contextIds.has(context.getId().get());
    }
    /**
     * Remove an id to the context ids of the relation.
     * @param {string} id Id of the context
     * @throws {TypeError} If the id is not a string
     */
    removeContextId(id) {
        if (typeof id !== 'string') {
            throw new TypeError('id must be a string');
        }
        if (this.contextIds.has(id)) {
            this.contextIds.delete(id);
        }
    }
    /**
     * Removes children from the relation.
     * @param {Array<SpinalNode<Model>>} [nodesToDelete=[]] Childs to remove
     * @returns {Promise<void>} An empty promise
     * @throws {TypeError} If nodes is not an array or omitted
     * @throws {Error} If one of the nodes is not a child
     */
    removeChildren() {
        return __awaiter(this, arguments, void 0, function* (nodesToDelete = []) {
            let nodes = nodesToDelete;
            const promises = [];
            if (!Array.isArray(nodes)) {
                throw new TypeError('node must be an array');
            }
            if (nodes.length === 0) {
                nodes = yield this.getChildren(0, false);
            }
            for (const node of nodes) {
                promises.push(this.removeChild(node));
            }
            const res = yield Promise.allSettled(promises);
            const rejected = res.filter((r) => r.status === 'rejected');
            if (rejected.length > 0) {
                throw Error('Could not remove all nodes');
            }
        });
    }
    /**
     * Return all the children of the relation.
     * @return {*}  {Promise<SpinalNode<any>[]>} The children of the relation
     */
    getChildren(offset_1, reverse_1, context_1) {
        return __awaiter(this, arguments, void 0, function* (offset, reverse, context, counter = 0) {
            var _a, e_1, _b, _c;
            const results = [];
            const gen = this.getChildrenGen(offset, reverse, context, counter);
            try {
                for (var _d = true, gen_1 = __asyncValues(gen), gen_1_1; gen_1_1 = yield gen_1.next(), _a = gen_1_1.done, !_a; _d = true) {
                    _c = gen_1_1.value;
                    _d = false;
                    let node = _c;
                    results.push(node);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = gen_1.return)) yield _b.call(gen_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return results;
        });
    }
    /**
     * Removes the relation from the graph.
     * @returns {Promise<void>} An empty promise
     */
    removeFromGraph() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all([this._removeFromParent(), this.removeChildren()]);
        });
    }
    /**
     * Removes the relation from the parent.
     * @returns {Promise<void>} An empty promise
     * @private
     */
    _removeFromParent() {
        return __awaiter(this, void 0, void 0, function* () {
            const parent = yield this.getParent();
            const relationMap = parent._getChildrenType(this.getType());
            relationMap.delete(this.getName().get());
            this.parent.unset();
        });
    }
}
exports.BaseSpinalRelation = BaseSpinalRelation;
exports.default = BaseSpinalRelation;
//# sourceMappingURL=BaseSpinalRelation.js.map