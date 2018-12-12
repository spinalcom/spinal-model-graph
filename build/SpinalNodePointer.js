"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _spinalCoreConnectorjs = _interopRequireDefault(require("spinal-core-connectorjs"));

var _SpinalNode = _interopRequireDefault(require("./Nodes/SpinalNode"));

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
/**
 * Wrapper over SpinalNodePointer containing some information about the pointed element
 */

class SpinalNodePointer extends globalType.Model {
  /**
   * Constructor for the SpinalNodePointer class.
   * @param {SpinalNode | Model} element Element to wich the SpinalNodePointer will point
   */
  constructor(element) {
    super();
    this.add_attr({
      ptr: new globalType.Ptr(),
      info: {}
    });

    if (typeof element !== "undefined") {
      this.setElement(element);
    }
  }
  /**
   * Sets pointer to point to an element.
   * @param {SpinalNode | Model} element
   */


  setElement(element) {
    if (element instanceof _SpinalNode.default) {
      this.info.mod_attr("pointedId", element.getId());
      this.info.mod_attr("pointedType", element.getType());
    }

    this.ptr.set(element);
  }
  /**
   * Loads the model to which the pointer is pointing.
   * @returns {Model} The model to which the pointer is pointing
   */


  load() {
    if (this.ptr instanceof globalType.Ptr && this.ptr.data.value !== 0 && typeof FileSystem._objects[this.ptr.data.value] !== "undefined") {
      return Promise.resolve(FileSystem._objects[this.ptr.data.value]);
    } else {
      return new Promise(resolve => {
        this.ptr.load(resolve);
      });
    }
  }
  /**
   * Unsets the pointer.
   */


  unset() {
    this.info.rem_attr("pointedId");
    this.info.rem_attr("pointedType");
    this.ptr.set(0);
  }
  /**
   * Returns the id of the pointed element.
   * @returns {Str} Id of the pointed element
   */


  getId() {
    return this.info.pointedId;
  }
  /**
   * This function returns the type of the pointed element.
   * @returns {Str} Type of the pointed element
   */


  getType() {
    return this.info.pointedType;
  }

}

_spinalCoreConnectorjs.default.register_models([SpinalNodePointer]);

