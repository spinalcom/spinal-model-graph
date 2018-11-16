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
import {
  SpinalNode,
} from "../index";

const DEFAULT_PREDICATE = () => true;

/**
 * Finds all the nodes under the starting node for which the predicate is true.
 * @param {SpinalNode} startingNode The node from which the traversal starts
 * @param {function} predicate Function returning true if the node needs to be returned
 * @param {Array<String>} relationNames Array containing the relation names to follow
 * @return {Promise<Array<SpinalNode>>} The nodes that were found
 */
async function findInGraph(startingNode, predicate = DEFAULT_PREDICATE, relationNames) {
  if (typeof startingNode === "undefined") {
    throw Error("You must give a starting node");
  } else if (!(startingNode instanceof SpinalNode)) {
    throw new Error("The starting node must be a SpinalNode");
  } else if (typeof predicate !== "function") {
    throw new Error("predicate must be a function");
  }

  let seen = new Set([startingNode]);
  let children = [];
  let current = startingNode;
  let found = [];

  while (current) {
    let newChildren = await current.getChildren(relationNames);

    for (let newChild of newChildren) {
      if (!seen.has(newChild)) {
        children.push(newChild);
        seen.add(newChild);
      }
    }

    current = children.shift();

    if (current && predicate(current)) {
      found.push(current);
    }
  }

  return found;
}

export {
  findInGraph
};