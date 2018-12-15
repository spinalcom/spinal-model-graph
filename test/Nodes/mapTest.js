const lib = require("../../build/index");

const assert = require("assert");

const DEFAULT_NODE = new lib.SpinalNode();
const DEFAULT_CONTEXT = new lib.SpinalContext();
const DEFAULT_RELATION_NAME = "relationName";
const DEFAULT_RELATION_TYPE = lib.SPINAL_RELATION_LST_PTR_TYPE;
const DEFAULT_FUN = node => node;

describe("How to use map", function() {
  describe("Error handling", function() {
    it("should throw an error if relationNames is neither an array, a string or omitted", async function() {
      let error = false;

      try {
        await DEFAULT_NODE.map(1, DEFAULT_FUN);
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);
    });

    it("should throw an error if the callback function is missing", async function() {
      let error = false;

      try {
        await DEFAULT_NODE.map([], undefined);
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);
    });

    it("should throw an error if the callback function is not a function", async function() {
      let error = false;

      try {
        await DEFAULT_NODE.map([], 256);
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);
    });

    it("should not fall in infinite loops", async function() {
      const node1 = new lib.SpinalNode();
      const node2 = new lib.SpinalNode();

      await Promise.all([
        node1.addChild(node2, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
        node2.addChild(node1, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE)
      ]);

      const foundChild = await node1.map(undefined, DEFAULT_FUN);

      assert.deepStrictEqual(foundChild, [node1, node2]);
    });
  });

  describe("Basic callback manipulation", function() {
    it("should return the ids of all nodes", async function() {
      const parent = new lib.SpinalNode("parent");
      const child1 = new lib.SpinalNode("child1");
      const child2 = new lib.SpinalNode("child2");
      const child3 = new lib.SpinalNode("child3");

      await Promise.all([
        parent.addChild(child1, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
        parent.addChild(child2, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
        parent.addChild(child3, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE)
      ]);

      const ids = await parent.map(undefined, node => {
        return node.getId();
      });

      assert.deepStrictEqual(
        ids,
        [
          parent.getId(),
          child1.getId(),
          child2.getId(),
          child3.getId()
        ]
      );
    });

    it("should return second gen and undefined for other nodes nodes", async function() {
      const root = new lib.SpinalNode();
      const firstGen1 = new lib.SpinalNode(undefined, "firstGen");
      const firstGen2 = new lib.SpinalNode(undefined, "firstGen");
      const firstGen3 = new lib.SpinalNode(undefined, "firstGen");
      const secondGen1 = new lib.SpinalNode(undefined, "secondGen");
      const secondGen2 = new lib.SpinalNode(undefined, "secondGen");
      const thirdGen1 = new lib.SpinalNode(undefined, "thirdGen");

      await Promise.all([
        root.addChild(firstGen1, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
        root.addChild(firstGen2, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
        root.addChild(firstGen3, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
        firstGen2.addChild(secondGen1, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
        firstGen3.addChild(secondGen2, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
        secondGen2.addChild(thirdGen1, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE)
      ]);

      const secondGen = await root.map(undefined, node => {
        if (node.getType().get() === "secondGen") {
          return node;
        } else {
          return undefined;
        }
      });

      assert.deepStrictEqual(secondGen,
        [
          undefined,
          undefined,
          undefined,
          undefined,
          secondGen1,
          secondGen2,
          undefined
        ]);
    });
  });
});

describe("How to use mapInContext", function() {
  describe("Error handling", function() {
    it("should throw an error if the context is missing", async function() {
      let error = false;

      try {
        await DEFAULT_NODE.mapInContext(undefined, DEFAULT_FUN);
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);
    });

    it("should throw an error if the context is not a SpinalContext", async function() {
      const context = new lib.SpinalNode();
      let error = false;

      try {
        await DEFAULT_NODE.mapInContext(context, DEFAULT_FUN);
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);
    });

    it("should throw an error if the callback is missing", async function() {
      let error = false;

      try {
        await DEFAULT_NODE.mapInContext(DEFAULT_CONTEXT);
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);
    });

    it("should throw an error if the callback is not a function", async function() {
      let error = false;

      try {
        await DEFAULT_NODE.mapInContext(DEFAULT_CONTEXT, 128);
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);
    });

    it("should not fall in infinite loops", async function() {
      const context = new lib.SpinalContext();
      const node1 = new lib.SpinalNode();
      const node2 = new lib.SpinalNode();

      node1.addChildInContext(node2, DEFAULT_RELATION_NAME,
        DEFAULT_RELATION_TYPE, context);
      node2.addChildInContext(node1, DEFAULT_RELATION_NAME,
        DEFAULT_RELATION_TYPE, context);

      const foundChild = await node1.mapInContext(context,
        DEFAULT_FUN);

      assert.deepStrictEqual(foundChild, [node1, node2]);
    });

    describe("Basic callback manipulation", function() {
      it("should return the names of all nodes in the context", async function() {
        const context = new lib.SpinalContext("context");
        const child1 = new lib.SpinalNode("child1");
        const child2 = new lib.SpinalNode("child2");
        const child3 = new lib.SpinalNode("child3");

        await Promise.all([
          context.addChildInContext(child1, DEFAULT_RELATION_NAME),
          context.addChildInContext(child2, DEFAULT_RELATION_NAME),
          context.addChildInContext(child3, DEFAULT_RELATION_NAME)
        ]);

        const names = await context.mapInContext(context, node => {
          return node.getName().get();
        });

        assert.deepStrictEqual(
          names,
          [
            "context",
            "child1",
            "child2",
            "child3"
          ]
        );
      });
    });
  });

  describe("How to use context", function() {
    it("should mapInContext all the nodes from the given relation names", async function() {
      const context1 = new lib.SpinalContext();
      const context2 = new lib.SpinalContext();
      const parent = new lib.SpinalNode();
      const child1 = new lib.SpinalNode();
      const child2 = new lib.SpinalNode();
      const child3 = new lib.SpinalNode();
      const child4 = new lib.SpinalNode();
      const child5 = new lib.SpinalNode();
      const child6 = new lib.SpinalNode();

      await Promise.all([
        parent.addChildInContext(child1, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context1),
        parent.addChildInContext(child2, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context2),
        parent.addChildInContext(child3, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context2),
        child2.addChildInContext(child4, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context2),
        child3.addChildInContext(child5, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context1),
        child5.addChildInContext(child6, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context2)
      ]);

      let foundChildren = await parent.mapInContext(context2, DEFAULT_FUN);

      assert.deepStrictEqual(foundChildren, [parent, child2, child3, child4]);

      foundChildren = await parent.mapInContext(context1, DEFAULT_FUN);

      assert.deepStrictEqual(foundChildren, [parent, child1]);
    });
  });
});
