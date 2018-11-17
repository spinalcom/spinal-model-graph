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
import { SpinalNode } from "../index";
import { find, findInContext } from "./find";

/**
 * Applies a function to all the nodes under the starting node.
 * @param {SpinalNode} startingNode The node from which the traversal starts
 * @param {Array<String>} relationNames Array containing the relation names to follow
 * @param {function} callback Function that takes a node
 */
async function forEach(startingNode, relationNames, callback) {
  if (typeof callback === "undefined") {
    throw Error("You must give a callback function");
  } else if (typeof callback !== "function") {
    throw new Error("The callback function must be a function");
  }

  let nodes = await find(startingNode, relationNames);

  for (let node of nodes) {
    callback(node);
  }
}

/**
 * Applies a function to all the nodes under the starting node.
 * @param {SpinalNode} startingNode The node from which the traversal starts
 * @param {SpinalContext} context Context to use for the search
 * @param {function} callback Function that takes a node
 */
async function forEachInContext(startingNode, context, callback) {
  if (typeof callback === "undefined") {
    throw Error("You must give a callback function");
  } else if (typeof callback !== "function") {
    throw new Error("The callback function must be a function");
  }

  let nodes = await findInContext(startingNode, context);

  for (let node of nodes) {
    callback(node);
  }
}

export {
  forEach,
  forEachInContext
};
