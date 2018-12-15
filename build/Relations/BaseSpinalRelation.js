"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _spinalCoreConnectorjs = _interopRequireDefault(require("spinal-core-connectorjs"));

var _Utilities = require("../Utilities");

var _index = require("../index");

var _SpinalNodePointer = _interopRequireDefault(require("../SpinalNodePointer"));

var _SpinalMap = _interopRequireDefault(require("../SpinalMap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const globalType = typeof window === "undefined" ? global : window;

class BaseSpinalRelation extends globalType.Model {
  /**
   * Constructor for the BaseSpinalRelation class.
   * @param {SpinalNode} parent Parent of the relation
   * @param {string} name Name of the relation
   * @throws {TypeError} If the parent is not a node
   * @throws {TypeError} If the name is not a string
   */
  constructor(parent, name) {
    super(); // instanceof doesn't work here

    if (!_index.SpinalNode.prototype.isPrototypeOf(parent)) {
      throw TypeError("parent must be a node");
    }

    if (typeof name !== "string") {
      throw TypeError("name must be a string");
    }

    this.add_attr({
      id: (0, _Utilities.guid)(name),
      name: name,
      parent: new _SpinalNodePointer.default(parent),
      contextIds: new _SpinalMap.default()
    });
  }
  /**
   * Shortcut to id.
   * @returns {Str} Id of the relation
   */


  getId() {
    return this.id;
  }
  /**
   * Returns the name of the relation.
   * @returns {Str} Name of the relation
   */


  getName() {
    return this.name;
  }
  /**
   * Returns the parent of the relation.
   * @returns {Promise<SpinalNode>} Returns a promise where the resolve is the parent
   */


  getParent() {
    return this.parent.load();
  }
  /**
   * Adds an id to the context ids of the relation.
   * @param {string} id Id of the context
   * @throws {TypeError} If the id is not a string
   */


  addContextId(id) {
    if (typeof id !== "string") {
      throw TypeError("id must be a string");
    }

    if (!this.contextIds.has(id)) {
      this.contextIds.setElement(id, 0);
    }
  }
  /**
   * Returns a list of the contexts the relation is associated to.
   * @returns {Array<string>} A list of ids of the associated contexts
   */


  getContextIds() {
    return this.contextIds.keys();
  }
  /**
   * Returns true if the relation belongs to the context.
   * @param {SpinalContext} context The context that might own the node
   * @returns {Boolean} A boolean
   * @throws {TypeError} If the context is not a SpinalContext
   */


  belongsToContext(context) {
    if (!(context instanceof _index.SpinalContext)) {
      throw TypeError("context must be a SpinalContext");
    }

    return this.contextIds.has(context.getId().get());
  }
  /**
   * Removes children from the relation.
   * @param {Array<SpinalNode>} nodes Childs to remove
   * @returns {Promise<nothing>} An empty promise
   * @throws {Error} If one of the nodes is not a child
   */


  removeChildren(nodes) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const promises = [];

      if (nodes === undefined || nodes.length === 0) {
        nodes = yield _this.getChildren();
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          let node = _step.value;
          promises.push(_this.removeChild(node));
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

      try {
        yield Promise.all(promises);
      } catch (_unused) {
        throw Error("Could not remove all nodes");
      }
    })();
  }
  /**
   * Removes the relation from the graph.
   * @returns {Promise<nothing>} An empty promise
   */


  removeFromGraph() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      yield Promise.all([_this2._removeFromParent(), _this2.removeChildren()]);
    })();
  }
  /**
   * Removes the relation from the parent.
   * @returns {Promise<nothing>} An empty promise
   * @private
   */


  _removeFromParent() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const parent = yield _this3.getParent();

      const relationMap = parent._getChildrenType(_this3.getType());

      relationMap.delete(_this3.getName().get());

      _this3.parent.unset();
    })();
  }

}

_spinalCoreConnectorjs.default.register_models([BaseSpinalRelation]);

