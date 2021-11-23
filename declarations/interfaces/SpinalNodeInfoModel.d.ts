/**
 * @export
 * @interface SpinalNodeInfoModel
 * @extends {spinal.Model}
 */
export interface SpinalNodeInfoModel extends spinal.Model {
    id: spinal.Str;
    name: spinal.Str;
    type: spinal.Str;
    directModificationDate: spinal.Val;
    indirectModificationDate: spinal.Val;
}
