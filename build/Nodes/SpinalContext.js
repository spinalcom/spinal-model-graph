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

/*
 * Copyright 2018 SpinalCom - www.spinalcom.com
 *
 * This file is part of SpinalCore.
 *
 * Please read all of the following terms and conditions
 * of the Free Software license Agreement ("Agreement")
 * carefully.
 *
 * This Agreement is a legally binding contract between
 * the Licensee (as defined below) and SpinalCom that
 * sets forth the terms and conditions that govern your
 * use of the Program. By installing and/or using the
 * Program, you agree to abide by all the terms and
 * conditions stated or referenced herein.
 *
 * If you do not agree to abide by these terms and
 * conditions, do not demonstrate your acceptance and do
 * not install or use the Program.
 * You should have received a copy of the license along
 * with this file. If not, see
 * <http://resources.spinalcom.com/licenses.pdf>.
 */

/**
 * A SpinalContext is the statring node of a part of the graph.
 * @extends SpinalNode
 */
class SpinalContext extends _SpinalNode.default {
  /**
   * Constructor for the SpinalContext class.
   * @param {String} name Name of the context
   * @param {String} type Type of the context, usually unused
   * @param {SpinalNode | Model} element Element of the context
   * @throws {TypeError} If the element is not a Model
   */
  constructor(name, type = "SpinalContext", element) {
    super(name, type, element);
    this.info.id.set((0, _Utilities.guid)(this.constructor.name));
  }
  /**
   * Adds a child with a SpinalRelationLstPtrType.
   * @param {SpinalNode | Model} child Node to add as child
   * @param {String} relationName Name of the relation
   * @param {String} relationType This parameter is here only to properly override the parent method
   * @returns {Promise<SpinalNode>} The child node in a promise
   * @throws {TypeError} If the child is not a model
   * @throws {TypeError} If the relation name is not a string
   */


  addChild(child, relationName, relationType = _SpinalRelationFactory.SPINAL_RELATION_PTR_LST_TYPE) {
    return super.addChild(child, relationName, _SpinalRelationFactory.SPINAL_RELATION_PTR_LST_TYPE);
  }
  /**
   * Adds a child with a SpinalRelationLstPtrType and notices the context if a new relation was created.
   * @param {SpinalNode | Model} child Node to add as child
   * @param {String} relationName Name of the relation
   * @param {String} relationType This parameter is here only to properly override the parent method
   * @param {SpinalContext} context Context to update, usually unused
   * @returns {Promise<SpinalNode>} The child node in a promise
   */


  addChildInContext(child, relationName, relationType = _SpinalRelationFactory.SPINAL_RELATION_PTR_LST_TYPE, context = this) {
    return super.addChildInContext(child, relationName, _SpinalRelationFactory.SPINAL_RELATION_PTR_LST_TYPE, context);
  }
  /**
   * Return the children of the node that are registered in the context
   * @param {SpinalContext} context Context to use for the search, this by default
   * @returns {Promise<Array<SpinalNode>>} The children that were found
   */


  getChildrenInContext(context = this) {
    return super.getChildrenInContext(context);
  }

}

_spinalCoreConnectorjs.default.register_models([SpinalContext]);

