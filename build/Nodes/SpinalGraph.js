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

const HAS_CONTEXT_RELATION_NAME = "hasContext";

class SpinalGraph extends _SpinalNode.default {
  /**
   * Constructor for the SpinalGraph class.
   * @param {String} name Name of the graph, usually unused
   * @param {String} type Type of the graph, usually unused
   * @param {SpinalNode | Model} element Element of the graph
   * @throws {TypeError} If the element is not a Model
   */
  constructor(name, type = "SpinalGraph", element) {
    super(name, type, element);
    this.info.id.set((0, _Utilities.guid)(this.constructor.name));
  }
  /**
   * Adds a context to the graph.
   * @param {SpinalContext} context Context to be added
   * @returns {Promise<SpinalContext>} The added context
   * @throws {TypeError} If the context is not a context
   */


  addContext(context) {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (!(context instanceof _SpinalContext.default)) {
        throw new TypeError("context must be a context");
      }

      return _this.addChild(context, HAS_CONTEXT_RELATION_NAME, _SpinalRelationFactory.SPINAL_RELATION_TYPE);
    })();
  }
  /**
   * Searches for a context using its name.
   * @param {String} name Name of the context
   * @returns {SpinalContext | undefined} The wanted context or undefined
   * @throws {TypeError} If name is not a string
   */


  getContext(name) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      if (typeof name !== "string") {
        throw TypeError("name must be string");
      }

      const children = yield _this2.getChildren([HAS_CONTEXT_RELATION_NAME]);
      return children.find(child => child.info.name.get() === name);
    })();
  }
  /**
   * Empty override of the SpinalNode method.
   * @returns {Promise<nothing>} An empty promise
   */


  removeFromGraph() {
    return _asyncToGenerator(function* () {})();
  }

}

_spinalCoreConnectorjs.default.register_models([SpinalGraph]);

