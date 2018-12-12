"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _spinalCoreConnectorjs = _interopRequireDefault(require("spinal-core-connectorjs"));

var _Utilities = require("../Utilities");

var _SpinalNode = _interopRequireDefault(require("../Nodes/SpinalNode"));

var _SpinalNodePointer = _interopRequireDefault(require("../SpinalNodePointer"));

var _SpinalMap = _interopRequireDefault(require("../SpinalMap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const globalType = typeof window === "undefined" ? global : window;

class BaseSpinalRelation extends globalType.Model {
  /**
   * Constructor for the BaseSpinalRelation class.
   * @param {String} name Name of the relation
   */
  constructor(name) {
    super();
    this.add_attr({
      id: (0, _Utilities.guid)(name),
      name: name,
      parent: new _SpinalNodePointer.default(),
      contextIds: new _SpinalMap.default()
    });
  }
  /**
   * Shortcut to id.
   * @returns {Str} Id of the relation
   */


  getId() {
    return this.id;
  }
  /**
   * Returns the name of the relation.
   * @returns {Str} Name of the relation
   */


  getName() {
    return this.name;
  }
  /**
   * Returns the parent of the relation.
   * @returns {Promise<SpinalNode>} Returns a promise where the resolve is the parent
   */


  getParent() {
    return this.parent.load();
  }
  /**
   * Returns a list of the contexts the relation is associated to.
   * @returns {Array<String>} A list of ids of the associated contexts
   */


  getContextIds() {
    return this.contextIds.keys();
  }
  /**
   * Adds an id to the context ids of the relation.
   * @param {String} id Id of the context
   */


  addContextId(id) {
    if (!this.contextIds.has(id)) {
      this.contextIds.setElement(id, 0);
    }
  }
  /**
   * Returns true if the relation belongs to the context.
   * @param {SpinalContext} context The context that might own the node
   * @returns {Boolean} A boolean
   */


  belongsToContext(context) {
    return this.contextIds.has(context.getId().get());
  }
  /**
   * Sets the parent of the relation. If a parent was already set, the parent relation is removed.
   * @param {SpinalNode} parent New parent of the relation
   */


  setParent(parent) {
    if (typeof parent !== "undefined" && parent instanceof _SpinalNode.default) {
      this.parent.setElement(parent);
    }
  }
  /**
   * Removes all children from the relation.
   * @returns {Promise<nothing>} An empty promise
   */


  removeChildren() {
    var _this = this;

    return _asyncToGenerator(function* () {
      const children = yield _this.getChildren();
      const promises = [];

      for (let i = 0; i < children.length; i++) {
        promises.push(_this.removeChild(children[i]));
      }

      yield Promise.all(promises);
    })();
  }
  /**
   * Removes the relation from the graph.
   * @returns {Promise<nothing>} An empty promise
   */


  removeFromGraph() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      yield Promise.all([_this2._removeFromParent(), _this2.removeChildren()]);
    })();
  }
  /**
   * Removes the relation from the parent.
   * @returns {Promise<nothing>} An empty promise
   * @private
   */


  _removeFromParent() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const parent = yield _this3.getParent();

      const relationMap = parent._getChildrenType(_this3.getType());

      relationMap.delete(_this3.getName().get());

      _this3.parent.unset();
    })();
  }

}

_spinalCoreConnectorjs.default.register_models([BaseSpinalRelation]);

