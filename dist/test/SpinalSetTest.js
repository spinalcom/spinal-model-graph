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
exports.__esModule = true;
var src_1 = require("../src");
var assert = require("assert");
describe('SpinalSet', function () {
    describe('How to use the constructor', function () {
        it('should create an empty set', function () {
            var set = new src_1.SpinalSet();
            assert.strictEqual(set.size(), 0);
        });
        it('should create a set using an array', function () {
            var init = [
                'value',
                'val',
            ];
            var set = new src_1.SpinalSet(init);
            assert(set.has('value'));
            assert(set.has('val'));
        });
        it('should throw an error if init is not iterable', function () {
            var init = {};
            assert.throws(function () {
                new src_1.SpinalSet(init);
            }, TypeError);
            init[Symbol.iterator] = null;
            assert.throws(function () {
                new src_1.SpinalSet(init);
            }, TypeError);
            init[Symbol.iterator] = function () { };
            assert.throws(function () {
                new src_1.SpinalSet(init);
            }, TypeError);
        });
        it('should throw an error if init has bad values', function () {
            var init = [1];
            assert.throws(function () {
                new src_1.SpinalSet(init);
            }, TypeError);
        });
    });
    describe('How to use add', function () {
        it('should add a value', function () {
            var set = new src_1.SpinalSet();
            set.add('value');
            assert(set.has('value'));
        });
        it('should throw an error if the value is missing', function () {
            var set = new src_1.SpinalSet();
            assert.throws(function () {
                set.setElement();
            }, TypeError);
        });
        it('should throw an error if the value is not a string', function () {
            var set = new src_1.SpinalSet();
            assert.throws(function () {
                set.setElement(1);
            }, TypeError);
        });
    });
    describe('How to use has', function () {
        it('should return true if the value exists', function () {
            var set = new src_1.SpinalSet();
            set.add('value');
            assert(set.has('value'));
        });
        it("should return false if the value doesn't exist", function () {
            var set = new src_1.SpinalSet();
            set.add('val');
            assert(!set.has('value'));
        });
        it('should throw an error if the value is not a string', function () {
            var set = new src_1.SpinalSet();
            assert.throws(function () {
                set.has(1);
            }, TypeError);
        });
    });
    describe('How to use values', function () {
        it('should return no values', function () {
            var set = new src_1.SpinalSet();
            assert.deepStrictEqual(set.values(), []);
        });
        it("should return the set's values", function () {
            var set = new src_1.SpinalSet();
            set.add('value');
            set.add('val');
            assert.deepStrictEqual(set.values(), ['value', 'val']);
        });
    });
    describe('How to use delete', function () {
        it('should delete the value', function () {
            var set = new src_1.SpinalSet();
            set.add('value');
            set.add('val');
            set["delete"]('val');
            assert(set.has('value'));
            assert(!set.has('val'));
        });
        it('should throw an error if the value is missing', function () {
            var set = new src_1.SpinalSet();
            assert.throws(function () {
                set["delete"]();
            }, TypeError);
        });
        it('should throw an error if the value is not a string', function () {
            var set = new src_1.SpinalSet();
            assert.throws(function () {
                set["delete"](4645);
            }, TypeError);
        });
        it("should throw an error if the value doesn't exist", function () {
            var set = new src_1.SpinalSet();
            set.add('value');
            assert.throws(function () {
                set["delete"]('val');
            }, Error);
            assert(set.has('value'));
        });
    });
    describe('How to use clear', function () {
        it('should delete all the values of the set', function () {
            var set = new src_1.SpinalSet();
            set.add('value');
            set.add('val');
            set.clear();
            assert.strictEqual(set.size(), 0);
        });
    });
    describe('How to use size', function () {
        it('should return 0 if the set is empty', function () {
            var set = new src_1.SpinalSet();
            assert.strictEqual(set.size(), 0);
        });
        it('should return the size of the set', function () {
            var set = new src_1.SpinalSet();
            set.add('value');
            set.add('val');
            assert.strictEqual(set.size(), 2);
        });
    });
    describe('How to use forEach', function () {
        it('should apply a function to all the values in the set', function () {
            var set = new src_1.SpinalSet();
            var arr = [];
            set.add('value');
            set.add('val');
            var i = 0;
            set.forEach(function (value, index) {
                arr.push(value);
                assert.strictEqual(index, i);
                i += 1;
            });
            assert.deepStrictEqual(arr, ['value', 'val']);
        });
        it('should throw an error if the callback is missing', function () {
            var set = new src_1.SpinalSet();
            assert.throws(function () {
                set.forEach();
            }, TypeError);
        });
    });
    describe('How to use Symbol.iterator', function () {
        it('should iterate threw all the values of the set', function () {
            var e_1, _a;
            var set = new src_1.SpinalSet();
            var arr = [];
            set.add('value');
            set.add('val');
            try {
                for (var set_1 = __values(set), set_1_1 = set_1.next(); !set_1_1.done; set_1_1 = set_1.next()) {
                    var value = set_1_1.value;
                    arr.push(value);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (set_1_1 && !set_1_1.done && (_a = set_1["return"])) _a.call(set_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            assert.deepStrictEqual(arr, ['value', 'val']);
        });
    });
});
//# sourceMappingURL=SpinalSetTest.js.map