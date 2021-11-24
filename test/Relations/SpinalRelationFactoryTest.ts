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
  SPINAL_RELATION_PTR_LST_TYPE, SpinalRelationFactory
} from '../../src';

import * as assert from 'assert';
import "mocha"

const DEFAULT_NODE = new SpinalNode();
const DEFAULT_RELATION_NAME = 'duh';

describe('SpinalRelationFactory', () => {
  describe('How to use getNewRelation', () => {
    it('should return a SpinalRelationRef', () => {
      const rel = SpinalRelationFactory
        .getNewRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);

      assert(rel instanceof SpinalRelationRef);
    });

    it('should return a SpinalRelationLstPtr', () => {
      const rel = SpinalRelationFactory
        .getNewRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME, SPINAL_RELATION_LST_PTR_TYPE);

      assert(rel instanceof SpinalRelationLstPtr);
    });

    it('should return a SpinalRelationPtrLst', () => {
      const rel = SpinalRelationFactory
        .getNewRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME, SPINAL_RELATION_PTR_LST_TYPE);

      assert(rel instanceof SpinalRelationPtrLst);
    });

    it('should throw an error if the type is invalid', () => {
      assert.throws(() => {
        SpinalRelationFactory
          .getNewRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME, <any>-1);
      }, Error);
    });
  });
});
