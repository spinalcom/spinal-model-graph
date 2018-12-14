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
   * @returns {Promise<nothing>} An empty promise
   * @throws {Error} If one of the nodes is not a child
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

      try {
        yield Promise.all(promises);
      } catch (_unused) {
        throw Error("Could not remove all nodes");
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9SZWxhdGlvbnMvQmFzZVNwaW5hbFJlbGF0aW9uLmpzIl0sIm5hbWVzIjpbImdsb2JhbFR5cGUiLCJ3aW5kb3ciLCJnbG9iYWwiLCJCYXNlU3BpbmFsUmVsYXRpb24iLCJNb2RlbCIsImNvbnN0cnVjdG9yIiwibmFtZSIsImFkZF9hdHRyIiwiaWQiLCJwYXJlbnQiLCJTcGluYWxOb2RlUG9pbnRlciIsImNvbnRleHRJZHMiLCJTcGluYWxNYXAiLCJnZXRJZCIsImdldE5hbWUiLCJnZXRQYXJlbnQiLCJsb2FkIiwiZ2V0Q29udGV4dElkcyIsImtleXMiLCJhZGRDb250ZXh0SWQiLCJoYXMiLCJzZXRFbGVtZW50IiwiYmVsb25nc1RvQ29udGV4dCIsImNvbnRleHQiLCJnZXQiLCJzZXRQYXJlbnQiLCJTcGluYWxOb2RlIiwicmVtb3ZlQ2hpbGRyZW4iLCJub2RlcyIsInByb21pc2VzIiwidW5kZWZpbmVkIiwibGVuZ3RoIiwiZ2V0Q2hpbGRyZW4iLCJub2RlIiwicHVzaCIsInJlbW92ZUNoaWxkIiwiUHJvbWlzZSIsImFsbCIsIkVycm9yIiwicmVtb3ZlRnJvbUdyYXBoIiwiX3JlbW92ZUZyb21QYXJlbnQiLCJyZWxhdGlvbk1hcCIsIl9nZXRDaGlsZHJlblR5cGUiLCJnZXRUeXBlIiwiZGVsZXRlIiwidW5zZXQiLCJzcGluYWxDb3JlIiwicmVnaXN0ZXJfbW9kZWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBdUJBOztBQUNBOztBQUdBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVBLE1BQU1BLFVBQVUsR0FBRyxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDQyxNQUFoQyxHQUF5Q0QsTUFBNUQ7O0FBRUEsTUFBTUUsa0JBQU4sU0FBaUNILFVBQVUsQ0FBQ0ksS0FBNUMsQ0FBa0Q7QUFDaEQ7Ozs7QUFJQUMsRUFBQUEsV0FBVyxDQUFDQyxJQUFELEVBQU87QUFDaEI7QUFDQSxTQUFLQyxRQUFMLENBQWM7QUFDWkMsTUFBQUEsRUFBRSxFQUFF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OztBQUNBLE1BQUEsTUFBSSxDQUFDZixNQUFMLENBQVlvQyxLQUFaO0FBTHdCO0FBTXpCOztBQTFIK0M7O0FBNkhsREMsK0JBQVdDLGVBQVgsQ0FBMkIsQ0FBQzVDLGtCQUFELENBQTNCOztlQUNlQSxrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOCBTcGluYWxDb20gLSB3d3cuc3BpbmFsY29tLmNvbVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFNwaW5hbENvcmUuXG4gKlxuICogUGxlYXNlIHJlYWQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgdGVybXMgYW5kIGNvbmRpdGlvbnNcbiAqIG9mIHRoZSBGcmVlIFNvZnR3YXJlIGxpY2Vuc2UgQWdyZWVtZW50IChcIkFncmVlbWVudFwiKVxuICogY2FyZWZ1bGx5LlxuICpcbiAqIFRoaXMgQWdyZWVtZW50IGlzIGEgbGVnYWxseSBiaW5kaW5nIGNvbnRyYWN0IGJldHdlZW5cbiAqIHRoZSBMaWNlbnNlZSAoYXMgZGVmaW5lZCBiZWxvdykgYW5kIFNwaW5hbENvbSB0aGF0XG4gKiBzZXRzIGZvcnRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyB0aGF0IGdvdmVybiB5b3VyXG4gKiB1c2Ugb2YgdGhlIFByb2dyYW0uIEJ5IGluc3RhbGxpbmcgYW5kL29yIHVzaW5nIHRoZVxuICogUHJvZ3JhbSwgeW91IGFncmVlIHRvIGFiaWRlIGJ5IGFsbCB0aGUgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zIHN0YXRlZCBvciByZWZlcmVuY2VkIGhlcmVpbi5cbiAqXG4gKiBJZiB5b3UgZG8gbm90IGFncmVlIHRvIGFiaWRlIGJ5IHRoZXNlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucywgZG8gbm90IGRlbW9uc3RyYXRlIHlvdXIgYWNjZXB0YW5jZSBhbmQgZG9cbiAqIG5vdCBpbnN0YWxsIG9yIHVzZSB0aGUgUHJvZ3JhbS5cbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYWxvbmdcbiAqIHdpdGggdGhpcyBmaWxlLiBJZiBub3QsIHNlZVxuICogPGh0dHA6Ly9yZXNvdXJjZXMuc3BpbmFsY29tLmNvbS9saWNlbnNlcy5wZGY+LlxuICovXG5pbXBvcnQgc3BpbmFsQ29yZSBmcm9tIFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNcIjtcbmltcG9ydCB7XG4gIGd1aWRcbn0gZnJvbSBcIi4uL1V0aWxpdGllc1wiO1xuaW1wb3J0IFNwaW5hbE5vZGUgZnJvbSBcIi4uL05vZGVzL1NwaW5hbE5vZGVcIjtcbmltcG9ydCBTcGluYWxOb2RlUG9pbnRlciBmcm9tIFwiLi4vU3BpbmFsTm9kZVBvaW50ZXJcIjtcbmltcG9ydCBTcGluYWxNYXAgZnJvbSBcIi4uL1NwaW5hbE1hcFwiO1xuXG5jb25zdCBnbG9iYWxUeXBlID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHdpbmRvdztcblxuY2xhc3MgQmFzZVNwaW5hbFJlbGF0aW9uIGV4dGVuZHMgZ2xvYmFsVHlwZS5Nb2RlbCB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIEJhc2VTcGluYWxSZWxhdGlvbiBjbGFzcy5cbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgTmFtZSBvZiB0aGUgcmVsYXRpb25cbiAgICovXG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYWRkX2F0dHIoe1xuICAgICAgaWQ6IGd1aWQobmFtZSksXG4gICAgICBuYW1lOiBuYW1lLFxuICAgICAgcGFyZW50OiBuZXcgU3BpbmFsTm9kZVBvaW50ZXIoKSxcbiAgICAgIGNvbnRleHRJZHM6IG5ldyBTcGluYWxNYXAoKVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3J0Y3V0IHRvIGlkLlxuICAgKiBAcmV0dXJucyB7U3RyfSBJZCBvZiB0aGUgcmVsYXRpb25cbiAgICovXG4gIGdldElkKCkge1xuICAgIHJldHVybiB0aGlzLmlkO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIG5hbWUgb2YgdGhlIHJlbGF0aW9uLlxuICAgKiBAcmV0dXJucyB7U3RyfSBOYW1lIG9mIHRoZSByZWxhdGlvblxuICAgKi9cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHBhcmVudCBvZiB0aGUgcmVsYXRpb24uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFNwaW5hbE5vZGU+fSBSZXR1cm5zIGEgcHJvbWlzZSB3aGVyZSB0aGUgcmVzb2x2ZSBpcyB0aGUgcGFyZW50XG4gICAqL1xuICBnZXRQYXJlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyZW50LmxvYWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbGlzdCBvZiB0aGUgY29udGV4dHMgdGhlIHJlbGF0aW9uIGlzIGFzc29jaWF0ZWQgdG8uXG4gICAqIEByZXR1cm5zIHtBcnJheTxTdHJpbmc+fSBBIGxpc3Qgb2YgaWRzIG9mIHRoZSBhc3NvY2lhdGVkIGNvbnRleHRzXG4gICAqL1xuICBnZXRDb250ZXh0SWRzKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHRJZHMua2V5cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYW4gaWQgdG8gdGhlIGNvbnRleHQgaWRzIG9mIHRoZSByZWxhdGlvbi5cbiAgICogQHBhcmFtIHtTdHJpbmd9IGlkIElkIG9mIHRoZSBjb250ZXh0XG4gICAqL1xuICBhZGRDb250ZXh0SWQoaWQpIHtcbiAgICBpZiAoIXRoaXMuY29udGV4dElkcy5oYXMoaWQpKSB7XG4gICAgICB0aGlzLmNvbnRleHRJZHMuc2V0RWxlbWVudChpZCwgMCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgcmVsYXRpb24gYmVsb25ncyB0byB0aGUgY29udGV4dC5cbiAgICogQHBhcmFtIHtTcGluYWxDb250ZXh0fSBjb250ZXh0IFRoZSBjb250ZXh0IHRoYXQgbWlnaHQgb3duIHRoZSBub2RlXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBBIGJvb2xlYW5cbiAgICovXG4gIGJlbG9uZ3NUb0NvbnRleHQoY29udGV4dCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHRJZHMuaGFzKGNvbnRleHQuZ2V0SWQoKS5nZXQoKSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgcGFyZW50IG9mIHRoZSByZWxhdGlvbi4gSWYgYSBwYXJlbnQgd2FzIGFscmVhZHkgc2V0LCB0aGUgcGFyZW50IHJlbGF0aW9uIGlzIHJlbW92ZWQuXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZX0gcGFyZW50IE5ldyBwYXJlbnQgb2YgdGhlIHJlbGF0aW9uXG4gICAqL1xuICBzZXRQYXJlbnQocGFyZW50KSB7XG4gICAgaWYgKHR5cGVvZiBwYXJlbnQgIT09IFwidW5kZWZpbmVkXCIgJiYgcGFyZW50IGluc3RhbmNlb2YgU3BpbmFsTm9kZSkge1xuICAgICAgdGhpcy5wYXJlbnQuc2V0RWxlbWVudChwYXJlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGNoaWxkcmVuIGZyb20gdGhlIHJlbGF0aW9uLlxuICAgKiBAcGFyYW0ge0FycmF5PFNwaW5hbE5vZGU+fSBub2RlcyBDaGlsZHMgdG8gcmVtb3ZlXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPG5vdGhpbmc+fSBBbiBlbXB0eSBwcm9taXNlXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiBvbmUgb2YgdGhlIG5vZGVzIGlzIG5vdCBhIGNoaWxkXG4gICAqL1xuICBhc3luYyByZW1vdmVDaGlsZHJlbihub2Rlcykge1xuICAgIGNvbnN0IHByb21pc2VzID0gW107XG5cbiAgICBpZiAobm9kZXMgPT09IHVuZGVmaW5lZCB8fCBub2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIG5vZGVzID0gYXdhaXQgdGhpcy5nZXRDaGlsZHJlbigpO1xuICAgIH1cblxuICAgIGZvciAobGV0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgIHByb21pc2VzLnB1c2godGhpcy5yZW1vdmVDaGlsZChub2RlKSk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIHRocm93IEVycm9yKFwiQ291bGQgbm90IHJlbW92ZSBhbGwgbm9kZXNcIik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIHJlbGF0aW9uIGZyb20gdGhlIGdyYXBoLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxub3RoaW5nPn0gQW4gZW1wdHkgcHJvbWlzZVxuICAgKi9cbiAgYXN5bmMgcmVtb3ZlRnJvbUdyYXBoKCkge1xuICAgIGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21QYXJlbnQoKSxcbiAgICAgIHRoaXMucmVtb3ZlQ2hpbGRyZW4oKVxuICAgIF0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIHJlbGF0aW9uIGZyb20gdGhlIHBhcmVudC5cbiAgICogQHJldHVybnMge1Byb21pc2U8bm90aGluZz59IEFuIGVtcHR5IHByb21pc2VcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFzeW5jIF9yZW1vdmVGcm9tUGFyZW50KCkge1xuICAgIGNvbnN0IHBhcmVudCA9IGF3YWl0IHRoaXMuZ2V0UGFyZW50KCk7XG4gICAgY29uc3QgcmVsYXRpb25NYXAgPSBwYXJlbnQuX2dldENoaWxkcmVuVHlwZSh0aGlzLmdldFR5cGUoKSk7XG5cbiAgICByZWxhdGlvbk1hcC5kZWxldGUodGhpcy5nZXROYW1lKCkuZ2V0KCkpO1xuICAgIHRoaXMucGFyZW50LnVuc2V0KCk7XG4gIH1cbn1cblxuc3BpbmFsQ29yZS5yZWdpc3Rlcl9tb2RlbHMoW0Jhc2VTcGluYWxSZWxhdGlvbl0pO1xuZXhwb3J0IGRlZmF1bHQgQmFzZVNwaW5hbFJlbGF0aW9uO1xuIl19