var _default = SpinalGraph;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Ob2Rlcy9TcGluYWxHcmFwaC5qcyJdLCJuYW1lcyI6WyJIQVNfQ09OVEVYVF9SRUxBVElPTl9OQU1FIiwiU3BpbmFsR3JhcGgiLCJTcGluYWxOb2RlIiwiY29uc3RydWN0b3IiLCJuYW1lIiwidHlwZSIsImVsZW1lbnQiLCJpbmZvIiwiaWQiLCJzZXQiLCJhZGRDb250ZXh0IiwiY29udGV4dCIsIlNwaW5hbENvbnRleHQiLCJUeXBlRXJyb3IiLCJhZGRDaGlsZCIsIlNQSU5BTF9SRUxBVElPTl9UWVBFIiwiZ2V0Q29udGV4dCIsImNoaWxkcmVuIiwiZ2V0Q2hpbGRyZW4iLCJmaW5kIiwiY2hpbGQiLCJnZXQiLCJyZW1vdmVGcm9tR3JhcGgiLCJzcGluYWxDb3JlIiwicmVnaXN0ZXJfbW9kZWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBdUJBOztBQUNBOztBQUNBOztBQUdBOztBQUdBOzs7Ozs7OztBQUVBLE1BQU1BLHlCQUF5QixHQUFHLFlBQWxDOztBQUVBLE1BQU1DLFdBQU4sU0FBMEJDLG1CQUExQixDQUFxQztBQUNuQzs7Ozs7OztBQU9BQyxFQUFBQSxXQUFXLENBQUNDLElBQUQsRUFBT0MsSUFBSSxHQUFHLGFBQWQsRUFBNkJDLE9BQTdCLEVBQXNDO0FBQy9DLFVBQU1GLElBQU4sRUFBWUMsSUFBWixFQUFrQkMsT0FBbEI7QUFFQSxTQUFLQyxJQUFMLENBQVVDLEVBQVYsQ0FBYUMsR0FBYixDQUFpQixxQkFBSyxLQUFLTixXQUFMLENBQWlCQyxJQUF0QixDQUFqQjtBQUNEO0FBRUQ7Ozs7Ozs7O0FBTU1NLEVBQUFBLFVBQU4sQ0FBaUJDLE9BQWpCLEVBQTBCO0FBQUE7O0FBQUE7QUFDeEIsVUFBSSxFQUFFQSxPQUFPLFlBQVlDLHNCQUFyQixDQUFKLEVBQXlDO0FBQ3ZDLGNBQU0sSUFBSUMsU0FBSixDQUFjLDJCQUFkLENBQU47QUFDRDs7QUFFRCxhQUFPLEtBQUksQ0FBQ0MsUUFBTCxDQUFjSCxPQUFkLEVBQXVCWCx5QkFBdkIsRUFBa0RlLDJDQUFsRCxDQUFQO0FBTHdCO0FBTXpCO0FBRUQ7Ozs7Ozs7O0FBTU1DLEVBQUFBLFVBQU4sQ0FBaUJaLElBQWpCLEVBQXVCO0FBQUE7O0FBQUE7QUFDckIsVUFBSSxPQUFPQSxJQUFQLEtBQWdCLFFBQXBCLEVBQThCO0FBQzVCLGNBQU1TLFNBQVMsQ0FBQyxxQkFBRCxDQUFmO0FBQ0Q7O0FBRUQsWUFBTUksUUFBUSxTQUFTLE1BQUksQ0FBQ0MsV0FBTCxDQUFpQixDQUFDbEIseUJBQUQsQ0FBakIsQ0FBdkI7QUFDQSxhQUFPaUIsUUFBUSxDQUFDRSxJQUFULENBQWNDLEtBQUssSUFBSUEsS0FBSyxDQUFDYixJQUFOLENBQVdILElBQVgsQ0FBZ0JpQixHQUFoQixPQUEwQmpCLElBQWpELENBQVA7QUFOcUI7QUFPdEI7QUFFRDs7Ozs7O0FBSU1rQixFQUFBQSxlQUFOLEdBQXdCO0FBQUE7QUFFdkI7O0FBakRrQzs7QUFvRHJDQywrQkFBV0MsZUFBWCxDQUEyQixDQUFDdkIsV0FBRCxDQUEzQjs7ZUFDZUEsVyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOCBTcGluYWxDb20gLSB3d3cuc3BpbmFsY29tLmNvbVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFNwaW5hbENvcmUuXG4gKlxuICogUGxlYXNlIHJlYWQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgdGVybXMgYW5kIGNvbmRpdGlvbnNcbiAqIG9mIHRoZSBGcmVlIFNvZnR3YXJlIGxpY2Vuc2UgQWdyZWVtZW50IChcIkFncmVlbWVudFwiKVxuICogY2FyZWZ1bGx5LlxuICpcbiAqIFRoaXMgQWdyZWVtZW50IGlzIGEgbGVnYWxseSBiaW5kaW5nIGNvbnRyYWN0IGJldHdlZW5cbiAqIHRoZSBMaWNlbnNlZSAoYXMgZGVmaW5lZCBiZWxvdykgYW5kIFNwaW5hbENvbSB0aGF0XG4gKiBzZXRzIGZvcnRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyB0aGF0IGdvdmVybiB5b3VyXG4gKiB1c2Ugb2YgdGhlIFByb2dyYW0uIEJ5IGluc3RhbGxpbmcgYW5kL29yIHVzaW5nIHRoZVxuICogUHJvZ3JhbSwgeW91IGFncmVlIHRvIGFiaWRlIGJ5IGFsbCB0aGUgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zIHN0YXRlZCBvciByZWZlcmVuY2VkIGhlcmVpbi5cbiAqXG4gKiBJZiB5b3UgZG8gbm90IGFncmVlIHRvIGFiaWRlIGJ5IHRoZXNlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucywgZG8gbm90IGRlbW9uc3RyYXRlIHlvdXIgYWNjZXB0YW5jZSBhbmQgZG9cbiAqIG5vdCBpbnN0YWxsIG9yIHVzZSB0aGUgUHJvZ3JhbS5cbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYWxvbmdcbiAqIHdpdGggdGhpcyBmaWxlLiBJZiBub3QsIHNlZVxuICogPGh0dHA6Ly9yZXNvdXJjZXMuc3BpbmFsY29tLmNvbS9saWNlbnNlcy5wZGY+LlxuICovXG5pbXBvcnQgU3BpbmFsTm9kZSBmcm9tIFwiLi9TcGluYWxOb2RlXCI7XG5pbXBvcnQgc3BpbmFsQ29yZSBmcm9tIFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNcIjtcbmltcG9ydCB7XG4gIFNQSU5BTF9SRUxBVElPTl9UWVBFXG59IGZyb20gXCIuLi9SZWxhdGlvbnMvU3BpbmFsUmVsYXRpb25GYWN0b3J5XCI7XG5pbXBvcnQge1xuICBndWlkXG59IGZyb20gXCIuLi9VdGlsaXRpZXNcIjtcbmltcG9ydCBTcGluYWxDb250ZXh0IGZyb20gXCIuL1NwaW5hbENvbnRleHRcIjtcblxuY29uc3QgSEFTX0NPTlRFWFRfUkVMQVRJT05fTkFNRSA9IFwiaGFzQ29udGV4dFwiO1xuXG5jbGFzcyBTcGluYWxHcmFwaCBleHRlbmRzIFNwaW5hbE5vZGUge1xuICAvKipcbiAgICogQ29uc3RydWN0b3IgZm9yIHRoZSBTcGluYWxHcmFwaCBjbGFzcy5cbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgTmFtZSBvZiB0aGUgZ3JhcGgsIHVzdWFsbHkgdW51c2VkXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIFR5cGUgb2YgdGhlIGdyYXBoLCB1c3VhbGx5IHVudXNlZFxuICAgKiBAcGFyYW0ge1NwaW5hbE5vZGUgfCBNb2RlbH0gZWxlbWVudCBFbGVtZW50IG9mIHRoZSBncmFwaFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBlbGVtZW50IGlzIG5vdCBhIE1vZGVsXG4gICAqL1xuICBjb25zdHJ1Y3RvcihuYW1lLCB0eXBlID0gXCJTcGluYWxHcmFwaFwiLCBlbGVtZW50KSB7XG4gICAgc3VwZXIobmFtZSwgdHlwZSwgZWxlbWVudCk7XG5cbiAgICB0aGlzLmluZm8uaWQuc2V0KGd1aWQodGhpcy5jb25zdHJ1Y3Rvci5uYW1lKSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGNvbnRleHQgdG8gdGhlIGdyYXBoLlxuICAgKiBAcGFyYW0ge1NwaW5hbENvbnRleHR9IGNvbnRleHQgQ29udGV4dCB0byBiZSBhZGRlZFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxTcGluYWxDb250ZXh0Pn0gVGhlIGFkZGVkIGNvbnRleHRcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgY29udGV4dCBpcyBub3QgYSBjb250ZXh0XG4gICAqL1xuICBhc3luYyBhZGRDb250ZXh0KGNvbnRleHQpIHtcbiAgICBpZiAoIShjb250ZXh0IGluc3RhbmNlb2YgU3BpbmFsQ29udGV4dCkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJjb250ZXh0IG11c3QgYmUgYSBjb250ZXh0XCIpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmFkZENoaWxkKGNvbnRleHQsIEhBU19DT05URVhUX1JFTEFUSU9OX05BTUUsIFNQSU5BTF9SRUxBVElPTl9UWVBFKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWFyY2hlcyBmb3IgYSBjb250ZXh0IHVzaW5nIGl0cyBuYW1lLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBOYW1lIG9mIHRoZSBjb250ZXh0XG4gICAqIEByZXR1cm5zIHtTcGluYWxDb250ZXh0IHwgdW5kZWZpbmVkfSBUaGUgd2FudGVkIGNvbnRleHQgb3IgdW5kZWZpbmVkXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgbmFtZSBpcyBub3QgYSBzdHJpbmdcbiAgICovXG4gIGFzeW5jIGdldENvbnRleHQobmFtZSkge1xuICAgIGlmICh0eXBlb2YgbmFtZSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwibmFtZSBtdXN0IGJlIHN0cmluZ1wiKTtcbiAgICB9XG5cbiAgICBjb25zdCBjaGlsZHJlbiA9IGF3YWl0IHRoaXMuZ2V0Q2hpbGRyZW4oW0hBU19DT05URVhUX1JFTEFUSU9OX05BTUVdKTtcbiAgICByZXR1cm4gY2hpbGRyZW4uZmluZChjaGlsZCA9PiBjaGlsZC5pbmZvLm5hbWUuZ2V0KCkgPT09IG5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVtcHR5IG92ZXJyaWRlIG9mIHRoZSBTcGluYWxOb2RlIG1ldGhvZC5cbiAgICogQHJldHVybnMge1Byb21pc2U8bm90aGluZz59IEFuIGVtcHR5IHByb21pc2VcbiAgICovXG4gIGFzeW5jIHJlbW92ZUZyb21HcmFwaCgpIHtcblxuICB9XG59XG5cbnNwaW5hbENvcmUucmVnaXN0ZXJfbW9kZWxzKFtTcGluYWxHcmFwaF0pO1xuZXhwb3J0IGRlZmF1bHQgU3BpbmFsR3JhcGg7XG4iXX0=