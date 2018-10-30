import spinalCore from "spinal-core-connectorjs"
const globalType = typeof window === "undefined" ? global : window;
class SpinalMap extends globalType.Model {
    constructor() {
        super();
    }

    /**
     * Sets the value for the key in the Map object. Returns the Map object
     * @param key
     * @param value
     */
    setElement(key, value) {
        this.rem_attr(key);
        const attribute = {};
        attribute[key] = value;

        this.add_attr(attribute);
    }

    /**
     * Returns the value associated to the key, or undefined if there is none.
     * @param key
     * @returns {*}
     */
    getElement(key) {
        return this[key];
    }

    /**
     *
     * @param fun
     */
    forEach(fun) {
        for (let i = 0; i < this._attribute_names.length; i++) {
            let name = this._attribute_names[i];
            fun(this[name]);
        }
    }

    /**
     * Returns a boolean asserting whether a value has been associated to the key in the Map object or not.
     * @param key
     * @returns {*|boolean}
     */
    has(key) {
        return this._attribute_names.includes(key)
    }

    /**
     * Returns a boolean asserting whether the map contain any key
     * @returns {boolean}
     */
    hasKey() {
        return this._attribute_names.length > 0;
    }

    /**
     * Returns a array  that contains the keys for each element in the Map object in insertion order.
     * @returns {*}
     */
    keys() {
        return this._attribute_names;
    }
}

spinalCore.register_models([SpinalMap]);
export default SpinalMap;
