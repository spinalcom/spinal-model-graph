const lib = require("../../build/index");
const globalType = typeof window === "undefined" ? global : window;

const assert = require("assert");

const DEFAULT_SPINAL_GRAPH_NAME = "undefined";
const DEFAULT_SPINAL_GRAPH_TYPE = "SpinalGraph";
const DEFAULT_SPINAL_CONTEXT_NAME1 = "SpinalContext1";
const DEFAULT_SPINAL_CONTEXT_NAME2 = "SpinalContext2";
const HAS_CONTEXT_RELATION_NAME = "hasContext";

describe("SpinalGraph", function () {
    describe("How to use the constructor", function () {
        it("should create a graph with default values", function (done) {
            let context = new lib.SpinalGraph();

            assert.equal(context.getName(), DEFAULT_SPINAL_GRAPH_NAME);
            assert.equal(context.getType(), DEFAULT_SPINAL_GRAPH_TYPE);
            context.getElement().then(element => {
                assert(element instanceof globalType.Model);
                done();
            });
        });

        it("should create a hasContext relation with a SPINAL_RELATION_TYPE TYPE", function () {
            let context = new lib.SpinalGraph();

            assert(context.hasRelation(HAS_CONTEXT_RELATION_NAME, lib.SPINAL_RELATION_TYPE));
        });
    });

    describe("How to add a context to the graph", function () {
        it("should add a context to the context relation of the graph", function (done) {
            let graph = new lib.SpinalGraph();
            let context = new lib.SpinalContext();

            graph.addContext(context);
            graph.getChildren([HAS_CONTEXT_RELATION_NAME]).then(children => {
                assert.deepEqual(children, [context]);
                done();
            });
        });

        it("should throw an error if the context to add is not a context", function () {
            let graph = new lib.SpinalGraph();
            let context = new lib.SpinalNode();
            let error = false;

            try {
                graph.addContext(context);
            } catch (e) {
                error = true;
            }
            assert(error);
        });
    });

    describe("How to use getContext", function () {
        it("should get a context using its name", function (done) {
            let graph = new lib.SpinalGraph();
            let context1 = new lib.SpinalContext(DEFAULT_SPINAL_CONTEXT_NAME1);
            let context2 = new lib.SpinalContext(DEFAULT_SPINAL_CONTEXT_NAME2);

            graph.addContext(context1);
            graph.addContext(context2);
            graph.getContext(DEFAULT_SPINAL_CONTEXT_NAME2).then(context => {
                assert.equal(context, context2);
                done();
            });
        });
    });
});
