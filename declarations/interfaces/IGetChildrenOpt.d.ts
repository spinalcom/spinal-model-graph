import type { SpinalContext } from '../Nodes/SpinalContext';
export interface IGetChildrenGenOpt {
    /**
     * The number of children to skip before starting to collect the result set.
     * @default 0
     * @type {number}
     * @memberof IGetChildrenGenOpt
     */
    offset: number;
    /**
     * Whether to return the children in reverse order.
     * @default false
     * @type {boolean}
     * @memberof IGetChildrenGenOpt
     */
    reverse: boolean;
    /**
     * if set, the function will return only the children that belong to the specified context.
     * @type {SpinalContext}
     * @memberof IGetChildrenGenOpt
     */
    context?: SpinalContext;
}
export interface IGetChildrenOpt extends IGetChildrenGenOpt {
    /**
     * The number of children to return in the result set. 0 means no limit.
     * @default 0
     * @type {number}
     * @memberof IGetChildrenOpt
     */
    maxNbrChildren: number;
}
