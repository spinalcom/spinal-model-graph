/*
 * Copyright 2021 SpinalCom - www.spinalcom.com
 *
 * This file is part of SpinalCore.
 *
 * Please read all of the following terms and conditions
 * of the Free Software license Agreement ("Agreement")
 * carefully.
 *
 * This Agreement is a legally binding contract between
 * the Licensee (as defined below) and SpinalCom that
 * sets forth the terms and conditions that govern your
 * use of the Program. By installing and/or using the
 * Program, you agree to abide by all the terms and
 * conditions stated or referenced herein.
 *
 * If you do not agree to abide by these terms and
 * conditions, do not demonstrate your acceptance and do
 * not install or use the Program.
 * You should have received a copy of the license along
 * with this file. If not, see
 * <http://resources.spinalcom.com/licenses.pdf>.
 */

import {
  SpinalGraph,
  SpinalNode,
  SpinalContext,
  SPINAL_RELATION_LST_PTR_LST_TYPE,
  SpinalRelationLstPtrLst,
} from '../../src';
import { FileSystem, Model } from 'spinal-core-connectorjs';
import { describe, it, expect } from 'vitest';
import { LST_PTR_LST_SIZE } from '../../src/constants';

const DEFAULT_RELATION_NAME = 'relationName';
const DEFAULT_NODE = new SpinalNode('test', 'test', new Model());

