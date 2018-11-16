const lib = require("../../build/index");
const funcs = require("../../build/GraphFunctionsLib/map")

const assert = require("assert");

const DEFAULT_NODE = new lib.SpinalNode();
const DEFAULT_CONTEXT = new lib.SpinalContext();
const DEFAULT_RELATION_NAME = "relationName";
const DEFAULT_RELATION_TYPE = lib.SPINAL_RELATION_LST_PTR_TYPE;
const DEFAULT_FUN = node => node;

describe("How to use map", function () {
  describe("Error handling", function () {
    it("should throw an error if the starting node is missing", async function () {
      let error = false;

      await funcs.map(undefined, undefined, DEFAULT_FUN).catch(() => {
        error = true;
      });
      assert(error);

      error = false;
      await funcs.map(DEFAULT_NODE, undefined, DEFAULT_FUN).catch(() => {
        error = true;
      });
      assert(!error);
    });

    it("should throw an error if the starting node is not a SpinalNode", async function () {
      let error = false;

      await funcs.map(128, undefined, DEFAULT_FUN).catch(() => {
        error = true;
      });
      assert(error);
    });

    it("should throw an error if the callback function is not a function", async function () {
      let error = false;

      await funcs.map(DEFAULT_NODE, undefined, 256).catch(() => {
        error = true;
      });
      assert(error);
    });

    it("should not fall in infinite loops", async function () {
      const node1 = new lib.SpinalNode();
      const node2 = new lib.SpinalNode();

      node1.addChild(node2, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE);
      node2.addChild(node1, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE);

      const foundChild = await funcs.map(node1, undefined, DEFAULT_FUN);

      assert.deepStrictEqual(foundChild, [node1, node2]);
    });
  });

  describe("Basic callback manipulation", function () {
    it("should return the ids of all nodes", async function () {
      const parent = new lib.SpinalNode("parent");
      const child1 = new lib.SpinalNode("child1");
      const child2 = new lib.SpinalNode("child2");
      const child3 = new lib.SpinalNode("child3");

      await Promise.all([
        parent.addChild(child1, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
        parent.addChild(child2, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
        parent.addChild(child3, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE)
      ]);

      const ids = await funcs.map(parent, undefined, node => {
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

    it("should return second gen and undefined for other nodes nodes", async function () {
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

      const secondGen = await funcs.map(root, undefined, node => {
        if (node.getType().get() === "secondGen")
          return node;
        else
          return undefined;
      });

      assert.deepStrictEqual(secondGen, [
        undefined, undefined, undefined, undefined, secondGen1, secondGen2, undefined
      ]);
    });
  });

  describe("How to use mapInContext", function () {
    describe("Error handling", function () {
      it("should throw an error if the starting node, the context or the callback is missing", async function () {
        const context = new lib.SpinalContext();
        let error = false;

        error = false;
        await funcs.mapInContext(undefined, context, DEFAULT_FUN).catch(() => {
          error = true;
        });
        assert(error);

        error = false;
        await funcs.mapInContext(DEFAULT_NODE, undefined, DEFAULT_FUN).catch(() => {
          error = true;
        });
        assert(error);

        error = false;
        await funcs.mapInContext(DEFAULT_NODE, context).catch(() => {
          error = true;
        });
        assert(error);

        error = false;
        await funcs.mapInContext(DEFAULT_NODE, context, DEFAULT_FUN).catch(() => {
          error = true;
        });
        assert(!error);
      });

      it("should throw an error if the starting node is not a SpinalNode", async function () {
        let error = false;

        await funcs.mapInContext(32).catch(() => {
          error = true;
        });
        assert(error);
      });

      it("should throw an error if the context is not a SpinalContext", async function () {
        let error = false;

        await funcs.mapInContext(DEFAULT_NODE, 64, DEFAULT_FUN).catch(() => {
          error = true;
        });
        assert(error);

        error = false;
        await funcs.mapInContext(DEFAULT_NODE, DEFAULT_CONTEXT, DEFAULT_FUN).catch(() => {
          error = true;
        });
        assert(!error);
      });

      it("should throw an error if the callback is not a function", async function () {
        let error = false;

        await funcs.mapInContext(DEFAULT_NODE, DEFAULT_CONTEXT, 128).catch(() => {
          error = true;
        });
        assert(error);

        error = false;
        await funcs.mapInContext(DEFAULT_NODE, DEFAULT_CONTEXT, DEFAULT_FUN).catch(() => {
          error = true;
        });
        assert(!error);
      });

      it("should not fall in infinite loops", async function () {
        const context = new lib.SpinalContext();
        const node1 = new lib.SpinalNode();
        const node2 = new lib.SpinalNode();

        node1.addChildInContext(node2, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context);
        node2.addChildInContext(node1, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context);

        const foundChild = await funcs.mapInContext(node1, context, DEFAULT_FUN);

        assert.deepStrictEqual(foundChild, [node1, node2]);
      });
    });

    describe("Basic callback manipulation", function () {
      it("should return the names of all nodes in the context", async function () {
        const context = new lib.SpinalContext("context");
        const child1 = new lib.SpinalNode("child1");
        const child2 = new lib.SpinalNode("child2");
        const child3 = new lib.SpinalNode("child3");

        await Promise.all([
          context.addChildInContext(child1, DEFAULT_RELATION_NAME),
          context.addChildInContext(child2, DEFAULT_RELATION_NAME),
          context.addChildInContext(child3, DEFAULT_RELATION_NAME)
        ]);

        const names = await funcs.mapInContext(context, context, node => {
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

    describe("How to use context", function () {
      it("should mapInContext all the nodes from the given relation names", async function () {
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

        let foundChildren = await funcs.mapInContext(parent, context2, DEFAULT_FUN);

        assert.deepStrictEqual(foundChildren, [parent, child2, child3, child4]);

        foundChildren = await funcs.mapInContext(parent, context1, DEFAULT_FUN);

        assert.deepStrictEqual(foundChildren, [parent, child1]);
      });
    });
  });
});
