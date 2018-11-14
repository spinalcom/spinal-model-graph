const lib = require("../build/index");
const globalType = typeof window === "undefined" ? global : window;
const SpinalNodePointer = require("../build/SpinalNodePointer").default;
const promiseLoad = require("../build/Utilities").promiseLoad;

const assert = require("assert");

const DEFAULT_NODE = new lib.SpinalNode();
const DEFAULT_MODEL = new globalType.Model();

describe("SpinalNodePointer", function () {
    describe("How to create a SpinalNodePointer", function () {
        it("should create a SpinalNodePointer with correct default values if no node is given", function () {
            let ptr = new SpinalNodePointer();

            assert.equal(typeof ptr.getId(), "undefined");
            assert.equal(typeof ptr.getType(), "undefined");
        });

        it("should create a SpinalNodePointer with correct default values if a node is given", function () {
            let ptr = new SpinalNodePointer(DEFAULT_NODE);

            assert.equal(ptr.getId(), DEFAULT_NODE.getId());
            assert.equal(ptr.getType(), DEFAULT_NODE.getType());
        });
    });

    describe("How to set/unset the pointer", function () {
        describe("How to use setElement", function () {
            it("should set an element and update pointedId and pointedType", function (done) {
                let ptr = new SpinalNodePointer(DEFAULT_NODE);

                assert.equal(ptr.getId(), DEFAULT_NODE.getId());
                assert.equal(ptr.getType(), DEFAULT_NODE.getType());
                promiseLoad(ptr).then(elem => {
                    assert.equal(elem, DEFAULT_NODE);
                    done();
                });
            });

            it("should set an element but not update pointedId and pointedType", function (done) {
                let ptr = new SpinalNodePointer(DEFAULT_MODEL);

                assert.equal(typeof ptr.getId(), "undefined");
                assert.equal(typeof ptr.getType(), "undefined");
                promiseLoad(ptr).then(elem => {
                    assert.equal(elem, DEFAULT_MODEL);
                    done();
                });
            });
        });

        describe("How to use unset", function () {
            it("should unset the pointer", function () {
                let ptr = new SpinalNodePointer(DEFAULT_NODE);

                assert.equal(ptr.getId(), DEFAULT_NODE.getId());
                assert.equal(ptr.getType(), DEFAULT_NODE.getType());
                ptr.unset();
                assert.equal(typeof ptr.getId(), "undefined");
                assert.equal(typeof ptr.getType(), "undefined");
                assert.deepEqual(ptr.ptr.data, { value: 0 });
            });
        });
    });

    describe("How to get information about the SpinalNodePointer", function () {
        describe("How to use getId", function () {
            it("should return the id of the pointed node", function () {
                let ptr = new SpinalNodePointer(DEFAULT_NODE);

                assert.equal(ptr.getId(), DEFAULT_NODE.getId());
            });
        });

        describe("How to use getType", function () {
            it("should return the type of the pointed node", function () {
                let ptr = new SpinalNodePointer(DEFAULT_NODE);

                assert.equal(ptr.getType(), DEFAULT_NODE.getType());
            });
        });
    });
});
