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
var spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
var assert = require("assert");
var DEFAULT_RELATION_NAME = 'relationName';
var DEFAULT_NODE = new src_1.SpinalNode('test', 'test', new spinal_core_connectorjs_type_1.Model());
describe('SpinalRelationLstPtr', function () {
    describe('How to use the constructor', function () {
        it('should create an empty object FileSystem._sig_server === false', function () {
            spinal_core_connectorjs_type_1.FileSystem._sig_server = false;
            var rel = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
            spinal_core_connectorjs_type_1.FileSystem._sig_server = true;
            assert(typeof rel.children === 'undefined');
        });
        it('should create a new relation with a name and a node parent', function () {
            var rel = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
            assert.strictEqual(rel.getName().get(), DEFAULT_RELATION_NAME);
        });
        it('should create a new relation with a name and a context parent', function () { return __awaiter(void 0, void 0, void 0, function () {
            var parent, rel, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        parent = new src_1.SpinalContext();
                        rel = new src_1.SpinalRelationLstPtr(parent, DEFAULT_RELATION_NAME);
                        assert.strictEqual(rel.getName().get(), DEFAULT_RELATION_NAME);
                        _b = (_a = assert).strictEqual;
                        return [4 /*yield*/, rel.getParent()];
                    case 1:
                        _b.apply(_a, [_c.sent(), parent]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should create a new relation with a name and a graph parent', function () { return __awaiter(void 0, void 0, void 0, function () {
            var parent, rel, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        parent = new src_1.SpinalGraph();
                        rel = new src_1.SpinalRelationLstPtr(parent, DEFAULT_RELATION_NAME);
                        assert.strictEqual(rel.getName().get(), DEFAULT_RELATION_NAME);
                        _b = (_a = assert).strictEqual;
                        return [4 /*yield*/, rel.getParent()];
                    case 1:
                        _b.apply(_a, [_c.sent(), parent]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw an error if the parent or the name is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                assert.throws(function () {
                    new src_1.SpinalRelationLstPtr();
                }, TypeError);
                assert.throws(function () {
                    new src_1.SpinalRelationLstPtr(undefined, DEFAULT_RELATION_NAME);
                }, TypeError);
                assert.throws(function () {
                    new src_1.SpinalRelationLstPtr(DEFAULT_NODE);
                }, TypeError);
                return [2 /*return*/];
            });
        }); });
        it('should throw an error if the parent is not a SpinalNode', function () { return __awaiter(void 0, void 0, void 0, function () {
            var parent1, parent2;
            return __generator(this, function (_a) {
                parent1 = [];
                assert.throws(function () {
                    new src_1.SpinalRelationLstPtr(parent1, DEFAULT_RELATION_NAME);
                }, TypeError);
                parent2 = new spinal_core_connectorjs_type_1.Model();
                assert.throws(function () {
                    new src_1.SpinalRelationLstPtr(parent2, DEFAULT_RELATION_NAME);
                }, TypeError);
                return [2 /*return*/];
            });
        }); });
    });
    describe('How to get informations about the relation', function () {
        describe('How to use getChildrenIds', function () {
            it('should return the ids of all children', function () { return __awaiter(void 0, void 0, void 0, function () {
                var rel;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            rel = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                            return [4 /*yield*/, rel.addChild(DEFAULT_NODE)];
                        case 1:
                            _a.sent();
                            assert.deepStrictEqual(rel.getChildrenIds(), [
                                DEFAULT_NODE.getId().get(),
                            ]);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should return the ids of all children', function () { return __awaiter(void 0, void 0, void 0, function () {
                var rel, node1, node2, node3, nodeIds;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            rel = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                            node1 = new src_1.SpinalNode();
                            node2 = new src_1.SpinalNode();
                            node3 = new src_1.SpinalNode();
                            nodeIds = [
                                node1.getId().get(),
                                node2.getId().get(),
                                node3.getId().get(),
                            ];
                            return [4 /*yield*/, Promise.all([
                                    rel.addChild(node1),
                                    rel.addChild(node2),
                                    rel.addChild(node3),
                                ])];
                        case 1:
                            _a.sent();
                            assert.deepStrictEqual(rel.getChildrenIds(), nodeIds);
                            assert.deepStrictEqual(rel.getNbChildren(), nodeIds.length);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('How to use getChildren', function () {
            it("should return the relation's child", function () { return __awaiter(void 0, void 0, void 0, function () {
                var rel, children;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            rel = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                            return [4 /*yield*/, rel.addChild(DEFAULT_NODE)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, rel.getChildren()];
                        case 2:
                            children = _a.sent();
                            assert.deepStrictEqual(children, [DEFAULT_NODE]);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should return the relation's children", function () { return __awaiter(void 0, void 0, void 0, function () {
                var rel, node1, node2, node3, children;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            rel = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                            node1 = new src_1.SpinalNode();
                            node2 = new src_1.SpinalNode();
                            node3 = new src_1.SpinalNode();
                            return [4 /*yield*/, Promise.all([
                                    rel.addChild(node1),
                                    rel.addChild(node2),
                                    rel.addChild(node3),
                                ])];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, rel.getChildren()];
                        case 2:
                            children = _a.sent();
                            assert.deepStrictEqual(children, [node1, node2, node3]);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should return an empty array', function () { return __awaiter(void 0, void 0, void 0, function () {
                var rel, children;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            rel = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                            return [4 /*yield*/, rel.getChildren()];
                        case 1:
                            children = _a.sent();
                            assert.deepStrictEqual(children, []);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('How to use getChildrenInContext', function () {
            it("should return the relation's child", function () { return __awaiter(void 0, void 0, void 0, function () {
                var context, relation, child, children;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            context = new src_1.SpinalContext();
                            relation = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                            child = new src_1.SpinalNode();
                            child.addContextId(context.getId().get());
                            return [4 /*yield*/, relation.addChild(child)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, relation.getChildrenInContext(context)];
                        case 2:
                            children = _a.sent();
                            assert.deepStrictEqual(children, [child]);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should return the relation's children associated to the context", function () { return __awaiter(void 0, void 0, void 0, function () {
                var context, relation, child1, child2, child3, children;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            context = new src_1.SpinalContext();
                            relation = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                            child1 = new src_1.SpinalNode();
                            child2 = new src_1.SpinalNode();
                            child3 = new src_1.SpinalNode();
                            child1.addContextId(context.getId().get());
                            child3.addContextId(context.getId().get());
                            return [4 /*yield*/, Promise.all([
                                    relation.addChild(child1),
                                    relation.addChild(child2),
                                    relation.addChild(child3),
                                ])];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, relation.getChildrenInContext(context)];
                        case 2:
                            children = _a.sent();
                            assert.deepStrictEqual(children, [child1, child3]);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw an error if the context is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
                var relation, error, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            relation = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                            error = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, relation.getChildrenInContext()];
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
            it('should throw an error if context is not a SpinalContext', function () { return __awaiter(void 0, void 0, void 0, function () {
                var context1, relation, error, e_2, context2, e_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            context1 = new spinal_core_connectorjs_type_1.Model();
                            relation = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                            error = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, relation.getChildrenInContext(context1)];
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
                            context2 = new src_1.SpinalNode();
                            error = false;
                            _a.label = 5;
                        case 5:
                            _a.trys.push([5, 7, , 8]);
                            return [4 /*yield*/, relation.getChildrenInContext(context2)];
                        case 6:
                            _a.sent();
                            return [3 /*break*/, 8];
                        case 7:
                            e_3 = _a.sent();
                            error = true;
                            assert(e_3 instanceof Error);
                            return [3 /*break*/, 8];
                        case 8:
                            assert(error);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('How to use getType', function () {
            it("should return the relation's type", function () {
                var rel = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                assert.strictEqual(rel.getType(), src_1.SPINAL_RELATION_LST_PTR_TYPE);
            });
        });
    });
    describe('How to add children', function () {
        describe('How to use addChild', function () {
            it('should add a child to the children of the relation', function () { return __awaiter(void 0, void 0, void 0, function () {
                var rel, children;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            rel = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                            return [4 /*yield*/, rel.addChild(DEFAULT_NODE)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, rel.getChildren()];
                        case 2:
                            children = _a.sent();
                            assert.deepStrictEqual(children, [DEFAULT_NODE]);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw an error if you try to add the same node twice', function () { return __awaiter(void 0, void 0, void 0, function () {
                var rel, error, e_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            rel = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                            return [4 /*yield*/, rel.addChild(DEFAULT_NODE)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, rel.addChild(DEFAULT_NODE)];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            e_4 = _a.sent();
                            error = true;
                            assert(e_4 instanceof Error);
                            return [3 /*break*/, 5];
                        case 5:
                            assert(error);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw an error when you pass it something that is not a model', function () { return __awaiter(void 0, void 0, void 0, function () {
                var rel, error, array, e_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            rel = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                            array = [];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, rel.addChild(array)];
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
            it('should return the node added to the relation', function () { return __awaiter(void 0, void 0, void 0, function () {
                var rel, node, model, res1, res2, res2Elem;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            rel = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                            node = new src_1.SpinalNode();
                            model = new spinal_core_connectorjs_type_1.Model();
                            return [4 /*yield*/, rel.addChild(node)];
                        case 1:
                            res1 = _a.sent();
                            assert.strictEqual(res1, node);
                            return [4 /*yield*/, rel.addChild(model)];
                        case 2:
                            res2 = _a.sent();
                            return [4 /*yield*/, res2.getElement()];
                        case 3:
                            res2Elem = _a.sent();
                            assert.strictEqual(res2Elem, model);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe('How to remove children', function () {
        describe('How to use removeChild', function () {
            it('should remove a child from the children of the relation', function () { return __awaiter(void 0, void 0, void 0, function () {
                var rel, children;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            rel = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                            return [4 /*yield*/, rel.addChild(DEFAULT_NODE)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, rel.removeChild(DEFAULT_NODE)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, rel.getChildren()];
                        case 3:
                            children = _a.sent();
                            assert.deepStrictEqual(children, []);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should remove a child and update the children ids of the relation', function () { return __awaiter(void 0, void 0, void 0, function () {
                var rel, ids;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            rel = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                            return [4 /*yield*/, rel.addChild(DEFAULT_NODE)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, rel.removeChild(DEFAULT_NODE)];
                        case 2:
                            _a.sent();
                            ids = rel.getChildrenIds();
                            assert.deepStrictEqual(ids, []);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should remove a child and remove the relation the node's parents", function () { return __awaiter(void 0, void 0, void 0, function () {
                var parentNode, rel, childNode, parents;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            parentNode = new src_1.SpinalNode();
                            rel = parentNode._createRelation(DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_LST_PTR_TYPE);
                            childNode = new src_1.SpinalNode();
                            return [4 /*yield*/, rel.addChild(childNode)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, rel.removeChild(childNode)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, childNode.getParents()];
                        case 3:
                            parents = _a.sent();
                            assert.deepStrictEqual(parents, []);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw an error if the node is not a child', function () { return __awaiter(void 0, void 0, void 0, function () {
                var parentNode, rel, childNode, error, e_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            parentNode = new src_1.SpinalNode();
                            rel = parentNode._createRelation(DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_LST_PTR_TYPE);
                            childNode = new src_1.SpinalNode();
                            error = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, rel.removeChild(childNode)];
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
        });
        describe('How to use removeChildren', function () {
            it('should delete all of the children', function () { return __awaiter(void 0, void 0, void 0, function () {
                var rel, node1, node2, node3, children;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            rel = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                            node1 = new src_1.SpinalNode();
                            node2 = new src_1.SpinalNode();
                            node3 = new src_1.SpinalNode();
                            return [4 /*yield*/, Promise.all([
                                    rel.addChild(node1),
                                    rel.addChild(node2),
                                    rel.addChild(node3),
                                ])];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, rel.removeChildren()];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, rel.getChildren()];
                        case 3:
                            children = _a.sent();
                            assert.deepStrictEqual(children, []);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should delete the given children', function () { return __awaiter(void 0, void 0, void 0, function () {
                var rel, node1, node2, node3, children;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            rel = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                            node1 = new src_1.SpinalNode();
                            node2 = new src_1.SpinalNode();
                            node3 = new src_1.SpinalNode();
                            return [4 /*yield*/, Promise.all([
                                    rel.addChild(node1),
                                    rel.addChild(node2),
                                    rel.addChild(node3),
                                ])];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, rel.removeChildren([node3, node1])];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, rel.getChildren()];
                        case 3:
                            children = _a.sent();
                            assert.deepStrictEqual(children, [node2]);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should delete some of the given children', function () { return __awaiter(void 0, void 0, void 0, function () {
                var rel, node1, node2, node3, node4, error, e_7, children;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            rel = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                            node1 = new src_1.SpinalNode('node1');
                            node2 = new src_1.SpinalNode('node2');
                            node3 = new src_1.SpinalNode('node3');
                            node4 = new src_1.SpinalNode('node4');
                            error = false;
                            return [4 /*yield*/, Promise.all([
                                    rel.addChild(node1),
                                    rel.addChild(node2),
                                    rel.addChild(node3),
                                ])];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, rel.removeChildren([node3, node4, node1])];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            e_7 = _a.sent();
                            error = true;
                            assert(e_7 instanceof Error);
                            return [3 /*break*/, 5];
                        case 5:
                            assert(error);
                            return [4 /*yield*/, rel.getChildren()];
                        case 6:
                            children = _a.sent();
                            assert.deepStrictEqual(children, [node2]);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
});
//# sourceMappingURL=SpinalRelationLstPtrTest.js.map