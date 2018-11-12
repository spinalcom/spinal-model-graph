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
import SpinalNode from "./SpinalNode"
import spinalCore from "spinal-core-connectorjs";
import {
    SPINAL_RELATION_PTR_LST_TYPE
} from "../Relations/SpinalRelationFactory"
import { guid } from "../Utilities";

const globalType = typeof window === "undefined" ? global : window;

class SpinalContext extends SpinalNode {
    /**
     * Constructor for the SpinalContext class.
     * @param {String} name Name of the context
     * @param {String} type Type of the context, usually unused
     * @param {SpinalNode | Model} element Element of the context, usually unused
     */
    constructor(name = "undefined", type = "SpinalContext", element = new globalType.Model) {
        super(name, type, element);
        this.add_attr({
            relationIds: new globalType.Lst(),
            relationNames: new globalType.Lst()
        });

        this.info.id.set(guid(this.constructor.name));
    }

    /**
     * Returns the relation ids of the context.
     * @return {Lst<String>} The relation ids that the context knows
     */
    getRelationIds() {
        return this.relationIds;
    }

    /**
     * Returns the relation names of the context.
     * @return {Lst<String>} The relation names that the context knows
     */
    getRelationNames() {
        return this.relationNames;
    }

    /**
     * Adds a relation id to the relation ids known by the context.
     * @param {String} relationId Id of the relation
     * @return {Boolean} Return false if the relation id is already known
     */
    addRelationId(relationId) {
        if (!this.relationIds.contains(relationId)) {
            this.relationIds.push(relationId);
            return true;
        }
        return false;
    }

    /**
     * Adds a relation name to the relation names known by the context.
     * @param {String} relationName Name of the relation
     * @return {Boolean} Return false if the relation name is already known
     */
    addRelationName(relationName) {
        if (!this.relationNames.contains(relationName)) {
            this.relationNames.push(relationName);
            return true;
        }
        return false;
    }

    /**
     * Adds a relation relations known by the context.
     * @param {SpinalRelation} relation Relation to add
     */
    addRelation(relation) {
        let res = false;

        res = this.addRelationId(relation.getId());
        res = this.addRelationName(relation.getName()) || res;
        return res;
    }

    /**
     * Remove all the nodes associated to this context from the graph.
     */
    removeFromGraph() {
        //Todo use DFS to remove all the context from the graph
    }

    /**
     * Adds a child with a SpinalRelationLstPtrType.
     * @param {SpinalNode | Model} child Node to add as child
     * @param {String} relationName Name of the relation
     * @param {Number} relationType This parameter is here only to properly override the parent method
     * @return {SpinalNode} The child node
     */
    addChild(child, relationName, relationType = SPINAL_RELATION_PTR_LST_TYPE) {
        return super.addChild(child, relationName, SPINAL_RELATION_PTR_LST_TYPE);
    }

    /**
     * Adds a child with a SpinalRelationLstPtrType and notices the context if a new relation was created.
     * @param {SpinalNode | Model} child Node to add as child
     * @param {String} relationName Name of the relation
     * @param {Number} relationType This parameter is here only to properly override the parent method
     * @param {SpinalContext} context Context to update, usually unused
     * @return {SpinalNode} The child node
     */
    addChildInContext(child, relationName, relationType = SPINAL_RELATION_PTR_LST_TYPE, context = this) {
        return super.addChildInContext(child, relationName, SPINAL_RELATION_PTR_LST_TYPE, context);
    }
}

spinalCore.register_models([SpinalContext]);
export default SpinalContext;
