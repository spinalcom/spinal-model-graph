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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9SZWxhdGlvbnMvU3BpbmFsUmVsYXRpb25QdHJMc3QuanMiXSwibmFtZXMiOlsiU3BpbmFsUmVsYXRpb25QdHJMc3QiLCJCYXNlU3BpbmFsUmVsYXRpb24iLCJjb25zdHJ1Y3RvciIsInBhcmVudCIsIm5hbWUiLCJhZGRfYXR0ciIsImNoaWxkcmVuIiwiU3BpbmFsTm9kZVBvaW50ZXIiLCJMc3QiLCJpbmZvIiwiZ2V0Q2hpbGRyZW5JZHMiLCJpZExzdCIsImlkcyIsImkiLCJsZW5ndGgiLCJwdXNoIiwiZ2V0IiwiZ2V0Q2hpbGRyZW4iLCJjaGlsZHJlbkxzdCIsImxvYWQiLCJnZXRDaGlsZHJlbkluQ29udGV4dCIsImNvbnRleHQiLCJTcGluYWxDb250ZXh0IiwiVHlwZUVycm9yIiwiY2hpbGQiLCJiZWxvbmdzVG9Db250ZXh0IiwiZ2V0VHlwZSIsIlNQSU5BTF9SRUxBVElPTl9QVFJfTFNUX1RZUEUiLCJhZGRDaGlsZCIsIm5vZGUiLCJNb2RlbCIsIkVycm9yIiwiU3BpbmFsTm9kZSIsInVuZGVmaW5lZCIsImluY2x1ZGVzIiwiZ2V0SWQiLCJfYWRkUGFyZW50IiwidGhlbiIsInJlbW92ZUNoaWxkIiwiY29udGFpbnMiLCJyZW1vdmUiLCJfcmVtb3ZlUGFyZW50IiwicmVtb3ZlQ2hpbGRyZW4iLCJub2RlcyIsImVycm9yIiwiY2xlYXIiLCJpbmRleCIsImluZGV4T2YiLCJzcGluYWxDb3JlIiwicmVnaXN0ZXJfbW9kZWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBdUJBOztBQU1BOztBQUNBOztBQUdBOztBQUlBOzs7Ozs7OztBQUVBLE1BQU1BLG9CQUFOLFNBQW1DQywyQkFBbkMsQ0FBc0Q7QUFDcEQ7Ozs7Ozs7QUFPQUMsRUFBQUEsV0FBVyxDQUFDQyxNQUFELEVBQVNDLElBQVQsRUFBZTtBQUN4QixVQUFNRCxNQUFOLEVBQWNDLElBQWQ7QUFFQSxTQUFLQyxRQUFMLENBQWM7QUFDWkMsTUFBQUEsUUFBUSxFQUFFLElBQUlDLDBCQUFK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QTtBQUNEOztBQVJ5QjtBQUFBO0FBQUE7O0FBQUE7QUFVMUIsNkJBQWlCRixLQUFqQiw4SEFBd0I7QUFBQSxjQUFmZCxJQUFlO0FBQ3RCLGNBQUlpQixLQUFLLEdBQUc1QixXQUFXLENBQUM2QixPQUFaLENBQW9CbEIsSUFBcEIsQ0FBWjs7QUFFQSxjQUFJaUIsS0FBSyxLQUFLLENBQUMsQ0FBZixFQUFrQjtBQUNoQjVCLFlBQUFBLFdBQVcsQ0FBQ3NCLE1BQVosQ0FBbUJYLElBQW5COztBQUNBLFlBQUEsTUFBSSxDQUFDdkIsUUFBTCxDQUFjRyxJQUFkLENBQW1CRyxHQUFuQixDQUF1QjRCLE1BQXZCLENBQThCWCxJQUFJLENBQUNNLEtBQUwsRUFBOUI7O0FBQ0FOLFlBQUFBLElBQUksQ0FBQ1ksYUFBTCxDQUFtQixNQUFuQjtBQUNELFdBSkQsTUFJTztBQUNMRyxZQUFBQSxLQUFLLEdBQUcsSUFBUjtBQUNEO0FBQ0Y7QUFwQnlCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBc0IxQixVQUFJQSxLQUFKLEVBQVc7QUFDVCxjQUFNYixLQUFLLENBQUMsNEJBQUQsQ0FBWDtBQUNEO0FBeEJ5QjtBQXlCM0I7O0FBaEttRDs7QUFtS3REaUIsdUNBQVdDLGVBQVgsQ0FBMkIsQ0FBQ2pELG9CQUFELENBQTNCOztlQUNlQSxvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOCBTcGluYWxDb20gLSB3d3cuc3BpbmFsY29tLmNvbVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFNwaW5hbENvcmUuXG4gKlxuICogUGxlYXNlIHJlYWQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgdGVybXMgYW5kIGNvbmRpdGlvbnNcbiAqIG9mIHRoZSBGcmVlIFNvZnR3YXJlIGxpY2Vuc2UgQWdyZWVtZW50IChcIkFncmVlbWVudFwiKVxuICogY2FyZWZ1bGx5LlxuICpcbiAqIFRoaXMgQWdyZWVtZW50IGlzIGEgbGVnYWxseSBiaW5kaW5nIGNvbnRyYWN0IGJldHdlZW5cbiAqIHRoZSBMaWNlbnNlZSAoYXMgZGVmaW5lZCBiZWxvdykgYW5kIFNwaW5hbENvbSB0aGF0XG4gKiBzZXRzIGZvcnRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyB0aGF0IGdvdmVybiB5b3VyXG4gKiB1c2Ugb2YgdGhlIFByb2dyYW0uIEJ5IGluc3RhbGxpbmcgYW5kL29yIHVzaW5nIHRoZVxuICogUHJvZ3JhbSwgeW91IGFncmVlIHRvIGFiaWRlIGJ5IGFsbCB0aGUgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zIHN0YXRlZCBvciByZWZlcmVuY2VkIGhlcmVpbi5cbiAqXG4gKiBJZiB5b3UgZG8gbm90IGFncmVlIHRvIGFiaWRlIGJ5IHRoZXNlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucywgZG8gbm90IGRlbW9uc3RyYXRlIHlvdXIgYWNjZXB0YW5jZSBhbmQgZG9cbiAqIG5vdCBpbnN0YWxsIG9yIHVzZSB0aGUgUHJvZ3JhbS5cbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYWxvbmdcbiAqIHdpdGggdGhpcyBmaWxlLiBJZiBub3QsIHNlZVxuICogPGh0dHA6Ly9yZXNvdXJjZXMuc3BpbmFsY29tLmNvbS9saWNlbnNlcy5wZGY+LlxuICovXG5pbXBvcnQge1xuICBzcGluYWxDb3JlLFxuICBNb2RlbCxcbiAgTHN0XG59IGZyb20gXCJzcGluYWwtY29yZS1jb25uZWN0b3Jqc190eXBlXCI7XG5cbmltcG9ydCBCYXNlU3BpbmFsUmVsYXRpb24gZnJvbSBcIi4vQmFzZVNwaW5hbFJlbGF0aW9uXCI7XG5pbXBvcnQge1xuICBTUElOQUxfUkVMQVRJT05fUFRSX0xTVF9UWVBFXG59IGZyb20gXCIuL1NwaW5hbFJlbGF0aW9uRmFjdG9yeVwiO1xuaW1wb3J0IHtcbiAgU3BpbmFsTm9kZSxcbiAgU3BpbmFsQ29udGV4dFxufSBmcm9tIFwiLi4vaW5kZXhcIjtcbmltcG9ydCBTcGluYWxOb2RlUG9pbnRlciBmcm9tIFwiLi4vU3BpbmFsTm9kZVBvaW50ZXJcIjtcblxuY2xhc3MgU3BpbmFsUmVsYXRpb25QdHJMc3QgZXh0ZW5kcyBCYXNlU3BpbmFsUmVsYXRpb24ge1xuICAvKipcbiAgICogQ29uc3RydWN0b3IgZm9yIHRoZSBTcGluYWxSZWxhdGlvblB0ckxzdCBjbGFzcy5cbiAgICogQHBhcmFtIHtTcGluYWxOb2RlfSBwYXJlbnQgUGFyZW50IG9mIHRoZSByZWxhdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBOYW1lIG9mIHRoZSByZWxhdGlvblxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBwYXJlbnQgaXMgbm90IGEgbm9kZVxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBuYW1lIGlzIG5vdCBhIHN0cmluZ1xuICAgKi9cbiAgY29uc3RydWN0b3IocGFyZW50LCBuYW1lKSB7XG4gICAgc3VwZXIocGFyZW50LCBuYW1lKTtcblxuICAgIHRoaXMuYWRkX2F0dHIoe1xuICAgICAgY2hpbGRyZW46IG5ldyBTcGluYWxOb2RlUG9pbnRlcihuZXcgTHN0KCkpXG4gICAgfSk7XG5cbiAgICB0aGlzLmNoaWxkcmVuLmluZm8uYWRkX2F0dHIoXCJpZHNcIiwgbmV3IExzdCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgYWxsIHRoZSBpZHMgb2YgdGhlIGNoaWxkcmVuIG9mIHRoZSByZWxhdGlvbiBhbmQgcmV0dXJuIHRoZW0gaW5zaWRlIGFuIGFycmF5LlxuICAgKiBAcmV0dXJucyB7QXJyYXk8U3RyaW5nPn0gQXJyYXkgY29udGFpbmluZyBhbGwgdGhlIGNoaWxkcmVuIGlkcyBvZiB0aGUgcmVsYXRpb25cbiAgICovXG4gIGdldENoaWxkcmVuSWRzKCkge1xuICAgIGNvbnN0IGlkTHN0ID0gdGhpcy5jaGlsZHJlbi5pbmZvLmlkcztcbiAgICBjb25zdCBpZHMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaWRMc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlkcy5wdXNoKGlkTHN0W2ldLmdldCgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaWRzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhbGwgdGhlIGNoaWxkcmVuIG9mIHRoZSByZWxhdGlvbi5cbiAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8U3BpbmFsTm9kZT4+fSBUaGUgY2hpbGRyZW4gb2YgdGhlIHJlbGF0aW9uXG4gICAqL1xuICBhc3luYyBnZXRDaGlsZHJlbigpIHtcbiAgICBjb25zdCBjaGlsZHJlbkxzdCA9IGF3YWl0IHRoaXMuY2hpbGRyZW4ubG9hZCgpO1xuICAgIGNvbnN0IGNoaWxkcmVuID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuTHN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGlsZHJlbi5wdXNoKGNoaWxkcmVuTHN0W2ldKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGFsbCB0aGUgY2hpbGRyZW4gb2YgdGhlIHJlbGF0aW9uIGFzc29jaWF0ZWQgdG8gYSBjZXJ0YWluIGNvbnRleHQuXG4gICAqIEBwYXJhbSB7U3BpbmFsQ29udGV4dH0gY29udGV4dCBDb250ZXh0IHRvIHVzZSBmb3IgdGhlIHNlYXJjaFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxTcGluYWxOb2RlPj59IFRoZSBjaGlsZHJlbiBhc3NvY2lhdGVkIHRvIHRoZSBjb250ZXh0XG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIGNvbnRleHQgaXMgbm90IGEgU3BpbmFsQ29udGV4dFxuICAgKi9cbiAgYXN5bmMgZ2V0Q2hpbGRyZW5JbkNvbnRleHQoY29udGV4dCkge1xuICAgIGNvbnN0IGNoaWxkcmVuTHN0ID0gYXdhaXQgdGhpcy5jaGlsZHJlbi5sb2FkKCk7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBbXTtcblxuICAgIGlmICghKGNvbnRleHQgaW5zdGFuY2VvZiBTcGluYWxDb250ZXh0KSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwiY29udGV4dCBtdXN0IGJlIGEgU3BpbmFsQ29udGV4dFwiKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuTHN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgY2hpbGQgPSBjaGlsZHJlbkxzdFtpXTtcblxuICAgICAgaWYgKGNoaWxkLmJlbG9uZ3NUb0NvbnRleHQoY29udGV4dCkpIHtcbiAgICAgICAgY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHR5cGUgb2YgdGhlIHJlbGF0aW9uLlxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBUeXBlIG9mIHRoZSByZWxhdGlvblxuICAgKi9cbiAgZ2V0VHlwZSgpIHtcbiAgICByZXR1cm4gU1BJTkFMX1JFTEFUSU9OX1BUUl9MU1RfVFlQRTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgY2hpbGQgdG8gdGhlIHJlbGF0aW9uLlxuICAgKiBAcGFyYW0ge1NwaW5hbE5vZGUgfCBNb2RlbH0gbm9kZSBOb2RlIG9yIG1vZGVsIHRvIGFkZFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxTcGluYWxOb2RlPn0gUHJvbWlzZSBjb250YWluaW5nIHRoZSBub2RlIHRoYXQgd2FzIGFkZGVkXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIG5vZGUgaXMgbm90IGEgTW9kZWxcbiAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBub2RlIGlzIGFscmVhZHkgYSBjaGlsZCBvZiB0aGUgcmVsYXRpb25cbiAgICovXG4gIGFzeW5jIGFkZENoaWxkKG5vZGUpIHtcbiAgICBpZiAoIShub2RlIGluc3RhbmNlb2YgTW9kZWwpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIFwiQ2Fubm90IGFkZCBhIGNoaWxkIHdpdGNoIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBTcGluYWxOb2RlIG9yIE1vZGVsLlwiXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoIShub2RlIGluc3RhbmNlb2YgU3BpbmFsTm9kZSkpIHtcbiAgICAgIG5vZGUgPSBuZXcgU3BpbmFsTm9kZSh1bmRlZmluZWQsIHVuZGVmaW5lZCwgbm9kZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZ2V0Q2hpbGRyZW5JZHMoKS5pbmNsdWRlcyhub2RlLmdldElkKCkuZ2V0KCkpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgYWRkIGEgY2hpbGQgdHdpY2UgdG8gdGhlIHNhbWUgcmVsYXRpb24uXCIpO1xuICAgIH1cblxuICAgIHRoaXMuY2hpbGRyZW4uaW5mby5pZHMucHVzaChub2RlLmdldElkKCkpO1xuICAgIG5vZGUuX2FkZFBhcmVudCh0aGlzKTtcblxuICAgIGF3YWl0IHRoaXMuY2hpbGRyZW4ubG9hZCgpLnRoZW4oKGNoaWxkcmVuKSA9PiB7XG4gICAgICBjaGlsZHJlbi5wdXNoKG5vZGUpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNoaWxkIGZyb20gdGhlIHJlbGF0aW9uLlxuICAgKiBAcGFyYW0ge1NwaW5hbE5vZGV9IG5vZGUgQ2hpbGQgdG8gcmVtb3ZlXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPG5vdGhpbmc+fSBBbiBlbXB0eSBwcm9taXNlXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgZ2l2ZW4gbm9kZSBpcyBub3QgYSBjaGlsZFxuICAgKi9cbiAgYXN5bmMgcmVtb3ZlQ2hpbGQobm9kZSkge1xuICAgIGNvbnN0IGNoaWxkcmVuTHN0ID0gYXdhaXQgdGhpcy5jaGlsZHJlbi5sb2FkKCk7XG5cbiAgICBpZiAoIWNoaWxkcmVuTHN0LmNvbnRhaW5zKG5vZGUpKSB7XG4gICAgICB0aHJvdyBFcnJvcihcIlRoZSBub2RlIGlzIG5vdCBhIGNoaWxkXCIpO1xuICAgIH1cblxuICAgIGNoaWxkcmVuTHN0LnJlbW92ZShub2RlKTtcbiAgICB0aGlzLmNoaWxkcmVuLmluZm8uaWRzLnJlbW92ZShub2RlLmdldElkKCkpO1xuICAgIG5vZGUuX3JlbW92ZVBhcmVudCh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGNoaWxkcmVuIGZyb20gdGhlIHJlbGF0aW9uLlxuICAgKiBAcGFyYW0ge0FycmF5PFNwaW5hbE5vZGU+fSBub2RlcyBDaGlsZHMgdG8gcmVtb3ZlXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPG5vdGhpbmc+fSBBbiBlbXB0eSBwcm9taXNlXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiBvbmUgb2YgdGhlIG5vZGVzIGlzIG5vdCBhIGNoaWxkXG4gICAqL1xuICBhc3luYyByZW1vdmVDaGlsZHJlbihub2Rlcykge1xuICAgIGNvbnN0IGNoaWxkcmVuTHN0ID0gYXdhaXQgdGhpcy5jaGlsZHJlbi5sb2FkKCk7XG4gICAgbGV0IGVycm9yID0gZmFsc2U7XG5cbiAgICBpZiAobm9kZXMgPT09IHVuZGVmaW5lZCB8fCBub2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGNoaWxkcmVuTHN0LmNsZWFyKCk7XG4gICAgICB0aGlzLmNoaWxkcmVuLmluZm8uaWRzLmNsZWFyKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xuICAgICAgbGV0IGluZGV4ID0gY2hpbGRyZW5Mc3QuaW5kZXhPZihub2RlKTtcblxuICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICBjaGlsZHJlbkxzdC5yZW1vdmUobm9kZSk7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4uaW5mby5pZHMucmVtb3ZlKG5vZGUuZ2V0SWQoKSk7XG4gICAgICAgIG5vZGUuX3JlbW92ZVBhcmVudCh0aGlzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVycm9yID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIHRocm93IEVycm9yKFwiQ291bGQgbm90IHJlbW92ZSBhbGwgbm9kZXNcIik7XG4gICAgfVxuICB9XG59XG5cbnNwaW5hbENvcmUucmVnaXN0ZXJfbW9kZWxzKFtTcGluYWxSZWxhdGlvblB0ckxzdF0pO1xuZXhwb3J0IGRlZmF1bHQgU3BpbmFsUmVsYXRpb25QdHJMc3Q7XG4iXX0=