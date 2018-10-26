import BaseSpinalRelation from "./BaseSpinalRelation"
import SpinalNode from "../Nodes/SpinalNode"
import { promiseLoad } from "../Utilities";
import SpinalNodePointer from "../SpinalNodePointer";

const globalType = typeof window === "undefined" ? global : window;

class SpinalRelationLstPtr extends BaseSpinalRelation {
    constructor(name) {
        super(name);
        this.add_attr({
            children: new globalType.Lst()
        })
    }

    /**
     * Return all the children of the relation
     * @return {Promise<globalType.Lst>}
     */
    async getChildren() {
        const promiseList = [];
        for (let i = 0; i < this.children.length; i++) {
            let ptr = this.children[i];
            promiseList.push(promiseLoad(ptr));
        }
        const children = new globalType.Lst();
        await Promise.all(promiseList).then(values => {
            for (let i = 0; i < values.length; i++) {

                children.push(values[i]);
            }
        });
        return Promise.resolve(children)
    }


    /**
     * Add node as child of the relation if node is a model create a node
     * @param node {SpinalNode | globalType.Model}
     */
    addChild(node) {
        if (node instanceof SpinalNode) {
            this.children.push(new SpinalNodePointer(node));
            this.getParent().then(parent => {
                if (typeof parent !== "undefined" && parent instanceof SpinalNode)
                    node._addParent(parent)
            })
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
    getChildrenIds() {
        const res = [];
        for (let i = 0; i < this.children.length; i++) {
            res.push(this.children[i].getId());
        }
        return res;
    }

    async removeChild(node) {
        for (let i = 0; i < this.children.length; i++) {

            if (this.children[i].info.pointed_id === node.id) {
                let ptr = this.children[i];
                this.children.remove(ptr);
            }
        }
        return this.children.indexOf(node) === -1;
    }
}

spinalCore.register_models([SpinalRelationLstPtr]);
export default SpinalRelationLstPtr;
