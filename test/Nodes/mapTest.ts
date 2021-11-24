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
  SpinalNode,
  SpinalContext,
  SPINAL_RELATION_LST_PTR_TYPE,
} from '../../src';
import "mocha"

import * as assert from 'assert';
const DEFAULT_NODE = new SpinalNode();
const DEFAULT_CONTEXT = new SpinalContext();
const DEFAULT_RELATION_NAME = 'relationName';
const DEFAULT_RELATION_TYPE = SPINAL_RELATION_LST_PTR_TYPE;
const DEFAULT_FUN = node => node;

describe('How to use map', () => {
  describe('Error handling', () => {
    it('should throw an error if relationNames is neither an array, a string or omitted',
      async () => {
        let error = false;

        try {
          await DEFAULT_NODE.map(<any>1, DEFAULT_FUN);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

    it('should throw an error if the callback function is missing', async () => {
      let error = false;

      try {
        await DEFAULT_NODE.map([], undefined);
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);
    });

    it('should throw an error if the callback function is not a function', async () => {
      let error = false;

      try {
        await DEFAULT_NODE.map([], <any>256);
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);
    });

    it('should not fall in infinite loops', async () => {
      const node1 = new SpinalNode();
      const node2 = new SpinalNode();

      await Promise.all([
        node1.addChild(node2, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
        node2.addChild(node1, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
      ]);

      const foundChild = await node1.map(undefined, DEFAULT_FUN);

      assert.deepStrictEqual(foundChild, [node1, node2]);
    });
  });

  describe('Basic callback manipulation', () => {
    it('should return the ids of all nodes', async () => {
      const parent = new SpinalNode('parent');
      const child1 = new SpinalNode('child1');
      const child2 = new SpinalNode('child2');
      const child3 = new SpinalNode('child3');

      await Promise.all([
        parent.addChild(child1, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
        parent.addChild(child2, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
        parent.addChild(child3, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
      ]);

      const ids = await parent.map(undefined, (node) => {
        return node.getId();
      });

      assert.deepStrictEqual(
        ids,
        [
          parent.getId(),
          child1.getId(),
          child2.getId(),
          child3.getId(),
        ],
      );
    });

    it('should return second gen and undefined for other nodes nodes', async () => {
      const root = new SpinalNode();
      const firstGen1 = new SpinalNode(undefined, 'firstGen');
      const firstGen2 = new SpinalNode(undefined, 'firstGen');
      const firstGen3 = new SpinalNode(undefined, 'firstGen');
      const secondGen1 = new SpinalNode(undefined, 'secondGen');
      const secondGen2 = new SpinalNode(undefined, 'secondGen');
      const thirdGen1 = new SpinalNode(undefined, 'thirdGen');

      await Promise.all([
        root.addChild(firstGen1, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
        root.addChild(firstGen2, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
        root.addChild(firstGen3, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
        firstGen2.addChild(secondGen1, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
        firstGen3.addChild(secondGen2, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
        secondGen2.addChild(thirdGen1, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
      ]);

      const secondGen = await root.map(undefined, (node) => {
        if (node.getType().get() === 'secondGen') {
          return node;
        }
        return undefined;
      });

      assert.deepStrictEqual(secondGen, [
        undefined,
        undefined,
        undefined,
        undefined,
        secondGen1,
        secondGen2,
        undefined,
      ]);
    });
  });
});

describe('How to use mapInContext', () => {
  describe('Error handling', () => {
    it('should throw an error if the context is missing', async () => {
      let error = false;

      try {
        await DEFAULT_NODE.mapInContext(undefined, DEFAULT_FUN);
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);
    });

    it('should throw an error if the context is not a SpinalContext', async () => {
      const context = new SpinalNode();
      let error = false;

      try {
        await DEFAULT_NODE.mapInContext(context, DEFAULT_FUN);
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);
    });

    it('should throw an error if the callback is missing', async () => {
      let error = false;

      try {
        const testNode: any = DEFAULT_NODE;
        await testNode.mapInContext(DEFAULT_CONTEXT);
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);
    });

    it('should throw an error if the callback is not a function', async () => {
      let error = false;

      try {
        await DEFAULT_NODE.mapInContext(DEFAULT_CONTEXT, <any>128);
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);
    });

    it('should not fall in infinite loops', async () => {
      const context = new SpinalContext();
      const node1 = new SpinalNode();
      const node2 = new SpinalNode();

      node1.addChildInContext(node2, DEFAULT_RELATION_NAME,
        DEFAULT_RELATION_TYPE, context);
      node2.addChildInContext(node1, DEFAULT_RELATION_NAME,
        DEFAULT_RELATION_TYPE, context);

      const foundChild = await node1.mapInContext(context,
        DEFAULT_FUN);

      assert.deepStrictEqual(foundChild, [node1, node2]);
    });

    describe('Basic callback manipulation', () => {
      it('should return the names of all nodes in the context', async () => {
        const context = new SpinalContext('context');
        const child1 = new SpinalNode('child1');
        const child2 = new SpinalNode('child2');
        const child3 = new SpinalNode('child3');

        await Promise.all([
          context.addChildInContext(child1, DEFAULT_RELATION_NAME),
          context.addChildInContext(child2, DEFAULT_RELATION_NAME),
          context.addChildInContext(child3, DEFAULT_RELATION_NAME),
        ]);

        const names = await context.mapInContext(context, (node) => {
          return node.getName().get();
        });

        assert.deepStrictEqual(
          names,
          [
            'context',
            'child1',
            'child2',
            'child3',
          ],
        );
      });
    });
  });

  describe('How to use context', () => {
    it('should mapInContext all the nodes from the given relation names', async () => {
      const context1 = new SpinalContext();
      const context2 = new SpinalContext();
      const parent = new SpinalNode();
      const child1 = new SpinalNode();
      const child2 = new SpinalNode();
      const child3 = new SpinalNode();
      const child4 = new SpinalNode();
      const child5 = new SpinalNode();
      const child6 = new SpinalNode();

      await Promise.all([
        parent.addChildInContext(child1, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context1),
        parent.addChildInContext(child2, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context2),
        parent.addChildInContext(child3, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context2),
        child2.addChildInContext(child4, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context2),
        child3.addChildInContext(child5, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context1),
        child5.addChildInContext(child6, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context2),
      ]);

      let foundChildren = await parent.mapInContext(context2, DEFAULT_FUN);

      assert.deepStrictEqual(foundChildren, [parent, child2, child3, child4]);

      foundChildren = await parent.mapInContext(context1, DEFAULT_FUN);

      assert.deepStrictEqual(foundChildren, [parent, child1]);
    });
  });
});