var _default = SpinalContext;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Ob2Rlcy9TcGluYWxDb250ZXh0LmpzIl0sIm5hbWVzIjpbIlNwaW5hbENvbnRleHQiLCJTcGluYWxOb2RlIiwiY29uc3RydWN0b3IiLCJuYW1lIiwidHlwZSIsImVsZW1lbnQiLCJpbmZvIiwiaWQiLCJzZXQiLCJhZGRDaGlsZCIsImNoaWxkIiwicmVsYXRpb25OYW1lIiwicmVsYXRpb25UeXBlIiwiU1BJTkFMX1JFTEFUSU9OX1BUUl9MU1RfVFlQRSIsImFkZENoaWxkSW5Db250ZXh0IiwiY29udGV4dCIsImdldENoaWxkcmVuSW5Db250ZXh0Iiwic3BpbmFsQ29yZSIsInJlZ2lzdGVyX21vZGVscyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQXVCQTs7QUFDQTs7QUFDQTs7QUFHQTs7OztBQTVCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0NBOzs7O0FBSUEsTUFBTUEsYUFBTixTQUE0QkMsbUJBQTVCLENBQXVDO0FBQ3JDOzs7Ozs7O0FBT0FDLEVBQUFBLFdBQVcsQ0FBQ0MsSUFBRCxFQUFPQyxJQUFJLEdBQUcsZUFBZCxFQUErQkMsT0FBL0IsRUFBd0M7QUFDakQsVUFBTUYsSUFBTixFQUFZQyxJQUFaLEVBQWtCQyxPQUFsQjtBQUVBLFNBQUtDLElBQUwsQ0FBVUMsRUFBVixDQUFhQyxHQUFiLENBQWlCLHFCQUFLLEtBQUtOLFdBQUwsQ0FBaUJDLElBQXRCLENBQWpCO0FBQ0Q7QUFFRDs7Ozs7Ozs7Ozs7QUFTQU0sRUFBQUEsUUFBUSxDQUFDQyxLQUFELEVBQVFDLFlBQVIsRUFBc0JDLFlBQVksR0FBR0MsbURBQXJDLEVBQW1FO0FBQ3pFLFdBQU8sTUFBTUosUUFBTixDQUFlQyxLQUFmLEVBQXNCQyxZQUF0QixFQUFvQ0UsbURBQXBDLENBQVA7QUFDRDtBQUVEOzs7Ozs7Ozs7O0FBUUFDLEVBQUFBLGlCQUFpQixDQUFDSixLQUFELEVBQVFDLFlBQVIsRUFBc0JDLFlBQVksR0FBR0MsbURBQXJDLEVBQW1FRSxPQUFPLEdBQUcsSUFBN0UsRUFBbUY7QUFDbEcsV0FBTyxNQUFNRCxpQkFBTixDQUF3QkosS0FBeEIsRUFBK0JDLFlBQS9CLEVBQTZDRSxtREFBN0MsRUFBMkVFLE9BQTNFLENBQVA7QUFDRDtBQUVEOzs7Ozs7O0FBS0FDLEVBQUFBLG9CQUFvQixDQUFDRCxPQUFPLEdBQUcsSUFBWCxFQUFpQjtBQUNuQyxXQUFPLE1BQU1DLG9CQUFOLENBQTJCRCxPQUEzQixDQUFQO0FBQ0Q7O0FBOUNvQzs7QUFpRHZDRSwrQkFBV0MsZUFBWCxDQUEyQixDQUFDbEIsYUFBRCxDQUEzQjs7ZUFDZUEsYSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOCBTcGluYWxDb20gLSB3d3cuc3BpbmFsY29tLmNvbVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFNwaW5hbENvcmUuXG4gKlxuICogUGxlYXNlIHJlYWQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgdGVybXMgYW5kIGNvbmRpdGlvbnNcbiAqIG9mIHRoZSBGcmVlIFNvZnR3YXJlIGxpY2Vuc2UgQWdyZWVtZW50IChcIkFncmVlbWVudFwiKVxuICogY2FyZWZ1bGx5LlxuICpcbiAqIFRoaXMgQWdyZWVtZW50IGlzIGEgbGVnYWxseSBiaW5kaW5nIGNvbnRyYWN0IGJldHdlZW5cbiAqIHRoZSBMaWNlbnNlZSAoYXMgZGVmaW5lZCBiZWxvdykgYW5kIFNwaW5hbENvbSB0aGF0XG4gKiBzZXRzIGZvcnRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyB0aGF0IGdvdmVybiB5b3VyXG4gKiB1c2Ugb2YgdGhlIFByb2dyYW0uIEJ5IGluc3RhbGxpbmcgYW5kL29yIHVzaW5nIHRoZVxuICogUHJvZ3JhbSwgeW91IGFncmVlIHRvIGFiaWRlIGJ5IGFsbCB0aGUgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zIHN0YXRlZCBvciByZWZlcmVuY2VkIGhlcmVpbi5cbiAqXG4gKiBJZiB5b3UgZG8gbm90IGFncmVlIHRvIGFiaWRlIGJ5IHRoZXNlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucywgZG8gbm90IGRlbW9uc3RyYXRlIHlvdXIgYWNjZXB0YW5jZSBhbmQgZG9cbiAqIG5vdCBpbnN0YWxsIG9yIHVzZSB0aGUgUHJvZ3JhbS5cbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYWxvbmdcbiAqIHdpdGggdGhpcyBmaWxlLiBJZiBub3QsIHNlZVxuICogPGh0dHA6Ly9yZXNvdXJjZXMuc3BpbmFsY29tLmNvbS9saWNlbnNlcy5wZGY+LlxuICovXG5pbXBvcnQgU3BpbmFsTm9kZSBmcm9tIFwiLi9TcGluYWxOb2RlXCI7XG5pbXBvcnQgc3BpbmFsQ29yZSBmcm9tIFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNcIjtcbmltcG9ydCB7XG4gIFNQSU5BTF9SRUxBVElPTl9QVFJfTFNUX1RZUEVcbn0gZnJvbSBcIi4uL1JlbGF0aW9ucy9TcGluYWxSZWxhdGlvbkZhY3RvcnlcIjtcbmltcG9ydCB7XG4gIGd1aWRcbn0gZnJvbSBcIi4uL1V0aWxpdGllc1wiO1xuXG4vKipcbiAqIEEgU3BpbmFsQ29udGV4dCBpcyB0aGUgc3RhdHJpbmcgbm9kZSBvZiBhIHBhcnQgb2YgdGhlIGdyYXBoLlxuICogQGV4dGVuZHMgU3BpbmFsTm9kZVxuICovXG5jbGFzcyBTcGluYWxDb250ZXh0IGV4dGVuZHMgU3BpbmFsTm9kZSB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIFNwaW5hbENvbnRleHQgY2xhc3MuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIE5hbWUgb2YgdGhlIGNvbnRleHRcbiAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgVHlwZSBvZiB0aGUgY29udGV4dCwgdXN1YWxseSB1bnVzZWRcbiAgICogQHBhcmFtIHtTcGluYWxOb2RlIHwgTW9kZWx9IGVsZW1lbnQgRWxlbWVudCBvZiB0aGUgY29udGV4dFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBlbGVtZW50IGlzIG5vdCBhIE1vZGVsXG4gICAqL1xuICBjb25zdHJ1Y3RvcihuYW1lLCB0eXBlID0gXCJTcGluYWxDb250ZXh0XCIsIGVsZW1lbnQpIHtcbiAgICBzdXBlcihuYW1lLCB0eXBlLCBlbGVtZW50KTtcblxuICAgIHRoaXMuaW5mby5pZC5zZXQoZ3VpZCh0aGlzLmNvbnN0cnVjdG9yLm5hbWUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgY2hpbGQgd2l0aCBhIFNwaW5hbFJlbGF0aW9uTHN0UHRyVHlwZS5cbiAgICogQHBhcmFtIHtTcGluYWxOb2RlIHwgTW9kZWx9IGNoaWxkIE5vZGUgdG8gYWRkIGFzIGNoaWxkXG4gICAqIEBwYXJhbSB7U3RyaW5nfSByZWxhdGlvbk5hbWUgTmFtZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHJlbGF0aW9uVHlwZSBUaGlzIHBhcmFtZXRlciBpcyBoZXJlIG9ubHkgdG8gcHJvcGVybHkgb3ZlcnJpZGUgdGhlIHBhcmVudCBtZXRob2RcbiAgICogQHJldHVybnMge1Byb21pc2U8U3BpbmFsTm9kZT59IFRoZSBjaGlsZCBub2RlIGluIGEgcHJvbWlzZVxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBjaGlsZCBpcyBub3QgYSBtb2RlbFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSByZWxhdGlvbiBuYW1lIGlzIG5vdCBhIHN0cmluZ1xuICAgKi9cbiAgYWRkQ2hpbGQoY2hpbGQsIHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlID0gU1BJTkFMX1JFTEFUSU9OX1BUUl9MU1RfVFlQRSkge1xuICAgIHJldHVybiBzdXBlci5hZGRDaGlsZChjaGlsZCwgcmVsYXRpb25OYW1lLCBTUElOQUxfUkVMQVRJT05fUFRSX0xTVF9UWVBFKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgY2hpbGQgd2l0aCBhIFNwaW5hbFJlbGF0aW9uTHN0UHRyVHlwZSBhbmQgbm90aWNlcyB0aGUgY29udGV4dCBpZiBhIG5ldyByZWxhdGlvbiB3YXMgY3JlYXRlZC5cbiAgICogQHBhcmFtIHtTcGluYWxOb2RlIHwgTW9kZWx9IGNoaWxkIE5vZGUgdG8gYWRkIGFzIGNoaWxkXG4gICAqIEBwYXJhbSB7U3RyaW5nfSByZWxhdGlvbk5hbWUgTmFtZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHJlbGF0aW9uVHlwZSBUaGlzIHBhcmFtZXRlciBpcyBoZXJlIG9ubHkgdG8gcHJvcGVybHkgb3ZlcnJpZGUgdGhlIHBhcmVudCBtZXRob2RcbiAgICogQHBhcmFtIHtTcGluYWxDb250ZXh0fSBjb250ZXh0IENvbnRleHQgdG8gdXBkYXRlLCB1c3VhbGx5IHVudXNlZFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxTcGluYWxOb2RlPn0gVGhlIGNoaWxkIG5vZGUgaW4gYSBwcm9taXNlXG4gICAqL1xuICBhZGRDaGlsZEluQ29udGV4dChjaGlsZCwgcmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUgPSBTUElOQUxfUkVMQVRJT05fUFRSX0xTVF9UWVBFLCBjb250ZXh0ID0gdGhpcykge1xuICAgIHJldHVybiBzdXBlci5hZGRDaGlsZEluQ29udGV4dChjaGlsZCwgcmVsYXRpb25OYW1lLCBTUElOQUxfUkVMQVRJT05fUFRSX0xTVF9UWVBFLCBjb250ZXh0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGNoaWxkcmVuIG9mIHRoZSBub2RlIHRoYXQgYXJlIHJlZ2lzdGVyZWQgaW4gdGhlIGNvbnRleHRcbiAgICogQHBhcmFtIHtTcGluYWxDb250ZXh0fSBjb250ZXh0IENvbnRleHQgdG8gdXNlIGZvciB0aGUgc2VhcmNoLCB0aGlzIGJ5IGRlZmF1bHRcbiAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8U3BpbmFsTm9kZT4+fSBUaGUgY2hpbGRyZW4gdGhhdCB3ZXJlIGZvdW5kXG4gICAqL1xuICBnZXRDaGlsZHJlbkluQ29udGV4dChjb250ZXh0ID0gdGhpcykge1xuICAgIHJldHVybiBzdXBlci5nZXRDaGlsZHJlbkluQ29udGV4dChjb250ZXh0KTtcbiAgfVxufVxuXG5zcGluYWxDb3JlLnJlZ2lzdGVyX21vZGVscyhbU3BpbmFsQ29udGV4dF0pO1xuZXhwb3J0IGRlZmF1bHQgU3BpbmFsQ29udGV4dDtcbiJdfQ==