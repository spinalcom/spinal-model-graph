"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _spinalCoreConnectorjs = _interopRequireDefault(require("spinal-core-connectorjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
const globalType = typeof window === "undefined" ? global : window;

class SpinalSet extends globalType.Model {
  /**
   * Constructor for the SpinalSet class.
   * @param {Array<*>} init Array of values
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

    for (let i = 0; i < this._attribute_names.length; i++) {
      let value = this._attribute_names[i];
      fun(value);
    }
  }
  /**
   * Function to iterate over the set object.
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

_spinalCoreConnectorjs.default.register_models([SpinalSet]);

var _default = SpinalSet;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxTZXQuanMiXSwibmFtZXMiOlsiZ2xvYmFsVHlwZSIsIndpbmRvdyIsImdsb2JhbCIsIlNwaW5hbFNldCIsIk1vZGVsIiwiY29uc3RydWN0b3IiLCJpbml0IiwidW5kZWZpbmVkIiwidmFsdWUiLCJhZGQiLCJUeXBlRXJyb3IiLCJtb2RfYXR0ciIsImhhcyIsImhhc093blByb3BlcnR5IiwidmFsdWVzIiwiX2F0dHJpYnV0ZV9uYW1lcyIsImRlbGV0ZSIsIkVycm9yIiwicmVtX2F0dHIiLCJjbGVhciIsInNpemUiLCJsZW5ndGgiLCJmb3JFYWNoIiwiZnVuIiwiaSIsIlN5bWJvbCIsIml0ZXJhdG9yIiwic3BpbmFsQ29yZSIsInJlZ2lzdGVyX21vZGVscyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQXdCQTs7OztBQXhCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsTUFBTUEsVUFBVSxHQUFHLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NDLE1BQWhDLEdBQXlDRCxNQUE1RDs7QUFFQSxNQUFNRSxTQUFOLFNBQXdCSCxVQUFVLENBQUNJLEtBQW5DLENBQXlDO0FBQ3ZDOzs7Ozs7O0FBT0FDLEVBQUFBLFdBQVcsQ0FBQ0MsSUFBRCxFQUFPO0FBQ2hCOztBQUVBLFFBQUlBLElBQUksS0FBS0MsU0FBYixFQUF3QjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUN0Qiw2QkFBa0JELElBQWxCLDhIQUF3QjtBQUFBLGNBQWZFLEtBQWU7QUFDdEIsZUFBS0MsR0FBTCxDQUFTRCxLQUFUO0FBQ0Q7QUFIcUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUl2QjtBQUNGO0FBRUQ7Ozs7Ozs7QUFLQUMsRUFBQUEsR0FBRyxDQUFDRCxLQUFELEVBQVE7QUFDVCxRQUFJLE9BQU9BLEtBQVAsS0FBaUIsUUFBckIsRUFBK0I7QUFDN0IsWUFBTUUsU0FBUyxDQUFDLDRCQUFELENBQWY7QUFDRDs7QUFFRCxTQUFLQyxRQUFMLENBQWNILEtBQWQsRUFBcUIsQ0FBckI7QUFDRDtBQUVEOzs7Ozs7OztBQU1BSSxFQUFBQSxHQUFHLENBQUNKLEtBQUQsRUFBUTtBQUNULFFBQUksT0FBT0EsS0FBUCxLQUFpQixRQUFyQixFQUErQjtBQUM3QixZQUFNRSxTQUFTLENBQUMsNEJBQUQsQ0FBZjtBQUNEOztBQUVELFdBQU8sS0FBS0csY0FBTCxDQUFvQkwsS0FBcEIsQ0FBUDtBQUNEO0FBRUQ7Ozs7OztBQUlBTSxFQUFBQSxNQUFNLEdBQUc7QUFDUCxXQUFPLEtBQUtDLGdCQUFaO0FBQ0Q7QUFFRDs7Ozs7Ozs7QUFNQUMsRUFBQUEsTUFBTSxDQUFDUixLQUFELEVBQVE7QUFDWixRQUFJLENBQUMsS0FBS0ksR0FBTCxDQUFTSixLQUFULENBQUwsRUFBc0I7QUFDcEIsWUFBTVMsS0FBSyxDQUFDLHlCQUFELENBQVg7QUFDRDs7QUFFRCxTQUFLQyxRQUFMLENBQWNWLEtBQWQ7QUFDRDtBQUVEOzs7OztBQUdBVyxFQUFBQSxLQUFLLEdBQUc7QUFDTixRQUFJTCxNQUFNLEdBQUcsS0FBS0EsTUFBTCxFQUFiOztBQUVBLFdBQU9BLE1BQU0sQ0FBQyxDQUFELENBQWIsRUFBa0I7QUFDaEIsV0FBS0UsTUFBTCxDQUFZRixNQUFNLENBQUMsQ0FBRCxDQUFsQjtBQUNEO0FBQ0Y7QUFFRDs7Ozs7O0FBSUFNLEVBQUFBLElBQUksR0FBRztBQUNMLFdBQU8sS0FBS0wsZ0JBQUwsQ0FBc0JNLE1BQTdCO0FBQ0Q7QUFFRDs7Ozs7OztBQUtBQyxFQUFBQSxPQUFPLENBQUNDLEdBQUQsRUFBTTtBQUNYLFFBQUksT0FBT0EsR0FBUCxLQUFlLFVBQW5CLEVBQStCO0FBQzdCLFlBQU1iLFNBQVMsQ0FBQyxpQ0FBRCxDQUFmO0FBQ0Q7O0FBRUQsU0FBSyxJQUFJYyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUtULGdCQUFMLENBQXNCTSxNQUExQyxFQUFrREcsQ0FBQyxFQUFuRCxFQUF1RDtBQUNyRCxVQUFJaEIsS0FBSyxHQUFHLEtBQUtPLGdCQUFMLENBQXNCUyxDQUF0QixDQUFaO0FBQ0FELE1BQUFBLEdBQUcsQ0FBQ2YsS0FBRCxDQUFIO0FBQ0Q7QUFDRjtBQUVEOzs7OztBQUdBLElBQUVpQixNQUFNLENBQUNDLFFBQVQsSUFBcUI7QUFDbkIsUUFBSVosTUFBTSxHQUFHLEtBQUtDLGdCQUFsQjtBQURtQjtBQUFBO0FBQUE7O0FBQUE7QUFHbkIsNEJBQWtCRCxNQUFsQixtSUFBMEI7QUFBQSxZQUFqQk4sS0FBaUI7QUFDeEIsY0FBTUEsS0FBTjtBQUNEO0FBTGtCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNcEI7O0FBL0dzQzs7QUFrSHpDbUIsK0JBQVdDLGVBQVgsQ0FBMkIsQ0FBQ3pCLFNBQUQsQ0FBM0I7O2VBQ2VBLFMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTggU3BpbmFsQ29tIC0gd3d3LnNwaW5hbGNvbS5jb21cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBTcGluYWxDb3JlLlxuICpcbiAqIFBsZWFzZSByZWFkIGFsbCBvZiB0aGUgZm9sbG93aW5nIHRlcm1zIGFuZCBjb25kaXRpb25zXG4gKiBvZiB0aGUgRnJlZSBTb2Z0d2FyZSBsaWNlbnNlIEFncmVlbWVudCAoXCJBZ3JlZW1lbnRcIilcbiAqIGNhcmVmdWxseS5cbiAqXG4gKiBUaGlzIEFncmVlbWVudCBpcyBhIGxlZ2FsbHkgYmluZGluZyBjb250cmFjdCBiZXR3ZWVuXG4gKiB0aGUgTGljZW5zZWUgKGFzIGRlZmluZWQgYmVsb3cpIGFuZCBTcGluYWxDb20gdGhhdFxuICogc2V0cyBmb3J0aCB0aGUgdGVybXMgYW5kIGNvbmRpdGlvbnMgdGhhdCBnb3Zlcm4geW91clxuICogdXNlIG9mIHRoZSBQcm9ncmFtLiBCeSBpbnN0YWxsaW5nIGFuZC9vciB1c2luZyB0aGVcbiAqIFByb2dyYW0sIHlvdSBhZ3JlZSB0byBhYmlkZSBieSBhbGwgdGhlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucyBzdGF0ZWQgb3IgcmVmZXJlbmNlZCBoZXJlaW4uXG4gKlxuICogSWYgeW91IGRvIG5vdCBhZ3JlZSB0byBhYmlkZSBieSB0aGVzZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMsIGRvIG5vdCBkZW1vbnN0cmF0ZSB5b3VyIGFjY2VwdGFuY2UgYW5kIGRvXG4gKiBub3QgaW5zdGFsbCBvciB1c2UgdGhlIFByb2dyYW0uXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFsb25nXG4gKiB3aXRoIHRoaXMgZmlsZS4gSWYgbm90LCBzZWVcbiAqIDxodHRwOi8vcmVzb3VyY2VzLnNwaW5hbGNvbS5jb20vbGljZW5zZXMucGRmPi5cbiAqL1xuXG5pbXBvcnQgc3BpbmFsQ29yZSBmcm9tIFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNcIjtcblxuY29uc3QgZ2xvYmFsVHlwZSA9IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB3aW5kb3c7XG5cbmNsYXNzIFNwaW5hbFNldCBleHRlbmRzIGdsb2JhbFR5cGUuTW9kZWwge1xuICAvKipcbiAgICogQ29uc3RydWN0b3IgZm9yIHRoZSBTcGluYWxTZXQgY2xhc3MuXG4gICAqIEBwYXJhbSB7QXJyYXk8Kj59IGluaXQgQXJyYXkgb2YgdmFsdWVzXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgaW5pdCBpcyBub3QgaXRlcmFibGVcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBpbml0W1N5bWJvbC5pdGVyYXRvcl0gZG9lc24ndCByZXR1cm4gaXRlcmF0b3JzXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIHZhbHVlcyBvZiB0aGUgaXRlcmF0b3JzIGFyZSBub3Qgc3RyaW5nc1xuICAgKi9cbiAgY29uc3RydWN0b3IoaW5pdCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICBpZiAoaW5pdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBmb3IgKGxldCB2YWx1ZSBvZiBpbml0KSB7XG4gICAgICAgIHRoaXMuYWRkKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQXBwZW5kcyBhIG5ldyBlbGVtZW50IHdpdGggdGhlIGdpdmVuIHZhbHVlIHRvIHRoZSBzZXQuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZSBWYWx1ZSB0byBzdG9yZSBpbiB0aGUgc2V0XG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIHZhbHVlIGlzIG5vdCBhIHN0cmluZ1xuICAgKi9cbiAgYWRkKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwiVGhlIHZhbHVlIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgfVxuXG4gICAgdGhpcy5tb2RfYXR0cih2YWx1ZSwgMCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGJvb2xlYW4gYXNzZXJ0aW5nIHdoZXRoZXIgdGhlIHZhbHVlIGlzIGluIHRoZSBzZXQgb3Igbm90LlxuICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUgVmFsdWVcbiAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBleGlzdHNcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgdmFsdWUgaXMgbm90IGEgc3RyaW5nXG4gICAqL1xuICBoYXModmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJUaGUgdmFsdWUgbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYXNPd25Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBhcnJheSB0aGF0IGNvbnRhaW5zIGFsbCB0aGUgdmFsdWVzIG9mIHRoZSBzZXQuXG4gICAqIEByZXR1cm5zIHtBcnJheTxTdHJpbmc+fSBBcnJheSBjb250YWluaW5nIGFsbCB0aGUgdmFsdWVzIGluIHRoZSBzZXRcbiAgICovXG4gIHZhbHVlcygpIHtcbiAgICByZXR1cm4gdGhpcy5fYXR0cmlidXRlX25hbWVzO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgYW4gZWxlbWVudC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIFZhbHVlIHRvIGRlbGV0ZVxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSB2YWx1ZSBpcyBub3QgYSBzdHJpbmdcbiAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSB2YWx1ZSBpcyBub3QgaW4gdGhlIG1hcFxuICAgKi9cbiAgZGVsZXRlKHZhbHVlKSB7XG4gICAgaWYgKCF0aGlzLmhhcyh2YWx1ZSkpIHtcbiAgICAgIHRocm93IEVycm9yKFwiVGhlIHZhbHVlIGRvZXNuJ3QgZXhpc3RcIik7XG4gICAgfVxuXG4gICAgdGhpcy5yZW1fYXR0cih2YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlcyBhbGwgdmFsdWVzIGluIHRoZSBzZXQuXG4gICAqL1xuICBjbGVhcigpIHtcbiAgICBsZXQgdmFsdWVzID0gdGhpcy52YWx1ZXMoKTtcblxuICAgIHdoaWxlICh2YWx1ZXNbMF0pIHtcbiAgICAgIHRoaXMuZGVsZXRlKHZhbHVlc1swXSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIG51bWJlciBvZiB2YWx1ZXMgaW4gdGhlIHNldC5cbiAgICogQHJldHVybnMge051bWJlcn0gTnVtYmVyIG9mIHZhbHVlcyBpbiB0aGUgc2V0XG4gICAqL1xuICBzaXplKCkge1xuICAgIHJldHVybiB0aGlzLl9hdHRyaWJ1dGVfbmFtZXMubGVuZ3RoO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgYSBmdW5jdGlvbiB0byBlYWNoIG9mIHRoZSB2YWx1ZXMgaW4gdGhlIHNldC5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuIEZ1bmNpb24gdG8gYXBwbHlcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBmdW4gaXMgbm90IGEgZnVuY3Rpb25cbiAgICovXG4gIGZvckVhY2goZnVuKSB7XG4gICAgaWYgKHR5cGVvZiBmdW4gIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwiVGhlIGNhbGxiYWNrIG11c3QgYmUgYSBmdW5jdGlvblwiKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2F0dHJpYnV0ZV9uYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHZhbHVlID0gdGhpcy5fYXR0cmlidXRlX25hbWVzW2ldO1xuICAgICAgZnVuKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRnVuY3Rpb24gdG8gaXRlcmF0ZSBvdmVyIHRoZSBzZXQgb2JqZWN0LlxuICAgKi9cbiAgKltTeW1ib2wuaXRlcmF0b3JdKCkge1xuICAgIGxldCB2YWx1ZXMgPSB0aGlzLl9hdHRyaWJ1dGVfbmFtZXM7XG5cbiAgICBmb3IgKGxldCB2YWx1ZSBvZiB2YWx1ZXMpIHtcbiAgICAgIHlpZWxkIHZhbHVlO1xuICAgIH1cbiAgfVxufVxuXG5zcGluYWxDb3JlLnJlZ2lzdGVyX21vZGVscyhbU3BpbmFsU2V0XSk7XG5leHBvcnQgZGVmYXVsdCBTcGluYWxTZXQ7XG4iXX0=