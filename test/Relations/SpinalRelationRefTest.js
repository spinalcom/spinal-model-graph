const lib = require("../../build/index");
const globalType = typeof window === "undefined" ? global : window;
const SpinalRelationRef = require("../../build/Relations/SpinalRelationRef").default;

const assert = require("assert");

const DEFAULT_RELATION_NAME = "relationName";
const DEFAULT_NODE = new lib.SpinalNode();

describe("SpinalRelationRef", function() {
  describe("How to use the constructor", function() {
    it("should create a new relation with a name and a node parent", function() {
      let rel = new SpinalRelationRef(DEFAULT_NODE, DEFAULT_RELATION_NAME);

      assert.strictEqual(rel.getName().get(), DEFAULT_RELATION_NAME);
    });

    it("should create a new relation with a name and a context parent", async function() {
      const parent = new lib.SpinalContext();
      const rel = new SpinalRelationRef(parent, DEFAULT_RELATION_NAME);

      assert.strictEqual(rel.getName().get(), DEFAULT_RELATION_NAME);
      assert.strictEqual(await rel.getParent(), parent);
    });

    it("should create a new relation with a name and a graph parent", async function() {
      const parent = new lib.SpinalGraph();
      const rel = new SpinalRelationRef(parent, DEFAULT_RELATION_NAME);

      assert.strictEqual(rel.getName().get(), DEFAULT_RELATION_NAME);
      assert.strictEqual(await rel.getParent(), parent);
    });

    it("should throw an error if the parent or the name is missing", async function() {
      assert.throws(() => {
        new SpinalRelationRef();
      }, TypeError);

      assert.throws(() => {
        new SpinalRelationRef(undefined, DEFAULT_RELATION_NAME);
      }, TypeError);

      assert.throws(() => {
        new SpinalRelationRef(DEFAULT_NODE);
      }, TypeError);
    });

    it("should throw an error if the parent is not a SpinalNode", async function() {
      const parent1 = new Array();

      assert.throws(() => {
        new SpinalRelationRef(parent1, DEFAULT_RELATION_NAME);
      }, TypeError);

      const parent2 = new globalType.Model();

      assert.throws(() => {
        new SpinalRelationRef(parent2, DEFAULT_RELATION_NAME);
      }, TypeError);
    });
  });

  describe("How to get informations about the relation", function() {
    describe("How to use getChildrenIds", function() {
      it("should return the ids of all children", async function() {
        let rel = new SpinalRelationRef(DEFAULT_NODE, DEFAULT_RELATION_NAME);

        await rel.addChild(DEFAULT_NODE);
        assert.deepStrictEqual(rel.getChildrenIds(), [
          DEFAULT_NODE.getId().get()
        ]);
      });

      it("should return the ids of all children", async function() {
        let rel = new SpinalRelationRef(DEFAULT_NODE, DEFAULT_RELATION_NAME);
        const node1 = new lib.SpinalNode();
        const node2 = new lib.SpinalNode();
        const node3 = new lib.SpinalNode();

        const nodeIds = [
          node1.getId().get(),
          node2.getId().get(),
          node3.getId().get()
        ];

        await Promise.all([
          rel.addChild(node1),
          rel.addChild(node2),
          rel.addChild(node3),
        ]);

        assert.deepStrictEqual(rel.getChildrenIds(), nodeIds);
      });
    });

    describe("How to use getChildren", function() {
      it("should return the relation's child", async function() {
        let rel = new SpinalRelationRef(DEFAULT_NODE, DEFAULT_RELATION_NAME);

        await rel.addChild(DEFAULT_NODE);
        const children = await rel.getChildren();
        assert.deepStrictEqual(children, [DEFAULT_NODE]);
      });

      it("should return the relation's children", async function() {
        let rel = new SpinalRelationRef(DEFAULT_NODE, DEFAULT_RELATION_NAME);
        const node1 = new lib.SpinalNode();
        const node2 = new lib.SpinalNode();
        const node3 = new lib.SpinalNode();

        await Promise.all([
          rel.addChild(node1),
          rel.addChild(node2),
          rel.addChild(node3)
        ]);

        const children = await rel.getChildren();
        assert.deepStrictEqual(children, [node1, node2, node3]);
      });

      it("should return an empty array", async function() {
        let rel = new SpinalRelationRef(DEFAULT_NODE, DEFAULT_RELATION_NAME);
        const children = await rel.getChildren();

        assert.deepStrictEqual(children, []);
      });
    });

    describe("How to use getChildrenInContext", function() {
      it("should return the relation's child", async function() {
        const context = new lib.SpinalContext();
        const relation = new SpinalRelationRef(DEFAULT_NODE, DEFAULT_RELATION_NAME);
        const child = new lib.SpinalNode();

        child.addContextId(context.getId().get());
        await relation.addChild(child);

        const children = await relation.getChildrenInContext(context);
        assert.deepStrictEqual(children, [child]);
      });

      it("should return the relation's children associated to the context", async function() {
        const context = new lib.SpinalContext();
        const relation = new SpinalRelationRef(DEFAULT_NODE, DEFAULT_RELATION_NAME);
        const child1 = new lib.SpinalNode();
        const child2 = new lib.SpinalNode();
        const child3 = new lib.SpinalNode();

        child1.addContextId(context.getId().get());
        child3.addContextId(context.getId().get());
        await Promise.all([
          relation.addChild(child1),
          relation.addChild(child2),
          relation.addChild(child3)
        ]);

        const children = await relation.getChildrenInContext(context);
        assert.deepStrictEqual(children, [child1, child3]);
      });

      it("should throw an error if the context is missing", async function() {
        const relation = new SpinalRelationRef(DEFAULT_NODE, DEFAULT_RELATION_NAME);
        let error = false;

        try {
          await relation.getChildrenInContext();
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw an error if context is not a SpinalContext", async function() {
        const context1 = new globalType.Model();
        const relation = new SpinalRelationRef(DEFAULT_NODE, DEFAULT_RELATION_NAME);
        let error = false;

        try {
          await relation.getChildrenInContext(context1);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);

        const context2 = new lib.SpinalNode();
        error = false;

        try {
          await relation.getChildrenInContext(context2);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });
    });

    describe("How to use getType", function() {
      it("should return the relation's type", function() {
        let rel = new SpinalRelationRef(DEFAULT_NODE, DEFAULT_RELATION_NAME);

        assert.strictEqual(rel.getType(), lib.SPINAL_RELATION_TYPE);
      });
    });
  });

  describe("How to add children", function() {
    describe("How to use addChild", function() {
      it("should add a child to the children of the relation",
        async function() {
          const rel = new SpinalRelationRef(DEFAULT_NODE, DEFAULT_RELATION_NAME);

          await rel.addChild(DEFAULT_NODE);
          const children = await rel.getChildren();
          assert.deepStrictEqual(children, [DEFAULT_NODE]);
        });

      it("should throw an error if you try to add the same node twice", async function() {
        const rel = new SpinalRelationRef(DEFAULT_NODE, DEFAULT_RELATION_NAME);
        let error;

        await rel.addChild(DEFAULT_NODE);

        try {
          await rel.addChild(DEFAULT_NODE);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should throw an error when you pass it something that is not a model", async function() {
        const rel = new SpinalRelationRef(DEFAULT_NODE, DEFAULT_RELATION_NAME);
        let error;

        try {
          await rel.addChild(new Array());
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });

      it("should return the node added to the relation", async function() {
        const rel = new SpinalRelationRef(DEFAULT_NODE, DEFAULT_RELATION_NAME);
        const node = new lib.SpinalNode();
        const model = new globalType.Model();

        const res1 = await rel.addChild(node);

        assert.strictEqual(res1, node);

        const res2 = await rel.addChild(model);
        const res2Elem = await res2.getElement();

        assert.strictEqual(res2Elem, model);
      });
    });
  });

  describe("How to remove children", function() {
    describe("How to use removeChild", function() {
      it("should remove a child from the children of the relation", async function() {
        const rel = new SpinalRelationRef(DEFAULT_NODE, DEFAULT_RELATION_NAME);

        await rel.addChild(DEFAULT_NODE);
        await rel.removeChild(DEFAULT_NODE);

        const children = await rel.getChildren();
        assert.deepStrictEqual(children, []);
      });

      it("should remove a child and update the children ids of the relation", async function() {
        const rel = new SpinalRelationRef(DEFAULT_NODE, DEFAULT_RELATION_NAME);

        await rel.addChild(DEFAULT_NODE);
        await rel.removeChild(DEFAULT_NODE);

        const ids = rel.getChildrenIds();
        assert.deepStrictEqual(ids, []);
      });

      it("should remove a child and remove the relation the node's parents", async function() {
        const parentNode = new lib.SpinalNode();
        const rel = parentNode._createRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
        const childNode = new lib.SpinalNode();

        await rel.addChild(childNode);
        await rel.removeChild(childNode);

        const parents = await childNode.getParents();
        assert.deepStrictEqual(parents, []);
      });

      it("should throw an error if the node is not a child", async function() {
        const parentNode = new lib.SpinalNode();
        const rel = parentNode._createRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
        const childNode = new lib.SpinalNode();
        let error = false;

        try {
          await rel.removeChild(childNode);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);
      });
    });

    describe("How to use removeChildren", function() {
      it("should delete all of the children", async function() {
        const rel = new SpinalRelationRef(DEFAULT_NODE, DEFAULT_RELATION_NAME);
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
        const rel = new SpinalRelationRef(DEFAULT_NODE, DEFAULT_RELATION_NAME);
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
        const rel = new SpinalRelationRef(DEFAULT_NODE, DEFAULT_RELATION_NAME);
        const node1 = new lib.SpinalNode("node1");
        const node2 = new lib.SpinalNode("node2");
        const node3 = new lib.SpinalNode("node3");
        const node4 = new lib.SpinalNode("node4");
        let error = false;

        await Promise.all([
          rel.addChild(node1),
          rel.addChild(node2),
          rel.addChild(node3)
        ]);

        try {
          await rel.removeChildren([node3, node4, node1]);
        } catch (e) {
          error = true;
          assert(e instanceof Error);
        }
        assert(error);

        const children = await rel.getChildren();
        assert.deepStrictEqual(children, [node2]);
      });
    });
  });
});
