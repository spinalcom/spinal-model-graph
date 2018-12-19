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
 * Relation where the children are in Lst of Ptr.
 * @extends BaseSpinalRelation
 */
class SpinalRelationLstPtr extends _BaseSpinalRelation.default {
  /**
   * Constructor for the SpinalRelationLstPtr class.
   * @param {SpinalNode} parent Parent of the relation
   * @param {String} name Name of the relation
   * @throws {TypeError} If the parent is not a node
   * @throws {TypeError} If the name is not a string
   */
  constructor(parent, name) {
    super(parent, name);
    this.add_attr({
      children: new _spinalCoreConnectorjs_type.Lst()
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
   * @throws {TypeError} If the context is not a SpinalContext
   */


  getChildrenInContext(context) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const promises = [];
      let children;

      if (!(context instanceof _index.SpinalContext)) {
        return Promise.reject(TypeError("context must be a SpinalContext"));
      }

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
   * @throws {TypeError} If the node is not a Model
   * @throws {Error} If the node is already a child of the relation
   */


  addChild(node) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      if (!(node instanceof _spinalCoreConnectorjs_type.Model)) {
        throw new Error("Cannot add a child witch is not an instance of SpinalNode or Model.");
      } else if (!(node instanceof _index.SpinalNode)) {
        node = new _index.SpinalNode(undefined, undefined, node);
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
      return Promise.reject(Error("The node is not a child"));
    }

    node._removeParent(this);

    return Promise.resolve();
  }

}

_spinalCoreConnectorjs_type.spinalCore.register_models([SpinalRelationLstPtr]);

var _default = SpinalRelationLstPtr;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9SZWxhdGlvbnMvU3BpbmFsUmVsYXRpb25Mc3RQdHIuanMiXSwibmFtZXMiOlsiU3BpbmFsUmVsYXRpb25Mc3RQdHIiLCJCYXNlU3BpbmFsUmVsYXRpb24iLCJjb25zdHJ1Y3RvciIsInBhcmVudCIsIm5hbWUiLCJhZGRfYXR0ciIsImNoaWxkcmVuIiwiTHN0IiwiZ2V0Q2hpbGRyZW5JZHMiLCJyZXMiLCJpIiwibGVuZ3RoIiwicHVzaCIsImdldElkIiwiZ2V0IiwiZ2V0Q2hpbGRyZW4iLCJwcm9taXNlcyIsInB0ciIsImxvYWQiLCJQcm9taXNlIiwiYWxsIiwiZ2V0Q2hpbGRyZW5JbkNvbnRleHQiLCJjb250ZXh0IiwiU3BpbmFsQ29udGV4dCIsInJlamVjdCIsIlR5cGVFcnJvciIsImZpbHRlciIsImNoaWxkIiwiYmVsb25nc1RvQ29udGV4dCIsImdldFR5cGUiLCJTUElOQUxfUkVMQVRJT05fTFNUX1BUUl9UWVBFIiwiYWRkQ2hpbGQiLCJub2RlIiwiTW9kZWwiLCJFcnJvciIsIlNwaW5hbE5vZGUiLCJ1bmRlZmluZWQiLCJpbmNsdWRlcyIsIl9hZGRQYXJlbnQiLCJTcGluYWxOb2RlUG9pbnRlciIsInJlbW92ZUNoaWxkIiwiZm91bmQiLCJzcGxpY2UiLCJfcmVtb3ZlUGFyZW50IiwicmVzb2x2ZSIsInNwaW5hbENvcmUiLCJyZWdpc3Rlcl9tb2RlbHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUF3QkE7O0FBTUE7O0FBQ0E7O0FBR0E7O0FBSUE7Ozs7Ozs7O0FBRUE7Ozs7QUFJQSxNQUFNQSxvQkFBTixTQUFtQ0MsMkJBQW5DLENBQXNEO0FBQ3BEOzs7Ozs7O0FBT0FDLEVBQUFBLFdBQVcsQ0FBQ0MsTUFBRCxFQUFTQyxJQUFULEVBQWU7QUFDeEIsVUFBTUQsTUFBTixFQUFjQyxJQUFkO0FBRUEsU0FBS0MsUUFBTCxDQUFjO0FBQ1pDLE1BQUFBLFFBQVEsRUFBRSxJQUFJQywrQkFBSjtBQURFLEtBQWQ7QUFHRDtBQUVEOzs7Ozs7QUFJ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QUFXLENBQUNSLElBQUQsRUFBTztBQUNoQixRQUFJUyxLQUFLLEdBQUcsS0FBWjs7QUFFQSxTQUFLLElBQUkvQixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUtKLFFBQUwsQ0FBY0ssTUFBbEMsRUFBMENELENBQUMsRUFBM0MsRUFBK0M7QUFDN0MsVUFBSSxLQUFLSixRQUFMLENBQWNJLENBQWQsRUFBaUJHLEtBQWpCLE9BQTZCbUIsSUFBSSxDQUFDbkIsS0FBTCxFQUFqQyxFQUErQztBQUM3QyxhQUFLUCxRQUFMLENBQWNvQyxNQUFkLENBQXFCaEMsQ0FBckIsRUFBd0IsQ0FBeEI7QUFDQStCLFFBQUFBLEtBQUssR0FBRyxJQUFSO0FBQ0E7QUFDRDtBQUNGOztBQUVELFFBQUksQ0FBQ0EsS0FBTCxFQUFZO0FBQ1YsYUFBT3RCLE9BQU8sQ0FBQ0ssTUFBUixDQUFlVSxLQUFLLENBQUMseUJBQUQsQ0FBcEIsQ0FBUDtBQUNEOztBQUVERixJQUFBQSxJQUFJLENBQUNXLGFBQUwsQ0FBbUIsSUFBbkI7O0FBQ0EsV0FBT3hCLE9BQU8sQ0FBQ3lCLE9BQVIsRUFBUDtBQUNEOztBQTVIbUQ7O0FBK0h0REMsdUNBQVdDLGVBQVgsQ0FBMkIsQ0FBQzlDLG9CQUFELENBQTNCOztlQUNlQSxvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOCBTcGluYWxDb20gLSB3d3cuc3BpbmFsY29tLmNvbVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFNwaW5hbENvcmUuXG4gKlxuICogUGxlYXNlIHJlYWQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgdGVybXMgYW5kIGNvbmRpdGlvbnNcbiAqIG9mIHRoZSBGcmVlIFNvZnR3YXJlIGxpY2Vuc2UgQWdyZWVtZW50IChcIkFncmVlbWVudFwiKVxuICogY2FyZWZ1bGx5LlxuICpcbiAqIFRoaXMgQWdyZWVtZW50IGlzIGEgbGVnYWxseSBiaW5kaW5nIGNvbnRyYWN0IGJldHdlZW5cbiAqIHRoZSBMaWNlbnNlZSAoYXMgZGVmaW5lZCBiZWxvdykgYW5kIFNwaW5hbENvbSB0aGF0XG4gKiBzZXRzIGZvcnRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyB0aGF0IGdvdmVybiB5b3VyXG4gKiB1c2Ugb2YgdGhlIFByb2dyYW0uIEJ5IGluc3RhbGxpbmcgYW5kL29yIHVzaW5nIHRoZVxuICogUHJvZ3JhbSwgeW91IGFncmVlIHRvIGFiaWRlIGJ5IGFsbCB0aGUgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zIHN0YXRlZCBvciByZWZlcmVuY2VkIGhlcmVpbi5cbiAqXG4gKiBJZiB5b3UgZG8gbm90IGFncmVlIHRvIGFiaWRlIGJ5IHRoZXNlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucywgZG8gbm90IGRlbW9uc3RyYXRlIHlvdXIgYWNjZXB0YW5jZSBhbmQgZG9cbiAqIG5vdCBpbnN0YWxsIG9yIHVzZSB0aGUgUHJvZ3JhbS5cbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYWxvbmdcbiAqIHdpdGggdGhpcyBmaWxlLiBJZiBub3QsIHNlZVxuICogPGh0dHA6Ly9yZXNvdXJjZXMuc3BpbmFsY29tLmNvbS9saWNlbnNlcy5wZGY+LlxuICovXG5cbmltcG9ydCB7XG4gIHNwaW5hbENvcmUsXG4gIE1vZGVsLFxuICBMc3Rcbn0gZnJvbSBcInNwaW5hbC1jb3JlLWNvbm5lY3RvcmpzX3R5cGVcIjtcblxuaW1wb3J0IEJhc2VTcGluYWxSZWxhdGlvbiBmcm9tIFwiLi9CYXNlU3BpbmFsUmVsYXRpb25cIjtcbmltcG9ydCB7XG4gIFNQSU5BTF9SRUxBVElPTl9MU1RfUFRSX1RZUEVcbn0gZnJvbSBcIi4vU3BpbmFsUmVsYXRpb25GYWN0b3J5XCI7XG5pbXBvcnQge1xuICBTcGluYWxOb2RlLFxuICBTcGluYWxDb250ZXh0XG59IGZyb20gXCIuLi9pbmRleFwiO1xuaW1wb3J0IFNwaW5hbE5vZGVQb2ludGVyIGZyb20gXCIuLi9TcGluYWxOb2RlUG9pbnRlclwiO1xuXG4vKipcbiAqIFJlbGF0aW9uIHdoZXJlIHRoZSBjaGlsZHJlbiBhcmUgaW4gTHN0IG9mIFB0ci5cbiAqIEBleHRlbmRzIEJhc2VTcGluYWxSZWxhdGlvblxuICovXG5jbGFzcyBTcGluYWxSZWxhdGlvbkxzdFB0ciBleHRlbmRzIEJhc2VTcGluYWxSZWxhdGlvbiB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIFNwaW5hbFJlbGF0aW9uTHN0UHRyIGNsYXNzLlxuICAgKiBAcGFyYW0ge1NwaW5hbE5vZGV9IHBhcmVudCBQYXJlbnQgb2YgdGhlIHJlbGF0aW9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIE5hbWUgb2YgdGhlIHJlbGF0aW9uXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIHBhcmVudCBpcyBub3QgYSBub2RlXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIG5hbWUgaXMgbm90IGEgc3RyaW5nXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwYXJlbnQsIG5hbWUpIHtcbiAgICBzdXBlcihwYXJlbnQsIG5hbWUpO1xuXG4gICAgdGhpcy5hZGRfYXR0cih7XG4gICAgICBjaGlsZHJlbjogbmV3IExzdCgpXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIGFsbCB0aGUgaWRzIG9mIHRoZSBjaGlsZHJlbiBvZiB0aGUgcmVsYXRpb24gYW5kIHJldHVybiB0aGVtIGluc2lkZSBhbiBhcnJheS5cbiAgICogQHJldHVybnMge0FycmF5PFN0cmluZz59IEFycmF5IGNvbnRhaW5pbmcgYWxsIHRoZSBjaGlsZHJlbiBpZHMgb2YgdGhlIHJlbGF0aW9uXG4gICAqL1xuICBnZXRDaGlsZHJlbklkcygpIHtcbiAgICBjb25zdCByZXMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgcmVzLnB1c2godGhpcy5jaGlsZHJlbltpXS5nZXRJZCgpLmdldCgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhbGwgdGhlIGNoaWxkcmVuIG9mIHRoZSByZWxhdGlvbi5cbiAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8U3BpbmFsTm9kZT4+fSBUaGUgY2hpbGRyZW4gb2YgdGhlIHJlbGF0aW9uXG4gICAqL1xuICBnZXRDaGlsZHJlbigpIHtcbiAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgcHRyID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgIHByb21pc2VzLnB1c2gocHRyLmxvYWQoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYWxsIHRoZSBjaGlsZHJlbiBvZiB0aGUgcmVsYXRpb24gYXNzb2NpYXRlZCB0byBhIGNlcnRhaW4gY29udGV4dC5cbiAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8U3BpbmFsTm9kZT4+fSBUaGUgY2hpbGRyZW4gb2YgdGhlIHJlbGF0aW9uXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIGNvbnRleHQgaXMgbm90IGEgU3BpbmFsQ29udGV4dFxuICAgKi9cbiAgYXN5bmMgZ2V0Q2hpbGRyZW5JbkNvbnRleHQoY29udGV4dCkge1xuICAgIGNvbnN0IHByb21pc2VzID0gW107XG4gICAgbGV0IGNoaWxkcmVuO1xuXG4gICAgaWYgKCEoY29udGV4dCBpbnN0YW5jZW9mIFNwaW5hbENvbnRleHQpKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoVHlwZUVycm9yKFwiY29udGV4dCBtdXN0IGJlIGEgU3BpbmFsQ29udGV4dFwiKSk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgcHRyID0gdGhpcy5jaGlsZHJlbltpXTtcblxuICAgICAgcHJvbWlzZXMucHVzaChwdHIubG9hZCgpKTtcbiAgICB9XG5cbiAgICBjaGlsZHJlbiA9IGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICByZXR1cm4gY2hpbGRyZW4uZmlsdGVyKGNoaWxkID0+IGNoaWxkLmJlbG9uZ3NUb0NvbnRleHQoY29udGV4dCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHR5cGUgb2YgdGhlIHJlbGF0aW9uLlxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBUeXBlIG9mIHRoZSByZWxhdGlvblxuICAgKi9cbiAgZ2V0VHlwZSgpIHtcbiAgICByZXR1cm4gU1BJTkFMX1JFTEFUSU9OX0xTVF9QVFJfVFlQRTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgY2hpbGQgdG8gdGhlIHJlbGF0aW9uLlxuICAgKiBAcGFyYW0ge1NwaW5hbE5vZGUgfCBNb2RlbH0gbm9kZSBOb2RlIG9yIG1vZGVsIHRvIGFkZFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxTcGluYWxOb2RlPn0gUHJvbWlzZSBjb250YWluaW5nIHRoZSBub2RlIHRoYXQgd2FzIGFkZGVkXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIG5vZGUgaXMgbm90IGEgTW9kZWxcbiAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBub2RlIGlzIGFscmVhZHkgYSBjaGlsZCBvZiB0aGUgcmVsYXRpb25cbiAgICovXG4gIGFzeW5jIGFkZENoaWxkKG5vZGUpIHtcbiAgICBpZiAoIShub2RlIGluc3RhbmNlb2YgTW9kZWwpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIFwiQ2Fubm90IGFkZCBhIGNoaWxkIHdpdGNoIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBTcGluYWxOb2RlIG9yIE1vZGVsLlwiXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoIShub2RlIGluc3RhbmNlb2YgU3BpbmFsTm9kZSkpIHtcbiAgICAgIG5vZGUgPSBuZXcgU3BpbmFsTm9kZSh1bmRlZmluZWQsIHVuZGVmaW5lZCwgbm9kZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZ2V0Q2hpbGRyZW5JZHMoKS5pbmNsdWRlcyhub2RlLmdldElkKCkuZ2V0KCkpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgYWRkIGEgY2hpbGQgdHdpY2UgdG8gdGhlIHNhbWUgcmVsYXRpb24uXCIpO1xuICAgIH1cblxuICAgIG5vZGUuX2FkZFBhcmVudCh0aGlzKTtcbiAgICB0aGlzLmNoaWxkcmVuLnB1c2gobmV3IFNwaW5hbE5vZGVQb2ludGVyKG5vZGUpKTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgY2hpbGQgZnJvbSB0aGUgcmVsYXRpb24uXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZX0gbm9kZSBDaGlsZCB0byByZW1vdmVcbiAgICogQHJldHVybnMge1Byb21pc2U8bm90aGluZz59IEFuIGVtcHR5IHByb21pc2VcbiAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBnaXZlbiBub2RlIGlzIG5vdCBhIGNoaWxkXG4gICAqL1xuICByZW1vdmVDaGlsZChub2RlKSB7XG4gICAgbGV0IGZvdW5kID0gZmFsc2U7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLmNoaWxkcmVuW2ldLmdldElkKCkgPT09IG5vZGUuZ2V0SWQoKSkge1xuICAgICAgICB0aGlzLmNoaWxkcmVuLnNwbGljZShpLCAxKTtcbiAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRXJyb3IoXCJUaGUgbm9kZSBpcyBub3QgYSBjaGlsZFwiKSk7XG4gICAgfVxuXG4gICAgbm9kZS5fcmVtb3ZlUGFyZW50KHRoaXMpO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxufVxuXG5zcGluYWxDb3JlLnJlZ2lzdGVyX21vZGVscyhbU3BpbmFsUmVsYXRpb25Mc3RQdHJdKTtcbmV4cG9ydCBkZWZhdWx0IFNwaW5hbFJlbGF0aW9uTHN0UHRyO1xuIl19