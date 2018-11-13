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
        let rel = new SpinalRelationPtrLst();
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
      it("should delete the relation's children", function (done) {
        let rel = new SpinalRelationPtrLst();
        const parent = new lib.SpinalNode();
        const child1 = new lib.SpinalNode();
        const child2 = new lib.SpinalNode();
        const child3 = new lib.SpinalNode();

        rel.setParent(parent);
        rel.addChild(child1);
        rel.addChild(child2);
        rel.addChild(child3);

        rel.removeFromGraph().then(() => {
          rel.getChildren().then(children => {
            assert.deepEqual(children, []);
            done();
          });
        });
      });
    });
  });
});
