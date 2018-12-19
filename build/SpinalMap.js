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
   * @generator
   * @yields {Array<string, *>} Arrays of key and values
   */


  *[Symbol.iterator]() {
    const keys = this.keys();
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = keys[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        let key = _step3.value;
        yield [key, this[key]];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxNYXAuanMiXSwibmFtZXMiOlsiU3BpbmFsTWFwIiwiTW9kZWwiLCJjb25zdHJ1Y3RvciIsImluaXQiLCJ1bmRlZmluZWQiLCJrZXkiLCJ2YWx1ZSIsInNldEVsZW1lbnQiLCJUeXBlRXJyb3IiLCJyZW1fYXR0ciIsImF0dHJpYnV0ZSIsImFkZF9hdHRyIiwiZ2V0RWxlbWVudCIsImhhcyIsIl9hdHRyaWJ1dGVfbmFtZXMiLCJpbmNsdWRlcyIsImhhc0tleSIsImxlbmd0aCIsImtleXMiLCJlbnRyaWVzIiwiYXJyIiwicHVzaCIsImRlbGV0ZSIsIkVycm9yIiwiY2xlYXIiLCJmb3JFYWNoIiwiZnVuIiwiaSIsIm5hbWUiLCJTeW1ib2wiLCJpdGVyYXRvciIsInNwaW5hbENvcmUiLCJyZWdpc3Rlcl9tb2RlbHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUF1QkE7Ozs7Ozs7Ozs7QUFLQTs7OztBQUlBLE1BQU1BLFNBQU4sU0FBd0JDLGlDQUF4QixDQUE4QjtBQUM1Qjs7Ozs7Ozs7QUFRQUMsRUFBQUEsV0FBVyxDQUFDQyxJQUFELEVBQU87QUFDaEI7O0FBRUEsUUFBSUEsSUFBSSxLQUFLQyxTQUFiLEVBQXdCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQ3RCLDZCQUF5QkQsSUFBekIsOEhBQStCO0FBQUE7QUFBQSxjQUFyQkUsR0FBcUI7QUFBQSxjQUFoQkMsS0FBZ0I7O0FBQzdCLGVBQUtDLFVBQUwsQ0FBZ0JGLEdBQWhCLEVBQXFCQyxLQUFyQjtBQUNEO0FBSHFCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJdkI7QUFDRjtBQUVEOzs7Ozs7OztBQU1BQyxFQUFBQSxVQUFVLENBQUNGLEdBQUQsRUFBTUMsS0FBTixFQUFhO0FBQ3JCLFFBQUksT0FBT0QsR0FBUCxLQUFlLFFBQW5CLEVBQTZCO0FBQzNCLFlBQU1HLFNBQVMsQ0FBQywwQkFBRCxDQUFmO0FBQ0Q7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QUFYLENBQTJCLENBQUNoQyxTQUFELENBQTNCOztlQUNlQSxTIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4IFNwaW5hbENvbSAtIHd3dy5zcGluYWxjb20uY29tXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgU3BpbmFsQ29yZS5cbiAqXG4gKiBQbGVhc2UgcmVhZCBhbGwgb2YgdGhlIGZvbGxvd2luZyB0ZXJtcyBhbmQgY29uZGl0aW9uc1xuICogb2YgdGhlIEZyZWUgU29mdHdhcmUgbGljZW5zZSBBZ3JlZW1lbnQgKFwiQWdyZWVtZW50XCIpXG4gKiBjYXJlZnVsbHkuXG4gKlxuICogVGhpcyBBZ3JlZW1lbnQgaXMgYSBsZWdhbGx5IGJpbmRpbmcgY29udHJhY3QgYmV0d2VlblxuICogdGhlIExpY2Vuc2VlIChhcyBkZWZpbmVkIGJlbG93KSBhbmQgU3BpbmFsQ29tIHRoYXRcbiAqIHNldHMgZm9ydGggdGhlIHRlcm1zIGFuZCBjb25kaXRpb25zIHRoYXQgZ292ZXJuIHlvdXJcbiAqIHVzZSBvZiB0aGUgUHJvZ3JhbS4gQnkgaW5zdGFsbGluZyBhbmQvb3IgdXNpbmcgdGhlXG4gKiBQcm9ncmFtLCB5b3UgYWdyZWUgdG8gYWJpZGUgYnkgYWxsIHRoZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMgc3RhdGVkIG9yIHJlZmVyZW5jZWQgaGVyZWluLlxuICpcbiAqIElmIHlvdSBkbyBub3QgYWdyZWUgdG8gYWJpZGUgYnkgdGhlc2UgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zLCBkbyBub3QgZGVtb25zdHJhdGUgeW91ciBhY2NlcHRhbmNlIGFuZCBkb1xuICogbm90IGluc3RhbGwgb3IgdXNlIHRoZSBQcm9ncmFtLlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbG9uZ1xuICogd2l0aCB0aGlzIGZpbGUuIElmIG5vdCwgc2VlXG4gKiA8aHR0cDovL3Jlc291cmNlcy5zcGluYWxjb20uY29tL2xpY2Vuc2VzLnBkZj4uXG4gKi9cbmltcG9ydCB7XG4gIHNwaW5hbENvcmUsXG4gIE1vZGVsXG59IGZyb20gXCJzcGluYWwtY29yZS1jb25uZWN0b3Jqc190eXBlXCI7XG5cbi8qKlxuICogU2ltcGxlIGltcGxlbWVudGF0aW9uIG9mIGEgbWFwIHVzaW5nIGEgTW9kZWwuXG4gKiBAZXh0ZW5kcyBNb2RlbFxuICovXG5jbGFzcyBTcGluYWxNYXAgZXh0ZW5kcyBNb2RlbCB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIFNwaW5hbE1hcCBjbGFzcy5cbiAgICogQHBhcmFtIHtBcnJheTxBcnJheTxTdHJpbmcsICo+Pn0gaW5pdCBBcnJheSBvZiBhcnJheXMgb2Yga2V5LXZhbHVlIHBhaXJzXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgaW5pdCBpcyBub3QgaXRlcmFibGVcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBpbml0W1N5bWJvbC5pdGVyYXRvcl0gZG9lc24ndCByZXR1cm4gaXRlcmF0b3JzXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIHZhbHVlcyBvZiB0aGUgaXRlcmF0b3JzIGFyZSBub3QgYXJyYXlzIG9mIGtleSB2YWx1ZXNcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUga2V5cyBvZiB0aGUgdmFsdWVzIG9mIHRoZSBpdGVyYXRvcnMgYXJlIG5vdCBzdHJpbmdzXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihpbml0KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGlmIChpbml0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGZvciAobGV0IFtrZXksIHZhbHVlXSBvZiBpbml0KSB7XG4gICAgICAgIHRoaXMuc2V0RWxlbWVudChrZXksIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdmFsdWUgY29ycmVzcG9uZGluZyB0byB0aGUga2V5LlxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IEtleSB0byB0aGUgdmFsdWVcbiAgICogQHBhcmFtIHsqfSB2YWx1ZSBOZXcgdmFsdWUsIGNhbiBiZSBvbWl0dGVkXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIGtleSBpcyBub3QgYSBzdHJpbmdcbiAgICovXG4gIHNldEVsZW1lbnQoa2V5LCB2YWx1ZSkge1xuICAgIGlmICh0eXBlb2Yga2V5ICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJUaGUga2V5IG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgfVxuXG4gICAgdGhpcy5yZW1fYXR0cihrZXkpO1xuICAgIGNvbnN0IGF0dHJpYnV0ZSA9IHt9O1xuICAgIGF0dHJpYnV0ZVtrZXldID0gdmFsdWU7XG4gICAgdGhpcy5hZGRfYXR0cihhdHRyaWJ1dGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZhbHVlIGFzc29jaWF0ZWQgdG8gdGhlIGtleSwgb3IgdW5kZWZpbmVkIGlmIHRoZXJlIGlzIG5vbmUuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgS2V5IHRvIHRoZSB2YWx1ZVxuICAgKiBAcmV0dXJucyB7Kn0gVmFsdWUgY29ycmVzcG9uZGluZyB0byB0aGUga2V5XG4gICAqL1xuICBnZXRFbGVtZW50KGtleSkge1xuICAgIHJldHVybiB0aGlzW2tleV07XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGJvb2xlYW4gYXNzZXJ0aW5nIHdoZXRoZXIgYSB2YWx1ZSBoYXMgYmVlbiBhc3NvY2lhdGVkIHRvIHRoZSBrZXkgb3Igbm90LlxuICAgKiBAcGFyYW0ga2V5IEtleVxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJuIHRydWUgaWYgdGhlIGtleSBleGlzdHNcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUga2V5IGlzIG5vdCBhIHN0cmluZ1xuICAgKi9cbiAgaGFzKGtleSkge1xuICAgIGlmICh0eXBlb2Yga2V5ICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJUaGUga2V5IG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2F0dHJpYnV0ZV9uYW1lcy5pbmNsdWRlcyhrZXkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBib29sZWFuIGFzc2VydGluZyB3aGV0aGVyIHRoZSBtYXAgY29udGFpbnMgYW55IGtleS5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybiB0cnVlIGlmIHRoZSBtYXAgY29udGFpbnMgYXQgbGVhc3Qgb25lIGtleVxuICAgKi9cbiAgaGFzS2V5KCkge1xuICAgIHJldHVybiB0aGlzLl9hdHRyaWJ1dGVfbmFtZXMubGVuZ3RoID4gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIGFycmF5IHRoYXQgY29udGFpbnMgdGhlIGtleXMgZm9yIGVhY2ggZWxlbWVudCBpbiB0aGUgbWFwIGluIGluc2VydGlvbiBvcmRlci5cbiAgICogQHJldHVybnMge0FycmF5PFN0cmluZz59IEFycmF5IGNvbnRhaW5pbmcgYWxsIHRoZSBrZXlzIGluIHRoZSBtYXBcbiAgICovXG4gIGtleXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2F0dHJpYnV0ZV9uYW1lcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIGFycmF5IHRoYXQgY29udGFpbnMgdGhlIGtleXMgYW5kIHRoZSB2YWx1ZXMgZm9yIGVhY2ggZWxlbWVudCBpbiB0aGUgbWFwIGluIGluc2VydGlvbiBvcmRlci5cbiAgICogQHJldHVybnMge0FycmF5PEFycmF5PFN0cmluZywgKj4+fSBBcnJheSBjb250YWluaW5nIGFsbCB0aGUga2V5cyBhbmQgdmFsdWVzIGluIHRoZSBtYXBcbiAgICovXG4gIGVudHJpZXMoKSB7XG4gICAgY29uc3QgYXJyID0gW107XG5cbiAgICBmb3IgKGxldCBrZXkgb2YgdGhpcy5rZXlzKCkpIHtcbiAgICAgIGFyci5wdXNoKFtrZXksIHRoaXMuZ2V0RWxlbWVudChrZXkpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycjtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGVzIGFuIGVsZW1lbnQuXG4gICAqIEBwYXJhbSBrZXkgS2V5IG9mIHRoZSBlbGVtZW50XG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIGtleSBpcyBub3QgYSBzdHJpbmdcbiAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBrZXkgaXMgbm90IGluIHRoZSBtYXBcbiAgICovXG4gIGRlbGV0ZShrZXkpIHtcbiAgICBpZiAoIXRoaXMuaGFzKGtleSkpIHtcbiAgICAgIHRocm93IEVycm9yKFwiVGhlIGtleSBkb2Vzbid0IGV4aXN0XCIpO1xuICAgIH1cblxuICAgIHRoaXMucmVtX2F0dHIoa2V5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGVzIGFsbCBlbGVtZW50cy5cbiAgICovXG4gIGNsZWFyKCkge1xuICAgIGxldCBrZXlzID0gdGhpcy5rZXlzKCk7XG5cbiAgICB3aGlsZSAoa2V5c1swXSkge1xuICAgICAgdGhpcy5kZWxldGUoa2V5c1swXSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgYSBmdW5jdGlvbiB0byBlYWNoIG9mIHRoZSB2YWx1ZXMgaW4gdGhlIG1hcC5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuIEZ1bmNpb24gdG8gYXBwbHlcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBmdW4gaXMgbm90IGEgZnVuY3Rpb25cbiAgICovXG4gIGZvckVhY2goZnVuKSB7XG4gICAgaWYgKHR5cGVvZiBmdW4gIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwiVGhlIGNhbGxiYWNrIG11c3QgYmUgYSBmdW5jdGlvblwiKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2F0dHJpYnV0ZV9uYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IG5hbWUgPSB0aGlzLl9hdHRyaWJ1dGVfbmFtZXNbaV07XG4gICAgICBmdW4odGhpc1tuYW1lXSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRvIGl0ZXJhdGUgb3ZlciB0aGUgbWFwIG9iamVjdC5cbiAgICogQGdlbmVyYXRvclxuICAgKiBAeWllbGRzIHtBcnJheTxzdHJpbmcsICo+fSBBcnJheXMgb2Yga2V5IGFuZCB2YWx1ZXNcbiAgICovXG4gICpbU3ltYm9sLml0ZXJhdG9yXSgpIHtcbiAgICBjb25zdCBrZXlzID0gdGhpcy5rZXlzKCk7XG5cbiAgICBmb3IgKGxldCBrZXkgb2Yga2V5cykge1xuICAgICAgeWllbGQgW2tleSwgdGhpc1trZXldXTtcbiAgICB9XG4gIH1cbn1cblxuc3BpbmFsQ29yZS5yZWdpc3Rlcl9tb2RlbHMoW1NwaW5hbE1hcF0pO1xuZXhwb3J0IGRlZmF1bHQgU3BpbmFsTWFwO1xuIl19