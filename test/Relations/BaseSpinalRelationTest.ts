import {
  SpinalGraph,
  SpinalNode,
  SpinalContext,
  SPINAL_RELATION_LST_PTR_TYPE,
  SpinalRelationLstPtr,
} from '../../src';
import { BaseSpinalRelation } from '../../src/Relations/BaseSpinalRelation';
import { Model, Str } from 'spinal-core-connectorjs_type';

import * as assert from 'assert';

const DEFAULT_RELATION_NAME = 'relationName';
const DEFAULT_NODE = new SpinalNode();

describe('BaseSpinalRelation', () => {
  describe('How to use the constructor', () => {
    it('should create a new relation with a name and node parent', async () => {
      const parent = new SpinalNode();
      const rel = new BaseSpinalRelation(parent, DEFAULT_RELATION_NAME);

      assert.strictEqual(rel.getName().get(), DEFAULT_RELATION_NAME);
      assert.strictEqual(await rel.getParent(), parent);
      assert(rel.getId() instanceof Str);
    });

    it('should create a new relation with a name and a context parent', async () => {
      const parent = new SpinalContext();
      const rel = new BaseSpinalRelation(parent, DEFAULT_RELATION_NAME);

      assert.strictEqual(rel.getName().get(), DEFAULT_RELATION_NAME);
      assert.strictEqual(await rel.getParent(), parent);
      assert(rel.getId() instanceof Str);
    });

    it('should create a new relation with a name and a graph parent', async () => {
      const parent = new SpinalGraph();
      const rel = new BaseSpinalRelation(parent, DEFAULT_RELATION_NAME);

      assert.strictEqual(rel.getName().get(), DEFAULT_RELATION_NAME);
      assert.strictEqual(await rel.getParent(), parent);
      assert(rel.getId() instanceof Str);
    });

    it('should throw an error if the parent or the name is missing', async () => {
      assert.throws(() => {
        new BaseSpinalRelation();
      },            TypeError);

      assert.throws(() => {
        new BaseSpinalRelation(undefined, DEFAULT_RELATION_NAME);
      },            TypeError);

      assert.throws(() => {
        new BaseSpinalRelation(DEFAULT_NODE);
      },            TypeError);
    });

    it('should throw an error if the name is not a string', async () => {
      assert.throws(() => {
        new BaseSpinalRelation(DEFAULT_NODE, <any>1);
      },            TypeError);
    });

    it('should throw an error if the parent is not a SpinalNode', async () => {
      const parent1 = [];

      assert.throws(() => {
        new BaseSpinalRelation(<any>parent1, DEFAULT_RELATION_NAME);
      },            TypeError);

      const parent2 = new Model();

      assert.throws(() => {
        new BaseSpinalRelation(<any>parent2, DEFAULT_RELATION_NAME);
      },            TypeError);
    });
  });

  describe('How to get/set information about the relation', () => {
    describe('How to use getName', () => {
      it('should return the name DEFAULT_RELATION_NAME', () => {
        const rel = new BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);
        assert.strictEqual(
          rel.getName().get(),
          DEFAULT_RELATION_NAME,
        );
      });
    });

    describe('How to use getParent', () => {
      it('should return the parent of the relation', async () => {
        const rel = new BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);

        assert.strictEqual(await rel.getParent(), DEFAULT_NODE);
      });
    });

    describe('How to use addContextIds and getContextIds', () => {
      it('should get the ids of the associated contexts', () => {
        const relation = new BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);
        const contextId1 = new SpinalContext().getId().get();
        const contextId2 = new SpinalContext().getId().get();

        relation.addContextId(contextId1);

        assert.deepStrictEqual(relation.getContextIds(), [
          contextId1,
        ]);

        relation.addContextId(contextId1);
        relation.addContextId(contextId2);

        assert.deepStrictEqual(relation.getContextIds(), [
          contextId1, contextId2,
        ]);
      });

      it('should throw an error if the contextId is missing', () => {
        const relation: any = new BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);

        assert.throws(() => {
          relation.addContextId();
        },            TypeError);
      });

      it('should throw an error if the contextId is not a string', () => {
        const relation = new BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);
        const badContextId1 = new SpinalContext().getId();

        assert.throws(() => {
          relation.addContextId(<any>badContextId1);
        },            TypeError);
      });
    });

    describe('How to use belongsToContext', () => {
      it('should return true', async () => {
        const context = new SpinalContext();
        const relation = new BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);

        relation.addContextId(context.getId().get());

        assert(relation.belongsToContext(context));
      });

      it('should return false', () => {
        const context = new SpinalContext();
        const relation = new BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);

        assert(!relation.belongsToContext(context));
      });

      it('should throw an error if no context is passed', () => {
        const relation = new BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);

        assert.throws(() => {
          relation.belongsToContext(<any>context);
        },            TypeError);
      });

      it('should throw an error if the context as the wrong type', () => {
        const context1 = {};
        const relation = new BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);

        assert.throws(() => {
          relation.belongsToContext(<any>context1);
        },            TypeError);

        const context2 = new SpinalNode();

        assert.throws(() => {
          relation.belongsToContext(context2);
        },            TypeError);
      });
    });
  });

  describe('How to remove from the graph', () => {
    describe('How to use removeChildren', () => {
      it('should delete all of the children', async () => {
        const rel = new SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
        const node1 = new SpinalNode();
        const node2 = new SpinalNode();
        const node3 = new SpinalNode();

        await Promise.all([
          rel.addChild(node1),
          rel.addChild(node2),
          rel.addChild(node3),
        ]);

        await rel.removeChildren();

        const children = await rel.getChildren();
        assert.deepStrictEqual(children, []);
      });

      it('should delete the given children', async () => {
        const rel = new SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
        const node1 = new SpinalNode();
        const node2 = new SpinalNode();
        const node3 = new SpinalNode();

        await Promise.all([
          rel.addChild(node1),
          rel.addChild(node2),
          rel.addChild(node3),
        ]);

        await rel.removeChildren([node3, node1]);

        const children = await rel.getChildren();
        assert.deepStrictEqual(children, [node2]);
      });

      it('should delete some of the given children', async () => {
        const rel = new SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
        const node1 = new SpinalNode();
        const node2 = new SpinalNode();
        const node3 = new SpinalNode();
        const node4 = new SpinalNode();
        let error = false;

        await Promise.all([
          rel.addChild(node1),
          rel.addChild(node2),
          rel.addChild(node3),
        ]);

        try {
          await rel.removeChildren([node3, node1, node4]);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);

        const children = await rel.getChildren();
        assert.deepStrictEqual(children, [node2]);
      });

      it('should throw an error if nodes is not an array', async () => {
        const relation = new BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);
        let error = false;

        try {
          await relation.removeChildren(<any>{});
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });
    });

    describe('How to use removeFromGraph', () => {
      it('should delete all of the children', async () => {
        const rel = new SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
        const node1 = new SpinalNode();
        const node2 = new SpinalNode();
        const node3 = new SpinalNode();

        await Promise.all([
          rel.addChild(node1),
          rel.addChild(node2),
          rel.addChild(node3),
        ]);

        await rel.removeChildren();

        const children = await rel.getChildren();
        assert.deepStrictEqual(children, []);
      });

      it('should the relation from the parent pointer', async () => {
        const parent = new SpinalNode();
        const rel = parent._createRelation(
          DEFAULT_RELATION_NAME, SPINAL_RELATION_LST_PTR_TYPE,
        );

        await rel.removeFromGraph();
        assert(!parent.hasRelation(DEFAULT_RELATION_NAME, SPINAL_RELATION_LST_PTR_TYPE));
      });
    });
  });
});
