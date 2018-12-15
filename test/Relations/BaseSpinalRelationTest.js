const lib = require("../../build/index");
const BaseSpinalRelation = require("../../build/Relations/BaseSpinalRelation").default;
const SpinalRelationLstPtr = require("../../build/Relations/SpinalRelationLstPtr").default;

const globalType = typeof window === "undefined" ? global : window;

const assert = require("assert");

const DEFAULT_RELATION_NAME = "relationName";
const DEFAULT_NODE = new lib.SpinalNode();

describe("BaseSpinalRelation", function() {
  describe("How to use the constructor", function() {
    it("should create a new relation with a name and node parent", async function() {
      const parent = new lib.SpinalNode();
      const rel = new BaseSpinalRelation(parent, DEFAULT_RELATION_NAME);

      assert.strictEqual(rel.getName().get(), DEFAULT_RELATION_NAME);
      assert.strictEqual(await rel.getParent(), parent);
    });

    it("should create a new relation with a name and a context parent", async function() {
      const parent = new lib.SpinalContext();
      const rel = new BaseSpinalRelation(parent, DEFAULT_RELATION_NAME);

      assert.strictEqual(rel.getName().get(), DEFAULT_RELATION_NAME);
      assert.strictEqual(await rel.getParent(), parent);
    });

    it("should create a new relation with a name and a graph parent", async function() {
      const parent = new lib.SpinalGraph();
      const rel = new BaseSpinalRelation(parent, DEFAULT_RELATION_NAME);

      assert.strictEqual(rel.getName().get(), DEFAULT_RELATION_NAME);
      assert.strictEqual(await rel.getParent(), parent);
    });

    it("should throw an error if the parent or the name is missing", async function() {
      let error = false;

      try {
        new BaseSpinalRelation();
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);

      error = false;

      try {
        new BaseSpinalRelation(undefined, DEFAULT_RELATION_NAME);
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);

      try {
        new BaseSpinalRelation(parent2);
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);
    });

    it("should throw an error if the parent is not a SpinalNode", async function() {
      const parent1 = new Array();
      let error = false;

      try {
        new BaseSpinalRelation(parent1, DEFAULT_RELATION_NAME);
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);

      const parent2 = new globalType.Model();
      error = false;

      try {
        new BaseSpinalRelation(parent2, DEFAULT_RELATION_NAME);
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);
    });
  });

  describe("How to get/set information about the relation", function() {
    describe("How to use getName", function() {
      it('should return the name DEFAULT_RELATION_NAME', function() {
        let rel = new BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);
        assert.strictEqual(
          rel.getName().get(),
          DEFAULT_RELATION_NAME
        );
      });
    });

    describe("How to use getParent", function() {
      it("should return the parent of the relation", async function() {
        const rel = new BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);

        assert.strictEqual(await rel.getParent(), DEFAULT_NODE);
      });
    });

    describe("How to use addContextIds and getContextIds", function() {
      it("should get the ids of the associated contexts", function() {
        const relation = new BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);
        const contextId1 = new lib.SpinalContext().getId().get();
        const contextId2 = new lib.SpinalContext().getId().get();

        relation.addContextId(contextId1);

        assert.deepStrictEqual(relation.getContextIds(), [
          contextId1
        ]);

        relation.addContextId(contextId1);
        relation.addContextId(contextId2);

        assert.deepStrictEqual(relation.getContextIds(), [
          contextId1, contextId2
        ]);
      });

      it("should throw an error if the contextId is missing", function() {
        const relation = new BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);
        let error = false;

        try {
          relation.addContextId();
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw an error if the contextId is not a string", function() {
        const relation = new BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);
        const badContextId1 = new lib.SpinalContext().getId();
        let error = false;

        try {
          relation.addContextId(badContextId1);
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
        const relation = new BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);

        relation.addContextId(context.getId().get());

        assert(relation.belongsToContext(context));
      });

      it("should return false", function() {
        const context = new lib.SpinalContext();
        const relation = new BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);

        assert(!relation.belongsToContext(context));
      });

      it("should throw an error if no context is passed", function() {
        const relation = new BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);
        let error = false;

        try {
          relation.belongsToContext(context);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw an error if the context as the wrong type", function() {
        const context1 = {};
        const relation = new BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);
        let error = false;

        try {
          relation.belongsToContext(context1);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);

        const context2 = new lib.SpinalNode();
        error = false;

        try {
          relation.belongsToContext(context2);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });
    });
  });

  describe("How to remove from the graph", function() {
    describe("How to use removeChildren", function() {
      it("should delete all of the children", async function() {
        const rel = new SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
        const node1 = new lib.SpinalNode();
        const node2 = new lib.SpinalNode();
        const node3 = new lib.SpinalNode();

        await Promise.all([
          rel.addChild(node1),
          rel.addChild(node2),
          rel.addChild(node3)
        ]);

        await rel.removeChildren();

        const children = await rel.getChildren();
        assert.deepStrictEqual(children, []);
      });

      it("should delete the given children", async function() {
        const rel = new SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
        const node1 = new lib.SpinalNode();
        const node2 = new lib.SpinalNode();
        const node3 = new lib.SpinalNode();

        await Promise.all([
          rel.addChild(node1),
          rel.addChild(node2),
          rel.addChild(node3)
        ]);

        await rel.removeChildren([node3, node1]);

        const children = await rel.getChildren();
        assert.deepStrictEqual(children, [node2]);
      });

      it("should delete some of the given children", async function() {
        const rel = new SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
        const node1 = new lib.SpinalNode();
        const node2 = new lib.SpinalNode();
        const node3 = new lib.SpinalNode();
        const node4 = new lib.SpinalNode();
        let error = false;

        await Promise.all([
          rel.addChild(node1),
          rel.addChild(node2),
          rel.addChild(node3)
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
    });

    describe("How to use removeFromGraph", function() {
      it("should delete all of the children", async function() {
        const rel = new SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
        const node1 = new lib.SpinalNode();
        const node2 = new lib.SpinalNode();
        const node3 = new lib.SpinalNode();

        await Promise.all([
          rel.addChild(node1),
          rel.addChild(node2),
          rel.addChild(node3)
        ]);

        await rel.removeChildren();

        const children = await rel.getChildren();
        assert.deepStrictEqual(children, []);
      });

      it("should the relation from the parent pointer", async function() {
        const parent = new lib.SpinalNode();
        const rel = parent._createRelation(
          DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_LST_PTR_TYPE
        );

        await rel.removeFromGraph();
        assert(!parent.hasRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_LST_PTR_TYPE));
      });
    });
  });
});
