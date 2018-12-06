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
   * 
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxOb2RlUG9pbnRlci5qcyJdLCJuYW1lcyI6WyJnbG9iYWxUeXBlIiwid2luZG93IiwiZ2xvYmFsIiwiU3BpbmFsTm9kZVBvaW50ZXIiLCJNb2RlbCIsImNvbnN0cnVjdG9yIiwiZWxlbWVudCIsImFkZF9hdHRyIiwicHRyIiwiUHRyIiwiaW5mbyIsInNldEVsZW1lbnQiLCJTcGluYWxOb2RlIiwibW9kX2F0dHIiLCJnZXRJZCIsImdldFR5cGUiLCJzZXQiLCJ1bnNldCIsInJlbV9hdHRyIiwicG9pbnRlZElkIiwicG9pbnRlZFR5cGUiLCJzcGluYWxDb3JlIiwicmVnaXN0ZXJfbW9kZWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBdUJBOztBQUNBOzs7O0FBeEJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxNQUFNQSxVQUFVLEdBQUcsT0FBT0MsTUFBUCxLQUFrQixXQUFsQixHQUFnQ0MsTUFBaEMsR0FBeUNELE1BQTVEO0FBRUE7Ozs7QUFHQSxNQUFNRSxpQkFBTixTQUFnQ0gsVUFBVSxDQUFDSSxLQUEzQyxDQUFpRDtBQUM3Qzs7OztBQUlBQyxFQUFBQSxXQUFXLENBQUNDLE9BQUQsRUFBVTtBQUNqQjtBQUVBLFNBQUtDLFFBQUwsQ0FBYztBQUNWQyxNQUFBQSxHQUFHLEVBQUUsSUFBSVIsVUFBVSxDQUFDUyxHQUFmLEVBREs7QUFFVkMsTUFBQUEsSUFBSSxFQUFFO0FBRkksS0FBZDs7QUFLQSxRQUFJLE9BQU9KLE9BQVAsS0FBbUIsV0FBdkIsRUFBb0M7QUFDaEMsV0FBS0ssVUFBTCxDQUFnQkwsT0FBaEI7QUFDSDtBQUNKO0FBRUQ7Ozs7OztBQUlBSyxFQUFBQSxVQUFVLENBQUNMLE9BQUQsRUFBVTtBQUNoQixRQUFJQSxPQUFPLFlBQVlNLG1CQUF2QixFQUFtQztBQUMvQixXQUFLRixJQUFMLENBQVVHLFFBQVYsQ0FBbUIsV0FBbkIsRUFBZ0NQLE9BQU8sQ0FBQ1EsS0FBUixFQUFoQztBQUNBLFdBQUtKLElBQUwsQ0FBVUcsUUFBVixDQUFtQixhQUFuQixFQUFrQ1AsT0FBTyxDQUFDUyxPQUFSLEVBQWxDO0FBQ0g7O0FBQ0QsU0FBS1AsR0FBTCxDQUFTUSxHQUFULENBQWFWLE9BQWI7QUFDSDtBQUVEOzs7OztBQUdBVyxFQUFBQSxLQUFLLEdBQUc7QUFDSixTQUFLUCxJQUFMLENBQVVRLFFBQVYsQ0FBbUIsV0FBbkI7QUFDQSxTQUFLUixJQUFMLENBQVVRLFFBQVYsQ0FBbUIsYUFBbkI7QUFDQSxTQUFLVixHQUFMLENBQVNRLEdBQVQsQ0FBYSxDQUFiO0FBQ0g7QUFFRDs7Ozs7O0FBSUFGLEVBQUFBLEtBQUssR0FBRztBQUNKLFdBQU8sS0FBS0osSUFBTCxDQUFVUyxTQUFqQjtBQUNIO0FBRUQ7Ozs7OztBQUlBSixFQUFBQSxPQUFPLEdBQUc7QUFDTixXQUFPLEtBQUtMLElBQUwsQ0FBVVUsV0FBakI7QUFDSDs7QUFyRDRDOztBQXdEakRDLCtCQUFXQyxlQUFYLENBQTJCLENBQUNuQixpQkFBRCxDQUEzQjs7ZUFDZUEsaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTggU3BpbmFsQ29tIC0gd3d3LnNwaW5hbGNvbS5jb21cbiAqIFxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgU3BpbmFsQ29yZS5cbiAqIFxuICogUGxlYXNlIHJlYWQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgdGVybXMgYW5kIGNvbmRpdGlvbnNcbiAqIG9mIHRoZSBGcmVlIFNvZnR3YXJlIGxpY2Vuc2UgQWdyZWVtZW50IChcIkFncmVlbWVudFwiKVxuICogY2FyZWZ1bGx5LlxuICogXG4gKiBUaGlzIEFncmVlbWVudCBpcyBhIGxlZ2FsbHkgYmluZGluZyBjb250cmFjdCBiZXR3ZWVuXG4gKiB0aGUgTGljZW5zZWUgKGFzIGRlZmluZWQgYmVsb3cpIGFuZCBTcGluYWxDb20gdGhhdFxuICogc2V0cyBmb3J0aCB0aGUgdGVybXMgYW5kIGNvbmRpdGlvbnMgdGhhdCBnb3Zlcm4geW91clxuICogdXNlIG9mIHRoZSBQcm9ncmFtLiBCeSBpbnN0YWxsaW5nIGFuZC9vciB1c2luZyB0aGVcbiAqIFByb2dyYW0sIHlvdSBhZ3JlZSB0byBhYmlkZSBieSBhbGwgdGhlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucyBzdGF0ZWQgb3IgcmVmZXJlbmNlZCBoZXJlaW4uXG4gKiBcbiAqIElmIHlvdSBkbyBub3QgYWdyZWUgdG8gYWJpZGUgYnkgdGhlc2UgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zLCBkbyBub3QgZGVtb25zdHJhdGUgeW91ciBhY2NlcHRhbmNlIGFuZCBkb1xuICogbm90IGluc3RhbGwgb3IgdXNlIHRoZSBQcm9ncmFtLlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbG9uZ1xuICogd2l0aCB0aGlzIGZpbGUuIElmIG5vdCwgc2VlXG4gKiA8aHR0cDovL3Jlc291cmNlcy5zcGluYWxjb20uY29tL2xpY2Vuc2VzLnBkZj4uXG4gKi9cbmltcG9ydCBzcGluYWxDb3JlIGZyb20gXCJzcGluYWwtY29yZS1jb25uZWN0b3Jqc1wiXG5pbXBvcnQgU3BpbmFsTm9kZSBmcm9tIFwiLi9Ob2Rlcy9TcGluYWxOb2RlXCI7XG5cbmNvbnN0IGdsb2JhbFR5cGUgPSB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogd2luZG93O1xuXG4vKipcbiAqIFdyYXBwZXIgb3ZlciBTcGluYWxOb2RlUG9pbnRlciBjb250YWluaW5nIHNvbWUgaW5mb3JtYXRpb24gYWJvdXQgdGhlIHBvaW50ZWQgZWxlbWVudFxuICovXG5jbGFzcyBTcGluYWxOb2RlUG9pbnRlciBleHRlbmRzIGdsb2JhbFR5cGUuTW9kZWwge1xuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3BpbmFsTm9kZSB8IE1vZGVsfSBlbGVtZW50IEVsZW1lbnQgdG8gd2ljaCB0aGUgU3BpbmFsTm9kZVBvaW50ZXIgd2lsbCBwb2ludFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLmFkZF9hdHRyKHtcbiAgICAgICAgICAgIHB0cjogbmV3IGdsb2JhbFR5cGUuUHRyKCksXG4gICAgICAgICAgICBpbmZvOiB7fVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodHlwZW9mIGVsZW1lbnQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgcG9pbnRlciB0byBwb2ludCB0byBhbiBlbGVtZW50LlxuICAgICAqIEBwYXJhbSB7U3BpbmFsTm9kZSB8IE1vZGVsfSBlbGVtZW50XG4gICAgICovXG4gICAgc2V0RWxlbWVudChlbGVtZW50KSB7XG4gICAgICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgU3BpbmFsTm9kZSkge1xuICAgICAgICAgICAgdGhpcy5pbmZvLm1vZF9hdHRyKFwicG9pbnRlZElkXCIsIGVsZW1lbnQuZ2V0SWQoKSk7XG4gICAgICAgICAgICB0aGlzLmluZm8ubW9kX2F0dHIoXCJwb2ludGVkVHlwZVwiLCBlbGVtZW50LmdldFR5cGUoKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wdHIuc2V0KGVsZW1lbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVuc2V0cyB0aGUgcG9pbnRlci5cbiAgICAgKi9cbiAgICB1bnNldCgpIHtcbiAgICAgICAgdGhpcy5pbmZvLnJlbV9hdHRyKFwicG9pbnRlZElkXCIpO1xuICAgICAgICB0aGlzLmluZm8ucmVtX2F0dHIoXCJwb2ludGVkVHlwZVwiKTtcbiAgICAgICAgdGhpcy5wdHIuc2V0KDApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGlkIG9mIHRoZSBwb2ludGVkIGVsZW1lbnQuXG4gICAgICogQHJldHVybiB7U3RyfSBJZCBvZiB0aGUgcG9pbnRlZCBlbGVtZW50XG4gICAgICovXG4gICAgZ2V0SWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmluZm8ucG9pbnRlZElkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgdHlwZSBvZiB0aGUgcG9pbnRlZCBlbGVtZW50LlxuICAgICAqIEByZXR1cm4ge1N0cn0gVHlwZSBvZiB0aGUgcG9pbnRlZCBlbGVtZW50XG4gICAgICovXG4gICAgZ2V0VHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5mby5wb2ludGVkVHlwZTtcbiAgICB9XG59XG5cbnNwaW5hbENvcmUucmVnaXN0ZXJfbW9kZWxzKFtTcGluYWxOb2RlUG9pbnRlcl0pO1xuZXhwb3J0IGRlZmF1bHQgU3BpbmFsTm9kZVBvaW50ZXJcbiJdfQ==