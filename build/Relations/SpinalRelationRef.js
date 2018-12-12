"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseSpinalRelation = _interopRequireDefault(require("./BaseSpinalRelation"));

var _SpinalRelationFactory = require("./SpinalRelationFactory");

var _SpinalNode = _interopRequireDefault(require("../Nodes/SpinalNode"));

var _spinalCoreConnectorjs = _interopRequireDefault(require("spinal-core-connectorjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const globalType = typeof window === "undefined" ? global : window;

class SpinalRelationRef extends _BaseSpinalRelation.default {
  /**
   * Constructor for the SpinalRelationRef class.
   * @param {String} name Name of the relation
   */
  constructor(name) {
    super(name);
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
   */


  addChild(node) {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (!(node instanceof globalType.Model)) {
        throw new Error("Cannot add a child witch is not an instance of SpinalNode or Model.");
      } else if (!(node instanceof _SpinalNode.default)) {
        node = new _SpinalNode.default(undefined, undefined, node);
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
   * @returns {Promise<Boolean>} A promise containing true if the node was a child
   */


  removeChild(node) {
    if (!this.children.contains(node)) {
      return Promise.resolve(false);
    }

    node._removeParent(this);

    this.children.remove(node);
    return Promise.resolve(true);
  }

}

_spinalCoreConnectorjs.default.register_models([SpinalRelationRef]);

var _default = SpinalRelationRef;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9SZWxhdGlvbnMvU3BpbmFsUmVsYXRpb25SZWYuanMiXSwibmFtZXMiOlsiZ2xvYmFsVHlwZSIsIndpbmRvdyIsImdsb2JhbCIsIlNwaW5hbFJlbGF0aW9uUmVmIiwiQmFzZVNwaW5hbFJlbGF0aW9uIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiYWRkX2F0dHIiLCJjaGlsZHJlbiIsIkxzdCIsImdldENoaWxkcmVuSWRzIiwicmVzIiwiaSIsImxlbmd0aCIsInB1c2giLCJnZXRJZCIsImdldCIsImdldENoaWxkcmVuIiwiUHJvbWlzZSIsInJlc29sdmUiLCJnZXRDaGlsZHJlbkluQ29udGV4dCIsImNvbnRleHQiLCJjaGlsZCIsImJlbG9uZ3NUb0NvbnRleHQiLCJnZXRUeXBlIiwiU1BJTkFMX1JFTEFUSU9OX1RZUEUiLCJhZGRDaGlsZCIsIm5vZGUiLCJNb2RlbCIsIkVycm9yIiwiU3BpbmFsTm9kZSIsInVuZGVmaW5lZCIsImluY2x1ZGVzIiwiX2FkZFBhcmVudCIsInJlbW92ZUNoaWxkIiwiY29udGFpbnMiLCJfcmVtb3ZlUGFyZW50IiwicmVtb3ZlIiwic3BpbmFsQ29yZSIsInJlZ2lzdGVyX21vZGVscyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQXVCQTs7QUFDQTs7QUFHQTs7QUFDQTs7Ozs7Ozs7QUFFQSxNQUFNQSxVQUFVLEdBQUcsT0FBT0MsTUFBUCxLQUFrQixXQUFsQixHQUFnQ0MsTUFBaEMsR0FBeUNELE1BQTVEOztBQUVBLE1BQU1FLGlCQUFOLFNBQWdDQywyQkFBaEMsQ0FBbUQ7QUFDakQ7Ozs7QUFJQUMsRUFBQUEsV0FBVyxDQUFDQyxJQUFELEVBQU87QUFDaEIsVUFBTUEsSUFBTjtBQUNBLFNBQUtDLFFBQUwsQ0FBYztBQUNaQyxNQUFBQSxRQUFRLEVBQUUsSUFBSVIsVUFBVSxDQUFDUyxHQUFmO0FBREUsS0FBZDtBQUdEO0FBRUQ7Ozs7OztBQUlBQyxFQUFBQSxjQUFjLEdBQUc7QUFDZixVQUFNQyxHQUFHLEdBQUcsRUFB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M0I7O2VBQ2VBLGlCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4IFNwaW5hbENvbSAtIHd3dy5zcGluYWxjb20uY29tXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgU3BpbmFsQ29yZS5cbiAqXG4gKiBQbGVhc2UgcmVhZCBhbGwgb2YgdGhlIGZvbGxvd2luZyB0ZXJtcyBhbmQgY29uZGl0aW9uc1xuICogb2YgdGhlIEZyZWUgU29mdHdhcmUgbGljZW5zZSBBZ3JlZW1lbnQgKFwiQWdyZWVtZW50XCIpXG4gKiBjYXJlZnVsbHkuXG4gKlxuICogVGhpcyBBZ3JlZW1lbnQgaXMgYSBsZWdhbGx5IGJpbmRpbmcgY29udHJhY3QgYmV0d2VlblxuICogdGhlIExpY2Vuc2VlIChhcyBkZWZpbmVkIGJlbG93KSBhbmQgU3BpbmFsQ29tIHRoYXRcbiAqIHNldHMgZm9ydGggdGhlIHRlcm1zIGFuZCBjb25kaXRpb25zIHRoYXQgZ292ZXJuIHlvdXJcbiAqIHVzZSBvZiB0aGUgUHJvZ3JhbS4gQnkgaW5zdGFsbGluZyBhbmQvb3IgdXNpbmcgdGhlXG4gKiBQcm9ncmFtLCB5b3UgYWdyZWUgdG8gYWJpZGUgYnkgYWxsIHRoZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMgc3RhdGVkIG9yIHJlZmVyZW5jZWQgaGVyZWluLlxuICpcbiAqIElmIHlvdSBkbyBub3QgYWdyZWUgdG8gYWJpZGUgYnkgdGhlc2UgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zLCBkbyBub3QgZGVtb25zdHJhdGUgeW91ciBhY2NlcHRhbmNlIGFuZCBkb1xuICogbm90IGluc3RhbGwgb3IgdXNlIHRoZSBQcm9ncmFtLlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbG9uZ1xuICogd2l0aCB0aGlzIGZpbGUuIElmIG5vdCwgc2VlXG4gKiA8aHR0cDovL3Jlc291cmNlcy5zcGluYWxjb20uY29tL2xpY2Vuc2VzLnBkZj4uXG4gKi9cbmltcG9ydCBCYXNlU3BpbmFsUmVsYXRpb24gZnJvbSBcIi4vQmFzZVNwaW5hbFJlbGF0aW9uXCI7XG5pbXBvcnQge1xuICBTUElOQUxfUkVMQVRJT05fVFlQRVxufSBmcm9tIFwiLi9TcGluYWxSZWxhdGlvbkZhY3RvcnlcIjtcbmltcG9ydCBTcGluYWxOb2RlIGZyb20gXCIuLi9Ob2Rlcy9TcGluYWxOb2RlXCI7XG5pbXBvcnQgc3BpbmFsQ29yZSBmcm9tIFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNcIjtcblxuY29uc3QgZ2xvYmFsVHlwZSA9IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB3aW5kb3c7XG5cbmNsYXNzIFNwaW5hbFJlbGF0aW9uUmVmIGV4dGVuZHMgQmFzZVNwaW5hbFJlbGF0aW9uIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yIGZvciB0aGUgU3BpbmFsUmVsYXRpb25SZWYgY2xhc3MuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIE5hbWUgb2YgdGhlIHJlbGF0aW9uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgc3VwZXIobmFtZSk7XG4gICAgdGhpcy5hZGRfYXR0cih7XG4gICAgICBjaGlsZHJlbjogbmV3IGdsb2JhbFR5cGUuTHN0KClcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgYWxsIHRoZSBpZHMgb2YgdGhlIGNoaWxkcmVuIG9mIHRoZSByZWxhdGlvbiBhbmQgcmV0dXJuIHRoZW0gaW5zaWRlIGFuIGFycmF5LlxuICAgKiBAcmV0dXJucyB7QXJyYXk8U3RyaW5nPn0gQXJyYXkgY29udGFpbmluZyBhbGwgdGhlIGNoaWxkcmVuIGlkcyBvZiB0aGUgcmVsYXRpb25cbiAgICovXG4gIGdldENoaWxkcmVuSWRzKCkge1xuICAgIGNvbnN0IHJlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgcmVzLnB1c2godGhpcy5jaGlsZHJlbltpXS5nZXRJZCgpLmdldCgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYWxsIHRoZSBjaGlsZHJlbiBvZiB0aGUgcmVsYXRpb24uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PFNwaW5hbE5vZGU+Pn0gVGhlIGNoaWxkcmVuIG9mIHRoZSByZWxhdGlvblxuICAgKi9cbiAgZ2V0Q2hpbGRyZW4oKSB7XG4gICAgbGV0IGNoaWxkcmVuID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoaWxkcmVuLnB1c2godGhpcy5jaGlsZHJlbltpXSk7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY2hpbGRyZW4pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhbGwgdGhlIGNoaWxkcmVuIG9mIHRoZSByZWxhdGlvbiBhc3NvY2lhdGVkIHRvIGEgY2VydGFpbiBjb250ZXh0LlxuICAgKiBAcGFyYW0ge1NwaW5hbENvbnRleHR9IGNvbnRleHQgVGhlIGNvbnRleHQgdG8gdXNlIGZvciB0aGUgc2VhcmNoXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PFNwaW5hbE5vZGU+Pn0gVGhlIGNoaWxkcmVuIG9mIHRoZSByZWxhdGlvbiBhc3NvY2lhdGVkIHRvIHRoZSBjb250ZXh0XG4gICAqL1xuICBnZXRDaGlsZHJlbkluQ29udGV4dChjb250ZXh0KSB7XG4gICAgbGV0IGNoaWxkcmVuID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XG5cbiAgICAgIGlmIChjaGlsZC5iZWxvbmdzVG9Db250ZXh0KGNvbnRleHQpKSB7XG4gICAgICAgIGNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNoaWxkcmVuKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB0eXBlIG9mIHRoZSByZWxhdGlvbi5cbiAgICogQHJldHVybnMge051bWJlcn0gVHlwZSBvZiB0aGUgcmVsYXRpb25cbiAgICovXG4gIGdldFR5cGUoKSB7XG4gICAgcmV0dXJuIFNQSU5BTF9SRUxBVElPTl9UWVBFO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjaGlsZCB0byB0aGUgcmVsYXRpb24uXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZSB8IE1vZGVsfSBub2RlIE5vZGUgb3IgbW9kZWwgdG8gYWRkXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFNwaW5hbE5vZGU+fSBQcm9taXNlIGNvbnRhaW5pbmcgdGhlIG5vZGUgdGhhdCB3YXMgYWRkZWRcbiAgICovXG4gIGFzeW5jIGFkZENoaWxkKG5vZGUpIHtcbiAgICBpZiAoIShub2RlIGluc3RhbmNlb2YgZ2xvYmFsVHlwZS5Nb2RlbCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgXCJDYW5ub3QgYWRkIGEgY2hpbGQgd2l0Y2ggaXMgbm90IGFuIGluc3RhbmNlIG9mIFNwaW5hbE5vZGUgb3IgTW9kZWwuXCJcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmICghKG5vZGUgaW5zdGFuY2VvZiBTcGluYWxOb2RlKSkge1xuICAgICAgbm9kZSA9IG5ldyBTcGluYWxOb2RlKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBub2RlKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZ2V0Q2hpbGRyZW5JZHMoKS5pbmNsdWRlcyhub2RlLmdldElkKCkuZ2V0KCkpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgYWRkIGEgY2hpbGQgdHdpY2UgdG8gdGhlIHNhbWUgcmVsYXRpb24uXCIpO1xuICAgIH1cblxuICAgIHRoaXMuY2hpbGRyZW4ucHVzaChub2RlKTtcbiAgICBub2RlLl9hZGRQYXJlbnQodGhpcyk7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNoaWxkIGZyb20gdGhlIHJlbGF0aW9uLlxuICAgKiBAcGFyYW0ge1NwaW5hbE5vZGV9IG5vZGUgQ2hpbGQgdG8gcmVtb3ZlXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEJvb2xlYW4+fSBBIHByb21pc2UgY29udGFpbmluZyB0cnVlIGlmIHRoZSBub2RlIHdhcyBhIGNoaWxkXG4gICAqL1xuICByZW1vdmVDaGlsZChub2RlKSB7XG4gICAgaWYgKCF0aGlzLmNoaWxkcmVuLmNvbnRhaW5zKG5vZGUpKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKTtcbiAgICB9XG5cbiAgICBub2RlLl9yZW1vdmVQYXJlbnQodGhpcyk7XG4gICAgdGhpcy5jaGlsZHJlbi5yZW1vdmUobm9kZSk7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpO1xuICB9XG59XG5cbnNwaW5hbENvcmUucmVnaXN0ZXJfbW9kZWxzKFtTcGluYWxSZWxhdGlvblJlZl0pO1xuZXhwb3J0IGRlZmF1bHQgU3BpbmFsUmVsYXRpb25SZWY7XG4iXX0=