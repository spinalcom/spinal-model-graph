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
import SpinalNodePointer from "../SpinalNodePointer"

const globalType = typeof window === "undefined" ? global : window;

import {
    SPINAL_RELATION_TYPE,
    SPINAL_RELATION_LST_PTR_TYPE,
    SPINAL_RELATION_PTR_LST_TYPE,
    RELATION_TYPE_LIST,
    SpinalRelationFactory
} from "../Relations/SpinalRelationFactory"
import SpinalMap from "../SpinalMap"

class SpinalNode extends globalType.Model {
    /**
     * Constructor for the SpinalNode class.
     * @param {String} name Name of the node
     * @param {String} type Type of the node
     * @param {SpinalNode | Model} element Element of the node
     */
    constructor(name = "undefined", type = "SpinalNode", element = new globalType.Model) {
        super();
        this.add_attr({
            info: {
                id: guid(this.constructor.name),
                name: name,
                type: type,
            },
            //contain a list of SpinalRelationRef {relationName: Lst}
            relationListTypeSpinalRelation: new SpinalMap(),

            //contain a list of SpinalRelationLstPtr {relationName: Lst}
            relationListTypeSpinalRelationLstPtr: new SpinalMap(),

            //contain a list of SpinalRelationPtrLst {relationName: Lst}
            relationListTypeSpinalRelationPtrLst: new SpinalMap(),

            //SpinalMap<String, Lst<Pointer<SpinalRelation>>>
            parents: new SpinalMap(),
            //
            element: new SpinalNodePointer(element),
        });
    }

    /**
     * Returns the id.
     * @return {Str} Id of the node
     */
    getId() {
        return this.info.id;
    }

    /**
     * Returns the name.
     * @return {Str} Name of the node
     */
    getName() {
        return this.info.name;
    }

    /**
     * Returns the type.
     * @return {Str} Type of the node
     */
    getType() {
        return this.info.type;
    }

    /**
     * Returns the element.
     * @return {Promise<*>} A promise where the parameter of the resolve method is the element
     */
    getElement() {
        return promiseLoad(this.element);
    }

    /**
     * Verify if the node contains the relation name.
     * @param {String} relationName Name of the relation
     * @param {Number} relationType Type of the relation
     * @return {Boolean} Return true is the relation is contained in the node and false otherwise.
     */
    hasRelation(relationName, relationType) {
        return this._getRelationListType(relationType).has(relationName);
    }

    /**
     * Verify if the node contains all the relation names.
     * @param {Array<String>} relationNames Array containing all the relation name
     * @param {Number} relationType Type of the relations
     * @return {Boolean} Return true if the node contains all the relations in relationNames, false otherwise.
     */
    hasRelations(relationNames, relationType) {
        let res = true;

        for (let i = 0; i < relationNames.length && res; i++) {
            res = this.hasRelation(relationNames[i], relationType)
        }

        return res;
    }

    /**
     * Add the node as child of the relation.
     * @param {SpinalNode | Model} child Element to add as child
     * @param {String} relationName Name of the relation
     * @param {Number} relationType Type of the relation
     * @return {SpinalNode} The child node
     */
    addChild(child, relationName, relationType) {
        let relation;

        if (!(child instanceof globalType.Model)) {
            throw new Error("Cannot add a child witch is not an instance of SpinalNode or Model.");
        }
        else if (!(child instanceof SpinalNode)) {
            child = new SpinalNode(undefined, undefined, child);
        }

        if (!this.hasRelation(relationName, relationType))
            relation = this._createRelation(relationName, relationType);
        else
            relation = this._getRelationListType(relationType).getElement(relationName);

        relation.addChild(child);
        child._addParent(relation);
        return child;
    }

    /**
     * Adds a child and notices the context if a new relation was created.
     * @param {SpinalNode | Model} child Node to add as child
     * @param {String} relationName Name of the relation
     * @param {Number} relationType Type of the relation
     * @param {SpinalContext} context Context to update
     * @return {SpinalNode} The child node
     */
    addChildInContext(child, relationName, relationType, context) {
        let relation;

        if (!(child instanceof globalType.Model)) {
            throw new Error("Cannot add a child witch is not an instance of SpinalNode or Model.");
        }
        else if (!(child instanceof SpinalNode)) {
            child = new SpinalNode(undefined, undefined, child);
        }

        if (!this.hasRelation(relationName, relationType)) {
            relation = this._createRelation(relationName, relationType);
            context.addRelation(relation);
        }
        else
            relation = this._getRelationListType(relationType).getElement(relationName);

        relation.addChild(child);
        child._addParent(relation);
        return child;
    }

    /**
     * Remove the node from the relation children.
     * @param {SpinalNode} node Node to remove
     * @param {String} relationName Name of the relation to wich the node belongs
     * @param {Number} relationType Type of the relation to wich the node belongs
     */
    async removeChild(node, relationName, relationType) {
        if (this._getRelationListType(relationType).has(relationName)) {
            let rel = this._getRelationListType(relationType).getElement(relationName);
            rel.removeChild(node);
        }
    }

    /**
     * Remove the node from the graph i.e remove the node from all the parent relations and remove all the children relations.
     * This operation might delete all the sub-graph under this node.
     * After this operation the node can be deleted without fear.
     */
    async removeFromGraph() {
        await Promise.all([
            this._removeFromParents(),
            this._removeFromChildren()
        ]);

    }

