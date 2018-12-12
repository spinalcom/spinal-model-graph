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
   * @returns {Lst<Str>} The relation names that the context knows
   */


  getRelationNames() {
    return this.relationNames;
  }
  /**
   * Adds relation names to the relation names known by the context.
   * @param {Array<String> | String} relationNames Names of the relations
   * @returns {Boolean} Return false if all the relation names are already known
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
   * @returns {Promise<SpinalNode>} The child node in a promise
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Ob2Rlcy9TcGluYWxDb250ZXh0LmpzIl0sIm5hbWVzIjpbImdsb2JhbFR5cGUiLCJ3aW5kb3ciLCJnbG9iYWwiLCJTcGluYWxDb250ZXh0IiwiU3BpbmFsTm9kZSIsImNvbnN0cnVjdG9yIiwibmFtZSIsInR5cGUiLCJlbGVtZW50IiwiTW9kZWwiLCJhZGRfYXR0ciIsInJlbGF0aW9uTmFtZXMiLCJMc3QiLCJpbmZvIiwiaWQiLCJzZXQiLCJnZXRSZWxhdGlvbk5hbWVzIiwiYWRkUmVsYXRpb25OYW1lcyIsInJlc3VsdCIsImNvbnRhaW5zIiwicHVzaCIsImFkZENoaWxkIiwiY2hpbGQiLCJyZWxhdGlvbk5hbWUiLCJyZWxhdGlvblR5cGUiLCJTUElOQUxfUkVMQVRJT05fUFRSX0xTVF9UWVBFIiwiYWRkQ2hpbGRJbkNvbnRleHQiLCJjb250ZXh0IiwiZ2V0Q2hpbGRyZW5JbkNvbnRleHQiLCJzcGluYWxDb3JlIiwicmVnaXN0ZXJfbW9kZWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBdUJBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBMUJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTRCQSxNQUFNQSxVQUFVLEdBQUcsT0FBT0MsTUFBUCxLQUFrQixXQUFsQixHQUFnQ0MsTUFBaEMsR0FBeUNELE1BQTVEOztBQUVBLE1BQU1FLGFBQU4sU0FBNEJDLG1CQUE1QixDQUF1QztBQUNyQzs7Ozs7O0FBTUFDLEVBQUFBLFdBQVcsQ0FBQ0MsSUFBSSxHQUFHLFdBQVIsRUFBcUJDLElBQUksR0FBRyxlQUE1QixFQUE2Q0MsT0FBTyxHQUFHLElBQUlSLFVBQVUsQ0FDN0VTLEtBRCtELEVBQXZELEVBQ0Q7QUFDUixVQUFNSCxJQUFOLEVBQVlDLElBQVosRUFBa0JDLE9BQWxCO0FBQ0EsU0FBS0UsUUFBTCxDQUFjO0FBQ1pDLE1BQUFBLGFBQWEsRUFBRSxJQUFJWCxVQUFVLENBQUNZLEdBQWY7QUFESCxLQUFkO0FBR0EsU0FBS0MsSUFBTCxDQUFVQyxFQUFWLENBQWFDLEdBQWIsQ0FBaUIscUJBQUssS0FBS1YsV0FBTCxDQUFpQkMsSUFBdEIsQ0FBakI7QUFDRDtBQUVEOzs7Ozs7QUFJQVUsRUFBQUEsZ0JBQWdCLEdBQUc7QUFDakIsV0FBTyxLQUFLTCxhQUFaO0FBQ0Q7QUFFRDs7Ozs7OztBQUtBTSxFQUFBQSxnQkFBZ0IsQ0FBQ04sYUFBRCxFQUFnQjtBQUM5QixRQUFJTyxNQUFNLEdBQUcsS0FBYjs7QUFFQSxRQUFJLE9BQU9QLGFBQVAsS0FBeUIsUUFBN0IsRUFBdUM7QUFDckNBLE1BQUFBLGFBQWEsR0FBRyxDQUFDQSxhQUFELENBQWhCO0FBQ0Q7O0FBTDZCO0FBQUE7QUFBQTs7QUFBQTtBQU85QiwyQkFBaUJBLGFBQWpCLDhIQUFnQztBQUFBLFlBQXZCTCxJQUF1Qjs7QUFDOUIsWUFBSSxDQUFDLEtBQUtLLGFBQUwsQ0FBbUJRLFFBQW5CLENBQTRCYixJQUE1QixDQUFMLEVBQXdDO0FBQ3RDLGVBQUtLLGFBQUwsQ0FBbUJTLElBQW5CLENBQXdCZCxJQUF4QjtBQUNBWSxVQUFBQSxNQUFNLEdBQUcsSUFBVDtBQUNEO0FBQ0Y7QUFaNkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFhOUIsV0FBT0EsTUFBUDtBQUNEO0FBRUQ7Ozs7Ozs7OztBQU9BRyxFQUFBQSxRQUFRLENBQUNDLEtBQUQsRUFBUUMsWUFBUixFQUFzQkMsWUFBWSxHQUMxQ0MsbURBRFEsRUFDc0I7QUFDNUIsV0FBTyxNQUFNSixRQUFOLENBQWVDLEtBQWYsRUFBc0JDLFlBQXRCLEVBQW9DRSxtREFBcEMsQ0FBUDtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7QUFRQUMsRUFBQUEsaUJBQWlCLENBQUNKLEtBQUQsRUFBUUMsWUFBUixFQUFzQkMsWUFBWSxHQUNuREMsbURBRGlCLEVBQ2FFLE9BQU8sR0FBRyxJQUR2QixFQUM2QjtBQUM1QyxXQUFPLE1BQU1ELGlCQUFOLENBQXdCSixLQUF4QixFQUErQkMsWUFBL0IsRUFDTEUsbURBREssRUFDeUJFLE9BRHpCLENBQVA7QUFFRDtBQUVEOzs7Ozs7O0FBS0FDLEVBQUFBLG9CQUFvQixDQUFDRCxPQUFPLEdBQUcsSUFBWCxFQUFpQjtBQUNuQyxXQUFPLE1BQU1DLG9CQUFOLENBQTJCRCxPQUEzQixDQUFQO0FBQ0Q7O0FBOUVvQzs7QUFpRnZDRSwrQkFBV0MsZUFBWCxDQUEyQixDQUFDM0IsYUFBRCxDQUEzQjs7ZUFDZUEsYSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOCBTcGluYWxDb20gLSB3d3cuc3BpbmFsY29tLmNvbVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFNwaW5hbENvcmUuXG4gKlxuICogUGxlYXNlIHJlYWQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgdGVybXMgYW5kIGNvbmRpdGlvbnNcbiAqIG9mIHRoZSBGcmVlIFNvZnR3YXJlIGxpY2Vuc2UgQWdyZWVtZW50IChcIkFncmVlbWVudFwiKVxuICogY2FyZWZ1bGx5LlxuICpcbiAqIFRoaXMgQWdyZWVtZW50IGlzIGEgbGVnYWxseSBiaW5kaW5nIGNvbnRyYWN0IGJldHdlZW5cbiAqIHRoZSBMaWNlbnNlZSAoYXMgZGVmaW5lZCBiZWxvdykgYW5kIFNwaW5hbENvbSB0aGF0XG4gKiBzZXRzIGZvcnRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyB0aGF0IGdvdmVybiB5b3VyXG4gKiB1c2Ugb2YgdGhlIFByb2dyYW0uIEJ5IGluc3RhbGxpbmcgYW5kL29yIHVzaW5nIHRoZVxuICogUHJvZ3JhbSwgeW91IGFncmVlIHRvIGFiaWRlIGJ5IGFsbCB0aGUgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zIHN0YXRlZCBvciByZWZlcmVuY2VkIGhlcmVpbi5cbiAqXG4gKiBJZiB5b3UgZG8gbm90IGFncmVlIHRvIGFiaWRlIGJ5IHRoZXNlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucywgZG8gbm90IGRlbW9uc3RyYXRlIHlvdXIgYWNjZXB0YW5jZSBhbmQgZG9cbiAqIG5vdCBpbnN0YWxsIG9yIHVzZSB0aGUgUHJvZ3JhbS5cbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYWxvbmdcbiAqIHdpdGggdGhpcyBmaWxlLiBJZiBub3QsIHNlZVxuICogPGh0dHA6Ly9yZXNvdXJjZXMuc3BpbmFsY29tLmNvbS9saWNlbnNlcy5wZGY+LlxuICovXG5pbXBvcnQgU3BpbmFsTm9kZSBmcm9tIFwiLi9TcGluYWxOb2RlXCI7XG5pbXBvcnQgc3BpbmFsQ29yZSBmcm9tIFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNcIjtcbmltcG9ydCB7U1BJTkFMX1JFTEFUSU9OX1BUUl9MU1RfVFlQRX0gZnJvbSBcIi4uL1JlbGF0aW9ucy9TcGluYWxSZWxhdGlvbkZhY3RvcnlcIjtcbmltcG9ydCB7Z3VpZH0gZnJvbSBcIi4uL1V0aWxpdGllc1wiO1xuXG5jb25zdCBnbG9iYWxUeXBlID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHdpbmRvdztcblxuY2xhc3MgU3BpbmFsQ29udGV4dCBleHRlbmRzIFNwaW5hbE5vZGUge1xuICAvKipcbiAgICogQ29uc3RydWN0b3IgZm9yIHRoZSBTcGluYWxDb250ZXh0IGNsYXNzLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBOYW1lIG9mIHRoZSBjb250ZXh0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIFR5cGUgb2YgdGhlIGNvbnRleHQsIHVzdWFsbHkgdW51c2VkXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZSB8IE1vZGVsfSBlbGVtZW50IEVsZW1lbnQgb2YgdGhlIGNvbnRleHQsIHVzdWFsbHkgdW51c2VkXG4gICAqL1xuICBjb25zdHJ1Y3RvcihuYW1lID0gXCJ1bmRlZmluZWRcIiwgdHlwZSA9IFwiU3BpbmFsQ29udGV4dFwiLCBlbGVtZW50ID0gbmV3IGdsb2JhbFR5cGVcbiAgICAuTW9kZWwpIHtcbiAgICBzdXBlcihuYW1lLCB0eXBlLCBlbGVtZW50KTtcbiAgICB0aGlzLmFkZF9hdHRyKHtcbiAgICAgIHJlbGF0aW9uTmFtZXM6IG5ldyBnbG9iYWxUeXBlLkxzdCgpXG4gICAgfSk7XG4gICAgdGhpcy5pbmZvLmlkLnNldChndWlkKHRoaXMuY29uc3RydWN0b3IubmFtZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJlbGF0aW9uIG5hbWVzIG9mIHRoZSBjb250ZXh0LlxuICAgKiBAcmV0dXJucyB7THN0PFN0cj59IFRoZSByZWxhdGlvbiBuYW1lcyB0aGF0IHRoZSBjb250ZXh0IGtub3dzXG4gICAqL1xuICBnZXRSZWxhdGlvbk5hbWVzKCkge1xuICAgIHJldHVybiB0aGlzLnJlbGF0aW9uTmFtZXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyByZWxhdGlvbiBuYW1lcyB0byB0aGUgcmVsYXRpb24gbmFtZXMga25vd24gYnkgdGhlIGNvbnRleHQuXG4gICAqIEBwYXJhbSB7QXJyYXk8U3RyaW5nPiB8IFN0cmluZ30gcmVsYXRpb25OYW1lcyBOYW1lcyBvZiB0aGUgcmVsYXRpb25zXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm4gZmFsc2UgaWYgYWxsIHRoZSByZWxhdGlvbiBuYW1lcyBhcmUgYWxyZWFkeSBrbm93blxuICAgKi9cbiAgYWRkUmVsYXRpb25OYW1lcyhyZWxhdGlvbk5hbWVzKSB7XG4gICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuXG4gICAgaWYgKHR5cGVvZiByZWxhdGlvbk5hbWVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICByZWxhdGlvbk5hbWVzID0gW3JlbGF0aW9uTmFtZXNdO1xuICAgIH1cblxuICAgIGZvciAobGV0IG5hbWUgb2YgcmVsYXRpb25OYW1lcykge1xuICAgICAgaWYgKCF0aGlzLnJlbGF0aW9uTmFtZXMuY29udGFpbnMobmFtZSkpIHtcbiAgICAgICAgdGhpcy5yZWxhdGlvbk5hbWVzLnB1c2gobmFtZSk7XG4gICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGNoaWxkIHdpdGggYSBTcGluYWxSZWxhdGlvbkxzdFB0clR5cGUuXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZSB8IE1vZGVsfSBjaGlsZCBOb2RlIHRvIGFkZCBhcyBjaGlsZFxuICAgKiBAcGFyYW0ge1N0cmluZ30gcmVsYXRpb25OYW1lIE5hbWUgb2YgdGhlIHJlbGF0aW9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSByZWxhdGlvblR5cGUgVGhpcyBwYXJhbWV0ZXIgaXMgaGVyZSBvbmx5IHRvIHByb3Blcmx5IG92ZXJyaWRlIHRoZSBwYXJlbnQgbWV0aG9kXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFNwaW5hbE5vZGU+fSBUaGUgY2hpbGQgbm9kZSBpbiBhIHByb21pc2VcbiAgICovXG4gIGFkZENoaWxkKGNoaWxkLCByZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSA9XG4gIFNQSU5BTF9SRUxBVElPTl9QVFJfTFNUX1RZUEUpIHtcbiAgICByZXR1cm4gc3VwZXIuYWRkQ2hpbGQoY2hpbGQsIHJlbGF0aW9uTmFtZSwgU1BJTkFMX1JFTEFUSU9OX1BUUl9MU1RfVFlQRSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGNoaWxkIHdpdGggYSBTcGluYWxSZWxhdGlvbkxzdFB0clR5cGUgYW5kIG5vdGljZXMgdGhlIGNvbnRleHQgaWYgYSBuZXcgcmVsYXRpb24gd2FzIGNyZWF0ZWQuXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZSB8IE1vZGVsfSBjaGlsZCBOb2RlIHRvIGFkZCBhcyBjaGlsZFxuICAgKiBAcGFyYW0ge1N0cmluZ30gcmVsYXRpb25OYW1lIE5hbWUgb2YgdGhlIHJlbGF0aW9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSByZWxhdGlvblR5cGUgVGhpcyBwYXJhbWV0ZXIgaXMgaGVyZSBvbmx5IHRvIHByb3Blcmx5IG92ZXJyaWRlIHRoZSBwYXJlbnQgbWV0aG9kXG4gICAqIEBwYXJhbSB7U3BpbmFsQ29udGV4dH0gY29udGV4dCBDb250ZXh0IHRvIHVwZGF0ZSwgdXN1YWxseSB1bnVzZWRcbiAgICogQHJldHVybnMge1Byb21pc2U8U3BpbmFsTm9kZT59IFRoZSBjaGlsZCBub2RlIGluIGEgcHJvbWlzZVxuICAgKi9cbiAgYWRkQ2hpbGRJbkNvbnRleHQoY2hpbGQsIHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlID1cbiAgU1BJTkFMX1JFTEFUSU9OX1BUUl9MU1RfVFlQRSwgY29udGV4dCA9IHRoaXMpIHtcbiAgICByZXR1cm4gc3VwZXIuYWRkQ2hpbGRJbkNvbnRleHQoY2hpbGQsIHJlbGF0aW9uTmFtZSxcbiAgICAgIFNQSU5BTF9SRUxBVElPTl9QVFJfTFNUX1RZUEUsIGNvbnRleHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgY2hpbGRyZW4gb2YgdGhlIG5vZGUgdGhhdCBhcmUgcmVnaXN0ZXJlZCBpbiB0aGUgY29udGV4dFxuICAgKiBAcGFyYW0ge1NwaW5hbENvbnRleHR9IGNvbnRleHQgQ29udGV4dCB0byB1c2UgZm9yIHRoZSBzZWFyY2gsIHRoaXMgYnkgZGVmYXVsdFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxTcGluYWxOb2RlPj59IFRoZSBjaGlsZHJlbiB0aGF0IHdlcmUgZm91bmRcbiAgICovXG4gIGdldENoaWxkcmVuSW5Db250ZXh0KGNvbnRleHQgPSB0aGlzKSB7XG4gICAgcmV0dXJuIHN1cGVyLmdldENoaWxkcmVuSW5Db250ZXh0KGNvbnRleHQpO1xuICB9XG59XG5cbnNwaW5hbENvcmUucmVnaXN0ZXJfbW9kZWxzKFtTcGluYWxDb250ZXh0XSk7XG5leHBvcnQgZGVmYXVsdCBTcGluYWxDb250ZXh0O1xuIl19