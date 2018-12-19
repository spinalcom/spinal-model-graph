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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9SZWxhdGlvbnMvU3BpbmFsUmVsYXRpb25Mc3RQdHIuanMiXSwibmFtZXMiOlsiU3BpbmFsUmVsYXRpb25Mc3RQdHIiLCJCYXNlU3BpbmFsUmVsYXRpb24iLCJjb25zdHJ1Y3RvciIsInBhcmVudCIsIm5hbWUiLCJhZGRfYXR0ciIsImNoaWxkcmVuIiwiTHN0IiwiZ2V0Q2hpbGRyZW5JZHMiLCJyZXMiLCJpIiwibGVuZ3RoIiwicHVzaCIsImdldElkIiwiZ2V0IiwiZ2V0Q2hpbGRyZW4iLCJwcm9taXNlcyIsInB0ciIsImxvYWQiLCJQcm9taXNlIiwiYWxsIiwiZ2V0Q2hpbGRyZW5JbkNvbnRleHQiLCJjb250ZXh0IiwiU3BpbmFsQ29udGV4dCIsInJlamVjdCIsIlR5cGVFcnJvciIsImZpbHRlciIsImNoaWxkIiwiYmVsb25nc1RvQ29udGV4dCIsImdldFR5cGUiLCJTUElOQUxfUkVMQVRJT05fTFNUX1BUUl9UWVBFIiwiYWRkQ2hpbGQiLCJub2RlIiwiTW9kZWwiLCJFcnJvciIsIlNwaW5hbE5vZGUiLCJ1bmRlZmluZWQiLCJpbmNsdWRlcyIsIl9hZGRQYXJlbnQiLCJTcGluYWxOb2RlUG9pbnRlciIsInJlbW92ZUNoaWxkIiwiZm91bmQiLCJzcGxpY2UiLCJfcmVtb3ZlUGFyZW50IiwicmVzb2x2ZSIsInNwaW5hbENvcmUiLCJyZWdpc3Rlcl9tb2RlbHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUF1QkE7O0FBTUE7O0FBQ0E7O0FBR0E7O0FBSUE7Ozs7Ozs7O0FBRUEsTUFBTUEsb0JBQU4sU0FBbUNDLDJCQUFuQyxDQUFzRDtBQUNwRDs7Ozs7OztBQU9BQyxFQUFBQSxXQUFXLENBQUNDLE1BQUQsRUFBU0MsSUFBVCxFQUFlO0FBQ3hCLFVBQU1ELE1BQU4sRUFBY0MsSUFBZDtBQUVBLFNBQUtDLFFBQUwsQ0FBYztBQUNaQyxNQUFBQSxRQUFRLEVBQUUsSUFBSUMsK0JBQUo7QUFERSxLQUFkO0FBR0Q7QUFFRDs7Ozs7O0FBSUFDLEVBQUFB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UixJQUFELEVBQU87QUFDaEIsUUFBSVMsS0FBSyxHQUFHLEtBQVo7O0FBRUEsU0FBSyxJQUFJL0IsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLSixRQUFMLENBQWNLLE1BQWxDLEVBQTBDRCxDQUFDLEVBQTNDLEVBQStDO0FBQzdDLFVBQUksS0FBS0osUUFBTCxDQUFjSSxDQUFkLEVBQWlCRyxLQUFqQixPQUE2Qm1CLElBQUksQ0FBQ25CLEtBQUwsRUFBakMsRUFBK0M7QUFDN0MsYUFBS1AsUUFBTCxDQUFjb0MsTUFBZCxDQUFxQmhDLENBQXJCLEVBQXdCLENBQXhCO0FBQ0ErQixRQUFBQSxLQUFLLEdBQUcsSUFBUjtBQUNBO0FBQ0Q7QUFDRjs7QUFFRCxRQUFJLENBQUNBLEtBQUwsRUFBWTtBQUNWLGFBQU90QixPQUFPLENBQUNLLE1BQVIsQ0FBZVUsS0FBSyxDQUFDLHlCQUFELENBQXBCLENBQVA7QUFDRDs7QUFFREYsSUFBQUEsSUFBSSxDQUFDVyxhQUFMLENBQW1CLElBQW5COztBQUNBLFdBQU94QixPQUFPLENBQUN5QixPQUFSLEVBQVA7QUFDRDs7QUE1SG1EOztBQStIdERDLHVDQUFXQyxlQUFYLENBQTJCLENBQUM5QyxvQkFBRCxDQUEzQjs7ZUFDZUEsb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTggU3BpbmFsQ29tIC0gd3d3LnNwaW5hbGNvbS5jb21cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBTcGluYWxDb3JlLlxuICpcbiAqIFBsZWFzZSByZWFkIGFsbCBvZiB0aGUgZm9sbG93aW5nIHRlcm1zIGFuZCBjb25kaXRpb25zXG4gKiBvZiB0aGUgRnJlZSBTb2Z0d2FyZSBsaWNlbnNlIEFncmVlbWVudCAoXCJBZ3JlZW1lbnRcIilcbiAqIGNhcmVmdWxseS5cbiAqXG4gKiBUaGlzIEFncmVlbWVudCBpcyBhIGxlZ2FsbHkgYmluZGluZyBjb250cmFjdCBiZXR3ZWVuXG4gKiB0aGUgTGljZW5zZWUgKGFzIGRlZmluZWQgYmVsb3cpIGFuZCBTcGluYWxDb20gdGhhdFxuICogc2V0cyBmb3J0aCB0aGUgdGVybXMgYW5kIGNvbmRpdGlvbnMgdGhhdCBnb3Zlcm4geW91clxuICogdXNlIG9mIHRoZSBQcm9ncmFtLiBCeSBpbnN0YWxsaW5nIGFuZC9vciB1c2luZyB0aGVcbiAqIFByb2dyYW0sIHlvdSBhZ3JlZSB0byBhYmlkZSBieSBhbGwgdGhlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucyBzdGF0ZWQgb3IgcmVmZXJlbmNlZCBoZXJlaW4uXG4gKlxuICogSWYgeW91IGRvIG5vdCBhZ3JlZSB0byBhYmlkZSBieSB0aGVzZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMsIGRvIG5vdCBkZW1vbnN0cmF0ZSB5b3VyIGFjY2VwdGFuY2UgYW5kIGRvXG4gKiBub3QgaW5zdGFsbCBvciB1c2UgdGhlIFByb2dyYW0uXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFsb25nXG4gKiB3aXRoIHRoaXMgZmlsZS4gSWYgbm90LCBzZWVcbiAqIDxodHRwOi8vcmVzb3VyY2VzLnNwaW5hbGNvbS5jb20vbGljZW5zZXMucGRmPi5cbiAqL1xuaW1wb3J0IHtcbiAgc3BpbmFsQ29yZSxcbiAgTW9kZWwsXG4gIExzdFxufSBmcm9tIFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNfdHlwZVwiO1xuXG5pbXBvcnQgQmFzZVNwaW5hbFJlbGF0aW9uIGZyb20gXCIuL0Jhc2VTcGluYWxSZWxhdGlvblwiO1xuaW1wb3J0IHtcbiAgU1BJTkFMX1JFTEFUSU9OX0xTVF9QVFJfVFlQRVxufSBmcm9tIFwiLi9TcGluYWxSZWxhdGlvbkZhY3RvcnlcIjtcbmltcG9ydCB7XG4gIFNwaW5hbE5vZGUsXG4gIFNwaW5hbENvbnRleHRcbn0gZnJvbSBcIi4uL2luZGV4XCI7XG5pbXBvcnQgU3BpbmFsTm9kZVBvaW50ZXIgZnJvbSBcIi4uL1NwaW5hbE5vZGVQb2ludGVyXCI7XG5cbmNsYXNzIFNwaW5hbFJlbGF0aW9uTHN0UHRyIGV4dGVuZHMgQmFzZVNwaW5hbFJlbGF0aW9uIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yIGZvciB0aGUgU3BpbmFsUmVsYXRpb25Mc3RQdHIgY2xhc3MuXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZX0gcGFyZW50IFBhcmVudCBvZiB0aGUgcmVsYXRpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgTmFtZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgcGFyZW50IGlzIG5vdCBhIG5vZGVcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgbmFtZSBpcyBub3QgYSBzdHJpbmdcbiAgICovXG4gIGNvbnN0cnVjdG9yKHBhcmVudCwgbmFtZSkge1xuICAgIHN1cGVyKHBhcmVudCwgbmFtZSk7XG5cbiAgICB0aGlzLmFkZF9hdHRyKHtcbiAgICAgIGNoaWxkcmVuOiBuZXcgTHN0KClcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgYWxsIHRoZSBpZHMgb2YgdGhlIGNoaWxkcmVuIG9mIHRoZSByZWxhdGlvbiBhbmQgcmV0dXJuIHRoZW0gaW5zaWRlIGFuIGFycmF5LlxuICAgKiBAcmV0dXJucyB7QXJyYXk8U3RyaW5nPn0gQXJyYXkgY29udGFpbmluZyBhbGwgdGhlIGNoaWxkcmVuIGlkcyBvZiB0aGUgcmVsYXRpb25cbiAgICovXG4gIGdldENoaWxkcmVuSWRzKCkge1xuICAgIGNvbnN0IHJlcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICByZXMucHVzaCh0aGlzLmNoaWxkcmVuW2ldLmdldElkKCkuZ2V0KCkpO1xuICAgIH1cblxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGFsbCB0aGUgY2hpbGRyZW4gb2YgdGhlIHJlbGF0aW9uLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxTcGluYWxOb2RlPj59IFRoZSBjaGlsZHJlbiBvZiB0aGUgcmVsYXRpb25cbiAgICovXG4gIGdldENoaWxkcmVuKCkge1xuICAgIGNvbnN0IHByb21pc2VzID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBwdHIgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgcHJvbWlzZXMucHVzaChwdHIubG9hZCgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhbGwgdGhlIGNoaWxkcmVuIG9mIHRoZSByZWxhdGlvbiBhc3NvY2lhdGVkIHRvIGEgY2VydGFpbiBjb250ZXh0LlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxTcGluYWxOb2RlPj59IFRoZSBjaGlsZHJlbiBvZiB0aGUgcmVsYXRpb25cbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgY29udGV4dCBpcyBub3QgYSBTcGluYWxDb250ZXh0XG4gICAqL1xuICBhc3luYyBnZXRDaGlsZHJlbkluQ29udGV4dChjb250ZXh0KSB7XG4gICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcbiAgICBsZXQgY2hpbGRyZW47XG5cbiAgICBpZiAoIShjb250ZXh0IGluc3RhbmNlb2YgU3BpbmFsQ29udGV4dCkpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChUeXBlRXJyb3IoXCJjb250ZXh0IG11c3QgYmUgYSBTcGluYWxDb250ZXh0XCIpKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBwdHIgPSB0aGlzLmNoaWxkcmVuW2ldO1xuXG4gICAgICBwcm9taXNlcy5wdXNoKHB0ci5sb2FkKCkpO1xuICAgIH1cblxuICAgIGNoaWxkcmVuID0gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIHJldHVybiBjaGlsZHJlbi5maWx0ZXIoY2hpbGQgPT4gY2hpbGQuYmVsb25nc1RvQ29udGV4dChjb250ZXh0KSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdHlwZSBvZiB0aGUgcmVsYXRpb24uXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IFR5cGUgb2YgdGhlIHJlbGF0aW9uXG4gICAqL1xuICBnZXRUeXBlKCkge1xuICAgIHJldHVybiBTUElOQUxfUkVMQVRJT05fTFNUX1BUUl9UWVBFO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjaGlsZCB0byB0aGUgcmVsYXRpb24uXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZSB8IE1vZGVsfSBub2RlIE5vZGUgb3IgbW9kZWwgdG8gYWRkXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFNwaW5hbE5vZGU+fSBQcm9taXNlIGNvbnRhaW5pbmcgdGhlIG5vZGUgdGhhdCB3YXMgYWRkZWRcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgbm9kZSBpcyBub3QgYSBNb2RlbFxuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIG5vZGUgaXMgYWxyZWFkeSBhIGNoaWxkIG9mIHRoZSByZWxhdGlvblxuICAgKi9cbiAgYXN5bmMgYWRkQ2hpbGQobm9kZSkge1xuICAgIGlmICghKG5vZGUgaW5zdGFuY2VvZiBNb2RlbCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgXCJDYW5ub3QgYWRkIGEgY2hpbGQgd2l0Y2ggaXMgbm90IGFuIGluc3RhbmNlIG9mIFNwaW5hbE5vZGUgb3IgTW9kZWwuXCJcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmICghKG5vZGUgaW5zdGFuY2VvZiBTcGluYWxOb2RlKSkge1xuICAgICAgbm9kZSA9IG5ldyBTcGluYWxOb2RlKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBub2RlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5nZXRDaGlsZHJlbklkcygpLmluY2x1ZGVzKG5vZGUuZ2V0SWQoKS5nZXQoKSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBhZGQgYSBjaGlsZCB0d2ljZSB0byB0aGUgc2FtZSByZWxhdGlvbi5cIik7XG4gICAgfVxuXG4gICAgbm9kZS5fYWRkUGFyZW50KHRoaXMpO1xuICAgIHRoaXMuY2hpbGRyZW4ucHVzaChuZXcgU3BpbmFsTm9kZVBvaW50ZXIobm9kZSkpO1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBjaGlsZCBmcm9tIHRoZSByZWxhdGlvbi5cbiAgICogQHBhcmFtIHtTcGluYWxOb2RlfSBub2RlIENoaWxkIHRvIHJlbW92ZVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxub3RoaW5nPn0gQW4gZW1wdHkgcHJvbWlzZVxuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIGdpdmVuIG5vZGUgaXMgbm90IGEgY2hpbGRcbiAgICovXG4gIHJlbW92ZUNoaWxkKG5vZGUpIHtcbiAgICBsZXQgZm91bmQgPSBmYWxzZTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMuY2hpbGRyZW5baV0uZ2V0SWQoKSA9PT0gbm9kZS5nZXRJZCgpKSB7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGksIDEpO1xuICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghZm91bmQpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFcnJvcihcIlRoZSBub2RlIGlzIG5vdCBhIGNoaWxkXCIpKTtcbiAgICB9XG5cbiAgICBub2RlLl9yZW1vdmVQYXJlbnQodGhpcyk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG59XG5cbnNwaW5hbENvcmUucmVnaXN0ZXJfbW9kZWxzKFtTcGluYWxSZWxhdGlvbkxzdFB0cl0pO1xuZXhwb3J0IGRlZmF1bHQgU3BpbmFsUmVsYXRpb25Mc3RQdHI7XG4iXX0=