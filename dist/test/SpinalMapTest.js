"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const assert = require("assert");
describe('SpinalMap', () => {
    describe('How to use the constructor', () => {
        it('should create an empty map', () => {
            const map = new src_1.SpinalMap();
            assert(!map.hasKey());
        });
        it('should create a map using an array', () => {
            const init = [
                ['key', 'value'],
                ['hello', 'world'],
            ];
            const map = new src_1.SpinalMap(init);
            assert(map.has('key'));
            assert.strictEqual(map.getElement('key').get(), 'value');
            assert(map.has('hello'));
            assert.strictEqual(map.getElement('hello').get(), 'world');
        });
        it('should throw an error if init is not iterable', () => {
            const init = {};
            assert.throws(() => {
                new src_1.SpinalMap(init);
            }, TypeError);
            init[Symbol.iterator] = null;
            assert.throws(() => {
                new src_1.SpinalMap(init);
            }, TypeError);
            init[Symbol.iterator] = () => { };
            assert.throws(() => {
                new src_1.SpinalMap(init);
            }, TypeError);
        });
        it('should throw an error if init has bad values', () => {
            let init = [1];
            assert.throws(() => {
                new src_1.SpinalMap(init);
            }, TypeError);
            init = [
                [],
            ];
            assert.throws(() => {
                new src_1.SpinalMap(init);
            }, TypeError);
            init = [
                [1],
            ];
            assert.throws(() => {
                new src_1.SpinalMap(init);
            }, TypeError);
        });
    });
    describe('How to use setElement and getElement', () => {
        it('should create and set a new element', () => {
            const map = new src_1.SpinalMap();
            map.setElement('hello', 'world');
            assert.strictEqual(map.getElement('hello').get(), 'world');
        });
        it('should set an existing element', () => {
            const map = new src_1.SpinalMap();
            map.setElement('hello', 'world');
            map.setElement('hello', 'everyone');
            assert.strictEqual(map.getElement('hello').get(), 'everyone');
        });
        it('should throw an error if the key is missing', () => {
            const map = new src_1.SpinalMap();
            assert.throws(() => {
                map.setElement();
            }, TypeError);
        });
        it('should throw an error if the key is not a string', () => {
            const map = new src_1.SpinalMap();
            assert.throws(() => {
                map.setElement(1);
            }, TypeError);
        });
    });
    describe('How to use has', () => {
        it('should return true if the key exists', () => {
            const map = new src_1.SpinalMap();
            map.setElement('hello', 'world');
            assert(map.has('hello'));
        });
        it("should return false if the key doesn't exist", () => {
            const map = new src_1.SpinalMap();
            map.setElement('howdy', 'world');
            assert(!map.has('hello'));
        });
        it('should throw an error if the key is not a string', () => {
            const map = new src_1.SpinalMap();
            assert.throws(() => {
                map.has(1);
            }, TypeError);
        });
    });
    describe('How to use hasKey', () => {
        it('should return true if the map has any key', () => {
            const map = new src_1.SpinalMap();
            map.setElement('hello', 'world');
            assert(map.hasKey());
        });
        it('should return false if the map has no key', () => {
            const map = new src_1.SpinalMap();
            assert(!map.hasKey());
        });
    });
    describe('How to use keys', () => {
        it('should return no keys', () => {
            const map = new src_1.SpinalMap();
            assert.deepStrictEqual(map.keys(), []);
        });
        it("should return the map's keys", () => {
            const map = new src_1.SpinalMap();
            map.setElement('hello', 'world');
            map.setElement('bye', 'inexistance');
            assert.deepStrictEqual(map.keys(), ['hello', 'bye']);
        });
    });
    describe('How to use entries', () => {
        it('should return an empty array', () => {
            const map = new src_1.SpinalMap();
            assert.deepStrictEqual(map.entries(), []);
        });
        it("should return the map's entries", () => {
            const map = new src_1.SpinalMap();
            map.setElement('hello', 'world');
            map.setElement('bye', 'inexistance');
            assert.deepStrictEqual(map.entries(), [
                ['hello', map.getElement('hello')],
                ['bye', map.getElement('bye')],
            ]);
        });
    });
    describe('How to use delete', () => {
        it('should delete the key and its value', () => {
            const map = new src_1.SpinalMap();
            map.setElement('hello', 'world');
            map.setElement('bye', 'inexistance');
            map.delete('bye');
            assert(map.has('hello'));
            assert(!map.has('bye'));
        });
        it('should throw an error if the key is missing', () => {
            const map = new src_1.SpinalMap();
            assert.throws(() => {
                map.delete();
            }, TypeError);
        });
        it('should throw an error if the key is not a string', () => {
            const map = new src_1.SpinalMap();
            assert.throws(() => {
                map.delete(1);
            }, TypeError);
        });
        it("should throw an error if the key doesn't exist", () => {
            const map = new src_1.SpinalMap();
            map.setElement('hello', 'world');
            assert.throws(() => {
                map.delete('bye');
            }, Error);
            assert(map.has('hello'));
        });
    });
    describe('How to use clear', () => {
        it('should delete all the keys of the map', () => {
            const map = new src_1.SpinalMap();
            map.setElement('hello', 'world');
            map.setElement('bye', 'inexistance');
            map.clear();
            assert(!map.hasKey());
        });
    });
    describe('How to use forEach', () => {
        it('should apply a function to all the values and keys in the map', () => {
            const map = new src_1.SpinalMap();
            const keys = [];
            const values = [];
            map.setElement('hello', 'world');
            map.setElement('bye', 'inexistance');
            map.forEach((value, key) => {
                keys.push(key);
                values.push(value.get());
            });
            assert.deepStrictEqual(keys, ['hello', 'bye']);
            assert.deepStrictEqual(values, ['world', 'inexistance']);
        });
        it('should throw an error if the callback is missing', () => {
            const map = new src_1.SpinalMap();
            assert.throws(() => {
                map.forEach();
            }, TypeError);
        });
    });
    describe('How to use Symbol.iterator', () => {
        it('should iterate threw all the keys and values of the map', () => {
            const map = new src_1.SpinalMap();
            const keys = [];
            const values = [];
            map.setElement('hello', 'world');
            map.setElement('bye', 'inexistance');
            for (const [key, value] of map) {
                keys.push(key);
                values.push(value.get());
            }
            assert.deepStrictEqual(keys, ['hello', 'bye']);
            assert.deepStrictEqual(values, ['world', 'inexistance']);
        });
    });
});
//# sourceMappingURL=SpinalMapTest.js.map