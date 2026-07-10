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
Object.defineProperty(exports, "__esModule", { value: true });
exports.REMOVE_CHILDREN_EVENT = exports.REMOVE_CHILD_EVENT = exports.ADD_CHILD_IN_CONTEXT_EVENT = exports.ADD_CHILD_EVENT = exports.SPINAL_RELATION_THAT_CAN_UPGRADE = exports.LST_PTR_LST_UPGRADE_SIZE = exports.LST_PTR_LST_COMPACT_TRIGGER = exports.LST_PTR_LST_SIZE = exports.HAS_CONTEXT_RELATION_NAME = exports.RELATION_TYPE_LIST = exports.SPINAL_RELATION_LST_PTR_LST_TYPE = exports.SPINAL_RELATION_PTR_LST_TYPE = exports.SPINAL_RELATION_LST_PTR_TYPE = exports.SPINAL_RELATION_TYPE = void 0;
exports.SPINAL_RELATION_TYPE = 'Ref';
exports.SPINAL_RELATION_LST_PTR_TYPE = 'LstPtr';
exports.SPINAL_RELATION_PTR_LST_TYPE = 'PtrLst';
exports.SPINAL_RELATION_LST_PTR_LST_TYPE = 'LstPtrLst';
exports.RELATION_TYPE_LIST = [
    exports.SPINAL_RELATION_TYPE,
    exports.SPINAL_RELATION_LST_PTR_TYPE,
    exports.SPINAL_RELATION_PTR_LST_TYPE,
    exports.SPINAL_RELATION_LST_PTR_LST_TYPE,
];
exports.HAS_CONTEXT_RELATION_NAME = 'hasContext';
exports.LST_PTR_LST_SIZE = 200;
exports.LST_PTR_LST_COMPACT_TRIGGER = Math.floor(exports.LST_PTR_LST_SIZE * 0.66);
exports.LST_PTR_LST_UPGRADE_SIZE = exports.LST_PTR_LST_SIZE;
exports.SPINAL_RELATION_THAT_CAN_UPGRADE = [
    exports.SPINAL_RELATION_LST_PTR_TYPE,
    exports.SPINAL_RELATION_PTR_LST_TYPE,
];
// EVENT RELATION
exports.ADD_CHILD_EVENT = 'addChild';
exports.ADD_CHILD_IN_CONTEXT_EVENT = 'addChildInContext';
exports.REMOVE_CHILD_EVENT = 'removeChild';
exports.REMOVE_CHILDREN_EVENT = 'removeChildren';
//# sourceMappingURL=constants.js.map