var _default = SpinalNodePointer;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxOb2RlUG9pbnRlci5qcyJdLCJuYW1lcyI6WyJnbG9iYWxUeXBlIiwid2luZG93IiwiZ2xvYmFsIiwiU3BpbmFsTm9kZVBvaW50ZXIiLCJNb2RlbCIsImNvbnN0cnVjdG9yIiwiZWxlbWVudCIsImFkZF9hdHRyIiwicHRyIiwiUHRyIiwiaW5mbyIsInNldEVsZW1lbnQiLCJTcGluYWxOb2RlIiwibW9kX2F0dHIiLCJnZXRJZCIsImdldFR5cGUiLCJzZXQiLCJsb2FkIiwiZGF0YSIsInZhbHVlIiwiRmlsZVN5c3RlbSIsIl9vYmplY3RzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ1bnNldCIsInJlbV9hdHRyIiwicG9pbnRlZElkIiwicG9pbnRlZFR5cGUiLCJzcGluYWxDb3JlIiwicmVnaXN0ZXJfbW9kZWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBd0JBOztBQUNBOzs7O0FBekJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJCQSxNQUFNQSxVQUFVLEdBQUcsT0FBT0MsTUFBUCxLQUFrQixXQUFsQixHQUFnQ0MsTUFBaEMsR0FBeUNELE1BQTVEO0FBRUE7Ozs7QUFHQSxNQUFNRSxpQkFBTixTQUFnQ0gsVUFBVSxDQUFDSSxLQUEzQyxDQUFpRDtBQUMvQzs7OztBQUlBQyxFQUFBQSxXQUFXLENBQUNDLE9BQUQsRUFBVTtBQUNuQjtBQUVBLFNBQUtDLFFBQUwsQ0FBYztBQUNaQyxNQUFBQSxHQUFHLEVBQUUsSUFBSVIsVUFBVSxDQUFDUyxHQUFmLEVBRE87QUFFWkMsTUFBQUEsSUFBSSxFQUFFO0FBRk0sS0FBZDs7QUFLQSxRQUFJLE9BQU9KLE9BQVAsS0FBbUIsV0FBdkIsRUFBb0M7QUFDbEMsV0FBS0ssVUFBTCxDQUFnQkwsT0FBaEI7QUFDRDtBQUNGO0FBRUQ7Ozs7OztBQUlBSyxFQUFBQSxVQUFVLENBQUNMLE9BQUQsRUFBVTtBQUNsQixRQUFJQSxPQUFPLFlBQVlNLG1CQUF2QixFQUFtQztBQUNqQyxXQUFLRixJQUFMLENBQVVHLFFBQVYsQ0FBbUIsV0FBbkIsRUFBZ0NQLE9BQU8sQ0FBQ1EsS0FBUixFQUFoQztBQUNBLFdBQUtKLElBQUwsQ0FBVUcsUUFBVixDQUFtQixhQUFuQixFQUFrQ1AsT0FBTyxDQUFDUyxPQUFSLEVBQWxDO0FBQ0Q7O0FBQ0QsU0FBS1AsR0FBTCxDQUFTUSxHQUFULENBQWFWLE9BQWI7QUFDRDtBQUVEOzs7Ozs7QUFJQVcsRUFBQUEsSUFBSSxHQUFHO0FBQ0wsUUFDRSxLQUFLVCxHQUFMLFlBQW9CUixVQUFVLENBQUNTLEdBQS9CLElBQ0EsS0FBS0QsR0FBTCxDQUFTVSxJQUFULENBQWNDLEtBQWQsS0FBd0IsQ0FEeEIsSUFFQSxPQUFPQyxVQUFVLENBQUNDLFFBQVgsQ0FBb0IsS0FBS2IsR0FBTCxDQUFTVSxJQUFULENBQWNDLEtBQWxDLENBQVAsS0FBb0QsV0FIdEQsRUFJRTtBQUNBLGFBQU9HLE9BQU8sQ0FBQ0MsT0FBUixDQUFnQkgsVUFBVSxDQUFDQyxRQUFYLENBQW9CLEtBQUtiLEdBQUwsQ0FBU1UsSUFBVCxDQUFjQyxLQUFsQyxDQUFoQixDQUFQO0FBQ0QsS0FORCxNQU1PO0FBQ0wsYUFBTyxJQUFJRyxPQUFKLENBQVlDLE9BQU8sSUFBSTtBQUM1QixhQUFLZixHQUFMLENBQVNTLElBQVQsQ0FBY00sT0FBZDtBQUNELE9BRk0sQ0FBUDtBQUdEO0FBQ0Y7QUFFRDs7Ozs7QUFHQUMsRUFBQUEsS0FBSyxHQUFHO0FBQ04sU0FBS2QsSUFBTCxDQUFVZSxRQUFWLENBQW1CLFdBQW5CO0FBQ0EsU0FBS2YsSUFBTCxDQUFVZSxRQUFWLENBQW1CLGFBQW5CO0FBQ0EsU0FBS2pCLEdBQUwsQ0FBU1EsR0FBVCxDQUFhLENBQWI7QUFDRDtBQUVEOzs7Ozs7QUFJQUYsRUFBQUEsS0FBSyxHQUFHO0FBQ04sV0FBTyxLQUFLSixJQUFMLENBQVVnQixTQUFqQjtBQUNEO0FBRUQ7Ozs7OztBQUlBWCxFQUFBQSxPQUFPLEdBQUc7QUFDUixXQUFPLEtBQUtMLElBQUwsQ0FBVWlCLFdBQWpCO0FBQ0Q7O0FBdkU4Qzs7QUEwRWpEQywrQkFBV0MsZUFBWCxDQUEyQixDQUFDMUIsaUJBQUQsQ0FBM0I7O2VBQ2VBLGlCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4IFNwaW5hbENvbSAtIHd3dy5zcGluYWxjb20uY29tXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgU3BpbmFsQ29yZS5cbiAqXG4gKiBQbGVhc2UgcmVhZCBhbGwgb2YgdGhlIGZvbGxvd2luZyB0ZXJtcyBhbmQgY29uZGl0aW9uc1xuICogb2YgdGhlIEZyZWUgU29mdHdhcmUgbGljZW5zZSBBZ3JlZW1lbnQgKFwiQWdyZWVtZW50XCIpXG4gKiBjYXJlZnVsbHkuXG4gKlxuICogVGhpcyBBZ3JlZW1lbnQgaXMgYSBsZWdhbGx5IGJpbmRpbmcgY29udHJhY3QgYmV0d2VlblxuICogdGhlIExpY2Vuc2VlIChhcyBkZWZpbmVkIGJlbG93KSBhbmQgU3BpbmFsQ29tIHRoYXRcbiAqIHNldHMgZm9ydGggdGhlIHRlcm1zIGFuZCBjb25kaXRpb25zIHRoYXQgZ292ZXJuIHlvdXJcbiAqIHVzZSBvZiB0aGUgUHJvZ3JhbS4gQnkgaW5zdGFsbGluZyBhbmQvb3IgdXNpbmcgdGhlXG4gKiBQcm9ncmFtLCB5b3UgYWdyZWUgdG8gYWJpZGUgYnkgYWxsIHRoZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMgc3RhdGVkIG9yIHJlZmVyZW5jZWQgaGVyZWluLlxuICpcbiAqIElmIHlvdSBkbyBub3QgYWdyZWUgdG8gYWJpZGUgYnkgdGhlc2UgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zLCBkbyBub3QgZGVtb25zdHJhdGUgeW91ciBhY2NlcHRhbmNlIGFuZCBkb1xuICogbm90IGluc3RhbGwgb3IgdXNlIHRoZSBQcm9ncmFtLlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbG9uZ1xuICogd2l0aCB0aGlzIGZpbGUuIElmIG5vdCwgc2VlXG4gKiA8aHR0cDovL3Jlc291cmNlcy5zcGluYWxjb20uY29tL2xpY2Vuc2VzLnBkZj4uXG4gKi9cblxuaW1wb3J0IHNwaW5hbENvcmUgZnJvbSBcInNwaW5hbC1jb3JlLWNvbm5lY3RvcmpzXCI7XG5pbXBvcnQgU3BpbmFsTm9kZSBmcm9tIFwiLi9Ob2Rlcy9TcGluYWxOb2RlXCI7XG5cbmNvbnN0IGdsb2JhbFR5cGUgPSB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogd2luZG93O1xuXG4vKipcbiAqIFdyYXBwZXIgb3ZlciBTcGluYWxOb2RlUG9pbnRlciBjb250YWluaW5nIHNvbWUgaW5mb3JtYXRpb24gYWJvdXQgdGhlIHBvaW50ZWQgZWxlbWVudFxuICovXG5jbGFzcyBTcGluYWxOb2RlUG9pbnRlciBleHRlbmRzIGdsb2JhbFR5cGUuTW9kZWwge1xuICAvKipcbiAgICogQ29uc3RydWN0b3IgZm9yIHRoZSBTcGluYWxOb2RlUG9pbnRlciBjbGFzcy5cbiAgICogQHBhcmFtIHtTcGluYWxOb2RlIHwgTW9kZWx9IGVsZW1lbnQgRWxlbWVudCB0byB3aWNoIHRoZSBTcGluYWxOb2RlUG9pbnRlciB3aWxsIHBvaW50XG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuYWRkX2F0dHIoe1xuICAgICAgcHRyOiBuZXcgZ2xvYmFsVHlwZS5QdHIoKSxcbiAgICAgIGluZm86IHt9XG4gICAgfSk7XG5cbiAgICBpZiAodHlwZW9mIGVsZW1lbnQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuc2V0RWxlbWVudChlbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBwb2ludGVyIHRvIHBvaW50IHRvIGFuIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZSB8IE1vZGVsfSBlbGVtZW50XG4gICAqL1xuICBzZXRFbGVtZW50KGVsZW1lbnQpIHtcbiAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIFNwaW5hbE5vZGUpIHtcbiAgICAgIHRoaXMuaW5mby5tb2RfYXR0cihcInBvaW50ZWRJZFwiLCBlbGVtZW50LmdldElkKCkpO1xuICAgICAgdGhpcy5pbmZvLm1vZF9hdHRyKFwicG9pbnRlZFR5cGVcIiwgZWxlbWVudC5nZXRUeXBlKCkpO1xuICAgIH1cbiAgICB0aGlzLnB0ci5zZXQoZWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogTG9hZHMgdGhlIG1vZGVsIHRvIHdoaWNoIHRoZSBwb2ludGVyIGlzIHBvaW50aW5nLlxuICAgKiBAcmV0dXJucyB7TW9kZWx9IFRoZSBtb2RlbCB0byB3aGljaCB0aGUgcG9pbnRlciBpcyBwb2ludGluZ1xuICAgKi9cbiAgbG9hZCgpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLnB0ciBpbnN0YW5jZW9mIGdsb2JhbFR5cGUuUHRyICYmXG4gICAgICB0aGlzLnB0ci5kYXRhLnZhbHVlICE9PSAwICYmXG4gICAgICB0eXBlb2YgRmlsZVN5c3RlbS5fb2JqZWN0c1t0aGlzLnB0ci5kYXRhLnZhbHVlXSAhPT0gXCJ1bmRlZmluZWRcIlxuICAgICkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShGaWxlU3lzdGVtLl9vYmplY3RzW3RoaXMucHRyLmRhdGEudmFsdWVdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICB0aGlzLnB0ci5sb2FkKHJlc29sdmUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVuc2V0cyB0aGUgcG9pbnRlci5cbiAgICovXG4gIHVuc2V0KCkge1xuICAgIHRoaXMuaW5mby5yZW1fYXR0cihcInBvaW50ZWRJZFwiKTtcbiAgICB0aGlzLmluZm8ucmVtX2F0dHIoXCJwb2ludGVkVHlwZVwiKTtcbiAgICB0aGlzLnB0ci5zZXQoMCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaWQgb2YgdGhlIHBvaW50ZWQgZWxlbWVudC5cbiAgICogQHJldHVybnMge1N0cn0gSWQgb2YgdGhlIHBvaW50ZWQgZWxlbWVudFxuICAgKi9cbiAgZ2V0SWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5mby5wb2ludGVkSWQ7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSB0eXBlIG9mIHRoZSBwb2ludGVkIGVsZW1lbnQuXG4gICAqIEByZXR1cm5zIHtTdHJ9IFR5cGUgb2YgdGhlIHBvaW50ZWQgZWxlbWVudFxuICAgKi9cbiAgZ2V0VHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbmZvLnBvaW50ZWRUeXBlO1xuICB9XG59XG5cbnNwaW5hbENvcmUucmVnaXN0ZXJfbW9kZWxzKFtTcGluYWxOb2RlUG9pbnRlcl0pO1xuZXhwb3J0IGRlZmF1bHQgU3BpbmFsTm9kZVBvaW50ZXI7XG4iXX0=