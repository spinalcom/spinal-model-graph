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

async function findInGraph(startingNode, predicate, options = {}) {
  if (typeof startingNode === "undefined" || typeof predicate === "undefined") {
    throw Error("You must give a starting node and a predicate");
  } else if (!(startingNode instanceof SpinalNode)) {
    throw new Error("The starting node must be a SpinalNode");
  } else if (typeof predicate !== "function") {
    throw new Error("The predicate must be a function");
  }

  let seen = new Set();
  let children = [];
  let current = startingNode;
  let found = [];

  while (current) {
    let newChildren = await current.getChildren();

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
