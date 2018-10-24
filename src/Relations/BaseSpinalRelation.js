import "spinal-core-connectorjs";
import {promiseLoad, guid} from "../Utilities";
import SpinalNode from "../Nodes/SpinalNode";
import SpinalNodePointer from "../SpinalNodePointer"
const globalType = typeof window === "undefined" ? global : window;

class BaseSpinalRelation extends globalType.Model {
    constructor(name) {
        super();
        this.add_attr({
            id: guid(name),
            name: name,
            parent: new SpinalNodePointer()
        })
    }

    /**
     * Return the parent of the relation.
     * @return {Promise} return a promise where the resolve function parameter is the parent
     */
    getParent() {
        return promiseLoad(this.parent);
    }

    /**
     * set the parent of the relation. If a parent was already set the parent relation is remove
     * @param parent {SpinalNode}
     */
    setParent(parent) {
        if (typeof parent !== "undefined" && parent instanceof SpinalNode)
            this.parent.set(parent);
    }

    getName() {
        return this.name;
    }
}

export default BaseSpinalRelation;