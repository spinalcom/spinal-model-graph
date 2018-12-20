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
/**
 * Starting node of a graph.
 * @extends SpinalNode
 */

class SpinalGraph extends _SpinalNode.default {
  /**
   * Constructor for the SpinalGraph class.
   * @param {String} [name="undefined"] Name of the graph, usually unused
   * @param {String} [type="SpinalGraph"] Type of the graph, usually unused
   * @param {SpinalNode | Model} [element] Element of the graph
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
   * @override
   * @returns {Promise<nothing>} An empty promise
   */


  removeFromGraph() {
    return _asyncToGenerator(function* () {})();
  }

}

_spinalCoreConnectorjs.default.register_models([SpinalGraph]);

var _default = SpinalGraph;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Ob2Rlcy9TcGluYWxHcmFwaC5qcyJdLCJuYW1lcyI6WyJIQVNfQ09OVEVYVF9SRUxBVElPTl9OQU1FIiwiU3BpbmFsR3JhcGgiLCJTcGluYWxOb2RlIiwiY29uc3RydWN0b3IiLCJuYW1lIiwidHlwZSIsImVsZW1lbnQiLCJpbmZvIiwiaWQiLCJzZXQiLCJhZGRDb250ZXh0IiwiY29udGV4dCIsIlNwaW5hbENvbnRleHQiLCJUeXBlRXJyb3IiLCJhZGRDaGlsZCIsIlNQSU5BTF9SRUxBVElPTl9UWVBFIiwiZ2V0Q29udGV4dCIsImNoaWxkcmVuIiwiZ2V0Q2hpbGRyZW4iLCJmaW5kIiwiY2hpbGQiLCJnZXQiLCJyZW1vdmVGcm9tR3JhcGgiLCJzcGluYWxDb3JlIiwicmVnaXN0ZXJfbW9kZWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBdUJBOztBQUNBOztBQUNBOztBQUdBOztBQUdBOzs7Ozs7OztBQUVBLE1BQU1BLHlCQUF5QixHQUFHLFlBQWxDO0FBRUE7Ozs7O0FBSUEsTUFBTUMsV0FBTixTQUEwQkMsbUJBQTFCLENBQXFDO0FBQ25DOzs7Ozs7O0FBT0FDLEVBQUFBLFdBQVcsQ0FBQ0MsSUFBRCxFQUFPQyxJQUFJLEdBQUcsYUFBZCxFQUE2QkMsT0FBN0IsRUFBc0M7QUFDL0MsVUFBTUYsSUFBTixFQUFZQyxJQUFaLEVBQWtCQyxPQUFsQjtBQUVBLFNBQUtDLElBQUwsQ0FBVUMsRUFBVixDQUFhQyxHQUFiLENBQWlCLHFCQUFLLEtBQUtOLFdBQUwsQ0FBaUJDLElBQXRCLENBQWpCO0FBQ0Q7QUFFRDs7Ozs7Ozs7QUFNTU0sRUFBQUEsVUFBTixDQUFpQkMsT0FBakIsRUFBMEI7QUFBQTs7QUFBQTtBQUN4QixVQUFJLEVBQUVBLE9BQU8sWUFBWUMsc0JBQXJCLENBQUosRUFBeUM7QUFDdkMsY0FBTSxJQUFJQyxTQUFKLENBQWMsMkJBQWQsQ0FBTjtBQUNEOztBQUVELGFBQU8sS0FBSSxDQUFDQyxRQUFMLENBQWNILE9BQWQsRUFBdUJYLHlCQUF2QixFQUFrRGUsMkNBQWxELENBQVA7QUFMd0I7QUFNekI7QUFFRDs7Ozs7Ozs7QUFNTUMsRUFBQUEsVUFBTixDQUFpQlosSUFBakIsRUFBdUI7QUFBQTs7QUFBQTtBQUNyQixVQUFJLE9BQU9BLElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7QUFDNUIsY0FBTVMsU0FBUyxDQUFDLHFCQUFELENBQWY7QUFDRDs7QUFFRCxZQUFNSSxRQUFRLFNBQVMsTUFBSSxDQUFDQyxXQUFMLENBQWlCLENBQUNsQix5QkFBRCxDQUFqQixDQUF2QjtBQUNBLGFBQU9pQixRQUFRLENBQUNFLElBQVQsQ0FBY0MsS0FBSyxJQUFJQSxLQUFLLENBQUNiLElBQU4sQ0FBV0gsSUFBWCxDQUFnQmlCLEdBQWhCLE9BQTBCakIsSUFBakQsQ0FBUDtBQU5xQjtBQU90QjtBQUVEOzs7Ozs7O0FBS01rQixFQUFBQSxlQUFOLEdBQXdCO0FBQUE7QUFFdkI7O0FBbERrQzs7QUFxRHJDQywrQkFBV0MsZUFBWCxDQUEyQixDQUFDdkIsV0FBRCxDQUEzQjs7ZUFDZUEsVyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOCBTcGluYWxDb20gLSB3d3cuc3BpbmFsY29tLmNvbVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFNwaW5hbENvcmUuXG4gKlxuICogUGxlYXNlIHJlYWQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgdGVybXMgYW5kIGNvbmRpdGlvbnNcbiAqIG9mIHRoZSBGcmVlIFNvZnR3YXJlIGxpY2Vuc2UgQWdyZWVtZW50IChcIkFncmVlbWVudFwiKVxuICogY2FyZWZ1bGx5LlxuICpcbiAqIFRoaXMgQWdyZWVtZW50IGlzIGEgbGVnYWxseSBiaW5kaW5nIGNvbnRyYWN0IGJldHdlZW5cbiAqIHRoZSBMaWNlbnNlZSAoYXMgZGVmaW5lZCBiZWxvdykgYW5kIFNwaW5hbENvbSB0aGF0XG4gKiBzZXRzIGZvcnRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyB0aGF0IGdvdmVybiB5b3VyXG4gKiB1c2Ugb2YgdGhlIFByb2dyYW0uIEJ5IGluc3RhbGxpbmcgYW5kL29yIHVzaW5nIHRoZVxuICogUHJvZ3JhbSwgeW91IGFncmVlIHRvIGFiaWRlIGJ5IGFsbCB0aGUgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zIHN0YXRlZCBvciByZWZlcmVuY2VkIGhlcmVpbi5cbiAqXG4gKiBJZiB5b3UgZG8gbm90IGFncmVlIHRvIGFiaWRlIGJ5IHRoZXNlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucywgZG8gbm90IGRlbW9uc3RyYXRlIHlvdXIgYWNjZXB0YW5jZSBhbmQgZG9cbiAqIG5vdCBpbnN0YWxsIG9yIHVzZSB0aGUgUHJvZ3JhbS5cbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYWxvbmdcbiAqIHdpdGggdGhpcyBmaWxlLiBJZiBub3QsIHNlZVxuICogPGh0dHA6Ly9yZXNvdXJjZXMuc3BpbmFsY29tLmNvbS9saWNlbnNlcy5wZGY+LlxuICovXG5pbXBvcnQgU3BpbmFsTm9kZSBmcm9tIFwiLi9TcGluYWxOb2RlXCI7XG5pbXBvcnQgc3BpbmFsQ29yZSBmcm9tIFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNcIjtcbmltcG9ydCB7XG4gIFNQSU5BTF9SRUxBVElPTl9UWVBFXG59IGZyb20gXCIuLi9SZWxhdGlvbnMvU3BpbmFsUmVsYXRpb25GYWN0b3J5XCI7XG5pbXBvcnQge1xuICBndWlkXG59IGZyb20gXCIuLi9VdGlsaXRpZXNcIjtcbmltcG9ydCBTcGluYWxDb250ZXh0IGZyb20gXCIuL1NwaW5hbENvbnRleHRcIjtcblxuY29uc3QgSEFTX0NPTlRFWFRfUkVMQVRJT05fTkFNRSA9IFwiaGFzQ29udGV4dFwiO1xuXG4vKipcbiAqIFN0YXJ0aW5nIG5vZGUgb2YgYSBncmFwaC5cbiAqIEBleHRlbmRzIFNwaW5hbE5vZGVcbiAqL1xuY2xhc3MgU3BpbmFsR3JhcGggZXh0ZW5kcyBTcGluYWxOb2RlIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yIGZvciB0aGUgU3BpbmFsR3JhcGggY2xhc3MuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbbmFtZT1cInVuZGVmaW5lZFwiXSBOYW1lIG9mIHRoZSBncmFwaCwgdXN1YWxseSB1bnVzZWRcbiAgICogQHBhcmFtIHtTdHJpbmd9IFt0eXBlPVwiU3BpbmFsR3JhcGhcIl0gVHlwZSBvZiB0aGUgZ3JhcGgsIHVzdWFsbHkgdW51c2VkXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZSB8IE1vZGVsfSBbZWxlbWVudF0gRWxlbWVudCBvZiB0aGUgZ3JhcGhcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgZWxlbWVudCBpcyBub3QgYSBNb2RlbFxuICAgKi9cbiAgY29uc3RydWN0b3IobmFtZSwgdHlwZSA9IFwiU3BpbmFsR3JhcGhcIiwgZWxlbWVudCkge1xuICAgIHN1cGVyKG5hbWUsIHR5cGUsIGVsZW1lbnQpO1xuXG4gICAgdGhpcy5pbmZvLmlkLnNldChndWlkKHRoaXMuY29uc3RydWN0b3IubmFtZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjb250ZXh0IHRvIHRoZSBncmFwaC5cbiAgICogQHBhcmFtIHtTcGluYWxDb250ZXh0fSBjb250ZXh0IENvbnRleHQgdG8gYmUgYWRkZWRcbiAgICogQHJldHVybnMge1Byb21pc2U8U3BpbmFsQ29udGV4dD59IFRoZSBhZGRlZCBjb250ZXh0XG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIGNvbnRleHQgaXMgbm90IGEgY29udGV4dFxuICAgKi9cbiAgYXN5bmMgYWRkQ29udGV4dChjb250ZXh0KSB7XG4gICAgaWYgKCEoY29udGV4dCBpbnN0YW5jZW9mIFNwaW5hbENvbnRleHQpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiY29udGV4dCBtdXN0IGJlIGEgY29udGV4dFwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5hZGRDaGlsZChjb250ZXh0LCBIQVNfQ09OVEVYVF9SRUxBVElPTl9OQU1FLCBTUElOQUxfUkVMQVRJT05fVFlQRSk7XG4gIH1cblxuICAvKipcbiAgICogU2VhcmNoZXMgZm9yIGEgY29udGV4dCB1c2luZyBpdHMgbmFtZS5cbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgTmFtZSBvZiB0aGUgY29udGV4dFxuICAgKiBAcmV0dXJucyB7U3BpbmFsQ29udGV4dCB8IHVuZGVmaW5lZH0gVGhlIHdhbnRlZCBjb250ZXh0IG9yIHVuZGVmaW5lZFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIG5hbWUgaXMgbm90IGEgc3RyaW5nXG4gICAqL1xuICBhc3luYyBnZXRDb250ZXh0KG5hbWUpIHtcbiAgICBpZiAodHlwZW9mIG5hbWUgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcIm5hbWUgbXVzdCBiZSBzdHJpbmdcIik7XG4gICAgfVxuXG4gICAgY29uc3QgY2hpbGRyZW4gPSBhd2FpdCB0aGlzLmdldENoaWxkcmVuKFtIQVNfQ09OVEVYVF9SRUxBVElPTl9OQU1FXSk7XG4gICAgcmV0dXJuIGNoaWxkcmVuLmZpbmQoY2hpbGQgPT4gY2hpbGQuaW5mby5uYW1lLmdldCgpID09PSBuYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbXB0eSBvdmVycmlkZSBvZiB0aGUgU3BpbmFsTm9kZSBtZXRob2QuXG4gICAqIEBvdmVycmlkZVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxub3RoaW5nPn0gQW4gZW1wdHkgcHJvbWlzZVxuICAgKi9cbiAgYXN5bmMgcmVtb3ZlRnJvbUdyYXBoKCkge1xuXG4gIH1cbn1cblxuc3BpbmFsQ29yZS5yZWdpc3Rlcl9tb2RlbHMoW1NwaW5hbEdyYXBoXSk7XG5leHBvcnQgZGVmYXVsdCBTcGluYWxHcmFwaDtcbiJdfQ==