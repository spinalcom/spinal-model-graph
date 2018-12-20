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

import {
  spinalCore,
  Model
} from "spinal-core-connectorjs_type";

/**
 * Simple implementation of a set using a Model.
 * @extends Model
 */
class SpinalSet extends Model {
  /**
   * Constructor for the SpinalSet class.
   * @param {Array<*>} [init] Array of values
   * @throws {TypeError} If init is not iterable
   * @throws {TypeError} If init[Symbol.iterator] doesn't return iterators
   * @throws {TypeError} If the values of the iterators are not strings
   */
  constructor(init) {
    super();

    if (init !== undefined) {
      for (let value of init) {
        this.add(value);
      }
    }
  }

  /**
   * Appends a new element with the given value to the set.
   * @param {String} value Value to store in the set
   * @throws {TypeError} If the value is not a string
   */
  add(value) {
    if (typeof value !== "string") {
      throw TypeError("The value must be a string");
    }

    this.mod_attr(value, 0);
  }

  /**
   * Returns a boolean asserting whether the value is in the set or not.
   * @param {String} value Value
   * @returns {Boolean} Return true if the value exists
   * @throws {TypeError} If the value is not a string
   */
  has(value) {
    if (typeof value !== "string") {
      throw TypeError("The value must be a string");
    }

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
   * @throws {TypeError} If the value is not a string
   * @throws {Error} If the value is not in the map
   */
  delete(value) {
    if (!this.has(value)) {
      throw Error("The value doesn't exist");
    }

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
   * @returns {Number} Number of values in the set
   */
  size() {
    return this._attribute_names.length;
  }

  /**
   * Function that takes a value and its index in the set and returns nothing.
   * @callback setForEachCallback
   * @param {string} [value] Value of the set
   * @param {Number} [index] Index of the value in the set
   */
  /**
   * Applies a function to each of the values in the set.
   * @param {setForEachCallback} fun Funcion to apply
   * @throws {TypeError} If fun is not a function
   */
  forEach(fun) {
    if (typeof fun !== "function") {
      throw TypeError("The callback must be a function");
    }

    const values = this.values();

    for (let i = 0; i < this.size(); i++) {
      fun(values[i], i);
    }
  }

  /**
   * Function to iterate over the set object.
   * @generator
   * @yields {string} All values in the set one by one
   */
  *[Symbol.iterator]() {
    let values = this._attribute_names;

    for (let value of values) {
      yield value;
    }
  }
}

spinalCore.register_models([SpinalSet]);
export default SpinalSet;
