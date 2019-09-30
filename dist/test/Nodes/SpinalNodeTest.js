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
var DEFAULT_SPINAL_NODE_NAME = 'undefined';
var DEFAULT_SPINAL_NODE_TYPE = 'SpinalNode';
var CUSTOM_SPINAL_NODE_NAME = 'SpinalNodeTestName';
var CUSTOM_SPINAL_NODE_TYPE = 'SpinalNodeTestType';
var DEFAULT_RELATION_NAME = 'has child';
var DEFAULT_ELEMENT_NAME = 'Default Name';
var CUSTOM_RELATION_NAME1 = 'custom relation';
var CUSTOM_RELATION_NAME2 = 'custom relation 2';
var DEFAULT_ELEMENT = new spinal_core_connectorjs_type_1.Model();
DEFAULT_ELEMENT.add_attr({
    name: DEFAULT_ELEMENT_NAME
});
var DEFAULT_NODE = new src_1.SpinalNode(CUSTOM_SPINAL_NODE_NAME);
describe('SpinalNode', function () {
    describe('How to use the constructor', function () {
        it('should create an empty object FileSystem._sig_server === false', function () {
            spinal_core_connectorjs_type_1.FileSystem._sig_server = false;
            var node = new src_1.SpinalNode();
            spinal_core_connectorjs_type_1.FileSystem._sig_server = true;
            assert(typeof node.element === 'undefined');
        });
        it('should create a new spinal node.', function () { return __awaiter(void 0, void 0, void 0, function () {
            var node, elt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        node = new src_1.SpinalNode();
                        assert.strictEqual(node.getName().get(), DEFAULT_SPINAL_NODE_NAME);
                        assert.strictEqual(node.getType().get(), DEFAULT_SPINAL_NODE_TYPE);
                        return [4 /*yield*/, node.getElement()];
                    case 1:
                        elt = _a.sent();
                        assert.strictEqual(elt instanceof spinal_core_connectorjs_type_1.Model, true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should create spinal a new SpinalNode with a specific name.', function () {
            var node = new src_1.SpinalNode(CUSTOM_SPINAL_NODE_NAME);
            assert.strictEqual(node.getName().get(), CUSTOM_SPINAL_NODE_NAME, 'By setting the first argument of the construct the name should be setElement.');
        });
        it('should create a new SpinalNode with specific name and type.', function () {
            var node = new src_1.SpinalNode(CUSTOM_SPINAL_NODE_NAME, CUSTOM_SPINAL_NODE_TYPE);
            assert.strictEqual(node.getName().get(), CUSTOM_SPINAL_NODE_NAME, 'By setting the first argument of the construct the name should be setElement.');
            assert.strictEqual(node.getType().get(), CUSTOM_SPINAL_NODE_TYPE, 'By setting the second argument of the construct the type should be setElement.');
        });
        it('should create a new SpinalNode with specific name, type and element', function () { return __awaiter(void 0, void 0, void 0, function () {
            var node, elt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        node = new src_1.SpinalNode(CUSTOM_SPINAL_NODE_NAME, CUSTOM_SPINAL_NODE_TYPE, new src_1.SpinalNode());
                        assert.strictEqual(node.getName().get(), CUSTOM_SPINAL_NODE_NAME, 'By setting the first argument of the construct the name should be setElement.');
                        assert.strictEqual(node.getType().get(), CUSTOM_SPINAL_NODE_TYPE, 'By setting the second argument of the construct the type should be setElement.');
                        return [4 /*yield*/, node.getElement()];
                    case 1:
                        elt = _a.sent();
                        assert(elt instanceof src_1.SpinalNode, 'By setting the third argument of the construct the element should be setElement.');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('How to get/set information about the node', function () {
        describe('How to use getName', function () {
            it('should return the name CUSTOM_SPINAL_NODE_NAME', function () {
                var node = new src_1.SpinalNode(CUSTOM_SPINAL_NODE_NAME);
                assert.strictEqual(node.getName().get(), CUSTOM_SPINAL_NODE_NAME, 'By setting the first argument of the construct the name should be setElement.');
            });
        });
        describe('How to use getType', function () {
            it('should return the type CUSTOM_SPINAL_NODE_TYPE', function () {
                var node = new src_1.SpinalNode(CUSTOM_SPINAL_NODE_NAME, CUSTOM_SPINAL_NODE_TYPE);
                assert.strictEqual(node.getType().get(), CUSTOM_SPINAL_NODE_TYPE, 'By setting the first argument of the construct the type should be setElement.');
            });
        });
        describe('How to getElement', function () {
            it('should return the DEFAULT_ELEMENT', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, elt;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode(CUSTOM_SPINAL_NODE_NAME, CUSTOM_SPINAL_NODE_TYPE, DEFAULT_ELEMENT);
                            return [4 /*yield*/, node.getElement()];
                        case 1:
                            elt = _a.sent();
                            assert.strictEqual(elt, DEFAULT_ELEMENT, 'By setting the second argument of the construct the element should be setElement.');
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('How to use getChildrenIds', function () {
            it('should return no ids', function () {
                var node = new src_1.SpinalNode();
                assert.deepStrictEqual(node.getChildrenIds(), []);
            });
            it('should return all children ids', function () { return __awaiter(void 0, void 0, void 0, function () {
                var parent, child1, child2, child3, childrenIds;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            parent = new src_1.SpinalNode();
                            child1 = new src_1.SpinalNode();
                            child2 = new src_1.SpinalNode();
                            child3 = new src_1.SpinalNode();
                            childrenIds = [
                                child1.getId().get(),
                                child2.getId().get(),
                                child3.getId().get(),
                            ];
                            return [4 /*yield*/, Promise.all([
                                    parent.addChild(child1, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_LST_PTR_TYPE),
                                    parent.addChild(child2, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_LST_PTR_TYPE),
                                    parent.addChild(child3, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_LST_PTR_TYPE),
                                ])];
                        case 1:
                            _a.sent();
                            assert.deepStrictEqual(parent.getChildrenIds(), childrenIds);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('How to use getNbChildren', function () {
            it('should return 0', function () {
                var node = new src_1.SpinalNode();
                var res = node.getNbChildren();
                assert.strictEqual(res, 0);
            });
            it('should return 3', function () {
                var node = new src_1.SpinalNode();
                var child1 = new src_1.SpinalNode();
                var child2 = new src_1.SpinalNode();
                var child3 = new src_1.SpinalNode();
                node.addChild(child1, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE);
                node.addChild(child2, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE);
                node.addChild(child3, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE);
                var res = node.getNbChildren();
                assert.strictEqual(res, 3);
            });
            it('should return 2', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, child1, child2, child3, res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            child1 = new src_1.SpinalNode();
                            child2 = new src_1.SpinalNode();
                            child3 = new src_1.SpinalNode();
                            return [4 /*yield*/, Promise.all([
                                    node.addChild(child1, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE),
                                    node.addChild(child2, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE),
                                    node.addChild(child3, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE),
                                ])];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, node.removeChild(child2, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE)];
                        case 2:
                            _a.sent();
                            res = node.getNbChildren();
                            assert.strictEqual(res, 2);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('How to use addContextId and getContextId', function () {
            it('should get the ids of the associated contexts', function () {
                var node = new src_1.SpinalNode();
                var contextId1 = new src_1.SpinalContext().getId().get();
                var contextId2 = new src_1.SpinalContext().getId().get();
                node.addContextId(contextId1);
                assert.deepStrictEqual(node.getContextIds(), [
                    contextId1,
                ]);
                node.addContextId(contextId1);
                node.addContextId(contextId2);
                assert.deepStrictEqual(node.getContextIds(), [
                    contextId1, contextId2,
                ]);
            });
            it('should throw an error if the id is missing', function () {
                var node = new src_1.SpinalNode();
                assert.throws(function () {
                    node.addContextId();
                }, TypeError);
            });
            it('should throw an error if the id is not a string', function () {
                var node = new src_1.SpinalNode();
                var context = new src_1.SpinalContext();
                assert.throws(function () {
                    node.addContextId(context.getId());
                }, TypeError);
            });
        });
        describe('How to use belongsToContext', function () {
            it('should return true', function () { return __awaiter(void 0, void 0, void 0, function () {
                var context, parent, child;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            context = new src_1.SpinalContext();
                            parent = new src_1.SpinalNode();
                            child = new src_1.SpinalNode();
                            return [4 /*yield*/, parent.addChildInContext(child, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE, context)];
                        case 1:
                            _a.sent();
                            assert(child.belongsToContext(context));
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should return false', function () {
                var context = new src_1.SpinalContext();
                var node = new src_1.SpinalNode();
                assert(!node.belongsToContext(context));
            });
            it('should throw an error if the context is missing', function () {
                var node = new src_1.SpinalNode();
                assert.throws(function () {
                    node.belongsToContext(context);
                }, TypeError);
            });
            it('should throw an error if the context is missing', function () {
                var node = new src_1.SpinalNode();
                assert.throws(function () {
                    node.belongsToContext(1);
                }, TypeError);
            });
        });
    });
    describe("How to get information about the node's relations", function () {
        describe('How to use hasRelation', function () {
            it('should return true', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            return [4 /*yield*/, node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE)];
                        case 1:
                            _a.sent();
                            assert.strictEqual(node.hasRelation(DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE), true);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should return false', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            return [4 /*yield*/, node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE)];
                        case 1:
                            _a.sent();
                            assert.strictEqual(node.hasRelation(CUSTOM_RELATION_NAME1, src_1.SPINAL_RELATION_TYPE), false);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw an error if the relation name is missing', function () {
                var node = new src_1.SpinalNode();
                assert.throws(function () {
                    node.hasRelation(undefined, src_1.SPINAL_RELATION_TYPE);
                }, TypeError);
            });
            it('should throw an error if the relation name is not a string', function () {
                var node = new src_1.SpinalNode();
                assert.throws(function () {
                    node.hasRelation(1, src_1.SPINAL_RELATION_TYPE);
                }, TypeError);
            });
            it('should throw an error if the relation type is missing', function () {
                var node = new src_1.SpinalNode();
                assert.throws(function () {
                    node.hasRelation(DEFAULT_RELATION_NAME);
                }, Error);
            });
            it('should throw an error if the relation type is not valid', function () {
                var node = new src_1.SpinalNode();
                assert.throws(function () {
                    node.hasRelation(DEFAULT_RELATION_NAME, 1);
                }, Error);
            });
        });
        describe('How to use hasRelations', function () {
            it('should return true the node contains all the relations', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            return [4 /*yield*/, Promise.all([
                                    node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE),
                                    node.addChild(DEFAULT_NODE, CUSTOM_RELATION_NAME1, src_1.SPINAL_RELATION_TYPE),
                                ])];
                        case 1:
                            _a.sent();
                            assert.strictEqual(node.hasRelations([DEFAULT_RELATION_NAME, CUSTOM_RELATION_NAME1], src_1.SPINAL_RELATION_TYPE), true);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should return false if the node doesn't contain all the relations", function () { return __awaiter(void 0, void 0, void 0, function () {
                var node;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            return [4 /*yield*/, Promise.all([
                                    node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE),
                                    node.addChild(DEFAULT_NODE, CUSTOM_RELATION_NAME1, src_1.SPINAL_RELATION_TYPE),
                                ])];
                        case 1:
                            _a.sent();
                            assert.strictEqual(node.hasRelations([CUSTOM_RELATION_NAME1, CUSTOM_RELATION_NAME2], src_1.SPINAL_RELATION_TYPE), false);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw an error if the relation name array is missing', function () {
                var node = new src_1.SpinalNode();
                assert.throws(function () {
                    node.hasRelations(undefined, src_1.SPINAL_RELATION_TYPE);
                }, TypeError);
            });
            it('should throw an error if the relation name array is not an array', function () {
                var node = new src_1.SpinalNode();
                assert.throws(function () {
                    node.hasRelations(1, src_1.SPINAL_RELATION_TYPE);
                }, TypeError);
            });
            it('should throw an error if the relation type is missing', function () {
                var node = new src_1.SpinalNode();
                assert.throws(function () {
                    node.hasRelations([]);
                }, Error);
            });
            it('should throw an error if the relation type is not valid', function () {
                var node = new src_1.SpinalNode();
                assert.throws(function () {
                    node.hasRelations([], 1);
                }, Error);
            });
            it('should throw an error if on of the relation names is not a string', function () {
                var node = new src_1.SpinalNode();
                assert.throws(function () {
                    node.hasRelations([1], src_1.SPINAL_RELATION_TYPE);
                }, TypeError);
            });
        });
        describe('How to use getRelationNames', function () {
            it('should return no name', function () {
                var node = new src_1.SpinalNode();
                assert.deepStrictEqual(node.getRelationNames(), []);
            });
            it('should return all relation names', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, child1, child2, child3, child4, child5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            child1 = new src_1.SpinalNode();
                            child2 = new src_1.SpinalNode();
                            child3 = new src_1.SpinalNode();
                            child4 = new src_1.SpinalNode();
                            child5 = new src_1.SpinalNode();
                            return [4 /*yield*/, Promise.all([
                                    node.addChild(child1, DEFAULT_RELATION_NAME + "1", src_1.SPINAL_RELATION_LST_PTR_TYPE),
                                    node.addChild(child2, DEFAULT_RELATION_NAME + "2", src_1.SPINAL_RELATION_LST_PTR_TYPE),
                                    node.addChild(child3, DEFAULT_RELATION_NAME + "2", src_1.SPINAL_RELATION_LST_PTR_TYPE),
                                    node.addChild(child4, DEFAULT_RELATION_NAME + "1", src_1.SPINAL_RELATION_LST_PTR_TYPE),
                                    node.addChild(child5, DEFAULT_RELATION_NAME + "4", src_1.SPINAL_RELATION_LST_PTR_TYPE),
                                ])];
                        case 1:
                            _a.sent();
                            assert.deepStrictEqual(node.getRelationNames(), [
                                DEFAULT_RELATION_NAME + "1",
                                DEFAULT_RELATION_NAME + "2",
                                DEFAULT_RELATION_NAME + "4",
                            ]);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("shouldn't return duplicates if there are different " +
                'relation with the same names but different types', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, child1, child2, child3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            child1 = new src_1.SpinalNode();
                            child2 = new src_1.SpinalNode();
                            child3 = new src_1.SpinalNode();
                            return [4 /*yield*/, Promise.all([
                                    node.addChild(child1, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE),
                                    node.addChild(child2, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_LST_PTR_TYPE),
                                    node.addChild(child3, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_PTR_LST_TYPE),
                                ])];
                        case 1:
                            _a.sent();
                            assert.deepStrictEqual(node.getRelationNames(), [DEFAULT_RELATION_NAME]);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe('How to add a child to the node', function () {
        describe('How to use addChild', function () {
            it('should add a child to the node with a relation type SPINAL_RELATION_TYPE', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, children;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            return [4 /*yield*/, node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE)];
                        case 1:
                            _a.sent();
                            assert.strictEqual(typeof node !== 'undefined', true);
                            assert.strictEqual(node.hasRelation(DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE), true);
                            return [4 /*yield*/, node.getChildren([DEFAULT_RELATION_NAME])];
                        case 2:
                            children = _a.sent();
                            assert.strictEqual(children.length, 1);
                            assert.strictEqual(children[0], DEFAULT_NODE);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should add a child to the node with a relation type SPINAL_RELATION_TYPE', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, children;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_PTR_LST_TYPE);
                            assert.strictEqual(typeof node !== 'undefined', true);
                            assert.strictEqual(node.hasRelation(DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_PTR_LST_TYPE), true);
                            return [4 /*yield*/, node.getChildren([DEFAULT_RELATION_NAME])];
                        case 1:
                            children = _a.sent();
                            assert.strictEqual(children.length, 1);
                            assert.strictEqual(children[0], DEFAULT_NODE);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should add a child to the node with a relation type SPINAL_RELATION_LST_PTR_TYPE', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, children;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            return [4 /*yield*/, node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_LST_PTR_TYPE)];
                        case 1:
                            _a.sent();
                            assert.strictEqual(typeof node !== 'undefined', true);
                            assert.strictEqual(node.hasRelation(DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_LST_PTR_TYPE), true);
                            return [4 /*yield*/, node.getChildren([DEFAULT_RELATION_NAME])];
                        case 2:
                            children = _a.sent();
                            assert.strictEqual(children.length, 1);
                            assert.strictEqual(children[0], DEFAULT_NODE);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should return the node added to the relation', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, childNode, childModel, res1, res2, res2Elem;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            childNode = new src_1.SpinalNode();
                            childModel = new spinal_core_connectorjs_type_1.Model();
                            return [4 /*yield*/, node.addChild(childNode, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE)];
                        case 1:
                            res1 = _a.sent();
                            assert.strictEqual(res1, childNode);
                            return [4 /*yield*/, node.addChild(childModel, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE)];
                        case 2:
                            res2 = _a.sent();
                            return [4 /*yield*/, res2.getElement()];
                        case 3:
                            res2Elem = _a.sent();
                            assert.strictEqual(res2Elem, childModel);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw an error if you try to add the same node twice', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, error, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            return [4 /*yield*/, node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE)];
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
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw an error if the child is not a model', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, error, e_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            error = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, node.addChild([], DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE)];
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
            it('should throw an error if the relation name is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, error, e_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            error = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, node.addChild(DEFAULT_NODE, undefined, src_1.SPINAL_RELATION_TYPE)];
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
            it('should throw an error if the relation name is not a string', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, error, e_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            error = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, node.addChild(DEFAULT_NODE, 1, src_1.SPINAL_RELATION_TYPE)];
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
            it('should throw an error if the relation type is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, error, e_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            error = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME)];
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
            it('should throw an error if the relation type is invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, error, e_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            error = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, 1)];
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
        describe('How to use addChildInContext', function () {
            it('Should add a child to a node', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, context, children;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            context = new src_1.SpinalContext();
                            return [4 /*yield*/, node.addChildInContext(DEFAULT_NODE, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE, context)];
                        case 1:
                            _a.sent();
                            assert.strictEqual(typeof node !== 'undefined', true);
                            assert.strictEqual(node.hasRelation(DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE), true);
                            return [4 /*yield*/, node.getChildren([DEFAULT_RELATION_NAME])];
                        case 2:
                            children = _a.sent();
                            assert.strictEqual(children.length, 1);
                            assert.strictEqual(children[0], DEFAULT_NODE);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('Shoud add a child and associate it to the context', function () { return __awaiter(void 0, void 0, void 0, function () {
                var context, parent, child;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            context = new src_1.SpinalContext();
                            parent = new src_1.SpinalNode();
                            child = new src_1.SpinalNode();
                            return [4 /*yield*/, parent.addChildInContext(child, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE, context)];
                        case 1:
                            _a.sent();
                            assert.deepStrictEqual(child.getContextIds(), [context.getId().get()]);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should return the node added to the relation', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, context, childNode, childModel, res1, res2, res2Elem;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode(DEFAULT_RELATION_NAME);
                            context = new src_1.SpinalContext();
                            childNode = new src_1.SpinalNode();
                            childModel = new spinal_core_connectorjs_type_1.Model();
                            return [4 /*yield*/, node.addChildInContext(childNode, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE, context)];
                        case 1:
                            res1 = _a.sent();
                            assert.strictEqual(res1, childNode);
                            return [4 /*yield*/, node.addChildInContext(childModel, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE, context)];
                        case 2:
                            res2 = _a.sent();
                            return [4 /*yield*/, res2.getElement()];
                        case 3:
                            res2Elem = _a.sent();
                            assert.strictEqual(res2Elem, childModel);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw an error if you try to add the same node twice', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, context, error, e_7;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode(DEFAULT_RELATION_NAME);
                            context = new src_1.SpinalContext();
                            error = false;
                            return [4 /*yield*/, node.addChildInContext(DEFAULT_NODE, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE, context)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, node.addChildInContext(DEFAULT_NODE, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE, context)];
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
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw an error if the child is not a model', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, context, error, e_8;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode(DEFAULT_RELATION_NAME);
                            context = new src_1.SpinalContext();
                            error = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, node.addChildInContext([], DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE, context)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_8 = _a.sent();
                            error = true;
                            assert(e_8 instanceof Error);
                            return [3 /*break*/, 4];
                        case 4:
                            assert(error);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw an error if the relation name is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, context, error, e_9;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            context = new src_1.SpinalContext();
                            error = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, node.addChildInContext(DEFAULT_NODE, undefined, src_1.SPINAL_RELATION_TYPE, context)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_9 = _a.sent();
                            error = true;
                            assert(e_9 instanceof Error);
                            return [3 /*break*/, 4];
                        case 4:
                            assert(error);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw an error if the relation name is not a string', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, context, error, e_10;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            context = new src_1.SpinalContext();
                            error = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, node.addChildInContext(DEFAULT_NODE, 1, src_1.SPINAL_RELATION_TYPE, context)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_10 = _a.sent();
                            error = true;
                            assert(e_10 instanceof Error);
                            return [3 /*break*/, 4];
                        case 4:
                            assert(error);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw an error if the relation type is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, context, error, e_11;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            context = new src_1.SpinalContext();
                            error = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, node.addChildInContext(DEFAULT_NODE, DEFAULT_RELATION_NAME, undefined, context)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_11 = _a.sent();
                            error = true;
                            assert(e_11 instanceof Error);
                            return [3 /*break*/, 4];
                        case 4:
                            assert(error);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw an error if the relation type is invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, context, error, e_12;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            context = new src_1.SpinalContext();
                            error = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, node.addChildInContext(DEFAULT_NODE, DEFAULT_RELATION_NAME, 1, context)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_12 = _a.sent();
                            error = true;
                            assert(e_12 instanceof Error);
                            return [3 /*break*/, 4];
                        case 4:
                            assert(error);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw an error if the context is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, error, e_13;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            error = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, node.addChildInContext(DEFAULT_NODE, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_LST_PTR_TYPE)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_13 = _a.sent();
                            error = true;
                            assert(e_13 instanceof Error);
                            return [3 /*break*/, 4];
                        case 4:
                            assert(error);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw an error if the context is not a SpinalContext', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, error, e_14;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            error = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, node.addChildInContext(DEFAULT_NODE, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_LST_PTR_TYPE, 1)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_14 = _a.sent();
                            error = true;
                            assert(e_14 instanceof Error);
                            return [3 /*break*/, 4];
                        case 4:
                            assert(error);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe('How to remove child(s)', function () {
        describe('How to use removeChild', function () {
            it('should remove the child', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, children;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            return [4 /*yield*/, node.addChild(node, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, node.removeChild(node, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, node.getChildren([])];
                        case 3:
                            children = _a.sent();
                            assert.deepStrictEqual(children, []);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw if the relation name is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, error, e_15;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            error = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, node.removeChild(node, undefined, src_1.SPINAL_RELATION_TYPE)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_15 = _a.sent();
                            error = true;
                            assert(e_15 instanceof Error);
                            return [3 /*break*/, 4];
                        case 4:
                            assert(error);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw if the relation name is not a string', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, error, e_16;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            error = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, node.removeChild(node, 1, src_1.SPINAL_RELATION_TYPE)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_16 = _a.sent();
                            error = true;
                            assert(e_16 instanceof Error);
                            return [3 /*break*/, 4];
                        case 4:
                            assert(error);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw if the relation type is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, error, e_17;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            error = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, node.removeChild(node, DEFAULT_RELATION_NAME)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_17 = _a.sent();
                            error = true;
                            assert(e_17 instanceof Error);
                            return [3 /*break*/, 4];
                        case 4:
                            assert(error);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw if the relation type is invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, error, e_18;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            error = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, node.removeChild(node, DEFAULT_RELATION_NAME, 1)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_18 = _a.sent();
                            error = true;
                            assert(e_18 instanceof Error);
                            return [3 /*break*/, 4];
                        case 4:
                            assert(error);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should throw if the relation doesn't exist", function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, error, e_19, e_20, children;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            error = false;
                            return [4 /*yield*/, node.addChild(node, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, node.removeChild(node, DEFAULT_RELATION_NAME + "1", src_1.SPINAL_RELATION_TYPE)];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            e_19 = _a.sent();
                            error = true;
                            assert(e_19 instanceof Error);
                            return [3 /*break*/, 5];
                        case 5:
                            assert(error);
                            error = false;
                            _a.label = 6;
                        case 6:
                            _a.trys.push([6, 8, , 9]);
                            return [4 /*yield*/, node.removeChild(node, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE + "1")];
                        case 7:
                            _a.sent();
                            return [3 /*break*/, 9];
                        case 8:
                            e_20 = _a.sent();
                            error = true;
                            assert(e_20 instanceof Error);
                            return [3 /*break*/, 9];
                        case 9:
                            assert(error);
                            return [4 /*yield*/, node.getChildren([])];
                        case 10:
                            children = _a.sent();
                            assert.deepStrictEqual(children, [node]);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw if the node is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, error, e_21;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            error = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, node.removeChild(undefined, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_21 = _a.sent();
                            error = true;
                            assert(e_21 instanceof Error);
                            return [3 /*break*/, 4];
                        case 4:
                            assert(error);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw if the node is not a child', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, error, e_22;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            error = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, node.removeChild(node, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_22 = _a.sent();
                            error = true;
                            assert(e_22 instanceof Error);
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
                var parent, node1, node2, node3, children;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            parent = new src_1.SpinalNode();
                            node1 = new src_1.SpinalNode();
                            node2 = new src_1.SpinalNode();
                            node3 = new src_1.SpinalNode();
                            return [4 /*yield*/, Promise.all([
                                    parent.addChild(node1, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE),
                                    parent.addChild(node2, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE),
                                    parent.addChild(node3, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE),
                                ])];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, parent.removeChildren([node1, node2, node3], DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, parent.getChildren()];
                        case 3:
                            children = _a.sent();
                            assert.deepStrictEqual(children, []);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should delete the given children', function () { return __awaiter(void 0, void 0, void 0, function () {
                var parent, node1, node2, node3, children;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            parent = new src_1.SpinalNode();
                            node1 = new src_1.SpinalNode();
                            node2 = new src_1.SpinalNode();
                            node3 = new src_1.SpinalNode();
                            return [4 /*yield*/, Promise.all([
                                    parent.addChild(node1, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE),
                                    parent.addChild(node2, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE),
                                    parent.addChild(node3, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE),
                                ])];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, parent.removeChildren([
                                    node3,
                                    node1,
                                ], DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, parent.getChildren()];
                        case 3:
                            children = _a.sent();
                            assert.deepStrictEqual(children, [node2]);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw an error if nodes is not an array', function () { return __awaiter(void 0, void 0, void 0, function () {
                var parent, error, e_23;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            parent = new src_1.SpinalNode();
                            error = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, parent.removeChildren(1, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_23 = _a.sent();
                            error = true;
                            assert(e_23 instanceof Error);
                            return [3 /*break*/, 4];
                        case 4:
                            assert(error);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw an error if an element of nodes is not a SpinalNode', function () { return __awaiter(void 0, void 0, void 0, function () {
                var parent, node1, error, e_24;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            parent = new src_1.SpinalNode();
                            node1 = new src_1.SpinalNode();
                            error = false;
                            return [4 /*yield*/, Promise.all([
                                    parent.addChild(node1, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE),
                                ])];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, parent.removeChildren([
                                    node1,
                                    1,
                                ], DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE)];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            e_24 = _a.sent();
                            error = true;
                            assert(e_24 instanceof Error);
                            return [3 /*break*/, 5];
                        case 5:
                            assert(error);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw an error if an element of nodes is not a child', function () { return __awaiter(void 0, void 0, void 0, function () {
                var parent, node1, node2, error, e_25;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            parent = new src_1.SpinalNode();
                            node1 = new src_1.SpinalNode();
                            node2 = new src_1.SpinalNode();
                            error = false;
                            return [4 /*yield*/, Promise.all([
                                    parent.addChild(node1, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE),
                                ])];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, parent.removeChildren([
                                    node1,
                                    node2,
                                ], DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE)];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            e_25 = _a.sent();
                            error = true;
                            assert(e_25 instanceof Error);
                            return [3 /*break*/, 5];
                        case 5:
                            assert(error);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw if the relation name is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, error, e_26;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            error = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, node.removeChildren([], undefined, src_1.SPINAL_RELATION_TYPE)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_26 = _a.sent();
                            error = true;
                            assert(e_26 instanceof Error);
                            return [3 /*break*/, 4];
                        case 4:
                            assert(error);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw if the relation name is not a string', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, error, e_27;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            error = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, node.removeChildren([], 1, src_1.SPINAL_RELATION_TYPE)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_27 = _a.sent();
                            error = true;
                            assert(e_27 instanceof Error);
                            return [3 /*break*/, 4];
                        case 4:
                            assert(error);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw if the relation type is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, error, e_28;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            error = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, node.removeChildren([], DEFAULT_RELATION_NAME)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_28 = _a.sent();
                            error = true;
                            assert(e_28 instanceof Error);
                            return [3 /*break*/, 4];
                        case 4:
                            assert(error);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw if the relation type is invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, error, e_29;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            error = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, node.removeChildren([], DEFAULT_RELATION_NAME, 1)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_29 = _a.sent();
                            error = true;
                            assert(e_29 instanceof Error);
                            return [3 /*break*/, 4];
                        case 4:
                            assert(error);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should throw if the relation doesn't exist", function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, child, error, e_30, e_31, children;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            child = new src_1.SpinalNode();
                            error = false;
                            return [4 /*yield*/, node.addChild(child, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, node.removeChildren([], DEFAULT_RELATION_NAME + "1", src_1.SPINAL_RELATION_TYPE)];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            e_30 = _a.sent();
                            error = true;
                            assert(e_30 instanceof Error);
                            return [3 /*break*/, 5];
                        case 5:
                            assert(error);
                            error = false;
                            _a.label = 6;
                        case 6:
                            _a.trys.push([6, 8, , 9]);
                            return [4 /*yield*/, node.removeChildren(node, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_LST_PTR_TYPE)];
                        case 7:
                            _a.sent();
                            return [3 /*break*/, 9];
                        case 8:
                            e_31 = _a.sent();
                            error = true;
                            assert(e_31 instanceof Error);
                            return [3 /*break*/, 9];
                        case 9:
                            assert(error);
                            return [4 /*yield*/, node.getChildren([])];
                        case 10:
                            children = _a.sent();
                            assert.deepStrictEqual(children, [child]);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('How to use removeRelation', function () {
            it('should remove the relation', function () { return __awaiter(void 0, void 0, void 0, function () {
                var parent, child;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            parent = new src_1.SpinalNode();
                            child = new src_1.SpinalNode();
                            return [4 /*yield*/, parent.addChild(child, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, parent.removeRelation(DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE)];
                        case 2:
                            _a.sent();
                            assert(!parent.hasRelation(DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE));
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw if the relation name is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, error, e_32;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            error = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, node.removeRelation(undefined, src_1.SPINAL_RELATION_TYPE)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_32 = _a.sent();
                            error = true;
                            assert(e_32 instanceof Error);
                            return [3 /*break*/, 4];
                        case 4:
                            assert(error);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw if the relation name is not a string', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, error, e_33;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            error = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, node.removeRelation(node, 1, src_1.SPINAL_RELATION_TYPE)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_33 = _a.sent();
                            error = true;
                            assert(e_33 instanceof Error);
                            return [3 /*break*/, 4];
                        case 4:
                            assert(error);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw if the relation type is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, error, e_34;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            error = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, node.removeRelation(node, DEFAULT_RELATION_NAME)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_34 = _a.sent();
                            error = true;
                            assert(e_34 instanceof Error);
                            return [3 /*break*/, 4];
                        case 4:
                            assert(error);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw if the relation type is invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, error, e_35;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            error = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, node.removeRelation(node, DEFAULT_RELATION_NAME, 1)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_35 = _a.sent();
                            error = true;
                            assert(e_35 instanceof Error);
                            return [3 /*break*/, 4];
                        case 4:
                            assert(error);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should throw if the relation doesn't exist", function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, error, e_36, e_37, children;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            error = false;
                            return [4 /*yield*/, node.addChild(node, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, node.removeRelation(DEFAULT_RELATION_NAME + "1", src_1.SPINAL_RELATION_TYPE)];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            e_36 = _a.sent();
                            error = true;
                            assert(e_36 instanceof Error);
                            return [3 /*break*/, 5];
                        case 5:
                            assert(error);
                            error = false;
                            _a.label = 6;
                        case 6:
                            _a.trys.push([6, 8, , 9]);
                            return [4 /*yield*/, node.removeRelation(DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE + "1")];
                        case 7:
                            _a.sent();
                            return [3 /*break*/, 9];
                        case 8:
                            e_37 = _a.sent();
                            error = true;
                            assert(e_37 instanceof Error);
                            return [3 /*break*/, 9];
                        case 9:
                            assert(error);
                            return [4 /*yield*/, node.getChildren([])];
                        case 10:
                            children = _a.sent();
                            assert.deepStrictEqual(children, [node]);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('How to use removeFromGraph', function () {
            it('should remove the node from its parents', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, parentNode, children;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            parentNode = new src_1.SpinalNode();
                            return [4 /*yield*/, parentNode.addChild(node, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, node.removeFromGraph()];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, parentNode.getChildren([])];
                        case 3:
                            children = _a.sent();
                            assert.deepStrictEqual(children, []);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should remove the node from its children', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, parentNode, parents;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            parentNode = new src_1.SpinalNode();
                            return [4 /*yield*/, parentNode.addChild(node, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, parentNode.removeFromGraph()];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, parentNode.getParents([])];
                        case 3:
                            parents = _a.sent();
                            assert.deepStrictEqual(parents, []);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe('How to get related nodes', function () {
        describe('How to use getChild', function () {
            it('should get the child', function () { return __awaiter(void 0, void 0, void 0, function () {
                var parent, child, res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            parent = new src_1.SpinalNode();
                            child = new src_1.SpinalNode();
                            return [4 /*yield*/, parent.addChild(child, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, parent.getChild(function (node) { return node === child; }, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE)];
                        case 2:
                            res = _a.sent();
                            assert.strictEqual(res, child);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should use the relation name', function () { return __awaiter(void 0, void 0, void 0, function () {
                var parent, child1, child2, child3, child4, res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            parent = new src_1.SpinalNode();
                            child1 = new src_1.SpinalNode();
                            child2 = new src_1.SpinalNode();
                            child3 = new src_1.SpinalNode();
                            child4 = new src_1.SpinalNode();
                            return [4 /*yield*/, Promise.all([
                                    parent.addChild(child1, DEFAULT_RELATION_NAME + "1", src_1.SPINAL_RELATION_TYPE),
                                    parent.addChild(child2, DEFAULT_RELATION_NAME + "2", src_1.SPINAL_RELATION_TYPE),
                                    parent.addChild(child3, DEFAULT_RELATION_NAME + "3", src_1.SPINAL_RELATION_TYPE),
                                    parent.addChild(child4, DEFAULT_RELATION_NAME + "4", src_1.SPINAL_RELATION_TYPE),
                                ])];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, parent.getChild(function () { return true; }, DEFAULT_RELATION_NAME + "3", src_1.SPINAL_RELATION_TYPE)];
                        case 2:
                            res = _a.sent();
                            assert.strictEqual(res, child3);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should use the relation type', function () { return __awaiter(void 0, void 0, void 0, function () {
                var parent, child1, child2, child3, res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            parent = new src_1.SpinalNode();
                            child1 = new src_1.SpinalNode();
                            child2 = new src_1.SpinalNode();
                            child3 = new src_1.SpinalNode();
                            return [4 /*yield*/, Promise.all([
                                    parent.addChild(child1, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE),
                                    parent.addChild(child2, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_LST_PTR_TYPE),
                                    parent.addChild(child3, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_PTR_LST_TYPE),
                                ])];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, parent.getChild(function () { return true; }, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_PTR_LST_TYPE)];
                        case 2:
                            res = _a.sent();
                            assert.strictEqual(res, child3);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should return undefined if the child doesn't exist", function () { return __awaiter(void 0, void 0, void 0, function () {
                var parent, child, res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            parent = new src_1.SpinalNode();
                            child = new src_1.SpinalNode();
                            return [4 /*yield*/, parent.addChild(child, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, parent.getChild(function () { return false; }, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE)];
                        case 2:
                            res = _a.sent();
                            assert.strictEqual(res, undefined);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw if the relation name is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
                var parent, child, error, e_38;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            parent = new src_1.SpinalNode();
                            child = new src_1.SpinalNode();
                            error = false;
                            return [4 /*yield*/, parent.addChild(child, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, parent.getChild(function () { return true; }, undefined, src_1.SPINAL_RELATION_TYPE)];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            e_38 = _a.sent();
                            error = true;
                            assert(e_38 instanceof Error);
                            return [3 /*break*/, 5];
                        case 5:
                            assert(error);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw if the relation name is not a string', function () { return __awaiter(void 0, void 0, void 0, function () {
                var parent, child, error, e_39;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            parent = new src_1.SpinalNode();
                            child = new src_1.SpinalNode();
                            error = false;
                            return [4 /*yield*/, parent.addChild(child, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, parent.getChild(function () { return true; }, 1, src_1.SPINAL_RELATION_TYPE)];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            e_39 = _a.sent();
                            error = true;
                            assert(e_39 instanceof Error);
                            return [3 /*break*/, 5];
                        case 5:
                            assert(error);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw if the relation type is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
                var parent, child, error, e_40;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            parent = new src_1.SpinalNode();
                            child = new src_1.SpinalNode();
                            error = false;
                            return [4 /*yield*/, parent.addChild(child, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, parent.getChild(function () { return true; }, DEFAULT_RELATION_NAME)];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            e_40 = _a.sent();
                            error = true;
                            assert(e_40 instanceof Error);
                            return [3 /*break*/, 5];
                        case 5:
                            assert(error);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw if the relation type is invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
                var parent, child, error, e_41;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            parent = new src_1.SpinalNode();
                            child = new src_1.SpinalNode();
                            error = false;
                            return [4 /*yield*/, parent.addChild(child, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, parent.getChild(function () { return true; }, DEFAULT_RELATION_NAME, false)];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            e_41 = _a.sent();
                            error = true;
                            assert(e_41 instanceof Error);
                            return [3 /*break*/, 5];
                        case 5:
                            assert(error);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should throw if the relation doesn't exist", function () { return __awaiter(void 0, void 0, void 0, function () {
                var parent, child, error, e_42, e_43;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            parent = new src_1.SpinalNode();
                            child = new src_1.SpinalNode();
                            error = false;
                            return [4 /*yield*/, parent.addChild(child, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, parent.getChild(function () { return true; }, DEFAULT_RELATION_NAME + "1", src_1.SPINAL_RELATION_TYPE)];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            e_42 = _a.sent();
                            error = true;
                            assert(e_42 instanceof Error);
                            return [3 /*break*/, 5];
                        case 5:
                            assert(error);
                            error = false;
                            _a.label = 6;
                        case 6:
                            _a.trys.push([6, 8, , 9]);
                            return [4 /*yield*/, parent.getChild(function () { return true; }, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_LST_PTR_TYPE)];
                        case 7:
                            _a.sent();
                            return [3 /*break*/, 9];
                        case 8:
                            e_43 = _a.sent();
                            error = true;
                            assert(e_43 instanceof Error);
                            return [3 /*break*/, 9];
                        case 9:
                            assert(error);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw if the predicate is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
                var parent, child, error, e_44;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            parent = new src_1.SpinalNode();
                            child = new src_1.SpinalNode();
                            error = false;
                            return [4 /*yield*/, parent.addChild(child, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, parent.getChild(undefined, DEFAULT_RELATION_NAME, false)];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            e_44 = _a.sent();
                            error = true;
                            assert(e_44 instanceof Error);
                            return [3 /*break*/, 5];
                        case 5:
                            assert(error);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw if the predicate is not a function', function () { return __awaiter(void 0, void 0, void 0, function () {
                var parent, child, error, e_45;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            parent = new src_1.SpinalNode();
                            child = new src_1.SpinalNode();
                            error = false;
                            return [4 /*yield*/, parent.addChild(child, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, parent.getChild(123, DEFAULT_RELATION_NAME, false)];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            e_45 = _a.sent();
                            error = true;
                            assert(e_45 instanceof Error);
                            return [3 /*break*/, 5];
                        case 5:
                            assert(error);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('How to use getChildren', function () {
            it('should return no children', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, children;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            return [4 /*yield*/, node.getChildren([])];
                        case 1:
                            children = _a.sent();
                            assert.deepStrictEqual(children, []);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should return some children', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, children;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            return [4 /*yield*/, Promise.all([
                                    node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE),
                                    node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME + "2", src_1.SPINAL_RELATION_TYPE),
                                ])];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, node.getChildren([DEFAULT_RELATION_NAME])];
                        case 2:
                            children = _a.sent();
                            assert.deepStrictEqual(children, [DEFAULT_NODE]);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should return all children', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, children;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            return [4 /*yield*/, Promise.all([
                                    node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE),
                                    node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME + "2", src_1.SPINAL_RELATION_TYPE),
                                ])];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, node.getChildren([])];
                        case 2:
                            children = _a.sent();
                            assert.deepStrictEqual(children, [DEFAULT_NODE, DEFAULT_NODE]);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should return all children also', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, children;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            return [4 /*yield*/, Promise.all([
                                    node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE),
                                    node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME + "2", src_1.SPINAL_RELATION_TYPE),
                                ])];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, node.getChildren()];
                        case 2:
                            children = _a.sent();
                            assert.deepStrictEqual(children, [DEFAULT_NODE, DEFAULT_NODE]);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should return children for one relation name passed has string', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, children;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            return [4 /*yield*/, Promise.all([
                                    node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE),
                                    node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME + "2", src_1.SPINAL_RELATION_TYPE),
                                ])];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, node.getChildren(DEFAULT_RELATION_NAME)];
                        case 2:
                            children = _a.sent();
                            assert.deepStrictEqual(children, [DEFAULT_NODE]);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw an error if relationNames is neither an array, a string or omitted', function () { return __awaiter(void 0, void 0, void 0, function () {
                var parent, error, e_46;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            parent = new src_1.SpinalNode();
                            error = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, parent.getChildren(1)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_46 = _a.sent();
                            error = true;
                            assert(e_46 instanceof Error);
                            return [3 /*break*/, 4];
                        case 4:
                            assert(error);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw an error if an element of relationNames is not a string', function () { return __awaiter(void 0, void 0, void 0, function () {
                var parent, node1, error, e_47;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            parent = new src_1.SpinalNode();
                            node1 = new src_1.SpinalNode();
                            error = false;
                            return [4 /*yield*/, Promise.all([
                                    parent.addChild(node1, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE),
                                ])];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, parent.getChildren([
                                    DEFAULT_RELATION_NAME + "1",
                                    1,
                                ])];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            e_47 = _a.sent();
                            error = true;
                            assert(e_47 instanceof Error);
                            return [3 /*break*/, 5];
                        case 5:
                            assert(error);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('How to use getChildrenInContext', function () {
            it("should return the node's child", function () { return __awaiter(void 0, void 0, void 0, function () {
                var context, parent, child, children;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            context = new src_1.SpinalContext();
                            parent = new src_1.SpinalNode();
                            child = new src_1.SpinalNode();
                            return [4 /*yield*/, parent.addChildInContext(child, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_PTR_LST_TYPE, context)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, parent.getChildrenInContext(context)];
                        case 2:
                            children = _a.sent();
                            assert.deepStrictEqual(children, [child]);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should return the node's children associated to the context", function () { return __awaiter(void 0, void 0, void 0, function () {
                var context, parent, child1, child2, child3, children;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            context = new src_1.SpinalContext();
                            parent = new src_1.SpinalNode();
                            child1 = new src_1.SpinalNode();
                            child2 = new src_1.SpinalNode();
                            child3 = new src_1.SpinalNode();
                            return [4 /*yield*/, Promise.all([
                                    parent.addChildInContext(child1, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_LST_PTR_TYPE, context),
                                    parent.addChild(child2, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_PTR_LST_TYPE),
                                    parent.addChildInContext(child3, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE, context),
                                ])];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, parent.getChildrenInContext(context)];
                        case 2:
                            children = _a.sent();
                            assert.deepStrictEqual(children, [child1, child3]);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw an error if the context is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
                var parent, error, e_48;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            parent = new src_1.SpinalNode();
                            error = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, parent.getChildrenInContext()];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_48 = _a.sent();
                            error = true;
                            assert(e_48 instanceof Error);
                            return [3 /*break*/, 4];
                        case 4:
                            assert(error);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw an error if the context is not a SpinalContext', function () { return __awaiter(void 0, void 0, void 0, function () {
                var parent, error, e_49;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            parent = new src_1.SpinalNode();
                            error = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, parent.getChildrenInContext(1)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_49 = _a.sent();
                            error = true;
                            assert(e_49 instanceof Error);
                            return [3 /*break*/, 4];
                        case 4:
                            assert(error);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('How to use getParents', function () {
            it('should return no parents', function () { return __awaiter(void 0, void 0, void 0, function () {
                var node, parents;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            node = new src_1.SpinalNode();
                            return [4 /*yield*/, node.getParents([])];
                        case 1:
                            parents = _a.sent();
                            assert.deepStrictEqual(parents, []);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should return some parents', function () { return __awaiter(void 0, void 0, void 0, function () {
                var parentNode1, parentNode2, childNode, parents;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            parentNode1 = new src_1.SpinalNode();
                            parentNode2 = new src_1.SpinalNode();
                            childNode = new src_1.SpinalNode();
                            return [4 /*yield*/, Promise.all([
                                    parentNode1.addChild(childNode, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE),
                                    parentNode2.addChild(childNode, DEFAULT_RELATION_NAME + "2", src_1.SPINAL_RELATION_TYPE),
                                ])];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, childNode.getParents([DEFAULT_RELATION_NAME])];
                        case 2:
                            parents = _a.sent();
                            assert.deepStrictEqual(parents, [parentNode1]);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should return one parents', function () { return __awaiter(void 0, void 0, void 0, function () {
                var parentNode1, parentNode2, childNode, parents;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            parentNode1 = new src_1.SpinalNode();
                            parentNode2 = new src_1.SpinalNode();
                            childNode = new src_1.SpinalNode();
                            return [4 /*yield*/, Promise.all([
                                    parentNode1.addChild(childNode, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE),
                                    parentNode2.addChild(childNode, DEFAULT_RELATION_NAME + "2", src_1.SPINAL_RELATION_TYPE),
                                ])];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, childNode.getParents(DEFAULT_RELATION_NAME)];
                        case 2:
                            parents = _a.sent();
                            assert.deepStrictEqual(parents, [parentNode1]);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should return all parents', function () { return __awaiter(void 0, void 0, void 0, function () {
                var parentNode1, parentNode2, childNode, parents;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            parentNode1 = new src_1.SpinalNode();
                            parentNode2 = new src_1.SpinalNode();
                            childNode = new src_1.SpinalNode();
                            return [4 /*yield*/, Promise.all([
                                    parentNode1.addChild(childNode, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE),
                                    parentNode2.addChild(childNode, DEFAULT_RELATION_NAME + "2", src_1.SPINAL_RELATION_TYPE),
                                ])];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, childNode.getParents([])];
                        case 2:
                            parents = _a.sent();
                            assert.deepStrictEqual(parents, [parentNode1, parentNode2]);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should return all parents with a certain relation name', function () { return __awaiter(void 0, void 0, void 0, function () {
                var parentNode1, parentNode2, childNode, parents;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            parentNode1 = new src_1.SpinalNode();
                            parentNode2 = new src_1.SpinalNode();
                            childNode = new src_1.SpinalNode();
                            return [4 /*yield*/, Promise.all([
                                    parentNode1.addChild(childNode, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE),
                                    parentNode2.addChild(childNode, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE),
                                ])];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, childNode.getParents([])];
                        case 2:
                            parents = _a.sent();
                            assert.deepStrictEqual(parents, [parentNode1, parentNode2]);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw an error if relationNames is neither an array, a string or omitted', function () { return __awaiter(void 0, void 0, void 0, function () {
                var parent, error, e_50;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            parent = new src_1.SpinalNode();
                            error = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, parent.getParents(1)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_50 = _a.sent();
                            error = true;
                            assert(e_50 instanceof Error);
                            return [3 /*break*/, 4];
                        case 4:
                            assert(error);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should throw an error if an element of relationNames is not a string', function () { return __awaiter(void 0, void 0, void 0, function () {
                var parent, child, error, e_51;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            parent = new src_1.SpinalNode();
                            child = new src_1.SpinalNode();
                            error = false;
                            return [4 /*yield*/, Promise.all([
                                    parent.addChild(child, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE),
                                ])];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, child.getParents([
                                    DEFAULT_RELATION_NAME + "1",
                                    1,
                                ])];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            e_51 = _a.sent();
                            error = true;
                            assert(e_51 instanceof Error);
                            return [3 /*break*/, 5];
                        case 5:
                            assert(error);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
});
//# sourceMappingURL=SpinalNodeTest.js.map