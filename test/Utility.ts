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

import { describe, it, expect } from 'vitest';
import { loadParentRelation } from '../src/Utilities';
import {
  SpinalNodePointer,
  SpinalContext,
  SpinalRelationPtrLst,
  SpinalNode,
} from '../src';

describe('Utility', () => {
  describe('test loadParentRelation', () => {
    it('should load the parent relation', async () => {
      const context = new SpinalContext('context', 'contextType');
      const node = new SpinalNode('node', 'contextType');
      node.addContextId(context.getId().get());
      const rel = new SpinalRelationPtrLst(node, 'relationName');
      rel.addContextId(context.getId().get());
      const ptr = new SpinalNodePointer(rel);

      const res = await loadParentRelation(ptr);
      expect(res).toBe(node);
    });

    it('should load the parent relation within a context', async () => {
      const context = new SpinalContext('context', 'contextType');
      const node = new SpinalNode('node', 'contextType');
      node.addContextId(context.getId().get());
      // const unrelatedContext = new SpinalContext('context', 'contextType');
      const rel = new SpinalRelationPtrLst(node, 'relationName');
      rel.addContextId(context.getId().get());
      const ptr = new SpinalNodePointer(rel);
      const res = await loadParentRelation(ptr, context);
      expect(res).toBe(node);
    });

    it('should not load the parent relation within an unrelated context', async () => {
      const context = new SpinalContext('context', 'contextType');
      const node = new SpinalNode('node', 'contextType');
      node.addContextId(context.getId().get());
      const unrelatedContext = new SpinalContext('context', 'contextType');
      const rel = new SpinalRelationPtrLst(node, 'relationName');
      rel.addContextId(context.getId().get());
      const ptr = new SpinalNodePointer(rel);
      const res = await loadParentRelation(ptr, unrelatedContext);
      expect(res).toBeUndefined();
    });
  });
});
