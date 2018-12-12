"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseSpinalRelation = _interopRequireDefault(require("./BaseSpinalRelation"));

var _SpinalRelationFactory = require("./SpinalRelationFactory");

var _SpinalNode = _interopRequireDefault(require("../Nodes/SpinalNode"));

var _SpinalNodePointer = _interopRequireDefault(require("../SpinalNodePointer"));

var _spinalCoreConnectorjs = _interopRequireDefault(require("spinal-core-connectorjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const globalType = typeof window === "undefined" ? global : window;

class SpinalRelationLstPtr extends _BaseSpinalRelation.default {
  /**
   * Constructor for the SpinalRelationLstPtr class.
   * @param {String} name Name of the relation
   */
  constructor(name) {
    super(name);
    this.add_attr({
      children: new globalType.Lst()
    });
  }
  /**
   * Retrieves all the ids of the children of the relation and return them inside an array.
   * @returns {Array<String>} Array containing all the children ids of the relation
   */


  getChildrenIds() {
    const res = [];

    for (let i = 0; i < this.children.length; i++) {
      res.push(this.children[i].getId().get());
    }

    return res;
  }
  /**
   * Return all the children of the relation.
   * @returns {Promise<Array<SpinalNode>>} The children of the relation
   */


  getChildren() {
    const promises = [];

    for (let i = 0; i < this.children.length; i++) {
      let ptr = this.children[i];
      promises.push(ptr.load());
    }

    return Promise.all(promises);
  }
  /**
   * Return all the children of the relation associated to a certain context.
   * @returns {Promise<Array<SpinalNode>>} The children of the relation
   */


  getChildrenInContext(context) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const promises = [];
      let children;

      for (let i = 0; i < _this.children.length; i++) {
        let ptr = _this.children[i];
        promises.push(ptr.load());
      }

      children = yield Promise.all(promises);
      return children.filter(child => child.belongsToContext(context));
    })();
  }
  /**
   * Returns the type of the relation.
   * @returns {Number} Type of the relation
   */


  getType() {
    return _SpinalRelationFactory.SPINAL_RELATION_LST_PTR_TYPE;
  }
  /**
   * Adds a child to the relation.
   * @param {SpinalNode | Model} node Node or model to add
   * @returns {Promise<SpinalNode>} Promise containing the node that was added
   */


  addChild(node) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      if (!(node instanceof globalType.Model)) {
        throw new Error("Cannot add a child witch is not an instance of SpinalNode or Model.");
      } else if (!(node instanceof _SpinalNode.default)) {
        node = new _SpinalNode.default(undefined, undefined, node);
      }

      if (_this2.getChildrenIds().includes(node.getId().get())) {
        throw new Error("Cannot add a child twice to the same relation.");
      }

      node._addParent(_this2);

      _this2.children.push(new _SpinalNodePointer.default(node));

      return node;
    })();
  }
  /**
   * Removes a child from the relation.
   * @param {SpinalNode} node Child to remove
   * @returns {Promise<Boolean>} A promise containing true if the node was a child
   */


  removeChild(node) {
    let found = false;

    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].getId() === node.getId()) {
        this.children.splice(i, 1);
        found = true;
        break;
      }
    }

    if (!found) {
      return Promise.resolve(false);
    }

    node._removeParent(this);

    return Promise.resolve(true);
  }

}

_spinalCoreConnectorjs.default.register_models([SpinalRelationLstPtr]);

