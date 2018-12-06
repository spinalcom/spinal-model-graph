"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.find = find;
exports.findInContext = findInContext;

var _index = require("../index");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const DEFAULT_PREDICATE = () => true;
/**
 * Finds all the nodes under the starting node for which the predicate is true.
 * @param {SpinalNode} startingNode The node from which the traversal starts
 * @param {Array<String>} relationNames Array containing the relation names to follow
 * @param {function} predicate Function returning true if the node needs to be returned
 * @return {Promise<Array<SpinalNode>>} The nodes that were found
 */


function find(_x, _x2) {
  return _find.apply(this, arguments);
}
/**
 * Finds all the nodes under the starting node that are in the context and for which the predicate is true.
 * @param {SpinalNode} startingNode The node from which the traversal starts
 * @param {SpinalContext} context Context to use for the search
 * @param {function} predicate Function returning true if the node needs to be returned
 * @return {Promise<Array<SpinalNode>>} The nodes that were found
 */


function _find() {
  _find = _asyncToGenerator(function* (startingNode, relationNames, predicate = DEFAULT_PREDICATE) {
    if (typeof startingNode === "undefined") {
      throw Error("You must give a starting node");
    } else if (!(startingNode instanceof _index.SpinalNode)) {
      throw new Error("The starting node must be a SpinalNode");
    } else if (typeof predicate !== "function") {
      throw new Error("predicate must be a function");
    }

    let seen = new Set([startingNode]);
    let children = [];
    let current = startingNode;
    let found = [];

    while (current) {
      let newChildren = yield current.getChildren(relationNames);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = newChildren[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          let newChild = _step.value;

          if (!seen.has(newChild)) {
            children.push(newChild);
            seen.add(newChild);
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

      if (predicate(current)) {
        found.push(current);
      }

      current = children.shift();
    }

    return found;
  });
  return _find.apply(this, arguments);
}

function findInContext(_x3, _x4) {
  return _findInContext.apply(this, arguments);
}

function _findInContext() {
  _findInContext = _asyncToGenerator(function* (startingNode, context, predicate = DEFAULT_PREDICATE) {
    if (typeof startingNode === "undefined") {
      throw Error("You must give a starting node");
    } else if (!(startingNode instanceof _index.SpinalNode)) {
      throw new Error("The starting node must be a SpinalNode");
    } else if (typeof predicate !== "function") {
      throw new Error("predicate must be a function");
    }

    let seen = new Set([startingNode]);
    let children = [];
    let current = startingNode;
    let found = [];

    while (current) {
      let newChildren = yield current.getChildrenInContext(context);
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = newChildren[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          let newChild = _step2.value;

          if (!seen.has(newChild)) {
            children.push(newChild);
            seen.add(newChild);
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      if (predicate(current)) {
        found.push(current);
      }

      current = children.shift();
    }

    return found;
  });
  return _findInContext.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9HcmFwaEZ1bmN0aW9uc0xpYi9HcmFwaFRyYXZlcnNhbC5qcyJdLCJuYW1lcyI6WyJERUZBVUxUX1BSRURJQ0FURSIsImZpbmQiLCJzdGFydGluZ05vZGUiLCJyZWxhdGlvbk5hbWVzIiwicHJlZGljYXRlIiwiRXJyb3IiLCJTcGluYWxOb2RlIiwic2VlbiIsIlNldCIsImNoaWxkcmVuIiwiY3VycmVudCIsImZvdW5kIiwibmV3Q2hpbGRyZW4iLCJnZXRDaGlsZHJlbiIsIm5ld0NoaWxkIiwiaGFzIiwicHVzaCIsImFkZCIsInNoaWZ0IiwiZmluZEluQ29udGV4dCIsImNvbnRleHQiLCJnZXRDaGlsZHJlbkluQ29udGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUF1QkE7Ozs7OztBQUlBLE1BQU1BLGlCQUFpQixHQUFHLE1BQU0sSUFBaEM7QUFFQTs7Ozs7Ozs7O1NBT2VDLEk7OztBQWtDZjs7Ozs7Ozs7Ozs0QkFsQ0EsV0FBb0JDLFlBQXBCLEVBQWtDQyxhQUFsQyxFQUFpREMsU0FBUyxHQUFHSixpQkFBN0QsRUFBZ0Y7QUFDOUUsUUFBSSxPQUFPRSxZQUFQLEtBQXdCLFdBQTVCLEVBQXlDO0FBQ3ZDLFlBQU1HLEtBQUssQ0FBQywrQkFBRCxDQUFYO0FBQ0QsS0FGRCxNQUVPLElBQUksRUFBRUgsWUFBWSxZQUFZSSxpQkFBMUIsQ0FBSixFQUEyQztBQUNoRCxZQUFNLElBQUlELEtBQUosQ0FBVSx3Q0FBVixDQUFOO0FBQ0QsS0FGTSxNQUVBLElBQUksT0FBT0QsU0FBUCxLQUFxQixVQUF6QixFQUFxQztBQUMxQyxZQUFNLElBQUlDLEtBQUosQ0FBVSw4QkFBVixDQUFOO0FBQ0Q7O0FBRUQsUUFBSUUsSUFBSSxHQUFHLElBQUlDLEdBQUosQ0FBUSxDQUFDTixZQUFELENBQVIsQ0FBWDtBQUNBLFFBQUlPLFFBQVEsR0FBRyxFQUFmO0FBQ0EsUUFBSUMsT0FBTyxHQUFHUixZQUFkO0FBQ0EsUUFBSVMsS0FBSyxHQUFHLEVBQVo7O0FBRUEsV0FBT0QsT0FBUCxFQUFnQjtBQUNkLFVBQUlFLFdBQVcsU0FBU0YsT0FBTyxDQUFDRyxXQUFSLENBQW9CVixhQUFwQixDQUF4QjtBQURjO0FBQUE7QUFBQTs7QUFBQTtBQUdkLDZCQUFxQlMsV0FBckIsOEhBQWtDO0FBQUEsY0FBekJFLFFBQXlCOztBQUNoQyxjQUFJLENBQUNQLElBQUksQ0FBQ1EsR0FBTCxDQUFTRCxRQUFULENBQUwsRUFBeUI7QUFDdkJMLFlBQUFBLFFBQVEsQ0FBQ08sSUFBVCxDQUFjRixRQUFkO0FBQ0FQLFlBQUFBLElBQUksQ0FBQ1UsR0FBTCxDQUFTSCxRQUFUO0FBQ0Q7QUFDRjtBQVJhO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBVWQsVUFBSVYsU0FBUyxDQUFDTSxPQUFELENBQWIsRUFBd0I7QUFDdEJDLFFBQUFBLEtBQUssQ0FBQ0ssSUFBTixDQUFXTixPQUFYO0FBQ0Q7O0FBRURBLE1BQUFBLE9BQU8sR0FBR0QsUUFBUSxDQUFDUyxLQUFULEVBQVY7QUFDRDs7QUFFRCxXQUFPUCxLQUFQO0FBQ0QsRzs7OztTQVNjUSxhOzs7OztxQ0FBZixXQUE2QmpCLFlBQTdCLEVBQTJDa0IsT0FBM0MsRUFBb0RoQixTQUFTLEdBQUdKLGlCQUFoRSxFQUFtRjtBQUNqRixRQUFJLE9BQU9FLFlBQVAsS0FBd0IsV0FBNUIsRUFBeUM7QUFDdkMsWUFBTUcsS0FBSyxDQUFDLCtCQUFELENBQVg7QUFDRCxLQUZELE1BRU8sSUFBSSxFQUFFSCxZQUFZLFlBQVlJLGlCQUExQixDQUFKLEVBQTJDO0FBQ2hELFlBQU0sSUFBSUQsS0FBSixDQUFVLHdDQUFWLENBQU47QUFDRCxLQUZNLE1BRUEsSUFBSSxPQUFPRCxTQUFQLEtBQXFCLFVBQXpCLEVBQXFDO0FBQzFDLFlBQU0sSUFBSUMsS0FBSixDQUFVLDhCQUFWLENBQU47QUFDRDs7QUFFRCxRQUFJRSxJQUFJLEdBQUcsSUFBSUMsR0FBSixDQUFRLENBQUNOLFlBQUQsQ0FBUixDQUFYO0FBQ0EsUUFBSU8sUUFBUSxHQUFHLEVBQWY7QUFDQSxRQUFJQyxPQUFPLEdBQUdSLFlBQWQ7QUFDQSxRQUFJUyxLQUFLLEdBQUcsRUFBWjs7QUFFQSxXQUFPRCxPQUFQLEVBQWdCO0FBQ2QsVUFBSUUsV0FBVyxTQUFTRixPQUFPLENBQUNXLG9CQUFSLENBQTZCRCxPQUE3QixDQUF4QjtBQURjO0FBQUE7QUFBQTs7QUFBQTtBQUdkLDhCQUFxQlIsV0FBckIsbUlBQWtDO0FBQUEsY0FBekJFLFFBQXlCOztBQUNoQyxjQUFJLENBQUNQLElBQUksQ0FBQ1EsR0FBTCxDQUFTRCxRQUFULENBQUwsRUFBeUI7QUFDdkJMLFlBQUFBLFFBQVEsQ0FBQ08sSUFBVCxDQUFjRixRQUFkO0FBQ0FQLFlBQUFBLElBQUksQ0FBQ1UsR0FBTCxDQUFTSCxRQUFUO0FBQ0Q7QUFDRjtBQVJhO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBVWQsVUFBSVYsU0FBUyxDQUFDTSxPQUFELENBQWIsRUFBd0I7QUFDdEJDLFFBQUFBLEtBQUssQ0FBQ0ssSUFBTixDQUFXTixPQUFYO0FBQ0Q7O0FBRURBLE1BQUFBLE9BQU8sR0FBR0QsUUFBUSxDQUFDUyxLQUFULEVBQVY7QUFDRDs7QUFFRCxXQUFPUCxLQUFQO0FBQ0QsRyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOCBTcGluYWxDb20gLSB3d3cuc3BpbmFsY29tLmNvbVxuICogXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBTcGluYWxDb3JlLlxuICogXG4gKiBQbGVhc2UgcmVhZCBhbGwgb2YgdGhlIGZvbGxvd2luZyB0ZXJtcyBhbmQgY29uZGl0aW9uc1xuICogb2YgdGhlIEZyZWUgU29mdHdhcmUgbGljZW5zZSBBZ3JlZW1lbnQgKFwiQWdyZWVtZW50XCIpXG4gKiBjYXJlZnVsbHkuXG4gKiBcbiAqIFRoaXMgQWdyZWVtZW50IGlzIGEgbGVnYWxseSBiaW5kaW5nIGNvbnRyYWN0IGJldHdlZW5cbiAqIHRoZSBMaWNlbnNlZSAoYXMgZGVmaW5lZCBiZWxvdykgYW5kIFNwaW5hbENvbSB0aGF0XG4gKiBzZXRzIGZvcnRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyB0aGF0IGdvdmVybiB5b3VyXG4gKiB1c2Ugb2YgdGhlIFByb2dyYW0uIEJ5IGluc3RhbGxpbmcgYW5kL29yIHVzaW5nIHRoZVxuICogUHJvZ3JhbSwgeW91IGFncmVlIHRvIGFiaWRlIGJ5IGFsbCB0aGUgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zIHN0YXRlZCBvciByZWZlcmVuY2VkIGhlcmVpbi5cbiAqIFxuICogSWYgeW91IGRvIG5vdCBhZ3JlZSB0byBhYmlkZSBieSB0aGVzZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMsIGRvIG5vdCBkZW1vbnN0cmF0ZSB5b3VyIGFjY2VwdGFuY2UgYW5kIGRvXG4gKiBub3QgaW5zdGFsbCBvciB1c2UgdGhlIFByb2dyYW0uXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFsb25nXG4gKiB3aXRoIHRoaXMgZmlsZS4gSWYgbm90LCBzZWVcbiAqIDxodHRwOi8vcmVzb3VyY2VzLnNwaW5hbGNvbS5jb20vbGljZW5zZXMucGRmPi5cbiAqL1xuaW1wb3J0IHtcbiAgU3BpbmFsTm9kZSxcbn0gZnJvbSBcIi4uL2luZGV4XCI7XG5cbmNvbnN0IERFRkFVTFRfUFJFRElDQVRFID0gKCkgPT4gdHJ1ZTtcblxuLyoqXG4gKiBGaW5kcyBhbGwgdGhlIG5vZGVzIHVuZGVyIHRoZSBzdGFydGluZyBub2RlIGZvciB3aGljaCB0aGUgcHJlZGljYXRlIGlzIHRydWUuXG4gKiBAcGFyYW0ge1NwaW5hbE5vZGV9IHN0YXJ0aW5nTm9kZSBUaGUgbm9kZSBmcm9tIHdoaWNoIHRoZSB0cmF2ZXJzYWwgc3RhcnRzXG4gKiBAcGFyYW0ge0FycmF5PFN0cmluZz59IHJlbGF0aW9uTmFtZXMgQXJyYXkgY29udGFpbmluZyB0aGUgcmVsYXRpb24gbmFtZXMgdG8gZm9sbG93XG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcmVkaWNhdGUgRnVuY3Rpb24gcmV0dXJuaW5nIHRydWUgaWYgdGhlIG5vZGUgbmVlZHMgdG8gYmUgcmV0dXJuZWRcbiAqIEByZXR1cm4ge1Byb21pc2U8QXJyYXk8U3BpbmFsTm9kZT4+fSBUaGUgbm9kZXMgdGhhdCB3ZXJlIGZvdW5kXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGZpbmQoc3RhcnRpbmdOb2RlLCByZWxhdGlvbk5hbWVzLCBwcmVkaWNhdGUgPSBERUZBVUxUX1BSRURJQ0FURSkge1xuICBpZiAodHlwZW9mIHN0YXJ0aW5nTm9kZSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHRocm93IEVycm9yKFwiWW91IG11c3QgZ2l2ZSBhIHN0YXJ0aW5nIG5vZGVcIik7XG4gIH0gZWxzZSBpZiAoIShzdGFydGluZ05vZGUgaW5zdGFuY2VvZiBTcGluYWxOb2RlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdGFydGluZyBub2RlIG11c3QgYmUgYSBTcGluYWxOb2RlXCIpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBwcmVkaWNhdGUgIT09IFwiZnVuY3Rpb25cIikge1xuICAgIHRocm93IG5ldyBFcnJvcihcInByZWRpY2F0ZSBtdXN0IGJlIGEgZnVuY3Rpb25cIik7XG4gIH1cblxuICBsZXQgc2VlbiA9IG5ldyBTZXQoW3N0YXJ0aW5nTm9kZV0pO1xuICBsZXQgY2hpbGRyZW4gPSBbXTtcbiAgbGV0IGN1cnJlbnQgPSBzdGFydGluZ05vZGU7XG4gIGxldCBmb3VuZCA9IFtdO1xuXG4gIHdoaWxlIChjdXJyZW50KSB7XG4gICAgbGV0IG5ld0NoaWxkcmVuID0gYXdhaXQgY3VycmVudC5nZXRDaGlsZHJlbihyZWxhdGlvbk5hbWVzKTtcblxuICAgIGZvciAobGV0IG5ld0NoaWxkIG9mIG5ld0NoaWxkcmVuKSB7XG4gICAgICBpZiAoIXNlZW4uaGFzKG5ld0NoaWxkKSkge1xuICAgICAgICBjaGlsZHJlbi5wdXNoKG5ld0NoaWxkKTtcbiAgICAgICAgc2Vlbi5hZGQobmV3Q2hpbGQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwcmVkaWNhdGUoY3VycmVudCkpIHtcbiAgICAgIGZvdW5kLnB1c2goY3VycmVudCk7XG4gICAgfVxuXG4gICAgY3VycmVudCA9IGNoaWxkcmVuLnNoaWZ0KCk7XG4gIH1cblxuICByZXR1cm4gZm91bmQ7XG59XG5cbi8qKlxuICogRmluZHMgYWxsIHRoZSBub2RlcyB1bmRlciB0aGUgc3RhcnRpbmcgbm9kZSB0aGF0IGFyZSBpbiB0aGUgY29udGV4dCBhbmQgZm9yIHdoaWNoIHRoZSBwcmVkaWNhdGUgaXMgdHJ1ZS5cbiAqIEBwYXJhbSB7U3BpbmFsTm9kZX0gc3RhcnRpbmdOb2RlIFRoZSBub2RlIGZyb20gd2hpY2ggdGhlIHRyYXZlcnNhbCBzdGFydHNcbiAqIEBwYXJhbSB7U3BpbmFsQ29udGV4dH0gY29udGV4dCBDb250ZXh0IHRvIHVzZSBmb3IgdGhlIHNlYXJjaFxuICogQHBhcmFtIHtmdW5jdGlvbn0gcHJlZGljYXRlIEZ1bmN0aW9uIHJldHVybmluZyB0cnVlIGlmIHRoZSBub2RlIG5lZWRzIHRvIGJlIHJldHVybmVkXG4gKiBAcmV0dXJuIHtQcm9taXNlPEFycmF5PFNwaW5hbE5vZGU+Pn0gVGhlIG5vZGVzIHRoYXQgd2VyZSBmb3VuZFxuICovXG5hc3luYyBmdW5jdGlvbiBmaW5kSW5Db250ZXh0KHN0YXJ0aW5nTm9kZSwgY29udGV4dCwgcHJlZGljYXRlID0gREVGQVVMVF9QUkVESUNBVEUpIHtcbiAgaWYgKHR5cGVvZiBzdGFydGluZ05vZGUgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB0aHJvdyBFcnJvcihcIllvdSBtdXN0IGdpdmUgYSBzdGFydGluZyBub2RlXCIpO1xuICB9IGVsc2UgaWYgKCEoc3RhcnRpbmdOb2RlIGluc3RhbmNlb2YgU3BpbmFsTm9kZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3RhcnRpbmcgbm9kZSBtdXN0IGJlIGEgU3BpbmFsTm9kZVwiKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgcHJlZGljYXRlICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJwcmVkaWNhdGUgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICB9XG5cbiAgbGV0IHNlZW4gPSBuZXcgU2V0KFtzdGFydGluZ05vZGVdKTtcbiAgbGV0IGNoaWxkcmVuID0gW107XG4gIGxldCBjdXJyZW50ID0gc3RhcnRpbmdOb2RlO1xuICBsZXQgZm91bmQgPSBbXTtcblxuICB3aGlsZSAoY3VycmVudCkge1xuICAgIGxldCBuZXdDaGlsZHJlbiA9IGF3YWl0IGN1cnJlbnQuZ2V0Q2hpbGRyZW5JbkNvbnRleHQoY29udGV4dCk7XG5cbiAgICBmb3IgKGxldCBuZXdDaGlsZCBvZiBuZXdDaGlsZHJlbikge1xuICAgICAgaWYgKCFzZWVuLmhhcyhuZXdDaGlsZCkpIHtcbiAgICAgICAgY2hpbGRyZW4ucHVzaChuZXdDaGlsZCk7XG4gICAgICAgIHNlZW4uYWRkKG5ld0NoaWxkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocHJlZGljYXRlKGN1cnJlbnQpKSB7XG4gICAgICBmb3VuZC5wdXNoKGN1cnJlbnQpO1xuICAgIH1cblxuICAgIGN1cnJlbnQgPSBjaGlsZHJlbi5zaGlmdCgpO1xuICB9XG5cbiAgcmV0dXJuIGZvdW5kO1xufVxuXG5leHBvcnQge1xuICBmaW5kLFxuICBmaW5kSW5Db250ZXh0XG59O1xuIl19