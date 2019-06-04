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

import { SpinalGraph } from './Nodes/SpinalGraph';
import { SpinalNode } from './Nodes/SpinalNode';
import { SpinalContext } from './Nodes/SpinalContext';
import { SpinalRelationRef } from './Relations/SpinalRelationRef';
import { SpinalRelationLstPtr } from './Relations/SpinalRelationLstPtr';
import { SpinalRelationPtrLst } from './Relations/SpinalRelationPtrLst';
import {
  SpinalRelationFactory,
  SPINAL_RELATION_TYPE,
  SPINAL_RELATION_LST_PTR_TYPE,
  SPINAL_RELATION_PTR_LST_TYPE,
} from './Relations/SpinalRelationFactory';

import { SpinalMap } from './SpinalMap';
import { SpinalNodePointer } from './SpinalNodePointer';
import { SpinalSet } from './SpinalSet';

export {
  SpinalGraph,
  SpinalNode,
  SpinalContext,
  SpinalRelationRef,
  SpinalRelationLstPtr,
  SpinalRelationPtrLst,
  SpinalRelationFactory,
  SPINAL_RELATION_TYPE,
  SPINAL_RELATION_LST_PTR_TYPE,
  SPINAL_RELATION_PTR_LST_TYPE,
  SpinalMap,
  SpinalNodePointer,
  SpinalSet,
};
