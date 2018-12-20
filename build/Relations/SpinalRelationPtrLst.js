"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _spinalCoreConnectorjs_type = require("spinal-core-connectorjs_type");

var _BaseSpinalRelation = _interopRequireDefault(require("./BaseSpinalRelation"));

var _SpinalRelationFactory = require("./SpinalRelationFactory");

var _index = require("../index");

var _SpinalNodePointer = _interopRequireDefault(require("../SpinalNodePointer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Relation where the children are in Ptr to a Lst.
 * @abstract
 */
class SpinalRelationPtrLst extends _BaseSpinalRelation.default {
  /**
   * Constructor for the SpinalRelationPtrLst class.
   * @param {SpinalNode} parent Parent of the relation
   * @param {String} name Name of the relation
   * @throws {TypeError} If the parent is not a node
   * @throws {TypeError} If the name is not a string
   */
  constructor(parent, name) {
    super(parent, name);
    this.add_attr({
      children: new _SpinalNodePointer.default(new _spinalCoreConnectorjs_type.Lst())
    });
    this.children.info.add_attr("ids", new _spinalCoreConnectorjs_type.Lst());
  }
  /**
   * Retrieves all the ids of the children of the relation and return them inside an array.
   * @returns {Array<String>} Array containing all the children ids of the relation
   */


  getChildrenIds() {
    const idLst = this.children.info.ids;
    const ids = [];

    for (let i = 0; i < idLst.length; i++) {
      ids.push(idLst[i].get());
    }

    return ids;
  }
  /**
   * Return all the children of the relation.
   * @returns {Promise<Array<SpinalNode>>} The children of the relation
   */


  getChildren() {
    var _this = this;

    return _asyncToGenerator(function* () {
      const childrenLst = yield _this.children.load();
      const children = [];

      for (let i = 0; i < childrenLst.length; i++) {
        children.push(childrenLst[i]);
      }

      return children;
    })();
  }
  /**
   * Return all the children of the relation associated to a certain context.
   * @param {SpinalContext} context Context to use for the search
   * @returns {Promise<Array<SpinalNode>>} The children associated to the context
   * @throws {TypeError} If the context is not a SpinalContext
   */


  getChildrenInContext(context) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const childrenLst = yield _this2.children.load();
      const children = [];

      if (!(context instanceof _index.SpinalContext)) {
        throw TypeError("context must be a SpinalContext");
      }

      for (let i = 0; i < childrenLst.length; i++) {
        let child = childrenLst[i];

        if (child.belongsToContext(context)) {
          children.push(child);
        }
      }

      return children;
    })();
  }
  /**
   * Returns the type of the relation.
   * @returns {Number} Type of the relation
   */


  getType() {
    return _SpinalRelationFactory.SPINAL_RELATION_PTR_LST_TYPE;
  }
  /**
   * Adds a child to the relation.
   * @param {SpinalNode | Model} node Node or model to add
   * @returns {Promise<SpinalNode>} Promise containing the node that was added
   * @throws {TypeError} If the node is not a Model
   * @throws {Error} If the node is already a child of the relation
   */


  addChild(node) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      if (!(node instanceof _spinalCoreConnectorjs_type.Model)) {
        throw new Error("Cannot add a child witch is not an instance of SpinalNode or Model.");
      } else if (!(node instanceof _index.SpinalNode)) {
        node = new _index.SpinalNode(undefined, undefined, node);
      }

      if (_this3.getChildrenIds().includes(node.getId().get())) {
        throw new Error("Cannot add a child twice to the same relation.");
      }

      _this3.children.info.ids.push(node.getId());

      node._addParent(_this3);

      yield _this3.children.load().then(children => {
        children.push(node);
      });
      return node;
    })();
  }
  /**
   * Removes a child from the relation.
   * @param {SpinalNode} node Child to remove
   * @returns {Promise<nothing>} An empty promise
   * @throws {Error} If the given node is not a child
   */


  removeChild(node) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      const childrenLst = yield _this4.children.load();

      if (!childrenLst.contains(node)) {
        throw Error("The node is not a child");
      }

      childrenLst.remove(node);

      _this4.children.info.ids.remove(node.getId());

      node._removeParent(_this4);
    })();
  }
  /**
   * Removes children from the relation.
   * @override
   * @param {Array<SpinalNode>} [nodes=[]] Childs to remove
   * @returns {Promise<nothing>} An empty promise
   * @throws {TypeError} If nodes is not an array or omitted
   * @throws {Error} If one of the nodes is not a child
   */


  removeChildren(nodes = []) {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      if (!Array.isArray(nodes)) {
        throw TypeError("node must be an array");
      }

      const childrenLst = yield _this5.children.load();
      let error = false;

      if (nodes.length === 0) {
        childrenLst.clear();

        _this5.children.info.ids.clear();

        return;
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          let node = _step.value;
          let index = childrenLst.indexOf(node);

          if (index !== -1) {
            childrenLst.remove(node);

            _this5.children.info.ids.remove(node.getId());

            node._removeParent(_this5);
          } else {
            error = true;
          }
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

      if (error) {
        throw Error("Could not remove all nodes");
      }
    })();
  }

}

