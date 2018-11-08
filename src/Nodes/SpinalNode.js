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
     *
     * @param {String} name Name of the node
     * @param {String} type Type of the node
     * @param {SpinalNode | Model} element Optional element pointed by the node, by default it points to a empty new Model
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
     * Shortcut to info.id.
     * @return {Str}
     */
    getId() {
        return this.info.id;
    }

    /**
     * Return the element.
     * @return {Promise<*>} A promise where the parameter of the resolve method is the element
     */
    getElement() {
        return promiseLoad(this.element);
    }

    /**
     * Shortcut to info.type.
     * @return {Str} type of the node.
     */
    getType() {
        return this.info.type;
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
     * @param {Array} relationNames Array containing all the relation name
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
     */
    addChild(child, relationName, relationType) {
        if (child instanceof SpinalNode) {
            this._addToRelation(child, relationName, relationType);
        }
        else if (child instanceof globalType.Model) {
            const node = new SpinalNode(undefined, undefined, child);
            this._addToRelation(node, relationName, relationType);
        }
        else {
            throw new Error("Cannot add a child witch is not an instance of SpinalNode or Model.");
        }
    }

    /**
     * Remove the node from the relation children.
     * @param {SpinalNode} node Node to remove
     * @param {String} relationName Name of the relation to wich the node belongs
     * @param {Number} relationType Type of the relation to wich the node belongs
     */
    removeChild(node, relationName, relationType) {
        if (this._getRelationListType(relationType).has(relationName)) {
            let rel = this._getRelationListType(relationType).getElement(relationName);
            return rel.removeChild(node);
        }

        return false;
    }

    /**
     * Remove the node from the graph i.e remove the node from all the parent relations and remove all the children relations.
     * This operation might delete all the sub-graph under this node.
     * After this operation the node can be deleted without fear.
     */
    removeFromGraph() {
        this._removeFromParents();
        this._removeFromChildren();
    }

    /**
     * Return all children for the relation name no matter the type of relation
     * @param {Array} relationNames Array containing the relation names of the desired children
     * @return {Promise<Array | never | void>} Promise containing all children for the relation names.
     */
    getChildren(relationNames) {
        if (relationNames.length > 0) {
            const promises = [];
            for (let i = 0; i < RELATION_TYPE_LIST.length; i++) {
                const relationMap = this._getRelationListType(RELATION_TYPE_LIST[i]);
                for (let j = 0; j < relationNames.length; j++) {
                    if (relationMap.has(relationNames[j])) {
                        const relation = relationMap.getElement(relationNames[j]);
                        if (typeof relation.getChildren === 'function')
                            promises.push(relation.getChildren());
                        else
                            //TODO implement SpinalError
                            console.error(relation);
                    }
                }
            }
            return Promise.all(promises).then(childrenLst => {
                const res = [];

                for (let i = 0; i < childrenLst.length; i++) {
                    for (let j = 0; j < childrenLst[i].length; j++) {
                        res.push(childrenLst[i][j]);
                    }
                }

                return res;
            });
        }
        else {
            return Promise.resolve(this._getAllChildren());
        }
    }

    /**
     * Return all parents for the relation names no matter the type of relation
     * @param {Array} relationNames Array containing the relation name of the desired parents
     * @return {Promise<Array>} Promise containing all parents for the relation names.
     */
    async getParent(relationNames) {
        const parents = [];

        if (typeof relationNames === "undefined" || relationNames.length === 0)
            relationNames = this.parents.keys();
        for (let name of relationNames) {
            const list = this.parents.getElement(name);

            for (let i = 0; i < list.length; i++) {
                await promiseLoad(list[i]).then(relation => {
                    relation.getParent().then(parent => parents.push(parent));
                });
            };
        }

        return Promise.resolve(parents);
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
     * Add a node as child.
     * If this node doesn't have a relation name relationName with the type relationType this method will create it.
     * @param {SpinalNode} node Node to add as child.
     * @param {String} relationName Name of the relation
     * @param {Number} relationType Type of the relation
     * @return {Str} id of the relation where the node was added as child
     * @private
     */
    _addToRelation(node, relationName, relationType) {
        const addToRelation = (spinalNode) => {
            const relationLst = spinalNode._getRelationListType(relationType);
            const relation = relationLst.getElement(relationName);

            relation.addChild(node);
            node._addParent(relation);
        };

        if (!this.hasRelation(relationName, relationType))
            this._createRelation(relationName, relationType);
        addToRelation(this);
    }

    /**
     * Remove the node from all parent relation the property parents
     * @private
     */
    _removeFromParents() {
        function removeFromParent(parent) {
            parent.removeChild(this);
        }

        const removeFromParentBinded = removeFromParent.bind(this);
        this.parents.forEach((parent) => {
            for (let i = 0; i < parent.length; i++) {
                promiseLoad(parent[i]).then(removeFromParentBinded);
            }
        });
    }

    /**
     * Add the relation as parent of the node.
     * @param {SpinalRelation} relation Parent relation
     * @private
     */
    _addParent(relation) {
        const relationName = relation.getName();
        if (this.parents.has(relationName)) {
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
    _removeFromChildren() {
        this.relationListTypeSpinalRelation.forEach(relation => {
            relation.removeFromGraph();
        });
        this.relationListTypeSpinalRelationLstPtr.forEach(relation => {
            relation.removeFromGraph();
        });
        this.relationListTypeSpinalRelationPtrLst.forEach(relation => {
            relation.removeFromGraph();
        });
    }

    /**
     * Used to get a relation's children in an Array (instead of a Lst).
     * @param {SpinalRelation} relation Relation from wich the children are taken 
     * @return {Array} Array containing all of the relation's children
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
     * @return {Array} Array of children from all relations
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
