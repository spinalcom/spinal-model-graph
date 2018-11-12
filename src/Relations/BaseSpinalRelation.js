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
import spinalCore from "spinal-core-connectorjs";
import { promiseLoad, guid } from "../Utilities";
import SpinalNode from "../Nodes/SpinalNode";
import SpinalNodePointer from "../SpinalNodePointer"

const globalType = typeof window === "undefined" ? global : window;

class BaseSpinalRelation extends globalType.Model {
    /**
     * 
     * @param {String} name Name of the relation
     */
    constructor(name) {
        super();
        this.add_attr({
            id: guid(name),
            name: name,
            parent: new SpinalNodePointer()
        })
    }

    /**
     * Shortcut to id.
     * @return {Str} Id of the relation
     */
    getId() {
        return this.id;
    }

    /**
     * Returns the name of the relation.
     * @return {Str} Name of the relation
     */
    getName() {
        return this.name;
    }

    /**
     * Returns the parent of the relation.
     * @return {Promise<SpinalNode>} returns a promise where the resolve is the parent
     */
    getParent() {
        return promiseLoad(this.parent);
    }

    /**
     * Sets the parent of the relation. If a parent was already set, the parent relation is removed.
     * @param {SpinalNode} parent New parent of the relation
     */
    setParent(parent) {
        if (typeof parent !== "undefined" && parent instanceof SpinalNode)
            this.parent.setElement(parent);
    }

    /**
     * Returns the type of the relation.
     * @return {Number} Type of the relation
     */
    getType() {
        return -1;
    }

    /**
     * Retrieves all the ids of the children of the relation and return them inside an array.
     * @return {Array<Str>} Array containing all the children ids of the relation
     */
    getChildrenIds() {

    }

    /**
     * Return all the children of the relation.
     * @return {Promise<Lst<SpinalNode>>} Promise containing a list of the children of the relation
     */
    getChildren() {
        // noinspection JSValidateTypes
        return Promise.resolve();
    }

    /**
     * Adds a node to the relation.
     * @param {SpinalNode | Model} node Node to be added
     */
    addChild(node) {

    }

    /**
     * Removes a child from the relation.
     * @param {SpinalNode} node Child of the relation
     * @return {Promise<Boolean>} Promise containing a boolean which is true if the node was successfuly removed
     */
    async removeChild(node) {

    }

    /**
     * Removes all children from the relation.
     * @return {Promise<Array<Boolean>>} Returns a promise containing an array of the result of each removeChild
     */
    async removeChildren() {
        const children = await this.getChildren();
        const promises = [];

        for (let i = 0; i < children.length; i++) {
            promises.push(this.removeChild(children[i]));
        }
        await Promise.all(promises);
    }

    /**
     * Removes the relation from the graph.
     */
    async removeFromGraph() {
        await Promise.all([
            this._removeFromParent(),
            this.removeChildren()
        ]);
    }

    /**
     * Removes the relation from the parent.
     * @private
     */
    async _removeFromParent() {
        const parent = await this.getParent();
        const relationMap = parent._getRelationListType(this.getType());

        relationMap.delete(this.getName());
    }
}

spinalCore.register_models([BaseSpinalRelation]);
export default BaseSpinalRelation;