var _default = BaseSpinalRelation;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9SZWxhdGlvbnMvQmFzZVNwaW5hbFJlbGF0aW9uLmpzIl0sIm5hbWVzIjpbImdsb2JhbFR5cGUiLCJ3aW5kb3ciLCJnbG9iYWwiLCJCYXNlU3BpbmFsUmVsYXRpb24iLCJNb2RlbCIsImNvbnN0cnVjdG9yIiwicGFyZW50IiwibmFtZSIsIlNwaW5hbE5vZGUiLCJwcm90b3R5cGUiLCJpc1Byb3RvdHlwZU9mIiwiVHlwZUVycm9yIiwiYWRkX2F0dHIiLCJpZCIsIlNwaW5hbE5vZGVQb2ludGVyIiwiY29udGV4dElkcyIsIlNwaW5hbE1hcCIsImdldElkIiwiZ2V0TmFtZSIsImdldFBhcmVudCIsImxvYWQiLCJhZGRDb250ZXh0SWQiLCJoYXMiLCJzZXRFbGVtZW50IiwiZ2V0Q29udGV4dElkcyIsImtleXMiLCJiZWxvbmdzVG9Db250ZXh0IiwiY29udGV4dCIsIlNwaW5hbENvbnRleHQiLCJnZXQiLCJyZW1vdmVDaGlsZHJlbiIsIm5vZGVzIiwicHJvbWlzZXMiLCJ1bmRlZmluZWQiLCJsZW5ndGgiLCJnZXRDaGlsZHJlbiIsIm5vZGUiLCJwdXNoIiwicmVtb3ZlQ2hpbGQiLCJQcm9taXNlIiwiYWxsIiwiRXJyb3IiLCJyZW1vdmVGcm9tR3JhcGgiLCJfcmVtb3ZlRnJvbVBhcmVudCIsInJlbGF0aW9uTWFwIiwiX2dldENoaWxkcmVuVHlwZSIsImdldFR5cGUiLCJkZWxldGUiLCJ1bnNldCIsInNwaW5hbENvcmUiLCJyZWdpc3Rlcl9tb2RlbHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUF1QkE7O0FBQ0E7O0FBR0E7O0FBSUE7O0FBQ0E7Ozs7Ozs7O0FBRUEsTUFBTUEsVUFBVSxHQUFHLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NDLE1BQWhDLEdBQXlDRCxNQUE1RDs7QUFFQSxNQUFNRSxrQkFBTixTQUFpQ0gsVUFBVSxDQUFDSSxLQUE1QyxDQUFrRDtBQUNoRDs7Ozs7OztBQU9BQyxFQUFBQSxXQUFXLENBQUNDLE1BQUQsRUFBU0MsSUFBVCxFQUFlO0FBQ3hCLFlBRHdCLENBR3hCOztBQUNBLFFBQUksQ0FBQ0Msa0JBQVdDLFNBQVgsQ0FBcUJDLGFBQXJCLENBQW1DSixNQUFuQyxDQUFMLEVBQWlEO0FBQy9DLFlBQU1LLFNBQVMsQ0FBQyx1QkFBRCxDQUFmO0FBQ0Q7O0FBRUQsUUFBSSxPQUFPSixJQUFQLEtBQWdCLFFBQXBCLEVBQThCO0FBQzVCLFlBQU1JLFNBQVMsQ0FBQyx1QkFBRCxDQUFmO0FBQ0Q7O0FBRUQsU0FBS0MsUUFBTCxDQUFjO0FBQ1pDLE1BQUFBLEVBQUUsRUFBRSxxQkFBS04sSUFBTCxDQURRO0FBRVpBLE1BQUFBLElBQUksRUFBRUEsSUFGTTtBQUdaRCxNQUFBQSxNQUFNLEVBQUUsSUFBSVEsMEJBQUosQ0FBc0JSLE1BQXRCLENBSEk7QUFJWlMsTUFBQUEsVUFBVSxFQUFFLElBQUlDLGtCQUFKO0FBSkEsS0FBZDtBQU1EO0FBRUQ7Ozs7OztBQUlBQyxFQUFBQSxLQUFLLEdBQUc7QUFDTixXQUFPLEtBQUtKLEVBQVo7QUFDRDtBQUVEOzs7Ozs7QUFJQUssRUFBQUEsT0FBTyxHQUFHO0FBQ1IsV0FBTyxLQUFLWCxJQUFaO0FBQ0Q7QUFFRDs7Ozs7O0FBSUFZLEVBQUFBLFNBQVMsR0FBRztBQUNWLFdBQU8sS0FBS2IsTUFBTCxDQUFZYyxJQUFaLEVBQVA7QUFDRDtBQUVEOzs7Ozs7O0FBS0FDLEVBQUFBLFlBQVksQ0FBQ1IsRUFBRCxFQUFLO0FBQ2YsUUFBSSxPQUFPQSxFQUFQLEtBQWMsUUFBbEIsRUFBNEI7QUFDMUIsWUFBTUYsU0FBUyxDQUFDLHFCQUFELENBQWY7QUFDRDs7QUFFRCxRQUFJLENBQUMsS0FBS0ksVUFBTCxDQUFnQk8sR0FBaEIsQ0FBb0JULEVBQXBCLENBQUwsRUFBOEI7QUFDNUIsV0FBS0UsVUFBTCxDQUFnQlEsVUFBaEIsQ0FBMkJWLEVBQTNCLEVBQStCLENBQS9CO0FBQ0Q7QUFDRjtBQUVEOzs7Ozs7QUFJQVcsRUFBQUEsYUFBYSxHQUFHO0FBQ2QsV0FBTyxLQUFLVCxVQUFMLENBQWdCVSxJQUFoQixFQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7QUFNQUMsRUFBQUEsZ0JBQWdCLENBQUNDLE9BQUQsRUFBVTtBQUN4QixRQUFJLEVBQUVBLE9BQU8sWUFBWUMsb0JBQXJCLENBQUosRUFBeUM7QUFDdkMsWUFBTWpCLFNBQVMsQ0FBQyxpQ0FBRCxDQUFmO0FBQ0Q7O0FBRUQsV0FBTyxLQUFLSSxVQUFMLENBQWdCTyxHQUFoQixDQUFvQkssT0FBTyxDQUFDVixLQUFSLEdBQWdCWSxHQUFoQixFQUFwQixDQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7QUFNTUMsRUFBQUEsY0FBTixDQUFxQkMsS0FBckIsRUFBNEI7QUFBQTs7QUFBQTtBQUMxQixZQUFNQyxRQUFRLEdBQUcsRUFBakI7O0FBRUEsVUFBSUQsS0FBSyxLQUFLRSxTQUFWLElBQXVCRixLQUFLLENBQUNHLE1BQU4sS0FBaUIsQ0FBNUMsRUFBK0M7QUFDN0NILFFBQUFBLEtBQUssU0FBUyxLQUFJLENBQUNJLFdBQUwsRUFBZDtBQUNEOztBQUx5QjtBQUFBO0FBQUE7O0FBQUE7QUFPMUIsNkJBQWlCSixLQUFqQiw4SEFBd0I7QUFBQSxjQUFmSyxJQUFlO0FBQ3RCSixVQUFBQSxRQUFRLENBQUNLLElBQVQsQ0FBYyxLQUFJLENBQUNDLFdBQUwsQ0FBaUJGLElBQWpCLENBQWQ7QUFDRDtBQVR5QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVcxQixVQUFJO0FBQ0YsY0FBTUcsT0FBTyxDQUFDQyxHQUFSLENBQVlSLFFBQVosQ0FBTjtBQUNELE9BRkQsQ0FFRSxnQkFBTTtBQUNOLGNBQU1TLEtBQUssQ0FBQyw0QkFBRCxDQUFYO0FBQ0Q7QUFmeUI7QUFnQjNCO0FBRUQ7Ozs7OztBQUlNQyxFQUFBQSxlQUFOLEdBQXdCO0FBQUE7O0FBQUE7QUFDdEIsWUFBTUgsT0FBTyxDQUFDQyxHQUFSLENBQVksQ0FDaEIsTUFBSSxDQUFDRyxpQkFBTCxFQURnQixFQUVoQixNQUFJLENBQUNiLGNBQUwsRUFGZ0IsQ0FBWixDQUFOO0FBRHNCO0FBS3ZCO0FBRUQ7Ozs7Ozs7QUFLTWEsRUFBQUEsaUJBQU4sR0FBMEI7QUFBQTs7QUFBQTtBQUN4QixZQUFNckMsTUFBTSxTQUFTLE1BQUksQ0FBQ2EsU0FBTCxFQUFyQjs7QUFDQSxZQUFNeUIsV0FBVyxHQUFHdEMsTUFBTSxDQUFDdUMsZ0JBQVAsQ0FBd0IsTUFBSSxDQUFDQyxPQUFMLEVBQXhCLENBQXBCOztBQUVBRixNQUFBQSxXQUFXLENBQUNHLE1BQVosQ0FBbUIsTUFBSSxDQUFDN0IsT0FBTCxHQUFlVyxHQUFmLEVBQW5COztBQUNBLE1BQUEsTUFBSSxDQUFDdkIsTUFBTCxDQUFZMEMsS0FBWjtBQUx3QjtBQU16Qjs7QUF2SStDOztBQTBJbERDLCtCQUFXQyxlQUFYLENBQTJCLENBQUMvQyxrQkFBRCxDQUEzQjs7ZUFDZUEsa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTggU3BpbmFsQ29tIC0gd3d3LnNwaW5hbGNvbS5jb21cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBTcGluYWxDb3JlLlxuICpcbiAqIFBsZWFzZSByZWFkIGFsbCBvZiB0aGUgZm9sbG93aW5nIHRlcm1zIGFuZCBjb25kaXRpb25zXG4gKiBvZiB0aGUgRnJlZSBTb2Z0d2FyZSBsaWNlbnNlIEFncmVlbWVudCAoXCJBZ3JlZW1lbnRcIilcbiAqIGNhcmVmdWxseS5cbiAqXG4gKiBUaGlzIEFncmVlbWVudCBpcyBhIGxlZ2FsbHkgYmluZGluZyBjb250cmFjdCBiZXR3ZWVuXG4gKiB0aGUgTGljZW5zZWUgKGFzIGRlZmluZWQgYmVsb3cpIGFuZCBTcGluYWxDb20gdGhhdFxuICogc2V0cyBmb3J0aCB0aGUgdGVybXMgYW5kIGNvbmRpdGlvbnMgdGhhdCBnb3Zlcm4geW91clxuICogdXNlIG9mIHRoZSBQcm9ncmFtLiBCeSBpbnN0YWxsaW5nIGFuZC9vciB1c2luZyB0aGVcbiAqIFByb2dyYW0sIHlvdSBhZ3JlZSB0byBhYmlkZSBieSBhbGwgdGhlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucyBzdGF0ZWQgb3IgcmVmZXJlbmNlZCBoZXJlaW4uXG4gKlxuICogSWYgeW91IGRvIG5vdCBhZ3JlZSB0byBhYmlkZSBieSB0aGVzZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMsIGRvIG5vdCBkZW1vbnN0cmF0ZSB5b3VyIGFjY2VwdGFuY2UgYW5kIGRvXG4gKiBub3QgaW5zdGFsbCBvciB1c2UgdGhlIFByb2dyYW0uXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFsb25nXG4gKiB3aXRoIHRoaXMgZmlsZS4gSWYgbm90LCBzZWVcbiAqIDxodHRwOi8vcmVzb3VyY2VzLnNwaW5hbGNvbS5jb20vbGljZW5zZXMucGRmPi5cbiAqL1xuaW1wb3J0IHNwaW5hbENvcmUgZnJvbSBcInNwaW5hbC1jb3JlLWNvbm5lY3RvcmpzXCI7XG5pbXBvcnQge1xuICBndWlkXG59IGZyb20gXCIuLi9VdGlsaXRpZXNcIjtcbmltcG9ydCB7XG4gIFNwaW5hbE5vZGUsXG4gIFNwaW5hbENvbnRleHRcbn0gZnJvbSBcIi4uL2luZGV4XCI7XG5pbXBvcnQgU3BpbmFsTm9kZVBvaW50ZXIgZnJvbSBcIi4uL1NwaW5hbE5vZGVQb2ludGVyXCI7XG5pbXBvcnQgU3BpbmFsTWFwIGZyb20gXCIuLi9TcGluYWxNYXBcIjtcblxuY29uc3QgZ2xvYmFsVHlwZSA9IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB3aW5kb3c7XG5cbmNsYXNzIEJhc2VTcGluYWxSZWxhdGlvbiBleHRlbmRzIGdsb2JhbFR5cGUuTW9kZWwge1xuICAvKipcbiAgICogQ29uc3RydWN0b3IgZm9yIHRoZSBCYXNlU3BpbmFsUmVsYXRpb24gY2xhc3MuXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZX0gcGFyZW50IFBhcmVudCBvZiB0aGUgcmVsYXRpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgTmFtZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgcGFyZW50IGlzIG5vdCBhIG5vZGVcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgbmFtZSBpcyBub3QgYSBzdHJpbmdcbiAgICovXG4gIGNvbnN0cnVjdG9yKHBhcmVudCwgbmFtZSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICAvLyBpbnN0YW5jZW9mIGRvZXNuJ3Qgd29yayBoZXJlXG4gICAgaWYgKCFTcGluYWxOb2RlLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKHBhcmVudCkpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcInBhcmVudCBtdXN0IGJlIGEgbm9kZVwiKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG5hbWUgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcIm5hbWUgbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZF9hdHRyKHtcbiAgICAgIGlkOiBndWlkKG5hbWUpLFxuICAgICAgbmFtZTogbmFtZSxcbiAgICAgIHBhcmVudDogbmV3IFNwaW5hbE5vZGVQb2ludGVyKHBhcmVudCksXG4gICAgICBjb250ZXh0SWRzOiBuZXcgU3BpbmFsTWFwKClcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG9ydGN1dCB0byBpZC5cbiAgICogQHJldHVybnMge1N0cn0gSWQgb2YgdGhlIHJlbGF0aW9uXG4gICAqL1xuICBnZXRJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5pZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBuYW1lIG9mIHRoZSByZWxhdGlvbi5cbiAgICogQHJldHVybnMge1N0cn0gTmFtZSBvZiB0aGUgcmVsYXRpb25cbiAgICovXG4gIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBwYXJlbnQgb2YgdGhlIHJlbGF0aW9uLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxTcGluYWxOb2RlPn0gUmV0dXJucyBhIHByb21pc2Ugd2hlcmUgdGhlIHJlc29sdmUgaXMgdGhlIHBhcmVudFxuICAgKi9cbiAgZ2V0UGFyZW50KCkge1xuICAgIHJldHVybiB0aGlzLnBhcmVudC5sb2FkKCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhbiBpZCB0byB0aGUgY29udGV4dCBpZHMgb2YgdGhlIHJlbGF0aW9uLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgSWQgb2YgdGhlIGNvbnRleHRcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgaWQgaXMgbm90IGEgc3RyaW5nXG4gICAqL1xuICBhZGRDb250ZXh0SWQoaWQpIHtcbiAgICBpZiAodHlwZW9mIGlkICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJpZCBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5jb250ZXh0SWRzLmhhcyhpZCkpIHtcbiAgICAgIHRoaXMuY29udGV4dElkcy5zZXRFbGVtZW50KGlkLCAwKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGxpc3Qgb2YgdGhlIGNvbnRleHRzIHRoZSByZWxhdGlvbiBpcyBhc3NvY2lhdGVkIHRvLlxuICAgKiBAcmV0dXJucyB7QXJyYXk8c3RyaW5nPn0gQSBsaXN0IG9mIGlkcyBvZiB0aGUgYXNzb2NpYXRlZCBjb250ZXh0c1xuICAgKi9cbiAgZ2V0Q29udGV4dElkcygpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0SWRzLmtleXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHJlbGF0aW9uIGJlbG9uZ3MgdG8gdGhlIGNvbnRleHQuXG4gICAqIEBwYXJhbSB7U3BpbmFsQ29udGV4dH0gY29udGV4dCBUaGUgY29udGV4dCB0aGF0IG1pZ2h0IG93biB0aGUgbm9kZVxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gQSBib29sZWFuXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIGNvbnRleHQgaXMgbm90IGEgU3BpbmFsQ29udGV4dFxuICAgKi9cbiAgYmVsb25nc1RvQ29udGV4dChjb250ZXh0KSB7XG4gICAgaWYgKCEoY29udGV4dCBpbnN0YW5jZW9mIFNwaW5hbENvbnRleHQpKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJjb250ZXh0IG11c3QgYmUgYSBTcGluYWxDb250ZXh0XCIpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNvbnRleHRJZHMuaGFzKGNvbnRleHQuZ2V0SWQoKS5nZXQoKSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBjaGlsZHJlbiBmcm9tIHRoZSByZWxhdGlvbi5cbiAgICogQHBhcmFtIHtBcnJheTxTcGluYWxOb2RlPn0gbm9kZXMgQ2hpbGRzIHRvIHJlbW92ZVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxub3RoaW5nPn0gQW4gZW1wdHkgcHJvbWlzZVxuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgb25lIG9mIHRoZSBub2RlcyBpcyBub3QgYSBjaGlsZFxuICAgKi9cbiAgYXN5bmMgcmVtb3ZlQ2hpbGRyZW4obm9kZXMpIHtcbiAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuXG4gICAgaWYgKG5vZGVzID09PSB1bmRlZmluZWQgfHwgbm9kZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBub2RlcyA9IGF3YWl0IHRoaXMuZ2V0Q2hpbGRyZW4oKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICBwcm9taXNlcy5wdXNoKHRoaXMucmVtb3ZlQ2hpbGQobm9kZSkpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgfSBjYXRjaCB7XG4gICAgICB0aHJvdyBFcnJvcihcIkNvdWxkIG5vdCByZW1vdmUgYWxsIG5vZGVzXCIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSByZWxhdGlvbiBmcm9tIHRoZSBncmFwaC5cbiAgICogQHJldHVybnMge1Byb21pc2U8bm90aGluZz59IEFuIGVtcHR5IHByb21pc2VcbiAgICovXG4gIGFzeW5jIHJlbW92ZUZyb21HcmFwaCgpIHtcbiAgICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICB0aGlzLl9yZW1vdmVGcm9tUGFyZW50KCksXG4gICAgICB0aGlzLnJlbW92ZUNoaWxkcmVuKClcbiAgICBdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSByZWxhdGlvbiBmcm9tIHRoZSBwYXJlbnQuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPG5vdGhpbmc+fSBBbiBlbXB0eSBwcm9taXNlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhc3luYyBfcmVtb3ZlRnJvbVBhcmVudCgpIHtcbiAgICBjb25zdCBwYXJlbnQgPSBhd2FpdCB0aGlzLmdldFBhcmVudCgpO1xuICAgIGNvbnN0IHJlbGF0aW9uTWFwID0gcGFyZW50Ll9nZXRDaGlsZHJlblR5cGUodGhpcy5nZXRUeXBlKCkpO1xuXG4gICAgcmVsYXRpb25NYXAuZGVsZXRlKHRoaXMuZ2V0TmFtZSgpLmdldCgpKTtcbiAgICB0aGlzLnBhcmVudC51bnNldCgpO1xuICB9XG59XG5cbnNwaW5hbENvcmUucmVnaXN0ZXJfbW9kZWxzKFtCYXNlU3BpbmFsUmVsYXRpb25dKTtcbmV4cG9ydCBkZWZhdWx0IEJhc2VTcGluYWxSZWxhdGlvbjtcbiJdfQ==