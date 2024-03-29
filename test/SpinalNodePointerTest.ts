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

import { SpinalNode, SpinalNodePointer } from '../src';
import { FileSystem, Model } from 'spinal-core-connectorjs_type';
import 'mocha';
import * as assert from 'assert';
const DEFAULT_NODE = new SpinalNode('test', 'test', new Model());
const DEFAULT_MODEL = new Model();

describe('SpinalNodePointer', () => {
  describe('How to create a SpinalNodePointer', () => {
    it('should create an empty object FileSystem._sig_server === false', () => {
      FileSystem._sig_server = false;
      const rel = new SpinalNodePointer(DEFAULT_NODE);
      FileSystem._sig_server = true;

      assert(typeof rel.children === 'undefined');
    });

    it('should create a SpinalNodePointer with correct default values if a Model is given', () => {
      const ptr = new SpinalNodePointer(new Model());

      assert.strictEqual(typeof ptr.getId(), 'undefined');
      assert.strictEqual(typeof ptr.getType(), 'undefined');
    });

    it('should create a SpinalNodePointer with correct default values if a node is given', () => {
      const ptr = new SpinalNodePointer(DEFAULT_NODE);

      assert.strictEqual(ptr.getId(), DEFAULT_NODE.getId());
      assert.strictEqual(ptr.getType(), DEFAULT_NODE.getType());
    });

    it('should throw an error if no element is given', () => {
      assert.throws(() => {
        const testConstructor: any = SpinalNodePointer;
        new testConstructor();
      }, TypeError);
    });
  });

  describe('How to set/unset the pointer', () => {
    describe('How to use setElement', () => {
      it('should set an element and update pointedId and pointedType', async () => {
        const ptr = new SpinalNodePointer(DEFAULT_NODE);

        assert.strictEqual(ptr.getId(), DEFAULT_NODE.getId());
        assert.strictEqual(ptr.getType(), DEFAULT_NODE.getType());

        const elem = await ptr.load();
        assert.strictEqual(elem, DEFAULT_NODE);
      });

      it('should set an element but not update pointedId and pointedType', async () => {
        const ptr = new SpinalNodePointer(DEFAULT_MODEL);

        assert.strictEqual(typeof ptr.getId(), 'undefined');
        assert.strictEqual(typeof ptr.getType(), 'undefined');

        const elem = await ptr.load();
        assert.strictEqual(elem, DEFAULT_MODEL);
      });
    });

    describe('How to use load', () => {
      it('should load the node to which the pointer is pointing', async () => {
        const ptr = new SpinalNodePointer(DEFAULT_NODE);

        const elem = await ptr.load();
        assert.strictEqual(elem, DEFAULT_NODE);
      });
    });

    describe('How to use unset', () => {
      it('should unset the pointer', () => {
        const ptr = new SpinalNodePointer(DEFAULT_NODE);

        assert.strictEqual(ptr.getId(), DEFAULT_NODE.getId());
        assert.strictEqual(ptr.getType(), DEFAULT_NODE.getType());
        ptr.unset();
        assert.strictEqual(typeof ptr.getId(), 'undefined');
        assert.strictEqual(typeof ptr.getType(), 'undefined');
        assert.deepStrictEqual(ptr.ptr.data, {
          value: 0,
        });
      });
    });
  });

  describe('How to get information about the SpinalNodePointer', () => {
    describe('How to use getId', () => {
      it('should return the id of the pointed node', () => {
        const ptr = new SpinalNodePointer(DEFAULT_NODE);

        assert.strictEqual(ptr.getId(), DEFAULT_NODE.getId());
      });
    });

    describe('How to use getType', () => {
      it('should return the type of the pointed node', () => {
        const ptr = new SpinalNodePointer(DEFAULT_NODE);

        assert.strictEqual(ptr.getType(), DEFAULT_NODE.getType());
      });
    });
  });
});
