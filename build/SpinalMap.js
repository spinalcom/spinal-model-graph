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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxNYXAuanMiXSwibmFtZXMiOlsiU3BpbmFsTWFwIiwiTW9kZWwiLCJjb25zdHJ1Y3RvciIsImluaXQiLCJ1bmRlZmluZWQiLCJrZXkiLCJ2YWx1ZSIsInNldEVsZW1lbnQiLCJUeXBlRXJyb3IiLCJyZW1fYXR0ciIsImF0dHJpYnV0ZSIsImFkZF9hdHRyIiwiZ2V0RWxlbWVudCIsImhhcyIsIl9hdHRyaWJ1dGVfbmFtZXMiLCJpbmNsdWRlcyIsImhhc0tleSIsImxlbmd0aCIsImtleXMiLCJlbnRyaWVzIiwiYXJyIiwicHVzaCIsImRlbGV0ZSIsIkVycm9yIiwiY2xlYXIiLCJmb3JFYWNoIiwiZnVuIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJzcGluYWxDb3JlIiwicmVnaXN0ZXJfbW9kZWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBdUJBOzs7Ozs7Ozs7O0FBS0E7Ozs7QUFJQSxNQUFNQSxTQUFOLFNBQXdCQyxpQ0FBeEIsQ0FBOEI7QUFDNUI7Ozs7Ozs7O0FBUUFDLEVBQUFBLFdBQVcsQ0FBQ0MsSUFBRCxFQUFPO0FBQ2hCOztBQUVBLFFBQUlBLElBQUksS0FBS0MsU0FBYixFQUF3QjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUN0Qiw2QkFBeUJELElBQXpCLDhIQUErQjtBQUFBO0FBQUEsY0FBckJFLEdBQXFCO0FBQUEsY0FBaEJDLEtBQWdCOztBQUM3QixlQUFLQyxVQUFMLENBQWdCRixHQUFoQixFQUFxQkMsS0FBckI7QUFDRDtBQUhxQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSXZCO0FBQ0Y7QUFFRDs7Ozs7Ozs7QUFNQUMsRUFBQUEsVUFBVSxDQUFDRixHQUFELEVBQU1DLEtBQU4sRUFBYTtBQUNyQixRQUFJLE9BQU9ELEdBQVAsS0FBZSxRQUFuQixFQUE2QjtBQUMzQixZQUFNRyxTQUFTLENBQUMsMEJBQUQsQ0FBZjtBQUNEOztBQUVELFNBQUtD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LGVBQVgsQ0FBMkIsQ0FBQzlCLFNBQUQsQ0FBM0I7O2VBQ2VBLFMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTggU3BpbmFsQ29tIC0gd3d3LnNwaW5hbGNvbS5jb21cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBTcGluYWxDb3JlLlxuICpcbiAqIFBsZWFzZSByZWFkIGFsbCBvZiB0aGUgZm9sbG93aW5nIHRlcm1zIGFuZCBjb25kaXRpb25zXG4gKiBvZiB0aGUgRnJlZSBTb2Z0d2FyZSBsaWNlbnNlIEFncmVlbWVudCAoXCJBZ3JlZW1lbnRcIilcbiAqIGNhcmVmdWxseS5cbiAqXG4gKiBUaGlzIEFncmVlbWVudCBpcyBhIGxlZ2FsbHkgYmluZGluZyBjb250cmFjdCBiZXR3ZWVuXG4gKiB0aGUgTGljZW5zZWUgKGFzIGRlZmluZWQgYmVsb3cpIGFuZCBTcGluYWxDb20gdGhhdFxuICogc2V0cyBmb3J0aCB0aGUgdGVybXMgYW5kIGNvbmRpdGlvbnMgdGhhdCBnb3Zlcm4geW91clxuICogdXNlIG9mIHRoZSBQcm9ncmFtLiBCeSBpbnN0YWxsaW5nIGFuZC9vciB1c2luZyB0aGVcbiAqIFByb2dyYW0sIHlvdSBhZ3JlZSB0byBhYmlkZSBieSBhbGwgdGhlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucyBzdGF0ZWQgb3IgcmVmZXJlbmNlZCBoZXJlaW4uXG4gKlxuICogSWYgeW91IGRvIG5vdCBhZ3JlZSB0byBhYmlkZSBieSB0aGVzZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMsIGRvIG5vdCBkZW1vbnN0cmF0ZSB5b3VyIGFjY2VwdGFuY2UgYW5kIGRvXG4gKiBub3QgaW5zdGFsbCBvciB1c2UgdGhlIFByb2dyYW0uXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFsb25nXG4gKiB3aXRoIHRoaXMgZmlsZS4gSWYgbm90LCBzZWVcbiAqIDxodHRwOi8vcmVzb3VyY2VzLnNwaW5hbGNvbS5jb20vbGljZW5zZXMucGRmPi5cbiAqL1xuaW1wb3J0IHtcbiAgc3BpbmFsQ29yZSxcbiAgTW9kZWxcbn0gZnJvbSBcInNwaW5hbC1jb3JlLWNvbm5lY3RvcmpzX3R5cGVcIjtcblxuLyoqXG4gKiBTaW1wbGUgaW1wbGVtZW50YXRpb24gb2YgYSBtYXAgdXNpbmcgYSBNb2RlbC5cbiAqIEBleHRlbmRzIE1vZGVsXG4gKi9cbmNsYXNzIFNwaW5hbE1hcCBleHRlbmRzIE1vZGVsIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yIGZvciB0aGUgU3BpbmFsTWFwIGNsYXNzLlxuICAgKiBAcGFyYW0ge0FycmF5PEFycmF5PFN0cmluZywgKj4+fSBpbml0IEFycmF5IG9mIGFycmF5cyBvZiBrZXktdmFsdWUgcGFpcnNcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBpbml0IGlzIG5vdCBpdGVyYWJsZVxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGluaXRbU3ltYm9sLml0ZXJhdG9yXSBkb2Vzbid0IHJldHVybiBpdGVyYXRvcnNcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgdmFsdWVzIG9mIHRoZSBpdGVyYXRvcnMgYXJlIG5vdCBhcnJheXMgb2Yga2V5IHZhbHVlc1xuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBrZXlzIG9mIHRoZSB2YWx1ZXMgb2YgdGhlIGl0ZXJhdG9ycyBhcmUgbm90IHN0cmluZ3NcbiAgICovXG4gIGNvbnN0cnVjdG9yKGluaXQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgaWYgKGluaXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZm9yIChsZXQgW2tleSwgdmFsdWVdIG9mIGluaXQpIHtcbiAgICAgICAgdGhpcy5zZXRFbGVtZW50KGtleSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB2YWx1ZSBjb3JyZXNwb25kaW5nIHRvIHRoZSBrZXkuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgS2V5IHRvIHRoZSB2YWx1ZVxuICAgKiBAcGFyYW0geyp9IHZhbHVlIE5ldyB2YWx1ZSwgY2FuIGJlIG9taXR0ZWRcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUga2V5IGlzIG5vdCBhIHN0cmluZ1xuICAgKi9cbiAgc2V0RWxlbWVudChrZXksIHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiBrZXkgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcIlRoZSBrZXkgbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbV9hdHRyKGtleSk7XG4gICAgY29uc3QgYXR0cmlidXRlID0ge307XG4gICAgYXR0cmlidXRlW2tleV0gPSB2YWx1ZTtcbiAgICB0aGlzLmFkZF9hdHRyKGF0dHJpYnV0ZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdmFsdWUgYXNzb2NpYXRlZCB0byB0aGUga2V5LCBvciB1bmRlZmluZWQgaWYgdGhlcmUgaXMgbm9uZS5cbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleSBLZXkgdG8gdGhlIHZhbHVlXG4gICAqIEByZXR1cm5zIHsqfSBWYWx1ZSBjb3JyZXNwb25kaW5nIHRvIHRoZSBrZXlcbiAgICovXG4gIGdldEVsZW1lbnQoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXNba2V5XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgYm9vbGVhbiBhc3NlcnRpbmcgd2hldGhlciBhIHZhbHVlIGhhcyBiZWVuIGFzc29jaWF0ZWQgdG8gdGhlIGtleSBvciBub3QuXG4gICAqIEBwYXJhbSBrZXkgS2V5XG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm4gdHJ1ZSBpZiB0aGUga2V5IGV4aXN0c1xuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBrZXkgaXMgbm90IGEgc3RyaW5nXG4gICAqL1xuICBoYXMoa2V5KSB7XG4gICAgaWYgKHR5cGVvZiBrZXkgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcIlRoZSBrZXkgbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fYXR0cmlidXRlX25hbWVzLmluY2x1ZGVzKGtleSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGJvb2xlYW4gYXNzZXJ0aW5nIHdoZXRoZXIgdGhlIG1hcCBjb250YWlucyBhbnkga2V5LlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJuIHRydWUgaWYgdGhlIG1hcCBjb250YWlucyBhdCBsZWFzdCBvbmUga2V5XG4gICAqL1xuICBoYXNLZXkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2F0dHJpYnV0ZV9uYW1lcy5sZW5ndGggPiAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gYXJyYXkgdGhhdCBjb250YWlucyB0aGUga2V5cyBmb3IgZWFjaCBlbGVtZW50IGluIHRoZSBtYXAgaW4gaW5zZXJ0aW9uIG9yZGVyLlxuICAgKiBAcmV0dXJucyB7QXJyYXk8U3RyaW5nPn0gQXJyYXkgY29udGFpbmluZyBhbGwgdGhlIGtleXMgaW4gdGhlIG1hcFxuICAgKi9cbiAga2V5cygpIHtcbiAgICByZXR1cm4gdGhpcy5fYXR0cmlidXRlX25hbWVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gYXJyYXkgdGhhdCBjb250YWlucyB0aGUga2V5cyBhbmQgdGhlIHZhbHVlcyBmb3IgZWFjaCBlbGVtZW50IGluIHRoZSBtYXAgaW4gaW5zZXJ0aW9uIG9yZGVyLlxuICAgKiBAcmV0dXJucyB7QXJyYXk8QXJyYXk8U3RyaW5nLCAqPj59IEFycmF5IGNvbnRhaW5pbmcgYWxsIHRoZSBrZXlzIGFuZCB2YWx1ZXMgaW4gdGhlIG1hcFxuICAgKi9cbiAgZW50cmllcygpIHtcbiAgICBjb25zdCBhcnIgPSBbXTtcblxuICAgIGZvciAobGV0IGtleSBvZiB0aGlzLmtleXMoKSkge1xuICAgICAgYXJyLnB1c2goW2tleSwgdGhpcy5nZXRFbGVtZW50KGtleSldKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgYW4gZWxlbWVudC5cbiAgICogQHBhcmFtIGtleSBLZXkgb2YgdGhlIGVsZW1lbnRcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUga2V5IGlzIG5vdCBhIHN0cmluZ1xuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIGtleSBpcyBub3QgaW4gdGhlIG1hcFxuICAgKi9cbiAgZGVsZXRlKGtleSkge1xuICAgIGlmICghdGhpcy5oYXMoa2V5KSkge1xuICAgICAgdGhyb3cgRXJyb3IoXCJUaGUga2V5IGRvZXNuJ3QgZXhpc3RcIik7XG4gICAgfVxuXG4gICAgdGhpcy5yZW1fYXR0cihrZXkpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgYWxsIGVsZW1lbnRzLlxuICAgKi9cbiAgY2xlYXIoKSB7XG4gICAgbGV0IGtleXMgPSB0aGlzLmtleXMoKTtcblxuICAgIHdoaWxlIChrZXlzWzBdKSB7XG4gICAgICB0aGlzLmRlbGV0ZShrZXlzWzBdKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQXBwbGllcyBhIGZ1bmN0aW9uIHRvIGVhY2ggb2YgdGhlIHZhbHVlcyBpbiB0aGUgbWFwLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW4gRnVuY2lvbiB0byBhcHBseVxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGZ1biBpcyBub3QgYSBmdW5jdGlvblxuICAgKi9cbiAgZm9yRWFjaChmdW4pIHtcbiAgICBpZiAodHlwZW9mIGZ1biAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJUaGUgY2FsbGJhY2sgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICAgIH1cblxuICAgIGZvciAobGV0IFtrZXksIHZhbHVlXSBvZiB0aGlzKSB7XG4gICAgICBmdW4odmFsdWUsIGtleSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRvIGl0ZXJhdGUgb3ZlciB0aGUgbWFwIG9iamVjdC5cbiAgICogQGdlbmVyYXRvclxuICAgKiBAeWllbGRzIHtBcnJheTxzdHJpbmcsICo+fSBBcnJheXMgb2Yga2V5IGFuZCB2YWx1ZXNcbiAgICovXG4gICpbU3ltYm9sLml0ZXJhdG9yXSgpIHtcbiAgICBjb25zdCBrZXlzID0gdGhpcy5rZXlzKCk7XG5cbiAgICBmb3IgKGxldCBrZXkgb2Yga2V5cykge1xuICAgICAgeWllbGQgW2tleSwgdGhpc1trZXldXTtcbiAgICB9XG4gIH1cbn1cblxuc3BpbmFsQ29yZS5yZWdpc3Rlcl9tb2RlbHMoW1NwaW5hbE1hcF0pO1xuZXhwb3J0IGRlZmF1bHQgU3BpbmFsTWFwO1xuIl19