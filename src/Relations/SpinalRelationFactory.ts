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

import type { Model } from 'spinal-core-connectorjs';
import {
  RELATION_TYPE_LIST,
  SPINAL_RELATION_LST_PTR_TYPE,
  SPINAL_RELATION_PTR_LST_TYPE,
  SPINAL_RELATION_LST_PTR_LST_TYPE,
  SPINAL_RELATION_TYPE,
  SPINAL_RELATION_THAT_CAN_UPGRADE,
  LST_PTR_LST_UPGRADE_SIZE,
} from '../constants';
import type { SpinalNode } from '../Nodes/SpinalNode';
import { SpinalRelationLstPtr } from './SpinalRelationLstPtr';
import { SpinalRelationPtrLst } from './SpinalRelationPtrLst';
import { SpinalRelationRef } from './SpinalRelationRef';
import { SpinalRelationLstPtrLst } from './SpinalRelationLstPtrLst';
import type { AnySpinalRelation } from '../interfaces/AnySpinalRelation';
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
  static getNewRelation(
    parent: SpinalNode<Model>,
    relationName: string,
    relationType: string
  ):
    | SpinalRelationRef
    | SpinalRelationLstPtr
    | SpinalRelationPtrLst
    | SpinalRelationLstPtrLst {
    switch (relationType) {
      case SPINAL_RELATION_TYPE:
        return new SpinalRelationRef(parent, relationName);
      case SPINAL_RELATION_LST_PTR_TYPE:
        return new SpinalRelationLstPtr(parent, relationName);
      case SPINAL_RELATION_LST_PTR_LST_TYPE:
        return new SpinalRelationLstPtrLst(parent, relationName);
      case SPINAL_RELATION_PTR_LST_TYPE:
        return new SpinalRelationPtrLst(parent, relationName);
      default:
        throw new Error('Unknown relationType');
    }
  }

  /**
   * @param {AnySpinalRelation} relation
   * @return {*}  {(relation is (SpinalRelationLstPtr | SpinalRelationPtrLst) & boolean)}
   */
  static canUpgradeRelation(
    relation: AnySpinalRelation
  ): relation is (SpinalRelationLstPtr | SpinalRelationPtrLst) & boolean {
    const canUpgrade = SPINAL_RELATION_THAT_CAN_UPGRADE.includes(
      relation.getType() as any
    );
    const hasEnoughChildren =
      relation.getNbChildren() >= LST_PTR_LST_UPGRADE_SIZE;
    return canUpgrade && hasEnoughChildren;
  }

  /**
   * @param {(SpinalRelationLstPtr | SpinalRelationPtrLst)} relation
   * @param {SpinalNode} nodeParent
   * @return {*}  {Promise<SpinalRelationLstPtrLst>}
   */
  static async upgradeRelationToLstPtrLst(
    relation: SpinalRelationLstPtr | SpinalRelationPtrLst,
    nodeParent: SpinalNode
  ): Promise<SpinalRelationLstPtrLst> {
    if (
      !(relation instanceof SpinalRelationLstPtr) &&
      !(relation instanceof SpinalRelationPtrLst)
    ) {
      throw new Error('Cannot upgrade this type of relation');
    }
    if (typeof relation.isInUpgradeProcess !== 'undefined') {
      return relation.isInUpgradeProcess;
    }
    relation.isInUpgradeProcess =
      SpinalRelationFactory._upgradeRelationToLstPtrLst(relation, nodeParent);
    return relation.isInUpgradeProcess;
  }

  private static async _upgradeRelationToLstPtrLst(
    relation: SpinalRelationLstPtr | SpinalRelationPtrLst,
    nodeParent: SpinalNode
  ): Promise<SpinalRelationLstPtrLst> {
    const newRelation = nodeParent._createRelation(
      relation.name.get(),
      SPINAL_RELATION_LST_PTR_LST_TYPE
    );
    for (const contextId of relation.getContextIds()) {
      newRelation.addContextId(contextId);
    }

    const promiseArray: Promise<any>[] = [];
    // use getChildren an not getChidlrenGen because an interator may cause errors
    for await (const child of relation.getChildrenGen(0, false)) {
      promiseArray.push(newRelation.addChild(child));
    }
    promiseArray.push(relation.removeFromGraph());
    await Promise.all(promiseArray);
    return newRelation as SpinalRelationLstPtrLst;
  }
}

export {
  SPINAL_RELATION_TYPE,
  SPINAL_RELATION_LST_PTR_TYPE,
  SPINAL_RELATION_PTR_LST_TYPE,
  SPINAL_RELATION_LST_PTR_LST_TYPE,
  RELATION_TYPE_LIST,
  SpinalRelationFactory,
};
