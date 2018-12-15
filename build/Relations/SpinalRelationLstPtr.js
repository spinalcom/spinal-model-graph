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

class SpinalRelationLstPtr extends _BaseSpinalRelation.default {
  /**
   * Constructor for the SpinalRelationLstPtr class.
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
    const promises = [];

    for (let i = 0; i < this.children.length; i++) {
      let ptr = this.children[i];
      promises.push(ptr.load());
    }

    return Promise.all(promises);
  }
  /**
   * Return all the children of the relation associated to a certain context.
   * @returns {Promise<Array<SpinalNode>>} The children of the relation
   */


  getChildrenInContext(context) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const promises = [];
      let children;

      for (let i = 0; i < _this.children.length; i++) {
        let ptr = _this.children[i];
        promises.push(ptr.load());
      }

      children = yield Promise.all(promises);
      return children.filter(child => child.belongsToContext(context));
    })();
  }
  /**
   * Returns the type of the relation.
   * @returns {Number} Type of the relation
   */


  getType() {
    return _SpinalRelationFactory.SPINAL_RELATION_LST_PTR_TYPE;
  }
  /**
   * Adds a child to the relation.
   * @param {SpinalNode | Model} node Node or model to add
   * @returns {Promise<SpinalNode>} Promise containing the node that was added
   */


  addChild(node) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      if (!(node instanceof globalType.Model)) {
        throw new Error("Cannot add a child witch is not an instance of SpinalNode or Model.");
      } else if (!(node instanceof _SpinalNode.default)) {
        node = new _SpinalNode.default(undefined, undefined, node);
      }

      if (_this2.getChildrenIds().includes(node.getId().get())) {
        throw new Error("Cannot add a child twice to the same relation.");
      }

      node._addParent(_this2);

      _this2.children.push(new _SpinalNodePointer.default(node));

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
    let found = false;

    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].getId() === node.getId()) {
        this.children.splice(i, 1);
        found = true;
        break;
      }
    }

    if (!found) {
      return Promise.reject(Error("Invalid node"));
    }

    node._removeParent(this);

    return Promise.resolve();
  }

}

_spinalCoreConnectorjs.default.register_models([SpinalRelationLstPtr]);

