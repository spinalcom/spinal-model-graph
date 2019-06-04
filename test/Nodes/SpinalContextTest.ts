import {
  SpinalNode,
  SpinalContext,
  SPINAL_RELATION_PTR_LST_TYPE,
} from '../../src';
import { FileSystem, Model } from 'spinal-core-connectorjs_type';

import * as assert from 'assert';

const DEFAULT_SPINAL_CONTEXT_NAME = 'undefined';
const DEFAULT_SPINAL_CONTEXT_TYPE = 'SpinalContext';
const DEFAULT_RELATION_NAME = 'relationName';
const DEFAULT_NODE = new SpinalNode();

describe('SpinalContext', () => {
  describe('How to use the constructor', () => {
    it('should create an empty object FileSystem._sig_server === false', () => {
      FileSystem._sig_server = false;
      const node = new SpinalContext();
      FileSystem._sig_server = true;

      assert(typeof node.element === 'undefined');
    });

    it('should create a context with default values', async () => {
      const context = new SpinalContext();

      assert.strictEqual(context.getName().get(), DEFAULT_SPINAL_CONTEXT_NAME);
      assert.strictEqual(context.getType().get(), DEFAULT_SPINAL_CONTEXT_TYPE);
      const element = await context.getElement();
      assert(element instanceof Model);
    });
  });

  describe('How to add children to the context', () => {
    describe('How to use addChild', () => {
      it('should add a child to the context with a SPINAL_RELATION_PTR_LST_TYPE type', async () => {
        const context = new SpinalContext();

        await context.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME);
        assert(context.hasRelation(DEFAULT_RELATION_NAME, SPINAL_RELATION_PTR_LST_TYPE));
      });
    });

    describe('How to use addChildInContext', () => {
      it('should add a child to the context with a SPINAL_RELATION_PTR_LST_TYPE type', async () => {
        const context = new SpinalContext();

        await context.addChildInContext(DEFAULT_NODE, DEFAULT_RELATION_NAME);
        assert(context.hasRelation(DEFAULT_RELATION_NAME, SPINAL_RELATION_PTR_LST_TYPE));
      });

      it('should be associated to the node (has a context) by default', async () => {
        const context = new SpinalContext();
        const node = new SpinalNode();

        await context.addChildInContext(node, DEFAULT_RELATION_NAME);

        assert.deepStrictEqual(node.getContextIds(), [context.getId().get()]);
      });
    });
  });

  describe('How to use getChildrenInContext', () => {
    it('should use this by default', async () => {
      const context = new SpinalContext();
      const node1 = new SpinalNode();
      const node2 = new SpinalNode();
      const node3 = new SpinalNode();

      await Promise.all([
        context.addChildInContext(node1, `${DEFAULT_RELATION_NAME}1`),
        context.addChildInContext(node2, `${DEFAULT_RELATION_NAME}2`),
        context.addChild(node3, `${DEFAULT_RELATION_NAME}3`),
      ]);

      const children = await context.getChildrenInContext();

      assert.deepStrictEqual(children, [node1, node2]);
    });
  });
});
