"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseSpinalRelation = _interopRequireDefault(require("./BaseSpinalRelation"));

var _SpinalRelationFactory = require("./SpinalRelationFactory");

var _SpinalNode = _interopRequireDefault(require("../Nodes/SpinalNode"));

var _Utilities = require("../Utilities");

var _SpinalNodePointer = _interopRequireDefault(require("../SpinalNodePointer"));

var _spinalCoreConnectorjs = _interopRequireDefault(require("spinal-core-connectorjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const globalType = typeof window === "undefined" ? global : window;

class SpinalRelationPtrLst extends _BaseSpinalRelation.default {
  /**
   * 
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
   * @return {Array<String>} Array containing all the children ids of the relation
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
   * @return {Promise<Array<SpinalNode>>} The children of the relation
   */


  getChildren() {
    var _this = this;

    return _asyncToGenerator(function* () {
      const childrenLst = yield (0, _Utilities.promiseLoad)(_this.children);
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
   * @return {Promise<Array<SpinalNode>>} The children associated to the context
   */


  getChildrenInContext(context) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const childrenLst = yield (0, _Utilities.promiseLoad)(_this2.children);
      let children = [];

      for (let i = 0; i < childrenLst.length; i++) {
        let child = childrenLst[i];
        if (child.belongsToContext(context)) children.push(child);
      }

      return children;
    })();
  }
  /**
   * Returns the type of the relation.
   * @return {Number} Type of the relation
   */


  getType() {
    return _SpinalRelationFactory.SPINAL_RELATION_PTR_LST_TYPE;
  }
  /**
   * Adds a child to the relation.
   * @param {SpinalNode | Model} node Node or model to add
   * @return {Promise<SpinalNode>} Promise containing the node that was added
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

      yield (0, _Utilities.promiseLoad)(_this3.children).then(children => {
        children.push(node);
      });
      return node;
    })();
  }
  /**
   * Removes a child from the relation.
   * @param {SpinalNode} node Child to remove
   * @return {Promise<nothing>} An empty promise
   */


  removeChild(node) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      const childrenLst = yield (0, _Utilities.promiseLoad)(_this4.children);
      childrenLst.remove(node);

      _this4.children.info.ids.remove(node.getId());

      node._removeParent(_this4);
    })();
  }

}

_spinalCoreConnectorjs.default.register_models([SpinalRelationPtrLst]);

