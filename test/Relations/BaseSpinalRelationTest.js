const lib = require("../../build/index");
const BaseSpinalRelation = require("../../build/Relations/BaseSpinalRelation").default;
const SpinalRelationLstPtr = require("../../build/Relations/SpinalRelationLstPtr").default;

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

  describe("How to get/set information about the relation", function () {
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
      it('should return the node DEFAULT_NODE', async function () {
        let rel = new BaseSpinalRelation(DEFAULT_RELATION_NAME);

        rel.setParent(DEFAULT_NODE);

        const parent = await rel.getParent();
        assert.equal(parent, DEFAULT_NODE);
      });
    });

    describe("How to use setParent", function () {
      it("should set the parent to DEFAULT_NODE", async function () {
        let rel = new BaseSpinalRelation(DEFAULT_RELATION_NAME);

        rel.setParent(DEFAULT_NODE);

        const parent = await rel.getParent();
        assert.equal(parent, DEFAULT_NODE);
      });
    });

    describe("How to use addContextIds and getContextIds", function () {
      it("should get the ids of the associated contexts", function () {
        let relation = new BaseSpinalRelation();
        let contextId1 = new lib.SpinalContext().getId().get();
        let contextId2 = new lib.SpinalContext().getId().get();

        relation.addContextId(contextId1);

        assert.deepStrictEqual(relation.getContextIds(), [contextId1]);

        relation.addContextId(contextId1);
        relation.addContextId(contextId2);

        assert.deepStrictEqual(relation.getContextIds(), [contextId1, contextId2]);
      });
    });
  });

  describe("How to remove from the graph", function () {
    describe("How to use removeChildren", function () {
      it("should delete all of the children", async function () {
        let rel = new SpinalRelationLstPtr(DEFAULT_RELATION_NAME);
        const node1 = new lib.SpinalNode();
        const node2 = new lib.SpinalNode();
        const node3 = new lib.SpinalNode();

        await Promise.all([
          rel.addChild(node1),
          rel.addChild(node2),
          rel.addChild(node3)
        ]);

        await rel.removeChildren();
        const children = await rel.getChildren();
        assert.deepStrictEqual(children, []);
      });
    });

    describe("How to use removeFromGraph", function () {
      it("should delete all of the children", async function () {
        let rel = new SpinalRelationLstPtr(DEFAULT_RELATION_NAME);
        const node1 = new lib.SpinalNode();
        const node2 = new lib.SpinalNode();
        const node3 = new lib.SpinalNode();

        await Promise.all([
          rel.addChild(node1),
          rel.addChild(node2),
          rel.addChild(node3)
        ]);

        await rel.removeChildren();

        const children = await rel.getChildren();
        assert.deepStrictEqual(children, []);
      });

      it("should the relation from the parent pointer", async function () {
        let parent = new lib.SpinalNode();
        let rel = parent._createRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_LST_PTR_TYPE);

        await rel.removeFromGraph();
        assert(!parent.hasRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_LST_PTR_TYPE));
      });
    });
  });
});
