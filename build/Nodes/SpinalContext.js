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
   * @param {String} [name="undefined"] Name of the context
   * @param {String} [type="SpinalContext"] Type of the context, usually unused
   * @param {SpinalNode | Model} [element] Element of the context
   * @throws {TypeError} If the element is not a Model
   */
  constructor(name, type = "SpinalContext", element) {
    super(name, type, element);
    this.info.id.set((0, _Utilities.guid)(this.constructor.name));
  }
  /**
   * Adds a child with a SpinalRelationLstPtrType.
   * @override
   * @param {SpinalNode | Model} child Node to add as child
   * @param {String} relationName Name of the relation
   * @param {String} [relationType=SPINAL_RELATION_PTR_LST_TYPE] This parameter is here only to properly override the parent method
   * @returns {Promise<SpinalNode>} The child node in a promise
   * @throws {TypeError} If the child is not a model
   * @throws {TypeError} If the relation name is not a string
   */


  addChild(child, relationName, relationType = _SpinalRelationFactory.SPINAL_RELATION_PTR_LST_TYPE) {
    return super.addChild(child, relationName, _SpinalRelationFactory.SPINAL_RELATION_PTR_LST_TYPE);
  }
  /**
   * Adds a child with a SpinalRelationLstPtrType and notices the context if a new relation was created.
   * @override
   * @param {SpinalNode | Model} child Node to add as child
   * @param {String} relationName Name of the relation
   * @param {String} [relationType=SPINAL_RELATION_PTR_LST_TYPE] This parameter is here only to properly override the parent method
   * @param {SpinalContext} context Context to update, usually unused
   * @returns {Promise<SpinalNode>} The child node in a promise
   */


  addChildInContext(child, relationName, relationType = _SpinalRelationFactory.SPINAL_RELATION_PTR_LST_TYPE, context = this) {
    return super.addChildInContext(child, relationName, _SpinalRelationFactory.SPINAL_RELATION_PTR_LST_TYPE, context);
  }
  /**
   * Return the children of the node that are registered in the context
   * @override
   * @param {SpinalContext} [context=this] Context to use for the search, this by default
   * @returns {Promise<Array<SpinalNode>>} The children that were found
   */


  getChildrenInContext(context = this) {
    return super.getChildrenInContext(context);
  }

}

_spinalCoreConnectorjs.default.register_models([SpinalContext]);

