"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forEach = forEach;
exports.forEachInContext = forEachInContext;

var _index = require("../index");

var _find = require("./find");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Applies a function to all the nodes under the starting node.
 * @param {SpinalNode} startingNode The node from which the traversal starts
 * @param {Array<String>} relationNames Array containing the relation names to follow
 * @param {function} callback Function that takes a node
 */
function forEach(_x, _x2, _x3) {
  return _forEach.apply(this, arguments);
}
/**
 * Applies a function to all the nodes under the starting node.
 * @param {SpinalNode} startingNode The node from which the traversal starts
 * @param {SpinalContext} context Context to use for the search
 * @param {function} callback Function that takes a node
 */


function _forEach() {
  _forEach = _asyncToGenerator(function* (startingNode, relationNames, callback) {
    if (typeof callback === "undefined") {
      throw Error("You must give a callback function");
    } else if (typeof callback !== "function") {
      throw new Error("The callback function must be a function");
    }

    let nodes = yield (0, _find.find)(startingNode, relationNames);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        let node = _step.value;
        callback(node);
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
  });
  return _forEach.apply(this, arguments);
}

function forEachInContext(_x4, _x5, _x6) {
  return _forEachInContext.apply(this, arguments);
}

function _forEachInContext() {
  _forEachInContext = _asyncToGenerator(function* (startingNode, context, callback) {
    if (typeof callback === "undefined") {
      throw Error("You must give a callback function");
    } else if (typeof callback !== "function") {
      throw new Error("The callback function must be a function");
    }

    let nodes = yield (0, _find.findInContext)(startingNode, context);
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = nodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        let node = _step2.value;
        callback(node);
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
  });
  return _forEachInContext.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9HcmFwaEZ1bmN0aW9uc0xpYi9mb3JFYWNoLmpzIl0sIm5hbWVzIjpbImZvckVhY2giLCJzdGFydGluZ05vZGUiLCJyZWxhdGlvbk5hbWVzIiwiY2FsbGJhY2siLCJFcnJvciIsIm5vZGVzIiwibm9kZSIsImZvckVhY2hJbkNvbnRleHQiLCJjb250ZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQXVCQTs7QUFDQTs7Ozs7O0FBS0E7Ozs7OztTQU1lQSxPOzs7QUFjZjs7Ozs7Ozs7OytCQWRBLFdBQXVCQyxZQUF2QixFQUFxQ0MsYUFBckMsRUFBb0RDLFFBQXBELEVBQThEO0FBQzVELFFBQUksT0FBT0EsUUFBUCxLQUFvQixXQUF4QixFQUFxQztBQUNuQyxZQUFNQyxLQUFLLENBQUMsbUNBQUQsQ0FBWDtBQUNELEtBRkQsTUFFTyxJQUFJLE9BQU9ELFFBQVAsS0FBb0IsVUFBeEIsRUFBb0M7QUFDekMsWUFBTSxJQUFJQyxLQUFKLENBQVUsMENBQVYsQ0FBTjtBQUNEOztBQUVELFFBQUlDLEtBQUssU0FBUyxnQkFBS0osWUFBTCxFQUFtQkMsYUFBbkIsQ0FBbEI7QUFQNEQ7QUFBQTtBQUFBOztBQUFBO0FBUzVELDJCQUFpQkcsS0FBakIsOEhBQXdCO0FBQUEsWUFBZkMsSUFBZTtBQUN0QkgsUUFBQUEsUUFBUSxDQUFDRyxJQUFELENBQVI7QUFDRDtBQVgyRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBWTdELEc7Ozs7U0FRY0MsZ0I7Ozs7O3dDQUFmLFdBQWdDTixZQUFoQyxFQUE4Q08sT0FBOUMsRUFBdURMLFFBQXZELEVBQWlFO0FBQy9ELFFBQUksT0FBT0EsUUFBUCxLQUFvQixXQUF4QixFQUFxQztBQUNuQyxZQUFNQyxLQUFLLENBQUMsbUNBQUQsQ0FBWDtBQUNELEtBRkQsTUFFTyxJQUFJLE9BQU9ELFFBQVAsS0FBb0IsVUFBeEIsRUFBb0M7QUFDekMsWUFBTSxJQUFJQyxLQUFKLENBQVUsMENBQVYsQ0FBTjtBQUNEOztBQUVELFFBQUlDLEtBQUssU0FBUyx5QkFBY0osWUFBZCxFQUE0Qk8sT0FBNUIsQ0FBbEI7QUFQK0Q7QUFBQTtBQUFBOztBQUFBO0FBUy9ELDRCQUFpQkgsS0FBakIsbUlBQXdCO0FBQUEsWUFBZkMsSUFBZTtBQUN0QkgsUUFBQUEsUUFBUSxDQUFDRyxJQUFELENBQVI7QUFDRDtBQVg4RDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBWWhFLEciLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTggU3BpbmFsQ29tIC0gd3d3LnNwaW5hbGNvbS5jb21cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBTcGluYWxDb3JlLlxuICpcbiAqIFBsZWFzZSByZWFkIGFsbCBvZiB0aGUgZm9sbG93aW5nIHRlcm1zIGFuZCBjb25kaXRpb25zXG4gKiBvZiB0aGUgRnJlZSBTb2Z0d2FyZSBsaWNlbnNlIEFncmVlbWVudCAoXCJBZ3JlZW1lbnRcIilcbiAqIGNhcmVmdWxseS5cbiAqXG4gKiBUaGlzIEFncmVlbWVudCBpcyBhIGxlZ2FsbHkgYmluZGluZyBjb250cmFjdCBiZXR3ZWVuXG4gKiB0aGUgTGljZW5zZWUgKGFzIGRlZmluZWQgYmVsb3cpIGFuZCBTcGluYWxDb20gdGhhdFxuICogc2V0cyBmb3J0aCB0aGUgdGVybXMgYW5kIGNvbmRpdGlvbnMgdGhhdCBnb3Zlcm4geW91clxuICogdXNlIG9mIHRoZSBQcm9ncmFtLiBCeSBpbnN0YWxsaW5nIGFuZC9vciB1c2luZyB0aGVcbiAqIFByb2dyYW0sIHlvdSBhZ3JlZSB0byBhYmlkZSBieSBhbGwgdGhlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucyBzdGF0ZWQgb3IgcmVmZXJlbmNlZCBoZXJlaW4uXG4gKlxuICogSWYgeW91IGRvIG5vdCBhZ3JlZSB0byBhYmlkZSBieSB0aGVzZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMsIGRvIG5vdCBkZW1vbnN0cmF0ZSB5b3VyIGFjY2VwdGFuY2UgYW5kIGRvXG4gKiBub3QgaW5zdGFsbCBvciB1c2UgdGhlIFByb2dyYW0uXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFsb25nXG4gKiB3aXRoIHRoaXMgZmlsZS4gSWYgbm90LCBzZWVcbiAqIDxodHRwOi8vcmVzb3VyY2VzLnNwaW5hbGNvbS5jb20vbGljZW5zZXMucGRmPi5cbiAqL1xuaW1wb3J0IHtTcGluYWxOb2RlfSBmcm9tIFwiLi4vaW5kZXhcIjtcbmltcG9ydCB7XG4gIGZpbmQsXG4gIGZpbmRJbkNvbnRleHRcbn0gZnJvbSBcIi4vZmluZFwiO1xuXG4vKipcbiAqIEFwcGxpZXMgYSBmdW5jdGlvbiB0byBhbGwgdGhlIG5vZGVzIHVuZGVyIHRoZSBzdGFydGluZyBub2RlLlxuICogQHBhcmFtIHtTcGluYWxOb2RlfSBzdGFydGluZ05vZGUgVGhlIG5vZGUgZnJvbSB3aGljaCB0aGUgdHJhdmVyc2FsIHN0YXJ0c1xuICogQHBhcmFtIHtBcnJheTxTdHJpbmc+fSByZWxhdGlvbk5hbWVzIEFycmF5IGNvbnRhaW5pbmcgdGhlIHJlbGF0aW9uIG5hbWVzIHRvIGZvbGxvd1xuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgRnVuY3Rpb24gdGhhdCB0YWtlcyBhIG5vZGVcbiAqL1xuYXN5bmMgZnVuY3Rpb24gZm9yRWFjaChzdGFydGluZ05vZGUsIHJlbGF0aW9uTmFtZXMsIGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB0aHJvdyBFcnJvcihcIllvdSBtdXN0IGdpdmUgYSBjYWxsYmFjayBmdW5jdGlvblwiKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBjYWxsYmFjayBmdW5jdGlvbiBtdXN0IGJlIGEgZnVuY3Rpb25cIik7XG4gIH1cblxuICBsZXQgbm9kZXMgPSBhd2FpdCBmaW5kKHN0YXJ0aW5nTm9kZSwgcmVsYXRpb25OYW1lcyk7XG5cbiAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xuICAgIGNhbGxiYWNrKG5vZGUpO1xuICB9XG59XG5cbi8qKlxuICogQXBwbGllcyBhIGZ1bmN0aW9uIHRvIGFsbCB0aGUgbm9kZXMgdW5kZXIgdGhlIHN0YXJ0aW5nIG5vZGUuXG4gKiBAcGFyYW0ge1NwaW5hbE5vZGV9IHN0YXJ0aW5nTm9kZSBUaGUgbm9kZSBmcm9tIHdoaWNoIHRoZSB0cmF2ZXJzYWwgc3RhcnRzXG4gKiBAcGFyYW0ge1NwaW5hbENvbnRleHR9IGNvbnRleHQgQ29udGV4dCB0byB1c2UgZm9yIHRoZSBzZWFyY2hcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIEZ1bmN0aW9uIHRoYXQgdGFrZXMgYSBub2RlXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGZvckVhY2hJbkNvbnRleHQoc3RhcnRpbmdOb2RlLCBjb250ZXh0LCBjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdGhyb3cgRXJyb3IoXCJZb3UgbXVzdCBnaXZlIGEgY2FsbGJhY2sgZnVuY3Rpb25cIik7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgY2FsbGJhY2sgZnVuY3Rpb24gbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICB9XG5cbiAgbGV0IG5vZGVzID0gYXdhaXQgZmluZEluQ29udGV4dChzdGFydGluZ05vZGUsIGNvbnRleHQpO1xuXG4gIGZvciAobGV0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICBjYWxsYmFjayhub2RlKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBmb3JFYWNoLFxuICBmb3JFYWNoSW5Db250ZXh0XG59O1xuIl19