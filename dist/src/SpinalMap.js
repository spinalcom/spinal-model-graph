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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
exports.__esModule = true;
// tslint:disable:function-name
var spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
/**
 * @class SpinalMap
 * @extends {Model}
 * @template T
 */
var SpinalMap = /** @class */ (function (_super) {
    __extends(SpinalMap, _super);
    /**
     * Constructor for the SpinalMap class.
     * @param {Array<ArrayPairStringAny>} [init] Array of arrays of key-value pairs
     * @throws {TypeError} If init is not iterable
     * @throws {TypeError} If init[Symbol.iterator] doesn't return iterators
     * @throws {TypeError} If the values of the iterators are not arrays of key values
     * @throws {TypeError} If the keys of the values of the iterators are not strings
     * @memberof SpinalMap
     */
    function SpinalMap(init) {
        var e_1, _a;
        var _this = _super.call(this) || this;
        if (init !== undefined) {
            try {
                for (var init_1 = __values(init), init_1_1 = init_1.next(); !init_1_1.done; init_1_1 = init_1.next()) {
                    var _b = __read(init_1_1.value, 2), key = _b[0], value = _b[1];
                    _this.setElement(key, value);
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
     * Sets the value corresponding to the key.
     * @param {string} key Key to the value
     * @param {T} value New value
     * @throws {TypeError} If the key is not a string
     * @memberof SpinalMap
     */
    SpinalMap.prototype.setElement = function (key, value) {
        var _a;
        if (typeof key !== 'string' && typeof key !== 'number') {
            throw TypeError('The key must be a string or a number');
        }
        this.rem_attr(key);
        var attribute = (_a = {},
            _a[key] = value,
            _a);
        this.add_attr(attribute);
    };
    /**
     * Returns the value associated to the key, or undefined if there is none.
     * @param {string} key Key to the value
     * @returns {T} Value corresponding to the key
     * @memberof SpinalMap
     */
    SpinalMap.prototype.getElement = function (key) {
        return this[key];
    };
    /**
     * Returns a boolean asserting whether a value has been associated to the key or not.
     * @param {string} key
     * @returns {boolean} Return true if the key exists
     * @throws {TypeError} If the key is not a string
     * @memberof SpinalMap
     */
    SpinalMap.prototype.has = function (key) {
        if (typeof key !== 'string' && typeof key !== 'number') {
            throw TypeError('The key must be a string or a number');
        }
        return this._attribute_names.includes(key);
    };
    /**
     * Returns a boolean asserting whether the map contains any key.
     * @returns {boolean} Return true if the map contains at least one key
     * @memberof SpinalMap
     */
    SpinalMap.prototype.hasKey = function () {
        return this._attribute_names.length > 0;
    };
    /**
     * Returns an array that contains the keys for each element in the map in insertion order.
     * @returns {string[]} Array containing all the keys in the map
     * @memberof SpinalMap
     */
    SpinalMap.prototype.keys = function () {
        return this._attribute_names;
    };
    /**
     * Returns an array that contains the keys and the values
     * for each element in the map in insertion order.
     * @returns {Array<Array<string,T>>} Array containing all the keys and values in the map
     * @memberof SpinalMap
     */
    SpinalMap.prototype.entries = function () {
        var e_2, _a;
        var arr = [];
        try {
            for (var _b = __values(this.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                arr.push([key, this.getElement(key)]);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return arr;
    };
    /**
     * Deletes an element.
     * @param {string} key Key of the element
     * @throws {TypeError} If the key is not a string
     * @throws {Error} If the key is not in the map
     * @memberof SpinalMap
     */
    SpinalMap.prototype["delete"] = function (key) {
        if (!this.has(key)) {
            throw Error("The key doesn't exist");
        }
        this.rem_attr(key);
    };
    /**
     * Deletes all elements.
     * @memberof SpinalMap
     */
    SpinalMap.prototype.clear = function () {
        var keys = this.keys();
        while (keys[0]) {
            this["delete"](keys[0]);
        }
    };
    /**
     * Applies a function to each of the values in the map.
     * @param {SpinalMapForEachFunc<T>} fun Funcion to apply
     * @memberof SpinalMap
     */
    SpinalMap.prototype.forEach = function (fun) {
        var e_3, _a;
        if (typeof fun !== 'function') {
            throw TypeError('The callback must be a function');
        }
        try {
            for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                fun(value, key);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    /**
     * Function to iterate over the map object.
     * @returns {IterableIterator<T>}
     * @memberof SpinalMap
     */
    SpinalMap.prototype[Symbol.iterator] = function () {
        var e_4, _a, keys, keys_1, keys_1_1, key, e_4_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    keys = this.keys();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 8]);
                    keys_1 = __values(keys), keys_1_1 = keys_1.next();
                    _b.label = 2;
                case 2:
                    if (!!keys_1_1.done) return [3 /*break*/, 5];
                    key = keys_1_1.value;
                    return [4 /*yield*/, [key, this[key]]];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    keys_1_1 = keys_1.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_4_1 = _b.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (keys_1_1 && !keys_1_1.done && (_a = keys_1["return"])) _a.call(keys_1);
                    }
                    finally { if (e_4) throw e_4.error; }
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    };
    return SpinalMap;
}(spinal_core_connectorjs_type_1.Model));
exports.SpinalMap = SpinalMap;
spinal_core_connectorjs_type_1.spinalCore.register_models([SpinalMap]);
exports["default"] = SpinalMap;
//# sourceMappingURL=SpinalMap.js.map