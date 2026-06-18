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
  SpinalContext,
  SpinalRelationPtrLst,
  SPINAL_RELATION_PTR_LST_TYPE,
  SpinalNode,
} from '../../src';
import { FileSystem, Model } from 'spinal-core-connectorjs';
import { describe, it, expect } from 'vitest';

const DEFAULT_RELATION_NAME = 'relationName';
const DEFAULT_NODE = new SpinalNode('test', 'test', new Model());

describe('SpinalRelationPtrLst', () => {
  describe('How to use the constructor', () => {
    it('should create an empty opject FileSystem._sig_server === false', () => {
      FileSystem._sig_server = false;
      const rel = new SpinalRelationPtrLst(DEFAULT_NODE, DEFAULT_RELATION_NAME);
      FileSystem._sig_server = true;

      expect(typeof rel.children === 'undefined').toBeTruthy();
    });

    it('should create a new relation with a name and a node parent', () => {
      const rel = new SpinalRelationPtrLst(DEFAULT_NODE, DEFAULT_RELATION_NAME);

      expect(rel.getName().get()).toBe(DEFAULT_RELATION_NAME);
    });

    it('should create a new relation with a name and a context parent', async () => {
      const parent = new SpinalContext();
      const rel = new SpinalRelationPtrLst(parent, DEFAULT_RELATION_NAME);

      expect(rel.getName().get()).toBe(DEFAULT_RELATION_NAME);
      expect(await rel.getParent()).toBe(parent);
    });

    it('should create a new relation with a name and a graph parent', async () => {
      const parent = new SpinalGraph();
      const rel = new SpinalRelationPtrLst(parent, DEFAULT_RELATION_NAME);

      expect(rel.getName().get()).toBe(DEFAULT_RELATION_NAME);
      expect(await rel.getParent()).toBe(parent);
    });

    it('should throw an error if the parent or the name is missing', async () => {
      const testConstructor: any = SpinalRelationPtrLst;
      expect(() => {
        new testConstructor();
      }).toThrow(TypeError);

      expect(() => {
        new testConstructor(undefined, DEFAULT_RELATION_NAME);
      }).toThrow(TypeError);

      expect(() => {
        new testConstructor(DEFAULT_NODE);
      }).toThrow(TypeError);
    });

    it('should throw an error if the parent is not a SpinalNode', async () => {
      const parent1: any = [];

      expect(() => {
        new SpinalRelationPtrLst(parent1, DEFAULT_RELATION_NAME);
      }).toThrow(TypeError);

      const parent2: any = new Model();

      expect(() => {
        new SpinalRelationPtrLst(parent2, DEFAULT_RELATION_NAME);
      }).toThrow(TypeError);
    });
  });

  describe('How to get informations about the relation', () => {
    describe('How to use getChildrenIds', () => {
      it('should return the ids of all children', async () => {
        const rel = new SpinalRelationPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );

        await rel.addChild(DEFAULT_NODE);
        expect(rel.getChildrenIds()).toEqual([
          DEFAULT_NODE.getId().get(),
        ]);
      });

      it('should return the ids of all children', async () => {
        const rel = new SpinalRelationPtrLst(
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
        const rel = new SpinalRelationPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );

        await rel.addChild(DEFAULT_NODE);
        const children = await rel.getChildren();
        expect(children).toEqual([DEFAULT_NODE]);
      });

      it("should return the relation's children", async () => {
        const rel = new SpinalRelationPtrLst(
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

        const children = await rel.getChildren();
        expect(children).toEqual([node1, node2, node3]);
      });

      it('should return an empty array', async () => {
        const rel = new SpinalRelationPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );
        const children = await rel.getChildren();

        expect(children).toEqual([]);
      });
    });

    describe('How to use getChildrenInContext', () => {
      it("should return the relation's child", async () => {
        const context = new SpinalContext();
        const relation = new SpinalRelationPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );
        const child = new SpinalNode();

        child.addContextId(context.getId().get());
        await relation.addChild(child);

        const children = await relation.getChildrenInContext(context);
        expect(children).toEqual([child]);
      });

      it("should return the relation's children associated to the context", async () => {
        const context = new SpinalContext();
        const relation = new SpinalRelationPtrLst(
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

        const children = await relation.getChildrenInContext(context);
        expect(children).toEqual([child1, child3]);
      });

      it('should throw an error if the context is missing', async () => {
        const relation: any = new SpinalRelationPtrLst(
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
        const relation = new SpinalRelationPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );
        let error = false;

        try {
          await relation.getChildrenInContext(context1);
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();

        const context2 = new SpinalNode();
        error = false;

        try {
          await relation.getChildrenInContext(context2);
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });
    });

    describe('How to use getType', () => {
      it("should return the relation's type", () => {
        const rel = new SpinalRelationPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );

        expect(rel.getType()).toBe(SPINAL_RELATION_PTR_LST_TYPE);
      });
    });
  });

  describe('How to add children', () => {
    describe('How to use addChild', () => {
      it('should add a child to the children of the relation', async () => {
        const rel = new SpinalRelationPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );

        await rel.addChild(DEFAULT_NODE);
        const children = await rel.getChildren();
        expect(children).toEqual([DEFAULT_NODE]);
      });

      it('should throw an error if you try to add the same node twice', async () => {
        const rel = new SpinalRelationPtrLst(
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
        const rel = new SpinalRelationPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );
        let error;

        try {
          const arr: any = [];
          await rel.addChild(arr);
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });

      it('should return the node added to the relation', async () => {
        const rel = new SpinalRelationPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );
        const node = new SpinalNode();
        const model = new Model();

        const res1 = await rel.addChild(node);

        expect(res1).toBe(node);

        const res2 = await rel.addChild(model);
        const res2Elem = await res2.getElement();

        expect(res2Elem).toBe(model);
      });
    });
  });

  describe('How to remove children', () => {
    describe('How to use removeChild', () => {
      it('should remove a child from the children of the relation', async () => {
        const rel = new SpinalRelationPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );

        await rel.addChild(DEFAULT_NODE);
        await rel.removeChild(DEFAULT_NODE);

        const children = await rel.getChildren();
        expect(children).toEqual([]);
      });

      it('should remove a child and update the children ids of the relation', async () => {
        const rel = new SpinalRelationPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );

        await rel.addChild(DEFAULT_NODE);
        await rel.removeChild(DEFAULT_NODE);

        const ids = rel.getChildrenIds();
        expect(ids).toEqual([]);
      });

      it("should remove a child and remove the relation the node's parents", async () => {
        const parentNode = new SpinalNode();
        const rel = parentNode._createRelation(
          DEFAULT_RELATION_NAME,
          SPINAL_RELATION_PTR_LST_TYPE
        );
        const childNode = new SpinalNode();

        await rel.addChild(childNode);
        await rel.removeChild(childNode);

        const parents = await childNode.getParents();
        expect(parents).toEqual([]);
      });

      it('should throw an error if the node is not a child', async () => {
        const parentNode = new SpinalNode();
        const rel = parentNode._createRelation(
          DEFAULT_RELATION_NAME,
          SPINAL_RELATION_PTR_LST_TYPE
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

      it('should throw an error if nodes is not an array', async () => {
        const relation = new SpinalRelationPtrLst(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );
        let error = false;

        try {
          const argTest: any = {};
          await relation.removeChildren(argTest);
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });
    });

    describe('How to use removeChildren', () => {
      it('should delete all of the children', async () => {
        const rel = new SpinalRelationPtrLst(
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

        const children = await rel.getChildren();
        expect(children).toEqual([]);
      });

      it('should delete the given children', async () => {
        const rel = new SpinalRelationPtrLst(
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

        const children = await rel.getChildren();
        expect(children).toEqual([node2]);
      });

      it('should delete some of the given children', async () => {
        const origNode = new SpinalNode('node1');
        const rel = new SpinalRelationPtrLst(origNode, DEFAULT_RELATION_NAME);
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
          // expect(e instanceof Error).toBeTruthy();
        }
        // expect(error).toBeTruthy();

        const children = await rel.getChildren();
        expect(children).toEqual([node2]);
      });
    });
  });
});
