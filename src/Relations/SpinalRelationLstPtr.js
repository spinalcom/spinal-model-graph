/*
 * Copyright 2018 SpinalCom - www.spinalcom.com
 * 
 * This file is part of SpinalCore.
 * 
 * Please read all of the following terms and conditions
 * of the Free Software license Agreement ("Agreement")
 * carefully.
 * 
 * This Agreement is a legally binding contract between
 * the Licensee (as defined below) and SpinalCom that
 * sets forth the terms and conditions that govern your
 * use of the Program. By installing and/or using the
 * Program, you agree to abide by all the terms and
 * conditions stated or referenced herein.
 * 
 * If you do not agree to abide by these terms and
 * conditions, do not demonstrate your acceptance and do
 * not install or use the Program.
 * You should have received a copy of the license along
 * with this file. If not, see
 * <http://resources.spinalcom.com/licenses.pdf>.
 */
import BaseSpinalRelation from "./BaseSpinalRelation"
import { SPINAL_RELATION_LST_PTR_TYPE } from "./SpinalRelationFactory"
import SpinalNode from "../Nodes/SpinalNode"
import { promiseLoad } from "../Utilities";
import SpinalNodePointer from "../SpinalNodePointer";
import spinalCore from "spinal-core-connectorjs";

const globalType = typeof window === "undefined" ? global : window;

class SpinalRelationLstPtr extends BaseSpinalRelation {
    /**
     * 
     * @param {String} name Name of the relation
     */
    constructor(name) {
        super(name);
        this.add_attr({
            children: new globalType.Lst()
        });
    }

    /**
     * Retrieves all the ids of the children of the relation and return them inside an array.
     * @return {Array} Array containing all the children Id of the relation
     */
    getChildrenIds() {
        const res = [];
        for (let i = 0; i < this.children.length; i++) {
            res.push(this.children[i].getId());
        }
        return res;
    }

    /**
     * Return all the children of the relation.
     * @return {Promise<Lst>} Promise  containing a list of all the children of the relation
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
     * Returns the type of the relation.
     * @return {Number} Type of the relation
     */
    getType() {
        return SPINAL_RELATION_LST_PTR_TYPE;
    }

    /**
     * Adds a child to the relation.
     * @param {SpinalNode | Model} node Node to be added
     */
    addChild(node) {
        if (node instanceof SpinalNode) {
            this.children.push(new SpinalNodePointer(node));
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
        for (let i = 0; i < this.children.length; i++) {

            if (this.children[i].info.pointed_id === node.id) {
                let ptr = this.children[i];
                this.children.remove(ptr);
            }
        }
        return Promise.resolve(this.children.indexOf(node) === -1);
    }
}

spinalCore.register_models([SpinalRelationLstPtr]);
export default SpinalRelationLstPtr;
