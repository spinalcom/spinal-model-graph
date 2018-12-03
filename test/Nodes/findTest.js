const lib = require("../../build/index");

const assert = require("assert");

const DEFAULT_NODE = new lib.SpinalNode();
const DEFAULT_RELATION_NAME = "relationName";
const DEFAULT_RELATION_TYPE = lib.SPINAL_RELATION_LST_PTR_TYPE;
const DEFAULT_NODE_NAME = "nodeName";

describe("How to use find", function() {
  describe("Error handling", function() {
    it("should throw an error if the predicate is not a function", async function() {
      let error = false;

      await DEFAULT_NODE.find(undefined, 64).catch(() => {
        error = true;
      });
      assert(error);
    });

    it("should not fall in infinite loops", async function() {
      const node1 = new lib.SpinalNode();
      const node2 = new lib.SpinalNode();

      await Promise.all([
        node1.addChild(node2, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
        node2.addChild(node1, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE)
      ]);

      const foundChild = await node1.find();

      assert.deepStrictEqual(foundChild, [node1, node2]);
    });
  });

  describe("Basic predicate manipulation", function() {
    it("should return all contexts", async function() {
      const graph = new lib.SpinalGraph();
      const context1 = new lib.SpinalContext("context1");
      const context2 = new lib.SpinalContext("context2");
      const context3 = new lib.SpinalContext("context3");

      await Promise.all([
        graph.addContext(context1),
        graph.addContext(context2),
        graph.addContext(context3)
      ]);

      const contexts = await graph.find(undefined, node => {
        return node.getType().get() === "SpinalContext";
      });

      assert.deepStrictEqual(contexts, [context1, context2,
        context3
      ]);
    });

    it("should return all contexts but not their nodes", async function() {
      const graph = new lib.SpinalGraph();
      const context1 = new lib.SpinalContext("context1");
      const context2 = new lib.SpinalContext("context2");
      const context3 = new lib.SpinalContext("context3");

      await Promise.all([
        graph.addContext(context1),
        graph.addContext(context2),
        graph.addContext(context3)
      ]);

      let promises = [];
      for (let i = 0; i < 3; i++) {
        promises.push(context1.addChildInContext(new lib.SpinalNode(), DEFAULT_RELATION_NAME));
        promises.push(context2.addChildInContext(new lib.SpinalNode(), DEFAULT_RELATION_NAME));
        promises.push(context3.addChildInContext(new lib.SpinalNode(), DEFAULT_RELATION_NAME));
      }

      await Promise.all(promises);

      const contexts = await graph.find(undefined, node => {
        return node.getType().get() === "SpinalContext";
      });

      assert.deepStrictEqual(contexts, [context1, context2, context3]);
    });

    it("should return a node with a certain name", async function() {
      const parent = new lib.SpinalNode(DEFAULT_NODE_NAME);
      const child1 = new lib.SpinalNode(DEFAULT_NODE_NAME + "1");
      const child2 = new lib.SpinalNode(DEFAULT_NODE_NAME + "2");
      const child3 = new lib.SpinalNode(DEFAULT_NODE_NAME + "3");

      await Promise.all([
        parent.addChild(child1, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
        parent.addChild(child2, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
        parent.addChild(child3, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE)
      ]);

      let foundChild = await parent.find(undefined, node => {
        return node.getName().get() === DEFAULT_NODE_NAME + "2";
      });

      assert.deepStrictEqual(foundChild, [child2]);

      foundChild = await parent.find(undefined, node => {
        return node.getName().get() !== DEFAULT_NODE_NAME + "2";
      });

      assert.deepStrictEqual(foundChild, [parent, child1, child3]);
    });

    it("should return nodes with a certain type", async function() {
      const parent = new lib.SpinalNode();
      const child1 = new lib.SpinalNode(DEFAULT_NODE_NAME, "type1");
      const child2 = new lib.SpinalNode(DEFAULT_NODE_NAME, "type2");
      const child3 = new lib.SpinalNode(DEFAULT_NODE_NAME, "type1");
      const child4 = new lib.SpinalNode(DEFAULT_NODE_NAME, "type1");
      const child5 = new lib.SpinalNode(DEFAULT_NODE_NAME, "type2");
      const child6 = new lib.SpinalNode(DEFAULT_NODE_NAME, "type1");

      await Promise.all([
        parent.addChild(child1, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
        parent.addChild(child2, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
        parent.addChild(child3, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
        child2.addChild(child4, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
        child3.addChild(child5, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
        child5.addChild(child6, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
      ]);

      let foundChildren = await parent.find(undefined, node => {
        return node.getType().get() === "type1";
      });

      assert.deepStrictEqual(foundChildren, [child1, child3, child4, child6]);

      foundChildren = await parent.find(undefined, node => {
        return node.getType().get() === "type2";
      });

      assert.deepStrictEqual(foundChildren, [child2, child5]);
    });
  });

  describe("How to use relationNames", function() {
    it("should find all the nodes from the given relation names", async function() {
      const parent = new lib.SpinalNode();
      const child1 = new lib.SpinalNode();
      const child2 = new lib.SpinalNode();
      const child3 = new lib.SpinalNode();
      const child4 = new lib.SpinalNode();
      const child5 = new lib.SpinalNode();
      const child6 = new lib.SpinalNode();

      await Promise.all([
        parent.addChild(child1, DEFAULT_RELATION_NAME + "1", DEFAULT_RELATION_TYPE),
        parent.addChild(child2, DEFAULT_RELATION_NAME + "2", DEFAULT_RELATION_TYPE),
        parent.addChild(child3, DEFAULT_RELATION_NAME + "2", DEFAULT_RELATION_TYPE),
        child2.addChild(child4, DEFAULT_RELATION_NAME + "2", DEFAULT_RELATION_TYPE),
        child3.addChild(child5, DEFAULT_RELATION_NAME + "1", DEFAULT_RELATION_TYPE),
        child5.addChild(child6, DEFAULT_RELATION_NAME + "2", DEFAULT_RELATION_TYPE)
      ]);

      let foundChildren = await parent.find(DEFAULT_RELATION_NAME + "2");

      assert.deepStrictEqual(foundChildren, [parent, child2, child3, child4]);

      foundChildren = await parent.find(DEFAULT_RELATION_NAME + "1");

      assert.deepStrictEqual(foundChildren, [parent, child1]);
    });
  });
});

describe("How to use findInContext", function() {
  describe("Error handling", function() {
    it("should throw an error if the starting node or the context is missing", async function() {
      const context = new lib.SpinalContext();
      let error = false;

      error = false;
      await DEFAULT_NODE.findInContext().catch(() => {
        error = true;
      });
      assert(error);

      error = false;
      await DEFAULT_NODE.findInContext(context).catch(() => {
        error = true;
      });
      assert(!error);
    });

    it("should not fall in infinite loops", async function() {
      const context = new lib.SpinalContext();
      const node1 = new lib.SpinalNode();
      const node2 = new lib.SpinalNode();

      await Promise.all([
        node1.addChildInContext(node2, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context),
        node2.addChildInContext(node1, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context)
      ]);

      const foundChild = await node1.findInContext(context);

      assert.deepStrictEqual(foundChild, [node1, node2]);
    });
  });

  describe("Basic predicate manipulation", function() {
    it("should return all nodes", async function() {
      const context = new lib.SpinalContext();
      const node1 = new lib.SpinalNode("node1");
      const node2 = new lib.SpinalNode("node2");
      const node3 = new lib.SpinalNode("node3");

      await Promise.all([
        context.addChildInContext(node1, DEFAULT_RELATION_NAME),
        context.addChildInContext(node2, DEFAULT_RELATION_NAME),
        context.addChildInContext(node3, DEFAULT_RELATION_NAME)
      ]);

      const contexts = await context.findInContext(context, node => {
        return node.getType().get() === "SpinalNode";
      });

      assert.deepStrictEqual(contexts, [node1, node2, node3]);
    });

    it("should return all direct children", async function() {
      const context = new lib.SpinalContext();
      const node1 = new lib.SpinalNode(undefined, "direct");
      const node2 = new lib.SpinalNode(undefined, "direct");
      const node3 = new lib.SpinalNode(undefined, "direct");

      await Promise.all([
        context.addChildInContext(node1, DEFAULT_RELATION_NAME),
        context.addChildInContext(node2, DEFAULT_RELATION_NAME),
        context.addChildInContext(node3, DEFAULT_RELATION_NAME)
      ]);

      let promises = [];
      for (let i = 0; i < 3; i++) {
        promises.push(node1.addChild(new lib.SpinalNode(), DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE));
        promises.push(node2.addChild(new lib.SpinalNode(), DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE));
        promises.push(node3.addChild(new lib.SpinalNode(), DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE));
      }

      await Promise.all(promises);

      const directs = await context.findInContext(context, node => {
        return node.getType().get() === "direct";
      });

      assert.deepStrictEqual(directs, [node1, node2, node3]);
    });

    it("should return a node with a certain name", async function() {
      const context = new lib.SpinalContext();
      const child1 = new lib.SpinalNode(DEFAULT_NODE_NAME + "1");
      const child2 = new lib.SpinalNode(DEFAULT_NODE_NAME + "2");
      const child3 = new lib.SpinalNode(DEFAULT_NODE_NAME + "3");

      await Promise.all([
        context.addChildInContext(child1, DEFAULT_RELATION_NAME),
        context.addChildInContext(child2, DEFAULT_RELATION_NAME),
        context.addChildInContext(child3, DEFAULT_RELATION_NAME)
      ]);

      let foundChild = await context.findInContext(context, node => {
        return node.getName().get() === DEFAULT_NODE_NAME + "2";
      });

      assert.deepStrictEqual(foundChild, [child2]);

      foundChild = await context.findInContext(context, node => {
        return node.getName().get() !== DEFAULT_NODE_NAME + "2";
      });

      assert.deepStrictEqual(foundChild, [context, child1, child3]);
    });

    it("should return nodes with a certain type", async function() {
      const context = new lib.SpinalContext();
      const child1 = new lib.SpinalNode(DEFAULT_NODE_NAME, "type1");
      const child2 = new lib.SpinalNode(DEFAULT_NODE_NAME, "type2");
      const child3 = new lib.SpinalNode(DEFAULT_NODE_NAME, "type1");
      const child4 = new lib.SpinalNode(DEFAULT_NODE_NAME, "type1");
      const child5 = new lib.SpinalNode(DEFAULT_NODE_NAME, "type2");
      const child6 = new lib.SpinalNode(DEFAULT_NODE_NAME, "type1");

      await Promise.all([
        context.addChildInContext(child1, DEFAULT_RELATION_NAME),
        context.addChildInContext(child2, DEFAULT_RELATION_NAME),
        context.addChildInContext(child3, DEFAULT_RELATION_NAME),
        child2.addChildInContext(child4, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context),
        child3.addChildInContext(child5, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context),
        child5.addChildInContext(child6, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context),
      ]);

      let foundChildren = await context.findInContext(context, node => {
        return node.getType().get() === "type1";
      });

      assert.deepStrictEqual(foundChildren, [child1, child3,
        child4, child6
      ]);

      foundChildren = await context.findInContext(context, node => {
        return node.getType().get() === "type2";
      });

      assert.deepStrictEqual(foundChildren, [child2, child5]);
    });
  });

  describe("How to use context", function() {
    it("should findInContext all the nodes from the given relation names", async function() {
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

      let foundChildren = await parent.findInContext(context2);

      assert.deepStrictEqual(foundChildren, [parent, child2, child3, child4]);

      foundChildren = await parent.findInContext(context1);

      assert.deepStrictEqual(foundChildren, [parent, child1]);
    });
  });
});
