import { SpinalSet } from '../build/SpinalSet';

import * as assert from 'assert';

describe('SpinalSet', () => {
  describe('How to use the constructor', () => {
    it('should create an empty set', () => {
      const set = new SpinalSet();

      assert.strictEqual(set.size(), 0);
    });

    it('should create a set using an array', () => {
      const init = [
        'value',
        'val',
      ];

      const set = new SpinalSet(init);

      assert(set.has('value'));
      assert(set.has('val'));
    });

    it('should throw an error if init is not iterable', () => {
      const init: any = {};

      assert.throws(() => {
        new SpinalSet(init);
      },            TypeError);

      init[Symbol.iterator] = null;

      assert.throws(() => {
        new SpinalSet(init);
      },            TypeError);

      init[Symbol.iterator] = () => {};

      assert.throws(() => {
        new SpinalSet(init);
      },            TypeError);
    });

    it('should throw an error if init has bad values', () => {
      const init: any = [1];

      assert.throws(() => {
        new SpinalSet(init);
      },            TypeError);
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

      assert.throws(() => {
        set.setElement();
      },            TypeError);
    });

    it('should throw an error if the value is not a string', () => {
      const set = new SpinalSet();

      assert.throws(() => {
        set.setElement(1);
      },            TypeError);
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

      assert(!set.has('value'));
    });

    it('should throw an error if the value is not a string', () => {
      const set: any = new SpinalSet();

      assert.throws(() => {
        set.has(1);
      },            TypeError);
    });
  });

  describe('How to use values', () => {
    it('should return no values', () => {
      const set = new SpinalSet();

      assert.deepStrictEqual(set.values(), []);
    });

    it("should return the set's values", () => {
      const set = new SpinalSet();

      set.add('value');
      set.add('val');

      assert.deepStrictEqual(set.values(), ['value', 'val']);
    });
  });

  describe('How to use delete', () => {
    it('should delete the value', () => {
      const set = new SpinalSet();

      set.add('value');
      set.add('val');

      set.delete('val');

      assert(set.has('value'));
      assert(!set.has('val'));
    });

    it('should throw an error if the value is missing', () => {
      const set: any = new SpinalSet();

      assert.throws(() => {
        set.delete();
      },            TypeError);
    });

    it('should throw an error if the value is not a string', () => {
      const set: any = new SpinalSet();

      assert.throws(() => {
        set.delete(4645);
      },            TypeError);
    });

    it("should throw an error if the value doesn't exist", () => {
      const set = new SpinalSet();

      set.add('value');

      assert.throws(() => {
        set.delete('val');
      },            Error);

      assert(set.has('value'));
    });
  });

  describe('How to use clear', () => {
    it('should delete all the values of the set', () => {
      const set = new SpinalSet();

      set.add('value');
      set.add('val');

      set.clear();

      assert.strictEqual(set.size(), 0);
    });
  });

  describe('How to use size', () => {
    it('should return 0 if the set is empty', () => {
      const set = new SpinalSet();

      assert.strictEqual(set.size(), 0);
    });

    it('should return the size of the set', () => {
      const set = new SpinalSet();

      set.add('value');
      set.add('val');

      assert.strictEqual(set.size(), 2);
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
        assert.strictEqual(index, i);
        i += 1;
      });

      assert.deepStrictEqual(arr, ['value', 'val']);
    });

    it('should throw an error if the callback is missing', () => {
      const set:any = new SpinalSet();

      assert.throws(() => {
        set.forEach();
      },            TypeError);
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

      assert.deepStrictEqual(arr, ['value', 'val']);
    });
  });
});
