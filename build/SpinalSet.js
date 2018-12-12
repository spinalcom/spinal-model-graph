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
  /**
   * Appends a new element with the given value to the set.
   * @param {String} value Value to store in the set
   */


  add(value) {
    this.mod_attr(value, 0);
  }
  /**
   * Returns a boolean asserting whether the value is in the set or not.
   * @param {String} value Value
   * @returns {Boolean} Return true if the value exists
   */


  has(value) {
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
   */


  delete(value) {
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
   */


  forEach(fun) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxTZXQuanMiXSwibmFtZXMiOlsiZ2xvYmFsVHlwZSIsIndpbmRvdyIsImdsb2JhbCIsIlNwaW5hbFNldCIsIk1vZGVsIiwiY29uc3RydWN0b3IiLCJpbml0IiwidmFsdWUiLCJhZGQiLCJtb2RfYXR0ciIsImhhcyIsImhhc093blByb3BlcnR5IiwidmFsdWVzIiwiX2F0dHJpYnV0ZV9uYW1lcyIsImRlbGV0ZSIsInJlbV9hdHRyIiwiY2xlYXIiLCJzaXplIiwibGVuZ3RoIiwiZm9yRWFjaCIsImZ1biIsImkiLCJTeW1ib2wiLCJpdGVyYXRvciIsInNwaW5hbENvcmUiLCJyZWdpc3Rlcl9tb2RlbHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUF1QkE7Ozs7QUF2QkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLE1BQU1BLFVBQVUsR0FBRyxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDQyxNQUFoQyxHQUF5Q0QsTUFBNUQ7O0FBRUEsTUFBTUUsU0FBTixTQUF3QkgsVUFBVSxDQUFDSSxLQUFuQyxDQUF5QztBQUN2Qzs7OztBQUlBQyxFQUFBQSxXQUFXLENBQUNDLElBQUQsRUFBTztBQUNoQjs7QUFFQSxRQUFJLENBQUNBLElBQUwsRUFBVztBQUNUO0FBQ0Q7O0FBTGU7QUFBQTtBQUFBOztBQUFBO0FBT2hCLDJCQUFrQkEsSUFBbEIsOEhBQXdCO0FBQUEsWUFBZkMsS0FBZTtBQUN0QixhQUFLQyxHQUFMLENBQVNELEtBQVQ7QUFDRDtBQVRlO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFVakI7QUFFRDs7Ozs7O0FBSUFDLEVBQUFBLEdBQUcsQ0FBQ0QsS0FBRCxFQUFRO0FBQ1QsU0FBS0UsUUFBTCxDQUFjRixLQUFkLEVBQXFCLENBQXJCO0FBQ0Q7QUFFRDs7Ozs7OztBQUtBRyxFQUFBQSxHQUFHLENBQUNILEtBQUQsRUFBUTtBQUNULFdBQU8sS0FBS0ksY0FBTCxDQUFvQkosS0FBcEIsQ0FBUDtBQUNEO0FBRUQ7Ozs7OztBQUlBSyxFQUFBQSxNQUFNLEdBQUc7QUFDUCxXQUFPLEtBQUtDLGdCQUFaO0FBQ0Q7QUFFRDs7Ozs7O0FBSUFDLEVBQUFBLE1BQU0sQ0FBQ1AsS0FBRCxFQUFRO0FBQ1osU0FBS1EsUUFBTCxDQUFjUixLQUFkO0FBQ0Q7QUFFRDs7Ozs7QUFHQVMsRUFBQUEsS0FBSyxHQUFHO0FBQ04sUUFBSUosTUFBTSxHQUFHLEtBQUtBLE1BQUwsRUFBYjs7QUFFQSxXQUFPQSxNQUFNLENBQUMsQ0FBRCxDQUFiLEVBQWtCO0FBQ2hCLFdBQUtFLE1BQUwsQ0FBWUYsTUFBTSxDQUFDLENBQUQsQ0FBbEI7QUFDRDtBQUNGO0FBRUQ7Ozs7OztBQUlBSyxFQUFBQSxJQUFJLEdBQUc7QUFDTCxXQUFPLEtBQUtKLGdCQUFMLENBQXNCSyxNQUE3QjtBQUNEO0FBRUQ7Ozs7OztBQUlBQyxFQUFBQSxPQUFPLENBQUNDLEdBQUQsRUFBTTtBQUNYLFNBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLUixnQkFBTCxDQUFzQkssTUFBMUMsRUFBa0RHLENBQUMsRUFBbkQsRUFBdUQ7QUFDckQsVUFBSWQsS0FBSyxHQUFHLEtBQUtNLGdCQUFMLENBQXNCUSxDQUF0QixDQUFaO0FBQ0FELE1BQUFBLEdBQUcsQ0FBQ2IsS0FBRCxDQUFIO0FBQ0Q7QUFDRjtBQUVEOzs7OztBQUdBLElBQUVlLE1BQU0sQ0FBQ0MsUUFBVCxJQUFxQjtBQUNuQixRQUFJWCxNQUFNLEdBQUcsS0FBS0MsZ0JBQWxCO0FBRG1CO0FBQUE7QUFBQTs7QUFBQTtBQUduQiw0QkFBa0JELE1BQWxCLG1JQUEwQjtBQUFBLFlBQWpCTCxLQUFpQjtBQUN4QixjQUFNQSxLQUFOO0FBQ0Q7QUFMa0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU1wQjs7QUF6RnNDOztBQTRGekNpQiwrQkFBV0MsZUFBWCxDQUEyQixDQUFDdEIsU0FBRCxDQUEzQjs7ZUFDZUEsUyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOCBTcGluYWxDb20gLSB3d3cuc3BpbmFsY29tLmNvbVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFNwaW5hbENvcmUuXG4gKlxuICogUGxlYXNlIHJlYWQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgdGVybXMgYW5kIGNvbmRpdGlvbnNcbiAqIG9mIHRoZSBGcmVlIFNvZnR3YXJlIGxpY2Vuc2UgQWdyZWVtZW50IChcIkFncmVlbWVudFwiKVxuICogY2FyZWZ1bGx5LlxuICpcbiAqIFRoaXMgQWdyZWVtZW50IGlzIGEgbGVnYWxseSBiaW5kaW5nIGNvbnRyYWN0IGJldHdlZW5cbiAqIHRoZSBMaWNlbnNlZSAoYXMgZGVmaW5lZCBiZWxvdykgYW5kIFNwaW5hbENvbSB0aGF0XG4gKiBzZXRzIGZvcnRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyB0aGF0IGdvdmVybiB5b3VyXG4gKiB1c2Ugb2YgdGhlIFByb2dyYW0uIEJ5IGluc3RhbGxpbmcgYW5kL29yIHVzaW5nIHRoZVxuICogUHJvZ3JhbSwgeW91IGFncmVlIHRvIGFiaWRlIGJ5IGFsbCB0aGUgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zIHN0YXRlZCBvciByZWZlcmVuY2VkIGhlcmVpbi5cbiAqXG4gKiBJZiB5b3UgZG8gbm90IGFncmVlIHRvIGFiaWRlIGJ5IHRoZXNlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucywgZG8gbm90IGRlbW9uc3RyYXRlIHlvdXIgYWNjZXB0YW5jZSBhbmQgZG9cbiAqIG5vdCBpbnN0YWxsIG9yIHVzZSB0aGUgUHJvZ3JhbS5cbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYWxvbmdcbiAqIHdpdGggdGhpcyBmaWxlLiBJZiBub3QsIHNlZVxuICogPGh0dHA6Ly9yZXNvdXJjZXMuc3BpbmFsY29tLmNvbS9saWNlbnNlcy5wZGY+LlxuICovXG5pbXBvcnQgc3BpbmFsQ29yZSBmcm9tIFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNcIjtcblxuY29uc3QgZ2xvYmFsVHlwZSA9IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB3aW5kb3c7XG5cbmNsYXNzIFNwaW5hbFNldCBleHRlbmRzIGdsb2JhbFR5cGUuTW9kZWwge1xuICAvKipcbiAgICogQ29uc3RydWN0b3IgZm9yIHRoZSBTcGluYWxTZXQgY2xhc3MuXG4gICAqIEBwYXJhbSB7QXJyYXk8Kj59IGluaXQgQXJyYXkgb2YgdmFsdWVzXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihpbml0KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGlmICghaW5pdCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAobGV0IHZhbHVlIG9mIGluaXQpIHtcbiAgICAgIHRoaXMuYWRkKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQXBwZW5kcyBhIG5ldyBlbGVtZW50IHdpdGggdGhlIGdpdmVuIHZhbHVlIHRvIHRoZSBzZXQuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZSBWYWx1ZSB0byBzdG9yZSBpbiB0aGUgc2V0XG4gICAqL1xuICBhZGQodmFsdWUpIHtcbiAgICB0aGlzLm1vZF9hdHRyKHZhbHVlLCAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgYm9vbGVhbiBhc3NlcnRpbmcgd2hldGhlciB0aGUgdmFsdWUgaXMgaW4gdGhlIHNldCBvciBub3QuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZSBWYWx1ZVxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIGV4aXN0c1xuICAgKi9cbiAgaGFzKHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzT3duUHJvcGVydHkodmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gYXJyYXkgdGhhdCBjb250YWlucyBhbGwgdGhlIHZhbHVlcyBvZiB0aGUgc2V0LlxuICAgKiBAcmV0dXJucyB7QXJyYXk8U3RyaW5nPn0gQXJyYXkgY29udGFpbmluZyBhbGwgdGhlIHZhbHVlcyBpbiB0aGUgc2V0XG4gICAqL1xuICB2YWx1ZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2F0dHJpYnV0ZV9uYW1lcztcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGVzIGFuIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZSBWYWx1ZSB0byBkZWxldGVcbiAgICovXG4gIGRlbGV0ZSh2YWx1ZSkge1xuICAgIHRoaXMucmVtX2F0dHIodmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgYWxsIHZhbHVlcyBpbiB0aGUgc2V0LlxuICAgKi9cbiAgY2xlYXIoKSB7XG4gICAgbGV0IHZhbHVlcyA9IHRoaXMudmFsdWVzKCk7XG5cbiAgICB3aGlsZSAodmFsdWVzWzBdKSB7XG4gICAgICB0aGlzLmRlbGV0ZSh2YWx1ZXNbMF0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgdmFsdWVzIGluIHRoZSBzZXQuXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IE51bWJlciBvZiB2YWx1ZXMgaW4gdGhlIHNldFxuICAgKi9cbiAgc2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fYXR0cmlidXRlX25hbWVzLmxlbmd0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBsaWVzIGEgZnVuY3Rpb24gdG8gZWFjaCBvZiB0aGUgdmFsdWVzIGluIHRoZSBzZXQuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1biBGdW5jaW9uIHRvIGFwcGx5XG4gICAqL1xuICBmb3JFYWNoKGZ1bikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fYXR0cmlidXRlX25hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgdmFsdWUgPSB0aGlzLl9hdHRyaWJ1dGVfbmFtZXNbaV07XG4gICAgICBmdW4odmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0byBpdGVyYXRlIG92ZXIgdGhlIHNldCBvYmplY3QuXG4gICAqL1xuICAqW1N5bWJvbC5pdGVyYXRvcl0oKSB7XG4gICAgbGV0IHZhbHVlcyA9IHRoaXMuX2F0dHJpYnV0ZV9uYW1lcztcblxuICAgIGZvciAobGV0IHZhbHVlIG9mIHZhbHVlcykge1xuICAgICAgeWllbGQgdmFsdWU7XG4gICAgfVxuICB9XG59XG5cbnNwaW5hbENvcmUucmVnaXN0ZXJfbW9kZWxzKFtTcGluYWxTZXRdKTtcbmV4cG9ydCBkZWZhdWx0IFNwaW5hbFNldDtcbiJdfQ==