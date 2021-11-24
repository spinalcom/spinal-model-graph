import { Model } from 'spinal-core-connectorjs_type';
import type { SpinalNodeAny } from "../interfaces/SpinalNodeAny";
import { SpinalContext } from '../Nodes/SpinalContext';
import { SpinalNode } from '../Nodes/SpinalNode';
import { SpinalMap } from '../SpinalMap';
import { SpinalNodePointer } from '../SpinalNodePointer';
/**
 * Base for all relation in a SpinalGraph.
 * @abstract
 * @class BaseSpinalRelation
 * @abstract
 * @property {spinal.Str} name
 * @property {spinal.Str} id
 * @property {SpinalNodePointer<SpinalNode>} parent
 * @property {SpinalMap<spinal.Val>} contextIds
 * @extends {Model}
 */
declare abstract class BaseSpinalRelation extends Model {
    name: spinal.Str;
    id: spinal.Str;
    parent: SpinalNodePointer<SpinalNodeAny>;
    contextIds: SpinalMap<spinal.Val>;
    /**
     * Constructor for the BaseSpinalRelation class.
     * @param {SpinalNode<spinal.Model>} parent Parent of the relation
     * @param {string} name Name of the relation
     * @throws {TypeError} If the parent is not a node
     * @throws {TypeError} If the name is not a string
     */
    constructor(parent?: SpinalNodeAny, name?: string);
    /**
     * Shortcut to id.
     * @returns {spinal.Str} Id of the relation
     * @memberof BaseSpinalRelation
     */
    getId(): spinal.Str;
    /**
     * Returns the name of the relation.
     * @returns {spinal.Str} Name of the relation
     * @memberof BaseSpinalRelation
     */
    getName(): spinal.Str;
    /**
     * Returns the parent of the relation.
     * @template T
     * @return {*}  {Promise<SpinalNode<T>>} Returns a promise where the resolve is the parent
     * @memberof BaseSpinalRelation
     */
    getParent<T extends spinal.Model>(): Promise<SpinalNode<T>>;
    /**
     * Adds an id to the context ids of the relation.
     * @param {string} id Id of the context
     * @throws {TypeError} If the id is not a string
     * @memberof BaseSpinalRelation
     */
    addContextId(id: string): void;
    /**
     * Returns a list of the contexts the relation is associated to.
     * @returns {Array<string>} A list of ids of the associated contexts
     * @memberof BaseSpinalRelation
     */
    getContextIds(): string[];
    /**
     * Returns true if the relation belongs to the context.
     * @param {SpinalContext<T>} context The context that might own the node
     * @returns {boolean} A boolean
     * @throws {TypeError} If the context is not a SpinalContext
     * @memberof BaseSpinalRelation
     */
    belongsToContext(context: SpinalContext<any>): boolean;
    /**
     * Removes children from the relation.
     * @param {Array<SpinalNode<spinal.Model>>} [nodesToDelete=[]] Childs to remove
     * @returns {Promise<void>} An empty promise
     * @throws {TypeError} If nodes is not an array or omitted
     * @throws {Error} If one of the nodes is not a child
     * @memberof BaseSpinalRelation
     */
    removeChildren(nodesToDelete?: SpinalNodeAny[]): Promise<void>;
    abstract removeChild(node: SpinalNodeAny): Promise<void>;
    abstract getChildren(): Promise<SpinalNodeAny[]>;
    /**
     * Removes the relation from the graph.
     * @returns {Promise<void>} An empty promise
     * @memberof BaseSpinalRelation
     */
    removeFromGraph(): Promise<void>;
    /**
     * Removes the relation from the parent.
     * @returns {Promise<void>} An empty promise
     * @private
     * @memberof BaseSpinalRelation
     */
    _removeFromParent(): Promise<void>;
}
export default BaseSpinalRelation;
export { BaseSpinalRelation };
