import { Lst, Model, type Val } from 'spinal-core-connectorjs';
import { SpinalContext } from '../Nodes/SpinalContext';
import { SpinalNode } from '../Nodes/SpinalNode';
import { SpinalNodePointer } from '../SpinalNodePointer';
import { BaseSpinalRelation } from './BaseSpinalRelation';
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
    lastRestructure: Val;
    children: Lst<SpinalNodePointer<Lst<SpinalNode<any>>>>;
    private debouncedRestructureChildren;
    /**
     * Constructor for the SpinalRelationLstPtrLst class.
     * @param {SpinalNode<any>} parent Parent of the relation
     * @param {string} name Name of the relation
     * @throws {TypeError} If the parent is not a node
     * @throws {TypeError} If the name is not a string
     * @memberof SpinalRelationLstPtrLst
     */
    constructor(parent?: SpinalNode<any>, name?: string);
    /**
     * Retrieves all the ids of the children of the relation and return them inside an array.
     * @returns {string[]} Array containing all the children ids of the relation
     * @memberof SpinalRelationLstPtrLst
     */
    getChildrenIds(): string[];
    /**
     * returns the number of children of the relation.
     * @returns {number}
     * @memberof SpinalRelationLstPtrLst
     */
    getNbChildren(): number;
    /**
     * Checks if the relation has a child with a certain id.
     * @param {string} id Id to check
     * @returns {boolean} True if the relation has a child with the given id, false otherwise
     * @memberof SpinalRelationLstPtrLst
     */
    hasId(id: string): boolean;
    /**
     * Generator that yields all the children of the relation one by one.
     * @return {*}  {AsyncGenerator<SpinalNode<any>, void, unknown>}
     * @memberof SpinalRelationLstPtrLst
     */
    getChildrenGen(): AsyncGenerator<SpinalNode<any>, void, unknown>;
    /**
     * Return all the children of the relation associated to a certain context.
     * @returns {Promise<SpinalNode<any>[]>} The children of the relation
     * @throws {TypeError} If the context is not a SpinalContext
     * @memberof SpinalRelationLstPtrLst
     */
    getChildrenInContextGen(context: SpinalContext<any>): AsyncGenerator<SpinalNode<any>, void, unknown>;
    /**
     * Returns the type of the relation.
     * @returns {string} Type of the relation
     * @memberof SpinalRelationLstPtrLst
     */
    getType(): string;
    /**
     * Adds a child to the relation.
     * @template T extends Model = Node Element Type
     * @param {(T|SpinalNode<T>)} node Node or model to add
     * @throws {TypeError} If the node is not a Model
     * @throws {Error} If the node is already a child of the relation
     * @returns {Promise<SpinalNode<T>>} Promise containing the node that was added
     * @memberof SpinalRelationLstPtrLst
     */
    addChild<T extends Model>(node: T | SpinalNode<T>): Promise<SpinalNode<T>>;
    /**
     * Removes a child from the relation.
     * @param {SpinalNode<any>} node Child to remove
     * @returns {Promise<void>} An empty promise
     * @throws {Error} If the given node is not a child
     * @memberof SpinalRelationLstPtrLst
     */
    removeChild(node: SpinalNode<any>): Promise<void>;
    restructureChildren(force?: boolean): Promise<void>;
}
export default SpinalRelationLstPtrLst;
export { SpinalRelationLstPtrLst };
