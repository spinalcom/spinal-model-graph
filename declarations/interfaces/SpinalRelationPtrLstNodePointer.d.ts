import type { SpinalNodePointer } from '../SpinalNodePointer';
import type { SpinalRelationPtrLstNodePointerInfoModel } from './SpinalRelationPtrLstNodePointerInfoModel';
import type { SpinalNode } from '../Nodes/SpinalNode';
/**
 * @interface SpinalRelationPtrLstNodePointer
 * @extends {SpinalNodePointer<spinal.Lst<SpinalNode<any>>>}
 */
export interface SpinalRelationPtrLstNodePointer extends SpinalNodePointer<spinal.Lst<SpinalNode<any>>> {
    info: SpinalRelationPtrLstNodePointerInfoModel;
}
