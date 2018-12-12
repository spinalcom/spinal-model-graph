const lib = require("../../build/index");
const globalType = typeof window === "undefined" ? global : window;
const SpinalRelationLstPtr = require("../../build/Relations/SpinalRelationLstPtr").default;

const assert = require("assert");

const DEFAULT_RELATION_NAME = "relationName";
const DEFAULT_NODE = new lib.SpinalNode();

describe("SpinalRelationLstPtr", function() {
  describe("How to use the constructor", function() {
    it("should create a new relation with a name", function() {
      let rel = new SpinalRelationLstPtr(DEFAULT_RELATION_NAME);

      assert.strictEqual(rel.getName().get(), DEFAULT_RELATION_NAME);
    });
  });

  describe("How to get informations about the relation", function() {
    describe("How to use getChildrenIds", function() {
      it("should return the ids of all children", async function() {
        let rel = new SpinalRelationLstPtr(DEFAULT_RELATION_NAME);

        await rel.addChild(DEFAULT_NODE);
        assert.deepStrictEqual(rel.getChildrenIds(), [
          DEFAULT_NODE.getId().get()
        ]);
      });

      it("should return the ids of all children", async function() {
        let rel = new SpinalRelationLstPtr(DEFAULT_RELATION_NAME);
        const node1 = new lib.SpinalNode();
        const node2 = new lib.SpinalNode();
        const node3 = new lib.SpinalNode();

        const nodeIds = [
          node1.getId().get(),
          node2.getId().get(),
          node3.getId().get()
        ];

        await Promise.all([
          rel.addChild(node1),
          rel.addChild(node2),
          rel.addChild(node3),
        ]);

        assert.deepStrictEqual(rel.getChildrenIds(), nodeIds);
      });
    });

    describe("How to use getChildren", function() {
      it("should return the relation's child", async function() {
        let rel = new SpinalRelationLstPtr(DEFAULT_RELATION_NAME);
        let children;

        await rel.addChild(DEFAULT_NODE);

        children = await rel.getChildren();
        assert.deepStrictEqual(children, [DEFAULT_NODE]);
      });

      it("should return the relation's children", async function() {
        let rel = new SpinalRelationLstPtr(DEFAULT_RELATION_NAME);
        const node1 = new lib.SpinalNode();
        const node2 = new lib.SpinalNode();
        const node3 = new lib.SpinalNode();
        let children;

        await Promise.all([
          rel.addChild(node1),
          rel.addChild(node2),
          rel.addChild(node3)
        ]);

        children = await rel.getChildren();
        assert.deepStrictEqual(children, [node1, node2, node3]);
      });

      it("should return an empty array", async function() {
        let rel = new SpinalRelationLstPtr(DEFAULT_RELATION_NAME);
        const children = await rel.getChildren();

        assert.deepStrictEqual(children, []);
      });
    });

    describe("How to use getChildrenInContext", function() {
      it("should return the relation's child", async function() {
        let context = new lib.SpinalContext();
        let relation = new SpinalRelationLstPtr(DEFAULT_RELATION_NAME);
        let child = new lib.SpinalNode();

        child.addContextId(context.getId().get());
        await relation.addChild(child);

        const children = await relation.getChildrenInContext(
          context);
        assert.deepStrictEqual(children, [child]);
      });

      it("should return the relation's children associated to the context", async function() {
        let context = new lib.SpinalContext();
        let relation = new SpinalRelationLstPtr(DEFAULT_RELATION_NAME);
        let child1 = new lib.SpinalNode();
        let child2 = new lib.SpinalNode();
        let child3 = new lib.SpinalNode();

        child1.addContextId(context.getId().get());
        child3.addContextId(context.getId().get());
        await Promise.all([
          relation.addChild(child1),
          relation.addChild(child2),
          relation.addChild(child3)
        ]);

        const children = await relation.getChildrenInContext(
          context);
        assert.deepStrictEqual(children, [child1, child3]);
      });
    });

    describe("How to use getType", function() {
      it("should return the relation's type", function() {
        let rel = new SpinalRelationLstPtr(DEFAULT_RELATION_NAME);

        assert.strictEqual(rel.getType(), lib.SPINAL_RELATION_LST_PTR_TYPE);
      });
    });
  });

  describe("How to add children", function() {
    describe("How to use addChild", function() {
      it("should add a child to the children of the relation", async function() {
        let rel = new SpinalRelationLstPtr(DEFAULT_RELATION_NAME);

        await rel.addChild(DEFAULT_NODE);
        let children = await rel.getChildren();
        assert.deepStrictEqual(children, [DEFAULT_NODE]);
      });

      it("should throw an error if you try to add the same node twice", async function() {
        let rel = new SpinalRelationLstPtr(DEFAULT_RELATION_NAME);
        let error;

        await rel.addChild(DEFAULT_NODE);
        await rel.addChild(DEFAULT_NODE).then(() => {
          error = true;
        }).catch(() => {
          error = false;
        });
        assert(!error);
      });

      it("should throw an error when you pass it something that is not a model", async function() {
        let rel = new SpinalRelationLstPtr(
          DEFAULT_RELATION_NAME);
        let error;

        await rel.addChild(new Array()).then(() => {
          error = true;
        }).catch(() => {
          error = false;
        });
        assert(!error);
      });

      it("should return the node added to the relation", async function() {
        let rel = new SpinalRelationLstPtr(DEFAULT_RELATION_NAME);
        let node = new lib.SpinalNode();
        let model = new globalType.Model();

        const res1 = await rel.addChild(node);

        assert.strictEqual(res1, node);

        const res2 = await rel.addChild(model);
        const res2Elem = await res2.getElement();

        assert.strictEqual(res2Elem, model);
      });
    });
  });

  describe("How to remove children", function() {
    describe("How to use removeChild", function() {
      it("should remove a child from the children of the relation", async function() {
        let rel = new SpinalRelationLstPtr(DEFAULT_RELATION_NAME);
        let children;

        await rel.addChild(DEFAULT_NODE);
        await rel.removeChild(DEFAULT_NODE);

        children = await rel.getChildren();
        assert.deepStrictEqual(children, []);
      });

      it("should remove a child and update the children ids of the relation", async function() {
        let rel = new SpinalRelationLstPtr(DEFAULT_RELATION_NAME);
        let ids;

        await rel.addChild(DEFAULT_NODE);
        await rel.removeChild(DEFAULT_NODE);

        ids = rel.getChildrenIds();
        assert.deepStrictEqual(ids, []);
      });

      it("should remove a child and update the children ids of the relation", async function() {
        let parentNode = new lib.SpinalNode();
        let rel = parentNode._createRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_LST_PTR_TYPE);
        let childNode = new lib.SpinalNode();
        let parents;

        await rel.addChild(childNode);
        await rel.removeChild(childNode);

        parents = await childNode.getParents();
        assert.deepStrictEqual(parents, []);
      });

      it("should remove a child and return true", async function() {
        let parentNode = new lib.SpinalNode();
        let rel = parentNode._createRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_LST_PTR_TYPE);
        let childNode = new lib.SpinalNode();
        let res;

        await rel.addChild(childNode);
        res = await rel.removeChild(childNode);

        assert.strictEqual(res, true);
      });

      it("should exit and return false", async function() {
        let parentNode = new lib.SpinalNode();
        let rel = parentNode._createRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_LST_PTR_TYPE);
        let childNode = new lib.SpinalNode();
        let res;

        res = await rel.removeChild(childNode);

        assert.strictEqual(res, false);
      });
    });

    describe("How to use removeChildren", function() {
      it("should delete all of the children", async function() {
        let rel = new SpinalRelationLstPtr(DEFAULT_RELATION_NAME);
        const node1 = new lib.SpinalNode();
        const node2 = new lib.SpinalNode();
        const node3 = new lib.SpinalNode();

        await Promise.all([
          rel.addChild(node1),
          rel.addChild(node2),
          rel.addChild(node3)
        ]);

        const res = await rel.removeChildren();
        assert.deepStrictEqual(res, [true, true, true]);

        const children = await rel.getChildren();
        assert.deepStrictEqual(children, []);
      });

      it("should delete the given children", async function() {
        let rel = new SpinalRelationLstPtr(DEFAULT_RELATION_NAME);
        const node1 = new lib.SpinalNode();
        const node2 = new lib.SpinalNode();
        const node3 = new lib.SpinalNode();

        await Promise.all([
          rel.addChild(node1),
          rel.addChild(node2),
          rel.addChild(node3)
        ]);

        const res = await rel.removeChildren([node3, node1]);
        assert.deepStrictEqual(res, [true, true]);

        const children = await rel.getChildren();
        assert.deepStrictEqual(children, [node2]);
      });

      it("should delete some of the given children", async function() {
        let rel = new SpinalRelationLstPtr(DEFAULT_RELATION_NAME);
        const node1 = new lib.SpinalNode();
        const node2 = new lib.SpinalNode();
        const node3 = new lib.SpinalNode();
        const node4 = new lib.SpinalNode();

        await Promise.all([
          rel.addChild(node1),
          rel.addChild(node2),
          rel.addChild(node3)
        ]);

        const res = await rel.removeChildren([node3, node1, node4]);
        assert.deepStrictEqual(res, [true, true, false]);

        const children = await rel.getChildren();
        assert.deepStrictEqual(children, [node2]);
      });
    });
  });
});
