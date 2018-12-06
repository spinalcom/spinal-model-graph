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
   * Unsets the pointer.
   */


  unset() {
    this.info.rem_attr("pointedId");
    this.info.rem_attr("pointedType");
    this.ptr.set(0);
  }
  /**
   * Returns the id of the pointed element.
   * @return {Str} Id of the pointed element
   */


  getId() {
    return this.info.pointedId;
  }
  /**
   * This function returns the type of the pointed element.
   * @return {Str} Type of the pointed element
   */


  getType() {
    return this.info.pointedType;
  }

}

_spinalCoreConnectorjs.default.register_models([SpinalNodePointer]);

var _default = SpinalNodePointer;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxOb2RlUG9pbnRlci5qcyJdLCJuYW1lcyI6WyJnbG9iYWxUeXBlIiwid2luZG93IiwiZ2xvYmFsIiwiU3BpbmFsTm9kZVBvaW50ZXIiLCJNb2RlbCIsImNvbnN0cnVjdG9yIiwiZWxlbWVudCIsImFkZF9hdHRyIiwicHRyIiwiUHRyIiwiaW5mbyIsInNldEVsZW1lbnQiLCJTcGluYWxOb2RlIiwibW9kX2F0dHIiLCJnZXRJZCIsImdldFR5cGUiLCJzZXQiLCJ1bnNldCIsInJlbV9hdHRyIiwicG9pbnRlZElkIiwicG9pbnRlZFR5cGUiLCJzcGluYWxDb3JlIiwicmVnaXN0ZXJfbW9kZWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBdUJBOztBQUNBOzs7O0FBeEJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxNQUFNQSxVQUFVLEdBQUcsT0FBT0MsTUFBUCxLQUFrQixXQUFsQixHQUFnQ0MsTUFBaEMsR0FBeUNELE1BQTVEO0FBRUE7Ozs7QUFHQSxNQUFNRSxpQkFBTixTQUFnQ0gsVUFBVSxDQUFDSSxLQUEzQyxDQUFpRDtBQUMvQzs7OztBQUlBQyxFQUFBQSxXQUFXLENBQUNDLE9BQUQsRUFBVTtBQUNuQjtBQUVBLFNBQUtDLFFBQUwsQ0FBYztBQUNaQyxNQUFBQSxHQUFHLEVBQUUsSUFBSVIsVUFBVSxDQUFDUyxHQUFmLEVBRE87QUFFWkMsTUFBQUEsSUFBSSxFQUFFO0FBRk0sS0FBZDs7QUFLQSxRQUFJLE9BQU9KLE9BQVAsS0FBbUIsV0FBdkIsRUFBb0M7QUFDbEMsV0FBS0ssVUFBTCxDQUFnQkwsT0FBaEI7QUFDRDtBQUNGO0FBRUQ7Ozs7OztBQUlBSyxFQUFBQSxVQUFVLENBQUNMLE9BQUQsRUFBVTtBQUNsQixRQUFJQSxPQUFPLFlBQVlNLG1CQUF2QixFQUFtQztBQUNqQyxXQUFLRixJQUFMLENBQVVHLFFBQVYsQ0FBbUIsV0FBbkIsRUFBZ0NQLE9BQU8sQ0FBQ1EsS0FBUixFQUFoQztBQUNBLFdBQUtKLElBQUwsQ0FBVUcsUUFBVixDQUFtQixhQUFuQixFQUFrQ1AsT0FBTyxDQUFDUyxPQUFSLEVBQWxDO0FBQ0Q7O0FBQ0QsU0FBS1AsR0FBTCxDQUFTUSxHQUFULENBQWFWLE9BQWI7QUFDRDtBQUVEOzs7OztBQUdBVyxFQUFBQSxLQUFLLEdBQUc7QUFDTixTQUFLUCxJQUFMLENBQVVRLFFBQVYsQ0FBbUIsV0FBbkI7QUFDQSxTQUFLUixJQUFMLENBQVVRLFFBQVYsQ0FBbUIsYUFBbkI7QUFDQSxTQUFLVixHQUFMLENBQVNRLEdBQVQsQ0FBYSxDQUFiO0FBQ0Q7QUFFRDs7Ozs7O0FBSUFGLEVBQUFBLEtBQUssR0FBRztBQUNOLFdBQU8sS0FBS0osSUFBTCxDQUFVUyxTQUFqQjtBQUNEO0FBRUQ7Ozs7OztBQUlBSixFQUFBQSxPQUFPLEdBQUc7QUFDUixXQUFPLEtBQUtMLElBQUwsQ0FBVVUsV0FBakI7QUFDRDs7QUFyRDhDOztBQXdEakRDLCtCQUFXQyxlQUFYLENBQTJCLENBQUNuQixpQkFBRCxDQUEzQjs7ZUFDZUEsaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTggU3BpbmFsQ29tIC0gd3d3LnNwaW5hbGNvbS5jb21cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBTcGluYWxDb3JlLlxuICpcbiAqIFBsZWFzZSByZWFkIGFsbCBvZiB0aGUgZm9sbG93aW5nIHRlcm1zIGFuZCBjb25kaXRpb25zXG4gKiBvZiB0aGUgRnJlZSBTb2Z0d2FyZSBsaWNlbnNlIEFncmVlbWVudCAoXCJBZ3JlZW1lbnRcIilcbiAqIGNhcmVmdWxseS5cbiAqXG4gKiBUaGlzIEFncmVlbWVudCBpcyBhIGxlZ2FsbHkgYmluZGluZyBjb250cmFjdCBiZXR3ZWVuXG4gKiB0aGUgTGljZW5zZWUgKGFzIGRlZmluZWQgYmVsb3cpIGFuZCBTcGluYWxDb20gdGhhdFxuICogc2V0cyBmb3J0aCB0aGUgdGVybXMgYW5kIGNvbmRpdGlvbnMgdGhhdCBnb3Zlcm4geW91clxuICogdXNlIG9mIHRoZSBQcm9ncmFtLiBCeSBpbnN0YWxsaW5nIGFuZC9vciB1c2luZyB0aGVcbiAqIFByb2dyYW0sIHlvdSBhZ3JlZSB0byBhYmlkZSBieSBhbGwgdGhlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucyBzdGF0ZWQgb3IgcmVmZXJlbmNlZCBoZXJlaW4uXG4gKlxuICogSWYgeW91IGRvIG5vdCBhZ3JlZSB0byBhYmlkZSBieSB0aGVzZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMsIGRvIG5vdCBkZW1vbnN0cmF0ZSB5b3VyIGFjY2VwdGFuY2UgYW5kIGRvXG4gKiBub3QgaW5zdGFsbCBvciB1c2UgdGhlIFByb2dyYW0uXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFsb25nXG4gKiB3aXRoIHRoaXMgZmlsZS4gSWYgbm90LCBzZWVcbiAqIDxodHRwOi8vcmVzb3VyY2VzLnNwaW5hbGNvbS5jb20vbGljZW5zZXMucGRmPi5cbiAqL1xuaW1wb3J0IHNwaW5hbENvcmUgZnJvbSBcInNwaW5hbC1jb3JlLWNvbm5lY3RvcmpzXCI7XG5pbXBvcnQgU3BpbmFsTm9kZSBmcm9tIFwiLi9Ob2Rlcy9TcGluYWxOb2RlXCI7XG5cbmNvbnN0IGdsb2JhbFR5cGUgPSB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogd2luZG93O1xuXG4vKipcbiAqIFdyYXBwZXIgb3ZlciBTcGluYWxOb2RlUG9pbnRlciBjb250YWluaW5nIHNvbWUgaW5mb3JtYXRpb24gYWJvdXQgdGhlIHBvaW50ZWQgZWxlbWVudFxuICovXG5jbGFzcyBTcGluYWxOb2RlUG9pbnRlciBleHRlbmRzIGdsb2JhbFR5cGUuTW9kZWwge1xuICAvKipcbiAgICogQ29uc3RydWN0b3IgZm9yIHRoZSBTcGluYWxOb2RlUG9pbnRlciBjbGFzcy5cbiAgICogQHBhcmFtIHtTcGluYWxOb2RlIHwgTW9kZWx9IGVsZW1lbnQgRWxlbWVudCB0byB3aWNoIHRoZSBTcGluYWxOb2RlUG9pbnRlciB3aWxsIHBvaW50XG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuYWRkX2F0dHIoe1xuICAgICAgcHRyOiBuZXcgZ2xvYmFsVHlwZS5QdHIoKSxcbiAgICAgIGluZm86IHt9XG4gICAgfSk7XG5cbiAgICBpZiAodHlwZW9mIGVsZW1lbnQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuc2V0RWxlbWVudChlbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBwb2ludGVyIHRvIHBvaW50IHRvIGFuIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZSB8IE1vZGVsfSBlbGVtZW50XG4gICAqL1xuICBzZXRFbGVtZW50KGVsZW1lbnQpIHtcbiAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIFNwaW5hbE5vZGUpIHtcbiAgICAgIHRoaXMuaW5mby5tb2RfYXR0cihcInBvaW50ZWRJZFwiLCBlbGVtZW50LmdldElkKCkpO1xuICAgICAgdGhpcy5pbmZvLm1vZF9hdHRyKFwicG9pbnRlZFR5cGVcIiwgZWxlbWVudC5nZXRUeXBlKCkpO1xuICAgIH1cbiAgICB0aGlzLnB0ci5zZXQoZWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogVW5zZXRzIHRoZSBwb2ludGVyLlxuICAgKi9cbiAgdW5zZXQoKSB7XG4gICAgdGhpcy5pbmZvLnJlbV9hdHRyKFwicG9pbnRlZElkXCIpO1xuICAgIHRoaXMuaW5mby5yZW1fYXR0cihcInBvaW50ZWRUeXBlXCIpO1xuICAgIHRoaXMucHRyLnNldCgwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBpZCBvZiB0aGUgcG9pbnRlZCBlbGVtZW50LlxuICAgKiBAcmV0dXJuIHtTdHJ9IElkIG9mIHRoZSBwb2ludGVkIGVsZW1lbnRcbiAgICovXG4gIGdldElkKCkge1xuICAgIHJldHVybiB0aGlzLmluZm8ucG9pbnRlZElkO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgdHlwZSBvZiB0aGUgcG9pbnRlZCBlbGVtZW50LlxuICAgKiBAcmV0dXJuIHtTdHJ9IFR5cGUgb2YgdGhlIHBvaW50ZWQgZWxlbWVudFxuICAgKi9cbiAgZ2V0VHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbmZvLnBvaW50ZWRUeXBlO1xuICB9XG59XG5cbnNwaW5hbENvcmUucmVnaXN0ZXJfbW9kZWxzKFtTcGluYWxOb2RlUG9pbnRlcl0pO1xuZXhwb3J0IGRlZmF1bHQgU3BpbmFsTm9kZVBvaW50ZXI7XG4iXX0=