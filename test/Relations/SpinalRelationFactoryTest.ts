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

import {
  SpinalRelationRef,
  SpinalRelationPtrLst,
  SpinalNode,
  SPINAL_RELATION_LST_PTR_TYPE,
  SpinalRelationLstPtr,
  SPINAL_RELATION_TYPE,
  SPINAL_RELATION_PTR_LST_TYPE,
  SpinalRelationFactory,
  SpinalRelationLstPtrLst,
  SPINAL_RELATION_LST_PTR_LST_TYPE,
  SpinalContext,
} from '../../src';
import { describe, it, expect } from 'vitest';

const DEFAULT_NODE = new SpinalNode();
const DEFAULT_RELATION_NAME = 'duh';

describe('SpinalRelationFactory', () => {
  describe('How to use getNewRelation', () => {
    it('should return a SpinalRelationRef', () => {
      const rel = SpinalRelationFactory.getNewRelation(
        DEFAULT_NODE,
        DEFAULT_RELATION_NAME,
        SPINAL_RELATION_TYPE
      );

      expect(rel instanceof SpinalRelationRef).toBeTruthy();
    });

    it('should return a SpinalRelationLstPtr', () => {
      const rel = SpinalRelationFactory.getNewRelation(
        DEFAULT_NODE,
        DEFAULT_RELATION_NAME,
        SPINAL_RELATION_LST_PTR_TYPE
      );

      expect(rel instanceof SpinalRelationLstPtr).toBeTruthy();
    });

    it('should return a SpinalRelationPtrLst', () => {
      const rel = SpinalRelationFactory.getNewRelation(
        DEFAULT_NODE,
        DEFAULT_RELATION_NAME,
        SPINAL_RELATION_PTR_LST_TYPE
      );

      expect(rel instanceof SpinalRelationPtrLst).toBeTruthy();
    });

    it('should throw an error if the type is invalid', () => {
      expect(() => {
        SpinalRelationFactory.getNewRelation(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME,
          <any>-1
        );
      }).toThrow(Error);
    });
  });
  describe('How to use upgradeRelationToLstPtrLst', () => {
    it('should upgrade a SpinalRelationLstPtr to a SpinalRelationLstPtrLst', async () => {
      const node = new SpinalNode();
      const node2 = new SpinalNode();
      await node.addChild(node2, DEFAULT_RELATION_NAME, SPINAL_RELATION_LST_PTR_TYPE);
      const rel = node._getRelation(DEFAULT_RELATION_NAME);

      const upgradedRel = await SpinalRelationFactory.upgradeRelationToLstPtrLst(<any>rel, node);

      expect(upgradedRel instanceof SpinalRelationLstPtrLst).toBeTruthy();
    });
    it('should upgrade a SpinalRelationPtrLst to a SpinalRelationLstPtrLst', async () => {
      const node = new SpinalNode();
      const node2 = new SpinalNode();
      await node.addChild(node2, DEFAULT_RELATION_NAME, SPINAL_RELATION_PTR_LST_TYPE);
      const rel = node._getRelation(DEFAULT_RELATION_NAME);

      const upgradedRel = await SpinalRelationFactory.upgradeRelationToLstPtrLst(<any>rel, node);
      expect(upgradedRel instanceof SpinalRelationLstPtrLst).toBeTruthy();
    });
    it('should keep the context of the relation after upgrade', async () => {
      const node = new SpinalNode();
      const node2 = new SpinalNode();
      const context = new SpinalContext();
      await node.addChildInContext(node2, DEFAULT_RELATION_NAME, context);
      const rel = node._getRelation(DEFAULT_RELATION_NAME);
      const upgradedRel = await SpinalRelationFactory.upgradeRelationToLstPtrLst(<any>rel, node);
      expect(upgradedRel.getContextIds()).toEqual([context.getId().get()]);
    });
    it('should throw an error if the relation type cannot be upgraded', async () => {
      const node = new SpinalNode();
      const rel = SpinalRelationFactory.getNewRelation(
        node,
        DEFAULT_RELATION_NAME,
        SPINAL_RELATION_TYPE
      );

      await expect(async () => {
        await SpinalRelationFactory.upgradeRelationToLstPtrLst(<any>rel, node);
      }).rejects.toThrow(Error);
      const rel2 = SpinalRelationFactory.getNewRelation(
        node,
        DEFAULT_RELATION_NAME,
        SPINAL_RELATION_LST_PTR_LST_TYPE
      );
      await expect(async () => {
        await SpinalRelationFactory.upgradeRelationToLstPtrLst(<any>rel2, node);
      }).rejects.toThrow(Error);
    });


  });
});
