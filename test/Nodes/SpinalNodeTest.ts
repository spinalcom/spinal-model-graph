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
  SpinalNode,
  SpinalContext,
  SPINAL_RELATION_LST_PTR_TYPE,
  SPINAL_RELATION_PTR_LST_TYPE,
  SPINAL_RELATION_TYPE,
  ADD_CHILD_EVENT,
  REMOVE_CHILDREN_EVENT,
  SPINAL_RELATION_LST_PTR_LST_TYPE,
  type EventData,
} from '../../src';
import { FileSystem, Model } from 'spinal-core-connectorjs';
import { describe, it, expect } from 'vitest';
import { spinalEventEmitter } from 'spinal-env-viewer-plugin-event-emitter';

const DEFAULT_SPINAL_NODE_NAME = 'undefined';
const DEFAULT_SPINAL_NODE_TYPE = 'SpinalNode';
const CUSTOM_SPINAL_NODE_NAME = 'SpinalNodeTestName';
const CUSTOM_SPINAL_NODE_TYPE = 'SpinalNodeTestType';
const DEFAULT_RELATION_NAME = 'has child';
const DEFAULT_ELEMENT_NAME = 'Default Name';
const CUSTOM_RELATION_NAME1 = 'custom relation';
const CUSTOM_RELATION_NAME2 = 'custom relation 2';
const DEFAULT_ELEMENT = new Model();
DEFAULT_ELEMENT.add_attr({
  name: DEFAULT_ELEMENT_NAME,
});
const DEFAULT_NODE = new SpinalNode(CUSTOM_SPINAL_NODE_NAME);

