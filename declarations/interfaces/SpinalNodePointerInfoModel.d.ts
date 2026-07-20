import type { Model, Str } from 'spinal-core-connectorjs';
/**
 * @interface SpinalNodePointerInfoModel
 * @extends {Model}
 */
export interface SpinalNodePointerInfoModel extends Model {
    pointedId?: Str;
    pointedType?: Str;
}
