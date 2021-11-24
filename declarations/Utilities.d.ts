import type SpinalNode from "../src/Nodes/SpinalNode";
import type { AnySpinalRelation } from "./interfaces/AnySpinalRelation";
import type { SpinalNodePointer } from "./SpinalNodePointer";
/**
 * Creates a unique id based on a name.
 * @param {string} name Name from wich the id is generated
 * @returns {string} Generated id
 */
export declare function guid(): string;
export declare function loadParentRelation<T extends spinal.Model>(spinalNodePointer: SpinalNodePointer<AnySpinalRelation>): Promise<SpinalNode<T>>;
declare type Consumedfunction<T> = () => Promise<T>;
export declare function consumeBatch<T>(promises: (Consumedfunction<T>)[], batchSize?: number): Promise<T[]>;
export {};