var _default = SpinalRelationPtrLst;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9SZWxhdGlvbnMvU3BpbmFsUmVsYXRpb25QdHJMc3QuanMiXSwibmFtZXMiOlsiZ2xvYmFsVHlwZSIsIndpbmRvdyIsImdsb2JhbCIsIlNwaW5hbFJlbGF0aW9uUHRyTHN0IiwiQmFzZVNwaW5hbFJlbGF0aW9uIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiYWRkX2F0dHIiLCJjaGlsZHJlbiIsIlNwaW5hbE5vZGVQb2ludGVyIiwiTHN0IiwiaW5mbyIsImdldENoaWxkcmVuSWRzIiwiaWRMc3QiLCJpZHMiLCJpIiwibGVuZ3RoIiwicHVzaCIsImdldCIsImdldENoaWxkcmVuIiwiY2hpbGRyZW5Mc3QiLCJnZXRDaGlsZHJlbkluQ29udGV4dCIsImNvbnRleHQiLCJjaGlsZCIsImJlbG9uZ3NUb0NvbnRleHQiLCJnZXRUeXBlIiwiU1BJTkFMX1JFTEFUSU9OX1BUUl9MU1RfVFlQRSIsImFkZENoaWxkIiwibm9kZSIsIk1vZGVsIiwiRXJyb3IiLCJTcGluYWxOb2RlIiwidW5kZWZpbmVkIiwiaW5jbHVkZXMiLCJnZXRJZCIsIl9hZGRQYXJlbnQiLCJ0aGVuIiwicmVtb3ZlQ2hpbGQiLCJyZW1vdmUiLCJfcmVtb3ZlUGFyZW50Iiwic3BpbmFsQ29yZSIsInJlZ2lzdGVyX21vZGVscyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQXVCQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFQSxNQUFNQSxVQUFVLEdBQUcsT0FBT0MsTUFBUCxLQUFrQixXQUFsQixHQUFnQ0MsTUFBaEMsR0FBeUNELE1BQTVEOztBQUVBLE1BQU1FLG9CQUFOLFNBQW1DQywyQkFBbkMsQ0FBc0Q7QUFDbEQ7Ozs7QUFJQUMsRUFBQUEsV0FBVyxDQUFDQyxJQUFELEVBQU87QUFDZCxVQUFNQSxJQUFOO0FBQ0EsU0FBS0MsUUFBTCxDQUFjO0FBQ1ZDLE1BQUFBLFFBQVEsRUFBRSxJQUFJQywwQkFBSixDQUFzQixJQUFJVCxVQUFVLENBQUNVLEdBQWYsRUFB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Q1MsSUFBVCxDQUFjVyxJQUFkO0FBQ0gsT0FGSyxDQUFOO0FBR0EsYUFBT0EsSUFBUDtBQWZpQjtBQWdCcEI7QUFFRDs7Ozs7OztBQUtNUyxFQUFBQSxXQUFOLENBQWtCVCxJQUFsQixFQUF3QjtBQUFBOztBQUFBO0FBQ3BCLFlBQU1SLFdBQVcsU0FBUyw0QkFBWSxNQUFJLENBQUNaLFFBQWpCLENBQTFCO0FBRUFZLE1BQUFBLFdBQVcsQ0FBQ2tCLE1BQVosQ0FBbUJWLElBQW5COztBQUNBLE1BQUEsTUFBSSxDQUFDcEIsUUFBTCxDQUFjRyxJQUFkLENBQW1CRyxHQUFuQixDQUF1QndCLE1BQXZCLENBQThCVixJQUFJLENBQUNNLEtBQUwsRUFBOUI7O0FBQ0FOLE1BQUFBLElBQUksQ0FBQ1csYUFBTCxDQUFtQixNQUFuQjtBQUxvQjtBQU12Qjs7QUF0R2lEOztBQXlHdERDLCtCQUFXQyxlQUFYLENBQTJCLENBQUN0QyxvQkFBRCxDQUEzQjs7ZUFDZUEsb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTggU3BpbmFsQ29tIC0gd3d3LnNwaW5hbGNvbS5jb21cbiAqIFxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgU3BpbmFsQ29yZS5cbiAqIFxuICogUGxlYXNlIHJlYWQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgdGVybXMgYW5kIGNvbmRpdGlvbnNcbiAqIG9mIHRoZSBGcmVlIFNvZnR3YXJlIGxpY2Vuc2UgQWdyZWVtZW50IChcIkFncmVlbWVudFwiKVxuICogY2FyZWZ1bGx5LlxuICogXG4gKiBUaGlzIEFncmVlbWVudCBpcyBhIGxlZ2FsbHkgYmluZGluZyBjb250cmFjdCBiZXR3ZWVuXG4gKiB0aGUgTGljZW5zZWUgKGFzIGRlZmluZWQgYmVsb3cpIGFuZCBTcGluYWxDb20gdGhhdFxuICogc2V0cyBmb3J0aCB0aGUgdGVybXMgYW5kIGNvbmRpdGlvbnMgdGhhdCBnb3Zlcm4geW91clxuICogdXNlIG9mIHRoZSBQcm9ncmFtLiBCeSBpbnN0YWxsaW5nIGFuZC9vciB1c2luZyB0aGVcbiAqIFByb2dyYW0sIHlvdSBhZ3JlZSB0byBhYmlkZSBieSBhbGwgdGhlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucyBzdGF0ZWQgb3IgcmVmZXJlbmNlZCBoZXJlaW4uXG4gKiBcbiAqIElmIHlvdSBkbyBub3QgYWdyZWUgdG8gYWJpZGUgYnkgdGhlc2UgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zLCBkbyBub3QgZGVtb25zdHJhdGUgeW91ciBhY2NlcHRhbmNlIGFuZCBkb1xuICogbm90IGluc3RhbGwgb3IgdXNlIHRoZSBQcm9ncmFtLlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbG9uZ1xuICogd2l0aCB0aGlzIGZpbGUuIElmIG5vdCwgc2VlXG4gKiA8aHR0cDovL3Jlc291cmNlcy5zcGluYWxjb20uY29tL2xpY2Vuc2VzLnBkZj4uXG4gKi9cbmltcG9ydCBCYXNlU3BpbmFsUmVsYXRpb24gZnJvbSBcIi4vQmFzZVNwaW5hbFJlbGF0aW9uXCJcbmltcG9ydCB7IFNQSU5BTF9SRUxBVElPTl9QVFJfTFNUX1RZUEUgfSBmcm9tIFwiLi9TcGluYWxSZWxhdGlvbkZhY3RvcnlcIlxuaW1wb3J0IFNwaW5hbE5vZGUgZnJvbSBcIi4uL05vZGVzL1NwaW5hbE5vZGVcIlxuaW1wb3J0IHsgcHJvbWlzZUxvYWQgfSBmcm9tIFwiLi4vVXRpbGl0aWVzXCI7XG5pbXBvcnQgU3BpbmFsTm9kZVBvaW50ZXIgZnJvbSBcIi4uL1NwaW5hbE5vZGVQb2ludGVyXCI7XG5pbXBvcnQgc3BpbmFsQ29yZSBmcm9tIFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNcIjtcblxuY29uc3QgZ2xvYmFsVHlwZSA9IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB3aW5kb3c7XG5cbmNsYXNzIFNwaW5hbFJlbGF0aW9uUHRyTHN0IGV4dGVuZHMgQmFzZVNwaW5hbFJlbGF0aW9uIHtcbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBOYW1lIG9mIHRoZSByZWxhdGlvbiBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICB0aGlzLmFkZF9hdHRyKHtcbiAgICAgICAgICAgIGNoaWxkcmVuOiBuZXcgU3BpbmFsTm9kZVBvaW50ZXIobmV3IGdsb2JhbFR5cGUuTHN0KCkpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uaW5mby5hZGRfYXR0cihcImlkc1wiLCBuZXcgZ2xvYmFsVHlwZS5Mc3QoKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzIGFsbCB0aGUgaWRzIG9mIHRoZSBjaGlsZHJlbiBvZiB0aGUgcmVsYXRpb24gYW5kIHJldHVybiB0aGVtIGluc2lkZSBhbiBhcnJheS5cbiAgICAgKiBAcmV0dXJuIHtBcnJheTxTdHJpbmc+fSBBcnJheSBjb250YWluaW5nIGFsbCB0aGUgY2hpbGRyZW4gaWRzIG9mIHRoZSByZWxhdGlvblxuICAgICAqL1xuICAgIGdldENoaWxkcmVuSWRzKCkge1xuICAgICAgICBjb25zdCBpZExzdCA9IHRoaXMuY2hpbGRyZW4uaW5mby5pZHM7XG4gICAgICAgIGxldCBpZHMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlkTHN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZHMucHVzaChpZExzdFtpXS5nZXQoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlkcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYWxsIHRoZSBjaGlsZHJlbiBvZiB0aGUgcmVsYXRpb24uXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxBcnJheTxTcGluYWxOb2RlPj59IFRoZSBjaGlsZHJlbiBvZiB0aGUgcmVsYXRpb25cbiAgICAgKi9cbiAgICBhc3luYyBnZXRDaGlsZHJlbigpIHtcbiAgICAgICAgY29uc3QgY2hpbGRyZW5Mc3QgPSBhd2FpdCBwcm9taXNlTG9hZCh0aGlzLmNoaWxkcmVuKTtcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbkxzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY2hpbGRyZW4ucHVzaChjaGlsZHJlbkxzdFtpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhbGwgdGhlIGNoaWxkcmVuIG9mIHRoZSByZWxhdGlvbiBhc3NvY2lhdGVkIHRvIGEgY2VydGFpbiBjb250ZXh0LlxuICAgICAqIEBwYXJhbSB7U3BpbmFsQ29udGV4dH0gY29udGV4dCBDb250ZXh0IHRvIHVzZSBmb3IgdGhlIHNlYXJjaFxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8QXJyYXk8U3BpbmFsTm9kZT4+fSBUaGUgY2hpbGRyZW4gYXNzb2NpYXRlZCB0byB0aGUgY29udGV4dFxuICAgICAqL1xuICAgIGFzeW5jIGdldENoaWxkcmVuSW5Db250ZXh0KGNvbnRleHQpIHtcbiAgICAgICAgY29uc3QgY2hpbGRyZW5Mc3QgPSBhd2FpdCBwcm9taXNlTG9hZCh0aGlzLmNoaWxkcmVuKTtcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbkxzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGNoaWxkID0gY2hpbGRyZW5Mc3RbaV07XG5cbiAgICAgICAgICAgIGlmIChjaGlsZC5iZWxvbmdzVG9Db250ZXh0KGNvbnRleHQpKVxuICAgICAgICAgICAgICAgIGNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjaGlsZHJlbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSB0eXBlIG9mIHRoZSByZWxhdGlvbi5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFR5cGUgb2YgdGhlIHJlbGF0aW9uXG4gICAgICovXG4gICAgZ2V0VHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIFNQSU5BTF9SRUxBVElPTl9QVFJfTFNUX1RZUEU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGNoaWxkIHRvIHRoZSByZWxhdGlvbi5cbiAgICAgKiBAcGFyYW0ge1NwaW5hbE5vZGUgfCBNb2RlbH0gbm9kZSBOb2RlIG9yIG1vZGVsIHRvIGFkZFxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8U3BpbmFsTm9kZT59IFByb21pc2UgY29udGFpbmluZyB0aGUgbm9kZSB0aGF0IHdhcyBhZGRlZFxuICAgICAqL1xuICAgIGFzeW5jIGFkZENoaWxkKG5vZGUpIHtcbiAgICAgICAgaWYgKCEobm9kZSBpbnN0YW5jZW9mIGdsb2JhbFR5cGUuTW9kZWwpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgYWRkIGEgY2hpbGQgd2l0Y2ggaXMgbm90IGFuIGluc3RhbmNlIG9mIFNwaW5hbE5vZGUgb3IgTW9kZWwuXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKCEobm9kZSBpbnN0YW5jZW9mIFNwaW5hbE5vZGUpKSB7XG4gICAgICAgICAgICBub2RlID0gbmV3IFNwaW5hbE5vZGUodW5kZWZpbmVkLCB1bmRlZmluZWQsIG5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmdldENoaWxkcmVuSWRzKCkuaW5jbHVkZXMobm9kZS5nZXRJZCgpLmdldCgpKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGFkZCBhIGNoaWxkIHR3aWNlIHRvIHRoZSBzYW1lIHJlbGF0aW9uLlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uaW5mby5pZHMucHVzaChub2RlLmdldElkKCkpO1xuICAgICAgICBub2RlLl9hZGRQYXJlbnQodGhpcyk7XG4gICAgICAgIGF3YWl0IHByb21pc2VMb2FkKHRoaXMuY2hpbGRyZW4pLnRoZW4oKGNoaWxkcmVuKSA9PiB7XG4gICAgICAgICAgICBjaGlsZHJlbi5wdXNoKG5vZGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhIGNoaWxkIGZyb20gdGhlIHJlbGF0aW9uLlxuICAgICAqIEBwYXJhbSB7U3BpbmFsTm9kZX0gbm9kZSBDaGlsZCB0byByZW1vdmVcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPG5vdGhpbmc+fSBBbiBlbXB0eSBwcm9taXNlXG4gICAgICovXG4gICAgYXN5bmMgcmVtb3ZlQ2hpbGQobm9kZSkge1xuICAgICAgICBjb25zdCBjaGlsZHJlbkxzdCA9IGF3YWl0IHByb21pc2VMb2FkKHRoaXMuY2hpbGRyZW4pO1xuXG4gICAgICAgIGNoaWxkcmVuTHN0LnJlbW92ZShub2RlKTtcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5pbmZvLmlkcy5yZW1vdmUobm9kZS5nZXRJZCgpKTtcbiAgICAgICAgbm9kZS5fcmVtb3ZlUGFyZW50KHRoaXMpO1xuICAgIH1cbn1cblxuc3BpbmFsQ29yZS5yZWdpc3Rlcl9tb2RlbHMoW1NwaW5hbFJlbGF0aW9uUHRyTHN0XSk7XG5leHBvcnQgZGVmYXVsdCBTcGluYWxSZWxhdGlvblB0ckxzdDtcbiJdfQ==