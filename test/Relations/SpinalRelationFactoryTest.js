const lib = require("../../build/index");
const {
  SpinalRelationFactory
} = require("../../build/Relations/SpinalRelationFactory");

const assert = require("assert");

const DEFAULT_NODE = new lib.SpinalNode();
const DEFAULT_RELATION_NAME = "duh";

describe("SpinalRelationFactory", function() {
  describe("How to use getNewRelation", function() {
    it("should return a SpinalRelationRef", function() {
      const rel = SpinalRelationFactory.getNewRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);

      assert(rel instanceof lib.SpinalRelationRef);
    });

    it("should return a SpinalRelationLstPtr", function() {
      const rel = SpinalRelationFactory.getNewRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_LST_PTR_TYPE);

      assert(rel instanceof lib.SpinalRelationLstPtr);
    });

    it("should return a SpinalRelationPtrLst", function() {
      const rel = SpinalRelationFactory.getNewRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_PTR_LST_TYPE);

      assert(rel instanceof lib.SpinalRelationPtrLst);
    });

    it("should throw an error if the type is invalid", function() {
      assert.throws(() => {
        SpinalRelationFactory.getNewRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME, -1);
      }, Error);
    });
  });
});
