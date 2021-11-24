/*
 * Copyright 2018 SpinalCom - www.spinalcom.com
 *
 * This file is part of SpinalCore.
 *
 * Please read all of the following terms and conditions
 * of the Free Software license Agreement ("Agreement")
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

import type { } from 'spinal-core-connectorjs_type';
import type SpinalNode from "../src/Nodes/SpinalNode";
import type { AnySpinalRelation } from "./interfaces/AnySpinalRelation";
import type { SpinalNodePointer } from "./SpinalNodePointer";

/**
 * Generates a random number and returns in a string.
 * @returns {String} Random number in a string
 */
function s4(): string {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

/**
 * Creates a unique id based on a name.
 * @param {string} name Name from wich the id is generated
 * @returns {string} Generated id
 */
export function guid(): string {
  return `${s4()}-${s4()}-${s4()}-${Date.now().toString(16)}`;
}

export async function loadParentRelation<T extends spinal.Model>(spinalNodePointer: SpinalNodePointer<AnySpinalRelation>)
  : Promise<SpinalNode<T>> {
  try {
    const relation = await spinalNodePointer.load();
    try {
      return relation.getParent();
    } catch (e) {
      relation.removeFromGraph()
      return undefined;
    }
  } catch (e) {
    return undefined;
  }
}

type Consumedfunction<T> = () => Promise<T>;
export async function consumeBatch<T>(
  promises: (Consumedfunction<T>)[],
  batchSize = 10
): Promise<T[]> {
  let index = 0;
  const result = [];
  while (index < promises.length) {
    let endIndex = index + batchSize;
    if (promises.length <= endIndex) endIndex = promises.length;
    const slice = promises.slice(index, endIndex);
    const resProm = await Promise.all(slice.map((e: Consumedfunction<T>): Promise<T> => e()));
    result.push(...resProm);
    index = endIndex;
  }
  return result;
}
