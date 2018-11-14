const lib = require("../../build/index");
const globalType = typeof window === "undefined" ? global : window;
const SpinalRelationPtrLst = require("../../build/Relations/SpinalRelationPtrLst").default;

const assert = require("assert");

const DEFAULT_RELATION_NAME = "relationName"
const DEFAULT_NODE = new lib.SpinalNode();

describe("SpinalRelationPtrLst", function () {
  describe("How to use the constructor", function () {
    it("should create a new relation with a name", function () {
      let rel = new SpinalRelationPtrLst(DEFAULT_RELATION_NAME);

      assert.equal(rel.getName(), DEFAULT_RELATION_NAME);
    });
  });

  describe("How to get informations about the relation", function () {
    describe("How to use getChildrenIds", function () {
      it("should return the ids of all children", async function () {
        let rel = new SpinalRelationPtrLst(DEFAULT_RELATION_NAME);

        await rel.addChild(DEFAULT_NODE);
        assert.deepStrictEqual(rel.getChildrenIds(), [DEFAULT_NODE.getId().get()]);
      });
    });

    describe("How to use getChildren", function () {
      it("should return the relation's child", async function () {
        let rel = new SpinalRelationPtrLst(DEFAULT_RELATION_NAME);

        await rel.addChild(DEFAULT_NODE);
        const children = await rel.getChildren();
        assert.deepStrictEqual(children, [DEFAULT_NODE]);
      });

      it("should return the relation's children", async function () {
        let rel = new SpinalRelationPtrLst(DEFAULT_RELATION_NAME);
        const node1 = new lib.SpinalNode();
        const node2 = new lib.SpinalNode();
        const node3 = new lib.SpinalNode();

        await Promise.all([
          rel.addChild(node1),
          rel.addChild(node2),
          rel.addChild(node3)
        ]);

        const children = await rel.getChildren();
        assert.deepStrictEqual(children, [node1, node2, node3]);
      });

      it("should return an empty array", async function () {
        let rel = new SpinalRelationPtrLst(DEFAULT_RELATION_NAME);
        const children = await rel.getChildren();

        assert.deepStrictEqual(children, []);
      });
    });

    describe("How to use getType", function () {
      it("should return the relation's type", function () {
        let rel = new SpinalRelationPtrLst(DEFAULT_RELATION_NAME);

        assert.equal(rel.getType(), lib.SPINAL_RELATION_PTR_LST_TYPE);
      });
    });
  });

  describe("How to add children", function () {
    describe("How to use addChild", function () {
      it("should add a child to the children of the relation", async function () {
        let rel = new SpinalRelationPtrLst(DEFAULT_RELATION_NAME);

        await rel.addChild(DEFAULT_NODE);
        let children = await rel.getChildren();
        assert.deepStrictEqual(children, [DEFAULT_NODE]);
      });

      it("should throw an error if you try to add the same node twice", async function () {
        let rel = new SpinalRelationPtrLst(DEFAULT_RELATION_NAME);
        let error;

        await rel.addChild(DEFAULT_NODE);
        await rel.addChild(DEFAULT_NODE).then(() => {
          error = true;
        }).catch(() => {
          error = false;
        });
        assert(!error);
      });

      it("should throw an error when you pass it something that is not a model", async function () {
        let rel = new SpinalRelationPtrLst(DEFAULT_RELATION_NAME);
        let error;

        await rel.addChild(new Array()).then(() => {
          error = true;
        }).catch(() => {
          error = false;
        });
        assert(!error);
      });

      it("should return the node added to the relation", async function () {
        let rel = new SpinalRelationPtrLst(DEFAULT_RELATION_NAME);
        let node = new lib.SpinalNode();
        let model = new globalType.Model();

        const res1 = await rel.addChild(node);

        assert.equal(res1, node);

        const res2 = await rel.addChild(model);
        const res2Elem = await res2.getElement();

        assert.equal(res2Elem, model);
      });
    });
  });

  describe("How to remove children", function () {
    describe("How to use removeChild", function () {
      it("should remove a child from the children of the relation", async function () {
        let rel = new SpinalRelationPtrLst(DEFAULT_RELATION_NAME);
        let children;

        await rel.addChild(DEFAULT_NODE);
        await rel.removeChild(DEFAULT_NODE)

        children = await rel.getChildren();
        assert.deepStrictEqual(children, []);
      });

      it("should remove a child and update the children ids of the relation", async function () {
        let rel = new SpinalRelationPtrLst(DEFAULT_RELATION_NAME);
        let ids;

        await rel.addChild(DEFAULT_NODE);
        await rel.removeChild(DEFAULT_NODE);

        ids = rel.getChildrenIds();
        assert.deepStrictEqual(ids, []);
      });

      it("should remove a child and remove the relation the node's parents", async function () {
        let parentNode = new lib.SpinalNode();
        let rel = parentNode._createRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_PTR_LST_TYPE);
        let childNode = new lib.SpinalNode();
        let parents;

        await rel.addChild(childNode);
        await rel.removeChild(childNode)

        parents = await childNode.getParents();
        assert.deepStrictEqual(parents, []);
      });
    });
  });
});
