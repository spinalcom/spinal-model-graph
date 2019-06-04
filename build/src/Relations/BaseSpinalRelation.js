"use strict";
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
// tslint:disable:function-name
Object.defineProperty(exports, "__esModule", { value: true });
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const Utilities_1 = require("../Utilities");
const index_1 = require("../index");
const SpinalNodePointer_1 = require("../SpinalNodePointer");
const SpinalMap_1 = require("../SpinalMap");
/**
 * Base for all relation in a SpinalGraph.
 * @extends Model
 * @abstract
 * @property {spinal.Str} name
 * @property {spinal.Str} id
 * @property {SpinalNodePointer<SpinalNode>} parent
 * @property {SpinalMap<spinal.Val>} contextIds
 */
class BaseSpinalRelation extends spinal_core_connectorjs_type_1.Model {
    /**
     * Constructor for the BaseSpinalRelation class.
     * @param {SpinalNode<spinal.Model>} parent Parent of the relation
     * @param {string} name Name of the relation
     * @throws {TypeError} If the parent is not a node
     * @throws {TypeError} If the name is not a string
     */
    constructor(parent, name) {
        super();
        if (spinal_core_connectorjs_type_1.FileSystem._sig_server === false)
            return;
        // instanceof doesn't work here
        if (!index_1.SpinalNode.prototype.isPrototypeOf(parent)) {
            throw TypeError('parent must be a node');
        }
        if (typeof name !== 'string') {
            throw TypeError('name must be a string');
        }
        this.add_attr({
            name,
            id: Utilities_1.guid(name),
            parent: new SpinalNodePointer_1.SpinalNodePointer(parent),
            contextIds: new SpinalMap_1.SpinalMap(),
        });
    }
    /**
     * Shortcut to id.
     * @returns {spinal.Str} Id of the relation
     * @memberof BaseSpinalRelation
     */
    getId() {
        return this.id;
    }
    /**
     * Returns the name of the relation.
     * @returns {spinal.Str} Name of the relation
     * @memberof BaseSpinalRelation
     */
    getName() {
        return this.name;
    }
    /**
     * Returns the parent of the relation.
     * @returns {Promise<SpinalNode<spinal.Model>>} Returns a promise where the resolve is the parent
     * @memberof BaseSpinalRelation
     */
    getParent() {
        return this.parent.load();
    }
    /**
     * Adds an id to the context ids of the relation.
     * @param {string} id Id of the context
     * @throws {TypeError} If the id is not a string
     * @memberof BaseSpinalRelation
     */
    addContextId(id) {
        if (typeof id !== 'string') {
            throw TypeError('id must be a string');
        }
        if (!this.contextIds.has(id)) {
            this.contextIds.setElement(id, new spinal_core_connectorjs_type_1.Val(0));
        }
    }
    /**
     * Returns a list of the contexts the relation is associated to.
     * @returns {Array<string>} A list of ids of the associated contexts
     * @memberof BaseSpinalRelation
     */
    getContextIds() {
        return this.contextIds.keys();
    }
    /**
     * Returns true if the relation belongs to the context.
     * @param {SpinalContext<T>} context The context that might own the node
     * @returns {boolean} A boolean
     * @throws {TypeError} If the context is not a SpinalContext
     * @memberof BaseSpinalRelation
     */
    belongsToContext(context) {
        if (!(context instanceof index_1.SpinalContext)) {
            throw TypeError('context must be a SpinalContext');
        }
        return this.contextIds.has(context.getId().get());
    }
    /**
     * Removes children from the relation.
     * @param {Array<SpinalNode<spinal.Model>>} [nodesToDelete=[]] Childs to remove
     * @returns {Promise<void>} An empty promise
     * @throws {TypeError} If nodes is not an array or omitted
     * @throws {Error} If one of the nodes is not a child
     * @memberof BaseSpinalRelation
     */
    async removeChildren(nodesToDelete = []) {
        let nodes = nodesToDelete;
        const promises = [];
        if (!Array.isArray(nodes)) {
            throw TypeError('node must be an array');
        }
        if (nodes.length === 0) {
            nodes = await this.getChildren();
        }
        for (const node of nodes) {
            promises.push(this.removeChild(node));
        }
        try {
            await Promise.all(promises);
        }
        catch {
            throw Error('Could not remove all nodes');
        }
    }
    /**
     * Removes the relation from the graph.
     * @returns {Promise<void>} An empty promise
     * @memberof BaseSpinalRelation
     */
    async removeFromGraph() {
        await Promise.all([
            this._removeFromParent(),
            this.removeChildren(),
        ]);
    }
    /**
     * Removes the relation from the parent.
     * @returns {Promise<void>} An empty promise
     * @private
     * @memberof BaseSpinalRelation
     */
    async _removeFromParent() {
        const parent = await this.getParent();
        const relationMap = parent._getChildrenType(this.getType());
        relationMap.delete(this.getName().get());
        this.parent.unset();
    }
}
exports.BaseSpinalRelation = BaseSpinalRelation;
spinal_core_connectorjs_type_1.spinalCore.register_models([BaseSpinalRelation]);
exports.default = BaseSpinalRelation;
//# sourceMappingURL=BaseSpinalRelation.js.map