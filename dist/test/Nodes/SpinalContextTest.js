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
var DEFAULT_SPINAL_CONTEXT_NAME = 'undefined';
var DEFAULT_SPINAL_CONTEXT_TYPE = 'SpinalContext';
var DEFAULT_RELATION_NAME = 'relationName';
var DEFAULT_NODE = new src_1.SpinalNode();
describe('SpinalContext', function () {
    describe('How to use the constructor', function () {
        it('should create an empty object FileSystem._sig_server === false', function () {
            spinal_core_connectorjs_type_1.FileSystem._sig_server = false;
            var node = new src_1.SpinalContext();
            spinal_core_connectorjs_type_1.FileSystem._sig_server = true;
            assert(typeof node.element === 'undefined');
        });
        it('should create a context with default values', function () { return __awaiter(void 0, void 0, void 0, function () {
            var context, element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context = new src_1.SpinalContext();
                        assert.strictEqual(context.getName().get(), DEFAULT_SPINAL_CONTEXT_NAME);
                        assert.strictEqual(context.getType().get(), DEFAULT_SPINAL_CONTEXT_TYPE);
                        return [4 /*yield*/, context.getElement()];
                    case 1:
                        element = _a.sent();
                        assert(element instanceof spinal_core_connectorjs_type_1.Model);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('How to add children to the context', function () {
        describe('How to use addChild', function () {
            it('should add a child to the context with a SPINAL_RELATION_PTR_LST_TYPE type', function () { return __awaiter(void 0, void 0, void 0, function () {
                var context;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            context = new src_1.SpinalContext();
                            return [4 /*yield*/, context.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME)];
                        case 1:
                            _a.sent();
                            assert(context.hasRelation(DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_PTR_LST_TYPE));
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('How to use addChildInContext', function () {
            it('should add a child to the context with a SPINAL_RELATION_PTR_LST_TYPE type', function () { return __awaiter(void 0, void 0, void 0, function () {
                var context;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            context = new src_1.SpinalContext();
                            return [4 /*yield*/, context.addChildInContext(DEFAULT_NODE, DEFAULT_RELATION_NAME)];
                        case 1:
                            _a.sent();
                            assert(context.hasRelation(DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_PTR_LST_TYPE));
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should be associated to the node (has a context) by default', function () { return __awaiter(void 0, void 0, void 0, function () {
                var context, node;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            context = new src_1.SpinalContext();
                            node = new src_1.SpinalNode();
                            return [4 /*yield*/, context.addChildInContext(node, DEFAULT_RELATION_NAME)];
                        case 1:
                            _a.sent();
                            assert.deepStrictEqual(node.getContextIds(), [context.getId().get()]);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe('How to use getChildrenInContext', function () {
        it('should use this by default', function () { return __awaiter(void 0, void 0, void 0, function () {
            var context, node1, node2, node3, children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context = new src_1.SpinalContext();
                        node1 = new src_1.SpinalNode();
                        node2 = new src_1.SpinalNode();
                        node3 = new src_1.SpinalNode();
                        return [4 /*yield*/, Promise.all([
                                context.addChildInContext(node1, DEFAULT_RELATION_NAME + "1"),
                                context.addChildInContext(node2, DEFAULT_RELATION_NAME + "2"),
                                context.addChild(node3, DEFAULT_RELATION_NAME + "3"),
                            ])];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, context.getChildrenInContext()];
                    case 2:
                        children = _a.sent();
                        assert.deepStrictEqual(children, [node1, node2]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=SpinalContextTest.js.map