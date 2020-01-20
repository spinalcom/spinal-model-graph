"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
exports.__esModule = true;
var src_1 = require("../../src");
var assert = require("assert");
var DEFAULT_NODE = new src_1.SpinalNode();
var DEFAULT_CONTEXT = new src_1.SpinalContext();
var DEFAULT_RELATION_NAME = 'relationName';
var DEFAULT_RELATION_TYPE = src_1.SPINAL_RELATION_LST_PTR_TYPE;
var DEFAULT_FUN = function (node) { return node; };
describe('How to use map', function () {
    describe('Error handling', function () {
        it('should throw an error if relationNames is neither an array, a string or omitted', function () { return __awaiter(void 0, void 0, void 0, function () {
            var error, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        error = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, DEFAULT_NODE.map(1, DEFAULT_FUN)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        error = true;
                        assert(e_1 instanceof Error);
                        return [3 /*break*/, 4];
                    case 4:
                        assert(error);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw an error if the callback function is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
            var error, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        error = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, DEFAULT_NODE.map([], undefined)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        error = true;
                        assert(e_2 instanceof Error);
                        return [3 /*break*/, 4];
                    case 4:
                        assert(error);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw an error if the callback function is not a function', function () { return __awaiter(void 0, void 0, void 0, function () {
            var error, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        error = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, DEFAULT_NODE.map([], 256)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        error = true;
                        assert(e_3 instanceof Error);
                        return [3 /*break*/, 4];
                    case 4:
                        assert(error);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should not fall in infinite loops', function () { return __awaiter(void 0, void 0, void 0, function () {
            var node1, node2, foundChild;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        node1 = new src_1.SpinalNode();
                        node2 = new src_1.SpinalNode();
                        return [4 /*yield*/, Promise.all([
                                node1.addChild(node2, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
                                node2.addChild(node1, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
                            ])];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, node1.map(undefined, DEFAULT_FUN)];
                    case 2:
                        foundChild = _a.sent();
                        assert.deepStrictEqual(foundChild, [node1, node2]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Basic callback manipulation', function () {
        it('should return the ids of all nodes', function () { return __awaiter(void 0, void 0, void 0, function () {
            var parent, child1, child2, child3, ids;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parent = new src_1.SpinalNode('parent');
                        child1 = new src_1.SpinalNode('child1');
                        child2 = new src_1.SpinalNode('child2');
                        child3 = new src_1.SpinalNode('child3');
                        return [4 /*yield*/, Promise.all([
                                parent.addChild(child1, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
                                parent.addChild(child2, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
                                parent.addChild(child3, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
                            ])];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, parent.map(undefined, function (node) {
                                return node.getId();
                            })];
                    case 2:
                        ids = _a.sent();
                        assert.deepStrictEqual(ids, [
                            parent.getId(),
                            child1.getId(),
                            child2.getId(),
                            child3.getId(),
                        ]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return second gen and undefined for other nodes nodes', function () { return __awaiter(void 0, void 0, void 0, function () {
            var root, firstGen1, firstGen2, firstGen3, secondGen1, secondGen2, thirdGen1, secondGen;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        root = new src_1.SpinalNode();
                        firstGen1 = new src_1.SpinalNode(undefined, 'firstGen');
                        firstGen2 = new src_1.SpinalNode(undefined, 'firstGen');
                        firstGen3 = new src_1.SpinalNode(undefined, 'firstGen');
                        secondGen1 = new src_1.SpinalNode(undefined, 'secondGen');
                        secondGen2 = new src_1.SpinalNode(undefined, 'secondGen');
                        thirdGen1 = new src_1.SpinalNode(undefined, 'thirdGen');
                        return [4 /*yield*/, Promise.all([
                                root.addChild(firstGen1, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
                                root.addChild(firstGen2, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
                                root.addChild(firstGen3, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
                                firstGen2.addChild(secondGen1, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
                                firstGen3.addChild(secondGen2, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
                                secondGen2.addChild(thirdGen1, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
                            ])];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, root.map(undefined, function (node) {
                                if (node.getType().get() === 'secondGen') {
                                    return node;
                                }
                                return undefined;
                            })];
                    case 2:
                        secondGen = _a.sent();
                        assert.deepStrictEqual(secondGen, [
                            undefined,
                            undefined,
                            undefined,
                            undefined,
                            secondGen1,
                            secondGen2,
                            undefined,
                        ]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
describe('How to use mapInContext', function () {
    describe('Error handling', function () {
        it('should throw an error if the context is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
            var error, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        error = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, DEFAULT_NODE.mapInContext(undefined, DEFAULT_FUN)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_4 = _a.sent();
                        error = true;
                        assert(e_4 instanceof Error);
                        return [3 /*break*/, 4];
                    case 4:
                        assert(error);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw an error if the context is not a SpinalContext', function () { return __awaiter(void 0, void 0, void 0, function () {
            var context, error, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context = new src_1.SpinalNode();
                        error = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, DEFAULT_NODE.mapInContext(context, DEFAULT_FUN)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_5 = _a.sent();
                        error = true;
                        assert(e_5 instanceof Error);
                        return [3 /*break*/, 4];
                    case 4:
                        assert(error);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw an error if the callback is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
            var error, testNode, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        error = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        testNode = DEFAULT_NODE;
                        return [4 /*yield*/, testNode.mapInContext(DEFAULT_CONTEXT)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_6 = _a.sent();
                        error = true;
                        assert(e_6 instanceof Error);
                        return [3 /*break*/, 4];
                    case 4:
                        assert(error);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw an error if the callback is not a function', function () { return __awaiter(void 0, void 0, void 0, function () {
            var error, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        error = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, DEFAULT_NODE.mapInContext(DEFAULT_CONTEXT, 128)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_7 = _a.sent();
                        error = true;
                        assert(e_7 instanceof Error);
                        return [3 /*break*/, 4];
                    case 4:
                        assert(error);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should not fall in infinite loops', function () { return __awaiter(void 0, void 0, void 0, function () {
            var context, node1, node2, foundChild;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context = new src_1.SpinalContext();
                        node1 = new src_1.SpinalNode();
                        node2 = new src_1.SpinalNode();
                        node1.addChildInContext(node2, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context);
                        node2.addChildInContext(node1, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context);
                        return [4 /*yield*/, node1.mapInContext(context, DEFAULT_FUN)];
                    case 1:
                        foundChild = _a.sent();
                        assert.deepStrictEqual(foundChild, [node1, node2]);
                        return [2 /*return*/];
                }
            });
        }); });
        describe('Basic callback manipulation', function () {
            it('should return the names of all nodes in the context', function () { return __awaiter(void 0, void 0, void 0, function () {
                var context, child1, child2, child3, names;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            context = new src_1.SpinalContext('context');
                            child1 = new src_1.SpinalNode('child1');
                            child2 = new src_1.SpinalNode('child2');
                            child3 = new src_1.SpinalNode('child3');
                            return [4 /*yield*/, Promise.all([
                                    context.addChildInContext(child1, DEFAULT_RELATION_NAME),
                                    context.addChildInContext(child2, DEFAULT_RELATION_NAME),
                                    context.addChildInContext(child3, DEFAULT_RELATION_NAME),
                                ])];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, context.mapInContext(context, function (node) {
                                    return node.getName().get();
                                })];
                        case 2:
                            names = _a.sent();
                            assert.deepStrictEqual(names, [
                                'context',
                                'child1',
                                'child2',
                                'child3',
                            ]);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe('How to use context', function () {
        it('should mapInContext all the nodes from the given relation names', function () { return __awaiter(void 0, void 0, void 0, function () {
            var context1, context2, parent, child1, child2, child3, child4, child5, child6, foundChildren;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context1 = new src_1.SpinalContext();
                        context2 = new src_1.SpinalContext();
                        parent = new src_1.SpinalNode();
                        child1 = new src_1.SpinalNode();
                        child2 = new src_1.SpinalNode();
                        child3 = new src_1.SpinalNode();
                        child4 = new src_1.SpinalNode();
                        child5 = new src_1.SpinalNode();
                        child6 = new src_1.SpinalNode();
                        return [4 /*yield*/, Promise.all([
                                parent.addChildInContext(child1, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context1),
                                parent.addChildInContext(child2, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context2),
                                parent.addChildInContext(child3, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context2),
                                child2.addChildInContext(child4, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context2),
                                child3.addChildInContext(child5, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context1),
                                child5.addChildInContext(child6, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context2),
                            ])];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, parent.mapInContext(context2, DEFAULT_FUN)];
                    case 2:
                        foundChildren = _a.sent();
                        assert.deepStrictEqual(foundChildren, [parent, child2, child3, child4]);
                        return [4 /*yield*/, parent.mapInContext(context1, DEFAULT_FUN)];
                    case 3:
                        foundChildren = _a.sent();
                        assert.deepStrictEqual(foundChildren, [parent, child1]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=mapTest.js.map