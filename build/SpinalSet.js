"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _spinalCoreConnectorjs_type = require("spinal-core-connectorjs_type");

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
 * Simple implementation of a set using a Model.
 * @extends Model
 */
class SpinalSet extends _spinalCoreConnectorjs_type.Model {
  /**
   * Constructor for the SpinalSet class.
   * @param {Array<*>} [init] Array of values
   * @throws {TypeError} If init is not iterable
   * @throws {TypeError} If init[Symbol.iterator] doesn't return iterators
   * @throws {TypeError} If the values of the iterators are not strings
   */
  constructor(init) {
    super();

    if (init !== undefined) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = init[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          let value = _step.value;
          this.add(value);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }
  /**
   * Appends a new element with the given value to the set.
   * @param {String} value Value to store in the set
   * @throws {TypeError} If the value is not a string
   */


  add(value) {
    if (typeof value !== "string") {
      throw TypeError("The value must be a string");
    }

    this.mod_attr(value, 0);
  }
  /**
   * Returns a boolean asserting whether the value is in the set or not.
   * @param {String} value Value
   * @returns {Boolean} Return true if the value exists
   * @throws {TypeError} If the value is not a string
   */


  has(value) {
    if (typeof value !== "string") {
      throw TypeError("The value must be a string");
    }

    return this.hasOwnProperty(value);
  }
  /**
   * Returns an array that contains all the values of the set.
   * @returns {Array<String>} Array containing all the values in the set
   */


  values() {
    return this._attribute_names;
  }
  /**
   * Deletes an element.
   * @param {String} value Value to delete
   * @throws {TypeError} If the value is not a string
   * @throws {Error} If the value is not in the map
   */


  delete(value) {
    if (!this.has(value)) {
      throw Error("The value doesn't exist");
    }

    this.rem_attr(value);
  }
  /**
   * Deletes all values in the set.
   */


  clear() {
    let values = this.values();

    while (values[0]) {
      this.delete(values[0]);
    }
  }
  /**
   * Returns the number of values in the set.
   * @returns {Number} Number of values in the set
   */


  size() {
    return this._attribute_names.length;
  }
  /**
   * Function that takes a value and its index in the set and returns nothing.
   * @callback setForEachCallback
   * @param {string} [value] Value of the set
   * @param {Number} [index] Index of the value in the set
   */

  /**
   * Applies a function to each of the values in the set.
   * @param {setForEachCallback} fun Funcion to apply
   * @throws {TypeError} If fun is not a function
   */


  forEach(fun) {
    if (typeof fun !== "function") {
      throw TypeError("The callback must be a function");
    }

    const values = this.values();

    for (let i = 0; i < this.size(); i++) {
      fun(values[i], i);
    }
  }
  /**
   * Function to iterate over the set object.
   * @generator
   * @yields {string} All values in the set one by one
   */


  *[Symbol.iterator]() {
    let values = this._attribute_names;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = values[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        let value = _step2.value;
        yield value;
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }

}

_spinalCoreConnectorjs_type.spinalCore.register_models([SpinalSet]);

var _default = SpinalSet;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxTZXQuanMiXSwibmFtZXMiOlsiU3BpbmFsU2V0IiwiTW9kZWwiLCJjb25zdHJ1Y3RvciIsImluaXQiLCJ1bmRlZmluZWQiLCJ2YWx1ZSIsImFkZCIsIlR5cGVFcnJvciIsIm1vZF9hdHRyIiwiaGFzIiwiaGFzT3duUHJvcGVydHkiLCJ2YWx1ZXMiLCJfYXR0cmlidXRlX25hbWVzIiwiZGVsZXRlIiwiRXJyb3IiLCJyZW1fYXR0ciIsImNsZWFyIiwic2l6ZSIsImxlbmd0aCIsImZvckVhY2giLCJmdW4iLCJpIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJzcGluYWxDb3JlIiwicmVnaXN0ZXJfbW9kZWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBd0JBOztBQXhCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNkJBOzs7O0FBSUEsTUFBTUEsU0FBTixTQUF3QkMsaUNBQXhCLENBQThCO0FBQzVCOzs7Ozs7O0FBT0FDLEVBQUFBLFdBQVcsQ0FBQ0MsSUFBRCxFQUFPO0FBQ2hCOztBQUVBLFFBQUlBLElBQUksS0FBS0MsU0FBYixFQUF3QjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUN0Qiw2QkFBa0JELElBQWxCLDhIQUF3QjtBQUFBLGNBQWZFLEtBQWU7QUFDdEIsZUFBS0MsR0FBTCxDQUFTRCxLQUFUO0FBQ0Q7QUFIcUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUl2QjtBQUNGO0FBRUQ7Ozs7Ozs7QUFLQUMsRUFBQUEsR0FBRyxDQUFDRCxLQUFELEVBQVE7QUFDVCxRQUFJLE9BQU9BLEtBQVAsS0FBaUIsUUFBckIsRUFBK0I7QUFDN0IsWUFBTUUsU0FBUyxDQUFDLDRCQUFELENBQWY7QUFDRDs7QUFFRCxTQUFLQyxRQUFMLENBQWNILEtBQWQsRUFBcUIsQ0FBckI7QUFDRDtBQUVEOzs7Ozs7OztBQU1BSSxFQUFBQSxHQUFHLENBQUNKLEtBQUQsRUFBUTtBQUNULFFBQUksT0FBT0EsS0FBUCxLQUFpQixRQUFyQixFQUErQjtBQUM3QixZQUFNRSxTQUFTLENBQUMsNEJBQUQsQ0FBZjtBQUNEOztBQUVELFdBQU8sS0FBS0csY0FBTCxDQUFvQkwsS0FBcEIsQ0FBUDtBQUNEO0FBRUQ7Ozs7OztBQUlBTSxFQUFBQSxNQUFNLEdBQUc7QUFDUCxXQUFPLEtBQUtDLGdCQUFaO0FBQ0Q7QUFFRDs7Ozs7Ozs7QUFNQUMsRUFBQUEsTUFBTSxDQUFDUixLQUFELEVBQVE7QUFDWixRQUFJLENBQUMsS0FBS0ksR0FBTCxDQUFTSixLQUFULENBQUwsRUFBc0I7QUFDcEIsWUFBTVMsS0FBSyxDQUFDLHlCQUFELENBQVg7QUFDRDs7QUFFRCxTQUFLQyxRQUFMLENBQWNWLEtBQWQ7QUFDRDtBQUVEOzs7OztBQUdBVyxFQUFBQSxLQUFLLEdBQUc7QUFDTixRQUFJTCxNQUFNLEdBQUcsS0FBS0EsTUFBTCxFQUFiOztBQUVBLFdBQU9BLE1BQU0sQ0FBQyxDQUFELENBQWIsRUFBa0I7QUFDaEIsV0FBS0UsTUFBTCxDQUFZRixNQUFNLENBQUMsQ0FBRCxDQUFsQjtBQUNEO0FBQ0Y7QUFFRDs7Ozs7O0FBSUFNLEVBQUFBLElBQUksR0FBRztBQUNMLFdBQU8sS0FBS0wsZ0JBQUwsQ0FBc0JNLE1BQTdCO0FBQ0Q7QUFFRDs7Ozs7OztBQU1BOzs7Ozs7O0FBS0FDLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBRCxFQUFNO0FBQ1gsUUFBSSxPQUFPQSxHQUFQLEtBQWUsVUFBbkIsRUFBK0I7QUFDN0IsWUFBTWIsU0FBUyxDQUFDLGlDQUFELENBQWY7QUFDRDs7QUFFRCxVQUFNSSxNQUFNLEdBQUcsS0FBS0EsTUFBTCxFQUFmOztBQUVBLFNBQUssSUFBSVUsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLSixJQUFMLEVBQXBCLEVBQWlDSSxDQUFDLEVBQWxDLEVBQXNDO0FBQ3BDRCxNQUFBQSxHQUFHLENBQUNULE1BQU0sQ0FBQ1UsQ0FBRCxDQUFQLEVBQVlBLENBQVosQ0FBSDtBQUNEO0FBQ0Y7QUFFRDs7Ozs7OztBQUtBLElBQUVDLE1BQU0sQ0FBQ0MsUUFBVCxJQUFxQjtBQUNuQixRQUFJWixNQUFNLEdBQUcsS0FBS0MsZ0JBQWxCO0FBRG1CO0FBQUE7QUFBQTs7QUFBQTtBQUduQiw0QkFBa0JELE1BQWxCLG1JQUEwQjtBQUFBLFlBQWpCTixLQUFpQjtBQUN4QixjQUFNQSxLQUFOO0FBQ0Q7QUFMa0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU1wQjs7QUF4SDJCOztBQTJIOUJtQix1Q0FBV0MsZUFBWCxDQUEyQixDQUFDekIsU0FBRCxDQUEzQjs7ZUFDZUEsUyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOCBTcGluYWxDb20gLSB3d3cuc3BpbmFsY29tLmNvbVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFNwaW5hbENvcmUuXG4gKlxuICogUGxlYXNlIHJlYWQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgdGVybXMgYW5kIGNvbmRpdGlvbnNcbiAqIG9mIHRoZSBGcmVlIFNvZnR3YXJlIGxpY2Vuc2UgQWdyZWVtZW50IChcIkFncmVlbWVudFwiKVxuICogY2FyZWZ1bGx5LlxuICpcbiAqIFRoaXMgQWdyZWVtZW50IGlzIGEgbGVnYWxseSBiaW5kaW5nIGNvbnRyYWN0IGJldHdlZW5cbiAqIHRoZSBMaWNlbnNlZSAoYXMgZGVmaW5lZCBiZWxvdykgYW5kIFNwaW5hbENvbSB0aGF0XG4gKiBzZXRzIGZvcnRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyB0aGF0IGdvdmVybiB5b3VyXG4gKiB1c2Ugb2YgdGhlIFByb2dyYW0uIEJ5IGluc3RhbGxpbmcgYW5kL29yIHVzaW5nIHRoZVxuICogUHJvZ3JhbSwgeW91IGFncmVlIHRvIGFiaWRlIGJ5IGFsbCB0aGUgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zIHN0YXRlZCBvciByZWZlcmVuY2VkIGhlcmVpbi5cbiAqXG4gKiBJZiB5b3UgZG8gbm90IGFncmVlIHRvIGFiaWRlIGJ5IHRoZXNlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucywgZG8gbm90IGRlbW9uc3RyYXRlIHlvdXIgYWNjZXB0YW5jZSBhbmQgZG9cbiAqIG5vdCBpbnN0YWxsIG9yIHVzZSB0aGUgUHJvZ3JhbS5cbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYWxvbmdcbiAqIHdpdGggdGhpcyBmaWxlLiBJZiBub3QsIHNlZVxuICogPGh0dHA6Ly9yZXNvdXJjZXMuc3BpbmFsY29tLmNvbS9saWNlbnNlcy5wZGY+LlxuICovXG5cbmltcG9ydCB7XG4gIHNwaW5hbENvcmUsXG4gIE1vZGVsXG59IGZyb20gXCJzcGluYWwtY29yZS1jb25uZWN0b3Jqc190eXBlXCI7XG5cbi8qKlxuICogU2ltcGxlIGltcGxlbWVudGF0aW9uIG9mIGEgc2V0IHVzaW5nIGEgTW9kZWwuXG4gKiBAZXh0ZW5kcyBNb2RlbFxuICovXG5jbGFzcyBTcGluYWxTZXQgZXh0ZW5kcyBNb2RlbCB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIFNwaW5hbFNldCBjbGFzcy5cbiAgICogQHBhcmFtIHtBcnJheTwqPn0gW2luaXRdIEFycmF5IG9mIHZhbHVlc1xuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGluaXQgaXMgbm90IGl0ZXJhYmxlXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgaW5pdFtTeW1ib2wuaXRlcmF0b3JdIGRvZXNuJ3QgcmV0dXJuIGl0ZXJhdG9yc1xuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSB2YWx1ZXMgb2YgdGhlIGl0ZXJhdG9ycyBhcmUgbm90IHN0cmluZ3NcbiAgICovXG4gIGNvbnN0cnVjdG9yKGluaXQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgaWYgKGluaXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZm9yIChsZXQgdmFsdWUgb2YgaW5pdCkge1xuICAgICAgICB0aGlzLmFkZCh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFwcGVuZHMgYSBuZXcgZWxlbWVudCB3aXRoIHRoZSBnaXZlbiB2YWx1ZSB0byB0aGUgc2V0LlxuICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUgVmFsdWUgdG8gc3RvcmUgaW4gdGhlIHNldFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSB2YWx1ZSBpcyBub3QgYSBzdHJpbmdcbiAgICovXG4gIGFkZCh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcIlRoZSB2YWx1ZSBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIH1cblxuICAgIHRoaXMubW9kX2F0dHIodmFsdWUsIDApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBib29sZWFuIGFzc2VydGluZyB3aGV0aGVyIHRoZSB2YWx1ZSBpcyBpbiB0aGUgc2V0IG9yIG5vdC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIFZhbHVlXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgZXhpc3RzXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIHZhbHVlIGlzIG5vdCBhIHN0cmluZ1xuICAgKi9cbiAgaGFzKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwiVGhlIHZhbHVlIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaGFzT3duUHJvcGVydHkodmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gYXJyYXkgdGhhdCBjb250YWlucyBhbGwgdGhlIHZhbHVlcyBvZiB0aGUgc2V0LlxuICAgKiBAcmV0dXJucyB7QXJyYXk8U3RyaW5nPn0gQXJyYXkgY29udGFpbmluZyBhbGwgdGhlIHZhbHVlcyBpbiB0aGUgc2V0XG4gICAqL1xuICB2YWx1ZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2F0dHJpYnV0ZV9uYW1lcztcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGVzIGFuIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZSBWYWx1ZSB0byBkZWxldGVcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgdmFsdWUgaXMgbm90IGEgc3RyaW5nXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgdmFsdWUgaXMgbm90IGluIHRoZSBtYXBcbiAgICovXG4gIGRlbGV0ZSh2YWx1ZSkge1xuICAgIGlmICghdGhpcy5oYXModmFsdWUpKSB7XG4gICAgICB0aHJvdyBFcnJvcihcIlRoZSB2YWx1ZSBkb2Vzbid0IGV4aXN0XCIpO1xuICAgIH1cblxuICAgIHRoaXMucmVtX2F0dHIodmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgYWxsIHZhbHVlcyBpbiB0aGUgc2V0LlxuICAgKi9cbiAgY2xlYXIoKSB7XG4gICAgbGV0IHZhbHVlcyA9IHRoaXMudmFsdWVzKCk7XG5cbiAgICB3aGlsZSAodmFsdWVzWzBdKSB7XG4gICAgICB0aGlzLmRlbGV0ZSh2YWx1ZXNbMF0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgdmFsdWVzIGluIHRoZSBzZXQuXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IE51bWJlciBvZiB2YWx1ZXMgaW4gdGhlIHNldFxuICAgKi9cbiAgc2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fYXR0cmlidXRlX25hbWVzLmxlbmd0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0aGF0IHRha2VzIGEgdmFsdWUgYW5kIGl0cyBpbmRleCBpbiB0aGUgc2V0IGFuZCByZXR1cm5zIG5vdGhpbmcuXG4gICAqIEBjYWxsYmFjayBzZXRGb3JFYWNoQ2FsbGJhY2tcbiAgICogQHBhcmFtIHtzdHJpbmd9IFt2YWx1ZV0gVmFsdWUgb2YgdGhlIHNldFxuICAgKiBAcGFyYW0ge051bWJlcn0gW2luZGV4XSBJbmRleCBvZiB0aGUgdmFsdWUgaW4gdGhlIHNldFxuICAgKi9cbiAgLyoqXG4gICAqIEFwcGxpZXMgYSBmdW5jdGlvbiB0byBlYWNoIG9mIHRoZSB2YWx1ZXMgaW4gdGhlIHNldC5cbiAgICogQHBhcmFtIHtzZXRGb3JFYWNoQ2FsbGJhY2t9IGZ1biBGdW5jaW9uIHRvIGFwcGx5XG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgZnVuIGlzIG5vdCBhIGZ1bmN0aW9uXG4gICAqL1xuICBmb3JFYWNoKGZ1bikge1xuICAgIGlmICh0eXBlb2YgZnVuICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcIlRoZSBjYWxsYmFjayBtdXN0IGJlIGEgZnVuY3Rpb25cIik7XG4gICAgfVxuXG4gICAgY29uc3QgdmFsdWVzID0gdGhpcy52YWx1ZXMoKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaXplKCk7IGkrKykge1xuICAgICAgZnVuKHZhbHVlc1tpXSwgaSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRvIGl0ZXJhdGUgb3ZlciB0aGUgc2V0IG9iamVjdC5cbiAgICogQGdlbmVyYXRvclxuICAgKiBAeWllbGRzIHtzdHJpbmd9IEFsbCB2YWx1ZXMgaW4gdGhlIHNldCBvbmUgYnkgb25lXG4gICAqL1xuICAqW1N5bWJvbC5pdGVyYXRvcl0oKSB7XG4gICAgbGV0IHZhbHVlcyA9IHRoaXMuX2F0dHJpYnV0ZV9uYW1lcztcblxuICAgIGZvciAobGV0IHZhbHVlIG9mIHZhbHVlcykge1xuICAgICAgeWllbGQgdmFsdWU7XG4gICAgfVxuICB9XG59XG5cbnNwaW5hbENvcmUucmVnaXN0ZXJfbW9kZWxzKFtTcGluYWxTZXRdKTtcbmV4cG9ydCBkZWZhdWx0IFNwaW5hbFNldDtcbiJdfQ==