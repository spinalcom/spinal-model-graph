import SpinalNode from "./SpinalNode"
import spinalCore from "spinal-core-connectorjs";
import {
    SPINAL_RELATION_PTR_LST_TYPE,
    SpinalRelationFactory
} from "../Relations/SpinalRelationFactory"
import { guid } from "../Utilities";

const globalType = typeof window === "undefined" ? global : window;

class SpinalContext extends SpinalNode {
    /**
     *
     * @param {String} type Type of the context
     * @param {String} name Name of the context
     * @param {SpinalNode | Model} element Element of the node
     */
    constructor(type = "SpinalContext", name = "undefined", element = new globalType.Model) {
        super(type, element);
        this.add_attr({
            relationIds: new globalType.Lst(),
            relationsNames: new globalType.Lst()
        });
        this.info.id.set(guid(this.constructor.name));
        this.info.add_attr({ name: typeof name === "undefined" ? this.info.id.get() : name });
    }

    /**
     * Create a relation between a node and another node/model. this function can be used to link two context.
     * @param {SpinalNode} parent Parent of the relation
     * @param {SpinalNode | Model} child Child of the relation
     * @param {String} relationName Name of the relation
     * @return {Str}
     */
    createRelation(parent, child, relationName) {
        if ((child instanceof SpinalNode) || (child instanceof globalType.Model)) {
            const relation = SpinalRelationFactory.getNewRelation(relationName, SPINAL_RELATION_PTR_LST_TYPE);
            relation.setParent(parent);
            relation.addChild(child);
            this.addRelationId(relation.id);
            return relation.id;
        }
        //Todo create Some Custom Error
        throw new Error("Cannot add a child witch is not an instance of SpinalNode or Model.");
    }

    /**
     * Add the relation id to the relation ids displayable by this context.
     * @param {String} relationId Id of the rlation
     */
    addRelationId(relationId) {
        this.relationIds.push(relationId);
    }

    /**
     * Remove all the nodes associated to this context from the graph.
     */
    removeFromGraph() {
        //Todo use DFS to remove all the context from the graph
    }

    /**
     * Add Child to the context with a spinalRelationLstPtrType.
     * @param {SpinalNode | Model} child Node to be added as child
     * @param {String} relationName Name of the relation
     * @param {Number} relationType This parameter is here only to properly override the parent method
     */
    addChild(child, relationName, relationType = SPINAL_RELATION_PTR_LST_TYPE) {
        super.addChild(child, relationName, relationType);
    }
}

spinalCore.register_models([SpinalContext]);
export default SpinalContext;
