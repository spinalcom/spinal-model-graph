const lib = require("../../build/index");
const SpinalRelationLstPtr = require("../../build/Relations/SpinalRelationLstPtr").default;

const assert = require("assert");

const DEFAULT_RELATION_NAME = "relationName"
const DEFAULT_NODE = new lib.SpinalNode();

describe("SpinalRelationLstPtr", function () {
  describe("How to use the constructor", function () {
    it("should create a new relation with a name", function () {
      let rel = new SpinalRelationLstPtr(DEFAULT_RELATION_NAME);

      assert.equal(rel.getName(), DEFAULT_RELATION_NAME);
    });
  });

  describe("How to get informations about the relation", function () {
    describe("How to use getChildrenIds", function () {
      it("should return the ids of all children", function () {
        let rel = new SpinalRelationLstPtr(DEFAULT_RELATION_NAME);

        rel.addChild(DEFAULT_NODE);
        assert.deepEqual(rel.getChildrenIds(), [DEFAULT_NODE.getId().get()]);
      });
    });

    describe("How to use getChildren", function () {
      it("should return the relation's child", function (done) {
        let rel = new SpinalRelationLstPtr(DEFAULT_RELATION_NAME);

        rel.addChild(DEFAULT_NODE);
        rel.getChildren().then(children => {
          assert.deepEqual(children, [DEFAULT_NODE]);
          done();
        });
      });

      it("should return the relation's children", function (done) {
        let rel = new SpinalRelationLstPtr(DEFAULT_RELATION_NAME);
        const node1 = new lib.SpinalNode();
        const node2 = new lib.SpinalNode();
        const node3 = new lib.SpinalNode();

        rel.addChild(node1);
        rel.addChild(node2);
        rel.addChild(node3);
        rel.getChildren().then(children => {
          assert.deepEqual(children, [node1, node2, node3]);
          done();
        });
      });

      it("should return an empty array", function (done) {
        let rel = new SpinalRelationLstPtr(DEFAULT_RELATION_NAME);

        rel.getChildren().then(children => {
          assert.deepEqual(children, []);
          done();
        });
      });
    });

    describe("How to use getType", function () {
      it("should return the relation's type", function () {
        let rel = new SpinalRelationLstPtr(DEFAULT_RELATION_NAME);

        assert.equal(rel.getType(), lib.SPINAL_RELATION_LST_PTR_TYPE);
      });
    });
  });

  describe("How to add children", function () {
    describe("How to use addChild", function () {
      it("should add a child to the children of the relation", function (done) {
        let rel = new SpinalRelationLstPtr(DEFAULT_RELATION_NAME);

        rel.addChild(DEFAULT_NODE);
        rel.getChildren().then(children => {
          assert.deepEqual(children, [DEFAULT_NODE]);
          done();
        });
      });

      it("should throw an error if you try to add the same node twice", function () {
        let rel = new SpinalRelationLstPtr(DEFAULT_RELATION_NAME);
        let error = false;

        rel.addChild(DEFAULT_NODE);
        try {
          rel.addChild(DEFAULT_NODE);
        } catch (e) {
          error = true;
        }
        assert(error);
      });

      it("should throw an error when you pass it something that is not a model", function () {
        let rel = new SpinalRelationLstPtr(DEFAULT_RELATION_NAME);
        let error = false;

        try {
          rel.addChild(new Array());
        } catch (e) {
          error = true;
        }
        assert(error);
      });
    });
  });

  describe("How to remove children", function () {
    describe("How to use removeChild", function () {
      it("should remove a child from the children of the relation", function (done) {
        let rel = new SpinalRelationLstPtr(DEFAULT_RELATION_NAME);

        rel.addChild(DEFAULT_NODE);
        rel.removeChild(DEFAULT_NODE).then(() => {
          rel.getChildren().then(children => {
            assert.deepEqual(children, []);
            done();
          });
        });
      });

      it("should remove a child and update the children ids of the relation", function (done) {
        let rel = new SpinalRelationLstPtr(DEFAULT_RELATION_NAME);

        rel.addChild(DEFAULT_NODE);
        rel.removeChild(DEFAULT_NODE).then(() => {
          let ids = rel.getChildrenIds();
          assert.deepEqual(ids, []);
          done();
        });
      });

      it("should remove a child and update the children ids of the relation", function (done) {
        let parentNode = new lib.SpinalNode();
        let rel = parentNode._createRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_LST_PTR_TYPE);
        let childNode = new lib.SpinalNode();

        rel.addChild(childNode);
        rel.removeChild(childNode).then(() => {
          childNode.getParents().then(parents => {
            assert.deepEqual(parents, []);
            done();
          });
        });
      });
    });
  });
});
