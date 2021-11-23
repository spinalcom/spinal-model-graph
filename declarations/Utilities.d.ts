import type SpinalNode from "../src/Nodes/SpinalNode";
import type { AnySpinalRelation } from "./interfaces/AnySpinalRelation";
import type { SpinalNodePointer } from "./SpinalNodePointer";
/**
 * Creates a unique id based on a name.
 * @param {string} name Name from wich the id is generated
 * @returns {string} Generated id
 */
declare function guid(): string;
declare function loadParentRelation<T extends spinal.Model>(spinalNodePointer: SpinalNodePointer<AnySpinalRelation>): Promise<SpinalNode<T>>;
export { guid, loadParentRelation };
