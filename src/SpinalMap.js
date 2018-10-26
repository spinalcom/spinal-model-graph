import "spinal-core-connectorjs"
const globalType = typeof window === "undefined" ? global : window;
class SpinalMap extends globalType.Model {
    constructor() {
        super();
    }

    set(key, value) {
        this.rem_attr(key);
        const attribute = {};
        attribute[key] = value;

        this.add_attr(attribute);
    }

    get(key) {
        return this[key];
    }

    forEach(fun) {
        for (let i = 0; i < this._attribute_names.length; i++) {
            let name = this._attribute_names[i];
            fun(this[name]);
        }
    }

    has(key) {
        return this._attribute_names.includes(key)
    }

    hasKey() {
        return this._attribute_names.length > 0;
    }

    keys() {
        return this._attribute_names;
    }
}

spinalCore.register_models([SpinalMap]);
export default SpinalMap;
