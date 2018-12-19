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
 * Wrapper over SpinalNodePointer containing some information about the pointed element
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
   * @param {SpinalNode | Model} element
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGluYWxOb2RlUG9pbnRlci5qcyJdLCJuYW1lcyI6WyJTcGluYWxOb2RlUG9pbnRlciIsIk1vZGVsIiwiY29uc3RydWN0b3IiLCJlbGVtZW50IiwiYWRkX2F0dHIiLCJwdHIiLCJQdHIiLCJpbmZvIiwic2V0RWxlbWVudCIsIlR5cGVFcnJvciIsIlNwaW5hbE5vZGUiLCJCYXNlU3BpbmFsUmVsYXRpb24iLCJtb2RfYXR0ciIsImdldElkIiwiZ2V0VHlwZSIsInNldCIsImxvYWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInVuc2V0IiwicmVtX2F0dHIiLCJwb2ludGVkSWQiLCJwb2ludGVkVHlwZSIsInNwaW5hbENvcmUiLCJyZWdpc3Rlcl9tb2RlbHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUF3QkE7O0FBTUE7O0FBR0E7Ozs7QUFqQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1DQTs7O0FBR0EsTUFBTUEsaUJBQU4sU0FBZ0NDLGlDQUFoQyxDQUFzQztBQUNwQzs7Ozs7QUFLQUMsRUFBQUEsV0FBVyxDQUFDQyxPQUFELEVBQVU7QUFDbkI7QUFFQSxTQUFLQyxRQUFMLENBQWM7QUFDWkMsTUFBQUEsR0FBRyxFQUFFLElBQUlDLCtCQUFKLEVBRE87QUFFWkMsTUFBQUEsSUFBSSxFQUFFO0FBRk0sS0FBZDtBQUtBLFNBQUtDLFVBQUwsQ0FBZ0JMLE9BQWhCO0FBQ0Q7QUFFRDs7Ozs7OztBQUtBSyxFQUFBQSxVQUFVLENBQUNMLE9BQUQsRUFBVTtBQUNsQixRQUFJLEVBQUVBLE9BQU8sWUFBWUYsaUNBQXJCLENBQUosRUFBaUM7QUFDL0IsWUFBTVEsU0FBUyxDQUFDLG1DQUFELENBQWY7QUFDRDs7QUFFRCxRQUFJTixPQUFPLFlBQVlPLGlCQUFuQixJQUFpQ1AsT0FBTyxZQUFZUSwyQkFBeEQsRUFBNEU7QUFDMUUsV0FBS0osSUFBTCxDQUFVSyxRQUFWLENBQW1CLFdBQW5CLEVBQWdDVCxPQUFPLENBQUNVLEtBQVIsRUFBaEM7QUFDQSxXQUFLTixJQUFMLENBQVVLLFFBQVYsQ0FBbUIsYUFBbkIsRUFBa0NULE9BQU8sQ0FBQ1csT0FBUixFQUFsQztBQUNEOztBQUVELFNBQUtULEdBQUwsQ0FBU1UsR0FBVCxDQUFhWixPQUFiO0FBQ0Q7QUFFRDs7Ozs7O0FBSUFhLEVBQUFBLElBQUksR0FBRztBQUNMLFdBQU8sSUFBSUMsT0FBSixDQUFZQyxPQUFPLElBQUk7QUFDNUIsV0FBS2IsR0FBTCxDQUFTVyxJQUFULENBQWNFLE9BQWQ7QUFDRCxLQUZNLENBQVA7QUFHRDtBQUVEOzs7OztBQUdBQyxFQUFBQSxLQUFLLEdBQUc7QUFDTixTQUFLWixJQUFMLENBQVVhLFFBQVYsQ0FBbUIsV0FBbkI7QUFDQSxTQUFLYixJQUFMLENBQVVhLFFBQVYsQ0FBbUIsYUFBbkI7QUFDQSxTQUFLZixHQUFMLENBQVNVLEdBQVQsQ0FBYSxDQUFiO0FBQ0Q7QUFFRDs7Ozs7O0FBSUFGLEVBQUFBLEtBQUssR0FBRztBQUNOLFdBQU8sS0FBS04sSUFBTCxDQUFVYyxTQUFqQjtBQUNEO0FBRUQ7Ozs7OztBQUlBUCxFQUFBQSxPQUFPLEdBQUc7QUFDUixXQUFPLEtBQUtQLElBQUwsQ0FBVWUsV0FBakI7QUFDRDs7QUFwRW1DOztBQXVFdENDLHVDQUFXQyxlQUFYLENBQTJCLENBQUN4QixpQkFBRCxDQUEzQjs7ZUFDZUEsaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTggU3BpbmFsQ29tIC0gd3d3LnNwaW5hbGNvbS5jb21cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBTcGluYWxDb3JlLlxuICpcbiAqIFBsZWFzZSByZWFkIGFsbCBvZiB0aGUgZm9sbG93aW5nIHRlcm1zIGFuZCBjb25kaXRpb25zXG4gKiBvZiB0aGUgRnJlZSBTb2Z0d2FyZSBsaWNlbnNlIEFncmVlbWVudCAoXCJBZ3JlZW1lbnRcIilcbiAqIGNhcmVmdWxseS5cbiAqXG4gKiBUaGlzIEFncmVlbWVudCBpcyBhIGxlZ2FsbHkgYmluZGluZyBjb250cmFjdCBiZXR3ZWVuXG4gKiB0aGUgTGljZW5zZWUgKGFzIGRlZmluZWQgYmVsb3cpIGFuZCBTcGluYWxDb20gdGhhdFxuICogc2V0cyBmb3J0aCB0aGUgdGVybXMgYW5kIGNvbmRpdGlvbnMgdGhhdCBnb3Zlcm4geW91clxuICogdXNlIG9mIHRoZSBQcm9ncmFtLiBCeSBpbnN0YWxsaW5nIGFuZC9vciB1c2luZyB0aGVcbiAqIFByb2dyYW0sIHlvdSBhZ3JlZSB0byBhYmlkZSBieSBhbGwgdGhlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucyBzdGF0ZWQgb3IgcmVmZXJlbmNlZCBoZXJlaW4uXG4gKlxuICogSWYgeW91IGRvIG5vdCBhZ3JlZSB0byBhYmlkZSBieSB0aGVzZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMsIGRvIG5vdCBkZW1vbnN0cmF0ZSB5b3VyIGFjY2VwdGFuY2UgYW5kIGRvXG4gKiBub3QgaW5zdGFsbCBvciB1c2UgdGhlIFByb2dyYW0uXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFsb25nXG4gKiB3aXRoIHRoaXMgZmlsZS4gSWYgbm90LCBzZWVcbiAqIDxodHRwOi8vcmVzb3VyY2VzLnNwaW5hbGNvbS5jb20vbGljZW5zZXMucGRmPi5cbiAqL1xuXG5pbXBvcnQge1xuICBzcGluYWxDb3JlLFxuICBNb2RlbCxcbiAgUHRyXG59IGZyb20gXCJzcGluYWwtY29yZS1jb25uZWN0b3Jqc190eXBlXCI7XG5cbmltcG9ydCB7XG4gIFNwaW5hbE5vZGVcbn0gZnJvbSBcIi4vaW5kZXhcIjtcbmltcG9ydCBCYXNlU3BpbmFsUmVsYXRpb24gZnJvbSBcIi4uL2J1aWxkL1JlbGF0aW9ucy9CYXNlU3BpbmFsUmVsYXRpb25cIjtcblxuLyoqXG4gKiBXcmFwcGVyIG92ZXIgU3BpbmFsTm9kZVBvaW50ZXIgY29udGFpbmluZyBzb21lIGluZm9ybWF0aW9uIGFib3V0IHRoZSBwb2ludGVkIGVsZW1lbnRcbiAqL1xuY2xhc3MgU3BpbmFsTm9kZVBvaW50ZXIgZXh0ZW5kcyBNb2RlbCB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIFNwaW5hbE5vZGVQb2ludGVyIGNsYXNzLlxuICAgKiBAcGFyYW0ge1NwaW5hbE5vZGUgfCBNb2RlbH0gZWxlbWVudCBFbGVtZW50IHRvIHdpY2ggdGhlIFNwaW5hbE5vZGVQb2ludGVyIHdpbGwgcG9pbnRcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgZWxlbWVudCBpcyBub3QgYSBNb2RlbFxuICAgKi9cbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmFkZF9hdHRyKHtcbiAgICAgIHB0cjogbmV3IFB0cigpLFxuICAgICAgaW5mbzoge31cbiAgICB9KTtcblxuICAgIHRoaXMuc2V0RWxlbWVudChlbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHBvaW50ZXIgdG8gcG9pbnQgdG8gYW4gZWxlbWVudC5cbiAgICogQHBhcmFtIHtTcGluYWxOb2RlIHwgTW9kZWx9IGVsZW1lbnRcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgZWxlbWVudCBpcyBub3QgYSBNb2RlbFxuICAgKi9cbiAgc2V0RWxlbWVudChlbGVtZW50KSB7XG4gICAgaWYgKCEoZWxlbWVudCBpbnN0YW5jZW9mIE1vZGVsKSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwiVGhlIHBvaW50ZWQgdmFsdWUgbXVzdCBiZSBhIE1vZGVsXCIpO1xuICAgIH1cblxuICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgU3BpbmFsTm9kZSB8fCBlbGVtZW50IGluc3RhbmNlb2YgQmFzZVNwaW5hbFJlbGF0aW9uKSB7XG4gICAgICB0aGlzLmluZm8ubW9kX2F0dHIoXCJwb2ludGVkSWRcIiwgZWxlbWVudC5nZXRJZCgpKTtcbiAgICAgIHRoaXMuaW5mby5tb2RfYXR0cihcInBvaW50ZWRUeXBlXCIsIGVsZW1lbnQuZ2V0VHlwZSgpKTtcbiAgICB9XG5cbiAgICB0aGlzLnB0ci5zZXQoZWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogTG9hZHMgdGhlIG1vZGVsIHRvIHdoaWNoIHRoZSBwb2ludGVyIGlzIHBvaW50aW5nLlxuICAgKiBAcmV0dXJucyB7TW9kZWx9IFRoZSBtb2RlbCB0byB3aGljaCB0aGUgcG9pbnRlciBpcyBwb2ludGluZ1xuICAgKi9cbiAgbG9hZCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLnB0ci5sb2FkKHJlc29sdmUpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVuc2V0cyB0aGUgcG9pbnRlci4gVGhlIHBvaW50ZXIgc2hvdWxkbid0IGJlIHVzZWQgYWZ0ZXIgdGhhdC5cbiAgICovXG4gIHVuc2V0KCkge1xuICAgIHRoaXMuaW5mby5yZW1fYXR0cihcInBvaW50ZWRJZFwiKTtcbiAgICB0aGlzLmluZm8ucmVtX2F0dHIoXCJwb2ludGVkVHlwZVwiKTtcbiAgICB0aGlzLnB0ci5zZXQoMCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaWQgb2YgdGhlIHBvaW50ZWQgZWxlbWVudC5cbiAgICogQHJldHVybnMge1N0cn0gSWQgb2YgdGhlIHBvaW50ZWQgZWxlbWVudFxuICAgKi9cbiAgZ2V0SWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5mby5wb2ludGVkSWQ7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSB0eXBlIG9mIHRoZSBwb2ludGVkIGVsZW1lbnQuXG4gICAqIEByZXR1cm5zIHtTdHJ9IFR5cGUgb2YgdGhlIHBvaW50ZWQgZWxlbWVudFxuICAgKi9cbiAgZ2V0VHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbmZvLnBvaW50ZWRUeXBlO1xuICB9XG59XG5cbnNwaW5hbENvcmUucmVnaXN0ZXJfbW9kZWxzKFtTcGluYWxOb2RlUG9pbnRlcl0pO1xuZXhwb3J0IGRlZmF1bHQgU3BpbmFsTm9kZVBvaW50ZXI7XG4iXX0=