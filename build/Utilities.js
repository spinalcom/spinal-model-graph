"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promiseLoad = promiseLoad;
exports.guid = guid;

require("spinal-core-connectorjs");

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
/**
 * Loads the element pointed by the pointer.
 * @param {SpinalNodePointer} nodePointer SpinalNodePointer to load
 * @return {Promise<*>} Element to wich the pointer pointed
 */

function promiseLoad(nodePointer) {
  if (nodePointer.ptr instanceof globalType.Ptr && nodePointer.ptr.data.value !== 0 && typeof FileSystem._objects[nodePointer.ptr.data.value] !== "undefined") {
    return Promise.resolve(FileSystem._objects[nodePointer.ptr.data.value]);
  } else {
    return new Promise(resolve => {
      nodePointer.ptr.load(resolve);
    });
  }
}
/**
 * Generates a random number and returns in a string.
 * @returns {String} Random number in a string
 */


function s4() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}
/**
 * Creates a unique id based on a name.
 * @param {String} name Name from wich the id is generated
 * @return {String} Generated id
 */


function guid(name) {
  return name + "-" + s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4() + "-" + Date.now().toString(16);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9VdGlsaXRpZXMuanMiXSwibmFtZXMiOlsiZ2xvYmFsVHlwZSIsIndpbmRvdyIsImdsb2JhbCIsInByb21pc2VMb2FkIiwibm9kZVBvaW50ZXIiLCJwdHIiLCJQdHIiLCJkYXRhIiwidmFsdWUiLCJGaWxlU3lzdGVtIiwiX29iamVjdHMiLCJQcm9taXNlIiwicmVzb2x2ZSIsImxvYWQiLCJzNCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInRvU3RyaW5nIiwic3Vic3RyaW5nIiwiZ3VpZCIsIm5hbWUiLCJEYXRlIiwibm93Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQXVCQTs7QUF2QkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLE1BQU1BLFVBQVUsR0FBRyxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDQyxNQUFoQyxHQUF5Q0QsTUFBNUQ7QUFFQTs7Ozs7O0FBS0EsU0FBU0UsV0FBVCxDQUFxQkMsV0FBckIsRUFBa0M7QUFDaEMsTUFDRUEsV0FBVyxDQUFDQyxHQUFaLFlBQTJCTCxVQUFVLENBQUNNLEdBQXRDLElBQ0FGLFdBQVcsQ0FBQ0MsR0FBWixDQUFnQkUsSUFBaEIsQ0FBcUJDLEtBQXJCLEtBQStCLENBRC9CLElBRUEsT0FBT0MsVUFBVSxDQUFDQyxRQUFYLENBQW9CTixXQUFXLENBQUNDLEdBQVosQ0FBZ0JFLElBQWhCLENBQXFCQyxLQUF6QyxDQUFQLEtBQTJELFdBSDdELEVBSUU7QUFDQSxXQUFPRyxPQUFPLENBQUNDLE9BQVIsQ0FBZ0JILFVBQVUsQ0FBQ0MsUUFBWCxDQUFvQk4sV0FBVyxDQUFDQyxHQUFaLENBQWdCRSxJQUFoQixDQUFxQkMsS0FBekMsQ0FBaEIsQ0FBUDtBQUNELEdBTkQsTUFNTztBQUNMLFdBQU8sSUFBSUcsT0FBSixDQUFZQyxPQUFPLElBQUk7QUFDNUJSLE1BQUFBLFdBQVcsQ0FBQ0MsR0FBWixDQUFnQlEsSUFBaEIsQ0FBcUJELE9BQXJCO0FBQ0QsS0FGTSxDQUFQO0FBR0Q7QUFDRjtBQUVEOzs7Ozs7QUFJQSxTQUFTRSxFQUFULEdBQWM7QUFDWixTQUFPQyxJQUFJLENBQUNDLEtBQUwsQ0FBVyxDQUFDLElBQUlELElBQUksQ0FBQ0UsTUFBTCxFQUFMLElBQXNCLE9BQWpDLEVBQ0pDLFFBREksQ0FDSyxFQURMLEVBRUpDLFNBRkksQ0FFTSxDQUZOLENBQVA7QUFHRDtBQUVEOzs7Ozs7O0FBS0EsU0FBU0MsSUFBVCxDQUFjQyxJQUFkLEVBQW9CO0FBQ2xCLFNBQ0VBLElBQUksR0FBRyxHQUFQLEdBQWFQLEVBQUUsRUFBZixHQUFvQkEsRUFBRSxFQUF0QixHQUEyQixHQUEzQixHQUFpQ0EsRUFBRSxFQUFuQyxHQUF3QyxHQUF4QyxHQUE4Q0EsRUFBRSxFQUFoRCxHQUFxRCxHQUFyRCxHQUNBQSxFQUFFLEVBREYsR0FDTyxHQURQLEdBQ2FBLEVBQUUsRUFEZixHQUNvQkEsRUFBRSxFQUR0QixHQUMyQkEsRUFBRSxFQUQ3QixHQUNrQyxHQURsQyxHQUN3Q1EsSUFBSSxDQUFDQyxHQUFMLEdBQVdMLFFBQVgsQ0FBb0IsRUFBcEIsQ0FGMUM7QUFJRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOCBTcGluYWxDb20gLSB3d3cuc3BpbmFsY29tLmNvbVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFNwaW5hbENvcmUuXG4gKlxuICogUGxlYXNlIHJlYWQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgdGVybXMgYW5kIGNvbmRpdGlvbnNcbiAqIG9mIHRoZSBGcmVlIFNvZnR3YXJlIGxpY2Vuc2UgQWdyZWVtZW50IChcIkFncmVlbWVudFwiKVxuICogY2FyZWZ1bGx5LlxuICpcbiAqIFRoaXMgQWdyZWVtZW50IGlzIGEgbGVnYWxseSBiaW5kaW5nIGNvbnRyYWN0IGJldHdlZW5cbiAqIHRoZSBMaWNlbnNlZSAoYXMgZGVmaW5lZCBiZWxvdykgYW5kIFNwaW5hbENvbSB0aGF0XG4gKiBzZXRzIGZvcnRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyB0aGF0IGdvdmVybiB5b3VyXG4gKiB1c2Ugb2YgdGhlIFByb2dyYW0uIEJ5IGluc3RhbGxpbmcgYW5kL29yIHVzaW5nIHRoZVxuICogUHJvZ3JhbSwgeW91IGFncmVlIHRvIGFiaWRlIGJ5IGFsbCB0aGUgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zIHN0YXRlZCBvciByZWZlcmVuY2VkIGhlcmVpbi5cbiAqXG4gKiBJZiB5b3UgZG8gbm90IGFncmVlIHRvIGFiaWRlIGJ5IHRoZXNlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucywgZG8gbm90IGRlbW9uc3RyYXRlIHlvdXIgYWNjZXB0YW5jZSBhbmQgZG9cbiAqIG5vdCBpbnN0YWxsIG9yIHVzZSB0aGUgUHJvZ3JhbS5cbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYWxvbmdcbiAqIHdpdGggdGhpcyBmaWxlLiBJZiBub3QsIHNlZVxuICogPGh0dHA6Ly9yZXNvdXJjZXMuc3BpbmFsY29tLmNvbS9saWNlbnNlcy5wZGY+LlxuICovXG5pbXBvcnQgXCJzcGluYWwtY29yZS1jb25uZWN0b3Jqc1wiO1xuXG5jb25zdCBnbG9iYWxUeXBlID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHdpbmRvdztcblxuLyoqXG4gKiBMb2FkcyB0aGUgZWxlbWVudCBwb2ludGVkIGJ5IHRoZSBwb2ludGVyLlxuICogQHBhcmFtIHtTcGluYWxOb2RlUG9pbnRlcn0gbm9kZVBvaW50ZXIgU3BpbmFsTm9kZVBvaW50ZXIgdG8gbG9hZFxuICogQHJldHVybiB7UHJvbWlzZTwqPn0gRWxlbWVudCB0byB3aWNoIHRoZSBwb2ludGVyIHBvaW50ZWRcbiAqL1xuZnVuY3Rpb24gcHJvbWlzZUxvYWQobm9kZVBvaW50ZXIpIHtcbiAgaWYgKFxuICAgIG5vZGVQb2ludGVyLnB0ciBpbnN0YW5jZW9mIGdsb2JhbFR5cGUuUHRyICYmXG4gICAgbm9kZVBvaW50ZXIucHRyLmRhdGEudmFsdWUgIT09IDAgJiZcbiAgICB0eXBlb2YgRmlsZVN5c3RlbS5fb2JqZWN0c1tub2RlUG9pbnRlci5wdHIuZGF0YS52YWx1ZV0gIT09IFwidW5kZWZpbmVkXCJcbiAgKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShGaWxlU3lzdGVtLl9vYmplY3RzW25vZGVQb2ludGVyLnB0ci5kYXRhLnZhbHVlXSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgbm9kZVBvaW50ZXIucHRyLmxvYWQocmVzb2x2ZSk7XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSByYW5kb20gbnVtYmVyIGFuZCByZXR1cm5zIGluIGEgc3RyaW5nLlxuICogQHJldHVybnMge1N0cmluZ30gUmFuZG9tIG51bWJlciBpbiBhIHN0cmluZ1xuICovXG5mdW5jdGlvbiBzNCgpIHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApXG4gICAgLnRvU3RyaW5nKDE2KVxuICAgIC5zdWJzdHJpbmcoMSk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHVuaXF1ZSBpZCBiYXNlZCBvbiBhIG5hbWUuXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBOYW1lIGZyb20gd2ljaCB0aGUgaWQgaXMgZ2VuZXJhdGVkXG4gKiBAcmV0dXJuIHtTdHJpbmd9IEdlbmVyYXRlZCBpZFxuICovXG5mdW5jdGlvbiBndWlkKG5hbWUpIHtcbiAgcmV0dXJuIChcbiAgICBuYW1lICsgXCItXCIgKyBzNCgpICsgczQoKSArIFwiLVwiICsgczQoKSArIFwiLVwiICsgczQoKSArIFwiLVwiICtcbiAgICBzNCgpICsgXCItXCIgKyBzNCgpICsgczQoKSArIHM0KCkgKyBcIi1cIiArIERhdGUubm93KCkudG9TdHJpbmcoMTYpXG4gICk7XG59XG5cbmV4cG9ydCB7XG4gIHByb21pc2VMb2FkLFxuICBndWlkXG59O1xuIl19