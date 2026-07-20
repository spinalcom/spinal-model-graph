import { Model, Ptr, Str } from 'spinal-core-connectorjs';
import type { SpinalNodePointerInfoModel } from './interfaces/SpinalNodePointerInfoModel';
/**
 * Wrapper over SpinalNodePointer containing some information about the pointed element
 * @class SpinalNodePointer
 * @extends {Model}
 * @template T extends Model
 */
declare class SpinalNodePointer<T extends Model = any> extends Model {
    ptr: Ptr<T>;
    info: SpinalNodePointerInfoModel;
    /**
     * Constructor for the SpinalNodePointer class.
     * @param {T} element Element to wich the SpinalNodePointer will point
     * @param blockRights determine if the pointer is a pbr
     */
    constructor(element: T, blockRights?: boolean);
    /**
     * Sets pointer to point to an element.
     * @param {T} element Element to point to
     * @throws {TypeError} If the element is not a Model
     */
    setElement(element: T): void;
    /**
     * Loads the model to which the pointer is pointing.
     * @returns {Promise<T>} The model to which the pointer is pointing
     */
    load(): Promise<T>;
    /**
     * Unsets the pointer. The pointer shouldn't be used after that.
     */
    unset(): void;
    /**
     * Returns the id of the pointed element.
     * @returns {Str}  Id of the pointed element
     */
    getId(): Str;
    /**
     * This function returns the type of the pointed element.
     * @returns {Str} Type of the pointed element
     */
    getType(): Str;
}
export default SpinalNodePointer;
export { SpinalNodePointer };
