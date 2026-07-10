"use strict";
/*
 * Copyright 2026 SpinalCom - www.spinalcom.com
 *
 * This file is part of SpinalCore.
 *
 * Please read all of the following terms and conditions
 * of the Software license Agreement ("Agreement")
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = void 0;
exports.guid = guid;
exports.loadParentRelation = loadParentRelation;
exports.consumeBatch = consumeBatch;
exports.toRegex = toRegex;
exports.validateGetChildrenOptions = validateGetChildrenOptions;
const SpinalContext_1 = require("./Nodes/SpinalContext");
var lodash_1 = require("lodash");
Object.defineProperty(exports, "debounce", { enumerable: true, get: function () { return lodash_1.debounce; } });
/**
 * Generates a random number and returns in a string.
 * @returns {String} Random number in a string
 */
function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}
/**
 * Creates a unique id based on a name.
 * @param {string} name Name from wich the id is generated
 * @returns {string} Generated id
 */
function guid() {
    return `${s4()}-${s4()}-${s4()}-${Date.now().toString(16)}`;
}
function loadParentRelation(spinalNodePointer, context) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const relation = yield spinalNodePointer.load();
            if (relation && context && relation.belongsToContext(context) === false) {
                return undefined;
            }
            try {
                const parent = yield relation.getParent();
                if (context && parent.belongsToContext(context) === false)
                    return undefined;
                return parent;
            }
            catch (e) {
                relation.removeFromGraph();
                return undefined;
            }
        }
        catch (e) {
            return undefined;
        }
    });
}
function consumeBatch(promises_1) {
    return __awaiter(this, arguments, void 0, function* (promises, batchSize = 10) {
        let index = 0;
        const result = [];
        while (index < promises.length) {
            let endIndex = index + batchSize;
            if (promises.length <= endIndex)
                endIndex = promises.length;
            const slice = promises.slice(index, endIndex);
            const resProm = yield Promise.all(slice.map((e) => e()));
            result.push(...resProm);
            index = endIndex;
        }
        return result;
    });
}
/**
 * Converts a string, regex or an array of strings/regex to a single regex ( big Regex joining array elements with OR ).
 *
 * @param {(string | RegExp | (string | RegExp)[])} relationNames
 * @return {*}  {RegExp}
 */
function toRegex(relationNames) {
    const arr = Array.isArray(relationNames) ? relationNames : [relationNames];
    const sources = arr.map((item) => {
        if (item instanceof RegExp) {
            return item.source;
        }
        // Escape regex special characters in strings
        return item.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    });
    // Combine into one big regex
    return new RegExp(`^(?:${sources.join('|')})$`);
}
function validateGetChildrenOptions(options) {
    var _a, _b, _c;
    const offset = (_a = options.offset) !== null && _a !== void 0 ? _a : 0;
    const reverse = (_b = options.reverse) !== null && _b !== void 0 ? _b : false;
    const context = (_c = options.context) !== null && _c !== void 0 ? _c : undefined;
    if (typeof offset !== 'number' || offset < 0) {
        throw new TypeError('offset must be a non-negative number');
    }
    if (typeof reverse !== 'boolean') {
        throw new TypeError('reverse must be a boolean');
    }
    if (context !== undefined && !(context instanceof SpinalContext_1.SpinalContext)) {
        throw new TypeError('context must be a SpinalContext');
    }
    return context ? { offset, reverse, context } : { offset, reverse };
}
//# sourceMappingURL=Utilities.js.map