_spinalCoreConnectorjs_type.spinalCore.register_models([SpinalRelationPtrLst]);

var _default = SpinalRelationPtrLst;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9SZWxhdGlvbnMvU3BpbmFsUmVsYXRpb25QdHJMc3QuanMiXSwibmFtZXMiOlsiU3BpbmFsUmVsYXRpb25QdHJMc3QiLCJCYXNlU3BpbmFsUmVsYXRpb24iLCJjb25zdHJ1Y3RvciIsInBhcmVudCIsIm5hbWUiLCJhZGRfYXR0ciIsImNoaWxkcmVuIiwiU3BpbmFsTm9kZVBvaW50ZXIiLCJMc3QiLCJpbmZvIiwiZ2V0Q2hpbGRyZW5JZHMiLCJpZExzdCIsImlkcyIsImkiLCJsZW5ndGgiLCJwdXNoIiwiZ2V0IiwiZ2V0Q2hpbGRyZW4iLCJjaGlsZHJlbkxzdCIsImxvYWQiLCJnZXRDaGlsZHJlbkluQ29udGV4dCIsImNvbnRleHQiLCJTcGluYWxDb250ZXh0IiwiVHlwZUVycm9yIiwiY2hpbGQiLCJiZWxvbmdzVG9Db250ZXh0IiwiZ2V0VHlwZSIsIlNQSU5BTF9SRUxBVElPTl9QVFJfTFNUX1RZUEUiLCJhZGRDaGlsZCIsIm5vZGUiLCJNb2RlbCIsIkVycm9yIiwiU3BpbmFsTm9kZSIsInVuZGVmaW5lZCIsImluY2x1ZGVzIiwiZ2V0SWQiLCJfYWRkUGFyZW50IiwidGhlbiIsInJlbW92ZUNoaWxkIiwiY29udGFpbnMiLCJyZW1vdmUiLCJfcmVtb3ZlUGFyZW50IiwicmVtb3ZlQ2hpbGRyZW4iLCJub2RlcyIsIkFycmF5IiwiaXNBcnJheSIsImVycm9yIiwiY2xlYXIiLCJpbmRleCIsImluZGV4T2YiLCJzcGluYWxDb3JlIiwicmVnaXN0ZXJfbW9kZWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBd0JBOztBQU1BOztBQUNBOztBQUdBOztBQUlBOzs7Ozs7OztBQUVBOzs7O0FBSUEsTUFBTUEsb0JBQU4sU0FBbUNDLDJCQUFuQyxDQUFzRDtBQUNwRDs7Ozs7OztBQU9BQyxFQUFBQSxXQUFXLENBQUNDLE1BQUQsRUFBU0MsSUFBVCxFQUFlO0FBQ3hCLFVBQU1ELE1BQU4sRUFBY0MsSUFBZDtBQUVBLFNBQUtDLFFBQUwsQ0FBYztBQUNaQyxN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QixFQUF3QjtBQUN0QkksUUFBQUEsV0FBVyxDQUFDNkIsS0FBWjs7QUFDQSxRQUFBLE1BQUksQ0FBQ3pDLFFBQUwsQ0FBY0csSUFBZCxDQUFtQkcsR0FBbkIsQ0FBdUJtQyxLQUF2Qjs7QUFDQTtBQUNEOztBQVo4QjtBQUFBO0FBQUE7O0FBQUE7QUFjL0IsNkJBQWlCSixLQUFqQiw4SEFBd0I7QUFBQSxjQUFmZCxJQUFlO0FBQ3RCLGNBQUltQixLQUFLLEdBQUc5QixXQUFXLENBQUMrQixPQUFaLENBQW9CcEIsSUFBcEIsQ0FBWjs7QUFFQSxjQUFJbUIsS0FBSyxLQUFLLENBQUMsQ0FBZixFQUFrQjtBQUNoQjlCLFlBQUFBLFdBQVcsQ0FBQ3NCLE1BQVosQ0FBbUJYLElBQW5COztBQUNBLFlBQUEsTUFBSSxDQUFDdkIsUUFBTCxDQUFjRyxJQUFkLENBQW1CRyxHQUFuQixDQUF1QjRCLE1BQXZCLENBQThCWCxJQUFJLENBQUNNLEtBQUwsRUFBOUI7O0FBQ0FOLFlBQUFBLElBQUksQ0FBQ1ksYUFBTCxDQUFtQixNQUFuQjtBQUNELFdBSkQsTUFJTztBQUNMSyxZQUFBQSxLQUFLLEdBQUcsSUFBUjtBQUNEO0FBQ0Y7QUF4QjhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBMEIvQixVQUFJQSxLQUFKLEVBQVc7QUFDVCxjQUFNZixLQUFLLENBQUMsNEJBQUQsQ0FBWDtBQUNEO0FBNUI4QjtBQTZCaEM7O0FBdEttRDs7QUF5S3REbUIsdUNBQVdDLGVBQVgsQ0FBMkIsQ0FBQ25ELG9CQUFELENBQTNCOztlQUNlQSxvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOCBTcGluYWxDb20gLSB3d3cuc3BpbmFsY29tLmNvbVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFNwaW5hbENvcmUuXG4gKlxuICogUGxlYXNlIHJlYWQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgdGVybXMgYW5kIGNvbmRpdGlvbnNcbiAqIG9mIHRoZSBGcmVlIFNvZnR3YXJlIGxpY2Vuc2UgQWdyZWVtZW50IChcIkFncmVlbWVudFwiKVxuICogY2FyZWZ1bGx5LlxuICpcbiAqIFRoaXMgQWdyZWVtZW50IGlzIGEgbGVnYWxseSBiaW5kaW5nIGNvbnRyYWN0IGJldHdlZW5cbiAqIHRoZSBMaWNlbnNlZSAoYXMgZGVmaW5lZCBiZWxvdykgYW5kIFNwaW5hbENvbSB0aGF0XG4gKiBzZXRzIGZvcnRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyB0aGF0IGdvdmVybiB5b3VyXG4gKiB1c2Ugb2YgdGhlIFByb2dyYW0uIEJ5IGluc3RhbGxpbmcgYW5kL29yIHVzaW5nIHRoZVxuICogUHJvZ3JhbSwgeW91IGFncmVlIHRvIGFiaWRlIGJ5IGFsbCB0aGUgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zIHN0YXRlZCBvciByZWZlcmVuY2VkIGhlcmVpbi5cbiAqXG4gKiBJZiB5b3UgZG8gbm90IGFncmVlIHRvIGFiaWRlIGJ5IHRoZXNlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucywgZG8gbm90IGRlbW9uc3RyYXRlIHlvdXIgYWNjZXB0YW5jZSBhbmQgZG9cbiAqIG5vdCBpbnN0YWxsIG9yIHVzZSB0aGUgUHJvZ3JhbS5cbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYWxvbmdcbiAqIHdpdGggdGhpcyBmaWxlLiBJZiBub3QsIHNlZVxuICogPGh0dHA6Ly9yZXNvdXJjZXMuc3BpbmFsY29tLmNvbS9saWNlbnNlcy5wZGY+LlxuICovXG5cbmltcG9ydCB7XG4gIHNwaW5hbENvcmUsXG4gIE1vZGVsLFxuICBMc3Rcbn0gZnJvbSBcInNwaW5hbC1jb3JlLWNvbm5lY3RvcmpzX3R5cGVcIjtcblxuaW1wb3J0IEJhc2VTcGluYWxSZWxhdGlvbiBmcm9tIFwiLi9CYXNlU3BpbmFsUmVsYXRpb25cIjtcbmltcG9ydCB7XG4gIFNQSU5BTF9SRUxBVElPTl9QVFJfTFNUX1RZUEVcbn0gZnJvbSBcIi4vU3BpbmFsUmVsYXRpb25GYWN0b3J5XCI7XG5pbXBvcnQge1xuICBTcGluYWxOb2RlLFxuICBTcGluYWxDb250ZXh0XG59IGZyb20gXCIuLi9pbmRleFwiO1xuaW1wb3J0IFNwaW5hbE5vZGVQb2ludGVyIGZyb20gXCIuLi9TcGluYWxOb2RlUG9pbnRlclwiO1xuXG4vKipcbiAqIFJlbGF0aW9uIHdoZXJlIHRoZSBjaGlsZHJlbiBhcmUgaW4gUHRyIHRvIGEgTHN0LlxuICogQGFic3RyYWN0XG4gKi9cbmNsYXNzIFNwaW5hbFJlbGF0aW9uUHRyTHN0IGV4dGVuZHMgQmFzZVNwaW5hbFJlbGF0aW9uIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yIGZvciB0aGUgU3BpbmFsUmVsYXRpb25QdHJMc3QgY2xhc3MuXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZX0gcGFyZW50IFBhcmVudCBvZiB0aGUgcmVsYXRpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgTmFtZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgcGFyZW50IGlzIG5vdCBhIG5vZGVcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgbmFtZSBpcyBub3QgYSBzdHJpbmdcbiAgICovXG4gIGNvbnN0cnVjdG9yKHBhcmVudCwgbmFtZSkge1xuICAgIHN1cGVyKHBhcmVudCwgbmFtZSk7XG5cbiAgICB0aGlzLmFkZF9hdHRyKHtcbiAgICAgIGNoaWxkcmVuOiBuZXcgU3BpbmFsTm9kZVBvaW50ZXIobmV3IExzdCgpKVxuICAgIH0pO1xuXG4gICAgdGhpcy5jaGlsZHJlbi5pbmZvLmFkZF9hdHRyKFwiaWRzXCIsIG5ldyBMc3QoKSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIGFsbCB0aGUgaWRzIG9mIHRoZSBjaGlsZHJlbiBvZiB0aGUgcmVsYXRpb24gYW5kIHJldHVybiB0aGVtIGluc2lkZSBhbiBhcnJheS5cbiAgICogQHJldHVybnMge0FycmF5PFN0cmluZz59IEFycmF5IGNvbnRhaW5pbmcgYWxsIHRoZSBjaGlsZHJlbiBpZHMgb2YgdGhlIHJlbGF0aW9uXG4gICAqL1xuICBnZXRDaGlsZHJlbklkcygpIHtcbiAgICBjb25zdCBpZExzdCA9IHRoaXMuY2hpbGRyZW4uaW5mby5pZHM7XG4gICAgY29uc3QgaWRzID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlkTHN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZHMucHVzaChpZExzdFtpXS5nZXQoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlkcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYWxsIHRoZSBjaGlsZHJlbiBvZiB0aGUgcmVsYXRpb24uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PFNwaW5hbE5vZGU+Pn0gVGhlIGNoaWxkcmVuIG9mIHRoZSByZWxhdGlvblxuICAgKi9cbiAgYXN5bmMgZ2V0Q2hpbGRyZW4oKSB7XG4gICAgY29uc3QgY2hpbGRyZW5Mc3QgPSBhd2FpdCB0aGlzLmNoaWxkcmVuLmxvYWQoKTtcbiAgICBjb25zdCBjaGlsZHJlbiA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbkxzdC5sZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGRyZW4ucHVzaChjaGlsZHJlbkxzdFtpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhbGwgdGhlIGNoaWxkcmVuIG9mIHRoZSByZWxhdGlvbiBhc3NvY2lhdGVkIHRvIGEgY2VydGFpbiBjb250ZXh0LlxuICAgKiBAcGFyYW0ge1NwaW5hbENvbnRleHR9IGNvbnRleHQgQ29udGV4dCB0byB1c2UgZm9yIHRoZSBzZWFyY2hcbiAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8U3BpbmFsTm9kZT4+fSBUaGUgY2hpbGRyZW4gYXNzb2NpYXRlZCB0byB0aGUgY29udGV4dFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBjb250ZXh0IGlzIG5vdCBhIFNwaW5hbENvbnRleHRcbiAgICovXG4gIGFzeW5jIGdldENoaWxkcmVuSW5Db250ZXh0KGNvbnRleHQpIHtcbiAgICBjb25zdCBjaGlsZHJlbkxzdCA9IGF3YWl0IHRoaXMuY2hpbGRyZW4ubG9hZCgpO1xuICAgIGNvbnN0IGNoaWxkcmVuID0gW107XG5cbiAgICBpZiAoIShjb250ZXh0IGluc3RhbmNlb2YgU3BpbmFsQ29udGV4dCkpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcImNvbnRleHQgbXVzdCBiZSBhIFNwaW5hbENvbnRleHRcIik7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbkxzdC5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGNoaWxkID0gY2hpbGRyZW5Mc3RbaV07XG5cbiAgICAgIGlmIChjaGlsZC5iZWxvbmdzVG9Db250ZXh0KGNvbnRleHQpKSB7XG4gICAgICAgIGNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB0eXBlIG9mIHRoZSByZWxhdGlvbi5cbiAgICogQHJldHVybnMge051bWJlcn0gVHlwZSBvZiB0aGUgcmVsYXRpb25cbiAgICovXG4gIGdldFR5cGUoKSB7XG4gICAgcmV0dXJuIFNQSU5BTF9SRUxBVElPTl9QVFJfTFNUX1RZUEU7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGNoaWxkIHRvIHRoZSByZWxhdGlvbi5cbiAgICogQHBhcmFtIHtTcGluYWxOb2RlIHwgTW9kZWx9IG5vZGUgTm9kZSBvciBtb2RlbCB0byBhZGRcbiAgICogQHJldHVybnMge1Byb21pc2U8U3BpbmFsTm9kZT59IFByb21pc2UgY29udGFpbmluZyB0aGUgbm9kZSB0aGF0IHdhcyBhZGRlZFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBub2RlIGlzIG5vdCBhIE1vZGVsXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgbm9kZSBpcyBhbHJlYWR5IGEgY2hpbGQgb2YgdGhlIHJlbGF0aW9uXG4gICAqL1xuICBhc3luYyBhZGRDaGlsZChub2RlKSB7XG4gICAgaWYgKCEobm9kZSBpbnN0YW5jZW9mIE1vZGVsKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcIkNhbm5vdCBhZGQgYSBjaGlsZCB3aXRjaCBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgU3BpbmFsTm9kZSBvciBNb2RlbC5cIlxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKCEobm9kZSBpbnN0YW5jZW9mIFNwaW5hbE5vZGUpKSB7XG4gICAgICBub2RlID0gbmV3IFNwaW5hbE5vZGUodW5kZWZpbmVkLCB1bmRlZmluZWQsIG5vZGUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmdldENoaWxkcmVuSWRzKCkuaW5jbHVkZXMobm9kZS5nZXRJZCgpLmdldCgpKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGFkZCBhIGNoaWxkIHR3aWNlIHRvIHRoZSBzYW1lIHJlbGF0aW9uLlwiKTtcbiAgICB9XG5cbiAgICB0aGlzLmNoaWxkcmVuLmluZm8uaWRzLnB1c2gobm9kZS5nZXRJZCgpKTtcbiAgICBub2RlLl9hZGRQYXJlbnQodGhpcyk7XG5cbiAgICBhd2FpdCB0aGlzLmNoaWxkcmVuLmxvYWQoKS50aGVuKChjaGlsZHJlbikgPT4ge1xuICAgICAgY2hpbGRyZW4ucHVzaChub2RlKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBjaGlsZCBmcm9tIHRoZSByZWxhdGlvbi5cbiAgICogQHBhcmFtIHtTcGluYWxOb2RlfSBub2RlIENoaWxkIHRvIHJlbW92ZVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxub3RoaW5nPn0gQW4gZW1wdHkgcHJvbWlzZVxuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIGdpdmVuIG5vZGUgaXMgbm90IGEgY2hpbGRcbiAgICovXG4gIGFzeW5jIHJlbW92ZUNoaWxkKG5vZGUpIHtcbiAgICBjb25zdCBjaGlsZHJlbkxzdCA9IGF3YWl0IHRoaXMuY2hpbGRyZW4ubG9hZCgpO1xuXG4gICAgaWYgKCFjaGlsZHJlbkxzdC5jb250YWlucyhub2RlKSkge1xuICAgICAgdGhyb3cgRXJyb3IoXCJUaGUgbm9kZSBpcyBub3QgYSBjaGlsZFwiKTtcbiAgICB9XG5cbiAgICBjaGlsZHJlbkxzdC5yZW1vdmUobm9kZSk7XG4gICAgdGhpcy5jaGlsZHJlbi5pbmZvLmlkcy5yZW1vdmUobm9kZS5nZXRJZCgpKTtcbiAgICBub2RlLl9yZW1vdmVQYXJlbnQodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBjaGlsZHJlbiBmcm9tIHRoZSByZWxhdGlvbi5cbiAgICogQG92ZXJyaWRlXG4gICAqIEBwYXJhbSB7QXJyYXk8U3BpbmFsTm9kZT59IFtub2Rlcz1bXV0gQ2hpbGRzIHRvIHJlbW92ZVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxub3RoaW5nPn0gQW4gZW1wdHkgcHJvbWlzZVxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIG5vZGVzIGlzIG5vdCBhbiBhcnJheSBvciBvbWl0dGVkXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiBvbmUgb2YgdGhlIG5vZGVzIGlzIG5vdCBhIGNoaWxkXG4gICAqL1xuICBhc3luYyByZW1vdmVDaGlsZHJlbihub2RlcyA9IFtdKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG5vZGVzKSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwibm9kZSBtdXN0IGJlIGFuIGFycmF5XCIpXG4gICAgfVxuXG4gICAgY29uc3QgY2hpbGRyZW5Mc3QgPSBhd2FpdCB0aGlzLmNoaWxkcmVuLmxvYWQoKTtcbiAgICBsZXQgZXJyb3IgPSBmYWxzZTtcblxuICAgIGlmIChub2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGNoaWxkcmVuTHN0LmNsZWFyKCk7XG4gICAgICB0aGlzLmNoaWxkcmVuLmluZm8uaWRzLmNsZWFyKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xuICAgICAgbGV0IGluZGV4ID0gY2hpbGRyZW5Mc3QuaW5kZXhPZihub2RlKTtcblxuICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICBjaGlsZHJlbkxzdC5yZW1vdmUobm9kZSk7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4uaW5mby5pZHMucmVtb3ZlKG5vZGUuZ2V0SWQoKSk7XG4gICAgICAgIG5vZGUuX3JlbW92ZVBhcmVudCh0aGlzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVycm9yID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIHRocm93IEVycm9yKFwiQ291bGQgbm90IHJlbW92ZSBhbGwgbm9kZXNcIik7XG4gICAgfVxuICB9XG59XG5cbnNwaW5hbENvcmUucmVnaXN0ZXJfbW9kZWxzKFtTcGluYWxSZWxhdGlvblB0ckxzdF0pO1xuZXhwb3J0IGRlZmF1bHQgU3BpbmFsUmVsYXRpb25QdHJMc3Q7XG4iXX0=