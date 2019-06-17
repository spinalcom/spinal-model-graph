"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../src");
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const assert = require("assert");
const DEFAULT_SPINAL_GRAPH_NAME = 'undefined';
const DEFAULT_SPINAL_GRAPH_TYPE = 'SpinalGraph';
const DEFAULT_SPINAL_CONTEXT_NAME1 = 'SpinalContext1';
const DEFAULT_SPINAL_CONTEXT_NAME2 = 'SpinalContext2';
const HAS_CONTEXT_RELATION_NAME = 'hasContext';
describe('SpinalGraph', () => {
    describe('How to use the constructor', () => {
        it('should create an empty object FileSystem._sig_server === false', () => {
            spinal_core_connectorjs_type_1.FileSystem._sig_server = false;
            const node = new src_1.SpinalGraph();
            spinal_core_connectorjs_type_1.FileSystem._sig_server = true;
            assert(typeof node.element === 'undefined');
        });
        it('should create a graph with default values', async () => {
            const context = new src_1.SpinalGraph();
            assert.strictEqual(context.getName().get(), DEFAULT_SPINAL_GRAPH_NAME);
            assert.strictEqual(context.getType().get(), DEFAULT_SPINAL_GRAPH_TYPE);
            const element = await context.getElement();
            assert(element instanceof spinal_core_connectorjs_type_1.Model);
        });
    });
    describe('How to add a context to the graph', () => {
        it('should add a context to the context relation of the graph', async () => {
            const graph = new src_1.SpinalGraph();
            const context = new src_1.SpinalContext();
            await graph.addContext(context);
            const children = await graph.getChildren([HAS_CONTEXT_RELATION_NAME]);
            assert.deepStrictEqual(children, [context]);
        });
        it('should throw an error if the context is missing', async () => {
            const graph = new src_1.SpinalGraph();
            let error = false;
            try {
                await graph.addContext();
            }
            catch (e) {
                error = true;
                assert(e instanceof Error);
            }
            assert(error);
        });
        it('should throw an error if the context is not a SpinalContext', async () => {
            const graph = new src_1.SpinalGraph();
            const context = new src_1.SpinalNode();
            let error = false;
            try {
                await graph.addContext(context);
            }
            catch (e) {
                error = true;
                assert(e instanceof Error);
            }
            assert(error);
        });
    });
    describe('How to use getContext', () => {
        it('should get a context using its name', async () => {
            const graph = new src_1.SpinalGraph();
            const context1 = new src_1.SpinalContext(DEFAULT_SPINAL_CONTEXT_NAME1);
            const context2 = new src_1.SpinalContext(DEFAULT_SPINAL_CONTEXT_NAME2);
            await Promise.all([
                graph.addContext(context1),
                graph.addContext(context2),
            ]);
            const context = await graph.getContext(DEFAULT_SPINAL_CONTEXT_NAME2);
            assert.strictEqual(context, context2);
        });
        it("should return undefined if the context isn't found", async () => {
            const graph = new src_1.SpinalGraph();
            const context = await graph.getContext(DEFAULT_SPINAL_CONTEXT_NAME1);
            assert.strictEqual(context, undefined);
        });
        it('should throw an error if the name is missing', async () => {
            const graph = new src_1.SpinalGraph();
            let error = false;
            try {
                await graph.getContext();
            }
            catch (e) {
                error = true;
                assert(e instanceof Error);
            }
            assert(error);
        });
        it('should throw an error if the name is not a string', async () => {
            const graph = new src_1.SpinalGraph();
            let error = false;
            try {
                await graph.getContext(1);
            }
            catch (e) {
                error = true;
                assert(e instanceof Error);
            }
            assert(error);
        });
    });
    describe('How to use removeFromGraph', () => {
        it('should do nothing', async () => {
            const graph = new src_1.SpinalGraph();
            await graph.removeFromGraph();
        });
        it("shouldn't remove children", async () => {
            const graph = new src_1.SpinalGraph();
            const context = new src_1.SpinalContext();
            await graph.addContext(context);
            await graph.removeFromGraph();
            const children = await graph.getChildren();
            assert.deepStrictEqual(children, [context]);
            const parents = await context.getParents();
            assert.deepStrictEqual(parents, [graph]);
        });
    });
});
//# sourceMappingURL=SpinalGraphTest.js.map