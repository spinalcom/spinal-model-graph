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
  constructor() {
    super();
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
   * @return {Number} Number of values in the set
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


  [Symbol.iterator]() {
    let index = -1;
    let values = this._attribute_names;
    let set = this;
    return {
      next() {
        return {
          value: values[++index],
          done: index >= values.length
        };
      }

    };
  }

}

_spinalCoreConnectorjs.default.register_models([SpinalSet]);

var _default = SpinalSet;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxTZXQuanMiXSwibmFtZXMiOlsiZ2xvYmFsVHlwZSIsIndpbmRvdyIsImdsb2JhbCIsIlNwaW5hbFNldCIsIk1vZGVsIiwiY29uc3RydWN0b3IiLCJhZGQiLCJ2YWx1ZSIsIm1vZF9hdHRyIiwiaGFzIiwiaGFzT3duUHJvcGVydHkiLCJ2YWx1ZXMiLCJfYXR0cmlidXRlX25hbWVzIiwiZGVsZXRlIiwicmVtX2F0dHIiLCJjbGVhciIsInNpemUiLCJsZW5ndGgiLCJmb3JFYWNoIiwiZnVuIiwiaSIsIlN5bWJvbCIsIml0ZXJhdG9yIiwiaW5kZXgiLCJzZXQiLCJuZXh0IiwiZG9uZSIsInNwaW5hbENvcmUiLCJyZWdpc3Rlcl9tb2RlbHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUF1QkE7Ozs7QUF2QkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLE1BQU1BLFVBQVUsR0FBRyxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDQyxNQUFoQyxHQUF5Q0QsTUFBNUQ7O0FBRUEsTUFBTUUsU0FBTixTQUF3QkgsVUFBVSxDQUFDSSxLQUFuQyxDQUF5QztBQUNyQ0MsRUFBQUEsV0FBVyxHQUFHO0FBQ1Y7QUFDSDtBQUVEOzs7Ozs7QUFJQUMsRUFBQUEsR0FBRyxDQUFDQyxLQUFELEVBQVE7QUFDUCxTQUFLQyxRQUFMLENBQWNELEtBQWQsRUFBcUIsQ0FBckI7QUFDSDtBQUVEOzs7Ozs7O0FBS0FFLEVBQUFBLEdBQUcsQ0FBQ0YsS0FBRCxFQUFRO0FBQ1AsV0FBTyxLQUFLRyxjQUFMLENBQW9CSCxLQUFwQixDQUFQO0FBQ0g7QUFFRDs7Ozs7O0FBSUFJLEVBQUFBLE1BQU0sR0FBRztBQUNMLFdBQU8sS0FBS0MsZ0JBQVo7QUFDSDtBQUVEOzs7Ozs7QUFJQUMsRUFBQUEsTUFBTSxDQUFDTixLQUFELEVBQVE7QUFDVixTQUFLTyxRQUFMLENBQWNQLEtBQWQ7QUFDSDtBQUVEOzs7OztBQUdBUSxFQUFBQSxLQUFLLEdBQUc7QUFDSixRQUFJSixNQUFNLEdBQUcsS0FBS0EsTUFBTCxFQUFiOztBQUVBLFdBQU9BLE1BQU0sQ0FBQyxDQUFELENBQWIsRUFBa0I7QUFDZCxXQUFLRSxNQUFMLENBQVlGLE1BQU0sQ0FBQyxDQUFELENBQWxCO0FBQ0g7QUFDSjtBQUVEOzs7Ozs7QUFJQUssRUFBQUEsSUFBSSxHQUFHO0FBQ0gsV0FBTyxLQUFLSixnQkFBTCxDQUFzQkssTUFBN0I7QUFDSDtBQUVEOzs7Ozs7QUFJQUMsRUFBQUEsT0FBTyxDQUFDQyxHQUFELEVBQU07QUFDVCxTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS1IsZ0JBQUwsQ0FBc0JLLE1BQTFDLEVBQWtERyxDQUFDLEVBQW5ELEVBQXVEO0FBQ25ELFVBQUliLEtBQUssR0FBRyxLQUFLSyxnQkFBTCxDQUFzQlEsQ0FBdEIsQ0FBWjtBQUNBRCxNQUFBQSxHQUFHLENBQUNaLEtBQUQsQ0FBSDtBQUNIO0FBQ0o7QUFFRDs7Ozs7QUFHQSxHQUFDYyxNQUFNLENBQUNDLFFBQVIsSUFBb0I7QUFDaEIsUUFBSUMsS0FBSyxHQUFHLENBQUMsQ0FBYjtBQUNBLFFBQUlaLE1BQU0sR0FBRyxLQUFLQyxnQkFBbEI7QUFDQSxRQUFJWSxHQUFHLEdBQUcsSUFBVjtBQUVBLFdBQU87QUFDSEMsTUFBQUEsSUFBSSxHQUFHO0FBQ0gsZUFBTztBQUNIbEIsVUFBQUEsS0FBSyxFQUFFSSxNQUFNLENBQUMsRUFBRVksS0FBSCxDQURWO0FBRUhHLFVBQUFBLElBQUksRUFBRUgsS0FBSyxJQUFJWixNQUFNLENBQUNNO0FBRm5CLFNBQVA7QUFJSDs7QUFORSxLQUFQO0FBUUg7O0FBcEZvQzs7QUF1RnpDVSwrQkFBV0MsZUFBWCxDQUEyQixDQUFDekIsU0FBRCxDQUEzQjs7ZUFDZUEsUyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOCBTcGluYWxDb20gLSB3d3cuc3BpbmFsY29tLmNvbVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFNwaW5hbENvcmUuXG4gKlxuICogUGxlYXNlIHJlYWQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgdGVybXMgYW5kIGNvbmRpdGlvbnNcbiAqIG9mIHRoZSBGcmVlIFNvZnR3YXJlIGxpY2Vuc2UgQWdyZWVtZW50IChcIkFncmVlbWVudFwiKVxuICogY2FyZWZ1bGx5LlxuICpcbiAqIFRoaXMgQWdyZWVtZW50IGlzIGEgbGVnYWxseSBiaW5kaW5nIGNvbnRyYWN0IGJldHdlZW5cbiAqIHRoZSBMaWNlbnNlZSAoYXMgZGVmaW5lZCBiZWxvdykgYW5kIFNwaW5hbENvbSB0aGF0XG4gKiBzZXRzIGZvcnRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyB0aGF0IGdvdmVybiB5b3VyXG4gKiB1c2Ugb2YgdGhlIFByb2dyYW0uIEJ5IGluc3RhbGxpbmcgYW5kL29yIHVzaW5nIHRoZVxuICogUHJvZ3JhbSwgeW91IGFncmVlIHRvIGFiaWRlIGJ5IGFsbCB0aGUgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zIHN0YXRlZCBvciByZWZlcmVuY2VkIGhlcmVpbi5cbiAqXG4gKiBJZiB5b3UgZG8gbm90IGFncmVlIHRvIGFiaWRlIGJ5IHRoZXNlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucywgZG8gbm90IGRlbW9uc3RyYXRlIHlvdXIgYWNjZXB0YW5jZSBhbmQgZG9cbiAqIG5vdCBpbnN0YWxsIG9yIHVzZSB0aGUgUHJvZ3JhbS5cbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYWxvbmdcbiAqIHdpdGggdGhpcyBmaWxlLiBJZiBub3QsIHNlZVxuICogPGh0dHA6Ly9yZXNvdXJjZXMuc3BpbmFsY29tLmNvbS9saWNlbnNlcy5wZGY+LlxuICovXG5pbXBvcnQgc3BpbmFsQ29yZSBmcm9tIFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNcIjtcblxuY29uc3QgZ2xvYmFsVHlwZSA9IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB3aW5kb3c7XG5cbmNsYXNzIFNwaW5hbFNldCBleHRlbmRzIGdsb2JhbFR5cGUuTW9kZWwge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFwcGVuZHMgYSBuZXcgZWxlbWVudCB3aXRoIHRoZSBnaXZlbiB2YWx1ZSB0byB0aGUgc2V0LlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZSBWYWx1ZSB0byBzdG9yZSBpbiB0aGUgc2V0XG4gICAgICovXG4gICAgYWRkKHZhbHVlKSB7XG4gICAgICAgIHRoaXMubW9kX2F0dHIodmFsdWUsIDApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBib29sZWFuIGFzc2VydGluZyB3aGV0aGVyIHRoZSB2YWx1ZSBpcyBpbiB0aGUgc2V0IG9yIG5vdC5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUgVmFsdWVcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIGV4aXN0c1xuICAgICAqL1xuICAgIGhhcyh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNPd25Qcm9wZXJ0eSh2YWx1ZSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IHRoYXQgY29udGFpbnMgYWxsIHRoZSB2YWx1ZXMgb2YgdGhlIHNldC5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXk8U3RyaW5nPn0gQXJyYXkgY29udGFpbmluZyBhbGwgdGhlIHZhbHVlcyBpbiB0aGUgc2V0XG4gICAgICovXG4gICAgdmFsdWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYXR0cmlidXRlX25hbWVzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGV0ZXMgYW4gZWxlbWVudC5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUgVmFsdWUgdG8gZGVsZXRlXG4gICAgICovXG4gICAgZGVsZXRlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMucmVtX2F0dHIodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGV0ZXMgYWxsIHZhbHVlcyBpbiB0aGUgc2V0LlxuICAgICAqL1xuICAgIGNsZWFyKCkge1xuICAgICAgICBsZXQgdmFsdWVzID0gdGhpcy52YWx1ZXMoKTtcblxuICAgICAgICB3aGlsZSAodmFsdWVzWzBdKSB7XG4gICAgICAgICAgICB0aGlzLmRlbGV0ZSh2YWx1ZXNbMF0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIHZhbHVlcyBpbiB0aGUgc2V0LlxuICAgICAqIEByZXR1cm4ge051bWJlcn0gTnVtYmVyIG9mIHZhbHVlcyBpbiB0aGUgc2V0XG4gICAgICovXG4gICAgc2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2F0dHJpYnV0ZV9uYW1lcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXBwbGllcyBhIGZ1bmN0aW9uIHRvIGVhY2ggb2YgdGhlIHZhbHVlcyBpbiB0aGUgc2V0LlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1biBGdW5jaW9uIHRvIGFwcGx5XG4gICAgICovXG4gICAgZm9yRWFjaChmdW4pIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9hdHRyaWJ1dGVfbmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuX2F0dHJpYnV0ZV9uYW1lc1tpXTtcbiAgICAgICAgICAgIGZ1bih2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBpdGVyYXRlIG92ZXIgdGhlIHNldCBvYmplY3QuXG4gICAgICovXG4gICAgW1N5bWJvbC5pdGVyYXRvcl0oKSB7XG4gICAgICAgIGxldCBpbmRleCA9IC0xO1xuICAgICAgICBsZXQgdmFsdWVzID0gdGhpcy5fYXR0cmlidXRlX25hbWVzO1xuICAgICAgICBsZXQgc2V0ID0gdGhpcztcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmV4dCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVzWysraW5kZXhdLFxuICAgICAgICAgICAgICAgICAgICBkb25lOiBpbmRleCA+PSB2YWx1ZXMubGVuZ3RoXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59XG5cbnNwaW5hbENvcmUucmVnaXN0ZXJfbW9kZWxzKFtTcGluYWxTZXRdKTtcbmV4cG9ydCBkZWZhdWx0IFNwaW5hbFNldDtcbiJdfQ==