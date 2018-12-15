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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Ob2Rlcy9TcGluYWxHcmFwaC5qcyJdLCJuYW1lcyI6WyJnbG9iYWxUeXBlIiwid2luZG93IiwiZ2xvYmFsIiwiSEFTX0NPTlRFWFRfUkVMQVRJT05fTkFNRSIsIlNwaW5hbEdyYXBoIiwiU3BpbmFsTm9kZSIsImNvbnN0cnVjdG9yIiwibmFtZSIsInR5cGUiLCJlbGVtZW50IiwiaW5mbyIsImlkIiwic2V0IiwiYWRkQ29udGV4dCIsImNvbnRleHQiLCJTcGluYWxDb250ZXh0IiwiVHlwZUVycm9yIiwiYWRkQ2hpbGQiLCJTUElOQUxfUkVMQVRJT05fVFlQRSIsImdldENvbnRleHQiLCJjaGlsZHJlbiIsImdldENoaWxkcmVuIiwiZmluZCIsImNoaWxkIiwiZ2V0IiwicmVtb3ZlRnJvbUdyYXBoIiwic3BpbmFsQ29yZSIsInJlZ2lzdGVyX21vZGVscyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQXVCQTs7QUFDQTs7QUFDQTs7QUFHQTs7QUFHQTs7Ozs7Ozs7QUFFQSxNQUFNQSxVQUFVLEdBQUcsT0FBT0MsTUFBUCxLQUFrQixXQUFsQixHQUFnQ0MsTUFBaEMsR0FBeUNELE1BQTVEO0FBQ0EsTUFBTUUseUJBQXlCLEdBQUcsWUFBbEM7O0FBRUEsTUFBTUMsV0FBTixTQUEwQkMsbUJBQTFCLENBQXFDO0FBQ25DOzs7Ozs7O0FBT0FDLEVBQUFBLFdBQVcsQ0FBQ0MsSUFBRCxFQUFPQyxJQUFJLEdBQUcsYUFBZCxFQUE2QkMsT0FBN0IsRUFBc0M7QUFDL0MsVUFBTUYsSUFBTixFQUFZQyxJQUFaLEVBQWtCQyxPQUFsQjtBQUVBLFNBQUtDLElBQUwsQ0FBVUMsRUFBVixDQUFhQyxHQUFiLENBQWlCLHFCQUFLLEtBQUtOLFdBQUwsQ0FBaUJDLElBQXRCLENBQWpCO0FBQ0Q7QUFFRDs7Ozs7Ozs7QUFNTU0sRUFBQUEsVUFBTixDQUFpQkMsT0FBakIsRUFBMEI7QUFBQTs7QUFBQTtBQUN4QixVQUFJLEVBQUVBLE9BQU8sWUFBWUMsc0JBQXJCLENBQUosRUFBeUM7QUFDdkMsY0FBTSxJQUFJQyxTQUFKLENBQWMsMkJBQWQsQ0FBTjtBQUNEOztBQUVELGFBQU8sS0FBSSxDQUFDQyxRQUFMLENBQWNILE9BQWQsRUFBdUJYLHlCQUF2QixFQUFrRGUsMkNBQWxELENBQVA7QUFMd0I7QUFNekI7QUFFRDs7Ozs7Ozs7QUFNTUMsRUFBQUEsVUFBTixDQUFpQlosSUFBakIsRUFBdUI7QUFBQTs7QUFBQTtBQUNyQixVQUFJLE9BQU9BLElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7QUFDNUIsY0FBTVMsU0FBUyxDQUFDLHFCQUFELENBQWY7QUFDRDs7QUFFRCxZQUFNSSxRQUFRLFNBQVMsTUFBSSxDQUFDQyxXQUFMLENBQWlCLENBQUNsQix5QkFBRCxDQUFqQixDQUF2QjtBQUNBLGFBQU9pQixRQUFRLENBQUNFLElBQVQsQ0FBY0MsS0FBSyxJQUFJQSxLQUFLLENBQUNiLElBQU4sQ0FBV0gsSUFBWCxDQUFnQmlCLEdBQWhCLE9BQTBCakIsSUFBakQsQ0FBUDtBQU5xQjtBQU90QjtBQUVEOzs7Ozs7QUFJTWtCLEVBQUFBLGVBQU4sR0FBd0I7QUFBQTtBQUV2Qjs7QUFqRGtDOztBQW9EckNDLCtCQUFXQyxlQUFYLENBQTJCLENBQUN2QixXQUFELENBQTNCOztlQUNlQSxXIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4IFNwaW5hbENvbSAtIHd3dy5zcGluYWxjb20uY29tXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgU3BpbmFsQ29yZS5cbiAqXG4gKiBQbGVhc2UgcmVhZCBhbGwgb2YgdGhlIGZvbGxvd2luZyB0ZXJtcyBhbmQgY29uZGl0aW9uc1xuICogb2YgdGhlIEZyZWUgU29mdHdhcmUgbGljZW5zZSBBZ3JlZW1lbnQgKFwiQWdyZWVtZW50XCIpXG4gKiBjYXJlZnVsbHkuXG4gKlxuICogVGhpcyBBZ3JlZW1lbnQgaXMgYSBsZWdhbGx5IGJpbmRpbmcgY29udHJhY3QgYmV0d2VlblxuICogdGhlIExpY2Vuc2VlIChhcyBkZWZpbmVkIGJlbG93KSBhbmQgU3BpbmFsQ29tIHRoYXRcbiAqIHNldHMgZm9ydGggdGhlIHRlcm1zIGFuZCBjb25kaXRpb25zIHRoYXQgZ292ZXJuIHlvdXJcbiAqIHVzZSBvZiB0aGUgUHJvZ3JhbS4gQnkgaW5zdGFsbGluZyBhbmQvb3IgdXNpbmcgdGhlXG4gKiBQcm9ncmFtLCB5b3UgYWdyZWUgdG8gYWJpZGUgYnkgYWxsIHRoZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMgc3RhdGVkIG9yIHJlZmVyZW5jZWQgaGVyZWluLlxuICpcbiAqIElmIHlvdSBkbyBub3QgYWdyZWUgdG8gYWJpZGUgYnkgdGhlc2UgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zLCBkbyBub3QgZGVtb25zdHJhdGUgeW91ciBhY2NlcHRhbmNlIGFuZCBkb1xuICogbm90IGluc3RhbGwgb3IgdXNlIHRoZSBQcm9ncmFtLlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbG9uZ1xuICogd2l0aCB0aGlzIGZpbGUuIElmIG5vdCwgc2VlXG4gKiA8aHR0cDovL3Jlc291cmNlcy5zcGluYWxjb20uY29tL2xpY2Vuc2VzLnBkZj4uXG4gKi9cbmltcG9ydCBTcGluYWxOb2RlIGZyb20gXCIuL1NwaW5hbE5vZGVcIjtcbmltcG9ydCBzcGluYWxDb3JlIGZyb20gXCJzcGluYWwtY29yZS1jb25uZWN0b3Jqc1wiO1xuaW1wb3J0IHtcbiAgU1BJTkFMX1JFTEFUSU9OX1RZUEVcbn0gZnJvbSBcIi4uL1JlbGF0aW9ucy9TcGluYWxSZWxhdGlvbkZhY3RvcnlcIjtcbmltcG9ydCB7XG4gIGd1aWRcbn0gZnJvbSBcIi4uL1V0aWxpdGllc1wiO1xuaW1wb3J0IFNwaW5hbENvbnRleHQgZnJvbSBcIi4vU3BpbmFsQ29udGV4dFwiO1xuXG5jb25zdCBnbG9iYWxUeXBlID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHdpbmRvdztcbmNvbnN0IEhBU19DT05URVhUX1JFTEFUSU9OX05BTUUgPSBcImhhc0NvbnRleHRcIjtcblxuY2xhc3MgU3BpbmFsR3JhcGggZXh0ZW5kcyBTcGluYWxOb2RlIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yIGZvciB0aGUgU3BpbmFsR3JhcGggY2xhc3MuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIE5hbWUgb2YgdGhlIGdyYXBoLCB1c3VhbGx5IHVudXNlZFxuICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSBUeXBlIG9mIHRoZSBncmFwaCwgdXN1YWxseSB1bnVzZWRcbiAgICogQHBhcmFtIHtTcGluYWxOb2RlIHwgTW9kZWx9IGVsZW1lbnQgRWxlbWVudCBvZiB0aGUgZ3JhcGhcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgZWxlbWVudCBpcyBub3QgYSBNb2RlbFxuICAgKi9cbiAgY29uc3RydWN0b3IobmFtZSwgdHlwZSA9IFwiU3BpbmFsR3JhcGhcIiwgZWxlbWVudCkge1xuICAgIHN1cGVyKG5hbWUsIHR5cGUsIGVsZW1lbnQpO1xuXG4gICAgdGhpcy5pbmZvLmlkLnNldChndWlkKHRoaXMuY29uc3RydWN0b3IubmFtZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjb250ZXh0IHRvIHRoZSBncmFwaC5cbiAgICogQHBhcmFtIHtTcGluYWxDb250ZXh0fSBjb250ZXh0IENvbnRleHQgdG8gYmUgYWRkZWRcbiAgICogQHJldHVybnMge1Byb21pc2U8U3BpbmFsQ29udGV4dD59IFRoZSBhZGRlZCBjb250ZXh0XG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIGNvbnRleHQgaXMgbm90IGEgY29udGV4dFxuICAgKi9cbiAgYXN5bmMgYWRkQ29udGV4dChjb250ZXh0KSB7XG4gICAgaWYgKCEoY29udGV4dCBpbnN0YW5jZW9mIFNwaW5hbENvbnRleHQpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiY29udGV4dCBtdXN0IGJlIGEgY29udGV4dFwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5hZGRDaGlsZChjb250ZXh0LCBIQVNfQ09OVEVYVF9SRUxBVElPTl9OQU1FLCBTUElOQUxfUkVMQVRJT05fVFlQRSk7XG4gIH1cblxuICAvKipcbiAgICogU2VhcmNoZXMgZm9yIGEgY29udGV4dCB1c2luZyBpdHMgbmFtZS5cbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgTmFtZSBvZiB0aGUgY29udGV4dFxuICAgKiBAcmV0dXJucyB7U3BpbmFsQ29udGV4dCB8IHVuZGVmaW5lZH0gVGhlIHdhbnRlZCBjb250ZXh0IG9yIHVuZGVmaW5lZFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIG5hbWUgaXMgbm90IGEgc3RyaW5nXG4gICAqL1xuICBhc3luYyBnZXRDb250ZXh0KG5hbWUpIHtcbiAgICBpZiAodHlwZW9mIG5hbWUgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcIm5hbWUgbXVzdCBiZSBzdHJpbmdcIik7XG4gICAgfVxuXG4gICAgY29uc3QgY2hpbGRyZW4gPSBhd2FpdCB0aGlzLmdldENoaWxkcmVuKFtIQVNfQ09OVEVYVF9SRUxBVElPTl9OQU1FXSk7XG4gICAgcmV0dXJuIGNoaWxkcmVuLmZpbmQoY2hpbGQgPT4gY2hpbGQuaW5mby5uYW1lLmdldCgpID09PSBuYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbXB0eSBvdmVycmlkZSBvZiB0aGUgU3BpbmFsTm9kZSBtZXRob2QuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPG5vdGhpbmc+fSBBbiBlbXB0eSBwcm9taXNlXG4gICAqL1xuICBhc3luYyByZW1vdmVGcm9tR3JhcGgoKSB7XG5cbiAgfVxufVxuXG5zcGluYWxDb3JlLnJlZ2lzdGVyX21vZGVscyhbU3BpbmFsR3JhcGhdKTtcbmV4cG9ydCBkZWZhdWx0IFNwaW5hbEdyYXBoO1xuIl19