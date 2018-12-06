"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SpinalNode = _interopRequireDefault(require("./SpinalNode"));

var _spinalCoreConnectorjs = _interopRequireDefault(require("spinal-core-connectorjs"));

var _SpinalRelationFactory = require("../Relations/SpinalRelationFactory");

var _Utilities = require("../Utilities");

var _SpinalContext = _interopRequireDefault(require("./SpinalContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const globalType = typeof window === "undefined" ? global : window;
const HAS_CONTEXT_RELATION_NAME = "hasContext";

class SpinalGraph extends _SpinalNode.default {
  /**
   * Constructor for the SpinalGraph class.
   * @param {String} name Name of the graph, usually unused
   * @param {String} type Type of the graph, usually unused
   * @param {SpinalNode | Model} element Element of the graph, usually unused
   */
  constructor(name = "undefined", type = "SpinalGraph", element = new globalType.Model()) {
    super(name, type, element);
    this.add_attr({
      BIMObjects: new globalType.Lst()
    });

    this._createRelation(HAS_CONTEXT_RELATION_NAME, _SpinalRelationFactory.SPINAL_RELATION_TYPE);

    this.info.id.set((0, _Utilities.guid)(this.constructor.name));
  }
  /**
   * Adds a context to the graph.
   * @param {SpinalContext} context Context to be added
   * @return {Promise<nothing>} An empty promise
   */


  addContext(context) {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (context instanceof _SpinalContext.default) return _this.addChild(context, HAS_CONTEXT_RELATION_NAME, _SpinalRelationFactory.SPINAL_RELATION_TYPE);else throw new Error("Cannot add an element which is not a context");
    })();
  }
  /**
   * Searches for a context using its name.
   * @param {String} name Name of the context
   * @return {SpinalContext | undefined} The wanted context or undefined
   */


  getContext(name) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      let children = yield _this2.getChildren([HAS_CONTEXT_RELATION_NAME]);
      return children.find(child => child.info.name.get() === name);
    })();
  }
  /**
   * Empty override of the SpinalNode method.
   * @return {Promise<nothing>} An empty promise
   */


  removeFromGraph() {
    return _asyncToGenerator(function* () {})();
  }

}

_spinalCoreConnectorjs.default.register_models([SpinalGraph]);

