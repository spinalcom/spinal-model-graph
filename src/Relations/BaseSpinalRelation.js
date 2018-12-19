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
  spinalCore,
  Model
} from "spinal-core-connectorjs_type";

import {
  guid
} from "../Utilities";

import {
  SpinalNode,
  SpinalContext
} from "../index";
import SpinalNodePointer from "../SpinalNodePointer";
import SpinalMap from "../SpinalMap";

/**
 * Base for all relation in a SpinalGraph.
 * @extends Model
 * @abstract
 */
class BaseSpinalRelation extends Model {
  /**
   * Constructor for the BaseSpinalRelation class.
   * @param {SpinalNode} parent Parent of the relation
   * @param {string} name Name of the relation
   * @throws {TypeError} If the parent is not a node
   * @throws {TypeError} If the name is not a string
   */
  constructor(parent, name) {
    super();

    // instanceof doesn't work here
    if (!SpinalNode.prototype.isPrototypeOf(parent)) {
      throw TypeError("parent must be a node");
    }

    if (typeof name !== "string") {
      throw TypeError("name must be a string");
    }

    this.add_attr({
      id: guid(name),
      name: name,
      parent: new SpinalNodePointer(parent),
      contextIds: new SpinalMap()
    });
  }

  /**
   * Shortcut to id.
   * @returns {Str} Id of the relation
   */
  getId() {
    return this.id;
  }

  /**
   * Returns the name of the relation.
   * @returns {Str} Name of the relation
   */
  getName() {
    return this.name;
  }

  /**
   * Returns the parent of the relation.
   * @returns {Promise<SpinalNode>} Returns a promise where the resolve is the parent
   */
  getParent() {
    return this.parent.load();
  }

  /**
   * Adds an id to the context ids of the relation.
   * @param {string} id Id of the context
   * @throws {TypeError} If the id is not a string
   */
  addContextId(id) {
    if (typeof id !== "string") {
      throw TypeError("id must be a string");
    }

    if (!this.contextIds.has(id)) {
      this.contextIds.setElement(id, 0);
    }
  }

  /**
   * Returns a list of the contexts the relation is associated to.
   * @returns {Array<string>} A list of ids of the associated contexts
   */
  getContextIds() {
    return this.contextIds.keys();
  }

  /**
   * Returns true if the relation belongs to the context.
   * @param {SpinalContext} context The context that might own the node
   * @returns {Boolean} A boolean
   * @throws {TypeError} If the context is not a SpinalContext
   */
  belongsToContext(context) {
    if (!(context instanceof SpinalContext)) {
      throw TypeError("context must be a SpinalContext");
    }

    return this.contextIds.has(context.getId().get());
  }

  /**
   * Removes children from the relation.
   * @param {Array<SpinalNode>} nodes Childs to remove
   * @returns {Promise<nothing>} An empty promise
   * @throws {Error} If one of the nodes is not a child
   */
  async removeChildren(nodes) {
    const promises = [];

    if (nodes === undefined || nodes.length === 0) {
      nodes = await this.getChildren();
    }

    for (let node of nodes) {
      promises.push(this.removeChild(node));
    }

    try {
      await Promise.all(promises);
    } catch {
      throw Error("Could not remove all nodes");
    }
  }

  /**
   * Removes the relation from the graph.
   * @returns {Promise<nothing>} An empty promise
   */
  async removeFromGraph() {
    await Promise.all([
      this._removeFromParent(),
      this.removeChildren()
    ]);
  }

  /**
   * Removes the relation from the parent.
   * @returns {Promise<nothing>} An empty promise
   * @private
   */
  async _removeFromParent() {
    const parent = await this.getParent();
    const relationMap = parent._getChildrenType(this.getType());

    relationMap.delete(this.getName().get());
    this.parent.unset();
  }
}

spinalCore.register_models([BaseSpinalRelation]);
export default BaseSpinalRelation;
