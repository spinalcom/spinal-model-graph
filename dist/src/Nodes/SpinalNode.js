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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
exports.__esModule = true;
var spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
var Utilities_1 = require("../Utilities");
var index_1 = require("../index");
var SpinalNodePointer_1 = require("../SpinalNodePointer");
var SpinalRelationFactory_1 = require("../Relations/SpinalRelationFactory");
var SpinalMap_1 = require("../SpinalMap");
var SpinalSet_1 = require("../SpinalSet");
var DEFAULT_PREDICATE = function () { return true; };
/**
 * Node of a graph.
 * @extends Model
 * @template T extends spinal.Model = ElementType
 */
var SpinalNode = /** @class */ (function (_super) {
    __extends(SpinalNode, _super);
    /**
     * Constructor for the SpinalNode class.
     * @param {string} [name="undefined"] Name of the node
     * @param {string} [type="undefined"] Type of the node
     * @param {spinal.Model} [element] Element of the node
     * @throws {TypeError} If the element is not a Model
     */
    function SpinalNode(name, type, element) {
        if (name === void 0) { name = 'undefined'; }
        if (type === void 0) { type = 'SpinalNode'; }
        var _this = _super.call(this) || this;
        if (spinal_core_connectorjs_type_1.FileSystem._sig_server === false)
            return _this;
        _this.add_attr({
            info: {
                name: name,
                type: type,
                id: Utilities_1.guid(_this.constructor.name)
            },
            parents: new SpinalMap_1.SpinalMap(),
            children: new SpinalMap_1.SpinalMap(),
            element: element !== undefined ? new SpinalNodePointer_1.SpinalNodePointer(element) : undefined,
            contextIds: new SpinalSet_1.SpinalSet()
        });
        return _this;
    }
    /**
     * Returns the id.
     * @returns {spinal.Str} Id of the node
     */
    SpinalNode.prototype.getId = function () {
        return this.info.id;
    };
    /**
     * Returns the name.
     * @returns {spinal.Str} Name of the node
     */
    SpinalNode.prototype.getName = function () {
        return this.info.name;
    };
    /**
     * Returns the type.
     * @returns {spinal.Str} Type of the node
     */
    SpinalNode.prototype.getType = function () {
        return this.info.type;
    };
    /**
     * Returns the element.
     * @returns {Promise<T>} A promise where the parameter of the resolve method is the element
     */
    SpinalNode.prototype.getElement = function () {
        if (this.element === undefined) {
            var model = new spinal_core_connectorjs_type_1.Model();
            this.add_attr('element', (new SpinalNodePointer_1.SpinalNodePointer(model)));
            return new Promise(model);
        }
        return this.element.load();
    };
    /**
     * Returns all the children ids in an array.
     * @returns {string[]} Ids of the children
     */
    SpinalNode.prototype.getChildrenIds = function () {
        var e_1, _a, e_2, _b;
        var nodeChildrenIds = [];
        try {
            for (var _c = __values(this.children), _d = _c.next(); !_d.done; _d = _c.next()) {
                var _e = __read(_d.value, 2), relationMap = _e[1];
                try {
                    for (var relationMap_1 = __values(relationMap), relationMap_1_1 = relationMap_1.next(); !relationMap_1_1.done; relationMap_1_1 = relationMap_1.next()) {
                        var _f = __read(relationMap_1_1.value, 2), relation = _f[1];
                        var relChildrenIds = relation.getChildrenIds();
                        for (var i = 0; i < relChildrenIds.length; i += 1) {
                            nodeChildrenIds.push(relChildrenIds[i]);
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (relationMap_1_1 && !relationMap_1_1.done && (_b = relationMap_1["return"])) _b.call(relationMap_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return nodeChildrenIds;
    };
    /**
     * Computes and returns the number of children of the node.
     * @returns {number} The number of children
     */
    SpinalNode.prototype.getNbChildren = function () {
        var e_3, _a, e_4, _b;
        var count = 0;
        try {
            for (var _c = __values(this.children), _d = _c.next(); !_d.done; _d = _c.next()) {
                var _e = __read(_d.value, 2), relationMap = _e[1];
                try {
                    for (var relationMap_2 = __values(relationMap), relationMap_2_1 = relationMap_2.next(); !relationMap_2_1.done; relationMap_2_1 = relationMap_2.next()) {
                        var _f = __read(relationMap_2_1.value, 2), relation = _f[1];
                        count += relation.getNbChildren();
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (relationMap_2_1 && !relationMap_2_1.done && (_b = relationMap_2["return"])) _b.call(relationMap_2);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return count;
    };
    /**
     * Adds an id to the context ids of the node.
     * @param {string} id Id of the context
     * @throws {TypeError} If the id is not a string
     */
    SpinalNode.prototype.addContextId = function (id) {
        if (typeof id !== 'string') {
            throw TypeError('id must be a string');
        }
        if (!this.contextIds.has(id)) {
            this.contextIds.add(id);
        }
    };
    /**
     * Returns a list of the contexts the node is associated to.
     * @returns {string[]} An array of ids of the associated contexts
     */
    SpinalNode.prototype.getContextIds = function () {
        return this.contextIds.values();
    };
    /**
     * Returns true if the node belongs to the context.
     * @param {SpinalContext} context The context that might own the node
     * @returns {boolean} A boolean
     * @throws {TypeError} If context is not a SpinalContext
     */
    SpinalNode.prototype.belongsToContext = function (context) {
        if (!(context instanceof index_1.SpinalContext)) {
            throw TypeError('context must be a SpinalContext');
        }
        return this.contextIds.has(context.getId().get());
    };
    /**
     * Verify if the node contains the relation name.
     * @param {string} relationName Name of the relation
     * @param {string} relationType Type of the relation
     * @returns {boolean} Return true is the relation is contained in the node and false otherwise.
     * @throws {TypeError} If the relation name is not a string
     * @throws {Error} If the relation type doesn't exist
     */
    SpinalNode.prototype.hasRelation = function (relationName, relationType) {
        if (typeof relationName !== 'string') {
            throw TypeError('the relation name must be a string');
        }
        if (SpinalRelationFactory_1.RELATION_TYPE_LIST.indexOf(relationType) === -1) {
            throw Error('invalid relation type');
        }
        var typeMap = this._getChildrenType(relationType);
        if (typeof typeMap === 'undefined') {
            return false;
        }
        return typeMap.has(relationName);
    };
    /**
     * Verify if the node contains all the relation names.
     * @param {string[]} relationNames Array containing all the relation name
     * @param {string} relationType Type of the relations
     * @returns {boolean} Return true if the node contains
     * all the relations in relationNames,false otherwise.
     * @throws {TypeError} If the relation names are not in an array
     * @throws {TypeError} If one of the relation names is not a string
     * @throws {Error} If the relation type doesn't exist
     */
    SpinalNode.prototype.hasRelations = function (relationNames, relationType) {
        var e_5, _a;
        if (!Array.isArray(relationNames)) {
            throw TypeError('The relation names must be in an array');
        }
        if (SpinalRelationFactory_1.RELATION_TYPE_LIST.indexOf(relationType) === -1) {
            throw Error('invalid relation type');
        }
        try {
            for (var relationNames_1 = __values(relationNames), relationNames_1_1 = relationNames_1.next(); !relationNames_1_1.done; relationNames_1_1 = relationNames_1.next()) {
                var relationName = relationNames_1_1.value;
                if (!this.hasRelation(relationName, relationType)) {
                    return false;
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (relationNames_1_1 && !relationNames_1_1.done && (_a = relationNames_1["return"])) _a.call(relationNames_1);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return true;
    };
    /**
     * Returns all the relation names of the node.
     * @returns {string[]} The names of the relations of the node
     */
    SpinalNode.prototype.getRelationNames = function () {
        var e_6, _a;
        var names = [];
        try {
            for (var _b = __values(this.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), relationMap = _d[1];
                names.push.apply(names, __spread(relationMap.keys()));
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
            }
            finally { if (e_6) throw e_6.error; }
        }
        // Removes all duplicates
        return Array.from(new Set(names));
    };
    /**
     * Add the node as child of the relation.
     * @param {T|SpinalNode<T>} child Element to add as child
     * @param {string} relationName Name of the relation
     * @param {string} relationType Type of the relation
     * @returns {Promise<SpinalNode>} The child node in a promise
     * @throws {TypeError} If the child is not a model
     * @throws {TypeError} If the relation name is not a string
     * @throws {Error} If the relation type is invalid
     */
    SpinalNode.prototype.addChild = function (child, relationName, relationType) {
        return __awaiter(this, void 0, void 0, function () {
            var relation;
            return __generator(this, function (_a) {
                if (!(child instanceof spinal_core_connectorjs_type_1.Model)) {
                    throw TypeError('Cannot add a child witch is not an instance of SpinalNode or Model.');
                }
                if (!this.hasRelation(relationName, relationType)) {
                    relation = this._createRelation(relationName, relationType);
                }
                else {
                    relation = this._getRelation(relationName, relationType);
                }
                return [2 /*return*/, relation.addChild(child)];
            });
        });
    };
    /**
     * Adds a child and notices the context if a new relation was created.
     * @param {SpinalNode | Model} child Node to add as child
     * @param {string} relationName Name of the relation
     * @param {string} relationType Type of the relation
     * @param {SpinalContext} context Context to update
     * @returns {Promise<SpinalNode>} The child node in a promise
     * @throws {TypeError} If the child is not a model
     * @throws {TypeError} If the relation name is not a string
     * @throws {TypeError} If the context is not a SpinalContext
     * @throws {Error} If the relation type is invalid
     */
    SpinalNode.prototype.addChildInContext = function (child, relationName, relationType, context) {
        return __awaiter(this, void 0, void 0, function () {
            var relation, childCreate, tmpchildCreate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        childCreate = child;
                        if (!(context instanceof index_1.SpinalContext)) {
                            throw TypeError('context must be a SpinaContext');
                        }
                        if (!(child instanceof spinal_core_connectorjs_type_1.Model)) {
                            throw TypeError('Cannot add a child witch is not an instance of SpinalNode or Model.');
                        }
                        else if (!(child instanceof SpinalNode)) {
                            childCreate = new SpinalNode(undefined, undefined, child);
                        }
                        tmpchildCreate = childCreate;
                        if (!this.hasRelation(relationName, relationType)) {
                            relation = this._createRelation(relationName, relationType);
                        }
                        else {
                            relation = this._getRelation(relationName, relationType);
                        }
                        tmpchildCreate.addContextId(context.getId().get());
                        relation.addContextId(context.getId().get());
                        return [4 /*yield*/, relation.addChild(tmpchildCreate)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, tmpchildCreate];
                }
            });
        });
    };
    /**
     * Removes the node from the relation children.
     * @param {SpinalNode} node Node to remove
     * @param {string} relationName Name of the relation to wich the node belongs
     * @param {string} relationType Type of the relation to wich the node belongs
     * @returns {Promise<void>} An empty promise
     * @throws {TypeError} If relation name is not a string
     * @throws {Error} If relation type is invalid
     * @throws {Error} If relation doesn't exist
     * @throws {Error} If the child doesn't exist
     */
    SpinalNode.prototype.removeChild = function (node, relationName, relationType) {
        if (!this.hasRelation(relationName, relationType)) {
            throw Error("The relation doesn't exist");
        }
        var rel = this._getRelation(relationName, relationType);
        return rel.removeChild(node);
    };
    /**
     * Removes children in the given relation.
     * @param {SpinalNode[]} nodes Nodes to delete
     * @param {string} relationName Name of the relation
     * @param {string} relationType Type of the relation
     * @returns {Promise<void>} An empty promise
     * @throws {TypeError} If nodes is not an array
     * @throws {TypeError} If an element of nodes is not a SpinalNode
     * @throws {TypeError} If relation name is not a string
     * @throws {Error} If relation type is invalid
     * @throws {Error} If the relation doesn't exist
     * @throws {Error} If one of the nodes is not a child
     */
    SpinalNode.prototype.removeChildren = function (nodes, relationName, relationType) {
        if (!Array.isArray(nodes)) {
            throw TypeError('nodes must be an array');
        }
        if (!this.hasRelation(relationName, relationType)) {
            throw Error("The relation doesn't exist");
        }
        var rel = this._getRelation(relationName, relationType);
        return rel.removeChildren(nodes);
    };
    /**
     * Removes a child relation of the node.
     * @param {string} relationName Name of the relation to remove
     * @param {string} relationType Type of the relation to remove
     * @returns {Promise<void>} An empty promise
     * @throws {TypeError} If the relationName is not a string
     * @throws {Error} If the relationType is invalid
     * @throws {Error} If the relation doesn't exist
     */
    SpinalNode.prototype.removeRelation = function (relationName, relationType) {
        if (!this.hasRelation(relationName, relationType)) {
            throw Error("The relation doesn't exist");
        }
        var rel = this._getRelation(relationName, relationType);
        return rel.removeFromGraph();
    };
    /**
     * Remove the node from the graph
     * i.e remove the node from all the parent relations and remove all the children relations.
     * This operation might delete all the sub-graph under this node.
     * After this operation the node can be deleted without fear.
     * @returns {Promise<void>} An empty promise
     */
    SpinalNode.prototype.removeFromGraph = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            this._removeFromParents(),
                            this._removeFromChildren(),
                        ])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns the first child in the given relation for which the predicate is true.
     * @param {SpinalNodeFindPredicateFunc} predicate
     * Functions that takes a node and returns a boolean
     * @param {string} relationName Name of the relation
     * @param {string} relationType Type of the relation
     * @returns {Promise<SpinalNode<any>>}
     * The first child for which the predicate is true or undefined
     * @throws {TypeError} If predicate is not a function
     * @throws {TypeError} If relation name is not a string
     * @throws {Error} If relation type is invalid
     * @throws {Error} If relation doesn't exist
     */
    SpinalNode.prototype.getChild = function (predicate, relationName, relationType) {
        return __awaiter(this, void 0, void 0, function () {
            var e_7, _a, relation, children, children_1, children_1_1, child;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (typeof predicate !== 'function') {
                            throw TypeError('the predicate must be a function');
                        }
                        if (!this.hasRelation(relationName, relationType)) {
                            throw Error("The relation doesn't exist");
                        }
                        relation = this._getRelation(relationName, relationType);
                        return [4 /*yield*/, relation.getChildren()];
                    case 1:
                        children = _b.sent();
                        try {
                            for (children_1 = __values(children), children_1_1 = children_1.next(); !children_1_1.done; children_1_1 = children_1.next()) {
                                child = children_1_1.value;
                                if (predicate(child)) {
                                    return [2 /*return*/, child];
                                }
                            }
                        }
                        catch (e_7_1) { e_7 = { error: e_7_1 }; }
                        finally {
                            try {
                                if (children_1_1 && !children_1_1.done && (_a = children_1["return"])) _a.call(children_1);
                            }
                            finally { if (e_7) throw e_7.error; }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns the children of the node for the relation names.
     * @param {string[]} [relationNames=[]]
     * Array containing the relation names of the desired children
     * @returns {Promise<SpinalNode[]>} The children that were found
     * @throws {TypeError} If relationNames is neither an array, a string or omitted
     * @throws {TypeError} If an element of relationNames is not a string
     */
    SpinalNode.prototype.getChildren = function (relationNames) {
        if (relationNames === void 0) { relationNames = []; }
        return __awaiter(this, void 0, void 0, function () {
            var e_8, _a, e_9, _b, relName, promises, tmpRelName, _c, _d, _e, relationMap, j, relation, childrenLst, res, children, childrenLst_1, childrenLst_1_1, i;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        relName = relationNames;
                        if (Array.isArray(relationNames)) {
                            if (relationNames.length === 0) {
                                relName = this.getRelationNames();
                            }
                        }
                        else if (typeof relationNames === 'string') {
                            relName = [relationNames];
                        }
                        else {
                            throw TypeError('relationNames must be an array, a string or omitted');
                        }
                        promises = [];
                        tmpRelName = relName;
                        try {
                            for (_c = __values(this.children), _d = _c.next(); !_d.done; _d = _c.next()) {
                                _e = __read(_d.value, 2), relationMap = _e[1];
                                for (j = 0; j < tmpRelName.length; j += 1) {
                                    if (relationMap.has(tmpRelName[j])) {
                                        relation = relationMap.getElement(tmpRelName[j]);
                                        promises.push(relation.getChildren());
                                    }
                                }
                            }
                        }
                        catch (e_8_1) { e_8 = { error: e_8_1 }; }
                        finally {
                            try {
                                if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
                            }
                            finally { if (e_8) throw e_8.error; }
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        childrenLst = _f.sent();
                        res = [];
                        try {
                            for (childrenLst_1 = __values(childrenLst), childrenLst_1_1 = childrenLst_1.next(); !childrenLst_1_1.done; childrenLst_1_1 = childrenLst_1.next()) {
                                children = childrenLst_1_1.value;
                                for (i = 0; i < children.length; i += 1) {
                                    res.push(children[i]);
                                }
                            }
                        }
                        catch (e_9_1) { e_9 = { error: e_9_1 }; }
                        finally {
                            try {
                                if (childrenLst_1_1 && !childrenLst_1_1.done && (_b = childrenLst_1["return"])) _b.call(childrenLst_1);
                            }
                            finally { if (e_9) throw e_9.error; }
                        }
                        return [2 /*return*/, res];
                }
            });
        });
    };
    /**
     * Return the children of the node that are registered in the context
     * @param {SpinalContext} context Context to use for the search
     * @returns {Promise<SpinalNode[]>} The children that were found
     * @throws {TypeError} If the context is not a SpinalContext
     */
    SpinalNode.prototype.getChildrenInContext = function (context) {
        return __awaiter(this, void 0, void 0, function () {
            var e_10, _a, e_11, _b, e_12, _c, promises, _d, _e, _f, relationMap, relationMap_3, relationMap_3_1, _g, relation, childrenLst, res, childrenLst_2, childrenLst_2_1, children, i;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        if (!(context instanceof index_1.SpinalContext)) {
                            throw TypeError('context must be a SpinalContext');
                        }
                        promises = [];
                        try {
                            for (_d = __values(this.children), _e = _d.next(); !_e.done; _e = _d.next()) {
                                _f = __read(_e.value, 2), relationMap = _f[1];
                                try {
                                    for (relationMap_3 = __values(relationMap), relationMap_3_1 = relationMap_3.next(); !relationMap_3_1.done; relationMap_3_1 = relationMap_3.next()) {
                                        _g = __read(relationMap_3_1.value, 2), relation = _g[1];
                                        if (relation.belongsToContext(context)) {
                                            promises.push(relation.getChildrenInContext(context));
                                        }
                                    }
                                }
                                catch (e_11_1) { e_11 = { error: e_11_1 }; }
                                finally {
                                    try {
                                        if (relationMap_3_1 && !relationMap_3_1.done && (_b = relationMap_3["return"])) _b.call(relationMap_3);
                                    }
                                    finally { if (e_11) throw e_11.error; }
                                }
                            }
                        }
                        catch (e_10_1) { e_10 = { error: e_10_1 }; }
                        finally {
                            try {
                                if (_e && !_e.done && (_a = _d["return"])) _a.call(_d);
                            }
                            finally { if (e_10) throw e_10.error; }
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        childrenLst = _h.sent();
                        res = [];
                        try {
                            for (childrenLst_2 = __values(childrenLst), childrenLst_2_1 = childrenLst_2.next(); !childrenLst_2_1.done; childrenLst_2_1 = childrenLst_2.next()) {
                                children = childrenLst_2_1.value;
                                for (i = 0; i < children.length; i += 1) {
                                    res.push(children[i]);
                                }
                            }
                        }
                        catch (e_12_1) { e_12 = { error: e_12_1 }; }
                        finally {
                            try {
                                if (childrenLst_2_1 && !childrenLst_2_1.done && (_c = childrenLst_2["return"])) _c.call(childrenLst_2);
                            }
                            finally { if (e_12) throw e_12.error; }
                        }
                        return [2 /*return*/, res];
                }
            });
        });
    };
    /**
     * Return all parents for the relation names no matter the type of relation
     * @param {String[]} [relationNames=[]] Array containing the relation names of the desired parents
     * @returns {Promise<Array<SpinalNode<any>>>} Promise containing the parents that were found
     * @throws {TypeError} If the relationNames are neither an array, a string or omitted
     * @throws {TypeError} If an element of relationNames is not a string
     */
    SpinalNode.prototype.getParents = function (relationNames) {
        if (relationNames === void 0) { relationNames = []; }
        var e_13, _a;
        var relNames = relationNames;
        if (Array.isArray(relationNames)) {
            if (relationNames.length === 0) {
                relNames = this.parents.keys();
            }
        }
        else if (typeof relationNames === 'string') {
            relNames = [relationNames];
        }
        else {
            throw TypeError('relationNames must be an array, a string or omitted');
        }
        var promises = [];
        var tmpRelNames = relNames;
        try {
            for (var tmpRelNames_1 = __values(tmpRelNames), tmpRelNames_1_1 = tmpRelNames_1.next(); !tmpRelNames_1_1.done; tmpRelNames_1_1 = tmpRelNames_1.next()) {
                var name = tmpRelNames_1_1.value;
                var list = this.parents.getElement(name);
                if (typeof list !== "undefined" && list !== null) {
                    for (var i = 0; i < list.length; i += 1) {
                        promises.push(list[i].load().then(function (relation) {
                            return relation.getParent();
                        }));
                    }
                }
            }
        }
        catch (e_13_1) { e_13 = { error: e_13_1 }; }
        finally {
            try {
                if (tmpRelNames_1_1 && !tmpRelNames_1_1.done && (_a = tmpRelNames_1["return"])) _a.call(tmpRelNames_1);
            }
            finally { if (e_13) throw e_13.error; }
        }
        return Promise.all(promises);
    };
    /**
     * Recursively finds all the children nodes for which the predicate is true.
     * @param {string|string[]} relationNames Array containing the relation names to follow
     * @param {SpinalNodeFindPredicateFunc} predicate
     * Function returning true if the node needs to be returned
     * @returns {Promise<Array<SpinalNode<any>>>} The nodes that were found
     * @throws {TypeError} If the relationNames are neither an array, a string or omitted
     * @throws {TypeError} If an element of relationNames is not a string
     * @throws {TypeError} If the predicate is not a function
     */
    SpinalNode.prototype.find = function (relationNames, predicate) {
        if (predicate === void 0) { predicate = DEFAULT_PREDICATE; }
        return __awaiter(this, void 0, void 0, function () {
            var e_14, _a, e_15, _b, e_16, _c, seen, promises, nextGen, currentGen, found, currentGen_1, currentGen_1_1, node, childrenArrays, childrenArrays_1, childrenArrays_1_1, children, children_2, children_2_1, child;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!Array.isArray(relationNames) &&
                            relationNames !== undefined &&
                            typeof relationNames !== 'string') {
                            throw TypeError('relationNames must be an array, a string or omitted');
                        }
                        if (typeof predicate !== 'function') {
                            throw TypeError('predicate must be a function');
                        }
                        seen = new Set([this]);
                        promises = [];
                        nextGen = [this];
                        currentGen = [];
                        found = [];
                        _d.label = 1;
                    case 1:
                        if (!nextGen.length) return [3 /*break*/, 3];
                        currentGen = nextGen;
                        promises = [];
                        nextGen = [];
                        try {
                            for (currentGen_1 = __values(currentGen), currentGen_1_1 = currentGen_1.next(); !currentGen_1_1.done; currentGen_1_1 = currentGen_1.next()) {
                                node = currentGen_1_1.value;
                                promises.push(node.getChildren(relationNames));
                                if (predicate(node)) {
                                    found.push(node);
                                }
                            }
                        }
                        catch (e_14_1) { e_14 = { error: e_14_1 }; }
                        finally {
                            try {
                                if (currentGen_1_1 && !currentGen_1_1.done && (_a = currentGen_1["return"])) _a.call(currentGen_1);
                            }
                            finally { if (e_14) throw e_14.error; }
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 2:
                        childrenArrays = _d.sent();
                        try {
                            for (childrenArrays_1 = __values(childrenArrays), childrenArrays_1_1 = childrenArrays_1.next(); !childrenArrays_1_1.done; childrenArrays_1_1 = childrenArrays_1.next()) {
                                children = childrenArrays_1_1.value;
                                try {
                                    for (children_2 = __values(children), children_2_1 = children_2.next(); !children_2_1.done; children_2_1 = children_2.next()) {
                                        child = children_2_1.value;
                                        if (!seen.has(child)) {
                                            nextGen.push(child);
                                            seen.add(child);
                                        }
                                    }
                                }
                                catch (e_16_1) { e_16 = { error: e_16_1 }; }
                                finally {
                                    try {
                                        if (children_2_1 && !children_2_1.done && (_c = children_2["return"])) _c.call(children_2);
                                    }
                                    finally { if (e_16) throw e_16.error; }
                                }
                            }
                        }
                        catch (e_15_1) { e_15 = { error: e_15_1 }; }
                        finally {
                            try {
                                if (childrenArrays_1_1 && !childrenArrays_1_1.done && (_b = childrenArrays_1["return"])) _b.call(childrenArrays_1);
                            }
                            finally { if (e_15) throw e_15.error; }
                        }
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/, found];
                }
            });
        });
    };
    /**
     * Recursively finds all the children nodes in the context for which the predicate is true..
     * @param {SpinalContext} context Context to use for the search
     * @param {findPredicate} predicate Function returning true if the node needs to be returned
     * @returns {Promise<Array<SpinalNode>>} The nodes that were found
     * @throws {TypeError} If context is not a SpinalContext
     * @throws {TypeError} If the predicate is not a function
     */
    SpinalNode.prototype.findInContext = function (context, predicate) {
        if (predicate === void 0) { predicate = DEFAULT_PREDICATE; }
        return __awaiter(this, void 0, void 0, function () {
            var e_17, _a, e_18, _b, e_19, _c, seen, promises, nextGen, currentGen, found, currentGen_2, currentGen_2_1, node, childrenArrays, childrenArrays_2, childrenArrays_2_1, children, children_3, children_3_1, child;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (typeof predicate !== 'function') {
                            throw new Error('The predicate function must be a function');
                        }
                        seen = new Set([this]);
                        promises = [];
                        nextGen = [this];
                        currentGen = [];
                        found = [];
                        _d.label = 1;
                    case 1:
                        if (!nextGen.length) return [3 /*break*/, 3];
                        currentGen = nextGen;
                        promises = [];
                        nextGen = [];
                        try {
                            for (currentGen_2 = __values(currentGen), currentGen_2_1 = currentGen_2.next(); !currentGen_2_1.done; currentGen_2_1 = currentGen_2.next()) {
                                node = currentGen_2_1.value;
                                promises.push(node.getChildrenInContext(context));
                                if (predicate(node)) {
                                    found.push(node);
                                }
                            }
                        }
                        catch (e_17_1) { e_17 = { error: e_17_1 }; }
                        finally {
                            try {
                                if (currentGen_2_1 && !currentGen_2_1.done && (_a = currentGen_2["return"])) _a.call(currentGen_2);
                            }
                            finally { if (e_17) throw e_17.error; }
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 2:
                        childrenArrays = _d.sent();
                        try {
                            for (childrenArrays_2 = __values(childrenArrays), childrenArrays_2_1 = childrenArrays_2.next(); !childrenArrays_2_1.done; childrenArrays_2_1 = childrenArrays_2.next()) {
                                children = childrenArrays_2_1.value;
                                try {
                                    for (children_3 = __values(children), children_3_1 = children_3.next(); !children_3_1.done; children_3_1 = children_3.next()) {
                                        child = children_3_1.value;
                                        if (!seen.has(child)) {
                                            nextGen.push(child);
                                            seen.add(child);
                                        }
                                    }
                                }
                                catch (e_19_1) { e_19 = { error: e_19_1 }; }
                                finally {
                                    try {
                                        if (children_3_1 && !children_3_1.done && (_c = children_3["return"])) _c.call(children_3);
                                    }
                                    finally { if (e_19) throw e_19.error; }
                                }
                            }
                        }
                        catch (e_18_1) { e_18 = { error: e_18_1 }; }
                        finally {
                            try {
                                if (childrenArrays_2_1 && !childrenArrays_2_1.done && (_b = childrenArrays_2["return"])) _b.call(childrenArrays_2);
                            }
                            finally { if (e_18) throw e_18.error; }
                        }
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/, found];
                }
            });
        });
    };
    /**
     * Recursively applies a function to all the children nodes.
     * @param {string|string[]} relationNames Array containing the relation names to follow
     * @param {SpinalNodeForEachFunc<SpinalNode<any>>} callback Function to apply to the nodes
     * @throws {TypeError} If the relationNames are neither an array, a string or omitted
     * @throws {TypeError} If an element of relationNames is not a string
     * @throws {TypeError} If the callback is not a function
     */
    SpinalNode.prototype.forEach = function (relationNames, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var e_20, _a, nodes, nodes_1, nodes_1_1, node;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (typeof callback !== 'function') {
                            throw TypeError('callback must be a function');
                        }
                        return [4 /*yield*/, this.find(relationNames)];
                    case 1:
                        nodes = _b.sent();
                        try {
                            for (nodes_1 = __values(nodes), nodes_1_1 = nodes_1.next(); !nodes_1_1.done; nodes_1_1 = nodes_1.next()) {
                                node = nodes_1_1.value;
                                callback(node);
                            }
                        }
                        catch (e_20_1) { e_20 = { error: e_20_1 }; }
                        finally {
                            try {
                                if (nodes_1_1 && !nodes_1_1.done && (_a = nodes_1["return"])) _a.call(nodes_1);
                            }
                            finally { if (e_20) throw e_20.error; }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Recursively applies a function to all the children nodes in the context.
     * @param {SpinalContext} context Context to use for the search
     * @param {forEachCallback} callback Function to apply to the nodes
     * @throws {TypeError} If context is not a SpinalContext
     * @throws {TypeError} If the callback is not a function
     */
    SpinalNode.prototype.forEachInContext = function (context, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var e_21, _a, nodes, nodes_2, nodes_2_1, node;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (typeof callback !== 'function') {
                            throw TypeError('callback must be a function');
                        }
                        return [4 /*yield*/, this.findInContext(context)];
                    case 1:
                        nodes = _b.sent();
                        try {
                            for (nodes_2 = __values(nodes), nodes_2_1 = nodes_2.next(); !nodes_2_1.done; nodes_2_1 = nodes_2.next()) {
                                node = nodes_2_1.value;
                                callback(node);
                            }
                        }
                        catch (e_21_1) { e_21 = { error: e_21_1 }; }
                        finally {
                            try {
                                if (nodes_2_1 && !nodes_2_1.done && (_a = nodes_2["return"])) _a.call(nodes_2);
                            }
                            finally { if (e_21) throw e_21.error; }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Recursively applies a function to all the children nodes and returns the results in an array.
     * @param {string|string[]} relationNames Array containing the relation names to follow
     * @param {SpinalNodeMapFunc} callback Function to apply to the nodes
     * @returns {Promise<any[]>} The results of the callback for each node
     * @throws {TypeError} If the relationNames are neither an array, a string or omitted
     * @throws {TypeError} If an element of relationNames is not a string
     * @throws {TypeError} If the callback is not a function
     */
    SpinalNode.prototype.map = function (relationNames, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var e_22, _a, nodes, results, nodes_3, nodes_3_1, node;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (typeof callback !== 'function') {
                            throw TypeError('The callback function must be a function');
                        }
                        return [4 /*yield*/, this.find(relationNames)];
                    case 1:
                        nodes = _b.sent();
                        results = [];
                        try {
                            for (nodes_3 = __values(nodes), nodes_3_1 = nodes_3.next(); !nodes_3_1.done; nodes_3_1 = nodes_3.next()) {
                                node = nodes_3_1.value;
                                results.push(callback(node));
                            }
                        }
                        catch (e_22_1) { e_22 = { error: e_22_1 }; }
                        finally {
                            try {
                                if (nodes_3_1 && !nodes_3_1.done && (_a = nodes_3["return"])) _a.call(nodes_3);
                            }
                            finally { if (e_22) throw e_22.error; }
                        }
                        return [2 /*return*/, results];
                }
            });
        });
    };
    /**
     * Recursively applies a function to all the children nodes in the context
     * and returns the results in an array.
     * @param {SpinalContext} context Context to use for the search
     * @param {function} callback Function to apply to the nodes
     * @returns {Promise<Array<*>>} The results of the callback for each node
     * @throws {TypeError} If context is not a SpinalContext
     * @throws {TypeError} If the callback is not a function
     */
    SpinalNode.prototype.mapInContext = function (context, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var e_23, _a, nodes, results, nodes_4, nodes_4_1, node;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (typeof callback !== 'function') {
                            throw TypeError('The callback function must be a function');
                        }
                        return [4 /*yield*/, this.findInContext(context)];
                    case 1:
                        nodes = _b.sent();
                        results = [];
                        try {
                            for (nodes_4 = __values(nodes), nodes_4_1 = nodes_4.next(); !nodes_4_1.done; nodes_4_1 = nodes_4.next()) {
                                node = nodes_4_1.value;
                                results.push(callback(node));
                            }
                        }
                        catch (e_23_1) { e_23 = { error: e_23_1 }; }
                        finally {
                            try {
                                if (nodes_4_1 && !nodes_4_1.done && (_a = nodes_4["return"])) _a.call(nodes_4);
                            }
                            finally { if (e_23) throw e_23.error; }
                        }
                        return [2 /*return*/, results];
                }
            });
        });
    };
    /**
     * Return the relation list corresponding to the relation type.
     * @param {string} relationType Type of the relation
     * @returns {SpinalMap} Return the relation list corresponding to the relation type
     * @private
     */
    SpinalNode.prototype._getChildrenType = function (relationType) {
        return this.children.getElement(relationType);
    };
    /**
     * Return the relation corresponding.
     * @param {string} relationName Name of the relation
     * @param {string} relationType Type of the relation
     * @returns {SpinalRelation} The relation corresponding
     * @protected
     */
    SpinalNode.prototype._getRelation = function (relationName, relationType) {
        return this._getChildrenType(relationType).getElement(relationName);
    };
    /**
     * Removes a parent relation of the node.
     * @param {AnySpinalRelation} relation Relation to remove
     * @protected
     */
    SpinalNode.prototype._removeParent = function (relation) {
        var parentLst = this.parents.getElement(relation.getName().get());
        for (var i = 0; i < parentLst.length; i += 1) {
            if (parentLst[i].getId().get() === relation.getId().get()) {
                parentLst.splice(i);
                break;
            }
        }
    };
    /**
     * Removes the node from all parent relation the property parents.
     * @protected
     */
    SpinalNode.prototype._removeFromParents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_24, _a, promises, _b, _c, _d, parent, i;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        promises = [];
                        try {
                            for (_b = __values(this.parents), _c = _b.next(); !_c.done; _c = _b.next()) {
                                _d = __read(_c.value, 2), parent = _d[1];
                                for (i = 0; i < parent.length; i += 1) {
                                    parent[i].load().then(function (parentRel) {
                                        promises.push(parentRel.removeChild(_this));
                                    });
                                }
                            }
                        }
                        catch (e_24_1) { e_24 = { error: e_24_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                            }
                            finally { if (e_24) throw e_24.error; }
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        _e.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Adds the relation as parent of the node.
     * @param {AnySpinalRelation} relation Parent relation
     * @protected
     */
    SpinalNode.prototype._addParent = function (relation) {
        var relationName = relation.getName().get();
        if (this.parents.has(relationName)) {
            this.parents
                .getElement(relationName)
                .push(new SpinalNodePointer_1.SpinalNodePointer(relation, true));
        }
        else {
            var list = new spinal_core_connectorjs_type_1.Lst();
            list.push(new SpinalNodePointer_1.SpinalNodePointer(relation, true));
            this.parents.setElement(relationName, list);
        }
    };
    /**
     * Create a new relation for this node.
     * @param {string} relationName Name of the relation
     * @param {string} relationType Type of the relation
     * @protected
     */
    SpinalNode.prototype._createRelation = function (relationName, relationType) {
        var relation = SpinalRelationFactory_1.SpinalRelationFactory.getNewRelation(this, relationName, relationType);
        if (!this.children.has(relationType)) {
            this.children.setElement(relationType, new SpinalMap_1.SpinalMap());
        }
        this._getChildrenType(relationType).setElement(relationName, relation);
        return relation;
    };
    /**
     * Remove all children relation from the graph.
     * @returns {Promise<void>} An empty promise
     * @protected
     */
    SpinalNode.prototype._removeFromChildren = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_25, _a, e_26, _b, promises, _c, _d, _e, relationMap, relationMap_4, relationMap_4_1, _f, relation;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        promises = [];
                        try {
                            for (_c = __values(this.children), _d = _c.next(); !_d.done; _d = _c.next()) {
                                _e = __read(_d.value, 2), relationMap = _e[1];
                                try {
                                    for (relationMap_4 = __values(relationMap), relationMap_4_1 = relationMap_4.next(); !relationMap_4_1.done; relationMap_4_1 = relationMap_4.next()) {
                                        _f = __read(relationMap_4_1.value, 2), relation = _f[1];
                                        promises.push(relation.removeFromGraph());
                                    }
                                }
                                catch (e_26_1) { e_26 = { error: e_26_1 }; }
                                finally {
                                    try {
                                        if (relationMap_4_1 && !relationMap_4_1.done && (_b = relationMap_4["return"])) _b.call(relationMap_4);
                                    }
                                    finally { if (e_26) throw e_26.error; }
                                }
                            }
                        }
                        catch (e_25_1) { e_25 = { error: e_25_1 }; }
                        finally {
                            try {
                                if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
                            }
                            finally { if (e_25) throw e_25.error; }
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        _g.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return SpinalNode;
}(spinal_core_connectorjs_type_1.Model));
exports.SpinalNode = SpinalNode;
spinal_core_connectorjs_type_1.spinalCore.register_models([SpinalNode]);
exports["default"] = SpinalNode;
//# sourceMappingURL=SpinalNode.js.map