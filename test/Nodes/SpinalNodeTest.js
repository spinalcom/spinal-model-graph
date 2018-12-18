const lib = require("../../build/index");
const globalType = typeof window === "undefined" ? global : window;

const assert = require("assert");

const DEFAULT_SPINAL_NODE_NAME = "undefined";
const DEFAULT_SPINAL_NODE_TYPE = "SpinalNode";
const CUSTOM_SPINAL_NODE_NAME = "SpinalNodeTestName";
const CUSTOM_SPINAL_NODE_TYPE = "SpinalNodeTestType";
const DEFAULT_RELATION_NAME = "has child";
const DEFAULT_ELEMENT_NAME = "Default Name";
const CUSTOM_RELATION_NAME1 = "custom relation";
const CUSTOM_RELATION_NAME2 = "custom relation 2";
const DEFAULT_ELEMENT = new globalType.Model();
DEFAULT_ELEMENT.add_attr({
  name: DEFAULT_ELEMENT_NAME
});
const DEFAULT_NODE = new lib.SpinalNode(CUSTOM_SPINAL_NODE_NAME);

describe("SpinalNode", function() {
  describe("How to use the constructor", function() {
    it('should create a new spinal node.', async function() {
      const node = new lib.SpinalNode();

      assert.strictEqual(
        node.getName().get(),
        DEFAULT_SPINAL_NODE_NAME
      );

      assert.strictEqual(
        node.getType().get(),
        DEFAULT_SPINAL_NODE_TYPE
      );

      const elt = await node.getElement();
      assert.strictEqual(
        elt instanceof Model,
        true,
      );
    });

    it('should create spinal a new SpinalNode with a specific name.', function() {
      const node = new lib.SpinalNode(CUSTOM_SPINAL_NODE_NAME);

      assert.strictEqual(
        node.getName().get(),
        CUSTOM_SPINAL_NODE_NAME,
        "By setting the first argument of the construct the name should be setElement."
      );
    });

    it('should create a new SpinalNode with specific name and type.', function() {
      const node = new lib.SpinalNode(CUSTOM_SPINAL_NODE_NAME,
        CUSTOM_SPINAL_NODE_TYPE);

      assert.strictEqual(
        node.getName().get(),
        CUSTOM_SPINAL_NODE_NAME,
        "By setting the first argument of the construct the name should be setElement."
      );

      assert.strictEqual(
        node.getType().get(),
        CUSTOM_SPINAL_NODE_TYPE,
        "By setting the second argument of the construct the type should be setElement."
      );
    });

    it('should create a new SpinalNode with specific name, type and element', async function() {
      const node = new lib.SpinalNode(CUSTOM_SPINAL_NODE_NAME, CUSTOM_SPINAL_NODE_TYPE, new lib.SpinalNode());

      assert.strictEqual(
        node.getName().get(),
        CUSTOM_SPINAL_NODE_NAME,
        "By setting the first argument of the construct the name should be setElement."
      );

      assert.strictEqual(
        node.getType().get(),
        CUSTOM_SPINAL_NODE_TYPE,
        "By setting the second argument of the construct the type should be setElement."
      );

      const elt = await node.getElement();
      assert(
        elt instanceof lib.SpinalNode,
        "By setting the third argument of the construct the element should be setElement."
      );
    });
  });

  describe("How to get/set information about the node", function() {
    describe("How to use getName", function() {
      it('should return the name CUSTOM_SPINAL_NODE_NAME', function() {
        let node = new lib.SpinalNode(CUSTOM_SPINAL_NODE_NAME);
        assert.strictEqual(
          node.getName().get(),
          CUSTOM_SPINAL_NODE_NAME,
          "By setting the first argument of the construct the name should be setElement."
        );
      });
    });

    describe("How to use getType", function() {
      it('should return the type CUSTOM_SPINAL_NODE_TYPE', function() {
        let node = new lib.SpinalNode(CUSTOM_SPINAL_NODE_NAME,
          CUSTOM_SPINAL_NODE_TYPE);
        assert.strictEqual(
          node.getType().get(),
          CUSTOM_SPINAL_NODE_TYPE,
          "By setting the first argument of the construct the type should be setElement."
        );
      });
    });

    describe("How to getElement", function() {
      it('should return the DEFAULT_ELEMENT', async function() {
        let node = new lib.SpinalNode(CUSTOM_SPINAL_NODE_NAME, CUSTOM_SPINAL_NODE_TYPE, DEFAULT_ELEMENT);

        const elt = await node.getElement();
        assert.strictEqual(
          elt,
          DEFAULT_ELEMENT,
          "By setting the second argument of the construct the element should be setElement."
        );
      });
    });

    describe("How to use getChildrenIds", function() {
      it("should return no ids", function() {
        const node = new lib.SpinalNode();

        assert.deepStrictEqual(node.getChildrenIds(), []);
      });

      it("should return all children ids", async function() {
        const parent = new lib.SpinalNode();
        const child1 = new lib.SpinalNode();
        const child2 = new lib.SpinalNode();
        const child3 = new lib.SpinalNode();

        const childrenIds = [
          child1.getId().get(),
          child2.getId().get(),
          child3.getId().get()
        ];

        await Promise.all([
          parent.addChild(child1, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_LST_PTR_TYPE),
          parent.addChild(child2, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_LST_PTR_TYPE),
          parent.addChild(child3, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_LST_PTR_TYPE)
        ]);

        assert.deepStrictEqual(parent.getChildrenIds(), childrenIds);
      });
    });

    describe("How to use getNbChildren", function() {
      it("should return 0", function() {
        const node = new lib.SpinalNode();
        const res = node.getNbChildren();

        assert.strictEqual(res, 0);
      });

      it("should return 3", function() {
        const node = new lib.SpinalNode();
        const child1 = new lib.SpinalNode();
        const child2 = new lib.SpinalNode();
        const child3 = new lib.SpinalNode();

        node.addChild(child1, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
        node.addChild(child2, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
        node.addChild(child3, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
        const res = node.getNbChildren();
        assert.strictEqual(res, 3);
      });

      it("should return 2", async function() {
        const node = new lib.SpinalNode();
        const child1 = new lib.SpinalNode();
        const child2 = new lib.SpinalNode();
        const child3 = new lib.SpinalNode();

        await Promise.all([
          node.addChild(child1, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE),
          node.addChild(child2, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE),
          node.addChild(child3, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE)
        ]);

        await node.removeChild(child2, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
        const res = node.getNbChildren();
        assert.strictEqual(res, 2);
      });
    });

    describe("How to use addContextId and getContextId", function() {
      it("should get the ids of the associated contexts", function() {
        const node = new lib.SpinalNode();
        const contextId1 = new lib.SpinalContext().getId().get();
        const contextId2 = new lib.SpinalContext().getId().get();

        node.addContextId(contextId1);

        assert.deepStrictEqual(node.getContextIds(), [
          contextId1
        ]);

        node.addContextId(contextId1);
        node.addContextId(contextId2);

        assert.deepStrictEqual(node.getContextIds(), [
          contextId1, contextId2
        ]);
      });

      it("should throw an error if the id is missing", function() {
        const node = new lib.SpinalNode();
        let error = false;

        try {
          node.addContextId();
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw an error if the id is not a string", function() {
        const node = new lib.SpinalNode();
        let error = false;

        try {
          node.addContextId(contextId1.getId());
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });
    });

    describe("How to use belongsToContext", function() {
      it("should return true", async function() {
        const context = new lib.SpinalContext();
        const parent = new lib.SpinalNode();
        const child = new lib.SpinalNode();

        await parent.addChildInContext(child, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE, context);

        assert(child.belongsToContext(context));
      });

      it("should return false", function() {
        const context = new lib.SpinalContext();
        const node = new lib.SpinalNode();

        assert(!node.belongsToContext(context));
      });

      it("should throw an error if the context is missing", function() {
        const node = new lib.SpinalNode();
        let error = false;

        try {
          assert(!node.belongsToContext(context));
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw an error if the context is missing", function() {
        const node = new lib.SpinalNode();
        let error = false;

        try {
          assert(!node.belongsToContext(1));
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });
    });
  });

  describe("How to get information about the node's relations", function() {
    describe("How to use hasRelation", function() {
      it("should return true", async function() {
        const node = new lib.SpinalNode();

        await node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
        assert.strictEqual(node.hasRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE), true);
      });

      it("should return false", async function() {
        const node = new lib.SpinalNode();

        await node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
        assert.strictEqual(node.hasRelation(CUSTOM_RELATION_NAME1, lib.SPINAL_RELATION_TYPE), false);
      });

      it("should throw an error if the relation name is missing", function() {
        const node = new lib.SpinalNode();
        let error = false;

        try {
          node.hasRelation(undefined, lib.SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw an error if the relation name is not a string", function() {
        const node = new lib.SpinalNode();
        let error = false;

        try {
          node.hasRelation(1, lib.SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw an error if the relation type is missing", function() {
        const node = new lib.SpinalNode();
        let error = false;

        try {
          node.hasRelation(DEFAULT_RELATION_NAME);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw an error if the relation type is not valid", function() {
        const node = new lib.SpinalNode();
        let error = false;

        try {
          node.hasRelation(DEFAULT_RELATION_NAME, 1);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });
    });

    describe("How to use hasRelations", function() {
      it("should return true the node contains all the relations", async function() {
        const node = new lib.SpinalNode();

        await Promise.all([
          node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE),
          node.addChild(DEFAULT_NODE, CUSTOM_RELATION_NAME1, lib.SPINAL_RELATION_TYPE)
        ]);

        assert.strictEqual(node.hasRelations([DEFAULT_RELATION_NAME, CUSTOM_RELATION_NAME1], lib.SPINAL_RELATION_TYPE), true);
      });

      it("should return false if the node doesn't contain all the relations", async function() {
        let node = new lib.SpinalNode();

        await Promise.all([
          node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE),
          node.addChild(DEFAULT_NODE, CUSTOM_RELATION_NAME1, lib.SPINAL_RELATION_TYPE)
        ]);

        assert.strictEqual(node.hasRelations([CUSTOM_RELATION_NAME1, CUSTOM_RELATION_NAME2], lib.SPINAL_RELATION_TYPE), false);
      });

      it("should throw an error if the relation name array is missing", function() {
        const node = new lib.SpinalNode();
        let error = false;

        try {
          node.hasRelations(undefined, lib.SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw an error if the relation name array is not an array", function() {
        const node = new lib.SpinalNode();
        let error = false;

        try {
          node.hasRelations(1, lib.SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw an error if the relation type is missing", function() {
        const node = new lib.SpinalNode();
        let error = false;

        try {
          node.hasRelations([]);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw an error if the relation type is not valid", function() {
        const node = new lib.SpinalNode();
        let error = false;

        try {
          node.hasRelations([], 1);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw an error if on of the relation names is not a string", function() {
        const node = new lib.SpinalNode();
        let error = false;

        try {
          node.hasRelations([1], lib.SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });
    });

    describe("How to use getRelationNames", function() {
      it("should return no name", function() {
        const node = new lib.SpinalNode();

        assert.deepStrictEqual(node.getRelationNames(), []);
      });

      it("should return all relation names", async function() {
        const node = new lib.SpinalNode();
        const child1 = new lib.SpinalNode();
        const child2 = new lib.SpinalNode();
        const child3 = new lib.SpinalNode();
        const child4 = new lib.SpinalNode();
        const child5 = new lib.SpinalNode();

        await Promise.all([
          node.addChild(child1, DEFAULT_RELATION_NAME + "1", lib.SPINAL_RELATION_LST_PTR_TYPE),
          node.addChild(child2, DEFAULT_RELATION_NAME + "2", lib.SPINAL_RELATION_LST_PTR_TYPE),
          node.addChild(child3, DEFAULT_RELATION_NAME + "2", lib.SPINAL_RELATION_LST_PTR_TYPE),
          node.addChild(child4, DEFAULT_RELATION_NAME + "1", lib.SPINAL_RELATION_LST_PTR_TYPE),
          node.addChild(child5, DEFAULT_RELATION_NAME + "4", lib.SPINAL_RELATION_LST_PTR_TYPE),
        ]);
        assert.deepStrictEqual(
          node.getRelationNames(),
          [
            DEFAULT_RELATION_NAME + "1",
            DEFAULT_RELATION_NAME + "2",
            DEFAULT_RELATION_NAME + "4",
          ]
        );
      });

      it("shouldn't return duplicates if there are different relation with the same names but different types", async function() {
        const node = new lib.SpinalNode();
        const child1 = new lib.SpinalNode();
        const child2 = new lib.SpinalNode();
        const child3 = new lib.SpinalNode();

        await Promise.all([
          node.addChild(child1, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE),
          node.addChild(child2, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_LST_PTR_TYPE),
          node.addChild(child3, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_PTR_LST_TYPE),
        ]);
        assert.deepStrictEqual(
          node.getRelationNames(),
          [
            DEFAULT_RELATION_NAME,
          ]
        );
      });
    });
  });

  describe("How to add a child to the node", function() {
    describe("How to use addChild", function() {
      it('should add a child to the node with a relation type SPINAL_RELATION_TYPE', async function() {
        const node = new lib.SpinalNode();

        await node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
        assert.strictEqual(typeof node !== "undefined", true);
        assert.strictEqual(node.hasRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE), true);

        const children = await node.getChildren([DEFAULT_RELATION_NAME]);

        assert.strictEqual(children.length, 1);
        assert.strictEqual(children[0], DEFAULT_NODE);
      });

      it('should add a child to the node with a relation type SPINAL_RELATION_TYPE', async function() {
        const node = new lib.SpinalNode();

        node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_PTR_LST_TYPE);
        assert.strictEqual(typeof node !== "undefined", true);
        assert.strictEqual(node.hasRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_PTR_LST_TYPE), true);

        const children = await node.getChildren([DEFAULT_RELATION_NAME]);

        assert.strictEqual(children.length, 1);
        assert.strictEqual(children[0], DEFAULT_NODE);
      });

      it('should add a child to the node with a relation type SPINAL_RELATION_LST_PTR_TYPE', async function() {
        const node = new lib.SpinalNode();

        await node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_LST_PTR_TYPE);
        assert.strictEqual(typeof node !== "undefined", true);
        assert.strictEqual(node.hasRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_LST_PTR_TYPE), true);

        const children = await node.getChildren([DEFAULT_RELATION_NAME]);

        assert.strictEqual(children.length, 1);
        assert.strictEqual(children[0], DEFAULT_NODE);
      });

      it("should return the node added to the relation", async function() {
        let node = new lib.SpinalNode();
        let childNode = new lib.SpinalNode();
        let childModel = new globalType.Model();

        const res1 = await node.addChild(childNode, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);

        assert.strictEqual(res1, childNode);

        const res2 = await node.addChild(childModel, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
        const res2Elem = await res2.getElement();

        assert.strictEqual(res2Elem, childModel);
      });

      it("should throw an error if you try to add the same node twice", async function() {
        const node = new lib.SpinalNode();
        let error;

        await node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);

        try {
          await node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw an error if the child is not a model", async function() {
        const node = new lib.SpinalNode();
        let error = false;

        try {
          await node.addChild(new Array(), DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw an error if the relation name is missing", async function() {
        const node = new lib.SpinalNode();
        let error = false;

        try {
          await node.addChild(DEFAULT_NODE, undefined, lib.SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw an error if the relation name is not a string", async function() {
        const node = new lib.SpinalNode();
        let error = false;

        try {
          await node.addChild(DEFAULT_NODE, 1, lib.SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw an error if the relation type is missing", async function() {
        const node = new lib.SpinalNode();
        let error = false;

        try {
          await node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw an error if the relation type is invalid", async function() {
        const node = new lib.SpinalNode();
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

    describe("How to use addChildInContext", function() {
      it("Should add a child to a node", async function() {
        const node = new lib.SpinalNode();
        const context = new lib.SpinalContext();

        await node.addChildInContext(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE, context);
        assert.strictEqual(typeof node !== "undefined", true);
        assert.strictEqual(node.hasRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE), true);

        const children = await node.getChildren([DEFAULT_RELATION_NAME]);

        assert.strictEqual(children.length, 1);
        assert.strictEqual(children[0], DEFAULT_NODE);
      });

      it("Shoud add a child and associate it to the context", async function() {
        const context = new lib.SpinalContext();
        const parent = new lib.SpinalNode();
        const child = new lib.SpinalNode();

        await parent.addChildInContext(child, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE, context);

        assert.deepStrictEqual(child.getContextIds(), [context.getId().get()]);
      });

      it("should return the node added to the relation", async function() {
        const node = new lib.SpinalNode(DEFAULT_RELATION_NAME);
        const context = new lib.SpinalContext();
        const childNode = new lib.SpinalNode();
        const childModel = new globalType.Model();

        const res1 = await node.addChildInContext(childNode, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE, context);

        assert.strictEqual(res1, childNode);

        const res2 = await node.addChildInContext(childModel, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE, context);
        const res2Elem = await res2.getElement();

        assert.strictEqual(res2Elem, childModel);
      });

      it("should throw an error if you try to add the same node twice", async function() {
        const node = new lib.SpinalNode(DEFAULT_RELATION_NAME);
        const context = new lib.SpinalContext();
        let error = false;

        await node.addChildInContext(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE, context);

        try {
          await node.addChildInContext(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE, context);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw an error if the child is not a model", async function() {
        const node = new lib.SpinalNode(DEFAULT_RELATION_NAME);
        const context = new lib.SpinalContext();
        let error = false;

        try {
          await node.addChildInContext(new Array(), DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE, context);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw an error if the relation name is missing", async function() {
        const node = new lib.SpinalNode();
        const context = new lib.SpinalContext()
        let error = false;

        try {
          await node.addChildInContext(DEFAULT_NODE, undefined, lib.SPINAL_RELATION_TYPE, context);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw an error if the relation name is not a string", async function() {
        const node = new lib.SpinalNode();
        const context = new lib.SpinalContext()
        let error = false;

        try {
          await node.addChildInContext(DEFAULT_NODE, 1, lib.SPINAL_RELATION_TYPE, context);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw an error if the relation type is missing", async function() {
        const node = new lib.SpinalNode();
        const context = new lib.SpinalContext()
        let error = false;

        try {
          await node.addChildInContext(DEFAULT_NODE, DEFAULT_RELATION_NAME, undefined, context);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw an error if the relation type is invalid", async function() {
        const node = new lib.SpinalNode();
        const context = new lib.SpinalContext()
        let error = false;

        try {
          await node.addChildInContext(DEFAULT_NODE, DEFAULT_RELATION_NAME, 1, context);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw an error if the context is missing", async function() {
        const node = new lib.SpinalNode();
        const context = new lib.SpinalContext()
        let error = false;

        try {
          await node.addChildInContext(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_LST_PTR_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw an error if the context is not a SpinalContext", async function() {
        const node = new lib.SpinalNode();
        const context = new lib.SpinalContext()
        let error = false;

        try {
          await node.addChildInContext(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_LST_PTR_TYPE, 1);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });
    });
  });

  describe("How to remove child(s)", function() {
    describe("How to use removeChild", function() {
      it("should remove the child", async function() {
        let node = new lib.SpinalNode();

        await node.addChild(node, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
        await node.removeChild(node, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);

        const children = await node.getChildren([]);
        assert.deepStrictEqual(children, []);
      });

      it("should throw if the relation name is missing", async function() {
        const node = new lib.SpinalNode();
        let error = false;

        try {
          await node.removeChild(node, undefined, lib.SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw if the relation name is not a string", async function() {
        const node = new lib.SpinalNode();
        let error = false;

        try {
          await node.removeChild(node, 1, lib.SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw if the relation type is missing", async function() {
        const node = new lib.SpinalNode();
        let error = false;

        try {
          await node.removeChild(node, DEFAULT_RELATION_NAME);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw if the relation type is invalid", async function() {
        const node = new lib.SpinalNode();
        let error = false;

        try {
          await node.removeChild(node, DEFAULT_RELATION_NAME, 1);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw if the relation doesn't exist", async function() {
        const node = new lib.SpinalNode();
        let error = false;

        await node.addChild(node, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);

        try {
          await node.removeChild(node, DEFAULT_RELATION_NAME + "1", lib.SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);

        error = false;
        try {
          await node.removeChild(node, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE + "1");
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);

        const children = await node.getChildren([]);
        assert.deepStrictEqual(children, [node]);
      });

      it("should throw if the node is missing", async function() {
        const node = new lib.SpinalNode();
        let error = false;

        try {
          await node.removeChild(undefined, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw if the node is not a child", async function() {
        const node = new lib.SpinalNode();
        let error = false;

        try {
          await node.removeChild(node, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });
    });

    describe("How to use removeChildren", function() {
      it("should delete all of the children", async function() {
        const parent = new lib.SpinalNode();
        const node1 = new lib.SpinalNode();
        const node2 = new lib.SpinalNode();
        const node3 = new lib.SpinalNode();

        await Promise.all([
          parent.addChild(node1, DEFAULT_RELATION_NAME + "1", lib.SPINAL_RELATION_LST_PTR_TYPE),
          parent.addChild(node2, DEFAULT_RELATION_NAME + "1", lib.SPINAL_RELATION_TYPE),
          parent.addChild(node3, DEFAULT_RELATION_NAME + "2", lib.SPINAL_RELATION_PTR_LST_TYPE)
        ]);

        await parent.removeChildren();

        const children = await parent.getChildren();
        assert.deepStrictEqual(children, []);
      });

      it("should delete the given children", async function() {
        const parent = new lib.SpinalNode();
        const node1 = new lib.SpinalNode();
        const node2 = new lib.SpinalNode();
        const node3 = new lib.SpinalNode();

        await Promise.all([
          parent.addChild(node1, DEFAULT_RELATION_NAME + "1", lib.SPINAL_RELATION_TYPE),
          parent.addChild(node2, DEFAULT_RELATION_NAME + "2", lib.SPINAL_RELATION_TYPE),
          parent.addChild(node3, DEFAULT_RELATION_NAME + "3", lib.SPINAL_RELATION_TYPE)
        ]);

        await parent.removeChildren([
          DEFAULT_RELATION_NAME + "1",
          DEFAULT_RELATION_NAME + "3"
        ]);

        const children = await parent.getChildren();
        assert.deepStrictEqual(children, [node2]);
      });

      it("should throw an error if relationNames is neither an array, a string or omitted", async function() {
        const parent = new lib.SpinalNode();
        let error = false;

        try {
          await parent.removeChildren(1);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw an error if an element of relationNames is not a string", async function() {
        const parent = new lib.SpinalNode();
        const node1 = new lib.SpinalNode();
        let error = false;

        await Promise.all([
          parent.addChild(node1, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE)
        ]);


        try {
          await parent.removeChildren([
            DEFAULT_RELATION_NAME + "1",
            1
          ]);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });
    });

    describe("How to use removeRelation", function() {
      it("should remove the relation", async function() {
        const parent = new lib.SpinalNode();
        const child = new lib.SpinalNode();

        await parent.addChild(child, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
        await parent.removeRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);

        assert(!parent.hasRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE));
      });

      it("should throw if the relation name is missing", async function() {
        const node = new lib.SpinalNode();
        let error = false;

        try {
          await node.removeRelation(undefined, lib.SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw if the relation name is not a string", async function() {
        const node = new lib.SpinalNode();
        let error = false;

        try {
          await node.removeRelation(node, 1, lib.SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw if the relation type is missing", async function() {
        const node = new lib.SpinalNode();
        let error = false;

        try {
          await node.removeRelation(node, DEFAULT_RELATION_NAME);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw if the relation type is invalid", async function() {
        const node = new lib.SpinalNode();
        let error = false;

        try {
          await node.removeRelation(node, DEFAULT_RELATION_NAME, 1);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw if the relation doesn't exist", async function() {
        const node = new lib.SpinalNode();
        let error = false;

        await node.addChild(node, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);

        try {
          await node.removeRelation(DEFAULT_RELATION_NAME + "1", lib.SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);

        error = false;
        try {
          await node.removeRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE + "1");
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);

        const children = await node.getChildren([]);
        assert.deepStrictEqual(children, [node]);
      });
    });

    describe("How to use removeFromGraph", function() {
      it('should remove the node from its parents', async function() {
        let node = new lib.SpinalNode();
        let parentNode = new lib.SpinalNode();

        await parentNode.addChild(node, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);

        await node.removeFromGraph();

        const children = await parentNode.getChildren([]);
        assert.deepStrictEqual(children, []);
      });

      it('should remove the node from its children', async function() {
        let node = new lib.SpinalNode();
        let parentNode = new lib.SpinalNode();

        await parentNode.addChild(node, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);

        await parentNode.removeFromGraph();

        const parents = await parentNode.getParents([]);
        assert.deepStrictEqual(parents, []);
      });
    });
  });

  describe("How to get related nodes", function() {
    describe("How to use getChildren", function() {
      it("should return no children", async function() {
        const node = new lib.SpinalNode();
        const children = await node.getChildren([]);

        assert.deepStrictEqual(children, []);
      });

      it("should return some children", async function() {
        const node = new lib.SpinalNode();

        await Promise.all([
          node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE),
          node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME + "2", lib.SPINAL_RELATION_TYPE)
        ]);

        const children = await node.getChildren([DEFAULT_RELATION_NAME]);
        assert.deepStrictEqual(children, [DEFAULT_NODE]);
      });

      it("should return all children", async function() {
        const node = new lib.SpinalNode();

        await Promise.all([
          node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE),
          node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME + "2", lib.SPINAL_RELATION_TYPE)
        ]);

        const children = await node.getChildren([]);
        assert.deepStrictEqual(children, [DEFAULT_NODE, DEFAULT_NODE]);
      });

      it("should return all children also", async function() {
        const node = new lib.SpinalNode();

        await Promise.all([
          node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE),
          node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME + "2", lib.SPINAL_RELATION_TYPE),
        ]);

        const children = await node.getChildren();
        assert.deepStrictEqual(children, [DEFAULT_NODE, DEFAULT_NODE]);
      });

      it("should return children for one relation name passed has string", async function() {
        const node = new lib.SpinalNode();

        await Promise.all([
          node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE),
          node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME + "2", lib.SPINAL_RELATION_TYPE)
        ]);

        const children = await node.getChildren(DEFAULT_RELATION_NAME);
        assert.deepStrictEqual(children, [DEFAULT_NODE]);
      });

      it("should throw an error if relationNames is neither an array, a string or omitted", async function() {
        const parent = new lib.SpinalNode();
        let error = false;

        try {
          await parent.getChildren(1);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw an error if an element of relationNames is not a string", async function() {
        const parent = new lib.SpinalNode();
        const node1 = new lib.SpinalNode();
        let error = false;

        await Promise.all([
          parent.addChild(node1, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE)
        ]);


        try {
          await parent.getChildren([
            DEFAULT_RELATION_NAME + "1",
            1
          ]);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });
    });

    describe("How to use getChildrenInContext", function() {
      it("should return the node's child", async function() {
        const context = new lib.SpinalContext();
        const parent = new lib.SpinalNode();
        const child = new lib.SpinalNode();

        await parent.addChildInContext(child, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_PTR_LST_TYPE, context);

        const children = await parent.getChildrenInContext(context);
        assert.deepStrictEqual(children, [child]);
      });

      it("should return the node's children associated to the context", async function() {
        const context = new lib.SpinalContext();
        const parent = new lib.SpinalNode();
        const child1 = new lib.SpinalNode();
        const child2 = new lib.SpinalNode();
        const child3 = new lib.SpinalNode();

        await Promise.all([
          parent.addChildInContext(child1, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_LST_PTR_TYPE, context),
          parent.addChild(child2, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_PTR_LST_TYPE),
          parent.addChildInContext(child3, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE, context)
        ]);

        const children = await parent.getChildrenInContext(context);
        assert.deepStrictEqual(children, [child1, child3]);
      });

      it("should throw an error if the context is missing", async function() {
        const parent = new lib.SpinalNode();
        let error = false;

        try {
          await parent.getChildrenInContext();
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw an error if the context is not a SpinalContext", async function() {
        const parent = new lib.SpinalNode();
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

    describe("How to use getParents", function() {
      it("should return no parents", async function() {
        const node = new lib.SpinalNode();
        const parents = await node.getParents([]);

        assert.deepStrictEqual(parents, []);
      });

      it("should return some parents", async function() {
        let parentNode1 = new lib.SpinalNode();
        let parentNode2 = new lib.SpinalNode();
        let childNode = new lib.SpinalNode();

        await Promise.all([
          parentNode1.addChild(childNode, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE),
          parentNode2.addChild(childNode, DEFAULT_RELATION_NAME + "2", lib.SPINAL_RELATION_TYPE)
        ]);

        const parents = await childNode.getParents([DEFAULT_RELATION_NAME]);
        assert.deepStrictEqual(parents, [parentNode1]);
      });

      it("should return all parents", async function() {
        let parentNode1 = new lib.SpinalNode();
        let parentNode2 = new lib.SpinalNode();
        let childNode = new lib.SpinalNode();

        await Promise.all([
          parentNode1.addChild(childNode, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE),
          parentNode2.addChild(childNode, DEFAULT_RELATION_NAME + "2", lib.SPINAL_RELATION_TYPE)
        ]);

        const parents = await childNode.getParents([]);
        assert.deepStrictEqual(parents, [parentNode1, parentNode2]);
      });

      it("should return all parents with a certain relation name", async function() {
        let parentNode1 = new lib.SpinalNode();
        let parentNode2 = new lib.SpinalNode();
        let childNode = new lib.SpinalNode();

        await Promise.all([
          parentNode1.addChild(childNode, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE),
          parentNode2.addChild(childNode, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE)
        ]);

        const parents = await childNode.getParents([]);
        assert.deepStrictEqual(parents, [parentNode1, parentNode2]);
      });

      it("should throw an error if relationNames is neither an array, a string or omitted", async function() {
        const parent = new lib.SpinalNode();
        let error = false;

        try {
          await parent.getParents(1);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw an error if an element of relationNames is not a string", async function() {
        const parent = new lib.SpinalNode();
        const child = new lib.SpinalNode();
        let error = false;

        await Promise.all([
          parent.addChild(child, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE)
        ]);


        try {
          await child.getParents([
            DEFAULT_RELATION_NAME + "1",
            1
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
