import { BaseSpinalRelation } from './BaseSpinalRelation';
import { SpinalNode, SpinalContext } from '../index';
declare type SpinalNodeAny = SpinalNode<any>;
/**
 * Relation where the children are in a Lst.
 * @class SpinalRelationRef
 * @extends {BaseSpinalRelation}
 * @property {spinal.Str} name
 * @property {spinal.Str} id
 * @property {SpinalNodePointer<SpinalNode>} parent
 * @property {SpinalMap<spinal.Val>} contextIds
 * @property {spinal.Lst<SpinalNode>} children
 */
declare class SpinalRelationRef extends BaseSpinalRelation {
    children: spinal.Lst<SpinalNodeAny>;
    /**
     * Constructor for the SpinalRelationRef class.
     * @param {SpinalNode} parent Parent of the relation
     * @param {string} name Name of the relation
     * @throws {TypeError} If the parent is not a node
     * @throws {TypeError} If the name is not a string
     * @memberof SpinalRelationRef
     */
    constructor(parent?: SpinalNodeAny, name?: string);
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
     * @returns {Promise<Array<SpinalNodeAny>>} The children of the relation
     * @memberof SpinalRelationRef
     */
    getChildren(): Promise<SpinalNodeAny[]>;
    /**
     * Return all the children of the relation associated to a certain context.
     * @param {SpinalContext} context The context to use for the search
     * @returns {Promise<SpinalNode[]>} The children of the relation associated to the context
     * @throws {TypeError} If the context is not a SpinalContext
     * @memberof SpinalRelationRef
     */
    getChildrenInContext(context: SpinalContext<any>): Promise<SpinalNodeAny[]>;
    /**
     * Returns the type of the relation.
     * @returns {string} Type of the relation
     * @memberof SpinalRelationRef
     */
    getType(): string;
    /**
     * Adds a child to the relation.
     * @template T extends spinal.Model = Node Element Type
     * @param {(T|SpinalNode<T>)} node Node or model to add
     * @throws {TypeError} If the node is not a Model
     * @throws {Error} If the node is already a child of the relation
     * @returns {Promise<SpinalNode<T>>} Promise containing the node that was added
     * @memberof SpinalRelationRef
     */
    addChild<T extends spinal.Model>(node: T | SpinalNode<T>): Promise<SpinalNode<T>>;
    /**
     * Removes a child from the relation.
     * @param {SpinalNode} node Child to remove
     * @returns {Promise<void>} An empty promise
     * @throws {Error} If the given node is not a child
     * @memberof SpinalRelationRef
     */
    removeChild(node: SpinalNodeAny): Promise<void>;
}
export default SpinalRelationRef;
export { SpinalRelationRef };
