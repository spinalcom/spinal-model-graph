"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const SpinalNode_1 = require("./Nodes/SpinalNode");
const BaseSpinalRelation_1 = require("./Relations/BaseSpinalRelation");
/**
 * Wrapper over SpinalNodePointer containing some information about the pointed element
 * @class SpinalNodePointer
 * @extends {Model}
 * @template T extends spinal.Model
 */
class SpinalNodePointer extends spinal_core_connectorjs_type_1.Model {
    /**
     * Constructor for the SpinalNodePointer class.
     * @param {T} element Element to wich the SpinalNodePointer will point
     * @memberof SpinalNodePointer
     */
    constructor(element) {
        super();
        if (spinal_core_connectorjs_type_1.FileSystem._sig_server === false)
            return;
        this.add_attr({
            ptr: new spinal_core_connectorjs_type_1.Ptr(0),
            info: {},
        });
        this.setElement(element);
    }
    /**
     * Sets pointer to point to an element.
     * @param {T} element Element to point to
     * @throws {TypeError} If the element is not a Model
     * @memberof SpinalNodePointer
     */
    setElement(element) {
        if (!(element instanceof spinal_core_connectorjs_type_1.Model)) {
            throw TypeError('The pointed value must be a Model');
        }
        if (element instanceof SpinalNode_1.SpinalNode || element instanceof BaseSpinalRelation_1.BaseSpinalRelation) {
            this.info.mod_attr('pointedId', element.getId());
            this.info.mod_attr('pointedType', element.getType());
        }
        this.ptr.set(element);
    }
    /**
     * Loads the model to which the pointer is pointing.
     * @returns {Promise<T>} The model to which the pointer is pointing
     * @memberof SpinalNodePointer
     */
    load() {
        return new Promise((resolve) => {
            this.ptr.load(resolve);
        });
    }
    /**
     * Unsets the pointer. The pointer shouldn't be used after that.
     * @memberof SpinalNodePointer
     */
    unset() {
        this.info.rem_attr('pointedId');
        this.info.rem_attr('pointedType');
        this.ptr.set(0);
    }
    /**
     * Returns the id of the pointed element.
     * @returns {spinal.Str}  Id of the pointed element
     * @memberof SpinalNodePointer
     */
    getId() {
        return this.info.pointedId;
    }
    /**
     * This function returns the type of the pointed element.
     * @returns {spinal.Str} Type of the pointed element
     * @memberof SpinalNodePointer
     */
    getType() {
        return this.info.pointedType;
    }
}
exports.SpinalNodePointer = SpinalNodePointer;
spinal_core_connectorjs_type_1.spinalCore.register_models([SpinalNodePointer]);
exports.default = SpinalNodePointer;
//# sourceMappingURL=SpinalNodePointer.js.map