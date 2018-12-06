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

class SpinalMap extends globalType.Model {
  constructor() {
    super();
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


  [Symbol.iterator]() {
    let index = -1;
    let keys = this.keys();
    let map = this;
    return {
      next() {
        return {
          value: map[keys[++index]],
          done: index >= keys.length
        };
      }

    };
  }

}

_spinalCoreConnectorjs.default.register_models([SpinalMap]);

var _default = SpinalMap;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxNYXAuanMiXSwibmFtZXMiOlsiZ2xvYmFsVHlwZSIsIndpbmRvdyIsImdsb2JhbCIsIlNwaW5hbE1hcCIsIk1vZGVsIiwiY29uc3RydWN0b3IiLCJzZXRFbGVtZW50Iiwia2V5IiwidmFsdWUiLCJyZW1fYXR0ciIsImF0dHJpYnV0ZSIsImFkZF9hdHRyIiwiZ2V0RWxlbWVudCIsImhhcyIsIl9hdHRyaWJ1dGVfbmFtZXMiLCJpbmNsdWRlcyIsImhhc0tleSIsImxlbmd0aCIsImtleXMiLCJkZWxldGUiLCJjbGVhciIsImZvckVhY2giLCJmdW4iLCJpIiwibmFtZSIsIlN5bWJvbCIsIml0ZXJhdG9yIiwiaW5kZXgiLCJtYXAiLCJuZXh0IiwiZG9uZSIsInNwaW5hbENvcmUiLCJyZWdpc3Rlcl9tb2RlbHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUF1QkE7Ozs7QUF2QkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLE1BQU1BLFVBQVUsR0FBRyxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDQyxNQUFoQyxHQUF5Q0QsTUFBNUQ7O0FBRUEsTUFBTUUsU0FBTixTQUF3QkgsVUFBVSxDQUFDSSxLQUFuQyxDQUF5QztBQUNyQ0MsRUFBQUEsV0FBVyxHQUFHO0FBQ1Y7QUFDSDtBQUVEOzs7Ozs7O0FBS0FDLEVBQUFBLFVBQVUsQ0FBQ0MsR0FBRCxFQUFNQyxLQUFOLEVBQWE7QUFDbkIsU0FBS0MsUUFBTCxDQUFjRixHQUFkO0FBQ0EsVUFBTUcsU0FBUyxHQUFHLEVBQWxCO0FBQ0FBLElBQUFBLFNBQVMsQ0FBQ0gsR0FBRCxDQUFULEdBQWlCQyxLQUFqQjtBQUVBLFNBQUtHLFFBQUwsQ0FBY0QsU0FBZDtBQUNIO0FBRUQ7Ozs7Ozs7QUFLQUUsRUFBQUEsVUFBVSxDQUFDTCxHQUFELEVBQU07QUFDWixXQUFPLEtBQUtBLEdBQUwsQ0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7QUFLQU0sRUFBQUEsR0FBRyxDQUFDTixHQUFELEVBQU07QUFDTCxXQUFPLEtBQUtPLGdCQUFMLENBQXNCQyxRQUF0QixDQUErQlIsR0FBL0IsQ0FBUDtBQUNIO0FBRUQ7Ozs7OztBQUlBUyxFQUFBQSxNQUFNLEdBQUc7QUFDTCxXQUFPLEtBQUtGLGdCQUFMLENBQXNCRyxNQUF0QixHQUErQixDQUF0QztBQUNIO0FBRUQ7Ozs7OztBQUlBQyxFQUFBQSxJQUFJLEdBQUc7QUFDSCxXQUFPLEtBQUtKLGdCQUFaO0FBQ0g7QUFFRDs7Ozs7O0FBSUFLLEVBQUFBLE1BQU0sQ0FBQ1osR0FBRCxFQUFNO0FBQ1IsU0FBS0UsUUFBTCxDQUFjRixHQUFkO0FBQ0g7QUFFRDs7Ozs7QUFHQWEsRUFBQUEsS0FBSyxHQUFHO0FBQ0osUUFBSUYsSUFBSSxHQUFHLEtBQUtBLElBQUwsRUFBWDs7QUFFQSxXQUFPQSxJQUFJLENBQUMsQ0FBRCxDQUFYLEVBQWdCO0FBQ1osV0FBS0MsTUFBTCxDQUFZRCxJQUFJLENBQUMsQ0FBRCxDQUFoQjtBQUNIO0FBQ0o7QUFFRDs7Ozs7O0FBSUFHLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBRCxFQUFNO0FBQ1QsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUtULGdCQUFMLENBQXNCRyxNQUExQyxFQUFrRE0sQ0FBQyxFQUFuRCxFQUF1RDtBQUNuRCxVQUFJQyxJQUFJLEdBQUcsS0FBS1YsZ0JBQUwsQ0FBc0JTLENBQXRCLENBQVg7QUFDQUQsTUFBQUEsR0FBRyxDQUFDLEtBQUtFLElBQUwsQ0FBRCxDQUFIO0FBQ0g7QUFDSjtBQUVEOzs7OztBQUdBLEdBQUNDLE1BQU0sQ0FBQ0MsUUFBUixJQUFvQjtBQUNoQixRQUFJQyxLQUFLLEdBQUcsQ0FBQyxDQUFiO0FBQ0EsUUFBSVQsSUFBSSxHQUFHLEtBQUtBLElBQUwsRUFBWDtBQUNBLFFBQUlVLEdBQUcsR0FBRyxJQUFWO0FBRUEsV0FBTztBQUNIQyxNQUFBQSxJQUFJLEdBQUc7QUFDSCxlQUFPO0FBQ0hyQixVQUFBQSxLQUFLLEVBQUVvQixHQUFHLENBQUNWLElBQUksQ0FBQyxFQUFFUyxLQUFILENBQUwsQ0FEUDtBQUVIRyxVQUFBQSxJQUFJLEVBQUVILEtBQUssSUFBSVQsSUFBSSxDQUFDRDtBQUZqQixTQUFQO0FBSUg7O0FBTkUsS0FBUDtBQVFIOztBQWxHb0M7O0FBcUd6Q2MsK0JBQVdDLGVBQVgsQ0FBMkIsQ0FBQzdCLFNBQUQsQ0FBM0I7O2VBQ2VBLFMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTggU3BpbmFsQ29tIC0gd3d3LnNwaW5hbGNvbS5jb21cbiAqIFxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgU3BpbmFsQ29yZS5cbiAqIFxuICogUGxlYXNlIHJlYWQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgdGVybXMgYW5kIGNvbmRpdGlvbnNcbiAqIG9mIHRoZSBGcmVlIFNvZnR3YXJlIGxpY2Vuc2UgQWdyZWVtZW50IChcIkFncmVlbWVudFwiKVxuICogY2FyZWZ1bGx5LlxuICogXG4gKiBUaGlzIEFncmVlbWVudCBpcyBhIGxlZ2FsbHkgYmluZGluZyBjb250cmFjdCBiZXR3ZWVuXG4gKiB0aGUgTGljZW5zZWUgKGFzIGRlZmluZWQgYmVsb3cpIGFuZCBTcGluYWxDb20gdGhhdFxuICogc2V0cyBmb3J0aCB0aGUgdGVybXMgYW5kIGNvbmRpdGlvbnMgdGhhdCBnb3Zlcm4geW91clxuICogdXNlIG9mIHRoZSBQcm9ncmFtLiBCeSBpbnN0YWxsaW5nIGFuZC9vciB1c2luZyB0aGVcbiAqIFByb2dyYW0sIHlvdSBhZ3JlZSB0byBhYmlkZSBieSBhbGwgdGhlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucyBzdGF0ZWQgb3IgcmVmZXJlbmNlZCBoZXJlaW4uXG4gKiBcbiAqIElmIHlvdSBkbyBub3QgYWdyZWUgdG8gYWJpZGUgYnkgdGhlc2UgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zLCBkbyBub3QgZGVtb25zdHJhdGUgeW91ciBhY2NlcHRhbmNlIGFuZCBkb1xuICogbm90IGluc3RhbGwgb3IgdXNlIHRoZSBQcm9ncmFtLlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbG9uZ1xuICogd2l0aCB0aGlzIGZpbGUuIElmIG5vdCwgc2VlXG4gKiA8aHR0cDovL3Jlc291cmNlcy5zcGluYWxjb20uY29tL2xpY2Vuc2VzLnBkZj4uXG4gKi9cbmltcG9ydCBzcGluYWxDb3JlIGZyb20gXCJzcGluYWwtY29yZS1jb25uZWN0b3Jqc1wiO1xuXG5jb25zdCBnbG9iYWxUeXBlID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHdpbmRvdztcblxuY2xhc3MgU3BpbmFsTWFwIGV4dGVuZHMgZ2xvYmFsVHlwZS5Nb2RlbCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgdmFsdWUgY29ycmVzcG9uZGluZyB0byB0aGUga2V5LlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgS2V5IHRvIHRoZSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgTmV3IHZhbHVlXG4gICAgICovXG4gICAgc2V0RWxlbWVudChrZXksIHZhbHVlKSB7XG4gICAgICAgIHRoaXMucmVtX2F0dHIoa2V5KTtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlID0ge307XG4gICAgICAgIGF0dHJpYnV0ZVtrZXldID0gdmFsdWU7XG5cbiAgICAgICAgdGhpcy5hZGRfYXR0cihhdHRyaWJ1dGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHZhbHVlIGFzc29jaWF0ZWQgdG8gdGhlIGtleSwgb3IgdW5kZWZpbmVkIGlmIHRoZXJlIGlzIG5vbmUuXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGtleSBLZXkgdG8gdGhlIHZhbHVlXG4gICAgICogQHJldHVybnMgeyp9IFZhbHVlIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGtleVxuICAgICAqL1xuICAgIGdldEVsZW1lbnQoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzW2tleV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGJvb2xlYW4gYXNzZXJ0aW5nIHdoZXRoZXIgYSB2YWx1ZSBoYXMgYmVlbiBhc3NvY2lhdGVkIHRvIHRoZSBrZXkgb3Igbm90LlxuICAgICAqIEBwYXJhbSBrZXkgS2V5XG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybiB0cnVlIGlmIHRoZSBrZXkgZXhpc3RzXG4gICAgICovXG4gICAgaGFzKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYXR0cmlidXRlX25hbWVzLmluY2x1ZGVzKGtleSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgYm9vbGVhbiBhc3NlcnRpbmcgd2hldGhlciB0aGUgbWFwIGNvbnRhaW5zIGFueSBrZXkuXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybiB0cnVlIGlmIHRoZSBtYXAgY29udGFpbnMgYXQgbGVhc3Qgb25lIGtleVxuICAgICAqL1xuICAgIGhhc0tleSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2F0dHJpYnV0ZV9uYW1lcy5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gYXJyYXkgdGhhdCBjb250YWlucyB0aGUga2V5cyBmb3IgZWFjaCBlbGVtZW50IGluIHRoZSBtYXAgaW4gaW5zZXJ0aW9uIG9yZGVyLlxuICAgICAqIEByZXR1cm5zIHtBcnJheTxTdHJpbmc+fSBBcnJheSBjb250YWluaW5nIGFsbCB0aGUga2V5cyBpbiB0aGUgbWFwXG4gICAgICovXG4gICAga2V5cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2F0dHJpYnV0ZV9uYW1lcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxldGVzIGFuIGVsZW1lbnQuXG4gICAgICogQHBhcmFtIGtleSBLZXkgb2YgdGhlIGVsZW1lbnRcbiAgICAgKi9cbiAgICBkZWxldGUoa2V5KSB7XG4gICAgICAgIHRoaXMucmVtX2F0dHIoa2V5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxldGVzIGFsbCBlbGVtZW50cy5cbiAgICAgKi9cbiAgICBjbGVhcigpIHtcbiAgICAgICAgbGV0IGtleXMgPSB0aGlzLmtleXMoKTtcblxuICAgICAgICB3aGlsZSAoa2V5c1swXSkge1xuICAgICAgICAgICAgdGhpcy5kZWxldGUoa2V5c1swXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBcHBsaWVzIGEgZnVuY3Rpb24gdG8gZWFjaCBvZiB0aGUgdmFsdWVzIGluIHRoZSBtYXAuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuIEZ1bmNpb24gdG8gYXBwbHlcbiAgICAgKi9cbiAgICBmb3JFYWNoKGZ1bikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2F0dHJpYnV0ZV9uYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IG5hbWUgPSB0aGlzLl9hdHRyaWJ1dGVfbmFtZXNbaV07XG4gICAgICAgICAgICBmdW4odGhpc1tuYW1lXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBpdGVyYXRlIG92ZXIgdGhlIG1hcCBvYmplY3QuXG4gICAgICovXG4gICAgW1N5bWJvbC5pdGVyYXRvcl0oKSB7XG4gICAgICAgIGxldCBpbmRleCA9IC0xO1xuICAgICAgICBsZXQga2V5cyA9IHRoaXMua2V5cygpO1xuICAgICAgICBsZXQgbWFwID0gdGhpcztcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmV4dCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogbWFwW2tleXNbKytpbmRleF1dLFxuICAgICAgICAgICAgICAgICAgICBkb25lOiBpbmRleCA+PSBrZXlzLmxlbmd0aFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufVxuXG5zcGluYWxDb3JlLnJlZ2lzdGVyX21vZGVscyhbU3BpbmFsTWFwXSk7XG5leHBvcnQgZGVmYXVsdCBTcGluYWxNYXA7XG4iXX0=