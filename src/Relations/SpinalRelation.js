import BaseSpinalRelation from "./BaseSpinalRelation"
import SpinalNode from "../Nodes/SpinalNode"

const globalType = typeof window === "undefined" ? global : window;

class SpinalRelation extends BaseSpinalRelation {

    constructor(name) {
        super(name);
        this.add_attr({
            children: new globalType.Lst()
        });
    }

    /**
     * Return all the children of the relation
     * @return {Promise<globalType.Lst>}
     */
    getChildren() {
        // noinspection JSValidateTypes
        return Promise.resolve(this.children);
    }

    /**
     * Add node as child of the relation if node is a model create a node
     * @param node {SpinalNode | globalType.Model}
     */
    addChild(node) {

        if (node instanceof SpinalNode) {
            this.children.push(node);
            this.getParent().then(parent => {// noinspection JSAccessibilityCheck
                node._addParent(parent)
            });
        }
        else if (node instanceof globalType.Model) {
            const tmpNode = new SpinalNode(this.name, node);
            this.addChild(tmpNode);
        }
    }

    /**
     * This function retrieve all the id from children of the relation and return them inside an array.
     * @return {Array} containing all the children Id of the relation
     */
    getChildrenIds(){
        const res = [];
        for (let i = 0; i < this.children.length; i++) {
            res.push(this.children[i].getId());
        }
        return res;
    }

    async removeChild(node) {
        this.children.remove(node);
        return this.children.indexOf(node) === -1;
    }

}

export default SpinalRelation;
