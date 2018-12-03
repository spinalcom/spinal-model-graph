const lib = require("../../build/index");
const globalType = typeof window === "undefined" ? global : window;

const assert = require("assert");

const DEFAULT_SPINAL_GRAPH_NAME = "undefined";
const DEFAULT_SPINAL_GRAPH_TYPE = "SpinalGraph";
const DEFAULT_SPINAL_CONTEXT_NAME1 = "SpinalContext1";
const DEFAULT_SPINAL_CONTEXT_NAME2 = "SpinalContext2";
const HAS_CONTEXT_RELATION_NAME = "hasContext";

describe("SpinalGraph", function() {
  describe("How to use the constructor", function() {
    it("should create a graph with default values", async function() {
      let context = new lib.SpinalGraph();

      assert.strictEqual(context.getName().get(),
        DEFAULT_SPINAL_GRAPH_NAME);
      assert.strictEqual(context.getType().get(),
        DEFAULT_SPINAL_GRAPH_TYPE);

      const element = await context.getElement();
      assert(element instanceof globalType.Model);
    });
  });

  describe("How to add a context to the graph", function() {
    it("should add a context to the context relation of the graph",
      async function() {
        let graph = new lib.SpinalGraph();
        let context = new lib.SpinalContext();

        await graph.addContext(context);

        const children = await graph.getChildren([
          HAS_CONTEXT_RELATION_NAME
        ]);
        assert.deepStrictEqual(children, [context]);
      });

    it("should throw an error if the context to add is not a context",
      async function() {
        let graph = new lib.SpinalGraph();
        let context = new lib.SpinalNode();
        let error = false;

        await graph.addContext(context).catch(e => {
          error = true;
        });
        assert(error);
      });
  });

  describe("How to use getContext", function() {
    it("should get a context using its name", async function() {
      let graph = new lib.SpinalGraph();
      let context1 = new lib.SpinalContext(
        DEFAULT_SPINAL_CONTEXT_NAME1);
      let context2 = new lib.SpinalContext(
        DEFAULT_SPINAL_CONTEXT_NAME2);

      Promise.all([
        graph.addContext(context1),
        graph.addContext(context2)
      ]);

      const context = await graph.getContext(
        DEFAULT_SPINAL_CONTEXT_NAME2);
      assert.strictEqual(context, context2);
    });
  });
});
