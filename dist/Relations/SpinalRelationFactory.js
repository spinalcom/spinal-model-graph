"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpinalRelationFactory = exports.RELATION_TYPE_LIST = exports.SPINAL_RELATION_PTR_LST_TYPE = exports.SPINAL_RELATION_LST_PTR_TYPE = exports.SPINAL_RELATION_TYPE = void 0;
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
const constants_1 = require("../constants");
Object.defineProperty(exports, "RELATION_TYPE_LIST", { enumerable: true, get: function () { return constants_1.RELATION_TYPE_LIST; } });
Object.defineProperty(exports, "SPINAL_RELATION_LST_PTR_TYPE", { enumerable: true, get: function () { return constants_1.SPINAL_RELATION_LST_PTR_TYPE; } });
Object.defineProperty(exports, "SPINAL_RELATION_PTR_LST_TYPE", { enumerable: true, get: function () { return constants_1.SPINAL_RELATION_PTR_LST_TYPE; } });
Object.defineProperty(exports, "SPINAL_RELATION_TYPE", { enumerable: true, get: function () { return constants_1.SPINAL_RELATION_TYPE; } });
const SpinalRelationLstPtr_1 = require("./SpinalRelationLstPtr");
const SpinalRelationPtrLst_1 = require("./SpinalRelationPtrLst");
const SpinalRelationRef_1 = require("./SpinalRelationRef");
/**
 * Namespace for general relation functions.
 * @abstract
 */
class SpinalRelationFactory {
    /**
     * Create a new relation of relationType with the relationName.
     * @param {SpinalNode} parent Parent of the relation
     * @param {string} relationName Name of the relation
     * @param {string} relationType Type of the relation
     * @returns {SpinalRelationRef | SpinalRelationLstPtr | SpinalRelationPtrLst} A new SpinalRelation
     * @static
     * @memberof SpinalRelationFactory
     */
    static getNewRelation(parent, relationName, relationType) {
        switch (relationType) {
            case constants_1.SPINAL_RELATION_TYPE:
                return new SpinalRelationRef_1.SpinalRelationRef(parent, relationName);
            case constants_1.SPINAL_RELATION_LST_PTR_TYPE:
                return new SpinalRelationLstPtr_1.SpinalRelationLstPtr(parent, relationName);
            case constants_1.SPINAL_RELATION_PTR_LST_TYPE:
                return new SpinalRelationPtrLst_1.SpinalRelationPtrLst(parent, relationName);
            default:
                throw new Error('Unknown relationType');
        }
    }
}
exports.SpinalRelationFactory = SpinalRelationFactory;
spinal_core_connectorjs_type_1.spinalCore.register_models([SpinalRelationFactory]);
//# sourceMappingURL=SpinalRelationFactory.js.map