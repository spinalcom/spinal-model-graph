const lib = require("../build/index");
const globalType = require("spinal-core-connectorjs_type");
const SpinalNodePointer = require("../build/SpinalNodePointer").default;

const assert = require("assert");

const DEFAULT_NODE = new lib.SpinalNode();
const DEFAULT_MODEL = new globalType.Model();

describe("SpinalNodePointer", function() {
  describe("How to create a SpinalNodePointer", function() {
    it("should create a SpinalNodePointer with correct default values if a Model is given", function() {
      const ptr = new SpinalNodePointer(new globalType.Model());

      assert.strictEqual(typeof ptr.getId(), "undefined");
      assert.strictEqual(typeof ptr.getType(), "undefined");
    });

    it("should create a SpinalNodePointer with correct default values if a node is given", function() {
      const ptr = new SpinalNodePointer(DEFAULT_NODE);

      assert.strictEqual(ptr.getId(), DEFAULT_NODE.getId());
      assert.strictEqual(ptr.getType(), DEFAULT_NODE.getType());
    });

    it("should throw an error if no element is given", function() {
      let error = false;

      try {
        new SpinalNodePointer();
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);
    });
  });

  describe("How to set/unset the pointer", function() {
    describe("How to use setElement", function() {
      it("should set an element and update pointedId and pointedType", async function() {
        let ptr = new SpinalNodePointer(DEFAULT_NODE);

        assert.strictEqual(ptr.getId(), DEFAULT_NODE.getId());
        assert.strictEqual(ptr.getType(), DEFAULT_NODE.getType());

        const elem = await ptr.load();
        assert.strictEqual(elem, DEFAULT_NODE);
      });

      it("should set an element but not update pointedId and pointedType", async function() {
        let ptr = new SpinalNodePointer(DEFAULT_MODEL);

        assert.strictEqual(typeof ptr.getId(), "undefined");
        assert.strictEqual(typeof ptr.getType(), "undefined");

        const elem = await ptr.load();
        assert.strictEqual(elem, DEFAULT_MODEL);
      });
    });

    describe("How to use load", function() {
      it("should load the node to which the pointer is pointing", async function() {
        let ptr = new SpinalNodePointer(DEFAULT_NODE);

        const elem = await ptr.load();
        assert.strictEqual(elem, DEFAULT_NODE);
      });
    });

    describe("How to use unset", function() {
      it("should unset the pointer", function() {
        let ptr = new SpinalNodePointer(DEFAULT_NODE);

        assert.strictEqual(ptr.getId(), DEFAULT_NODE.getId());
        assert.strictEqual(ptr.getType(), DEFAULT_NODE.getType());
        ptr.unset();
        assert.strictEqual(typeof ptr.getId(), "undefined");
        assert.strictEqual(typeof ptr.getType(), "undefined");
        assert.deepStrictEqual(ptr.ptr.data, {
          value: 0
        });
      });
    });
  });

  describe("How to get information about the SpinalNodePointer", function() {
    describe("How to use getId", function() {
      it("should return the id of the pointed node", function() {
        let ptr = new SpinalNodePointer(DEFAULT_NODE);

        assert.strictEqual(ptr.getId(), DEFAULT_NODE.getId());
      });
    });

    describe("How to use getType", function() {
      it("should return the type of the pointed node", function() {
        let ptr = new SpinalNodePointer(DEFAULT_NODE);

        assert.strictEqual(ptr.getType(), DEFAULT_NODE.getType());
      });
    });
  });
});
