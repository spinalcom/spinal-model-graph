const lib = require("../../build/index");
const globalType = typeof window === "undefined" ? global : window;

const assert = require("assert");

const DEFAULT_SPINAL_NODE_NAME = "undefined";
const DEFAULT_SPINAL_NODE_TYPE = "SpinalNode";
const CUSTOM_SPINAL_NODE_NAME = "SpinalNodeTestName";
const CUSTOM_SPINAL_NODE_TYPE = "SpinalNodeTestType";
const DEFAULT_RELATION_NAME = "has child";
const DEFAULT_ELEMENT_NAME = "Default Name";
const CUSTOM_RELATION_NAME1 = "custom relation";
const CUSTOM_RELATION_NAME2 = "custom relation 2";
const DEFAULT_ELEMENT = new globalType.Model();
DEFAULT_ELEMENT.add_attr({ name: DEFAULT_ELEMENT_NAME });
const DEFAULT_NODE = new lib.SpinalNode(CUSTOM_SPINAL_NODE_TYPE);

describe("SpinalNode", function () {
    describe("How to use the constructor", function () {
        it('should create a new spinal node.', async function () {
            const node = new lib.SpinalNode();

            assert.equal(
                node.getName(),
                DEFAULT_SPINAL_NODE_NAME
            );

            assert.equal(
                node.getType(),
                DEFAULT_SPINAL_NODE_TYPE
            );

            const elt = await node.getElement()
            assert.equal(
                elt instanceof Model,
                true,
            );
        });

        it('should create spinal a new SpinalNode with a specific name.', function () {
            const node = new lib.SpinalNode(CUSTOM_SPINAL_NODE_NAME);

            assert.equal(
                node.getName(),
                CUSTOM_SPINAL_NODE_NAME,
                "By setting the first argument of the construct the name should be setElement."
            );
        });

        it('should create a new SpinalNode with specific name and type.', function () {
            const node = new lib.SpinalNode(CUSTOM_SPINAL_NODE_NAME, CUSTOM_SPINAL_NODE_TYPE);

            assert.equal(
                node.getName(),
                CUSTOM_SPINAL_NODE_NAME,
                "By setting the first argument of the construct the name should be setElement."
            );

            assert.equal(
                node.getType(),
                CUSTOM_SPINAL_NODE_TYPE,
                "By setting the second argument of the construct the type should be setElement."
            );
        });

        it('should create a new SpinalNode with specific name, type and element', async function () {
            const node = new lib.SpinalNode(CUSTOM_SPINAL_NODE_NAME, CUSTOM_SPINAL_NODE_TYPE, new lib.SpinalNode());

            assert.equal(
                node.getName(),
                CUSTOM_SPINAL_NODE_NAME,
                "By setting the first argument of the construct the name should be setElement."
            );

            assert.equal(
                node.getType(),
                CUSTOM_SPINAL_NODE_TYPE,
                "By setting the second argument of the construct the type should be setElement.");

            const elt = await node.getElement();
            assert(
                elt instanceof lib.SpinalNode,
                "By setting the third argument of the construct the element should be setElement."
            );
        });
    });

    describe("How to get informations about the node", function () {
        describe("How to use getName", function () {
            it('should return the name CUSTOM_SPINAL_NODE_NAME', function () {
                let node = new lib.SpinalNode(CUSTOM_SPINAL_NODE_NAME);
                assert.equal(
                    node.getName(),
                    CUSTOM_SPINAL_NODE_NAME,
                    "By setting the first argument of the construct the name should be setElement."
                );
            });
        });

        describe("How to use getType", function () {
            it('should return the type CUSTOM_SPINAL_NODE_TYPE', function () {
                let node = new lib.SpinalNode(CUSTOM_SPINAL_NODE_NAME, CUSTOM_SPINAL_NODE_TYPE);
                assert.equal(
                    node.getType(),
                    CUSTOM_SPINAL_NODE_TYPE,
                    "By setting the first argument of the construct the type should be setElement."
                );
            });
        });

        describe("How to getElement the element of a spinal node", function () {
            it('should return the DEFAULT_ELEMENT', async function () {
                let node = new lib.SpinalNode(CUSTOM_SPINAL_NODE_NAME, CUSTOM_SPINAL_NODE_TYPE, DEFAULT_ELEMENT);

                const elt = await node.getElement()
                assert.equal(
                    elt,
                    DEFAULT_ELEMENT,
                    "By setting the second argument of the construct the element should be setElement."
                );
            });
        });

        describe("How to use getNbChildren", function () {
            it("should return 0", function () {
                let node = new lib.SpinalNode();
                let res = node.getNbChildren();

                assert.equal(res, 0);
            });

            it("should return 3", function () {
                let node = new lib.SpinalNode();
                let child1 = new lib.SpinalNode();
                let child2 = new lib.SpinalNode();
                let child3 = new lib.SpinalNode();
                let res;

                node.addChild(child1, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
                node.addChild(child2, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
                node.addChild(child3, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
                res = node.getNbChildren();
                assert.equal(res, 3);
            });

            it("should return 2", async function () {
                let node = new lib.SpinalNode();
                let child1 = new lib.SpinalNode();
                let child2 = new lib.SpinalNode();
                let child3 = new lib.SpinalNode();
                let res;

                await Promise.all([
                    node.addChild(child1, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE),
                    node.addChild(child2, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE),
                    node.addChild(child3, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE)
                ]);
                await node.removeChild(child2, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
                res = node.getNbChildren();
                assert.equal(res, 2);
            });
        });
    });

    describe("How to get information about the node's relations", function () {
        describe("How to use hasRelation", function () {
            it('should return true', async function () {
                let node = new lib.SpinalNode(CUSTOM_SPINAL_NODE_NAME, CUSTOM_SPINAL_NODE_TYPE, DEFAULT_ELEMENT);

                await node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
                assert.equal(node.hasRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE), true);
            });

            it('should return false', async function () {
                let node = new lib.SpinalNode(CUSTOM_SPINAL_NODE_NAME, CUSTOM_SPINAL_NODE_TYPE, DEFAULT_ELEMENT);

                await node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
                assert.equal(node.hasRelation(CUSTOM_RELATION_NAME1, lib.SPINAL_RELATION_TYPE), false);
            });
        });

        describe("How to use hasRelations", function () {
            it("should return true", async function () {
                let node = new lib.SpinalNode(CUSTOM_SPINAL_NODE_TYPE, DEFAULT_ELEMENT);

                await Promise.all([
                    node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE),
                    node.addChild(DEFAULT_NODE, CUSTOM_RELATION_NAME1, lib.SPINAL_RELATION_TYPE)
                ]);
                assert.equal(node.hasRelations([DEFAULT_RELATION_NAME, CUSTOM_RELATION_NAME1], lib.SPINAL_RELATION_TYPE), true);

            });

            it("should return false", async function () {
                let node = new lib.SpinalNode(CUSTOM_SPINAL_NODE_NAME, CUSTOM_SPINAL_NODE_TYPE, DEFAULT_ELEMENT);

                await Promise.all([
                    node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE),
                    node.addChild(DEFAULT_NODE, CUSTOM_RELATION_NAME1, lib.SPINAL_RELATION_TYPE),
                ]);
                assert.equal(node.hasRelations([CUSTOM_RELATION_NAME2, CUSTOM_RELATION_NAME1], lib.SPINAL_RELATION_TYPE), false);
            });
        });
    });

    describe("How to add a child to the node", function () {
        describe("How to use addChild", function () {
            it('should add a child to the node with a relation type SPINAL_RELATION_TYPE', async function () {
                let node = new lib.SpinalNode();

                await node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
                assert.equal(typeof node !== "undefined", true);
                assert.equal(node.hasRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE), true);

                const children = await node.getChildren([DEFAULT_RELATION_NAME]);

                assert.equal(children.length, 1);
                assert.equal(children[0], DEFAULT_NODE);
            });

            it('should add a child to the node with a relation type SPINAL_RELATION_TYPE', async function () {
                let node = new lib.SpinalNode();

                node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_PTR_LST_TYPE);
                assert.equal(typeof node !== "undefined", true);
                assert.equal(node.hasRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_PTR_LST_TYPE), true);

                const children = await node.getChildren([DEFAULT_RELATION_NAME]);

                assert.equal(children.length, 1);
                assert.equal(children[0], DEFAULT_NODE);
            });

            it('should add a child to the node with a relation type SPINAL_RELATION_LST_PTR_TYPE', async function () {
                let node = new lib.SpinalNode();

                await node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_LST_PTR_TYPE);
                assert.equal(typeof node !== "undefined", true);
                assert.equal(node.hasRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_LST_PTR_TYPE), true);

                const children = await node.getChildren([DEFAULT_RELATION_NAME]);

                assert.equal(children.length, 1);
                assert.equal(children[0], DEFAULT_NODE);
            });

            it("should throw an error if you try to add the same node twice", async function () {
                let node = new lib.SpinalNode(DEFAULT_RELATION_NAME);
                let error;

                await node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
                await node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE).catch(() => {
                    error = true;
                });
                assert(error);
            });

            it("should throw an error when you pass it something that is not a model", async function () {
                let node = new lib.SpinalNode(DEFAULT_RELATION_NAME);
                let error = false;

                await node.addChild(new Array(), DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE).catch(() => {
                    error = true;
                });
                assert(error);
            });

            it("should return the node added to the relation", async function () {
                let node = new lib.SpinalNode(DEFAULT_RELATION_NAME);
                let childNode = new lib.SpinalNode();
                let childModel = new globalType.Model();

                const res1 = await node.addChild(childNode, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);

                assert.equal(res1, childNode);

                const res2 = await node.addChild(childModel, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
                const res2Elem = await res2.getElement();

                assert.equal(res2Elem, childModel);
            });
        });

        describe("How to use addChildInContext", function () {
            it("Should add a child to a node", async function () {
                let node = new lib.SpinalNode();
                let context = new lib.SpinalContext();

                await node.addChildInContext(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE, context);
                assert.equal(typeof node !== "undefined", true);
                assert.equal(node.hasRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE), true);

                const children = await node.getChildren([DEFAULT_RELATION_NAME]);

                assert.equal(children.length, 1);
                assert.equal(children[0], DEFAULT_NODE);
            });

            it("Shoud add a child and update the relation names and ids known by the context", async function () {
                let node = new lib.SpinalNode();
                let context = new lib.SpinalContext();

                await node.addChildInContext(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE, context);

                assert.equal(context.relationNames.length, 1);
                assert.equal(context.relationNames[0], DEFAULT_RELATION_NAME);

                assert.equal(context.relationIds.length, 1);
            });

            it("should throw an error if you try to add the same node twice", async function () {
                let node = new lib.SpinalNode(DEFAULT_RELATION_NAME);
                let context = new lib.SpinalContext();
                let error = false;

                await node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE, context);
                await node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE, context).catch(() => {
                    error = true;
                });
                assert(error);
            });

            it("should throw an error when you pass it something that is not a model", async function () {
                let node = new lib.SpinalNode(DEFAULT_RELATION_NAME);
                let context = new lib.SpinalContext();
                let error = false;

                await node.addChild(new Array(), DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE, context).catch(() => {
                    error = true;
                });
                assert(error);
            });

            it("should return the node added to the relation", async function () {
                let node = new lib.SpinalNode(DEFAULT_RELATION_NAME);
                let context = new lib.SpinalContext();
                let childNode = new lib.SpinalNode();
                let childModel = new globalType.Model();

                const res1 = await node.addChild(childNode, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE, context);

                assert.equal(res1, childNode);

                const res2 = await node.addChild(childModel, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE, context);
                const res2Elem = await res2.getElement();

                assert.equal(res2Elem, childModel);
            });
        });
    });

    describe("How to remove a node", function () {
        describe("How to use removeChild", function () {
            it('should return true', async function () {
                let node = new lib.SpinalNode(CUSTOM_SPINAL_NODE_NAME, CUSTOM_SPINAL_NODE_TYPE, DEFAULT_ELEMENT);

                await node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
                await node.removeChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);

                const children = await node.getChildren([]);
                assert.deepEqual(children, []);
            });
        });

        describe("How to use removeFromGraph", function () {
            it('should remove the node from its parents', async function () {
                let node = new lib.SpinalNode();
                let parentNode = new lib.SpinalNode();

                await parentNode.addChild(node, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);

                await node.removeFromGraph()

                const children = await parentNode.getChildren([]);
                assert.deepEqual(children, []);
            });

            it('should remove the node from its children', async function () {
                let node = new lib.SpinalNode();
                let parentNode = new lib.SpinalNode();

                await parentNode.addChild(node, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);

                await parentNode.removeFromGraph();

                const parents = await parentNode.getParents([]);
                assert.deepEqual(parents, []);
            });
        });
    });

    describe("How to get related nodes", function () {
        describe("How to use getChildren", function () {
            it("should return no children", async function () {
                let node = new lib.SpinalNode();
                const children = await node.getChildren([]);

                assert.deepEqual(children, []);
            });

            it("should return some children", async function () {
                let node = new lib.SpinalNode();

                await Promise.all([
                    node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE),
                    node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME + "2", lib.SPINAL_RELATION_TYPE)
                ]);

                const children = await node.getChildren([DEFAULT_RELATION_NAME]);
                assert.deepEqual(children, [DEFAULT_NODE]);
            });

            it("should return all children", async function () {
                let node = new lib.SpinalNode();

                await Promise.all([
                    node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE),
                    node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME + "2", lib.SPINAL_RELATION_TYPE)
                ]);

                const children = await node.getChildren([]);
                assert.deepEqual(children, [DEFAULT_NODE, DEFAULT_NODE]);
            });

            it("should return all children also", async function () {
                let node = new lib.SpinalNode();

                await Promise.all([
                    node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE),
                    node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME + "2", lib.SPINAL_RELATION_TYPE),
                ]);

                const children = await node.getChildren();
                assert.deepEqual(children, [DEFAULT_NODE, DEFAULT_NODE]);
            });

            it("should return children for one relation name passed has string", async function () {
                let node = new lib.SpinalNode();

                await Promise.all([
                    node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE),
                    node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME + "2", lib.SPINAL_RELATION_TYPE)
                ]);

                const children = await node.getChildren(DEFAULT_RELATION_NAME);
                assert.deepEqual(children, [DEFAULT_NODE]);
            });
        });

        describe("How to use getParents", function () {
            it("should return no parents", async function () {
                let node = new lib.SpinalNode();
                const parents = await node.getParents([]);

                assert.deepEqual(parents, []);
            });

            it("should return some parents", async function () {
                let parentNode1 = new lib.SpinalNode();
                let parentNode2 = new lib.SpinalNode();
                let childNode = new lib.SpinalNode();

                await Promise.all([
                    parentNode1.addChild(childNode, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE),
                    parentNode2.addChild(childNode, DEFAULT_RELATION_NAME + "2", lib.SPINAL_RELATION_TYPE)
                ]);

                const parents = await childNode.getParents([DEFAULT_RELATION_NAME]);
                assert.deepEqual(parents, [parentNode1]);
            });

            it("should return all parents", async function () {
                let parentNode1 = new lib.SpinalNode();
                let parentNode2 = new lib.SpinalNode();
                let childNode = new lib.SpinalNode();

                await Promise.all([
                    parentNode1.addChild(childNode, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE),
                    parentNode2.addChild(childNode, DEFAULT_RELATION_NAME + "2", lib.SPINAL_RELATION_TYPE)
                ]);

                const parents = await childNode.getParents([]);
                assert.deepEqual(parents, [parentNode1, parentNode2]);
            });

            it("should return all parents with a certain relation name", async function () {
                let parentNode1 = new lib.SpinalNode();
                let parentNode2 = new lib.SpinalNode();
                let childNode = new lib.SpinalNode();

                await Promise.all([
                    parentNode1.addChild(childNode, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE),
                    parentNode2.addChild(childNode, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE)
                ]);

                const parents = await childNode.getParents([]);
                assert.deepEqual(parents, [parentNode1, parentNode2]);
            });
        });
    });
});
