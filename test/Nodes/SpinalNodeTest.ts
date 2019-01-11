import {
  SpinalNode,
  SpinalContext,
  SPINAL_RELATION_LST_PTR_TYPE,
  SPINAL_RELATION_PTR_LST_TYPE,
  SPINAL_RELATION_TYPE,
} from '../../build/index';
import { FileSystem, Model } from 'spinal-core-connectorjs_type';

import * as assert from 'assert';

const DEFAULT_SPINAL_NODE_NAME = 'undefined';
const DEFAULT_SPINAL_NODE_TYPE = 'SpinalNode';
const CUSTOM_SPINAL_NODE_NAME = 'SpinalNodeTestName';
const CUSTOM_SPINAL_NODE_TYPE = 'SpinalNodeTestType';
const DEFAULT_RELATION_NAME = 'has child';
const DEFAULT_ELEMENT_NAME = 'Default Name';
const CUSTOM_RELATION_NAME1 = 'custom relation';
const CUSTOM_RELATION_NAME2 = 'custom relation 2';
const DEFAULT_ELEMENT = new Model();
DEFAULT_ELEMENT.add_attr({
  name: DEFAULT_ELEMENT_NAME,
});
const DEFAULT_NODE = new SpinalNode(CUSTOM_SPINAL_NODE_NAME);

