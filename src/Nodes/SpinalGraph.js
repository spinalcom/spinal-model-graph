import SpinalNode from "./SpinalNode"
import "spinal-core-connectorjs";
import {
    SPINAL_RELATION_LST_PTR_TYPE, SPINAL_RELATION_TYPE,
} from "../Relations/SpinalRelationFactory"
import {guid} from "../Utilities";
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


    async getContext(name) {
        let children = await this.getChildren([HAS_CONTEXT_RELATION_NAME]);
        let res;

        for (let i = 0; i < children.length; i++) {

            if (children[i].info.name === name)
                return children[i];
        }

        return "undefined";
    }

}

spinalCore.register_models([SpinalGraph]);
export default SpinalGraph;
