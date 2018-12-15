"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseSpinalRelation = _interopRequireDefault(require("./BaseSpinalRelation"));

var _SpinalRelationFactory = require("./SpinalRelationFactory");

var _index = require("../index");

var _SpinalNodePointer = _interopRequireDefault(require("../SpinalNodePointer"));

var _spinalCoreConnectorjs = _interopRequireDefault(require("spinal-core-connectorjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const globalType = typeof window === "undefined" ? global : window;

class SpinalRelationPtrLst extends _BaseSpinalRelation.default {
  /**
   * Constructor for the SpinalRelationPtrLst class.
   * @param {SpinalNode} parent Parent of the relation
   * @param {String} name Name of the relation
   * @throws {TypeError} If the parent is not a node
   * @throws {TypeError} If the name is not a string
   */
  constructor(parent, name) {
    super(parent, name);
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
    const ids = [];

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
      const children = [];

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
   * @throws {TypeError} If the context is not a SpinalContext
   */


  getChildrenInContext(context) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const childrenLst = yield _this2.children.load();
      const children = [];

      if (!(context instanceof _index.SpinalContext)) {
        throw TypeError("context must be a SpinalContext");
      }

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
   * @throws {TypeError} If the node is not a Model
   * @throws {Error} If the node is already a child of the relation
   */


  addChild(node) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      if (!(node instanceof globalType.Model)) {
        throw new Error("Cannot add a child witch is not an instance of SpinalNode or Model.");
      } else if (!(node instanceof _index.SpinalNode)) {
        node = new _index.SpinalNode(undefined, undefined, node);
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
        throw Error("The node is not a child");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9SZWxhdGlvbnMvU3BpbmFsUmVsYXRpb25QdHJMc3QuanMiXSwibmFtZXMiOlsiZ2xvYmFsVHlwZSIsIndpbmRvdyIsImdsb2JhbCIsIlNwaW5hbFJlbGF0aW9uUHRyTHN0IiwiQmFzZVNwaW5hbFJlbGF0aW9uIiwiY29uc3RydWN0b3IiLCJwYXJlbnQiLCJuYW1lIiwiYWRkX2F0dHIiLCJjaGlsZHJlbiIsIlNwaW5hbE5vZGVQb2ludGVyIiwiTHN0IiwiaW5mbyIsImdldENoaWxkcmVuSWRzIiwiaWRMc3QiLCJpZHMiLCJpIiwibGVuZ3RoIiwicHVzaCIsImdldCIsImdldENoaWxkcmVuIiwiY2hpbGRyZW5Mc3QiLCJsb2FkIiwiZ2V0Q2hpbGRyZW5JbkNvbnRleHQiLCJjb250ZXh0IiwiU3BpbmFsQ29udGV4dCIsIlR5cGVFcnJvciIsImNoaWxkIiwiYmVsb25nc1RvQ29udGV4dCIsImdldFR5cGUiLCJTUElOQUxfUkVMQVRJT05fUFRSX0xTVF9UWVBFIiwiYWRkQ2hpbGQiLCJub2RlIiwiTW9kZWwiLCJFcnJvciIsIlNwaW5hbE5vZGUiLCJ1bmRlZmluZWQiLCJpbmNsdWRlcyIsImdldElkIiwiX2FkZFBhcmVudCIsInRoZW4iLCJyZW1vdmVDaGlsZCIsImNvbnRhaW5zIiwicmVtb3ZlIiwiX3JlbW92ZVBhcmVudCIsInJlbW92ZUNoaWxkcmVuIiwibm9kZXMiLCJlcnJvciIsImNsZWFyIiwiaW5kZXgiLCJpbmRleE9mIiwic3BpbmFsQ29yZSIsInJlZ2lzdGVyX21vZGVscyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQXVCQTs7QUFDQTs7QUFHQTs7QUFJQTs7QUFDQTs7Ozs7Ozs7QUFFQSxNQUFNQSxVQUFVLEdBQUcsT0FBT0MsTUFBUCxLQUFrQixXQUFsQixHQUFnQ0MsTUFBaEMsR0FBeUNELE1BQTVEOztBQUVBLE1BQU1FLG9CQUFOLFNBQW1DQywyQkFBbkMsQ0FBc0Q7QUFDcEQ7Ozs7Ozs7QUFPQUMsRUFBQUEsV0FBVyxDQUFDQyxN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QUFLLENBQUM3QixNQUFOLEtBQWlCLENBQTVDLEVBQStDO0FBQzdDSSxRQUFBQSxXQUFXLENBQUMyQixLQUFaOztBQUNBLFFBQUEsTUFBSSxDQUFDdkMsUUFBTCxDQUFjRyxJQUFkLENBQW1CRyxHQUFuQixDQUF1QmlDLEtBQXZCOztBQUNBO0FBQ0Q7O0FBUnlCO0FBQUE7QUFBQTs7QUFBQTtBQVUxQiw2QkFBaUJGLEtBQWpCLDhIQUF3QjtBQUFBLGNBQWZkLElBQWU7QUFDdEIsY0FBSWlCLEtBQUssR0FBRzVCLFdBQVcsQ0FBQzZCLE9BQVosQ0FBb0JsQixJQUFwQixDQUFaOztBQUVBLGNBQUlpQixLQUFLLEtBQUssQ0FBQyxDQUFmLEVBQWtCO0FBQ2hCNUIsWUFBQUEsV0FBVyxDQUFDc0IsTUFBWixDQUFtQlgsSUFBbkI7O0FBQ0EsWUFBQSxNQUFJLENBQUN2QixRQUFMLENBQWNHLElBQWQsQ0FBbUJHLEdBQW5CLENBQXVCNEIsTUFBdkIsQ0FBOEJYLElBQUksQ0FBQ00sS0FBTCxFQUE5Qjs7QUFDQU4sWUFBQUEsSUFBSSxDQUFDWSxhQUFMLENBQW1CLE1BQW5CO0FBQ0QsV0FKRCxNQUlPO0FBQ0xHLFlBQUFBLEtBQUssR0FBRyxJQUFSO0FBQ0Q7QUFDRjtBQXBCeUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFzQjFCLFVBQUlBLEtBQUosRUFBVztBQUNULGNBQU1iLEtBQUssQ0FBQyw0QkFBRCxDQUFYO0FBQ0Q7QUF4QnlCO0FBeUIzQjs7QUFoS21EOztBQW1LdERpQiwrQkFBV0MsZUFBWCxDQUEyQixDQUFDakQsb0JBQUQsQ0FBM0I7O2VBQ2VBLG9CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4IFNwaW5hbENvbSAtIHd3dy5zcGluYWxjb20uY29tXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgU3BpbmFsQ29yZS5cbiAqXG4gKiBQbGVhc2UgcmVhZCBhbGwgb2YgdGhlIGZvbGxvd2luZyB0ZXJtcyBhbmQgY29uZGl0aW9uc1xuICogb2YgdGhlIEZyZWUgU29mdHdhcmUgbGljZW5zZSBBZ3JlZW1lbnQgKFwiQWdyZWVtZW50XCIpXG4gKiBjYXJlZnVsbHkuXG4gKlxuICogVGhpcyBBZ3JlZW1lbnQgaXMgYSBsZWdhbGx5IGJpbmRpbmcgY29udHJhY3QgYmV0d2VlblxuICogdGhlIExpY2Vuc2VlIChhcyBkZWZpbmVkIGJlbG93KSBhbmQgU3BpbmFsQ29tIHRoYXRcbiAqIHNldHMgZm9ydGggdGhlIHRlcm1zIGFuZCBjb25kaXRpb25zIHRoYXQgZ292ZXJuIHlvdXJcbiAqIHVzZSBvZiB0aGUgUHJvZ3JhbS4gQnkgaW5zdGFsbGluZyBhbmQvb3IgdXNpbmcgdGhlXG4gKiBQcm9ncmFtLCB5b3UgYWdyZWUgdG8gYWJpZGUgYnkgYWxsIHRoZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMgc3RhdGVkIG9yIHJlZmVyZW5jZWQgaGVyZWluLlxuICpcbiAqIElmIHlvdSBkbyBub3QgYWdyZWUgdG8gYWJpZGUgYnkgdGhlc2UgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zLCBkbyBub3QgZGVtb25zdHJhdGUgeW91ciBhY2NlcHRhbmNlIGFuZCBkb1xuICogbm90IGluc3RhbGwgb3IgdXNlIHRoZSBQcm9ncmFtLlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbG9uZ1xuICogd2l0aCB0aGlzIGZpbGUuIElmIG5vdCwgc2VlXG4gKiA8aHR0cDovL3Jlc291cmNlcy5zcGluYWxjb20uY29tL2xpY2Vuc2VzLnBkZj4uXG4gKi9cbmltcG9ydCBCYXNlU3BpbmFsUmVsYXRpb24gZnJvbSBcIi4vQmFzZVNwaW5hbFJlbGF0aW9uXCI7XG5pbXBvcnQge1xuICBTUElOQUxfUkVMQVRJT05fUFRSX0xTVF9UWVBFXG59IGZyb20gXCIuL1NwaW5hbFJlbGF0aW9uRmFjdG9yeVwiO1xuaW1wb3J0IHtcbiAgU3BpbmFsTm9kZSxcbiAgU3BpbmFsQ29udGV4dFxufSBmcm9tIFwiLi4vaW5kZXhcIjtcbmltcG9ydCBTcGluYWxOb2RlUG9pbnRlciBmcm9tIFwiLi4vU3BpbmFsTm9kZVBvaW50ZXJcIjtcbmltcG9ydCBzcGluYWxDb3JlIGZyb20gXCJzcGluYWwtY29yZS1jb25uZWN0b3Jqc1wiO1xuXG5jb25zdCBnbG9iYWxUeXBlID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHdpbmRvdztcblxuY2xhc3MgU3BpbmFsUmVsYXRpb25QdHJMc3QgZXh0ZW5kcyBCYXNlU3BpbmFsUmVsYXRpb24ge1xuICAvKipcbiAgICogQ29uc3RydWN0b3IgZm9yIHRoZSBTcGluYWxSZWxhdGlvblB0ckxzdCBjbGFzcy5cbiAgICogQHBhcmFtIHtTcGluYWxOb2RlfSBwYXJlbnQgUGFyZW50IG9mIHRoZSByZWxhdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBOYW1lIG9mIHRoZSByZWxhdGlvblxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBwYXJlbnQgaXMgbm90IGEgbm9kZVxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBuYW1lIGlzIG5vdCBhIHN0cmluZ1xuICAgKi9cbiAgY29uc3RydWN0b3IocGFyZW50LCBuYW1lKSB7XG4gICAgc3VwZXIocGFyZW50LCBuYW1lKTtcblxuICAgIHRoaXMuYWRkX2F0dHIoe1xuICAgICAgY2hpbGRyZW46IG5ldyBTcGluYWxOb2RlUG9pbnRlcihuZXcgZ2xvYmFsVHlwZS5Mc3QoKSlcbiAgICB9KTtcblxuICAgIHRoaXMuY2hpbGRyZW4uaW5mby5hZGRfYXR0cihcImlkc1wiLCBuZXcgZ2xvYmFsVHlwZS5Mc3QoKSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIGFsbCB0aGUgaWRzIG9mIHRoZSBjaGlsZHJlbiBvZiB0aGUgcmVsYXRpb24gYW5kIHJldHVybiB0aGVtIGluc2lkZSBhbiBhcnJheS5cbiAgICogQHJldHVybnMge0FycmF5PFN0cmluZz59IEFycmF5IGNvbnRhaW5pbmcgYWxsIHRoZSBjaGlsZHJlbiBpZHMgb2YgdGhlIHJlbGF0aW9uXG4gICAqL1xuICBnZXRDaGlsZHJlbklkcygpIHtcbiAgICBjb25zdCBpZExzdCA9IHRoaXMuY2hpbGRyZW4uaW5mby5pZHM7XG4gICAgY29uc3QgaWRzID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlkTHN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZHMucHVzaChpZExzdFtpXS5nZXQoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlkcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYWxsIHRoZSBjaGlsZHJlbiBvZiB0aGUgcmVsYXRpb24uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PFNwaW5hbE5vZGU+Pn0gVGhlIGNoaWxkcmVuIG9mIHRoZSByZWxhdGlvblxuICAgKi9cbiAgYXN5bmMgZ2V0Q2hpbGRyZW4oKSB7XG4gICAgY29uc3QgY2hpbGRyZW5Mc3QgPSBhd2FpdCB0aGlzLmNoaWxkcmVuLmxvYWQoKTtcbiAgICBjb25zdCBjaGlsZHJlbiA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbkxzdC5sZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGRyZW4ucHVzaChjaGlsZHJlbkxzdFtpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhbGwgdGhlIGNoaWxkcmVuIG9mIHRoZSByZWxhdGlvbiBhc3NvY2lhdGVkIHRvIGEgY2VydGFpbiBjb250ZXh0LlxuICAgKiBAcGFyYW0ge1NwaW5hbENvbnRleHR9IGNvbnRleHQgQ29udGV4dCB0byB1c2UgZm9yIHRoZSBzZWFyY2hcbiAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8U3BpbmFsTm9kZT4+fSBUaGUgY2hpbGRyZW4gYXNzb2NpYXRlZCB0byB0aGUgY29udGV4dFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBjb250ZXh0IGlzIG5vdCBhIFNwaW5hbENvbnRleHRcbiAgICovXG4gIGFzeW5jIGdldENoaWxkcmVuSW5Db250ZXh0KGNvbnRleHQpIHtcbiAgICBjb25zdCBjaGlsZHJlbkxzdCA9IGF3YWl0IHRoaXMuY2hpbGRyZW4ubG9hZCgpO1xuICAgIGNvbnN0IGNoaWxkcmVuID0gW107XG5cbiAgICBpZiAoIShjb250ZXh0IGluc3RhbmNlb2YgU3BpbmFsQ29udGV4dCkpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcImNvbnRleHQgbXVzdCBiZSBhIFNwaW5hbENvbnRleHRcIik7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbkxzdC5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGNoaWxkID0gY2hpbGRyZW5Mc3RbaV07XG5cbiAgICAgIGlmIChjaGlsZC5iZWxvbmdzVG9Db250ZXh0KGNvbnRleHQpKSB7XG4gICAgICAgIGNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB0eXBlIG9mIHRoZSByZWxhdGlvbi5cbiAgICogQHJldHVybnMge051bWJlcn0gVHlwZSBvZiB0aGUgcmVsYXRpb25cbiAgICovXG4gIGdldFR5cGUoKSB7XG4gICAgcmV0dXJuIFNQSU5BTF9SRUxBVElPTl9QVFJfTFNUX1RZUEU7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGNoaWxkIHRvIHRoZSByZWxhdGlvbi5cbiAgICogQHBhcmFtIHtTcGluYWxOb2RlIHwgTW9kZWx9IG5vZGUgTm9kZSBvciBtb2RlbCB0byBhZGRcbiAgICogQHJldHVybnMge1Byb21pc2U8U3BpbmFsTm9kZT59IFByb21pc2UgY29udGFpbmluZyB0aGUgbm9kZSB0aGF0IHdhcyBhZGRlZFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBub2RlIGlzIG5vdCBhIE1vZGVsXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgbm9kZSBpcyBhbHJlYWR5IGEgY2hpbGQgb2YgdGhlIHJlbGF0aW9uXG4gICAqL1xuICBhc3luYyBhZGRDaGlsZChub2RlKSB7XG4gICAgaWYgKCEobm9kZSBpbnN0YW5jZW9mIGdsb2JhbFR5cGUuTW9kZWwpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIFwiQ2Fubm90IGFkZCBhIGNoaWxkIHdpdGNoIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBTcGluYWxOb2RlIG9yIE1vZGVsLlwiXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoIShub2RlIGluc3RhbmNlb2YgU3BpbmFsTm9kZSkpIHtcbiAgICAgIG5vZGUgPSBuZXcgU3BpbmFsTm9kZSh1bmRlZmluZWQsIHVuZGVmaW5lZCwgbm9kZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZ2V0Q2hpbGRyZW5JZHMoKS5pbmNsdWRlcyhub2RlLmdldElkKCkuZ2V0KCkpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgYWRkIGEgY2hpbGQgdHdpY2UgdG8gdGhlIHNhbWUgcmVsYXRpb24uXCIpO1xuICAgIH1cblxuICAgIHRoaXMuY2hpbGRyZW4uaW5mby5pZHMucHVzaChub2RlLmdldElkKCkpO1xuICAgIG5vZGUuX2FkZFBhcmVudCh0aGlzKTtcblxuICAgIGF3YWl0IHRoaXMuY2hpbGRyZW4ubG9hZCgpLnRoZW4oKGNoaWxkcmVuKSA9PiB7XG4gICAgICBjaGlsZHJlbi5wdXNoKG5vZGUpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNoaWxkIGZyb20gdGhlIHJlbGF0aW9uLlxuICAgKiBAcGFyYW0ge1NwaW5hbE5vZGV9IG5vZGUgQ2hpbGQgdG8gcmVtb3ZlXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPG5vdGhpbmc+fSBBbiBlbXB0eSBwcm9taXNlXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgZ2l2ZW4gbm9kZSBpcyBub3QgYSBjaGlsZFxuICAgKi9cbiAgYXN5bmMgcmVtb3ZlQ2hpbGQobm9kZSkge1xuICAgIGNvbnN0IGNoaWxkcmVuTHN0ID0gYXdhaXQgdGhpcy5jaGlsZHJlbi5sb2FkKCk7XG5cbiAgICBpZiAoIWNoaWxkcmVuTHN0LmNvbnRhaW5zKG5vZGUpKSB7XG4gICAgICB0aHJvdyBFcnJvcihcIlRoZSBub2RlIGlzIG5vdCBhIGNoaWxkXCIpO1xuICAgIH1cblxuICAgIGNoaWxkcmVuTHN0LnJlbW92ZShub2RlKTtcbiAgICB0aGlzLmNoaWxkcmVuLmluZm8uaWRzLnJlbW92ZShub2RlLmdldElkKCkpO1xuICAgIG5vZGUuX3JlbW92ZVBhcmVudCh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGNoaWxkcmVuIGZyb20gdGhlIHJlbGF0aW9uLlxuICAgKiBAcGFyYW0ge0FycmF5PFNwaW5hbE5vZGU+fSBub2RlcyBDaGlsZHMgdG8gcmVtb3ZlXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPG5vdGhpbmc+fSBBbiBlbXB0eSBwcm9taXNlXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiBvbmUgb2YgdGhlIG5vZGVzIGlzIG5vdCBhIGNoaWxkXG4gICAqL1xuICBhc3luYyByZW1vdmVDaGlsZHJlbihub2Rlcykge1xuICAgIGNvbnN0IGNoaWxkcmVuTHN0ID0gYXdhaXQgdGhpcy5jaGlsZHJlbi5sb2FkKCk7XG4gICAgbGV0IGVycm9yID0gZmFsc2U7XG5cbiAgICBpZiAobm9kZXMgPT09IHVuZGVmaW5lZCB8fCBub2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGNoaWxkcmVuTHN0LmNsZWFyKCk7XG4gICAgICB0aGlzLmNoaWxkcmVuLmluZm8uaWRzLmNsZWFyKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xuICAgICAgbGV0IGluZGV4ID0gY2hpbGRyZW5Mc3QuaW5kZXhPZihub2RlKTtcblxuICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICBjaGlsZHJlbkxzdC5yZW1vdmUobm9kZSk7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4uaW5mby5pZHMucmVtb3ZlKG5vZGUuZ2V0SWQoKSk7XG4gICAgICAgIG5vZGUuX3JlbW92ZVBhcmVudCh0aGlzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVycm9yID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIHRocm93IEVycm9yKFwiQ291bGQgbm90IHJlbW92ZSBhbGwgbm9kZXNcIik7XG4gICAgfVxuICB9XG59XG5cbnNwaW5hbENvcmUucmVnaXN0ZXJfbW9kZWxzKFtTcGluYWxSZWxhdGlvblB0ckxzdF0pO1xuZXhwb3J0IGRlZmF1bHQgU3BpbmFsUmVsYXRpb25QdHJMc3Q7XG4iXX0=