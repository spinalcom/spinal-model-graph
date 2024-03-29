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
  SpinalGraph,
} from '../../src';
import 'mocha';

const assert = require('assert');

const DEFAULT_NODE = new SpinalNode();
const DEFAULT_RELATION_NAME = 'relationName';
const DEFAULT_RELATION_TYPE = SPINAL_RELATION_LST_PTR_TYPE;
const DEFAULT_NODE_NAME = 'nodeName';

describe('How to use find', () => {
  describe('Error handling', () => {
    it('should throw an error if relationNames is neither an array, a string or omitted', async () => {
      let error = false;

      try {
        await DEFAULT_NODE.find(<any>1);
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);
    });

    it('should throw an error if the predicate is not a function', async () => {
      let error = false;

      try {
        await DEFAULT_NODE.find(undefined, <any>64);
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);
    });

    it('should not fall in infinite loops', async () => {
      const node1: any = new SpinalNode();
      const node2 = new SpinalNode();

      await Promise.all([
        node1.addChild(node2, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
        node2.addChild(node1, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
      ]);

      const foundChild = await node1.find();

      assert.deepStrictEqual(foundChild, [node1, node2]);
    });
  });

  describe('Basic predicate manipulation', () => {
    it('should return all contexts', async () => {
      const graph = new SpinalGraph();
      const context1 = new SpinalContext('context1');
      const context2 = new SpinalContext('context2');
      const context3 = new SpinalContext('context3');

      await Promise.all([
        graph.addContext(context1),
        graph.addContext(context2),
        graph.addContext(context3),
      ]);

      const contexts = await graph.find(undefined, (node) => {
        return node.getType().get() === 'SpinalContext';
      });

      assert.deepStrictEqual(contexts, [context1, context2, context3]);
    });

    it('should return all contexts but not their nodes', async () => {
      const graph = new SpinalGraph();
      const context1 = new SpinalContext('context1');
      const context2 = new SpinalContext('context2');
      const context3 = new SpinalContext('context3');

      await Promise.all([
        graph.addContext(context1),
        graph.addContext(context2),
        graph.addContext(context3),
      ]);

      const promises = [];
      for (let i = 0; i < 3; i += 1) {
        promises.push(
          context1.addChildInContext(new SpinalNode(), DEFAULT_RELATION_NAME)
        );
        promises.push(
          context2.addChildInContext(new SpinalNode(), DEFAULT_RELATION_NAME)
        );
        promises.push(
          context3.addChildInContext(new SpinalNode(), DEFAULT_RELATION_NAME)
        );
      }

      await Promise.all(promises);

      const contexts = await graph.find(undefined, (node) => {
        return node.getType().get() === 'SpinalContext';
      });

      assert.deepStrictEqual(contexts, [context1, context2, context3]);
    });

    it('should return a node with a certain name', async () => {
      const parent = new SpinalNode(DEFAULT_NODE_NAME);
      const child1 = new SpinalNode(`${DEFAULT_NODE_NAME}1`);
      const child2 = new SpinalNode(`${DEFAULT_NODE_NAME}2`);
      const child3 = new SpinalNode(`${DEFAULT_NODE_NAME}3`);

      await Promise.all([
        parent.addChild(child1, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
        parent.addChild(child2, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
        parent.addChild(child3, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
      ]);

      let foundChild = await parent.find(undefined, (node) => {
        return node.getName().get() === `${DEFAULT_NODE_NAME}2`;
      });

      assert.deepStrictEqual(foundChild, [child2]);

      foundChild = await parent.find(undefined, (node) => {
        return node.getName().get() !== `${DEFAULT_NODE_NAME}2`;
      });

      assert.deepStrictEqual(foundChild, [parent, child1, child3]);
    });

    it('should return nodes with a certain type', async () => {
      const parent = new SpinalNode();
      const child1 = new SpinalNode(DEFAULT_NODE_NAME, 'type1');
      const child2 = new SpinalNode(DEFAULT_NODE_NAME, 'type2');
      const child3 = new SpinalNode(DEFAULT_NODE_NAME, 'type1');
      const child4 = new SpinalNode(DEFAULT_NODE_NAME, 'type1');
      const child5 = new SpinalNode(DEFAULT_NODE_NAME, 'type2');
      const child6 = new SpinalNode(DEFAULT_NODE_NAME, 'type1');

      await Promise.all([
        parent.addChild(child1, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
        parent.addChild(child2, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
        parent.addChild(child3, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
        child2.addChild(child4, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
        child3.addChild(child5, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
        child5.addChild(child6, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
      ]);

      let foundChildren = await parent.find(undefined, (node) => {
        return node.getType().get() === 'type1';
      });

      assert.deepStrictEqual(foundChildren, [child1, child3, child4, child6]);

      foundChildren = await parent.find(undefined, (node) => {
        return node.getType().get() === 'type2';
      });

      assert.deepStrictEqual(foundChildren, [child2, child5]);
    });
  });

  describe('How to use relationNames', () => {
    it('should find all the nodes from the given relation names', async () => {
      const parent = new SpinalNode();
      const child1 = new SpinalNode();
      const child2 = new SpinalNode();
      const child3 = new SpinalNode();
      const child4 = new SpinalNode();
      const child5 = new SpinalNode();
      const child6 = new SpinalNode();

      await Promise.all([
        parent.addChild(
          child1,
          `${DEFAULT_RELATION_NAME}1`,
          DEFAULT_RELATION_TYPE
        ),
        parent.addChild(
          child2,
          `${DEFAULT_RELATION_NAME}2`,
          DEFAULT_RELATION_TYPE
        ),
        parent.addChild(
          child3,
          `${DEFAULT_RELATION_NAME}2`,
          DEFAULT_RELATION_TYPE
        ),
        child2.addChild(
          child4,
          `${DEFAULT_RELATION_NAME}2`,
          DEFAULT_RELATION_TYPE
        ),
        child3.addChild(
          child5,
          `${DEFAULT_RELATION_NAME}1`,
          DEFAULT_RELATION_TYPE
        ),
        child5.addChild(
          child6,
          `${DEFAULT_RELATION_NAME}2`,
          DEFAULT_RELATION_TYPE
        ),
      ]);

      let foundChildren = await parent.find(`${DEFAULT_RELATION_NAME}2`);

      assert.deepStrictEqual(foundChildren, [parent, child2, child3, child4]);

      foundChildren = await parent.find(`${DEFAULT_RELATION_NAME}1`);

      assert.deepStrictEqual(foundChildren, [parent, child1]);
    });
  });
});

describe('How to use findInContext', () => {
  describe('Error handling', () => {
    it('should throw an error if the context is missing', async () => {
      let error = false;

      try {
        await (<any>DEFAULT_NODE).findInContext();
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
        await DEFAULT_NODE.findInContext(context);
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);
    });

    it('should throw an error if the predicate is not a function', async () => {
      const context = new SpinalNode();
      let error = false;

      try {
        await DEFAULT_NODE.findInContext(context, <any>64);
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

      await Promise.all([
        node1.addChildInContext(
          node2,
          DEFAULT_RELATION_NAME,
          DEFAULT_RELATION_TYPE,
          context
        ),
        node2.addChildInContext(
          node1,
          DEFAULT_RELATION_NAME,
          DEFAULT_RELATION_TYPE,
          context
        ),
      ]);

      const foundChild = await node1.findInContext(context);

      assert.deepStrictEqual(foundChild, [node1, node2]);
    });
  });

  describe('Basic predicate manipulation', () => {
    it('should return all nodes', async () => {
      const context = new SpinalContext();
      const node1 = new SpinalNode('node1');
      const node2 = new SpinalNode('node2');
      const node3 = new SpinalNode('node3');

      await Promise.all([
        context.addChildInContext(node1, DEFAULT_RELATION_NAME),
        context.addChildInContext(node2, DEFAULT_RELATION_NAME),
        context.addChildInContext(node3, DEFAULT_RELATION_NAME),
      ]);

      const contexts = await context.findInContext(context, (node) => {
        return node.getType().get() === 'SpinalNode';
      });

      assert.deepStrictEqual(contexts, [node1, node2, node3]);
    });

    it('should return all direct children', async () => {
      const context = new SpinalContext();
      const node1 = new SpinalNode(undefined, 'direct');
      const node2 = new SpinalNode(undefined, 'direct');
      const node3 = new SpinalNode(undefined, 'direct');

      await Promise.all([
        context.addChildInContext(node1, DEFAULT_RELATION_NAME),
        context.addChildInContext(node2, DEFAULT_RELATION_NAME),
        context.addChildInContext(node3, DEFAULT_RELATION_NAME),
      ]);

      const promises = [];
      for (let i = 0; i < 3; i += 1) {
        promises.push(
          node1.addChild(
            new SpinalNode(),
            DEFAULT_RELATION_NAME,
            DEFAULT_RELATION_TYPE
          )
        );
        promises.push(
          node2.addChild(
            new SpinalNode(),
            DEFAULT_RELATION_NAME,
            DEFAULT_RELATION_TYPE
          )
        );
        promises.push(
          node3.addChild(
            new SpinalNode(),
            DEFAULT_RELATION_NAME,
            DEFAULT_RELATION_TYPE
          )
        );
      }

      await Promise.all(promises);

      const directs = await context.findInContext(context, (node) => {
        return node.getType().get() === 'direct';
      });

      assert.deepStrictEqual(directs, [node1, node2, node3]);
    });

    it('should return a node with a certain name', async () => {
      const context = new SpinalContext();
      const child1 = new SpinalNode(`${DEFAULT_NODE_NAME}1`);
      const child2 = new SpinalNode(`${DEFAULT_NODE_NAME}2`);
      const child3 = new SpinalNode(`${DEFAULT_NODE_NAME}3`);

      await Promise.all([
        context.addChildInContext(child1, DEFAULT_RELATION_NAME),
        context.addChildInContext(child2, DEFAULT_RELATION_NAME),
        context.addChildInContext(child3, DEFAULT_RELATION_NAME),
      ]);

      let foundChild = await context.findInContext(context, (node) => {
        return node.getName().get() === `${DEFAULT_NODE_NAME}2`;
      });

      assert.deepStrictEqual(foundChild, [child2]);

      foundChild = await context.findInContext(context, (node) => {
        return node.getName().get() !== `${DEFAULT_NODE_NAME}2`;
      });

      assert.deepStrictEqual(foundChild, [context, child1, child3]);
    });

    it('should return nodes with a certain type', async () => {
      const context = new SpinalContext();
      const child1 = new SpinalNode(DEFAULT_NODE_NAME, 'type1');
      const child2 = new SpinalNode(DEFAULT_NODE_NAME, 'type2');
      const child3 = new SpinalNode(DEFAULT_NODE_NAME, 'type1');
      const child4 = new SpinalNode(DEFAULT_NODE_NAME, 'type1');
      const child5 = new SpinalNode(DEFAULT_NODE_NAME, 'type2');
      const child6 = new SpinalNode(DEFAULT_NODE_NAME, 'type1');

      await Promise.all([
        context.addChildInContext(child1, DEFAULT_RELATION_NAME),
        context.addChildInContext(child2, DEFAULT_RELATION_NAME),
        context.addChildInContext(child3, DEFAULT_RELATION_NAME),
        child2.addChildInContext(
          child4,
          DEFAULT_RELATION_NAME,
          DEFAULT_RELATION_TYPE,
          context
        ),
        child3.addChildInContext(
          child5,
          DEFAULT_RELATION_NAME,
          DEFAULT_RELATION_TYPE,
          context
        ),
        child5.addChildInContext(
          child6,
          DEFAULT_RELATION_NAME,
          DEFAULT_RELATION_TYPE,
          context
        ),
      ]);

      let foundChildren = await context.findInContext(context, (node) => {
        return node.getType().get() === 'type1';
      });

      assert.deepStrictEqual(foundChildren, [child1, child3, child4, child6]);

      foundChildren = await context.findInContext(context, (node) => {
        return node.getType().get() === 'type2';
      });

      assert.deepStrictEqual(foundChildren, [child2, child5]);
    });

    it('should return be able to do a find one like', async () => {
      const context = new SpinalContext();
      const child1 = new SpinalNode(`${DEFAULT_NODE_NAME}1`);
      const child2 = new SpinalNode(`${DEFAULT_NODE_NAME}2`);
      const child3 = new SpinalNode(`${DEFAULT_NODE_NAME}3`);

      await Promise.all([
        context.addChildInContext(child1, DEFAULT_RELATION_NAME),
        context.addChildInContext(child2, DEFAULT_RELATION_NAME),
        context.addChildInContext(child3, DEFAULT_RELATION_NAME),
      ]);

      const foundChild = await context.find(
        DEFAULT_RELATION_NAME,
        (node, stopFct) => {
          if (node.getName().get() === `${DEFAULT_NODE_NAME}2`) {
            stopFct();
            return true;
          }
          return false;
        }
      );

      assert.deepStrictEqual(foundChild, [child2]);
    });
    it('should return be able to stop a search', async () => {
      const context = new SpinalContext();
      const child1 = new SpinalNode(`${DEFAULT_NODE_NAME}1`);
      const child2 = new SpinalNode(`${DEFAULT_NODE_NAME}2`);
      const child3 = new SpinalNode(`${DEFAULT_NODE_NAME}3`);

      await Promise.all([
        context.addChildInContext(child1, DEFAULT_RELATION_NAME),
        context.addChildInContext(child2, DEFAULT_RELATION_NAME),
        context.addChildInContext(child3, DEFAULT_RELATION_NAME),
      ]);

      const foundChild = await context.find(
        DEFAULT_RELATION_NAME,
        (_node, stopFct) => {
          stopFct();
          return true;
        }
      );

      assert.deepStrictEqual(foundChild, [context]);
    });
  });

  describe('How to use context', () => {
    it('should findInContext all the nodes from the given relation names', async () => {
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
        parent.addChildInContext(
          child1,
          DEFAULT_RELATION_NAME,
          DEFAULT_RELATION_TYPE,
          context1
        ),
        parent.addChildInContext(
          child2,
          DEFAULT_RELATION_NAME,
          DEFAULT_RELATION_TYPE,
          context2
        ),
        parent.addChildInContext(
          child3,
          DEFAULT_RELATION_NAME,
          DEFAULT_RELATION_TYPE,
          context2
        ),
        child2.addChildInContext(
          child4,
          DEFAULT_RELATION_NAME,
          DEFAULT_RELATION_TYPE,
          context2
        ),
        child3.addChildInContext(
          child5,
          DEFAULT_RELATION_NAME,
          DEFAULT_RELATION_TYPE,
          context1
        ),
        child5.addChildInContext(
          child6,
          DEFAULT_RELATION_NAME,
          DEFAULT_RELATION_TYPE,
          context2
        ),
      ]);

      let foundChildren = await parent.findInContext(context2);

      assert.deepStrictEqual(foundChildren, [parent, child2, child3, child4]);

      foundChildren = await parent.findInContext(context1);

      assert.deepStrictEqual(foundChildren, [parent, child1]);
    });
  });
});
