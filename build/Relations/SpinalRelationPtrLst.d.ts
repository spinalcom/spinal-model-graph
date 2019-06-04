import { BaseSpinalRelation } from './BaseSpinalRelation';
import { SpinalNode, SpinalContext } from '../index';
import { SpinalNodePointer } from '../SpinalNodePointer';
declare type SpinalNodeAny = SpinalNode<any>;
/**
 * @interface SpinalRelationPtrLstNodePointerInfoModel
 * @extends {InfoModel}
 */
interface SpinalRelationPtrLstNodePointerInfoModel extends spinal.Model {
    pointedId?: spinal.Str;
    pointedType?: spinal.Str;
    ids: spinal.Lst<spinal.Str>;
}
/**
 * @interface SpinalRelationPtrLstNodePointer
 * @extends {SpinalNodePointer<spinal.Lst<SpinalNodeAny>>}
 */
interface SpinalRelationPtrLstNodePointer extends SpinalNodePointer<spinal.Lst<SpinalNodeAny>> {
    info: SpinalRelationPtrLstNodePointerInfoModel;
}
/**
 * Relation where the children are in Ptr to a Lst.
 * @class SpinalRelationPtrLst
 * @extends {BaseSpinalRelation}
 * @property {spinal.Str} name
 * @property {spinal.Str} id
 * @property {SpinalNodePointer<SpinalNodeAny>} parent
 * @property {SpinalMap<spinal.Val>} contextIds
 * @property {SpinalRelationPtrLstNodePointer} children
 */
declare class SpinalRelationPtrLst extends BaseSpinalRelation {
    children: SpinalRelationPtrLstNodePointer;
    /**
     * Constructor for the SpinalRelationPtrLst class.
     * @param {SpinalNode} parent Parent of the relation
     * @param {string} name Name of the relation
     * @throws {TypeError} If the parent is not a node
     * @throws {TypeError} If the name is not a string
     */
    constructor(parent: SpinalNodeAny, name: string);
    /**
     * Retrieves all the ids of the children of the relation and return them inside an array.
     * @returns {String[]} Array containing all the children ids of the relation
     * @memberof SpinalRelationPtrLst
     */
    getChildrenIds(): string[];
    /**
     * returns the number of children of the relation.
     * @returns {number}
     * @memberof SpinalRelationPtrLst
     */
    getNbChildren(): number;
    /**
     * Return all the children of the relation.
     * @returns {Promise<SpinalNodeAny[]>} The children of the relation
     * @memberof SpinalRelationPtrLst
     */
    getChildren(): Promise<SpinalNodeAny[]>;
    /**
     * Return all the children of the relation associated to a certain context.
     * @param {SpinalContext} context Context to use for the search
     * @returns {Promise<Array<SpinalNodeAny>>} The children associated to the context
     * @throws {TypeError} If the context is not a SpinalContext
     * @memberof SpinalRelationPtrLst
     */
    getChildrenInContext(context: SpinalContext<any>): Promise<SpinalNodeAny[]>;
    /**
     * Returns the type of the relation.
     * @returns {string} Type of the relation
     * @memberof SpinalRelationPtrLst
     */
    getType(): string;
    /**
     * Adds a child to the relation.
     * @template T extends spinal.Model = Node Element Type
     * @param {(T|SpinalNode<T>)} node Node or model to add
     * @throws {TypeError} If the node is not a Model
     * @throws {Error} If the node is already a child of the relation
     * @returns {Promise<SpinalNode<T>>} Promise containing the node that was added
     * @memberof SpinalRelationPtrLst
     */
    addChild<T extends spinal.Model>(node: T | SpinalNode<T>): Promise<SpinalNode<T>>;
    /**
     * Removes a child from the relation.
     * @param {SpinalNodeAny} node Child to remove
     * @returns {Promise<void>} An empty promise
     * @throws {Error} If the given node is not a child
     * @memberof SpinalRelationPtrLst
     */
    removeChild(node: SpinalNodeAny): Promise<void>;
    /**
     * Removes children from the relation.
     * @override
     * @param {SpinalNodeAny[]} [nodes=[]] Childs to remove
     * @returns {Promise<void>} An empty promise
     * @throws {TypeError} If nodes is not an array or omitted
     * @throws {Error} If one of the nodes is not a child
     * @memberof SpinalRelationPtrLst
     */
    removeChildren(nodes?: SpinalNodeAny[]): Promise<void>;
}
export default SpinalRelationPtrLst;
export { SpinalRelationPtrLst, };
