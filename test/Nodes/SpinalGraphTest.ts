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

import { SpinalGraph, SpinalNode, SpinalContext } from '../../src';
import { FileSystem, Model } from 'spinal-core-connectorjs';
import { describe, it, expect } from 'vitest';

const DEFAULT_SPINAL_GRAPH_NAME = 'undefined';
const DEFAULT_SPINAL_GRAPH_TYPE = 'SpinalGraph';
const DEFAULT_SPINAL_CONTEXT_NAME1 = 'SpinalContext1';
const DEFAULT_SPINAL_CONTEXT_NAME2 = 'SpinalContext2';
const HAS_CONTEXT_RELATION_NAME = 'hasContext';

describe('SpinalGraph', () => {
  describe('How to use the constructor', () => {
    it('should create an empty object FileSystem._sig_server === false', () => {
      FileSystem._sig_server = false;
      const node = new SpinalGraph();
      FileSystem._sig_server = true;

      expect(typeof node.element === 'undefined').toBeTruthy();
    });
    it('should create a graph with default values', async () => {
      const context = new SpinalGraph();

      expect(context.getName().get()).toBe(DEFAULT_SPINAL_GRAPH_NAME);
      expect(context.getType().get()).toBe(DEFAULT_SPINAL_GRAPH_TYPE);

      const element = await context.getElement();
      expect(element instanceof Model).toBeTruthy();
    });
  });

  describe('How to add a context to the graph', () => {
    it('should add a context to the context relation of the graph', async () => {
      const graph = new SpinalGraph();
      const context = new SpinalContext();

      await graph.addContext(context);

      const children = await graph.getChildren([HAS_CONTEXT_RELATION_NAME]);
      expect(children.map((child) => child.info.id.get())).toEqual([
        context.info.id.get(),
      ]);
    });

    it('should throw an error if the context is missing', async () => {
      const graph: any = new SpinalGraph();
      let error = false;

      try {
        await graph.addContext();
      } catch (e) {
        error = true;
        expect(e instanceof Error).toBeTruthy();
      }
      expect(error).toBeTruthy();
    });

    it('should throw an error if the context is not a SpinalContext', async () => {
      const graph = new SpinalGraph();
      const context = new SpinalNode();
      let error = false;

      try {
        await graph.addContext(context);
      } catch (e) {
        error = true;
        expect(e instanceof Error).toBeTruthy();
      }
      expect(error).toBeTruthy();
    });
  });

  describe('How to use getContext', () => {
    it('should get a context using its name', async () => {
      const graph = new SpinalGraph();
      const context1 = new SpinalContext(DEFAULT_SPINAL_CONTEXT_NAME1);
      const context2 = new SpinalContext(DEFAULT_SPINAL_CONTEXT_NAME2);

      await Promise.all([
        graph.addContext(context1),
        graph.addContext(context2),
      ]);

      const context = await graph.getContext(DEFAULT_SPINAL_CONTEXT_NAME2);
      expect(context?.info.id.get()).toBe(context2.info.id.get());
    });

    it("should return undefined if the context isn't found", async () => {
      const graph = new SpinalGraph();
      const context = await graph.getContext(DEFAULT_SPINAL_CONTEXT_NAME1);

      expect(typeof context === 'undefined').toBeTruthy();
    });

    it('should throw an error if the name is missing', async () => {
      const graph: any = new SpinalGraph();
      let error = false;

      try {
        await graph.getContext();
      } catch (e) {
        error = true;
        expect(e instanceof Error).toBeTruthy();
      }
      expect(error).toBeTruthy();
    });

    it('should throw an error if the name is not a string', async () => {
      const graph = new SpinalGraph();
      let error = false;

      try {
        await graph.getContext(<any>1);
      } catch (e) {
        error = true;
        expect(e instanceof Error).toBeTruthy();
      }
      expect(error).toBeTruthy();
    });
  });

  describe('How to use removeFromGraph', () => {
    it('should do nothing', async () => {
      const graph = new SpinalGraph();

      await graph.removeFromGraph();
    });

    it("shouldn't remove children", async () => {
      const graph = new SpinalGraph();
      const context = new SpinalContext();

      await graph.addContext(context);
      await graph.removeFromGraph();

      const children = await graph.getChildren();
      expect(children.map((child) => child.info.id.get())).toEqual([
        context.info.id.get(),
      ]);

      const parents = await context.getParents();
      expect(parents.map((parent) => parent.info.id.get())).toEqual([
        graph.info.id.get(),
      ]);
    });
  });
});
