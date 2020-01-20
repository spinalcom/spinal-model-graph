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
var assert = require('assert');
var DEFAULT_NODE = new src_1.SpinalNode();
var DEFAULT_RELATION_NAME = 'relationName';
var DEFAULT_RELATION_TYPE = src_1.SPINAL_RELATION_LST_PTR_TYPE;
var DEFAULT_NODE_NAME = 'nodeName';
describe('How to use find', function () {
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
                        return [4 /*yield*/, DEFAULT_NODE.find(1)];
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
        it('should throw an error if the predicate is not a function', function () { return __awaiter(void 0, void 0, void 0, function () {
            var error, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        error = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, DEFAULT_NODE.find(undefined, 64)];
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
                        return [4 /*yield*/, node1.find()];
                    case 2:
                        foundChild = _a.sent();
                        assert.deepStrictEqual(foundChild, [node1, node2]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Basic predicate manipulation', function () {
        it('should return all contexts', function () { return __awaiter(void 0, void 0, void 0, function () {
            var graph, context1, context2, context3, contexts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        graph = new src_1.SpinalGraph();
                        context1 = new src_1.SpinalContext('context1');
                        context2 = new src_1.SpinalContext('context2');
                        context3 = new src_1.SpinalContext('context3');
                        return [4 /*yield*/, Promise.all([
                                graph.addContext(context1),
                                graph.addContext(context2),
                                graph.addContext(context3),
                            ])];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, graph.find(undefined, function (node) {
                                return node.getType().get() === 'SpinalContext';
                            })];
                    case 2:
                        contexts = _a.sent();
                        assert.deepStrictEqual(contexts, [context1, context2,
                            context3,
                        ]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return all contexts but not their nodes', function () { return __awaiter(void 0, void 0, void 0, function () {
            var graph, context1, context2, context3, promises, i, contexts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        graph = new src_1.SpinalGraph();
                        context1 = new src_1.SpinalContext('context1');
                        context2 = new src_1.SpinalContext('context2');
                        context3 = new src_1.SpinalContext('context3');
                        return [4 /*yield*/, Promise.all([
                                graph.addContext(context1),
                                graph.addContext(context2),
                                graph.addContext(context3),
                            ])];
                    case 1:
                        _a.sent();
                        promises = [];
                        for (i = 0; i < 3; i += 1) {
                            promises.push(context1.addChildInContext(new src_1.SpinalNode(), DEFAULT_RELATION_NAME));
                            promises.push(context2.addChildInContext(new src_1.SpinalNode(), DEFAULT_RELATION_NAME));
                            promises.push(context3.addChildInContext(new src_1.SpinalNode(), DEFAULT_RELATION_NAME));
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, graph.find(undefined, function (node) {
                                return node.getType().get() === 'SpinalContext';
                            })];
                    case 3:
                        contexts = _a.sent();
                        assert.deepStrictEqual(contexts, [context1, context2, context3]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return a node with a certain name', function () { return __awaiter(void 0, void 0, void 0, function () {
            var parent, child1, child2, child3, foundChild;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parent = new src_1.SpinalNode(DEFAULT_NODE_NAME);
                        child1 = new src_1.SpinalNode(DEFAULT_NODE_NAME + "1");
                        child2 = new src_1.SpinalNode(DEFAULT_NODE_NAME + "2");
                        child3 = new src_1.SpinalNode(DEFAULT_NODE_NAME + "3");
                        return [4 /*yield*/, Promise.all([
                                parent.addChild(child1, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
                                parent.addChild(child2, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
                                parent.addChild(child3, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
                            ])];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, parent.find(undefined, function (node) {
                                return node.getName().get() === DEFAULT_NODE_NAME + "2";
                            })];
                    case 2:
                        foundChild = _a.sent();
                        assert.deepStrictEqual(foundChild, [child2]);
                        return [4 /*yield*/, parent.find(undefined, function (node) {
                                return node.getName().get() !== DEFAULT_NODE_NAME + "2";
                            })];
                    case 3:
                        foundChild = _a.sent();
                        assert.deepStrictEqual(foundChild, [parent, child1, child3]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return nodes with a certain type', function () { return __awaiter(void 0, void 0, void 0, function () {
            var parent, child1, child2, child3, child4, child5, child6, foundChildren;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parent = new src_1.SpinalNode();
                        child1 = new src_1.SpinalNode(DEFAULT_NODE_NAME, 'type1');
                        child2 = new src_1.SpinalNode(DEFAULT_NODE_NAME, 'type2');
                        child3 = new src_1.SpinalNode(DEFAULT_NODE_NAME, 'type1');
                        child4 = new src_1.SpinalNode(DEFAULT_NODE_NAME, 'type1');
                        child5 = new src_1.SpinalNode(DEFAULT_NODE_NAME, 'type2');
                        child6 = new src_1.SpinalNode(DEFAULT_NODE_NAME, 'type1');
                        return [4 /*yield*/, Promise.all([
                                parent.addChild(child1, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
                                parent.addChild(child2, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
                                parent.addChild(child3, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
                                child2.addChild(child4, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
                                child3.addChild(child5, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
                                child5.addChild(child6, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE),
                            ])];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, parent.find(undefined, function (node) {
                                return node.getType().get() === 'type1';
                            })];
                    case 2:
                        foundChildren = _a.sent();
                        assert.deepStrictEqual(foundChildren, [child1, child3, child4, child6]);
                        return [4 /*yield*/, parent.find(undefined, function (node) {
                                return node.getType().get() === 'type2';
                            })];
                    case 3:
                        foundChildren = _a.sent();
                        assert.deepStrictEqual(foundChildren, [child2, child5]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('How to use relationNames', function () {
        it('should find all the nodes from the given relation names', function () { return __awaiter(void 0, void 0, void 0, function () {
            var parent, child1, child2, child3, child4, child5, child6, foundChildren;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parent = new src_1.SpinalNode();
                        child1 = new src_1.SpinalNode();
                        child2 = new src_1.SpinalNode();
                        child3 = new src_1.SpinalNode();
                        child4 = new src_1.SpinalNode();
                        child5 = new src_1.SpinalNode();
                        child6 = new src_1.SpinalNode();
                        return [4 /*yield*/, Promise.all([
                                parent.addChild(child1, DEFAULT_RELATION_NAME + "1", DEFAULT_RELATION_TYPE),
                                parent.addChild(child2, DEFAULT_RELATION_NAME + "2", DEFAULT_RELATION_TYPE),
                                parent.addChild(child3, DEFAULT_RELATION_NAME + "2", DEFAULT_RELATION_TYPE),
                                child2.addChild(child4, DEFAULT_RELATION_NAME + "2", DEFAULT_RELATION_TYPE),
                                child3.addChild(child5, DEFAULT_RELATION_NAME + "1", DEFAULT_RELATION_TYPE),
                                child5.addChild(child6, DEFAULT_RELATION_NAME + "2", DEFAULT_RELATION_TYPE),
                            ])];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, parent.find(DEFAULT_RELATION_NAME + "2")];
                    case 2:
                        foundChildren = _a.sent();
                        assert.deepStrictEqual(foundChildren, [parent, child2, child3, child4]);
                        return [4 /*yield*/, parent.find(DEFAULT_RELATION_NAME + "1")];
                    case 3:
                        foundChildren = _a.sent();
                        assert.deepStrictEqual(foundChildren, [parent, child1]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
describe('How to use findInContext', function () {
    describe('Error handling', function () {
        it('should throw an error if the context is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
            var error, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        error = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, DEFAULT_NODE.findInContext()];
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
        it('should throw an error if the context is not a SpinalContext', function () { return __awaiter(void 0, void 0, void 0, function () {
            var context, error, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context = new src_1.SpinalNode();
                        error = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, DEFAULT_NODE.findInContext(context)];
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
        it('should throw an error if the predicate is not a function', function () { return __awaiter(void 0, void 0, void 0, function () {
            var context, error, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context = new src_1.SpinalNode();
                        error = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, DEFAULT_NODE.findInContext(context, 64)];
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
        it('should not fall in infinite loops', function () { return __awaiter(void 0, void 0, void 0, function () {
            var context, node1, node2, foundChild;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context = new src_1.SpinalContext();
                        node1 = new src_1.SpinalNode();
                        node2 = new src_1.SpinalNode();
                        return [4 /*yield*/, Promise.all([
                                node1.addChildInContext(node2, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context),
                                node2.addChildInContext(node1, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context),
                            ])];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, node1.findInContext(context)];
                    case 2:
                        foundChild = _a.sent();
                        assert.deepStrictEqual(foundChild, [node1, node2]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Basic predicate manipulation', function () {
        it('should return all nodes', function () { return __awaiter(void 0, void 0, void 0, function () {
            var context, node1, node2, node3, contexts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context = new src_1.SpinalContext();
                        node1 = new src_1.SpinalNode('node1');
                        node2 = new src_1.SpinalNode('node2');
                        node3 = new src_1.SpinalNode('node3');
                        return [4 /*yield*/, Promise.all([
                                context.addChildInContext(node1, DEFAULT_RELATION_NAME),
                                context.addChildInContext(node2, DEFAULT_RELATION_NAME),
                                context.addChildInContext(node3, DEFAULT_RELATION_NAME),
                            ])];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, context.findInContext(context, function (node) {
                                return node.getType().get() === 'SpinalNode';
                            })];
                    case 2:
                        contexts = _a.sent();
                        assert.deepStrictEqual(contexts, [node1, node2, node3]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return all direct children', function () { return __awaiter(void 0, void 0, void 0, function () {
            var context, node1, node2, node3, promises, i, directs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context = new src_1.SpinalContext();
                        node1 = new src_1.SpinalNode(undefined, 'direct');
                        node2 = new src_1.SpinalNode(undefined, 'direct');
                        node3 = new src_1.SpinalNode(undefined, 'direct');
                        return [4 /*yield*/, Promise.all([
                                context.addChildInContext(node1, DEFAULT_RELATION_NAME),
                                context.addChildInContext(node2, DEFAULT_RELATION_NAME),
                                context.addChildInContext(node3, DEFAULT_RELATION_NAME),
                            ])];
                    case 1:
                        _a.sent();
                        promises = [];
                        for (i = 0; i < 3; i += 1) {
                            promises.push(node1.addChild(new src_1.SpinalNode(), DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE));
                            promises.push(node2.addChild(new src_1.SpinalNode(), DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE));
                            promises.push(node3.addChild(new src_1.SpinalNode(), DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE));
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, context.findInContext(context, function (node) {
                                return node.getType().get() === 'direct';
                            })];
                    case 3:
                        directs = _a.sent();
                        assert.deepStrictEqual(directs, [node1, node2, node3]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return a node with a certain name', function () { return __awaiter(void 0, void 0, void 0, function () {
            var context, child1, child2, child3, foundChild;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context = new src_1.SpinalContext();
                        child1 = new src_1.SpinalNode(DEFAULT_NODE_NAME + "1");
                        child2 = new src_1.SpinalNode(DEFAULT_NODE_NAME + "2");
                        child3 = new src_1.SpinalNode(DEFAULT_NODE_NAME + "3");
                        return [4 /*yield*/, Promise.all([
                                context.addChildInContext(child1, DEFAULT_RELATION_NAME),
                                context.addChildInContext(child2, DEFAULT_RELATION_NAME),
                                context.addChildInContext(child3, DEFAULT_RELATION_NAME),
                            ])];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, context.findInContext(context, function (node) {
                                return node.getName().get() === DEFAULT_NODE_NAME + "2";
                            })];
                    case 2:
                        foundChild = _a.sent();
                        assert.deepStrictEqual(foundChild, [child2]);
                        return [4 /*yield*/, context.findInContext(context, function (node) {
                                return node.getName().get() !== DEFAULT_NODE_NAME + "2";
                            })];
                    case 3:
                        foundChild = _a.sent();
                        assert.deepStrictEqual(foundChild, [context, child1, child3]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return nodes with a certain type', function () { return __awaiter(void 0, void 0, void 0, function () {
            var context, child1, child2, child3, child4, child5, child6, foundChildren;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context = new src_1.SpinalContext();
                        child1 = new src_1.SpinalNode(DEFAULT_NODE_NAME, 'type1');
                        child2 = new src_1.SpinalNode(DEFAULT_NODE_NAME, 'type2');
                        child3 = new src_1.SpinalNode(DEFAULT_NODE_NAME, 'type1');
                        child4 = new src_1.SpinalNode(DEFAULT_NODE_NAME, 'type1');
                        child5 = new src_1.SpinalNode(DEFAULT_NODE_NAME, 'type2');
                        child6 = new src_1.SpinalNode(DEFAULT_NODE_NAME, 'type1');
                        return [4 /*yield*/, Promise.all([
                                context.addChildInContext(child1, DEFAULT_RELATION_NAME),
                                context.addChildInContext(child2, DEFAULT_RELATION_NAME),
                                context.addChildInContext(child3, DEFAULT_RELATION_NAME),
                                child2.addChildInContext(child4, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context),
                                child3.addChildInContext(child5, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context),
                                child5.addChildInContext(child6, DEFAULT_RELATION_NAME, DEFAULT_RELATION_TYPE, context),
                            ])];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, context.findInContext(context, function (node) {
                                return node.getType().get() === 'type1';
                            })];
                    case 2:
                        foundChildren = _a.sent();
                        assert.deepStrictEqual(foundChildren, [child1, child3,
                            child4, child6,
                        ]);
                        return [4 /*yield*/, context.findInContext(context, function (node) {
                                return node.getType().get() === 'type2';
                            })];
                    case 3:
                        foundChildren = _a.sent();
                        assert.deepStrictEqual(foundChildren, [child2, child5]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('How to use context', function () {
        it('should findInContext all the nodes from the given relation names', function () { return __awaiter(void 0, void 0, void 0, function () {
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
                        return [4 /*yield*/, parent.findInContext(context2)];
                    case 2:
                        foundChildren = _a.sent();
                        assert.deepStrictEqual(foundChildren, [parent, child2, child3, child4]);
                        return [4 /*yield*/, parent.findInContext(context1)];
                    case 3:
                        foundChildren = _a.sent();
                        assert.deepStrictEqual(foundChildren, [parent, child1]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=findTest.js.map