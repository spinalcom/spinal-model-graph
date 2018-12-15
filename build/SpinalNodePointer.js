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
    this.setElement(element);
  }
  /**
   * Sets pointer to point to an element.
   * @param {SpinalNode | Model} element
   * @throws {Error} If the element is not a Model
   */


  setElement(element) {
    if (!(element instanceof globalType.Model)) {
      console.log("element: ", element);
      throw Error("The pointed value must be a Model");
    }

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
    return new Promise(resolve => {
      this.ptr.load(resolve);
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxOb2RlUG9pbnRlci5qcyJdLCJuYW1lcyI6WyJnbG9iYWxUeXBlIiwid2luZG93IiwiZ2xvYmFsIiwiU3BpbmFsTm9kZVBvaW50ZXIiLCJNb2RlbCIsImNvbnN0cnVjdG9yIiwiZWxlbWVudCIsImFkZF9hdHRyIiwicHRyIiwiUHRyIiwiaW5mbyIsInNldEVsZW1lbnQiLCJjb25zb2xlIiwibG9nIiwiRXJyb3IiLCJTcGluYWxOb2RlIiwibW9kX2F0dHIiLCJnZXRJZCIsImdldFR5cGUiLCJzZXQiLCJsb2FkIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ1bnNldCIsInJlbV9hdHRyIiwicG9pbnRlZElkIiwicG9pbnRlZFR5cGUiLCJzcGluYWxDb3JlIiwicmVnaXN0ZXJfbW9kZWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBd0JBOztBQUNBOzs7O0FBekJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJCQSxNQUFNQSxVQUFVLEdBQUcsT0FBT0MsTUFBUCxLQUFrQixXQUFsQixHQUFnQ0MsTUFBaEMsR0FBeUNELE1BQTVEO0FBRUE7Ozs7QUFHQSxNQUFNRSxpQkFBTixTQUFnQ0gsVUFBVSxDQUFDSSxLQUEzQyxDQUFpRDtBQUMvQzs7OztBQUlBQyxFQUFBQSxXQUFXLENBQUNDLE9BQUQsRUFBVTtBQUNuQjtBQUVBLFNBQUtDLFFBQUwsQ0FBYztBQUNaQyxNQUFBQSxHQUFHLEVBQUUsSUFBSVIsVUFBVSxDQUFDUyxHQUFmLEVBRE87QUFFWkMsTUFBQUEsSUFBSSxFQUFFO0FBRk0sS0FBZDtBQUtBLFNBQUtDLFVBQUwsQ0FBZ0JMLE9BQWhCO0FBQ0Q7QUFFRDs7Ozs7OztBQUtBSyxFQUFBQSxVQUFVLENBQUNMLE9BQUQsRUFBVTtBQUNsQixRQUFJLEVBQUVBLE9BQU8sWUFBWU4sVUFBVSxDQUFDSSxLQUFoQyxDQUFKLEVBQTRDO0FBQzFDUSxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxXQUFaLEVBQXlCUCxPQUF6QjtBQUNBLFlBQU1RLEtBQUssQ0FBQyxtQ0FBRCxDQUFYO0FBQ0Q7O0FBRUQsUUFBSVIsT0FBTyxZQUFZUyxtQkFBdkIsRUFBbUM7QUFDakMsV0FBS0wsSUFBTCxDQUFVTSxRQUFWLENBQW1CLFdBQW5CLEVBQWdDVixPQUFPLENBQUNXLEtBQVIsRUFBaEM7QUFDQSxXQUFLUCxJQUFMLENBQVVNLFFBQVYsQ0FBbUIsYUFBbkIsRUFBa0NWLE9BQU8sQ0FBQ1ksT0FBUixFQUFsQztBQUNEOztBQUVELFNBQUtWLEdBQUwsQ0FBU1csR0FBVCxDQUFhYixPQUFiO0FBQ0Q7QUFFRDs7Ozs7O0FBSUFjLEVBQUFBLElBQUksR0FBRztBQUNMLFdBQU8sSUFBSUMsT0FBSixDQUFZQyxPQUFPLElBQUk7QUFDNUIsV0FBS2QsR0FBTCxDQUFTWSxJQUFULENBQWNFLE9BQWQ7QUFDRCxLQUZNLENBQVA7QUFHRDtBQUVEOzs7OztBQUdBQyxFQUFBQSxLQUFLLEdBQUc7QUFDTixTQUFLYixJQUFMLENBQVVjLFFBQVYsQ0FBbUIsV0FBbkI7QUFDQSxTQUFLZCxJQUFMLENBQVVjLFFBQVYsQ0FBbUIsYUFBbkI7QUFDQSxTQUFLaEIsR0FBTCxDQUFTVyxHQUFULENBQWEsQ0FBYjtBQUNEO0FBRUQ7Ozs7OztBQUlBRixFQUFBQSxLQUFLLEdBQUc7QUFDTixXQUFPLEtBQUtQLElBQUwsQ0FBVWUsU0FBakI7QUFDRDtBQUVEOzs7Ozs7QUFJQVAsRUFBQUEsT0FBTyxHQUFHO0FBQ1IsV0FBTyxLQUFLUixJQUFMLENBQVVnQixXQUFqQjtBQUNEOztBQXBFOEM7O0FBdUVqREMsK0JBQVdDLGVBQVgsQ0FBMkIsQ0FBQ3pCLGlCQUFELENBQTNCOztlQUNlQSxpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOCBTcGluYWxDb20gLSB3d3cuc3BpbmFsY29tLmNvbVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFNwaW5hbENvcmUuXG4gKlxuICogUGxlYXNlIHJlYWQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgdGVybXMgYW5kIGNvbmRpdGlvbnNcbiAqIG9mIHRoZSBGcmVlIFNvZnR3YXJlIGxpY2Vuc2UgQWdyZWVtZW50IChcIkFncmVlbWVudFwiKVxuICogY2FyZWZ1bGx5LlxuICpcbiAqIFRoaXMgQWdyZWVtZW50IGlzIGEgbGVnYWxseSBiaW5kaW5nIGNvbnRyYWN0IGJldHdlZW5cbiAqIHRoZSBMaWNlbnNlZSAoYXMgZGVmaW5lZCBiZWxvdykgYW5kIFNwaW5hbENvbSB0aGF0XG4gKiBzZXRzIGZvcnRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyB0aGF0IGdvdmVybiB5b3VyXG4gKiB1c2Ugb2YgdGhlIFByb2dyYW0uIEJ5IGluc3RhbGxpbmcgYW5kL29yIHVzaW5nIHRoZVxuICogUHJvZ3JhbSwgeW91IGFncmVlIHRvIGFiaWRlIGJ5IGFsbCB0aGUgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zIHN0YXRlZCBvciByZWZlcmVuY2VkIGhlcmVpbi5cbiAqXG4gKiBJZiB5b3UgZG8gbm90IGFncmVlIHRvIGFiaWRlIGJ5IHRoZXNlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucywgZG8gbm90IGRlbW9uc3RyYXRlIHlvdXIgYWNjZXB0YW5jZSBhbmQgZG9cbiAqIG5vdCBpbnN0YWxsIG9yIHVzZSB0aGUgUHJvZ3JhbS5cbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYWxvbmdcbiAqIHdpdGggdGhpcyBmaWxlLiBJZiBub3QsIHNlZVxuICogPGh0dHA6Ly9yZXNvdXJjZXMuc3BpbmFsY29tLmNvbS9saWNlbnNlcy5wZGY+LlxuICovXG5cbmltcG9ydCBzcGluYWxDb3JlIGZyb20gXCJzcGluYWwtY29yZS1jb25uZWN0b3Jqc1wiO1xuaW1wb3J0IFNwaW5hbE5vZGUgZnJvbSBcIi4vTm9kZXMvU3BpbmFsTm9kZVwiO1xuXG5jb25zdCBnbG9iYWxUeXBlID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHdpbmRvdztcblxuLyoqXG4gKiBXcmFwcGVyIG92ZXIgU3BpbmFsTm9kZVBvaW50ZXIgY29udGFpbmluZyBzb21lIGluZm9ybWF0aW9uIGFib3V0IHRoZSBwb2ludGVkIGVsZW1lbnRcbiAqL1xuY2xhc3MgU3BpbmFsTm9kZVBvaW50ZXIgZXh0ZW5kcyBnbG9iYWxUeXBlLk1vZGVsIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yIGZvciB0aGUgU3BpbmFsTm9kZVBvaW50ZXIgY2xhc3MuXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZSB8IE1vZGVsfSBlbGVtZW50IEVsZW1lbnQgdG8gd2ljaCB0aGUgU3BpbmFsTm9kZVBvaW50ZXIgd2lsbCBwb2ludFxuICAgKi9cbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmFkZF9hdHRyKHtcbiAgICAgIHB0cjogbmV3IGdsb2JhbFR5cGUuUHRyKCksXG4gICAgICBpbmZvOiB7fVxuICAgIH0pO1xuXG4gICAgdGhpcy5zZXRFbGVtZW50KGVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgcG9pbnRlciB0byBwb2ludCB0byBhbiBlbGVtZW50LlxuICAgKiBAcGFyYW0ge1NwaW5hbE5vZGUgfCBNb2RlbH0gZWxlbWVudFxuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIGVsZW1lbnQgaXMgbm90IGEgTW9kZWxcbiAgICovXG4gIHNldEVsZW1lbnQoZWxlbWVudCkge1xuICAgIGlmICghKGVsZW1lbnQgaW5zdGFuY2VvZiBnbG9iYWxUeXBlLk1vZGVsKSkge1xuICAgICAgY29uc29sZS5sb2coXCJlbGVtZW50OiBcIiwgZWxlbWVudCk7XG4gICAgICB0aHJvdyBFcnJvcihcIlRoZSBwb2ludGVkIHZhbHVlIG11c3QgYmUgYSBNb2RlbFwiKTtcbiAgICB9XG5cbiAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIFNwaW5hbE5vZGUpIHtcbiAgICAgIHRoaXMuaW5mby5tb2RfYXR0cihcInBvaW50ZWRJZFwiLCBlbGVtZW50LmdldElkKCkpO1xuICAgICAgdGhpcy5pbmZvLm1vZF9hdHRyKFwicG9pbnRlZFR5cGVcIiwgZWxlbWVudC5nZXRUeXBlKCkpO1xuICAgIH1cblxuICAgIHRoaXMucHRyLnNldChlbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkcyB0aGUgbW9kZWwgdG8gd2hpY2ggdGhlIHBvaW50ZXIgaXMgcG9pbnRpbmcuXG4gICAqIEByZXR1cm5zIHtNb2RlbH0gVGhlIG1vZGVsIHRvIHdoaWNoIHRoZSBwb2ludGVyIGlzIHBvaW50aW5nXG4gICAqL1xuICBsb2FkKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHRoaXMucHRyLmxvYWQocmVzb2x2ZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVW5zZXRzIHRoZSBwb2ludGVyLlxuICAgKi9cbiAgdW5zZXQoKSB7XG4gICAgdGhpcy5pbmZvLnJlbV9hdHRyKFwicG9pbnRlZElkXCIpO1xuICAgIHRoaXMuaW5mby5yZW1fYXR0cihcInBvaW50ZWRUeXBlXCIpO1xuICAgIHRoaXMucHRyLnNldCgwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBpZCBvZiB0aGUgcG9pbnRlZCBlbGVtZW50LlxuICAgKiBAcmV0dXJucyB7U3RyfSBJZCBvZiB0aGUgcG9pbnRlZCBlbGVtZW50XG4gICAqL1xuICBnZXRJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5pbmZvLnBvaW50ZWRJZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIHR5cGUgb2YgdGhlIHBvaW50ZWQgZWxlbWVudC5cbiAgICogQHJldHVybnMge1N0cn0gVHlwZSBvZiB0aGUgcG9pbnRlZCBlbGVtZW50XG4gICAqL1xuICBnZXRUeXBlKCkge1xuICAgIHJldHVybiB0aGlzLmluZm8ucG9pbnRlZFR5cGU7XG4gIH1cbn1cblxuc3BpbmFsQ29yZS5yZWdpc3Rlcl9tb2RlbHMoW1NwaW5hbE5vZGVQb2ludGVyXSk7XG5leHBvcnQgZGVmYXVsdCBTcGluYWxOb2RlUG9pbnRlcjtcbiJdfQ==