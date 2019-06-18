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
exports.__esModule = true;
var spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
var BaseSpinalRelation_1 = require("./BaseSpinalRelation");
var SpinalRelationFactory_1 = require("./SpinalRelationFactory");
var index_1 = require("../index");
var SpinalNodePointer_1 = require("../SpinalNodePointer");
/**
 * Relation where the children are in Lst of Ptr.
 * @extends BaseSpinalRelation
 * @property {spinal.Str} name
 * @property {spinal.Str} id
 * @property {SpinalNodePointer<SpinalNode>} parent
 * @property {SpinalMap<spinal.Val>} contextIds
 * @property {spinal.Lst<SpinalNodePointer<SpinalNode>>} children
 */
var SpinalRelationLstPtr = /** @class */ (function (_super) {
    __extends(SpinalRelationLstPtr, _super);
    /**
     * Constructor for the SpinalRelationLstPtr class.
     * @param {SpinalNodeAny} parent Parent of the relation
     * @param {string} name Name of the relation
     * @throws {TypeError} If the parent is not a node
     * @throws {TypeError} If the name is not a string
     * @memberof SpinalRelationLstPtr
     */
    function SpinalRelationLstPtr(parent, name) {
        var _this = _super.call(this, parent, name) || this;
        if (spinal_core_connectorjs_type_1.FileSystem._sig_server === false)
            return _this;
        _this.add_attr({
            children: new spinal_core_connectorjs_type_1.Lst()
        });
        return _this;
    }
    /**
     * Retrieves all the ids of the children of the relation and return them inside an array.
     * @returns {string[]} Array containing all the children ids of the relation
     * @memberof SpinalRelationLstPtr
     */
    SpinalRelationLstPtr.prototype.getChildrenIds = function () {
        var res = [];
        for (var i = 0; i < this.children.length; i += 1) {
            res.push(this.children[i].getId().get());
        }
        return res;
    };
    /**
   * returns the number of children of the relation.
   * @returns {number}
   * @memberof SpinalRelationLstPtr
   */
    SpinalRelationLstPtr.prototype.getNbChildren = function () {
        return this.children.length;
    };
    /**
     * Return all the children of the relation.
     * @returns {Promise<SpinalNode[]>} The children of the relation
     * @memberof SpinalRelationLstPtr
     */
    SpinalRelationLstPtr.prototype.getChildren = function () {
        var promises = [];
        for (var i = 0; i < this.children.length; i += 1) {
            var ptr = this.children[i];
            promises.push(ptr.load());
        }
        return Promise.all(promises);
    };
    /**
     * Return all the children of the relation associated to a certain context.
     * @returns {Promise<SpinalNodeAny[]>} The children of the relation
     * @throws {TypeError} If the context is not a SpinalContext
     * @memberof SpinalRelationLstPtr
     */
    SpinalRelationLstPtr.prototype.getChildrenInContext = function (context) {
        return __awaiter(this, void 0, void 0, function () {
            var promises, i, ptr, children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promises = [];
                        if (!(context instanceof index_1.SpinalContext)) {
                            return [2 /*return*/, Promise.reject(TypeError('context must be a SpinalContext'))];
                        }
                        for (i = 0; i < this.children.length; i += 1) {
                            ptr = this.children[i];
                            promises.push(ptr.load());
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        children = _a.sent();
                        return [2 /*return*/, children.filter(function (child) { return child.belongsToContext(context); })];
                }
            });
        });
    };
    /**
     * Returns the type of the relation.
     * @returns {string} Type of the relation
     * @memberof SpinalRelationLstPtr
     */
    SpinalRelationLstPtr.prototype.getType = function () {
        return SpinalRelationFactory_1.SPINAL_RELATION_LST_PTR_TYPE;
    };
    /**
     * Adds a child to the relation.
     * @template T extends spinal.Model = Node Element Type
     * @param {(T|SpinalNode<T>)} node Node or model to add
     * @throws {TypeError} If the node is not a Model
     * @throws {Error} If the node is already a child of the relation
     * @returns {Promise<SpinalNode<T>>} Promise containing the node that was added
     * @memberof SpinalRelationLstPtr
     */
    SpinalRelationLstPtr.prototype.addChild = function (node) {
        return __awaiter(this, void 0, void 0, function () {
            var nodeCreate, tmpNodeCreate;
            return __generator(this, function (_a) {
                nodeCreate = node;
                if (!(node instanceof spinal_core_connectorjs_type_1.Model)) {
                    throw new Error('Cannot add a child witch is not an instance of SpinalNode or Model.');
                }
                else if (!(node instanceof index_1.SpinalNode)) {
                    nodeCreate = new index_1.SpinalNode(undefined, undefined, node);
                }
                if (this.getChildrenIds().indexOf(nodeCreate.getId().get()) !== -1) {
                    throw new Error('Cannot add a child twice to the same relation.');
                }
                tmpNodeCreate = nodeCreate;
                tmpNodeCreate._addParent(this);
                this.children.push(new SpinalNodePointer_1.SpinalNodePointer(tmpNodeCreate));
                return [2 /*return*/, tmpNodeCreate];
            });
        });
    };
    /**
     * Removes a child from the relation.
     * @param {SpinalNodeAny} node Child to remove
     * @returns {Promise<void>} An empty promise
     * @throws {Error} If the given node is not a child
     * @memberof SpinalRelationLstPtr
     */
    SpinalRelationLstPtr.prototype.removeChild = function (node) {
        var found = false;
        for (var i = 0; i < this.children.length; i += 1) {
            if (this.children[i].getId() === node.getId()) {
                this.children.splice(i, 1);
                found = true;
                break;
            }
        }
        if (!found) {
            return Promise.reject(Error('The node is not a child'));
        }
        node._removeParent(this);
        return Promise.resolve();
    };
    return SpinalRelationLstPtr;
}(BaseSpinalRelation_1.BaseSpinalRelation));
exports.SpinalRelationLstPtr = SpinalRelationLstPtr;
spinal_core_connectorjs_type_1.spinalCore.register_models([SpinalRelationLstPtr]);
exports["default"] = SpinalRelationLstPtr;
//# sourceMappingURL=SpinalRelationLstPtr.js.map