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
   * Applies a function to each of the values in the set.
   * @param {function} fun Funcion to apply
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxTZXQuanMiXSwibmFtZXMiOlsiU3BpbmFsU2V0IiwiTW9kZWwiLCJjb25zdHJ1Y3RvciIsImluaXQiLCJ1bmRlZmluZWQiLCJ2YWx1ZSIsImFkZCIsIlR5cGVFcnJvciIsIm1vZF9hdHRyIiwiaGFzIiwiaGFzT3duUHJvcGVydHkiLCJ2YWx1ZXMiLCJfYXR0cmlidXRlX25hbWVzIiwiZGVsZXRlIiwiRXJyb3IiLCJyZW1fYXR0ciIsImNsZWFyIiwic2l6ZSIsImxlbmd0aCIsImZvckVhY2giLCJmdW4iLCJpIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJzcGluYWxDb3JlIiwicmVnaXN0ZXJfbW9kZWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBd0JBOztBQXhCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNkJBOzs7O0FBSUEsTUFBTUEsU0FBTixTQUF3QkMsaUNBQXhCLENBQThCO0FBQzVCOzs7Ozs7O0FBT0FDLEVBQUFBLFdBQVcsQ0FBQ0MsSUFBRCxFQUFPO0FBQ2hCOztBQUVBLFFBQUlBLElBQUksS0FBS0MsU0FBYixFQUF3QjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUN0Qiw2QkFBa0JELElBQWxCLDhIQUF3QjtBQUFBLGNBQWZFLEtBQWU7QUFDdEIsZUFBS0MsR0FBTCxDQUFTRCxLQUFUO0FBQ0Q7QUFIcUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUl2QjtBQUNGO0FBRUQ7Ozs7Ozs7QUFLQUMsRUFBQUEsR0FBRyxDQUFDRCxLQUFELEVBQVE7QUFDVCxRQUFJLE9BQU9BLEtBQVAsS0FBaUIsUUFBckIsRUFBK0I7QUFDN0IsWUFBTUUsU0FBUyxDQUFDLDRCQUFELENBQWY7QUFDRDs7QUFFRCxTQUFLQyxRQUFMLENBQWNILEtBQWQsRUFBcUIsQ0FBckI7QUFDRDtBQUVEOzs7Ozs7OztBQU1BSSxFQUFBQSxHQUFHLENBQUNKLEtBQUQsRUFBUTtBQUNULFFBQUksT0FBT0EsS0FBUCxLQUFpQixRQUFyQixFQUErQjtBQUM3QixZQUFNRSxTQUFTLENBQUMsNEJBQUQsQ0FBZjtBQUNEOztBQUVELFdBQU8sS0FBS0csY0FBTCxDQUFvQkwsS0FBcEIsQ0FBUDtBQUNEO0FBRUQ7Ozs7OztBQUlBTSxFQUFBQSxNQUFNLEdBQUc7QUFDUCxXQUFPLEtBQUtDLGdCQUFaO0FBQ0Q7QUFFRDs7Ozs7Ozs7QUFNQUMsRUFBQUEsTUFBTSxDQUFDUixLQUFELEVBQVE7QUFDWixRQUFJLENBQUMsS0FBS0ksR0FBTCxDQUFTSixLQUFULENBQUwsRUFBc0I7QUFDcEIsWUFBTVMsS0FBSyxDQUFDLHlCQUFELENBQVg7QUFDRDs7QUFFRCxTQUFLQyxRQUFMLENBQWNWLEtBQWQ7QUFDRDtBQUVEOzs7OztBQUdBVyxFQUFBQSxLQUFLLEdBQUc7QUFDTixRQUFJTCxNQUFNLEdBQUcsS0FBS0EsTUFBTCxFQUFiOztBQUVBLFdBQU9BLE1BQU0sQ0FBQyxDQUFELENBQWIsRUFBa0I7QUFDaEIsV0FBS0UsTUFBTCxDQUFZRixNQUFNLENBQUMsQ0FBRCxDQUFsQjtBQUNEO0FBQ0Y7QUFFRDs7Ozs7O0FBSUFNLEVBQUFBLElBQUksR0FBRztBQUNMLFdBQU8sS0FBS0wsZ0JBQUwsQ0FBc0JNLE1BQTdCO0FBQ0Q7QUFFRDs7Ozs7OztBQUtBQyxFQUFBQSxPQUFPLENBQUNDLEdBQUQsRUFBTTtBQUNYLFFBQUksT0FBT0EsR0FBUCxLQUFlLFVBQW5CLEVBQStCO0FBQzdCLFlBQU1iLFNBQVMsQ0FBQyxpQ0FBRCxDQUFmO0FBQ0Q7O0FBRUQsVUFBTUksTUFBTSxHQUFHLEtBQUtBLE1BQUwsRUFBZjs7QUFFQSxTQUFLLElBQUlVLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS0osSUFBTCxFQUFwQixFQUFpQ0ksQ0FBQyxFQUFsQyxFQUFzQztBQUNwQ0QsTUFBQUEsR0FBRyxDQUFDVCxNQUFNLENBQUNVLENBQUQsQ0FBUCxFQUFZQSxDQUFaLENBQUg7QUFDRDtBQUNGO0FBRUQ7Ozs7Ozs7QUFLQSxJQUFFQyxNQUFNLENBQUNDLFFBQVQsSUFBcUI7QUFDbkIsUUFBSVosTUFBTSxHQUFHLEtBQUtDLGdCQUFsQjtBQURtQjtBQUFBO0FBQUE7O0FBQUE7QUFHbkIsNEJBQWtCRCxNQUFsQixtSUFBMEI7QUFBQSxZQUFqQk4sS0FBaUI7QUFDeEIsY0FBTUEsS0FBTjtBQUNEO0FBTGtCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNcEI7O0FBbEgyQjs7QUFxSDlCbUIsdUNBQVdDLGVBQVgsQ0FBMkIsQ0FBQ3pCLFNBQUQsQ0FBM0I7O2VBQ2VBLFMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTggU3BpbmFsQ29tIC0gd3d3LnNwaW5hbGNvbS5jb21cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBTcGluYWxDb3JlLlxuICpcbiAqIFBsZWFzZSByZWFkIGFsbCBvZiB0aGUgZm9sbG93aW5nIHRlcm1zIGFuZCBjb25kaXRpb25zXG4gKiBvZiB0aGUgRnJlZSBTb2Z0d2FyZSBsaWNlbnNlIEFncmVlbWVudCAoXCJBZ3JlZW1lbnRcIilcbiAqIGNhcmVmdWxseS5cbiAqXG4gKiBUaGlzIEFncmVlbWVudCBpcyBhIGxlZ2FsbHkgYmluZGluZyBjb250cmFjdCBiZXR3ZWVuXG4gKiB0aGUgTGljZW5zZWUgKGFzIGRlZmluZWQgYmVsb3cpIGFuZCBTcGluYWxDb20gdGhhdFxuICogc2V0cyBmb3J0aCB0aGUgdGVybXMgYW5kIGNvbmRpdGlvbnMgdGhhdCBnb3Zlcm4geW91clxuICogdXNlIG9mIHRoZSBQcm9ncmFtLiBCeSBpbnN0YWxsaW5nIGFuZC9vciB1c2luZyB0aGVcbiAqIFByb2dyYW0sIHlvdSBhZ3JlZSB0byBhYmlkZSBieSBhbGwgdGhlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucyBzdGF0ZWQgb3IgcmVmZXJlbmNlZCBoZXJlaW4uXG4gKlxuICogSWYgeW91IGRvIG5vdCBhZ3JlZSB0byBhYmlkZSBieSB0aGVzZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMsIGRvIG5vdCBkZW1vbnN0cmF0ZSB5b3VyIGFjY2VwdGFuY2UgYW5kIGRvXG4gKiBub3QgaW5zdGFsbCBvciB1c2UgdGhlIFByb2dyYW0uXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFsb25nXG4gKiB3aXRoIHRoaXMgZmlsZS4gSWYgbm90LCBzZWVcbiAqIDxodHRwOi8vcmVzb3VyY2VzLnNwaW5hbGNvbS5jb20vbGljZW5zZXMucGRmPi5cbiAqL1xuXG5pbXBvcnQge1xuICBzcGluYWxDb3JlLFxuICBNb2RlbFxufSBmcm9tIFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNfdHlwZVwiO1xuXG4vKipcbiAqIFNpbXBsZSBpbXBsZW1lbnRhdGlvbiBvZiBhIHNldCB1c2luZyBhIE1vZGVsLlxuICogQGV4dGVuZHMgTW9kZWxcbiAqL1xuY2xhc3MgU3BpbmFsU2V0IGV4dGVuZHMgTW9kZWwge1xuICAvKipcbiAgICogQ29uc3RydWN0b3IgZm9yIHRoZSBTcGluYWxTZXQgY2xhc3MuXG4gICAqIEBwYXJhbSB7QXJyYXk8Kj59IFtpbml0XSBBcnJheSBvZiB2YWx1ZXNcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBpbml0IGlzIG5vdCBpdGVyYWJsZVxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGluaXRbU3ltYm9sLml0ZXJhdG9yXSBkb2Vzbid0IHJldHVybiBpdGVyYXRvcnNcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgdmFsdWVzIG9mIHRoZSBpdGVyYXRvcnMgYXJlIG5vdCBzdHJpbmdzXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihpbml0KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGlmIChpbml0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGZvciAobGV0IHZhbHVlIG9mIGluaXQpIHtcbiAgICAgICAgdGhpcy5hZGQodmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBlbmRzIGEgbmV3IGVsZW1lbnQgd2l0aCB0aGUgZ2l2ZW4gdmFsdWUgdG8gdGhlIHNldC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIFZhbHVlIHRvIHN0b3JlIGluIHRoZSBzZXRcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgdmFsdWUgaXMgbm90IGEgc3RyaW5nXG4gICAqL1xuICBhZGQodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJUaGUgdmFsdWUgbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICB9XG5cbiAgICB0aGlzLm1vZF9hdHRyKHZhbHVlLCAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgYm9vbGVhbiBhc3NlcnRpbmcgd2hldGhlciB0aGUgdmFsdWUgaXMgaW4gdGhlIHNldCBvciBub3QuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZSBWYWx1ZVxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIGV4aXN0c1xuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSB2YWx1ZSBpcyBub3QgYSBzdHJpbmdcbiAgICovXG4gIGhhcyh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcIlRoZSB2YWx1ZSBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmhhc093blByb3BlcnR5KHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIGFycmF5IHRoYXQgY29udGFpbnMgYWxsIHRoZSB2YWx1ZXMgb2YgdGhlIHNldC5cbiAgICogQHJldHVybnMge0FycmF5PFN0cmluZz59IEFycmF5IGNvbnRhaW5pbmcgYWxsIHRoZSB2YWx1ZXMgaW4gdGhlIHNldFxuICAgKi9cbiAgdmFsdWVzKCkge1xuICAgIHJldHVybiB0aGlzLl9hdHRyaWJ1dGVfbmFtZXM7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlcyBhbiBlbGVtZW50LlxuICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUgVmFsdWUgdG8gZGVsZXRlXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIHZhbHVlIGlzIG5vdCBhIHN0cmluZ1xuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHZhbHVlIGlzIG5vdCBpbiB0aGUgbWFwXG4gICAqL1xuICBkZWxldGUodmFsdWUpIHtcbiAgICBpZiAoIXRoaXMuaGFzKHZhbHVlKSkge1xuICAgICAgdGhyb3cgRXJyb3IoXCJUaGUgdmFsdWUgZG9lc24ndCBleGlzdFwiKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbV9hdHRyKHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGVzIGFsbCB2YWx1ZXMgaW4gdGhlIHNldC5cbiAgICovXG4gIGNsZWFyKCkge1xuICAgIGxldCB2YWx1ZXMgPSB0aGlzLnZhbHVlcygpO1xuXG4gICAgd2hpbGUgKHZhbHVlc1swXSkge1xuICAgICAgdGhpcy5kZWxldGUodmFsdWVzWzBdKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIHZhbHVlcyBpbiB0aGUgc2V0LlxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBOdW1iZXIgb2YgdmFsdWVzIGluIHRoZSBzZXRcbiAgICovXG4gIHNpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2F0dHJpYnV0ZV9uYW1lcy5sZW5ndGg7XG4gIH1cblxuICAvKipcbiAgICogQXBwbGllcyBhIGZ1bmN0aW9uIHRvIGVhY2ggb2YgdGhlIHZhbHVlcyBpbiB0aGUgc2V0LlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW4gRnVuY2lvbiB0byBhcHBseVxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGZ1biBpcyBub3QgYSBmdW5jdGlvblxuICAgKi9cbiAgZm9yRWFjaChmdW4pIHtcbiAgICBpZiAodHlwZW9mIGZ1biAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJUaGUgY2FsbGJhY2sgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHZhbHVlcyA9IHRoaXMudmFsdWVzKCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2l6ZSgpOyBpKyspIHtcbiAgICAgIGZ1bih2YWx1ZXNbaV0sIGkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0byBpdGVyYXRlIG92ZXIgdGhlIHNldCBvYmplY3QuXG4gICAqIEBnZW5lcmF0b3JcbiAgICogQHlpZWxkcyB7c3RyaW5nfSBBbGwgdmFsdWVzIGluIHRoZSBzZXQgb25lIGJ5IG9uZVxuICAgKi9cbiAgKltTeW1ib2wuaXRlcmF0b3JdKCkge1xuICAgIGxldCB2YWx1ZXMgPSB0aGlzLl9hdHRyaWJ1dGVfbmFtZXM7XG5cbiAgICBmb3IgKGxldCB2YWx1ZSBvZiB2YWx1ZXMpIHtcbiAgICAgIHlpZWxkIHZhbHVlO1xuICAgIH1cbiAgfVxufVxuXG5zcGluYWxDb3JlLnJlZ2lzdGVyX21vZGVscyhbU3BpbmFsU2V0XSk7XG5leHBvcnQgZGVmYXVsdCBTcGluYWxTZXQ7XG4iXX0=