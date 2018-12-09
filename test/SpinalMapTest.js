const lib = require("../build/index");
const globalType = typeof window === "undefined" ? global : window;

const SpinalMap = require("../build/SpinalMap").default;
// import SpinalMap from "../build/SpinalMap";

const assert = require("assert");

describe("SpinalMap", function() {
  describe("How to use setElement and getElement", function() {
    it("should create and set a new element", function() {
      const map = new SpinalMap();

      map.setElement("hello", "world");

      assert.strictEqual(map.getElement("hello").get(), "world");
    });

    it("set an existing element", function() {
      const map = new SpinalMap();

      map.setElement("hello", "world");
      map.setElement("hello", "everyone");

      assert.strictEqual(map.getElement("hello").get(), "everyone");
    });
  });

  describe("How to use has", function() {
    it("should return true if the key exists", function() {
      const map = new SpinalMap();

      map.setElement("hello", "world");

      assert(map.has("hello"));
    });

    it("should return false if the key doesn't exist", function() {
      const map = new SpinalMap();

      map.setElement("howdy", "world");

      assert(!map.has("hello"));
    });
  });

  describe("How to use hasKey", function() {
    it("should return true if the map has any key", function() {
      const map = new SpinalMap();

      map.setElement("hello", "world");

      assert(map.hasKey());
    });

    it("should return false if the map has no key", function() {
      const map = new SpinalMap();

      assert(!map.hasKey());
    });
  });

  describe("How to use keys", function() {
    it("should return no keys", function() {
      const map = new SpinalMap();

      assert.deepStrictEqual(map.keys(), []);
    });

    it("should return the map's keys", function() {
      const map = new SpinalMap();

      map.setElement("hello", "world");
      map.setElement("bye", "inexistance");

      assert.deepStrictEqual(map.keys(), ["hello", "bye"]);
    });
  });

  describe("How to use delete", function() {
    it("should delete the key and its value", function() {
      const map = new SpinalMap();

      map.setElement("hello", "world");
      map.setElement("bye", "inexistance");

      map.delete("bye");

      assert(map.has("hello"));
      assert(!map.has("bye"));
    });

    it("should not delete a key that doesn't exist", function() {
      const map = new SpinalMap();

      map.setElement("hello", "world");

      map.delete("bye");

      assert(map.has("hello"));
    });
  });

  describe("How to use clear", function() {
    it("should delete all the keys of the map", function() {
      const map = new SpinalMap();

      map.setElement("hello", "world");
      map.setElement("bye", "inexistance");

      map.clear();

      assert(!map.hasKey());
    });
  });

  describe("How to use forEach", function() {
    it("should apply a function to all the values in the map", function() {
      const map = new SpinalMap();
      const arr = [];

      map.setElement("hello", "world");
      map.setElement("bye", "inexistance");

      map.forEach(value => arr.push(value.get()));

      assert.deepStrictEqual(arr, ["world", "inexistance"]);
    });
  });

  describe("How to use Symbol.iterator", function() {
    it("should iterate threw all the values of the map", function() {
      const map = new SpinalMap();
      const arr = [];

      map.setElement("hello", "world");
      map.setElement("bye", "inexistance");

      for (let value of map) {
        arr.push(value.get());
      }

      assert.deepStrictEqual(arr, ["world", "inexistance"]);
    });
  });
});
