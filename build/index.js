"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "SpinalGraph", {
  enumerable: true,
  get: function get() {
    return _SpinalGraph.default;
  }
});
Object.defineProperty(exports, "SpinalNode", {
  enumerable: true,
  get: function get() {
    return _SpinalNode.default;
  }
});
Object.defineProperty(exports, "SpinalContext", {
  enumerable: true,
  get: function get() {
    return _SpinalContext.default;
  }
});
Object.defineProperty(exports, "SpinalRelationRef", {
  enumerable: true,
  get: function get() {
    return _SpinalRelationRef.default;
  }
});
Object.defineProperty(exports, "SpinalRelationLstPtr", {
  enumerable: true,
  get: function get() {
    return _SpinalRelationLstPtr.default;
  }
});
Object.defineProperty(exports, "SpinalRelationPtrLst", {
  enumerable: true,
  get: function get() {
    return _SpinalRelationPtrLst.default;
  }
});
Object.defineProperty(exports, "SpinalRelationFactory", {
  enumerable: true,
  get: function get() {
    return _SpinalRelationFactory.SpinalRelationFactory;
  }
});
Object.defineProperty(exports, "SPINAL_RELATION_TYPE", {
  enumerable: true,
  get: function get() {
    return _SpinalRelationFactory.SPINAL_RELATION_TYPE;
  }
});
Object.defineProperty(exports, "SPINAL_RELATION_LST_PTR_TYPE", {
  enumerable: true,
  get: function get() {
    return _SpinalRelationFactory.SPINAL_RELATION_LST_PTR_TYPE;
  }
});
Object.defineProperty(exports, "SPINAL_RELATION_PTR_LST_TYPE", {
  enumerable: true,
  get: function get() {
    return _SpinalRelationFactory.SPINAL_RELATION_PTR_LST_TYPE;
  }
});
exports.GraphFunction = void 0;

var _SpinalGraph = _interopRequireDefault(require("./Nodes/SpinalGraph"));

var _SpinalNode = _interopRequireDefault(require("./Nodes/SpinalNode"));

var _SpinalContext = _interopRequireDefault(require("./Nodes/SpinalContext"));

var _SpinalRelationRef = _interopRequireDefault(require("./Relations/SpinalRelationRef"));

var _SpinalRelationLstPtr = _interopRequireDefault(require("./Relations/SpinalRelationLstPtr"));

var _SpinalRelationPtrLst = _interopRequireDefault(require("./Relations/SpinalRelationPtrLst"));

var GraphFunction = _interopRequireWildcard(require("./GraphFunctionsLib/GraphFunctions"));

exports.GraphFunction = GraphFunction;

