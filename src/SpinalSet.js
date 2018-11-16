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
    constructor() {
        super();
    }

    /**
     * Appends a new element with the given value to the Set object. Returns the Set object
     * @param {String} value to store in the set
     */
    add(value) {
        this.rem_attr(value);
        this.add_attr(value);
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
     * Returns a boolean asserting whether a value has been associated to the key or not.
     * @param key Key
     * @returns {Boolean} Return true if the key exists
     */
    has(key) {
        return this.hasOwnProperty(key)
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

    size() {
        return this._attribute_names.length;
    }
}

spinalCore.register_models([SpinalSet]);
export default SpinalSet;