describe('SpinalNode', () => {
  describe('How to use the constructor', () => {
    it('should create an empty object FileSystem._sig_server === false', () => {
      FileSystem._sig_server = false;
      const node = new SpinalNode();
      FileSystem._sig_server = true;

      expect(typeof node.element === 'undefined').toBeTruthy();
    });
    it('should create a new spinal node.', async () => {
      const node = new SpinalNode();

      expect(node.getName().get()).toBe(DEFAULT_SPINAL_NODE_NAME);

      expect(node.getType().get()).toBe(DEFAULT_SPINAL_NODE_TYPE);

      const elt = await node.getElement();
      expect(elt instanceof Model).toBeTruthy();
    });

    it('should create spinal a new SpinalNode with a specific name.', () => {
      const node = new SpinalNode(CUSTOM_SPINAL_NODE_NAME);

      expect(node.getName().get()).toBe(CUSTOM_SPINAL_NODE_NAME);
    });

    it('should create a new SpinalNode with specific name and type.', () => {
      const node = new SpinalNode(
        CUSTOM_SPINAL_NODE_NAME,
        CUSTOM_SPINAL_NODE_TYPE
      );

      expect(node.getName().get()).toBe(CUSTOM_SPINAL_NODE_NAME);

      expect(node.getType().get()).toBe(CUSTOM_SPINAL_NODE_TYPE);
    });

    it('should create a new SpinalNode with specific name, type and element', async () => {
      const node = new SpinalNode(
        CUSTOM_SPINAL_NODE_NAME,
        CUSTOM_SPINAL_NODE_TYPE,
        new SpinalNode()
      );

      expect(node.getName().get()).toBe(CUSTOM_SPINAL_NODE_NAME);

      expect(node.getType().get()).toBe(CUSTOM_SPINAL_NODE_TYPE);

      const elt = await node.getElement();
      expect(
        elt instanceof SpinalNode,
        'By setting the third argument of the construct the element should be setElement.'
      ).toBeTruthy();
    });
  });

  describe('How to get/set information about the node', () => {
    describe('How to use getName', () => {
      it('should return the name CUSTOM_SPINAL_NODE_NAME', () => {
        const node = new SpinalNode(CUSTOM_SPINAL_NODE_NAME);
        expect(node.getName().get()).toBe(CUSTOM_SPINAL_NODE_NAME);
      });
    });

    describe('How to use getType', () => {
      it('should return the type CUSTOM_SPINAL_NODE_TYPE', () => {
        const node = new SpinalNode(
          CUSTOM_SPINAL_NODE_NAME,
          CUSTOM_SPINAL_NODE_TYPE
        );
        expect(node.getType().get()).toBe(CUSTOM_SPINAL_NODE_TYPE);
      });
    });

    describe('How to getElement', () => {
      it('should return the DEFAULT_ELEMENT', async () => {
        const node = new SpinalNode(
          CUSTOM_SPINAL_NODE_NAME,
          CUSTOM_SPINAL_NODE_TYPE,
          DEFAULT_ELEMENT
        );

        const elt = await node.getElement();
        expect(elt?.model_id).toBe(DEFAULT_ELEMENT.model_id);
      });
    });

    describe('How to use getChildrenIds', () => {
      it('should return no ids', () => {
        const node = new SpinalNode();

        expect(node.getChildrenIds()).toEqual([]);
      });

      it('should return all children ids', async () => {
        const parent = new SpinalNode();
        const child1 = new SpinalNode();
        const child2 = new SpinalNode();
        const child3 = new SpinalNode();

        const childrenIds = [
          child1.getId().get(),
          child2.getId().get(),
          child3.getId().get(),
        ];

        await Promise.all([
          parent.addChild(
            child1,
            DEFAULT_RELATION_NAME,
            SPINAL_RELATION_LST_PTR_TYPE
          ),
          parent.addChild(
            child2,
            DEFAULT_RELATION_NAME,
            SPINAL_RELATION_LST_PTR_TYPE
          ),
          parent.addChild(
            child3,
            DEFAULT_RELATION_NAME,
            SPINAL_RELATION_LST_PTR_TYPE
          ),
        ]);

        expect(parent.getChildrenIds()).toEqual(childrenIds);
      });
    });

    describe('How to use getNbChildren', () => {
      it('should return 0', () => {
        const node = new SpinalNode();
        const res = node.getNbChildren();

        expect(res).toBe(0);
      });

      it('should return 3', () => {
        const node = new SpinalNode();
        const child1 = new SpinalNode();
        const child2 = new SpinalNode();
        const child3 = new SpinalNode();

        node.addChild(child1, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);
        node.addChild(child2, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);
        node.addChild(child3, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);
        const res = node.getNbChildren();
        expect(res).toBe(3);
      });

      it('should return 2', async () => {
        const node = new SpinalNode();
        const child1 = new SpinalNode();
        const child2 = new SpinalNode();
        const child3 = new SpinalNode();

        await Promise.all([
          node.addChild(child1, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
          node.addChild(child2, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
          node.addChild(child3, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
        ]);

        await node.removeChild(child2, DEFAULT_RELATION_NAME);
        const res = node.getNbChildren();
        expect(res).toBe(2);
      });
    });

    describe('How to use addContextId and getContextId', () => {
      it('should get the ids of the associated contexts', () => {
        const node = new SpinalNode();
        const contextId1 = new SpinalContext().getId().get();
        const contextId2 = new SpinalContext().getId().get();

        node.addContextId(contextId1);

        expect(node.getContextIds()).toEqual([contextId1]);

        node.addContextId(contextId1);
        node.addContextId(contextId2);

        expect(node.getContextIds()).toEqual([contextId1, contextId2]);
      });

      it('should throw an error if the id is missing', () => {
        const node = new SpinalNode();

        expect(() => {
          (node as any).addContextId();
        }).toThrow(TypeError);
      });

      it('should throw an error if the id is not a string', () => {
        const node = new SpinalNode();
        const context = new SpinalContext();

        expect(() => {
          node.addContextId(<any>context.getId());
        }).toThrow(TypeError);
      });
    });

    describe('How to use belongsToContext', () => {
      it('should return true', async () => {
        const context = new SpinalContext();
        const parent = new SpinalNode();
        const child = new SpinalNode();

        await parent.addChildInContext(
          child,
          DEFAULT_RELATION_NAME,
          SPINAL_RELATION_TYPE,
          context
        );

        expect(child.belongsToContext(context)).toBe(true);
      });

      it('should return false', () => {
        const context = new SpinalContext();
        const node = new SpinalNode();

        expect(node.belongsToContext(context)).toBe(false);
      });

      it('should throw an error if the context is missing', () => {
        const node = new SpinalNode();

        expect(() => {
          node.belongsToContext(<any>undefined);
        }).toThrow(TypeError);
      });

      it('should throw an error if the context is not a SpinalContext', () => {
        const node = new SpinalNode();

        expect(() => {
          node.belongsToContext(<any>1);
        }).toThrow(TypeError);
      });
    });
  });

  describe("How to get information about the node's relations", () => {
    describe('How to use hasRelation', () => {
      it('should return true', async () => {
        const node = new SpinalNode();

        await node.addChild(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME,
          SPINAL_RELATION_TYPE
        );
        expect(node.hasRelation(DEFAULT_RELATION_NAME)).toBeTruthy();
      });

      it('should return false', async () => {
        const node = new SpinalNode();

        await node.addChild(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME,
          SPINAL_RELATION_TYPE
        );
        expect(node.hasRelation(CUSTOM_RELATION_NAME1)).toBeFalsy();
      });

      it('should handle optional relationType', async () => {
        const node = new SpinalNode();

        await node.addChild(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME,
          SPINAL_RELATION_TYPE
        );
        expect(node.hasRelation(DEFAULT_RELATION_NAME)).toBeTruthy();
        expect(node.hasRelation(CUSTOM_RELATION_NAME1)).toBeFalsy();
      });

      it('should throw an error if the relation name is missing', () => {
        const node = new SpinalNode();

        expect(() => {
          node.hasRelation(<any>undefined);
        }).toThrow(TypeError);
      });

      it('should throw an error if the relation name is not a string', () => {
        const node = new SpinalNode();

        expect(() => {
          node.hasRelation(<any>1);
        }).toThrow(TypeError);
      });
    });

    describe('How to use hasRelations', () => {
      it('should return true the node contains all the relations', async () => {
        const node = new SpinalNode();

        await Promise.all([
          node.addChild(
            DEFAULT_NODE,
            DEFAULT_RELATION_NAME,
            SPINAL_RELATION_TYPE
          ),
          node.addChild(
            DEFAULT_NODE,
            CUSTOM_RELATION_NAME1,
            SPINAL_RELATION_TYPE
          ),
        ]);

        expect(
          node.hasRelations([DEFAULT_RELATION_NAME, CUSTOM_RELATION_NAME1])
        ).toBe(true);
      });

      it("should return false if the node doesn't contain all the relations", async () => {
        const node = new SpinalNode();

        await Promise.all([
          node.addChild(
            DEFAULT_NODE,
            DEFAULT_RELATION_NAME,
            SPINAL_RELATION_TYPE
          ),
          node.addChild(
            DEFAULT_NODE,
            CUSTOM_RELATION_NAME1,
            SPINAL_RELATION_TYPE
          ),
        ]);

        expect(
          node.hasRelations([CUSTOM_RELATION_NAME1, CUSTOM_RELATION_NAME2])
        ).toBe(false);
      });

      it('should handle optional relationType', async () => {
        const node = new SpinalNode();

        await Promise.all([
          node.addChild(
            DEFAULT_NODE,
            DEFAULT_RELATION_NAME,
            SPINAL_RELATION_TYPE
          ),
          node.addChild(
            DEFAULT_NODE,
            CUSTOM_RELATION_NAME1,
            SPINAL_RELATION_TYPE
          ),
        ]);
        expect(
          node.hasRelations([DEFAULT_RELATION_NAME, CUSTOM_RELATION_NAME1])
        ).toBeTruthy();

        expect(
          node.hasRelations([CUSTOM_RELATION_NAME1, CUSTOM_RELATION_NAME2])
        ).toBeFalsy();
      });

      it('should throw an error if the relation name array is missing', () => {
        const node = new SpinalNode();

        expect(() => {
          node.hasRelations(<any>undefined);
        }).toThrow(TypeError);
      });

      it('should throw an error if the relation name array is not an array', () => {
        const node = new SpinalNode();

        expect(() => {
          node.hasRelations(<any>1);
        }).toThrow(TypeError);
      });

      it('should throw an error if on of the relation names is not a string', () => {
        const node = new SpinalNode();

        expect(() => {
          node.hasRelations(<any>[1]);
        }).toThrow(TypeError);
      });
    });

    describe('How to use getRelationNames', () => {
      it('should return no name', () => {
        const node = new SpinalNode();

        expect(node.getRelationNames()).toEqual([]);
      });

      it('should return all relation names', async () => {
        const node = new SpinalNode();
        const child1 = new SpinalNode();
        const child2 = new SpinalNode();
        const child3 = new SpinalNode();
        const child4 = new SpinalNode();
        const child5 = new SpinalNode();

        await Promise.all([
          node.addChild(
            child1,
            `${DEFAULT_RELATION_NAME}1`,
            SPINAL_RELATION_LST_PTR_TYPE
          ),
          node.addChild(
            child2,
            `${DEFAULT_RELATION_NAME}2`,
            SPINAL_RELATION_LST_PTR_TYPE
          ),
          node.addChild(
            child3,
            `${DEFAULT_RELATION_NAME}2`,
            SPINAL_RELATION_LST_PTR_TYPE
          ),
          node.addChild(
            child4,
            `${DEFAULT_RELATION_NAME}1`,
            SPINAL_RELATION_LST_PTR_TYPE
          ),
          node.addChild(
            child5,
            `${DEFAULT_RELATION_NAME}4`,
            SPINAL_RELATION_LST_PTR_TYPE
          ),
        ]);
        expect(node.getRelationNames()).toEqual([
          `${DEFAULT_RELATION_NAME}1`,
          `${DEFAULT_RELATION_NAME}2`,
          `${DEFAULT_RELATION_NAME}4`,
        ]);
      });

      it(
        "shouldn't return duplicates if there are different " +
          'relation with the same names but different types',
        async () => {
          const node = new SpinalNode();
          const child1 = new SpinalNode();
          const child2 = new SpinalNode();
          const child3 = new SpinalNode();

          await Promise.all([
            node.addChild(child1, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
            node.addChild(
              child2,
              DEFAULT_RELATION_NAME,
              SPINAL_RELATION_LST_PTR_TYPE
            ),
            node.addChild(
              child3,
              DEFAULT_RELATION_NAME,
              SPINAL_RELATION_PTR_LST_TYPE
            ),
          ]);
          expect(node.getRelationNames()).toEqual([DEFAULT_RELATION_NAME]);
        }
      );
    });
  });

  describe('How to add a child to the node', () => {
    describe('How to use addChild', () => {
      it('should add a child to the node with a relation type SPINAL_RELATION_TYPE', async () => {
        const node = new SpinalNode();

        await node.addChild(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME,
          SPINAL_RELATION_TYPE
        );
        expect(typeof node !== 'undefined').toBeTruthy();
        expect(node.hasRelation(DEFAULT_RELATION_NAME)).toBeTruthy();

        const children = await node.getChildren([DEFAULT_RELATION_NAME]);

        expect(children.length).toBe(1);
        expect(children[0].info.id.get()).toBe(DEFAULT_NODE.info.id.get());
      });

      it('should add a child to the node with a relation type SPINAL_RELATION_TYPE', async () => {
        const node = new SpinalNode();

        node.addChild(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME,
          SPINAL_RELATION_PTR_LST_TYPE
        );
        expect(typeof node !== 'undefined').toBeTruthy();
        expect(node.hasRelation(DEFAULT_RELATION_NAME)).toBeTruthy();

        const children = await node.getChildren([DEFAULT_RELATION_NAME]);

        expect(children.length).toBe(1);
        expect(children[0].info.id.get()).toBe(DEFAULT_NODE.info.id.get());
      });

      it('should add a child to the node with a relation type SPINAL_RELATION_LST_PTR_TYPE', async () => {
        const node = new SpinalNode();

        await node.addChild(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME,
          SPINAL_RELATION_LST_PTR_TYPE
        );
        expect(typeof node !== 'undefined').toBeTruthy();
        expect(node.hasRelation(DEFAULT_RELATION_NAME)).toBeTruthy();

        const children = await node.getChildren([DEFAULT_RELATION_NAME]);

        expect(children.length).toBe(1);
        expect(children[0].info.id.get()).toBe(DEFAULT_NODE.info.id.get());
      });

      it('should return the node added to the relation', async () => {
        const node = new SpinalNode();
        const childNode = new SpinalNode();
        const childModel = new Model();

        const res1 = await node.addChild(
          childNode,
          DEFAULT_RELATION_NAME,
          SPINAL_RELATION_TYPE
        );

        expect(res1.info.id.get()).toBe(childNode.info.id.get());

        const res2 = await node.addChild(
          childModel,
          DEFAULT_RELATION_NAME,
          SPINAL_RELATION_TYPE
        );
        const res2Elem = await res2.getElement();

        expect(res2Elem?.model_id).toBe(childModel.model_id);
      });

      it('should throw an error if you try to add the same node twice', async () => {
        const node = new SpinalNode();
        let error;

        await node.addChild(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME,
          SPINAL_RELATION_TYPE
        );

        try {
          await node.addChild(
            DEFAULT_NODE,
            DEFAULT_RELATION_NAME,
            SPINAL_RELATION_TYPE
          );
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });

      it('should throw an error if the child is not a model', async () => {
        const node = new SpinalNode();
        let error = false;

        try {
          await node.addChild(
            <any>[],
            DEFAULT_RELATION_NAME,
            SPINAL_RELATION_TYPE
          );
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });

      it('should throw an error if the relation name is missing', async () => {
        const node = new SpinalNode();
        let error = false;

        try {
          await node.addChild(
            DEFAULT_NODE,
            <any>undefined,
            SPINAL_RELATION_TYPE
          );
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });

      it('should throw an error if the relation name is not a string', async () => {
        const node = new SpinalNode();
        let error = false;

        try {
          await node.addChild(DEFAULT_NODE, <any>1, SPINAL_RELATION_TYPE);
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });

      it('should add a child without specifying the relation type and default to PTR_LST', async () => {
        const node = new SpinalNode();

        await node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME);
        expect(node.hasRelation(DEFAULT_RELATION_NAME)).toBeTruthy();
        expect(node.children.has(SPINAL_RELATION_PTR_LST_TYPE)).toBeTruthy();
      });

      it('should throw if the node added is itself', async () => {
        const node = new SpinalNode();
        let error = false;

        try {
          await node.addChild(
            node,
            DEFAULT_RELATION_NAME,
            SPINAL_RELATION_TYPE
          );
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });
    });

    describe('How to use addChildInContext', () => {
      it('Should add a child to a node', async () => {
        const node = new SpinalNode();
        const context = new SpinalContext();

        await node.addChildInContext(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME,
          SPINAL_RELATION_TYPE,
          context
        );
        expect(typeof node !== 'undefined').toBeTruthy();
        expect(node.hasRelation(DEFAULT_RELATION_NAME)).toBeTruthy();

        const children = await node.getChildren([DEFAULT_RELATION_NAME]);

        expect(children.length).toBe(1);
        expect(children[0].info.id.get()).toBe(DEFAULT_NODE.info.id.get());
      });

      it('Shoud add a child and associate it to the context', async () => {
        const context = new SpinalContext();
        const parent = new SpinalNode();
        const child = new SpinalNode();

        await parent.addChildInContext(
          child,
          DEFAULT_RELATION_NAME,
          SPINAL_RELATION_TYPE,
          context
        );

        expect(child.getContextIds()).toEqual([context.getId().get()]);
      });

      it('should return the node added to the relation', async () => {
        const node = new SpinalNode(DEFAULT_RELATION_NAME);
        const context = new SpinalContext();
        const childNode = new SpinalNode();
        const childModel = new Model();

        const res1 = await node.addChildInContext(
          childNode,
          DEFAULT_RELATION_NAME,
          SPINAL_RELATION_TYPE,
          context
        );

        expect(res1.info.id.get()).toBe(childNode.info.id.get());

        const res2 = await node.addChildInContext(
          childModel,
          DEFAULT_RELATION_NAME,
          SPINAL_RELATION_TYPE,
          context
        );
        const res2Elem = await res2.getElement();

        expect(res2Elem?.model_id).toBe(childModel.model_id);
      });

      it('should throw an error if you try to add the same node twice', async () => {
        const node = new SpinalNode(DEFAULT_RELATION_NAME);
        const context = new SpinalContext();
        let error = false;

        await node.addChildInContext(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME,
          SPINAL_RELATION_TYPE,
          context
        );

        try {
          await node.addChildInContext(
            DEFAULT_NODE,
            DEFAULT_RELATION_NAME,
            SPINAL_RELATION_TYPE,
            context
          );
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });

      it('should throw an error if the child is not a model', async () => {
        const node = new SpinalNode(DEFAULT_RELATION_NAME);
        const context = new SpinalContext();
        let error = false;

        try {
          await node.addChildInContext(
            <any>[],
            DEFAULT_RELATION_NAME,
            SPINAL_RELATION_TYPE,
            context
          );
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });

      it('should throw an error if the relation name is missing', async () => {
        const node = new SpinalNode();
        const context = new SpinalContext();
        let error = false;

        try {
          await node.addChildInContext(
            DEFAULT_NODE,
            <any>undefined,
            SPINAL_RELATION_TYPE,
            context
          );
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });

      it('should throw an error if the relation name is not a string', async () => {
        const node = new SpinalNode();
        const context = new SpinalContext();
        let error = false;

        try {
          await node.addChildInContext(
            DEFAULT_NODE,
            <any>1,
            SPINAL_RELATION_TYPE,
            context
          );
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });

      it('should throw an error if the relation type is missing', async () => {
        const node = new SpinalNode();
        const context = new SpinalContext();
        let error = false;

        try {
          await node.addChildInContext(
            DEFAULT_NODE,
            DEFAULT_RELATION_NAME,
            <any>undefined,
            context
          );
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });

      it('should throw an error if the relation type is invalid', async () => {
        const node = new SpinalNode();
        const context = new SpinalContext();
        let error = false;

        try {
          await node.addChildInContext(
            DEFAULT_NODE,
            DEFAULT_RELATION_NAME,
            <any>1,
            context
          );
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });

      it('should throw an error if the context is missing', async () => {
        const node = new SpinalNode();
        let error = false;

        try {
          await node.addChildInContext(
            DEFAULT_NODE,
            DEFAULT_RELATION_NAME,
            <any>SPINAL_RELATION_LST_PTR_TYPE
          );
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });

      it('should throw an error if the context is not a SpinalContext', async () => {
        const node = new SpinalNode();
        let error = false;

        try {
          await node.addChildInContext(
            DEFAULT_NODE,
            DEFAULT_RELATION_NAME,
            SPINAL_RELATION_LST_PTR_TYPE,
            <any>1
          );
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });

      it('should add a child in context with default relation type', async () => {
        const node = new SpinalNode();
        const context = new SpinalContext();

        await node.addChildInContext(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME,
          context
        );
        expect(typeof node !== 'undefined').toBeTruthy();
        expect(node.hasRelation(DEFAULT_RELATION_NAME)).toBeTruthy();
        expect(node.children.has(SPINAL_RELATION_PTR_LST_TYPE)).toBeTruthy();

        const children = await node.getChildren([DEFAULT_RELATION_NAME]);

        expect(children.length).toBe(1);
        expect(children[0].info.id.get()).toBe(DEFAULT_NODE.info.id.get());
      });
      it('should throw if the node added is itself', async () => {
        const node = new SpinalNode();
        let error = false;

        try {
          await node.addChildInContext(
            node,
            DEFAULT_RELATION_NAME,
            new SpinalContext()
          );
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });
    });
  });

  describe('How to remove child(s)', () => {
    describe('How to use removeChild', () => {
      it('should remove the child', async () => {
        const node = new SpinalNode();

        await node.addChild(node, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);
        await node.removeChild(node, DEFAULT_RELATION_NAME);

        const children = await node.getChildren([]);
        expect(children.length).toEqual(0);
      });

      it('should throw if the relation name is missing', async () => {
        const node = new SpinalNode();
        let error = false;

        try {
          await node.removeChild(node, <any>undefined);
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });

      it('should throw if the relation name is not a string', async () => {
        const node = new SpinalNode();
        let error = false;

        try {
          await node.removeChild(node, <any>1);
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });

      it("should throw if the relation doesn't exist", async () => {
        const node = new SpinalNode();
        const node2 = new SpinalNode();
        let error = false;
        await node.addChild(node2, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);

        try {
          await node.removeChild(node2, `${DEFAULT_RELATION_NAME}1`);
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();

        const children = await node.getChildren([]);
        expect(children.length).toEqual(1);
        expect(children[0].info.id.get()).toEqual(node2.info.id.get());
      });

      it('should throw if the node is missing', async () => {
        const node = new SpinalNode();
        let error = false;

        try {
          await node.removeChild(<any>undefined, DEFAULT_RELATION_NAME);
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });

      it('should throw if the node is not a child', async () => {
        const node = new SpinalNode();
        let error = false;

        try {
          await node.removeChild(node, DEFAULT_RELATION_NAME);
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });
    });

    describe('How to use removeChildren', () => {
      it('should delete all of the children', async () => {
        const parent = new SpinalNode();
        const node1 = new SpinalNode();
        const node2 = new SpinalNode();
        const node3 = new SpinalNode();

        await Promise.all([
          parent.addChild(node1, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
          parent.addChild(node2, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
          parent.addChild(node3, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
        ]);

        await parent.removeChildren(
          [node1, node2, node3],
          DEFAULT_RELATION_NAME
        );

        const children = await parent.getChildren();
        expect(children.length).toEqual(0);
      });

      it('should delete the given children', async () => {
        const parent = new SpinalNode();
        const node1 = new SpinalNode();
        const node2 = new SpinalNode();
        const node3 = new SpinalNode();

        await Promise.all([
          parent.addChild(node1, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
          parent.addChild(node2, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
          parent.addChild(node3, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
        ]);

        await parent.removeChildren([node3, node1], DEFAULT_RELATION_NAME);

        const children = await parent.getChildren();
        expect(children).toEqual([node2]);
      });

      it('should throw an error if nodes is not an array', async () => {
        const parent = new SpinalNode();
        let error = false;

        try {
          await parent.removeChildren(<any>1, DEFAULT_RELATION_NAME);
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });

      it('should throw an error if an element of nodes is not a SpinalNode', async () => {
        const parent = new SpinalNode();
        const node1 = new SpinalNode();
        let error = false;

        await Promise.all([
          parent.addChild(node1, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
        ]);

        try {
          await parent.removeChildren([node1, <any>1], DEFAULT_RELATION_NAME);
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });

      it('should throw an error if an element of nodes is not a child, but still remove valid children', async () => {
        const parent = new SpinalNode();
        const node1 = new SpinalNode();
        const node2 = new SpinalNode();
        let error = false;

        await Promise.all([
          parent.addChild(node1, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
        ]);

        try {
          await parent.removeChildren([node1, node2], DEFAULT_RELATION_NAME);
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
        const children = await parent.getChildren();
        expect(children.length).toEqual(0);
      });

      it('should throw if the relation name is missing', async () => {
        const node = new SpinalNode();
        let error = false;

        try {
          await node.removeChildren([], <any>undefined);
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });

      it('should throw if the relation name is not a string', async () => {
        const node = new SpinalNode();
        let error = false;

        try {
          await node.removeChildren([], <any>1);
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });

      it("should throw if the relation doesn't exist", async () => {
        const node = new SpinalNode();
        const child = new SpinalNode();
        let error = false;

        await node.addChild(child, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);

        try {
          await node.removeChildren([], `${DEFAULT_RELATION_NAME}1`);
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();

        error = false;
        try {
          await node.removeChildren([node], DEFAULT_RELATION_NAME);
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();

        const children = await node.getChildren([]);
        expect(children.length).toEqual(1);
        expect(children[0].info.id.get()).toEqual(child.info.id.get());
      });
    });

    describe('How to use removeRelation', () => {
      it('should remove the relation', async () => {
        const parent = new SpinalNode();
        const child = new SpinalNode();

        await parent.addChild(
          child,
          DEFAULT_RELATION_NAME,
          SPINAL_RELATION_TYPE
        );
        await parent.removeRelation(DEFAULT_RELATION_NAME);

        expect(!parent.hasRelation(DEFAULT_RELATION_NAME)).toBeTruthy();
      });

      it('should throw if the relation name is missing', async () => {
        const node = new SpinalNode();
        let error = false;

        try {
          await node.removeRelation(<any>undefined);
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });

      it('should throw if the relation name is not a string', async () => {
        const node = new SpinalNode();
        let error = false;

        try {
          await node.removeRelation(<any>node);
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });

      it("should throw if the relation doesn't exist", async () => {
        const node = new SpinalNode();
        let error = false;

        await node.addChild(node, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE);

        try {
          await node.removeRelation(`${DEFAULT_RELATION_NAME}1`);
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();

        const children = await node.getChildren([]);
        expect(children.length).toEqual(1);
        expect(children[0].info.id.get()).toEqual(node.info.id.get());
      });

      describe('remove relation + check child parent', () => {
        async function testRelationParentChild(relationType: string) {
          const parent = new SpinalNode();
          const child = new SpinalNode();

          await parent.addChild(child, DEFAULT_RELATION_NAME, relationType);
          await parent.removeRelation(DEFAULT_RELATION_NAME);

          expect(!parent.hasRelation(DEFAULT_RELATION_NAME)).toBeTruthy();
          for (const [parentRelName, parentRels] of child.parents) {
            expect(
              !(
                parentRelName === DEFAULT_RELATION_NAME &&
                parentRels.length !== 0
              )
            ).toBeTruthy();
          }
        }
        it('test remove relation on Ref', async () => {
          return testRelationParentChild(SPINAL_RELATION_TYPE);
        });
        it('test remove relation on PtrLst', async () => {
          return testRelationParentChild(SPINAL_RELATION_PTR_LST_TYPE);
        });
        it('test remove relation on LstPtr', async () => {
          return testRelationParentChild(SPINAL_RELATION_LST_PTR_TYPE);
        });
        it('test remove relation on LstPtrLst', async () => {
          return testRelationParentChild(SPINAL_RELATION_LST_PTR_LST_TYPE);
        });
      });
    });

    describe('How to use removeFromGraph', () => {
      it('should remove the node from its parents', async () => {
        const node = new SpinalNode();
        const parentNode = new SpinalNode();

        await parentNode.addChild(
          node,
          DEFAULT_RELATION_NAME,
          SPINAL_RELATION_TYPE
        );

        await node.removeFromGraph();

        const children = await parentNode.getChildren([]);
        expect(children.length).toEqual(0);
      });

      it('should remove the node from its children', async () => {
        const node = new SpinalNode();
        const parentNode = new SpinalNode();

        await parentNode.addChild(
          node,
          DEFAULT_RELATION_NAME,
          SPINAL_RELATION_TYPE
        );

        await parentNode.removeFromGraph();

        const parents = await parentNode.getParents();
        expect(parents.length).toEqual(0);
      });
    });
  });

  describe('How to get related nodes', () => {
    describe('How to use getChild', () => {
      it('should get the child', async () => {
        const parent = new SpinalNode();
        const child = new SpinalNode();

        await parent.addChild(
          child,
          DEFAULT_RELATION_NAME,
          SPINAL_RELATION_TYPE
        );

        const res = await parent.getChild(
          (node) => node === child,
          DEFAULT_RELATION_NAME
        );

        expect(res?.info.id.get()).toBe(child.info.id.get());
      });

      it('should use the relation name', async () => {
        const parent = new SpinalNode();
        const child1 = new SpinalNode();
        const child2 = new SpinalNode();
        const child3 = new SpinalNode();
        const child4 = new SpinalNode();

        await Promise.all([
          parent.addChild(
            child1,
            `${DEFAULT_RELATION_NAME}1`,
            SPINAL_RELATION_TYPE
          ),
          parent.addChild(
            child2,
            `${DEFAULT_RELATION_NAME}2`,
            SPINAL_RELATION_TYPE
          ),
          parent.addChild(
            child3,
            `${DEFAULT_RELATION_NAME}3`,
            SPINAL_RELATION_TYPE
          ),
          parent.addChild(
            child4,
            `${DEFAULT_RELATION_NAME}4`,
            SPINAL_RELATION_TYPE
          ),
        ]);

        const res = await parent.getChild(
          () => true,
          `${DEFAULT_RELATION_NAME}3`
        );

        expect(res?.info.id.get()).toBe(child3.info.id.get());
      });

      it('should use the relation type', async () => {
        const parent = new SpinalNode();
        const child1 = new SpinalNode();
        const child2 = new SpinalNode();
        const child3 = new SpinalNode();

        await Promise.all([
          parent.addChild(child1, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
          parent.addChild(
            child2,
            DEFAULT_RELATION_NAME,
            SPINAL_RELATION_LST_PTR_TYPE
          ),
          parent.addChild(
            child3,
            DEFAULT_RELATION_NAME,
            SPINAL_RELATION_PTR_LST_TYPE
          ),
        ]);

        const res = await parent.getChild(() => true, DEFAULT_RELATION_NAME);

        expect(res?.info.id.get()).toBe(child3.info.id.get());
      });

      it("should return undefined if the child doesn't exist", async () => {
        const parent = new SpinalNode();
        const child = new SpinalNode();

        await parent.addChild(
          child,
          DEFAULT_RELATION_NAME,
          SPINAL_RELATION_TYPE
        );

        const res = await parent.getChild(() => false, DEFAULT_RELATION_NAME);

        expect(typeof res).toBe('undefined');
      });

      it('should throw if the relation name is missing', async () => {
        const parent = new SpinalNode();
        const child = new SpinalNode();
        let error = false;

        await parent.addChild(
          child,
          DEFAULT_RELATION_NAME,
          SPINAL_RELATION_TYPE
        );

        try {
          await parent.getChild(() => true, <any>undefined);
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });

      it('should throw if the relation name is not a string', async () => {
        const parent = new SpinalNode();
        const child = new SpinalNode();
        let error = false;

        await parent.addChild(
          child,
          DEFAULT_RELATION_NAME,
          SPINAL_RELATION_TYPE
        );

        try {
          await parent.getChild(() => true, <any>1);
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });

      it('should throw if the relation type is missing', async () => {
        const parent = new SpinalNode();
        const child = new SpinalNode();
        let error = false;

        await parent.addChild(
          child,
          DEFAULT_RELATION_NAME,
          SPINAL_RELATION_TYPE
        );

        try {
          await parent.getChild(() => true, DEFAULT_RELATION_NAME);
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });

      it("should throw if the relation doesn't exist", async () => {
        const parent = new SpinalNode();
        const child = new SpinalNode();
        let error = false;

        await parent.addChild(
          child,
          DEFAULT_RELATION_NAME,
          SPINAL_RELATION_TYPE
        );

        try {
          await parent.getChild(() => true, `${DEFAULT_RELATION_NAME}1`);
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });

      it('should throw if the predicate is missing', async () => {
        const parent = new SpinalNode();
        const child = new SpinalNode();
        let error = false;

        await parent.addChild(
          child,
          DEFAULT_RELATION_NAME,
          SPINAL_RELATION_TYPE
        );

        try {
          await parent.getChild(<any>undefined, DEFAULT_RELATION_NAME);
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });

      it('should throw if the predicate is not a function', async () => {
        const parent = new SpinalNode();
        const child = new SpinalNode();
        let error = false;

        await parent.addChild(
          child,
          DEFAULT_RELATION_NAME,
          SPINAL_RELATION_TYPE
        );

        try {
          await parent.getChild(<any>123, DEFAULT_RELATION_NAME);
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });
    });

    describe('How to use getChildren', () => {
      it('should return no children', async () => {
        const node = new SpinalNode();
        const children = await node.getChildren([]);

        expect(children.length).toEqual(0);
      });

      it('should return some children', async () => {
        const node = new SpinalNode();
        const node2 = new SpinalNode('test', 'testtype');

        await Promise.all([
          node.addChild(
            DEFAULT_NODE,
            DEFAULT_RELATION_NAME,
            SPINAL_RELATION_TYPE
          ),
          node.addChild(node2, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
        ]);

        const children = await node.getChildren([DEFAULT_RELATION_NAME]);

        expect(children.length).toBe(2);
        expect(children[0].info.id.get()).toBe(DEFAULT_NODE.info.id.get());
        expect(children[1].info.id.get()).toBe(node2.info.id.get());
      });

      it('should return all children', async () => {
        const node = new SpinalNode();
        const node2 = new SpinalNode();
        const node3 = new SpinalNode();

        await Promise.all([
          node.addChild(node2, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
          node.addChild(
            node3,
            `${DEFAULT_RELATION_NAME}2`,
            SPINAL_RELATION_TYPE
          ),
        ]);

        const children = await node.getChildren([]);
        expect(children.length).toEqual(2);
        expect(children[0].info.id.get()).toBe(node2.info.id.get());
        expect(children[1].info.id.get()).toBe(node3.info.id.get());
      });

      it('should return all children also', async () => {
        const node = new SpinalNode();
        const node2 = new SpinalNode();
        const node3 = new SpinalNode();

        await Promise.all([
          node.addChild(node2, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
          node.addChild(
            node3,
            `${DEFAULT_RELATION_NAME}2`,
            SPINAL_RELATION_TYPE
          ),
        ]);

        const children = await node.getChildren();
        expect(children.length).toEqual(2);
        expect(children[0].info.id.get()).toBe(node2.info.id.get());
        expect(children[1].info.id.get()).toBe(node3.info.id.get());
      });

      it('should return children for one relation name passed has string', async () => {
        const node = new SpinalNode();

        await Promise.all([
          node.addChild(
            DEFAULT_NODE,
            DEFAULT_RELATION_NAME,
            SPINAL_RELATION_TYPE
          ),
          node.addChild(
            DEFAULT_NODE,
            `${DEFAULT_RELATION_NAME}2`,
            SPINAL_RELATION_TYPE
          ),
        ]);

        const children = await node.getChildren(DEFAULT_RELATION_NAME);
        expect(children.length).toEqual(1);
        expect(children[0].info.id.get()).toBe(DEFAULT_NODE.info.id.get());
      });

      it('should works with RegExp relations', async () => {
        const node = new SpinalNode();

        await Promise.all([
          node.addChild(
            DEFAULT_NODE,
            DEFAULT_RELATION_NAME,
            SPINAL_RELATION_TYPE
          ),
          node.addChild(
            DEFAULT_NODE,
            `${DEFAULT_RELATION_NAME}2`,
            SPINAL_RELATION_TYPE
          ),
        ]);

        const children = await node.getChildren(
          new RegExp(DEFAULT_RELATION_NAME)
        );
        expect(children.length).toEqual(2);
        expect(children[0].info.id.get()).toBe(DEFAULT_NODE.info.id.get());
        expect(children[1].info.id.get()).toBe(DEFAULT_NODE.info.id.get());
      });

      it('should throw an error if relationNames is neither an array, a string or omitted', async () => {
        const parent = new SpinalNode();
        let error = false;

        try {
          await parent.getChildren(<any>1);
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });

      it('should throw an error if an element of relationNames array is not a string or regExp', async () => {
        const parent = new SpinalNode();
        const node1 = new SpinalNode();
        let error = false;

        await Promise.all([
          parent.addChild(node1, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
        ]);

        try {
          await parent.getChildren([
            `${DEFAULT_RELATION_NAME}1`,
            new RegExp(`${DEFAULT_RELATION_NAME}`),
            <any>1,
          ]);
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });
    });

    describe('How to use getChildrenInContext', () => {
      it("should return the node's child", async () => {
        const context = new SpinalContext();
        const parent = new SpinalNode();
        const child = new SpinalNode();

        await parent.addChildInContext(
          child,
          DEFAULT_RELATION_NAME,
          SPINAL_RELATION_PTR_LST_TYPE,
          context
        );

        const children = await parent.getChildrenInContext(context);
        expect(children.length).toEqual(1);
        expect(children[0].info.id.get()).toBe(child.info.id.get());
      });

      it("should return the node's children associated to the context", async () => {
        const context = new SpinalContext();
        const parent = new SpinalNode();
        const child1 = new SpinalNode();
        const child2 = new SpinalNode();
        const child3 = new SpinalNode();

        await Promise.all([
          parent.addChildInContext(
            child1,
            DEFAULT_RELATION_NAME,
            SPINAL_RELATION_LST_PTR_TYPE,
            context
          ),
          parent.addChild(
            child2,
            DEFAULT_RELATION_NAME,
            SPINAL_RELATION_LST_PTR_TYPE
          ),
          parent.addChildInContext(
            child3,
            DEFAULT_RELATION_NAME,
            SPINAL_RELATION_LST_PTR_TYPE,
            context
          ),
        ]);

        const children = await parent.getChildrenInContext(context);
        expect(children.length).toEqual(2);
        expect(children[0].info.id.get()).toBe(child1.info.id.get());
        expect(children[1].info.id.get()).toBe(child3.info.id.get());
      });

      it('should throw an error if the context is missing', async () => {
        const parent = new SpinalNode();
        let error = false;

        try {
          await parent.getChildrenInContext(<any>undefined);
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });

      it('should throw an error if the context is not a SpinalContext', async () => {
        const parent = new SpinalNode();
        let error = false;

        try {
          await parent.getChildrenInContext(<any>1);
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });
    });

    describe('How to use getParents', () => {
      it('should return no parents', async () => {
        const node = new SpinalNode();
        const parents = await node.getParents([]);

        expect(parents.length).toEqual(0);
      });

      it('should return some parents', async () => {
        const parentNode1 = new SpinalNode();
        const parentNode2 = new SpinalNode();
        const childNode = new SpinalNode();

        await Promise.all([
          parentNode1.addChild(
            childNode,
            DEFAULT_RELATION_NAME,
            SPINAL_RELATION_TYPE
          ),
          parentNode2.addChild(
            childNode,
            `${DEFAULT_RELATION_NAME}2`,
            SPINAL_RELATION_TYPE
          ),
        ]);

        const parents = await childNode.getParents([DEFAULT_RELATION_NAME]);
        expect(parents.length).toEqual(1);
        expect(parents[0].info.id.get()).toBe(parentNode1.info.id.get());
      });

      it('should return one parents', async () => {
        const parentNode1 = new SpinalNode();
        const parentNode2 = new SpinalNode();
        const childNode = new SpinalNode();

        await Promise.all([
          parentNode1.addChild(
            childNode,
            DEFAULT_RELATION_NAME,
            SPINAL_RELATION_TYPE
          ),
          parentNode2.addChild(
            childNode,
            `${DEFAULT_RELATION_NAME}2`,
            SPINAL_RELATION_TYPE
          ),
        ]);

        const parents = await childNode.getParents(DEFAULT_RELATION_NAME);
        expect(parents.length).toEqual(1);
        expect(parents[0].info.id.get()).toBe(parentNode1.info.id.get());
      });

      it('should return all parents', async () => {
        const parentNode1 = new SpinalNode();
        const parentNode2 = new SpinalNode();
        const childNode = new SpinalNode();

        await Promise.all([
          parentNode1.addChild(
            childNode,
            DEFAULT_RELATION_NAME,
            SPINAL_RELATION_TYPE
          ),
          parentNode2.addChild(
            childNode,
            `${DEFAULT_RELATION_NAME}2`,
            SPINAL_RELATION_TYPE
          ),
        ]);

        const parents = await childNode.getParents([]);
        expect(parents.length).toEqual(2);
        expect(parents[0].info.id.get()).toBe(parentNode1.info.id.get());
        expect(parents[1].info.id.get()).toBe(parentNode2.info.id.get());
      });

      it('should return all parents with a certain relation name', async () => {
        const parentNode1 = new SpinalNode();
        const parentNode2 = new SpinalNode();
        const childNode = new SpinalNode();

        await Promise.all([
          parentNode1.addChild(
            childNode,
            DEFAULT_RELATION_NAME,
            SPINAL_RELATION_TYPE
          ),
          parentNode2.addChild(
            childNode,
            DEFAULT_RELATION_NAME,
            SPINAL_RELATION_TYPE
          ),
        ]);

        const parents = await childNode.getParents([]);
        expect(parents.length).toEqual(2);
        expect(parents[0].info.id.get()).toBe(parentNode1.info.id.get());
        expect(parents[1].info.id.get()).toBe(parentNode2.info.id.get());
      });

      it('should throw an error if relationNames is neither an array, a string or omitted', async () => {
        const parent = new SpinalNode();
        let error = false;

        try {
          await parent.getParents(<any>1);
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });

      // it('should throw an error if an element of relationNames is not a string', async () => {
      //   const parent = new SpinalNode();
      //   const child = new SpinalNode();
      //   let error = false;

      //   await Promise.all([
      //     parent.addChild(child, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
      //   ]);

      //   try {
      //     await child.getParents([`${DEFAULT_RELATION_NAME}1`, <any>1]);
      //   } catch (e) {
      //     error = true;
      //     expect(e instanceof Error).toBeTruthy();
      //   }
      //   expect(error).toBeTruthy();
      // });
    });
  });

  describe('How to use getChildrenGen', () => {
    it('should return a generator of the children', async () => {
      const node = new SpinalNode();
      const child1 = new SpinalNode();
      const child2 = new SpinalNode();
      const child3 = new SpinalNode();

      await Promise.all([
        node.addChild(child1, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
        node.addChild(child2, DEFAULT_RELATION_NAME, SPINAL_RELATION_TYPE),
        node.addChild(child3, 'test', SPINAL_RELATION_LST_PTR_TYPE),
      ]);

      const gen = node.getChildrenGen(DEFAULT_RELATION_NAME);
      const res1 = await gen.next();
      expect(res1.value).toBe(child1);
      expect(res1.done).toBeFalsy();

      const res2 = await gen.next();
      expect(res2.value).toBe(child2);
      expect(res2.done).toBeFalsy();

      const res3 = await gen.next();
      expect(res3.value).toBeUndefined();
      expect(res3.done).toBeTruthy();
    });
  });

  describe('How to use hasContextId', () => {
    it('should return true if the node has the context id', async () => {
      const context = new SpinalContext();
      const node = new SpinalNode();

      await context.addChildInContext(
        node,
        DEFAULT_RELATION_NAME,
        SPINAL_RELATION_TYPE
      );

      const res = node.hasContextId(context.info.id.get());
      expect(res).toBeTruthy();
    });

    it('should return false if the node does not have the context id', async () => {
      const node = new SpinalNode();
      const res = node.hasContextId('123');
      expect(res).toBeFalsy();
    });
    it('should throw an error if the context id is not a string', async () => {
      const node = new SpinalNode();
      expect(() => node.hasContextId(<any>123)).toThrow(TypeError);
    });
  });
  describe('How to use removeContextId', () => {
    it('should remove the context id from the node', async () => {
      const context = new SpinalContext();
      const node = new SpinalNode();

      await context.addChildInContext(
        node,
        DEFAULT_RELATION_NAME,
        SPINAL_RELATION_TYPE
      );

      node.removeContextId(context.info.id.get());

      const res = node.hasContextId(context.info.id.get());
      expect(res).toBeFalsy();
    });

    it('should throw an error if the context id is not a string', async () => {
      const node = new SpinalNode();
      expect(() => node.removeContextId(<any>123)).toThrow(TypeError);
    });
  });

  describe('How to use setDirectModificationDate', () => {
    it('should set the direct modification date of the node', async () => {
      const node = new SpinalNode();
      const date = new Date();

      node.setDirectModificationDate(date.getTime());

      const res = node.getDirectModificationDate().get();
      expect(res).toEqual(date.getTime());
    });

    it('should throw an error if the date is not a a number', async () => {
      const node = new SpinalNode();
      expect(() => node.setDirectModificationDate(<any>'abc')).toThrow(
        TypeError
      );
    });
  });

  describe('How to use setIndirectModificationDate', () => {
    it('should set the indirect modification date of the node', async () => {
      const node = new SpinalNode();
      const date = new Date();

      node.setIndirectModificationDate(date.getTime());

      const res = node.getIndirectModificationDate().get();
      expect(res).toEqual(date.getTime());
    });

    it('should throw an error if the date is not a a number', async () => {
      const node = new SpinalNode();
      expect(() => node.setIndirectModificationDate(<any>'abc')).toThrow(
        TypeError
      );
    });
  });
  describe('How to browse the a graph', async () => {
    const context = new SpinalContext('context', 'contextType');
    const unRelatedContext = new SpinalContext(
      'unRelatedContext',
      'contextType2'
    );
    const node = new SpinalNode('origin', 'originType');
    node.addContextId(context.info.id.get());
    const child1 = new SpinalNode('child1', 'type1');
    const child2 = new SpinalNode('child2', 'type2');
    const child3 = new SpinalNode('child3', 'type1');
    const child4 = new SpinalNode('child4', 'type3');
    const child5 = new SpinalNode('child5', 'type2');

    await Promise.all([
      node.addChildInContext(
        child1,
        DEFAULT_RELATION_NAME,
        SPINAL_RELATION_TYPE,
        unRelatedContext
      ),
      node.addChildInContext(
        child2,
        DEFAULT_RELATION_NAME,
        SPINAL_RELATION_TYPE,
        context
      ),
      child2.addChildInContext(
        child3,
        DEFAULT_RELATION_NAME,
        SPINAL_RELATION_TYPE,
        context
      ),
      child3.addChildInContext(
        child4,
        DEFAULT_RELATION_NAME,
        SPINAL_RELATION_TYPE,
        context
      ),
      child3.addChildInContext(
        child5,
        DEFAULT_RELATION_NAME + '_test',
        SPINAL_RELATION_TYPE,
        context
      ),
    ]);

    describe('How to use browseAndClassifyByType', async () => {
      it('should browse the graph and classify nodes by type', async () => {
        const res = await node.browseAndClassifyByType(DEFAULT_RELATION_NAME);
        expect(res.types).toEqual(['originType', 'type1', 'type2', 'type3']);
        expect(res.data.originType?.map((n) => n.info.id.get())).toEqual([
          node.info.id.get(),
        ]);
        expect(res.data.type1?.map((n) => n.info.id.get())).toEqual([
          child1.info.id.get(),
          child3.info.id.get(),
        ]);
        expect(res.data.type2?.map((n) => n.info.id.get())).toEqual([
          child2.info.id.get(),
        ]);
        expect(res.data.type3?.map((n) => n.info.id.get())).toEqual([
          child4.info.id.get(),
        ]);
      });

      it('should browse the graph and classify nodes by type 2', async () => {
        const res = await node.browseAndClassifyByType([
          DEFAULT_RELATION_NAME,
          DEFAULT_RELATION_NAME + '_test',
        ]);

        expect(res.types).toEqual(['originType', 'type1', 'type2', 'type3']);
        expect(res.data.originType?.map((n) => n.info.id.get())).toEqual([
          node.info.id.get(),
        ]);
        expect(res.data.type1?.map((n) => n.info.id.get())).toEqual([
          child1.info.id.get(),
          child3.info.id.get(),
        ]);
        expect(res.data.type2?.map((n) => n.info.id.get())).toEqual([
          child2.info.id.get(),
          child5.info.id.get(),
        ]);
        expect(res.data.type3?.map((n) => n.info.id.get())).toEqual([
          child4.info.id.get(),
        ]);
      });

      it('should find nothing if the relation name does not exist', async () => {
        const res = await node.browseAndClassifyByType('nonExistentRelation');
        expect(res).toEqual({
          types: ['originType'],
          data: { originType: [node] },
        });
        expect(res.types).toEqual(['originType']);
        expect(res.data.originType?.map((n) => n.info.id.get())).toEqual([
          node.info.id.get(),
        ]);
      });
    });

    describe('How to use browseAndClassifyByType in context', async () => {
      it('should browse the graph and classify nodes by type', async () => {
        const res = await node.browseAndClassifyByTypeInContext(context);
        expect(res.types).toEqual(['originType', 'type2', 'type1', 'type3']);
        expect(res.data.originType?.map((n) => n.info.id.get())).toEqual([
          node.info.id.get(),
        ]);
        expect(res.data.type2?.map((n) => n.info.id.get())).toEqual([
          child2.info.id.get(),
          child5.info.id.get(),
        ]);
        expect(res.data.type1?.map((n) => n.info.id.get())).toEqual([
          child3.info.id.get(),
        ]);
        expect(res.data.type3?.map((n) => n.info.id.get())).toEqual([
          child4.info.id.get(),
        ]);
      });

      it('should browse the graph and classify nodes by type 2', async () => {
        const res = await node.browseAndClassifyByTypeInContext(context);
        expect(res.types).toEqual(['originType', 'type2', 'type1', 'type3']);
        expect(res.data.originType?.map((n) => n.info.id.get())).toEqual([
          node.info.id.get(),
        ]);
        expect(res.data.type2?.map((n) => n.info.id.get())).toEqual([
          child2.info.id.get(),
          child5.info.id.get(),
        ]);
        expect(res.data.type1?.map((n) => n.info.id.get())).toEqual([
          child3.info.id.get(),
        ]);
        expect(res.data.type3?.map((n) => n.info.id.get())).toEqual([
          child4.info.id.get(),
        ]);
      });

      it('should find nodes in unrelated context', async () => {
        const res =
          await node.browseAndClassifyByTypeInContext(unRelatedContext);
        expect(res).toEqual({
          types: ['originType', 'type1'],
          data: { originType: [node], type1: [child1] },
        });
        expect(res.types).toEqual(['originType', 'type1']);
        expect(res.data.originType?.map((n) => n.info.id.get())).toEqual([
          node.info.id.get(),
        ]);
        expect(res.data.type1?.map((n) => n.info.id.get())).toEqual([
          child1.info.id.get(),
        ]);
      });
    });
    describe('How to use findParents', async () => {
      it('should find parents with a certain type', async () => {
        const res = await child3.findParents(
          DEFAULT_RELATION_NAME,
          (node) => node.info.type.get() === 'originType'
        );
        expect(res.length).toEqual(1);
        expect(res[0]?.info.id.get()).toEqual(node.info.id.get());
      });
      it('should find parents with a certain type 2', async () => {
        const res = await child3.findParents(
          DEFAULT_RELATION_NAME,
          (node) => node.info.type.get() === 'type2'
        );
        expect(res.length).toEqual(1);
        expect(res[0]?.info.id.get()).toEqual(child2.info.id.get());
      });
      it('should find nothing if no parent has the type', async () => {
        const res = await child3.findParents(
          DEFAULT_RELATION_NAME,
          (node) => node.info.type.get() === 'nonExistentType'
        );
        expect(res.length).toEqual(0);
      });
      it('should find all parents if predicate always returns true', async () => {
        const res = await child3.findParents(DEFAULT_RELATION_NAME);
        expect(res.length).toEqual(3);
        expect(res[0]?.info.id.get()).toEqual(child3.info.id.get());
        expect(res[1]?.info.id.get()).toEqual(child2.info.id.get());
        expect(res[2]?.info.id.get()).toEqual(node.info.id.get());
      });
      it('should stop if the stop function is called in the predicate', async () => {
        const res = await child3.findParents(
          DEFAULT_RELATION_NAME,
          (node, stop) => {
            stop!();
            return true;
          }
        );
        expect(res.length).toEqual(1);
        expect(res[0]?.info.id.get()).toEqual(child3.info.id.get());
      });

      it("should'nt work if the predicate is not a function", async () => {
        let error = false;
        try {
          await child3.findParents(DEFAULT_RELATION_NAME, 123 as any);
        } catch (e) {
          error = true;
          expect(e).toBeInstanceOf(TypeError);
        }
        expect(error).toBe(true);
      });
    });

    describe('How to use findParentsInContext', async () => {
      it('should find parents with a certain type', async () => {
        const res = await child5.findParentsInContext(context, (node) => {
          return node.info.type.get() === 'originType';
        });
        expect(res.length).toEqual(1);
        expect(res[0]?.info.id.get()).toEqual(node.info.id.get());
      });
      it('should find parents with a certain type 2', async () => {
        const res = await child3.findParentsInContext(
          context,
          (node) => node.info.type.get() === 'type2'
        );
        expect(res.length).toEqual(1);
        expect(res[0]?.info.id.get()).toEqual(child2.info.id.get());
      });
      it('should find nothing if no parent has the type', async () => {
        const res = await child3.findParentsInContext(
          context,
          (node) => node.info.type.get() === 'nonExistentType'
        );
        expect(res.length).toEqual(0);
      });
      it('should find all parents if predicate always returns true', async () => {
        const res = await child3.findParentsInContext(context, (node) => true);
        expect(res.length).toEqual(3);
        expect(res[0]?.info.id.get()).toEqual(child3.info.id.get());
        expect(res[1]?.info.id.get()).toEqual(child2.info.id.get());
        expect(res[2]?.info.id.get()).toEqual(node.info.id.get());
      });
      it('should stop if the stop function is called in the predicate', async () => {
        const res = await child3.findParentsInContext(context, (node, stop) => {
          stop!();
          return true;
        });
        expect(res.length).toEqual(1);
        expect(res[0]?.info.id.get()).toEqual(child3.info.id.get());
      });

      it('should work if the predicate is not sent', async () => {
        const res = await child3.findParentsInContext(context);
        expect(res.length).toEqual(3);
        expect(res[0]?.info.id.get()).toEqual(child3.info.id.get());
        expect(res[1]?.info.id.get()).toEqual(child2.info.id.get());
        expect(res[2]?.info.id.get()).toEqual(node.info.id.get());
      });

      it('should throw an error if the context is not a SpinalContext', async () => {
        try {
          await child3.findParentsInContext(123 as any, (node) => true);
        } catch (e) {
          expect(e).toBeInstanceOf(TypeError);
        }
      });
      it('should throw an error if the predicate is not a function', async () => {
        try {
          await child3.findParentsInContext(context, 123 as any);
        } catch (e) {
          expect(e).toBeInstanceOf(TypeError);
        }
      });
    });
    describe('How to use findOneParent', async () => {
      it('should find one parent following the predicate', async () => {
        const res = await child3.findOneParent(
          DEFAULT_RELATION_NAME,
          (node) => node.info.type.get() === 'originType'
        );
        expect(res?.info.id.get()).toEqual(node.info.id.get());
      });
    });

    describe('How to use findAsyncPredicate', async () => {
      it('should find children that the predicate matches but the predicate is async', async () => {
        const res = await node.findAsyncPredicate(
          DEFAULT_RELATION_NAME,
          async (node) => {
            return node.info.type.get() === 'type1';
          }
        );
        expect(res.length).toEqual(2);
        expect(res[0]?.info.id.get()).toEqual(child1.info.id.get());
        expect(res[1]?.info.id.get()).toEqual(child3.info.id.get());
      });
      it('should stop if the stop function is called in the predicate', async () => {
        const res = await node.findAsyncPredicate(
          DEFAULT_RELATION_NAME,
          async (node, stop) => {
            stop!();
            return true;
          }
        );
        expect(res.length).toEqual(1);
        expect(res[0]?.info.id.get()).toEqual(child1.info.id.get());
      });
    });

    describe('How to use findInContextAsyncPredicate', async () => {
      it('should find children that the predicate matches but the predicate is async', async () => {
        const res = await node.findInContextAsyncPredicate(
          context,
          async (node) => {
            return node.info.type.get() === 'type1';
          }
        );
        expect(res.length).toEqual(1);
        expect(res[0]?.info.id.get()).toEqual(child3.info.id.get());
      });
      it('should stop if the stop function is called in the predicate', async () => {
        const res = await node.findInContextAsyncPredicate(
          context,
          async (node, stop) => {
            stop!();
            return true;
          }
        );
        expect(res.length).toEqual(1);
        expect(res[0]?.info.id.get()).toEqual(child2.info.id.get());
      });
    });

    describe('How to use findByType', async () => {
      it('should find children that the type matches', async () => {
        const res = await node.findByType(DEFAULT_RELATION_NAME, 'type1');
        expect(res.length).toEqual(2);
        expect(res[0]?.info.id.get()).toEqual(child1.info.id.get());
        expect(res[1]?.info.id.get()).toEqual(child3.info.id.get());
      });
    });
    describe('How to use findInContext stop', async () => {
      it('should stop if the stop function is called in the predicate', async () => {
        const res = await node.findInContext(context, (node, stop) => {
          stop!();
          return true;
        });
        expect(res.length).toEqual(1);
        expect(res[0]?.info.id.get()).toEqual(node.info.id.get());
      });
    });

    describe('How to use findOneInContext', async () => {
      it('should find one node that the predicate matches', async () => {
        const res = await node.findOneInContext(context, (node) => {
          return node.info.type.get() === 'type1';
        });
        expect(res?.info.id.get()).toEqual(child3.info.id.get());
      });
      it('should throw an error if the predicate is not a function', async () => {
        let error = false;
        try {
          await node.findOneInContext(context, 123 as any);
        } catch (e) {
          error = true;
          expect(e).toBeInstanceOf(TypeError);
        }
        expect(error).toBe(true);
      });
      it('should return undefined if no node matches the predicate', async () => {
        const res = await node.findOneInContext(context, (node) => {
          return node.info.type.get() === 'nonExistentType';
        });
        expect(typeof res).toBe('undefined');
      });
    });
    describe('How to use findInContextByType', async () => {
      it('should find children that the type matches', async () => {
        const res = await node.findInContextByType(context, 'type1');
        expect(res.length).toEqual(1);
        expect(res[0]?.info.id.get()).toEqual(child3.info.id.get());
      });
    });

    describe('test sendEventFunc', async () => {
      it('should send an event when a child is added', async () => {
        const node_test = new SpinalNode('test', 'testType');
        const child_test = new SpinalNode('child', 'childType');
        node_test.info.add_attr('activeEventSender', true);
        spinalEventEmitter.once(ADD_CHILD_EVENT, (event: EventData) => {
          expect(event).toBeDefined();
          expect(event.nodeId).toBe(node_test.info.id.get());
          expect(event.childId).toBe(child_test.info.id.get());
        });

        await node_test.addChild(
          child_test,
          DEFAULT_RELATION_NAME,
          SPINAL_RELATION_TYPE
        );
      });
      it('should send an event when a children are removed', async () => {
        const node_test = new SpinalNode('test', 'testType');
        const child_test = new SpinalNode('child', 'childType');
        node_test.info.add_attr('activeEventSender', true);

        await node_test.addChild(
          child_test,
          DEFAULT_RELATION_NAME,
          SPINAL_RELATION_TYPE
        );
        spinalEventEmitter.once(REMOVE_CHILDREN_EVENT, (event: EventData) => {
          expect(event).toBeDefined();
          expect(event.nodeId).toBe(node_test.info.id.get());
          expect(Array.isArray(event.childrenIds)).toBeTruthy();
          expect(event.childrenIds?.length).toBe(1);
          expect(event.childrenIds?.[0]).toBe(child_test.info.id.get());
        });

        await node_test.removeChildren([child_test], DEFAULT_RELATION_NAME);
      });
    });
  });
});
