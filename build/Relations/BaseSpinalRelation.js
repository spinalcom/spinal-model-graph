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
   * @return {Str} Id of the relation
   */


  getId() {
    return this.id;
  }
  /**
   * Returns the name of the relation.
   * @return {Str} Name of the relation
   */


  getName() {
    return this.name;
  }
  /**
   * Returns the parent of the relation.
   * @return {Promise<SpinalNode>} Returns a promise where the resolve is the parent
   */


  getParent() {
    return (0, _Utilities.promiseLoad)(this.parent);
  }
  /**
   * Returns a list of the contexts the relation is associated to.
   * @return {Array<String>} A list of ids of the associated contexts
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
   * @return {Boolean} A boolean
   */


  belongsToContext(context) {
    return this.contextIds.has(context.getId().get());
  }
  /**
   * Sets the parent of the relation. If a parent was already set, the parent relation is removed.
   * @param {SpinalNode} parent New parent of the relation
   */


  setParent(parent) {
    if (typeof parent !== "undefined" && parent instanceof _SpinalNode.default) this.parent.setElement(parent);
  }
  /**
   * Removes all children from the relation.
   * @return {Promise<nothing>} An empty promise
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
   * @return {Promise<nothing>} An empty promise
   */


  removeFromGraph() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      yield Promise.all([_this2._removeFromParent(), _this2.removeChildren()]);
    })();
  }
  /**
   * Removes the relation from the parent.
   * @return {Promise<nothing>} An empty promise
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9SZWxhdGlvbnMvQmFzZVNwaW5hbFJlbGF0aW9uLmpzIl0sIm5hbWVzIjpbImdsb2JhbFR5cGUiLCJ3aW5kb3ciLCJnbG9iYWwiLCJCYXNlU3BpbmFsUmVsYXRpb24iLCJNb2RlbCIsImNvbnN0cnVjdG9yIiwibmFtZSIsImFkZF9hdHRyIiwiaWQiLCJwYXJlbnQiLCJTcGluYWxOb2RlUG9pbnRlciIsImNvbnRleHRJZHMiLCJTcGluYWxNYXAiLCJnZXRJZCIsImdldE5hbWUiLCJnZXRQYXJlbnQiLCJnZXRDb250ZXh0SWRzIiwia2V5cyIsImFkZENvbnRleHRJZCIsImhhcyIsInNldEVsZW1lbnQiLCJiZWxvbmdzVG9Db250ZXh0IiwiY29udGV4dCIsImdldCIsInNldFBhcmVudCIsIlNwaW5hbE5vZGUiLCJyZW1vdmVDaGlsZHJlbiIsImNoaWxkcmVuIiwiZ2V0Q2hpbGRyZW4iLCJwcm9taXNlcyIsImkiLCJsZW5ndGgiLCJwdXNoIiwicmVtb3ZlQ2hpbGQiLCJQcm9taXNlIiwiYWxsIiwicmVtb3ZlRnJvbUdyYXBoIiwiX3JlbW92ZUZyb21QYXJlbnQiLCJyZWxhdGlvbk1hcCIsIl9nZXRDaGlsZHJlblR5cGUiLCJnZXRUeXBlIiwiZGVsZXRlIiwidW5zZXQiLCJzcGluYWxDb3JlIiwicmVnaXN0ZXJfbW9kZWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBdUJBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVBLE1BQU1BLFVBQVUsR0FBRyxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDQyxNQUFoQyxHQUF5Q0QsTUFBNUQ7O0FBRUEsTUFBTUUsa0JBQU4sU0FBaUNILFVBQVUsQ0FBQ0ksS0FBNUMsQ0FBa0Q7QUFDOUM7Ozs7QUFJQUMsRUFBQUEsV0FBVyxDQUFDQyxJQUFELEVBQU87QUFDZDtBQUNBLFNBQUtDLFFBQUwsQ0FBYztBQUNWQyxNQUFBQSxFQUFFLEVBQUUscUJBQUtGLElBQUwsQ0FETTtBQUVWQSxNQUFBQSxJQUFJLEVBQUVBLElBRkk7QUFHVkcsTUFBQUEsTUFBTSxFQUFFLElBQUlDLDBCQUFKLEVBSEU7QUFJVkMsTUFBQUEsVUFBVSxFQUFFLElBQUlDLGtCQUFKO0FBSkYsS0FBZDtBQU1IO0FBRUQ7Ozs7OztBQUlBQyxFQUFBQSxLQUFLLEdBQUc7QUFDSixXQUFPLEtBQUtMLEVBQVo7QUFDSDtBQUVEOzs7Ozs7QUFJQU0sRUFBQUEsT0FBTyxHQUFHO0FBQ04sV0FBTyxLQUFLUixJQUFaO0FBQ0g7QUFFRDs7Ozs7O0FBSUFTLEVBQUFBLFNBQVMsR0FBRztBQUNSLFdBQU8sNEJBQVksS0FBS04sTUFBakIsQ0FBUDtBQUNIO0FBRUQ7Ozs7OztBQUlBTyxFQUFBQSxhQUFhLEdBQUc7QUFDWixXQUFPLEtBQUtMLFVBQUwsQ0FBZ0JNLElBQWhCLEVBQVA7QUFDSDtBQUVEOzs7Ozs7QUFJQUMsRUFBQUEsWUFBWSxDQUFDVixFQUFELEVBQUs7QUFDYixRQUFJLENBQUMsS0FBS0csVUFBTCxDQUFnQlEsR0FBaEIsQ0FBb0JYLEVBQXBCLENBQUwsRUFBOEI7QUFDMUIsV0FBS0csVUFBTCxDQUFnQlMsVUFBaEIsQ0FBMkJaLEVBQTNCLEVBQStCLENBQS9CO0FBQ0g7QUFDSjtBQUVEOzs7Ozs7O0FBS0FhLEVBQUFBLGdCQUFnQixDQUFDQyxPQUFELEVBQVU7QUFDdEIsV0FBTyxLQUFLWCxVQUFMLENBQWdCUSxHQUFoQixDQUFvQkcsT0FBTyxDQUFDVCxLQUFSLEdBQWdCVSxHQUFoQixFQUFwQixDQUFQO0FBQ0g7QUFFRDs7Ozs7O0FBSUFDLEVBQUFBLFNBQVMsQ0FBQ2YsTUFBRCxFQUFTO0FBQ2QsUUFBSSxPQUFPQSxNQUFQLEtBQWtCLFdBQWxCLElBQWlDQSxNQUFNLFlBQVlnQixtQkFBdkQsRUFDSSxLQUFLaEIsTUFBTCxDQUFZVyxVQUFaLENBQXVCWCxNQUF2QjtBQUNQO0FBRUQ7Ozs7OztBQUlNaUIsRUFBQUEsY0FBTixHQUF1QjtBQUFBOztBQUFBO0FBQ25CLFlBQU1DLFFBQVEsU0FBUyxLQUFJLENBQUNDLFdBQUwsRUFBdkI7QUFDQSxZQUFNQyxRQUFRLEdBQUcsRUFBakI7O0FBRUEsV0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHSCxRQUFRLENBQUNJLE1BQTdCLEVBQXFDRCxDQUFDLEVBQXRDLEVBQTBDO0FBQ3RDRCxRQUFBQSxRQUFRLENBQUNHLElBQVQsQ0FBYyxLQUFJLENBQUNDLFdBQUwsQ0FBaUJOLFFBQVEsQ0FBQ0csQ0FBRCxDQUF6QixDQUFkO0FBQ0g7O0FBQ0QsWUFBTUksT0FBTyxDQUFDQyxHQUFSLENBQVlOLFFBQVosQ0FBTjtBQVBtQjtBQVF0QjtBQUVEOzs7Ozs7QUFJTU8sRUFBQUEsZUFBTixHQUF3QjtBQUFBOztBQUFBO0FBQ3BCLFlBQU1GLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLENBQ2QsTUFBSSxDQUFDRSxpQkFBTCxFQURjLEVBRWQsTUFBSSxDQUFDWCxjQUFMLEVBRmMsQ0FBWixDQUFOO0FBRG9CO0FBS3ZCO0FBRUQ7Ozs7Ozs7QUFLTVcsRUFBQUEsaUJBQU4sR0FBMEI7QUFBQTs7QUFBQTtBQUN0QixZQUFNNUIsTUFBTSxTQUFTLE1BQUksQ0FBQ00sU0FBTCxFQUFyQjs7QUFDQSxZQUFNdUIsV0FBVyxHQUFHN0IsTUFBTSxDQUFDOEIsZ0JBQVAsQ0FBd0IsTUFBSSxDQUFDQyxPQUFMLEVBQXhCLENBQXBCOztBQUVBRixNQUFBQSxXQUFXLENBQUNHLE1BQVosQ0FBbUIsTUFBSSxDQUFDM0IsT0FBTCxHQUFlUyxHQUFmLEVBQW5COztBQUNBLE1BQUEsTUFBSSxDQUFDZCxNQUFMLENBQVlpQyxLQUFaO0FBTHNCO0FBTXpCOztBQS9HNkM7O0FBa0hsREMsK0JBQVdDLGVBQVgsQ0FBMkIsQ0FBQ3pDLGtCQUFELENBQTNCOztlQUNlQSxrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOCBTcGluYWxDb20gLSB3d3cuc3BpbmFsY29tLmNvbVxuICogXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBTcGluYWxDb3JlLlxuICogXG4gKiBQbGVhc2UgcmVhZCBhbGwgb2YgdGhlIGZvbGxvd2luZyB0ZXJtcyBhbmQgY29uZGl0aW9uc1xuICogb2YgdGhlIEZyZWUgU29mdHdhcmUgbGljZW5zZSBBZ3JlZW1lbnQgKFwiQWdyZWVtZW50XCIpXG4gKiBjYXJlZnVsbHkuXG4gKiBcbiAqIFRoaXMgQWdyZWVtZW50IGlzIGEgbGVnYWxseSBiaW5kaW5nIGNvbnRyYWN0IGJldHdlZW5cbiAqIHRoZSBMaWNlbnNlZSAoYXMgZGVmaW5lZCBiZWxvdykgYW5kIFNwaW5hbENvbSB0aGF0XG4gKiBzZXRzIGZvcnRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyB0aGF0IGdvdmVybiB5b3VyXG4gKiB1c2Ugb2YgdGhlIFByb2dyYW0uIEJ5IGluc3RhbGxpbmcgYW5kL29yIHVzaW5nIHRoZVxuICogUHJvZ3JhbSwgeW91IGFncmVlIHRvIGFiaWRlIGJ5IGFsbCB0aGUgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zIHN0YXRlZCBvciByZWZlcmVuY2VkIGhlcmVpbi5cbiAqIFxuICogSWYgeW91IGRvIG5vdCBhZ3JlZSB0byBhYmlkZSBieSB0aGVzZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMsIGRvIG5vdCBkZW1vbnN0cmF0ZSB5b3VyIGFjY2VwdGFuY2UgYW5kIGRvXG4gKiBub3QgaW5zdGFsbCBvciB1c2UgdGhlIFByb2dyYW0uXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFsb25nXG4gKiB3aXRoIHRoaXMgZmlsZS4gSWYgbm90LCBzZWVcbiAqIDxodHRwOi8vcmVzb3VyY2VzLnNwaW5hbGNvbS5jb20vbGljZW5zZXMucGRmPi5cbiAqL1xuaW1wb3J0IHNwaW5hbENvcmUgZnJvbSBcInNwaW5hbC1jb3JlLWNvbm5lY3RvcmpzXCI7XG5pbXBvcnQgeyBwcm9taXNlTG9hZCwgZ3VpZCB9IGZyb20gXCIuLi9VdGlsaXRpZXNcIjtcbmltcG9ydCBTcGluYWxOb2RlIGZyb20gXCIuLi9Ob2Rlcy9TcGluYWxOb2RlXCI7XG5pbXBvcnQgU3BpbmFsTm9kZVBvaW50ZXIgZnJvbSBcIi4uL1NwaW5hbE5vZGVQb2ludGVyXCJcbmltcG9ydCBTcGluYWxNYXAgZnJvbSBcIi4uL1NwaW5hbE1hcFwiO1xuXG5jb25zdCBnbG9iYWxUeXBlID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHdpbmRvdztcblxuY2xhc3MgQmFzZVNwaW5hbFJlbGF0aW9uIGV4dGVuZHMgZ2xvYmFsVHlwZS5Nb2RlbCB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3IgZm9yIHRoZSBCYXNlU3BpbmFsUmVsYXRpb24gY2xhc3MuXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgTmFtZSBvZiB0aGUgcmVsYXRpb25cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuYWRkX2F0dHIoe1xuICAgICAgICAgICAgaWQ6IGd1aWQobmFtZSksXG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgcGFyZW50OiBuZXcgU3BpbmFsTm9kZVBvaW50ZXIoKSxcbiAgICAgICAgICAgIGNvbnRleHRJZHM6IG5ldyBTcGluYWxNYXAoKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG9ydGN1dCB0byBpZC5cbiAgICAgKiBAcmV0dXJuIHtTdHJ9IElkIG9mIHRoZSByZWxhdGlvblxuICAgICAqL1xuICAgIGdldElkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBuYW1lIG9mIHRoZSByZWxhdGlvbi5cbiAgICAgKiBAcmV0dXJuIHtTdHJ9IE5hbWUgb2YgdGhlIHJlbGF0aW9uXG4gICAgICovXG4gICAgZ2V0TmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBwYXJlbnQgb2YgdGhlIHJlbGF0aW9uLlxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8U3BpbmFsTm9kZT59IFJldHVybnMgYSBwcm9taXNlIHdoZXJlIHRoZSByZXNvbHZlIGlzIHRoZSBwYXJlbnRcbiAgICAgKi9cbiAgICBnZXRQYXJlbnQoKSB7XG4gICAgICAgIHJldHVybiBwcm9taXNlTG9hZCh0aGlzLnBhcmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGxpc3Qgb2YgdGhlIGNvbnRleHRzIHRoZSByZWxhdGlvbiBpcyBhc3NvY2lhdGVkIHRvLlxuICAgICAqIEByZXR1cm4ge0FycmF5PFN0cmluZz59IEEgbGlzdCBvZiBpZHMgb2YgdGhlIGFzc29jaWF0ZWQgY29udGV4dHNcbiAgICAgKi9cbiAgICBnZXRDb250ZXh0SWRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0SWRzLmtleXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGFuIGlkIHRvIHRoZSBjb250ZXh0IGlkcyBvZiB0aGUgcmVsYXRpb24uXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkIElkIG9mIHRoZSBjb250ZXh0XG4gICAgICovXG4gICAgYWRkQ29udGV4dElkKGlkKSB7XG4gICAgICAgIGlmICghdGhpcy5jb250ZXh0SWRzLmhhcyhpZCkpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dElkcy5zZXRFbGVtZW50KGlkLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgcmVsYXRpb24gYmVsb25ncyB0byB0aGUgY29udGV4dC5cbiAgICAgKiBAcGFyYW0ge1NwaW5hbENvbnRleHR9IGNvbnRleHQgVGhlIGNvbnRleHQgdGhhdCBtaWdodCBvd24gdGhlIG5vZGVcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBBIGJvb2xlYW5cbiAgICAgKi9cbiAgICBiZWxvbmdzVG9Db250ZXh0KGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dElkcy5oYXMoY29udGV4dC5nZXRJZCgpLmdldCgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwYXJlbnQgb2YgdGhlIHJlbGF0aW9uLiBJZiBhIHBhcmVudCB3YXMgYWxyZWFkeSBzZXQsIHRoZSBwYXJlbnQgcmVsYXRpb24gaXMgcmVtb3ZlZC5cbiAgICAgKiBAcGFyYW0ge1NwaW5hbE5vZGV9IHBhcmVudCBOZXcgcGFyZW50IG9mIHRoZSByZWxhdGlvblxuICAgICAqL1xuICAgIHNldFBhcmVudChwYXJlbnQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBwYXJlbnQgIT09IFwidW5kZWZpbmVkXCIgJiYgcGFyZW50IGluc3RhbmNlb2YgU3BpbmFsTm9kZSlcbiAgICAgICAgICAgIHRoaXMucGFyZW50LnNldEVsZW1lbnQocGFyZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFsbCBjaGlsZHJlbiBmcm9tIHRoZSByZWxhdGlvbi5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPG5vdGhpbmc+fSBBbiBlbXB0eSBwcm9taXNlXG4gICAgICovXG4gICAgYXN5bmMgcmVtb3ZlQ2hpbGRyZW4oKSB7XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gYXdhaXQgdGhpcy5nZXRDaGlsZHJlbigpO1xuICAgICAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2godGhpcy5yZW1vdmVDaGlsZChjaGlsZHJlbltpXSkpO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSByZWxhdGlvbiBmcm9tIHRoZSBncmFwaC5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPG5vdGhpbmc+fSBBbiBlbXB0eSBwcm9taXNlXG4gICAgICovXG4gICAgYXN5bmMgcmVtb3ZlRnJvbUdyYXBoKCkge1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVGcm9tUGFyZW50KCksXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUNoaWxkcmVuKClcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgcmVsYXRpb24gZnJvbSB0aGUgcGFyZW50LlxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8bm90aGluZz59IEFuIGVtcHR5IHByb21pc2VcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGFzeW5jIF9yZW1vdmVGcm9tUGFyZW50KCkge1xuICAgICAgICBjb25zdCBwYXJlbnQgPSBhd2FpdCB0aGlzLmdldFBhcmVudCgpO1xuICAgICAgICBjb25zdCByZWxhdGlvbk1hcCA9IHBhcmVudC5fZ2V0Q2hpbGRyZW5UeXBlKHRoaXMuZ2V0VHlwZSgpKTtcblxuICAgICAgICByZWxhdGlvbk1hcC5kZWxldGUodGhpcy5nZXROYW1lKCkuZ2V0KCkpO1xuICAgICAgICB0aGlzLnBhcmVudC51bnNldCgpO1xuICAgIH1cbn1cblxuc3BpbmFsQ29yZS5yZWdpc3Rlcl9tb2RlbHMoW0Jhc2VTcGluYWxSZWxhdGlvbl0pO1xuZXhwb3J0IGRlZmF1bHQgQmFzZVNwaW5hbFJlbGF0aW9uO1xuIl19