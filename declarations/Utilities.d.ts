import type { Model } from 'spinal-core-connectorjs';
import type { AnySpinalRelation } from './interfaces/AnySpinalRelation';
import { SpinalContext } from './Nodes/SpinalContext';
import type SpinalNode from './Nodes/SpinalNode';
import type { SpinalNodePointer } from './SpinalNodePointer';
import type { IGetChildrenGenOpt } from './interfaces/IGetChildrenOpt';
export { debounce } from 'lodash';
/**
 * Creates a unique id based on a name.
 * @param {string} name Name from wich the id is generated
 * @returns {string} Generated id
 */
export declare function guid(): string;
export declare function loadParentRelation<T extends Model>(spinalNodePointer: SpinalNodePointer<AnySpinalRelation>, context?: SpinalContext<any>): Promise<SpinalNode<T> | undefined>;
type Consumedfunction<T> = () => Promise<T>;
export declare function consumeBatch<T>(promises: Consumedfunction<T>[], batchSize?: number): Promise<T[]>;
export declare function validateGetChildrenOptions(options: Partial<IGetChildrenGenOpt>): IGetChildrenGenOpt;
