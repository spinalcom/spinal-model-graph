"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../src");
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const assert = require("assert");
const DEFAULT_RELATION_NAME = 'relationName';
const DEFAULT_NODE = new src_1.SpinalNode('test', 'test', new spinal_core_connectorjs_type_1.Model());
describe('SpinalRelationLstPtr', () => {
    describe('How to use the constructor', () => {
        it('should create an empty object FileSystem._sig_server === false', () => {
            spinal_core_connectorjs_type_1.FileSystem._sig_server = false;
            const rel = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
            spinal_core_connectorjs_type_1.FileSystem._sig_server = true;
            assert(typeof rel.children === 'undefined');
        });
        it('should create a new relation with a name and a node parent', () => {
            const rel = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
            assert.strictEqual(rel.getName().get(), DEFAULT_RELATION_NAME);
        });
        it('should create a new relation with a name and a context parent', async () => {
            const parent = new src_1.SpinalContext();
            const rel = new src_1.SpinalRelationLstPtr(parent, DEFAULT_RELATION_NAME);
            assert.strictEqual(rel.getName().get(), DEFAULT_RELATION_NAME);
            assert.strictEqual(await rel.getParent(), parent);
        });
        it('should create a new relation with a name and a graph parent', async () => {
            const parent = new src_1.SpinalGraph();
            const rel = new src_1.SpinalRelationLstPtr(parent, DEFAULT_RELATION_NAME);
            assert.strictEqual(rel.getName().get(), DEFAULT_RELATION_NAME);
            assert.strictEqual(await rel.getParent(), parent);
        });
        it('should throw an error if the parent or the name is missing', async () => {
            assert.throws(() => {
                new src_1.SpinalRelationLstPtr();
            }, TypeError);
            assert.throws(() => {
                new src_1.SpinalRelationLstPtr(undefined, DEFAULT_RELATION_NAME);
            }, TypeError);
            assert.throws(() => {
                new src_1.SpinalRelationLstPtr(DEFAULT_NODE);
            }, TypeError);
        });
        it('should throw an error if the parent is not a SpinalNode', async () => {
            const parent1 = [];
            assert.throws(() => {
                new src_1.SpinalRelationLstPtr(parent1, DEFAULT_RELATION_NAME);
            }, TypeError);
            const parent2 = new spinal_core_connectorjs_type_1.Model();
            assert.throws(() => {
                new src_1.SpinalRelationLstPtr(parent2, DEFAULT_RELATION_NAME);
            }, TypeError);
        });
    });
    describe('How to get informations about the relation', () => {
        describe('How to use getChildrenIds', () => {
            it('should return the ids of all children', async () => {
                const rel = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                await rel.addChild(DEFAULT_NODE);
                assert.deepStrictEqual(rel.getChildrenIds(), [
                    DEFAULT_NODE.getId().get(),
                ]);
            });
            it('should return the ids of all children', async () => {
                const rel = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                const node1 = new src_1.SpinalNode();
                const node2 = new src_1.SpinalNode();
                const node3 = new src_1.SpinalNode();
                const nodeIds = [
                    node1.getId().get(),
                    node2.getId().get(),
                    node3.getId().get(),
                ];
                await Promise.all([
                    rel.addChild(node1),
                    rel.addChild(node2),
                    rel.addChild(node3),
                ]);
                assert.deepStrictEqual(rel.getChildrenIds(), nodeIds);
                assert.deepStrictEqual(rel.getNbChildren(), nodeIds.length);
            });
        });
        describe('How to use getChildren', () => {
            it("should return the relation's child", async () => {
                const rel = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                await rel.addChild(DEFAULT_NODE);
                const children = await rel.getChildren();
                assert.deepStrictEqual(children, [DEFAULT_NODE]);
            });
            it("should return the relation's children", async () => {
                const rel = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                const node1 = new src_1.SpinalNode();
                const node2 = new src_1.SpinalNode();
                const node3 = new src_1.SpinalNode();
                await Promise.all([
                    rel.addChild(node1),
                    rel.addChild(node2),
                    rel.addChild(node3),
                ]);
                const children = await rel.getChildren();
                assert.deepStrictEqual(children, [node1, node2, node3]);
            });
            it('should return an empty array', async () => {
                const rel = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                const children = await rel.getChildren();
                assert.deepStrictEqual(children, []);
            });
        });
        describe('How to use getChildrenInContext', () => {
            it("should return the relation's child", async () => {
                const context = new src_1.SpinalContext();
                const relation = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                const child = new src_1.SpinalNode();
                child.addContextId(context.getId().get());
                await relation.addChild(child);
                const children = await relation.getChildrenInContext(context);
                assert.deepStrictEqual(children, [child]);
            });
            it("should return the relation's children associated to the context", async () => {
                const context = new src_1.SpinalContext();
                const relation = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                const child1 = new src_1.SpinalNode();
                const child2 = new src_1.SpinalNode();
                const child3 = new src_1.SpinalNode();
                child1.addContextId(context.getId().get());
                child3.addContextId(context.getId().get());
                await Promise.all([
                    relation.addChild(child1),
                    relation.addChild(child2),
                    relation.addChild(child3),
                ]);
                const children = await relation.getChildrenInContext(context);
                assert.deepStrictEqual(children, [child1, child3]);
            });
            it('should throw an error if the context is missing', async () => {
                const relation = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                let error = false;
                try {
                    await relation.getChildrenInContext();
                }
                catch (e) {
                    error = true;
                    assert(e instanceof Error);
                }
                assert(error);
            });
            it('should throw an error if context is not a SpinalContext', async () => {
                const context1 = new spinal_core_connectorjs_type_1.Model();
                const relation = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                let error = false;
                try {
                    await relation.getChildrenInContext(context1);
                }
                catch (e) {
                    error = true;
                    assert(e instanceof Error);
                }
                assert(error);
                const context2 = new src_1.SpinalNode();
                error = false;
                try {
                    await relation.getChildrenInContext(context2);
                }
                catch (e) {
                    error = true;
                    assert(e instanceof Error);
                }
                assert(error);
            });
        });
        describe('How to use getType', () => {
            it("should return the relation's type", () => {
                const rel = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                assert.strictEqual(rel.getType(), src_1.SPINAL_RELATION_LST_PTR_TYPE);
            });
        });
    });
    describe('How to add children', () => {
        describe('How to use addChild', () => {
            it('should add a child to the children of the relation', async () => {
                const rel = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                await rel.addChild(DEFAULT_NODE);
                const children = await rel.getChildren();
                assert.deepStrictEqual(children, [DEFAULT_NODE]);
            });
            it('should throw an error if you try to add the same node twice', async () => {
                const rel = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                let error;
                await rel.addChild(DEFAULT_NODE);
                try {
                    await rel.addChild(DEFAULT_NODE);
                }
                catch (e) {
                    error = true;
                    assert(e instanceof Error);
                }
                assert(error);
            });
            it('should throw an error when you pass it something that is not a model', async () => {
                const rel = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                let error;
                const array = [];
                try {
                    await rel.addChild(array);
                }
                catch (e) {
                    error = true;
                    assert(e instanceof Error);
                }
                assert(error);
            });
            it('should return the node added to the relation', async () => {
                const rel = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                const node = new src_1.SpinalNode();
                const model = new spinal_core_connectorjs_type_1.Model();
                const res1 = await rel.addChild(node);
                assert.strictEqual(res1, node);
                const res2 = await rel.addChild(model);
                const res2Elem = await res2.getElement();
                assert.strictEqual(res2Elem, model);
            });
        });
    });
    describe('How to remove children', () => {
        describe('How to use removeChild', () => {
            it('should remove a child from the children of the relation', async () => {
                const rel = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                await rel.addChild(DEFAULT_NODE);
                await rel.removeChild(DEFAULT_NODE);
                const children = await rel.getChildren();
                assert.deepStrictEqual(children, []);
            });
            it('should remove a child and update the children ids of the relation', async () => {
                const rel = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                await rel.addChild(DEFAULT_NODE);
                await rel.removeChild(DEFAULT_NODE);
                const ids = rel.getChildrenIds();
                assert.deepStrictEqual(ids, []);
            });
            it("should remove a child and remove the relation the node's parents", async () => {
                const parentNode = new src_1.SpinalNode();
                const rel = parentNode._createRelation(DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_LST_PTR_TYPE);
                const childNode = new src_1.SpinalNode();
                await rel.addChild(childNode);
                await rel.removeChild(childNode);
                const parents = await childNode.getParents();
                assert.deepStrictEqual(parents, []);
            });
            it('should throw an error if the node is not a child', async () => {
                const parentNode = new src_1.SpinalNode();
                const rel = parentNode._createRelation(DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_LST_PTR_TYPE);
                const childNode = new src_1.SpinalNode();
                let error = false;
                try {
                    await rel.removeChild(childNode);
                }
                catch (e) {
                    error = true;
                    assert(e instanceof Error);
                }
                assert(error);
            });
        });
        describe('How to use removeChildren', () => {
            it('should delete all of the children', async () => {
                const rel = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                const node1 = new src_1.SpinalNode();
                const node2 = new src_1.SpinalNode();
                const node3 = new src_1.SpinalNode();
                await Promise.all([
                    rel.addChild(node1),
                    rel.addChild(node2),
                    rel.addChild(node3),
                ]);
                await rel.removeChildren();
                const children = await rel.getChildren();
                assert.deepStrictEqual(children, []);
            });
            it('should delete the given children', async () => {
                const rel = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                const node1 = new src_1.SpinalNode();
                const node2 = new src_1.SpinalNode();
                const node3 = new src_1.SpinalNode();
                await Promise.all([
                    rel.addChild(node1),
                    rel.addChild(node2),
                    rel.addChild(node3),
                ]);
                await rel.removeChildren([node3, node1]);
                const children = await rel.getChildren();
                assert.deepStrictEqual(children, [node2]);
            });
            it('should delete some of the given children', async () => {
                const rel = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                const node1 = new src_1.SpinalNode('node1');
                const node2 = new src_1.SpinalNode('node2');
                const node3 = new src_1.SpinalNode('node3');
                const node4 = new src_1.SpinalNode('node4');
                let error = false;
                await Promise.all([
                    rel.addChild(node1),
                    rel.addChild(node2),
                    rel.addChild(node3),
                ]);
                try {
                    await rel.removeChildren([node3, node4, node1]);
                }
                catch (e) {
                    error = true;
                    assert(e instanceof Error);
                }
                assert(error);
                const children = await rel.getChildren();
                assert.deepStrictEqual(children, [node2]);
            });
        });
    });
});
//# sourceMappingURL=SpinalRelationLstPtrTest.js.map