var _default = SpinalContext;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Ob2Rlcy9TcGluYWxDb250ZXh0LmpzIl0sIm5hbWVzIjpbIlNwaW5hbENvbnRleHQiLCJTcGluYWxOb2RlIiwiY29uc3RydWN0b3IiLCJuYW1lIiwidHlwZSIsImVsZW1lbnQiLCJpbmZvIiwiaWQiLCJzZXQiLCJhZGRDaGlsZCIsImNoaWxkIiwicmVsYXRpb25OYW1lIiwicmVsYXRpb25UeXBlIiwiU1BJTkFMX1JFTEFUSU9OX1BUUl9MU1RfVFlQRSIsImFkZENoaWxkSW5Db250ZXh0IiwiY29udGV4dCIsImdldENoaWxkcmVuSW5Db250ZXh0Iiwic3BpbmFsQ29yZSIsInJlZ2lzdGVyX21vZGVscyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQXVCQTs7QUFDQTs7QUFDQTs7QUFHQTs7OztBQTVCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0NBOzs7O0FBSUEsTUFBTUEsYUFBTixTQUE0QkMsbUJBQTVCLENBQXVDO0FBQ3JDOzs7Ozs7O0FBT0FDLEVBQUFBLFdBQVcsQ0FBQ0MsSUFBRCxFQUFPQyxJQUFJLEdBQUcsZUFBZCxFQUErQkMsT0FBL0IsRUFBd0M7QUFDakQsVUFBTUYsSUFBTixFQUFZQyxJQUFaLEVBQWtCQyxPQUFsQjtBQUVBLFNBQUtDLElBQUwsQ0FBVUMsRUFBVixDQUFhQyxHQUFiLENBQWlCLHFCQUFLLEtBQUtOLFdBQUwsQ0FBaUJDLElBQXRCLENBQWpCO0FBQ0Q7QUFFRDs7Ozs7Ozs7Ozs7O0FBVUFNLEVBQUFBLFFBQVEsQ0FBQ0MsS0FBRCxFQUFRQyxZQUFSLEVBQXNCQyxZQUFZLEdBQUdDLG1EQUFyQyxFQUFtRTtBQUN6RSxXQUFPLE1BQU1KLFFBQU4sQ0FBZUMsS0FBZixFQUFzQkMsWUFBdEIsRUFBb0NFLG1EQUFwQyxDQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7Ozs7QUFTQUMsRUFBQUEsaUJBQWlCLENBQUNKLEtBQUQsRUFBUUMsWUFBUixFQUFzQkMsWUFBWSxHQUFHQyxtREFBckMsRUFBbUVFLE9BQU8sR0FBRyxJQUE3RSxFQUFtRjtBQUNsRyxXQUFPLE1BQU1ELGlCQUFOLENBQXdCSixLQUF4QixFQUErQkMsWUFBL0IsRUFBNkNFLG1EQUE3QyxFQUEyRUUsT0FBM0UsQ0FBUDtBQUNEO0FBRUQ7Ozs7Ozs7O0FBTUFDLEVBQUFBLG9CQUFvQixDQUFDRCxPQUFPLEdBQUcsSUFBWCxFQUFpQjtBQUNuQyxXQUFPLE1BQU1DLG9CQUFOLENBQTJCRCxPQUEzQixDQUFQO0FBQ0Q7O0FBakRvQzs7QUFvRHZDRSwrQkFBV0MsZUFBWCxDQUEyQixDQUFDbEIsYUFBRCxDQUEzQjs7ZUFDZUEsYSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOCBTcGluYWxDb20gLSB3d3cuc3BpbmFsY29tLmNvbVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFNwaW5hbENvcmUuXG4gKlxuICogUGxlYXNlIHJlYWQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgdGVybXMgYW5kIGNvbmRpdGlvbnNcbiAqIG9mIHRoZSBGcmVlIFNvZnR3YXJlIGxpY2Vuc2UgQWdyZWVtZW50IChcIkFncmVlbWVudFwiKVxuICogY2FyZWZ1bGx5LlxuICpcbiAqIFRoaXMgQWdyZWVtZW50IGlzIGEgbGVnYWxseSBiaW5kaW5nIGNvbnRyYWN0IGJldHdlZW5cbiAqIHRoZSBMaWNlbnNlZSAoYXMgZGVmaW5lZCBiZWxvdykgYW5kIFNwaW5hbENvbSB0aGF0XG4gKiBzZXRzIGZvcnRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyB0aGF0IGdvdmVybiB5b3VyXG4gKiB1c2Ugb2YgdGhlIFByb2dyYW0uIEJ5IGluc3RhbGxpbmcgYW5kL29yIHVzaW5nIHRoZVxuICogUHJvZ3JhbSwgeW91IGFncmVlIHRvIGFiaWRlIGJ5IGFsbCB0aGUgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zIHN0YXRlZCBvciByZWZlcmVuY2VkIGhlcmVpbi5cbiAqXG4gKiBJZiB5b3UgZG8gbm90IGFncmVlIHRvIGFiaWRlIGJ5IHRoZXNlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucywgZG8gbm90IGRlbW9uc3RyYXRlIHlvdXIgYWNjZXB0YW5jZSBhbmQgZG9cbiAqIG5vdCBpbnN0YWxsIG9yIHVzZSB0aGUgUHJvZ3JhbS5cbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYWxvbmdcbiAqIHdpdGggdGhpcyBmaWxlLiBJZiBub3QsIHNlZVxuICogPGh0dHA6Ly9yZXNvdXJjZXMuc3BpbmFsY29tLmNvbS9saWNlbnNlcy5wZGY+LlxuICovXG5pbXBvcnQgU3BpbmFsTm9kZSBmcm9tIFwiLi9TcGluYWxOb2RlXCI7XG5pbXBvcnQgc3BpbmFsQ29yZSBmcm9tIFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNcIjtcbmltcG9ydCB7XG4gIFNQSU5BTF9SRUxBVElPTl9QVFJfTFNUX1RZUEVcbn0gZnJvbSBcIi4uL1JlbGF0aW9ucy9TcGluYWxSZWxhdGlvbkZhY3RvcnlcIjtcbmltcG9ydCB7XG4gIGd1aWRcbn0gZnJvbSBcIi4uL1V0aWxpdGllc1wiO1xuXG4vKipcbiAqIEEgU3BpbmFsQ29udGV4dCBpcyB0aGUgc3RhdHJpbmcgbm9kZSBvZiBhIHBhcnQgb2YgdGhlIGdyYXBoLlxuICogQGV4dGVuZHMgU3BpbmFsTm9kZVxuICovXG5jbGFzcyBTcGluYWxDb250ZXh0IGV4dGVuZHMgU3BpbmFsTm9kZSB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIFNwaW5hbENvbnRleHQgY2xhc3MuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbbmFtZT1cInVuZGVmaW5lZFwiXSBOYW1lIG9mIHRoZSBjb250ZXh0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbdHlwZT1cIlNwaW5hbENvbnRleHRcIl0gVHlwZSBvZiB0aGUgY29udGV4dCwgdXN1YWxseSB1bnVzZWRcbiAgICogQHBhcmFtIHtTcGluYWxOb2RlIHwgTW9kZWx9IFtlbGVtZW50XSBFbGVtZW50IG9mIHRoZSBjb250ZXh0XG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIGVsZW1lbnQgaXMgbm90IGEgTW9kZWxcbiAgICovXG4gIGNvbnN0cnVjdG9yKG5hbWUsIHR5cGUgPSBcIlNwaW5hbENvbnRleHRcIiwgZWxlbWVudCkge1xuICAgIHN1cGVyKG5hbWUsIHR5cGUsIGVsZW1lbnQpO1xuXG4gICAgdGhpcy5pbmZvLmlkLnNldChndWlkKHRoaXMuY29uc3RydWN0b3IubmFtZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjaGlsZCB3aXRoIGEgU3BpbmFsUmVsYXRpb25Mc3RQdHJUeXBlLlxuICAgKiBAb3ZlcnJpZGVcbiAgICogQHBhcmFtIHtTcGluYWxOb2RlIHwgTW9kZWx9IGNoaWxkIE5vZGUgdG8gYWRkIGFzIGNoaWxkXG4gICAqIEBwYXJhbSB7U3RyaW5nfSByZWxhdGlvbk5hbWUgTmFtZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IFtyZWxhdGlvblR5cGU9U1BJTkFMX1JFTEFUSU9OX1BUUl9MU1RfVFlQRV0gVGhpcyBwYXJhbWV0ZXIgaXMgaGVyZSBvbmx5IHRvIHByb3Blcmx5IG92ZXJyaWRlIHRoZSBwYXJlbnQgbWV0aG9kXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFNwaW5hbE5vZGU+fSBUaGUgY2hpbGQgbm9kZSBpbiBhIHByb21pc2VcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgY2hpbGQgaXMgbm90IGEgbW9kZWxcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgcmVsYXRpb24gbmFtZSBpcyBub3QgYSBzdHJpbmdcbiAgICovXG4gIGFkZENoaWxkKGNoaWxkLCByZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSA9IFNQSU5BTF9SRUxBVElPTl9QVFJfTFNUX1RZUEUpIHtcbiAgICByZXR1cm4gc3VwZXIuYWRkQ2hpbGQoY2hpbGQsIHJlbGF0aW9uTmFtZSwgU1BJTkFMX1JFTEFUSU9OX1BUUl9MU1RfVFlQRSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGNoaWxkIHdpdGggYSBTcGluYWxSZWxhdGlvbkxzdFB0clR5cGUgYW5kIG5vdGljZXMgdGhlIGNvbnRleHQgaWYgYSBuZXcgcmVsYXRpb24gd2FzIGNyZWF0ZWQuXG4gICAqIEBvdmVycmlkZVxuICAgKiBAcGFyYW0ge1NwaW5hbE5vZGUgfCBNb2RlbH0gY2hpbGQgTm9kZSB0byBhZGQgYXMgY2hpbGRcbiAgICogQHBhcmFtIHtTdHJpbmd9IHJlbGF0aW9uTmFtZSBOYW1lIG9mIHRoZSByZWxhdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gW3JlbGF0aW9uVHlwZT1TUElOQUxfUkVMQVRJT05fUFRSX0xTVF9UWVBFXSBUaGlzIHBhcmFtZXRlciBpcyBoZXJlIG9ubHkgdG8gcHJvcGVybHkgb3ZlcnJpZGUgdGhlIHBhcmVudCBtZXRob2RcbiAgICogQHBhcmFtIHtTcGluYWxDb250ZXh0fSBjb250ZXh0IENvbnRleHQgdG8gdXBkYXRlLCB1c3VhbGx5IHVudXNlZFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxTcGluYWxOb2RlPn0gVGhlIGNoaWxkIG5vZGUgaW4gYSBwcm9taXNlXG4gICAqL1xuICBhZGRDaGlsZEluQ29udGV4dChjaGlsZCwgcmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUgPSBTUElOQUxfUkVMQVRJT05fUFRSX0xTVF9UWVBFLCBjb250ZXh0ID0gdGhpcykge1xuICAgIHJldHVybiBzdXBlci5hZGRDaGlsZEluQ29udGV4dChjaGlsZCwgcmVsYXRpb25OYW1lLCBTUElOQUxfUkVMQVRJT05fUFRSX0xTVF9UWVBFLCBjb250ZXh0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGNoaWxkcmVuIG9mIHRoZSBub2RlIHRoYXQgYXJlIHJlZ2lzdGVyZWQgaW4gdGhlIGNvbnRleHRcbiAgICogQG92ZXJyaWRlXG4gICAqIEBwYXJhbSB7U3BpbmFsQ29udGV4dH0gW2NvbnRleHQ9dGhpc10gQ29udGV4dCB0byB1c2UgZm9yIHRoZSBzZWFyY2gsIHRoaXMgYnkgZGVmYXVsdFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxTcGluYWxOb2RlPj59IFRoZSBjaGlsZHJlbiB0aGF0IHdlcmUgZm91bmRcbiAgICovXG4gIGdldENoaWxkcmVuSW5Db250ZXh0KGNvbnRleHQgPSB0aGlzKSB7XG4gICAgcmV0dXJuIHN1cGVyLmdldENoaWxkcmVuSW5Db250ZXh0KGNvbnRleHQpO1xuICB9XG59XG5cbnNwaW5hbENvcmUucmVnaXN0ZXJfbW9kZWxzKFtTcGluYWxDb250ZXh0XSk7XG5leHBvcnQgZGVmYXVsdCBTcGluYWxDb250ZXh0O1xuIl19