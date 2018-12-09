const SpinalSet = require("../build/SpinalSet").default;

const assert = require("assert");

describe("SpinalSet", function() {
  describe("How to use the constructor", function() {
    it("should create an empty set", function() {
      const map = new SpinalSet();

      assert.strictEqual(map.size(), 0);
    });

    it("should create a set using an array", function() {
      const init = [
        ["value"],
        ["val"]
      ];

      const map = new SpinalSet(init);

      assert(map.has("value"));
      assert(map.has("val"));
    });
  });

  describe("How to use add", function() {
    it("should add a value", function() {
      const set = new SpinalSet();

      set.add("value");

      assert(set.has("value"));
    });
  });

  describe("How to use has", function() {
    it("should return true if the value exists", function() {
      const set = new SpinalSet();

      set.add("value");

      assert(set.has("value"));
    });

    it("should return false if the value doesn't exist", function() {
      const set = new SpinalSet();

      set.add("val");

      assert(!set.has("value"));
    });
  });

  describe("How to use values", function() {
    it("should return no values", function() {
      const set = new SpinalSet();

      assert.deepStrictEqual(set.values(), []);
    });

    it("should return the set's values", function() {
      const set = new SpinalSet();

      set.add("value");
      set.add("val");

      assert.deepStrictEqual(set.values(), ["value", "val"]);
    });
  });

  describe("How to use delete", function() {
    it("should delete the value", function() {
      const set = new SpinalSet();

      set.add("value");
      set.add("val");

      set.delete("val");

      assert(set.has("value"));
      assert(!set.has("val"));
    });

    it("should not delete a key that doesn't exist", function() {
      const set = new SpinalSet();

      set.add("value");

      set.delete("val");

      assert(set.has("value"));
    });
  });

  describe("How to use clear", function() {
    it("should delete all the values of the set", function() {
      const set = new SpinalSet();

      set.add("value");
      set.add("val");

      set.clear();

      assert.strictEqual(set.size(), 0);
    });
  });

  describe("How to use size", function() {
    it("should return 0 if the set is empty", function() {
      const set = new SpinalSet();

      assert.strictEqual(set.size(), 0);
    });

    it("should return the size of the set", function() {
      const set = new SpinalSet();

      set.add("value");
      set.add("val");

      assert.strictEqual(set.size(), 2);
    });
  });

  describe("How to use forEach", function() {
    it("should apply a function to all the values in the set", function() {
      const set = new SpinalSet();
      const arr = [];

      set.add("value");
      set.add("val");

      set.forEach(value => arr.push(value));

      assert.deepStrictEqual(arr, ["value", "val"]);
    });
  });

  describe("How to use Symbol.iterator", function() {
    it("should iterate threw all the values of the set", function() {
      const set = new SpinalSet();
      const arr = [];

      set.add("value");
      set.add("val");

      for (let value of set) {
        arr.push(value);
      }

      assert.deepStrictEqual(arr, ["value", "val"]);
    });
  });
});
