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
   * @param {Array<Array<String, *>>} init Array of arrays of key-value pairs
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxNYXAuanMiXSwibmFtZXMiOlsiZ2xvYmFsVHlwZSIsIndpbmRvdyIsImdsb2JhbCIsIlNwaW5hbE1hcCIsIk1vZGVsIiwiY29uc3RydWN0b3IiLCJpbml0Iiwia2V5IiwidmFsdWUiLCJzZXRFbGVtZW50IiwicmVtX2F0dHIiLCJhdHRyaWJ1dGUiLCJhZGRfYXR0ciIsImdldEVsZW1lbnQiLCJoYXMiLCJfYXR0cmlidXRlX25hbWVzIiwiaW5jbHVkZXMiLCJoYXNLZXkiLCJsZW5ndGgiLCJrZXlzIiwiZW50cmllcyIsImFyciIsInB1c2giLCJkZWxldGUiLCJjbGVhciIsImZvckVhY2giLCJmdW4iLCJpIiwibmFtZSIsIlN5bWJvbCIsIml0ZXJhdG9yIiwic3BpbmFsQ29yZSIsInJlZ2lzdGVyX21vZGVscyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQXVCQTs7Ozs7Ozs7Ozs7O0FBRUEsTUFBTUEsVUFBVSxHQUFHLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NDLE1BQWhDLEdBQXlDRCxNQUE1RDs7QUFFQSxNQUFNRSxTQUFOLFNBQXdCSCxVQUFVLENBQUNJLEtBQW5DLENBQXlDO0FBQ3ZDOzs7O0FBSUFDLEVBQUFBLFdBQVcsQ0FBQ0MsSUFBRCxFQUFPO0FBQ2hCOztBQUVBLFFBQUksQ0FBQ0EsSUFBTCxFQUFXO0FBQ1Q7QUFDRDs7QUFMZTtBQUFBO0FBQUE7O0FBQUE7QUFPaEIsMkJBQXlCQSxJQUF6Qiw4SEFBK0I7QUFBQTtBQUFBLFlBQXJCQyxHQUFxQjtBQUFBLFlBQWhCQyxLQUFnQjs7QUFDN0IsYUFBS0MsVUFBTCxDQUFnQkYsR0FBaEIsRUFBcUJDLEtBQXJCO0FBQ0Q7QUFUZTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBVWpCO0FBRUQ7Ozs7Ozs7QUFLQUMsRUFBQUEsVUFBVSxDQUFDRixHQUFELEVBQU1DLEtBQU4sRUFBYTtBQUNyQixTQUFLRSxRQUFMLENBQWNILEdBQWQ7QUFDQSxVQUFNSSxTQUFTLEdBQUcsRUFBbEI7QUFDQUEsSUFBQUEsU0FBUyxDQUFDSixHQUFELENBQVQsR0FBaUJDLEtBQWpCO0FBRUEsU0FBS0ksUUFBTCxDQUFjRCxTQUFkO0FBQ0Q7QUFFRDs7Ozs7OztBQUtBRSxFQUFBQSxVQUFVLENBQUNOLEdBQUQsRUFBTTtBQUNkLFdBQU8sS0FBS0EsR0FBTCxDQUFQO0FBQ0Q7QUFFRDs7Ozs7OztBQUtBTyxFQUFBQSxHQUFHLENBQUNQLEdBQUQsRUFBTTtBQUNQLFdBQU8sS0FBS1EsZ0JBQUwsQ0FBc0JDLFFBQXRCLENBQStCVCxHQUEvQixDQUFQO0FBQ0Q7QUFFRDs7Ozs7O0FBSUFVLEVBQUFBLE1BQU0sR0FBRztBQUNQLFdBQU8sS0FBS0YsZ0JBQUwsQ0FBc0JHLE1BQXRCLEdBQStCLENBQXRDO0FBQ0Q7QUFFRDs7Ozs7O0FBSUFDLEVBQUFBLElBQUksR0FBRztBQUNMLFdBQU8sS0FBS0osZ0JBQVo7QUFDRDtBQUVEOzs7Ozs7QUFJQUssRUFBQUEsT0FBTyxHQUFHO0FBQ1IsVUFBTUMsR0FBRyxHQUFHLEVBQVo7QUFEUTtBQUFBO0FBQUE7O0FBQUE7QUFHUiw0QkFBZ0IsS0FBS0YsSUFBTCxFQUFoQixtSUFBNkI7QUFBQSxZQUFwQlosR0FBb0I7QUFDM0JjLFFBQUFBLEdBQUcsQ0FBQ0MsSUFBSixDQUFTLENBQUNmLEdBQUQsRUFBTSxLQUFLTSxVQUFMLENBQWdCTixHQUFoQixDQUFOLENBQVQ7QUFDRDtBQUxPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBT1IsV0FBT2MsR0FBUDtBQUNEO0FBRUQ7Ozs7OztBQUlBRSxFQUFBQSxNQUFNLENBQUNoQixHQUFELEVBQU07QUFDVixTQUFLRyxRQUFMLENBQWNILEdBQWQ7QUFDRDtBQUVEOzs7OztBQUdBaUIsRUFBQUEsS0FBSyxHQUFHO0FBQ04sUUFBSUwsSUFBSSxHQUFHLEtBQUtBLElBQUwsRUFBWDs7QUFFQSxXQUFPQSxJQUFJLENBQUMsQ0FBRCxDQUFYLEVBQWdCO0FBQ2QsV0FBS0ksTUFBTCxDQUFZSixJQUFJLENBQUMsQ0FBRCxDQUFoQjtBQUNEO0FBQ0Y7QUFFRDs7Ozs7O0FBSUFNLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBRCxFQUFNO0FBQ1gsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUtaLGdCQUFMLENBQXNCRyxNQUExQyxFQUFrRFMsQ0FBQyxFQUFuRCxFQUF1RDtBQUNyRCxVQUFJQyxJQUFJLEdBQUcsS0FBS2IsZ0JBQUwsQ0FBc0JZLENBQXRCLENBQVg7QUFDQUQsTUFBQUEsR0FBRyxDQUFDLEtBQUtFLElBQUwsQ0FBRCxDQUFIO0FBQ0Q7QUFDRjtBQUVEOzs7OztBQUdBLElBQUVDLE1BQU0sQ0FBQ0MsUUFBVCxJQUFxQjtBQUNuQixVQUFNWCxJQUFJLEdBQUcsS0FBS0EsSUFBTCxFQUFiO0FBRG1CO0FBQUE7QUFBQTs7QUFBQTtBQUduQiw0QkFBZ0JBLElBQWhCLG1JQUFzQjtBQUFBLFlBQWJaLEdBQWE7QUFDcEIsY0FBTSxLQUFLQSxHQUFMLENBQU47QUFDRDtBQUxrQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTXBCOztBQXJIc0M7O0FBd0h6Q3dCLCtCQUFXQyxlQUFYLENBQTJCLENBQUM3QixTQUFELENBQTNCOztlQUNlQSxTIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4IFNwaW5hbENvbSAtIHd3dy5zcGluYWxjb20uY29tXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgU3BpbmFsQ29yZS5cbiAqXG4gKiBQbGVhc2UgcmVhZCBhbGwgb2YgdGhlIGZvbGxvd2luZyB0ZXJtcyBhbmQgY29uZGl0aW9uc1xuICogb2YgdGhlIEZyZWUgU29mdHdhcmUgbGljZW5zZSBBZ3JlZW1lbnQgKFwiQWdyZWVtZW50XCIpXG4gKiBjYXJlZnVsbHkuXG4gKlxuICogVGhpcyBBZ3JlZW1lbnQgaXMgYSBsZWdhbGx5IGJpbmRpbmcgY29udHJhY3QgYmV0d2VlblxuICogdGhlIExpY2Vuc2VlIChhcyBkZWZpbmVkIGJlbG93KSBhbmQgU3BpbmFsQ29tIHRoYXRcbiAqIHNldHMgZm9ydGggdGhlIHRlcm1zIGFuZCBjb25kaXRpb25zIHRoYXQgZ292ZXJuIHlvdXJcbiAqIHVzZSBvZiB0aGUgUHJvZ3JhbS4gQnkgaW5zdGFsbGluZyBhbmQvb3IgdXNpbmcgdGhlXG4gKiBQcm9ncmFtLCB5b3UgYWdyZWUgdG8gYWJpZGUgYnkgYWxsIHRoZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMgc3RhdGVkIG9yIHJlZmVyZW5jZWQgaGVyZWluLlxuICpcbiAqIElmIHlvdSBkbyBub3QgYWdyZWUgdG8gYWJpZGUgYnkgdGhlc2UgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zLCBkbyBub3QgZGVtb25zdHJhdGUgeW91ciBhY2NlcHRhbmNlIGFuZCBkb1xuICogbm90IGluc3RhbGwgb3IgdXNlIHRoZSBQcm9ncmFtLlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbG9uZ1xuICogd2l0aCB0aGlzIGZpbGUuIElmIG5vdCwgc2VlXG4gKiA8aHR0cDovL3Jlc291cmNlcy5zcGluYWxjb20uY29tL2xpY2Vuc2VzLnBkZj4uXG4gKi9cbmltcG9ydCBzcGluYWxDb3JlIGZyb20gXCJzcGluYWwtY29yZS1jb25uZWN0b3Jqc1wiO1xuXG5jb25zdCBnbG9iYWxUeXBlID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHdpbmRvdztcblxuY2xhc3MgU3BpbmFsTWFwIGV4dGVuZHMgZ2xvYmFsVHlwZS5Nb2RlbCB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIFNwaW5hbE1hcCBjbGFzcy5cbiAgICogQHBhcmFtIHtBcnJheTxBcnJheTxTdHJpbmcsICo+Pn0gaW5pdCBBcnJheSBvZiBhcnJheXMgb2Yga2V5LXZhbHVlIHBhaXJzXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihpbml0KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGlmICghaW5pdCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAobGV0IFtrZXksIHZhbHVlXSBvZiBpbml0KSB7XG4gICAgICB0aGlzLnNldEVsZW1lbnQoa2V5LCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHZhbHVlIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGtleS5cbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleSBLZXkgdG8gdGhlIHZhbHVlXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWUgTmV3IHZhbHVlXG4gICAqL1xuICBzZXRFbGVtZW50KGtleSwgdmFsdWUpIHtcbiAgICB0aGlzLnJlbV9hdHRyKGtleSk7XG4gICAgY29uc3QgYXR0cmlidXRlID0ge307XG4gICAgYXR0cmlidXRlW2tleV0gPSB2YWx1ZTtcblxuICAgIHRoaXMuYWRkX2F0dHIoYXR0cmlidXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSBhc3NvY2lhdGVkIHRvIHRoZSBrZXksIG9yIHVuZGVmaW5lZCBpZiB0aGVyZSBpcyBub25lLlxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IEtleSB0byB0aGUgdmFsdWVcbiAgICogQHJldHVybnMgeyp9IFZhbHVlIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGtleVxuICAgKi9cbiAgZ2V0RWxlbWVudChrZXkpIHtcbiAgICByZXR1cm4gdGhpc1trZXldO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBib29sZWFuIGFzc2VydGluZyB3aGV0aGVyIGEgdmFsdWUgaGFzIGJlZW4gYXNzb2NpYXRlZCB0byB0aGUga2V5IG9yIG5vdC5cbiAgICogQHBhcmFtIGtleSBLZXlcbiAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybiB0cnVlIGlmIHRoZSBrZXkgZXhpc3RzXG4gICAqL1xuICBoYXMoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMuX2F0dHJpYnV0ZV9uYW1lcy5pbmNsdWRlcyhrZXkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBib29sZWFuIGFzc2VydGluZyB3aGV0aGVyIHRoZSBtYXAgY29udGFpbnMgYW55IGtleS5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybiB0cnVlIGlmIHRoZSBtYXAgY29udGFpbnMgYXQgbGVhc3Qgb25lIGtleVxuICAgKi9cbiAgaGFzS2V5KCkge1xuICAgIHJldHVybiB0aGlzLl9hdHRyaWJ1dGVfbmFtZXMubGVuZ3RoID4gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIGFycmF5IHRoYXQgY29udGFpbnMgdGhlIGtleXMgZm9yIGVhY2ggZWxlbWVudCBpbiB0aGUgbWFwIGluIGluc2VydGlvbiBvcmRlci5cbiAgICogQHJldHVybnMge0FycmF5PFN0cmluZz59IEFycmF5IGNvbnRhaW5pbmcgYWxsIHRoZSBrZXlzIGluIHRoZSBtYXBcbiAgICovXG4gIGtleXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2F0dHJpYnV0ZV9uYW1lcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIGFycmF5IHRoYXQgY29udGFpbnMgdGhlIGtleXMgYW5kIHRoZSB2YWx1ZXMgZm9yIGVhY2ggZWxlbWVudCBpbiB0aGUgbWFwIGluIGluc2VydGlvbiBvcmRlci5cbiAgICogQHJldHVybnMge0FycmF5PEFycmF5PFN0cmluZywgKj4+fSBBcnJheSBjb250YWluaW5nIGFsbCB0aGUga2V5cyBhbmQgdmFsdWVzIGluIHRoZSBtYXBcbiAgICovXG4gIGVudHJpZXMoKSB7XG4gICAgY29uc3QgYXJyID0gW107XG5cbiAgICBmb3IgKGxldCBrZXkgb2YgdGhpcy5rZXlzKCkpIHtcbiAgICAgIGFyci5wdXNoKFtrZXksIHRoaXMuZ2V0RWxlbWVudChrZXkpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycjtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGVzIGFuIGVsZW1lbnQuXG4gICAqIEBwYXJhbSBrZXkgS2V5IG9mIHRoZSBlbGVtZW50XG4gICAqL1xuICBkZWxldGUoa2V5KSB7XG4gICAgdGhpcy5yZW1fYXR0cihrZXkpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgYWxsIGVsZW1lbnRzLlxuICAgKi9cbiAgY2xlYXIoKSB7XG4gICAgbGV0IGtleXMgPSB0aGlzLmtleXMoKTtcblxuICAgIHdoaWxlIChrZXlzWzBdKSB7XG4gICAgICB0aGlzLmRlbGV0ZShrZXlzWzBdKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQXBwbGllcyBhIGZ1bmN0aW9uIHRvIGVhY2ggb2YgdGhlIHZhbHVlcyBpbiB0aGUgbWFwLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW4gRnVuY2lvbiB0byBhcHBseVxuICAgKi9cbiAgZm9yRWFjaChmdW4pIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2F0dHJpYnV0ZV9uYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IG5hbWUgPSB0aGlzLl9hdHRyaWJ1dGVfbmFtZXNbaV07XG4gICAgICBmdW4odGhpc1tuYW1lXSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRvIGl0ZXJhdGUgb3ZlciB0aGUgbWFwIG9iamVjdC5cbiAgICovXG4gICpbU3ltYm9sLml0ZXJhdG9yXSgpIHtcbiAgICBjb25zdCBrZXlzID0gdGhpcy5rZXlzKCk7XG5cbiAgICBmb3IgKGxldCBrZXkgb2Yga2V5cykge1xuICAgICAgeWllbGQgdGhpc1trZXldO1xuICAgIH1cbiAgfVxufVxuXG5zcGluYWxDb3JlLnJlZ2lzdGVyX21vZGVscyhbU3BpbmFsTWFwXSk7XG5leHBvcnQgZGVmYXVsdCBTcGluYWxNYXA7XG4iXX0=