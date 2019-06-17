"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../src");
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const assert = require("assert");
const DEFAULT_SPINAL_CONTEXT_NAME = 'undefined';
const DEFAULT_SPINAL_CONTEXT_TYPE = 'SpinalContext';
const DEFAULT_RELATION_NAME = 'relationName';
const DEFAULT_NODE = new src_1.SpinalNode();
describe('SpinalContext', () => {
    describe('How to use the constructor', () => {
        it('should create an empty object FileSystem._sig_server === false', () => {
            spinal_core_connectorjs_type_1.FileSystem._sig_server = false;
            const node = new src_1.SpinalContext();
            spinal_core_connectorjs_type_1.FileSystem._sig_server = true;
            assert(typeof node.element === 'undefined');
        });
        it('should create a context with default values', async () => {
            const context = new src_1.SpinalContext();
            assert.strictEqual(context.getName().get(), DEFAULT_SPINAL_CONTEXT_NAME);
            assert.strictEqual(context.getType().get(), DEFAULT_SPINAL_CONTEXT_TYPE);
            const element = await context.getElement();
            assert(element instanceof spinal_core_connectorjs_type_1.Model);
        });
    });
    describe('How to add children to the context', () => {
        describe('How to use addChild', () => {
            it('should add a child to the context with a SPINAL_RELATION_PTR_LST_TYPE type', async () => {
                const context = new src_1.SpinalContext();
                await context.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                assert(context.hasRelation(DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_PTR_LST_TYPE));
            });
        });
        describe('How to use addChildInContext', () => {
            it('should add a child to the context with a SPINAL_RELATION_PTR_LST_TYPE type', async () => {
                const context = new src_1.SpinalContext();
                await context.addChildInContext(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                assert(context.hasRelation(DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_PTR_LST_TYPE));
            });
            it('should be associated to the node (has a context) by default', async () => {
                const context = new src_1.SpinalContext();
                const node = new src_1.SpinalNode();
                await context.addChildInContext(node, DEFAULT_RELATION_NAME);
                assert.deepStrictEqual(node.getContextIds(), [context.getId().get()]);
            });
        });
    });
    describe('How to use getChildrenInContext', () => {
        it('should use this by default', async () => {
            const context = new src_1.SpinalContext();
            const node1 = new src_1.SpinalNode();
            const node2 = new src_1.SpinalNode();
            const node3 = new src_1.SpinalNode();
            await Promise.all([
                context.addChildInContext(node1, `${DEFAULT_RELATION_NAME}1`),
                context.addChildInContext(node2, `${DEFAULT_RELATION_NAME}2`),
                context.addChild(node3, `${DEFAULT_RELATION_NAME}3`),
            ]);
            const children = await context.getChildrenInContext();
            assert.deepStrictEqual(children, [node1, node2]);
        });
    });
});
//# sourceMappingURL=SpinalContextTest.js.map