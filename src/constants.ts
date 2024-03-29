/*
 * Copyright 2021 SpinalCom - www.spinalcom.com
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

export const SPINAL_RELATION_TYPE = 'Ref';
export const SPINAL_RELATION_LST_PTR_TYPE = 'LstPtr';
export const SPINAL_RELATION_PTR_LST_TYPE = 'PtrLst';
export const RELATION_TYPE_LIST = [
  SPINAL_RELATION_TYPE,
  SPINAL_RELATION_LST_PTR_TYPE,
  SPINAL_RELATION_PTR_LST_TYPE,
];
export const HAS_CONTEXT_RELATION_NAME = 'hasContext';



// EVENT RELATION
export const ADD_CHILD_EVENT = 'addChild';
export const ADD_CHILD_IN_CONTEXT_EVENT = 'addChildInContext';
export const REMOVE_CHILD_EVENT = 'removeChild';
export const REMOVE_CHILDREN_EVENT = 'removeChildren';