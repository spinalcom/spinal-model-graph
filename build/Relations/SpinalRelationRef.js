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
   * @return {Array<String>} Array containing all the children ids of the relation
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
   * @return {Promise<Array<SpinalNode>>} The children of the relation
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
   * @return {Promise<Array<SpinalNode>>} The children of the relation associated to the context
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
   * @return {Number} Type of the relation
   */


  getType() {
    return _SpinalRelationFactory.SPINAL_RELATION_TYPE;
  }
  /**
   * Adds a child to the relation.
   * @param {SpinalNode | Model} node Node or model to add
   * @return {Promise<SpinalNode>} Promise containing the node that was added
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
   * @return {Promise<nothing>} An empty promise
   */


  removeChild(node) {
    if (this.children.contains(node)) {
      node._removeParent(this);
    }

    this.children.remove(node);
    return Promise.resolve();
  }

}

_spinalCoreConnectorjs.default.register_models([SpinalRelationRef]);

var _default = SpinalRelationRef;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9SZWxhdGlvbnMvU3BpbmFsUmVsYXRpb25SZWYuanMiXSwibmFtZXMiOlsiZ2xvYmFsVHlwZSIsIndpbmRvdyIsImdsb2JhbCIsIlNwaW5hbFJlbGF0aW9uUmVmIiwiQmFzZVNwaW5hbFJlbGF0aW9uIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiYWRkX2F0dHIiLCJjaGlsZHJlbiIsIkxzdCIsImdldENoaWxkcmVuSWRzIiwicmVzIiwiaSIsImxlbmd0aCIsInB1c2giLCJnZXRJZCIsImdldCIsImdldENoaWxkcmVuIiwiUHJvbWlzZSIsInJlc29sdmUiLCJnZXRDaGlsZHJlbkluQ29udGV4dCIsImNvbnRleHQiLCJjaGlsZCIsImJlbG9uZ3NUb0NvbnRleHQiLCJnZXRUeXBlIiwiU1BJTkFMX1JFTEFUSU9OX1RZUEUiLCJhZGRDaGlsZCIsIm5vZGUiLCJNb2RlbCIsIkVycm9yIiwiU3BpbmFsTm9kZSIsInVuZGVmaW5lZCIsImluY2x1ZGVzIiwiX2FkZFBhcmVudCIsInJlbW92ZUNoaWxkIiwiY29udGFpbnMiLCJfcmVtb3ZlUGFyZW50IiwicmVtb3ZlIiwic3BpbmFsQ29yZSIsInJlZ2lzdGVyX21vZGVscyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQXVCQTs7QUFDQTs7QUFHQTs7QUFDQTs7Ozs7Ozs7QUFFQSxNQUFNQSxVQUFVLEdBQUcsT0FBT0MsTUFBUCxLQUFrQixXQUFsQixHQUFnQ0MsTUFBaEMsR0FBeUNELE1BQTVEOztBQUVBLE1BQU1FLGlCQUFOLFNBQWdDQywyQkFBaEMsQ0FBbUQ7QUFDakQ7Ozs7QUFJQUMsRUFBQUEsV0FBVyxDQUFDQyxJQUFELEVBQU87QUFDaEIsVUFBTUEsSUFBTjtBQUNBLFNBQUtDLFFBQUwsQ0FBYztBQUNaQyxNQUFBQSxRQUFRLEVBQUUsSUFBSVIsVUFBVSxDQUFDUyxHQUFmO0FBREUsS0FBZDtBQUdEO0FBRUQ7Ozs7OztBQUlBQyxFQUFBQSxjQUFjLEdBQUc7QUFDZixVQUFNQyxHQUFHLEdBQUcsRUFB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b20gLSB3d3cuc3BpbmFsY29tLmNvbVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFNwaW5hbENvcmUuXG4gKlxuICogUGxlYXNlIHJlYWQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgdGVybXMgYW5kIGNvbmRpdGlvbnNcbiAqIG9mIHRoZSBGcmVlIFNvZnR3YXJlIGxpY2Vuc2UgQWdyZWVtZW50IChcIkFncmVlbWVudFwiKVxuICogY2FyZWZ1bGx5LlxuICpcbiAqIFRoaXMgQWdyZWVtZW50IGlzIGEgbGVnYWxseSBiaW5kaW5nIGNvbnRyYWN0IGJldHdlZW5cbiAqIHRoZSBMaWNlbnNlZSAoYXMgZGVmaW5lZCBiZWxvdykgYW5kIFNwaW5hbENvbSB0aGF0XG4gKiBzZXRzIGZvcnRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyB0aGF0IGdvdmVybiB5b3VyXG4gKiB1c2Ugb2YgdGhlIFByb2dyYW0uIEJ5IGluc3RhbGxpbmcgYW5kL29yIHVzaW5nIHRoZVxuICogUHJvZ3JhbSwgeW91IGFncmVlIHRvIGFiaWRlIGJ5IGFsbCB0aGUgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zIHN0YXRlZCBvciByZWZlcmVuY2VkIGhlcmVpbi5cbiAqXG4gKiBJZiB5b3UgZG8gbm90IGFncmVlIHRvIGFiaWRlIGJ5IHRoZXNlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucywgZG8gbm90IGRlbW9uc3RyYXRlIHlvdXIgYWNjZXB0YW5jZSBhbmQgZG9cbiAqIG5vdCBpbnN0YWxsIG9yIHVzZSB0aGUgUHJvZ3JhbS5cbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYWxvbmdcbiAqIHdpdGggdGhpcyBmaWxlLiBJZiBub3QsIHNlZVxuICogPGh0dHA6Ly9yZXNvdXJjZXMuc3BpbmFsY29tLmNvbS9saWNlbnNlcy5wZGY+LlxuICovXG5pbXBvcnQgQmFzZVNwaW5hbFJlbGF0aW9uIGZyb20gXCIuL0Jhc2VTcGluYWxSZWxhdGlvblwiO1xuaW1wb3J0IHtcbiAgU1BJTkFMX1JFTEFUSU9OX1RZUEVcbn0gZnJvbSBcIi4vU3BpbmFsUmVsYXRpb25GYWN0b3J5XCI7XG5pbXBvcnQgU3BpbmFsTm9kZSBmcm9tIFwiLi4vTm9kZXMvU3BpbmFsTm9kZVwiO1xuaW1wb3J0IHNwaW5hbENvcmUgZnJvbSBcInNwaW5hbC1jb3JlLWNvbm5lY3RvcmpzXCI7XG5cbmNvbnN0IGdsb2JhbFR5cGUgPSB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogd2luZG93O1xuXG5jbGFzcyBTcGluYWxSZWxhdGlvblJlZiBleHRlbmRzIEJhc2VTcGluYWxSZWxhdGlvbiB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIFNwaW5hbFJlbGF0aW9uUmVmIGNsYXNzLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBOYW1lIG9mIHRoZSByZWxhdGlvblxuICAgKi9cbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHN1cGVyKG5hbWUpO1xuICAgIHRoaXMuYWRkX2F0dHIoe1xuICAgICAgY2hpbGRyZW46IG5ldyBnbG9iYWxUeXBlLkxzdCgpXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIGFsbCB0aGUgaWRzIG9mIHRoZSBjaGlsZHJlbiBvZiB0aGUgcmVsYXRpb24gYW5kIHJldHVybiB0aGVtIGluc2lkZSBhbiBhcnJheS5cbiAgICogQHJldHVybiB7QXJyYXk8U3RyaW5nPn0gQXJyYXkgY29udGFpbmluZyBhbGwgdGhlIGNoaWxkcmVuIGlkcyBvZiB0aGUgcmVsYXRpb25cbiAgICovXG4gIGdldENoaWxkcmVuSWRzKCkge1xuICAgIGNvbnN0IHJlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgcmVzLnB1c2godGhpcy5jaGlsZHJlbltpXS5nZXRJZCgpLmdldCgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYWxsIHRoZSBjaGlsZHJlbiBvZiB0aGUgcmVsYXRpb24uXG4gICAqIEByZXR1cm4ge1Byb21pc2U8QXJyYXk8U3BpbmFsTm9kZT4+fSBUaGUgY2hpbGRyZW4gb2YgdGhlIHJlbGF0aW9uXG4gICAqL1xuICBnZXRDaGlsZHJlbigpIHtcbiAgICBsZXQgY2hpbGRyZW4gPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGRyZW4ucHVzaCh0aGlzLmNoaWxkcmVuW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjaGlsZHJlbik7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGFsbCB0aGUgY2hpbGRyZW4gb2YgdGhlIHJlbGF0aW9uIGFzc29jaWF0ZWQgdG8gYSBjZXJ0YWluIGNvbnRleHQuXG4gICAqIEBwYXJhbSB7U3BpbmFsQ29udGV4dH0gY29udGV4dCBUaGUgY29udGV4dCB0byB1c2UgZm9yIHRoZSBzZWFyY2hcbiAgICogQHJldHVybiB7UHJvbWlzZTxBcnJheTxTcGluYWxOb2RlPj59IFRoZSBjaGlsZHJlbiBvZiB0aGUgcmVsYXRpb24gYXNzb2NpYXRlZCB0byB0aGUgY29udGV4dFxuICAgKi9cbiAgZ2V0Q2hpbGRyZW5JbkNvbnRleHQoY29udGV4dCkge1xuICAgIGxldCBjaGlsZHJlbiA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuXG4gICAgICBpZiAoY2hpbGQuYmVsb25nc1RvQ29udGV4dChjb250ZXh0KSkge1xuICAgICAgICBjaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjaGlsZHJlbik7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdHlwZSBvZiB0aGUgcmVsYXRpb24uXG4gICAqIEByZXR1cm4ge051bWJlcn0gVHlwZSBvZiB0aGUgcmVsYXRpb25cbiAgICovXG4gIGdldFR5cGUoKSB7XG4gICAgcmV0dXJuIFNQSU5BTF9SRUxBVElPTl9UWVBFO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjaGlsZCB0byB0aGUgcmVsYXRpb24uXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZSB8IE1vZGVsfSBub2RlIE5vZGUgb3IgbW9kZWwgdG8gYWRkXG4gICAqIEByZXR1cm4ge1Byb21pc2U8U3BpbmFsTm9kZT59IFByb21pc2UgY29udGFpbmluZyB0aGUgbm9kZSB0aGF0IHdhcyBhZGRlZFxuICAgKi9cbiAgYXN5bmMgYWRkQ2hpbGQobm9kZSkge1xuICAgIGlmICghKG5vZGUgaW5zdGFuY2VvZiBnbG9iYWxUeXBlLk1vZGVsKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcIkNhbm5vdCBhZGQgYSBjaGlsZCB3aXRjaCBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgU3BpbmFsTm9kZSBvciBNb2RlbC5cIlxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKCEobm9kZSBpbnN0YW5jZW9mIFNwaW5hbE5vZGUpKSB7XG4gICAgICBub2RlID0gbmV3IFNwaW5hbE5vZGUodW5kZWZpbmVkLCB1bmRlZmluZWQsIG5vZGUpO1xuICAgIH1cbiAgICBpZiAodGhpcy5nZXRDaGlsZHJlbklkcygpLmluY2x1ZGVzKG5vZGUuZ2V0SWQoKS5nZXQoKSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBhZGQgYSBjaGlsZCB0d2ljZSB0byB0aGUgc2FtZSByZWxhdGlvbi5cIik7XG4gICAgfVxuXG4gICAgdGhpcy5jaGlsZHJlbi5wdXNoKG5vZGUpO1xuICAgIG5vZGUuX2FkZFBhcmVudCh0aGlzKTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgY2hpbGQgZnJvbSB0aGUgcmVsYXRpb24uXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZX0gbm9kZSBDaGlsZCB0byByZW1vdmVcbiAgICogQHJldHVybiB7UHJvbWlzZTxub3RoaW5nPn0gQW4gZW1wdHkgcHJvbWlzZVxuICAgKi9cbiAgcmVtb3ZlQ2hpbGQobm9kZSkge1xuICAgIGlmICh0aGlzLmNoaWxkcmVuLmNvbnRhaW5zKG5vZGUpKSB7XG4gICAgICBub2RlLl9yZW1vdmVQYXJlbnQodGhpcyk7XG4gICAgfVxuXG4gICAgdGhpcy5jaGlsZHJlbi5yZW1vdmUobm9kZSk7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cbn1cblxuc3BpbmFsQ29yZS5yZWdpc3Rlcl9tb2RlbHMoW1NwaW5hbFJlbGF0aW9uUmVmXSk7XG5leHBvcnQgZGVmYXVsdCBTcGluYWxSZWxhdGlvblJlZjtcbiJdfQ==