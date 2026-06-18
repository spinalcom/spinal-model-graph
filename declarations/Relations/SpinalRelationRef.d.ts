import { Lst, Model } from 'spinal-core-connectorjs';
import { SpinalContext } from '../Nodes/SpinalContext';
import { SpinalNode } from '../Nodes/SpinalNode';
import { BaseSpinalRelation } from './BaseSpinalRelation';
/**
 * Relation where the children are in a Lst.
 * @class SpinalRelationRef
 * @extends {BaseSpinalRelation}
 * @property {Str} name
 * @property {Str} id
 * @property {SpinalNodePointer<SpinalNode>} parent
 * @property {SpinalMap<Val>} contextIds
 * @property {Lst<SpinalNode>} children
 */
declare class SpinalRelationRef extends BaseSpinalRelation {
    _constructorName: string;
    static _constructorName: string;
    children: Lst<SpinalNode<any>>;
    /**
     * Constructor for the SpinalRelationRef class.
     * @param {SpinalNode} parent Parent of the relation
     * @param {string} name Name of the relation
     * @throws {TypeError} If the parent is not a node
     * @throws {TypeError} If the name is not a string
     * @memberof SpinalRelationRef
     */
    constructor(parent?: SpinalNode<any>, name?: string);
    /**
     * Retrieves all the ids of the children of the relation and return them inside an array.
     * @returns {String[]} Array containing all the children ids of the relation
     * @memberof SpinalRelationRef
     */
    getChildrenIds(): string[];
    /**
     * returns the number of children of the relation.
     * @returns {number}
     * @memberof SpinalRelationRef
     */
    getNbChildren(): number;
    /**
     * Return all the children of the relation.
     * @returns {AsyncGenerator<SpinalNode<any>, void, unknown>} The children of the relation
     * @memberof SpinalRelationRef
     */
    getChildrenGen(): AsyncGenerator<SpinalNode<any>, void, unknown>;
    /**
     * Return all the children of the relation associated to a certain context.
     * @param {SpinalContext} context The context to use for the search
     * @returns {AsyncGenerator<SpinalNode<any>, void, unknown>} The children of the relation associated to the context
     * @throws {TypeError} If the context is not a SpinalContext
     * @memberof SpinalRelationRef
     */
    getChildrenInContextGen(context: SpinalContext<any>): AsyncGenerator<SpinalNode<any>, void, unknown>;
    /**
     * Returns the type of the relation.
     * @returns {string} Type of the relation
     * @memberof SpinalRelationRef
     */
    getType(): string;
    /**
     * Adds a child to the relation.
     * @template T extends Model = Node Element Type
     * @param {(T|SpinalNode<T>)} node Node or model to add
     * @throws {TypeError} If the node is not a Model
     * @throws {Error} If the node is already a child of the relation
     * @returns {Promise<SpinalNode<T>>} Promise containing the node that was added
     * @memberof SpinalRelationRef
     */
    addChild<T extends Model>(node: T | SpinalNode<T>): Promise<SpinalNode<T>>;
    /**
     * Removes a child from the relation.
     * @param {SpinalNode} node Child to remove
     * @returns {Promise<void>} An empty promise
     * @throws {Error} If the given node is not a child
     * @memberof SpinalRelationRef
     */
    removeChild(node: SpinalNode<any>): Promise<void>;
}
export default SpinalRelationRef;
export { SpinalRelationRef };
