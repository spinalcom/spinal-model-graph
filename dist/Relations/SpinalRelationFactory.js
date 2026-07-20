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
exports.SpinalRelationFactory = exports.RELATION_TYPE_LIST = exports.SPINAL_RELATION_LST_PTR_LST_TYPE = exports.SPINAL_RELATION_PTR_LST_TYPE = exports.SPINAL_RELATION_LST_PTR_TYPE = exports.SPINAL_RELATION_TYPE = void 0;
const constants_1 = require("../constants");
Object.defineProperty(exports, "RELATION_TYPE_LIST", { enumerable: true, get: function () { return constants_1.RELATION_TYPE_LIST; } });
Object.defineProperty(exports, "SPINAL_RELATION_LST_PTR_TYPE", { enumerable: true, get: function () { return constants_1.SPINAL_RELATION_LST_PTR_TYPE; } });
Object.defineProperty(exports, "SPINAL_RELATION_PTR_LST_TYPE", { enumerable: true, get: function () { return constants_1.SPINAL_RELATION_PTR_LST_TYPE; } });
Object.defineProperty(exports, "SPINAL_RELATION_LST_PTR_LST_TYPE", { enumerable: true, get: function () { return constants_1.SPINAL_RELATION_LST_PTR_LST_TYPE; } });
Object.defineProperty(exports, "SPINAL_RELATION_TYPE", { enumerable: true, get: function () { return constants_1.SPINAL_RELATION_TYPE; } });
const SpinalRelationLstPtr_1 = require("./SpinalRelationLstPtr");
const SpinalRelationPtrLst_1 = require("./SpinalRelationPtrLst");
const SpinalRelationRef_1 = require("./SpinalRelationRef");
const SpinalRelationLstPtrLst_1 = require("./SpinalRelationLstPtrLst");
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
     * @returns {SpinalRelationRef | SpinalRelationLstPtr | SpinalRelationPtrLst | SpinalRelationLstPtrLst} A new SpinalRelation
     */
    static getNewRelation(parent, relationName, relationType) {
        switch (relationType) {
            case constants_1.SPINAL_RELATION_TYPE:
                return new SpinalRelationRef_1.SpinalRelationRef(parent, relationName);
            case constants_1.SPINAL_RELATION_LST_PTR_TYPE:
                return new SpinalRelationLstPtr_1.SpinalRelationLstPtr(parent, relationName);
            case constants_1.SPINAL_RELATION_LST_PTR_LST_TYPE:
                return new SpinalRelationLstPtrLst_1.SpinalRelationLstPtrLst(parent, relationName);
            case constants_1.SPINAL_RELATION_PTR_LST_TYPE:
                return new SpinalRelationPtrLst_1.SpinalRelationPtrLst(parent, relationName);
            default:
                throw new Error('Unknown relationType');
        }
    }
    /**
     * @param {AnySpinalRelation} relation
     * @return {*}  {(relation is (SpinalRelationLstPtr | SpinalRelationPtrLst) & boolean)}
     */
    static canUpgradeRelation(relation) {
        const canUpgrade = constants_1.SPINAL_RELATION_THAT_CAN_UPGRADE.includes(relation.getType());
        const hasEnoughChildren = relation.getNbChildren() >= constants_1.LST_PTR_LST_UPGRADE_SIZE;
        return canUpgrade && hasEnoughChildren;
    }
    /**
     * @param {(SpinalRelationLstPtr | SpinalRelationPtrLst)} relation
     * @param {SpinalNode} nodeParent
     * @return {*}  {Promise<SpinalRelationLstPtrLst>}
     */
    static upgradeRelationToLstPtrLst(relation, nodeParent) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(relation instanceof SpinalRelationLstPtr_1.SpinalRelationLstPtr) &&
                !(relation instanceof SpinalRelationPtrLst_1.SpinalRelationPtrLst)) {
                throw new Error('Cannot upgrade this type of relation');
            }
            if (typeof relation.isInUpgradeProcess !== 'undefined') {
                return relation.isInUpgradeProcess;
            }
            relation.isInUpgradeProcess =
                SpinalRelationFactory._upgradeRelationToLstPtrLst(relation, nodeParent);
            return relation.isInUpgradeProcess;
        });
    }
    static _upgradeRelationToLstPtrLst(relation, nodeParent) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, e_1, _b, _c;
            const newRelation = nodeParent._createRelation(relation.name.get(), constants_1.SPINAL_RELATION_LST_PTR_LST_TYPE);
            for (const contextId of relation.getContextIds()) {
                newRelation.addContextId(contextId);
            }
            const promiseArray = [];
            try {
                // use getChildren an not getChidlrenGen because an interator may cause errors
                for (var _d = true, _e = __asyncValues(relation.getChildrenGen(0, false)), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const child = _c;
                    promiseArray.push(newRelation.addChild(child));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                }
                finally { if (e_1) throw e_1.error; }
            }
            promiseArray.push(relation.removeFromGraph());
            yield Promise.all(promiseArray);
            return newRelation;
        });
    }
}
exports.SpinalRelationFactory = SpinalRelationFactory;
//# sourceMappingURL=SpinalRelationFactory.js.map