import {
  SpinalRelationRef,
  SpinalRelationPtrLst,
  SpinalNode,
  SPINAL_RELATION_LST_PTR_TYPE,
  SpinalRelationLstPtr,
  SPINAL_RELATION_TYPE,
  SPINAL_RELATION_PTR_LST_TYPE,SpinalRelationFactory
} from '../../src';

import * as assert from 'assert';

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
      },            Error);
    });
  });
});
