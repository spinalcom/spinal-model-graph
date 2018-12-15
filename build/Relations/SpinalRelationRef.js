"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseSpinalRelation = _interopRequireDefault(require("./BaseSpinalRelation"));

var _SpinalRelationFactory = require("./SpinalRelationFactory");

var _index = require("../index");

var _spinalCoreConnectorjs = _interopRequireDefault(require("spinal-core-connectorjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const globalType = typeof window === "undefined" ? global : window;

class SpinalRelationRef extends _BaseSpinalRelation.default {
  /**
   * Constructor for the SpinalRelationRef class.
   * @param {SpinalNode} parent Parent of the relation
   * @param {String} name Name of the relation
   * @throws {Error} If the parent is not a node
   */
  constructor(parent, name) {
    super(parent, name);
    this.add_attr({
      children: new globalType.Lst()
    });
  }
  /**
   * Retrieves all the ids of the children of the relation and return them inside an array.
   * @returns {Array<String>} Array containing all the children ids of the relation
   */


  getChildrenIds() {
    const res = [];

    for (let i = 0; i < this.children.length; i++) {
      res.push(this.children[i].getId().get());
    }

    return res;
  }
  /**
   * Return all the children of the relation.
   * @returns {Promise<Array<SpinalNode>>} The children of the relation
   */


  getChildren() {
    let children = [];

    for (let i = 0; i < this.children.length; i++) {
      children.push(this.children[i]);
    }

    return Promise.resolve(children);
  }
  /**
   * Return all the children of the relation associated to a certain context.
   * @param {SpinalContext} context The context to use for the search
   * @returns {Promise<Array<SpinalNode>>} The children of the relation associated to the context
   */


  getChildrenInContext(context) {
    let children = [];

    for (let i = 0; i < this.children.length; i++) {
      let child = this.children[i];

      if (child.belongsToContext(context)) {
        children.push(child);
      }
    }

    return Promise.resolve(children);
  }
  /**
   * Returns the type of the relation.
   * @returns {Number} Type of the relation
   */


  getType() {
    return _SpinalRelationFactory.SPINAL_RELATION_TYPE;
  }
  /**
   * Adds a child to the relation.
   * @param {SpinalNode | Model} node Node or model to add
   * @returns {Promise<SpinalNode>} Promise containing the node that was added
   * @throws {TypeError} If the node is not a Model
   * @throws {Error} If the node is already a child of the relation
   */


  addChild(node) {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (!(node instanceof globalType.Model)) {
        throw new TypeError("Cannot add a child witch is not an instance of SpinalNode or Model.");
      } else if (!(node instanceof _index.SpinalNode)) {
        node = new _index.SpinalNode(undefined, undefined, node);
      }

      if (_this.getChildrenIds().includes(node.getId().get())) {
        throw new Error("Cannot add a child twice to the same relation.");
      }

      _this.children.push(node);

      node._addParent(_this);

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
    if (!this.children.contains(node)) {
      return Promise.reject(Error("The node is not a child"));
    }

    node._removeParent(this);

    this.children.remove(node);
    return Promise.resolve();
  }

}

_spinalCoreConnectorjs.default.register_models([SpinalRelationRef]);

var _default = SpinalRelationRef;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9SZWxhdGlvbnMvU3BpbmFsUmVsYXRpb25SZWYuanMiXSwibmFtZXMiOlsiZ2xvYmFsVHlwZSIsIndpbmRvdyIsImdsb2JhbCIsIlNwaW5hbFJlbGF0aW9uUmVmIiwiQmFzZVNwaW5hbFJlbGF0aW9uIiwiY29uc3RydWN0b3IiLCJwYXJlbnQiLCJuYW1lIiwiYWRkX2F0dHIiLCJjaGlsZHJlbiIsIkxzdCIsImdldENoaWxkcmVuSWRzIiwicmVzIiwiaSIsImxlbmd0aCIsInB1c2giLCJnZXRJZCIsImdldCIsImdldENoaWxkcmVuIiwiUHJvbWlzZSIsInJlc29sdmUiLCJnZXRDaGlsZHJlbkluQ29udGV4dCIsImNvbnRleHQiLCJjaGlsZCIsImJlbG9uZ3NUb0NvbnRleHQiLCJnZXRUeXBlIiwiU1BJTkFMX1JFTEFUSU9OX1RZUEUiLCJhZGRDaGlsZCIsIm5vZGUiLCJNb2RlbCIsIlR5cGVFcnJvciIsIlNwaW5hbE5vZGUiLCJ1bmRlZmluZWQiLCJpbmNsdWRlcyIsIkVycm9yIiwiX2FkZFBhcmVudCIsInJlbW92ZUNoaWxkIiwiY29udGFpbnMiLCJyZWplY3QiLCJfcmVtb3ZlUGFyZW50IiwicmVtb3ZlIiwic3BpbmFsQ29yZSIsInJlZ2lzdGVyX21vZGVscyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQXdCQTs7QUFDQTs7QUFHQTs7QUFHQTs7Ozs7Ozs7QUFFQSxNQUFNQSxVQUFVLEdBQUcsT0FBT0MsTUFBUCxLQUFrQixXQUFsQixHQUFnQ0MsTUFBaEMsR0FBeUNELE1BQTVEOztBQUVBLE1BQU1FLGlCQUFOLFNBQWdDQywyQkFBaEMsQ0FBbUQ7QUFDakQ7Ozs7OztBQU1BQyxFQUFBQSxXQUFXLENBQUNDLE1BQUQsRUFBU0MsSUFBVCxFQUFlO0FBQ3hCLFVBQU1ELE1BQU4sRUFBY0MsSUFBZDtBQUVBLFNBQUtDLFFBQUwsQ0FBYztBQUNaQyxNQUFBQSxRQUFRLEVBQUUsSUFBSVQsVUFBVSxDQUFDVSxHQUFmO0FBREUsS0FBZDtBQUdEO0FB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UixFQUFQO0FBQ0Q7O0FBN0dnRDs7QUFnSG5EcUIsK0JBQVdDLGVBQVgsQ0FBMkIsQ0FBQ3ZDLGlCQUFELENBQTNCOztlQUNlQSxpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOCBTcGluYWxDb20gLSB3d3cuc3BpbmFsY29tLmNvbVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFNwaW5hbENvcmUuXG4gKlxuICogUGxlYXNlIHJlYWQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgdGVybXMgYW5kIGNvbmRpdGlvbnNcbiAqIG9mIHRoZSBGcmVlIFNvZnR3YXJlIGxpY2Vuc2UgQWdyZWVtZW50IChcIkFncmVlbWVudFwiKVxuICogY2FyZWZ1bGx5LlxuICpcbiAqIFRoaXMgQWdyZWVtZW50IGlzIGEgbGVnYWxseSBiaW5kaW5nIGNvbnRyYWN0IGJldHdlZW5cbiAqIHRoZSBMaWNlbnNlZSAoYXMgZGVmaW5lZCBiZWxvdykgYW5kIFNwaW5hbENvbSB0aGF0XG4gKiBzZXRzIGZvcnRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyB0aGF0IGdvdmVybiB5b3VyXG4gKiB1c2Ugb2YgdGhlIFByb2dyYW0uIEJ5IGluc3RhbGxpbmcgYW5kL29yIHVzaW5nIHRoZVxuICogUHJvZ3JhbSwgeW91IGFncmVlIHRvIGFiaWRlIGJ5IGFsbCB0aGUgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zIHN0YXRlZCBvciByZWZlcmVuY2VkIGhlcmVpbi5cbiAqXG4gKiBJZiB5b3UgZG8gbm90IGFncmVlIHRvIGFiaWRlIGJ5IHRoZXNlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucywgZG8gbm90IGRlbW9uc3RyYXRlIHlvdXIgYWNjZXB0YW5jZSBhbmQgZG9cbiAqIG5vdCBpbnN0YWxsIG9yIHVzZSB0aGUgUHJvZ3JhbS5cbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYWxvbmdcbiAqIHdpdGggdGhpcyBmaWxlLiBJZiBub3QsIHNlZVxuICogPGh0dHA6Ly9yZXNvdXJjZXMuc3BpbmFsY29tLmNvbS9saWNlbnNlcy5wZGY+LlxuICovXG5cbmltcG9ydCBCYXNlU3BpbmFsUmVsYXRpb24gZnJvbSBcIi4vQmFzZVNwaW5hbFJlbGF0aW9uXCI7XG5pbXBvcnQge1xuICBTUElOQUxfUkVMQVRJT05fVFlQRVxufSBmcm9tIFwiLi9TcGluYWxSZWxhdGlvbkZhY3RvcnlcIjtcbmltcG9ydCB7XG4gIFNwaW5hbE5vZGVcbn0gZnJvbSBcIi4uL2luZGV4XCI7XG5pbXBvcnQgc3BpbmFsQ29yZSBmcm9tIFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNcIjtcblxuY29uc3QgZ2xvYmFsVHlwZSA9IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB3aW5kb3c7XG5cbmNsYXNzIFNwaW5hbFJlbGF0aW9uUmVmIGV4dGVuZHMgQmFzZVNwaW5hbFJlbGF0aW9uIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yIGZvciB0aGUgU3BpbmFsUmVsYXRpb25SZWYgY2xhc3MuXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZX0gcGFyZW50IFBhcmVudCBvZiB0aGUgcmVsYXRpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgTmFtZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXJlbnQgaXMgbm90IGEgbm9kZVxuICAgKi9cbiAgY29uc3RydWN0b3IocGFyZW50LCBuYW1lKSB7XG4gICAgc3VwZXIocGFyZW50LCBuYW1lKTtcblxuICAgIHRoaXMuYWRkX2F0dHIoe1xuICAgICAgY2hpbGRyZW46IG5ldyBnbG9iYWxUeXBlLkxzdCgpXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIGFsbCB0aGUgaWRzIG9mIHRoZSBjaGlsZHJlbiBvZiB0aGUgcmVsYXRpb24gYW5kIHJldHVybiB0aGVtIGluc2lkZSBhbiBhcnJheS5cbiAgICogQHJldHVybnMge0FycmF5PFN0cmluZz59IEFycmF5IGNvbnRhaW5pbmcgYWxsIHRoZSBjaGlsZHJlbiBpZHMgb2YgdGhlIHJlbGF0aW9uXG4gICAqL1xuICBnZXRDaGlsZHJlbklkcygpIHtcbiAgICBjb25zdCByZXMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgcmVzLnB1c2godGhpcy5jaGlsZHJlbltpXS5nZXRJZCgpLmdldCgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhbGwgdGhlIGNoaWxkcmVuIG9mIHRoZSByZWxhdGlvbi5cbiAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8U3BpbmFsTm9kZT4+fSBUaGUgY2hpbGRyZW4gb2YgdGhlIHJlbGF0aW9uXG4gICAqL1xuICBnZXRDaGlsZHJlbigpIHtcbiAgICBsZXQgY2hpbGRyZW4gPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGRyZW4ucHVzaCh0aGlzLmNoaWxkcmVuW2ldKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNoaWxkcmVuKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYWxsIHRoZSBjaGlsZHJlbiBvZiB0aGUgcmVsYXRpb24gYXNzb2NpYXRlZCB0byBhIGNlcnRhaW4gY29udGV4dC5cbiAgICogQHBhcmFtIHtTcGluYWxDb250ZXh0fSBjb250ZXh0IFRoZSBjb250ZXh0IHRvIHVzZSBmb3IgdGhlIHNlYXJjaFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxTcGluYWxOb2RlPj59IFRoZSBjaGlsZHJlbiBvZiB0aGUgcmVsYXRpb24gYXNzb2NpYXRlZCB0byB0aGUgY29udGV4dFxuICAgKi9cbiAgZ2V0Q2hpbGRyZW5JbkNvbnRleHQoY29udGV4dCkge1xuICAgIGxldCBjaGlsZHJlbiA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuXG4gICAgICBpZiAoY2hpbGQuYmVsb25nc1RvQ29udGV4dChjb250ZXh0KSkge1xuICAgICAgICBjaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNoaWxkcmVuKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB0eXBlIG9mIHRoZSByZWxhdGlvbi5cbiAgICogQHJldHVybnMge051bWJlcn0gVHlwZSBvZiB0aGUgcmVsYXRpb25cbiAgICovXG4gIGdldFR5cGUoKSB7XG4gICAgcmV0dXJuIFNQSU5BTF9SRUxBVElPTl9UWVBFO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjaGlsZCB0byB0aGUgcmVsYXRpb24uXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZSB8IE1vZGVsfSBub2RlIE5vZGUgb3IgbW9kZWwgdG8gYWRkXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFNwaW5hbE5vZGU+fSBQcm9taXNlIGNvbnRhaW5pbmcgdGhlIG5vZGUgdGhhdCB3YXMgYWRkZWRcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgbm9kZSBpcyBub3QgYSBNb2RlbFxuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIG5vZGUgaXMgYWxyZWFkeSBhIGNoaWxkIG9mIHRoZSByZWxhdGlvblxuICAgKi9cbiAgYXN5bmMgYWRkQ2hpbGQobm9kZSkge1xuICAgIGlmICghKG5vZGUgaW5zdGFuY2VvZiBnbG9iYWxUeXBlLk1vZGVsKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgXCJDYW5ub3QgYWRkIGEgY2hpbGQgd2l0Y2ggaXMgbm90IGFuIGluc3RhbmNlIG9mIFNwaW5hbE5vZGUgb3IgTW9kZWwuXCJcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmICghKG5vZGUgaW5zdGFuY2VvZiBTcGluYWxOb2RlKSkge1xuICAgICAgbm9kZSA9IG5ldyBTcGluYWxOb2RlKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBub2RlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5nZXRDaGlsZHJlbklkcygpLmluY2x1ZGVzKG5vZGUuZ2V0SWQoKS5nZXQoKSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBhZGQgYSBjaGlsZCB0d2ljZSB0byB0aGUgc2FtZSByZWxhdGlvbi5cIik7XG4gICAgfVxuXG4gICAgdGhpcy5jaGlsZHJlbi5wdXNoKG5vZGUpO1xuICAgIG5vZGUuX2FkZFBhcmVudCh0aGlzKTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgY2hpbGQgZnJvbSB0aGUgcmVsYXRpb24uXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZX0gbm9kZSBDaGlsZCB0byByZW1vdmVcbiAgICogQHJldHVybnMge1Byb21pc2U8bm90aGluZz59IEFuIGVtcHR5IHByb21pc2VcbiAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBnaXZlbiBub2RlIGlzIG5vdCBhIGNoaWxkXG4gICAqL1xuICByZW1vdmVDaGlsZChub2RlKSB7XG4gICAgaWYgKCF0aGlzLmNoaWxkcmVuLmNvbnRhaW5zKG5vZGUpKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3IoXCJUaGUgbm9kZSBpcyBub3QgYSBjaGlsZFwiKSk7XG4gICAgfVxuXG4gICAgbm9kZS5fcmVtb3ZlUGFyZW50KHRoaXMpO1xuICAgIHRoaXMuY2hpbGRyZW4ucmVtb3ZlKG5vZGUpO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxufVxuXG5zcGluYWxDb3JlLnJlZ2lzdGVyX21vZGVscyhbU3BpbmFsUmVsYXRpb25SZWZdKTtcbmV4cG9ydCBkZWZhdWx0IFNwaW5hbFJlbGF0aW9uUmVmO1xuIl19