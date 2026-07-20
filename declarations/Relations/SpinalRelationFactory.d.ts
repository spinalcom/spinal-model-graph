import type { Model } from 'spinal-core-connectorjs';
import { RELATION_TYPE_LIST, SPINAL_RELATION_LST_PTR_TYPE, SPINAL_RELATION_PTR_LST_TYPE, SPINAL_RELATION_LST_PTR_LST_TYPE, SPINAL_RELATION_TYPE } from '../constants';
import type { SpinalNode } from '../Nodes/SpinalNode';
import { SpinalRelationLstPtr } from './SpinalRelationLstPtr';
import { SpinalRelationPtrLst } from './SpinalRelationPtrLst';
import { SpinalRelationRef } from './SpinalRelationRef';
import { SpinalRelationLstPtrLst } from './SpinalRelationLstPtrLst';
import type { AnySpinalRelation } from '../interfaces/AnySpinalRelation';
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
     * @returns {SpinalRelationRef | SpinalRelationLstPtr | SpinalRelationPtrLst | SpinalRelationLstPtrLst} A new SpinalRelation
     */
    static getNewRelation(parent: SpinalNode<Model>, relationName: string, relationType: string): SpinalRelationRef | SpinalRelationLstPtr | SpinalRelationPtrLst | SpinalRelationLstPtrLst;
    /**
     * @param {AnySpinalRelation} relation
     * @return {*}  {(relation is (SpinalRelationLstPtr | SpinalRelationPtrLst) & boolean)}
     */
    static canUpgradeRelation(relation: AnySpinalRelation): relation is (SpinalRelationLstPtr | SpinalRelationPtrLst) & boolean;
    /**
     * @param {(SpinalRelationLstPtr | SpinalRelationPtrLst)} relation
     * @param {SpinalNode} nodeParent
     * @return {*}  {Promise<SpinalRelationLstPtrLst>}
     */
    static upgradeRelationToLstPtrLst(relation: SpinalRelationLstPtr | SpinalRelationPtrLst, nodeParent: SpinalNode): Promise<SpinalRelationLstPtrLst>;
    private static _upgradeRelationToLstPtrLst;
}
export { SPINAL_RELATION_TYPE, SPINAL_RELATION_LST_PTR_TYPE, SPINAL_RELATION_PTR_LST_TYPE, SPINAL_RELATION_LST_PTR_LST_TYPE, RELATION_TYPE_LIST, SpinalRelationFactory, };
