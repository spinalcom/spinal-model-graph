"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
exports.__esModule = true;
var src_1 = require("../src");
var assert = require("assert");
describe('SpinalMap', function () {
    describe('How to use the constructor', function () {
        it('should create an empty map', function () {
            var map = new src_1.SpinalMap();
            assert(!map.hasKey());
        });
        it('should create a map using an array', function () {
            var init = [
                ['key', 'value'],
                ['hello', 'world'],
            ];
            var map = new src_1.SpinalMap(init);
            assert(map.has('key'));
            assert.strictEqual(map.getElement('key').get(), 'value');
            assert(map.has('hello'));
            assert.strictEqual(map.getElement('hello').get(), 'world');
        });
        it('should throw an error if init is not iterable', function () {
            var init = {};
            assert.throws(function () {
                new src_1.SpinalMap(init);
            }, TypeError);
            init[Symbol.iterator] = null;
            assert.throws(function () {
                new src_1.SpinalMap(init);
            }, TypeError);
            init[Symbol.iterator] = function () { };
            assert.throws(function () {
                new src_1.SpinalMap(init);
            }, TypeError);
        });
        it('should throw an error if init has bad values', function () {
            var init = [1];
            assert.throws(function () {
                new src_1.SpinalMap(init);
            }, TypeError);
            init = [
                [],
            ];
            assert.throws(function () {
                new src_1.SpinalMap(init);
            }, TypeError);
            init = [
                [1],
            ];
            assert.throws(function () {
                new src_1.SpinalMap(init);
            }, TypeError);
        });
    });
    describe('How to use setElement and getElement', function () {
        it('should create and set a new element', function () {
            var map = new src_1.SpinalMap();
            map.setElement('hello', 'world');
            assert.strictEqual(map.getElement('hello').get(), 'world');
        });
        it('should set an existing element', function () {
            var map = new src_1.SpinalMap();
            map.setElement('hello', 'world');
            map.setElement('hello', 'everyone');
            assert.strictEqual(map.getElement('hello').get(), 'everyone');
        });
        it('should throw an error if the key is missing', function () {
            var map = new src_1.SpinalMap();
            assert.throws(function () {
                map.setElement();
            }, TypeError);
        });
        it('should throw an error if the key is not a string', function () {
            var map = new src_1.SpinalMap();
            assert.throws(function () {
                map.setElement(1);
            }, TypeError);
        });
    });
    describe('How to use has', function () {
        it('should return true if the key exists', function () {
            var map = new src_1.SpinalMap();
            map.setElement('hello', 'world');
            assert(map.has('hello'));
        });
        it("should return false if the key doesn't exist", function () {
            var map = new src_1.SpinalMap();
            map.setElement('howdy', 'world');
            assert(!map.has('hello'));
        });
        it('should throw an error if the key is not a string', function () {
            var map = new src_1.SpinalMap();
            assert.throws(function () {
                map.has(1);
            }, TypeError);
        });
    });
    describe('How to use hasKey', function () {
        it('should return true if the map has any key', function () {
            var map = new src_1.SpinalMap();
            map.setElement('hello', 'world');
            assert(map.hasKey());
        });
        it('should return false if the map has no key', function () {
            var map = new src_1.SpinalMap();
            assert(!map.hasKey());
        });
    });
    describe('How to use keys', function () {
        it('should return no keys', function () {
            var map = new src_1.SpinalMap();
            assert.deepStrictEqual(map.keys(), []);
        });
        it("should return the map's keys", function () {
            var map = new src_1.SpinalMap();
            map.setElement('hello', 'world');
            map.setElement('bye', 'inexistance');
            assert.deepStrictEqual(map.keys(), ['hello', 'bye']);
        });
    });
    describe('How to use entries', function () {
        it('should return an empty array', function () {
            var map = new src_1.SpinalMap();
            assert.deepStrictEqual(map.entries(), []);
        });
        it("should return the map's entries", function () {
            var map = new src_1.SpinalMap();
            map.setElement('hello', 'world');
            map.setElement('bye', 'inexistance');
            assert.deepStrictEqual(map.entries(), [
                ['hello', map.getElement('hello')],
                ['bye', map.getElement('bye')],
            ]);
        });
    });
    describe('How to use delete', function () {
        it('should delete the key and its value', function () {
            var map = new src_1.SpinalMap();
            map.setElement('hello', 'world');
            map.setElement('bye', 'inexistance');
            map["delete"]('bye');
            assert(map.has('hello'));
            assert(!map.has('bye'));
        });
        it('should throw an error if the key is missing', function () {
            var map = new src_1.SpinalMap();
            assert.throws(function () {
                map["delete"]();
            }, TypeError);
        });
        it('should throw an error if the key is not a string', function () {
            var map = new src_1.SpinalMap();
            assert.throws(function () {
                map["delete"](1);
            }, TypeError);
        });
        it("should throw an error if the key doesn't exist", function () {
            var map = new src_1.SpinalMap();
            map.setElement('hello', 'world');
            assert.throws(function () {
                map["delete"]('bye');
            }, Error);
            assert(map.has('hello'));
        });
    });
    describe('How to use clear', function () {
        it('should delete all the keys of the map', function () {
            var map = new src_1.SpinalMap();
            map.setElement('hello', 'world');
            map.setElement('bye', 'inexistance');
            map.clear();
            assert(!map.hasKey());
        });
    });
    describe('How to use forEach', function () {
        it('should apply a function to all the values and keys in the map', function () {
            var map = new src_1.SpinalMap();
            var keys = [];
            var values = [];
            map.setElement('hello', 'world');
            map.setElement('bye', 'inexistance');
            map.forEach(function (value, key) {
                keys.push(key);
                values.push(value.get());
            });
            assert.deepStrictEqual(keys, ['hello', 'bye']);
            assert.deepStrictEqual(values, ['world', 'inexistance']);
        });
        it('should throw an error if the callback is missing', function () {
            var map = new src_1.SpinalMap();
            assert.throws(function () {
                map.forEach();
            }, TypeError);
        });
    });
    describe('How to use Symbol.iterator', function () {
        it('should iterate threw all the keys and values of the map', function () {
            var e_1, _a;
            var map = new src_1.SpinalMap();
            var keys = [];
            var values = [];
            map.setElement('hello', 'world');
            map.setElement('bye', 'inexistance');
            try {
                for (var map_1 = __values(map), map_1_1 = map_1.next(); !map_1_1.done; map_1_1 = map_1.next()) {
                    var _b = __read(map_1_1.value, 2), key = _b[0], value = _b[1];
                    keys.push(key);
                    values.push(value.get());
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (map_1_1 && !map_1_1.done && (_a = map_1["return"])) _a.call(map_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            assert.deepStrictEqual(keys, ['hello', 'bye']);
            assert.deepStrictEqual(values, ['world', 'inexistance']);
        });
    });
});
//# sourceMappingURL=SpinalMapTest.js.map