"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseSpinalRelation = _interopRequireDefault(require("./BaseSpinalRelation"));

var _SpinalRelationFactory = require("./SpinalRelationFactory");

var _SpinalNode = _interopRequireDefault(require("../Nodes/SpinalNode"));

var _SpinalNodePointer = _interopRequireDefault(require("../SpinalNodePointer"));

var _spinalCoreConnectorjs = _interopRequireDefault(require("spinal-core-connectorjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const globalType = typeof window === "undefined" ? global : window;

class SpinalRelationPtrLst extends _BaseSpinalRelation.default {
  /**
   * Constructor for the SpinalRelationPtrLst class.
   * @param {SpinalNode} parent Parent of the relation
   * @param {String} name Name of the relation
   * @throws {Error} If the parent is not a node
   */
  constructor(parent, name) {
    super(parent, name);
    this.add_attr({
      children: new _SpinalNodePointer.default(new globalType.Lst())
    });
    this.children.info.add_attr("ids", new globalType.Lst());
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
   */


  getChildrenInContext(context) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const childrenLst = yield _this2.children.load();
      const children = [];

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
   */


  addChild(node) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      if (!(node instanceof globalType.Model)) {
        throw new Error("Cannot add a child witch is not an instance of SpinalNode or Model.");
      } else if (!(node instanceof _SpinalNode.default)) {
        node = new _SpinalNode.default(undefined, undefined, node);
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
        throw Error("Invalid node");
      }

      childrenLst.remove(node);

      _this4.children.info.ids.remove(node.getId());

      node._removeParent(_this4);
    })();
  }
  /**
   * Removes children from the relation.
   * @param {Array<SpinalNode>} nodes Childs to remove
   * @returns {Promise<nothing>} An empty promise
   * @throws {Error} If one of the nodes is not a child
   */


  removeChildren(nodes) {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      const childrenLst = yield _this5.children.load();
      let error = false;

      if (nodes === undefined || nodes.length === 0) {
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

_spinalCoreConnectorjs.default.register_models([SpinalRelationPtrLst]);

var _default = SpinalRelationPtrLst;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9SZWxhdGlvbnMvU3BpbmFsUmVsYXRpb25QdHJMc3QuanMiXSwibmFtZXMiOlsiZ2xvYmFsVHlwZSIsIndpbmRvdyIsImdsb2JhbCIsIlNwaW5hbFJlbGF0aW9uUHRyTHN0IiwiQmFzZVNwaW5hbFJlbGF0aW9uIiwiY29uc3RydWN0b3IiLCJwYXJlbnQiLCJuYW1lIiwiYWRkX2F0dHIiLCJjaGlsZHJlbiIsIlNwaW5hbE5vZGVQb2ludGVyIiwiTHN0IiwiaW5mbyIsImdldENoaWxkcmVuSWRzIiwiaWRMc3QiLCJpZHMiLCJpIiwibGVuZ3RoIiwicHVzaCIsImdldCIsImdldENoaWxkcmVuIiwiY2hpbGRyZW5Mc3QiLCJsb2FkIiwiZ2V0Q2hpbGRyZW5JbkNvbnRleHQiLCJjb250ZXh0IiwiY2hpbGQiLCJiZWxvbmdzVG9Db250ZXh0IiwiZ2V0VHlwZSIsIlNQSU5BTF9SRUxBVElPTl9QVFJfTFNUX1RZUEUiLCJhZGRDaGlsZCIsIm5vZGUiLCJNb2RlbCIsIkVycm9yIiwiU3BpbmFsTm9kZSIsInVuZGVmaW5lZCIsImluY2x1ZGVzIiwiZ2V0SWQiLCJfYWRkUGFyZW50IiwidGhlbiIsInJlbW92ZUNoaWxkIiwiY29udGFpbnMiLCJyZW1vdmUiLCJfcmVtb3ZlUGFyZW50IiwicmVtb3ZlQ2hpbGRyZW4iLCJub2RlcyIsImVycm9yIiwiY2xlYXIiLCJpbmRleCIsImluZGV4T2YiLCJzcGluYWxDb3JlIiwicmVnaXN0ZXJfbW9kZWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBdUJBOztBQUNBOztBQUdBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVBLE1BQU1BLFVBQVUsR0FBRyxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDQyxNQUFoQyxHQUF5Q0QsTUFBNUQ7O0FBRUEsTUFBTUUsb0JBQU4sU0FBbUNDLDJCQUFuQyxDQUFzRDtBQUNwRDs7Ozs7O0FBTUFDLEVBQUFBLFdBQVcsQ0FBQ0MsTUFBRCxFQUFTQyxJQUFULEVBQWU7QUFDeEIsVUFB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dUIrQixLQUF2Qjs7QUFDQTtBQUNEOztBQVJ5QjtBQUFBO0FBQUE7O0FBQUE7QUFVMUIsNkJBQWlCRixLQUFqQiw4SEFBd0I7QUFBQSxjQUFmZCxJQUFlO0FBQ3RCLGNBQUlpQixLQUFLLEdBQUcxQixXQUFXLENBQUMyQixPQUFaLENBQW9CbEIsSUFBcEIsQ0FBWjs7QUFFQSxjQUFJaUIsS0FBSyxLQUFLLENBQUMsQ0FBZixFQUFrQjtBQUNoQjFCLFlBQUFBLFdBQVcsQ0FBQ29CLE1BQVosQ0FBbUJYLElBQW5COztBQUNBLFlBQUEsTUFBSSxDQUFDckIsUUFBTCxDQUFjRyxJQUFkLENBQW1CRyxHQUFuQixDQUF1QjBCLE1BQXZCLENBQThCWCxJQUFJLENBQUNNLEtBQUwsRUFBOUI7O0FBQ0FOLFlBQUFBLElBQUksQ0FBQ1ksYUFBTCxDQUFtQixNQUFuQjtBQUNELFdBSkQsTUFJTztBQUNMRyxZQUFBQSxLQUFLLEdBQUcsSUFBUjtBQUNEO0FBQ0Y7QUFwQnlCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBc0IxQixVQUFJQSxLQUFKLEVBQVc7QUFDVCxjQUFNYixLQUFLLENBQUMsNEJBQUQsQ0FBWDtBQUNEO0FBeEJ5QjtBQXlCM0I7O0FBdEptRDs7QUF5SnREaUIsK0JBQVdDLGVBQVgsQ0FBMkIsQ0FBQy9DLG9CQUFELENBQTNCOztlQUNlQSxvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOCBTcGluYWxDb20gLSB3d3cuc3BpbmFsY29tLmNvbVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFNwaW5hbENvcmUuXG4gKlxuICogUGxlYXNlIHJlYWQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgdGVybXMgYW5kIGNvbmRpdGlvbnNcbiAqIG9mIHRoZSBGcmVlIFNvZnR3YXJlIGxpY2Vuc2UgQWdyZWVtZW50IChcIkFncmVlbWVudFwiKVxuICogY2FyZWZ1bGx5LlxuICpcbiAqIFRoaXMgQWdyZWVtZW50IGlzIGEgbGVnYWxseSBiaW5kaW5nIGNvbnRyYWN0IGJldHdlZW5cbiAqIHRoZSBMaWNlbnNlZSAoYXMgZGVmaW5lZCBiZWxvdykgYW5kIFNwaW5hbENvbSB0aGF0XG4gKiBzZXRzIGZvcnRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyB0aGF0IGdvdmVybiB5b3VyXG4gKiB1c2Ugb2YgdGhlIFByb2dyYW0uIEJ5IGluc3RhbGxpbmcgYW5kL29yIHVzaW5nIHRoZVxuICogUHJvZ3JhbSwgeW91IGFncmVlIHRvIGFiaWRlIGJ5IGFsbCB0aGUgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zIHN0YXRlZCBvciByZWZlcmVuY2VkIGhlcmVpbi5cbiAqXG4gKiBJZiB5b3UgZG8gbm90IGFncmVlIHRvIGFiaWRlIGJ5IHRoZXNlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucywgZG8gbm90IGRlbW9uc3RyYXRlIHlvdXIgYWNjZXB0YW5jZSBhbmQgZG9cbiAqIG5vdCBpbnN0YWxsIG9yIHVzZSB0aGUgUHJvZ3JhbS5cbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYWxvbmdcbiAqIHdpdGggdGhpcyBmaWxlLiBJZiBub3QsIHNlZVxuICogPGh0dHA6Ly9yZXNvdXJjZXMuc3BpbmFsY29tLmNvbS9saWNlbnNlcy5wZGY+LlxuICovXG5pbXBvcnQgQmFzZVNwaW5hbFJlbGF0aW9uIGZyb20gXCIuL0Jhc2VTcGluYWxSZWxhdGlvblwiO1xuaW1wb3J0IHtcbiAgU1BJTkFMX1JFTEFUSU9OX1BUUl9MU1RfVFlQRVxufSBmcm9tIFwiLi9TcGluYWxSZWxhdGlvbkZhY3RvcnlcIjtcbmltcG9ydCBTcGluYWxOb2RlIGZyb20gXCIuLi9Ob2Rlcy9TcGluYWxOb2RlXCI7XG5pbXBvcnQgU3BpbmFsTm9kZVBvaW50ZXIgZnJvbSBcIi4uL1NwaW5hbE5vZGVQb2ludGVyXCI7XG5pbXBvcnQgc3BpbmFsQ29yZSBmcm9tIFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNcIjtcblxuY29uc3QgZ2xvYmFsVHlwZSA9IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB3aW5kb3c7XG5cbmNsYXNzIFNwaW5hbFJlbGF0aW9uUHRyTHN0IGV4dGVuZHMgQmFzZVNwaW5hbFJlbGF0aW9uIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yIGZvciB0aGUgU3BpbmFsUmVsYXRpb25QdHJMc3QgY2xhc3MuXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZX0gcGFyZW50IFBhcmVudCBvZiB0aGUgcmVsYXRpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgTmFtZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXJlbnQgaXMgbm90IGEgbm9kZVxuICAgKi9cbiAgY29uc3RydWN0b3IocGFyZW50LCBuYW1lKSB7XG4gICAgc3VwZXIocGFyZW50LCBuYW1lKTtcblxuICAgIHRoaXMuYWRkX2F0dHIoe1xuICAgICAgY2hpbGRyZW46IG5ldyBTcGluYWxOb2RlUG9pbnRlcihuZXcgZ2xvYmFsVHlwZS5Mc3QoKSlcbiAgICB9KTtcblxuICAgIHRoaXMuY2hpbGRyZW4uaW5mby5hZGRfYXR0cihcImlkc1wiLCBuZXcgZ2xvYmFsVHlwZS5Mc3QoKSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIGFsbCB0aGUgaWRzIG9mIHRoZSBjaGlsZHJlbiBvZiB0aGUgcmVsYXRpb24gYW5kIHJldHVybiB0aGVtIGluc2lkZSBhbiBhcnJheS5cbiAgICogQHJldHVybnMge0FycmF5PFN0cmluZz59IEFycmF5IGNvbnRhaW5pbmcgYWxsIHRoZSBjaGlsZHJlbiBpZHMgb2YgdGhlIHJlbGF0aW9uXG4gICAqL1xuICBnZXRDaGlsZHJlbklkcygpIHtcbiAgICBjb25zdCBpZExzdCA9IHRoaXMuY2hpbGRyZW4uaW5mby5pZHM7XG4gICAgY29uc3QgaWRzID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlkTHN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZHMucHVzaChpZExzdFtpXS5nZXQoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlkcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYWxsIHRoZSBjaGlsZHJlbiBvZiB0aGUgcmVsYXRpb24uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PFNwaW5hbE5vZGU+Pn0gVGhlIGNoaWxkcmVuIG9mIHRoZSByZWxhdGlvblxuICAgKi9cbiAgYXN5bmMgZ2V0Q2hpbGRyZW4oKSB7XG4gICAgY29uc3QgY2hpbGRyZW5Mc3QgPSBhd2FpdCB0aGlzLmNoaWxkcmVuLmxvYWQoKTtcbiAgICBjb25zdCBjaGlsZHJlbiA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbkxzdC5sZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGRyZW4ucHVzaChjaGlsZHJlbkxzdFtpXSk7XG4gICAgfVxuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYWxsIHRoZSBjaGlsZHJlbiBvZiB0aGUgcmVsYXRpb24gYXNzb2NpYXRlZCB0byBhIGNlcnRhaW4gY29udGV4dC5cbiAgICogQHBhcmFtIHtTcGluYWxDb250ZXh0fSBjb250ZXh0IENvbnRleHQgdG8gdXNlIGZvciB0aGUgc2VhcmNoXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PFNwaW5hbE5vZGU+Pn0gVGhlIGNoaWxkcmVuIGFzc29jaWF0ZWQgdG8gdGhlIGNvbnRleHRcbiAgICovXG4gIGFzeW5jIGdldENoaWxkcmVuSW5Db250ZXh0KGNvbnRleHQpIHtcbiAgICBjb25zdCBjaGlsZHJlbkxzdCA9IGF3YWl0IHRoaXMuY2hpbGRyZW4ubG9hZCgpO1xuICAgIGNvbnN0IGNoaWxkcmVuID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuTHN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgY2hpbGQgPSBjaGlsZHJlbkxzdFtpXTtcblxuICAgICAgaWYgKGNoaWxkLmJlbG9uZ3NUb0NvbnRleHQoY29udGV4dCkpIHtcbiAgICAgICAgY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB0eXBlIG9mIHRoZSByZWxhdGlvbi5cbiAgICogQHJldHVybnMge051bWJlcn0gVHlwZSBvZiB0aGUgcmVsYXRpb25cbiAgICovXG4gIGdldFR5cGUoKSB7XG4gICAgcmV0dXJuIFNQSU5BTF9SRUxBVElPTl9QVFJfTFNUX1RZUEU7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGNoaWxkIHRvIHRoZSByZWxhdGlvbi5cbiAgICogQHBhcmFtIHtTcGluYWxOb2RlIHwgTW9kZWx9IG5vZGUgTm9kZSBvciBtb2RlbCB0byBhZGRcbiAgICogQHJldHVybnMge1Byb21pc2U8U3BpbmFsTm9kZT59IFByb21pc2UgY29udGFpbmluZyB0aGUgbm9kZSB0aGF0IHdhcyBhZGRlZFxuICAgKi9cbiAgYXN5bmMgYWRkQ2hpbGQobm9kZSkge1xuICAgIGlmICghKG5vZGUgaW5zdGFuY2VvZiBnbG9iYWxUeXBlLk1vZGVsKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcIkNhbm5vdCBhZGQgYSBjaGlsZCB3aXRjaCBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgU3BpbmFsTm9kZSBvciBNb2RlbC5cIlxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKCEobm9kZSBpbnN0YW5jZW9mIFNwaW5hbE5vZGUpKSB7XG4gICAgICBub2RlID0gbmV3IFNwaW5hbE5vZGUodW5kZWZpbmVkLCB1bmRlZmluZWQsIG5vZGUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmdldENoaWxkcmVuSWRzKCkuaW5jbHVkZXMobm9kZS5nZXRJZCgpLmdldCgpKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGFkZCBhIGNoaWxkIHR3aWNlIHRvIHRoZSBzYW1lIHJlbGF0aW9uLlwiKTtcbiAgICB9XG5cbiAgICB0aGlzLmNoaWxkcmVuLmluZm8uaWRzLnB1c2gobm9kZS5nZXRJZCgpKTtcbiAgICBub2RlLl9hZGRQYXJlbnQodGhpcyk7XG5cbiAgICBhd2FpdCB0aGlzLmNoaWxkcmVuLmxvYWQoKS50aGVuKChjaGlsZHJlbikgPT4ge1xuICAgICAgY2hpbGRyZW4ucHVzaChub2RlKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBjaGlsZCBmcm9tIHRoZSByZWxhdGlvbi5cbiAgICogQHBhcmFtIHtTcGluYWxOb2RlfSBub2RlIENoaWxkIHRvIHJlbW92ZVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxub3RoaW5nPn0gQW4gZW1wdHkgcHJvbWlzZVxuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIGdpdmVuIG5vZGUgaXMgbm90IGEgY2hpbGRcbiAgICovXG4gIGFzeW5jIHJlbW92ZUNoaWxkKG5vZGUpIHtcbiAgICBjb25zdCBjaGlsZHJlbkxzdCA9IGF3YWl0IHRoaXMuY2hpbGRyZW4ubG9hZCgpO1xuXG4gICAgaWYgKCFjaGlsZHJlbkxzdC5jb250YWlucyhub2RlKSkge1xuICAgICAgdGhyb3cgRXJyb3IoXCJJbnZhbGlkIG5vZGVcIik7XG4gICAgfVxuXG4gICAgY2hpbGRyZW5Mc3QucmVtb3ZlKG5vZGUpO1xuICAgIHRoaXMuY2hpbGRyZW4uaW5mby5pZHMucmVtb3ZlKG5vZGUuZ2V0SWQoKSk7XG4gICAgbm9kZS5fcmVtb3ZlUGFyZW50KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgY2hpbGRyZW4gZnJvbSB0aGUgcmVsYXRpb24uXG4gICAqIEBwYXJhbSB7QXJyYXk8U3BpbmFsTm9kZT59IG5vZGVzIENoaWxkcyB0byByZW1vdmVcbiAgICogQHJldHVybnMge1Byb21pc2U8bm90aGluZz59IEFuIGVtcHR5IHByb21pc2VcbiAgICogQHRocm93cyB7RXJyb3J9IElmIG9uZSBvZiB0aGUgbm9kZXMgaXMgbm90IGEgY2hpbGRcbiAgICovXG4gIGFzeW5jIHJlbW92ZUNoaWxkcmVuKG5vZGVzKSB7XG4gICAgY29uc3QgY2hpbGRyZW5Mc3QgPSBhd2FpdCB0aGlzLmNoaWxkcmVuLmxvYWQoKTtcbiAgICBsZXQgZXJyb3IgPSBmYWxzZTtcblxuICAgIGlmIChub2RlcyA9PT0gdW5kZWZpbmVkIHx8IG5vZGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY2hpbGRyZW5Mc3QuY2xlYXIoKTtcbiAgICAgIHRoaXMuY2hpbGRyZW4uaW5mby5pZHMuY2xlYXIoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICBsZXQgaW5kZXggPSBjaGlsZHJlbkxzdC5pbmRleE9mKG5vZGUpO1xuXG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIGNoaWxkcmVuTHN0LnJlbW92ZShub2RlKTtcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5pbmZvLmlkcy5yZW1vdmUobm9kZS5nZXRJZCgpKTtcbiAgICAgICAgbm9kZS5fcmVtb3ZlUGFyZW50KHRoaXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXJyb3IgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChlcnJvcikge1xuICAgICAgdGhyb3cgRXJyb3IoXCJDb3VsZCBub3QgcmVtb3ZlIGFsbCBub2Rlc1wiKTtcbiAgICB9XG4gIH1cbn1cblxuc3BpbmFsQ29yZS5yZWdpc3Rlcl9tb2RlbHMoW1NwaW5hbFJlbGF0aW9uUHRyTHN0XSk7XG5leHBvcnQgZGVmYXVsdCBTcGluYWxSZWxhdGlvblB0ckxzdDtcbiJdfQ==