var _default = SpinalRelationLstPtr;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9SZWxhdGlvbnMvU3BpbmFsUmVsYXRpb25Mc3RQdHIuanMiXSwibmFtZXMiOlsiZ2xvYmFsVHlwZSIsIndpbmRvdyIsImdsb2JhbCIsIlNwaW5hbFJlbGF0aW9uTHN0UHRyIiwiQmFzZVNwaW5hbFJlbGF0aW9uIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiYWRkX2F0dHIiLCJjaGlsZHJlbiIsIkxzdCIsImdldENoaWxkcmVuSWRzIiwicmVzIiwiaSIsImxlbmd0aCIsInB1c2giLCJnZXRJZCIsImdldCIsImdldENoaWxkcmVuIiwicHJvbWlzZXMiLCJwdHIiLCJsb2FkIiwiUHJvbWlzZSIsImFsbCIsImdldENoaWxkcmVuSW5Db250ZXh0IiwiY29udGV4dCIsImZpbHRlciIsImNoaWxkIiwiYmVsb25nc1RvQ29udGV4dCIsImdldFR5cGUiLCJTUElOQUxfUkVMQVRJT05fTFNUX1BUUl9UWVBFIiwiYWRkQ2hpbGQiLCJub2RlIiwiTW9kZWwiLCJFcnJvciIsIlNwaW5hbE5vZGUiLCJ1bmRlZmluZWQiLCJpbmNsdWRlcyIsIl9hZGRQYXJlbnQiLCJTcGluYWxOb2RlUG9pbnRlciIsInJlbW92ZUNoaWxkIiwiZm91bmQiLCJzcGxpY2UiLCJyZXNvbHZlIiwiX3JlbW92ZVBhcmVudCIsInNwaW5hbENvcmUiLCJyZWdpc3Rlcl9tb2RlbHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUF1QkE7O0FBQ0E7O0FBR0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRUEsTUFBTUEsVUFBVSxHQUFHLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NDLE1BQWhDLEdBQXlDRCxNQUE1RDs7QUFFQSxNQUFNRSxvQkFBTixTQUFtQ0MsMkJBQW5DLENBQXNEO0FBQ3BEOzs7O0FBSUFDLEVBQUFBLFdBQVcsQ0FBQ0MsSUFBRCxFQUFPO0FBQ2hCLFVBQU1BLElBQU47QUFDQSxTQUFLQyxRQUFMLENBQWM7QUFDWkMsTUFBQUEsUUFBUSxFQUFFLElBQUlSLFVBQVUsQ0FBQ1Ms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LENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLSixRQUFMLENBQWNLLE1BQWxDLEVBQTBDRCxDQUFDLEVBQTNDLEVBQStDO0FBQzdDLFVBQUksS0FBS0osUUFBTCxDQUFjSSxDQUFkLEVBQWlCRyxLQUFqQixPQUE2QmdCLElBQUksQ0FBQ2hCLEtBQUwsRUFBakMsRUFBK0M7QUFDN0MsYUFBS1AsUUFBTCxDQUFjaUMsTUFBZCxDQUFxQjdCLENBQXJCLEVBQXdCLENBQXhCO0FBQ0E0QixRQUFBQSxLQUFLLEdBQUcsSUFBUjtBQUNBO0FBQ0Q7QUFDRjs7QUFFRCxRQUFJLENBQUNBLEtBQUwsRUFBWTtBQUNWLGFBQU9uQixPQUFPLENBQUNxQixPQUFSLENBQWdCLEtBQWhCLENBQVA7QUFDRDs7QUFFRFgsSUFBQUEsSUFBSSxDQUFDWSxhQUFMLENBQW1CLElBQW5COztBQUNBLFdBQU90QixPQUFPLENBQUNxQixPQUFSLENBQWdCLElBQWhCLENBQVA7QUFDRDs7QUE1R21EOztBQStHdERFLCtCQUFXQyxlQUFYLENBQTJCLENBQUMxQyxvQkFBRCxDQUEzQjs7ZUFDZUEsb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTggU3BpbmFsQ29tIC0gd3d3LnNwaW5hbGNvbS5jb21cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBTcGluYWxDb3JlLlxuICpcbiAqIFBsZWFzZSByZWFkIGFsbCBvZiB0aGUgZm9sbG93aW5nIHRlcm1zIGFuZCBjb25kaXRpb25zXG4gKiBvZiB0aGUgRnJlZSBTb2Z0d2FyZSBsaWNlbnNlIEFncmVlbWVudCAoXCJBZ3JlZW1lbnRcIilcbiAqIGNhcmVmdWxseS5cbiAqXG4gKiBUaGlzIEFncmVlbWVudCBpcyBhIGxlZ2FsbHkgYmluZGluZyBjb250cmFjdCBiZXR3ZWVuXG4gKiB0aGUgTGljZW5zZWUgKGFzIGRlZmluZWQgYmVsb3cpIGFuZCBTcGluYWxDb20gdGhhdFxuICogc2V0cyBmb3J0aCB0aGUgdGVybXMgYW5kIGNvbmRpdGlvbnMgdGhhdCBnb3Zlcm4geW91clxuICogdXNlIG9mIHRoZSBQcm9ncmFtLiBCeSBpbnN0YWxsaW5nIGFuZC9vciB1c2luZyB0aGVcbiAqIFByb2dyYW0sIHlvdSBhZ3JlZSB0byBhYmlkZSBieSBhbGwgdGhlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucyBzdGF0ZWQgb3IgcmVmZXJlbmNlZCBoZXJlaW4uXG4gKlxuICogSWYgeW91IGRvIG5vdCBhZ3JlZSB0byBhYmlkZSBieSB0aGVzZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMsIGRvIG5vdCBkZW1vbnN0cmF0ZSB5b3VyIGFjY2VwdGFuY2UgYW5kIGRvXG4gKiBub3QgaW5zdGFsbCBvciB1c2UgdGhlIFByb2dyYW0uXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFsb25nXG4gKiB3aXRoIHRoaXMgZmlsZS4gSWYgbm90LCBzZWVcbiAqIDxodHRwOi8vcmVzb3VyY2VzLnNwaW5hbGNvbS5jb20vbGljZW5zZXMucGRmPi5cbiAqL1xuaW1wb3J0IEJhc2VTcGluYWxSZWxhdGlvbiBmcm9tIFwiLi9CYXNlU3BpbmFsUmVsYXRpb25cIjtcbmltcG9ydCB7XG4gIFNQSU5BTF9SRUxBVElPTl9MU1RfUFRSX1RZUEVcbn0gZnJvbSBcIi4vU3BpbmFsUmVsYXRpb25GYWN0b3J5XCI7XG5pbXBvcnQgU3BpbmFsTm9kZSBmcm9tIFwiLi4vTm9kZXMvU3BpbmFsTm9kZVwiO1xuaW1wb3J0IFNwaW5hbE5vZGVQb2ludGVyIGZyb20gXCIuLi9TcGluYWxOb2RlUG9pbnRlclwiO1xuaW1wb3J0IHNwaW5hbENvcmUgZnJvbSBcInNwaW5hbC1jb3JlLWNvbm5lY3RvcmpzXCI7XG5cbmNvbnN0IGdsb2JhbFR5cGUgPSB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogd2luZG93O1xuXG5jbGFzcyBTcGluYWxSZWxhdGlvbkxzdFB0ciBleHRlbmRzIEJhc2VTcGluYWxSZWxhdGlvbiB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIFNwaW5hbFJlbGF0aW9uTHN0UHRyIGNsYXNzLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBOYW1lIG9mIHRoZSByZWxhdGlvblxuICAgKi9cbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHN1cGVyKG5hbWUpO1xuICAgIHRoaXMuYWRkX2F0dHIoe1xuICAgICAgY2hpbGRyZW46IG5ldyBnbG9iYWxUeXBlLkxzdCgpXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIGFsbCB0aGUgaWRzIG9mIHRoZSBjaGlsZHJlbiBvZiB0aGUgcmVsYXRpb24gYW5kIHJldHVybiB0aGVtIGluc2lkZSBhbiBhcnJheS5cbiAgICogQHJldHVybnMge0FycmF5PFN0cmluZz59IEFycmF5IGNvbnRhaW5pbmcgYWxsIHRoZSBjaGlsZHJlbiBpZHMgb2YgdGhlIHJlbGF0aW9uXG4gICAqL1xuICBnZXRDaGlsZHJlbklkcygpIHtcbiAgICBjb25zdCByZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlcy5wdXNoKHRoaXMuY2hpbGRyZW5baV0uZ2V0SWQoKS5nZXQoKSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGFsbCB0aGUgY2hpbGRyZW4gb2YgdGhlIHJlbGF0aW9uLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxTcGluYWxOb2RlPj59IFRoZSBjaGlsZHJlbiBvZiB0aGUgcmVsYXRpb25cbiAgICovXG4gIGdldENoaWxkcmVuKCkge1xuICAgIGNvbnN0IHByb21pc2VzID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBwdHIgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgcHJvbWlzZXMucHVzaChwdHIubG9hZCgpKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYWxsIHRoZSBjaGlsZHJlbiBvZiB0aGUgcmVsYXRpb24gYXNzb2NpYXRlZCB0byBhIGNlcnRhaW4gY29udGV4dC5cbiAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8U3BpbmFsTm9kZT4+fSBUaGUgY2hpbGRyZW4gb2YgdGhlIHJlbGF0aW9uXG4gICAqL1xuICBhc3luYyBnZXRDaGlsZHJlbkluQ29udGV4dChjb250ZXh0KSB7XG4gICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcbiAgICBsZXQgY2hpbGRyZW47XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBwdHIgPSB0aGlzLmNoaWxkcmVuW2ldO1xuXG4gICAgICBwcm9taXNlcy5wdXNoKHB0ci5sb2FkKCkpO1xuICAgIH1cblxuICAgIGNoaWxkcmVuID0gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIHJldHVybiBjaGlsZHJlbi5maWx0ZXIoY2hpbGQgPT4gY2hpbGQuYmVsb25nc1RvQ29udGV4dChjb250ZXh0KSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdHlwZSBvZiB0aGUgcmVsYXRpb24uXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IFR5cGUgb2YgdGhlIHJlbGF0aW9uXG4gICAqL1xuICBnZXRUeXBlKCkge1xuICAgIHJldHVybiBTUElOQUxfUkVMQVRJT05fTFNUX1BUUl9UWVBFO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjaGlsZCB0byB0aGUgcmVsYXRpb24uXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZSB8IE1vZGVsfSBub2RlIE5vZGUgb3IgbW9kZWwgdG8gYWRkXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFNwaW5hbE5vZGU+fSBQcm9taXNlIGNvbnRhaW5pbmcgdGhlIG5vZGUgdGhhdCB3YXMgYWRkZWRcbiAgICovXG4gIGFzeW5jIGFkZENoaWxkKG5vZGUpIHtcbiAgICBpZiAoIShub2RlIGluc3RhbmNlb2YgZ2xvYmFsVHlwZS5Nb2RlbCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgXCJDYW5ub3QgYWRkIGEgY2hpbGQgd2l0Y2ggaXMgbm90IGFuIGluc3RhbmNlIG9mIFNwaW5hbE5vZGUgb3IgTW9kZWwuXCJcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmICghKG5vZGUgaW5zdGFuY2VvZiBTcGluYWxOb2RlKSkge1xuICAgICAgbm9kZSA9IG5ldyBTcGluYWxOb2RlKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBub2RlKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZ2V0Q2hpbGRyZW5JZHMoKS5pbmNsdWRlcyhub2RlLmdldElkKCkuZ2V0KCkpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgYWRkIGEgY2hpbGQgdHdpY2UgdG8gdGhlIHNhbWUgcmVsYXRpb24uXCIpO1xuICAgIH1cblxuICAgIG5vZGUuX2FkZFBhcmVudCh0aGlzKTtcbiAgICB0aGlzLmNoaWxkcmVuLnB1c2gobmV3IFNwaW5hbE5vZGVQb2ludGVyKG5vZGUpKTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgY2hpbGQgZnJvbSB0aGUgcmVsYXRpb24uXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZX0gbm9kZSBDaGlsZCB0byByZW1vdmVcbiAgICogQHJldHVybnMge1Byb21pc2U8Qm9vbGVhbj59IEEgcHJvbWlzZSBjb250YWluaW5nIHRydWUgaWYgdGhlIG5vZGUgd2FzIGEgY2hpbGRcbiAgICovXG4gIHJlbW92ZUNoaWxkKG5vZGUpIHtcbiAgICBsZXQgZm91bmQgPSBmYWxzZTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMuY2hpbGRyZW5baV0uZ2V0SWQoKSA9PT0gbm9kZS5nZXRJZCgpKSB7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGksIDEpO1xuICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghZm91bmQpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xuICAgIH1cblxuICAgIG5vZGUuX3JlbW92ZVBhcmVudCh0aGlzKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpO1xuICB9XG59XG5cbnNwaW5hbENvcmUucmVnaXN0ZXJfbW9kZWxzKFtTcGluYWxSZWxhdGlvbkxzdFB0cl0pO1xuZXhwb3J0IGRlZmF1bHQgU3BpbmFsUmVsYXRpb25Mc3RQdHI7XG4iXX0=