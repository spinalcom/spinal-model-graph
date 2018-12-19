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
  constructor(element) {
    super();
    this.add_attr({
      ptr: new _spinalCoreConnectorjs_type.Ptr(),
      info: {}
    });
    this.setElement(element);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxOb2RlUG9pbnRlci5qcyJdLCJuYW1lcyI6WyJTcGluYWxOb2RlUG9pbnRlciIsIk1vZGVsIiwiY29uc3RydWN0b3IiLCJlbGVtZW50IiwiYWRkX2F0dHIiLCJwdHIiLCJQdHIiLCJpbmZvIiwic2V0RWxlbWVudCIsIlR5cGVFcnJvciIsIlNwaW5hbE5vZGUiLCJCYXNlU3BpbmFsUmVsYXRpb24iLCJtb2RfYXR0ciIsImdldElkIiwiZ2V0VHlwZSIsInNldCIsImxvYWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInVuc2V0IiwicmVtX2F0dHIiLCJwb2ludGVkSWQiLCJwb2ludGVkVHlwZSIsInNwaW5hbENvcmUiLCJyZWdpc3Rlcl9tb2RlbHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUF3QkE7O0FBTUE7O0FBR0E7Ozs7QUFqQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1DQTs7OztBQUlBLE1BQU1BLGlCQUFOLFNBQWdDQyxpQ0FBaEMsQ0FBc0M7QUFDcEM7Ozs7O0FBS0FDLEVBQUFBLFdBQVcsQ0FBQ0MsT0FBRCxFQUFVO0FBQ25CO0FBRUEsU0FBS0MsUUFBTCxDQUFjO0FBQ1pDLE1BQUFBLEdBQUcsRUFBRSxJQUFJQywrQkFBSixFQURPO0FBRVpDLE1BQUFBLElBQUksRUFBRTtBQUZNLEtBQWQ7QUFLQSxTQUFLQyxVQUFMLENBQWdCTCxPQUFoQjtBQUNEO0FBRUQ7Ozs7Ozs7QUFLQUssRUFBQUEsVUFBVSxDQUFDTCxPQUFELEVBQVU7QUFDbEIsUUFBSSxFQUFFQSxPQUFPLFlBQVlGLGlDQUFyQixDQUFKLEVBQWlDO0FBQy9CLFlBQU1RLFNBQVMsQ0FBQyxtQ0FBRCxDQUFmO0FBQ0Q7O0FBRUQsUUFBSU4sT0FBTyxZQUFZTyxpQkFBbkIsSUFBaUNQLE9BQU8sWUFBWVEsMkJBQXhELEVBQTRFO0FBQzFFLFdBQUtKLElBQUwsQ0FBVUssUUFBVixDQUFtQixXQUFuQixFQUFnQ1QsT0FBTyxDQUFDVSxLQUFSLEVBQWhDO0FBQ0EsV0FBS04sSUFBTCxDQUFVSyxRQUFWLENBQW1CLGFBQW5CLEVBQWtDVCxPQUFPLENBQUNXLE9BQVIsRUFBbEM7QUFDRDs7QUFFRCxTQUFLVCxHQUFMLENBQVNVLEdBQVQsQ0FBYVosT0FBYjtBQUNEO0FBRUQ7Ozs7OztBQUlBYSxFQUFBQSxJQUFJLEdBQUc7QUFDTCxXQUFPLElBQUlDLE9BQUosQ0FBWUMsT0FBTyxJQUFJO0FBQzVCLFdBQUtiLEdBQUwsQ0FBU1csSUFBVCxDQUFjRSxPQUFkO0FBQ0QsS0FGTSxDQUFQO0FBR0Q7QUFFRDs7Ozs7QUFHQUMsRUFBQUEsS0FBSyxHQUFHO0FBQ04sU0FBS1osSUFBTCxDQUFVYSxRQUFWLENBQW1CLFdBQW5CO0FBQ0EsU0FBS2IsSUFBTCxDQUFVYSxRQUFWLENBQW1CLGFBQW5CO0FBQ0EsU0FBS2YsR0FBTCxDQUFTVSxHQUFULENBQWEsQ0FBYjtBQUNEO0FBRUQ7Ozs7OztBQUlBRixFQUFBQSxLQUFLLEdBQUc7QUFDTixXQUFPLEtBQUtOLElBQUwsQ0FBVWMsU0FBakI7QUFDRDtBQUVEOzs7Ozs7QUFJQVAsRUFBQUEsT0FBTyxHQUFHO0FBQ1IsV0FBTyxLQUFLUCxJQUFMLENBQVVlLFdBQWpCO0FBQ0Q7O0FBcEVtQzs7QUF1RXRDQyx1Q0FBV0MsZUFBWCxDQUEyQixDQUFDeEIsaUJBQUQsQ0FBM0I7O2VBQ2VBLGlCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4IFNwaW5hbENvbSAtIHd3dy5zcGluYWxjb20uY29tXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgU3BpbmFsQ29yZS5cbiAqXG4gKiBQbGVhc2UgcmVhZCBhbGwgb2YgdGhlIGZvbGxvd2luZyB0ZXJtcyBhbmQgY29uZGl0aW9uc1xuICogb2YgdGhlIEZyZWUgU29mdHdhcmUgbGljZW5zZSBBZ3JlZW1lbnQgKFwiQWdyZWVtZW50XCIpXG4gKiBjYXJlZnVsbHkuXG4gKlxuICogVGhpcyBBZ3JlZW1lbnQgaXMgYSBsZWdhbGx5IGJpbmRpbmcgY29udHJhY3QgYmV0d2VlblxuICogdGhlIExpY2Vuc2VlIChhcyBkZWZpbmVkIGJlbG93KSBhbmQgU3BpbmFsQ29tIHRoYXRcbiAqIHNldHMgZm9ydGggdGhlIHRlcm1zIGFuZCBjb25kaXRpb25zIHRoYXQgZ292ZXJuIHlvdXJcbiAqIHVzZSBvZiB0aGUgUHJvZ3JhbS4gQnkgaW5zdGFsbGluZyBhbmQvb3IgdXNpbmcgdGhlXG4gKiBQcm9ncmFtLCB5b3UgYWdyZWUgdG8gYWJpZGUgYnkgYWxsIHRoZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMgc3RhdGVkIG9yIHJlZmVyZW5jZWQgaGVyZWluLlxuICpcbiAqIElmIHlvdSBkbyBub3QgYWdyZWUgdG8gYWJpZGUgYnkgdGhlc2UgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zLCBkbyBub3QgZGVtb25zdHJhdGUgeW91ciBhY2NlcHRhbmNlIGFuZCBkb1xuICogbm90IGluc3RhbGwgb3IgdXNlIHRoZSBQcm9ncmFtLlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbG9uZ1xuICogd2l0aCB0aGlzIGZpbGUuIElmIG5vdCwgc2VlXG4gKiA8aHR0cDovL3Jlc291cmNlcy5zcGluYWxjb20uY29tL2xpY2Vuc2VzLnBkZj4uXG4gKi9cblxuaW1wb3J0IHtcbiAgc3BpbmFsQ29yZSxcbiAgTW9kZWwsXG4gIFB0clxufSBmcm9tIFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNfdHlwZVwiO1xuXG5pbXBvcnQge1xuICBTcGluYWxOb2RlXG59IGZyb20gXCIuL2luZGV4XCI7XG5pbXBvcnQgQmFzZVNwaW5hbFJlbGF0aW9uIGZyb20gXCIuLi9idWlsZC9SZWxhdGlvbnMvQmFzZVNwaW5hbFJlbGF0aW9uXCI7XG5cbi8qKlxuICogV3JhcHBlciBvdmVyIFB0ciBjb250YWluaW5nIHNvbWUgaW5mb3JtYXRpb24gYWJvdXQgdGhlIHBvaW50ZWQgZWxlbWVudC5cbiAqIEBleHRlbmRzIE1vZGVsXG4gKi9cbmNsYXNzIFNwaW5hbE5vZGVQb2ludGVyIGV4dGVuZHMgTW9kZWwge1xuICAvKipcbiAgICogQ29uc3RydWN0b3IgZm9yIHRoZSBTcGluYWxOb2RlUG9pbnRlciBjbGFzcy5cbiAgICogQHBhcmFtIHtTcGluYWxOb2RlIHwgTW9kZWx9IGVsZW1lbnQgRWxlbWVudCB0byB3aWNoIHRoZSBTcGluYWxOb2RlUG9pbnRlciB3aWxsIHBvaW50XG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIGVsZW1lbnQgaXMgbm90IGEgTW9kZWxcbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5hZGRfYXR0cih7XG4gICAgICBwdHI6IG5ldyBQdHIoKSxcbiAgICAgIGluZm86IHt9XG4gICAgfSk7XG5cbiAgICB0aGlzLnNldEVsZW1lbnQoZWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBwb2ludGVyIHRvIHBvaW50IHRvIGFuIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZSB8IE1vZGVsfSBlbGVtZW50IEVsZW1lbnQgdG8gcG9pbnQgdG9cbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgZWxlbWVudCBpcyBub3QgYSBNb2RlbFxuICAgKi9cbiAgc2V0RWxlbWVudChlbGVtZW50KSB7XG4gICAgaWYgKCEoZWxlbWVudCBpbnN0YW5jZW9mIE1vZGVsKSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwiVGhlIHBvaW50ZWQgdmFsdWUgbXVzdCBiZSBhIE1vZGVsXCIpO1xuICAgIH1cblxuICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgU3BpbmFsTm9kZSB8fCBlbGVtZW50IGluc3RhbmNlb2YgQmFzZVNwaW5hbFJlbGF0aW9uKSB7XG4gICAgICB0aGlzLmluZm8ubW9kX2F0dHIoXCJwb2ludGVkSWRcIiwgZWxlbWVudC5nZXRJZCgpKTtcbiAgICAgIHRoaXMuaW5mby5tb2RfYXR0cihcInBvaW50ZWRUeXBlXCIsIGVsZW1lbnQuZ2V0VHlwZSgpKTtcbiAgICB9XG5cbiAgICB0aGlzLnB0ci5zZXQoZWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogTG9hZHMgdGhlIG1vZGVsIHRvIHdoaWNoIHRoZSBwb2ludGVyIGlzIHBvaW50aW5nLlxuICAgKiBAcmV0dXJucyB7TW9kZWx9IFRoZSBtb2RlbCB0byB3aGljaCB0aGUgcG9pbnRlciBpcyBwb2ludGluZ1xuICAgKi9cbiAgbG9hZCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLnB0ci5sb2FkKHJlc29sdmUpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVuc2V0cyB0aGUgcG9pbnRlci4gVGhlIHBvaW50ZXIgc2hvdWxkbid0IGJlIHVzZWQgYWZ0ZXIgdGhhdC5cbiAgICovXG4gIHVuc2V0KCkge1xuICAgIHRoaXMuaW5mby5yZW1fYXR0cihcInBvaW50ZWRJZFwiKTtcbiAgICB0aGlzLmluZm8ucmVtX2F0dHIoXCJwb2ludGVkVHlwZVwiKTtcbiAgICB0aGlzLnB0ci5zZXQoMCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaWQgb2YgdGhlIHBvaW50ZWQgZWxlbWVudC5cbiAgICogQHJldHVybnMge1N0cn0gSWQgb2YgdGhlIHBvaW50ZWQgZWxlbWVudFxuICAgKi9cbiAgZ2V0SWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5mby5wb2ludGVkSWQ7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSB0eXBlIG9mIHRoZSBwb2ludGVkIGVsZW1lbnQuXG4gICAqIEByZXR1cm5zIHtTdHJ9IFR5cGUgb2YgdGhlIHBvaW50ZWQgZWxlbWVudFxuICAgKi9cbiAgZ2V0VHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbmZvLnBvaW50ZWRUeXBlO1xuICB9XG59XG5cbnNwaW5hbENvcmUucmVnaXN0ZXJfbW9kZWxzKFtTcGluYWxOb2RlUG9pbnRlcl0pO1xuZXhwb3J0IGRlZmF1bHQgU3BpbmFsTm9kZVBvaW50ZXI7XG4iXX0=