var _SpinalRelationFactory = require("./Relations/SpinalRelationFactory");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTggU3BpbmFsQ29tIC0gd3d3LnNwaW5hbGNvbS5jb21cbiAqIFxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgU3BpbmFsQ29yZS5cbiAqIFxuICogUGxlYXNlIHJlYWQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgdGVybXMgYW5kIGNvbmRpdGlvbnNcbiAqIG9mIHRoZSBGcmVlIFNvZnR3YXJlIGxpY2Vuc2UgQWdyZWVtZW50IChcIkFncmVlbWVudFwiKVxuICogY2FyZWZ1bGx5LlxuICogXG4gKiBUaGlzIEFncmVlbWVudCBpcyBhIGxlZ2FsbHkgYmluZGluZyBjb250cmFjdCBiZXR3ZWVuXG4gKiB0aGUgTGljZW5zZWUgKGFzIGRlZmluZWQgYmVsb3cpIGFuZCBTcGluYWxDb20gdGhhdFxuICogc2V0cyBmb3J0aCB0aGUgdGVybXMgYW5kIGNvbmRpdGlvbnMgdGhhdCBnb3Zlcm4geW91clxuICogdXNlIG9mIHRoZSBQcm9ncmFtLiBCeSBpbnN0YWxsaW5nIGFuZC9vciB1c2luZyB0aGVcbiAqIFByb2dyYW0sIHlvdSBhZ3JlZSB0byBhYmlkZSBieSBhbGwgdGhlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucyBzdGF0ZWQgb3IgcmVmZXJlbmNlZCBoZXJlaW4uXG4gKiBcbiAqIElmIHlvdSBkbyBub3QgYWdyZWUgdG8gYWJpZGUgYnkgdGhlc2UgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zLCBkbyBub3QgZGVtb25zdHJhdGUgeW91ciBhY2NlcHRhbmNlIGFuZCBkb1xuICogbm90IGluc3RhbGwgb3IgdXNlIHRoZSBQcm9ncmFtLlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbG9uZ1xuICogd2l0aCB0aGlzIGZpbGUuIElmIG5vdCwgc2VlXG4gKiA8aHR0cDovL3Jlc291cmNlcy5zcGluYWxjb20uY29tL2xpY2Vuc2VzLnBkZj4uXG4gKi9cbmltcG9ydCBTcGluYWxHcmFwaCBmcm9tIFwiLi9Ob2Rlcy9TcGluYWxHcmFwaFwiXG5pbXBvcnQgU3BpbmFsTm9kZSBmcm9tIFwiLi9Ob2Rlcy9TcGluYWxOb2RlXCJcbmltcG9ydCBTcGluYWxDb250ZXh0IGZyb20gXCIuL05vZGVzL1NwaW5hbENvbnRleHRcIlxuaW1wb3J0IFNwaW5hbFJlbGF0aW9uUmVmIGZyb20gXCIuL1JlbGF0aW9ucy9TcGluYWxSZWxhdGlvblJlZlwiXG5pbXBvcnQgU3BpbmFsUmVsYXRpb25Mc3RQdHIgZnJvbSBcIi4vUmVsYXRpb25zL1NwaW5hbFJlbGF0aW9uTHN0UHRyXCJcbmltcG9ydCBTcGluYWxSZWxhdGlvblB0ckxzdCBmcm9tIFwiLi9SZWxhdGlvbnMvU3BpbmFsUmVsYXRpb25QdHJMc3RcIlxuaW1wb3J0ICogYXMgR3JhcGhGdW5jdGlvbiBmcm9tIFwiLi9HcmFwaEZ1bmN0aW9uc0xpYi9HcmFwaEZ1bmN0aW9uc1wiXG5pbXBvcnQge1xuICAgIFNwaW5hbFJlbGF0aW9uRmFjdG9yeSwgU1BJTkFMX1JFTEFUSU9OX1RZUEUsXG4gICAgU1BJTkFMX1JFTEFUSU9OX0xTVF9QVFJfVFlQRSxcbiAgICBTUElOQUxfUkVMQVRJT05fUFRSX0xTVF9UWVBFXG59IGZyb20gXCIuL1JlbGF0aW9ucy9TcGluYWxSZWxhdGlvbkZhY3RvcnlcIlxuXG5leHBvcnQge1xuICAgIFNwaW5hbEdyYXBoLFxuICAgIFNwaW5hbE5vZGUsXG4gICAgU3BpbmFsQ29udGV4dCxcbiAgICBTcGluYWxSZWxhdGlvblJlZixcbiAgICBTcGluYWxSZWxhdGlvbkxzdFB0cixcbiAgICBTcGluYWxSZWxhdGlvblB0ckxzdCxcbiAgICBTcGluYWxSZWxhdGlvbkZhY3RvcnksXG4gICAgU1BJTkFMX1JFTEFUSU9OX1RZUEUsXG4gICAgU1BJTkFMX1JFTEFUSU9OX0xTVF9QVFJfVFlQRSxcbiAgICBTUElOQUxfUkVMQVRJT05fUFRSX0xTVF9UWVBFLFxuICAgIEdyYXBoRnVuY3Rpb25cbn07XG4iXX0=