import SpinalNode from "./SpinalNode"
import "spinal-core-connectorjs";
import {
    SPINAL_RELATION_LST_PTR_TYPE, SPINAL_RELATION_TYPE,
} from "../Relations/SpinalRelationFactory"
import { guid } from "../Utilities";
import SpinalContext from "./SpinalContext";

const globalType = typeof window === "undefined" ? global : window;
const HAS_CONTEXT_RELATION_NAME = "hasContext";


class SpinalGraph extends SpinalNode {
    /**
     *
     * @param type {string}  default "SpinalGraph"
     * @param element {Model}
     */
    constructor(type = "SpinalGraph", element = new globalType.Model) {
        super(type, element);
        this.add_attr({
            BIMObjects: new globalType.Lst()
        });

        this._createRelation(HAS_CONTEXT_RELATION_NAME, SPINAL_RELATION_TYPE);
        this.info.mod_attr("id", guid(this.constructor.name));
    }

    /**
     * this function add context to the graph
     * @param context
     */
    addContext(context) {
        if (context instanceof SpinalContext)
            this.addChild(context, HAS_CONTEXT_RELATION_NAME, SPINAL_RELATION_TYPE);
        else
            throw new Error("Cannot add an element which is not a context");
    }

    /**
     * Searches for a context using its name
     * @param name {string} Name of the context
     * @return {SpinalContext|undefined} The wanted context or undefined
     */
    async getContext(name) {
        let children = await this.getChildren([HAS_CONTEXT_RELATION_NAME]);

        return children.find(child => child.info.name.get() === name);
    }

}

spinalCore.register_models([SpinalGraph]);
export default SpinalGraph;
