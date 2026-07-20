import { Model } from 'spinal-core-connectorjs';
import type { SpinalRelationPtrLstNodePointer } from '../interfaces/SpinalRelationPtrLstNodePointer';
import { SpinalContext } from '../Nodes/SpinalContext';
import { SpinalNode } from '../Nodes/SpinalNode';
import { BaseSpinalRelation } from './BaseSpinalRelation';
import type SpinalRelationLstPtrLst from './SpinalRelationLstPtrLst';
/**
 * Relation where the children are in Ptr to a Lst.
 * @class SpinalRelationPtrLst
 * @extends {BaseSpinalRelation}
 * @property {Str} name
 * @property {Str} id
 * @property {SpinalNodePointer<SpinalNode<any>>} parent
 * @property {SpinalMap<Val>} contextIds
 * @property {SpinalRelationPtrLstNodePointer} children
 */
declare class SpinalRelationPtrLst extends BaseSpinalRelation {
    _constructorName: string;
    static _constructorName: string;
    children: SpinalRelationPtrLstNodePointer;
    isInUpgradeProcess?: Promise<SpinalRelationLstPtrLst>;
    /**
     * Constructor for the SpinalRelationPtrLst class.
     * @param {SpinalNode} [parent] Parent of the relation
     * @param {string} [name] Name of the relation
     * @throws {TypeError} If the parent is not a node
     * @throws {TypeError} If the name is not a string
     */
    constructor(parent?: SpinalNode<any>, name?: string);
    /**
     * Retrieves all the ids of the children of the relation and return them inside an array.
     * @returns {String[]} Array containing all the children ids of the relation
     */
    getChildrenIds(): string[];
    /**
     * returns the number of children of the relation.
     * @returns {number}
     */
    getNbChildren(): number;
    /**
     * Return the children of the relation.
     * @param {number} offset
     * @param {boolean} reverse
     * @param {SpinalContext} [context]
     * @param {number} [counter=0]
     * @return {*}  {AsyncGenerator<SpinalNode<any>, void, unknown>}
     */
    getChildrenGen(offset: number, reverse: boolean, context?: SpinalContext, counter?: number): AsyncGenerator<SpinalNode<any>, void, unknown>;
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
    /**
     * Removes children from the relation.
     * @override
     * @param {SpinalNode<any>[]} [nodes=[]] Childs to remove, if empty or missing all the children will be removed
     * @returns {Promise<void>} An empty promise
     * @throws {TypeError} If nodes is not an array or omitted
     * @throws {Error} If one of the nodes is not a child
     */
    removeChildren(nodes?: SpinalNode<any>[]): Promise<void>;
}
export default SpinalRelationPtrLst;
export { SpinalRelationPtrLst };
