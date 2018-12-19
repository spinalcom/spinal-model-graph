"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _spinalCoreConnectorjs = _interopRequireDefault(require("spinal-core-connectorjs"));

var _index = require("./index");

var _BaseSpinalRelation = _interopRequireDefault(require("../build/Relations/BaseSpinalRelation"));

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
   * @throws {TypeError} If the element is not a Model
   */
  constructor(element) {
    super();
    this.add_attr({
      ptr: new globalType.Ptr(),
      info: {}
    });
    this.setElement(element);
  }
  /**
   * Sets pointer to point to an element.
   * @param {SpinalNode | Model} element
   * @throws {TypeError} If the element is not a Model
   */


  setElement(element) {
    if (!(element instanceof globalType.Model)) {
      throw TypeError("The pointed value must be a Model");
    }

    if (element instanceof _index.SpinalNode || element instanceof _BaseSpinalRelation.default) {
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
    return new Promise(resolve => {
      this.ptr.load(resolve);
    });
  }
  /**
   * Unsets the pointer. The pointer shouldn't be used after that.
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxOb2RlUG9pbnRlci5qcyJdLCJuYW1lcyI6WyJnbG9iYWxUeXBlIiwid2luZG93IiwiZ2xvYmFsIiwiU3BpbmFsTm9kZVBvaW50ZXIiLCJNb2RlbCIsImNvbnN0cnVjdG9yIiwiZWxlbWVudCIsImFkZF9hdHRyIiwicHRyIiwiUHRyIiwiaW5mbyIsInNldEVsZW1lbnQiLCJUeXBlRXJyb3IiLCJTcGluYWxOb2RlIiwiQmFzZVNwaW5hbFJlbGF0aW9uIiwibW9kX2F0dHIiLCJnZXRJZCIsImdldFR5cGUiLCJzZXQiLCJsb2FkIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ1bnNldCIsInJlbV9hdHRyIiwicG9pbnRlZElkIiwicG9pbnRlZFR5cGUiLCJzcGluYWxDb3JlIiwicmVnaXN0ZXJfbW9kZWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBd0JBOztBQUNBOztBQUdBOzs7O0FBNUJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQThCQSxNQUFNQSxVQUFVLEdBQUcsT0FBT0MsTUFBUCxLQUFrQixXQUFsQixHQUFnQ0MsTUFBaEMsR0FBeUNELE1BQTVEO0FBRUE7Ozs7QUFHQSxNQUFNRSxpQkFBTixTQUFnQ0gsVUFBVSxDQUFDSSxLQUEzQyxDQUFpRDtBQUMvQzs7Ozs7QUFLQUMsRUFBQUEsV0FBVyxDQUFDQyxPQUFELEVBQVU7QUFDbkI7QUFFQSxTQUFLQyxRQUFMLENBQWM7QUFDWkMsTUFBQUEsR0FBRyxFQUFFLElBQUlSLFVBQVUsQ0FBQ1MsR0FBZixFQURPO0FBRVpDLE1BQUFBLElBQUksRUFBRTtBQUZNLEtBQWQ7QUFLQSxTQUFLQyxVQUFMLENBQWdCTCxPQUFoQjtBQUNEO0FBRUQ7Ozs7Ozs7QUFLQUssRUFBQUEsVUFBVSxDQUFDTCxPQUFELEVBQVU7QUFDbEIsUUFBSSxFQUFFQSxPQUFPLFlBQVlOLFVBQVUsQ0FBQ0ksS0FBaEMsQ0FBSixFQUE0QztBQUMxQyxZQUFNUSxTQUFTLENBQUMsbUNBQUQsQ0FBZjtBQUNEOztBQUVELFFBQUlOLE9BQU8sWUFBWU8saUJBQW5CLElBQWlDUCxPQUFPLFlBQVlRLDJCQUF4RCxFQUE0RTtBQUMxRSxXQUFLSixJQUFMLENBQVVLLFFBQVYsQ0FBbUIsV0FBbkIsRUFBZ0NULE9BQU8sQ0FBQ1UsS0FBUixFQUFoQztBQUNBLFdBQUtOLElBQUwsQ0FBVUssUUFBVixDQUFtQixhQUFuQixFQUFrQ1QsT0FBTyxDQUFDVyxPQUFSLEVBQWxDO0FBQ0Q7O0FBRUQsU0FBS1QsR0FBTCxDQUFTVSxHQUFULENBQWFaLE9BQWI7QUFDRDtBQUVEOzs7Ozs7QUFJQWEsRUFBQUEsSUFBSSxHQUFHO0FBQ0wsV0FBTyxJQUFJQyxPQUFKLENBQVlDLE9BQU8sSUFBSTtBQUM1QixXQUFLYixHQUFMLENBQVNXLElBQVQsQ0FBY0UsT0FBZDtBQUNELEtBRk0sQ0FBUDtBQUdEO0FBRUQ7Ozs7O0FBR0FDLEVBQUFBLEtBQUssR0FBRztBQUNOLFNBQUtaLElBQUwsQ0FBVWEsUUFBVixDQUFtQixXQUFuQjtBQUNBLFNBQUtiLElBQUwsQ0FBVWEsUUFBVixDQUFtQixhQUFuQjtBQUNBLFNBQUtmLEdBQUwsQ0FBU1UsR0FBVCxDQUFhLENBQWI7QUFDRDtBQUVEOzs7Ozs7QUFJQUYsRUFBQUEsS0FBSyxHQUFHO0FBQ04sV0FBTyxLQUFLTixJQUFMLENBQVVjLFNBQWpCO0FBQ0Q7QUFFRDs7Ozs7O0FBSUFQLEVBQUFBLE9BQU8sR0FBRztBQUNSLFdBQU8sS0FBS1AsSUFBTCxDQUFVZSxXQUFqQjtBQUNEOztBQXBFOEM7O0FBdUVqREMsK0JBQVdDLGVBQVgsQ0FBMkIsQ0FBQ3hCLGlCQUFELENBQTNCOztlQUNlQSxpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOCBTcGluYWxDb20gLSB3d3cuc3BpbmFsY29tLmNvbVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFNwaW5hbENvcmUuXG4gKlxuICogUGxlYXNlIHJlYWQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgdGVybXMgYW5kIGNvbmRpdGlvbnNcbiAqIG9mIHRoZSBGcmVlIFNvZnR3YXJlIGxpY2Vuc2UgQWdyZWVtZW50IChcIkFncmVlbWVudFwiKVxuICogY2FyZWZ1bGx5LlxuICpcbiAqIFRoaXMgQWdyZWVtZW50IGlzIGEgbGVnYWxseSBiaW5kaW5nIGNvbnRyYWN0IGJldHdlZW5cbiAqIHRoZSBMaWNlbnNlZSAoYXMgZGVmaW5lZCBiZWxvdykgYW5kIFNwaW5hbENvbSB0aGF0XG4gKiBzZXRzIGZvcnRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyB0aGF0IGdvdmVybiB5b3VyXG4gKiB1c2Ugb2YgdGhlIFByb2dyYW0uIEJ5IGluc3RhbGxpbmcgYW5kL29yIHVzaW5nIHRoZVxuICogUHJvZ3JhbSwgeW91IGFncmVlIHRvIGFiaWRlIGJ5IGFsbCB0aGUgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zIHN0YXRlZCBvciByZWZlcmVuY2VkIGhlcmVpbi5cbiAqXG4gKiBJZiB5b3UgZG8gbm90IGFncmVlIHRvIGFiaWRlIGJ5IHRoZXNlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucywgZG8gbm90IGRlbW9uc3RyYXRlIHlvdXIgYWNjZXB0YW5jZSBhbmQgZG9cbiAqIG5vdCBpbnN0YWxsIG9yIHVzZSB0aGUgUHJvZ3JhbS5cbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYWxvbmdcbiAqIHdpdGggdGhpcyBmaWxlLiBJZiBub3QsIHNlZVxuICogPGh0dHA6Ly9yZXNvdXJjZXMuc3BpbmFsY29tLmNvbS9saWNlbnNlcy5wZGY+LlxuICovXG5cbmltcG9ydCBzcGluYWxDb3JlIGZyb20gXCJzcGluYWwtY29yZS1jb25uZWN0b3Jqc1wiO1xuaW1wb3J0IHtcbiAgU3BpbmFsTm9kZVxufSBmcm9tIFwiLi9pbmRleFwiO1xuaW1wb3J0IEJhc2VTcGluYWxSZWxhdGlvbiBmcm9tIFwiLi4vYnVpbGQvUmVsYXRpb25zL0Jhc2VTcGluYWxSZWxhdGlvblwiO1xuXG5jb25zdCBnbG9iYWxUeXBlID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHdpbmRvdztcblxuLyoqXG4gKiBXcmFwcGVyIG92ZXIgU3BpbmFsTm9kZVBvaW50ZXIgY29udGFpbmluZyBzb21lIGluZm9ybWF0aW9uIGFib3V0IHRoZSBwb2ludGVkIGVsZW1lbnRcbiAqL1xuY2xhc3MgU3BpbmFsTm9kZVBvaW50ZXIgZXh0ZW5kcyBnbG9iYWxUeXBlLk1vZGVsIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yIGZvciB0aGUgU3BpbmFsTm9kZVBvaW50ZXIgY2xhc3MuXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZSB8IE1vZGVsfSBlbGVtZW50IEVsZW1lbnQgdG8gd2ljaCB0aGUgU3BpbmFsTm9kZVBvaW50ZXIgd2lsbCBwb2ludFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBlbGVtZW50IGlzIG5vdCBhIE1vZGVsXG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuYWRkX2F0dHIoe1xuICAgICAgcHRyOiBuZXcgZ2xvYmFsVHlwZS5QdHIoKSxcbiAgICAgIGluZm86IHt9XG4gICAgfSk7XG5cbiAgICB0aGlzLnNldEVsZW1lbnQoZWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBwb2ludGVyIHRvIHBvaW50IHRvIGFuIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZSB8IE1vZGVsfSBlbGVtZW50XG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIGVsZW1lbnQgaXMgbm90IGEgTW9kZWxcbiAgICovXG4gIHNldEVsZW1lbnQoZWxlbWVudCkge1xuICAgIGlmICghKGVsZW1lbnQgaW5zdGFuY2VvZiBnbG9iYWxUeXBlLk1vZGVsKSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwiVGhlIHBvaW50ZWQgdmFsdWUgbXVzdCBiZSBhIE1vZGVsXCIpO1xuICAgIH1cblxuICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgU3BpbmFsTm9kZSB8fCBlbGVtZW50IGluc3RhbmNlb2YgQmFzZVNwaW5hbFJlbGF0aW9uKSB7XG4gICAgICB0aGlzLmluZm8ubW9kX2F0dHIoXCJwb2ludGVkSWRcIiwgZWxlbWVudC5nZXRJZCgpKTtcbiAgICAgIHRoaXMuaW5mby5tb2RfYXR0cihcInBvaW50ZWRUeXBlXCIsIGVsZW1lbnQuZ2V0VHlwZSgpKTtcbiAgICB9XG5cbiAgICB0aGlzLnB0ci5zZXQoZWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogTG9hZHMgdGhlIG1vZGVsIHRvIHdoaWNoIHRoZSBwb2ludGVyIGlzIHBvaW50aW5nLlxuICAgKiBAcmV0dXJucyB7TW9kZWx9IFRoZSBtb2RlbCB0byB3aGljaCB0aGUgcG9pbnRlciBpcyBwb2ludGluZ1xuICAgKi9cbiAgbG9hZCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLnB0ci5sb2FkKHJlc29sdmUpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVuc2V0cyB0aGUgcG9pbnRlci4gVGhlIHBvaW50ZXIgc2hvdWxkbid0IGJlIHVzZWQgYWZ0ZXIgdGhhdC5cbiAgICovXG4gIHVuc2V0KCkge1xuICAgIHRoaXMuaW5mby5yZW1fYXR0cihcInBvaW50ZWRJZFwiKTtcbiAgICB0aGlzLmluZm8ucmVtX2F0dHIoXCJwb2ludGVkVHlwZVwiKTtcbiAgICB0aGlzLnB0ci5zZXQoMCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaWQgb2YgdGhlIHBvaW50ZWQgZWxlbWVudC5cbiAgICogQHJldHVybnMge1N0cn0gSWQgb2YgdGhlIHBvaW50ZWQgZWxlbWVudFxuICAgKi9cbiAgZ2V0SWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5mby5wb2ludGVkSWQ7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSB0eXBlIG9mIHRoZSBwb2ludGVkIGVsZW1lbnQuXG4gICAqIEByZXR1cm5zIHtTdHJ9IFR5cGUgb2YgdGhlIHBvaW50ZWQgZWxlbWVudFxuICAgKi9cbiAgZ2V0VHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbmZvLnBvaW50ZWRUeXBlO1xuICB9XG59XG5cbnNwaW5hbENvcmUucmVnaXN0ZXJfbW9kZWxzKFtTcGluYWxOb2RlUG9pbnRlcl0pO1xuZXhwb3J0IGRlZmF1bHQgU3BpbmFsTm9kZVBvaW50ZXI7XG4iXX0=