import { SpinalRelationRef } from './SpinalRelationRef';
import { SpinalRelationLstPtr } from './SpinalRelationLstPtr';
import { SpinalRelationPtrLst } from './SpinalRelationPtrLst';
import { SpinalNode } from '..';
declare const SPINAL_RELATION_TYPE = "Ref";
declare const SPINAL_RELATION_LST_PTR_TYPE = "LstPtr";
declare const SPINAL_RELATION_PTR_LST_TYPE = "PtrLst";
declare const RELATION_TYPE_LIST: string[];
/**
 * Namespace for general relation functions.
 * @abstract
 */
declare class SpinalRelationFactory {
    /**
     * Create a new relation of relationType with the relationName.
     * @param {SpinalNode} parent Parent of the relation
     * @param {string} relationName Name of the relation
     * @param {string} relationType Type of the relation
     * @returns {SpinalRelationRef | SpinalRelationLstPtr | SpinalRelationPtrLst} A new SpinalRelation
     * @static
     * @memberof SpinalRelationFactory
     */
    static getNewRelation(parent: SpinalNode<spinal.Model>, relationName: string, relationType: string): SpinalRelationRef | SpinalRelationLstPtr | SpinalRelationPtrLst;
}
export { SPINAL_RELATION_TYPE, SPINAL_RELATION_LST_PTR_TYPE, SPINAL_RELATION_PTR_LST_TYPE, RELATION_TYPE_LIST, SpinalRelationFactory, };
