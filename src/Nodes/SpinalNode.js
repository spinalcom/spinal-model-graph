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
import SpinalNodePointer from "../SpinalNodePointer";

const globalType = typeof window === "undefined" ? global : window;

import { SpinalRelationFactory } from "../Relations/SpinalRelationFactory";
import SpinalMap from "../SpinalMap";

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
            parents: new SpinalMap(),
            children: new SpinalMap(),
            element: new SpinalNodePointer(element),
            contextIds: new SpinalMap()
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
     * Computes and returns the number of children of the node.
     * @return {Number} The number of children
     */
    getNbChildren() {
        let nbChildren = 0;

        this.children.forEach(relationMap => {
            relationMap.forEach(relation => {
                let childrenIds = relation.getChildrenIds();
                nbChildren += childrenIds.length;
            });
        });
        return nbChildren;
    }

    /**
     * Returns a list of the contexts the node is associated to.
     * @return {Array<String>} A list of ids of the associated contexts
     */
    getContextIds() {
        return this.contextIds.keys();
    }

    /**
     * Adds an id to the context ids of the node.
     * @param {String} id Id of the context
     */
    addContextId(id) {
        if (!this.contextIds.has(id))
            this.contextIds.setElement(id, 0);
    }

    /**
     * Verify if the node contains the relation name.
     * @param {String} relationName Name of the relation
     * @param {String} relationType Type of the relation
     * @return {Boolean} Return true is the relation is contained in the node and false otherwise.
     */
    hasRelation(relationName, relationType) {
        const typeMap = this._getChildrenType(relationType);

        if (typeof typeMap === "undefined")
            return false;
        return typeMap.has(relationName);
    }

    /**
     * Verify if the node contains all the relation names.
     * @param {Array<String>} relationNames Array containing all the relation name
     * @param {String} relationType Type of the relations
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
     * @param {String} relationType Type of the relation
     * @return {Promise<SpinalNode>} The child node in a promise
     */
    async addChild(child, relationName, relationType) {
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
            relation = this._getRelation(relationName, relationType);

        await relation.addChild(child);
        return child;
    }

    /**
     * Adds a child and notices the context if a new relation was created.
     * @param {SpinalNode | Model} child Node to add as child
     * @param {String} relationName Name of the relation
     * @param {String} relationType Type of the relation
     * @param {SpinalContext} context Context to update
     * @return {Promise<SpinalNode>} The child node in a promise
     */
    async addChildInContext(child, relationName, relationType, context) {
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
            relation = this._getRelation(relationName, relationType);

        child.addContextId(context.getId().get());
        relation.addContextId(context.getId().get());

        await relation.addChild(child);
        return child;
    }

    /**
     * Remove the node from the relation children.
     * @param {SpinalNode} node Node to remove
     * @param {String} relationName Name of the relation to wich the node belongs
     * @param {String} relationType Type of the relation to wich the node belongs
     * @return {Promise<nothing>} An empty promise
     */
    async removeChild(node, relationName, relationType) {
        if (this.hasRelation(relationName, relationType)) {
            let rel = this._getRelation(relationName, relationType);
            rel.removeChild(node);
        }
    }

    /**
     * Remove the node from the graph i.e remove the node from all the parent relations and remove all the children relations.
     * This operation might delete all the sub-graph under this node.
     * After this operation the node can be deleted without fear.
     * @return {Promise<nothing>} An empty promise
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
            relationNames = this._getRelationNames();
        } else if (typeof relationNames === "string")
            relationNames = [relationNames];

        const promises = [];

        this.children.forEach(relationMap => {
            for (let j = 0; j < relationNames.length; j++) {
                if (relationMap.has(relationNames[j])) {
                    const relation = relationMap.getElement(relationNames[j]);
                    promises.push(relation.getChildren());
                }
            }
        });

        const childrenLst = await Promise.all(promises);
        let res = [];

        for (let children of childrenLst) {
            for (let i = 0; i < children.length; i++) {
                res.push(children[i]);
            }
        }

        return res;
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
     * Return the relation list corresponding to the relation type.
     * @param {String} relationType Type of the relation
     * @return {SpinalMap} Return the relation list corresponding to the relation type
     * @private
     */
    _getChildrenType(relationType) {
        return this.children.getElement(relationType);
    }

    /**
     * Return the relation corresponding.
     * @param {String} relationName Name of the relation
     * @param {String} relationType Type of the relation
     * @return {SpinalRelation} The relation corresponding
     * @private
     */
    _getRelation(relationName, relationType) {
        return this._getChildrenType(relationType).getElement(relationName);
    }

    /**
     * Removes a parent relation of the node.
     * @param {SpinalRelation} relation Relation to remove
     * @private
     */
    _removeParent(relation) {
        const parentLst = this.parents.getElement(relation.getName().get());

        const indexTORemove = parentLst.indexOf(parentPtr =>
            parentPtr.getId().get() === relation.getId().get()
        );

        parentLst.splice(indexTORemove);
    }

    /**
     * Removes the node from all parent relation the property parents.
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
     * Adds the relation as parent of the node.
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
     * @param {String} relationType Type of the relation
     * @private
     */
    _createRelation(relationName, relationType) {
        const relation = SpinalRelationFactory.getNewRelation(relationName, relationType);
        relation.setParent(this);

        if (!this.children.has(relationType)) {
            this.children.setElement(relationType, new SpinalMap());
        }
        this._getChildrenType(relationType).setElement(relationName, relation);
        return relation;
    }

    /**
     * Remove all children relation from the graph.
     * @return {Promise<nothing>} An empty promise
     * @private
     */
    async _removeFromChildren() {
        const promises = [];

        this.children.forEach(relationMap => {
            relationMap.forEach(relation => {
                promises.push(relation.removeFromGraph());
            });
        });
        await Promise.all(promises);
    }

    /**
     * Returns all the relation names of the node.
     * @return {Array<String>} The names of the relations of the node
     * @private
     */
    _getRelationNames() {
        let names = [];

        this.children.forEach(relationMap => {
            names.push(...relationMap.keys());
        });
        return names;
    }
}

spinalCore.register_models([SpinalNode]);
export default SpinalNode;
