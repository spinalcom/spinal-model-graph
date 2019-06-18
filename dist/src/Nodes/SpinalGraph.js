"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.__esModule = true;
/*
 * Copyright 2018 SpinalCom - www.spinalcom.com
 *
 * This file is part of SpinalCore.
 *
 * Please read all of the following terms and conditions
 * of the Free Software license Agreement ("Agreement")
 * carefully.
 *
 * This Agreement is a legally binding contract between
 * the Licensee (as defined below) and SpinalCom that
 * sets forth the terms and conditions that govern your
 * use of the Program. By installing and/or using the
 * Program, you agree to abide by all the terms and
 * conditions stated or referenced herein.
 *
 * If you do not agree to abide by these terms and
 * conditions, do not demonstrate your acceptance and do
 * not install or use the Program.
 * You should have received a copy of the license along
 * with this file. If not, see
 * <http://resources.spinalcom.com/licenses.pdf>.
 */
var SpinalNode_1 = require("./SpinalNode");
var spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
var __1 = require("..");
var Utilities_1 = require("../Utilities");
var SpinalContext_1 = require("./SpinalContext");
var HAS_CONTEXT_RELATION_NAME = 'hasContext';
/**
 * Starting node of a graph.
 * @extends SpinalNode
 */
var SpinalGraph = /** @class */ (function (_super) {
    __extends(SpinalGraph, _super);
    /**
     * Constructor for the SpinalGraph class.
     * @param {String} [name="undefined"] Name of the graph, usually unused
     * @param {String} [type="SpinalGraph"] Type of the graph, usually unused
     * @param {SpinalNode | Model} [element] Element of the graph
     * @throws {TypeError} If the element is not a Model
     */
    function SpinalGraph(name, type, element) {
        if (name === void 0) { name = 'undefined'; }
        if (type === void 0) { type = 'SpinalGraph'; }
        var _this = _super.call(this, name, type, element) || this;
        if (spinal_core_connectorjs_type_1.FileSystem._sig_server === false)
            return _this;
        _this.info.id.set(Utilities_1.guid(_this.constructor.name));
        return _this;
    }
    /**
     * Adds a context to the graph.
     * @param {SpinalContext} context Context to be added
     * @returns {Promise<SpinalContext>} The added context
     * @throws {TypeError} If the context is not a context
     */
    SpinalGraph.prototype.addContext = function (context) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!(context instanceof SpinalContext_1.SpinalContext)) {
                    throw new TypeError('context must be a context');
                }
                return [2 /*return*/, this.addChild(context, HAS_CONTEXT_RELATION_NAME, __1.SPINAL_RELATION_TYPE)];
            });
        });
    };
    /**
     * Searches for a context using its name.
     * @param {String} name Name of the context
     * @returns {SpinalContext | undefined} The wanted context or undefined
     * @throws {TypeError} If name is not a string
     */
    SpinalGraph.prototype.getContext = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof name !== 'string') {
                            throw TypeError('name must be string');
                        }
                        return [4 /*yield*/, this.getChildren([HAS_CONTEXT_RELATION_NAME])];
                    case 1:
                        children = _a.sent();
                        return [2 /*return*/, children.find(function (child) { return child.info.name.get() === name; })];
                }
            });
        });
    };
    /**
     * Empty override of the SpinalNode method.
     * @override
     * @returns {Promise<nothing>} An empty promise
     */
    SpinalGraph.prototype.removeFromGraph = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return SpinalGraph;
}(SpinalNode_1.SpinalNode));
exports.SpinalGraph = SpinalGraph;
spinal_core_connectorjs_type_1.spinalCore.register_models([SpinalGraph]);
exports["default"] = SpinalGraph;
//# sourceMappingURL=SpinalGraph.js.map