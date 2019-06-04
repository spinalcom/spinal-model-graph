"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../src");
const BaseSpinalRelation_1 = require("../../src/Relations/BaseSpinalRelation");
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const assert = require("assert");
const DEFAULT_RELATION_NAME = 'relationName';
const DEFAULT_NODE = new src_1.SpinalNode();
describe('BaseSpinalRelation', () => {
    describe('How to use the constructor', () => {
        it('should create a new relation with a name and node parent', async () => {
            const parent = new src_1.SpinalNode();
            const rel = new BaseSpinalRelation_1.BaseSpinalRelation(parent, DEFAULT_RELATION_NAME);
            assert.strictEqual(rel.getName().get(), DEFAULT_RELATION_NAME);
            assert.strictEqual(await rel.getParent(), parent);
            assert(rel.getId() instanceof spinal_core_connectorjs_type_1.Str);
        });
        it('should create a new relation with a name and a context parent', async () => {
            const parent = new src_1.SpinalContext();
            const rel = new BaseSpinalRelation_1.BaseSpinalRelation(parent, DEFAULT_RELATION_NAME);
            assert.strictEqual(rel.getName().get(), DEFAULT_RELATION_NAME);
            assert.strictEqual(await rel.getParent(), parent);
            assert(rel.getId() instanceof spinal_core_connectorjs_type_1.Str);
        });
        it('should create a new relation with a name and a graph parent', async () => {
            const parent = new src_1.SpinalGraph();
            const rel = new BaseSpinalRelation_1.BaseSpinalRelation(parent, DEFAULT_RELATION_NAME);
            assert.strictEqual(rel.getName().get(), DEFAULT_RELATION_NAME);
            assert.strictEqual(await rel.getParent(), parent);
            assert(rel.getId() instanceof spinal_core_connectorjs_type_1.Str);
        });
        it('should throw an error if the parent or the name is missing', async () => {
            assert.throws(() => {
                new BaseSpinalRelation_1.BaseSpinalRelation();
            }, TypeError);
            assert.throws(() => {
                new BaseSpinalRelation_1.BaseSpinalRelation(undefined, DEFAULT_RELATION_NAME);
            }, TypeError);
            assert.throws(() => {
                new BaseSpinalRelation_1.BaseSpinalRelation(DEFAULT_NODE);
            }, TypeError);
        });
        it('should throw an error if the name is not a string', async () => {
            assert.throws(() => {
                new BaseSpinalRelation_1.BaseSpinalRelation(DEFAULT_NODE, 1);
            }, TypeError);
        });
        it('should throw an error if the parent is not a SpinalNode', async () => {
            const parent1 = [];
            assert.throws(() => {
                new BaseSpinalRelation_1.BaseSpinalRelation(parent1, DEFAULT_RELATION_NAME);
            }, TypeError);
            const parent2 = new spinal_core_connectorjs_type_1.Model();
            assert.throws(() => {
                new BaseSpinalRelation_1.BaseSpinalRelation(parent2, DEFAULT_RELATION_NAME);
            }, TypeError);
        });
    });
    describe('How to get/set information about the relation', () => {
        describe('How to use getName', () => {
            it('should return the name DEFAULT_RELATION_NAME', () => {
                const rel = new BaseSpinalRelation_1.BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                assert.strictEqual(rel.getName().get(), DEFAULT_RELATION_NAME);
            });
        });
        describe('How to use getParent', () => {
            it('should return the parent of the relation', async () => {
                const rel = new BaseSpinalRelation_1.BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                assert.strictEqual(await rel.getParent(), DEFAULT_NODE);
            });
        });
        describe('How to use addContextIds and getContextIds', () => {
            it('should get the ids of the associated contexts', () => {
                const relation = new BaseSpinalRelation_1.BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                const contextId1 = new src_1.SpinalContext().getId().get();
                const contextId2 = new src_1.SpinalContext().getId().get();
                relation.addContextId(contextId1);
                assert.deepStrictEqual(relation.getContextIds(), [
                    contextId1,
                ]);
                relation.addContextId(contextId1);
                relation.addContextId(contextId2);
                assert.deepStrictEqual(relation.getContextIds(), [
                    contextId1, contextId2,
                ]);
            });
            it('should throw an error if the contextId is missing', () => {
                const relation = new BaseSpinalRelation_1.BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                assert.throws(() => {
                    relation.addContextId();
                }, TypeError);
            });
            it('should throw an error if the contextId is not a string', () => {
                const relation = new BaseSpinalRelation_1.BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                const badContextId1 = new src_1.SpinalContext().getId();
                assert.throws(() => {
                    relation.addContextId(badContextId1);
                }, TypeError);
            });
        });
        describe('How to use belongsToContext', () => {
            it('should return true', async () => {
                const context = new src_1.SpinalContext();
                const relation = new BaseSpinalRelation_1.BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                relation.addContextId(context.getId().get());
                assert(relation.belongsToContext(context));
            });
            it('should return false', () => {
                const context = new src_1.SpinalContext();
                const relation = new BaseSpinalRelation_1.BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                assert(!relation.belongsToContext(context));
            });
            it('should throw an error if no context is passed', () => {
                const relation = new BaseSpinalRelation_1.BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                assert.throws(() => {
                    relation.belongsToContext(context);
                }, TypeError);
            });
            it('should throw an error if the context as the wrong type', () => {
                const context1 = {};
                const relation = new BaseSpinalRelation_1.BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                assert.throws(() => {
                    relation.belongsToContext(context1);
                }, TypeError);
                const context2 = new src_1.SpinalNode();
                assert.throws(() => {
                    relation.belongsToContext(context2);
                }, TypeError);
            });
        });
    });
    describe('How to remove from the graph', () => {
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
                const node1 = new src_1.SpinalNode();
                const node2 = new src_1.SpinalNode();
                const node3 = new src_1.SpinalNode();
                const node4 = new src_1.SpinalNode();
                let error = false;
                await Promise.all([
                    rel.addChild(node1),
                    rel.addChild(node2),
                    rel.addChild(node3),
                ]);
                try {
                    await rel.removeChildren([node3, node1, node4]);
                }
                catch (e) {
                    error = true;
                    assert(e instanceof Error);
                }
                assert(error);
                const children = await rel.getChildren();
                assert.deepStrictEqual(children, [node2]);
            });
            it('should throw an error if nodes is not an array', async () => {
                const relation = new BaseSpinalRelation_1.BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                let error = false;
                try {
                    await relation.removeChildren({});
                }
                catch (e) {
                    error = true;
                    assert(e instanceof Error);
                }
                assert(error);
            });
        });
        describe('How to use removeFromGraph', () => {
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
            it('should the relation from the parent pointer', async () => {
                const parent = new src_1.SpinalNode();
                const rel = parent._createRelation(DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_LST_PTR_TYPE);
                await rel.removeFromGraph();
                assert(!parent.hasRelation(DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_LST_PTR_TYPE));
            });
        });
    });
});
//# sourceMappingURL=BaseSpinalRelationTest.js.map