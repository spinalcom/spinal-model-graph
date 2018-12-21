"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _spinalCoreConnectorjs_type = require("spinal-core-connectorjs_type");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Simple implementation of a map using a Model.
 * @extends Model
 */
class SpinalMap extends _spinalCoreConnectorjs_type.Model {
  /**
   * Constructor for the SpinalMap class.
   * @param {Array<Array<String, *>>} [init] Array of arrays of key-value pairs
   * @throws {TypeError} If init is not iterable
   * @throws {TypeError} If init[Symbol.iterator] doesn't return iterators
   * @throws {TypeError} If the values of the iterators are not arrays of key values
   * @throws {TypeError} If the keys of the values of the iterators are not strings
   */
  constructor(init) {
    super();

    if (init !== undefined) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = init[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          let _step$value = _slicedToArray(_step.value, 2),
              key = _step$value[0],
              value = _step$value[1];

          this.setElement(key, value);
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
   * Sets the value corresponding to the key.
   * @param {String} key Key to the value
   * @param {*} [value] New value
   * @throws {TypeError} If the key is not a string
   */


  setElement(key, value) {
    if (typeof key !== "string") {
      throw TypeError("The key must be a string");
    }

    this.rem_attr(key);
    const attribute = {};
    attribute[key] = value;
    this.add_attr(attribute);
  }
  /**
   * Returns the value associated to the key, or undefined if there is none.
   * @param {String} key Key to the value
   * @returns {*} Value corresponding to the key
   */


  getElement(key) {
    return this[key];
  }
  /**
   * Returns a boolean asserting whether a value has been associated to the key or not.
   * @param key Key
   * @returns {Boolean} Return true if the key exists
   * @throws {TypeError} If the key is not a string
   */


  has(key) {
    if (typeof key !== "string") {
      throw TypeError("The key must be a string");
    }

    return this._attribute_names.includes(key);
  }
  /**
   * Returns a boolean asserting whether the map contains any key.
   * @returns {Boolean} Return true if the map contains at least one key
   */


  hasKey() {
    return this._attribute_names.length > 0;
  }
  /**
   * Returns an array that contains the keys for each element in the map in insertion order.
   * @returns {Array<String>} Array containing all the keys in the map
   */


  keys() {
    return this._attribute_names;
  }
  /**
   * Returns an array that contains the keys and the values for each element in the map in insertion order.
   * @returns {Array<Array<String, *>>} Array containing all the keys and values in the map
   */


  entries() {
    const arr = [];
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = this.keys()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        let key = _step2.value;
        arr.push([key, this.getElement(key)]);
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

    return arr;
  }
  /**
   * Deletes an element.
   * @param key Key of the element
   * @throws {TypeError} If the key is not a string
   * @throws {Error} If the key is not in the map
   */


  delete(key) {
    if (!this.has(key)) {
      throw Error("The key doesn't exist");
    }

    this.rem_attr(key);
  }
  /**
   * Deletes all elements.
   */


  clear() {
    let keys = this.keys();

    while (keys[0]) {
      this.delete(keys[0]);
    }
  }
  /**
   * Function that takes a value and a key of the map and returns nothing.
   * @callback mapForEachCallback
   * @param {*} [value] Value of the map
   * @param {string} [key] Key of the map
   */

  /**
   * Applies a function to each of the keys and values in the map.
   * @param {mapForEachCallback} fun Funcion to apply
   * @throws {TypeError} If fun is not a function
   */


  forEach(fun) {
    if (typeof fun !== "function") {
      throw TypeError("The callback must be a function");
    }

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = this[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        let _step3$value = _slicedToArray(_step3.value, 2),
            key = _step3$value[0],
            value = _step3$value[1];

        fun(value, key);
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  }
  /**
   * Function to iterate over the map object.
   * @generator
   * @yields {Array<string, *>} Arrays of key and values
   */


  *[Symbol.iterator]() {
    const keys = this.keys();
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = keys[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        let key = _step4.value;
        yield [key, this[key]];
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }
  }

}

_spinalCoreConnectorjs_type.spinalCore.register_models([SpinalMap]);

var _default = SpinalMap;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxNYXAuanMiXSwibmFtZXMiOlsiU3BpbmFsTWFwIiwiTW9kZWwiLCJjb25zdHJ1Y3RvciIsImluaXQiLCJ1bmRlZmluZWQiLCJrZXkiLCJ2YWx1ZSIsInNldEVsZW1lbnQiLCJUeXBlRXJyb3IiLCJyZW1fYXR0ciIsImF0dHJpYnV0ZSIsImFkZF9hdHRyIiwiZ2V0RWxlbWVudCIsImhhcyIsIl9hdHRyaWJ1dGVfbmFtZXMiLCJpbmNsdWRlcyIsImhhc0tleSIsImxlbmd0aCIsImtleXMiLCJlbnRyaWVzIiwiYXJyIiwicHVzaCIsImRlbGV0ZSIsIkVycm9yIiwiY2xlYXIiLCJmb3JFYWNoIiwiZnVuIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJzcGluYWxDb3JlIiwicmVnaXN0ZXJfbW9kZWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBdUJBOzs7Ozs7Ozs7O0FBS0E7Ozs7QUFJQSxNQUFNQSxTQUFOLFNBQXdCQyxpQ0FBeEIsQ0FBOEI7QUFDNUI7Ozs7Ozs7O0FBUUFDLEVBQUFBLFdBQVcsQ0FBQ0MsSUFBRCxFQUFPO0FBQ2hCOztBQUVBLFFBQUlBLElBQUksS0FBS0MsU0FBYixFQUF3QjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUN0Qiw2QkFBeUJELElBQXpCLDhIQUErQjtBQUFBO0FBQUEsY0FBckJFLEdBQXFCO0FBQUEsY0FBaEJDLEtBQWdCOztBQUM3QixlQUFLQyxVQUFMLENBQWdCRixHQUFoQixFQUFxQkMsS0FBckI7QUFDRDtBQUhxQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSXZCO0FBQ0Y7QUFFRDs7Ozs7Ozs7QUFNQUMsRUFBQUEsVUFBVSxDQUFDRixHQUFELEVBQU1DLEtBQU4sRUFBYTtBQUNyQixRQUFJLE9BQU9ELEdBQVAsS0FBZSxRQUFuQixFQUE2QjtBQUMzQixZQUFNRyxTQUFTLENBQUMsMEJBQUQsQ0FBZjtBQUNEOztBQUVELFNBQUtD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OUJ3Qix1Q0FBV0MsZUFBWCxDQUEyQixDQUFDOUIsU0FBRCxDQUEzQjs7ZUFDZUEsUyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOCBTcGluYWxDb20gLSB3d3cuc3BpbmFsY29tLmNvbVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFNwaW5hbENvcmUuXG4gKlxuICogUGxlYXNlIHJlYWQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgdGVybXMgYW5kIGNvbmRpdGlvbnNcbiAqIG9mIHRoZSBGcmVlIFNvZnR3YXJlIGxpY2Vuc2UgQWdyZWVtZW50IChcIkFncmVlbWVudFwiKVxuICogY2FyZWZ1bGx5LlxuICpcbiAqIFRoaXMgQWdyZWVtZW50IGlzIGEgbGVnYWxseSBiaW5kaW5nIGNvbnRyYWN0IGJldHdlZW5cbiAqIHRoZSBMaWNlbnNlZSAoYXMgZGVmaW5lZCBiZWxvdykgYW5kIFNwaW5hbENvbSB0aGF0XG4gKiBzZXRzIGZvcnRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyB0aGF0IGdvdmVybiB5b3VyXG4gKiB1c2Ugb2YgdGhlIFByb2dyYW0uIEJ5IGluc3RhbGxpbmcgYW5kL29yIHVzaW5nIHRoZVxuICogUHJvZ3JhbSwgeW91IGFncmVlIHRvIGFiaWRlIGJ5IGFsbCB0aGUgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zIHN0YXRlZCBvciByZWZlcmVuY2VkIGhlcmVpbi5cbiAqXG4gKiBJZiB5b3UgZG8gbm90IGFncmVlIHRvIGFiaWRlIGJ5IHRoZXNlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucywgZG8gbm90IGRlbW9uc3RyYXRlIHlvdXIgYWNjZXB0YW5jZSBhbmQgZG9cbiAqIG5vdCBpbnN0YWxsIG9yIHVzZSB0aGUgUHJvZ3JhbS5cbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYWxvbmdcbiAqIHdpdGggdGhpcyBmaWxlLiBJZiBub3QsIHNlZVxuICogPGh0dHA6Ly9yZXNvdXJjZXMuc3BpbmFsY29tLmNvbS9saWNlbnNlcy5wZGY+LlxuICovXG5pbXBvcnQge1xuICBzcGluYWxDb3JlLFxuICBNb2RlbFxufSBmcm9tIFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNfdHlwZVwiO1xuXG4vKipcbiAqIFNpbXBsZSBpbXBsZW1lbnRhdGlvbiBvZiBhIG1hcCB1c2luZyBhIE1vZGVsLlxuICogQGV4dGVuZHMgTW9kZWxcbiAqL1xuY2xhc3MgU3BpbmFsTWFwIGV4dGVuZHMgTW9kZWwge1xuICAvKipcbiAgICogQ29uc3RydWN0b3IgZm9yIHRoZSBTcGluYWxNYXAgY2xhc3MuXG4gICAqIEBwYXJhbSB7QXJyYXk8QXJyYXk8U3RyaW5nLCAqPj59IFtpbml0XSBBcnJheSBvZiBhcnJheXMgb2Yga2V5LXZhbHVlIHBhaXJzXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgaW5pdCBpcyBub3QgaXRlcmFibGVcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBpbml0W1N5bWJvbC5pdGVyYXRvcl0gZG9lc24ndCByZXR1cm4gaXRlcmF0b3JzXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIHZhbHVlcyBvZiB0aGUgaXRlcmF0b3JzIGFyZSBub3QgYXJyYXlzIG9mIGtleSB2YWx1ZXNcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUga2V5cyBvZiB0aGUgdmFsdWVzIG9mIHRoZSBpdGVyYXRvcnMgYXJlIG5vdCBzdHJpbmdzXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihpbml0KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGlmIChpbml0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGZvciAobGV0IFtrZXksIHZhbHVlXSBvZiBpbml0KSB7XG4gICAgICAgIHRoaXMuc2V0RWxlbWVudChrZXksIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdmFsdWUgY29ycmVzcG9uZGluZyB0byB0aGUga2V5LlxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IEtleSB0byB0aGUgdmFsdWVcbiAgICogQHBhcmFtIHsqfSBbdmFsdWVdIE5ldyB2YWx1ZVxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBrZXkgaXMgbm90IGEgc3RyaW5nXG4gICAqL1xuICBzZXRFbGVtZW50KGtleSwgdmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIGtleSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwiVGhlIGtleSBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIH1cblxuICAgIHRoaXMucmVtX2F0dHIoa2V5KTtcbiAgICBjb25zdCBhdHRyaWJ1dGUgPSB7fTtcbiAgICBhdHRyaWJ1dGVba2V5XSA9IHZhbHVlO1xuICAgIHRoaXMuYWRkX2F0dHIoYXR0cmlidXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSBhc3NvY2lhdGVkIHRvIHRoZSBrZXksIG9yIHVuZGVmaW5lZCBpZiB0aGVyZSBpcyBub25lLlxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IEtleSB0byB0aGUgdmFsdWVcbiAgICogQHJldHVybnMgeyp9IFZhbHVlIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGtleVxuICAgKi9cbiAgZ2V0RWxlbWVudChrZXkpIHtcbiAgICByZXR1cm4gdGhpc1trZXldO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBib29sZWFuIGFzc2VydGluZyB3aGV0aGVyIGEgdmFsdWUgaGFzIGJlZW4gYXNzb2NpYXRlZCB0byB0aGUga2V5IG9yIG5vdC5cbiAgICogQHBhcmFtIGtleSBLZXlcbiAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybiB0cnVlIGlmIHRoZSBrZXkgZXhpc3RzXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIGtleSBpcyBub3QgYSBzdHJpbmdcbiAgICovXG4gIGhhcyhrZXkpIHtcbiAgICBpZiAodHlwZW9mIGtleSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwiVGhlIGtleSBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9hdHRyaWJ1dGVfbmFtZXMuaW5jbHVkZXMoa2V5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgYm9vbGVhbiBhc3NlcnRpbmcgd2hldGhlciB0aGUgbWFwIGNvbnRhaW5zIGFueSBrZXkuXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm4gdHJ1ZSBpZiB0aGUgbWFwIGNvbnRhaW5zIGF0IGxlYXN0IG9uZSBrZXlcbiAgICovXG4gIGhhc0tleSgpIHtcbiAgICByZXR1cm4gdGhpcy5fYXR0cmlidXRlX25hbWVzLmxlbmd0aCA+IDA7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBhcnJheSB0aGF0IGNvbnRhaW5zIHRoZSBrZXlzIGZvciBlYWNoIGVsZW1lbnQgaW4gdGhlIG1hcCBpbiBpbnNlcnRpb24gb3JkZXIuXG4gICAqIEByZXR1cm5zIHtBcnJheTxTdHJpbmc+fSBBcnJheSBjb250YWluaW5nIGFsbCB0aGUga2V5cyBpbiB0aGUgbWFwXG4gICAqL1xuICBrZXlzKCkge1xuICAgIHJldHVybiB0aGlzLl9hdHRyaWJ1dGVfbmFtZXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBhcnJheSB0aGF0IGNvbnRhaW5zIHRoZSBrZXlzIGFuZCB0aGUgdmFsdWVzIGZvciBlYWNoIGVsZW1lbnQgaW4gdGhlIG1hcCBpbiBpbnNlcnRpb24gb3JkZXIuXG4gICAqIEByZXR1cm5zIHtBcnJheTxBcnJheTxTdHJpbmcsICo+Pn0gQXJyYXkgY29udGFpbmluZyBhbGwgdGhlIGtleXMgYW5kIHZhbHVlcyBpbiB0aGUgbWFwXG4gICAqL1xuICBlbnRyaWVzKCkge1xuICAgIGNvbnN0IGFyciA9IFtdO1xuXG4gICAgZm9yIChsZXQga2V5IG9mIHRoaXMua2V5cygpKSB7XG4gICAgICBhcnIucHVzaChba2V5LCB0aGlzLmdldEVsZW1lbnQoa2V5KV0pO1xuICAgIH1cblxuICAgIHJldHVybiBhcnI7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlcyBhbiBlbGVtZW50LlxuICAgKiBAcGFyYW0ga2V5IEtleSBvZiB0aGUgZWxlbWVudFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBrZXkgaXMgbm90IGEgc3RyaW5nXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUga2V5IGlzIG5vdCBpbiB0aGUgbWFwXG4gICAqL1xuICBkZWxldGUoa2V5KSB7XG4gICAgaWYgKCF0aGlzLmhhcyhrZXkpKSB7XG4gICAgICB0aHJvdyBFcnJvcihcIlRoZSBrZXkgZG9lc24ndCBleGlzdFwiKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbV9hdHRyKGtleSk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlcyBhbGwgZWxlbWVudHMuXG4gICAqL1xuICBjbGVhcigpIHtcbiAgICBsZXQga2V5cyA9IHRoaXMua2V5cygpO1xuXG4gICAgd2hpbGUgKGtleXNbMF0pIHtcbiAgICAgIHRoaXMuZGVsZXRlKGtleXNbMF0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0aGF0IHRha2VzIGEgdmFsdWUgYW5kIGEga2V5IG9mIHRoZSBtYXAgYW5kIHJldHVybnMgbm90aGluZy5cbiAgICogQGNhbGxiYWNrIG1hcEZvckVhY2hDYWxsYmFja1xuICAgKiBAcGFyYW0geyp9IFt2YWx1ZV0gVmFsdWUgb2YgdGhlIG1hcFxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2tleV0gS2V5IG9mIHRoZSBtYXBcbiAgICovXG4gIC8qKlxuICAgKiBBcHBsaWVzIGEgZnVuY3Rpb24gdG8gZWFjaCBvZiB0aGUga2V5cyBhbmQgdmFsdWVzIGluIHRoZSBtYXAuXG4gICAqIEBwYXJhbSB7bWFwRm9yRWFjaENhbGxiYWNrfSBmdW4gRnVuY2lvbiB0byBhcHBseVxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGZ1biBpcyBub3QgYSBmdW5jdGlvblxuICAgKi9cbiAgZm9yRWFjaChmdW4pIHtcbiAgICBpZiAodHlwZW9mIGZ1biAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJUaGUgY2FsbGJhY2sgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICAgIH1cblxuICAgIGZvciAobGV0IFtrZXksIHZhbHVlXSBvZiB0aGlzKSB7XG4gICAgICBmdW4odmFsdWUsIGtleSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRvIGl0ZXJhdGUgb3ZlciB0aGUgbWFwIG9iamVjdC5cbiAgICogQGdlbmVyYXRvclxuICAgKiBAeWllbGRzIHtBcnJheTxzdHJpbmcsICo+fSBBcnJheXMgb2Yga2V5IGFuZCB2YWx1ZXNcbiAgICovXG4gICpbU3ltYm9sLml0ZXJhdG9yXSgpIHtcbiAgICBjb25zdCBrZXlzID0gdGhpcy5rZXlzKCk7XG5cbiAgICBmb3IgKGxldCBrZXkgb2Yga2V5cykge1xuICAgICAgeWllbGQgW2tleSwgdGhpc1trZXldXTtcbiAgICB9XG4gIH1cbn1cblxuc3BpbmFsQ29yZS5yZWdpc3Rlcl9tb2RlbHMoW1NwaW5hbE1hcF0pO1xuZXhwb3J0IGRlZmF1bHQgU3BpbmFsTWFwO1xuIl19