describe('SpinalRelationLstPtrLst', () => {
  describe('How to use the constructor', () => {
    it('should create an empty object FileSystem._sig_server === false', () => {
      FileSystem._sig_server = false;
      const rel = new SpinalRelationLstPtrLst(
        DEFAULT_NODE,
        DEFAULT_RELATION_NAME
      );
      FileSystem._sig_server = true;

      expect(typeof rel.children === 'undefined').toBeTruthy();
    });

    it('should create a new relation with a name and a node parent', () => {
      const rel = new SpinalRelationLstPtrLst(
        DEFAULT_NODE,
        DEFAULT_RELATION_NAME
      );

      expect(rel.getName().get()).toBe(DEFAULT_RELATION_NAME);
    });

    it('should create a new relation with a name and a context parent', async () => {
      const parent = new SpinalContext();
      const rel = new SpinalRelationLstPtrLst(parent, DEFAULT_RELATION_NAME);

      expect(rel.getName().get()).toBe(DEFAULT_RELATION_NAME);
      const parentRetrieved = await rel.getParent();
      expect(parentRetrieved.info.id.get()).toBe(parent.getId().get());
    });

    it('should create a new relation with a name and a graph parent', async () => {
      const parent = new SpinalGraph();
      const rel = new SpinalRelationLstPtrLst(parent, DEFAULT_RELATION_NAME);

      expect(rel.getName().get()).toBe(DEFAULT_RELATION_NAME);
      const parentRetrieved = await rel.getParent();
      expect(parentRetrieved.info.id.get()).toBe(parent.getId().get());
    });

    it('should throw an error if the parent or the name is missing', async () => {
      expect(() => {
        new SpinalRelationLstPtrLst();
      }).toThrow(TypeError);
      expect(() => {
        new SpinalRelationLstPtrLst(undefined, DEFAULT_RELATION_NAME);
      }).toThrow(TypeError);
      expect(() => {
        new SpinalRelationLstPtrLst(DEFAULT_NODE);
      }).toThrow(TypeError);
    });

    it('should throw an error if the parent is not a SpinalNode', async () => {
      const parent1: any = [];

      expect(() => {
        new SpinalRelationLstPtrLst(parent1, DEFAULT_RELATION_NAME);
      }).toThrow(TypeError);

      const parent2: any = new Model();

      expect(() => {
        new SpinalRelationLstPtrLst(parent2, DEFAULT_RELATION_NAME);
      }).toThrow(TypeError);
    });
  });

  describe('How to get informations about the relation', () => {
    describe('How to use getChildrenIds', () => {
      it('should return the ids of all children', async () => {
        const rel = new SpinalRelationLstPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );

        await rel.addChild(DEFAULT_NODE);
        expect(rel.getChildrenIds()).toEqual([DEFAULT_NODE.getId().get()]);
      });

      it('should return the ids of all children', async () => {
        const rel = new SpinalRelationLstPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );
        const node1 = new SpinalNode();
        const node2 = new SpinalNode();
        const node3 = new SpinalNode();

        const nodeIds = [
          node1.getId().get(),
          node2.getId().get(),
          node3.getId().get(),
        ];

        await Promise.all([
          rel.addChild(node1),
          rel.addChild(node2),
          rel.addChild(node3),
        ]);

        expect(rel.getChildrenIds()).toEqual(nodeIds);
        expect(rel.getNbChildren()).toEqual(nodeIds.length);
      });
    });

    describe('How to use getChildren', () => {
      it("should return the relation's child", async () => {
        const rel = new SpinalRelationLstPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );

        await rel.addChild(DEFAULT_NODE);
        const children = await rel.getChildren(0, false);
        expect(children.map((child) => child.getId().get())).toEqual([
          DEFAULT_NODE.getId().get(),
        ]);
      });

      it("should return the relation's children", async () => {
        const rel = new SpinalRelationLstPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );
        const node1 = new SpinalNode();
        const node2 = new SpinalNode();
        const node3 = new SpinalNode();

        await Promise.all([
          rel.addChild(node1),
          rel.addChild(node2),
          rel.addChild(node3),
        ]);

        const children = await rel.getChildren(0, false);
        expect(children.map((child) => child.getId().get())).toEqual([
          node1.getId().get(),
          node2.getId().get(),
          node3.getId().get(),
        ]);
      });

      it('should return an empty array', async () => {
        const rel = new SpinalRelationLstPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );
        const children = await rel.getChildren(0, false);

        expect(children).toEqual([]);
      });

      it('should return the relation children in reverse order', async () => {
        const rel = new SpinalRelationLstPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );
        const node1 = new SpinalNode();
        const node2 = new SpinalNode();
        const node3 = new SpinalNode();

        await Promise.all([
          rel.addChild(node1),
          rel.addChild(node2),
          rel.addChild(node3),
        ]);

        const children = await rel.getChildren(0, true);
        expect(children.map((child) => child.getId().get())).toEqual([
          node3.getId().get(),
          node2.getId().get(),
          node1.getId().get(),
        ]);
      });

      it('should offset the children returned', async () => {
        const rel = new SpinalRelationLstPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );
        const node1 = new SpinalNode();
        const node2 = new SpinalNode();
        const node3 = new SpinalNode();

        await Promise.all([
          rel.addChild(node1),
          rel.addChild(node2),
          rel.addChild(node3),
        ]);

        const children = await rel.getChildren(1, false);
        expect(children.map((child) => child.getId().get())).toEqual([
          node2.getId().get(),
          node3.getId().get(),
        ]);
      });
      it('should offset with the counter the children returned', async () => {
        const rel = new SpinalRelationLstPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );
        const node1 = new SpinalNode();
        const node2 = new SpinalNode();
        const node3 = new SpinalNode();

        await Promise.all([
          rel.addChild(node1),
          rel.addChild(node2),
          rel.addChild(node3),
        ]);

        const children = await rel.getChildren(1, false, undefined, 50);
        expect(children.length).toEqual(3);
        expect(children.map((child) => child.getId().get())).toEqual([
          node1.getId().get(),
          node2.getId().get(),
          node3.getId().get(),
        ]);
      });
      it('should not load the chunk if the offset is greater than the number of children in a chunk', async () => {
        const rel = new SpinalRelationLstPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );
        const proms = [];
        while (rel.getNbChildren() < LST_PTR_LST_SIZE * 2) {
          proms.push(rel.addChild(new SpinalNode()));
        }
        const children_pushed = await Promise.all(proms);

        const children = await rel.getChildren(LST_PTR_LST_SIZE, false);
        expect(children.map((child) => child.getId().get())).toEqual(
          children_pushed
            .slice(LST_PTR_LST_SIZE)
            .map((child) => child.getId().get())
        );
      });
      it('should not load the chunk if the offset is greater than the number of children in a chunk, also in reverse', async () => {
        const rel = new SpinalRelationLstPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );
        const proms = [];
        let i = 0;
        while (rel.getNbChildren() < LST_PTR_LST_SIZE * 2) {
          proms.push(rel.addChild(new SpinalNode('name' + i)));
          i++;
        }
        const children_pushed = await Promise.all(proms);

        const children = await rel.getChildren(LST_PTR_LST_SIZE, true);
        expect(children.map((child) => child.getId().get())).toEqual(
          children_pushed
            .slice(0, LST_PTR_LST_SIZE)
            .reverse()
            .map((child) => child.getId().get())
        );
      });
    });

    describe('How to use getChildren in Context', () => {
      it("should return the relation's child", async () => {
        const context = new SpinalContext();
        const relation = new SpinalRelationLstPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );
        const child = new SpinalNode();

        child.addContextId(context.getId().get());
        await relation.addChild(child);

        const children = await relation.getChildren(0, false, context);
        expect(children.map((child) => child.getId().get())).toEqual([
          child.getId().get(),
        ]);
      });

      it("should return the relation's children associated to the context", async () => {
        const context = new SpinalContext();
        const relation = new SpinalRelationLstPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );
        const child1 = new SpinalNode();
        const child2 = new SpinalNode();
        const child3 = new SpinalNode();

        child1.addContextId(context.getId().get());
        child3.addContextId(context.getId().get());
        await Promise.all([
          relation.addChild(child1),
          relation.addChild(child2),
          relation.addChild(child3),
        ]);

        const children = await relation.getChildren(0, false, context);
        expect(children.map((child) => child.getId().get())).toEqual([
          child1.getId().get(),
          child3.getId().get(),
        ]);
      });

      it('should offset the children returned associated to the context', async () => {
        const context = new SpinalContext();
        const relation = new SpinalRelationLstPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );
        const child1 = new SpinalNode();
        const child2 = new SpinalNode();
        const child3 = new SpinalNode();

        child1.addContextId(context.getId().get());
        child2.addContextId(context.getId().get());
        child3.addContextId(context.getId().get());
        await Promise.all([
          relation.addChild(child1),
          relation.addChild(child2),
          relation.addChild(child3),
        ]);

        const children = await relation.getChildren(1, false, context);
        expect(children.map((child) => child.getId().get())).toEqual([
          child2.getId().get(),
          child3.getId().get(),
        ]);
      });
      it('should offset with the counter the children returned associated to the context', async () => {
        const context = new SpinalContext();
        const relation = new SpinalRelationLstPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );
        const child1 = new SpinalNode();
        const child2 = new SpinalNode();
        const child3 = new SpinalNode();

        child1.addContextId(context.getId().get());
        child2.addContextId(context.getId().get());
        child3.addContextId(context.getId().get());
        await Promise.all([
          relation.addChild(child1),
          relation.addChild(child2),
          relation.addChild(child3),
        ]);

        const children = await relation.getChildren(1, false, context, 50);
        expect(children.map((child) => child.getId().get())).toEqual([
          child1.getId().get(),
          child2.getId().get(),
          child3.getId().get(),
        ]);
      });

      it('should return the reverse order of the children returned associated to the context', async () => {
        const context = new SpinalContext();
        const relation = new SpinalRelationLstPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );
        const child1 = new SpinalNode();
        const child2 = new SpinalNode();
        const child3 = new SpinalNode();

        child1.addContextId(context.getId().get());
        child2.addContextId(context.getId().get());
        child3.addContextId(context.getId().get());
        await Promise.all([
          relation.addChild(child1),
          relation.addChild(child2),
          relation.addChild(child3),
        ]);

        const children = await relation.getChildren(0, true, context);
        expect(children.map((child) => child.getId().get())).toEqual([
          child3.getId().get(),
          child2.getId().get(),
          child1.getId().get(),
        ]);
      });

      it('should return the reverse order of the children returned associated to the context with an offset', async () => {
        const context = new SpinalContext();
        const relation = new SpinalRelationLstPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );
        const child1 = new SpinalNode();
        const child2 = new SpinalNode();
        const child3 = new SpinalNode();

        child1.addContextId(context.getId().get());
        child2.addContextId(context.getId().get());
        child3.addContextId(context.getId().get());
        await Promise.all([
          relation.addChild(child1),
          relation.addChild(child2),
          relation.addChild(child3),
        ]);

        const children = await relation.getChildren(1, true, context);
        expect(children.map((child) => child.getId().get())).toEqual([
          child2.getId().get(),
          child1.getId().get(),
        ]);
      });

      it('should return the reverse order of the children returned associated to the context with an offset and a counter', async () => {
        const context = new SpinalContext();
        const relation = new SpinalRelationLstPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );
        const child1 = new SpinalNode();
        const child2 = new SpinalNode();
        const child3 = new SpinalNode();

        child1.addContextId(context.getId().get());
        child2.addContextId(context.getId().get());
        child3.addContextId(context.getId().get());
        await Promise.all([
          relation.addChild(child1),
          relation.addChild(child2),
          relation.addChild(child3),
        ]);

        const children = await relation.getChildren(1, true, context, 1);
        expect(children.map((child) => child.getId().get())).toEqual([
          child3.getId().get(),
          child2.getId().get(),
          child1.getId().get(),
        ]);
      });
      it('should return the children in reverse order and in a context', async () => {
        const rel = new SpinalRelationLstPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );
        const context = new SpinalContext();
        const proms = [];
        let i = 0;
        while (rel.getNbChildren() < LST_PTR_LST_SIZE * 4) {
          const child = new SpinalNode('name' + i);
          proms.push(rel.addChild(child));
          i++;
        }
        const children_pushed = await Promise.all(proms);
        const children_in_context = children_pushed.slice(375, 475);
        for (const child of children_in_context) {
          child.addContextId(context.getId().get());
        }

        const children = await rel.getChildren(25, true, context);

        console.log(
          `children [${children.length}]: ${children.map((c) =>
            c.getName().get()
          )}`
        );
        console.log(
          `children_in_context [${children_in_context.length}]: ${children_in_context.map(
            (c) => c.getName().get()
          )}`
        );

        expect(children.map((child) => child.getId().get())).toEqual(
          children_in_context
            .slice(0, 75)
            .reverse()
            .map((child) => child.getId().get())
        );
      });

      it('should throw an error if the context is missing', async () => {
        const relation: any = new SpinalRelationLstPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );
        let error = false;

        try {
          await relation.getChildrenInContext();
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });

      it('should throw an error if context is not a SpinalContext', async () => {
        const context1: any = new Model();
        const relation = new SpinalRelationLstPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );
        let error = false;

        try {
          await relation.getChildren(0, false, context1);
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();

        const context2 = new SpinalNode();
        error = false;

        try {
          await relation.getChildren(0, false, context2);
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });
    });

    describe('How to use getType', () => {
      it("should return the relation's type", () => {
        const rel = new SpinalRelationLstPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );

        expect(rel.getType()).toBe(SPINAL_RELATION_LST_PTR_LST_TYPE);
      });
    });
  });

  describe('How to add children', () => {
    describe('How to use addChild', () => {
      it('should add a child to the children of the relation', async () => {
        const rel = new SpinalRelationLstPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );

        await rel.addChild(DEFAULT_NODE);
        const children = await rel.getChildren(0, false);
        expect(children.map((child) => child.getId().get())).toEqual([
          DEFAULT_NODE.getId().get(),
        ]);
      });

      it('should throw an error if you try to add the same node twice', async () => {
        const rel = new SpinalRelationLstPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );
        let error;

        await rel.addChild(DEFAULT_NODE);

        try {
          await rel.addChild(DEFAULT_NODE);
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });

      it('should throw an error when you pass it something that is not a model', async () => {
        const rel = new SpinalRelationLstPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );
        let error;
        const array: any = [];
        try {
          await rel.addChild(array);
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });

      it('should return the node added to the relation', async () => {
        const rel = new SpinalRelationLstPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );
        const node = new SpinalNode();
        const model = new Model();

        const res1 = await rel.addChild(node);

        expect(res1.info.id.get()).toBe(node.info.id.get());

        const res2 = await rel.addChild(model);
        const res2Elem = await res2.getElement();

        expect(res2Elem?.model_id).toBe(model.model_id);
      });
    });
  });

  describe('How to remove children', () => {
    describe('How to use removeChild', () => {
      it('should remove a child from the children of the relation', async () => {
        const rel = new SpinalRelationLstPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );

        await rel.addChild(DEFAULT_NODE);
        await rel.removeChild(DEFAULT_NODE);

        const children = await rel.getChildren(0, false);
        expect(children.length).toEqual(0);
      });

      it('should remove a child and update the children ids of the relation', async () => {
        const rel = new SpinalRelationLstPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );

        await rel.addChild(DEFAULT_NODE);
        await rel.removeChild(DEFAULT_NODE);

        const ids = rel.getChildrenIds();
        expect(ids.length).toEqual(0);
      });

      it("should remove a child and remove the relation the node's parents", async () => {
        const parentNode = new SpinalNode();
        const rel = parentNode._createRelation(
          DEFAULT_RELATION_NAME,
          SPINAL_RELATION_LST_PTR_LST_TYPE
        );
        const childNode = new SpinalNode();

        await rel.addChild(childNode);
        await rel.removeChild(childNode);

        const parents = await childNode.getParents();
        expect(parents.length).toEqual(0);
      });

      it('should throw an error if the node is not a child', async () => {
        const parentNode = new SpinalNode();
        const rel = parentNode._createRelation(
          DEFAULT_RELATION_NAME,
          SPINAL_RELATION_LST_PTR_LST_TYPE
        );
        const childNode = new SpinalNode();
        let error = false;

        try {
          await rel.removeChild(childNode);
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });
    });

    describe('How to use removeChildren', () => {
      it('should delete all of the children', async () => {
        const rel = new SpinalRelationLstPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );
        const node1 = new SpinalNode();
        const node2 = new SpinalNode();
        const node3 = new SpinalNode();

        await Promise.all([
          rel.addChild(node1),
          rel.addChild(node2),
          rel.addChild(node3),
        ]);

        await rel.removeChildren();

        const children = await rel.getChildren(0, false);
        expect(children.length).toEqual(0);
      });

      it('should delete the given children', async () => {
        const rel = new SpinalRelationLstPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );
        const node1 = new SpinalNode();
        const node2 = new SpinalNode();
        const node3 = new SpinalNode();

        await Promise.all([
          rel.addChild(node1),
          rel.addChild(node2),
          rel.addChild(node3),
        ]);

        await rel.removeChildren([node3, node1]);

        const children = await rel.getChildren(0, false);
        expect(children.length).toEqual(1);
        expect(children[0].info.id.get()).toBe(node2.info.id.get());
      });

      it('should delete some of the given children', async () => {
        const rel = new SpinalRelationLstPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );
        const node1 = new SpinalNode('node1');
        const node2 = new SpinalNode('node2');
        const node3 = new SpinalNode('node3');
        const node4 = new SpinalNode('node4');
        let error = false;

        await Promise.all([
          rel.addChild(node1),
          rel.addChild(node2),
          rel.addChild(node3),
        ]);

        try {
          await rel.removeChildren([node3, node4, node1]);
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();

        const children = await rel.getChildren(0, false);
        expect(children.length).toEqual(1);
        expect(children[0].info.id.get()).toBe(node2.info.id.get());
      });
    });
  });
  describe('Test addChild split every LST_PTR_LST_SIZE (1.5s each test for the debounce trigger)', async () => {
    const rel = new SpinalRelationLstPtrLst(
      DEFAULT_NODE,
      DEFAULT_RELATION_NAME
    );
    const children: SpinalNode<any>[] = [];
    for (let i = 0; i < 1000; i++) {
      children.push(new SpinalNode(`node${i}`));
    }
    await Promise.all(children.map((child) => rel.addChild(child)));

    it('should add 1000 children to the relation in chunk of LST_PTR_LST_SIZE', () => {
      const childrenIds = rel.getChildrenIds();
      expect(childrenIds.length).toEqual(1000);
      expect(childrenIds).toEqual(children.map((child) => child.getId().get()));
      for (let ptrLst of rel.children) {
        expect(ptrLst.info.ids?.length).toBeLessThanOrEqual(LST_PTR_LST_SIZE);
      }
    });
    const childrenToRemoveLastChunk = children.slice(900, 1000);

    it('should not restructure if the removed children is the last chunk', async () => {
      await rel.removeChildren(childrenToRemoveLastChunk);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      expect(rel.children.length).toEqual(5);
      expect(rel.children[0].info.ids?.length).toBe(200);
      expect(rel.children[1].info.ids?.length).toBe(200);
      expect(rel.children[2].info.ids?.length).toBe(200);
      expect(rel.children[3].info.ids?.length).toBe(200);
      expect(rel.children[4].info.ids?.length).toBe(100);
    });

    it('should remove the chunk a chunk if removeChild is called and the chunk becomes empty', async () => {
      const childrenToRemove = children.slice(350, 450);
      // remove children from 350 to 449
      await rel.removeChildren(childrenToRemove);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      expect(rel.children.length).toEqual(5);
      expect(rel.children[0].info.ids?.length).toBe(200);
      expect(rel.children[1].info.ids?.length).toBe(150);
      expect(rel.children[2].info.ids?.length).toBe(150);
      expect(rel.children[3].info.ids?.length).toBe(200);
      expect(rel.children[4].info.ids?.length).toBe(100);
    });

    it('should restructure the children if enough children are removed', async () => {
      const childrenToRemove = children.slice(450, 600);
      await rel.removeChildren(childrenToRemove);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      expect(rel.children.length).toEqual(4);
      expect(rel.children[0].info.ids?.length).toBe(200);
      expect(rel.children[1].info.ids?.length).toBe(200);
      expect(rel.children[2].info.ids?.length).toBe(200);
      expect(rel.children[3].info.ids?.length).toBe(50);
    });
  });
});
