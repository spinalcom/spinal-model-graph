import { Model } from 'spinal-core-connectorjs_type';
interface SpinalNodePointerInfoModel extends spinal.Model {
    pointedId?: spinal.Str;
    pointedType?: spinal.Str;
}
/**
 * Wrapper over SpinalNodePointer containing some information about the pointed element
 * @class SpinalNodePointer
 * @extends {Model}
 * @template T extends spinal.Model
 */
declare class SpinalNodePointer<T extends spinal.Model> extends Model {
    ptr: spinal.Ptr<T>;
    info: SpinalNodePointerInfoModel;
    /**
     * Constructor for the SpinalNodePointer class.
     * @param {T} element Element to wich the SpinalNodePointer will point
     * @param blockRights determine if the pointer is a pbr
     * @memberof SpinalNodePointer
     */
    constructor(element: T, blockRights?: boolean);
    /**
     * Sets pointer to point to an element.
     * @param {T} element Element to point to
     * @throws {TypeError} If the element is not a Model
     * @memberof SpinalNodePointer
     */
    setElement(element: T): void;
    /**
     * Loads the model to which the pointer is pointing.
     * @returns {Promise<T>} The model to which the pointer is pointing
     * @memberof SpinalNodePointer
     */
    load(): Promise<T>;
    /**
     * Unsets the pointer. The pointer shouldn't be used after that.
     * @memberof SpinalNodePointer
     */
    unset(): void;
    /**
     * Returns the id of the pointed element.
     * @returns {spinal.Str}  Id of the pointed element
     * @memberof SpinalNodePointer
     */
    getId(): spinal.Str;
    /**
     * This function returns the type of the pointed element.
     * @returns {spinal.Str} Type of the pointed element
     * @memberof SpinalNodePointer
     */
    getType(): spinal.Str;
}
export default SpinalNodePointer;
export { SpinalNodePointer };
