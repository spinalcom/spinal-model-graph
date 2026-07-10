/*
 * Copyright 2026 SpinalCom - www.spinalcom.com
 *
 * This file is part of SpinalCore.
 *
 * Please read all of the following terms and conditions
 * of the Software license Agreement ("Agreement")
 * carefully.
 *
 * This Agreement is a legally binding contract between
 * the Licensee (as defined below) and SpinalCom that
 * sets forth the terms and conditions that govern your
 * use of the Program. By installing and/or using the
 * Program, you agree to abide by all the terms and
 * conditions stated or referenced herein.
 *
 * If you do not agree to abide by these terms and
 * conditions, do not demonstrate your acceptance and do
 * not install or use the Program.
 * You should have received a copy of the license along
 * with this file. If not, see
 * <http://resources.spinalcom.com/licenses.pdf>.
 */

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
