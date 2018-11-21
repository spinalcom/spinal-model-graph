const lib = require("../../build/index");
const globalType = typeof window === "undefined" ? global : window;
const SpinalRelationRef = require("../../build/Relations/SpinalRelationRef").default;

const assert = require("assert");

const DEFAULT_SPINAL_CONTEXT_NAME = "undefined";
const DEFAULT_SPINAL_CONTEXT_TYPE = "SpinalContext";
const DEFAULT_RELATION_NAME = "relationName";
const DEFAULT_NODE = new lib.SpinalNode();

describe("SpinalContext", function () {
    describe("How to use the constructor", function () {
        it("should create a context with default values", async function () {
            let context = new lib.SpinalContext();

            assert.strictEqual(context.getName().get(), DEFAULT_SPINAL_CONTEXT_NAME);
            assert.strictEqual(context.getType().get(), DEFAULT_SPINAL_CONTEXT_TYPE);
            const element = await context.getElement();
            assert(element instanceof globalType.Model);
        });
    });

    describe("How to get information about the context", function () {
        describe("How to use getRelationNames", function () {
            it("should return all the relation names that the context knows", function () {
                let context = new lib.SpinalContext();
                let relation = new SpinalRelationRef(DEFAULT_RELATION_NAME);

                context.addRelationNames(relation.getName().get());

                let relationNames = context.getRelationNames();

                assert.strictEqual(relationNames.length, 1);
                assert.strictEqual(relationNames[0].get(), relation.getName().get());
            });

            it("should return an empty list", function () {
                let context = new lib.SpinalContext();

                let relationNames = context.getRelationNames();

                assert.strictEqual(relationNames.length, 0);
            });
        });
    });

    describe("How to register relations", function () {
        describe("How to use addRelationNames", function () {
            it("should add a relation name to the list", function () {
                let context = new lib.SpinalContext();

                const res = context.addRelationNames(DEFAULT_RELATION_NAME);

                assert(res);

                let relationNames = context.getRelationNames();

                assert.strictEqual(relationNames.length, 1);
                assert.strictEqual(relationNames[0].get(), DEFAULT_RELATION_NAME);
            });

            it("should not add the known relation name to the list", function () {
                let context = new lib.SpinalContext();

                context.addRelationNames(DEFAULT_RELATION_NAME);
                const res = context.addRelationNames(DEFAULT_RELATION_NAME);

                assert(!res);

                let relationNames = context.getRelationNames();

                assert.strictEqual(relationNames.length, 1);
                assert.strictEqual(relationNames[0].get(), DEFAULT_RELATION_NAME);
            });

            it("should add a relation names to the list", function () {
                let context = new lib.SpinalContext();
                const name1 = DEFAULT_RELATION_NAME + "1";
                const name2 = DEFAULT_RELATION_NAME + "2";

                const res = context.addRelationNames([name1, name2]);

                assert(res);

                let relationNames = context.getRelationNames();

                assert.strictEqual(relationNames.length, 2);
                assert.strictEqual(relationNames[0].get(), name1);
                assert.strictEqual(relationNames[1].get(), name2);
            });

            it("should not add the known relation names to the list", function () {
                let context = new lib.SpinalContext();
                const name1 = DEFAULT_RELATION_NAME + "1";
                const name2 = DEFAULT_RELATION_NAME + "2";

                context.addRelationNames(name1);
                const res1 = context.addRelationNames([name1, name2]);

                assert(res1);

                let relationNames = context.getRelationNames();

                assert.strictEqual(relationNames.length, 2);
                assert.strictEqual(relationNames[0].get(), name1);
                assert.strictEqual(relationNames[1].get(), name2);

                const res2 = context.addRelationNames([name1, name2]);

                assert(!res2);

                relationNames = context.getRelationNames();

                assert.strictEqual(relationNames.length, 2);
                assert.strictEqual(relationNames[0].get(), name1);
                assert.strictEqual(relationNames[1].get(), name2);
            });
        });
    });

    describe("How to add children to the context", function () {
        describe("How to use addChild", function () {
            it("should add a child to the context with a SPINAL_RELATION_PTR_LST_TYPE type", async function () {
                let context = new lib.SpinalContext();

                await context.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                assert(context.hasRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_PTR_LST_TYPE));
            });

            it("should overload SpinalNode.addChild correctly", async function () {
                let context = new lib.SpinalContext();

                await context.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
                assert(context.hasRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_PTR_LST_TYPE));
            });
        });

        describe("How to use addChildInContext", function () {
            it("should add a child to the context with a SPINAL_RELATION_PTR_LST_TYPE type", async function () {
                let context = new lib.SpinalContext();

                await context.addChildInContext(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                assert(context.hasRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_PTR_LST_TYPE));
            });

            it("should overload SpinalNode.addChildInContext correctly", async function () {
                let context = new lib.SpinalContext();

                await context.addChildInContext(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
                assert(context.hasRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_PTR_LST_TYPE));
            });

            it("should be associated to the node (has a context) by default", async function () {
                let context = new lib.SpinalContext();
                let node = new lib.SpinalNode();

                await context.addChildInContext(node, DEFAULT_RELATION_NAME);

                assert.deepStrictEqual(node.getContextIds(), [context.getId().get()]);
            });
        });
    });

    describe("How to use getChildrenInContext", function () {
        it("should use this by default", async function () {
            let context = new lib.SpinalContext();
            let node1 = new lib.SpinalNode();
            let node2 = new lib.SpinalNode();
            let node3 = new lib.SpinalNode();

            await Promise.all([
                context.addChildInContext(node1, DEFAULT_RELATION_NAME + "1"),
                context.addChildInContext(node2, DEFAULT_RELATION_NAME + "2"),
                context.addChild(node3, DEFAULT_RELATION_NAME + "3")
            ]);

            const children = await context.getChildrenInContext();

            assert.deepStrictEqual(children, [node1, node2]);
        })
    });
});
