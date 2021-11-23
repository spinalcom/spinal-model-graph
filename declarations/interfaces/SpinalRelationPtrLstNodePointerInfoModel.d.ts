/**
 * @interface SpinalRelationPtrLstNodePointerInfoModel
 * @extends {InfoModel}
 */
export interface SpinalRelationPtrLstNodePointerInfoModel extends spinal.Model {
    pointedId?: spinal.Str;
    pointedType?: spinal.Str;
    ids: spinal.Lst<spinal.Str>;
}
