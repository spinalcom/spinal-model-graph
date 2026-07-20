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
exports.SpinalRelationLstPtrLst = void 0;
const spinal_core_connectorjs_1 = require("spinal-core-connectorjs");
const SpinalNode_1 = require("../Nodes/SpinalNode");
const SpinalNodePointer_1 = require("../SpinalNodePointer");
const BaseSpinalRelation_1 = require("./BaseSpinalRelation");
const constants_1 = require("../constants");
const Utilities_1 = require("../Utilities");
const SpinalContext_1 = require("../Nodes/SpinalContext");
/**
 * Relation where the children are in Lst of Ptr of Lst.
 * @extends BaseSpinalRelation
 * @property {Str} name
 * @property {Str} id
 * @property {SpinalNodePointer<SpinalNode<any>>} parent
 * @property {SpinalMap<Val>} contextIds
 * @property {Lst<SpinalNodePointer<Lst<SpinalNode<any>>>>} children
 */
class SpinalRelationLstPtrLst extends BaseSpinalRelation_1.BaseSpinalRelation {
    /**
     * Constructor for the SpinalRelationLstPtrLst class.
     * @param {SpinalNode<any>} parent Parent of the relation
     * @param {string} name Name of the relation
     * @throws {TypeError} If the parent is not a node
     * @throws {TypeError} If the name is not a string
     */
    constructor(parent, name) {
        super(parent, name);
        this._constructorName = 'SpinalRelationLstPtrLst';
        this.debouncedRestructureChildren = (0, Utilities_1.debounce)(() => this.restructureChildren(), 1000);
        if (spinal_core_connectorjs_1.FileSystem._sig_server === false)
            return;
        this.add_attr({
            children: new spinal_core_connectorjs_1.Lst(),
        });
    }
    /**
     * Retrieves all the ids of the children of the relation and return them inside an array.
     * @returns {string[]} Array containing all the children ids of the relation
     */
    getChildrenIds() {
        var _a;
        const res = [];
        for (let ptrLst of this.children) {
            const ids = (_a = ptrLst.info.ids) === null || _a === void 0 ? void 0 : _a.get();
            if (ids) {
                res.push(...ids);
            }
        }
        return res;
    }
    /**
     * returns the number of children of the relation.
     * @returns {number}
     */
    getNbChildren() {
        var _a;
        let counter = 0;
        for (let ptrLst of this.children) {
            const ids = (_a = ptrLst.info.ids) === null || _a === void 0 ? void 0 : _a.get();
            if (ids) {
                counter += ids.length;
            }
        }
        return counter;
    }
    /**
     * Checks if the relation has a child with a certain id.
     * @param {string} id Id to check
     * @returns {boolean} True if the relation has a child with the given id, false otherwise
     */
    hasId(id) {
        var _a;
        for (let lstPtr of this.children) {
            const ids = (_a = lstPtr.info.ids) === null || _a === void 0 ? void 0 : _a.get();
            if (ids && ids.includes(id)) {
                return true;
            }
        }
        return false;
    }
    /**
     * Generator that yields the children of the relation one by one.
     * @param {number} offset
     * @param {boolean} reverse
     * @param {SpinalContext} [context]
     * @param {number} [counter=0]
     * @return {*}
     */
    getChildrenGen(offset, reverse, context, counter = 0) {
        if (context) {
            return this._getChildrenInContext(offset, reverse, context, counter);
        }
        else {
            return this._getChildrenGen(offset, reverse, counter);
        }
    }
    _getChildrenGen(offset, reverse, counter) {
        return __asyncGenerator(this, arguments, function* _getChildrenGen_1() {
            var _a, _b;
            let realOffset = Math.max(0, offset - counter);
            if (realOffset >= this.getNbChildren()) {
                return yield __await(void 0);
            }
            if (!reverse) {
                for (let i = 0; i < this.children.length; i++) {
                    // if the realOffset is greater than the number of children in the current lstPtr, we can skip it
                    const ptrLst = this.children[i];
                    const nbrInPtr = ((_a = ptrLst.info.ids) === null || _a === void 0 ? void 0 : _a.length) || 0;
                    if (realOffset >= nbrInPtr) {
                        realOffset -= nbrInPtr;
                        continue;
                    }
                    const lst = yield __await(ptrLst.load());
                    let j = Math.max(0, realOffset);
                    for (; j < lst.length; j++) {
                        realOffset = 0;
                        yield yield __await(lst[j]);
                    }
                }
            }
            else {
                for (let i = this.children.length - 1; i >= 0; i--) {
                    const ptrLst = this.children[i];
                    const nbrInPtr = ((_b = ptrLst.info.ids) === null || _b === void 0 ? void 0 : _b.length) || 0;
                    if (realOffset >= nbrInPtr) {
                        realOffset -= nbrInPtr;
                        continue;
                    }
                    const lst = yield __await(ptrLst.load());
                    let j = lst.length - 1 - Math.max(0, realOffset);
                    for (; j >= 0; j--) {
                        realOffset = 0;
                        yield yield __await(lst[j]);
                    }
                }
            }
        });
    }
    _getChildrenInContext(offset, reverse, context, counter) {
        return __asyncGenerator(this, arguments, function* _getChildrenInContext_1() {
            if (!(context instanceof SpinalContext_1.SpinalContext)) {
                throw new TypeError('context must be a SpinalContext');
            }
            let realOffset = Math.max(0, offset - counter);
            if (realOffset >= this.getNbChildren()) {
                return yield __await(void 0);
            }
            if (!reverse) {
                for (let i = 0; i < this.children.length; i++) {
                    const ptrLst = this.children[i];
                    const lst = yield __await(ptrLst.load());
                    for (let j = 0; j < lst.length; j++) {
                        if (realOffset > 0) {
                            realOffset -= 1;
                            continue;
                        }
                        if (lst[j].belongsToContext(context)) {
                            yield yield __await(lst[j]);
                        }
                    }
                }
            }
            else {
                for (let i = this.children.length - 1; i >= 0; i--) {
                    const ptrLst = this.children[i];
                    const lst = yield __await(ptrLst.load());
                    for (let j = lst.length - 1; j >= 0; j--) {
                        if (lst[j].belongsToContext(context)) {
                            if (realOffset > 0) {
                                realOffset -= 1;
                                continue;
                            }
                            yield yield __await(lst[j]);
                        }
                    }
                }
            }
        });
    }
    /**
     * Returns the type of the relation.
     * @returns {string} Type of the relation
     */
    getType() {
        return constants_1.SPINAL_RELATION_LST_PTR_LST_TYPE;
    }
    /**
     * Adds a child to the relation.
     * @template T extends Model = Node Element Type
     * @param {(T|SpinalNode<T>)} node Node or model to add
     * @throws {TypeError} If the node is not a Model
     * @throws {Error} If the node is already a child of the relation
     * @returns {Promise<SpinalNode<T>>} Promise containing the node that was added
     */
    addChild(node) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            let nodeCreate = node;
            if (!(node instanceof spinal_core_connectorjs_1.Model)) {
                throw new Error('Cannot add a child witch is not an instance of SpinalNode or Model.');
            }
            else if (!(node instanceof SpinalNode_1.SpinalNode)) {
                nodeCreate = new SpinalNode_1.SpinalNode(undefined, undefined, node);
            }
            if (this.hasId((_b = (_a = nodeCreate.info) === null || _a === void 0 ? void 0 : _a.id) === null || _b === void 0 ? void 0 : _b.get())) {
                throw new Error('Cannot add a child twice to the same relation.');
            }
            const tmpNodeCreate = nodeCreate;
            tmpNodeCreate._addParent(this);
            // get the last lstPtr or create a new one if the last one is full
            let ptrLst;
            let lst;
            if (this.children.length === 0) {
                lst = new spinal_core_connectorjs_1.Lst();
                ptrLst = new SpinalNodePointer_1.SpinalNodePointer(lst);
                ptrLst.info.add_attr('ids', new spinal_core_connectorjs_1.Lst());
                this.children.push(ptrLst);
                (_c = ptrLst.info.ids) === null || _c === void 0 ? void 0 : _c.push(tmpNodeCreate.info.id.get());
            }
            else {
                ptrLst = this.children[this.children.length - 1];
                if (ptrLst.info.ids && ptrLst.info.ids.length >= constants_1.LST_PTR_LST_SIZE) {
                    lst = new spinal_core_connectorjs_1.Lst();
                    ptrLst = new SpinalNodePointer_1.SpinalNodePointer(lst);
                    ptrLst.info.add_attr('ids', new spinal_core_connectorjs_1.Lst());
                    this.children.push(ptrLst);
                    (_d = ptrLst.info.ids) === null || _d === void 0 ? void 0 : _d.push(tmpNodeCreate.info.id.get());
                }
                else {
                    (_e = ptrLst.info.ids) === null || _e === void 0 ? void 0 : _e.push(tmpNodeCreate.info.id.get());
                    lst = yield ptrLst.load();
                }
            }
            lst.push(tmpNodeCreate);
            return tmpNodeCreate;
        });
    }
    /**
     * Removes a child from the relation.
     * @param {SpinalNode<any>} node Child to remove
     * @returns {Promise<void>} An empty promise
     * @throws {Error} If the given node is not a child
     */
    removeChild(node) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            let found = false;
            for (let i = 0; i < this.children.length; i += 1) {
                const ptrLst = this.children[i];
                const ids = (_a = ptrLst.info.ids) === null || _a === void 0 ? void 0 : _a.get();
                if (ids && ids.includes(node.info.id.get())) {
                    found = true;
                    ptrLst.info.ids.remove(node.info.id.get());
                    const lst = yield ptrLst.load();
                    lst.remove(node);
                    // if the list size is under LST_PTR_LST_COMPACT_TRIGGER and not the last list,
                    // we can try to call debouncedRestructureChildren
                    if (lst.length < constants_1.LST_PTR_LST_COMPACT_TRIGGER &&
                        i < this.children.length - 1) {
                        yield this.debouncedRestructureChildren();
                    }
                    break;
                }
            }
            if (!found) {
                return Promise.reject(Error('The node is not a child'));
            }
            node._removeParent(this);
            // this.debouncedRestructureChildren();
            return Promise.resolve();
        });
    }
    restructureChildren() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            function set_or_push(lst, index, value) {
                if (index < lst.length) {
                    lst[index] = value;
                }
                else {
                    lst.push(value);
                }
            }
            // restructure the children
            // 1 - get all the children in a single array
            const allChildren = yield this.getChildren(0, false);
            const ptrLstToRemove = [];
            // 2 - restructure the children in Lst of Ptr of Lst
            for (let i = 0; i < this.children.length; i += 1) {
                const normalizedChildren = allChildren.slice(i * constants_1.LST_PTR_LST_SIZE, (i + 1) * constants_1.LST_PTR_LST_SIZE);
                const ptrLst = this.children[i];
                if (normalizedChildren.length === 0) {
                    ptrLstToRemove.push(ptrLst);
                    continue;
                }
                const lst = yield ptrLst.load();
                for (let j = 0; j < normalizedChildren.length; j += 1) {
                    const child = normalizedChildren[j];
                    if (((_b = (_a = ptrLst.info.ids) === null || _a === void 0 ? void 0 : _a[j]) === null || _b === void 0 ? void 0 : _b.get()) !== child.info.id.get()) {
                        set_or_push(ptrLst.info.ids, j, child.info.id.get());
                        set_or_push(lst, j, child);
                    }
                }
                lst.trim(normalizedChildren.length);
                (_c = ptrLst.info.ids) === null || _c === void 0 ? void 0 : _c.trim(normalizedChildren.length);
            }
            // 3 - remove all empty ptrLst
            for (const ptrLst of ptrLstToRemove) {
                this.children.remove(ptrLst);
            }
        });
    }
}
exports.SpinalRelationLstPtrLst = SpinalRelationLstPtrLst;
SpinalRelationLstPtrLst._constructorName = 'SpinalRelationLstPtrLst';
spinal_core_connectorjs_1.spinalCore.register_models(SpinalRelationLstPtrLst, 'SpinalRelationLstPtrLst');
exports.default = SpinalRelationLstPtrLst;
//# sourceMappingURL=SpinalRelationLstPtrLst.js.map