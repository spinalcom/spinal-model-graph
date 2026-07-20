import { Lst, Model } from 'spinal-core-connectorjs';
import { SpinalNode } from '../Nodes/SpinalNode';
import { SpinalNodePointer } from '../SpinalNodePointer';
import { BaseSpinalRelation } from './BaseSpinalRelation';
import { SpinalContext } from '../Nodes/SpinalContext';
/**
 * Relation where the children are in Lst of Ptr of Lst.
 * @extends BaseSpinalRelation
 * @property {Str} name
 * @property {Str} id
 * @property {SpinalNodePointer<SpinalNode<any>>} parent
 * @property {SpinalMap<Val>} contextIds
 * @property {Lst<SpinalNodePointer<Lst<SpinalNode<any>>>>} children
 */
declare class SpinalRelationLstPtrLst extends BaseSpinalRelation {
    _constructorName: string;
    static _constructorName: string;
    children: Lst<SpinalNodePointer<Lst<SpinalNode<any>>>>;
    private debouncedRestructureChildren;
    /**
     * Constructor for the SpinalRelationLstPtrLst class.
     * @param {SpinalNode<any>} parent Parent of the relation
     * @param {string} name Name of the relation
     * @throws {TypeError} If the parent is not a node
     * @throws {TypeError} If the name is not a string
     */
    constructor(parent?: SpinalNode<any>, name?: string);
    /**
     * Retrieves all the ids of the children of the relation and return them inside an array.
     * @returns {string[]} Array containing all the children ids of the relation
     */
    getChildrenIds(): string[];
    /**
     * returns the number of children of the relation.
     * @returns {number}
     */
    getNbChildren(): number;
    /**
     * Checks if the relation has a child with a certain id.
     * @param {string} id Id to check
     * @returns {boolean} True if the relation has a child with the given id, false otherwise
     */
    hasId(id: string): boolean;
    /**
     * Generator that yields the children of the relation one by one.
     * @param {number} offset
     * @param {boolean} reverse
     * @param {SpinalContext} [context]
     * @param {number} [counter=0]
     * @return {*}
     */
    getChildrenGen(offset: number, reverse: boolean, context?: SpinalContext, counter?: number): AsyncGenerator<SpinalNode<any>, void, unknown>;
    private _getChildrenGen;
    private _getChildrenInContext;
    /**
     * Returns the type of the relation.
     * @returns {string} Type of the relation
     */
    getType(): string;
    /**
     * Adds a child to the relation.
     * @template T extends Model = Node Element Type
     * @param {(T|SpinalNode<T>)} node Node or model to add
     * @throws {TypeError} If the node is not a Model
     * @throws {Error} If the node is already a child of the relation
     * @returns {Promise<SpinalNode<T>>} Promise containing the node that was added
     */
    addChild<T extends Model>(node: T | SpinalNode<T>): Promise<SpinalNode<T>>;
    /**
     * Removes a child from the relation.
     * @param {SpinalNode<any>} node Child to remove
     * @returns {Promise<void>} An empty promise
     * @throws {Error} If the given node is not a child
     */
    removeChild(node: SpinalNode<any>): Promise<void>;
    restructureChildren(): Promise<void>;
}
export default SpinalRelationLstPtrLst;
export { SpinalRelationLstPtrLst };
