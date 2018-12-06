"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SpinalNode = _interopRequireDefault(require("./SpinalNode"));

var _spinalCoreConnectorjs = _interopRequireDefault(require("spinal-core-connectorjs"));

var _SpinalRelationFactory = require("../Relations/SpinalRelationFactory");

var _Utilities = require("../Utilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const globalType = typeof window === "undefined" ? global : window;

class SpinalContext extends _SpinalNode.default {
  /**
   * Constructor for the SpinalContext class.
   * @param {String} name Name of the context
   * @param {String} type Type of the context, usually unused
   * @param {SpinalNode | Model} element Element of the context, usually unused
   */
  constructor(name = "undefined", type = "SpinalContext", element = new globalType.Model()) {
    super(name, type, element);
    this.add_attr({
      relationNames: new globalType.Lst()
    });
    this.info.id.set((0, _Utilities.guid)(this.constructor.name));
  }
  /**
   * Returns the relation names of the context.
   * @return {Lst<Str>} The relation names that the context knows
   */


  getRelationNames() {
    return this.relationNames;
  }
  /**
   * Adds relation names to the relation names known by the context.
   * @param {Array<String> | String} relationNames Names of the relations
   * @return {Boolean} Return false if all the relation names are already known
   */


  addRelationNames(relationNames) {
    let result = false;

    if (typeof relationNames === "string") {
      relationNames = [relationNames];
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = relationNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        let name = _step.value;

        if (!this.relationNames.contains(name)) {
          this.relationNames.push(name);
          result = true;
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

    return result;
  }
  /**
   * Adds a child with a SpinalRelationLstPtrType.
   * @param {SpinalNode | Model} child Node to add as child
   * @param {String} relationName Name of the relation
   * @param {String} relationType This parameter is here only to properly override the parent method
   * @return {Promise<SpinalNode>} The child node in a promise
   */


  addChild(child, relationName, relationType = _SpinalRelationFactory.SPINAL_RELATION_PTR_LST_TYPE) {
    var _superprop_callAddChild = (..._args) => super.addChild(..._args);

    return _asyncToGenerator(function* () {
      return _superprop_callAddChild(child, relationName, _SpinalRelationFactory.SPINAL_RELATION_PTR_LST_TYPE);
    })();
  }
  /**
   * Adds a child with a SpinalRelationLstPtrType and notices the context if a new relation was created.
   * @param {SpinalNode | Model} child Node to add as child
   * @param {String} relationName Name of the relation
   * @param {String} relationType This parameter is here only to properly override the parent method
   * @param {SpinalContext} context Context to update, usually unused
   * @return {Promise<SpinalNode>} The child node in a promise
   */


  addChildInContext(child, relationName, relationType = _SpinalRelationFactory.SPINAL_RELATION_PTR_LST_TYPE, context = this) {
    return super.addChildInContext(child, relationName, _SpinalRelationFactory.SPINAL_RELATION_PTR_LST_TYPE, context);
  }

}

_spinalCoreConnectorjs.default.register_models([SpinalContext]);

var _default = SpinalContext;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Ob2Rlcy9TcGluYWxDb250ZXh0LmpzIl0sIm5hbWVzIjpbImdsb2JhbFR5cGUiLCJ3aW5kb3ciLCJnbG9iYWwiLCJTcGluYWxDb250ZXh0IiwiU3BpbmFsTm9kZSIsImNvbnN0cnVjdG9yIiwibmFtZSIsInR5cGUiLCJlbGVtZW50IiwiTW9kZWwiLCJhZGRfYXR0ciIsInJlbGF0aW9uTmFtZXMiLCJMc3QiLCJpbmZvIiwiaWQiLCJzZXQiLCJnZXRSZWxhdGlvbk5hbWVzIiwiYWRkUmVsYXRpb25OYW1lcyIsInJlc3VsdCIsImNvbnRhaW5zIiwicHVzaCIsImFkZENoaWxkIiwiY2hpbGQiLCJyZWxhdGlvbk5hbWUiLCJyZWxhdGlvblR5cGUiLCJTUElOQUxfUkVMQVRJT05fUFRSX0xTVF9UWVBFIiwiYWRkQ2hpbGRJbkNvbnRleHQiLCJjb250ZXh0Iiwic3BpbmFsQ29yZSIsInJlZ2lzdGVyX21vZGVscyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQXVCQTs7QUFDQTs7QUFDQTs7QUFHQTs7Ozs7Ozs7QUFFQSxNQUFNQSxVQUFVLEdBQUcsT0FBT0MsTUFBUCxLQUFrQixXQUFsQixHQUFnQ0MsTUFBaEMsR0FBeUNELE1BQTVEOztBQUVBLE1BQU1FLGFBQU4sU0FBNEJDLG1CQUE1QixDQUF1QztBQUNuQzs7Ozs7O0FBTUFDLEVBQUFBLFdBQVcsQ0FBQ0MsSUFBSSxHQUFHLFdBQVIsRUFBcUJDLElBQUksR0FBRyxlQUE1QixFQUE2Q0MsT0FBTyxHQUFHLElBQUlSLFVBQVUsQ0FBQ1MsS0FBZixFQUF2RCxFQUE2RTtBQUNwRixVQUFNSCxJQUFOLEVBQVlDLElBQVosRUFBa0JDLE9BQWxCO0FBQ0EsU0FBS0UsUUFBTCxDQUFjO0FBQ1ZDLE1BQUFBLGFBQWEsRUFBRSxJQUFJWCxVQUFVLENBQUNZLEdBQWY7QUFETCxLQUFkO0FBR0EsU0FBS0MsSUFBTCxDQUFVQyxFQUFWLENBQWFDLEdBQWIsQ0FBaUIscUJBQUssS0FBS1YsV0FBTCxDQUFpQkMsSUFBdEIsQ0FBakI7QUFDSDtBQUVEOzs7Ozs7QUFJQVUsRUFBQUEsZ0JBQWdCLEdBQUc7QUFDZixXQUFPLEtBQUtMLGFBQVo7QUFDSDtBQUVEOzs7Ozs7O0FBS0FNLEVBQUFBLGdCQUFnQixDQUFDTixhQUFELEVBQWdCO0FBQzVCLFFBQUlPLE1BQU0sR0FBRyxLQUFiOztBQUVBLFFBQUksT0FBT1AsYUFBUCxLQUF5QixRQUE3QixFQUF1QztBQUNuQ0EsTUFBQUEsYUFBYSxHQUFHLENBQUNBLGFBQUQsQ0FBaEI7QUFDSDs7QUFMMkI7QUFBQTtBQUFBOztBQUFBO0FBTzVCLDJCQUFpQkEsYUFBakIsOEhBQWdDO0FBQUEsWUFBdkJMLElBQXVCOztBQUM1QixZQUFJLENBQUMsS0FBS0ssYUFBTCxDQUFtQlEsUUFBbkIsQ0FBNEJiLElBQTVCLENBQUwsRUFBd0M7QUFDcEMsZUFBS0ssYUFBTCxDQUFtQlMsSUFBbkIsQ0FBd0JkLElBQXhCO0FBQ0FZLFVBQUFBLE1BQU0sR0FBRyxJQUFUO0FBQ0g7QUFDSjtBQVoyQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQWE1QixXQUFPQSxNQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7O0FBT01HLEVBQUFBLFFBQU4sQ0FBZUMsS0FBZixFQUFzQkMsWUFBdEIsRUFBb0NDLFlBQVksR0FBR0MsbURBQW5ELEVBQWlGO0FBQUE7O0FBQUE7QUFDN0UsYUFBTyx3QkFBZUgsS0FBZixFQUFzQkMsWUFBdEIsRUFBb0NFLG1EQUFwQyxDQUFQO0FBRDZFO0FBRWhGO0FBRUQ7Ozs7Ozs7Ozs7QUFRQUMsRUFBQUEsaUJBQWlCLENBQUNKLEtBQUQsRUFBUUMsWUFBUixFQUFzQkMsWUFBWSxHQUFHQyxtREFBckMsRUFBbUVFLE9BQU8sR0FBRyxJQUE3RSxFQUFtRjtBQUNoRyxXQUFPLE1BQU1ELGlCQUFOLENBQXdCSixLQUF4QixFQUErQkMsWUFBL0IsRUFBNkNFLG1EQUE3QyxFQUEyRUUsT0FBM0UsQ0FBUDtBQUNIOztBQWpFa0M7O0FBb0V2Q0MsK0JBQVdDLGVBQVgsQ0FBMkIsQ0FBQzFCLGFBQUQsQ0FBM0I7O2VBQ2VBLGEiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTggU3BpbmFsQ29tIC0gd3d3LnNwaW5hbGNvbS5jb21cbiAqIFxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgU3BpbmFsQ29yZS5cbiAqIFxuICogUGxlYXNlIHJlYWQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgdGVybXMgYW5kIGNvbmRpdGlvbnNcbiAqIG9mIHRoZSBGcmVlIFNvZnR3YXJlIGxpY2Vuc2UgQWdyZWVtZW50IChcIkFncmVlbWVudFwiKVxuICogY2FyZWZ1bGx5LlxuICogXG4gKiBUaGlzIEFncmVlbWVudCBpcyBhIGxlZ2FsbHkgYmluZGluZyBjb250cmFjdCBiZXR3ZWVuXG4gKiB0aGUgTGljZW5zZWUgKGFzIGRlZmluZWQgYmVsb3cpIGFuZCBTcGluYWxDb20gdGhhdFxuICogc2V0cyBmb3J0aCB0aGUgdGVybXMgYW5kIGNvbmRpdGlvbnMgdGhhdCBnb3Zlcm4geW91clxuICogdXNlIG9mIHRoZSBQcm9ncmFtLiBCeSBpbnN0YWxsaW5nIGFuZC9vciB1c2luZyB0aGVcbiAqIFByb2dyYW0sIHlvdSBhZ3JlZSB0byBhYmlkZSBieSBhbGwgdGhlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucyBzdGF0ZWQgb3IgcmVmZXJlbmNlZCBoZXJlaW4uXG4gKiBcbiAqIElmIHlvdSBkbyBub3QgYWdyZWUgdG8gYWJpZGUgYnkgdGhlc2UgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zLCBkbyBub3QgZGVtb25zdHJhdGUgeW91ciBhY2NlcHRhbmNlIGFuZCBkb1xuICogbm90IGluc3RhbGwgb3IgdXNlIHRoZSBQcm9ncmFtLlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbG9uZ1xuICogd2l0aCB0aGlzIGZpbGUuIElmIG5vdCwgc2VlXG4gKiA8aHR0cDovL3Jlc291cmNlcy5zcGluYWxjb20uY29tL2xpY2Vuc2VzLnBkZj4uXG4gKi9cbmltcG9ydCBTcGluYWxOb2RlIGZyb20gXCIuL1NwaW5hbE5vZGVcIjtcbmltcG9ydCBzcGluYWxDb3JlIGZyb20gXCJzcGluYWwtY29yZS1jb25uZWN0b3Jqc1wiO1xuaW1wb3J0IHtcbiAgICBTUElOQUxfUkVMQVRJT05fUFRSX0xTVF9UWVBFXG59IGZyb20gXCIuLi9SZWxhdGlvbnMvU3BpbmFsUmVsYXRpb25GYWN0b3J5XCI7XG5pbXBvcnQgeyBndWlkIH0gZnJvbSBcIi4uL1V0aWxpdGllc1wiO1xuXG5jb25zdCBnbG9iYWxUeXBlID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHdpbmRvdztcblxuY2xhc3MgU3BpbmFsQ29udGV4dCBleHRlbmRzIFNwaW5hbE5vZGUge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yIGZvciB0aGUgU3BpbmFsQ29udGV4dCBjbGFzcy5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBOYW1lIG9mIHRoZSBjb250ZXh0XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgVHlwZSBvZiB0aGUgY29udGV4dCwgdXN1YWxseSB1bnVzZWRcbiAgICAgKiBAcGFyYW0ge1NwaW5hbE5vZGUgfCBNb2RlbH0gZWxlbWVudCBFbGVtZW50IG9mIHRoZSBjb250ZXh0LCB1c3VhbGx5IHVudXNlZFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUgPSBcInVuZGVmaW5lZFwiLCB0eXBlID0gXCJTcGluYWxDb250ZXh0XCIsIGVsZW1lbnQgPSBuZXcgZ2xvYmFsVHlwZS5Nb2RlbCkge1xuICAgICAgICBzdXBlcihuYW1lLCB0eXBlLCBlbGVtZW50KTtcbiAgICAgICAgdGhpcy5hZGRfYXR0cih7XG4gICAgICAgICAgICByZWxhdGlvbk5hbWVzOiBuZXcgZ2xvYmFsVHlwZS5Mc3QoKVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5pbmZvLmlkLnNldChndWlkKHRoaXMuY29uc3RydWN0b3IubmFtZSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHJlbGF0aW9uIG5hbWVzIG9mIHRoZSBjb250ZXh0LlxuICAgICAqIEByZXR1cm4ge0xzdDxTdHI+fSBUaGUgcmVsYXRpb24gbmFtZXMgdGhhdCB0aGUgY29udGV4dCBrbm93c1xuICAgICAqL1xuICAgIGdldFJlbGF0aW9uTmFtZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbGF0aW9uTmFtZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyByZWxhdGlvbiBuYW1lcyB0byB0aGUgcmVsYXRpb24gbmFtZXMga25vd24gYnkgdGhlIGNvbnRleHQuXG4gICAgICogQHBhcmFtIHtBcnJheTxTdHJpbmc+IHwgU3RyaW5nfSByZWxhdGlvbk5hbWVzIE5hbWVzIG9mIHRoZSByZWxhdGlvbnNcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBSZXR1cm4gZmFsc2UgaWYgYWxsIHRoZSByZWxhdGlvbiBuYW1lcyBhcmUgYWxyZWFkeSBrbm93blxuICAgICAqL1xuICAgIGFkZFJlbGF0aW9uTmFtZXMocmVsYXRpb25OYW1lcykge1xuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHR5cGVvZiByZWxhdGlvbk5hbWVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICByZWxhdGlvbk5hbWVzID0gW3JlbGF0aW9uTmFtZXNdO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgbmFtZSBvZiByZWxhdGlvbk5hbWVzKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMucmVsYXRpb25OYW1lcy5jb250YWlucyhuYW1lKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVsYXRpb25OYW1lcy5wdXNoKG5hbWUpO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgY2hpbGQgd2l0aCBhIFNwaW5hbFJlbGF0aW9uTHN0UHRyVHlwZS5cbiAgICAgKiBAcGFyYW0ge1NwaW5hbE5vZGUgfCBNb2RlbH0gY2hpbGQgTm9kZSB0byBhZGQgYXMgY2hpbGRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcmVsYXRpb25OYW1lIE5hbWUgb2YgdGhlIHJlbGF0aW9uXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHJlbGF0aW9uVHlwZSBUaGlzIHBhcmFtZXRlciBpcyBoZXJlIG9ubHkgdG8gcHJvcGVybHkgb3ZlcnJpZGUgdGhlIHBhcmVudCBtZXRob2RcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPFNwaW5hbE5vZGU+fSBUaGUgY2hpbGQgbm9kZSBpbiBhIHByb21pc2VcbiAgICAgKi9cbiAgICBhc3luYyBhZGRDaGlsZChjaGlsZCwgcmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUgPSBTUElOQUxfUkVMQVRJT05fUFRSX0xTVF9UWVBFKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5hZGRDaGlsZChjaGlsZCwgcmVsYXRpb25OYW1lLCBTUElOQUxfUkVMQVRJT05fUFRSX0xTVF9UWVBFKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgY2hpbGQgd2l0aCBhIFNwaW5hbFJlbGF0aW9uTHN0UHRyVHlwZSBhbmQgbm90aWNlcyB0aGUgY29udGV4dCBpZiBhIG5ldyByZWxhdGlvbiB3YXMgY3JlYXRlZC5cbiAgICAgKiBAcGFyYW0ge1NwaW5hbE5vZGUgfCBNb2RlbH0gY2hpbGQgTm9kZSB0byBhZGQgYXMgY2hpbGRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcmVsYXRpb25OYW1lIE5hbWUgb2YgdGhlIHJlbGF0aW9uXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHJlbGF0aW9uVHlwZSBUaGlzIHBhcmFtZXRlciBpcyBoZXJlIG9ubHkgdG8gcHJvcGVybHkgb3ZlcnJpZGUgdGhlIHBhcmVudCBtZXRob2RcbiAgICAgKiBAcGFyYW0ge1NwaW5hbENvbnRleHR9IGNvbnRleHQgQ29udGV4dCB0byB1cGRhdGUsIHVzdWFsbHkgdW51c2VkXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxTcGluYWxOb2RlPn0gVGhlIGNoaWxkIG5vZGUgaW4gYSBwcm9taXNlXG4gICAgICovXG4gICAgYWRkQ2hpbGRJbkNvbnRleHQoY2hpbGQsIHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlID0gU1BJTkFMX1JFTEFUSU9OX1BUUl9MU1RfVFlQRSwgY29udGV4dCA9IHRoaXMpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmFkZENoaWxkSW5Db250ZXh0KGNoaWxkLCByZWxhdGlvbk5hbWUsIFNQSU5BTF9SRUxBVElPTl9QVFJfTFNUX1RZUEUsIGNvbnRleHQpO1xuICAgIH1cbn1cblxuc3BpbmFsQ29yZS5yZWdpc3Rlcl9tb2RlbHMoW1NwaW5hbENvbnRleHRdKTtcbmV4cG9ydCBkZWZhdWx0IFNwaW5hbENvbnRleHQ7XG4iXX0=