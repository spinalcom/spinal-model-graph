"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.map = map;
exports.mapInContext = mapInContext;

var _index = require("../index");

var _find = require("./find");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Applies a function to all the nodes under the starting node and returns the results in an array.
 * @param {SpinalNode} startingNode The node from which the traversal starts
 * @param {Array<String>} relationNames Array containing the relation names to follow
 * @param {function} callback Function that takes a node and returns something
 * @return {Promise<Array<*>>} The results
 */
function map(_x, _x2, _x3) {
  return _map.apply(this, arguments);
}
/**
 * Applies a function to all the nodes under the starting node that are in the context and returns the results in an array.
 * @param {SpinalNode} startingNode The node from which the traversal starts
 * @param {SpinalContext} context Context to use for the search
 * @param {function} callback Function that takes a node and returns something
 * @return {Promise<Array<*>>} The results
 */


function _map() {
  _map = _asyncToGenerator(function* (startingNode, relationNames, callback) {
    if (typeof callback === "undefined") {
      throw Error("You must give a callback function");
    } else if (typeof callback !== "function") {
      throw new Error("The callback function must be a function");
    }

    let nodes = yield (0, _find.find)(startingNode, relationNames);
    let results = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        let node = _step.value;
        results.push(callback(node));
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

    return results;
  });
  return _map.apply(this, arguments);
}

function mapInContext(_x4, _x5, _x6) {
  return _mapInContext.apply(this, arguments);
}

