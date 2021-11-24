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
import { FileSystem, Model } from 'spinal-core-connectorjs_type';
import 'mocha';

import * as assert from 'assert';
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

      assert(typeof node.element === 'undefined');
    });
    it('should create a graph with default values', async () => {
      const context = new SpinalGraph();

      assert.strictEqual(context.getName().get(), DEFAULT_SPINAL_GRAPH_NAME);
      assert.strictEqual(context.getType().get(), DEFAULT_SPINAL_GRAPH_TYPE);

      const element = await context.getElement();
      assert(element instanceof Model);
    });
  });

  describe('How to add a context to the graph', () => {
    it('should add a context to the context relation of the graph', async () => {
      const graph = new SpinalGraph();
      const context = new SpinalContext();

      await graph.addContext(context);

      const children = await graph.getChildren([HAS_CONTEXT_RELATION_NAME]);
      assert.deepStrictEqual(children, [context]);
    });

    it('should throw an error if the context is missing', async () => {
      const graph: any = new SpinalGraph();
      let error = false;

      try {
        await graph.addContext();
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);
    });

    it('should throw an error if the context is not a SpinalContext', async () => {
      const graph = new SpinalGraph();
      const context = new SpinalNode();
      let error = false;

      try {
        await graph.addContext(context);
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);
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
      assert.strictEqual(context, context2);
    });

    it("should return undefined if the context isn't found", async () => {
      const graph = new SpinalGraph();
      const context = await graph.getContext(DEFAULT_SPINAL_CONTEXT_NAME1);

      assert.strictEqual(context, undefined);
    });

    it('should throw an error if the name is missing', async () => {
      const graph: any = new SpinalGraph();
      let error = false;

      try {
        await graph.getContext();
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);
    });

    it('should throw an error if the name is not a string', async () => {
      const graph = new SpinalGraph();
      let error = false;

      try {
        await graph.getContext(1);
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);
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
      assert.deepStrictEqual(children, [context]);

      const parents = await context.getParents();
      assert.deepStrictEqual(parents, [graph]);
    });
  });
});
