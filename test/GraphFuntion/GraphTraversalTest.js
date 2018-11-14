const lib = require("../../build/index");
const funcs = require("../../build/GraphFunctionsLib/GraphTraversal")

const assert = require("assert");

const DEFAULT_NODE = new lib.SpinalNode();
const DEFAULT_PREDICATE = () => true;
const DEFAULT_RELATION_NAME = "relationName";
const DEFAULT_NODE_NAME = "nodeName";

describe("GraphTraversal", function () {
  describe("How to use findInGraph", function () {
    describe("Basic usage", function () {
      it("should return all contexts", async function () {
        const graph = new lib.SpinalGraph();
        const context1 = new lib.SpinalContext("context1");
        const context2 = new lib.SpinalContext("context2");
        const context3 = new lib.SpinalContext("context3");

        await Promise.all([
          graph.addContext(context1),
          graph.addContext(context2),
          graph.addContext(context3)
        ]);

        const contexts = await funcs.findInGraph(graph, node => {
          return node.getType().get() === "SpinalContext";
        });

        assert.deepStrictEqual(contexts, [context1, context2, context3]);
      });

      it("should return all contexts but not their nodes", async function () {
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

        const contexts = await funcs.findInGraph(graph, node => {
          return node.getType().get() === "SpinalContext";
        });

        assert.deepStrictEqual(contexts, [context1, context2, context3]);
      });

      it("should return a node with a certain name", async function () {
        const parent = new lib.SpinalNode();
        const child1 = new lib.SpinalNode(DEFAULT_NODE_NAME + "1");
        const child2 = new lib.SpinalNode(DEFAULT_NODE_NAME + "2");
        const child3 = new lib.SpinalNode(DEFAULT_NODE_NAME + "3");

        await Promise.all([
          parent.addChild(child1, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE),
          parent.addChild(child2, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE),
          parent.addChild(child3, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE)
        ]);

        let foundChild = await funcs.findInGraph(parent, node => {
          return node.getName().get() === DEFAULT_NODE_NAME + "2";
        });

        assert.deepStrictEqual(foundChild, [child2]);

        foundChild = await funcs.findInGraph(parent, node => {
          return node.getName().get() !== DEFAULT_NODE_NAME + "2";
        });

        assert.deepStrictEqual(foundChild, [child1, child3]);
      });

      it("should return nodes with a certain type", async function () {
        const parent = new lib.SpinalNode();
        const child1 = new lib.SpinalNode(DEFAULT_NODE_NAME, "type1");
        const child2 = new lib.SpinalNode(DEFAULT_NODE_NAME, "type2");
        const child3 = new lib.SpinalNode(DEFAULT_NODE_NAME, "type1");
        const child4 = new lib.SpinalNode(DEFAULT_NODE_NAME, "type1");
        const child5 = new lib.SpinalNode(DEFAULT_NODE_NAME, "type2");
        const child6 = new lib.SpinalNode(DEFAULT_NODE_NAME, "type1");

        await Promise.all([
          parent.addChild(child1, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE),
          parent.addChild(child2, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE),
          parent.addChild(child3, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE),
          child2.addChild(child4, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE),
          child3.addChild(child5, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE),
          child5.addChild(child6, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE),
        ]);

        let foundChildren = await funcs.findInGraph(parent, node => {
          return node.getType().get() === "type1";
        });

        assert.deepStrictEqual(foundChildren, [child1, child3, child4, child6]);

        foundChildren = await funcs.findInGraph(parent, node => {
          return node.getType().get() === "type2";
        });

        assert.deepStrictEqual(foundChildren, [child2, child5]);
      });
    });

    describe("Error handling", function () {
      it("should throw an error if the starting node or the predicate is missing", async function () {
        let node = new lib.SpinalNode();
        let predicate = () => true;
        let error = false;

        await funcs.findInGraph().catch(() => {
          error = true;
        });
        assert(error);

        error = false;
        await funcs.findInGraph(node).catch(() => {
          error = true;
        });
        assert(error);

        error = false;
        await funcs.findInGraph(undefined, predicate).catch(() => {
          error = true;
        });
        assert(error);

        error = false;
        await funcs.findInGraph(node, predicate).catch(() => {
          error = true;
        });
        assert(!error);
      });

      it("should throw an error if the starting node is not a SpinalNode", async function () {
        let error = false;

        await funcs.findInGraph(32, DEFAULT_PREDICATE).catch(() => {
          error = true;
        });
        assert(error);

        error = false
        await funcs.findInGraph(DEFAULT_NODE, DEFAULT_PREDICATE).catch(() => {
          error = true;
        });
        assert(!error);
      });

      it("should throw an error if the predicate is not a function", async function () {
        let error = false;

        await funcs.findInGraph(DEFAULT_NODE, 64).catch(() => {
          error = true;
        });
        assert(error);

        error = false
        await funcs.findInGraph(DEFAULT_NODE, DEFAULT_PREDICATE).catch(() => {
          error = true;
        });
        assert(!error);
      });
    });
  });
});
