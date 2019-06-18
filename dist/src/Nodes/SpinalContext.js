"use strict";
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
exports.__esModule = true;
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
var SpinalNode_1 = require("./SpinalNode");
var spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
var __1 = require("..");
var Utilities_1 = require("../Utilities");
/**
 * A SpinalContext is the statring node of a part of the graph.
 * @class SpinalContext
 * @extends {SpinalNode<T>}
 * @template T
 */
var SpinalContext = /** @class */ (function (_super) {
    __extends(SpinalContext, _super);
    /**
     * Constructor for the SpinalContext class.
     * @param {String} [name="undefined"] Name of the context
     * @param {String} [type="SpinalContext"] Type of the context, usually unused
     * @param {SpinalNode | Model} [element] Element of the context
     * @throws {TypeError} If the element is not a Model
     */
    function SpinalContext(name, type, element) {
        if (name === void 0) { name = 'undefined'; }
        if (type === void 0) { type = 'SpinalContext'; }
        var _this = _super.call(this, name, type, element) || this;
        if (spinal_core_connectorjs_type_1.FileSystem._sig_server === false)
            return _this;
        _this.info.id.set(Utilities_1.guid(_this.constructor.name));
        return _this;
    }
    /**
     * Adds a child with a SpinalRelationLstPtrType.
     * @override
     * @param {SpinalNode | Model} child Node to add as child
     * @param {String} relationName Name of the relation
     * @param {String} [relationType=SPINAL_RELATION_PTR_LST_TYPE]
     * This parameter is here only to properly override the parent method
     * @returns {Promise<SpinalNode>} The child node in a promise
     * @throws {TypeError} If the child is not a model
     * @throws {TypeError} If the relation name is not a string
     */
    SpinalContext.prototype.addChild = function (child, relationName, relationType) {
        if (relationType === void 0) { relationType = __1.SPINAL_RELATION_PTR_LST_TYPE; }
        return _super.prototype.addChild.call(this, child, relationName, __1.SPINAL_RELATION_PTR_LST_TYPE);
    };
    /**
     * Adds a child with a SpinalRelationLstPtrType and notices
     * the context if a new relation was created.
     * @override
     * @param {SpinalNode | Model} child Node to add as child
     * @param {String} relationName Name of the relation
     * @param {String} [relationType=SPINAL_RELATION_PTR_LST_TYPE]
     * This parameter is here only to properly override the parent method
     * @param {SpinalContext} context Context to update, usually unused
     * @returns {Promise<SpinalNode>} The child node in a promise
     */
    SpinalContext.prototype.addChildInContext = function (child, relationName, relationType, context) {
        if (relationType === void 0) { relationType = __1.SPINAL_RELATION_PTR_LST_TYPE; }
        if (context === void 0) { context = this; }
        return _super.prototype.addChildInContext.call(this, child, relationName, __1.SPINAL_RELATION_PTR_LST_TYPE, context);
    };
    /**
     * Return the children of the node that are registered in the context
     * @override
     * @param {SpinalContext} [context=this] Context to use for the search, this by default
     * @returns {Promise<Array<SpinalNode>>} The children that were found
     */
    SpinalContext.prototype.getChildrenInContext = function (context) {
        if (context === void 0) { context = this; }
        return _super.prototype.getChildrenInContext.call(this, context);
    };
    return SpinalContext;
}(SpinalNode_1.SpinalNode));
exports.SpinalContext = SpinalContext;
spinal_core_connectorjs_type_1.spinalCore.register_models([SpinalContext]);
exports["default"] = SpinalContext;
//# sourceMappingURL=SpinalContext.js.map