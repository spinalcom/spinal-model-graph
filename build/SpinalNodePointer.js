"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _spinalCoreConnectorjs_type = require("spinal-core-connectorjs_type");

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

/**
 * Wrapper over Ptr containing some information about the pointed element.
 * @extends Model
 */
class SpinalNodePointer extends _spinalCoreConnectorjs_type.Model {
  /**
   * Constructor for the SpinalNodePointer class.
   * @param {SpinalNode | Model} element Element to wich the SpinalNodePointer will point
   * @throws {TypeError} If the element is not a Model
   */
  constructor(element, blockRights = false) {
    super();
    this.add_attr({
      ptr: blockRights === true ? new globalType.Pbr() : new globalType.Ptr(),
      info: {}
    });

    if (typeof element !== "undefined") {
      this.setElement(element);
    }
  }
  /**
   * Sets pointer to point to an element.
   * @param {SpinalNode | Model} element Element to point to
   * @throws {TypeError} If the element is not a Model
   */


  setElement(element) {
    if (!(element instanceof _spinalCoreConnectorjs_type.Model)) {
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

_spinalCoreConnectorjs_type.spinalCore.register_models([SpinalNodePointer]);

var _default = SpinalNodePointer;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxOb2RlUG9pbnRlci5qcyJdLCJuYW1lcyI6WyJTcGluYWxOb2RlUG9pbnRlciIsIk1vZGVsIiwiY29uc3RydWN0b3IiLCJlbGVtZW50IiwiYmxvY2tSaWdodHMiLCJhZGRfYXR0ciIsInB0ciIsImdsb2JhbFR5cGUiLCJQYnIiLCJQdHIiLCJpbmZvIiwic2V0RWxlbWVudCIsIlR5cGVFcnJvciIsIlNwaW5hbE5vZGUiLCJCYXNlU3BpbmFsUmVsYXRpb24iLCJtb2RfYXR0ciIsImdldElkIiwiZ2V0VHlwZSIsInNldCIsImxvYWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInVuc2V0IiwicmVtX2F0dHIiLCJwb2ludGVkSWQiLCJwb2ludGVkVHlwZSIsInNwaW5hbENvcmUiLCJyZWdpc3Rlcl9tb2RlbHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUF3QkE7O0FBTUE7O0FBR0E7Ozs7QUFqQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1DQTs7OztBQUlBLE1BQU1BLGlCQUFOLFNBQWdDQyxpQ0FBaEMsQ0FBc0M7QUFDcEM7Ozs7O0FBS0FDLEVBQUFBLFdBQVcsQ0FBQ0MsT0FBRCxFQUFVQyxXQUFXLEdBQUcsS0FBeEIsRUFBK0I7QUFDeEM7QUFFQSxTQUFLQyxRQUFMLENBQWM7QUFDWkMsTUFBQUEsR0FBRyxFQUFFRixXQUFXLEtBQUssSUFBaEIsR0FBdUIsSUFBSUcsVUFBVSxDQUFDQyxHQUFmLEVBQXZCLEdBQThDLElBQUlELFVBQVUsQ0FBQ0UsR0FBZixFQUR2QztBQUVaQyxNQUFBQSxJQUFJLEVBQUU7QUFGTSxLQUFkOztBQUtBLFFBQUksT0FBT1AsT0FBUCxLQUFtQixXQUF2QixFQUFvQztBQUNsQyxXQUFLUSxVQUFMLENBQWdCUixPQUFoQjtBQUNEO0FBQ0Y7QUFFRDs7Ozs7OztBQUtBUSxFQUFBQSxVQUFVLENBQUNSLE9BQUQsRUFBVTtBQUNsQixRQUFJLEVBQUVBLE9BQU8sWUFBWUYsaUNBQXJCLENBQUosRUFBaUM7QUFDL0IsWUFBTVcsU0FBUyxDQUFDLG1DQUFELENBQWY7QUFDRDs7QUFFRCxRQUFJVCxPQUFPLFlBQVlVLGlCQUFuQixJQUFpQ1YsT0FBTyxZQUFZVywyQkFBeEQsRUFBNEU7QUFDMUUsV0FBS0osSUFBTCxDQUFVSyxRQUFWLENBQW1CLFdBQW5CLEVBQWdDWixPQUFPLENBQUNhLEtBQVIsRUFBaEM7QUFDQSxXQUFLTixJQUFMLENBQVVLLFFBQVYsQ0FBbUIsYUFBbkIsRUFBa0NaLE9BQU8sQ0FBQ2MsT0FBUixFQUFsQztBQUNEOztBQUVELFNBQUtYLEdBQUwsQ0FBU1ksR0FBVCxDQUFhZixPQUFiO0FBQ0Q7QUFFRDs7Ozs7O0FBSUFnQixFQUFBQSxJQUFJLEdBQUc7QUFDTCxXQUFPLElBQUlDLE9BQUosQ0FBWUMsT0FBTyxJQUFJO0FBQzVCLFdBQUtmLEdBQUwsQ0FBU2EsSUFBVCxDQUFjRSxPQUFkO0FBQ0QsS0FGTSxDQUFQO0FBR0Q7QUFFRDs7Ozs7QUFHQUMsRUFBQUEsS0FBSyxHQUFHO0FBQ04sU0FBS1osSUFBTCxDQUFVYSxRQUFWLENBQW1CLFdBQW5CO0FBQ0EsU0FBS2IsSUFBTCxDQUFVYSxRQUFWLENBQW1CLGFBQW5CO0FBQ0EsU0FBS2pCLEdBQUwsQ0FBU1ksR0FBVCxDQUFhLENBQWI7QUFDRDtBQUVEOzs7Ozs7QUFJQUYsRUFBQUEsS0FBSyxHQUFHO0FBQ04sV0FBTyxLQUFLTixJQUFMLENBQVVjLFNBQWpCO0FBQ0Q7QUFFRDs7Ozs7O0FBSUFQLEVBQUFBLE9BQU8sR0FBRztBQUNSLFdBQU8sS0FBS1AsSUFBTCxDQUFVZSxXQUFqQjtBQUNEOztBQXRFbUM7O0FBeUV0Q0MsdUNBQVdDLGVBQVgsQ0FBMkIsQ0FBQzNCLGlCQUFELENBQTNCOztlQUNlQSxpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOCBTcGluYWxDb20gLSB3d3cuc3BpbmFsY29tLmNvbVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFNwaW5hbENvcmUuXG4gKlxuICogUGxlYXNlIHJlYWQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgdGVybXMgYW5kIGNvbmRpdGlvbnNcbiAqIG9mIHRoZSBGcmVlIFNvZnR3YXJlIGxpY2Vuc2UgQWdyZWVtZW50IChcIkFncmVlbWVudFwiKVxuICogY2FyZWZ1bGx5LlxuICpcbiAqIFRoaXMgQWdyZWVtZW50IGlzIGEgbGVnYWxseSBiaW5kaW5nIGNvbnRyYWN0IGJldHdlZW5cbiAqIHRoZSBMaWNlbnNlZSAoYXMgZGVmaW5lZCBiZWxvdykgYW5kIFNwaW5hbENvbSB0aGF0XG4gKiBzZXRzIGZvcnRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyB0aGF0IGdvdmVybiB5b3VyXG4gKiB1c2Ugb2YgdGhlIFByb2dyYW0uIEJ5IGluc3RhbGxpbmcgYW5kL29yIHVzaW5nIHRoZVxuICogUHJvZ3JhbSwgeW91IGFncmVlIHRvIGFiaWRlIGJ5IGFsbCB0aGUgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zIHN0YXRlZCBvciByZWZlcmVuY2VkIGhlcmVpbi5cbiAqXG4gKiBJZiB5b3UgZG8gbm90IGFncmVlIHRvIGFiaWRlIGJ5IHRoZXNlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucywgZG8gbm90IGRlbW9uc3RyYXRlIHlvdXIgYWNjZXB0YW5jZSBhbmQgZG9cbiAqIG5vdCBpbnN0YWxsIG9yIHVzZSB0aGUgUHJvZ3JhbS5cbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYWxvbmdcbiAqIHdpdGggdGhpcyBmaWxlLiBJZiBub3QsIHNlZVxuICogPGh0dHA6Ly9yZXNvdXJjZXMuc3BpbmFsY29tLmNvbS9saWNlbnNlcy5wZGY+LlxuICovXG5cbmltcG9ydCB7XG4gIHNwaW5hbENvcmUsXG4gIE1vZGVsLFxuICBQdHJcbn0gZnJvbSBcInNwaW5hbC1jb3JlLWNvbm5lY3RvcmpzX3R5cGVcIjtcblxuaW1wb3J0IHtcbiAgU3BpbmFsTm9kZVxufSBmcm9tIFwiLi9pbmRleFwiO1xuaW1wb3J0IEJhc2VTcGluYWxSZWxhdGlvbiBmcm9tIFwiLi4vYnVpbGQvUmVsYXRpb25zL0Jhc2VTcGluYWxSZWxhdGlvblwiO1xuXG4vKipcbiAqIFdyYXBwZXIgb3ZlciBQdHIgY29udGFpbmluZyBzb21lIGluZm9ybWF0aW9uIGFib3V0IHRoZSBwb2ludGVkIGVsZW1lbnQuXG4gKiBAZXh0ZW5kcyBNb2RlbFxuICovXG5jbGFzcyBTcGluYWxOb2RlUG9pbnRlciBleHRlbmRzIE1vZGVsIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yIGZvciB0aGUgU3BpbmFsTm9kZVBvaW50ZXIgY2xhc3MuXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZSB8IE1vZGVsfSBlbGVtZW50IEVsZW1lbnQgdG8gd2ljaCB0aGUgU3BpbmFsTm9kZVBvaW50ZXIgd2lsbCBwb2ludFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBlbGVtZW50IGlzIG5vdCBhIE1vZGVsXG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBibG9ja1JpZ2h0cyA9IGZhbHNlKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuYWRkX2F0dHIoe1xuICAgICAgcHRyOiBibG9ja1JpZ2h0cyA9PT0gdHJ1ZSA/IG5ldyBnbG9iYWxUeXBlLlBicigpIDogbmV3IGdsb2JhbFR5cGUuUHRyKCksXG4gICAgICBpbmZvOiB7fVxuICAgIH0pO1xuXG4gICAgaWYgKHR5cGVvZiBlbGVtZW50ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLnNldEVsZW1lbnQoZWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgcG9pbnRlciB0byBwb2ludCB0byBhbiBlbGVtZW50LlxuICAgKiBAcGFyYW0ge1NwaW5hbE5vZGUgfCBNb2RlbH0gZWxlbWVudCBFbGVtZW50IHRvIHBvaW50IHRvXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIGVsZW1lbnQgaXMgbm90IGEgTW9kZWxcbiAgICovXG4gIHNldEVsZW1lbnQoZWxlbWVudCkge1xuICAgIGlmICghKGVsZW1lbnQgaW5zdGFuY2VvZiBNb2RlbCkpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcIlRoZSBwb2ludGVkIHZhbHVlIG11c3QgYmUgYSBNb2RlbFwiKTtcbiAgICB9XG5cbiAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIFNwaW5hbE5vZGUgfHwgZWxlbWVudCBpbnN0YW5jZW9mIEJhc2VTcGluYWxSZWxhdGlvbikge1xuICAgICAgdGhpcy5pbmZvLm1vZF9hdHRyKFwicG9pbnRlZElkXCIsIGVsZW1lbnQuZ2V0SWQoKSk7XG4gICAgICB0aGlzLmluZm8ubW9kX2F0dHIoXCJwb2ludGVkVHlwZVwiLCBlbGVtZW50LmdldFR5cGUoKSk7XG4gICAgfVxuXG4gICAgdGhpcy5wdHIuc2V0KGVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWRzIHRoZSBtb2RlbCB0byB3aGljaCB0aGUgcG9pbnRlciBpcyBwb2ludGluZy5cbiAgICogQHJldHVybnMge01vZGVsfSBUaGUgbW9kZWwgdG8gd2hpY2ggdGhlIHBvaW50ZXIgaXMgcG9pbnRpbmdcbiAgICovXG4gIGxvYWQoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy5wdHIubG9hZChyZXNvbHZlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVbnNldHMgdGhlIHBvaW50ZXIuIFRoZSBwb2ludGVyIHNob3VsZG4ndCBiZSB1c2VkIGFmdGVyIHRoYXQuXG4gICAqL1xuICB1bnNldCgpIHtcbiAgICB0aGlzLmluZm8ucmVtX2F0dHIoXCJwb2ludGVkSWRcIik7XG4gICAgdGhpcy5pbmZvLnJlbV9hdHRyKFwicG9pbnRlZFR5cGVcIik7XG4gICAgdGhpcy5wdHIuc2V0KDApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGlkIG9mIHRoZSBwb2ludGVkIGVsZW1lbnQuXG4gICAqIEByZXR1cm5zIHtTdHJ9IElkIG9mIHRoZSBwb2ludGVkIGVsZW1lbnRcbiAgICovXG4gIGdldElkKCkge1xuICAgIHJldHVybiB0aGlzLmluZm8ucG9pbnRlZElkO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgdHlwZSBvZiB0aGUgcG9pbnRlZCBlbGVtZW50LlxuICAgKiBAcmV0dXJucyB7U3RyfSBUeXBlIG9mIHRoZSBwb2ludGVkIGVsZW1lbnRcbiAgICovXG4gIGdldFR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5mby5wb2ludGVkVHlwZTtcbiAgfVxufVxuXG5zcGluYWxDb3JlLnJlZ2lzdGVyX21vZGVscyhbU3BpbmFsTm9kZVBvaW50ZXJdKTtcbmV4cG9ydCBkZWZhdWx0IFNwaW5hbE5vZGVQb2ludGVyO1xuIl19