import type { SpinalNodePointer } from '../SpinalNodePointer';
import type { SpinalNodeAny } from "./SpinalNodeAny";
import type { SpinalRelationPtrLstNodePointerInfoModel } from './SpinalRelationPtrLstNodePointerInfoModel';
/**
 * @interface SpinalRelationPtrLstNodePointer
 * @extends {SpinalNodePointer<spinal.Lst<SpinalNodeAny>>}
 */
export interface SpinalRelationPtrLstNodePointer extends SpinalNodePointer<spinal.Lst<SpinalNodeAny>> {
    info: SpinalRelationPtrLstNodePointerInfoModel;
}
