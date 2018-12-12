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
   * Removes children from the relation.
   * @param {Array<SpinalNode>} nodes Childs to remove
   * @returns {Promise<Array<Boolean>>} A promise containing an array of boolean
   */


  removeChildren(nodes) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const promises = [];

      if (nodes === undefined || nodes.length === 0) {
        nodes = yield _this.getChildren();
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          let node = _step.value;
          promises.push(_this.removeChild(node));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return yield Promise.all(promises);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9SZWxhdGlvbnMvQmFzZVNwaW5hbFJlbGF0aW9uLmpzIl0sIm5hbWVzIjpbImdsb2JhbFR5cGUiLCJ3aW5kb3ciLCJnbG9iYWwiLCJCYXNlU3BpbmFsUmVsYXRpb24iLCJNb2RlbCIsImNvbnN0cnVjdG9yIiwibmFtZSIsImFkZF9hdHRyIiwiaWQiLCJwYXJlbnQiLCJTcGluYWxOb2RlUG9pbnRlciIsImNvbnRleHRJZHMiLCJTcGluYWxNYXAiLCJnZXRJZCIsImdldE5hbWUiLCJnZXRQYXJlbnQiLCJsb2FkIiwiZ2V0Q29udGV4dElkcyIsImtleXMiLCJhZGRDb250ZXh0SWQiLCJoYXMiLCJzZXRFbGVtZW50IiwiYmVsb25nc1RvQ29udGV4dCIsImNvbnRleHQiLCJnZXQiLCJzZXRQYXJlbnQiLCJTcGluYWxOb2RlIiwicmVtb3ZlQ2hpbGRyZW4iLCJub2RlcyIsInByb21pc2VzIiwidW5kZWZpbmVkIiwibGVuZ3RoIiwiZ2V0Q2hpbGRyZW4iLCJub2RlIiwicHVzaCIsInJlbW92ZUNoaWxkIiwiUHJvbWlzZSIsImFsbCIsInJlbW92ZUZyb21HcmFwaCIsIl9yZW1vdmVGcm9tUGFyZW50IiwicmVsYXRpb25NYXAiLCJfZ2V0Q2hpbGRyZW5UeXBlIiwiZ2V0VHlwZSIsImRlbGV0ZSIsInVuc2V0Iiwic3BpbmFsQ29yZSIsInJlZ2lzdGVyX21vZGVscyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQXVCQTs7QUFDQTs7QUFHQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFQSxNQUFNQSxVQUFVLEdBQUcsT0FBT0MsTUFBUCxLQUFrQixXQUFsQixHQUFnQ0MsTUFBaEMsR0FBeUNELE1BQTVEOztBQUVBLE1BQU1FLGtCQUFOLFNBQWlDSCxVQUFVLENBQUNJLEtBQTVDLENBQWtEO0FBQ2hEOzs7O0FBSUFDLEVBQUFBLFdBQVcsQ0FBQ0MsSUFBRCxFQUFPO0FBQ2hCO0FBQ0EsU0FBS0MsUUFBTCxDQUFjO0FBQ1pDLE1BQUFBLEVBQUUsRUFBRSxxQkFBS0Ys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QUFYLENBQTJCLENBQUMzQyxrQkFBRCxDQUEzQjs7ZUFDZUEsa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTggU3BpbmFsQ29tIC0gd3d3LnNwaW5hbGNvbS5jb21cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBTcGluYWxDb3JlLlxuICpcbiAqIFBsZWFzZSByZWFkIGFsbCBvZiB0aGUgZm9sbG93aW5nIHRlcm1zIGFuZCBjb25kaXRpb25zXG4gKiBvZiB0aGUgRnJlZSBTb2Z0d2FyZSBsaWNlbnNlIEFncmVlbWVudCAoXCJBZ3JlZW1lbnRcIilcbiAqIGNhcmVmdWxseS5cbiAqXG4gKiBUaGlzIEFncmVlbWVudCBpcyBhIGxlZ2FsbHkgYmluZGluZyBjb250cmFjdCBiZXR3ZWVuXG4gKiB0aGUgTGljZW5zZWUgKGFzIGRlZmluZWQgYmVsb3cpIGFuZCBTcGluYWxDb20gdGhhdFxuICogc2V0cyBmb3J0aCB0aGUgdGVybXMgYW5kIGNvbmRpdGlvbnMgdGhhdCBnb3Zlcm4geW91clxuICogdXNlIG9mIHRoZSBQcm9ncmFtLiBCeSBpbnN0YWxsaW5nIGFuZC9vciB1c2luZyB0aGVcbiAqIFByb2dyYW0sIHlvdSBhZ3JlZSB0byBhYmlkZSBieSBhbGwgdGhlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucyBzdGF0ZWQgb3IgcmVmZXJlbmNlZCBoZXJlaW4uXG4gKlxuICogSWYgeW91IGRvIG5vdCBhZ3JlZSB0byBhYmlkZSBieSB0aGVzZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMsIGRvIG5vdCBkZW1vbnN0cmF0ZSB5b3VyIGFjY2VwdGFuY2UgYW5kIGRvXG4gKiBub3QgaW5zdGFsbCBvciB1c2UgdGhlIFByb2dyYW0uXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFsb25nXG4gKiB3aXRoIHRoaXMgZmlsZS4gSWYgbm90LCBzZWVcbiAqIDxodHRwOi8vcmVzb3VyY2VzLnNwaW5hbGNvbS5jb20vbGljZW5zZXMucGRmPi5cbiAqL1xuaW1wb3J0IHNwaW5hbENvcmUgZnJvbSBcInNwaW5hbC1jb3JlLWNvbm5lY3RvcmpzXCI7XG5pbXBvcnQge1xuICBndWlkXG59IGZyb20gXCIuLi9VdGlsaXRpZXNcIjtcbmltcG9ydCBTcGluYWxOb2RlIGZyb20gXCIuLi9Ob2Rlcy9TcGluYWxOb2RlXCI7XG5pbXBvcnQgU3BpbmFsTm9kZVBvaW50ZXIgZnJvbSBcIi4uL1NwaW5hbE5vZGVQb2ludGVyXCI7XG5pbXBvcnQgU3BpbmFsTWFwIGZyb20gXCIuLi9TcGluYWxNYXBcIjtcblxuY29uc3QgZ2xvYmFsVHlwZSA9IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB3aW5kb3c7XG5cbmNsYXNzIEJhc2VTcGluYWxSZWxhdGlvbiBleHRlbmRzIGdsb2JhbFR5cGUuTW9kZWwge1xuICAvKipcbiAgICogQ29uc3RydWN0b3IgZm9yIHRoZSBCYXNlU3BpbmFsUmVsYXRpb24gY2xhc3MuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIE5hbWUgb2YgdGhlIHJlbGF0aW9uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmFkZF9hdHRyKHtcbiAgICAgIGlkOiBndWlkKG5hbWUpLFxuICAgICAgbmFtZTogbmFtZSxcbiAgICAgIHBhcmVudDogbmV3IFNwaW5hbE5vZGVQb2ludGVyKCksXG4gICAgICBjb250ZXh0SWRzOiBuZXcgU3BpbmFsTWFwKClcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG9ydGN1dCB0byBpZC5cbiAgICogQHJldHVybnMge1N0cn0gSWQgb2YgdGhlIHJlbGF0aW9uXG4gICAqL1xuICBnZXRJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5pZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBuYW1lIG9mIHRoZSByZWxhdGlvbi5cbiAgICogQHJldHVybnMge1N0cn0gTmFtZSBvZiB0aGUgcmVsYXRpb25cbiAgICovXG4gIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBwYXJlbnQgb2YgdGhlIHJlbGF0aW9uLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxTcGluYWxOb2RlPn0gUmV0dXJucyBhIHByb21pc2Ugd2hlcmUgdGhlIHJlc29sdmUgaXMgdGhlIHBhcmVudFxuICAgKi9cbiAgZ2V0UGFyZW50KCkge1xuICAgIHJldHVybiB0aGlzLnBhcmVudC5sb2FkKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGxpc3Qgb2YgdGhlIGNvbnRleHRzIHRoZSByZWxhdGlvbiBpcyBhc3NvY2lhdGVkIHRvLlxuICAgKiBAcmV0dXJucyB7QXJyYXk8U3RyaW5nPn0gQSBsaXN0IG9mIGlkcyBvZiB0aGUgYXNzb2NpYXRlZCBjb250ZXh0c1xuICAgKi9cbiAgZ2V0Q29udGV4dElkcygpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0SWRzLmtleXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGFuIGlkIHRvIHRoZSBjb250ZXh0IGlkcyBvZiB0aGUgcmVsYXRpb24uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBpZCBJZCBvZiB0aGUgY29udGV4dFxuICAgKi9cbiAgYWRkQ29udGV4dElkKGlkKSB7XG4gICAgaWYgKCF0aGlzLmNvbnRleHRJZHMuaGFzKGlkKSkge1xuICAgICAgdGhpcy5jb250ZXh0SWRzLnNldEVsZW1lbnQoaWQsIDApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHJlbGF0aW9uIGJlbG9uZ3MgdG8gdGhlIGNvbnRleHQuXG4gICAqIEBwYXJhbSB7U3BpbmFsQ29udGV4dH0gY29udGV4dCBUaGUgY29udGV4dCB0aGF0IG1pZ2h0IG93biB0aGUgbm9kZVxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gQSBib29sZWFuXG4gICAqL1xuICBiZWxvbmdzVG9Db250ZXh0KGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0SWRzLmhhcyhjb250ZXh0LmdldElkKCkuZ2V0KCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHBhcmVudCBvZiB0aGUgcmVsYXRpb24uIElmIGEgcGFyZW50IHdhcyBhbHJlYWR5IHNldCwgdGhlIHBhcmVudCByZWxhdGlvbiBpcyByZW1vdmVkLlxuICAgKiBAcGFyYW0ge1NwaW5hbE5vZGV9IHBhcmVudCBOZXcgcGFyZW50IG9mIHRoZSByZWxhdGlvblxuICAgKi9cbiAgc2V0UGFyZW50KHBhcmVudCkge1xuICAgIGlmICh0eXBlb2YgcGFyZW50ICE9PSBcInVuZGVmaW5lZFwiICYmIHBhcmVudCBpbnN0YW5jZW9mIFNwaW5hbE5vZGUpIHtcbiAgICAgIHRoaXMucGFyZW50LnNldEVsZW1lbnQocGFyZW50KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBjaGlsZHJlbiBmcm9tIHRoZSByZWxhdGlvbi5cbiAgICogQHBhcmFtIHtBcnJheTxTcGluYWxOb2RlPn0gbm9kZXMgQ2hpbGRzIHRvIHJlbW92ZVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxCb29sZWFuPj59IEEgcHJvbWlzZSBjb250YWluaW5nIGFuIGFycmF5IG9mIGJvb2xlYW5cbiAgICovXG4gIGFzeW5jIHJlbW92ZUNoaWxkcmVuKG5vZGVzKSB7XG4gICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcblxuICAgIGlmIChub2RlcyA9PT0gdW5kZWZpbmVkIHx8IG5vZGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgbm9kZXMgPSBhd2FpdCB0aGlzLmdldENoaWxkcmVuKCk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xuICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLnJlbW92ZUNoaWxkKG5vZGUpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIHJlbGF0aW9uIGZyb20gdGhlIGdyYXBoLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxub3RoaW5nPn0gQW4gZW1wdHkgcHJvbWlzZVxuICAgKi9cbiAgYXN5bmMgcmVtb3ZlRnJvbUdyYXBoKCkge1xuICAgIGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21QYXJlbnQoKSxcbiAgICAgIHRoaXMucmVtb3ZlQ2hpbGRyZW4oKVxuICAgIF0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIHJlbGF0aW9uIGZyb20gdGhlIHBhcmVudC5cbiAgICogQHJldHVybnMge1Byb21pc2U8bm90aGluZz59IEFuIGVtcHR5IHByb21pc2VcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFzeW5jIF9yZW1vdmVGcm9tUGFyZW50KCkge1xuICAgIGNvbnN0IHBhcmVudCA9IGF3YWl0IHRoaXMuZ2V0UGFyZW50KCk7XG4gICAgY29uc3QgcmVsYXRpb25NYXAgPSBwYXJlbnQuX2dldENoaWxkcmVuVHlwZSh0aGlzLmdldFR5cGUoKSk7XG5cbiAgICByZWxhdGlvbk1hcC5kZWxldGUodGhpcy5nZXROYW1lKCkuZ2V0KCkpO1xuICAgIHRoaXMucGFyZW50LnVuc2V0KCk7XG4gIH1cbn1cblxuc3BpbmFsQ29yZS5yZWdpc3Rlcl9tb2RlbHMoW0Jhc2VTcGluYWxSZWxhdGlvbl0pO1xuZXhwb3J0IGRlZmF1bHQgQmFzZVNwaW5hbFJlbGF0aW9uO1xuIl19