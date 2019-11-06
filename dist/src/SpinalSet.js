"use strict";
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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
exports.__esModule = true;
// tslint:disable:function-name
var spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
/**
 * @class SpinalSet
 * @extends {Model}
 */
var SpinalSet = /** @class */ (function (_super) {
    __extends(SpinalSet, _super);
    /**
     * Constructor for the SpinalSet class.
     * @param {(string[]|IterableIterator<string>)} [init] Array of values
     * @throws {TypeError} If init is not iterable
     * @throws {TypeError} If init[Symbol.iterator] doesn't return iterators
     * @throws {TypeError} If the values of the iterators are not strings
     * @memberof SpinalSet
     */
    function SpinalSet(init) {
        var e_1, _a;
        var _this = _super.call(this) || this;
        if (init !== undefined) {
            try {
                for (var init_1 = __values(init), init_1_1 = init_1.next(); !init_1_1.done; init_1_1 = init_1.next()) {
                    var value = init_1_1.value;
                    _this.add(value);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (init_1_1 && !init_1_1.done && (_a = init_1["return"])) _a.call(init_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return _this;
    }
    /**
     * Appends a new element with the given value to the set.
     * @param {String} value Value to store in the set
     * @throws {TypeError} If the value is not a string
     * @memberof SpinalSet
     */
    SpinalSet.prototype.add = function (value) {
        if (typeof value !== 'string') {
            throw TypeError('The value must be a string');
        }
        this.mod_attr(value, 0);
    };
    /**
     * Returns a boolean asserting whether the value is in the set or not.
     * @param {string} value Value
     * @returns {boolean} Return true if the value exists
     * @throws {TypeError} If the value is not a string
     * @memberof SpinalSet
     */
    SpinalSet.prototype.has = function (value) {
        if (typeof value !== 'string') {
            throw TypeError('The value must be a string');
        }
        return this.hasOwnProperty(value);
    };
    /**
     * Returns an array that contains all the values of the set.
     * @returns {string[]} Array containing all the values in the set
     * @memberof SpinalSet
     */
    SpinalSet.prototype.values = function () {
        return this._attribute_names;
    };
    /**
     * Deletes an element.
     * @param {string} value Value to delete
     * @throws {TypeError} If the value is not a string
     * @throws {Error} If the value is not in the map
     * @memberof SpinalSet
     */
    SpinalSet.prototype["delete"] = function (value) {
        if (!this.has(value)) {
            throw Error("The value doesn't exist");
        }
        this.rem_attr(value);
    };
    /**
     * Deletes all values in the set.
     * @memberof SpinalSet
     */
    SpinalSet.prototype.clear = function () {
        var values = this.values();
        while (values[0]) {
            this["delete"](values[0]);
        }
    };
    /**
     * Returns the number of values in the set.
     * @returns {number} Number of values in the set
     * @memberof SpinalSet
     */
    SpinalSet.prototype.size = function () {
        return this._attribute_names.length;
    };
    /**
     * Applies a function to each of the values in the set.
     * @param {SpinalSetForEachFunc} fun Funcion to apply
     * @memberof SpinalSet
     */
    SpinalSet.prototype.forEach = function (fun) {
        if (typeof fun !== 'function') {
            throw TypeError('The callback must be a function');
        }
        var values = this.values();
        for (var i = 0; i < this.size(); i += 1) {
            fun(values[i], i);
        }
    };
    /**
     * Function to iterate over the set object.
     * @returns {IterableIterator<string>}
     * @memberof SpinalSet
     */
    SpinalSet.prototype[Symbol.iterator] = function () {
        var e_2, _a, values, values_1, values_1_1, value, e_2_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = this._attribute_names;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 8]);
                    values_1 = __values(values), values_1_1 = values_1.next();
                    _b.label = 2;
                case 2:
                    if (!!values_1_1.done) return [3 /*break*/, 5];
                    value = values_1_1.value;
                    return [4 /*yield*/, value];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    values_1_1 = values_1.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_2_1 = _b.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (values_1_1 && !values_1_1.done && (_a = values_1["return"])) _a.call(values_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    };
    return SpinalSet;
}(spinal_core_connectorjs_type_1.Model));
exports.SpinalSet = SpinalSet;
spinal_core_connectorjs_type_1.spinalCore.register_models([SpinalSet]);
exports["default"] = SpinalSet;
//# sourceMappingURL=SpinalSet.js.map