"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _spinalCoreConnectorjs_type = require("spinal-core-connectorjs_type");

var _Utilities = require("../Utilities");

var _index = require("../index");

var _SpinalNodePointer = _interopRequireDefault(require("../SpinalNodePointer"));

var _SpinalMap = _interopRequireDefault(require("../SpinalMap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Base for all relation in a SpinalGraph.
 * @extends Model
 * @abstract
 */
class BaseSpinalRelation extends _spinalCoreConnectorjs_type.Model {
  /**
   * Constructor for the BaseSpinalRelation class.
   * @param {SpinalNode} parent Parent of the relation
   * @param {string} name Name of the relation
   * @throws {TypeError} If the parent is not a node
   * @throws {TypeError} If the name is not a string
   */
  constructor(parent, name) {
    super(); // instanceof doesn't work here

    if (!_index.SpinalNode.prototype.isPrototypeOf(parent)) {
      throw TypeError("parent must be a node");
    }

    if (typeof name !== "string") {
      throw TypeError("name must be a string");
    }

    this.add_attr({
      id: (0, _Utilities.guid)(name),
      name: name,
      parent: new _SpinalNodePointer.default(parent),
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
   * Adds an id to the context ids of the relation.
   * @param {string} id Id of the context
   * @throws {TypeError} If the id is not a string
   */


  addContextId(id) {
    if (typeof id !== "string") {
      throw TypeError("id must be a string");
    }

    if (!this.contextIds.has(id)) {
      this.contextIds.setElement(id, 0);
    }
  }
  /**
   * Returns a list of the contexts the relation is associated to.
   * @returns {Array<string>} A list of ids of the associated contexts
   */


  getContextIds() {
    return this.contextIds.keys();
  }
  /**
   * Returns true if the relation belongs to the context.
   * @param {SpinalContext} context The context that might own the node
   * @returns {Boolean} A boolean
   * @throws {TypeError} If the context is not a SpinalContext
   */


  belongsToContext(context) {
    if (!(context instanceof _index.SpinalContext)) {
      throw TypeError("context must be a SpinalContext");
    }

    return this.contextIds.has(context.getId().get());
  }
  /**
   * Removes children from the relation.
   * @param {Array<SpinalNode>} nodes Childs to remove
   * @returns {Promise<nothing>} An empty promise
   * @throws {TypeError} If nodes is not an array or omitted
   * @throws {Error} If one of the nodes is not a child
   */


  removeChildren(nodes = []) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const promises = [];

      if (!Array.isArray(nodes)) {
        throw TypeError("node must be an array");
      }

      if (nodes.length === 0) {
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

_spinalCoreConnectorjs_type.spinalCore.register_models([BaseSpinalRelation]);

var _default = BaseSpinalRelation;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9SZWxhdGlvbnMvQmFzZVNwaW5hbFJlbGF0aW9uLmpzIl0sIm5hbWVzIjpbIkJhc2VTcGluYWxSZWxhdGlvbiIsIk1vZGVsIiwiY29uc3RydWN0b3IiLCJwYXJlbnQiLCJuYW1lIiwiU3BpbmFsTm9kZSIsInByb3RvdHlwZSIsImlzUHJvdG90eXBlT2YiLCJUeXBlRXJyb3IiLCJhZGRfYXR0ciIsImlkIiwiU3BpbmFsTm9kZVBvaW50ZXIiLCJjb250ZXh0SWRzIiwiU3BpbmFsTWFwIiwiZ2V0SWQiLCJnZXROYW1lIiwiZ2V0UGFyZW50IiwibG9hZCIsImFkZENvbnRleHRJZCIsImhhcyIsInNldEVsZW1lbnQiLCJnZXRDb250ZXh0SWRzIiwia2V5cyIsImJlbG9uZ3NUb0NvbnRleHQiLCJjb250ZXh0IiwiU3BpbmFsQ29udGV4dCIsImdldCIsInJlbW92ZUNoaWxkcmVuIiwibm9kZXMiLCJwcm9taXNlcyIsIkFycmF5IiwiaXNBcnJheSIsImxlbmd0aCIsImdldENoaWxkcmVuIiwibm9kZSIsInB1c2giLCJyZW1vdmVDaGlsZCIsIlByb21pc2UiLCJhbGwiLCJFcnJvciIsInJlbW92ZUZyb21HcmFwaCIsIl9yZW1vdmVGcm9tUGFyZW50IiwicmVsYXRpb25NYXAiLCJfZ2V0Q2hpbGRyZW5UeXBlIiwiZ2V0VHlwZSIsImRlbGV0ZSIsInVuc2V0Iiwic3BpbmFsQ29yZSIsInJlZ2lzdGVyX21vZGVscyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQXVCQTs7QUFLQTs7QUFJQTs7QUFJQTs7QUFDQTs7Ozs7Ozs7QUFFQTs7Ozs7QUFLQSxNQUFNQSxrQkFBTixTQUFpQ0MsaUNBQWpDLENBQXVDO0FBQ3JDOzs7Ozs7O0FBT0FDLEVBQUFBLFdBQVcsQ0FBQ0MsTUFBRCxFQUFTQyxJQUFULEVBQWU7QUFDeEIsWUFEd0IsQ0FHeEI7O0FBQ0EsUUFBSSxDQUFDQyxrQkFBV0MsU0FBWCxDQUFxQkMsYUFBckIsQ0FBbUNKLE1BQW5DLENBQUwsRUFBaUQ7QUFD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LENBQU47QUFEc0I7QUFLdkI7QUFFRDs7Ozs7OztBQUtNYyxFQUFBQSxpQkFBTixHQUEwQjtBQUFBOztBQUFBO0FBQ3hCLFlBQU10QyxNQUFNLFNBQVMsTUFBSSxDQUFDYSxTQUFMLEVBQXJCOztBQUNBLFlBQU0wQixXQUFXLEdBQUd2QyxNQUFNLENBQUN3QyxnQkFBUCxDQUF3QixNQUFJLENBQUNDLE9BQUwsRUFBeEIsQ0FBcEI7O0FBRUFGLE1BQUFBLFdBQVcsQ0FBQ0csTUFBWixDQUFtQixNQUFJLENBQUM5QixPQUFMLEdBQWVXLEdBQWYsRUFBbkI7O0FBQ0EsTUFBQSxNQUFJLENBQUN2QixNQUFMLENBQVkyQyxLQUFaO0FBTHdCO0FBTXpCOztBQTVJb0M7O0FBK0l2Q0MsdUNBQVdDLGVBQVgsQ0FBMkIsQ0FBQ2hELGtCQUFELENBQTNCOztlQUNlQSxrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOCBTcGluYWxDb20gLSB3d3cuc3BpbmFsY29tLmNvbVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFNwaW5hbENvcmUuXG4gKlxuICogUGxlYXNlIHJlYWQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgdGVybXMgYW5kIGNvbmRpdGlvbnNcbiAqIG9mIHRoZSBGcmVlIFNvZnR3YXJlIGxpY2Vuc2UgQWdyZWVtZW50IChcIkFncmVlbWVudFwiKVxuICogY2FyZWZ1bGx5LlxuICpcbiAqIFRoaXMgQWdyZWVtZW50IGlzIGEgbGVnYWxseSBiaW5kaW5nIGNvbnRyYWN0IGJldHdlZW5cbiAqIHRoZSBMaWNlbnNlZSAoYXMgZGVmaW5lZCBiZWxvdykgYW5kIFNwaW5hbENvbSB0aGF0XG4gKiBzZXRzIGZvcnRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyB0aGF0IGdvdmVybiB5b3VyXG4gKiB1c2Ugb2YgdGhlIFByb2dyYW0uIEJ5IGluc3RhbGxpbmcgYW5kL29yIHVzaW5nIHRoZVxuICogUHJvZ3JhbSwgeW91IGFncmVlIHRvIGFiaWRlIGJ5IGFsbCB0aGUgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zIHN0YXRlZCBvciByZWZlcmVuY2VkIGhlcmVpbi5cbiAqXG4gKiBJZiB5b3UgZG8gbm90IGFncmVlIHRvIGFiaWRlIGJ5IHRoZXNlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucywgZG8gbm90IGRlbW9uc3RyYXRlIHlvdXIgYWNjZXB0YW5jZSBhbmQgZG9cbiAqIG5vdCBpbnN0YWxsIG9yIHVzZSB0aGUgUHJvZ3JhbS5cbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYWxvbmdcbiAqIHdpdGggdGhpcyBmaWxlLiBJZiBub3QsIHNlZVxuICogPGh0dHA6Ly9yZXNvdXJjZXMuc3BpbmFsY29tLmNvbS9saWNlbnNlcy5wZGY+LlxuICovXG5pbXBvcnQge1xuICBzcGluYWxDb3JlLFxuICBNb2RlbFxufSBmcm9tIFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNfdHlwZVwiO1xuXG5pbXBvcnQge1xuICBndWlkXG59IGZyb20gXCIuLi9VdGlsaXRpZXNcIjtcblxuaW1wb3J0IHtcbiAgU3BpbmFsTm9kZSxcbiAgU3BpbmFsQ29udGV4dFxufSBmcm9tIFwiLi4vaW5kZXhcIjtcbmltcG9ydCBTcGluYWxOb2RlUG9pbnRlciBmcm9tIFwiLi4vU3BpbmFsTm9kZVBvaW50ZXJcIjtcbmltcG9ydCBTcGluYWxNYXAgZnJvbSBcIi4uL1NwaW5hbE1hcFwiO1xuXG4vKipcbiAqIEJhc2UgZm9yIGFsbCByZWxhdGlvbiBpbiBhIFNwaW5hbEdyYXBoLlxuICogQGV4dGVuZHMgTW9kZWxcbiAqIEBhYnN0cmFjdFxuICovXG5jbGFzcyBCYXNlU3BpbmFsUmVsYXRpb24gZXh0ZW5kcyBNb2RlbCB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIEJhc2VTcGluYWxSZWxhdGlvbiBjbGFzcy5cbiAgICogQHBhcmFtIHtTcGluYWxOb2RlfSBwYXJlbnQgUGFyZW50IG9mIHRoZSByZWxhdGlvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBOYW1lIG9mIHRoZSByZWxhdGlvblxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBwYXJlbnQgaXMgbm90IGEgbm9kZVxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBuYW1lIGlzIG5vdCBhIHN0cmluZ1xuICAgKi9cbiAgY29uc3RydWN0b3IocGFyZW50LCBuYW1lKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIC8vIGluc3RhbmNlb2YgZG9lc24ndCB3b3JrIGhlcmVcbiAgICBpZiAoIVNwaW5hbE5vZGUucHJvdG90eXBlLmlzUHJvdG90eXBlT2YocGFyZW50KSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwicGFyZW50IG11c3QgYmUgYSBub2RlXCIpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgbmFtZSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwibmFtZSBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIH1cblxuICAgIHRoaXMuYWRkX2F0dHIoe1xuICAgICAgaWQ6IGd1aWQobmFtZSksXG4gICAgICBuYW1lOiBuYW1lLFxuICAgICAgcGFyZW50OiBuZXcgU3BpbmFsTm9kZVBvaW50ZXIocGFyZW50KSxcbiAgICAgIGNvbnRleHRJZHM6IG5ldyBTcGluYWxNYXAoKVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3J0Y3V0IHRvIGlkLlxuICAgKiBAcmV0dXJucyB7U3RyfSBJZCBvZiB0aGUgcmVsYXRpb25cbiAgICovXG4gIGdldElkKCkge1xuICAgIHJldHVybiB0aGlzLmlkO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIG5hbWUgb2YgdGhlIHJlbGF0aW9uLlxuICAgKiBAcmV0dXJucyB7U3RyfSBOYW1lIG9mIHRoZSByZWxhdGlvblxuICAgKi9cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHBhcmVudCBvZiB0aGUgcmVsYXRpb24uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFNwaW5hbE5vZGU+fSBSZXR1cm5zIGEgcHJvbWlzZSB3aGVyZSB0aGUgcmVzb2x2ZSBpcyB0aGUgcGFyZW50XG4gICAqL1xuICBnZXRQYXJlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyZW50LmxvYWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGFuIGlkIHRvIHRoZSBjb250ZXh0IGlkcyBvZiB0aGUgcmVsYXRpb24uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBJZCBvZiB0aGUgY29udGV4dFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBpZCBpcyBub3QgYSBzdHJpbmdcbiAgICovXG4gIGFkZENvbnRleHRJZChpZCkge1xuICAgIGlmICh0eXBlb2YgaWQgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcImlkIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmNvbnRleHRJZHMuaGFzKGlkKSkge1xuICAgICAgdGhpcy5jb250ZXh0SWRzLnNldEVsZW1lbnQoaWQsIDApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbGlzdCBvZiB0aGUgY29udGV4dHMgdGhlIHJlbGF0aW9uIGlzIGFzc29jaWF0ZWQgdG8uXG4gICAqIEByZXR1cm5zIHtBcnJheTxzdHJpbmc+fSBBIGxpc3Qgb2YgaWRzIG9mIHRoZSBhc3NvY2lhdGVkIGNvbnRleHRzXG4gICAqL1xuICBnZXRDb250ZXh0SWRzKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHRJZHMua2V5cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgcmVsYXRpb24gYmVsb25ncyB0byB0aGUgY29udGV4dC5cbiAgICogQHBhcmFtIHtTcGluYWxDb250ZXh0fSBjb250ZXh0IFRoZSBjb250ZXh0IHRoYXQgbWlnaHQgb3duIHRoZSBub2RlXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBBIGJvb2xlYW5cbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgY29udGV4dCBpcyBub3QgYSBTcGluYWxDb250ZXh0XG4gICAqL1xuICBiZWxvbmdzVG9Db250ZXh0KGNvbnRleHQpIHtcbiAgICBpZiAoIShjb250ZXh0IGluc3RhbmNlb2YgU3BpbmFsQ29udGV4dCkpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcImNvbnRleHQgbXVzdCBiZSBhIFNwaW5hbENvbnRleHRcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY29udGV4dElkcy5oYXMoY29udGV4dC5nZXRJZCgpLmdldCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGNoaWxkcmVuIGZyb20gdGhlIHJlbGF0aW9uLlxuICAgKiBAcGFyYW0ge0FycmF5PFNwaW5hbE5vZGU+fSBub2RlcyBDaGlsZHMgdG8gcmVtb3ZlXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPG5vdGhpbmc+fSBBbiBlbXB0eSBwcm9taXNlXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgbm9kZXMgaXMgbm90IGFuIGFycmF5IG9yIG9taXR0ZWRcbiAgICogQHRocm93cyB7RXJyb3J9IElmIG9uZSBvZiB0aGUgbm9kZXMgaXMgbm90IGEgY2hpbGRcbiAgICovXG4gIGFzeW5jIHJlbW92ZUNoaWxkcmVuKG5vZGVzID0gW10pIHtcbiAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG5vZGVzKSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwibm9kZSBtdXN0IGJlIGFuIGFycmF5XCIpXG4gICAgfVxuXG4gICAgaWYgKG5vZGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgbm9kZXMgPSBhd2FpdCB0aGlzLmdldENoaWxkcmVuKCk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xuICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLnJlbW92ZUNoaWxkKG5vZGUpKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgdGhyb3cgRXJyb3IoXCJDb3VsZCBub3QgcmVtb3ZlIGFsbCBub2Rlc1wiKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgcmVsYXRpb24gZnJvbSB0aGUgZ3JhcGguXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPG5vdGhpbmc+fSBBbiBlbXB0eSBwcm9taXNlXG4gICAqL1xuICBhc3luYyByZW1vdmVGcm9tR3JhcGgoKSB7XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbVBhcmVudCgpLFxuICAgICAgdGhpcy5yZW1vdmVDaGlsZHJlbigpXG4gICAgXSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgcmVsYXRpb24gZnJvbSB0aGUgcGFyZW50LlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxub3RoaW5nPn0gQW4gZW1wdHkgcHJvbWlzZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYXN5bmMgX3JlbW92ZUZyb21QYXJlbnQoKSB7XG4gICAgY29uc3QgcGFyZW50ID0gYXdhaXQgdGhpcy5nZXRQYXJlbnQoKTtcbiAgICBjb25zdCByZWxhdGlvbk1hcCA9IHBhcmVudC5fZ2V0Q2hpbGRyZW5UeXBlKHRoaXMuZ2V0VHlwZSgpKTtcblxuICAgIHJlbGF0aW9uTWFwLmRlbGV0ZSh0aGlzLmdldE5hbWUoKS5nZXQoKSk7XG4gICAgdGhpcy5wYXJlbnQudW5zZXQoKTtcbiAgfVxufVxuXG5zcGluYWxDb3JlLnJlZ2lzdGVyX21vZGVscyhbQmFzZVNwaW5hbFJlbGF0aW9uXSk7XG5leHBvcnQgZGVmYXVsdCBCYXNlU3BpbmFsUmVsYXRpb247XG4iXX0=