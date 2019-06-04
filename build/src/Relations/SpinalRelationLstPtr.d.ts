import { BaseSpinalRelation } from './BaseSpinalRelation';
import { SpinalNode, SpinalContext } from '../index';
import { SpinalNodePointer } from '../SpinalNodePointer';
declare type SpinalNodeAny = SpinalNode<any>;
/**
 * Relation where the children are in Lst of Ptr.
 * @extends BaseSpinalRelation
 * @property {spinal.Str} name
 * @property {spinal.Str} id
 * @property {SpinalNodePointer<SpinalNode>} parent
 * @property {SpinalMap<spinal.Val>} contextIds
 * @property {spinal.Lst<SpinalNodePointer<SpinalNode>>} children
 */
declare class SpinalRelationLstPtr extends BaseSpinalRelation {
    children: spinal.Lst<SpinalNodePointer<SpinalNodeAny>>;
    /**
     * Constructor for the SpinalRelationLstPtr class.
     * @param {SpinalNodeAny} parent Parent of the relation
     * @param {string} name Name of the relation
     * @throws {TypeError} If the parent is not a node
     * @throws {TypeError} If the name is not a string
     * @memberof SpinalRelationLstPtr
     */
    constructor(parent?: SpinalNodeAny, name?: string);
    /**
     * Retrieves all the ids of the children of the relation and return them inside an array.
     * @returns {string[]} Array containing all the children ids of the relation
     * @memberof SpinalRelationLstPtr
     */
    getChildrenIds(): string[];
    /**
   * returns the number of children of the relation.
   * @returns {number}
   * @memberof SpinalRelationLstPtr
   */
    getNbChildren(): number;
    /**
     * Return all the children of the relation.
     * @returns {Promise<SpinalNode[]>} The children of the relation
     * @memberof SpinalRelationLstPtr
     */
    getChildren(): Promise<SpinalNodeAny[]>;
    /**
     * Return all the children of the relation associated to a certain context.
     * @returns {Promise<SpinalNodeAny[]>} The children of the relation
     * @throws {TypeError} If the context is not a SpinalContext
     * @memberof SpinalRelationLstPtr
     */
    getChildrenInContext(context: SpinalContext<any>): Promise<SpinalNodeAny[]>;
    /**
     * Returns the type of the relation.
     * @returns {string} Type of the relation
     * @memberof SpinalRelationLstPtr
     */
    getType(): string;
    /**
     * Adds a child to the relation.
     * @template T extends spinal.Model = Node Element Type
     * @param {(T|SpinalNode<T>)} node Node or model to add
     * @throws {TypeError} If the node is not a Model
     * @throws {Error} If the node is already a child of the relation
     * @returns {Promise<SpinalNode<T>>} Promise containing the node that was added
     * @memberof SpinalRelationLstPtr
     */
    addChild<T extends spinal.Model>(node: T | SpinalNode<T>): Promise<SpinalNode<T>>;
    /**
     * Removes a child from the relation.
     * @param {SpinalNodeAny} node Child to remove
     * @returns {Promise<void>} An empty promise
     * @throws {Error} If the given node is not a child
     * @memberof SpinalRelationLstPtr
     */
    removeChild(node: SpinalNodeAny): Promise<void>;
}
export default SpinalRelationLstPtr;
export { SpinalRelationLstPtr };