var _default = BaseSpinalRelation;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9SZWxhdGlvbnMvQmFzZVNwaW5hbFJlbGF0aW9uLmpzIl0sIm5hbWVzIjpbImdsb2JhbFR5cGUiLCJ3aW5kb3ciLCJnbG9iYWwiLCJCYXNlU3BpbmFsUmVsYXRpb24iLCJNb2RlbCIsImNvbnN0cnVjdG9yIiwibmFtZSIsImFkZF9hdHRyIiwiaWQiLCJwYXJlbnQiLCJTcGluYWxOb2RlUG9pbnRlciIsImNvbnRleHRJZHMiLCJTcGluYWxNYXAiLCJnZXRJZCIsImdldE5hbWUiLCJnZXRQYXJlbnQiLCJsb2FkIiwiZ2V0Q29udGV4dElkcyIsImtleXMiLCJhZGRDb250ZXh0SWQiLCJoYXMiLCJzZXRFbGVtZW50IiwiYmVsb25nc1RvQ29udGV4dCIsImNvbnRleHQiLCJnZXQiLCJzZXRQYXJlbnQiLCJTcGluYWxOb2RlIiwicmVtb3ZlQ2hpbGRyZW4iLCJjaGlsZHJlbiIsImdldENoaWxkcmVuIiwicHJvbWlzZXMiLCJpIiwibGVuZ3RoIiwicHVzaCIsInJlbW92ZUNoaWxkIiwiUHJvbWlzZSIsImFsbCIsInJlbW92ZUZyb21HcmFwaCIsIl9yZW1vdmVGcm9tUGFyZW50IiwicmVsYXRpb25NYXAiLCJfZ2V0Q2hpbGRyZW5UeXBlIiwiZ2V0VHlwZSIsImRlbGV0ZSIsInVuc2V0Iiwic3BpbmFsQ29yZSIsInJlZ2lzdGVyX21vZGVscyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQXVCQTs7QUFDQTs7QUFHQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFQSxNQUFNQSxVQUFVLEdBQUcsT0FBT0MsTUFBUCxLQUFrQixXQUFsQixHQUFnQ0MsTUFBaEMsR0FBeUNELE1BQTVEOztBQUVBLE1BQU1FLGtCQUFOLFNBQWlDSCxVQUFVLENBQUNJLEtBQTVDLENBQWtEO0FBQ2hEOzs7O0FBSUFDLEVBQUFBLFdBQVcsQ0FBQ0MsSUFBRCxFQUFPO0FBQ2hCO0FBQ0EsU0FBS0MsUUFBTCxDQUFjO0FBQ1pDLE1BQUFBLEVBQUUsRUFBRSxxQkFBS0YsSUFBTCxDQURRO0FBRVpBLE1BQUFBLElBQUksRUFBRUEsSUFGTTtBQUdaRyxNQUFBQSxNQUFNLEVBQUUsSUFBSUMsMEJBQUosRUFISTtBQUlaQyxNQUFBQSxVQUFVLEVBQUUsSUFBSUMsa0JBQUo7QUFKQSxLQUFkO0FBTUQ7QUFFRDs7Ozs7O0FBSUFDLEVBQUFBLEtBQUssR0FBRztBQUNOLFdBQU8sS0FBS0wsRUFBWjtBQUNEO0FBRUQ7Ozs7OztBQUlBTSxFQUFBQSxPQUFPLEdBQUc7QUFDUixXQUFPLEtBQUtSLElBQVo7QUFDRDtBQUVEOzs7Ozs7QUFJQVMsRUFBQUEsU0FBUyxHQUFHO0FBQ1YsV0FBTyxLQUFLTixNQUFMLENBQVlPLElBQVosRUFBUDtBQUNEO0FBRUQ7Ozs7OztBQUlBQyxFQUFBQSxhQUFhLEdBQUc7QUFDZCxXQUFPLEtBQUtOLFVBQUwsQ0FBZ0JPLElBQWhCLEVBQVA7QUFDRDtBQUVEOzs7Ozs7QUFJQUMsRUFBQUEsWUFBWSxDQUFDWCxFQUFELEVBQUs7QUFDZixRQUFJLENBQUMsS0FBS0csVUFBTCxDQUFnQlMsR0FBaEIsQ0FBb0JaLEVBQXBCLENBQUwsRUFBOEI7QUFDNUIsV0FBS0csVUFBTCxDQUFnQlUsVUFBaEIsQ0FBMkJiLEVBQTNCLEVBQStCLENBQS9CO0FBQ0Q7QUFDRjtBQUVEOzs7Ozs7O0FBS0FjLEVBQUFBLGdCQUFnQixDQUFDQyxPQUFELEVBQVU7QUFDeEIsV0FBTyxLQUFLWixVQUFMLENBQWdCUyxHQUFoQixDQUFvQkcsT0FBTyxDQUFDVixLQUFSLEdBQWdCVyxHQUFoQixFQUFwQixDQUFQO0FBQ0Q7QUFFRDs7Ozs7O0FBSUFDLEVBQUFBLFNBQVMsQ0FBQ2hCLE1BQUQsRUFBUztBQUNoQixRQUFJLE9BQU9BLE1BQVAsS0FBa0IsV0FBbEIsSUFBaUNBLE1BQU0sWUFBWWlCLG1CQUF2RCxFQUFtRTtBQUNqRSxXQUFLakIsTUFBTCxDQUFZWSxVQUFaLENBQXVCWixNQUF2QjtBQUNEO0FBQ0Y7QUFFRDs7Ozs7O0FBSU1rQixFQUFBQSxjQUFOLEdBQXVCO0FBQUE7O0FBQUE7QUFDckIsWUFBTUMsUUFBUSxTQUFTLEtBQUksQ0FBQ0MsV0FBTCxFQUF2QjtBQUNBLFlBQU1DLFFBQVEsR0FBRyxFQUFqQjs7QUFFQSxXQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdILFFBQVEsQ0FBQ0ksTUFBN0IsRUFBcUNELENBQUMsRUFBdEMsRUFBMEM7QUFDeENELFFBQUFBLFFBQVEsQ0FBQ0csSUFBVCxDQUFjLEtBQUksQ0FBQ0MsV0FBTCxDQUFpQk4sUUFBUSxDQUFDRyxDQUFELENBQXpCLENBQWQ7QUFDRDs7QUFDRCxZQUFNSSxPQUFPLENBQUNDLEdBQVIsQ0FBWU4sUUFBWixDQUFOO0FBUHFCO0FBUXRCO0FBRUQ7Ozs7OztBQUlNTyxFQUFBQSxlQUFOLEdBQXdCO0FBQUE7O0FBQUE7QUFDdEIsWUFBTUYsT0FBTyxDQUFDQyxHQUFSLENBQVksQ0FDaEIsTUFBSSxDQUFDRSxpQkFBTCxFQURnQixFQUVoQixNQUFJLENBQUNYLGNBQUwsRUFGZ0IsQ0FBWixDQUFOO0FBRHNCO0FBS3ZCO0FBRUQ7Ozs7Ozs7QUFLTVcsRUFBQUEsaUJBQU4sR0FBMEI7QUFBQTs7QUFBQTtBQUN4QixZQUFNN0IsTUFBTSxTQUFTLE1BQUksQ0FBQ00sU0FBTCxFQUFyQjs7QUFDQSxZQUFNd0IsV0FBVyxHQUFHOUIsTUFBTSxDQUFDK0IsZ0JBQVAsQ0FBd0IsTUFBSSxDQUFDQyxPQUFMLEVBQXhCLENBQXBCOztBQUVBRixNQUFBQSxXQUFXLENBQUNHLE1BQVosQ0FBbUIsTUFBSSxDQUFDNUIsT0FBTCxHQUFlVSxHQUFmLEVBQW5COztBQUNBLE1BQUEsTUFBSSxDQUFDZixNQUFMLENBQVlrQyxLQUFaO0FBTHdCO0FBTXpCOztBQWhIK0M7O0FBbUhsREMsK0JBQVdDLGVBQVgsQ0FBMkIsQ0FBQzFDLGtCQUFELENBQTNCOztlQUNlQSxrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOCBTcGluYWxDb20gLSB3d3cuc3BpbmFsY29tLmNvbVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFNwaW5hbENvcmUuXG4gKlxuICogUGxlYXNlIHJlYWQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgdGVybXMgYW5kIGNvbmRpdGlvbnNcbiAqIG9mIHRoZSBGcmVlIFNvZnR3YXJlIGxpY2Vuc2UgQWdyZWVtZW50IChcIkFncmVlbWVudFwiKVxuICogY2FyZWZ1bGx5LlxuICpcbiAqIFRoaXMgQWdyZWVtZW50IGlzIGEgbGVnYWxseSBiaW5kaW5nIGNvbnRyYWN0IGJldHdlZW5cbiAqIHRoZSBMaWNlbnNlZSAoYXMgZGVmaW5lZCBiZWxvdykgYW5kIFNwaW5hbENvbSB0aGF0XG4gKiBzZXRzIGZvcnRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyB0aGF0IGdvdmVybiB5b3VyXG4gKiB1c2Ugb2YgdGhlIFByb2dyYW0uIEJ5IGluc3RhbGxpbmcgYW5kL29yIHVzaW5nIHRoZVxuICogUHJvZ3JhbSwgeW91IGFncmVlIHRvIGFiaWRlIGJ5IGFsbCB0aGUgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zIHN0YXRlZCBvciByZWZlcmVuY2VkIGhlcmVpbi5cbiAqXG4gKiBJZiB5b3UgZG8gbm90IGFncmVlIHRvIGFiaWRlIGJ5IHRoZXNlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucywgZG8gbm90IGRlbW9uc3RyYXRlIHlvdXIgYWNjZXB0YW5jZSBhbmQgZG9cbiAqIG5vdCBpbnN0YWxsIG9yIHVzZSB0aGUgUHJvZ3JhbS5cbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYWxvbmdcbiAqIHdpdGggdGhpcyBmaWxlLiBJZiBub3QsIHNlZVxuICogPGh0dHA6Ly9yZXNvdXJjZXMuc3BpbmFsY29tLmNvbS9saWNlbnNlcy5wZGY+LlxuICovXG5pbXBvcnQgc3BpbmFsQ29yZSBmcm9tIFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNcIjtcbmltcG9ydCB7XG4gIGd1aWRcbn0gZnJvbSBcIi4uL1V0aWxpdGllc1wiO1xuaW1wb3J0IFNwaW5hbE5vZGUgZnJvbSBcIi4uL05vZGVzL1NwaW5hbE5vZGVcIjtcbmltcG9ydCBTcGluYWxOb2RlUG9pbnRlciBmcm9tIFwiLi4vU3BpbmFsTm9kZVBvaW50ZXJcIjtcbmltcG9ydCBTcGluYWxNYXAgZnJvbSBcIi4uL1NwaW5hbE1hcFwiO1xuXG5jb25zdCBnbG9iYWxUeXBlID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHdpbmRvdztcblxuY2xhc3MgQmFzZVNwaW5hbFJlbGF0aW9uIGV4dGVuZHMgZ2xvYmFsVHlwZS5Nb2RlbCB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIEJhc2VTcGluYWxSZWxhdGlvbiBjbGFzcy5cbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgTmFtZSBvZiB0aGUgcmVsYXRpb25cbiAgICovXG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYWRkX2F0dHIoe1xuICAgICAgaWQ6IGd1aWQobmFtZSksXG4gICAgICBuYW1lOiBuYW1lLFxuICAgICAgcGFyZW50OiBuZXcgU3BpbmFsTm9kZVBvaW50ZXIoKSxcbiAgICAgIGNvbnRleHRJZHM6IG5ldyBTcGluYWxNYXAoKVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3J0Y3V0IHRvIGlkLlxuICAgKiBAcmV0dXJucyB7U3RyfSBJZCBvZiB0aGUgcmVsYXRpb25cbiAgICovXG4gIGdldElkKCkge1xuICAgIHJldHVybiB0aGlzLmlkO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIG5hbWUgb2YgdGhlIHJlbGF0aW9uLlxuICAgKiBAcmV0dXJucyB7U3RyfSBOYW1lIG9mIHRoZSByZWxhdGlvblxuICAgKi9cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHBhcmVudCBvZiB0aGUgcmVsYXRpb24uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFNwaW5hbE5vZGU+fSBSZXR1cm5zIGEgcHJvbWlzZSB3aGVyZSB0aGUgcmVzb2x2ZSBpcyB0aGUgcGFyZW50XG4gICAqL1xuICBnZXRQYXJlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyZW50LmxvYWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbGlzdCBvZiB0aGUgY29udGV4dHMgdGhlIHJlbGF0aW9uIGlzIGFzc29jaWF0ZWQgdG8uXG4gICAqIEByZXR1cm5zIHtBcnJheTxTdHJpbmc+fSBBIGxpc3Qgb2YgaWRzIG9mIHRoZSBhc3NvY2lhdGVkIGNvbnRleHRzXG4gICAqL1xuICBnZXRDb250ZXh0SWRzKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHRJZHMua2V5cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYW4gaWQgdG8gdGhlIGNvbnRleHQgaWRzIG9mIHRoZSByZWxhdGlvbi5cbiAgICogQHBhcmFtIHtTdHJpbmd9IGlkIElkIG9mIHRoZSBjb250ZXh0XG4gICAqL1xuICBhZGRDb250ZXh0SWQoaWQpIHtcbiAgICBpZiAoIXRoaXMuY29udGV4dElkcy5oYXMoaWQpKSB7XG4gICAgICB0aGlzLmNvbnRleHRJZHMuc2V0RWxlbWVudChpZCwgMCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgcmVsYXRpb24gYmVsb25ncyB0byB0aGUgY29udGV4dC5cbiAgICogQHBhcmFtIHtTcGluYWxDb250ZXh0fSBjb250ZXh0IFRoZSBjb250ZXh0IHRoYXQgbWlnaHQgb3duIHRoZSBub2RlXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBBIGJvb2xlYW5cbiAgICovXG4gIGJlbG9uZ3NUb0NvbnRleHQoY29udGV4dCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHRJZHMuaGFzKGNvbnRleHQuZ2V0SWQoKS5nZXQoKSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgcGFyZW50IG9mIHRoZSByZWxhdGlvbi4gSWYgYSBwYXJlbnQgd2FzIGFscmVhZHkgc2V0LCB0aGUgcGFyZW50IHJlbGF0aW9uIGlzIHJlbW92ZWQuXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZX0gcGFyZW50IE5ldyBwYXJlbnQgb2YgdGhlIHJlbGF0aW9uXG4gICAqL1xuICBzZXRQYXJlbnQocGFyZW50KSB7XG4gICAgaWYgKHR5cGVvZiBwYXJlbnQgIT09IFwidW5kZWZpbmVkXCIgJiYgcGFyZW50IGluc3RhbmNlb2YgU3BpbmFsTm9kZSkge1xuICAgICAgdGhpcy5wYXJlbnQuc2V0RWxlbWVudChwYXJlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCBjaGlsZHJlbiBmcm9tIHRoZSByZWxhdGlvbi5cbiAgICogQHJldHVybnMge1Byb21pc2U8bm90aGluZz59IEFuIGVtcHR5IHByb21pc2VcbiAgICovXG4gIGFzeW5jIHJlbW92ZUNoaWxkcmVuKCkge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gYXdhaXQgdGhpcy5nZXRDaGlsZHJlbigpO1xuICAgIGNvbnN0IHByb21pc2VzID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBwcm9taXNlcy5wdXNoKHRoaXMucmVtb3ZlQ2hpbGQoY2hpbGRyZW5baV0pKTtcbiAgICB9XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIHJlbGF0aW9uIGZyb20gdGhlIGdyYXBoLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxub3RoaW5nPn0gQW4gZW1wdHkgcHJvbWlzZVxuICAgKi9cbiAgYXN5bmMgcmVtb3ZlRnJvbUdyYXBoKCkge1xuICAgIGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21QYXJlbnQoKSxcbiAgICAgIHRoaXMucmVtb3ZlQ2hpbGRyZW4oKVxuICAgIF0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIHJlbGF0aW9uIGZyb20gdGhlIHBhcmVudC5cbiAgICogQHJldHVybnMge1Byb21pc2U8bm90aGluZz59IEFuIGVtcHR5IHByb21pc2VcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFzeW5jIF9yZW1vdmVGcm9tUGFyZW50KCkge1xuICAgIGNvbnN0IHBhcmVudCA9IGF3YWl0IHRoaXMuZ2V0UGFyZW50KCk7XG4gICAgY29uc3QgcmVsYXRpb25NYXAgPSBwYXJlbnQuX2dldENoaWxkcmVuVHlwZSh0aGlzLmdldFR5cGUoKSk7XG5cbiAgICByZWxhdGlvbk1hcC5kZWxldGUodGhpcy5nZXROYW1lKCkuZ2V0KCkpO1xuICAgIHRoaXMucGFyZW50LnVuc2V0KCk7XG4gIH1cbn1cblxuc3BpbmFsQ29yZS5yZWdpc3Rlcl9tb2RlbHMoW0Jhc2VTcGluYWxSZWxhdGlvbl0pO1xuZXhwb3J0IGRlZmF1bHQgQmFzZVNwaW5hbFJlbGF0aW9uO1xuIl19