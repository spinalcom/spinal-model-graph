const SpinalMap = require("../build/SpinalMap").default;

const assert = require("assert");

describe("SpinalMap", function() {
  describe("How to use the constructor", function() {
    it("should create an empty map", function() {
      const map = new SpinalMap();

      assert(!map.hasKey());
    });

    it("should create a map using an array", function() {
      const init = [
        ["key", "value"],
        ["hello", "world"]
      ];

      const map = new SpinalMap(init);

      assert(map.has("key"));
      assert.strictEqual(map.getElement("key").get(), "value");
      assert(map.has("hello"));
      assert.strictEqual(map.getElement("hello").get(), "world");
    });

    it("should throw an error if init is not iterable", function() {
      const init = {}
      let error = false;

      try {
        new SpinalMap(init);
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);

      init[Symbol.iterator] = null;

      error = false;
      try {
        new SpinalMap(init);
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);

      init[Symbol.iterator] = () => {};

      error = false;
      try {
        new SpinalMap(init);
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);
    });

    it("should throw an error if init has bad values", function() {
      let init = [1]
      let error = false;

      try {
        new SpinalMap(init);
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);

      init = [
        []
      ]
      error = false;

      try {
        new SpinalMap(init);
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);

      init = [
        [1]
      ]
      error = false;

      try {
        new SpinalMap(init);
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);
    });
  });

  describe("How to use setElement and getElement", function() {
    it("should create and set a new element", function() {
      const map = new SpinalMap();

      map.setElement("hello", "world");

      assert.strictEqual(map.getElement("hello").get(), "world");
    });

    it("should set an existing element", function() {
      const map = new SpinalMap();

      map.setElement("hello", "world");
      map.setElement("hello", "everyone");

      assert.strictEqual(map.getElement("hello").get(), "everyone");
    });

    it("should throw an error if the key is missing", function() {
      const map = new SpinalMap();
      let error = false;

      try {
        map.setElement();
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);
    });

    it("should throw an error if the key is not a string", function() {
      const map = new SpinalMap();
      let error = false;

      try {
        map.setElement(1);
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);
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

    it("should throw an error if the key is not a string", function() {
      const map = new SpinalMap();
      let error = false;

      try {
        map.has(1);
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);
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

  describe("How to use entries", function() {
    it("should return an empty array", function() {
      const map = new SpinalMap();

      assert.deepStrictEqual(map.entries(), []);
    });

    it("should return the map's entries", function() {
      const map = new SpinalMap();

      map.setElement("hello", "world");
      map.setElement("bye", "inexistance");

      assert.deepStrictEqual(map.entries(), [
        ["hello", map.getElement("hello")],
        ["bye", map.getElement("bye")]
      ]);
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

    it("should throw an error if the key is missing", function() {
      const map = new SpinalMap();
      let error = false;

      try {
        map.delete();
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);
    });

    it("should throw an error if the key is not a string", function() {
      const map = new SpinalMap();
      let error = false;

      try {
        map.delete(1);
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);
    });

    it("should throw an error if the key doesn't exist", function() {
      const map = new SpinalMap();
      let error = false;

      map.setElement("hello", "world");

      try {
        map.delete("bye");
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);

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

    it("should throw an error if the callback is missing", function() {
      const map = new SpinalMap();
      let error = false;

      try {
        map.forEach();
      } catch (e) {
        error = true;
        assert(e instanceof Error);
      }
      assert(error);
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