function _mapInContext() {
  _mapInContext = _asyncToGenerator(function* (startingNode, context, callback) {
    if (typeof callback === "undefined") {
      throw Error("You must give a callback function");
    } else if (typeof callback !== "function") {
      throw new Error("The callback function must be a function");
    }

    let nodes = yield (0, _find.findInContext)(startingNode, context);
    let results = [];
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = nodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        let node = _step2.value;
        results.push(callback(node));
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

    return results;
  });
  return _mapInContext.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9HcmFwaEZ1bmN0aW9uc0xpYi9tYXAuanMiXSwibmFtZXMiOlsibWFwIiwic3RhcnRpbmdOb2RlIiwicmVsYXRpb25OYW1lcyIsImNhbGxiYWNrIiwiRXJyb3IiLCJub2RlcyIsInJlc3VsdHMiLCJub2RlIiwicHVzaCIsIm1hcEluQ29udGV4dCIsImNvbnRleHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBdUJBOztBQUNBOzs7Ozs7QUFLQTs7Ozs7OztTQU9lQSxHOzs7QUFpQmY7Ozs7Ozs7Ozs7MkJBakJBLFdBQW1CQyxZQUFuQixFQUFpQ0MsYUFBakMsRUFBZ0RDLFFBQWhELEVBQTBEO0FBQ3hELFFBQUksT0FBT0EsUUFBUCxLQUFvQixXQUF4QixFQUFxQztBQUNuQyxZQUFNQyxLQUFLLENBQUMsbUNBQUQsQ0FBWDtBQUNELEtBRkQsTUFFTyxJQUFJLE9BQU9ELFFBQVAsS0FBb0IsVUFBeEIsRUFBb0M7QUFDekMsWUFBTSxJQUFJQyxLQUFKLENBQVUsMENBQVYsQ0FBTjtBQUNEOztBQUVELFFBQUlDLEtBQUssU0FBUyxnQkFBS0osWUFBTCxFQUFtQkMsYUFBbkIsQ0FBbEI7QUFDQSxRQUFJSSxPQUFPLEdBQUcsRUFBZDtBQVJ3RDtBQUFBO0FBQUE7O0FBQUE7QUFVeEQsMkJBQWlCRCxLQUFqQiw4SEFBd0I7QUFBQSxZQUFmRSxJQUFlO0FBQ3RCRCxRQUFBQSxPQUFPLENBQUNFLElBQVIsQ0FBYUwsUUFBUSxDQUFDSSxJQUFELENBQXJCO0FBQ0Q7QUFadUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFjeEQsV0FBT0QsT0FBUDtBQUNELEc7Ozs7U0FTY0csWTs7Ozs7b0NBQWYsV0FBNEJSLFlBQTVCLEVBQTBDUyxPQUExQyxFQUFtRFAsUUFBbkQsRUFBNkQ7QUFDM0QsUUFBSSxPQUFPQSxRQUFQLEtBQW9CLFdBQXhCLEVBQXFDO0FBQ25DLFlBQU1DLEtBQUssQ0FBQyxtQ0FBRCxDQUFYO0FBQ0QsS0FGRCxNQUVPLElBQUksT0FBT0QsUUFBUCxLQUFvQixVQUF4QixFQUFvQztBQUN6QyxZQUFNLElBQUlDLEtBQUosQ0FBVSwwQ0FBVixDQUFOO0FBQ0Q7O0FBRUQsUUFBSUMsS0FBSyxTQUFTLHlCQUFjSixZQUFkLEVBQTRCUyxPQUE1QixDQUFsQjtBQUNBLFFBQUlKLE9BQU8sR0FBRyxFQUFkO0FBUjJEO0FBQUE7QUFBQTs7QUFBQTtBQVUzRCw0QkFBaUJELEtBQWpCLG1JQUF3QjtBQUFBLFlBQWZFLElBQWU7QUFDdEJELFFBQUFBLE9BQU8sQ0FBQ0UsSUFBUixDQUFhTCxRQUFRLENBQUNJLElBQUQsQ0FBckI7QUFDRDtBQVowRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQWMzRCxXQUFPRCxPQUFQO0FBQ0QsRyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOCBTcGluYWxDb20gLSB3d3cuc3BpbmFsY29tLmNvbVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFNwaW5hbENvcmUuXG4gKlxuICogUGxlYXNlIHJlYWQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgdGVybXMgYW5kIGNvbmRpdGlvbnNcbiAqIG9mIHRoZSBGcmVlIFNvZnR3YXJlIGxpY2Vuc2UgQWdyZWVtZW50IChcIkFncmVlbWVudFwiKVxuICogY2FyZWZ1bGx5LlxuICpcbiAqIFRoaXMgQWdyZWVtZW50IGlzIGEgbGVnYWxseSBiaW5kaW5nIGNvbnRyYWN0IGJldHdlZW5cbiAqIHRoZSBMaWNlbnNlZSAoYXMgZGVmaW5lZCBiZWxvdykgYW5kIFNwaW5hbENvbSB0aGF0XG4gKiBzZXRzIGZvcnRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyB0aGF0IGdvdmVybiB5b3VyXG4gKiB1c2Ugb2YgdGhlIFByb2dyYW0uIEJ5IGluc3RhbGxpbmcgYW5kL29yIHVzaW5nIHRoZVxuICogUHJvZ3JhbSwgeW91IGFncmVlIHRvIGFiaWRlIGJ5IGFsbCB0aGUgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zIHN0YXRlZCBvciByZWZlcmVuY2VkIGhlcmVpbi5cbiAqXG4gKiBJZiB5b3UgZG8gbm90IGFncmVlIHRvIGFiaWRlIGJ5IHRoZXNlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucywgZG8gbm90IGRlbW9uc3RyYXRlIHlvdXIgYWNjZXB0YW5jZSBhbmQgZG9cbiAqIG5vdCBpbnN0YWxsIG9yIHVzZSB0aGUgUHJvZ3JhbS5cbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYWxvbmdcbiAqIHdpdGggdGhpcyBmaWxlLiBJZiBub3QsIHNlZVxuICogPGh0dHA6Ly9yZXNvdXJjZXMuc3BpbmFsY29tLmNvbS9saWNlbnNlcy5wZGY+LlxuICovXG5pbXBvcnQge1NwaW5hbE5vZGV9IGZyb20gXCIuLi9pbmRleFwiO1xuaW1wb3J0IHtcbiAgZmluZCxcbiAgZmluZEluQ29udGV4dFxufSBmcm9tIFwiLi9maW5kXCI7XG5cbi8qKlxuICogQXBwbGllcyBhIGZ1bmN0aW9uIHRvIGFsbCB0aGUgbm9kZXMgdW5kZXIgdGhlIHN0YXJ0aW5nIG5vZGUgYW5kIHJldHVybnMgdGhlIHJlc3VsdHMgaW4gYW4gYXJyYXkuXG4gKiBAcGFyYW0ge1NwaW5hbE5vZGV9IHN0YXJ0aW5nTm9kZSBUaGUgbm9kZSBmcm9tIHdoaWNoIHRoZSB0cmF2ZXJzYWwgc3RhcnRzXG4gKiBAcGFyYW0ge0FycmF5PFN0cmluZz59IHJlbGF0aW9uTmFtZXMgQXJyYXkgY29udGFpbmluZyB0aGUgcmVsYXRpb24gbmFtZXMgdG8gZm9sbG93XG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBGdW5jdGlvbiB0aGF0IHRha2VzIGEgbm9kZSBhbmQgcmV0dXJucyBzb21ldGhpbmdcbiAqIEByZXR1cm4ge1Byb21pc2U8QXJyYXk8Kj4+fSBUaGUgcmVzdWx0c1xuICovXG5hc3luYyBmdW5jdGlvbiBtYXAoc3RhcnRpbmdOb2RlLCByZWxhdGlvbk5hbWVzLCBjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdGhyb3cgRXJyb3IoXCJZb3UgbXVzdCBnaXZlIGEgY2FsbGJhY2sgZnVuY3Rpb25cIik7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgY2FsbGJhY2sgZnVuY3Rpb24gbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICB9XG5cbiAgbGV0IG5vZGVzID0gYXdhaXQgZmluZChzdGFydGluZ05vZGUsIHJlbGF0aW9uTmFtZXMpO1xuICBsZXQgcmVzdWx0cyA9IFtdO1xuXG4gIGZvciAobGV0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICByZXN1bHRzLnB1c2goY2FsbGJhY2sobm9kZSkpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdHM7XG59XG5cbi8qKlxuICogQXBwbGllcyBhIGZ1bmN0aW9uIHRvIGFsbCB0aGUgbm9kZXMgdW5kZXIgdGhlIHN0YXJ0aW5nIG5vZGUgdGhhdCBhcmUgaW4gdGhlIGNvbnRleHQgYW5kIHJldHVybnMgdGhlIHJlc3VsdHMgaW4gYW4gYXJyYXkuXG4gKiBAcGFyYW0ge1NwaW5hbE5vZGV9IHN0YXJ0aW5nTm9kZSBUaGUgbm9kZSBmcm9tIHdoaWNoIHRoZSB0cmF2ZXJzYWwgc3RhcnRzXG4gKiBAcGFyYW0ge1NwaW5hbENvbnRleHR9IGNvbnRleHQgQ29udGV4dCB0byB1c2UgZm9yIHRoZSBzZWFyY2hcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIEZ1bmN0aW9uIHRoYXQgdGFrZXMgYSBub2RlIGFuZCByZXR1cm5zIHNvbWV0aGluZ1xuICogQHJldHVybiB7UHJvbWlzZTxBcnJheTwqPj59IFRoZSByZXN1bHRzXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIG1hcEluQ29udGV4dChzdGFydGluZ05vZGUsIGNvbnRleHQsIGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB0aHJvdyBFcnJvcihcIllvdSBtdXN0IGdpdmUgYSBjYWxsYmFjayBmdW5jdGlvblwiKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBjYWxsYmFjayBmdW5jdGlvbiBtdXN0IGJlIGEgZnVuY3Rpb25cIik7XG4gIH1cblxuICBsZXQgbm9kZXMgPSBhd2FpdCBmaW5kSW5Db250ZXh0KHN0YXJ0aW5nTm9kZSwgY29udGV4dCk7XG4gIGxldCByZXN1bHRzID0gW107XG5cbiAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xuICAgIHJlc3VsdHMucHVzaChjYWxsYmFjayhub2RlKSk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0cztcbn1cblxuZXhwb3J0IHtcbiAgbWFwLFxuICBtYXBJbkNvbnRleHRcbn07XG4iXX0=