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

import { SpinalMap } from '../src';
import { describe, it, expect } from 'vitest';

describe('SpinalMap', () => {
  describe('How to use the constructor', () => {
    it('should create an empty map', () => {
      const map = new SpinalMap();

      expect(map.hasKey()).toBeFalsy();
    });

    it('should create a map using an array', () => {
      const init: [string, string][] = [
        ['key', 'value'],
        ['hello', 'world'],
      ];

      const map = new SpinalMap(init);

      expect(map.has('key')).toBeTruthy();
      expect(map.getElement('key').get()).toBe('value');
      expect(map.has('hello')).toBeTruthy();
      expect(map.getElement('hello').get()).toBe('world');
    });

    it('should throw an error if init is not iterable', () => {
      const init: any = {};

      expect(() => {
        new SpinalMap(init);
      }).toThrow(TypeError);

      init[Symbol.iterator] = null;

      expect(() => {
        new SpinalMap(init);
      }).toThrow(TypeError);

      init[Symbol.iterator] = () => {};

      expect(() => {
        new SpinalMap(init);
      }).toThrow(TypeError);
    });

    it('should throw an error if init has bad values', () => {
      const init: any = [1];
      expect(() => {
        new SpinalMap(init);
      }).toThrow(TypeError);
    });
    it('should throw an error if init has bad values 2', () => {
      const init: any = [[]];
      expect(() => {
        new SpinalMap(init);
      }).toThrow(TypeError);
    });
    it('should throw an error if init has bad values 3', () => {
      const init: any = [[1]];
      expect(() => {
        new SpinalMap(init);
      }).toThrow(TypeError);
    });
  });

  describe('How to use setElement and getElement', () => {
    it('should create and set a new element', () => {
      const map = new SpinalMap();

      map.setElement('hello', 'world');

      expect(map.getElement('hello').get()).toBe('world');
    });

    it('should set an existing element', () => {
      const map = new SpinalMap();

      map.setElement('hello', 'world');
      map.setElement('hello', 'everyone');

      expect(map.getElement('hello').get()).toBe('everyone');
    });

    it('should throw an error if the key is missing', () => {
      const map: any = new SpinalMap();

      expect(() => {
        map.setElement();
      }).toThrow(TypeError);
    });

    it('should throw an error if the key is not a string', () => {
      const map: any = new SpinalMap();

      expect(() => {
        map.setElement(1);
      }).toThrow(TypeError);
    });
    it('should throw an error if the value is missing', () => {
      const map: any = new SpinalMap();

      expect(() => {
        map.setElement('hello');
      }).toThrow(TypeError);
    });
  });

  describe('How to use has', () => {
    it('should return true if the key exists', () => {
      const map = new SpinalMap();

      map.setElement('hello', 'world');

      expect(map.has('hello')).toBeTruthy();
    });

    it("should return false if the key doesn't exist", () => {
      const map = new SpinalMap();

      map.setElement('howdy', 'world');

      expect(map.has('hello')).toBeFalsy();
    });

    it('should throw an error if the key is not a string', () => {
      const map: any = new SpinalMap();

      expect(() => {
        map.has(1);
      }).toThrow(TypeError);
    });
  });

  describe('How to use hasKey', () => {
    it('should return true if the map has any key', () => {
      const map = new SpinalMap();

      map.setElement('hello', 'world');

      expect(map.hasKey()).toBeTruthy();
    });

    it('should return false if the map has no key', () => {
      const map = new SpinalMap();

      expect(map.hasKey()).toBeFalsy();
    });
  });

  describe('How to use keys', () => {
    it('should return no keys', () => {
      const map = new SpinalMap();

      expect(map.keys()).toEqual([]);
    });

    it("should return the map's keys", () => {
      const map = new SpinalMap();

      map.setElement('hello', 'world');
      map.setElement('bye', 'inexistance');

      expect(map.keys()).toEqual(['hello', 'bye']);
    });
  });

  describe('How to use entries', () => {
    it('should return an empty array', () => {
      const map = new SpinalMap();

      expect(map.entries()).toEqual([]);
    });

    it("should return the map's entries", () => {
      const map = new SpinalMap();

      map.setElement('hello', 'world');
      map.setElement('bye', 'inexistance');

      expect(map.entries()).toEqual([
        ['hello', map.getElement('hello')],
        ['bye', map.getElement('bye')],
      ]);
    });
  });

  describe('How to use delete', () => {
    it('should delete the key and its value', () => {
      const map = new SpinalMap();

      map.setElement('hello', 'world');
      map.setElement('bye', 'inexistance');

      map.delete('bye');

      expect(map.has('hello')).toBeTruthy();
      expect(map.has('bye')).toBeFalsy();
    });

    it('should throw an error if the key is missing', () => {
      const map: any = new SpinalMap();

      expect(() => {
        map.delete();
      }).toThrow(TypeError);
    });

    it('should throw an error if the key is not a string', () => {
      const map: any = new SpinalMap();

      expect(() => {
        map.delete(1);
      }).toThrow(TypeError);
    });

    it("should throw an error if the key doesn't exist", () => {
      const map: any = new SpinalMap();

      map.setElement('hello', 'world');

      expect(() => {
        map.delete('bye');
      }).toThrow(Error);

      expect(map.has('hello')).toBeTruthy();
    });
  });

  describe('How to use clear', () => {
    it('should delete all the keys of the map', () => {
      const map = new SpinalMap();

      map.setElement('hello', 'world');
      map.setElement('bye', 'inexistance');

      map.clear();

      expect(map.hasKey()).toBeFalsy();
    });
  });

  describe('How to use forEach', () => {
    it('should apply a function to all the values and keys in the map', () => {
      const map = new SpinalMap();
      const keys: string[] = [];
      const values: string[] = [];

      map.setElement('hello', 'world');
      map.setElement('bye', 'inexistance');

      map.forEach((value, key) => {
        keys.push(key);
        values.push(value.get());
      });

      expect(keys).toEqual(['hello', 'bye']);
      expect(values).toEqual(['world', 'inexistance']);
    });

    it('should throw an error if the callback is missing', () => {
      const map: any = new SpinalMap();

      expect(() => {
        map.forEach();
      }).toThrow(TypeError);
    });
  });

  describe('How to use Symbol.iterator', () => {
    it('should iterate threw all the keys and values of the map', () => {
      const map = new SpinalMap();
      const keys = [];
      const values = [];

      map.setElement('hello', 'world');
      map.setElement('bye', 'inexistance');

      for (const [key, value] of map) {
        keys.push(key);
        values.push(value.get());
      }

      expect(keys).toEqual(['hello', 'bye']);
      expect(values).toEqual(['world', 'inexistance']);
    });
  });
});
