"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var src_1 = require("../src");
var spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
var assert = require("assert");
var DEFAULT_NODE = new src_1.SpinalNode('test', 'test', new spinal_core_connectorjs_type_1.Model());
var DEFAULT_MODEL = new spinal_core_connectorjs_type_1.Model();
describe('SpinalNodePointer', function () {
    describe('How to create a SpinalNodePointer', function () {
        it('should create an empty object FileSystem._sig_server === false', function () {
            spinal_core_connectorjs_type_1.FileSystem._sig_server = false;
            var rel = new src_1.SpinalNodePointer(DEFAULT_NODE);
            spinal_core_connectorjs_type_1.FileSystem._sig_server = true;
            assert(typeof rel.children === 'undefined');
        });
        it('should create a SpinalNodePointer with correct default values if a Model is given', function () {
            var ptr = new src_1.SpinalNodePointer(new spinal_core_connectorjs_type_1.Model());
            assert.strictEqual(typeof ptr.getId(), 'undefined');
            assert.strictEqual(typeof ptr.getType(), 'undefined');
        });
        it('should create a SpinalNodePointer with correct default values if a node is given', function () {
            var ptr = new src_1.SpinalNodePointer(DEFAULT_NODE);
            assert.strictEqual(ptr.getId(), DEFAULT_NODE.getId());
            assert.strictEqual(ptr.getType(), DEFAULT_NODE.getType());
        });
        it('should throw an error if no element is given', function () {
            assert.throws(function () {
                var testConstructor = src_1.SpinalNodePointer;
                new testConstructor();
            }, TypeError);
        });
    });
    describe('How to set/unset the pointer', function () {
        describe('How to use setElement', function () {
            it('should set an element and update pointedId and pointedType', function () { return __awaiter(_this, void 0, void 0, function () {
                var ptr, elem;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ptr = new src_1.SpinalNodePointer(DEFAULT_NODE);
                            assert.strictEqual(ptr.getId(), DEFAULT_NODE.getId());
                            assert.strictEqual(ptr.getType(), DEFAULT_NODE.getType());
                            return [4 /*yield*/, ptr.load()];
                        case 1:
                            elem = _a.sent();
                            assert.strictEqual(elem, DEFAULT_NODE);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should set an element but not update pointedId and pointedType', function () { return __awaiter(_this, void 0, void 0, function () {
                var ptr, elem;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ptr = new src_1.SpinalNodePointer(DEFAULT_MODEL);
                            assert.strictEqual(typeof ptr.getId(), 'undefined');
                            assert.strictEqual(typeof ptr.getType(), 'undefined');
                            return [4 /*yield*/, ptr.load()];
                        case 1:
                            elem = _a.sent();
                            assert.strictEqual(elem, DEFAULT_MODEL);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('How to use load', function () {
            it('should load the node to which the pointer is pointing', function () { return __awaiter(_this, void 0, void 0, function () {
                var ptr, elem;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ptr = new src_1.SpinalNodePointer(DEFAULT_NODE);
                            return [4 /*yield*/, ptr.load()];
                        case 1:
                            elem = _a.sent();
                            assert.strictEqual(elem, DEFAULT_NODE);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('How to use unset', function () {
            it('should unset the pointer', function () {
                var ptr = new src_1.SpinalNodePointer(DEFAULT_NODE);
                assert.strictEqual(ptr.getId(), DEFAULT_NODE.getId());
                assert.strictEqual(ptr.getType(), DEFAULT_NODE.getType());
                ptr.unset();
                assert.strictEqual(typeof ptr.getId(), 'undefined');
                assert.strictEqual(typeof ptr.getType(), 'undefined');
                assert.deepStrictEqual(ptr.ptr.data, {
                    value: 0
                });
            });
        });
    });
    describe('How to get information about the SpinalNodePointer', function () {
        describe('How to use getId', function () {
            it('should return the id of the pointed node', function () {
                var ptr = new src_1.SpinalNodePointer(DEFAULT_NODE);
                assert.strictEqual(ptr.getId(), DEFAULT_NODE.getId());
            });
        });
        describe('How to use getType', function () {
            it('should return the type of the pointed node', function () {
                var ptr = new src_1.SpinalNodePointer(DEFAULT_NODE);
                assert.strictEqual(ptr.getType(), DEFAULT_NODE.getType());
            });
        });
    });
});
//# sourceMappingURL=SpinalNodePointerTest.js.map