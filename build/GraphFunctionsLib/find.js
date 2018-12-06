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
    } else if (!(context instanceof _index.SpinalContext)) {
      throw new Error("The context must be a SpinalContext");
    } else if (typeof predicate !== "function") {
      throw new Error("The predicate function must be a function");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9HcmFwaEZ1bmN0aW9uc0xpYi9maW5kLmpzIl0sIm5hbWVzIjpbIkRFRkFVTFRfUFJFRElDQVRFIiwiZmluZCIsInN0YXJ0aW5nTm9kZSIsInJlbGF0aW9uTmFtZXMiLCJwcmVkaWNhdGUiLCJFcnJvciIsIlNwaW5hbE5vZGUiLCJzZWVuIiwiU2V0IiwiY2hpbGRyZW4iLCJjdXJyZW50IiwiZm91bmQiLCJuZXdDaGlsZHJlbiIsImdldENoaWxkcmVuIiwibmV3Q2hpbGQiLCJoYXMiLCJwdXNoIiwiYWRkIiwic2hpZnQiLCJmaW5kSW5Db250ZXh0IiwiY29udGV4dCIsIlNwaW5hbENvbnRleHQiLCJnZXRDaGlsZHJlbkluQ29udGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUF1QkE7Ozs7OztBQUtBLE1BQU1BLGlCQUFpQixHQUFHLE1BQU0sSUFBaEM7QUFFQTs7Ozs7Ozs7O1NBT2VDLEk7OztBQWtDZjs7Ozs7Ozs7Ozs0QkFsQ0EsV0FBb0JDLFlBQXBCLEVBQWtDQyxhQUFsQyxFQUFpREMsU0FBUyxHQUFHSixpQkFBN0QsRUFBZ0Y7QUFDOUUsUUFBSSxPQUFPRSxZQUFQLEtBQXdCLFdBQTVCLEVBQXlDO0FBQ3ZDLFlBQU1HLEtBQUssQ0FBQywrQkFBRCxDQUFYO0FBQ0QsS0FGRCxNQUVPLElBQUksRUFBRUgsWUFBWSxZQUFZSSxpQkFBMUIsQ0FBSixFQUEyQztBQUNoRCxZQUFNLElBQUlELEtBQUosQ0FBVSx3Q0FBVixDQUFOO0FBQ0QsS0FGTSxNQUVBLElBQUksT0FBT0QsU0FBUCxLQUFxQixVQUF6QixFQUFxQztBQUMxQyxZQUFNLElBQUlDLEtBQUosQ0FBVSw4QkFBVixDQUFOO0FBQ0Q7O0FBRUQsUUFBSUUsSUFBSSxHQUFHLElBQUlDLEdBQUosQ0FBUSxDQUFDTixZQUFELENBQVIsQ0FBWDtBQUNBLFFBQUlPLFFBQVEsR0FBRyxFQUFmO0FBQ0EsUUFBSUMsT0FBTyxHQUFHUixZQUFkO0FBQ0EsUUFBSVMsS0FBSyxHQUFHLEVBQVo7O0FBRUEsV0FBT0QsT0FBUCxFQUFnQjtBQUNkLFVBQUlFLFdBQVcsU0FBU0YsT0FBTyxDQUFDRyxXQUFSLENBQW9CVixhQUFwQixDQUF4QjtBQURjO0FBQUE7QUFBQTs7QUFBQTtBQUdkLDZCQUFxQlMsV0FBckIsOEhBQWtDO0FBQUEsY0FBekJFLFFBQXlCOztBQUNoQyxjQUFJLENBQUNQLElBQUksQ0FBQ1EsR0FBTCxDQUFTRCxRQUFULENBQUwsRUFBeUI7QUFDdkJMLFlBQUFBLFFBQVEsQ0FBQ08sSUFBVCxDQUFjRixRQUFkO0FBQ0FQLFlBQUFBLElBQUksQ0FBQ1UsR0FBTCxDQUFTSCxRQUFUO0FBQ0Q7QUFDRjtBQVJhO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBVWQsVUFBSVYsU0FBUyxDQUFDTSxPQUFELENBQWIsRUFBd0I7QUFDdEJDLFFBQUFBLEtBQUssQ0FBQ0ssSUFBTixDQUFXTixPQUFYO0FBQ0Q7O0FBRURBLE1BQUFBLE9BQU8sR0FBR0QsUUFBUSxDQUFDUyxLQUFULEVBQVY7QUFDRDs7QUFFRCxXQUFPUCxLQUFQO0FBQ0QsRzs7OztTQVNjUSxhOzs7OztxQ0FBZixXQUE2QmpCLFlBQTdCLEVBQTJDa0IsT0FBM0MsRUFBb0RoQixTQUFTLEdBQzdESixpQkFEQSxFQUNtQjtBQUNqQixRQUFJLE9BQU9FLFlBQVAsS0FBd0IsV0FBNUIsRUFBeUM7QUFDdkMsWUFBTUcsS0FBSyxDQUFDLCtCQUFELENBQVg7QUFDRCxLQUZELE1BRU8sSUFBSSxFQUFFSCxZQUFZLFlBQVlJLGlCQUExQixDQUFKLEVBQTJDO0FBQ2hELFlBQU0sSUFBSUQsS0FBSixDQUFVLHdDQUFWLENBQU47QUFDRCxLQUZNLE1BRUEsSUFBSSxFQUFFZSxPQUFPLFlBQVlDLG9CQUFyQixDQUFKLEVBQXlDO0FBQzlDLFlBQU0sSUFBSWhCLEtBQUosQ0FBVSxxQ0FBVixDQUFOO0FBQ0QsS0FGTSxNQUVBLElBQUksT0FBT0QsU0FBUCxLQUFxQixVQUF6QixFQUFxQztBQUMxQyxZQUFNLElBQUlDLEtBQUosQ0FBVSwyQ0FBVixDQUFOO0FBQ0Q7O0FBRUQsUUFBSUUsSUFBSSxHQUFHLElBQUlDLEdBQUosQ0FBUSxDQUFDTixZQUFELENBQVIsQ0FBWDtBQUNBLFFBQUlPLFFBQVEsR0FBRyxFQUFmO0FBQ0EsUUFBSUMsT0FBTyxHQUFHUixZQUFkO0FBQ0EsUUFBSVMsS0FBSyxHQUFHLEVBQVo7O0FBRUEsV0FBT0QsT0FBUCxFQUFnQjtBQUNkLFVBQUlFLFdBQVcsU0FBU0YsT0FBTyxDQUFDWSxvQkFBUixDQUE2QkYsT0FBN0IsQ0FBeEI7QUFEYztBQUFBO0FBQUE7O0FBQUE7QUFHZCw4QkFBcUJSLFdBQXJCLG1JQUFrQztBQUFBLGNBQXpCRSxRQUF5Qjs7QUFDaEMsY0FBSSxDQUFDUCxJQUFJLENBQUNRLEdBQUwsQ0FBU0QsUUFBVCxDQUFMLEVBQXlCO0FBQ3ZCTCxZQUFBQSxRQUFRLENBQUNPLElBQVQsQ0FBY0YsUUFBZDtBQUNBUCxZQUFBQSxJQUFJLENBQUNVLEdBQUwsQ0FBU0gsUUFBVDtBQUNEO0FBQ0Y7QUFSYTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVVkLFVBQUlWLFNBQVMsQ0FBQ00sT0FBRCxDQUFiLEVBQXdCO0FBQ3RCQyxRQUFBQSxLQUFLLENBQUNLLElBQU4sQ0FBV04sT0FBWDtBQUNEOztBQUVEQSxNQUFBQSxPQUFPLEdBQUdELFFBQVEsQ0FBQ1MsS0FBVCxFQUFWO0FBQ0Q7O0FBRUQsV0FBT1AsS0FBUDtBQUNELEciLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTggU3BpbmFsQ29tIC0gd3d3LnNwaW5hbGNvbS5jb21cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBTcGluYWxDb3JlLlxuICpcbiAqIFBsZWFzZSByZWFkIGFsbCBvZiB0aGUgZm9sbG93aW5nIHRlcm1zIGFuZCBjb25kaXRpb25zXG4gKiBvZiB0aGUgRnJlZSBTb2Z0d2FyZSBsaWNlbnNlIEFncmVlbWVudCAoXCJBZ3JlZW1lbnRcIilcbiAqIGNhcmVmdWxseS5cbiAqXG4gKiBUaGlzIEFncmVlbWVudCBpcyBhIGxlZ2FsbHkgYmluZGluZyBjb250cmFjdCBiZXR3ZWVuXG4gKiB0aGUgTGljZW5zZWUgKGFzIGRlZmluZWQgYmVsb3cpIGFuZCBTcGluYWxDb20gdGhhdFxuICogc2V0cyBmb3J0aCB0aGUgdGVybXMgYW5kIGNvbmRpdGlvbnMgdGhhdCBnb3Zlcm4geW91clxuICogdXNlIG9mIHRoZSBQcm9ncmFtLiBCeSBpbnN0YWxsaW5nIGFuZC9vciB1c2luZyB0aGVcbiAqIFByb2dyYW0sIHlvdSBhZ3JlZSB0byBhYmlkZSBieSBhbGwgdGhlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucyBzdGF0ZWQgb3IgcmVmZXJlbmNlZCBoZXJlaW4uXG4gKlxuICogSWYgeW91IGRvIG5vdCBhZ3JlZSB0byBhYmlkZSBieSB0aGVzZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMsIGRvIG5vdCBkZW1vbnN0cmF0ZSB5b3VyIGFjY2VwdGFuY2UgYW5kIGRvXG4gKiBub3QgaW5zdGFsbCBvciB1c2UgdGhlIFByb2dyYW0uXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFsb25nXG4gKiB3aXRoIHRoaXMgZmlsZS4gSWYgbm90LCBzZWVcbiAqIDxodHRwOi8vcmVzb3VyY2VzLnNwaW5hbGNvbS5jb20vbGljZW5zZXMucGRmPi5cbiAqL1xuaW1wb3J0IHtcbiAgU3BpbmFsTm9kZSxcbiAgU3BpbmFsQ29udGV4dFxufSBmcm9tIFwiLi4vaW5kZXhcIjtcblxuY29uc3QgREVGQVVMVF9QUkVESUNBVEUgPSAoKSA9PiB0cnVlO1xuXG4vKipcbiAqIEZpbmRzIGFsbCB0aGUgbm9kZXMgdW5kZXIgdGhlIHN0YXJ0aW5nIG5vZGUgZm9yIHdoaWNoIHRoZSBwcmVkaWNhdGUgaXMgdHJ1ZS5cbiAqIEBwYXJhbSB7U3BpbmFsTm9kZX0gc3RhcnRpbmdOb2RlIFRoZSBub2RlIGZyb20gd2hpY2ggdGhlIHRyYXZlcnNhbCBzdGFydHNcbiAqIEBwYXJhbSB7QXJyYXk8U3RyaW5nPn0gcmVsYXRpb25OYW1lcyBBcnJheSBjb250YWluaW5nIHRoZSByZWxhdGlvbiBuYW1lcyB0byBmb2xsb3dcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHByZWRpY2F0ZSBGdW5jdGlvbiByZXR1cm5pbmcgdHJ1ZSBpZiB0aGUgbm9kZSBuZWVkcyB0byBiZSByZXR1cm5lZFxuICogQHJldHVybiB7UHJvbWlzZTxBcnJheTxTcGluYWxOb2RlPj59IFRoZSBub2RlcyB0aGF0IHdlcmUgZm91bmRcbiAqL1xuYXN5bmMgZnVuY3Rpb24gZmluZChzdGFydGluZ05vZGUsIHJlbGF0aW9uTmFtZXMsIHByZWRpY2F0ZSA9IERFRkFVTFRfUFJFRElDQVRFKSB7XG4gIGlmICh0eXBlb2Ygc3RhcnRpbmdOb2RlID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdGhyb3cgRXJyb3IoXCJZb3UgbXVzdCBnaXZlIGEgc3RhcnRpbmcgbm9kZVwiKTtcbiAgfSBlbHNlIGlmICghKHN0YXJ0aW5nTm9kZSBpbnN0YW5jZW9mIFNwaW5hbE5vZGUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0YXJ0aW5nIG5vZGUgbXVzdCBiZSBhIFNwaW5hbE5vZGVcIik7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHByZWRpY2F0ZSAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwicHJlZGljYXRlIG11c3QgYmUgYSBmdW5jdGlvblwiKTtcbiAgfVxuXG4gIGxldCBzZWVuID0gbmV3IFNldChbc3RhcnRpbmdOb2RlXSk7XG4gIGxldCBjaGlsZHJlbiA9IFtdO1xuICBsZXQgY3VycmVudCA9IHN0YXJ0aW5nTm9kZTtcbiAgbGV0IGZvdW5kID0gW107XG5cbiAgd2hpbGUgKGN1cnJlbnQpIHtcbiAgICBsZXQgbmV3Q2hpbGRyZW4gPSBhd2FpdCBjdXJyZW50LmdldENoaWxkcmVuKHJlbGF0aW9uTmFtZXMpO1xuXG4gICAgZm9yIChsZXQgbmV3Q2hpbGQgb2YgbmV3Q2hpbGRyZW4pIHtcbiAgICAgIGlmICghc2Vlbi5oYXMobmV3Q2hpbGQpKSB7XG4gICAgICAgIGNoaWxkcmVuLnB1c2gobmV3Q2hpbGQpO1xuICAgICAgICBzZWVuLmFkZChuZXdDaGlsZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHByZWRpY2F0ZShjdXJyZW50KSkge1xuICAgICAgZm91bmQucHVzaChjdXJyZW50KTtcbiAgICB9XG5cbiAgICBjdXJyZW50ID0gY2hpbGRyZW4uc2hpZnQoKTtcbiAgfVxuXG4gIHJldHVybiBmb3VuZDtcbn1cblxuLyoqXG4gKiBGaW5kcyBhbGwgdGhlIG5vZGVzIHVuZGVyIHRoZSBzdGFydGluZyBub2RlIHRoYXQgYXJlIGluIHRoZSBjb250ZXh0IGFuZCBmb3Igd2hpY2ggdGhlIHByZWRpY2F0ZSBpcyB0cnVlLlxuICogQHBhcmFtIHtTcGluYWxOb2RlfSBzdGFydGluZ05vZGUgVGhlIG5vZGUgZnJvbSB3aGljaCB0aGUgdHJhdmVyc2FsIHN0YXJ0c1xuICogQHBhcmFtIHtTcGluYWxDb250ZXh0fSBjb250ZXh0IENvbnRleHQgdG8gdXNlIGZvciB0aGUgc2VhcmNoXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcmVkaWNhdGUgRnVuY3Rpb24gcmV0dXJuaW5nIHRydWUgaWYgdGhlIG5vZGUgbmVlZHMgdG8gYmUgcmV0dXJuZWRcbiAqIEByZXR1cm4ge1Byb21pc2U8QXJyYXk8U3BpbmFsTm9kZT4+fSBUaGUgbm9kZXMgdGhhdCB3ZXJlIGZvdW5kXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGZpbmRJbkNvbnRleHQoc3RhcnRpbmdOb2RlLCBjb250ZXh0LCBwcmVkaWNhdGUgPVxuREVGQVVMVF9QUkVESUNBVEUpIHtcbiAgaWYgKHR5cGVvZiBzdGFydGluZ05vZGUgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB0aHJvdyBFcnJvcihcIllvdSBtdXN0IGdpdmUgYSBzdGFydGluZyBub2RlXCIpO1xuICB9IGVsc2UgaWYgKCEoc3RhcnRpbmdOb2RlIGluc3RhbmNlb2YgU3BpbmFsTm9kZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3RhcnRpbmcgbm9kZSBtdXN0IGJlIGEgU3BpbmFsTm9kZVwiKTtcbiAgfSBlbHNlIGlmICghKGNvbnRleHQgaW5zdGFuY2VvZiBTcGluYWxDb250ZXh0KSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBjb250ZXh0IG11c3QgYmUgYSBTcGluYWxDb250ZXh0XCIpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBwcmVkaWNhdGUgIT09IFwiZnVuY3Rpb25cIikge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBwcmVkaWNhdGUgZnVuY3Rpb24gbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICB9XG5cbiAgbGV0IHNlZW4gPSBuZXcgU2V0KFtzdGFydGluZ05vZGVdKTtcbiAgbGV0IGNoaWxkcmVuID0gW107XG4gIGxldCBjdXJyZW50ID0gc3RhcnRpbmdOb2RlO1xuICBsZXQgZm91bmQgPSBbXTtcblxuICB3aGlsZSAoY3VycmVudCkge1xuICAgIGxldCBuZXdDaGlsZHJlbiA9IGF3YWl0IGN1cnJlbnQuZ2V0Q2hpbGRyZW5JbkNvbnRleHQoY29udGV4dCk7XG5cbiAgICBmb3IgKGxldCBuZXdDaGlsZCBvZiBuZXdDaGlsZHJlbikge1xuICAgICAgaWYgKCFzZWVuLmhhcyhuZXdDaGlsZCkpIHtcbiAgICAgICAgY2hpbGRyZW4ucHVzaChuZXdDaGlsZCk7XG4gICAgICAgIHNlZW4uYWRkKG5ld0NoaWxkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocHJlZGljYXRlKGN1cnJlbnQpKSB7XG4gICAgICBmb3VuZC5wdXNoKGN1cnJlbnQpO1xuICAgIH1cblxuICAgIGN1cnJlbnQgPSBjaGlsZHJlbi5zaGlmdCgpO1xuICB9XG5cbiAgcmV0dXJuIGZvdW5kO1xufVxuXG5leHBvcnQge1xuICBmaW5kLFxuICBmaW5kSW5Db250ZXh0XG59O1xuIl19