const lib = require("../../build/index");
const BaseSpinalRelation = require("../../build/Relations/BaseSpinalRelation").default;
const SpinalRelationPtrLst = require("../../build/Relations/SpinalRelationPtrLst").default;

const assert = require("assert");

const DEFAULT_RELATION_NAME = "relationName"
const DEFAULT_NODE = new lib.SpinalNode();

describe("BaseSpinalRelation", function () {
  describe("How to use the constructor", function () {
    it("should create a new relation with a name", function () {
      let rel = new BaseSpinalRelation(DEFAULT_RELATION_NAME);

      assert.equal(rel.getName(), DEFAULT_RELATION_NAME);
    });
  });

  describe("How to get informations about the relation", function () {
    describe("How to use getName", function () {
      it('should return the name DEFAULT_RELATION_NAME', function () {
        let rel = new BaseSpinalRelation(DEFAULT_RELATION_NAME);
        assert.equal(
          rel.getName(),
          DEFAULT_RELATION_NAME
        );
      });
    });

    describe("How to use getParent", function () {
      it('should return the node DEFAULT_NODE', function (done) {
        let rel = new BaseSpinalRelation(DEFAULT_RELATION_NAME);

        rel.setParent(DEFAULT_NODE);
        rel.getParent().then(parent => {
          assert.equal(parent, DEFAULT_NODE);
          done();
        });
      });
    });
  });

  describe("How to set a parent", function () {
    describe("How to use setParent", function () {
      it("should set the parent to DEFAULT_NODE", function (done) {
        let rel = new BaseSpinalRelation(DEFAULT_RELATION_NAME);

        rel.setParent(DEFAULT_NODE);
        rel.getParent().then(parent => {
          assert.equal(parent, DEFAULT_NODE);
          done();
        });
      });
    });
  });

  describe("How to remove from the graph", function () {
    describe("How to use removeChildren", function () {
      it("should delete all of the children", function (done) {
        let rel = new SpinalRelationPtrLst(DEFAULT_RELATION_NAME);
        const node1 = new lib.SpinalNode();
        const node2 = new lib.SpinalNode();
        const node3 = new lib.SpinalNode();

        rel.addChild(node1);
        rel.addChild(node2);
        rel.addChild(node3);
        rel.removeChildren().then(() => {
          rel.getChildren().then(children => {
            assert.deepEqual(children, []);
            done();
          });
        });
      });
    });

    describe("How to use removeFromGraph", function () {
      it("should delete all of the children", function (done) {
        let rel = new SpinalRelationPtrLst(DEFAULT_RELATION_NAME);
        const node1 = new lib.SpinalNode();
        const node2 = new lib.SpinalNode();
        const node3 = new lib.SpinalNode();

        rel.addChild(node1);
        rel.addChild(node2);
        rel.addChild(node3);
        rel.removeChildren().then(() => {
          rel.getChildren().then(children => {
            assert.deepEqual(children, []);
            done();
          });
        });
      });

      it("should the relation from the parent pointer", function (done) {
        let parent = new lib.SpinalNode();
        let rel = parent._createRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_LST_PTR_TYPE);

        rel.removeFromGraph().then(() => {
          assert(!parent.hasRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_LST_PTR_TYPE));
          done();
        });
      });
    });
  });
});
