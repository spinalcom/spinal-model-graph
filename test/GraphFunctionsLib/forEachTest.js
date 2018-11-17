const lib = require("../../build/index");
const funcs = require("../../build/GraphFunctionsLib/forEach")

const assert = require("assert");

const CUSTOM_TYPE = "custom";
const DEFAULT_NODE = new lib.SpinalNode();
const DEFAULT_CONTEXT = new lib.SpinalContext();
const DEFAULT_RELATION_NAME = "relationName";
const DEFAULT_RELATION_TYPE = lib.SPINAL_RELATION_LST_PTR_TYPE;
const DEFAULT_FUN = node => {
  let type = node.getType();

  type.set(CUSTOM_TYPE);
};

describe("How to use forEach", function () {
  describe("Error handling", function () {
    it("should throw an error if the starting node is missing", async function () {
      let error = false;

      await funcs.forEach(undefined, undefined, DEFAULT_FUN).catch(() => {
        error = true;
      });
      assert(error);

      error = false;
      await funcs.forEach(DEFAULT_NODE, undefined, DEFAULT_FUN).catch(() => {
        error = true;
      });
      assert(!error);
    });

    it("should throw an error if the callback function is missing", async function () {
      let error = false;

      await funcs.forEach(DEFAULT_NODE, undefined, undefined).catch(() => {
        error = true;
      });
      assert(error);

      error = false;
      await funcs.forEach(DEFAULT_NODE, undefined, DEFAULT_FUN).catch(() => {
        error = true;
      });
      assert(!error);
    });

    it("should throw an error if the starting node is not a SpinalNode", async function () {
      let error = false;

      await funcs.forEach(128, undefined, DEFAULT_FUN).catch(() => {
        error = true;
      });
      assert(error);
    });

    it("should throw an error if the callback function is not a function", async function () {
      let error = false;

      await funcs.forEach(DEFAULT_NODE, undefined, 256).catch(() => {
        error = true;
      });
      assert(error);
    });

    it("should not fall in infinite loops", async function () {
      const node1 = new lib.SpinalNode();
      const node2 = new lib.SpinalNode();

      node1.addChild(node2, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE);
      node2.addChild(node1, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE);

      await funcs.forEach(node1, undefined, DEFAULT_FUN);

      assert.strictEqual(node1.getType().get(), CUSTOM_TYPE);
      assert.strictEqual(node2.getType().get(), CUSTOM_TYPE);
    });
  });

  describe("Basic callback manipulation", function () {
    it("should change the type of all nodes", async function () {
      const parent = new lib.SpinalNode("parent");
      const child1 = new lib.SpinalNode("child1");
      const child2 = new lib.SpinalNode("child2");
      const child3 = new lib.SpinalNode("child3");

      await Promise.all([
        parent.addChild(child1, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
        parent.addChild(child2, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
        parent.addChild(child3, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE)
      ]);

      await funcs.forEach(parent, undefined, DEFAULT_FUN);

      assert.strictEqual(parent.getType().get(), CUSTOM_TYPE);
      assert.strictEqual(child1.getType().get(), CUSTOM_TYPE);
      assert.strictEqual(child2.getType().get(), CUSTOM_TYPE);
      assert.strictEqual(child3.getType().get(), CUSTOM_TYPE);
    });
  });
});

describe("How to use forEachInContext", function () {
  describe("Error handling", function () {
    it("should throw an error if the starting node, the context or the callback is missing", async function () {
      const context = new lib.SpinalContext();
      let error = false;

      error = false;
      await funcs.forEachInContext(undefined, context, DEFAULT_FUN).catch(() => {
        error = true;
      });
      assert(error);

      error = false;
      await funcs.forEachInContext(DEFAULT_NODE, undefined, DEFAULT_FUN).catch(() => {
        error = true;
      });
      assert(error);

      error = false;
      await funcs.forEachInContext(DEFAULT_NODE, context).catch(() => {
        error = true;
      });
      assert(error);

      error = false;
      await funcs.forEachInContext(DEFAULT_NODE, context, DEFAULT_FUN).catch(() => {
        error = true;
      });
      assert(!error);
    });

    it("should throw an error if the starting node is not a SpinalNode", async function () {
      let error = false;

      await funcs.forEachInContext(32).catch(() => {
        error = true;
      });
      assert(error);
    });

    it("should throw an error if the context is not a SpinalContext", async function () {
      let error = false;

      await funcs.forEachInContext(DEFAULT_NODE, 64, DEFAULT_FUN).catch(() => {
        error = true;
      });
      assert(error);

      error = false;
      await funcs.forEachInContext(DEFAULT_NODE, DEFAULT_CONTEXT, DEFAULT_FUN).catch(() => {
        error = true;
      });
      assert(!error);
    });

    it("should throw an error if the callback is not a function", async function () {
      let error = false;

      await funcs.forEachInContext(DEFAULT_NODE, DEFAULT_CONTEXT, 128).catch(() => {
        error = true;
      });
      assert(error);

      error = false;
      await funcs.forEachInContext(DEFAULT_NODE, DEFAULT_CONTEXT, DEFAULT_FUN).catch(() => {
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

      await funcs.forEachInContext(node1, context, DEFAULT_FUN);

      assert.strictEqual(node1.getType().get(), CUSTOM_TYPE);
      assert.strictEqual(node2.getType().get(), CUSTOM_TYPE);
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

      await funcs.forEachInContext(context, context, DEFAULT_FUN);

      assert.strictEqual(child1.getType().get(), CUSTOM_TYPE);
      assert.strictEqual(child2.getType().get(), CUSTOM_TYPE);
      assert.strictEqual(child3.getType().get(), CUSTOM_TYPE);
    });
  });

  describe("How to use context", function () {
    it("should forEachInContext all the nodes from the given relation names", async function () {
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

      let foundChildren = [];

      await funcs.forEachInContext(parent, context2, node => foundChildren.push(node));

      assert.deepStrictEqual(foundChildren, [parent, child2, child3, child4]);

      foundChildren = [];
      await funcs.forEachInContext(parent, context1, node => foundChildren.push(node));

      assert.deepStrictEqual(foundChildren, [parent, child1]);
    });
  });
});
