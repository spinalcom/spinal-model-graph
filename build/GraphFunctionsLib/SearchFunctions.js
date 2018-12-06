"use strict";

var _SpinalNode = _interopRequireDefault(require("../Nodes/SpinalNode"));

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
const DFS = (spinalNode, predicat, infix, prefix) => {
  const _set = new Set();

  _set.add(spinalNode);

  spinalNode.getChildren([]).forEach(child => {});
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9HcmFwaEZ1bmN0aW9uc0xpYi9TZWFyY2hGdW5jdGlvbnMuanMiXSwibmFtZXMiOlsiREZTIiwic3BpbmFsTm9kZSIsInByZWRpY2F0IiwiaW5maXgiLCJwcmVmaXgiLCJfc2V0IiwiU2V0IiwiYWRkIiwiZ2V0Q2hpbGRyZW4iLCJmb3JFYWNoIiwiY2hpbGQiXSwibWFwcGluZ3MiOiI7O0FBdUJBOzs7O0FBdkJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxNQUFNQSxHQUFHLEdBQUcsQ0FBQ0MsVUFBRCxFQUFhQyxRQUFiLEVBQXVCQyxLQUF2QixFQUE4QkMsTUFBOUIsS0FBeUM7QUFDbkQsUUFBTUMsSUFBSSxHQUFHLElBQUlDLEdBQUosRUFBYjs7QUFDQUQsRUFBQUEsSUFBSSxDQUFDRSxHQUFMLENBQVNOLFVBQVQ7O0FBQ0FBLEVBQUFBLFVBQVUsQ0FBQ08sV0FBWCxDQUF1QixFQUF2QixFQUEyQkMsT0FBM0IsQ0FBbUNDLEtBQUssSUFBSSxDQUUzQyxDQUZEO0FBSUQsQ0FQRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOCBTcGluYWxDb20gLSB3d3cuc3BpbmFsY29tLmNvbVxuICogXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBTcGluYWxDb3JlLlxuICogXG4gKiBQbGVhc2UgcmVhZCBhbGwgb2YgdGhlIGZvbGxvd2luZyB0ZXJtcyBhbmQgY29uZGl0aW9uc1xuICogb2YgdGhlIEZyZWUgU29mdHdhcmUgbGljZW5zZSBBZ3JlZW1lbnQgKFwiQWdyZWVtZW50XCIpXG4gKiBjYXJlZnVsbHkuXG4gKiBcbiAqIFRoaXMgQWdyZWVtZW50IGlzIGEgbGVnYWxseSBiaW5kaW5nIGNvbnRyYWN0IGJldHdlZW5cbiAqIHRoZSBMaWNlbnNlZSAoYXMgZGVmaW5lZCBiZWxvdykgYW5kIFNwaW5hbENvbSB0aGF0XG4gKiBzZXRzIGZvcnRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyB0aGF0IGdvdmVybiB5b3VyXG4gKiB1c2Ugb2YgdGhlIFByb2dyYW0uIEJ5IGluc3RhbGxpbmcgYW5kL29yIHVzaW5nIHRoZVxuICogUHJvZ3JhbSwgeW91IGFncmVlIHRvIGFiaWRlIGJ5IGFsbCB0aGUgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zIHN0YXRlZCBvciByZWZlcmVuY2VkIGhlcmVpbi5cbiAqIFxuICogSWYgeW91IGRvIG5vdCBhZ3JlZSB0byBhYmlkZSBieSB0aGVzZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMsIGRvIG5vdCBkZW1vbnN0cmF0ZSB5b3VyIGFjY2VwdGFuY2UgYW5kIGRvXG4gKiBub3QgaW5zdGFsbCBvciB1c2UgdGhlIFByb2dyYW0uXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFsb25nXG4gKiB3aXRoIHRoaXMgZmlsZS4gSWYgbm90LCBzZWVcbiAqIDxodHRwOi8vcmVzb3VyY2VzLnNwaW5hbGNvbS5jb20vbGljZW5zZXMucGRmPi5cbiAqL1xuaW1wb3J0IFNwaW5hbE5vZGUgZnJvbSBcIi4uL05vZGVzL1NwaW5hbE5vZGVcIlxuY29uc3QgREZTID0gKHNwaW5hbE5vZGUsIHByZWRpY2F0LCBpbmZpeCwgcHJlZml4KSA9PiB7XG4gIGNvbnN0IF9zZXQgPSBuZXcgU2V0KCk7XG4gIF9zZXQuYWRkKHNwaW5hbE5vZGUpO1xuICBzcGluYWxOb2RlLmdldENoaWxkcmVuKFtdKS5mb3JFYWNoKGNoaWxkID0+IHtcblxuICB9KTtcblxufTtcbiJdfQ==