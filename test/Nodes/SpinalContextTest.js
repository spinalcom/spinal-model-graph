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
        it("should create a context with default values", function (done) {
            let context = new lib.SpinalContext();

            assert.equal(context.getName(), DEFAULT_SPINAL_CONTEXT_NAME);
            assert.equal(context.getType(), DEFAULT_SPINAL_CONTEXT_TYPE);
            context.getElement().then(element => {
                assert(element instanceof globalType.Model);
                done();
            });
        });
    });

    describe("How to get information about the context", function () {
        describe("How to use getRelationIds", function () {
            it("should return all the relation ids that the context knows", function () {
                let context = new lib.SpinalContext();
                let relation = new SpinalRelationRef();

                context.addRelationId(relation.getId().get());

                let relationIds = context.getRelationIds();

                assert.equal(relationIds.length, 1);
                assert.equal(relationIds[0], relation.getId().get());
            });

            it("should return an empty list", function () {
                let context = new lib.SpinalContext();

                let relationIds = context.getRelationIds();

                assert.equal(relationIds.length, 0);
            });
        });

        describe("How to use getRelationNames", function () {
            it("should return all the relation names that the context knows", function () {
                let context = new lib.SpinalContext();
                let relation = new SpinalRelationRef(DEFAULT_RELATION_NAME);

                context.addRelationName(relation.getName().get());

                let relationNames = context.getRelationNames();

                assert.equal(relationNames.length, 1);
                assert.equal(relationNames[0], relation.getName().get());
            });

            it("should return an empty list", function () {
                let context = new lib.SpinalContext();

                let relationNames = context.getRelationNames();

                assert.equal(relationNames.length, 0);
            });
        });
    });

    describe("How to register relations", function () {
        describe("How to use addRelationId", function () {
            it("should add a relation id to the list", function () {
                let context = new lib.SpinalContext();
                let relation = new SpinalRelationRef();

                const res = context.addRelationId(relation.getId().get());

                assert(res);

                let relationIds = context.getRelationIds();

                assert.equal(relationIds.length, 1);
                assert.equal(relationIds[0], relation.getId().get());
            });

            it("should not add the known relation id to the list", function () {
                let context = new lib.SpinalContext();
                let relation = new SpinalRelationRef();

                context.addRelationId(relation.getId().get());
                const res = context.addRelationId(relation.getId().get());

                assert(!res);

                let relationIds = context.getRelationIds();

                assert.equal(relationIds.length, 1);
                assert.equal(relationIds[0], relation.getId().get());
            });
        });

        describe("How to use addRelationName", function () {
            it("should add a relation name to the list", function () {
                let context = new lib.SpinalContext();
                let relation = new SpinalRelationRef(DEFAULT_RELATION_NAME);

                const res = context.addRelationName(relation.getName().get());

                assert(res);

                let relationNames = context.getRelationNames();

                assert.equal(relationNames.length, 1);
                assert.equal(relationNames[0], relation.getName().get());
            });

            it("should not add the known relation name to the list", function () {
                let context = new lib.SpinalContext();
                let relation = new SpinalRelationRef(DEFAULT_RELATION_NAME);

                context.addRelationName(relation.getName().get());
                const res = context.addRelationName(relation.getName().get());

                assert(!res);

                let relationNames = context.getRelationNames();

                assert.equal(relationNames.length, 1);
                assert.equal(relationNames[0], relation.getName().get());
            });
        });

        describe("How to use addRelation", function () {
            it("should add a relation to the list", function () {
                let context = new lib.SpinalContext();
                let relation = new SpinalRelationRef(DEFAULT_RELATION_NAME);

                const res = context.addRelation(relation);

                assert(res);

                let relationIds = context.getRelationIds();
                let relationNames = context.getRelationNames();

                assert.equal(relationIds.length, 1);
                assert.equal(relationIds[0], relation.getId().get());
                assert.equal(relationNames.length, 1);
                assert.equal(relationNames[0], relation.getName().get());
            });

            it("should add a relation to the list only once", function () {
                let context = new lib.SpinalContext();
                let relation = new SpinalRelationRef(DEFAULT_RELATION_NAME);

                context.addRelation(relation);
                const res = context.addRelation(relation);

                assert(!res);

                let relationIds = context.getRelationIds();
                let relationNames = context.getRelationNames();

                assert.equal(relationIds.length, 1);
                assert.equal(relationIds[0], relation.getId().get());
                assert.equal(relationNames.length, 1);
                assert.equal(relationNames[0], relation.getName().get());
            });

            it("should add two relations with the same name to the list", function () {
                let context = new lib.SpinalContext();
                let relation1 = new SpinalRelationRef(DEFAULT_RELATION_NAME);
                let relation2 = new SpinalRelationRef(DEFAULT_RELATION_NAME);

                let res = context.addRelation(relation1);
                assert(res);
                res = context.addRelation(relation2);
                assert(res);


                let relationIds = context.getRelationIds();
                let relationNames = context.getRelationNames();

                assert.equal(relationIds.length, 2);
                assert.equal(relationIds[0], relation1.getId().get());
                assert.equal(relationIds[1], relation2.getId().get());
                assert.equal(relationNames.length, 1);
                assert.equal(relationNames[0], DEFAULT_RELATION_NAME);
            });
        });
    });

    describe("How to add children to the context", function () {
        describe("How to use addChild", function () {
            it("should add a child to the context with a SPINAL_RELATION_PTR_LST_TYPE type", function () {
                let context = new lib.SpinalContext();

                context.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                assert(context.hasRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_PTR_LST_TYPE));
            });

            it("should overload SpinalNode.addChild correctly", function () {
                let context = new lib.SpinalContext();

                context.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
                assert(context.hasRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_PTR_LST_TYPE));
            });
        });

        describe("How to use addChildInContext", function () {
            it("should add a child to the context with a SPINAL_RELATION_PTR_LST_TYPE type", function () {
                let context = new lib.SpinalContext();

                context.addChildInContext(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                assert(context.hasRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_PTR_LST_TYPE));
            });

            it("should overload SpinalNode.addChildInContext correctly", function () {
                let context = new lib.SpinalContext();

                context.addChildInContext(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
                assert(context.hasRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_PTR_LST_TYPE));
            });

            it("should add the node to itself (has a context) by default", function () {
                let context = new lib.SpinalContext();

                context.addChildInContext(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                let relationNames = context.getRelationNames();

                assert.equal(relationNames.length, 1);
                assert.equal(relationNames[0], DEFAULT_RELATION_NAME);
            });
        });
    });
});
