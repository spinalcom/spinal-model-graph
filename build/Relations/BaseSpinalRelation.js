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
    if (typeof parent !== "undefined" && parent instanceof _SpinalNode.default) {
      this.parent.setElement(parent);
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9SZWxhdGlvbnMvQmFzZVNwaW5hbFJlbGF0aW9uLmpzIl0sIm5hbWVzIjpbImdsb2JhbFR5cGUiLCJ3aW5kb3ciLCJnbG9iYWwiLCJCYXNlU3BpbmFsUmVsYXRpb24iLCJNb2RlbCIsImNvbnN0cnVjdG9yIiwibmFtZSIsImFkZF9hdHRyIiwiaWQiLCJwYXJlbnQiLCJTcGluYWxOb2RlUG9pbnRlciIsImNvbnRleHRJZHMiLCJTcGluYWxNYXAiLCJnZXRJZCIsImdldE5hbWUiLCJnZXRQYXJlbnQiLCJnZXRDb250ZXh0SWRzIiwia2V5cyIsImFkZENvbnRleHRJZCIsImhhcyIsInNldEVsZW1lbnQiLCJiZWxvbmdzVG9Db250ZXh0IiwiY29udGV4dCIsImdldCIsInNldFBhcmVudCIsIlNwaW5hbE5vZGUiLCJyZW1vdmVDaGlsZHJlbiIsImNoaWxkcmVuIiwiZ2V0Q2hpbGRyZW4iLCJwcm9taXNlcyIsImkiLCJsZW5ndGgiLCJwdXNoIiwicmVtb3ZlQ2hpbGQiLCJQcm9taXNlIiwiYWxsIiwicmVtb3ZlRnJvbUdyYXBoIiwiX3JlbW92ZUZyb21QYXJlbnQiLCJyZWxhdGlvbk1hcCIsIl9nZXRDaGlsZHJlblR5cGUiLCJnZXRUeXBlIiwiZGVsZXRlIiwidW5zZXQiLCJzcGluYWxDb3JlIiwicmVnaXN0ZXJfbW9kZWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBdUJBOztBQUNBOztBQUlBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVBLE1BQU1BLFVBQVUsR0FBRyxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDQyxNQUFoQyxHQUF5Q0QsTUFBNUQ7O0FBRUEsTUFBTUUsa0JBQU4sU0FBaUNILFVBQVUsQ0FBQ0ksS0FBNUMsQ0FBa0Q7QUFDaEQ7Ozs7QUFJQUMsRUFBQUEsV0FBVyxDQUFDQyxJQUFELEVBQU87QUFDaEI7QUFDQSxTQUFLQyxRQUFMLENBQWM7QUFDWkMsTUFBQUEsRUFBRSxFQUFFLHFCQUFLRixJQUFMLENBRFE7QUFFWkEsTUFBQUEsSUFBSSxFQUFFQSxJQUZNO0FBR1pHLE1BQUFBLE1BQU0sRUFBRSxJQUFJQywwQkFBSixFQUhJO0FBSVpDLE1BQUFBLFVBQVUsRUFBRSxJQUFJQyxrQkFBSjtBQUpBLEtBQWQ7QUFNRDtBQUVEOzs7Ozs7QUFJQUMsRUFBQUEsS0FBSyxHQUFHO0FBQ04sV0FBTyxLQUFLTCxFQUFaO0FBQ0Q7QUFFRDs7Ozs7O0FBSUFNLEVBQUFBLE9BQU8sR0FBRztBQUNSLFdBQU8sS0FBS1IsSUFBWjtBQUNEO0FBRUQ7Ozs7OztBQUlBUyxFQUFBQSxTQUFTLEdBQUc7QUFDVixXQUFPLDRCQUFZLEtBQUtOLE1BQWpCLENBQVA7QUFDRDtBQUVEOzs7Ozs7QUFJQU8sRUFBQUEsYUFBYSxHQUFHO0FBQ2QsV0FBTyxLQUFLTCxVQUFMLENBQWdCTSxJQUFoQixFQUFQO0FBQ0Q7QUFFRDs7Ozs7O0FBSUFDLEVBQUFBLFlBQVksQ0FBQ1YsRUFBRCxFQUFLO0FBQ2YsUUFBSSxDQUFDLEtBQUtHLFVBQUwsQ0FBZ0JRLEdBQWhCLENBQW9CWCxFQUFwQixDQUFMLEVBQThCO0FBQzVCLFdBQUtHLFVBQUwsQ0FBZ0JTLFVBQWhCLENBQTJCWixFQUEzQixFQUErQixDQUEvQjtBQUNEO0FBQ0Y7QUFFRDs7Ozs7OztBQUtBYSxFQUFBQSxnQkFBZ0IsQ0FBQ0MsT0FBRCxFQUFVO0FBQ3hCLFdBQU8sS0FBS1gsVUFBTCxDQUFnQlEsR0FBaEIsQ0FBb0JHLE9BQU8sQ0FBQ1QsS0FBUixHQUFnQlUsR0FBaEIsRUFBcEIsQ0FBUDtBQUNEO0FBRUQ7Ozs7OztBQUlBQyxFQUFBQSxTQUFTLENBQUNmLE1BQUQsRUFBUztBQUNoQixRQUFJLE9BQU9BLE1BQVAsS0FBa0IsV0FBbEIsSUFBaUNBLE1BQU0sWUFBWWdCLG1CQUF2RCxFQUFtRTtBQUNqRSxXQUFLaEIsTUFBTCxDQUFZVyxVQUFaLENBQXVCWCxNQUF2QjtBQUNEO0FBQ0Y7QUFFRDs7Ozs7O0FBSU1pQixFQUFBQSxjQUFOLEdBQXVCO0FBQUE7O0FBQUE7QUFDckIsWUFBTUMsUUFBUSxTQUFTLEtBQUksQ0FBQ0MsV0FBTCxFQUF2QjtBQUNBLFlBQU1DLFFBQVEsR0FBRyxFQUFqQjs7QUFFQSxXQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdILFFBQVEsQ0FBQ0ksTUFBN0IsRUFBcUNELENBQUMsRUFBdEMsRUFBMEM7QUFDeENELFFBQUFBLFFBQVEsQ0FBQ0csSUFBVCxDQUFjLEtBQUksQ0FBQ0MsV0FBTCxDQUFpQk4sUUFBUSxDQUFDRyxDQUFELENBQXpCLENBQWQ7QUFDRDs7QUFDRCxZQUFNSSxPQUFPLENBQUNDLEdBQVIsQ0FBWU4sUUFBWixDQUFOO0FBUHFCO0FBUXRCO0FBRUQ7Ozs7OztBQUlNTyxFQUFBQSxlQUFOLEdBQXdCO0FBQUE7O0FBQUE7QUFDdEIsWUFBTUYsT0FBTyxDQUFDQyxHQUFSLENBQVksQ0FDaEIsTUFBSSxDQUFDRSxpQkFBTCxFQURnQixFQUVoQixNQUFJLENBQUNYLGNBQUwsRUFGZ0IsQ0FBWixDQUFOO0FBRHNCO0FBS3ZCO0FBRUQ7Ozs7Ozs7QUFLTVcsRUFBQUEsaUJBQU4sR0FBMEI7QUFBQTs7QUFBQTtBQUN4QixZQUFNNUIsTUFBTSxTQUFTLE1BQUksQ0FBQ00sU0FBTCxFQUFyQjs7QUFDQSxZQUFNdUIsV0FBVyxHQUFHN0IsTUFBTSxDQUFDOEIsZ0JBQVAsQ0FBd0IsTUFBSSxDQUFDQyxPQUFMLEVBQXhCLENBQXBCOztBQUVBRixNQUFBQSxXQUFXLENBQUNHLE1BQVosQ0FBbUIsTUFBSSxDQUFDM0IsT0FBTCxHQUFlUyxHQUFmLEVBQW5COztBQUNBLE1BQUEsTUFBSSxDQUFDZCxNQUFMLENBQVlpQyxLQUFaO0FBTHdCO0FBTXpCOztBQWhIK0M7O0FBbUhsREMsK0JBQVdDLGVBQVgsQ0FBMkIsQ0FBQ3pDLGtCQUFELENBQTNCOztlQUNlQSxrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOCBTcGluYWxDb20gLSB3d3cuc3BpbmFsY29tLmNvbVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFNwaW5hbENvcmUuXG4gKlxuICogUGxlYXNlIHJlYWQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgdGVybXMgYW5kIGNvbmRpdGlvbnNcbiAqIG9mIHRoZSBGcmVlIFNvZnR3YXJlIGxpY2Vuc2UgQWdyZWVtZW50IChcIkFncmVlbWVudFwiKVxuICogY2FyZWZ1bGx5LlxuICpcbiAqIFRoaXMgQWdyZWVtZW50IGlzIGEgbGVnYWxseSBiaW5kaW5nIGNvbnRyYWN0IGJldHdlZW5cbiAqIHRoZSBMaWNlbnNlZSAoYXMgZGVmaW5lZCBiZWxvdykgYW5kIFNwaW5hbENvbSB0aGF0XG4gKiBzZXRzIGZvcnRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyB0aGF0IGdvdmVybiB5b3VyXG4gKiB1c2Ugb2YgdGhlIFByb2dyYW0uIEJ5IGluc3RhbGxpbmcgYW5kL29yIHVzaW5nIHRoZVxuICogUHJvZ3JhbSwgeW91IGFncmVlIHRvIGFiaWRlIGJ5IGFsbCB0aGUgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zIHN0YXRlZCBvciByZWZlcmVuY2VkIGhlcmVpbi5cbiAqXG4gKiBJZiB5b3UgZG8gbm90IGFncmVlIHRvIGFiaWRlIGJ5IHRoZXNlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucywgZG8gbm90IGRlbW9uc3RyYXRlIHlvdXIgYWNjZXB0YW5jZSBhbmQgZG9cbiAqIG5vdCBpbnN0YWxsIG9yIHVzZSB0aGUgUHJvZ3JhbS5cbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYWxvbmdcbiAqIHdpdGggdGhpcyBmaWxlLiBJZiBub3QsIHNlZVxuICogPGh0dHA6Ly9yZXNvdXJjZXMuc3BpbmFsY29tLmNvbS9saWNlbnNlcy5wZGY+LlxuICovXG5pbXBvcnQgc3BpbmFsQ29yZSBmcm9tIFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNcIjtcbmltcG9ydCB7XG4gIHByb21pc2VMb2FkLFxuICBndWlkXG59IGZyb20gXCIuLi9VdGlsaXRpZXNcIjtcbmltcG9ydCBTcGluYWxOb2RlIGZyb20gXCIuLi9Ob2Rlcy9TcGluYWxOb2RlXCI7XG5pbXBvcnQgU3BpbmFsTm9kZVBvaW50ZXIgZnJvbSBcIi4uL1NwaW5hbE5vZGVQb2ludGVyXCI7XG5pbXBvcnQgU3BpbmFsTWFwIGZyb20gXCIuLi9TcGluYWxNYXBcIjtcblxuY29uc3QgZ2xvYmFsVHlwZSA9IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB3aW5kb3c7XG5cbmNsYXNzIEJhc2VTcGluYWxSZWxhdGlvbiBleHRlbmRzIGdsb2JhbFR5cGUuTW9kZWwge1xuICAvKipcbiAgICogQ29uc3RydWN0b3IgZm9yIHRoZSBCYXNlU3BpbmFsUmVsYXRpb24gY2xhc3MuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIE5hbWUgb2YgdGhlIHJlbGF0aW9uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmFkZF9hdHRyKHtcbiAgICAgIGlkOiBndWlkKG5hbWUpLFxuICAgICAgbmFtZTogbmFtZSxcbiAgICAgIHBhcmVudDogbmV3IFNwaW5hbE5vZGVQb2ludGVyKCksXG4gICAgICBjb250ZXh0SWRzOiBuZXcgU3BpbmFsTWFwKClcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG9ydGN1dCB0byBpZC5cbiAgICogQHJldHVybiB7U3RyfSBJZCBvZiB0aGUgcmVsYXRpb25cbiAgICovXG4gIGdldElkKCkge1xuICAgIHJldHVybiB0aGlzLmlkO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIG5hbWUgb2YgdGhlIHJlbGF0aW9uLlxuICAgKiBAcmV0dXJuIHtTdHJ9IE5hbWUgb2YgdGhlIHJlbGF0aW9uXG4gICAqL1xuICBnZXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWU7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcGFyZW50IG9mIHRoZSByZWxhdGlvbi5cbiAgICogQHJldHVybiB7UHJvbWlzZTxTcGluYWxOb2RlPn0gUmV0dXJucyBhIHByb21pc2Ugd2hlcmUgdGhlIHJlc29sdmUgaXMgdGhlIHBhcmVudFxuICAgKi9cbiAgZ2V0UGFyZW50KCkge1xuICAgIHJldHVybiBwcm9taXNlTG9hZCh0aGlzLnBhcmVudCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGxpc3Qgb2YgdGhlIGNvbnRleHRzIHRoZSByZWxhdGlvbiBpcyBhc3NvY2lhdGVkIHRvLlxuICAgKiBAcmV0dXJuIHtBcnJheTxTdHJpbmc+fSBBIGxpc3Qgb2YgaWRzIG9mIHRoZSBhc3NvY2lhdGVkIGNvbnRleHRzXG4gICAqL1xuICBnZXRDb250ZXh0SWRzKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHRJZHMua2V5cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYW4gaWQgdG8gdGhlIGNvbnRleHQgaWRzIG9mIHRoZSByZWxhdGlvbi5cbiAgICogQHBhcmFtIHtTdHJpbmd9IGlkIElkIG9mIHRoZSBjb250ZXh0XG4gICAqL1xuICBhZGRDb250ZXh0SWQoaWQpIHtcbiAgICBpZiAoIXRoaXMuY29udGV4dElkcy5oYXMoaWQpKSB7XG4gICAgICB0aGlzLmNvbnRleHRJZHMuc2V0RWxlbWVudChpZCwgMCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgcmVsYXRpb24gYmVsb25ncyB0byB0aGUgY29udGV4dC5cbiAgICogQHBhcmFtIHtTcGluYWxDb250ZXh0fSBjb250ZXh0IFRoZSBjb250ZXh0IHRoYXQgbWlnaHQgb3duIHRoZSBub2RlXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59IEEgYm9vbGVhblxuICAgKi9cbiAgYmVsb25nc1RvQ29udGV4dChjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGV4dElkcy5oYXMoY29udGV4dC5nZXRJZCgpLmdldCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBwYXJlbnQgb2YgdGhlIHJlbGF0aW9uLiBJZiBhIHBhcmVudCB3YXMgYWxyZWFkeSBzZXQsIHRoZSBwYXJlbnQgcmVsYXRpb24gaXMgcmVtb3ZlZC5cbiAgICogQHBhcmFtIHtTcGluYWxOb2RlfSBwYXJlbnQgTmV3IHBhcmVudCBvZiB0aGUgcmVsYXRpb25cbiAgICovXG4gIHNldFBhcmVudChwYXJlbnQpIHtcbiAgICBpZiAodHlwZW9mIHBhcmVudCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwYXJlbnQgaW5zdGFuY2VvZiBTcGluYWxOb2RlKSB7XG4gICAgICB0aGlzLnBhcmVudC5zZXRFbGVtZW50KHBhcmVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIGNoaWxkcmVuIGZyb20gdGhlIHJlbGF0aW9uLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPG5vdGhpbmc+fSBBbiBlbXB0eSBwcm9taXNlXG4gICAqL1xuICBhc3luYyByZW1vdmVDaGlsZHJlbigpIHtcbiAgICBjb25zdCBjaGlsZHJlbiA9IGF3YWl0IHRoaXMuZ2V0Q2hpbGRyZW4oKTtcbiAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLnJlbW92ZUNoaWxkKGNoaWxkcmVuW2ldKSk7XG4gICAgfVxuICAgIGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSByZWxhdGlvbiBmcm9tIHRoZSBncmFwaC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxub3RoaW5nPn0gQW4gZW1wdHkgcHJvbWlzZVxuICAgKi9cbiAgYXN5bmMgcmVtb3ZlRnJvbUdyYXBoKCkge1xuICAgIGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21QYXJlbnQoKSxcbiAgICAgIHRoaXMucmVtb3ZlQ2hpbGRyZW4oKVxuICAgIF0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIHJlbGF0aW9uIGZyb20gdGhlIHBhcmVudC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxub3RoaW5nPn0gQW4gZW1wdHkgcHJvbWlzZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYXN5bmMgX3JlbW92ZUZyb21QYXJlbnQoKSB7XG4gICAgY29uc3QgcGFyZW50ID0gYXdhaXQgdGhpcy5nZXRQYXJlbnQoKTtcbiAgICBjb25zdCByZWxhdGlvbk1hcCA9IHBhcmVudC5fZ2V0Q2hpbGRyZW5UeXBlKHRoaXMuZ2V0VHlwZSgpKTtcblxuICAgIHJlbGF0aW9uTWFwLmRlbGV0ZSh0aGlzLmdldE5hbWUoKS5nZXQoKSk7XG4gICAgdGhpcy5wYXJlbnQudW5zZXQoKTtcbiAgfVxufVxuXG5zcGluYWxDb3JlLnJlZ2lzdGVyX21vZGVscyhbQmFzZVNwaW5hbFJlbGF0aW9uXSk7XG5leHBvcnQgZGVmYXVsdCBCYXNlU3BpbmFsUmVsYXRpb247XG4iXX0=