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
import SpinalMap from "../SpinalMap";

const globalType = typeof window === "undefined" ? global : window;

class BaseSpinalRelation extends globalType.Model {
    /**
     * Constructor for the BaseSpinalRelation class.
     * @param {String} name Name of the relation
     */
    constructor(name) {
        super();
        this.add_attr({
            id: guid(name),
            name: name,
            parent: new SpinalNodePointer(),
            contextIds: new SpinalMap()
        });
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
     * @return {Promise<SpinalNode>} Returns a promise where the resolve is the parent
     */
    getParent() {
        return promiseLoad(this.parent);
    }

    /**
     * Returns a list of the contexts the relation is associated to.
     * @return {Array<String>} A list of ids of the associated contexts
     */
    getContextIds() {
        return this.contextIds.keys();
    }

    /**
     * Adds an id to the context ids of the relation.
     * @param {String} id Id of the context
     */
    addContextId(id) {
        if (!this.contextIds.has(id)) {
            this.contextIds.setElement(id, 0);
        }
    }

    /**
     * Returns true if the relation belongs to the context.
     * @param {SpinalContext} context The context that might own the node
     * @return {Boolean} A boolean
     */
    belongsToContext(context) {
        return this.contextIds.has(context.getId().get());
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
     * Removes all children from the relation.
     * @return {Promise<nothing>} An empty promise
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
     * @return {Promise<nothing>} An empty promise
     */
    async removeFromGraph() {
        await Promise.all([
            this._removeFromParent(),
            this.removeChildren()
        ]);
    }

    /**
     * Removes the relation from the parent.
     * @return {Promise<nothing>} An empty promise
     * @private
     */
    async _removeFromParent() {
        const parent = await this.getParent();
        const relationMap = parent._getChildrenType(this.getType());

        relationMap.delete(this.getName().get());
        this.parent.unset();
    }
}

spinalCore.register_models([BaseSpinalRelation]);
export default BaseSpinalRelation;
