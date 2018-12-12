"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.guid = guid;

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

/**
 * Generates a random number and returns in a string.
 * @returns {String} Random number in a string
 */
function s4() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}
/**
 * Creates a unique id based on a name.
 * @param {String} name Name from wich the id is generated
 * @returns {String} Generated id
 */


function guid(name) {
  return name + "-" + s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4() + "-" + Date.now().toString(16);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9VdGlsaXRpZXMuanMiXSwibmFtZXMiOlsiczQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ0b1N0cmluZyIsInN1YnN0cmluZyIsImd1aWQiLCJuYW1lIiwiRGF0ZSIsIm5vdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkE7Ozs7QUFJQSxTQUFTQSxFQUFULEdBQWM7QUFDWixTQUFPQyxJQUFJLENBQUNDLEtBQUwsQ0FBVyxDQUFDLElBQUlELElBQUksQ0FBQ0UsTUFBTCxFQUFMLElBQXNCLE9BQWpDLEVBQ0pDLFFBREksQ0FDSyxFQURMLEVBRUpDLFNBRkksQ0FFTSxDQUZOLENBQVA7QUFHRDtBQUVEOzs7Ozs7O0FBS0EsU0FBU0MsSUFBVCxDQUFjQyxJQUFkLEVBQW9CO0FBQ2xCLFNBQ0VBLElBQUksR0FBRyxHQUFQLEdBQWFQLEVBQUUsRUFBZixHQUFvQkEsRUFBRSxFQUF0QixHQUEyQixHQUEzQixHQUFpQ0EsRUFBRSxFQUFuQyxHQUF3QyxHQUF4QyxHQUE4Q0EsRUFBRSxFQUFoRCxHQUFxRCxHQUFyRCxHQUNBQSxFQUFFLEVBREYsR0FDTyxHQURQLEdBQ2FBLEVBQUUsRUFEZixHQUNvQkEsRUFBRSxFQUR0QixHQUMyQkEsRUFBRSxFQUQ3QixHQUNrQyxHQURsQyxHQUN3Q1EsSUFBSSxDQUFDQyxHQUFMLEdBQVdMLFFBQVgsQ0FBb0IsRUFBcEIsQ0FGMUM7QUFJRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOCBTcGluYWxDb20gLSB3d3cuc3BpbmFsY29tLmNvbVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFNwaW5hbENvcmUuXG4gKlxuICogUGxlYXNlIHJlYWQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgdGVybXMgYW5kIGNvbmRpdGlvbnNcbiAqIG9mIHRoZSBGcmVlIFNvZnR3YXJlIGxpY2Vuc2UgQWdyZWVtZW50IChcIkFncmVlbWVudFwiKVxuICogY2FyZWZ1bGx5LlxuICpcbiAqIFRoaXMgQWdyZWVtZW50IGlzIGEgbGVnYWxseSBiaW5kaW5nIGNvbnRyYWN0IGJldHdlZW5cbiAqIHRoZSBMaWNlbnNlZSAoYXMgZGVmaW5lZCBiZWxvdykgYW5kIFNwaW5hbENvbSB0aGF0XG4gKiBzZXRzIGZvcnRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyB0aGF0IGdvdmVybiB5b3VyXG4gKiB1c2Ugb2YgdGhlIFByb2dyYW0uIEJ5IGluc3RhbGxpbmcgYW5kL29yIHVzaW5nIHRoZVxuICogUHJvZ3JhbSwgeW91IGFncmVlIHRvIGFiaWRlIGJ5IGFsbCB0aGUgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zIHN0YXRlZCBvciByZWZlcmVuY2VkIGhlcmVpbi5cbiAqXG4gKiBJZiB5b3UgZG8gbm90IGFncmVlIHRvIGFiaWRlIGJ5IHRoZXNlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucywgZG8gbm90IGRlbW9uc3RyYXRlIHlvdXIgYWNjZXB0YW5jZSBhbmQgZG9cbiAqIG5vdCBpbnN0YWxsIG9yIHVzZSB0aGUgUHJvZ3JhbS5cbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYWxvbmdcbiAqIHdpdGggdGhpcyBmaWxlLiBJZiBub3QsIHNlZVxuICogPGh0dHA6Ly9yZXNvdXJjZXMuc3BpbmFsY29tLmNvbS9saWNlbnNlcy5wZGY+LlxuICovXG5cbi8qKlxuICogR2VuZXJhdGVzIGEgcmFuZG9tIG51bWJlciBhbmQgcmV0dXJucyBpbiBhIHN0cmluZy5cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFJhbmRvbSBudW1iZXIgaW4gYSBzdHJpbmdcbiAqL1xuZnVuY3Rpb24gczQoKSB7XG4gIHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKVxuICAgIC50b1N0cmluZygxNilcbiAgICAuc3Vic3RyaW5nKDEpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSB1bmlxdWUgaWQgYmFzZWQgb24gYSBuYW1lLlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgTmFtZSBmcm9tIHdpY2ggdGhlIGlkIGlzIGdlbmVyYXRlZFxuICogQHJldHVybnMge1N0cmluZ30gR2VuZXJhdGVkIGlkXG4gKi9cbmZ1bmN0aW9uIGd1aWQobmFtZSkge1xuICByZXR1cm4gKFxuICAgIG5hbWUgKyBcIi1cIiArIHM0KCkgKyBzNCgpICsgXCItXCIgKyBzNCgpICsgXCItXCIgKyBzNCgpICsgXCItXCIgK1xuICAgIHM0KCkgKyBcIi1cIiArIHM0KCkgKyBzNCgpICsgczQoKSArIFwiLVwiICsgRGF0ZS5ub3coKS50b1N0cmluZygxNilcbiAgKTtcbn1cblxuZXhwb3J0IHtcbiAgZ3VpZFxufTtcbiJdfQ==