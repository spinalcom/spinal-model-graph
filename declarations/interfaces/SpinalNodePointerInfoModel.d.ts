/**
 * @export
 * @interface SpinalNodePointerInfoModel
 * @extends {spinal.Model}
 */
export interface SpinalNodePointerInfoModel extends spinal.Model {
    pointedId?: spinal.Str;
    pointedType?: spinal.Str;
}