    /**
     * Return all children for the relation names no matter the type of relation
     * @param {Array<String>} relationNames Array containing the relation names of the desired children
     * @return {Promise<Array<SpinalNode>>} Promise containing the children that were found
     */
    async getChildren(relationNames) {
        if (typeof relationNames === "undefined" || relationNames.length === 0) {
            return Promise.resolve(this._getAllChildren());
        }

        const promises = [];

        for (let relationType of RELATION_TYPE_LIST) {
            const relationMap = this._getRelationListType(relationType);

            for (let j = 0; j < relationNames.length; j++) {
                if (relationMap.has(relationNames[j])) {
                    const relation = relationMap.getElement(relationNames[j]);
                    promises.push(relation.getChildren());
                }
            }
        }

        return Promise.all(promises).then(childrenLst => {
            const res = [];

            for (let children of childrenLst) {
                for (let i = 0; i < children.length; i++) {
                    res.push(children[i]);
                }
            }

            return res;
        });
    }

    /**
     * Return all parents for the relation names no matter the type of relation
     * @param {Array<String>} relationNames Array containing the relation name of the desired parents
     * @return {Promise<Array<SpinalNode>>} Promise containing the parents that were found
     */
    getParents(relationNames) {
        const promises = [];

        if (typeof relationNames === "undefined" || relationNames.length === 0)
            relationNames = this.parents.keys();
        for (let name of relationNames) {
            const list = this.parents.getElement(name);

            for (let i = 0; i < list.length; i++) {
                promises.push(promiseLoad(list[i]).then(relation => {
                    return relation.getParent();
                }));
            };
        }
        return Promise.all(promises);
    }

    /**
     * Return the relation list corresponding to the relation type
     * @param {Number} relationType Type of the relation
     * @return {SpinalMap} Return the relation list corresponding to the relation type
     * @private
     */
    _getRelationListType(relationType) {
        switch (relationType) {
            case SPINAL_RELATION_TYPE:
                return this.relationListTypeSpinalRelation;

            case SPINAL_RELATION_LST_PTR_TYPE:
                return this.relationListTypeSpinalRelationLstPtr;

            case SPINAL_RELATION_PTR_LST_TYPE:
                return this.relationListTypeSpinalRelationPtrLst;

            default:
                throw new Error("Unknown relation type: ".concat(relationType.toString()));
        }

    }

    /**
     * Remove the node from all parent relation the property parents
     * @private
     */
    async _removeFromParents() {
        const promises = [];

        this.parents.forEach((parent) => {
            for (let i = 0; i < parent.length; i++) {
                promiseLoad(parent[i]).then(parentRel => {
                    promises.push(parentRel.removeChild(this));
                });
            }
        });
        await Promise.all(promises);
    }

    /**
     * Add the relation as parent of the node.
     * @param {SpinalRelation} relation Parent relation
     * @private
     */
    _addParent(relation) {
        const relationName = relation.getName();
        if (this.parents.has(relationName.get())) {
            this.parents.getElement(relationName).push(new SpinalNodePointer(relation));
        }
        else {
            const list = new globalType.Lst();
            list.push(new SpinalNodePointer(relation));
            this.parents.setElement(relationName, list);
        }
    }

    /**
     * Create a new relation for this node.
     * @param {String} relationName Name of the relation
     * @param {Number} relationType Type of the relation
     * @private
     */
    _createRelation(relationName, relationType) {
        const relation = SpinalRelationFactory.getNewRelation(relationName, relationType);
        relation.setParent(this);

        this._getRelationListType(relationType).setElement(relationName, relation)
        return relation;
    }

    /**
     * Remove all children relation from the graph.
     * This operation might also delete all the sub-graph under this node.
     * @private
     */
    async _removeFromChildren() {
        const promises = [];

        this.relationListTypeSpinalRelation.forEach(relation => {
            promises.push(relation.removeFromGraph());
        });
        this.relationListTypeSpinalRelationLstPtr.forEach(relation => {
            promises.push(relation.removeFromGraph());
        });
        this.relationListTypeSpinalRelationPtrLst.forEach(relation => {
            promises.push(relation.removeFromGraph());
        });
        await Promise.all(promises);
    }

    /**
     * Used to get a relation's children in an Array (instead of a Lst).
     * @param {SpinalRelation} relation Relation from wich the children are taken 
     * @return {Array<SpinalNode>} Array containing all of the relation's children
     * @private
     */
    async _childrenToList(relation) {
        const lst = [];
        let childrenLst = await relation.getChildren();
        for (let i = 0; i < childrenLst.length; i++) {
            lst.push(childrenLst[i]);
        }
        return lst;
    }

    /**
     * Return all children.
     * @return {Array<SpinalNode>} Array of children from all relations
     * @private
     */
    async _getAllChildren() {
        let res = [];

        try {
            for (let i = 0; i < RELATION_TYPE_LIST.length; i++) {
                let type = RELATION_TYPE_LIST[i];
                let childrenRelationMap = this._getRelationListType(type);
                let keys = childrenRelationMap.keys();
                for (let j = 0; j < keys.length; j++) {
                    let children = await this._childrenToList(childrenRelationMap[keys[j]]);
                    res.push(...children);
                }
            }
        }

        catch (e) {
            console.error(e);
        }

        return res;
    }
}

spinalCore.register_models([SpinalNode]);
export default SpinalNode;
