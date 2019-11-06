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
var spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
var SpinalNode_1 = require("./Nodes/SpinalNode");
var BaseSpinalRelation_1 = require("./Relations/BaseSpinalRelation");
/**
 * Wrapper over SpinalNodePointer containing some information about the pointed element
 * @class SpinalNodePointer
 * @extends {Model}
 * @template T extends spinal.Model
 */
var SpinalNodePointer = /** @class */ (function (_super) {
    __extends(SpinalNodePointer, _super);
    /**
     * Constructor for the SpinalNodePointer class.
     * @param {T} element Element to wich the SpinalNodePointer will point
     * @param blockRights determine if the pointer is a pbr
     * @memberof SpinalNodePointer
     */
    function SpinalNodePointer(element, blockRights) {
        if (blockRights === void 0) { blockRights = false; }
        var _this = _super.call(this) || this;
        if (spinal_core_connectorjs_type_1.FileSystem._sig_server === false)
            return _this;
        _this.add_attr({
            ptr: blockRights ? new spinal_core_connectorjs_type_1.Pbr() : new spinal_core_connectorjs_type_1.Ptr(),
            info: {}
        });
        _this.setElement(element);
        return _this;
    }
    /**
     * Sets pointer to point to an element.
     * @param {T} element Element to point to
     * @throws {TypeError} If the element is not a Model
     * @memberof SpinalNodePointer
     */
    SpinalNodePointer.prototype.setElement = function (element) {
        if (!(element instanceof spinal_core_connectorjs_type_1.Model)) {
            throw TypeError('The pointed value must be a Model');
        }
        if (element instanceof SpinalNode_1.SpinalNode || element instanceof BaseSpinalRelation_1.BaseSpinalRelation) {
            this.info.mod_attr('pointedId', element.getId());
            this.info.mod_attr('pointedType', element.getType());
        }
        this.ptr.set(element);
    };
    /**
     * Loads the model to which the pointer is pointing.
     * @returns {Promise<T>} The model to which the pointer is pointing
     * @memberof SpinalNodePointer
     */
    SpinalNodePointer.prototype.load = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.ptr) {
                if (_this.ptr.data.model)
                    return resolve(_this.ptr.data.model);
                if (_this.ptr.data.value) {
                    if (typeof spinal_core_connectorjs_type_1.FileSystem._objects[_this.ptr.data.value] !== 'undefined') {
                        return resolve(spinal_core_connectorjs_type_1.FileSystem._objects[_this.ptr.data.value]);
                    }
                    if (typeof spinal_core_connectorjs_type_1.FileSystem._tmp_objects[_this.ptr.data.value] !== 'undefined') {
                        return resolve(spinal_core_connectorjs_type_1.FileSystem._tmp_objects[_this.ptr.data.value]);
                    }
                }
            }
            _this.ptr.load(resolve);
        });
    };
    /**
     * Unsets the pointer. The pointer shouldn't be used after that.
     * @memberof SpinalNodePointer
     */
    SpinalNodePointer.prototype.unset = function () {
        this.info.rem_attr('pointedId');
        this.info.rem_attr('pointedType');
        this.ptr.set(0);
    };
    /**
     * Returns the id of the pointed element.
     * @returns {spinal.Str}  Id of the pointed element
     * @memberof SpinalNodePointer
     */
    SpinalNodePointer.prototype.getId = function () {
        return this.info.pointedId;
    };
    /**
     * This function returns the type of the pointed element.
     * @returns {spinal.Str} Type of the pointed element
     * @memberof SpinalNodePointer
     */
    SpinalNodePointer.prototype.getType = function () {
        return this.info.pointedType;
    };
    return SpinalNodePointer;
}(spinal_core_connectorjs_type_1.Model));
exports.SpinalNodePointer = SpinalNodePointer;
spinal_core_connectorjs_type_1.spinalCore.register_models([SpinalNodePointer]);
exports["default"] = SpinalNodePointer;
//# sourceMappingURL=SpinalNodePointer.js.map