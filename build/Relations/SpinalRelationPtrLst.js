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
   * @returns {Promise<Boolean>} A promise containing true if the node was a child
   */


  removeChild(node) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      const childrenLst = yield _this4.children.load();

      if (!childrenLst.contains(node)) {
        return false;
      }

      childrenLst.remove(node);

      _this4.children.info.ids.remove(node.getId());

      node._removeParent(_this4);

      return true;
    })();
  }
  /**
   * Removes children from the relation.
   * @param {Array<SpinalNode>} nodes Childs to remove
   * @returns {Promise<Array<Boolean>>} A promise containing an array of boolean
   */


  removeChildren(nodes) {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      const childrenLst = yield _this5.children.load();
      const successful = [];

      if (nodes === undefined || nodes.length === 0) {
        const length = childrenLst.length;
        childrenLst.clear();

        _this5.children.info.ids.clear();

        return Array(length).fill(true);
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

            successful.push(true);
          } else {
            successful.push(false);
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

      return successful;
    })();
  }

}

_spinalCoreConnectorjs.default.register_models([SpinalRelationPtrLst]);

var _default = SpinalRelationPtrLst;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9SZWxhdGlvbnMvU3BpbmFsUmVsYXRpb25QdHJMc3QuanMiXSwibmFtZXMiOlsiZ2xvYmFsVHlwZSIsIndpbmRvdyIsImdsb2JhbCIsIlNwaW5hbFJlbGF0aW9uUHRyTHN0IiwiQmFzZVNwaW5hbFJlbGF0aW9uIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiYWRkX2F0dHIiLCJjaGlsZHJlbiIsIlNwaW5hbE5vZGVQb2ludGVyIiwiTHN0IiwiaW5mbyIsImdldENoaWxkcmVuSWRzIiwiaWRMc3QiLCJpZHMiLCJpIiwibGVuZ3RoIiwicHVzaCIsImdldCIsImdldENoaWxkcmVuIiwiY2hpbGRyZW5Mc3QiLCJsb2FkIiwiZ2V0Q2hpbGRyZW5JbkNvbnRleHQiLCJjb250ZXh0IiwiY2hpbGQiLCJiZWxvbmdzVG9Db250ZXh0IiwiZ2V0VHlwZSIsIlNQSU5BTF9SRUxBVElPTl9QVFJfTFNUX1RZUEUiLCJhZGRDaGlsZCIsIm5vZGUiLCJNb2RlbCIsIkVycm9yIiwiU3BpbmFsTm9kZSIsInVuZGVmaW5lZCIsImluY2x1ZGVzIiwiZ2V0SWQiLCJfYWRkUGFyZW50IiwidGhlbiIsInJlbW92ZUNoaWxkIiwiY29udGFpbnMiLCJyZW1vdmUiLCJfcmVtb3ZlUGFyZW50IiwicmVtb3ZlQ2hpbGRyZW4iLCJub2RlcyIsInN1Y2Nlc3NmdWwiLCJjbGVhciIsIkFycmF5IiwiZmlsbCIsImluZGV4IiwiaW5kZXhPZiIsInNwaW5hbENvcmUiLCJyZWdpc3Rlcl9tb2RlbHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUF1QkE7O0FBQ0E7O0FBR0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRUEsTUFBTUEsVUFBVSxHQUFHLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NDLE1BQWhDLEdBQXlDRCxNQUE1RDs7QUFFQSxNQUFNRSxvQkFBTixTQUFtQ0MsMkJBQW5DLENBQXNEO0FBQ3BEOzs7O0FBSUFDLEVBQUFBLFdBQVcsQ0FBQ0MsSUFBRCxFQUFPO0FBQ2hCLFVBQU1B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RyxJQUFkLENBQW1CRyxHQUFuQixDQUF1QitCLEtBQXZCOztBQUNBLGVBQU9DLEtBQUssQ0FBQzlCLE1BQUQsQ0FBTCxDQUFjK0IsSUFBZCxDQUFtQixJQUFuQixDQUFQO0FBQ0Q7O0FBVHlCO0FBQUE7QUFBQTs7QUFBQTtBQVcxQiw2QkFBaUJKLEtBQWpCLDhIQUF3QjtBQUFBLGNBQWZkLElBQWU7QUFDdEIsY0FBSW1CLEtBQUssR0FBRzVCLFdBQVcsQ0FBQzZCLE9BQVosQ0FBb0JwQixJQUFwQixDQUFaOztBQUVBLGNBQUltQixLQUFLLEtBQUssQ0FBQyxDQUFmLEVBQWtCO0FBQ2hCNUIsWUFBQUEsV0FBVyxDQUFDb0IsTUFBWixDQUFtQlgsSUFBbkI7O0FBQ0EsWUFBQSxNQUFJLENBQUNyQixRQUFMLENBQWNHLElBQWQsQ0FBbUJHLEdBQW5CLENBQXVCMEIsTUFBdkIsQ0FBOEJYLElBQUksQ0FBQ00sS0FBTCxFQUE5Qjs7QUFDQU4sWUFBQUEsSUFBSSxDQUFDWSxhQUFMLENBQW1CLE1BQW5COztBQUNBRyxZQUFBQSxVQUFVLENBQUMzQixJQUFYLENBQWdCLElBQWhCO0FBQ0QsV0FMRCxNQUtPO0FBQ0wyQixZQUFBQSxVQUFVLENBQUMzQixJQUFYLENBQWdCLEtBQWhCO0FBQ0Q7QUFDRjtBQXRCeUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUF3QjFCLGFBQU8yQixVQUFQO0FBeEIwQjtBQXlCM0I7O0FBOUltRDs7QUFpSnRETSwrQkFBV0MsZUFBWCxDQUEyQixDQUFDaEQsb0JBQUQsQ0FBM0I7O2VBQ2VBLG9CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4IFNwaW5hbENvbSAtIHd3dy5zcGluYWxjb20uY29tXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgU3BpbmFsQ29yZS5cbiAqXG4gKiBQbGVhc2UgcmVhZCBhbGwgb2YgdGhlIGZvbGxvd2luZyB0ZXJtcyBhbmQgY29uZGl0aW9uc1xuICogb2YgdGhlIEZyZWUgU29mdHdhcmUgbGljZW5zZSBBZ3JlZW1lbnQgKFwiQWdyZWVtZW50XCIpXG4gKiBjYXJlZnVsbHkuXG4gKlxuICogVGhpcyBBZ3JlZW1lbnQgaXMgYSBsZWdhbGx5IGJpbmRpbmcgY29udHJhY3QgYmV0d2VlblxuICogdGhlIExpY2Vuc2VlIChhcyBkZWZpbmVkIGJlbG93KSBhbmQgU3BpbmFsQ29tIHRoYXRcbiAqIHNldHMgZm9ydGggdGhlIHRlcm1zIGFuZCBjb25kaXRpb25zIHRoYXQgZ292ZXJuIHlvdXJcbiAqIHVzZSBvZiB0aGUgUHJvZ3JhbS4gQnkgaW5zdGFsbGluZyBhbmQvb3IgdXNpbmcgdGhlXG4gKiBQcm9ncmFtLCB5b3UgYWdyZWUgdG8gYWJpZGUgYnkgYWxsIHRoZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMgc3RhdGVkIG9yIHJlZmVyZW5jZWQgaGVyZWluLlxuICpcbiAqIElmIHlvdSBkbyBub3QgYWdyZWUgdG8gYWJpZGUgYnkgdGhlc2UgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zLCBkbyBub3QgZGVtb25zdHJhdGUgeW91ciBhY2NlcHRhbmNlIGFuZCBkb1xuICogbm90IGluc3RhbGwgb3IgdXNlIHRoZSBQcm9ncmFtLlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbG9uZ1xuICogd2l0aCB0aGlzIGZpbGUuIElmIG5vdCwgc2VlXG4gKiA8aHR0cDovL3Jlc291cmNlcy5zcGluYWxjb20uY29tL2xpY2Vuc2VzLnBkZj4uXG4gKi9cbmltcG9ydCBCYXNlU3BpbmFsUmVsYXRpb24gZnJvbSBcIi4vQmFzZVNwaW5hbFJlbGF0aW9uXCI7XG5pbXBvcnQge1xuICBTUElOQUxfUkVMQVRJT05fUFRSX0xTVF9UWVBFXG59IGZyb20gXCIuL1NwaW5hbFJlbGF0aW9uRmFjdG9yeVwiO1xuaW1wb3J0IFNwaW5hbE5vZGUgZnJvbSBcIi4uL05vZGVzL1NwaW5hbE5vZGVcIjtcbmltcG9ydCBTcGluYWxOb2RlUG9pbnRlciBmcm9tIFwiLi4vU3BpbmFsTm9kZVBvaW50ZXJcIjtcbmltcG9ydCBzcGluYWxDb3JlIGZyb20gXCJzcGluYWwtY29yZS1jb25uZWN0b3Jqc1wiO1xuXG5jb25zdCBnbG9iYWxUeXBlID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHdpbmRvdztcblxuY2xhc3MgU3BpbmFsUmVsYXRpb25QdHJMc3QgZXh0ZW5kcyBCYXNlU3BpbmFsUmVsYXRpb24ge1xuICAvKipcbiAgICogQ29uc3RydWN0b3IgZm9yIHRoZSBTcGluYWxSZWxhdGlvblB0ckxzdCBjbGFzcy5cbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgTmFtZSBvZiB0aGUgcmVsYXRpb25cbiAgICovXG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICBzdXBlcihuYW1lKTtcbiAgICB0aGlzLmFkZF9hdHRyKHtcbiAgICAgIGNoaWxkcmVuOiBuZXcgU3BpbmFsTm9kZVBvaW50ZXIobmV3IGdsb2JhbFR5cGUuTHN0KCkpXG4gICAgfSk7XG5cbiAgICB0aGlzLmNoaWxkcmVuLmluZm8uYWRkX2F0dHIoXCJpZHNcIiwgbmV3IGdsb2JhbFR5cGUuTHN0KCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyBhbGwgdGhlIGlkcyBvZiB0aGUgY2hpbGRyZW4gb2YgdGhlIHJlbGF0aW9uIGFuZCByZXR1cm4gdGhlbSBpbnNpZGUgYW4gYXJyYXkuXG4gICAqIEByZXR1cm5zIHtBcnJheTxTdHJpbmc+fSBBcnJheSBjb250YWluaW5nIGFsbCB0aGUgY2hpbGRyZW4gaWRzIG9mIHRoZSByZWxhdGlvblxuICAgKi9cbiAgZ2V0Q2hpbGRyZW5JZHMoKSB7XG4gICAgY29uc3QgaWRMc3QgPSB0aGlzLmNoaWxkcmVuLmluZm8uaWRzO1xuICAgIGxldCBpZHMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaWRMc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlkcy5wdXNoKGlkTHN0W2ldLmdldCgpKTtcbiAgICB9XG4gICAgcmV0dXJuIGlkcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYWxsIHRoZSBjaGlsZHJlbiBvZiB0aGUgcmVsYXRpb24uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PFNwaW5hbE5vZGU+Pn0gVGhlIGNoaWxkcmVuIG9mIHRoZSByZWxhdGlvblxuICAgKi9cbiAgYXN5bmMgZ2V0Q2hpbGRyZW4oKSB7XG4gICAgY29uc3QgY2hpbGRyZW5Mc3QgPSBhd2FpdCB0aGlzLmNoaWxkcmVuLmxvYWQoKTtcbiAgICBsZXQgY2hpbGRyZW4gPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW5Mc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoaWxkcmVuLnB1c2goY2hpbGRyZW5Mc3RbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGFsbCB0aGUgY2hpbGRyZW4gb2YgdGhlIHJlbGF0aW9uIGFzc29jaWF0ZWQgdG8gYSBjZXJ0YWluIGNvbnRleHQuXG4gICAqIEBwYXJhbSB7U3BpbmFsQ29udGV4dH0gY29udGV4dCBDb250ZXh0IHRvIHVzZSBmb3IgdGhlIHNlYXJjaFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxTcGluYWxOb2RlPj59IFRoZSBjaGlsZHJlbiBhc3NvY2lhdGVkIHRvIHRoZSBjb250ZXh0XG4gICAqL1xuICBhc3luYyBnZXRDaGlsZHJlbkluQ29udGV4dChjb250ZXh0KSB7XG4gICAgY29uc3QgY2hpbGRyZW5Mc3QgPSBhd2FpdCB0aGlzLmNoaWxkcmVuLmxvYWQoKTtcbiAgICBsZXQgY2hpbGRyZW4gPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW5Mc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBjaGlsZCA9IGNoaWxkcmVuTHN0W2ldO1xuXG4gICAgICBpZiAoY2hpbGQuYmVsb25nc1RvQ29udGV4dChjb250ZXh0KSkge1xuICAgICAgICBjaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHR5cGUgb2YgdGhlIHJlbGF0aW9uLlxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBUeXBlIG9mIHRoZSByZWxhdGlvblxuICAgKi9cbiAgZ2V0VHlwZSgpIHtcbiAgICByZXR1cm4gU1BJTkFMX1JFTEFUSU9OX1BUUl9MU1RfVFlQRTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgY2hpbGQgdG8gdGhlIHJlbGF0aW9uLlxuICAgKiBAcGFyYW0ge1NwaW5hbE5vZGUgfCBNb2RlbH0gbm9kZSBOb2RlIG9yIG1vZGVsIHRvIGFkZFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxTcGluYWxOb2RlPn0gUHJvbWlzZSBjb250YWluaW5nIHRoZSBub2RlIHRoYXQgd2FzIGFkZGVkXG4gICAqL1xuICBhc3luYyBhZGRDaGlsZChub2RlKSB7XG4gICAgaWYgKCEobm9kZSBpbnN0YW5jZW9mIGdsb2JhbFR5cGUuTW9kZWwpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIFwiQ2Fubm90IGFkZCBhIGNoaWxkIHdpdGNoIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBTcGluYWxOb2RlIG9yIE1vZGVsLlwiXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoIShub2RlIGluc3RhbmNlb2YgU3BpbmFsTm9kZSkpIHtcbiAgICAgIG5vZGUgPSBuZXcgU3BpbmFsTm9kZSh1bmRlZmluZWQsIHVuZGVmaW5lZCwgbm9kZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmdldENoaWxkcmVuSWRzKCkuaW5jbHVkZXMobm9kZS5nZXRJZCgpLmdldCgpKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGFkZCBhIGNoaWxkIHR3aWNlIHRvIHRoZSBzYW1lIHJlbGF0aW9uLlwiKTtcbiAgICB9XG5cbiAgICB0aGlzLmNoaWxkcmVuLmluZm8uaWRzLnB1c2gobm9kZS5nZXRJZCgpKTtcbiAgICBub2RlLl9hZGRQYXJlbnQodGhpcyk7XG4gICAgYXdhaXQgdGhpcy5jaGlsZHJlbi5sb2FkKCkudGhlbigoY2hpbGRyZW4pID0+IHtcbiAgICAgIGNoaWxkcmVuLnB1c2gobm9kZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNoaWxkIGZyb20gdGhlIHJlbGF0aW9uLlxuICAgKiBAcGFyYW0ge1NwaW5hbE5vZGV9IG5vZGUgQ2hpbGQgdG8gcmVtb3ZlXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEJvb2xlYW4+fSBBIHByb21pc2UgY29udGFpbmluZyB0cnVlIGlmIHRoZSBub2RlIHdhcyBhIGNoaWxkXG4gICAqL1xuICBhc3luYyByZW1vdmVDaGlsZChub2RlKSB7XG4gICAgY29uc3QgY2hpbGRyZW5Mc3QgPSBhd2FpdCB0aGlzLmNoaWxkcmVuLmxvYWQoKTtcblxuICAgIGlmICghY2hpbGRyZW5Mc3QuY29udGFpbnMobm9kZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjaGlsZHJlbkxzdC5yZW1vdmUobm9kZSk7XG4gICAgdGhpcy5jaGlsZHJlbi5pbmZvLmlkcy5yZW1vdmUobm9kZS5nZXRJZCgpKTtcbiAgICBub2RlLl9yZW1vdmVQYXJlbnQodGhpcyk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBjaGlsZHJlbiBmcm9tIHRoZSByZWxhdGlvbi5cbiAgICogQHBhcmFtIHtBcnJheTxTcGluYWxOb2RlPn0gbm9kZXMgQ2hpbGRzIHRvIHJlbW92ZVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxCb29sZWFuPj59IEEgcHJvbWlzZSBjb250YWluaW5nIGFuIGFycmF5IG9mIGJvb2xlYW5cbiAgICovXG4gIGFzeW5jIHJlbW92ZUNoaWxkcmVuKG5vZGVzKSB7XG4gICAgY29uc3QgY2hpbGRyZW5Mc3QgPSBhd2FpdCB0aGlzLmNoaWxkcmVuLmxvYWQoKTtcbiAgICBjb25zdCBzdWNjZXNzZnVsID0gW107XG5cbiAgICBpZiAobm9kZXMgPT09IHVuZGVmaW5lZCB8fCBub2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGNvbnN0IGxlbmd0aCA9IGNoaWxkcmVuTHN0Lmxlbmd0aDtcbiAgICAgIGNoaWxkcmVuTHN0LmNsZWFyKCk7XG4gICAgICB0aGlzLmNoaWxkcmVuLmluZm8uaWRzLmNsZWFyKCk7XG4gICAgICByZXR1cm4gQXJyYXkobGVuZ3RoKS5maWxsKHRydWUpO1xuICAgIH1cblxuICAgIGZvciAobGV0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgIGxldCBpbmRleCA9IGNoaWxkcmVuTHN0LmluZGV4T2Yobm9kZSk7XG5cbiAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgY2hpbGRyZW5Mc3QucmVtb3ZlKG5vZGUpO1xuICAgICAgICB0aGlzLmNoaWxkcmVuLmluZm8uaWRzLnJlbW92ZShub2RlLmdldElkKCkpO1xuICAgICAgICBub2RlLl9yZW1vdmVQYXJlbnQodGhpcyk7XG4gICAgICAgIHN1Y2Nlc3NmdWwucHVzaCh0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN1Y2Nlc3NmdWwucHVzaChmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1Y2Nlc3NmdWw7XG4gIH1cbn1cblxuc3BpbmFsQ29yZS5yZWdpc3Rlcl9tb2RlbHMoW1NwaW5hbFJlbGF0aW9uUHRyTHN0XSk7XG5leHBvcnQgZGVmYXVsdCBTcGluYWxSZWxhdGlvblB0ckxzdDtcbiJdfQ==