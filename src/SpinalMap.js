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
 * Simple implementation of a map using a Model.
 * @extends Model
 */
class SpinalMap extends Model {
  /**
   * Constructor for the SpinalMap class.
   * @param {Array<Array<String, *>>} init Array of arrays of key-value pairs
   * @throws {TypeError} If init is not iterable
   * @throws {TypeError} If init[Symbol.iterator] doesn't return iterators
   * @throws {TypeError} If the values of the iterators are not arrays of key values
   * @throws {TypeError} If the keys of the values of the iterators are not strings
   */
  constructor(init) {
    super();

    if (init !== undefined) {
      for (let [key, value] of init) {
        this.setElement(key, value);
      }
    }
  }

  /**
   * Sets the value corresponding to the key.
   * @param {String} key Key to the value
   * @param {*} value New value, can be omitted
   * @throws {TypeError} If the key is not a string
   */
  setElement(key, value) {
    if (typeof key !== "string") {
      throw TypeError("The key must be a string");
    }

    this.rem_attr(key);
    const attribute = {};
    attribute[key] = value;
    this.add_attr(attribute);
  }

  /**
   * Returns the value associated to the key, or undefined if there is none.
   * @param {String} key Key to the value
   * @returns {*} Value corresponding to the key
   */
  getElement(key) {
    return this[key];
  }

  /**
   * Returns a boolean asserting whether a value has been associated to the key or not.
   * @param key Key
   * @returns {Boolean} Return true if the key exists
   * @throws {TypeError} If the key is not a string
   */
  has(key) {
    if (typeof key !== "string") {
      throw TypeError("The key must be a string");
    }

    return this._attribute_names.includes(key);
  }

  /**
   * Returns a boolean asserting whether the map contains any key.
   * @returns {Boolean} Return true if the map contains at least one key
   */
  hasKey() {
    return this._attribute_names.length > 0;
  }

  /**
   * Returns an array that contains the keys for each element in the map in insertion order.
   * @returns {Array<String>} Array containing all the keys in the map
   */
  keys() {
    return this._attribute_names;
  }

  /**
   * Returns an array that contains the keys and the values for each element in the map in insertion order.
   * @returns {Array<Array<String, *>>} Array containing all the keys and values in the map
   */
  entries() {
    const arr = [];

    for (let key of this.keys()) {
      arr.push([key, this.getElement(key)]);
    }

    return arr;
  }

  /**
   * Deletes an element.
   * @param key Key of the element
   * @throws {TypeError} If the key is not a string
   * @throws {Error} If the key is not in the map
   */
  delete(key) {
    if (!this.has(key)) {
      throw Error("The key doesn't exist");
    }

    this.rem_attr(key);
  }

  /**
   * Deletes all elements.
   */
  clear() {
    let keys = this.keys();

    while (keys[0]) {
      this.delete(keys[0]);
    }
  }

  /**
   * Applies a function to each of the values in the map.
   * @param {function} fun Funcion to apply
   * @throws {TypeError} If fun is not a function
   */
  forEach(fun) {
    if (typeof fun !== "function") {
      throw TypeError("The callback must be a function");
    }

    for (let [key, value] of this) {
      fun(value, key);
    }
  }

  /**
   * Function to iterate over the map object.
   * @generator
   * @yields {Array<string, *>} Arrays of key and values
   */
  *[Symbol.iterator]() {
    const keys = this.keys();

    for (let key of keys) {
      yield [key, this[key]];
    }
  }
}

spinalCore.register_models([SpinalMap]);
export default SpinalMap;
