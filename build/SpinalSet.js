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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxTZXQuanMiXSwibmFtZXMiOlsiZ2xvYmFsVHlwZSIsIndpbmRvdyIsImdsb2JhbCIsIlNwaW5hbFNldCIsIk1vZGVsIiwiY29uc3RydWN0b3IiLCJpbml0IiwidmFsdWUiLCJhZGQiLCJtb2RfYXR0ciIsImhhcyIsImhhc093blByb3BlcnR5IiwidmFsdWVzIiwiX2F0dHJpYnV0ZV9uYW1lcyIsImRlbGV0ZSIsInJlbV9hdHRyIiwiY2xlYXIiLCJzaXplIiwibGVuZ3RoIiwiZm9yRWFjaCIsImZ1biIsImkiLCJTeW1ib2wiLCJpdGVyYXRvciIsInNwaW5hbENvcmUiLCJyZWdpc3Rlcl9tb2RlbHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUF1QkE7Ozs7QUF2QkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLE1BQU1BLFVBQVUsR0FBRyxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDQyxNQUFoQyxHQUF5Q0QsTUFBNUQ7O0FBRUEsTUFBTUUsU0FBTixTQUF3QkgsVUFBVSxDQUFDSSxLQUFuQyxDQUF5QztBQUN2Qzs7O0FBR0FDLEVBQUFBLFdBQVcsQ0FBQ0MsSUFBRCxFQUFPO0FBQ2hCOztBQUVBLFFBQUksQ0FBQ0EsSUFBTCxFQUFXO0FBQ1Q7QUFDRDs7QUFMZTtBQUFBO0FBQUE7O0FBQUE7QUFPaEIsMkJBQWtCQSxJQUFsQiw4SEFBd0I7QUFBQSxZQUFmQyxLQUFlO0FBQ3RCLGFBQUtDLEdBQUwsQ0FBU0QsS0FBVDtBQUNEO0FBVGU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVVqQjtBQUVEOzs7Ozs7QUFJQUMsRUFBQUEsR0FBRyxDQUFDRCxLQUFELEVBQVE7QUFDVCxTQUFLRSxRQUFMLENBQWNGLEtBQWQsRUFBcUIsQ0FBckI7QUFDRDtBQUVEOzs7Ozs7O0FBS0FHLEVBQUFBLEdBQUcsQ0FBQ0gsS0FBRCxFQUFRO0FBQ1QsV0FBTyxLQUFLSSxjQUFMLENBQW9CSixLQUFwQixDQUFQO0FBQ0Q7QUFFRDs7Ozs7O0FBSUFLLEVBQUFBLE1BQU0sR0FBRztBQUNQLFdBQU8sS0FBS0MsZ0JBQVo7QUFDRDtBQUVEOzs7Ozs7QUFJQUMsRUFBQUEsTUFBTSxDQUFDUCxLQUFELEVBQVE7QUFDWixTQUFLUSxRQUFMLENBQWNSLEtBQWQ7QUFDRDtBQUVEOzs7OztBQUdBUyxFQUFBQSxLQUFLLEdBQUc7QUFDTixRQUFJSixNQUFNLEdBQUcsS0FBS0EsTUFBTCxFQUFiOztBQUVBLFdBQU9BLE1BQU0sQ0FBQyxDQUFELENBQWIsRUFBa0I7QUFDaEIsV0FBS0UsTUFBTCxDQUFZRixNQUFNLENBQUMsQ0FBRCxDQUFsQjtBQUNEO0FBQ0Y7QUFFRDs7Ozs7O0FBSUFLLEVBQUFBLElBQUksR0FBRztBQUNMLFdBQU8sS0FBS0osZ0JBQUwsQ0FBc0JLLE1BQTdCO0FBQ0Q7QUFFRDs7Ozs7O0FBSUFDLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBRCxFQUFNO0FBQ1gsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUtSLGdCQUFMLENBQXNCSyxNQUExQyxFQUFrREcsQ0FBQyxFQUFuRCxFQUF1RDtBQUNyRCxVQUFJZCxLQUFLLEdBQUcsS0FBS00sZ0JBQUwsQ0FBc0JRLENBQXRCLENBQVo7QUFDQUQsTUFBQUEsR0FBRyxDQUFDYixLQUFELENBQUg7QUFDRDtBQUNGO0FBRUQ7Ozs7O0FBR0EsSUFBRWUsTUFBTSxDQUFDQyxRQUFULElBQXFCO0FBQ25CLFFBQUlYLE1BQU0sR0FBRyxLQUFLQyxnQkFBbEI7QUFEbUI7QUFBQTtBQUFBOztBQUFBO0FBR25CLDRCQUFrQkQsTUFBbEIsbUlBQTBCO0FBQUEsWUFBakJMLEtBQWlCO0FBQ3hCLGNBQU1BLEtBQU47QUFDRDtBQUxrQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTXBCOztBQXhGc0M7O0FBMkZ6Q2lCLCtCQUFXQyxlQUFYLENBQTJCLENBQUN0QixTQUFELENBQTNCOztlQUNlQSxTIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4IFNwaW5hbENvbSAtIHd3dy5zcGluYWxjb20uY29tXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgU3BpbmFsQ29yZS5cbiAqXG4gKiBQbGVhc2UgcmVhZCBhbGwgb2YgdGhlIGZvbGxvd2luZyB0ZXJtcyBhbmQgY29uZGl0aW9uc1xuICogb2YgdGhlIEZyZWUgU29mdHdhcmUgbGljZW5zZSBBZ3JlZW1lbnQgKFwiQWdyZWVtZW50XCIpXG4gKiBjYXJlZnVsbHkuXG4gKlxuICogVGhpcyBBZ3JlZW1lbnQgaXMgYSBsZWdhbGx5IGJpbmRpbmcgY29udHJhY3QgYmV0d2VlblxuICogdGhlIExpY2Vuc2VlIChhcyBkZWZpbmVkIGJlbG93KSBhbmQgU3BpbmFsQ29tIHRoYXRcbiAqIHNldHMgZm9ydGggdGhlIHRlcm1zIGFuZCBjb25kaXRpb25zIHRoYXQgZ292ZXJuIHlvdXJcbiAqIHVzZSBvZiB0aGUgUHJvZ3JhbS4gQnkgaW5zdGFsbGluZyBhbmQvb3IgdXNpbmcgdGhlXG4gKiBQcm9ncmFtLCB5b3UgYWdyZWUgdG8gYWJpZGUgYnkgYWxsIHRoZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMgc3RhdGVkIG9yIHJlZmVyZW5jZWQgaGVyZWluLlxuICpcbiAqIElmIHlvdSBkbyBub3QgYWdyZWUgdG8gYWJpZGUgYnkgdGhlc2UgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zLCBkbyBub3QgZGVtb25zdHJhdGUgeW91ciBhY2NlcHRhbmNlIGFuZCBkb1xuICogbm90IGluc3RhbGwgb3IgdXNlIHRoZSBQcm9ncmFtLlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbG9uZ1xuICogd2l0aCB0aGlzIGZpbGUuIElmIG5vdCwgc2VlXG4gKiA8aHR0cDovL3Jlc291cmNlcy5zcGluYWxjb20uY29tL2xpY2Vuc2VzLnBkZj4uXG4gKi9cbmltcG9ydCBzcGluYWxDb3JlIGZyb20gXCJzcGluYWwtY29yZS1jb25uZWN0b3Jqc1wiO1xuXG5jb25zdCBnbG9iYWxUeXBlID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHdpbmRvdztcblxuY2xhc3MgU3BpbmFsU2V0IGV4dGVuZHMgZ2xvYmFsVHlwZS5Nb2RlbCB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIFNwaW5hbFNldCBjbGFzcy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGluaXQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgaWYgKCFpbml0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yIChsZXQgdmFsdWUgb2YgaW5pdCkge1xuICAgICAgdGhpcy5hZGQodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBlbmRzIGEgbmV3IGVsZW1lbnQgd2l0aCB0aGUgZ2l2ZW4gdmFsdWUgdG8gdGhlIHNldC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIFZhbHVlIHRvIHN0b3JlIGluIHRoZSBzZXRcbiAgICovXG4gIGFkZCh2YWx1ZSkge1xuICAgIHRoaXMubW9kX2F0dHIodmFsdWUsIDApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBib29sZWFuIGFzc2VydGluZyB3aGV0aGVyIHRoZSB2YWx1ZSBpcyBpbiB0aGUgc2V0IG9yIG5vdC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIFZhbHVlXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgZXhpc3RzXG4gICAqL1xuICBoYXModmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5oYXNPd25Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBhcnJheSB0aGF0IGNvbnRhaW5zIGFsbCB0aGUgdmFsdWVzIG9mIHRoZSBzZXQuXG4gICAqIEByZXR1cm5zIHtBcnJheTxTdHJpbmc+fSBBcnJheSBjb250YWluaW5nIGFsbCB0aGUgdmFsdWVzIGluIHRoZSBzZXRcbiAgICovXG4gIHZhbHVlcygpIHtcbiAgICByZXR1cm4gdGhpcy5fYXR0cmlidXRlX25hbWVzO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgYW4gZWxlbWVudC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIFZhbHVlIHRvIGRlbGV0ZVxuICAgKi9cbiAgZGVsZXRlKHZhbHVlKSB7XG4gICAgdGhpcy5yZW1fYXR0cih2YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlcyBhbGwgdmFsdWVzIGluIHRoZSBzZXQuXG4gICAqL1xuICBjbGVhcigpIHtcbiAgICBsZXQgdmFsdWVzID0gdGhpcy52YWx1ZXMoKTtcblxuICAgIHdoaWxlICh2YWx1ZXNbMF0pIHtcbiAgICAgIHRoaXMuZGVsZXRlKHZhbHVlc1swXSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIG51bWJlciBvZiB2YWx1ZXMgaW4gdGhlIHNldC5cbiAgICogQHJldHVybiB7TnVtYmVyfSBOdW1iZXIgb2YgdmFsdWVzIGluIHRoZSBzZXRcbiAgICovXG4gIHNpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2F0dHJpYnV0ZV9uYW1lcy5sZW5ndGg7XG4gIH1cblxuICAvKipcbiAgICogQXBwbGllcyBhIGZ1bmN0aW9uIHRvIGVhY2ggb2YgdGhlIHZhbHVlcyBpbiB0aGUgc2V0LlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW4gRnVuY2lvbiB0byBhcHBseVxuICAgKi9cbiAgZm9yRWFjaChmdW4pIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2F0dHJpYnV0ZV9uYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHZhbHVlID0gdGhpcy5fYXR0cmlidXRlX25hbWVzW2ldO1xuICAgICAgZnVuKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRnVuY3Rpb24gdG8gaXRlcmF0ZSBvdmVyIHRoZSBzZXQgb2JqZWN0LlxuICAgKi9cbiAgKltTeW1ib2wuaXRlcmF0b3JdKCkge1xuICAgIGxldCB2YWx1ZXMgPSB0aGlzLl9hdHRyaWJ1dGVfbmFtZXM7XG5cbiAgICBmb3IgKGxldCB2YWx1ZSBvZiB2YWx1ZXMpIHtcbiAgICAgIHlpZWxkIHZhbHVlO1xuICAgIH1cbiAgfVxufVxuXG5zcGluYWxDb3JlLnJlZ2lzdGVyX21vZGVscyhbU3BpbmFsU2V0XSk7XG5leHBvcnQgZGVmYXVsdCBTcGluYWxTZXQ7XG4iXX0=