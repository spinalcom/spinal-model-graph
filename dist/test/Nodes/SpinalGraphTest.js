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
var DEFAULT_SPINAL_GRAPH_NAME = 'undefined';
var DEFAULT_SPINAL_GRAPH_TYPE = 'SpinalGraph';
var DEFAULT_SPINAL_CONTEXT_NAME1 = 'SpinalContext1';
var DEFAULT_SPINAL_CONTEXT_NAME2 = 'SpinalContext2';
var HAS_CONTEXT_RELATION_NAME = 'hasContext';
describe('SpinalGraph', function () {
    describe('How to use the constructor', function () {
        it('should create an empty object FileSystem._sig_server === false', function () {
            spinal_core_connectorjs_type_1.FileSystem._sig_server = false;
            var node = new src_1.SpinalGraph();
            spinal_core_connectorjs_type_1.FileSystem._sig_server = true;
            assert(typeof node.element === 'undefined');
        });
        it('should create a graph with default values', function () { return __awaiter(void 0, void 0, void 0, function () {
            var context, element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context = new src_1.SpinalGraph();
                        assert.strictEqual(context.getName().get(), DEFAULT_SPINAL_GRAPH_NAME);
                        assert.strictEqual(context.getType().get(), DEFAULT_SPINAL_GRAPH_TYPE);
                        return [4 /*yield*/, context.getElement()];
                    case 1:
                        element = _a.sent();
                        assert(element instanceof spinal_core_connectorjs_type_1.Model);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('How to add a context to the graph', function () {
        it('should add a context to the context relation of the graph', function () { return __awaiter(void 0, void 0, void 0, function () {
            var graph, context, children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        graph = new src_1.SpinalGraph();
                        context = new src_1.SpinalContext();
                        return [4 /*yield*/, graph.addContext(context)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, graph.getChildren([HAS_CONTEXT_RELATION_NAME])];
                    case 2:
                        children = _a.sent();
                        assert.deepStrictEqual(children, [context]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw an error if the context is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
            var graph, error, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        graph = new src_1.SpinalGraph();
                        error = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, graph.addContext()];
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
        it('should throw an error if the context is not a SpinalContext', function () { return __awaiter(void 0, void 0, void 0, function () {
            var graph, context, error, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        graph = new src_1.SpinalGraph();
                        context = new src_1.SpinalNode();
                        error = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, graph.addContext(context)];
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
    describe('How to use getContext', function () {
        it('should get a context using its name', function () { return __awaiter(void 0, void 0, void 0, function () {
            var graph, context1, context2, context;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        graph = new src_1.SpinalGraph();
                        context1 = new src_1.SpinalContext(DEFAULT_SPINAL_CONTEXT_NAME1);
                        context2 = new src_1.SpinalContext(DEFAULT_SPINAL_CONTEXT_NAME2);
                        return [4 /*yield*/, Promise.all([
                                graph.addContext(context1),
                                graph.addContext(context2),
                            ])];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, graph.getContext(DEFAULT_SPINAL_CONTEXT_NAME2)];
                    case 2:
                        context = _a.sent();
                        assert.strictEqual(context, context2);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return undefined if the context isn't found", function () { return __awaiter(void 0, void 0, void 0, function () {
            var graph, context;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        graph = new src_1.SpinalGraph();
                        return [4 /*yield*/, graph.getContext(DEFAULT_SPINAL_CONTEXT_NAME1)];
                    case 1:
                        context = _a.sent();
                        assert.strictEqual(context, undefined);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw an error if the name is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
            var graph, error, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        graph = new src_1.SpinalGraph();
                        error = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, graph.getContext()];
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
        it('should throw an error if the name is not a string', function () { return __awaiter(void 0, void 0, void 0, function () {
            var graph, error, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        graph = new src_1.SpinalGraph();
                        error = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, graph.getContext(1)];
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
    });
    describe('How to use removeFromGraph', function () {
        it('should do nothing', function () { return __awaiter(void 0, void 0, void 0, function () {
            var graph;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        graph = new src_1.SpinalGraph();
                        return [4 /*yield*/, graph.removeFromGraph()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("shouldn't remove children", function () { return __awaiter(void 0, void 0, void 0, function () {
            var graph, context, children, parents;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        graph = new src_1.SpinalGraph();
                        context = new src_1.SpinalContext();
                        return [4 /*yield*/, graph.addContext(context)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, graph.removeFromGraph()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, graph.getChildren()];
                    case 3:
                        children = _a.sent();
                        assert.deepStrictEqual(children, [context]);
                        return [4 /*yield*/, context.getParents()];
                    case 4:
                        parents = _a.sent();
                        assert.deepStrictEqual(parents, [graph]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=SpinalGraphTest.js.map