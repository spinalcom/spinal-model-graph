import BaseSpinalRelation from "./BaseSpinalRelation"
import { SPINAL_RELATION_PTR_LST_TYPE } from "./SpinalRelationFactory"
import SpinalNode from "../Nodes/SpinalNode"
import { promiseLoad } from "../Utilities";
import SpinalNodePointer from "../SpinalNodePointer";
import spinalCore from "spinal-core-connectorjs";

const globalType = typeof window === "undefined" ? global : window;

class SpinalRelationPtrLst extends BaseSpinalRelation {
    /**
     * 
     * @param {String} name Name of the relation 
     */
    constructor(name) {
        super(name);
        this.add_attr({
            children: new SpinalNodePointer(new globalType.Lst())
        });

        this.children.info.add_attr("ids", []);
    }

    /**
     * Retrieves all the ids of the children of the relation and return them inside an array.
     * @return {Array} Array containing all the children Id of the relation
     */
    getChildrenIds() {
        return this.children.ids;
    }

    /**
     * Return all the children of the relation.
     * @return {Promise<Lst>} Promise  containing a list of all the children of the relation
     */
    getChildren() {
        return promiseLoad(this.children);
    }

    /**
     * Returns the type of the relation.
     * @return {Number} Type of the relation
     */
    getType() {
        return SPINAL_RELATION_PTR_LST_TYPE;
    }

    /**
     * Adds a child to the relation.
     * @param {SpinalNode | Model} node Node to be added
     */
    addChild(node) {
        if (node instanceof SpinalNode && !this.children.info.ids.contains(node.getId())) {
            this.children.info.ids.push(node.getId());
            promiseLoad(this.children).then((children) => {
                children.push(node);
            });
        }
        else if (node instanceof globalType.Model) {
            const tmpNode = new SpinalNode(undefined, this.name, node);
            this.addChild(tmpNode);
        }
        else {
            throw new Error("Cannot add a child witch is not an instance of SpinalNode or Model.");
        }
    }

    /**
     * Removes a child from the relation.
     * @param {SpinalNode} node Child to remove
     * @return {Promise<Boolean>} Promise containing a boolean which is true if the node was successfuly removed
     */
    async removeChild(node) {
        const childrenLst = await promiseLoad(this.children);

        childrenLst.remove(node);

        return Promise.resolve(childrenLst.indexOf(node) === -1);
    }
}

spinalCore.register_models([SpinalRelationPtrLst]);
export default SpinalRelationPtrLst;
