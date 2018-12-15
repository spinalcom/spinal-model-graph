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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9SZWxhdGlvbnMvU3BpbmFsUmVsYXRpb25SZWYuanMiXSwibmFtZXMiOlsiZ2xvYmFsVHlwZSIsIndpbmRvdyIsImdsb2JhbCIsIlNwaW5hbFJlbGF0aW9uUmVmIiwiQmFzZVNwaW5hbFJlbGF0aW9uIiwiY29uc3RydWN0b3IiLCJwYXJlbnQiLCJuYW1lIiwiYWRkX2F0dHIiLCJjaGlsZHJlbiIsIkxzdCIsImdldENoaWxkcmVuSWRzIiwicmVzIiwiaSIsImxlbmd0aCIsInB1c2giLCJnZXRJZCIsImdldCIsImdldENoaWxkcmVuIiwiUHJvbWlzZSIsInJlc29sdmUiLCJnZXRDaGlsZHJlbkluQ29udGV4dCIsImNvbnRleHQiLCJTcGluYWxDb250ZXh0IiwicmVqZWN0IiwiVHlwZUVycm9yIiwiY2hpbGQiLCJiZWxvbmdzVG9Db250ZXh0IiwiZ2V0VHlwZSIsIlNQSU5BTF9SRUxBVElPTl9UWVBFIiwiYWRkQ2hpbGQiLCJub2RlIiwiTW9kZWwiLCJTcGluYWxOb2RlIiwidW5kZWZpbmVkIiwiaW5jbHVkZXMiLCJFcnJvciIsIl9hZGRQYXJlbnQiLCJyZW1vdmVDaGlsZCIsImNvbnRhaW5zIiwiX3JlbW92ZVBhcmVudCIsInJlbW92ZSIsInNwaW5hbENvcmUiLCJyZWdpc3Rlcl9tb2RlbHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUF3QkE7O0FBQ0E7O0FBR0E7O0FBSUE7Ozs7Ozs7O0FBRUEsTUFBTUEsVUFBVSxHQUFHLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NDLE1BQWhDLEdBQXlDRCxNQUE1RDs7QUFFQSxNQUFNRSxpQkFBTixTQUFnQ0MsMkJBQWhDLENBQW1EO0FBQ2pEOzs7Ozs7QUFNQUMsRUFBQUEsV0FBVyxDQUFDQyxNQUFELEVBQVNDLElBQVQsRUFBZTtBQUN4QixVQUFNRCxNQUFOLEVBQWNDLElBQWQ7QUFFQSxTQUFLQyxRQUFMLENBQWM7QUFDWkMsTUFBQUEsUUFBUSxFQUFFLElBQUlULFVBQVUsQ0FBQ1UsR0FBZjtB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QkFBRCxDQUFwQixDQUFQO0FBQ0Q7O0FBRURMLElBQUFBLElBQUksQ0FBQ1MsYUFBTCxDQUFtQixJQUFuQjs7QUFDQSxTQUFLL0IsUUFBTCxDQUFjZ0MsTUFBZCxDQUFxQlYsSUFBckI7QUFDQSxXQUFPWixPQUFPLENBQUNDLE9BQVIsRUFBUDtBQUNEOztBQWxIZ0Q7O0FBcUhuRHNCLCtCQUFXQyxlQUFYLENBQTJCLENBQUN4QyxpQkFBRCxDQUEzQjs7ZUFDZUEsaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTggU3BpbmFsQ29tIC0gd3d3LnNwaW5hbGNvbS5jb21cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBTcGluYWxDb3JlLlxuICpcbiAqIFBsZWFzZSByZWFkIGFsbCBvZiB0aGUgZm9sbG93aW5nIHRlcm1zIGFuZCBjb25kaXRpb25zXG4gKiBvZiB0aGUgRnJlZSBTb2Z0d2FyZSBsaWNlbnNlIEFncmVlbWVudCAoXCJBZ3JlZW1lbnRcIilcbiAqIGNhcmVmdWxseS5cbiAqXG4gKiBUaGlzIEFncmVlbWVudCBpcyBhIGxlZ2FsbHkgYmluZGluZyBjb250cmFjdCBiZXR3ZWVuXG4gKiB0aGUgTGljZW5zZWUgKGFzIGRlZmluZWQgYmVsb3cpIGFuZCBTcGluYWxDb20gdGhhdFxuICogc2V0cyBmb3J0aCB0aGUgdGVybXMgYW5kIGNvbmRpdGlvbnMgdGhhdCBnb3Zlcm4geW91clxuICogdXNlIG9mIHRoZSBQcm9ncmFtLiBCeSBpbnN0YWxsaW5nIGFuZC9vciB1c2luZyB0aGVcbiAqIFByb2dyYW0sIHlvdSBhZ3JlZSB0byBhYmlkZSBieSBhbGwgdGhlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucyBzdGF0ZWQgb3IgcmVmZXJlbmNlZCBoZXJlaW4uXG4gKlxuICogSWYgeW91IGRvIG5vdCBhZ3JlZSB0byBhYmlkZSBieSB0aGVzZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMsIGRvIG5vdCBkZW1vbnN0cmF0ZSB5b3VyIGFjY2VwdGFuY2UgYW5kIGRvXG4gKiBub3QgaW5zdGFsbCBvciB1c2UgdGhlIFByb2dyYW0uXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFsb25nXG4gKiB3aXRoIHRoaXMgZmlsZS4gSWYgbm90LCBzZWVcbiAqIDxodHRwOi8vcmVzb3VyY2VzLnNwaW5hbGNvbS5jb20vbGljZW5zZXMucGRmPi5cbiAqL1xuXG5pbXBvcnQgQmFzZVNwaW5hbFJlbGF0aW9uIGZyb20gXCIuL0Jhc2VTcGluYWxSZWxhdGlvblwiO1xuaW1wb3J0IHtcbiAgU1BJTkFMX1JFTEFUSU9OX1RZUEVcbn0gZnJvbSBcIi4vU3BpbmFsUmVsYXRpb25GYWN0b3J5XCI7XG5pbXBvcnQge1xuICBTcGluYWxOb2RlLFxuICBTcGluYWxDb250ZXh0XG59IGZyb20gXCIuLi9pbmRleFwiO1xuaW1wb3J0IHNwaW5hbENvcmUgZnJvbSBcInNwaW5hbC1jb3JlLWNvbm5lY3RvcmpzXCI7XG5cbmNvbnN0IGdsb2JhbFR5cGUgPSB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogd2luZG93O1xuXG5jbGFzcyBTcGluYWxSZWxhdGlvblJlZiBleHRlbmRzIEJhc2VTcGluYWxSZWxhdGlvbiB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIFNwaW5hbFJlbGF0aW9uUmVmIGNsYXNzLlxuICAgKiBAcGFyYW0ge1NwaW5hbE5vZGV9IHBhcmVudCBQYXJlbnQgb2YgdGhlIHJlbGF0aW9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIE5hbWUgb2YgdGhlIHJlbGF0aW9uXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcGFyZW50IGlzIG5vdCBhIG5vZGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHBhcmVudCwgbmFtZSkge1xuICAgIHN1cGVyKHBhcmVudCwgbmFtZSk7XG5cbiAgICB0aGlzLmFkZF9hdHRyKHtcbiAgICAgIGNoaWxkcmVuOiBuZXcgZ2xvYmFsVHlwZS5Mc3QoKVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyBhbGwgdGhlIGlkcyBvZiB0aGUgY2hpbGRyZW4gb2YgdGhlIHJlbGF0aW9uIGFuZCByZXR1cm4gdGhlbSBpbnNpZGUgYW4gYXJyYXkuXG4gICAqIEByZXR1cm5zIHtBcnJheTxTdHJpbmc+fSBBcnJheSBjb250YWluaW5nIGFsbCB0aGUgY2hpbGRyZW4gaWRzIG9mIHRoZSByZWxhdGlvblxuICAgKi9cbiAgZ2V0Q2hpbGRyZW5JZHMoKSB7XG4gICAgY29uc3QgcmVzID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlcy5wdXNoKHRoaXMuY2hpbGRyZW5baV0uZ2V0SWQoKS5nZXQoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYWxsIHRoZSBjaGlsZHJlbiBvZiB0aGUgcmVsYXRpb24uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PFNwaW5hbE5vZGU+Pn0gVGhlIGNoaWxkcmVuIG9mIHRoZSByZWxhdGlvblxuICAgKi9cbiAgZ2V0Q2hpbGRyZW4oKSB7XG4gICAgbGV0IGNoaWxkcmVuID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoaWxkcmVuLnB1c2godGhpcy5jaGlsZHJlbltpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjaGlsZHJlbik7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGFsbCB0aGUgY2hpbGRyZW4gb2YgdGhlIHJlbGF0aW9uIGFzc29jaWF0ZWQgdG8gYSBjZXJ0YWluIGNvbnRleHQuXG4gICAqIEBwYXJhbSB7U3BpbmFsQ29udGV4dH0gY29udGV4dCBUaGUgY29udGV4dCB0byB1c2UgZm9yIHRoZSBzZWFyY2hcbiAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8U3BpbmFsTm9kZT4+fSBUaGUgY2hpbGRyZW4gb2YgdGhlIHJlbGF0aW9uIGFzc29jaWF0ZWQgdG8gdGhlIGNvbnRleHRcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgY29udGV4dCBpcyBub3QgYSBTcGluYWxDb250ZXh0XG4gICAqL1xuICBnZXRDaGlsZHJlbkluQ29udGV4dChjb250ZXh0KSB7XG4gICAgbGV0IGNoaWxkcmVuID0gW107XG5cbiAgICBpZiAoIShjb250ZXh0IGluc3RhbmNlb2YgU3BpbmFsQ29udGV4dCkpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChUeXBlRXJyb3IoXCJjb250ZXh0IG11c3QgYmUgYSBTcGluYWxDb250ZXh0XCIpKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XG5cbiAgICAgIGlmIChjaGlsZC5iZWxvbmdzVG9Db250ZXh0KGNvbnRleHQpKSB7XG4gICAgICAgIGNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY2hpbGRyZW4pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHR5cGUgb2YgdGhlIHJlbGF0aW9uLlxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBUeXBlIG9mIHRoZSByZWxhdGlvblxuICAgKi9cbiAgZ2V0VHlwZSgpIHtcbiAgICByZXR1cm4gU1BJTkFMX1JFTEFUSU9OX1RZUEU7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGNoaWxkIHRvIHRoZSByZWxhdGlvbi5cbiAgICogQHBhcmFtIHtTcGluYWxOb2RlIHwgTW9kZWx9IG5vZGUgTm9kZSBvciBtb2RlbCB0byBhZGRcbiAgICogQHJldHVybnMge1Byb21pc2U8U3BpbmFsTm9kZT59IFByb21pc2UgY29udGFpbmluZyB0aGUgbm9kZSB0aGF0IHdhcyBhZGRlZFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBub2RlIGlzIG5vdCBhIE1vZGVsXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgbm9kZSBpcyBhbHJlYWR5IGEgY2hpbGQgb2YgdGhlIHJlbGF0aW9uXG4gICAqL1xuICBhc3luYyBhZGRDaGlsZChub2RlKSB7XG4gICAgaWYgKCEobm9kZSBpbnN0YW5jZW9mIGdsb2JhbFR5cGUuTW9kZWwpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICBcIkNhbm5vdCBhZGQgYSBjaGlsZCB3aXRjaCBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgU3BpbmFsTm9kZSBvciBNb2RlbC5cIlxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKCEobm9kZSBpbnN0YW5jZW9mIFNwaW5hbE5vZGUpKSB7XG4gICAgICBub2RlID0gbmV3IFNwaW5hbE5vZGUodW5kZWZpbmVkLCB1bmRlZmluZWQsIG5vZGUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmdldENoaWxkcmVuSWRzKCkuaW5jbHVkZXMobm9kZS5nZXRJZCgpLmdldCgpKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGFkZCBhIGNoaWxkIHR3aWNlIHRvIHRoZSBzYW1lIHJlbGF0aW9uLlwiKTtcbiAgICB9XG5cbiAgICB0aGlzLmNoaWxkcmVuLnB1c2gobm9kZSk7XG4gICAgbm9kZS5fYWRkUGFyZW50KHRoaXMpO1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBjaGlsZCBmcm9tIHRoZSByZWxhdGlvbi5cbiAgICogQHBhcmFtIHtTcGluYWxOb2RlfSBub2RlIENoaWxkIHRvIHJlbW92ZVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxub3RoaW5nPn0gQW4gZW1wdHkgcHJvbWlzZVxuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIGdpdmVuIG5vZGUgaXMgbm90IGEgY2hpbGRcbiAgICovXG4gIHJlbW92ZUNoaWxkKG5vZGUpIHtcbiAgICBpZiAoIXRoaXMuY2hpbGRyZW4uY29udGFpbnMobm9kZSkpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvcihcIlRoZSBub2RlIGlzIG5vdCBhIGNoaWxkXCIpKTtcbiAgICB9XG5cbiAgICBub2RlLl9yZW1vdmVQYXJlbnQodGhpcyk7XG4gICAgdGhpcy5jaGlsZHJlbi5yZW1vdmUobm9kZSk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG59XG5cbnNwaW5hbENvcmUucmVnaXN0ZXJfbW9kZWxzKFtTcGluYWxSZWxhdGlvblJlZl0pO1xuZXhwb3J0IGRlZmF1bHQgU3BpbmFsUmVsYXRpb25SZWY7XG4iXX0=