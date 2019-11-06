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
// tslint:disable:function-name
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
exports.__esModule = true;
var spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
var Utilities_1 = require("../Utilities");
var __1 = require("..");
var SpinalNodePointer_1 = require("../SpinalNodePointer");
var SpinalMap_1 = require("../SpinalMap");
/**
 * Base for all relation in a SpinalGraph.
 * @extends Model
 * @abstract
 * @property {spinal.Str} name
 * @property {spinal.Str} id
 * @property {SpinalNodePointer<SpinalNode>} parent
 * @property {SpinalMap<spinal.Val>} contextIds
 */
var BaseSpinalRelation = /** @class */ (function (_super) {
    __extends(BaseSpinalRelation, _super);
    /**
     * Constructor for the BaseSpinalRelation class.
     * @param {SpinalNode<spinal.Model>} parent Parent of the relation
     * @param {string} name Name of the relation
     * @throws {TypeError} If the parent is not a node
     * @throws {TypeError} If the name is not a string
     */
    function BaseSpinalRelation(parent, name) {
        var _this = _super.call(this) || this;
        if (spinal_core_connectorjs_type_1.FileSystem._sig_server === false)
            return _this;
        // instanceof doesn't work here
        if (!__1.SpinalNode.prototype.isPrototypeOf(parent)) {
            throw TypeError('parent must be a node');
        }
        if (typeof name !== 'string') {
            throw TypeError('name must be a string');
        }
        _this.add_attr({
            name: name,
            id: Utilities_1.guid(name),
            parent: new SpinalNodePointer_1.SpinalNodePointer(parent, true),
            contextIds: new SpinalMap_1.SpinalMap()
        });
        return _this;
    }
    /**
     * Shortcut to id.
     * @returns {spinal.Str} Id of the relation
     * @memberof BaseSpinalRelation
     */
    BaseSpinalRelation.prototype.getId = function () {
        return this.id;
    };
    /**
     * Returns the name of the relation.
     * @returns {spinal.Str} Name of the relation
     * @memberof BaseSpinalRelation
     */
    BaseSpinalRelation.prototype.getName = function () {
        return this.name;
    };
    /**
     * Returns the parent of the relation.
     * @returns {Promise<SpinalNode<spinal.Model>>} Returns a promise where the resolve is the parent
     * @memberof BaseSpinalRelation
     */
    BaseSpinalRelation.prototype.getParent = function () {
        return this.parent.load();
    };
    /**
     * Adds an id to the context ids of the relation.
     * @param {string} id Id of the context
     * @throws {TypeError} If the id is not a string
     * @memberof BaseSpinalRelation
     */
    BaseSpinalRelation.prototype.addContextId = function (id) {
        if (typeof id !== 'string') {
            throw TypeError('id must be a string');
        }
        if (!this.contextIds.has(id)) {
            this.contextIds.setElement(id, new spinal_core_connectorjs_type_1.Val(0));
        }
    };
    /**
     * Returns a list of the contexts the relation is associated to.
     * @returns {Array<string>} A list of ids of the associated contexts
     * @memberof BaseSpinalRelation
     */
    BaseSpinalRelation.prototype.getContextIds = function () {
        return this.contextIds.keys();
    };
    /**
     * Returns true if the relation belongs to the context.
     * @param {SpinalContext<T>} context The context that might own the node
     * @returns {boolean} A boolean
     * @throws {TypeError} If the context is not a SpinalContext
     * @memberof BaseSpinalRelation
     */
    BaseSpinalRelation.prototype.belongsToContext = function (context) {
        if (!(context instanceof __1.SpinalContext)) {
            throw TypeError('context must be a SpinalContext');
        }
        return this.contextIds.has(context.getId().get());
    };
    /**
     * Removes children from the relation.
     * @param {Array<SpinalNode<spinal.Model>>} [nodesToDelete=[]] Childs to remove
     * @returns {Promise<void>} An empty promise
     * @throws {TypeError} If nodes is not an array or omitted
     * @throws {Error} If one of the nodes is not a child
     * @memberof BaseSpinalRelation
     */
    BaseSpinalRelation.prototype.removeChildren = function (nodesToDelete) {
        if (nodesToDelete === void 0) { nodesToDelete = []; }
        return __awaiter(this, void 0, void 0, function () {
            var e_1, _a, nodes, promises, nodes_1, nodes_1_1, node, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        nodes = nodesToDelete;
                        promises = [];
                        if (!Array.isArray(nodes)) {
                            throw TypeError('node must be an array');
                        }
                        if (!(nodes.length === 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getChildren()];
                    case 1:
                        nodes = _c.sent();
                        _c.label = 2;
                    case 2:
                        try {
                            for (nodes_1 = __values(nodes), nodes_1_1 = nodes_1.next(); !nodes_1_1.done; nodes_1_1 = nodes_1.next()) {
                                node = nodes_1_1.value;
                                promises.push(this.removeChild(node));
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (nodes_1_1 && !nodes_1_1.done && (_a = nodes_1["return"])) _a.call(nodes_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        _c.label = 3;
                    case 3:
                        _c.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, Promise.all(promises)];
                    case 4:
                        _c.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        _b = _c.sent();
                        throw Error('Could not remove all nodes');
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Removes the relation from the graph.
     * @returns {Promise<void>} An empty promise
     * @memberof BaseSpinalRelation
     */
    BaseSpinalRelation.prototype.removeFromGraph = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            this._removeFromParent(),
                            this.removeChildren(),
                        ])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Removes the relation from the parent.
     * @returns {Promise<void>} An empty promise
     * @private
     * @memberof BaseSpinalRelation
     */
    BaseSpinalRelation.prototype._removeFromParent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var parent, relationMap;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getParent()];
                    case 1:
                        parent = _a.sent();
                        relationMap = parent._getChildrenType(this.getType());
                        relationMap["delete"](this.getName().get());
                        this.parent.unset();
                        return [2 /*return*/];
                }
            });
        });
    };
    return BaseSpinalRelation;
}(spinal_core_connectorjs_type_1.Model));
exports.BaseSpinalRelation = BaseSpinalRelation;
spinal_core_connectorjs_type_1.spinalCore.register_models([BaseSpinalRelation]);
exports["default"] = BaseSpinalRelation;
//# sourceMappingURL=BaseSpinalRelation.js.map