describe('SpinalNode', () => {
  describe('How to use the constructor', () => {
    it('should create an empty object FileSystem._sig_server === false', () => {
      FileSystem._sig_server = false;
      const node = new SpinalNode();
      FileSystem._sig_server = true;

      assert(typeof node.element === 'undefined');
    });
    it('should create a new spinal node.', async () => {
      const node:any = new SpinalNode();

      assert.strictEqual(
        node.getName().get(),
        DEFAULT_SPINAL_NODE_NAME,
      );

      assert.strictEqual(
        node.getType().get(),
        DEFAULT_SPINAL_NODE_TYPE,
      );

      const elt = await node.getElement();
      assert.strictEqual(
        elt instanceof Model,
        true,
      );
    });

    it('should create spinal a new SpinalNode with a specific name.', () => {
      const node = new SpinalNode(CUSTOM_SPINAL_NODE_NAME);

      assert.strictEqual(
        node.getName().get(),
        CUSTOM_SPINAL_NODE_NAME,
        'By setting the first argument of the construct the name should be setElement.',
      );
    });

    it('should create a new SpinalNode with specific name and type.', () => {
      const node = new SpinalNode(CUSTOM_SPINAL_NODE_NAME,
                                  CUSTOM_SPINAL_NODE_TYPE);

      assert.strictEqual(
        node.getName().get(),
        CUSTOM_SPINAL_NODE_NAME,
        'By setting the first argument of the construct the name should be setElement.',
      );

      assert.strictEqual(
        node.getType().get(),
        CUSTOM_SPINAL_NODE_TYPE,
        'By setting the second argument of the construct the type should be setElement.',
      );
    });

    it('should create a new SpinalNode with specific name, type and element', async () => {
      const node = new SpinalNode(CUSTOM_SPINAL_NODE_NAME,
                                  CUSTOM_SPINAL_NODE_TYPE, new SpinalNode());

      assert.strictEqual(
        node.getName().get(),
        CUSTOM_SPINAL_NODE_NAME,
        'By setting the first argument of the construct the name should be setElement.',
      );

      assert.strictEqual(
        node.getType().get(),
        CUSTOM_SPINAL_NODE_TYPE,
        'By setting the second argument of the construct the type should be setElement.',
      );

      const elt = await node.getElement();
      assert(
        elt instanceof SpinalNode,
        'By setting the third argument of the construct the element should be setElement.',
      );
    });
  });

  describe('How to get/set information about the node', () => {
    describe('How to use getName', () => {
      it('should return the name CUSTOM_SPINAL_NODE_NAME', () => {
        const node = new SpinalNode(CUSTOM_SPINAL_NODE_NAME);
        assert.strictEqual(
          node.getName().get(),
          CUSTOM_SPINAL_NODE_NAME,
          'By setting the first argument of the construct the name should be setElement.',
        );
      });
    });

    describe('How to use getType', () => {
      it('should return the type CUSTOM_SPINAL_NODE_TYPE', () => {
        const node = new SpinalNode(CUSTOM_SPINAL_NODE_NAME, CUSTOM_SPINAL_NODE_TYPE);
        assert.strictEqual(
          node.getType().get(),
          CUSTOM_SPINAL_NODE_TYPE,
          'By setting the first argument of the construct the type should be setElement.',
        );
      });
    });

    describe('How to getElement', () => {
      it('should return the DEFAULT_ELEMENT', async () => {
        const node = new SpinalNode(CUSTOM_SPINAL_NODE_NAME,
                                    CUSTOM_SPINAL_NODE_TYPE, DEFAULT_ELEMENT);

        const elt = await node.getElement();
        assert.strictEqual(
          elt,
          DEFAULT_ELEMENT,
          'By setting the second argument of the construct the element should be setElement.',
        );
      });
    });

    describe('How to use getChildrenIds', () => {
      it('should return no ids', () => {
        const node:any = new SpinalNode();

        assert.deepStrictEqual(node.getChildrenIds(), []);
      });

      it('should return all children ids', async () => {
        const parent:any = new SpinalNode();
        const child1 = new SpinalNode();
        const child2 = new SpinalNode();
        const child3 = new SpinalNode();

        const childrenIds = [
          child1.getId().get(),
          child2.getId().get(),
          child3.getId().get(),
        ];

        await Promise.all([
          parent.addChild(child1, DEFAULT_RELATION_NAME, SPINAL_RELATION_LST_PTR_TYPE),
          parent.addChild(child2, DEFAULT_RELATION_NAME, SPINAL_RELATION_LST_PTR_TYPE),
          parent.addChild(child3, DEFAULT_RELATION_NAME, SPINAL_RELATION_LST_PTR_TYPE),
        ]);

        assert.deepStrictEqual(parent.getChildrenIds(), childrenIds);
      });
    });

    describe('How to use getNbChildren', () => {
      it('should return 0', () => {
        const node:any = new SpinalNode();
        const res = node.getNbChildren();

        assert.strictEqual(res, 0);
      });

      it('should return 3', () => {
        const node:any = new SpinalNode();
        const child1 = new SpinalNode();
        const child2 = new SpinalNode();
        const child3 = new SpinalNode();

        node.addChild(child1, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);
        node.addChild(child2, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);
        node.addChild(child3, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);
        const res = node.getNbChildren();
        assert.strictEqual(res, 3);
      });

      it('should return 2', async () => {
        const node:any = new SpinalNode();
        const child1 = new SpinalNode();
        const child2 = new SpinalNode();
        const child3 = new SpinalNode();

        await Promise.all([
          node.addChild(child1, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
          node.addChild(child2, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
          node.addChild(child3, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
        ]);

        await node.removeChild(child2, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);
        const res = node.getNbChildren();
        assert.strictEqual(res, 2);
      });
    });

    describe('How to use addContextId and getContextId', () => {
      it('should get the ids of the associated contexts', () => {
        const node:any = new SpinalNode();
        const contextId1 = new SpinalContext().getId().get();
        const contextId2 = new SpinalContext().getId().get();

        node.addContextId(contextId1);

        assert.deepStrictEqual(node.getContextIds(), [
          contextId1,
        ]);

        node.addContextId(contextId1);
        node.addContextId(contextId2);

        assert.deepStrictEqual(node.getContextIds(), [
          contextId1, contextId2,
        ]);
      });

      it('should throw an error if the id is missing', () => {
        const node: any = new SpinalNode();

        assert.throws(() => {
          node.addContextId();
        },            TypeError);
      });

      it('should throw an error if the id is not a string', () => {
        const node:any = new SpinalNode();
        const context = new SpinalContext();

        assert.throws(() => {
          node.addContextId(<any>context.getId());
        },            TypeError);
      });
    });

    describe('How to use belongsToContext', () => {
      it('should return true', async () => {
        const context = new SpinalContext();
        const parent:any = new SpinalNode();
        const child = new SpinalNode();

        await parent.addChildInContext(child, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE, context);

        assert(child.belongsToContext(context));
      });

      it('should return false', () => {
        const context = new SpinalContext();
        const node:any = new SpinalNode();

        assert(!node.belongsToContext(context));
      });

      it('should throw an error if the context is missing', () => {
        const node:any = new SpinalNode();

        assert.throws(() => {
          node.belongsToContext(<any>context);
        },            TypeError);
      });

      it('should throw an error if the context is missing', () => {
        const node:any = new SpinalNode();

        assert.throws(() => {
          node.belongsToContext(<any>1);
        },            TypeError);
      });
    });
  });

  describe("How to get information about the node's relations", () => {
    describe('How to use hasRelation', () => {
      it('should return true', async () => {
        const node:any = new SpinalNode();

        await node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);
        assert.strictEqual(node.hasRelation(DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE), true);
      });

      it('should return false', async () => {
        const node:any = new SpinalNode();

        await node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);
        assert.strictEqual(node.hasRelation(CUSTOM_RELATION_NAME1, SPINAL_RELATION_TYPE), false);
      });

      it('should throw an error if the relation name is missing', () => {
        const node:any = new SpinalNode();

        assert.throws(() => {
          node.hasRelation(undefined, SPINAL_RELATION_TYPE);
        },            TypeError);
      });

      it('should throw an error if the relation name is not a string', () => {
        const node:any = new SpinalNode();

        assert.throws(() => {
          node.hasRelation(<any>1, SPINAL_RELATION_TYPE);
        },            TypeError);
      });

      it('should throw an error if the relation type is missing', () => {
        const node:any = new SpinalNode();

        assert.throws(() => {
          node.hasRelation(DEFAULT_RELATION_NAME);
        },            Error);
      });

      it('should throw an error if the relation type is not valid', () => {
        const node:any = new SpinalNode();

        assert.throws(() => {
          node.hasRelation(DEFAULT_RELATION_NAME, <any>1);
        },            Error);
      });
    });

    describe('How to use hasRelations', () => {
      it('should return true the node contains all the relations', async () => {
        const node:any = new SpinalNode();

        await Promise.all([
          node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
          node.addChild(DEFAULT_NODE, CUSTOM_RELATION_NAME1, SPINAL_RELATION_TYPE),
        ]);

        assert.strictEqual(
          node.hasRelations(
          [DEFAULT_RELATION_NAME, CUSTOM_RELATION_NAME1],
          SPINAL_RELATION_TYPE),
          true);
      });

      it("should return false if the node doesn't contain all the relations", async () => {
        const node:any = new SpinalNode();

        await Promise.all([
          node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
          node.addChild(DEFAULT_NODE, CUSTOM_RELATION_NAME1, SPINAL_RELATION_TYPE),
        ]);

        assert.strictEqual(
          node.hasRelations(
            [CUSTOM_RELATION_NAME1, CUSTOM_RELATION_NAME2],
            SPINAL_RELATION_TYPE),
          false);
      });

      it('should throw an error if the relation name array is missing', () => {
        const node:any = new SpinalNode();

        assert.throws(() => {
          node.hasRelations(undefined, SPINAL_RELATION_TYPE);
        },            TypeError);
      });

      it('should throw an error if the relation name array is not an array', () => {
        const node:any = new SpinalNode();

        assert.throws(() => {
          node.hasRelations(<any>1, SPINAL_RELATION_TYPE);
        },            TypeError);
      });

      it('should throw an error if the relation type is missing', () => {
        const node:any = new SpinalNode();

        assert.throws(() => {
          node.hasRelations([]);
        },            Error);
      });

      it('should throw an error if the relation type is not valid', () => {
        const node:any = new SpinalNode();

        assert.throws(() => {
          node.hasRelations([], <any>1);
        },            Error);
      });

      it('should throw an error if on of the relation names is not a string', () => {
        const node:any = new SpinalNode();

        assert.throws(() => {
          node.hasRelations(<any>[1], SPINAL_RELATION_TYPE);
        },            TypeError);
      });
    });

    describe('How to use getRelationNames', () => {
      it('should return no name', () => {
        const node:any = new SpinalNode();

        assert.deepStrictEqual(node.getRelationNames(), []);
      });

      it('should return all relation names', async () => {
        const node:any = new SpinalNode();
        const child1 = new SpinalNode();
        const child2 = new SpinalNode();
        const child3 = new SpinalNode();
        const child4 = new SpinalNode();
        const child5 = new SpinalNode();

        await Promise.all([
          node.addChild(child1, `${DEFAULT_RELATION_NAME}1`, SPINAL_RELATION_LST_PTR_TYPE),
          node.addChild(child2, `${DEFAULT_RELATION_NAME}2`, SPINAL_RELATION_LST_PTR_TYPE),
          node.addChild(child3, `${DEFAULT_RELATION_NAME}2`, SPINAL_RELATION_LST_PTR_TYPE),
          node.addChild(child4, `${DEFAULT_RELATION_NAME}1`, SPINAL_RELATION_LST_PTR_TYPE),
          node.addChild(child5, `${DEFAULT_RELATION_NAME}4`, SPINAL_RELATION_LST_PTR_TYPE),
        ]);
        assert.deepStrictEqual(
          node.getRelationNames(),
          [
            `${DEFAULT_RELATION_NAME}1`,
            `${DEFAULT_RELATION_NAME}2`,
            `${DEFAULT_RELATION_NAME}4`,
          ],
        );
      });

      it("shouldn't return duplicates if there are different " +
      'relation with the same names but different types',
         async () => {
           const node:any = new SpinalNode();
           const child1 = new SpinalNode();
           const child2 = new SpinalNode();
           const child3 = new SpinalNode();

           await Promise.all([
             node.addChild(child1, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
             node.addChild(child2, DEFAULT_RELATION_NAME, SPINAL_RELATION_LST_PTR_TYPE),
             node.addChild(child3, DEFAULT_RELATION_NAME, SPINAL_RELATION_PTR_LST_TYPE),
           ]);
           assert.deepStrictEqual(node.getRelationNames(),
                                  [DEFAULT_RELATION_NAME]);
         });
    });
  });

  describe('How to add a child to the node', () => {
    describe('How to use addChild', () => {
      it('should add a child to the node with a relation type SPINAL_RELATION_TYPE', async () => {
        const node:any = new SpinalNode();

        await node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);
        assert.strictEqual(typeof node !== 'undefined', true);
        assert.strictEqual(node.hasRelation(DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE), true);

        const children = await node.getChildren([DEFAULT_RELATION_NAME]);

        assert.strictEqual(children.length, 1);
        assert.strictEqual(children[0], DEFAULT_NODE);
      });

      it('should add a child to the node with a relation type SPINAL_RELATION_TYPE', async () => {
        const node:any = new SpinalNode();

        node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, SPINAL_RELATION_PTR_LST_TYPE);
        assert.strictEqual(typeof node !== 'undefined', true);
        assert.strictEqual(
          node.hasRelation(DEFAULT_RELATION_NAME, SPINAL_RELATION_PTR_LST_TYPE), true);

        const children = await node.getChildren([DEFAULT_RELATION_NAME]);

        assert.strictEqual(children.length, 1);
        assert.strictEqual(children[0], DEFAULT_NODE);
      });

      it('should add a child to the node with a relation type SPINAL_RELATION_LST_PTR_TYPE',
         async () => {
           const node:any = new SpinalNode();

           await node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, SPINAL_RELATION_LST_PTR_TYPE);
           assert.strictEqual(typeof node !== 'undefined', true);
           assert.strictEqual(
             node.hasRelation(DEFAULT_RELATION_NAME, SPINAL_RELATION_LST_PTR_TYPE), true);

           const children = await node.getChildren([DEFAULT_RELATION_NAME]);

           assert.strictEqual(children.length, 1);
           assert.strictEqual(children[0], DEFAULT_NODE);
         });

      it('should return the node added to the relation', async () => {
        const node:any = new SpinalNode();
        const childNode = new SpinalNode();
        const childModel = new Model();

        const res1 = await node.addChild(childNode, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);

        assert.strictEqual(res1, childNode);

        const res2 = await node.addChild(childModel, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);
        const res2Elem = await res2.getElement();

        assert.strictEqual(res2Elem, childModel);
      });

      it('should throw an error if you try to add the same node twice', async () => {
        const node:any = new SpinalNode();
        let error;

        await node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);

        try {
          await node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it('should throw an error if the child is not a model', async () => {
        const node:any = new SpinalNode();
        let error = false;

        try {
          await node.addChild(<any>[], DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it('should throw an error if the relation name is missing', async () => {
        const node:any = new SpinalNode();
        let error = false;

        try {
          await node.addChild(DEFAULT_NODE, undefined, SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it('should throw an error if the relation name is not a string', async () => {
        const node:any = new SpinalNode();
        let error = false;

        try {
          await node.addChild(DEFAULT_NODE, <any>1, SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it('should throw an error if the relation type is missing', async () => {
        const node:any = new SpinalNode();
        let error = false;

        try {
          await node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it('should throw an error if the relation type is invalid', async () => {
        const node:any = new SpinalNode();
        let error = false;

        try {
          await node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, 1);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });
    });

    describe('How to use addChildInContext', () => {
      it('Should add a child to a node', async () => {
        const node:any = new SpinalNode();
        const context = new SpinalContext();

        await node.addChildInContext(DEFAULT_NODE, DEFAULT_RELATION_NAME,
                                     SPINAL_RELATION_TYPE, context);
        assert.strictEqual(typeof node !== 'undefined', true);
        assert.strictEqual(node.hasRelation(DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE), true);

        const children = await node.getChildren([DEFAULT_RELATION_NAME]);

        assert.strictEqual(children.length, 1);
        assert.strictEqual(children[0], DEFAULT_NODE);
      });

      it('Shoud add a child and associate it to the context', async () => {
        const context = new SpinalContext();
        const parent:any = new SpinalNode();
        const child = new SpinalNode();

        await parent.addChildInContext(child, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE, context);

        assert.deepStrictEqual(child.getContextIds(), [context.getId().get()]);
      });

      it('should return the node added to the relation', async () => {
        const node = new SpinalNode(DEFAULT_RELATION_NAME);
        const context = new SpinalContext();
        const childNode = new SpinalNode();
        const childModel = new Model();

        const res1 = await node.addChildInContext(childNode,
                                                  DEFAULT_RELATION_NAME,
                                                  SPINAL_RELATION_TYPE, context);

        assert.strictEqual(res1, childNode);

        const res2 = await node.addChildInContext(childModel,
                                                  DEFAULT_RELATION_NAME,
                                                  SPINAL_RELATION_TYPE, context);
        const res2Elem = await res2.getElement();

        assert.strictEqual(res2Elem, childModel);
      });

      it('should throw an error if you try to add the same node twice', async () => {
        const node = new SpinalNode(DEFAULT_RELATION_NAME);
        const context = new SpinalContext();
        let error = false;

        await node.addChildInContext(DEFAULT_NODE,
                                     DEFAULT_RELATION_NAME,
                                     SPINAL_RELATION_TYPE, context);

        try {
          await node.addChildInContext(DEFAULT_NODE,
                                       DEFAULT_RELATION_NAME,
                                       SPINAL_RELATION_TYPE, context);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it('should throw an error if the child is not a model', async () => {
        const node = new SpinalNode(DEFAULT_RELATION_NAME);
        const context = new SpinalContext();
        let error = false;

        try {
          await node.addChildInContext(<any>[],
                                       DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE, context);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it('should throw an error if the relation name is missing', async () => {
        const node:any = new SpinalNode();
        const context = new SpinalContext();
        let error = false;

        try {
          await node.addChildInContext(DEFAULT_NODE, undefined, SPINAL_RELATION_TYPE, context);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it('should throw an error if the relation name is not a string', async () => {
        const node:any = new SpinalNode();
        const context = new SpinalContext();
        let error = false;

        try {
          await node.addChildInContext(DEFAULT_NODE, <any>1, SPINAL_RELATION_TYPE, context);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it('should throw an error if the relation type is missing', async () => {
        const node:any = new SpinalNode();
        const context = new SpinalContext();
        let error = false;

        try {
          await node.addChildInContext(DEFAULT_NODE, DEFAULT_RELATION_NAME, undefined, context);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it('should throw an error if the relation type is invalid', async () => {
        const node:any = new SpinalNode();
        const context = new SpinalContext();
        let error = false;

        try {
          await node.addChildInContext(DEFAULT_NODE, DEFAULT_RELATION_NAME, <any>1, context);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it('should throw an error if the context is missing', async () => {
        const node:any = new SpinalNode();
        let error = false;

        try {
          await node.addChildInContext(DEFAULT_NODE,
                                       DEFAULT_RELATION_NAME,
                                       SPINAL_RELATION_LST_PTR_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it('should throw an error if the context is not a SpinalContext', async () => {
        const node:any = new SpinalNode();
        let error = false;

        try {
          await node.addChildInContext(DEFAULT_NODE,
                                       DEFAULT_RELATION_NAME,
                                       SPINAL_RELATION_LST_PTR_TYPE, 1);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });
    });
  });

  describe('How to remove child(s)', () => {
    describe('How to use removeChild', () => {
      it('should remove the child', async () => {
        const node:any = new SpinalNode();

        await node.addChild(node, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);
        await node.removeChild(node, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);

        const children = await node.getChildren([]);
        assert.deepStrictEqual(children, []);
      });

      it('should throw if the relation name is missing', async () => {
        const node:any = new SpinalNode();
        let error = false;

        try {
          await node.removeChild(node, undefined, SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it('should throw if the relation name is not a string', async () => {
        const node:any = new SpinalNode();
        let error = false;

        try {
          await node.removeChild(node, 1, SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it('should throw if the relation type is missing', async () => {
        const node:any = new SpinalNode();
        let error = false;

        try {
          await node.removeChild(node, DEFAULT_RELATION_NAME);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it('should throw if the relation type is invalid', async () => {
        const node:any = new SpinalNode();
        let error = false;

        try {
          await node.removeChild(node, DEFAULT_RELATION_NAME, 1);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw if the relation doesn't exist", async () => {
        const node:any = new SpinalNode();
        let error = false;

        await node.addChild(node, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);

        try {
          await node.removeChild(node, `${DEFAULT_RELATION_NAME}1`, SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);

        error = false;
        try {
          await node.removeChild(node, DEFAULT_RELATION_NAME, `${SPINAL_RELATION_TYPE}1`);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);

        const children = await node.getChildren([]);
        assert.deepStrictEqual(children, [node]);
      });

      it('should throw if the node is missing', async () => {
        const node:any = new SpinalNode();
        let error = false;

        try {
          await node.removeChild(undefined, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it('should throw if the node is not a child', async () => {
        const node:any = new SpinalNode();
        let error = false;

        try {
          await node.removeChild(node, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });
    });

    describe('How to use removeChildren', () => {
      it('should delete all of the children', async () => {
        const parent:any = new SpinalNode();
        const node1 = new SpinalNode();
        const node2 = new SpinalNode();
        const node3 = new SpinalNode();

        await Promise.all([
          parent.addChild(node1, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
          parent.addChild(node2, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
          parent.addChild(node3, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
        ]);

        await parent.removeChildren([node1, node2, node3],
                                    DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);

        const children = await parent.getChildren();
        assert.deepStrictEqual(children, []);
      });

      it('should delete the given children', async () => {
        const parent:any = new SpinalNode();
        const node1 = new SpinalNode();
        const node2 = new SpinalNode();
        const node3 = new SpinalNode();

        await Promise.all([
          parent.addChild(node1, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
          parent.addChild(node2, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
          parent.addChild(node3, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
        ]);

        await parent.removeChildren([
          node3,
          node1,
        ],                          DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);

        const children = await parent.getChildren();
        assert.deepStrictEqual(children, [node2]);
      });

      it('should throw an error if nodes is not an array', async () => {
        const parent:any = new SpinalNode();
        let error = false;

        try {
          await parent.removeChildren(1, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it('should throw an error if an element of nodes is not a SpinalNode', async () => {
        const parent:any = new SpinalNode();
        const node1 = new SpinalNode();
        let error = false;

        await Promise.all([
          parent.addChild(node1, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
        ]);

        try {
          await parent.removeChildren([
            node1,
            1,
          ],                          DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it('should throw an error if an element of nodes is not a child', async () => {
        const parent:any = new SpinalNode();
        const node1 = new SpinalNode();
        const node2 = new SpinalNode();
        let error = false;

        await Promise.all([
          parent.addChild(node1, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
        ]);

        try {
          await parent.removeChildren([
            node1,
            node2,
          ],                          DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it('should throw if the relation name is missing', async () => {
        const node:any = new SpinalNode();
        let error = false;

        try {
          await node.removeChildren([], undefined, SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it('should throw if the relation name is not a string', async () => {
        const node:any = new SpinalNode();
        let error = false;

        try {
          await node.removeChildren([], 1, SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it('should throw if the relation type is missing', async () => {
        const node:any = new SpinalNode();
        let error = false;

        try {
          await node.removeChildren([], DEFAULT_RELATION_NAME);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it('should throw if the relation type is invalid', async () => {
        const node:any = new SpinalNode();
        let error = false;

        try {
          await node.removeChildren([], DEFAULT_RELATION_NAME, 1);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw if the relation doesn't exist", async () => {
        const node:any = new SpinalNode();
        const child = new SpinalNode();
        let error = false;

        await node.addChild(child, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);

        try {
          await node.removeChildren([], `${DEFAULT_RELATION_NAME}1`, SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);

        error = false;
        try {
          await node.removeChildren(node, DEFAULT_RELATION_NAME, SPINAL_RELATION_LST_PTR_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);

        const children = await node.getChildren([]);
        assert.deepStrictEqual(children, [child]);
      });
    });

    describe('How to use removeRelation', () => {
      it('should remove the relation', async () => {
        const parent:any = new SpinalNode();
        const child = new SpinalNode();

        await parent.addChild(child, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);
        await parent.removeRelation(DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);

        assert(!parent.hasRelation(DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE));
      });

      it('should throw if the relation name is missing', async () => {
        const node:any = new SpinalNode();
        let error = false;

        try {
          await node.removeRelation(undefined, SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it('should throw if the relation name is not a string', async () => {
        const node:any = new SpinalNode();
        let error = false;

        try {
          await node.removeRelation(node, 1, SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it('should throw if the relation type is missing', async () => {
        const node:any = new SpinalNode();
        let error = false;

        try {
          await node.removeRelation(node, DEFAULT_RELATION_NAME);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it('should throw if the relation type is invalid', async () => {
        const node:any = new SpinalNode();
        let error = false;

        try {
          await node.removeRelation(node, DEFAULT_RELATION_NAME, 1);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw if the relation doesn't exist", async () => {
        const node:any = new SpinalNode();
        let error = false;

        await node.addChild(node, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);

        try {
          await node.removeRelation(`${DEFAULT_RELATION_NAME}1`, SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);

        error = false;
        try {
          await node.removeRelation(DEFAULT_RELATION_NAME, `${SPINAL_RELATION_TYPE}1`);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);

        const children = await node.getChildren([]);
        assert.deepStrictEqual(children, [node]);
      });
    });

    describe('How to use removeFromGraph', () => {
      it('should remove the node from its parents', async () => {
        const node:any = new SpinalNode();
        const parentNode = new SpinalNode();

        await parentNode.addChild(node, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);

        await node.removeFromGraph();

        const children = await parentNode.getChildren([]);
        assert.deepStrictEqual(children, []);
      });

      it('should remove the node from its children', async () => {
        const node:any = new SpinalNode();
        const parentNode = new SpinalNode();

        await parentNode.addChild(node, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);

        await parentNode.removeFromGraph();

        const parents = await parentNode.getParents([]);
        assert.deepStrictEqual(parents, []);
      });
    });
  });

  describe('How to get related nodes', () => {
    describe('How to use getChild', () => {
      it('should get the child', async () => {
        const parent:any = new SpinalNode();
        const child = new SpinalNode();

        await parent.addChild(child, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);

        const res = await parent.getChild(node => node === child,
                                          DEFAULT_RELATION_NAME,
                                          SPINAL_RELATION_TYPE);

        assert.strictEqual(res, child);
      });

      it('should use the relation name', async () => {
        const parent:any = new SpinalNode();
        const child1 = new SpinalNode();
        const child2 = new SpinalNode();
        const child3 = new SpinalNode();
        const child4 = new SpinalNode();

        await Promise.all([
          parent.addChild(child1, `${DEFAULT_RELATION_NAME}1`, SPINAL_RELATION_TYPE),
          parent.addChild(child2, `${DEFAULT_RELATION_NAME}2`, SPINAL_RELATION_TYPE),
          parent.addChild(child3, `${DEFAULT_RELATION_NAME}3`, SPINAL_RELATION_TYPE),
          parent.addChild(child4, `${DEFAULT_RELATION_NAME}4`, SPINAL_RELATION_TYPE),
        ]);

        const res = await parent.getChild(() => true, `${DEFAULT_RELATION_NAME}3`,
                                          SPINAL_RELATION_TYPE);

        assert.strictEqual(res, child3);
      });

      it('should use the relation type', async () => {
        const parent:any = new SpinalNode();
        const child1 = new SpinalNode();
        const child2 = new SpinalNode();
        const child3 = new SpinalNode();

        await Promise.all([
          parent.addChild(child1, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
          parent.addChild(child2, DEFAULT_RELATION_NAME, SPINAL_RELATION_LST_PTR_TYPE),
          parent.addChild(child3, DEFAULT_RELATION_NAME, SPINAL_RELATION_PTR_LST_TYPE),
        ]);

        const res = await parent.getChild(() => true, DEFAULT_RELATION_NAME,
                                          SPINAL_RELATION_PTR_LST_TYPE);

        assert.strictEqual(res, child3);
      });

      it("should return undefined if the child doesn't exist", async () => {
        const parent:any = new SpinalNode();
        const child = new SpinalNode();

        await parent.addChild(child, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);

        const res = await parent.getChild(() => false, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);

        assert.strictEqual(res, undefined);
      });

      it('should throw if the relation name is missing', async () => {
        const parent:any = new SpinalNode();
        const child = new SpinalNode();
        let error = false;

        await parent.addChild(child, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);

        try {
          await parent.getChild(() => true, undefined, SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it('should throw if the relation name is not a string', async () => {
        const parent:any = new SpinalNode();
        const child = new SpinalNode();
        let error = false;

        await parent.addChild(child, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);

        try {
          await parent.getChild(() => true, 1, SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it('should throw if the relation type is missing', async () => {
        const parent:any = new SpinalNode();
        const child = new SpinalNode();
        let error = false;

        await parent.addChild(child, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);

        try {
          await parent.getChild(() => true, DEFAULT_RELATION_NAME);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it('should throw if the relation type is invalid', async () => {
        const parent:any = new SpinalNode();
        const child = new SpinalNode();
        let error = false;

        await parent.addChild(child, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);

        try {
          await parent.getChild(() => true, DEFAULT_RELATION_NAME, false);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw if the relation doesn't exist", async () => {
        const parent:any = new SpinalNode();
        const child = new SpinalNode();
        let error = false;

        await parent.addChild(child, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);

        try {
          await parent.getChild(() => true, `${DEFAULT_RELATION_NAME}1`, SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);

        error = false;
        try {
          await parent.getChild(() => true, DEFAULT_RELATION_NAME, SPINAL_RELATION_LST_PTR_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it('should throw if the predicate is missing', async () => {
        const parent:any = new SpinalNode();
        const child = new SpinalNode();
        let error = false;

        await parent.addChild(child, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);

        try {
          await parent.getChild(undefined, DEFAULT_RELATION_NAME, false);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it('should throw if the predicate is not a function', async () => {
        const parent:any = new SpinalNode();
        const child = new SpinalNode();
        let error = false;

        await parent.addChild(child, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);

        try {
          await parent.getChild(123, DEFAULT_RELATION_NAME, false);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });
    });

    describe('How to use getChildren', () => {
      it('should return no children', async () => {
        const node:any = new SpinalNode();
        const children = await node.getChildren([]);

        assert.deepStrictEqual(children, []);
      });

      it('should return some children', async () => {
        const node:any = new SpinalNode();

        await Promise.all([
          node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
          node.addChild(DEFAULT_NODE, `${DEFAULT_RELATION_NAME}2`, SPINAL_RELATION_TYPE),
        ]);

        const children = await node.getChildren([DEFAULT_RELATION_NAME]);
        assert.deepStrictEqual(children, [DEFAULT_NODE]);
      });

      it('should return all children', async () => {
        const node:any = new SpinalNode();

        await Promise.all([
          node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
          node.addChild(DEFAULT_NODE, `${DEFAULT_RELATION_NAME}2`, SPINAL_RELATION_TYPE),
        ]);

        const children = await node.getChildren([]);
        assert.deepStrictEqual(children, [DEFAULT_NODE, DEFAULT_NODE]);
      });

      it('should return all children also', async () => {
        const node:any = new SpinalNode();

        await Promise.all([
          node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
          node.addChild(DEFAULT_NODE, `${DEFAULT_RELATION_NAME}2`, SPINAL_RELATION_TYPE),
        ]);

        const children = await node.getChildren();
        assert.deepStrictEqual(children, [DEFAULT_NODE, DEFAULT_NODE]);
      });

      it('should return children for one relation name passed has string', async () => {
        const node:any = new SpinalNode();

        await Promise.all([
          node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
          node.addChild(DEFAULT_NODE, `${DEFAULT_RELATION_NAME}2`, SPINAL_RELATION_TYPE),
        ]);

        const children = await node.getChildren(DEFAULT_RELATION_NAME);
        assert.deepStrictEqual(children, [DEFAULT_NODE]);
      });

      it('should throw an error if relationNames is neither an array, a string or omitted',
         async () => {
           const parent:any = new SpinalNode();
           let error = false;

           try {
             await parent.getChildren(1);
           } catch (e) {
             error = true;
             assert(e instanceof Error);
           }
           assert(error);
         });

      it('should throw an error if an element of relationNames is not a string', async () => {
        const parent:any = new SpinalNode();
        const node1 = new SpinalNode();
        let error = false;

        await Promise.all([
          parent.addChild(node1, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
        ]);

        try {
          await parent.getChildren([
            `${DEFAULT_RELATION_NAME}1`,
            1,
          ]);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });
    });

    describe('How to use getChildrenInContext', () => {
      it("should return the node's child", async () => {
        const context = new SpinalContext();
        const parent:any = new SpinalNode();
        const child = new SpinalNode();

        await parent.addChildInContext(child, DEFAULT_RELATION_NAME,
                                       SPINAL_RELATION_PTR_LST_TYPE, context);

        const children = await parent.getChildrenInContext(context);
        assert.deepStrictEqual(children, [child]);
      });

      it("should return the node's children associated to the context", async () => {
        const context = new SpinalContext();
        const parent:any = new SpinalNode();
        const child1 = new SpinalNode();
        const child2 = new SpinalNode();
        const child3 = new SpinalNode();

        await Promise.all([
          parent.addChildInContext(child1, DEFAULT_RELATION_NAME,
                                   SPINAL_RELATION_LST_PTR_TYPE, context),
          parent.addChild(child2, DEFAULT_RELATION_NAME, SPINAL_RELATION_PTR_LST_TYPE),
          parent.addChildInContext(child3, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE, context),
        ]);

        const children = await parent.getChildrenInContext(context);
        assert.deepStrictEqual(children, [child1, child3]);
      });

      it('should throw an error if the context is missing', async () => {
        const parent:any = new SpinalNode();
        let error = false;

        try {
          await parent.getChildrenInContext();
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it('should throw an error if the context is not a SpinalContext', async () => {
        const parent:any = new SpinalNode();
        let error = false;

        try {
          await parent.getChildrenInContext(1);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });
    });

    describe('How to use getParents', () => {
      it('should return no parents', async () => {
        const node:any = new SpinalNode();
        const parents = await node.getParents([]);

        assert.deepStrictEqual(parents, []);
      });

      it('should return some parents', async () => {
        const parentNode1 = new SpinalNode();
        const parentNode2 = new SpinalNode();
        const childNode = new SpinalNode();

        await Promise.all([
          parentNode1.addChild(childNode, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
          parentNode2.addChild(childNode, `${DEFAULT_RELATION_NAME}2`, SPINAL_RELATION_TYPE),
        ]);

        const parents = await childNode.getParents([DEFAULT_RELATION_NAME]);
        assert.deepStrictEqual(parents, [parentNode1]);
      });

      it('should return one parents', async () => {
        const parentNode1 = new SpinalNode();
        const parentNode2 = new SpinalNode();
        const childNode = new SpinalNode();

        await Promise.all([
          parentNode1.addChild(childNode, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
          parentNode2.addChild(childNode, `${DEFAULT_RELATION_NAME}2`, SPINAL_RELATION_TYPE),
        ]);

        const parents = await childNode.getParents(DEFAULT_RELATION_NAME);
        assert.deepStrictEqual(parents, [parentNode1]);
      });

      it('should return all parents', async () => {
        const parentNode1 = new SpinalNode();
        const parentNode2 = new SpinalNode();
        const childNode = new SpinalNode();

        await Promise.all([
          parentNode1.addChild(childNode, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
          parentNode2.addChild(childNode, `${DEFAULT_RELATION_NAME}2`, SPINAL_RELATION_TYPE),
        ]);

        const parents = await childNode.getParents([]);
        assert.deepStrictEqual(parents, [parentNode1, parentNode2]);
      });

      it('should return all parents with a certain relation name', async () => {
        const parentNode1 = new SpinalNode();
        const parentNode2 = new SpinalNode();
        const childNode = new SpinalNode();

        await Promise.all([
          parentNode1.addChild(childNode, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
          parentNode2.addChild(childNode, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
        ]);

        const parents = await childNode.getParents([]);
        assert.deepStrictEqual(parents, [parentNode1, parentNode2]);
      });

      it('should throw an error if relationNames is neither an array, a string or omitted',
         async () => {
           const parent:any = new SpinalNode();
           let error = false;

           try {
             await parent.getParents(1);
           } catch (e) {
             error = true;
             assert(e instanceof Error);
           }
           assert(error);
         });

      it('should throw an error if an element of relationNames is not a string', async () => {
        const parent:any = new SpinalNode();
        const child = new SpinalNode();
        let error = false;

        await Promise.all([
          parent.addChild(child, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
        ]);

        try {
          await child.getParents([
            `${DEFAULT_RELATION_NAME}1`,
            <any>1,
          ]);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });
    });
  });
});
