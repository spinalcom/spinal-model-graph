"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../src");
const assert = require("assert");
const CUSTOM_TYPE = 'custom';
const DEFAULT_NODE = new src_1.SpinalNode();
const DEFAULT_CONTEXT = new src_1.SpinalContext();
const DEFAULT_RELATION_NAME = 'relationName';
const DEFAULT_RELATION_TYPE = src_1.SPINAL_RELATION_LST_PTR_TYPE;
const DEFAULT_FUN = (node) => {
    const type = node.getType();
    type.set(CUSTOM_TYPE);
};
describe('How to use forEach', () => {
    describe('Error handling', () => {
        it('should throw an error if relationNames is neither an array, a string or omitted', async () => {
            let error = false;
            try {
                await DEFAULT_NODE.forEach(1, DEFAULT_FUN);
            }
            catch (e) {
                error = true;
                assert(e instanceof Error);
            }
            assert(error);
        });
        it('should throw an error if the callback function is missing', async () => {
            let error = false;
            try {
                await DEFAULT_NODE.forEach([], undefined);
            }
            catch (e) {
                error = true;
                assert(e instanceof Error);
            }
            assert(error);
        });
        it('should throw an error if the callback function is not a function', async () => {
            let error = false;
            try {
                await DEFAULT_NODE.forEach([], 256);
            }
            catch (e) {
                error = true;
                assert(e instanceof Error);
            }
            assert(error);
        });
        it('should not fall in infinite loops', async () => {
            const node1 = new src_1.SpinalNode();
            const node2 = new src_1.SpinalNode();
            node1.addChild(node2, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE);
            node2.addChild(node1, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE);
            await node1.forEach(undefined, DEFAULT_FUN);
            assert.strictEqual(node1.getType().get(), CUSTOM_TYPE);
            assert.strictEqual(node2.getType().get(), CUSTOM_TYPE);
        });
    });
    describe('Basic callback manipulation', () => {
        it('should change the type of all nodes', async () => {
            const parent = new src_1.SpinalNode('parent');
            const child1 = new src_1.SpinalNode('child1');
            const child2 = new src_1.SpinalNode('child2');
            const child3 = new src_1.SpinalNode('child3');
            await Promise.all([
                parent.addChild(child1, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
                parent.addChild(child2, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
                parent.addChild(child3, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
            ]);
            await parent.forEach(undefined, DEFAULT_FUN);
            assert.strictEqual(parent.getType().get(), CUSTOM_TYPE);
            assert.strictEqual(child1.getType().get(), CUSTOM_TYPE);
            assert.strictEqual(child2.getType().get(), CUSTOM_TYPE);
            assert.strictEqual(child3.getType().get(), CUSTOM_TYPE);
        });
    });
});
describe('How to use forEachInContext', () => {
    describe('Error handling', () => {
        it('should throw an error if the context is missing', async () => {
            let error = false;
            try {
                await DEFAULT_NODE.forEachInContext(undefined, DEFAULT_FUN);
            }
            catch (e) {
                error = true;
                assert(e instanceof Error);
            }
            assert(error);
        });
        it('should throw an error if the context is not a SpinalContext', async () => {
            const context = new src_1.SpinalNode();
            let error = false;
            try {
                await DEFAULT_NODE.forEachInContext(context, DEFAULT_FUN);
            }
            catch (e) {
                error = true;
                assert(e instanceof Error);
            }
            assert(error);
        });
        it('should throw an error if the callback is missing', async () => {
            let error = false;
            try {
                const testNode = DEFAULT_NODE;
                await testNode.forEachInContext(DEFAULT_CONTEXT);
            }
            catch (e) {
                error = true;
                assert(e instanceof Error);
            }
            assert(error);
        });
        it('should throw an error if the callback is not a function', async () => {
            let error = false;
            try {
                await DEFAULT_NODE.forEachInContext(DEFAULT_CONTEXT, 128);
            }
            catch (e) {
                error = true;
                assert(e instanceof Error);
            }
            assert(error);
        });
        it('should not fall in infinite loops', async () => {
            const context = new src_1.SpinalContext();
            const node1 = new src_1.SpinalNode();
            const node2 = new src_1.SpinalNode();
            await Promise.all([
                node1.addChildInContext(node2, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context),
                node2.addChildInContext(node1, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context),
            ]);
            await node1.forEachInContext(context, DEFAULT_FUN);
            assert.strictEqual(node1.getType().get(), CUSTOM_TYPE);
            assert.strictEqual(node2.getType().get(), CUSTOM_TYPE);
        });
    });
    describe('Basic callback manipulation', () => {
        it('should return the names of all nodes in the context', async () => {
            const context = new src_1.SpinalContext('context');
            const child1 = new src_1.SpinalNode('child1');
            const child2 = new src_1.SpinalNode('child2');
            const child3 = new src_1.SpinalNode('child3');
            await Promise.all([
                context.addChildInContext(child1, DEFAULT_RELATION_NAME),
                context.addChildInContext(child2, DEFAULT_RELATION_NAME),
                context.addChildInContext(child3, DEFAULT_RELATION_NAME),
            ]);
            await context.forEachInContext(context, DEFAULT_FUN);
            assert.strictEqual(child1.getType().get(), CUSTOM_TYPE);
            assert.strictEqual(child2.getType().get(), CUSTOM_TYPE);
            assert.strictEqual(child3.getType().get(), CUSTOM_TYPE);
        });
    });
    describe('How to use context', () => {
        it('should forEachInContext all the nodes from the given relation names', async () => {
            const context1 = new src_1.SpinalContext();
            const context2 = new src_1.SpinalContext();
            const parent = new src_1.SpinalNode();
            const child1 = new src_1.SpinalNode();
            const child2 = new src_1.SpinalNode();
            const child3 = new src_1.SpinalNode();
            const child4 = new src_1.SpinalNode();
            const child5 = new src_1.SpinalNode();
            const child6 = new src_1.SpinalNode();
            await Promise.all([
                parent.addChildInContext(child1, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context1),
                parent.addChildInContext(child2, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context2),
                parent.addChildInContext(child3, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context2),
                child2.addChildInContext(child4, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context2),
                child3.addChildInContext(child5, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context1),
                child5.addChildInContext(child6, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context2),
            ]);
            let foundChildren = [];
            await parent.forEachInContext(context2, node => foundChildren.push(node));
            assert.deepStrictEqual(foundChildren, [parent, child2, child3, child4]);
            foundChildren = [];
            await parent.forEachInContext(context1, node => foundChildren.push(node));
            assert.deepStrictEqual(foundChildren, [parent, child1]);
        });
    });
});
//# sourceMappingURL=forEachTest.js.map