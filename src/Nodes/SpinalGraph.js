import SpinalNode from "./SpinalNode"
import spinalCore from "spinal-core-connectorjs";
import { SPINAL_RELATION_TYPE } from "../Relations/SpinalRelationFactory"
import { guid } from "../Utilities";
import SpinalContext from "./SpinalContext";

const globalType = typeof window === "undefined" ? global : window;
const HAS_CONTEXT_RELATION_NAME = "hasContext";

class SpinalGraph extends SpinalNode {
    /**
     *
     * @param {String} name Name of the graph
     * @param {String} type Type of the graph
     * @param {SpinalNode | Model} element Element of the node
     */
    constructor(name = "undefined", type = "SpinalGraph", element = new globalType.Model) {
        super(name, type, element);
        this.add_attr({
            BIMObjects: new globalType.Lst()
        });

        this._createRelation(HAS_CONTEXT_RELATION_NAME, SPINAL_RELATION_TYPE);
        this.info.id.set(guid(this.constructor.name));
    }

    /**
     * Adds a context to the graph.
     * @param {SpinalContext} context Context to be added
     */
    addContext(context) {
        if (context instanceof SpinalContext)
            this.addChild(context, HAS_CONTEXT_RELATION_NAME, SPINAL_RELATION_TYPE);
        else
            throw new Error("Cannot add an element which is not a context");
    }

    /**
     * Searches for a context using its name.
     * @param {String} name Name of the context
     * @return {SpinalContext | undefined} The wanted context or undefined if the context wasn't found
     */
    async getContext(name) {
        let children = await this.getChildren([HAS_CONTEXT_RELATION_NAME]);

        return children.find(child => child.info.name.get() === name);
    }
}

spinalCore.register_models([SpinalGraph]);
export default SpinalGraph;
