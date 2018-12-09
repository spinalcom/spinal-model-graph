"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _spinalCoreConnectorjs = _interopRequireDefault(require("spinal-core-connectorjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

const globalType = typeof window === "undefined" ? global : window;

class SpinalMap extends globalType.Model {
  /**
   * Constructor for the SpinalMap class.
   */
  constructor(init) {
    super();

    if (!init) {
      return;
    }

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
  /**
   * Sets the value corresponding to the key.
   * @param {String} key Key to the value
   * @param {*} value New value
   */


  setElement(key, value) {
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
   */


  has(key) {
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
   */


  delete(key) {
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
   */


  forEach(fun) {
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

_spinalCoreConnectorjs.default.register_models([SpinalMap]);

var _default = SpinalMap;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxNYXAuanMiXSwibmFtZXMiOlsiZ2xvYmFsVHlwZSIsIndpbmRvdyIsImdsb2JhbCIsIlNwaW5hbE1hcCIsIk1vZGVsIiwiY29uc3RydWN0b3IiLCJpbml0Iiwia2V5IiwidmFsdWUiLCJzZXRFbGVtZW50IiwicmVtX2F0dHIiLCJhdHRyaWJ1dGUiLCJhZGRfYXR0ciIsImdldEVsZW1lbnQiLCJoYXMiLCJfYXR0cmlidXRlX25hbWVzIiwiaW5jbHVkZXMiLCJoYXNLZXkiLCJsZW5ndGgiLCJrZXlzIiwiZW50cmllcyIsImFyciIsInB1c2giLCJkZWxldGUiLCJjbGVhciIsImZvckVhY2giLCJmdW4iLCJpIiwibmFtZSIsIlN5bWJvbCIsIml0ZXJhdG9yIiwic3BpbmFsQ29yZSIsInJlZ2lzdGVyX21vZGVscyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQXVCQTs7Ozs7Ozs7Ozs7O0FBRUEsTUFBTUEsVUFBVSxHQUFHLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NDLE1BQWhDLEdBQXlDRCxNQUE1RDs7QUFFQSxNQUFNRSxTQUFOLFNBQXdCSCxVQUFVLENBQUNJLEtBQW5DLENBQXlDO0FBQ3ZDOzs7QUFHQUMsRUFBQUEsV0FBVyxDQUFDQyxJQUFELEVBQU87QUFDaEI7O0FBRUEsUUFBSSxDQUFDQSxJQUFMLEVBQVc7QUFDVDtBQUNEOztBQUxlO0FBQUE7QUFBQTs7QUFBQTtBQU9oQiwyQkFBeUJBLElBQXpCLDhIQUErQjtBQUFBO0FBQUEsWUFBckJDLEdBQXFCO0FBQUEsWUFBaEJDLEtBQWdCOztBQUM3QixhQUFLQyxVQUFMLENBQWdCRixHQUFoQixFQUFxQkMsS0FBckI7QUFDRDtBQVRlO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFVakI7QUFFRDs7Ozs7OztBQUtBQyxFQUFBQSxVQUFVLENBQUNGLEdBQUQsRUFBTUMsS0FBTixFQUFhO0FBQ3JCLFNBQUtFLFFBQUwsQ0FBY0gsR0FBZDtBQUNBLFVBQU1JLFNBQVMsR0FBRyxFQUFsQjtBQUNBQSxJQUFBQSxTQUFTLENBQUNKLEdBQUQsQ0FBVCxHQUFpQkMsS0FBakI7QUFFQSxTQUFLSSxRQUFMLENBQWNELFNBQWQ7QUFDRDtBQUVEOzs7Ozs7O0FBS0FFLEVBQUFBLFVBQVUsQ0FBQ04sR0FBRCxFQUFNO0FBQ2QsV0FBTyxLQUFLQSxHQUFMLENBQVA7QUFDRDtBQUVEOzs7Ozs7O0FBS0FPLEVBQUFBLEdBQUcsQ0FBQ1AsR0FBRCxFQUFNO0FBQ1AsV0FBTyxLQUFLUSxnQkFBTCxDQUFzQkMsUUFBdEIsQ0FBK0JULEdBQS9CLENBQVA7QUFDRDtBQUVEOzs7Ozs7QUFJQVUsRUFBQUEsTUFBTSxHQUFHO0FBQ1AsV0FBTyxLQUFLRixnQkFBTCxDQUFzQkcsTUFBdEIsR0FBK0IsQ0FBdEM7QUFDRDtBQUVEOzs7Ozs7QUFJQUMsRUFBQUEsSUFBSSxHQUFHO0FBQ0wsV0FBTyxLQUFLSixnQkFBWjtBQUNEO0FBRUQ7Ozs7OztBQUlBSyxFQUFBQSxPQUFPLEdBQUc7QUFDUixVQUFNQyxHQUFHLEdBQUcsRUFBWjtBQURRO0FBQUE7QUFBQTs7QUFBQTtBQUdSLDRCQUFnQixLQUFLRixJQUFMLEVBQWhCLG1JQUE2QjtBQUFBLFlBQXBCWixHQUFvQjtBQUMzQmMsUUFBQUEsR0FBRyxDQUFDQyxJQUFKLENBQVMsQ0FBQ2YsR0FBRCxFQUFNLEtBQUtNLFVBQUwsQ0FBZ0JOLEdBQWhCLENBQU4sQ0FBVDtBQUNEO0FBTE87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFPUixXQUFPYyxHQUFQO0FBQ0Q7QUFFRDs7Ozs7O0FBSUFFLEVBQUFBLE1BQU0sQ0FBQ2hCLEdBQUQsRUFBTTtBQUNWLFNBQUtHLFFBQUwsQ0FBY0gsR0FBZDtBQUNEO0FBRUQ7Ozs7O0FBR0FpQixFQUFBQSxLQUFLLEdBQUc7QUFDTixRQUFJTCxJQUFJLEdBQUcsS0FBS0EsSUFBTCxFQUFYOztBQUVBLFdBQU9BLElBQUksQ0FBQyxDQUFELENBQVgsRUFBZ0I7QUFDZCxXQUFLSSxNQUFMLENBQVlKLElBQUksQ0FBQyxDQUFELENBQWhCO0FBQ0Q7QUFDRjtBQUVEOzs7Ozs7QUFJQU0sRUFBQUEsT0FBTyxDQUFDQyxHQUFELEVBQU07QUFDWCxTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS1osZ0JBQUwsQ0FBc0JHLE1BQTFDLEVBQWtEUyxDQUFDLEVBQW5ELEVBQXVEO0FBQ3JELFVBQUlDLElBQUksR0FBRyxLQUFLYixnQkFBTCxDQUFzQlksQ0FBdEIsQ0FBWDtBQUNBRCxNQUFBQSxHQUFHLENBQUMsS0FBS0UsSUFBTCxDQUFELENBQUg7QUFDRDtBQUNGO0FBRUQ7Ozs7O0FBR0EsSUFBRUMsTUFBTSxDQUFDQyxRQUFULElBQXFCO0FBQ25CLFVBQU1YLElBQUksR0FBRyxLQUFLQSxJQUFMLEVBQWI7QUFEbUI7QUFBQTtBQUFBOztBQUFBO0FBR25CLDRCQUFnQkEsSUFBaEIsbUlBQXNCO0FBQUEsWUFBYlosR0FBYTtBQUNwQixjQUFNLEtBQUtBLEdBQUwsQ0FBTjtBQUNEO0FBTGtCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNcEI7O0FBcEhzQzs7QUF1SHpDd0IsK0JBQVdDLGVBQVgsQ0FBMkIsQ0FBQzdCLFNBQUQsQ0FBM0I7O2VBQ2VBLFMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTggU3BpbmFsQ29tIC0gd3d3LnNwaW5hbGNvbS5jb21cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBTcGluYWxDb3JlLlxuICpcbiAqIFBsZWFzZSByZWFkIGFsbCBvZiB0aGUgZm9sbG93aW5nIHRlcm1zIGFuZCBjb25kaXRpb25zXG4gKiBvZiB0aGUgRnJlZSBTb2Z0d2FyZSBsaWNlbnNlIEFncmVlbWVudCAoXCJBZ3JlZW1lbnRcIilcbiAqIGNhcmVmdWxseS5cbiAqXG4gKiBUaGlzIEFncmVlbWVudCBpcyBhIGxlZ2FsbHkgYmluZGluZyBjb250cmFjdCBiZXR3ZWVuXG4gKiB0aGUgTGljZW5zZWUgKGFzIGRlZmluZWQgYmVsb3cpIGFuZCBTcGluYWxDb20gdGhhdFxuICogc2V0cyBmb3J0aCB0aGUgdGVybXMgYW5kIGNvbmRpdGlvbnMgdGhhdCBnb3Zlcm4geW91clxuICogdXNlIG9mIHRoZSBQcm9ncmFtLiBCeSBpbnN0YWxsaW5nIGFuZC9vciB1c2luZyB0aGVcbiAqIFByb2dyYW0sIHlvdSBhZ3JlZSB0byBhYmlkZSBieSBhbGwgdGhlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucyBzdGF0ZWQgb3IgcmVmZXJlbmNlZCBoZXJlaW4uXG4gKlxuICogSWYgeW91IGRvIG5vdCBhZ3JlZSB0byBhYmlkZSBieSB0aGVzZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMsIGRvIG5vdCBkZW1vbnN0cmF0ZSB5b3VyIGFjY2VwdGFuY2UgYW5kIGRvXG4gKiBub3QgaW5zdGFsbCBvciB1c2UgdGhlIFByb2dyYW0uXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFsb25nXG4gKiB3aXRoIHRoaXMgZmlsZS4gSWYgbm90LCBzZWVcbiAqIDxodHRwOi8vcmVzb3VyY2VzLnNwaW5hbGNvbS5jb20vbGljZW5zZXMucGRmPi5cbiAqL1xuaW1wb3J0IHNwaW5hbENvcmUgZnJvbSBcInNwaW5hbC1jb3JlLWNvbm5lY3RvcmpzXCI7XG5cbmNvbnN0IGdsb2JhbFR5cGUgPSB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogd2luZG93O1xuXG5jbGFzcyBTcGluYWxNYXAgZXh0ZW5kcyBnbG9iYWxUeXBlLk1vZGVsIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yIGZvciB0aGUgU3BpbmFsTWFwIGNsYXNzLlxuICAgKi9cbiAgY29uc3RydWN0b3IoaW5pdCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICBpZiAoIWluaXQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBba2V5LCB2YWx1ZV0gb2YgaW5pdCkge1xuICAgICAgdGhpcy5zZXRFbGVtZW50KGtleSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB2YWx1ZSBjb3JyZXNwb25kaW5nIHRvIHRoZSBrZXkuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgS2V5IHRvIHRoZSB2YWx1ZVxuICAgKiBAcGFyYW0geyp9IHZhbHVlIE5ldyB2YWx1ZVxuICAgKi9cbiAgc2V0RWxlbWVudChrZXksIHZhbHVlKSB7XG4gICAgdGhpcy5yZW1fYXR0cihrZXkpO1xuICAgIGNvbnN0IGF0dHJpYnV0ZSA9IHt9O1xuICAgIGF0dHJpYnV0ZVtrZXldID0gdmFsdWU7XG5cbiAgICB0aGlzLmFkZF9hdHRyKGF0dHJpYnV0ZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdmFsdWUgYXNzb2NpYXRlZCB0byB0aGUga2V5LCBvciB1bmRlZmluZWQgaWYgdGhlcmUgaXMgbm9uZS5cbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleSBLZXkgdG8gdGhlIHZhbHVlXG4gICAqIEByZXR1cm5zIHsqfSBWYWx1ZSBjb3JyZXNwb25kaW5nIHRvIHRoZSBrZXlcbiAgICovXG4gIGdldEVsZW1lbnQoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXNba2V5XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgYm9vbGVhbiBhc3NlcnRpbmcgd2hldGhlciBhIHZhbHVlIGhhcyBiZWVuIGFzc29jaWF0ZWQgdG8gdGhlIGtleSBvciBub3QuXG4gICAqIEBwYXJhbSBrZXkgS2V5XG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm4gdHJ1ZSBpZiB0aGUga2V5IGV4aXN0c1xuICAgKi9cbiAgaGFzKGtleSkge1xuICAgIHJldHVybiB0aGlzLl9hdHRyaWJ1dGVfbmFtZXMuaW5jbHVkZXMoa2V5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgYm9vbGVhbiBhc3NlcnRpbmcgd2hldGhlciB0aGUgbWFwIGNvbnRhaW5zIGFueSBrZXkuXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm4gdHJ1ZSBpZiB0aGUgbWFwIGNvbnRhaW5zIGF0IGxlYXN0IG9uZSBrZXlcbiAgICovXG4gIGhhc0tleSgpIHtcbiAgICByZXR1cm4gdGhpcy5fYXR0cmlidXRlX25hbWVzLmxlbmd0aCA+IDA7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBhcnJheSB0aGF0IGNvbnRhaW5zIHRoZSBrZXlzIGZvciBlYWNoIGVsZW1lbnQgaW4gdGhlIG1hcCBpbiBpbnNlcnRpb24gb3JkZXIuXG4gICAqIEByZXR1cm5zIHtBcnJheTxTdHJpbmc+fSBBcnJheSBjb250YWluaW5nIGFsbCB0aGUga2V5cyBpbiB0aGUgbWFwXG4gICAqL1xuICBrZXlzKCkge1xuICAgIHJldHVybiB0aGlzLl9hdHRyaWJ1dGVfbmFtZXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBhcnJheSB0aGF0IGNvbnRhaW5zIHRoZSBrZXlzIGFuZCB0aGUgdmFsdWVzIGZvciBlYWNoIGVsZW1lbnQgaW4gdGhlIG1hcCBpbiBpbnNlcnRpb24gb3JkZXIuXG4gICAqIEByZXR1cm5zIHtBcnJheTxBcnJheTxTdHJpbmcsICo+Pn0gQXJyYXkgY29udGFpbmluZyBhbGwgdGhlIGtleXMgYW5kIHZhbHVlcyBpbiB0aGUgbWFwXG4gICAqL1xuICBlbnRyaWVzKCkge1xuICAgIGNvbnN0IGFyciA9IFtdO1xuXG4gICAgZm9yIChsZXQga2V5IG9mIHRoaXMua2V5cygpKSB7XG4gICAgICBhcnIucHVzaChba2V5LCB0aGlzLmdldEVsZW1lbnQoa2V5KV0pO1xuICAgIH1cblxuICAgIHJldHVybiBhcnI7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlcyBhbiBlbGVtZW50LlxuICAgKiBAcGFyYW0ga2V5IEtleSBvZiB0aGUgZWxlbWVudFxuICAgKi9cbiAgZGVsZXRlKGtleSkge1xuICAgIHRoaXMucmVtX2F0dHIoa2V5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGVzIGFsbCBlbGVtZW50cy5cbiAgICovXG4gIGNsZWFyKCkge1xuICAgIGxldCBrZXlzID0gdGhpcy5rZXlzKCk7XG5cbiAgICB3aGlsZSAoa2V5c1swXSkge1xuICAgICAgdGhpcy5kZWxldGUoa2V5c1swXSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgYSBmdW5jdGlvbiB0byBlYWNoIG9mIHRoZSB2YWx1ZXMgaW4gdGhlIG1hcC5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuIEZ1bmNpb24gdG8gYXBwbHlcbiAgICovXG4gIGZvckVhY2goZnVuKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9hdHRyaWJ1dGVfbmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBuYW1lID0gdGhpcy5fYXR0cmlidXRlX25hbWVzW2ldO1xuICAgICAgZnVuKHRoaXNbbmFtZV0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0byBpdGVyYXRlIG92ZXIgdGhlIG1hcCBvYmplY3QuXG4gICAqL1xuICAqW1N5bWJvbC5pdGVyYXRvcl0oKSB7XG4gICAgY29uc3Qga2V5cyA9IHRoaXMua2V5cygpO1xuXG4gICAgZm9yIChsZXQga2V5IG9mIGtleXMpIHtcbiAgICAgIHlpZWxkIHRoaXNba2V5XTtcbiAgICB9XG4gIH1cbn1cblxuc3BpbmFsQ29yZS5yZWdpc3Rlcl9tb2RlbHMoW1NwaW5hbE1hcF0pO1xuZXhwb3J0IGRlZmF1bHQgU3BpbmFsTWFwO1xuIl19