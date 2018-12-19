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
   * @param {Array<Array<String, *>>} init Array of arrays of key-value pairs
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
   * @param {*} value New value, can be omitted
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
   * Applies a function to each of the values in the map.
   * @param {function} fun Funcion to apply
   * @throws {TypeError} If fun is not a function
   */


  forEach(fun) {
    if (typeof fun !== "function") {
      throw TypeError("The callback must be a function");
    }

    for (let i = 0; i < this._attribute_names.length; i++) {
      let name = this._attribute_names[i];
      fun(this[name]);
    }
  }
  /**
   * Function to iterate over the map object.
   */


  *[Symbol.iterator]() {
    const keys = this.keys();
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = keys[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        let key = _step3.value;
        yield this[key];
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

}

_spinalCoreConnectorjs_type.spinalCore.register_models([SpinalMap]);

var _default = SpinalMap;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxNYXAuanMiXSwibmFtZXMiOlsiU3BpbmFsTWFwIiwiTW9kZWwiLCJjb25zdHJ1Y3RvciIsImluaXQiLCJ1bmRlZmluZWQiLCJrZXkiLCJ2YWx1ZSIsInNldEVsZW1lbnQiLCJUeXBlRXJyb3IiLCJyZW1fYXR0ciIsImF0dHJpYnV0ZSIsImFkZF9hdHRyIiwiZ2V0RWxlbWVudCIsImhhcyIsIl9hdHRyaWJ1dGVfbmFtZXMiLCJpbmNsdWRlcyIsImhhc0tleSIsImxlbmd0aCIsImtleXMiLCJlbnRyaWVzIiwiYXJyIiwicHVzaCIsImRlbGV0ZSIsIkVycm9yIiwiY2xlYXIiLCJmb3JFYWNoIiwiZnVuIiwiaSIsIm5hbWUiLCJTeW1ib2wiLCJpdGVyYXRvciIsInNwaW5hbENvcmUiLCJyZWdpc3Rlcl9tb2RlbHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUF1QkE7Ozs7Ozs7Ozs7QUFLQTs7OztBQUlBLE1BQU1BLFNBQU4sU0FBd0JDLGlDQUF4QixDQUE4QjtBQUM1Qjs7Ozs7Ozs7QUFRQUMsRUFBQUEsV0FBVyxDQUFDQyxJQUFELEVBQU87QUFDaEI7O0FBRUEsUUFBSUEsSUFBSSxLQUFLQyxTQUFiLEVBQXdCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQ3RCLDZCQUF5QkQsSUFBekIsOEhBQStCO0FBQUE7QUFBQSxjQUFyQkUsR0FBcUI7QUFBQSxjQUFoQkMsS0FBZ0I7O0FBQzdCLGVBQUtDLFVBQUwsQ0FBZ0JGLEdBQWhCLEVBQXFCQyxLQUFyQjtBQUNEO0FBSHFCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJdkI7QUFDRjtBQUVEOzs7Ozs7OztBQU1BQyxFQUFBQSxVQUFVLENBQUNGLEdBQUQsRUFBTUMsS0FBTixFQUFhO0FBQ3JCLFFBQUksT0FBT0QsR0FBUCxLQUFlLFFBQW5CLEVBQTZCO0FBQzNCLFlBQU1HLFNBQVMsQ0FBQywwQkFBRCxDQUFmO0FBQ0Q7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QUEzQjs7ZUFDZUEsUyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOCBTcGluYWxDb20gLSB3d3cuc3BpbmFsY29tLmNvbVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFNwaW5hbENvcmUuXG4gKlxuICogUGxlYXNlIHJlYWQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgdGVybXMgYW5kIGNvbmRpdGlvbnNcbiAqIG9mIHRoZSBGcmVlIFNvZnR3YXJlIGxpY2Vuc2UgQWdyZWVtZW50IChcIkFncmVlbWVudFwiKVxuICogY2FyZWZ1bGx5LlxuICpcbiAqIFRoaXMgQWdyZWVtZW50IGlzIGEgbGVnYWxseSBiaW5kaW5nIGNvbnRyYWN0IGJldHdlZW5cbiAqIHRoZSBMaWNlbnNlZSAoYXMgZGVmaW5lZCBiZWxvdykgYW5kIFNwaW5hbENvbSB0aGF0XG4gKiBzZXRzIGZvcnRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyB0aGF0IGdvdmVybiB5b3VyXG4gKiB1c2Ugb2YgdGhlIFByb2dyYW0uIEJ5IGluc3RhbGxpbmcgYW5kL29yIHVzaW5nIHRoZVxuICogUHJvZ3JhbSwgeW91IGFncmVlIHRvIGFiaWRlIGJ5IGFsbCB0aGUgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zIHN0YXRlZCBvciByZWZlcmVuY2VkIGhlcmVpbi5cbiAqXG4gKiBJZiB5b3UgZG8gbm90IGFncmVlIHRvIGFiaWRlIGJ5IHRoZXNlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucywgZG8gbm90IGRlbW9uc3RyYXRlIHlvdXIgYWNjZXB0YW5jZSBhbmQgZG9cbiAqIG5vdCBpbnN0YWxsIG9yIHVzZSB0aGUgUHJvZ3JhbS5cbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYWxvbmdcbiAqIHdpdGggdGhpcyBmaWxlLiBJZiBub3QsIHNlZVxuICogPGh0dHA6Ly9yZXNvdXJjZXMuc3BpbmFsY29tLmNvbS9saWNlbnNlcy5wZGY+LlxuICovXG5pbXBvcnQge1xuICBzcGluYWxDb3JlLFxuICBNb2RlbFxufSBmcm9tIFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNfdHlwZVwiO1xuXG4vKipcbiAqIFNpbXBsZSBpbXBsZW1lbnRhdGlvbiBvZiBhIG1hcCB1c2luZyBhIE1vZGVsLlxuICogQGV4dGVuZHMgTW9kZWxcbiAqL1xuY2xhc3MgU3BpbmFsTWFwIGV4dGVuZHMgTW9kZWwge1xuICAvKipcbiAgICogQ29uc3RydWN0b3IgZm9yIHRoZSBTcGluYWxNYXAgY2xhc3MuXG4gICAqIEBwYXJhbSB7QXJyYXk8QXJyYXk8U3RyaW5nLCAqPj59IGluaXQgQXJyYXkgb2YgYXJyYXlzIG9mIGtleS12YWx1ZSBwYWlyc1xuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGluaXQgaXMgbm90IGl0ZXJhYmxlXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgaW5pdFtTeW1ib2wuaXRlcmF0b3JdIGRvZXNuJ3QgcmV0dXJuIGl0ZXJhdG9yc1xuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSB2YWx1ZXMgb2YgdGhlIGl0ZXJhdG9ycyBhcmUgbm90IGFycmF5cyBvZiBrZXkgdmFsdWVzXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIGtleXMgb2YgdGhlIHZhbHVlcyBvZiB0aGUgaXRlcmF0b3JzIGFyZSBub3Qgc3RyaW5nc1xuICAgKi9cbiAgY29uc3RydWN0b3IoaW5pdCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICBpZiAoaW5pdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBmb3IgKGxldCBba2V5LCB2YWx1ZV0gb2YgaW5pdCkge1xuICAgICAgICB0aGlzLnNldEVsZW1lbnQoa2V5LCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHZhbHVlIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGtleS5cbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleSBLZXkgdG8gdGhlIHZhbHVlXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWUgTmV3IHZhbHVlLCBjYW4gYmUgb21pdHRlZFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBrZXkgaXMgbm90IGEgc3RyaW5nXG4gICAqL1xuICBzZXRFbGVtZW50KGtleSwgdmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIGtleSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwiVGhlIGtleSBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIH1cblxuICAgIHRoaXMucmVtX2F0dHIoa2V5KTtcbiAgICBjb25zdCBhdHRyaWJ1dGUgPSB7fTtcbiAgICBhdHRyaWJ1dGVba2V5XSA9IHZhbHVlO1xuICAgIHRoaXMuYWRkX2F0dHIoYXR0cmlidXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSBhc3NvY2lhdGVkIHRvIHRoZSBrZXksIG9yIHVuZGVmaW5lZCBpZiB0aGVyZSBpcyBub25lLlxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IEtleSB0byB0aGUgdmFsdWVcbiAgICogQHJldHVybnMgeyp9IFZhbHVlIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGtleVxuICAgKi9cbiAgZ2V0RWxlbWVudChrZXkpIHtcbiAgICByZXR1cm4gdGhpc1trZXldO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBib29sZWFuIGFzc2VydGluZyB3aGV0aGVyIGEgdmFsdWUgaGFzIGJlZW4gYXNzb2NpYXRlZCB0byB0aGUga2V5IG9yIG5vdC5cbiAgICogQHBhcmFtIGtleSBLZXlcbiAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybiB0cnVlIGlmIHRoZSBrZXkgZXhpc3RzXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIGtleSBpcyBub3QgYSBzdHJpbmdcbiAgICovXG4gIGhhcyhrZXkpIHtcbiAgICBpZiAodHlwZW9mIGtleSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwiVGhlIGtleSBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9hdHRyaWJ1dGVfbmFtZXMuaW5jbHVkZXMoa2V5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgYm9vbGVhbiBhc3NlcnRpbmcgd2hldGhlciB0aGUgbWFwIGNvbnRhaW5zIGFueSBrZXkuXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm4gdHJ1ZSBpZiB0aGUgbWFwIGNvbnRhaW5zIGF0IGxlYXN0IG9uZSBrZXlcbiAgICovXG4gIGhhc0tleSgpIHtcbiAgICByZXR1cm4gdGhpcy5fYXR0cmlidXRlX25hbWVzLmxlbmd0aCA+IDA7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBhcnJheSB0aGF0IGNvbnRhaW5zIHRoZSBrZXlzIGZvciBlYWNoIGVsZW1lbnQgaW4gdGhlIG1hcCBpbiBpbnNlcnRpb24gb3JkZXIuXG4gICAqIEByZXR1cm5zIHtBcnJheTxTdHJpbmc+fSBBcnJheSBjb250YWluaW5nIGFsbCB0aGUga2V5cyBpbiB0aGUgbWFwXG4gICAqL1xuICBrZXlzKCkge1xuICAgIHJldHVybiB0aGlzLl9hdHRyaWJ1dGVfbmFtZXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBhcnJheSB0aGF0IGNvbnRhaW5zIHRoZSBrZXlzIGFuZCB0aGUgdmFsdWVzIGZvciBlYWNoIGVsZW1lbnQgaW4gdGhlIG1hcCBpbiBpbnNlcnRpb24gb3JkZXIuXG4gICAqIEByZXR1cm5zIHtBcnJheTxBcnJheTxTdHJpbmcsICo+Pn0gQXJyYXkgY29udGFpbmluZyBhbGwgdGhlIGtleXMgYW5kIHZhbHVlcyBpbiB0aGUgbWFwXG4gICAqL1xuICBlbnRyaWVzKCkge1xuICAgIGNvbnN0IGFyciA9IFtdO1xuXG4gICAgZm9yIChsZXQga2V5IG9mIHRoaXMua2V5cygpKSB7XG4gICAgICBhcnIucHVzaChba2V5LCB0aGlzLmdldEVsZW1lbnQoa2V5KV0pO1xuICAgIH1cblxuICAgIHJldHVybiBhcnI7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlcyBhbiBlbGVtZW50LlxuICAgKiBAcGFyYW0ga2V5IEtleSBvZiB0aGUgZWxlbWVudFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBrZXkgaXMgbm90IGEgc3RyaW5nXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUga2V5IGlzIG5vdCBpbiB0aGUgbWFwXG4gICAqL1xuICBkZWxldGUoa2V5KSB7XG4gICAgaWYgKCF0aGlzLmhhcyhrZXkpKSB7XG4gICAgICB0aHJvdyBFcnJvcihcIlRoZSBrZXkgZG9lc24ndCBleGlzdFwiKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbV9hdHRyKGtleSk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlcyBhbGwgZWxlbWVudHMuXG4gICAqL1xuICBjbGVhcigpIHtcbiAgICBsZXQga2V5cyA9IHRoaXMua2V5cygpO1xuXG4gICAgd2hpbGUgKGtleXNbMF0pIHtcbiAgICAgIHRoaXMuZGVsZXRlKGtleXNbMF0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBsaWVzIGEgZnVuY3Rpb24gdG8gZWFjaCBvZiB0aGUgdmFsdWVzIGluIHRoZSBtYXAuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1biBGdW5jaW9uIHRvIGFwcGx5XG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgZnVuIGlzIG5vdCBhIGZ1bmN0aW9uXG4gICAqL1xuICBmb3JFYWNoKGZ1bikge1xuICAgIGlmICh0eXBlb2YgZnVuICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcIlRoZSBjYWxsYmFjayBtdXN0IGJlIGEgZnVuY3Rpb25cIik7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9hdHRyaWJ1dGVfbmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBuYW1lID0gdGhpcy5fYXR0cmlidXRlX25hbWVzW2ldO1xuICAgICAgZnVuKHRoaXNbbmFtZV0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0byBpdGVyYXRlIG92ZXIgdGhlIG1hcCBvYmplY3QuXG4gICAqL1xuICAqW1N5bWJvbC5pdGVyYXRvcl0oKSB7XG4gICAgY29uc3Qga2V5cyA9IHRoaXMua2V5cygpO1xuXG4gICAgZm9yIChsZXQga2V5IG9mIGtleXMpIHtcbiAgICAgIHlpZWxkIHRoaXNba2V5XTtcbiAgICB9XG4gIH1cbn1cblxuc3BpbmFsQ29yZS5yZWdpc3Rlcl9tb2RlbHMoW1NwaW5hbE1hcF0pO1xuZXhwb3J0IGRlZmF1bHQgU3BpbmFsTWFwO1xuIl19