var _default = SpinalGraph;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Ob2Rlcy9TcGluYWxHcmFwaC5qcyJdLCJuYW1lcyI6WyJnbG9iYWxUeXBlIiwid2luZG93IiwiZ2xvYmFsIiwiSEFTX0NPTlRFWFRfUkVMQVRJT05fTkFNRSIsIlNwaW5hbEdyYXBoIiwiU3BpbmFsTm9kZSIsImNvbnN0cnVjdG9yIiwibmFtZSIsInR5cGUiLCJlbGVtZW50IiwiTW9kZWwiLCJhZGRfYXR0ciIsIkJJTU9iamVjdHMiLCJMc3QiLCJfY3JlYXRlUmVsYXRpb24iLCJTUElOQUxfUkVMQVRJT05fVFlQRSIsImluZm8iLCJpZCIsInNldCIsImFkZENvbnRleHQiLCJjb250ZXh0IiwiU3BpbmFsQ29udGV4dCIsImFkZENoaWxkIiwiRXJyb3IiLCJnZXRDb250ZXh0IiwiY2hpbGRyZW4iLCJnZXRDaGlsZHJlbiIsImZpbmQiLCJjaGlsZCIsImdldCIsInJlbW92ZUZyb21HcmFwaCIsInNwaW5hbENvcmUiLCJyZWdpc3Rlcl9tb2RlbHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUF1QkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRUEsTUFBTUEsVUFBVSxHQUFHLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NDLE1BQWhDLEdBQXlDRCxNQUE1RDtBQUNBLE1BQU1FLHlCQUF5QixHQUFHLFlBQWxDOztBQUVBLE1BQU1DLFdBQU4sU0FBMEJDLG1CQUExQixDQUFxQztBQUNqQzs7Ozs7O0FBTUFDLEVBQUFBLFdBQVcsQ0FBQ0MsSUFBSSxHQUFHLFdBQVIsRUFBcUJDLElBQUksR0FBRyxhQUE1QixFQUEyQ0MsT0FBTyxHQUFHLElBQUlULFVBQVUsQ0FBQ1UsS0FBZixFQUFyRCxFQUEyRTtBQUNsRixVQUFNSCxJQUFOLEVBQVlDLElBQVosRUFBa0JDLE9BQWxCO0FBQ0EsU0FBS0UsUUFBTCxDQUFjO0FBQ1ZDLE1BQUFBLFVBQVUsRUFBRSxJQUFJWixVQUFVLENBQUNhLEdBQWY7QUFERixLQUFkOztBQUlBLFNBQUtDLGVBQUwsQ0FBcUJYLHlCQUFyQixFQUFnRFksMkNBQWhEOztBQUNBLFNBQUtDLElBQUwsQ0FBVUMsRUFBVixDQUFhQyxHQUFiLENBQWlCLHFCQUFLLEtBQUtaLFdBQUwsQ0FBaUJDLElBQXRCLENBQWpCO0FBQ0g7QUFFRDs7Ozs7OztBQUtNWSxFQUFBQSxVQUFOLENBQWlCQyxPQUFqQixFQUEwQjtBQUFBOztBQUFBO0FBQ3RCLFVBQUlBLE9BQU8sWUFBWUMsc0JBQXZCLEVBQ0ksT0FBTyxLQUFJLENBQUNDLFFBQUwsQ0FBY0YsT0FBZCxFQUF1QmpCLHlCQUF2QixFQUFrRFksMkNBQWxELENBQVAsQ0FESixLQUdJLE1BQU0sSUFBSVEsS0FBSixDQUFVLDhDQUFWLENBQU47QUFKa0I7QUFLekI7QUFFRDs7Ozs7OztBQUtNQyxFQUFBQSxVQUFOLENBQWlCakIsSUFBakIsRUFBdUI7QUFBQTs7QUFBQTtBQUNuQixVQUFJa0IsUUFBUSxTQUFTLE1BQUksQ0FBQ0MsV0FBTCxDQUFpQixDQUFDdkIseUJBQUQsQ0FBakIsQ0FBckI7QUFFQSxhQUFPc0IsUUFBUSxDQUFDRSxJQUFULENBQWNDLEtBQUssSUFBSUEsS0FBSyxDQUFDWixJQUFOLENBQVdULElBQVgsQ0FBZ0JzQixHQUFoQixPQUEwQnRCLElBQWpELENBQVA7QUFIbUI7QUFJdEI7QUFFRDs7Ozs7O0FBSU11QixFQUFBQSxlQUFOLEdBQXdCO0FBQUE7QUFFdkI7O0FBOUNnQzs7QUFpRHJDQywrQkFBV0MsZUFBWCxDQUEyQixDQUFDNUIsV0FBRCxDQUEzQjs7ZUFDZUEsVyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOCBTcGluYWxDb20gLSB3d3cuc3BpbmFsY29tLmNvbVxuICogXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBTcGluYWxDb3JlLlxuICogXG4gKiBQbGVhc2UgcmVhZCBhbGwgb2YgdGhlIGZvbGxvd2luZyB0ZXJtcyBhbmQgY29uZGl0aW9uc1xuICogb2YgdGhlIEZyZWUgU29mdHdhcmUgbGljZW5zZSBBZ3JlZW1lbnQgKFwiQWdyZWVtZW50XCIpXG4gKiBjYXJlZnVsbHkuXG4gKiBcbiAqIFRoaXMgQWdyZWVtZW50IGlzIGEgbGVnYWxseSBiaW5kaW5nIGNvbnRyYWN0IGJldHdlZW5cbiAqIHRoZSBMaWNlbnNlZSAoYXMgZGVmaW5lZCBiZWxvdykgYW5kIFNwaW5hbENvbSB0aGF0XG4gKiBzZXRzIGZvcnRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyB0aGF0IGdvdmVybiB5b3VyXG4gKiB1c2Ugb2YgdGhlIFByb2dyYW0uIEJ5IGluc3RhbGxpbmcgYW5kL29yIHVzaW5nIHRoZVxuICogUHJvZ3JhbSwgeW91IGFncmVlIHRvIGFiaWRlIGJ5IGFsbCB0aGUgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zIHN0YXRlZCBvciByZWZlcmVuY2VkIGhlcmVpbi5cbiAqIFxuICogSWYgeW91IGRvIG5vdCBhZ3JlZSB0byBhYmlkZSBieSB0aGVzZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMsIGRvIG5vdCBkZW1vbnN0cmF0ZSB5b3VyIGFjY2VwdGFuY2UgYW5kIGRvXG4gKiBub3QgaW5zdGFsbCBvciB1c2UgdGhlIFByb2dyYW0uXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFsb25nXG4gKiB3aXRoIHRoaXMgZmlsZS4gSWYgbm90LCBzZWVcbiAqIDxodHRwOi8vcmVzb3VyY2VzLnNwaW5hbGNvbS5jb20vbGljZW5zZXMucGRmPi5cbiAqL1xuaW1wb3J0IFNwaW5hbE5vZGUgZnJvbSBcIi4vU3BpbmFsTm9kZVwiXG5pbXBvcnQgc3BpbmFsQ29yZSBmcm9tIFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNcIjtcbmltcG9ydCB7IFNQSU5BTF9SRUxBVElPTl9UWVBFIH0gZnJvbSBcIi4uL1JlbGF0aW9ucy9TcGluYWxSZWxhdGlvbkZhY3RvcnlcIlxuaW1wb3J0IHsgZ3VpZCB9IGZyb20gXCIuLi9VdGlsaXRpZXNcIjtcbmltcG9ydCBTcGluYWxDb250ZXh0IGZyb20gXCIuL1NwaW5hbENvbnRleHRcIjtcblxuY29uc3QgZ2xvYmFsVHlwZSA9IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB3aW5kb3c7XG5jb25zdCBIQVNfQ09OVEVYVF9SRUxBVElPTl9OQU1FID0gXCJoYXNDb250ZXh0XCI7XG5cbmNsYXNzIFNwaW5hbEdyYXBoIGV4dGVuZHMgU3BpbmFsTm9kZSB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3IgZm9yIHRoZSBTcGluYWxHcmFwaCBjbGFzcy5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBOYW1lIG9mIHRoZSBncmFwaCwgdXN1YWxseSB1bnVzZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSBUeXBlIG9mIHRoZSBncmFwaCwgdXN1YWxseSB1bnVzZWRcbiAgICAgKiBAcGFyYW0ge1NwaW5hbE5vZGUgfCBNb2RlbH0gZWxlbWVudCBFbGVtZW50IG9mIHRoZSBncmFwaCwgdXN1YWxseSB1bnVzZWRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lID0gXCJ1bmRlZmluZWRcIiwgdHlwZSA9IFwiU3BpbmFsR3JhcGhcIiwgZWxlbWVudCA9IG5ldyBnbG9iYWxUeXBlLk1vZGVsKSB7XG4gICAgICAgIHN1cGVyKG5hbWUsIHR5cGUsIGVsZW1lbnQpO1xuICAgICAgICB0aGlzLmFkZF9hdHRyKHtcbiAgICAgICAgICAgIEJJTU9iamVjdHM6IG5ldyBnbG9iYWxUeXBlLkxzdCgpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX2NyZWF0ZVJlbGF0aW9uKEhBU19DT05URVhUX1JFTEFUSU9OX05BTUUsIFNQSU5BTF9SRUxBVElPTl9UWVBFKTtcbiAgICAgICAgdGhpcy5pbmZvLmlkLnNldChndWlkKHRoaXMuY29uc3RydWN0b3IubmFtZSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBjb250ZXh0IHRvIHRoZSBncmFwaC5cbiAgICAgKiBAcGFyYW0ge1NwaW5hbENvbnRleHR9IGNvbnRleHQgQ29udGV4dCB0byBiZSBhZGRlZFxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8bm90aGluZz59IEFuIGVtcHR5IHByb21pc2VcbiAgICAgKi9cbiAgICBhc3luYyBhZGRDb250ZXh0KGNvbnRleHQpIHtcbiAgICAgICAgaWYgKGNvbnRleHQgaW5zdGFuY2VvZiBTcGluYWxDb250ZXh0KVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRkQ2hpbGQoY29udGV4dCwgSEFTX0NPTlRFWFRfUkVMQVRJT05fTkFNRSwgU1BJTkFMX1JFTEFUSU9OX1RZUEUpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgYWRkIGFuIGVsZW1lbnQgd2hpY2ggaXMgbm90IGEgY29udGV4dFwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWFyY2hlcyBmb3IgYSBjb250ZXh0IHVzaW5nIGl0cyBuYW1lLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIE5hbWUgb2YgdGhlIGNvbnRleHRcbiAgICAgKiBAcmV0dXJuIHtTcGluYWxDb250ZXh0IHwgdW5kZWZpbmVkfSBUaGUgd2FudGVkIGNvbnRleHQgb3IgdW5kZWZpbmVkXG4gICAgICovXG4gICAgYXN5bmMgZ2V0Q29udGV4dChuYW1lKSB7XG4gICAgICAgIGxldCBjaGlsZHJlbiA9IGF3YWl0IHRoaXMuZ2V0Q2hpbGRyZW4oW0hBU19DT05URVhUX1JFTEFUSU9OX05BTUVdKTtcblxuICAgICAgICByZXR1cm4gY2hpbGRyZW4uZmluZChjaGlsZCA9PiBjaGlsZC5pbmZvLm5hbWUuZ2V0KCkgPT09IG5hbWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVtcHR5IG92ZXJyaWRlIG9mIHRoZSBTcGluYWxOb2RlIG1ldGhvZC5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPG5vdGhpbmc+fSBBbiBlbXB0eSBwcm9taXNlXG4gICAgICovXG4gICAgYXN5bmMgcmVtb3ZlRnJvbUdyYXBoKCkge1xuXG4gICAgfVxufVxuXG5zcGluYWxDb3JlLnJlZ2lzdGVyX21vZGVscyhbU3BpbmFsR3JhcGhdKTtcbmV4cG9ydCBkZWZhdWx0IFNwaW5hbEdyYXBoO1xuIl19