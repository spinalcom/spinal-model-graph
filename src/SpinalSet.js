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
import spinalCore from "spinal-core-connectorjs";

const globalType = typeof window === "undefined" ? global : window;

class SpinalSet extends globalType.Model {
  /**
   * Constructor for the SpinalSet class.
   */
  constructor() {
    super();
  }

  /**
   * Appends a new element with the given value to the set.
   * @param {String} value Value to store in the set
   */
  add(value) {
    this.mod_attr(value, 0);
  }

  /**
   * Returns a boolean asserting whether the value is in the set or not.
   * @param {String} value Value
   * @returns {Boolean} Return true if the value exists
   */
  has(value) {
    return this.hasOwnProperty(value);
  }

  /**
   * Returns an array that contains all the values of the set.
   * @returns {Array<String>} Array containing all the values in the set
   */
  values() {
    return this._attribute_names;
  }

  /**
   * Deletes an element.
   * @param {String} value Value to delete
   */
  delete(value) {
    this.rem_attr(value);
  }

  /**
   * Deletes all values in the set.
   */
  clear() {
    let values = this.values();

    while (values[0]) {
      this.delete(values[0]);
    }
  }

  /**
   * Returns the number of values in the set.
   * @return {Number} Number of values in the set
   */
  size() {
    return this._attribute_names.length;
  }

  /**
   * Applies a function to each of the values in the set.
   * @param {function} fun Funcion to apply
   */
  forEach(fun) {
    for (let i = 0; i < this._attribute_names.length; i++) {
      let value = this._attribute_names[i];
      fun(value);
    }
  }

  /**
   * Function to iterate over the set object.
   */
  [Symbol.iterator]() {
    let index = -1;
    let values = this._attribute_names;

    return {
      next() {
        return {
          value: values[++index],
          done: index >= values.length
        };
      }
    };
  }
}

spinalCore.register_models([SpinalSet]);
export default SpinalSet;
