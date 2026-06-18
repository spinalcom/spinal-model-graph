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
  SPINAL_RELATION_LST_PTR_TYPE,
  SpinalRelationLstPtr,
  SpinalRelationRef,
} from '../../src';
import { Model, Str } from 'spinal-core-connectorjs';
import { describe, it, expect } from 'vitest';

const DEFAULT_RELATION_NAME = 'relationName';
const DEFAULT_NODE = new SpinalNode();

describe('BaseSpinalRelation with SpinalRelationRef', () => {
  describe('How to use the constructor', () => {
    it('should create a new relation with a name and node parent', async () => {
      const parent = new SpinalNode<any>();
      const rel = new SpinalRelationRef(parent, DEFAULT_RELATION_NAME);

      expect(rel.getName().get()).toBe(DEFAULT_RELATION_NAME);
      expect(await rel.getParent()).toBe(parent);
      expect(rel.getId() instanceof Str).toBeTruthy();
    });

    it('should create a new relation with a name and a context parent', async () => {
      const parent = new SpinalContext();
      const rel = new SpinalRelationRef(parent, DEFAULT_RELATION_NAME);

      expect(rel.getName().get()).toBe(DEFAULT_RELATION_NAME);
      expect(await rel.getParent()).toBe(parent);
      expect(rel.getId() instanceof Str).toBeTruthy();
    });

    it('should create a new relation with a name and a graph parent', async () => {
      const parent = new SpinalGraph();
      const rel = new SpinalRelationRef(parent, DEFAULT_RELATION_NAME);

      expect(rel.getName().get()).toBe(DEFAULT_RELATION_NAME);
      expect(await rel.getParent()).toBe(parent);
      expect(rel.getId() instanceof Str).toBeTruthy();
    });

    it('should throw an error if the parent or the name is missing', async () => {
      expect(() => {
        new SpinalRelationRef();
      }).toThrow(TypeError);

      expect(() => {
        new SpinalRelationRef(undefined, DEFAULT_RELATION_NAME);
      }).toThrow(TypeError);

      expect(() => {
        new SpinalRelationRef(DEFAULT_NODE);
      }).toThrow(TypeError);
    });

    it('should throw an error if the name is not a string', async () => {
      expect(() => {
        new SpinalRelationRef(DEFAULT_NODE, <any>1);
      }).toThrow(TypeError);
    });

    it('should throw an error if the parent is not a SpinalNode', async () => {
      expect(() => {
        new SpinalRelationRef(<any>[], DEFAULT_RELATION_NAME);
      }).toThrow(TypeError);

      const parent2 = new Model();
      expect(() => {
        new SpinalRelationRef(<any>parent2, DEFAULT_RELATION_NAME);
      }).toThrow(TypeError);
    });
  });

  describe('How to get/set information about the relation', () => {
    describe('How to use getName', () => {
      it('should return the name DEFAULT_RELATION_NAME', () => {
        const rel = new SpinalRelationRef(DEFAULT_NODE, DEFAULT_RELATION_NAME);
        expect(rel.getName().get()).toBe(DEFAULT_RELATION_NAME);
      });
    });

    describe('How to use getParent', () => {
      it('should return the parent of the relation', async () => {
        const rel = new SpinalRelationRef(DEFAULT_NODE, DEFAULT_RELATION_NAME);

        expect(await rel.getParent()).toBe(DEFAULT_NODE);
      });
    });
  });

  describe('How to use addContextIds and getContextIds', () => {
    it('should get the ids of the associated contexts', () => {
      const relation = new SpinalRelationRef(
        DEFAULT_NODE,
        DEFAULT_RELATION_NAME
      );
      const contextId1 = new SpinalContext().getId().get();
      const contextId2 = new SpinalContext().getId().get();

      relation.addContextId(contextId1);

      expect(relation.getContextIds()).toEqual([contextId1]);

      relation.addContextId(contextId1);
      relation.addContextId(contextId2);

      expect(relation.getContextIds()).toEqual([contextId1, contextId2]);
    });

    it('should throw an error if the contextId is missing', () => {
      const relation: any = new SpinalRelationRef(
        DEFAULT_NODE,
        DEFAULT_RELATION_NAME
      );

      expect(() => {
        relation.addContextId();
      }).toThrow(TypeError);
    });

    it('should throw an error if the contextId is not a string', () => {
      const relation = new SpinalRelationRef(
        DEFAULT_NODE,
        DEFAULT_RELATION_NAME
      );
      const badContextId1 = new SpinalContext().getId();

      expect(() => {
        relation.addContextId(<any>badContextId1);
      }).toThrow(TypeError);
    });
  });

  describe('How to use belongsToContext', () => {
    it('should return true', async () => {
      const context = new SpinalContext();
      const relation = new SpinalRelationRef(
        DEFAULT_NODE,
        DEFAULT_RELATION_NAME
      );

      relation.addContextId(context.getId().get());

      expect(relation.belongsToContext(context)).toBeTruthy();
    });

    it('should return false', () => {
      const context = new SpinalContext();
      const relation = new SpinalRelationRef(
        DEFAULT_NODE,
        DEFAULT_RELATION_NAME
      );

      expect(relation.belongsToContext(context)).toBeFalsy();
    });

    it('should throw an error if no context is passed', () => {
      const relation = new SpinalRelationRef(
        DEFAULT_NODE,
        DEFAULT_RELATION_NAME
      );

      expect(() => {
        relation.belongsToContext(<any>undefined);
      }).toThrow(TypeError);
    });

    it('should throw an error if the context as the wrong type', () => {
      const context1 = {};
      const relation = new SpinalRelationRef(
        DEFAULT_NODE,
        DEFAULT_RELATION_NAME
      );

      expect(() => {
        relation.belongsToContext(<any>context1);
      }).toThrow(TypeError);

      const context2 = new SpinalNode();

      expect(() => {
        relation.belongsToContext(context2);
      }).toThrow(TypeError);
    });
  });

  describe('How to use removeContextId', () => {
    it('should remove the contextId', () => {
      const relation = new SpinalRelationRef(
        DEFAULT_NODE,
        DEFAULT_RELATION_NAME
      );
      const contextId1 = new SpinalContext().getId().get();
      const contextId2 = new SpinalContext().getId().get();

      relation.addContextId(contextId1);
      relation.addContextId(contextId2);

      expect(relation.getContextIds()).toEqual([contextId1, contextId2]);

      relation.removeContextId(contextId1);

      expect(relation.getContextIds()).toEqual([contextId2]);
    });

    it('should throw an error if the contextId is missing', () => {
      const relation: any = new SpinalRelationRef(
        DEFAULT_NODE,
        DEFAULT_RELATION_NAME
      );

      expect(() => {
        relation.removeContextId();
      }).toThrow(TypeError);
    });

    it('should throw an error if the contextId is not a string', () => {
      const relation = new SpinalRelationRef(
        DEFAULT_NODE,
        DEFAULT_RELATION_NAME
      );
      const badContextId1 = new SpinalContext().getId();

      expect(() => {
        relation.removeContextId(<any>badContextId1);
      }).toThrow(TypeError);
    });

    it('should not do anything if the contextId is not in the relation', () => {
      const relation = new SpinalRelationRef(
        DEFAULT_NODE,
        DEFAULT_RELATION_NAME
      );
      const contextId1 = new SpinalContext().getId().get();
      const contextId2 = new SpinalContext().getId().get();

      relation.addContextId(contextId1);

      expect(relation.getContextIds()).toEqual([contextId1]);

      relation.removeContextId(contextId2);

      expect(relation.getContextIds()).toEqual([contextId1]);
    });
  });

  describe('How to remove from the graph', () => {
    describe('How to use removeChildren', () => {
      it('should delete all of the children', async () => {
        const rel = new SpinalRelationLstPtr(
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
        const rel = new SpinalRelationLstPtr(
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
        const rel = new SpinalRelationLstPtr(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );
        const node1 = new SpinalNode();
        const node2 = new SpinalNode();
        const node3 = new SpinalNode();
        const node4 = new SpinalNode();
        let error = false;

        await Promise.all([
          rel.addChild(node1),
          rel.addChild(node2),
          rel.addChild(node3),
        ]);

        try {
          await rel.removeChildren([node3, node1, node4]);
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();

        const children = await rel.getChildren();
        expect(children).toEqual([node2]);
      });

      it('should throw an error if nodes is not an array', async () => {
        const relation = new SpinalRelationRef(
          DEFAULT_NODE,
          DEFAULT_RELATION_NAME
        );
        let error = false;

        try {
          await relation.removeChildren(<any>{});
        } catch (e) {
          error = true;
          expect(e instanceof Error).toBeTruthy();
        }
        expect(error).toBeTruthy();
      });
    });

    describe('How to use removeFromGraph', () => {
      it('should delete all of the children', async () => {
        const rel = new SpinalRelationLstPtr(
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

      it('should the relation from the parent pointer', async () => {
        const parent = new SpinalNode();
        const rel = parent._createRelation(
          DEFAULT_RELATION_NAME,
          SPINAL_RELATION_LST_PTR_TYPE
        );

        await rel.removeFromGraph();
        expect(
          parent.hasRelation(
            DEFAULT_RELATION_NAME,
            SPINAL_RELATION_LST_PTR_TYPE
          )
        ).toBeFalsy();
      });
    });
  });
});