var _default = SpinalRelationLstPtr;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9SZWxhdGlvbnMvU3BpbmFsUmVsYXRpb25Mc3RQdHIuanMiXSwibmFtZXMiOlsiZ2xvYmFsVHlwZSIsIndpbmRvdyIsImdsb2JhbCIsIlNwaW5hbFJlbGF0aW9uTHN0UHRyIiwiQmFzZVNwaW5hbFJlbGF0aW9uIiwiY29uc3RydWN0b3IiLCJwYXJlbnQiLCJuYW1lIiwiYWRkX2F0dHIiLCJjaGlsZHJlbiIsIkxzdCIsImdldENoaWxkcmVuSWRzIiwicmVzIiwiaSIsImxlbmd0aCIsInB1c2giLCJnZXRJZCIsImdldCIsImdldENoaWxkcmVuIiwicHJvbWlzZXMiLCJwdHIiLCJsb2FkIiwiUHJvbWlzZSIsImFsbCIsImdldENoaWxkcmVuSW5Db250ZXh0IiwiY29udGV4dCIsImZpbHRlciIsImNoaWxkIiwiYmVsb25nc1RvQ29udGV4dCIsImdldFR5cGUiLCJTUElOQUxfUkVMQVRJT05fTFNUX1BUUl9UWVBFIiwiYWRkQ2hpbGQiLCJub2RlIiwiTW9kZWwiLCJFcnJvciIsIlNwaW5hbE5vZGUiLCJ1bmRlZmluZWQiLCJpbmNsdWRlcyIsIl9hZGRQYXJlbnQiLCJTcGluYWxOb2RlUG9pbnRlciIsInJlbW92ZUNoaWxkIiwiZm91bmQiLCJzcGxpY2UiLCJyZWplY3QiLCJfcmVtb3ZlUGFyZW50IiwicmVzb2x2ZSIsInNwaW5hbENvcmUiLCJyZWdpc3Rlcl9tb2RlbHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUF1QkE7O0FBQ0E7O0FBR0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRUEsTUFBTUEsVUFBVSxHQUFHLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NDLE1BQWhDLEdBQXlDRCxNQUE1RDs7QUFFQSxNQUFNRSxvQkFBTixTQUFtQ0MsMkJBQW5DLENBQXNEO0FBQ3BEOzs7Ozs7QUFNQUMsRUFBQUEsV0FBVyxDQUFDQyxNQUFELEVBQVNDLElBQVQsRUFBZTtBQUN4QixVQUFNRCxNQUFOLEVBQWNDLElBQWQ7QUFFQSxTQUFLQyxRQUFMLENB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UyxLQUFLLEdBQUcsS0FBWjs7QUFFQSxTQUFLLElBQUk1QixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUtKLFFBQUwsQ0FBY0ssTUFBbEMsRUFBMENELENBQUMsRUFBM0MsRUFBK0M7QUFDN0MsVUFBSSxLQUFLSixRQUFMLENBQWNJLENBQWQsRUFBaUJHLEtBQWpCLE9BQTZCZ0IsSUFBSSxDQUFDaEIsS0FBTCxFQUFqQyxFQUErQztBQUM3QyxhQUFLUCxRQUFMLENBQWNpQyxNQUFkLENBQXFCN0IsQ0FBckIsRUFBd0IsQ0FBeEI7QUFDQTRCLFFBQUFBLEtBQUssR0FBRyxJQUFSO0FBQ0E7QUFDRDtBQUNGOztBQUVELFFBQUksQ0FBQ0EsS0FBTCxFQUFZO0FBQ1YsYUFBT25CLE9BQU8sQ0FBQ3FCLE1BQVIsQ0FBZVQsS0FBSyxDQUFDLGNBQUQsQ0FBcEIsQ0FBUDtBQUNEOztBQUVERixJQUFBQSxJQUFJLENBQUNZLGFBQUwsQ0FBbUIsSUFBbkI7O0FBQ0EsV0FBT3RCLE9BQU8sQ0FBQ3VCLE9BQVIsRUFBUDtBQUNEOztBQXBIbUQ7O0FBdUh0REMsK0JBQVdDLGVBQVgsQ0FBMkIsQ0FBQzVDLG9CQUFELENBQTNCOztlQUNlQSxvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOCBTcGluYWxDb20gLSB3d3cuc3BpbmFsY29tLmNvbVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFNwaW5hbENvcmUuXG4gKlxuICogUGxlYXNlIHJlYWQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgdGVybXMgYW5kIGNvbmRpdGlvbnNcbiAqIG9mIHRoZSBGcmVlIFNvZnR3YXJlIGxpY2Vuc2UgQWdyZWVtZW50IChcIkFncmVlbWVudFwiKVxuICogY2FyZWZ1bGx5LlxuICpcbiAqIFRoaXMgQWdyZWVtZW50IGlzIGEgbGVnYWxseSBiaW5kaW5nIGNvbnRyYWN0IGJldHdlZW5cbiAqIHRoZSBMaWNlbnNlZSAoYXMgZGVmaW5lZCBiZWxvdykgYW5kIFNwaW5hbENvbSB0aGF0XG4gKiBzZXRzIGZvcnRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyB0aGF0IGdvdmVybiB5b3VyXG4gKiB1c2Ugb2YgdGhlIFByb2dyYW0uIEJ5IGluc3RhbGxpbmcgYW5kL29yIHVzaW5nIHRoZVxuICogUHJvZ3JhbSwgeW91IGFncmVlIHRvIGFiaWRlIGJ5IGFsbCB0aGUgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zIHN0YXRlZCBvciByZWZlcmVuY2VkIGhlcmVpbi5cbiAqXG4gKiBJZiB5b3UgZG8gbm90IGFncmVlIHRvIGFiaWRlIGJ5IHRoZXNlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucywgZG8gbm90IGRlbW9uc3RyYXRlIHlvdXIgYWNjZXB0YW5jZSBhbmQgZG9cbiAqIG5vdCBpbnN0YWxsIG9yIHVzZSB0aGUgUHJvZ3JhbS5cbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYWxvbmdcbiAqIHdpdGggdGhpcyBmaWxlLiBJZiBub3QsIHNlZVxuICogPGh0dHA6Ly9yZXNvdXJjZXMuc3BpbmFsY29tLmNvbS9saWNlbnNlcy5wZGY+LlxuICovXG5pbXBvcnQgQmFzZVNwaW5hbFJlbGF0aW9uIGZyb20gXCIuL0Jhc2VTcGluYWxSZWxhdGlvblwiO1xuaW1wb3J0IHtcbiAgU1BJTkFMX1JFTEFUSU9OX0xTVF9QVFJfVFlQRVxufSBmcm9tIFwiLi9TcGluYWxSZWxhdGlvbkZhY3RvcnlcIjtcbmltcG9ydCBTcGluYWxOb2RlIGZyb20gXCIuLi9Ob2Rlcy9TcGluYWxOb2RlXCI7XG5pbXBvcnQgU3BpbmFsTm9kZVBvaW50ZXIgZnJvbSBcIi4uL1NwaW5hbE5vZGVQb2ludGVyXCI7XG5pbXBvcnQgc3BpbmFsQ29yZSBmcm9tIFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNcIjtcblxuY29uc3QgZ2xvYmFsVHlwZSA9IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB3aW5kb3c7XG5cbmNsYXNzIFNwaW5hbFJlbGF0aW9uTHN0UHRyIGV4dGVuZHMgQmFzZVNwaW5hbFJlbGF0aW9uIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yIGZvciB0aGUgU3BpbmFsUmVsYXRpb25Mc3RQdHIgY2xhc3MuXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZX0gcGFyZW50IFBhcmVudCBvZiB0aGUgcmVsYXRpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgTmFtZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBwYXJlbnQgaXMgbm90IGEgbm9kZVxuICAgKi9cbiAgY29uc3RydWN0b3IocGFyZW50LCBuYW1lKSB7XG4gICAgc3VwZXIocGFyZW50LCBuYW1lKTtcblxuICAgIHRoaXMuYWRkX2F0dHIoe1xuICAgICAgY2hpbGRyZW46IG5ldyBnbG9iYWxUeXBlLkxzdCgpXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIGFsbCB0aGUgaWRzIG9mIHRoZSBjaGlsZHJlbiBvZiB0aGUgcmVsYXRpb24gYW5kIHJldHVybiB0aGVtIGluc2lkZSBhbiBhcnJheS5cbiAgICogQHJldHVybnMge0FycmF5PFN0cmluZz59IEFycmF5IGNvbnRhaW5pbmcgYWxsIHRoZSBjaGlsZHJlbiBpZHMgb2YgdGhlIHJlbGF0aW9uXG4gICAqL1xuICBnZXRDaGlsZHJlbklkcygpIHtcbiAgICBjb25zdCByZXMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgcmVzLnB1c2godGhpcy5jaGlsZHJlbltpXS5nZXRJZCgpLmdldCgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhbGwgdGhlIGNoaWxkcmVuIG9mIHRoZSByZWxhdGlvbi5cbiAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8U3BpbmFsTm9kZT4+fSBUaGUgY2hpbGRyZW4gb2YgdGhlIHJlbGF0aW9uXG4gICAqL1xuICBnZXRDaGlsZHJlbigpIHtcbiAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgcHRyID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgIHByb21pc2VzLnB1c2gocHRyLmxvYWQoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYWxsIHRoZSBjaGlsZHJlbiBvZiB0aGUgcmVsYXRpb24gYXNzb2NpYXRlZCB0byBhIGNlcnRhaW4gY29udGV4dC5cbiAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8U3BpbmFsTm9kZT4+fSBUaGUgY2hpbGRyZW4gb2YgdGhlIHJlbGF0aW9uXG4gICAqL1xuICBhc3luYyBnZXRDaGlsZHJlbkluQ29udGV4dChjb250ZXh0KSB7XG4gICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcbiAgICBsZXQgY2hpbGRyZW47XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBwdHIgPSB0aGlzLmNoaWxkcmVuW2ldO1xuXG4gICAgICBwcm9taXNlcy5wdXNoKHB0ci5sb2FkKCkpO1xuICAgIH1cblxuICAgIGNoaWxkcmVuID0gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIHJldHVybiBjaGlsZHJlbi5maWx0ZXIoY2hpbGQgPT4gY2hpbGQuYmVsb25nc1RvQ29udGV4dChjb250ZXh0KSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdHlwZSBvZiB0aGUgcmVsYXRpb24uXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IFR5cGUgb2YgdGhlIHJlbGF0aW9uXG4gICAqL1xuICBnZXRUeXBlKCkge1xuICAgIHJldHVybiBTUElOQUxfUkVMQVRJT05fTFNUX1BUUl9UWVBFO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjaGlsZCB0byB0aGUgcmVsYXRpb24uXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZSB8IE1vZGVsfSBub2RlIE5vZGUgb3IgbW9kZWwgdG8gYWRkXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFNwaW5hbE5vZGU+fSBQcm9taXNlIGNvbnRhaW5pbmcgdGhlIG5vZGUgdGhhdCB3YXMgYWRkZWRcbiAgICovXG4gIGFzeW5jIGFkZENoaWxkKG5vZGUpIHtcbiAgICBpZiAoIShub2RlIGluc3RhbmNlb2YgZ2xvYmFsVHlwZS5Nb2RlbCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgXCJDYW5ub3QgYWRkIGEgY2hpbGQgd2l0Y2ggaXMgbm90IGFuIGluc3RhbmNlIG9mIFNwaW5hbE5vZGUgb3IgTW9kZWwuXCJcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmICghKG5vZGUgaW5zdGFuY2VvZiBTcGluYWxOb2RlKSkge1xuICAgICAgbm9kZSA9IG5ldyBTcGluYWxOb2RlKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBub2RlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5nZXRDaGlsZHJlbklkcygpLmluY2x1ZGVzKG5vZGUuZ2V0SWQoKS5nZXQoKSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBhZGQgYSBjaGlsZCB0d2ljZSB0byB0aGUgc2FtZSByZWxhdGlvbi5cIik7XG4gICAgfVxuXG4gICAgbm9kZS5fYWRkUGFyZW50KHRoaXMpO1xuICAgIHRoaXMuY2hpbGRyZW4ucHVzaChuZXcgU3BpbmFsTm9kZVBvaW50ZXIobm9kZSkpO1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBjaGlsZCBmcm9tIHRoZSByZWxhdGlvbi5cbiAgICogQHBhcmFtIHtTcGluYWxOb2RlfSBub2RlIENoaWxkIHRvIHJlbW92ZVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxub3RoaW5nPn0gQW4gZW1wdHkgcHJvbWlzZVxuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIGdpdmVuIG5vZGUgaXMgbm90IGEgY2hpbGRcbiAgICovXG4gIHJlbW92ZUNoaWxkKG5vZGUpIHtcbiAgICBsZXQgZm91bmQgPSBmYWxzZTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMuY2hpbGRyZW5baV0uZ2V0SWQoKSA9PT0gbm9kZS5nZXRJZCgpKSB7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGksIDEpO1xuICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghZm91bmQpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvcihcIkludmFsaWQgbm9kZVwiKSk7XG4gICAgfVxuXG4gICAgbm9kZS5fcmVtb3ZlUGFyZW50KHRoaXMpO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxufVxuXG5zcGluYWxDb3JlLnJlZ2lzdGVyX21vZGVscyhbU3BpbmFsUmVsYXRpb25Mc3RQdHJdKTtcbmV4cG9ydCBkZWZhdWx0IFNwaW5hbFJlbGF0aW9uTHN0UHRyO1xuIl19