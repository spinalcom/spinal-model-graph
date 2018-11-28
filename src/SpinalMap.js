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

class SpinalMap extends globalType.Model {
  /**
   * Constructor for the SpinalMap class.
   */
  constructor() {
    super();
  }

  /**
   * Sets the value corresponding to the key.
   * @param {String} key Key to the value
   * @param {*} value New value
   */
  setElement(key, value) {
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
   */
  has(key) {
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
   * Deletes an element.
   * @param key Key of the element
   */
  delete(key) {
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
   */
  forEach(fun) {
    for (let i = 0; i < this._attribute_names.length; i++) {
      let name = this._attribute_names[i];
      fun(this[name]);
    }
  }

  /**
   * Function to iterate over the map object.
   */
  [Symbol.iterator]() {
    let index = -1;
    let keys = this.keys();
    let map = this;

    return {
      next() {
        return {
          value: map[keys[++index]],
          done: index >= keys.length
        };
      }
    };
  }
}

spinalCore.register_models([SpinalMap]);
export default SpinalMap;
