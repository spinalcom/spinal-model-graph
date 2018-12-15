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
   * @throws {TypeError} If the parent is not a node
   * @throws {TypeError} If the name is not a string
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9SZWxhdGlvbnMvU3BpbmFsUmVsYXRpb25SZWYuanMiXSwibmFtZXMiOlsiZ2xvYmFsVHlwZSIsIndpbmRvdyIsImdsb2JhbCIsIlNwaW5hbFJlbGF0aW9uUmVmIiwiQmFzZVNwaW5hbFJlbGF0aW9uIiwiY29uc3RydWN0b3IiLCJwYXJlbnQiLCJuYW1lIiwiYWRkX2F0dHIiLCJjaGlsZHJlbiIsIkxzdCIsImdldENoaWxkcmVuSWRzIiwicmVzIiwiaSIsImxlbmd0aCIsInB1c2giLCJnZXRJZCIsImdldCIsImdldENoaWxkcmVuIiwiUHJvbWlzZSIsInJlc29sdmUiLCJnZXRDaGlsZHJlbkluQ29udGV4dCIsImNvbnRleHQiLCJTcGluYWxDb250ZXh0IiwicmVqZWN0IiwiVHlwZUVycm9yIiwiY2hpbGQiLCJiZWxvbmdzVG9Db250ZXh0IiwiZ2V0VHlwZSIsIlNQSU5BTF9SRUxBVElPTl9UWVBFIiwiYWRkQ2hpbGQiLCJub2RlIiwiTW9kZWwiLCJTcGluYWxOb2RlIiwidW5kZWZpbmVkIiwiaW5jbHVkZXMiLCJFcnJvciIsIl9hZGRQYXJlbnQiLCJyZW1vdmVDaGlsZCIsImNvbnRhaW5zIiwiX3JlbW92ZVBhcmVudCIsInJlbW92ZSIsInNwaW5hbENvcmUiLCJyZWdpc3Rlcl9tb2RlbHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUF3QkE7O0FBQ0E7O0FBR0E7O0FBSUE7Ozs7Ozs7O0FBRUEsTUFBTUEsVUFBVSxHQUFHLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NDLE1BQWhDLEdBQXlDRCxNQUE1RDs7QUFFQSxNQUFNRSxpQkFBTixTQUFnQ0MsMkJBQWhDLENBQW1EO0FBQ2pEOzs7Ozs7O0FBT0FDLEVBQUFBLFdBQVcsQ0FBQ0MsTUFBRCxFQUFTQyxJQUFULEVBQWU7QUFDeEIsVUFBTUQsTUFBTixFQUFjQyxJQUFkO0FBRUEsU0FBS0MsUUFBTCxDQUFjO0FBQ1pDLE1BQUFBLFFBQVEsRUFBRSxJQUFJVCxVQUFVLENBQUNVLEdBQWY7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eUJBQUQsQ0FBcEIsQ0FBUDtBQUNEOztBQUVETCxJQUFBQSxJQUFJLENBQUNTLGFBQUwsQ0FBbUIsSUFBbkI7O0FBQ0EsU0FBSy9CLFFBQUwsQ0FBY2dDLE1BQWQsQ0FBcUJWLElBQXJCO0FBQ0EsV0FBT1osT0FBTyxDQUFDQyxPQUFSLEVBQVA7QUFDRDs7QUFuSGdEOztBQXNIbkRzQiwrQkFBV0MsZUFBWCxDQUEyQixDQUFDeEMsaUJBQUQsQ0FBM0I7O2VBQ2VBLGlCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4IFNwaW5hbENvbSAtIHd3dy5zcGluYWxjb20uY29tXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgU3BpbmFsQ29yZS5cbiAqXG4gKiBQbGVhc2UgcmVhZCBhbGwgb2YgdGhlIGZvbGxvd2luZyB0ZXJtcyBhbmQgY29uZGl0aW9uc1xuICogb2YgdGhlIEZyZWUgU29mdHdhcmUgbGljZW5zZSBBZ3JlZW1lbnQgKFwiQWdyZWVtZW50XCIpXG4gKiBjYXJlZnVsbHkuXG4gKlxuICogVGhpcyBBZ3JlZW1lbnQgaXMgYSBsZWdhbGx5IGJpbmRpbmcgY29udHJhY3QgYmV0d2VlblxuICogdGhlIExpY2Vuc2VlIChhcyBkZWZpbmVkIGJlbG93KSBhbmQgU3BpbmFsQ29tIHRoYXRcbiAqIHNldHMgZm9ydGggdGhlIHRlcm1zIGFuZCBjb25kaXRpb25zIHRoYXQgZ292ZXJuIHlvdXJcbiAqIHVzZSBvZiB0aGUgUHJvZ3JhbS4gQnkgaW5zdGFsbGluZyBhbmQvb3IgdXNpbmcgdGhlXG4gKiBQcm9ncmFtLCB5b3UgYWdyZWUgdG8gYWJpZGUgYnkgYWxsIHRoZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMgc3RhdGVkIG9yIHJlZmVyZW5jZWQgaGVyZWluLlxuICpcbiAqIElmIHlvdSBkbyBub3QgYWdyZWUgdG8gYWJpZGUgYnkgdGhlc2UgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zLCBkbyBub3QgZGVtb25zdHJhdGUgeW91ciBhY2NlcHRhbmNlIGFuZCBkb1xuICogbm90IGluc3RhbGwgb3IgdXNlIHRoZSBQcm9ncmFtLlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbG9uZ1xuICogd2l0aCB0aGlzIGZpbGUuIElmIG5vdCwgc2VlXG4gKiA8aHR0cDovL3Jlc291cmNlcy5zcGluYWxjb20uY29tL2xpY2Vuc2VzLnBkZj4uXG4gKi9cblxuaW1wb3J0IEJhc2VTcGluYWxSZWxhdGlvbiBmcm9tIFwiLi9CYXNlU3BpbmFsUmVsYXRpb25cIjtcbmltcG9ydCB7XG4gIFNQSU5BTF9SRUxBVElPTl9UWVBFXG59IGZyb20gXCIuL1NwaW5hbFJlbGF0aW9uRmFjdG9yeVwiO1xuaW1wb3J0IHtcbiAgU3BpbmFsTm9kZSxcbiAgU3BpbmFsQ29udGV4dFxufSBmcm9tIFwiLi4vaW5kZXhcIjtcbmltcG9ydCBzcGluYWxDb3JlIGZyb20gXCJzcGluYWwtY29yZS1jb25uZWN0b3Jqc1wiO1xuXG5jb25zdCBnbG9iYWxUeXBlID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHdpbmRvdztcblxuY2xhc3MgU3BpbmFsUmVsYXRpb25SZWYgZXh0ZW5kcyBCYXNlU3BpbmFsUmVsYXRpb24ge1xuICAvKipcbiAgICogQ29uc3RydWN0b3IgZm9yIHRoZSBTcGluYWxSZWxhdGlvblJlZiBjbGFzcy5cbiAgICogQHBhcmFtIHtTcGluYWxOb2RlfSBwYXJlbnQgUGFyZW50IG9mIHRoZSByZWxhdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBOYW1lIG9mIHRoZSByZWxhdGlvblxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBwYXJlbnQgaXMgbm90IGEgbm9kZVxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBuYW1lIGlzIG5vdCBhIHN0cmluZ1xuICAgKi9cbiAgY29uc3RydWN0b3IocGFyZW50LCBuYW1lKSB7XG4gICAgc3VwZXIocGFyZW50LCBuYW1lKTtcblxuICAgIHRoaXMuYWRkX2F0dHIoe1xuICAgICAgY2hpbGRyZW46IG5ldyBnbG9iYWxUeXBlLkxzdCgpXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIGFsbCB0aGUgaWRzIG9mIHRoZSBjaGlsZHJlbiBvZiB0aGUgcmVsYXRpb24gYW5kIHJldHVybiB0aGVtIGluc2lkZSBhbiBhcnJheS5cbiAgICogQHJldHVybnMge0FycmF5PFN0cmluZz59IEFycmF5IGNvbnRhaW5pbmcgYWxsIHRoZSBjaGlsZHJlbiBpZHMgb2YgdGhlIHJlbGF0aW9uXG4gICAqL1xuICBnZXRDaGlsZHJlbklkcygpIHtcbiAgICBjb25zdCByZXMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgcmVzLnB1c2godGhpcy5jaGlsZHJlbltpXS5nZXRJZCgpLmdldCgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhbGwgdGhlIGNoaWxkcmVuIG9mIHRoZSByZWxhdGlvbi5cbiAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8U3BpbmFsTm9kZT4+fSBUaGUgY2hpbGRyZW4gb2YgdGhlIHJlbGF0aW9uXG4gICAqL1xuICBnZXRDaGlsZHJlbigpIHtcbiAgICBsZXQgY2hpbGRyZW4gPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGRyZW4ucHVzaCh0aGlzLmNoaWxkcmVuW2ldKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNoaWxkcmVuKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYWxsIHRoZSBjaGlsZHJlbiBvZiB0aGUgcmVsYXRpb24gYXNzb2NpYXRlZCB0byBhIGNlcnRhaW4gY29udGV4dC5cbiAgICogQHBhcmFtIHtTcGluYWxDb250ZXh0fSBjb250ZXh0IFRoZSBjb250ZXh0IHRvIHVzZSBmb3IgdGhlIHNlYXJjaFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxTcGluYWxOb2RlPj59IFRoZSBjaGlsZHJlbiBvZiB0aGUgcmVsYXRpb24gYXNzb2NpYXRlZCB0byB0aGUgY29udGV4dFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBjb250ZXh0IGlzIG5vdCBhIFNwaW5hbENvbnRleHRcbiAgICovXG4gIGdldENoaWxkcmVuSW5Db250ZXh0KGNvbnRleHQpIHtcbiAgICBsZXQgY2hpbGRyZW4gPSBbXTtcblxuICAgIGlmICghKGNvbnRleHQgaW5zdGFuY2VvZiBTcGluYWxDb250ZXh0KSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFR5cGVFcnJvcihcImNvbnRleHQgbXVzdCBiZSBhIFNwaW5hbENvbnRleHRcIikpO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcblxuICAgICAgaWYgKGNoaWxkLmJlbG9uZ3NUb0NvbnRleHQoY29udGV4dCkpIHtcbiAgICAgICAgY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjaGlsZHJlbik7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdHlwZSBvZiB0aGUgcmVsYXRpb24uXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IFR5cGUgb2YgdGhlIHJlbGF0aW9uXG4gICAqL1xuICBnZXRUeXBlKCkge1xuICAgIHJldHVybiBTUElOQUxfUkVMQVRJT05fVFlQRTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgY2hpbGQgdG8gdGhlIHJlbGF0aW9uLlxuICAgKiBAcGFyYW0ge1NwaW5hbE5vZGUgfCBNb2RlbH0gbm9kZSBOb2RlIG9yIG1vZGVsIHRvIGFkZFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxTcGluYWxOb2RlPn0gUHJvbWlzZSBjb250YWluaW5nIHRoZSBub2RlIHRoYXQgd2FzIGFkZGVkXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIG5vZGUgaXMgbm90IGEgTW9kZWxcbiAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBub2RlIGlzIGFscmVhZHkgYSBjaGlsZCBvZiB0aGUgcmVsYXRpb25cbiAgICovXG4gIGFzeW5jIGFkZENoaWxkKG5vZGUpIHtcbiAgICBpZiAoIShub2RlIGluc3RhbmNlb2YgZ2xvYmFsVHlwZS5Nb2RlbCkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgIFwiQ2Fubm90IGFkZCBhIGNoaWxkIHdpdGNoIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBTcGluYWxOb2RlIG9yIE1vZGVsLlwiXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoIShub2RlIGluc3RhbmNlb2YgU3BpbmFsTm9kZSkpIHtcbiAgICAgIG5vZGUgPSBuZXcgU3BpbmFsTm9kZSh1bmRlZmluZWQsIHVuZGVmaW5lZCwgbm9kZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZ2V0Q2hpbGRyZW5JZHMoKS5pbmNsdWRlcyhub2RlLmdldElkKCkuZ2V0KCkpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgYWRkIGEgY2hpbGQgdHdpY2UgdG8gdGhlIHNhbWUgcmVsYXRpb24uXCIpO1xuICAgIH1cblxuICAgIHRoaXMuY2hpbGRyZW4ucHVzaChub2RlKTtcbiAgICBub2RlLl9hZGRQYXJlbnQodGhpcyk7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNoaWxkIGZyb20gdGhlIHJlbGF0aW9uLlxuICAgKiBAcGFyYW0ge1NwaW5hbE5vZGV9IG5vZGUgQ2hpbGQgdG8gcmVtb3ZlXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPG5vdGhpbmc+fSBBbiBlbXB0eSBwcm9taXNlXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgZ2l2ZW4gbm9kZSBpcyBub3QgYSBjaGlsZFxuICAgKi9cbiAgcmVtb3ZlQ2hpbGQobm9kZSkge1xuICAgIGlmICghdGhpcy5jaGlsZHJlbi5jb250YWlucyhub2RlKSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVycm9yKFwiVGhlIG5vZGUgaXMgbm90IGEgY2hpbGRcIikpO1xuICAgIH1cblxuICAgIG5vZGUuX3JlbW92ZVBhcmVudCh0aGlzKTtcbiAgICB0aGlzLmNoaWxkcmVuLnJlbW92ZShub2RlKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cbn1cblxuc3BpbmFsQ29yZS5yZWdpc3Rlcl9tb2RlbHMoW1NwaW5hbFJlbGF0aW9uUmVmXSk7XG5leHBvcnQgZGVmYXVsdCBTcGluYWxSZWxhdGlvblJlZjtcbiJdfQ==