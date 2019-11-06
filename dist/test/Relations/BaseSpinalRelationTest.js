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
var src_1 = require("../../src");
var BaseSpinalRelation_1 = require("../../src/Relations/BaseSpinalRelation");
var spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
var assert = require("assert");
var DEFAULT_RELATION_NAME = 'relationName';
var DEFAULT_NODE = new src_1.SpinalNode();
describe('BaseSpinalRelation', function () {
    describe('How to use the constructor', function () {
        it('should create a new relation with a name and node parent', function () { return __awaiter(_this, void 0, void 0, function () {
            var parent, rel, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        parent = new src_1.SpinalNode();
                        rel = new BaseSpinalRelation_1.BaseSpinalRelation(parent, DEFAULT_RELATION_NAME);
                        assert.strictEqual(rel.getName().get(), DEFAULT_RELATION_NAME);
                        _b = (_a = assert).strictEqual;
                        return [4 /*yield*/, rel.getParent()];
                    case 1:
                        _b.apply(_a, [_c.sent(), parent]);
                        assert(rel.getId() instanceof spinal_core_connectorjs_type_1.Str);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should create a new relation with a name and a context parent', function () { return __awaiter(_this, void 0, void 0, function () {
            var parent, rel, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        parent = new src_1.SpinalContext();
                        rel = new BaseSpinalRelation_1.BaseSpinalRelation(parent, DEFAULT_RELATION_NAME);
                        assert.strictEqual(rel.getName().get(), DEFAULT_RELATION_NAME);
                        _b = (_a = assert).strictEqual;
                        return [4 /*yield*/, rel.getParent()];
                    case 1:
                        _b.apply(_a, [_c.sent(), parent]);
                        assert(rel.getId() instanceof spinal_core_connectorjs_type_1.Str);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should create a new relation with a name and a graph parent', function () { return __awaiter(_this, void 0, void 0, function () {
            var parent, rel, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        parent = new src_1.SpinalGraph();
                        rel = new BaseSpinalRelation_1.BaseSpinalRelation(parent, DEFAULT_RELATION_NAME);
                        assert.strictEqual(rel.getName().get(), DEFAULT_RELATION_NAME);
                        _b = (_a = assert).strictEqual;
                        return [4 /*yield*/, rel.getParent()];
                    case 1:
                        _b.apply(_a, [_c.sent(), parent]);
                        assert(rel.getId() instanceof spinal_core_connectorjs_type_1.Str);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw an error if the parent or the name is missing', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                assert.throws(function () {
                    new BaseSpinalRelation_1.BaseSpinalRelation();
                }, TypeError);
                assert.throws(function () {
                    new BaseSpinalRelation_1.BaseSpinalRelation(undefined, DEFAULT_RELATION_NAME);
                }, TypeError);
                assert.throws(function () {
                    new BaseSpinalRelation_1.BaseSpinalRelation(DEFAULT_NODE);
                }, TypeError);
                return [2 /*return*/];
            });
        }); });
        it('should throw an error if the name is not a string', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                assert.throws(function () {
                    new BaseSpinalRelation_1.BaseSpinalRelation(DEFAULT_NODE, 1);
                }, TypeError);
                return [2 /*return*/];
            });
        }); });
        it('should throw an error if the parent is not a SpinalNode', function () { return __awaiter(_this, void 0, void 0, function () {
            var parent1, parent2;
            return __generator(this, function (_a) {
                parent1 = [];
                assert.throws(function () {
                    new BaseSpinalRelation_1.BaseSpinalRelation(parent1, DEFAULT_RELATION_NAME);
                }, TypeError);
                parent2 = new spinal_core_connectorjs_type_1.Model();
                assert.throws(function () {
                    new BaseSpinalRelation_1.BaseSpinalRelation(parent2, DEFAULT_RELATION_NAME);
                }, TypeError);
                return [2 /*return*/];
            });
        }); });
    });
    describe('How to get/set information about the relation', function () {
        describe('How to use getName', function () {
            it('should return the name DEFAULT_RELATION_NAME', function () {
                var rel = new BaseSpinalRelation_1.BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                assert.strictEqual(rel.getName().get(), DEFAULT_RELATION_NAME);
            });
        });
        describe('How to use getParent', function () {
            it('should return the parent of the relation', function () { return __awaiter(_this, void 0, void 0, function () {
                var rel, _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            rel = new BaseSpinalRelation_1.BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                            _b = (_a = assert).strictEqual;
                            return [4 /*yield*/, rel.getParent()];
                        case 1:
                            _b.apply(_a, [_c.sent(), DEFAULT_NODE]);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('How to use addContextIds and getContextIds', function () {
            it('should get the ids of the associated contexts', function () {
                var relation = new BaseSpinalRelation_1.BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                var contextId1 = new src_1.SpinalContext().getId().get();
                var contextId2 = new src_1.SpinalContext().getId().get();
                relation.addContextId(contextId1);
                assert.deepStrictEqual(relation.getContextIds(), [
                    contextId1,
                ]);
                relation.addContextId(contextId1);
                relation.addContextId(contextId2);
                assert.deepStrictEqual(relation.getContextIds(), [
                    contextId1, contextId2,
                ]);
            });
            it('should throw an error if the contextId is missing', function () {
                var relation = new BaseSpinalRelation_1.BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                assert.throws(function () {
                    relation.addContextId();
                }, TypeError);
            });
            it('should throw an error if the contextId is not a string', function () {
                var relation = new BaseSpinalRelation_1.BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                var badContextId1 = new src_1.SpinalContext().getId();
                assert.throws(function () {
                    relation.addContextId(badContextId1);
                }, TypeError);
            });
        });
        describe('How to use belongsToContext', function () {
            it('should return true', function () { return __awaiter(_this, void 0, void 0, function () {
                var context, relation;
                return __generator(this, function (_a) {
                    context = new src_1.SpinalContext();
                    relation = new BaseSpinalRelation_1.BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                    relation.addContextId(context.getId().get());
                    assert(relation.belongsToContext(context));
                    return [2 /*return*/];
                });
            }); });
            it('should return false', function () {
                var context = new src_1.SpinalContext();
                var relation = new BaseSpinalRelation_1.BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                assert(!relation.belongsToContext(context));
            });
            it('should throw an error if no context is passed', function () {
                var relation = new BaseSpinalRelation_1.BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                assert.throws(function () {
                    relation.belongsToContext(context);
                }, TypeError);
            });
            it('should throw an error if the context as the wrong type', function () {
                var context1 = {};
                var relation = new BaseSpinalRelation_1.BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                assert.throws(function () {
                    relation.belongsToContext(context1);
                }, TypeError);
                var context2 = new src_1.SpinalNode();
                assert.throws(function () {
                    relation.belongsToContext(context2);
                }, TypeError);
            });
        });
    });
    describe('How to remove from the graph', function () {
        describe('How to use removeChildren', function () {
            it('should delete all of the children', function () { return __awaiter(_this, void 0, void 0, function () {
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
            it('should delete the given children', function () { return __awaiter(_this, void 0, void 0, function () {
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
            it('should delete some of the given children', function () { return __awaiter(_this, void 0, void 0, function () {
                var rel, node1, node2, node3, node4, error, e_1, children;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            rel = new src_1.SpinalRelationLstPtr(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                            node1 = new src_1.SpinalNode();
                            node2 = new src_1.SpinalNode();
                            node3 = new src_1.SpinalNode();
                            node4 = new src_1.SpinalNode();
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
                            return [4 /*yield*/, rel.removeChildren([node3, node1, node4])];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            e_1 = _a.sent();
                            error = true;
                            assert(e_1 instanceof Error);
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
            it('should throw an error if nodes is not an array', function () { return __awaiter(_this, void 0, void 0, function () {
                var relation, error, e_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            relation = new BaseSpinalRelation_1.BaseSpinalRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME);
                            error = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, relation.removeChildren({})];
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
        });
        describe('How to use removeFromGraph', function () {
            it('should delete all of the children', function () { return __awaiter(_this, void 0, void 0, function () {
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
            it('should the relation from the parent pointer', function () { return __awaiter(_this, void 0, void 0, function () {
                var parent, rel;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            parent = new src_1.SpinalNode();
                            rel = parent._createRelation(DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_LST_PTR_TYPE);
                            return [4 /*yield*/, rel.removeFromGraph()];
                        case 1:
                            _a.sent();
                            assert(!parent.hasRelation(DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_LST_PTR_TYPE));
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
});
//# sourceMappingURL=BaseSpinalRelationTest.js.map