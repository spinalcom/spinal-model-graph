"use strict";
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
var SpinalRelationRef_1 = require("./SpinalRelationRef");
var SpinalRelationLstPtr_1 = require("./SpinalRelationLstPtr");
var SpinalRelationPtrLst_1 = require("./SpinalRelationPtrLst");
var spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
var SPINAL_RELATION_TYPE = 'Ref';
exports.SPINAL_RELATION_TYPE = SPINAL_RELATION_TYPE;
var SPINAL_RELATION_LST_PTR_TYPE = 'LstPtr';
exports.SPINAL_RELATION_LST_PTR_TYPE = SPINAL_RELATION_LST_PTR_TYPE;
var SPINAL_RELATION_PTR_LST_TYPE = 'PtrLst';
exports.SPINAL_RELATION_PTR_LST_TYPE = SPINAL_RELATION_PTR_LST_TYPE;
var RELATION_TYPE_LIST = [
    SPINAL_RELATION_TYPE,
    SPINAL_RELATION_LST_PTR_TYPE,
    SPINAL_RELATION_PTR_LST_TYPE,
];
exports.RELATION_TYPE_LIST = RELATION_TYPE_LIST;
/**
 * Namespace for general relation functions.
 * @abstract
 */
var SpinalRelationFactory = /** @class */ (function () {
    function SpinalRelationFactory() {
    }
    /**
     * Create a new relation of relationType with the relationName.
     * @param {SpinalNode} parent Parent of the relation
     * @param {string} relationName Name of the relation
     * @param {string} relationType Type of the relation
     * @returns {SpinalRelationRef | SpinalRelationLstPtr | SpinalRelationPtrLst} A new SpinalRelation
     * @static
     * @memberof SpinalRelationFactory
     */
    SpinalRelationFactory.getNewRelation = function (parent, relationName, relationType) {
        var relation;
        switch (relationType) {
            case SPINAL_RELATION_TYPE:
                relation = new SpinalRelationRef_1.SpinalRelationRef(parent, relationName);
                break;
            case SPINAL_RELATION_LST_PTR_TYPE:
                relation = new SpinalRelationLstPtr_1.SpinalRelationLstPtr(parent, relationName);
                break;
            case SPINAL_RELATION_PTR_LST_TYPE:
                relation = new SpinalRelationPtrLst_1.SpinalRelationPtrLst(parent, relationName);
                break;
            default:
                throw new Error('Unknown relationType');
        }
        return relation;
    };
    return SpinalRelationFactory;
}());
exports.SpinalRelationFactory = SpinalRelationFactory;
spinal_core_connectorjs_type_1.spinalCore.register_models([SpinalRelationFactory]);
//# sourceMappingURL=SpinalRelationFactory.js.map