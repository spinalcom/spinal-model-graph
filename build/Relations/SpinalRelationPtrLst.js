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
 * Relation where the children are in Ptr to a Lst.
 * @abstract
 */
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
      children: new _SpinalNodePointer.default(new _spinalCoreConnectorjs_type.Lst())
    });
    this.children.info.add_attr("ids", new _spinalCoreConnectorjs_type.Lst());
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
      if (!(node instanceof _spinalCoreConnectorjs_type.Model)) {
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

_spinalCoreConnectorjs_type.spinalCore.register_models([SpinalRelationPtrLst]);

var _default = SpinalRelationPtrLst;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9SZWxhdGlvbnMvU3BpbmFsUmVsYXRpb25QdHJMc3QuanMiXSwibmFtZXMiOlsiU3BpbmFsUmVsYXRpb25QdHJMc3QiLCJCYXNlU3BpbmFsUmVsYXRpb24iLCJjb25zdHJ1Y3RvciIsInBhcmVudCIsIm5hbWUiLCJhZGRfYXR0ciIsImNoaWxkcmVuIiwiU3BpbmFsTm9kZVBvaW50ZXIiLCJMc3QiLCJpbmZvIiwiZ2V0Q2hpbGRyZW5JZHMiLCJpZExzdCIsImlkcyIsImkiLCJsZW5ndGgiLCJwdXNoIiwiZ2V0IiwiZ2V0Q2hpbGRyZW4iLCJjaGlsZHJlbkxzdCIsImxvYWQiLCJnZXRDaGlsZHJlbkluQ29udGV4dCIsImNvbnRleHQiLCJTcGluYWxDb250ZXh0IiwiVHlwZUVycm9yIiwiY2hpbGQiLCJiZWxvbmdzVG9Db250ZXh0IiwiZ2V0VHlwZSIsIlNQSU5BTF9SRUxBVElPTl9QVFJfTFNUX1RZUEUiLCJhZGRDaGlsZCIsIm5vZGUiLCJNb2RlbCIsIkVycm9yIiwiU3BpbmFsTm9kZSIsInVuZGVmaW5lZCIsImluY2x1ZGVzIiwiZ2V0SWQiLCJfYWRkUGFyZW50IiwidGhlbiIsInJlbW92ZUNoaWxkIiwiY29udGFpbnMiLCJyZW1vdmUiLCJfcmVtb3ZlUGFyZW50IiwicmVtb3ZlQ2hpbGRyZW4iLCJub2RlcyIsImVycm9yIiwiY2xlYXIiLCJpbmRleCIsImluZGV4T2YiLCJzcGluYWxDb3JlIiwicmVnaXN0ZXJfbW9kZWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBd0JBOztBQU1BOztBQUNBOztBQUdBOztBQUlBOzs7Ozs7OztBQUVBOzs7O0FBSUEsTUFBTUEsb0JBQU4sU0FBbUNDLDJCQUFuQyxDQUFzRDtBQUNwRDs7Ozs7OztBQU9BQyxFQUFBQSxXQUFXLENBQUNDLE1BQUQsRUFBU0MsSUFBVCxFQUFlO0FBQ3hCLFVBQU1ELE1BQU4sRUFBY0MsSUFBZDtBQUVBLFNBQUtDLFFBQUwsQ0FBYztBQUNaQyxNQUFBQSxRQUFRLEVBQUUsSUFB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QXZCOztBQUNBO0FBQ0Q7O0FBUnlCO0FBQUE7QUFBQTs7QUFBQTtBQVUxQiw2QkFBaUJGLEtBQWpCLDhIQUF3QjtBQUFBLGNBQWZkLElBQWU7QUFDdEIsY0FBSWlCLEtBQUssR0FBRzVCLFdBQVcsQ0FBQzZCLE9BQVosQ0FBb0JsQixJQUFwQixDQUFaOztBQUVBLGNBQUlpQixLQUFLLEtBQUssQ0FBQyxDQUFmLEVBQWtCO0FBQ2hCNUIsWUFBQUEsV0FBVyxDQUFDc0IsTUFBWixDQUFtQlgsSUFBbkI7O0FBQ0EsWUFBQSxNQUFJLENBQUN2QixRQUFMLENBQWNHLElBQWQsQ0FBbUJHLEdBQW5CLENBQXVCNEIsTUFBdkIsQ0FBOEJYLElBQUksQ0FBQ00sS0FBTCxFQUE5Qjs7QUFDQU4sWUFBQUEsSUFBSSxDQUFDWSxhQUFMLENBQW1CLE1BQW5CO0FBQ0QsV0FKRCxNQUlPO0FBQ0xHLFlBQUFBLEtBQUssR0FBRyxJQUFSO0FBQ0Q7QUFDRjtBQXBCeUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFzQjFCLFVBQUlBLEtBQUosRUFBVztBQUNULGNBQU1iLEtBQUssQ0FBQyw0QkFBRCxDQUFYO0FBQ0Q7QUF4QnlCO0FBeUIzQjs7QUFoS21EOztBQW1LdERpQix1Q0FBV0MsZUFBWCxDQUEyQixDQUFDakQsb0JBQUQsQ0FBM0I7O2VBQ2VBLG9CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4IFNwaW5hbENvbSAtIHd3dy5zcGluYWxjb20uY29tXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgU3BpbmFsQ29yZS5cbiAqXG4gKiBQbGVhc2UgcmVhZCBhbGwgb2YgdGhlIGZvbGxvd2luZyB0ZXJtcyBhbmQgY29uZGl0aW9uc1xuICogb2YgdGhlIEZyZWUgU29mdHdhcmUgbGljZW5zZSBBZ3JlZW1lbnQgKFwiQWdyZWVtZW50XCIpXG4gKiBjYXJlZnVsbHkuXG4gKlxuICogVGhpcyBBZ3JlZW1lbnQgaXMgYSBsZWdhbGx5IGJpbmRpbmcgY29udHJhY3QgYmV0d2VlblxuICogdGhlIExpY2Vuc2VlIChhcyBkZWZpbmVkIGJlbG93KSBhbmQgU3BpbmFsQ29tIHRoYXRcbiAqIHNldHMgZm9ydGggdGhlIHRlcm1zIGFuZCBjb25kaXRpb25zIHRoYXQgZ292ZXJuIHlvdXJcbiAqIHVzZSBvZiB0aGUgUHJvZ3JhbS4gQnkgaW5zdGFsbGluZyBhbmQvb3IgdXNpbmcgdGhlXG4gKiBQcm9ncmFtLCB5b3UgYWdyZWUgdG8gYWJpZGUgYnkgYWxsIHRoZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMgc3RhdGVkIG9yIHJlZmVyZW5jZWQgaGVyZWluLlxuICpcbiAqIElmIHlvdSBkbyBub3QgYWdyZWUgdG8gYWJpZGUgYnkgdGhlc2UgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zLCBkbyBub3QgZGVtb25zdHJhdGUgeW91ciBhY2NlcHRhbmNlIGFuZCBkb1xuICogbm90IGluc3RhbGwgb3IgdXNlIHRoZSBQcm9ncmFtLlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbG9uZ1xuICogd2l0aCB0aGlzIGZpbGUuIElmIG5vdCwgc2VlXG4gKiA8aHR0cDovL3Jlc291cmNlcy5zcGluYWxjb20uY29tL2xpY2Vuc2VzLnBkZj4uXG4gKi9cblxuaW1wb3J0IHtcbiAgc3BpbmFsQ29yZSxcbiAgTW9kZWwsXG4gIExzdFxufSBmcm9tIFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNfdHlwZVwiO1xuXG5pbXBvcnQgQmFzZVNwaW5hbFJlbGF0aW9uIGZyb20gXCIuL0Jhc2VTcGluYWxSZWxhdGlvblwiO1xuaW1wb3J0IHtcbiAgU1BJTkFMX1JFTEFUSU9OX1BUUl9MU1RfVFlQRVxufSBmcm9tIFwiLi9TcGluYWxSZWxhdGlvbkZhY3RvcnlcIjtcbmltcG9ydCB7XG4gIFNwaW5hbE5vZGUsXG4gIFNwaW5hbENvbnRleHRcbn0gZnJvbSBcIi4uL2luZGV4XCI7XG5pbXBvcnQgU3BpbmFsTm9kZVBvaW50ZXIgZnJvbSBcIi4uL1NwaW5hbE5vZGVQb2ludGVyXCI7XG5cbi8qKlxuICogUmVsYXRpb24gd2hlcmUgdGhlIGNoaWxkcmVuIGFyZSBpbiBQdHIgdG8gYSBMc3QuXG4gKiBAYWJzdHJhY3RcbiAqL1xuY2xhc3MgU3BpbmFsUmVsYXRpb25QdHJMc3QgZXh0ZW5kcyBCYXNlU3BpbmFsUmVsYXRpb24ge1xuICAvKipcbiAgICogQ29uc3RydWN0b3IgZm9yIHRoZSBTcGluYWxSZWxhdGlvblB0ckxzdCBjbGFzcy5cbiAgICogQHBhcmFtIHtTcGluYWxOb2RlfSBwYXJlbnQgUGFyZW50IG9mIHRoZSByZWxhdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBOYW1lIG9mIHRoZSByZWxhdGlvblxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBwYXJlbnQgaXMgbm90IGEgbm9kZVxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBuYW1lIGlzIG5vdCBhIHN0cmluZ1xuICAgKi9cbiAgY29uc3RydWN0b3IocGFyZW50LCBuYW1lKSB7XG4gICAgc3VwZXIocGFyZW50LCBuYW1lKTtcblxuICAgIHRoaXMuYWRkX2F0dHIoe1xuICAgICAgY2hpbGRyZW46IG5ldyBTcGluYWxOb2RlUG9pbnRlcihuZXcgTHN0KCkpXG4gICAgfSk7XG5cbiAgICB0aGlzLmNoaWxkcmVuLmluZm8uYWRkX2F0dHIoXCJpZHNcIiwgbmV3IExzdCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgYWxsIHRoZSBpZHMgb2YgdGhlIGNoaWxkcmVuIG9mIHRoZSByZWxhdGlvbiBhbmQgcmV0dXJuIHRoZW0gaW5zaWRlIGFuIGFycmF5LlxuICAgKiBAcmV0dXJucyB7QXJyYXk8U3RyaW5nPn0gQXJyYXkgY29udGFpbmluZyBhbGwgdGhlIGNoaWxkcmVuIGlkcyBvZiB0aGUgcmVsYXRpb25cbiAgICovXG4gIGdldENoaWxkcmVuSWRzKCkge1xuICAgIGNvbnN0IGlkTHN0ID0gdGhpcy5jaGlsZHJlbi5pbmZvLmlkcztcbiAgICBjb25zdCBpZHMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaWRMc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlkcy5wdXNoKGlkTHN0W2ldLmdldCgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaWRzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhbGwgdGhlIGNoaWxkcmVuIG9mIHRoZSByZWxhdGlvbi5cbiAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8U3BpbmFsTm9kZT4+fSBUaGUgY2hpbGRyZW4gb2YgdGhlIHJlbGF0aW9uXG4gICAqL1xuICBhc3luYyBnZXRDaGlsZHJlbigpIHtcbiAgICBjb25zdCBjaGlsZHJlbkxzdCA9IGF3YWl0IHRoaXMuY2hpbGRyZW4ubG9hZCgpO1xuICAgIGNvbnN0IGNoaWxkcmVuID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuTHN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGlsZHJlbi5wdXNoKGNoaWxkcmVuTHN0W2ldKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGFsbCB0aGUgY2hpbGRyZW4gb2YgdGhlIHJlbGF0aW9uIGFzc29jaWF0ZWQgdG8gYSBjZXJ0YWluIGNvbnRleHQuXG4gICAqIEBwYXJhbSB7U3BpbmFsQ29udGV4dH0gY29udGV4dCBDb250ZXh0IHRvIHVzZSBmb3IgdGhlIHNlYXJjaFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxTcGluYWxOb2RlPj59IFRoZSBjaGlsZHJlbiBhc3NvY2lhdGVkIHRvIHRoZSBjb250ZXh0XG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIGNvbnRleHQgaXMgbm90IGEgU3BpbmFsQ29udGV4dFxuICAgKi9cbiAgYXN5bmMgZ2V0Q2hpbGRyZW5JbkNvbnRleHQoY29udGV4dCkge1xuICAgIGNvbnN0IGNoaWxkcmVuTHN0ID0gYXdhaXQgdGhpcy5jaGlsZHJlbi5sb2FkKCk7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBbXTtcblxuICAgIGlmICghKGNvbnRleHQgaW5zdGFuY2VvZiBTcGluYWxDb250ZXh0KSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwiY29udGV4dCBtdXN0IGJlIGEgU3BpbmFsQ29udGV4dFwiKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuTHN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgY2hpbGQgPSBjaGlsZHJlbkxzdFtpXTtcblxuICAgICAgaWYgKGNoaWxkLmJlbG9uZ3NUb0NvbnRleHQoY29udGV4dCkpIHtcbiAgICAgICAgY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHR5cGUgb2YgdGhlIHJlbGF0aW9uLlxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBUeXBlIG9mIHRoZSByZWxhdGlvblxuICAgKi9cbiAgZ2V0VHlwZSgpIHtcbiAgICByZXR1cm4gU1BJTkFMX1JFTEFUSU9OX1BUUl9MU1RfVFlQRTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgY2hpbGQgdG8gdGhlIHJlbGF0aW9uLlxuICAgKiBAcGFyYW0ge1NwaW5hbE5vZGUgfCBNb2RlbH0gbm9kZSBOb2RlIG9yIG1vZGVsIHRvIGFkZFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxTcGluYWxOb2RlPn0gUHJvbWlzZSBjb250YWluaW5nIHRoZSBub2RlIHRoYXQgd2FzIGFkZGVkXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIG5vZGUgaXMgbm90IGEgTW9kZWxcbiAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBub2RlIGlzIGFscmVhZHkgYSBjaGlsZCBvZiB0aGUgcmVsYXRpb25cbiAgICovXG4gIGFzeW5jIGFkZENoaWxkKG5vZGUpIHtcbiAgICBpZiAoIShub2RlIGluc3RhbmNlb2YgTW9kZWwpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIFwiQ2Fubm90IGFkZCBhIGNoaWxkIHdpdGNoIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBTcGluYWxOb2RlIG9yIE1vZGVsLlwiXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoIShub2RlIGluc3RhbmNlb2YgU3BpbmFsTm9kZSkpIHtcbiAgICAgIG5vZGUgPSBuZXcgU3BpbmFsTm9kZSh1bmRlZmluZWQsIHVuZGVmaW5lZCwgbm9kZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZ2V0Q2hpbGRyZW5JZHMoKS5pbmNsdWRlcyhub2RlLmdldElkKCkuZ2V0KCkpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgYWRkIGEgY2hpbGQgdHdpY2UgdG8gdGhlIHNhbWUgcmVsYXRpb24uXCIpO1xuICAgIH1cblxuICAgIHRoaXMuY2hpbGRyZW4uaW5mby5pZHMucHVzaChub2RlLmdldElkKCkpO1xuICAgIG5vZGUuX2FkZFBhcmVudCh0aGlzKTtcblxuICAgIGF3YWl0IHRoaXMuY2hpbGRyZW4ubG9hZCgpLnRoZW4oKGNoaWxkcmVuKSA9PiB7XG4gICAgICBjaGlsZHJlbi5wdXNoKG5vZGUpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNoaWxkIGZyb20gdGhlIHJlbGF0aW9uLlxuICAgKiBAcGFyYW0ge1NwaW5hbE5vZGV9IG5vZGUgQ2hpbGQgdG8gcmVtb3ZlXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPG5vdGhpbmc+fSBBbiBlbXB0eSBwcm9taXNlXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgZ2l2ZW4gbm9kZSBpcyBub3QgYSBjaGlsZFxuICAgKi9cbiAgYXN5bmMgcmVtb3ZlQ2hpbGQobm9kZSkge1xuICAgIGNvbnN0IGNoaWxkcmVuTHN0ID0gYXdhaXQgdGhpcy5jaGlsZHJlbi5sb2FkKCk7XG5cbiAgICBpZiAoIWNoaWxkcmVuTHN0LmNvbnRhaW5zKG5vZGUpKSB7XG4gICAgICB0aHJvdyBFcnJvcihcIlRoZSBub2RlIGlzIG5vdCBhIGNoaWxkXCIpO1xuICAgIH1cblxuICAgIGNoaWxkcmVuTHN0LnJlbW92ZShub2RlKTtcbiAgICB0aGlzLmNoaWxkcmVuLmluZm8uaWRzLnJlbW92ZShub2RlLmdldElkKCkpO1xuICAgIG5vZGUuX3JlbW92ZVBhcmVudCh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGNoaWxkcmVuIGZyb20gdGhlIHJlbGF0aW9uLlxuICAgKiBAcGFyYW0ge0FycmF5PFNwaW5hbE5vZGU+fSBub2RlcyBDaGlsZHMgdG8gcmVtb3ZlXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPG5vdGhpbmc+fSBBbiBlbXB0eSBwcm9taXNlXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiBvbmUgb2YgdGhlIG5vZGVzIGlzIG5vdCBhIGNoaWxkXG4gICAqL1xuICBhc3luYyByZW1vdmVDaGlsZHJlbihub2Rlcykge1xuICAgIGNvbnN0IGNoaWxkcmVuTHN0ID0gYXdhaXQgdGhpcy5jaGlsZHJlbi5sb2FkKCk7XG4gICAgbGV0IGVycm9yID0gZmFsc2U7XG5cbiAgICBpZiAobm9kZXMgPT09IHVuZGVmaW5lZCB8fCBub2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGNoaWxkcmVuTHN0LmNsZWFyKCk7XG4gICAgICB0aGlzLmNoaWxkcmVuLmluZm8uaWRzLmNsZWFyKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xuICAgICAgbGV0IGluZGV4ID0gY2hpbGRyZW5Mc3QuaW5kZXhPZihub2RlKTtcblxuICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICBjaGlsZHJlbkxzdC5yZW1vdmUobm9kZSk7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4uaW5mby5pZHMucmVtb3ZlKG5vZGUuZ2V0SWQoKSk7XG4gICAgICAgIG5vZGUuX3JlbW92ZVBhcmVudCh0aGlzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVycm9yID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIHRocm93IEVycm9yKFwiQ291bGQgbm90IHJlbW92ZSBhbGwgbm9kZXNcIik7XG4gICAgfVxuICB9XG59XG5cbnNwaW5hbENvcmUucmVnaXN0ZXJfbW9kZWxzKFtTcGluYWxSZWxhdGlvblB0ckxzdF0pO1xuZXhwb3J0IGRlZmF1bHQgU3BpbmFsUmVsYXRpb25QdHJMc3Q7XG4iXX0=