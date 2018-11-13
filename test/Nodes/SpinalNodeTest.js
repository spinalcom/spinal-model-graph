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

describe("Sanity check", function () {
    it('should return true', function () {
        assert.equal(0, 0);
    });
});

describe("SpinalNode", function () {
    describe("How to use the constructor", function () {
        it('should create a new spinal node.', function (done) {
            const node = new lib.SpinalNode();

            assert.equal(
                node.getName(),
                DEFAULT_SPINAL_NODE_NAME,
                "The default name of a SpinalNode is 'undefined'."
            );

            assert.equal(
                node.getType(),
                DEFAULT_SPINAL_NODE_TYPE,
                "The default type of a SpinalNode is 'SpinalNode'."
            );

            node.getElement().then(
                elt => {
                    assert.equal(
                        elt instanceof Model,
                        true,
                        "The default element of a SpinalNode is a Model."
                    );
                    done();
                }
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

        it('should create a new SpinalNode with specific name, type and element', function (done) {
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

            node.getElement().then(
                elt => {
                    assert(
                        elt instanceof lib.SpinalNode,
                        "By setting the third argument of the construct the element should be setElement."
                    );
                    done();
                }
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
            it('should return the DEFAULT_ELEMENT', function (done) {
                let node = new lib.SpinalNode(CUSTOM_SPINAL_NODE_TYPE, CUSTOM_SPINAL_NODE_TYPE, DEFAULT_ELEMENT);
                node.getElement().then(elt => {
                    assert.equal(
                        elt,
                        DEFAULT_ELEMENT,
                        "By setting the second argument of the construct the element should be setElement."
                    );
                    done();
                })
            });
        });
    });

    describe("How to get information about the node's relations", function () {
        describe("How to use hasRelation", function () {
            it('should return true', function () {
                //Create a new node
                let node = new lib.SpinalNode(CUSTOM_SPINAL_NODE_NAME, CUSTOM_SPINAL_NODE_TYPE, DEFAULT_ELEMENT);
                //Add a child to the node with the default relation name
                node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
                //Ask the node if it has a relation name $DEFAULT_RELATION_NAME
                assert.equal(node.hasRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE), true);
            });

            it('should return false', function () {
                //Create a new node
                let node = new lib.SpinalNode(CUSTOM_SPINAL_NODE_NAME, CUSTOM_SPINAL_NODE_TYPE, DEFAULT_ELEMENT);
                //Add a child to the node with the default relation name
                node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
                //Ask the node if it has a relation name $CUSTOM_RELATION_NAME1
                assert.equal(node.hasRelation(CUSTOM_RELATION_NAME1, lib.SPINAL_RELATION_TYPE), false);
            });
        });

        describe("How to use hasRelations", function () {
            it("should return true", function () {
                //Create a new node
                let node = new lib.SpinalNode(CUSTOM_SPINAL_NODE_TYPE, DEFAULT_ELEMENT);
                //Add a child to the node with the default relation name
                node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
                //Add a child to the node with the custom relation name
                node.addChild(DEFAULT_NODE, CUSTOM_RELATION_NAME1, lib.SPINAL_RELATION_TYPE);
                //Ask the node if it has a relation name $DEFAULT_RELATION and CUSTOM_RELATION_NAME!
                assert.equal(node.hasRelations([DEFAULT_RELATION_NAME, CUSTOM_RELATION_NAME1], lib.SPINAL_RELATION_TYPE), true);

            });

            it("should return false", function () {
                //Create a new node
                let node = new lib.SpinalNode(CUSTOM_SPINAL_NODE_NAME, CUSTOM_SPINAL_NODE_TYPE, DEFAULT_ELEMENT);
                //Add a child to the node with the default relation name
                node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
                //Add a child to the node with the custom relation name
                node.addChild(DEFAULT_NODE, CUSTOM_RELATION_NAME1, lib.SPINAL_RELATION_TYPE);
                //Has relations should return false because one of the relation name is not a relation of the node
                assert.equal(node.hasRelations([CUSTOM_RELATION_NAME2, CUSTOM_RELATION_NAME1], lib.SPINAL_RELATION_TYPE), false);
            });
        });
    });

    describe("How to add a child to the node", function () {
        describe("How to use addChild", function () {
            it('should add a child to the node with a relation type SPINAL_RELATION_TYPE', function (done) {
                let node = new lib.SpinalNode();
                node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
                assert.equal(typeof node !== "undefined", true);
                assert.equal(node.hasRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE), true);

                //check if the node contain the children
                const childrenPromise = node.getChildren([DEFAULT_RELATION_NAME]);

                childrenPromise.then(children => {
                    assert.equal(children.length, 1);
                    assert.equal(children[0], DEFAULT_NODE);
                    done();
                });
            });

            it('should add a child to the node with a relation type SPINAL_RELATION_TYPE', function (done) {
                let node = new lib.SpinalNode();
                node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_PTR_LST_TYPE);
                assert.equal(typeof node !== "undefined", true);
                assert.equal(node.hasRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_PTR_LST_TYPE), true);

                //check if the node contain the children
                const childrenPromise = node.getChildren([DEFAULT_RELATION_NAME]);

                childrenPromise.then(children => {
                    assert.equal(children.length, 1);
                    assert.equal(children[0], DEFAULT_NODE);

                    done();
                });
            });

            it('should add a child to the node with a relation type SPINAL_RELATION_LST_PTR_TYPE', function (done) {
                let node = new lib.SpinalNode();
                node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_LST_PTR_TYPE);
                assert.equal(typeof node !== "undefined", true);
                assert.equal(node.hasRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_LST_PTR_TYPE), true);

                //check if the node contain the children
                const childrenPromise = node.getChildren([DEFAULT_RELATION_NAME]);

                childrenPromise.then(children => {
                    assert.equal(children.length, 1);
                    assert.equal(children[0], DEFAULT_NODE);

                    done();
                });
            });

            it("should throw an error if you try to add the same node twice", function () {
                let node = new lib.SpinalNode();
                let error = false;

                node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
                try {
                    node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
                } catch (e) {
                    error = true;
                }
                assert(error);
            });

            it("should throw an error when you pass it something that is not a model", function () {
                let node = new lib.SpinalNode();
                let error = false;

                try {
                    node.addChild(new Array(), DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
                } catch (e) {
                    error = true;
                }
                assert(error);
            });
        });

        describe("How to use addChildInContext", function () {
            it("Should add a child to a node", function (done) {
                let node = new lib.SpinalNode();
                let context = new lib.SpinalContext();

                node.addChildInContext(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE, context);
                assert.equal(typeof node !== "undefined", true);
                assert.equal(node.hasRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE), true);

                const childrenPromise = node.getChildren([DEFAULT_RELATION_NAME]);

                childrenPromise.then(children => {
                    assert.equal(children.length, 1);
                    assert.equal(children[0], DEFAULT_NODE);

                    done();
                });
            });

            it("Shoud add a child and update the relation names and ids known by the context", function () {
                let node = new lib.SpinalNode();
                let context = new lib.SpinalContext();

                node.addChildInContext(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE, context);

                assert.equal(context.relationNames.length, 1);
                assert.equal(context.relationNames[0], DEFAULT_RELATION_NAME);

                assert.equal(context.relationIds.length, 1);
            });

            it("Shoud add a child and update the ids known by the context", function () {
                let node = new lib.SpinalNode();
                let node2 = new lib.SpinalNode();
                let context = new lib.SpinalContext();

                node.addChildInContext(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE, context);
                node2.addChildInContext(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE, context);

                assert.equal(context.relationNames.length, 1);
                assert.equal(context.relationNames[0], DEFAULT_RELATION_NAME);

                assert.equal(context.relationIds.length, 2);
            });

            it("should throw an error if you try to add the same node twice", function () {
                let node = new lib.SpinalNode();
                let context = new lib.SpinalContext();
                let error = false;

                node.addChildInContext(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE, context);
                try {
                    node.addChildInContext(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE, context);
                } catch (e) {
                    error = true;
                }
                assert(error);
            });

            it("should throw an error when you pass it something that is not a model", function () {
                let node = new lib.SpinalNode();
                let context = new lib.SpinalContext();
                let error = false;

                try {
                    node.addChildInContext(new Array(), DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE, context);
                } catch (e) {
                    error = true;
                }
                assert(error);
            });
        });
    });

    describe("How to remove a node", function () {
        describe("How to use removeChild", function () {
            it('should return true', function (done) {
                let node = new lib.SpinalNode(CUSTOM_SPINAL_NODE_NAME, CUSTOM_SPINAL_NODE_TYPE, DEFAULT_ELEMENT);

                node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
                node.removeChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE).then(() => {
                    node.getChildren([]).then(children => {
                        assert.deepEqual(children, []);
                        done();
                    });
                });
            });
        });

        describe("How to use removeFromGraph", function () {
            it('should remove the node from its parents', function (done) {
                let node = new lib.SpinalNode();
                let parentNode = new lib.SpinalNode();

                parentNode.addChild(node, DEFAULT_NODE, lib.SPINAL_RELATION_TYPE);

                node.removeFromGraph().then(() => {
                    parentNode.getChildren([]).then(children => {
                        assert.deepEqual(children, []);
                        done();
                    });
                });
            });
        });
    });

    describe("How to get related nodes", function () {
        describe("How to use getChildren", function () {
            it("should return no children", function (done) {
                let node = new lib.SpinalNode();

                node.getChildren([]).then(children => {
                    assert.deepEqual(children, []);
                    done();
                });
            });

            it("should return some children", function (done) {
                let node = new lib.SpinalNode();

                node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
                node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME + "2", lib.SPINAL_RELATION_TYPE);

                node.getChildren([DEFAULT_RELATION_NAME]).then(children => {
                    assert.deepEqual(children, [DEFAULT_NODE]);
                    done();
                });
            });

            it("should return all children", function (done) {
                let node = new lib.SpinalNode();

                node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
                node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME + "2", lib.SPINAL_RELATION_TYPE);

                node.getChildren([]).then(children => {
                    assert.deepEqual(children, [DEFAULT_NODE, DEFAULT_NODE]);
                    done();
                });
            });
        });

        describe("How to use getParents", function () {
            it("should return no parents", function (done) {
                let node = new lib.SpinalNode();

                node.getParents([]).then(parents => {
                    assert.deepEqual(parents, []);
                    done();
                });
            });

            it("should return some parents", function (done) {
                let parentNode1 = new lib.SpinalNode();
                let parentNode2 = new lib.SpinalNode();
                let childNode = new lib.SpinalNode();

                parentNode1.addChild(childNode, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
                parentNode2.addChild(childNode, DEFAULT_RELATION_NAME + "2", lib.SPINAL_RELATION_TYPE);

                childNode.getParents([DEFAULT_RELATION_NAME]).then(parents => {
                    assert.deepEqual(parents, [parentNode1]);
                    done();
                });
            });

            it("should return all parents", function (done) {
                let parentNode1 = new lib.SpinalNode();
                let parentNode2 = new lib.SpinalNode();
                let childNode = new lib.SpinalNode();

                parentNode1.addChild(childNode, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
                parentNode2.addChild(childNode, DEFAULT_RELATION_NAME + "2", lib.SPINAL_RELATION_TYPE);

                childNode.getParents([]).then(parents => {
                    assert.deepEqual(parents, [parentNode1, parentNode2]);
                    done();
                });
            });

            it("should return all parents with a certain relation name", function (done) {
                let parentNode1 = new lib.SpinalNode();
                let parentNode2 = new lib.SpinalNode();
                let childNode = new lib.SpinalNode();

                parentNode1.addChild(childNode, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
                parentNode2.addChild(childNode, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);

                childNode.getParents([]).then(parents => {

                    assert.deepEqual(parents, [parentNode1, parentNode2]);
                    done();
                });
            });
        });
    });
});
