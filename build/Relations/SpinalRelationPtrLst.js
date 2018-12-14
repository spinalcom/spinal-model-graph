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
   * @param {String} name Name of the relation
   */
  constructor(name) {
    super(name);
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
    let ids = [];

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
      let children = [];

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
      let children = [];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9SZWxhdGlvbnMvU3BpbmFsUmVsYXRpb25QdHJMc3QuanMiXSwibmFtZXMiOlsiZ2xvYmFsVHlwZSIsIndpbmRvdyIsImdsb2JhbCIsIlNwaW5hbFJlbGF0aW9uUHRyTHN0IiwiQmFzZVNwaW5hbFJlbGF0aW9uIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiYWRkX2F0dHIiLCJjaGlsZHJlbiIsIlNwaW5hbE5vZGVQb2ludGVyIiwiTHN0IiwiaW5mbyIsImdldENoaWxkcmVuSWRzIiwiaWRMc3QiLCJpZHMiLCJpIiwibGVuZ3RoIiwicHVzaCIsImdldCIsImdldENoaWxkcmVuIiwiY2hpbGRyZW5Mc3QiLCJsb2FkIiwiZ2V0Q2hpbGRyZW5JbkNvbnRleHQiLCJjb250ZXh0IiwiY2hpbGQiLCJiZWxvbmdzVG9Db250ZXh0IiwiZ2V0VHlwZSIsIlNQSU5BTF9SRUxBVElPTl9QVFJfTFNUX1RZUEUiLCJhZGRDaGlsZCIsIm5vZGUiLCJNb2RlbCIsIkVycm9yIiwiU3BpbmFsTm9kZSIsInVuZGVmaW5lZCIsImluY2x1ZGVzIiwiZ2V0SWQiLCJfYWRkUGFyZW50IiwidGhlbiIsInJlbW92ZUNoaWxkIiwiY29udGFpbnMiLCJyZW1vdmUiLCJfcmVtb3ZlUGFyZW50IiwicmVtb3ZlQ2hpbGRyZW4iLCJub2RlcyIsImVycm9yIiwiY2xlYXIiLCJpbmRleCIsImluZGV4T2YiLCJzcGluYWxDb3JlIiwicmVnaXN0ZXJfbW9kZWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBdUJBOztBQUNBOztBQUdBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVBLE1BQU1BLFVBQVUsR0FBRyxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDQyxNQUFoQyxHQUF5Q0QsTUFBNUQ7O0FBRUEsTUFBTUUsb0JBQU4sU0FBbUNDLDJCQUFuQyxDQUFzRDtBQUNwRDs7OztBQUlBQyxFQUFBQSxXQUFXLENBQUNDLElBQUQsRUFBTztBQUNoQixVQUFNQSxJQUFOO0FBQ0EsU0FBS0MsUUFB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QUFBOztBQUFBO0FBVTFCLDZCQUFpQkYsS0FBakIsOEhBQXdCO0FBQUEsY0FBZmQsSUFBZTtBQUN0QixjQUFJaUIsS0FBSyxHQUFHMUIsV0FBVyxDQUFDMkIsT0FBWixDQUFvQmxCLElBQXBCLENBQVo7O0FBRUEsY0FBSWlCLEtBQUssS0FBSyxDQUFDLENBQWYsRUFBa0I7QUFDaEIxQixZQUFBQSxXQUFXLENBQUNvQixNQUFaLENBQW1CWCxJQUFuQjs7QUFDQSxZQUFBLE1BQUksQ0FBQ3JCLFFBQUwsQ0FBY0csSUFBZCxDQUFtQkcsR0FBbkIsQ0FBdUIwQixNQUF2QixDQUE4QlgsSUFBSSxDQUFDTSxLQUFMLEVBQTlCOztBQUNBTixZQUFBQSxJQUFJLENBQUNZLGFBQUwsQ0FBbUIsTUFBbkI7QUFDRCxXQUpELE1BSU87QUFDTEcsWUFBQUEsS0FBSyxHQUFHLElBQVI7QUFDRDtBQUNGO0FBcEJ5QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQXNCMUIsVUFBSUEsS0FBSixFQUFXO0FBQ1QsY0FBTWIsS0FBSyxDQUFDLDRCQUFELENBQVg7QUFDRDtBQXhCeUI7QUF5QjNCOztBQS9JbUQ7O0FBa0p0RGlCLCtCQUFXQyxlQUFYLENBQTJCLENBQUM5QyxvQkFBRCxDQUEzQjs7ZUFDZUEsb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTggU3BpbmFsQ29tIC0gd3d3LnNwaW5hbGNvbS5jb21cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBTcGluYWxDb3JlLlxuICpcbiAqIFBsZWFzZSByZWFkIGFsbCBvZiB0aGUgZm9sbG93aW5nIHRlcm1zIGFuZCBjb25kaXRpb25zXG4gKiBvZiB0aGUgRnJlZSBTb2Z0d2FyZSBsaWNlbnNlIEFncmVlbWVudCAoXCJBZ3JlZW1lbnRcIilcbiAqIGNhcmVmdWxseS5cbiAqXG4gKiBUaGlzIEFncmVlbWVudCBpcyBhIGxlZ2FsbHkgYmluZGluZyBjb250cmFjdCBiZXR3ZWVuXG4gKiB0aGUgTGljZW5zZWUgKGFzIGRlZmluZWQgYmVsb3cpIGFuZCBTcGluYWxDb20gdGhhdFxuICogc2V0cyBmb3J0aCB0aGUgdGVybXMgYW5kIGNvbmRpdGlvbnMgdGhhdCBnb3Zlcm4geW91clxuICogdXNlIG9mIHRoZSBQcm9ncmFtLiBCeSBpbnN0YWxsaW5nIGFuZC9vciB1c2luZyB0aGVcbiAqIFByb2dyYW0sIHlvdSBhZ3JlZSB0byBhYmlkZSBieSBhbGwgdGhlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucyBzdGF0ZWQgb3IgcmVmZXJlbmNlZCBoZXJlaW4uXG4gKlxuICogSWYgeW91IGRvIG5vdCBhZ3JlZSB0byBhYmlkZSBieSB0aGVzZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMsIGRvIG5vdCBkZW1vbnN0cmF0ZSB5b3VyIGFjY2VwdGFuY2UgYW5kIGRvXG4gKiBub3QgaW5zdGFsbCBvciB1c2UgdGhlIFByb2dyYW0uXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFsb25nXG4gKiB3aXRoIHRoaXMgZmlsZS4gSWYgbm90LCBzZWVcbiAqIDxodHRwOi8vcmVzb3VyY2VzLnNwaW5hbGNvbS5jb20vbGljZW5zZXMucGRmPi5cbiAqL1xuaW1wb3J0IEJhc2VTcGluYWxSZWxhdGlvbiBmcm9tIFwiLi9CYXNlU3BpbmFsUmVsYXRpb25cIjtcbmltcG9ydCB7XG4gIFNQSU5BTF9SRUxBVElPTl9QVFJfTFNUX1RZUEVcbn0gZnJvbSBcIi4vU3BpbmFsUmVsYXRpb25GYWN0b3J5XCI7XG5pbXBvcnQgU3BpbmFsTm9kZSBmcm9tIFwiLi4vTm9kZXMvU3BpbmFsTm9kZVwiO1xuaW1wb3J0IFNwaW5hbE5vZGVQb2ludGVyIGZyb20gXCIuLi9TcGluYWxOb2RlUG9pbnRlclwiO1xuaW1wb3J0IHNwaW5hbENvcmUgZnJvbSBcInNwaW5hbC1jb3JlLWNvbm5lY3RvcmpzXCI7XG5cbmNvbnN0IGdsb2JhbFR5cGUgPSB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogd2luZG93O1xuXG5jbGFzcyBTcGluYWxSZWxhdGlvblB0ckxzdCBleHRlbmRzIEJhc2VTcGluYWxSZWxhdGlvbiB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIFNwaW5hbFJlbGF0aW9uUHRyTHN0IGNsYXNzLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBOYW1lIG9mIHRoZSByZWxhdGlvblxuICAgKi9cbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHN1cGVyKG5hbWUpO1xuICAgIHRoaXMuYWRkX2F0dHIoe1xuICAgICAgY2hpbGRyZW46IG5ldyBTcGluYWxOb2RlUG9pbnRlcihuZXcgZ2xvYmFsVHlwZS5Mc3QoKSlcbiAgICB9KTtcblxuICAgIHRoaXMuY2hpbGRyZW4uaW5mby5hZGRfYXR0cihcImlkc1wiLCBuZXcgZ2xvYmFsVHlwZS5Mc3QoKSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIGFsbCB0aGUgaWRzIG9mIHRoZSBjaGlsZHJlbiBvZiB0aGUgcmVsYXRpb24gYW5kIHJldHVybiB0aGVtIGluc2lkZSBhbiBhcnJheS5cbiAgICogQHJldHVybnMge0FycmF5PFN0cmluZz59IEFycmF5IGNvbnRhaW5pbmcgYWxsIHRoZSBjaGlsZHJlbiBpZHMgb2YgdGhlIHJlbGF0aW9uXG4gICAqL1xuICBnZXRDaGlsZHJlbklkcygpIHtcbiAgICBjb25zdCBpZExzdCA9IHRoaXMuY2hpbGRyZW4uaW5mby5pZHM7XG4gICAgbGV0IGlkcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpZExzdC5sZW5ndGg7IGkrKykge1xuICAgICAgaWRzLnB1c2goaWRMc3RbaV0uZ2V0KCkpO1xuICAgIH1cbiAgICByZXR1cm4gaWRzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhbGwgdGhlIGNoaWxkcmVuIG9mIHRoZSByZWxhdGlvbi5cbiAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8U3BpbmFsTm9kZT4+fSBUaGUgY2hpbGRyZW4gb2YgdGhlIHJlbGF0aW9uXG4gICAqL1xuICBhc3luYyBnZXRDaGlsZHJlbigpIHtcbiAgICBjb25zdCBjaGlsZHJlbkxzdCA9IGF3YWl0IHRoaXMuY2hpbGRyZW4ubG9hZCgpO1xuICAgIGxldCBjaGlsZHJlbiA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbkxzdC5sZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGRyZW4ucHVzaChjaGlsZHJlbkxzdFtpXSk7XG4gICAgfVxuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYWxsIHRoZSBjaGlsZHJlbiBvZiB0aGUgcmVsYXRpb24gYXNzb2NpYXRlZCB0byBhIGNlcnRhaW4gY29udGV4dC5cbiAgICogQHBhcmFtIHtTcGluYWxDb250ZXh0fSBjb250ZXh0IENvbnRleHQgdG8gdXNlIGZvciB0aGUgc2VhcmNoXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PFNwaW5hbE5vZGU+Pn0gVGhlIGNoaWxkcmVuIGFzc29jaWF0ZWQgdG8gdGhlIGNvbnRleHRcbiAgICovXG4gIGFzeW5jIGdldENoaWxkcmVuSW5Db250ZXh0KGNvbnRleHQpIHtcbiAgICBjb25zdCBjaGlsZHJlbkxzdCA9IGF3YWl0IHRoaXMuY2hpbGRyZW4ubG9hZCgpO1xuICAgIGxldCBjaGlsZHJlbiA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbkxzdC5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGNoaWxkID0gY2hpbGRyZW5Mc3RbaV07XG5cbiAgICAgIGlmIChjaGlsZC5iZWxvbmdzVG9Db250ZXh0KGNvbnRleHQpKSB7XG4gICAgICAgIGNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdHlwZSBvZiB0aGUgcmVsYXRpb24uXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IFR5cGUgb2YgdGhlIHJlbGF0aW9uXG4gICAqL1xuICBnZXRUeXBlKCkge1xuICAgIHJldHVybiBTUElOQUxfUkVMQVRJT05fUFRSX0xTVF9UWVBFO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjaGlsZCB0byB0aGUgcmVsYXRpb24uXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZSB8IE1vZGVsfSBub2RlIE5vZGUgb3IgbW9kZWwgdG8gYWRkXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFNwaW5hbE5vZGU+fSBQcm9taXNlIGNvbnRhaW5pbmcgdGhlIG5vZGUgdGhhdCB3YXMgYWRkZWRcbiAgICovXG4gIGFzeW5jIGFkZENoaWxkKG5vZGUpIHtcbiAgICBpZiAoIShub2RlIGluc3RhbmNlb2YgZ2xvYmFsVHlwZS5Nb2RlbCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgXCJDYW5ub3QgYWRkIGEgY2hpbGQgd2l0Y2ggaXMgbm90IGFuIGluc3RhbmNlIG9mIFNwaW5hbE5vZGUgb3IgTW9kZWwuXCJcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmICghKG5vZGUgaW5zdGFuY2VvZiBTcGluYWxOb2RlKSkge1xuICAgICAgbm9kZSA9IG5ldyBTcGluYWxOb2RlKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBub2RlKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZ2V0Q2hpbGRyZW5JZHMoKS5pbmNsdWRlcyhub2RlLmdldElkKCkuZ2V0KCkpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgYWRkIGEgY2hpbGQgdHdpY2UgdG8gdGhlIHNhbWUgcmVsYXRpb24uXCIpO1xuICAgIH1cblxuICAgIHRoaXMuY2hpbGRyZW4uaW5mby5pZHMucHVzaChub2RlLmdldElkKCkpO1xuICAgIG5vZGUuX2FkZFBhcmVudCh0aGlzKTtcbiAgICBhd2FpdCB0aGlzLmNoaWxkcmVuLmxvYWQoKS50aGVuKChjaGlsZHJlbikgPT4ge1xuICAgICAgY2hpbGRyZW4ucHVzaChub2RlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgY2hpbGQgZnJvbSB0aGUgcmVsYXRpb24uXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZX0gbm9kZSBDaGlsZCB0byByZW1vdmVcbiAgICogQHJldHVybnMge1Byb21pc2U8bm90aGluZz59IEFuIGVtcHR5IHByb21pc2VcbiAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBnaXZlbiBub2RlIGlzIG5vdCBhIGNoaWxkXG4gICAqL1xuICBhc3luYyByZW1vdmVDaGlsZChub2RlKSB7XG4gICAgY29uc3QgY2hpbGRyZW5Mc3QgPSBhd2FpdCB0aGlzLmNoaWxkcmVuLmxvYWQoKTtcblxuICAgIGlmICghY2hpbGRyZW5Mc3QuY29udGFpbnMobm9kZSkpIHtcbiAgICAgIHRocm93IEVycm9yKFwiSW52YWxpZCBub2RlXCIpO1xuICAgIH1cblxuICAgIGNoaWxkcmVuTHN0LnJlbW92ZShub2RlKTtcbiAgICB0aGlzLmNoaWxkcmVuLmluZm8uaWRzLnJlbW92ZShub2RlLmdldElkKCkpO1xuICAgIG5vZGUuX3JlbW92ZVBhcmVudCh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGNoaWxkcmVuIGZyb20gdGhlIHJlbGF0aW9uLlxuICAgKiBAcGFyYW0ge0FycmF5PFNwaW5hbE5vZGU+fSBub2RlcyBDaGlsZHMgdG8gcmVtb3ZlXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPG5vdGhpbmc+fSBBbiBlbXB0eSBwcm9taXNlXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiBvbmUgb2YgdGhlIG5vZGVzIGlzIG5vdCBhIGNoaWxkXG4gICAqL1xuICBhc3luYyByZW1vdmVDaGlsZHJlbihub2Rlcykge1xuICAgIGNvbnN0IGNoaWxkcmVuTHN0ID0gYXdhaXQgdGhpcy5jaGlsZHJlbi5sb2FkKCk7XG4gICAgbGV0IGVycm9yID0gZmFsc2U7XG5cbiAgICBpZiAobm9kZXMgPT09IHVuZGVmaW5lZCB8fCBub2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGNoaWxkcmVuTHN0LmNsZWFyKCk7XG4gICAgICB0aGlzLmNoaWxkcmVuLmluZm8uaWRzLmNsZWFyKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xuICAgICAgbGV0IGluZGV4ID0gY2hpbGRyZW5Mc3QuaW5kZXhPZihub2RlKTtcblxuICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICBjaGlsZHJlbkxzdC5yZW1vdmUobm9kZSk7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4uaW5mby5pZHMucmVtb3ZlKG5vZGUuZ2V0SWQoKSk7XG4gICAgICAgIG5vZGUuX3JlbW92ZVBhcmVudCh0aGlzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVycm9yID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIHRocm93IEVycm9yKFwiQ291bGQgbm90IHJlbW92ZSBhbGwgbm9kZXNcIik7XG4gICAgfVxuICB9XG59XG5cbnNwaW5hbENvcmUucmVnaXN0ZXJfbW9kZWxzKFtTcGluYWxSZWxhdGlvblB0ckxzdF0pO1xuZXhwb3J0IGRlZmF1bHQgU3BpbmFsUmVsYXRpb25QdHJMc3Q7XG4iXX0=