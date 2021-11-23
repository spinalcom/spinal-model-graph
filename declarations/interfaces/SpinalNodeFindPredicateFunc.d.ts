import type { SpinalNode } from '../Nodes/SpinalNode';
/**
 * A function that takes a node and returns a boolean.
 * @callback SpinalNodeFindPredicateFunc
 * @param {SpinalNode<any>} node
 * @param {SpinalNode<any>} [stopCallback]
 * @returns {boolean}
 */
export declare type SpinalNodeFindPredicateFunc = (node: SpinalNode<any>, stopCallback?: () => void) => boolean;
