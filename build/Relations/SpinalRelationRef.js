"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _spinalCoreConnectorjs_type = require("spinal-core-connectorjs_type");

var _BaseSpinalRelation = _interopRequireDefault(require("./BaseSpinalRelation"));

var _SpinalRelationFactory = require("./SpinalRelationFactory");

var _index = require("../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class SpinalRelationRef extends _BaseSpinalRelation.default {
  /**
   * Constructor for the SpinalRelationRef class.
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
   * @throws {TypeError} If the context is not a SpinalContext
   */


  getChildrenInContext(context) {
    let children = [];

    if (!(context instanceof _index.SpinalContext)) {
      return Promise.reject(TypeError("context must be a SpinalContext"));
    }

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
      if (!(node instanceof _spinalCoreConnectorjs_type.Model)) {
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

_spinalCoreConnectorjs_type.spinalCore.register_models([SpinalRelationRef]);

var _default = SpinalRelationRef;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9SZWxhdGlvbnMvU3BpbmFsUmVsYXRpb25SZWYuanMiXSwibmFtZXMiOlsiU3BpbmFsUmVsYXRpb25SZWYiLCJCYXNlU3BpbmFsUmVsYXRpb24iLCJjb25zdHJ1Y3RvciIsInBhcmVudCIsIm5hbWUiLCJhZGRfYXR0ciIsImNoaWxkcmVuIiwiTHN0IiwiZ2V0Q2hpbGRyZW5JZHMiLCJyZXMiLCJpIiwibGVuZ3RoIiwicHVzaCIsImdldElkIiwiZ2V0IiwiZ2V0Q2hpbGRyZW4iLCJQcm9taXNlIiwicmVzb2x2ZSIsImdldENoaWxkcmVuSW5Db250ZXh0IiwiY29udGV4dCIsIlNwaW5hbENvbnRleHQiLCJyZWplY3QiLCJUeXBlRXJyb3IiLCJjaGlsZCIsImJlbG9uZ3NUb0NvbnRleHQiLCJnZXRUeXBlIiwiU1BJTkFMX1JFTEFUSU9OX1RZUEUiLCJhZGRDaGlsZCIsIm5vZGUiLCJNb2RlbCIsIlNwaW5hbE5vZGUiLCJ1bmRlZmluZWQiLCJpbmNsdWRlcyIsIkVycm9yIiwiX2FkZFBhcmVudCIsInJlbW92ZUNoaWxkIiwiY29udGFpbnMiLCJfcmVtb3ZlUGFyZW50IiwicmVtb3ZlIiwic3BpbmFsQ29yZSIsInJlZ2lzdGVyX21vZGVscyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQXdCQTs7QUFNQTs7QUFDQTs7QUFHQTs7Ozs7Ozs7QUFLQSxNQUFNQSxpQkFBTixTQUFnQ0MsMkJBQWhDLENBQW1EO0FBQ2pEOzs7Ozs7O0FBT0FDLEVBQUFBLFdBQVcsQ0FBQ0MsTUFBRCxFQUFTQyxJQUFULEVBQWU7QUFDeEIsVUFBTUQsTUFBTixFQUFjQyxJQUFkO0FBRUEsU0FBS0MsUUFBTCxDQUFjO0FBQ1pDLE1BQUFBLFFBQVEsRUFBRSxJQUFJQywrQkFBSjtBQURFLEtBQWQ7QUFHRDtBQUVEOzs7Ozs7QUFJQUMsRUFBQUEsY0FBYyxHQUFHO0FBQ2YsVUFBTUMsR0FBRyxHQUFHLEVBQVo7O0FBRUEsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEs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QUNDLE9BQVIsRUFBUDtBQUNEOztBQW5IZ0Q7O0FBc0huRHNCLHVDQUFXQyxlQUFYLENBQTJCLENBQUN4QyxpQkFBRCxDQUEzQjs7ZUFDZUEsaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTggU3BpbmFsQ29tIC0gd3d3LnNwaW5hbGNvbS5jb21cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBTcGluYWxDb3JlLlxuICpcbiAqIFBsZWFzZSByZWFkIGFsbCBvZiB0aGUgZm9sbG93aW5nIHRlcm1zIGFuZCBjb25kaXRpb25zXG4gKiBvZiB0aGUgRnJlZSBTb2Z0d2FyZSBsaWNlbnNlIEFncmVlbWVudCAoXCJBZ3JlZW1lbnRcIilcbiAqIGNhcmVmdWxseS5cbiAqXG4gKiBUaGlzIEFncmVlbWVudCBpcyBhIGxlZ2FsbHkgYmluZGluZyBjb250cmFjdCBiZXR3ZWVuXG4gKiB0aGUgTGljZW5zZWUgKGFzIGRlZmluZWQgYmVsb3cpIGFuZCBTcGluYWxDb20gdGhhdFxuICogc2V0cyBmb3J0aCB0aGUgdGVybXMgYW5kIGNvbmRpdGlvbnMgdGhhdCBnb3Zlcm4geW91clxuICogdXNlIG9mIHRoZSBQcm9ncmFtLiBCeSBpbnN0YWxsaW5nIGFuZC9vciB1c2luZyB0aGVcbiAqIFByb2dyYW0sIHlvdSBhZ3JlZSB0byBhYmlkZSBieSBhbGwgdGhlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucyBzdGF0ZWQgb3IgcmVmZXJlbmNlZCBoZXJlaW4uXG4gKlxuICogSWYgeW91IGRvIG5vdCBhZ3JlZSB0byBhYmlkZSBieSB0aGVzZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMsIGRvIG5vdCBkZW1vbnN0cmF0ZSB5b3VyIGFjY2VwdGFuY2UgYW5kIGRvXG4gKiBub3QgaW5zdGFsbCBvciB1c2UgdGhlIFByb2dyYW0uXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFsb25nXG4gKiB3aXRoIHRoaXMgZmlsZS4gSWYgbm90LCBzZWVcbiAqIDxodHRwOi8vcmVzb3VyY2VzLnNwaW5hbGNvbS5jb20vbGljZW5zZXMucGRmPi5cbiAqL1xuXG5pbXBvcnQge1xuICBzcGluYWxDb3JlLFxuICBNb2RlbCxcbiAgTHN0XG59IGZyb20gXCJzcGluYWwtY29yZS1jb25uZWN0b3Jqc190eXBlXCI7XG5cbmltcG9ydCBCYXNlU3BpbmFsUmVsYXRpb24gZnJvbSBcIi4vQmFzZVNwaW5hbFJlbGF0aW9uXCI7XG5pbXBvcnQge1xuICBTUElOQUxfUkVMQVRJT05fVFlQRVxufSBmcm9tIFwiLi9TcGluYWxSZWxhdGlvbkZhY3RvcnlcIjtcbmltcG9ydCB7XG4gIFNwaW5hbE5vZGUsXG4gIFNwaW5hbENvbnRleHRcbn0gZnJvbSBcIi4uL2luZGV4XCI7XG5cbmNsYXNzIFNwaW5hbFJlbGF0aW9uUmVmIGV4dGVuZHMgQmFzZVNwaW5hbFJlbGF0aW9uIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yIGZvciB0aGUgU3BpbmFsUmVsYXRpb25SZWYgY2xhc3MuXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZX0gcGFyZW50IFBhcmVudCBvZiB0aGUgcmVsYXRpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgTmFtZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgcGFyZW50IGlzIG5vdCBhIG5vZGVcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgbmFtZSBpcyBub3QgYSBzdHJpbmdcbiAgICovXG4gIGNvbnN0cnVjdG9yKHBhcmVudCwgbmFtZSkge1xuICAgIHN1cGVyKHBhcmVudCwgbmFtZSk7XG5cbiAgICB0aGlzLmFkZF9hdHRyKHtcbiAgICAgIGNoaWxkcmVuOiBuZXcgTHN0KClcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgYWxsIHRoZSBpZHMgb2YgdGhlIGNoaWxkcmVuIG9mIHRoZSByZWxhdGlvbiBhbmQgcmV0dXJuIHRoZW0gaW5zaWRlIGFuIGFycmF5LlxuICAgKiBAcmV0dXJucyB7QXJyYXk8U3RyaW5nPn0gQXJyYXkgY29udGFpbmluZyBhbGwgdGhlIGNoaWxkcmVuIGlkcyBvZiB0aGUgcmVsYXRpb25cbiAgICovXG4gIGdldENoaWxkcmVuSWRzKCkge1xuICAgIGNvbnN0IHJlcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICByZXMucHVzaCh0aGlzLmNoaWxkcmVuW2ldLmdldElkKCkuZ2V0KCkpO1xuICAgIH1cblxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGFsbCB0aGUgY2hpbGRyZW4gb2YgdGhlIHJlbGF0aW9uLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxTcGluYWxOb2RlPj59IFRoZSBjaGlsZHJlbiBvZiB0aGUgcmVsYXRpb25cbiAgICovXG4gIGdldENoaWxkcmVuKCkge1xuICAgIGxldCBjaGlsZHJlbiA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGlsZHJlbi5wdXNoKHRoaXMuY2hpbGRyZW5baV0pO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY2hpbGRyZW4pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhbGwgdGhlIGNoaWxkcmVuIG9mIHRoZSByZWxhdGlvbiBhc3NvY2lhdGVkIHRvIGEgY2VydGFpbiBjb250ZXh0LlxuICAgKiBAcGFyYW0ge1NwaW5hbENvbnRleHR9IGNvbnRleHQgVGhlIGNvbnRleHQgdG8gdXNlIGZvciB0aGUgc2VhcmNoXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PFNwaW5hbE5vZGU+Pn0gVGhlIGNoaWxkcmVuIG9mIHRoZSByZWxhdGlvbiBhc3NvY2lhdGVkIHRvIHRoZSBjb250ZXh0XG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIGNvbnRleHQgaXMgbm90IGEgU3BpbmFsQ29udGV4dFxuICAgKi9cbiAgZ2V0Q2hpbGRyZW5JbkNvbnRleHQoY29udGV4dCkge1xuICAgIGxldCBjaGlsZHJlbiA9IFtdO1xuXG4gICAgaWYgKCEoY29udGV4dCBpbnN0YW5jZW9mIFNwaW5hbENvbnRleHQpKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoVHlwZUVycm9yKFwiY29udGV4dCBtdXN0IGJlIGEgU3BpbmFsQ29udGV4dFwiKSk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuXG4gICAgICBpZiAoY2hpbGQuYmVsb25nc1RvQ29udGV4dChjb250ZXh0KSkge1xuICAgICAgICBjaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNoaWxkcmVuKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB0eXBlIG9mIHRoZSByZWxhdGlvbi5cbiAgICogQHJldHVybnMge051bWJlcn0gVHlwZSBvZiB0aGUgcmVsYXRpb25cbiAgICovXG4gIGdldFR5cGUoKSB7XG4gICAgcmV0dXJuIFNQSU5BTF9SRUxBVElPTl9UWVBFO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjaGlsZCB0byB0aGUgcmVsYXRpb24uXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZSB8IE1vZGVsfSBub2RlIE5vZGUgb3IgbW9kZWwgdG8gYWRkXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFNwaW5hbE5vZGU+fSBQcm9taXNlIGNvbnRhaW5pbmcgdGhlIG5vZGUgdGhhdCB3YXMgYWRkZWRcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgbm9kZSBpcyBub3QgYSBNb2RlbFxuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIG5vZGUgaXMgYWxyZWFkeSBhIGNoaWxkIG9mIHRoZSByZWxhdGlvblxuICAgKi9cbiAgYXN5bmMgYWRkQ2hpbGQobm9kZSkge1xuICAgIGlmICghKG5vZGUgaW5zdGFuY2VvZiBNb2RlbCkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgIFwiQ2Fubm90IGFkZCBhIGNoaWxkIHdpdGNoIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBTcGluYWxOb2RlIG9yIE1vZGVsLlwiXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoIShub2RlIGluc3RhbmNlb2YgU3BpbmFsTm9kZSkpIHtcbiAgICAgIG5vZGUgPSBuZXcgU3BpbmFsTm9kZSh1bmRlZmluZWQsIHVuZGVmaW5lZCwgbm9kZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZ2V0Q2hpbGRyZW5JZHMoKS5pbmNsdWRlcyhub2RlLmdldElkKCkuZ2V0KCkpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgYWRkIGEgY2hpbGQgdHdpY2UgdG8gdGhlIHNhbWUgcmVsYXRpb24uXCIpO1xuICAgIH1cblxuICAgIHRoaXMuY2hpbGRyZW4ucHVzaChub2RlKTtcbiAgICBub2RlLl9hZGRQYXJlbnQodGhpcyk7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNoaWxkIGZyb20gdGhlIHJlbGF0aW9uLlxuICAgKiBAcGFyYW0ge1NwaW5hbE5vZGV9IG5vZGUgQ2hpbGQgdG8gcmVtb3ZlXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPG5vdGhpbmc+fSBBbiBlbXB0eSBwcm9taXNlXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgZ2l2ZW4gbm9kZSBpcyBub3QgYSBjaGlsZFxuICAgKi9cbiAgcmVtb3ZlQ2hpbGQobm9kZSkge1xuICAgIGlmICghdGhpcy5jaGlsZHJlbi5jb250YWlucyhub2RlKSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yKFwiVGhlIG5vZGUgaXMgbm90IGEgY2hpbGRcIikpO1xuICAgIH1cblxuICAgIG5vZGUuX3JlbW92ZVBhcmVudCh0aGlzKTtcbiAgICB0aGlzLmNoaWxkcmVuLnJlbW92ZShub2RlKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cbn1cblxuc3BpbmFsQ29yZS5yZWdpc3Rlcl9tb2RlbHMoW1NwaW5hbFJlbGF0aW9uUmVmXSk7XG5leHBvcnQgZGVmYXVsdCBTcGluYWxSZWxhdGlvblJlZjtcbiJdfQ==