import SpinalNode from "./SpinalNode"
import spinalCore from "spinal-core-connectorjs";
import {
    SPINAL_RELATION_LST_PTR_TYPE,
    SPINAL_RELATION_PTR_LST_TYPE,
    SpinalRelationFactory
} from "../Relations/SpinalRelationFactory"
import { guid } from "../Utilities";


const relationFactory = new SpinalRelationFactory();

const globalType = typeof window === "undefined" ? global : window;

class SpinalContext extends SpinalNode {
    constructor(type = "SpinalContext", element = new globalType.Model) {
        super(type, element);

        this.add_attr({
            relationIds: new globalType.Lst()

        });
        this.info.id.set(guid(this.constructor.name));
        if (typeof name === "undefined")
            this.info.add_attr("name", this.info.id.get());
        else
            this.info.add_attr("name", name);
    }

    /**
     * Create a relation between a node and another node/model. this function can be used to linked two context
     * @param parent {SpinalNode} parent of the relation
     * @param child {SpinalNode | Model} child of the relation
     * @param relationName {string} name of the relation
     * @return {string}
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
     * Add the relation id to the relation id displayable by this context
     * @param relationId {string}
     */
    addRelationId(relationId) {
        this.relationIds.push(relationId);
    }

    /**
     * Remove all the node associate to this context from the graph
     */
    removeFromGraph() {
        //Todo use DFS to remove all the context from the graph
    }

    /**
     * Add Child to the to the context with a spinalRelationLstPtrType
     * @param child {SpinalNode| Model} to be added as child
     * @param relationName {string} name of the relation
     * @param relationType {int} this parameter is here only to properly override the parent method.
     */
    addChild(child, relationName, relationType = SPINAL_RELATION_PTR_LST_TYPE) {
        super.addChild(child, relationName, SPINAL_RELATION_PTR_LST_TYPE);
    }
}

spinalCore.register_models([SpinalContext]);
export default SpinalContext;
