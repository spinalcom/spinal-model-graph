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

import { SpinalSet } from '../src';
import { describe, it, expect } from 'vitest';

describe('SpinalSet', () => {
  describe('How to use the constructor', () => {
    it('should create an empty set', () => {
      const set = new SpinalSet();

      expect(set.size()).toBe(0);
    });

    it('should create a set using an array', () => {
      const init = ['value', 'val'];

      const set = new SpinalSet(init);

      expect(set.has('value')).toBeTruthy();
      expect(set.has('val')).toBeTruthy();
    });

    it('should throw an error if init is not iterable', () => {
      const init: any = {};

      expect(() => {
        new SpinalSet(init);
      }).toThrow(TypeError);

      init[Symbol.iterator] = null;

      expect(() => {
        new SpinalSet(init);
      }).toThrow(TypeError);

      init[Symbol.iterator] = () => {};

      expect(() => {
        new SpinalSet(init);
      }).toThrow(TypeError);
    });

    it('should throw an error if init has bad values', () => {
      const init: any = [1];

      expect(() => {
        new SpinalSet(init);
      }).toThrow(TypeError);
    });
  });

  describe('How to use add', () => {
    it('should add a value', () => {
      const set = new SpinalSet();

      set.add('value');

      assert(set.has('value'));
    });

    it('should throw an error if the value is missing', () => {
      const set = new SpinalSet();

      expect(() => {
        set.setElement();
      }).toThrow(TypeError);
    });

    it('should throw an error if the value is not a string', () => {
      const set = new SpinalSet();

      expect(() => {
        set.setElement(1);
      }).toThrow(TypeError);
    });
  });

  describe('How to use has', () => {
    it('should return true if the value exists', () => {
      const set = new SpinalSet();

      set.add('value');

      assert(set.has('value'));
    });

    it("should return false if the value doesn't exist", () => {
      const set = new SpinalSet();

      set.add('val');

      expect(set.has('value')).toBeFalsy();
    });

    it('should throw an error if the value is not a string', () => {
      const set: any = new SpinalSet();

      expect(() => {
        set.has(1);
      }).toThrow(TypeError);
    });
  });

  describe('How to use values', () => {
    it('should return no values', () => {
      const set = new SpinalSet();

      expect(set.values()).toEqual([]);
    });

    it("should return the set's values", () => {
      const set = new SpinalSet();

      set.add('value');
      set.add('val');

      expect(set.values()).toEqual(['value', 'val']);
    });
  });

  describe('How to use delete', () => {
    it('should delete the value', () => {
      const set = new SpinalSet();

      set.add('value');
      set.add('val');

      set.delete('val');

      expect(set.has('value')).toBeTruthy();
      expect(set.has('val')).toBeFalsy();
    });

    it('should throw an error if the value is missing', () => {
      const set: any = new SpinalSet();

      expect(() => {
        set.delete();
      }).toThrow(TypeError);
    });

    it('should throw an error if the value is not a string', () => {
      const set: any = new SpinalSet();

      expect(() => {
        set.delete(4645);
      }).toThrow(TypeError);
    });

    it("should throw an error if the value doesn't exist", () => {
      const set = new SpinalSet();

      set.add('value');

      expect(() => {
        set.delete('val');
      }).toThrow(Error);

      expect(set.has('value')).toBeTruthy();
    });
  });

  describe('How to use clear', () => {
    it('should delete all the values of the set', () => {
      const set = new SpinalSet();

      set.add('value');
      set.add('val');

      set.clear();

      expect(set.size()).toBe(0);
    });
  });

  describe('How to use size', () => {
    it('should return 0 if the set is empty', () => {
      const set = new SpinalSet();

      expect(set.size()).toBe(0);
    });

    it('should return the size of the set', () => {
      const set = new SpinalSet();

      set.add('value');
      set.add('val');

      expect(set.size()).toBe(2);
    });
  });

  describe('How to use forEach', () => {
    it('should apply a function to all the values in the set', () => {
      const set = new SpinalSet();
      const arr = [];

      set.add('value');
      set.add('val');

      let i = 0;

      set.forEach((value, index) => {
        arr.push(value);
        expect(index).toBe(i);
        i += 1;
      });

      expect(arr).toEqual(['value', 'val']);
    });

    it('should throw an error if the callback is missing', () => {
      const set: any = new SpinalSet();

      expect(() => {
        set.forEach();
      }).toThrow(TypeError);
    });
  });

  describe('How to use Symbol.iterator', () => {
    it('should iterate threw all the values of the set', () => {
      const set = new SpinalSet();
      const arr = [];

      set.add('value');
      set.add('val');

      for (const value of set) {
        arr.push(value);
      }
      expect(arr).toEqual(['value', 'val']);
    });
  });
});
