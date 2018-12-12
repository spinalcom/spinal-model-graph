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
import BaseSpinalRelation from "./BaseSpinalRelation";
import {SPINAL_RELATION_TYPE} from "./SpinalRelationFactory";
import SpinalNode from "../Nodes/SpinalNode";
import spinalCore from "spinal-core-connectorjs";

const globalType = typeof window === "undefined" ? global : window;

class SpinalRelationRef extends BaseSpinalRelation {
  /**
   * Constructor for the SpinalRelationRef class.
   * @param {String} name Name of the relation
   */
  constructor(name) {
    super(name);
    this.add_attr({
      children: new globalType.Lst()
    });
  }

  /**
   * Retrieves all the ids of the children of the relation and return them inside an array.
   * @returns {Array<String>} Array containing all the children ids of the relation
   */
  getChildrenIds() {
    const res = [];
    for (let i = 0; i < this.children.length; i++) {
      res.push(this.children[i].getId().get());
    }
    return res;
  }

  /**
   * Return all the children of the relation.
   * @returns {Promise<Array<SpinalNode>>} The children of the relation
   */
  getChildren() {
    let children = [];

    for (let i = 0; i < this.children.length; i++) {
      children.push(this.children[i]);
    }
    return Promise.resolve(children);
  }

  /**
   * Return all the children of the relation associated to a certain context.
   * @param {SpinalContext} context The context to use for the search
   * @returns {Promise<Array<SpinalNode>>} The children of the relation associated to the context
   */
  getChildrenInContext(context) {
    let children = [];

    for (let i = 0; i < this.children.length; i++) {
      let child = this.children[i];

      if (child.belongsToContext(context)) {
        children.push(child);
      }
    }
    return Promise.resolve(children);
  }

  /**
   * Returns the type of the relation.
   * @returns {Number} Type of the relation
   */
  getType() {
    return SPINAL_RELATION_TYPE;
  }

  /**
   * Adds a child to the relation.
   * @param {SpinalNode | Model} node Node or model to add
   * @returns {Promise<SpinalNode>} Promise containing the node that was added
   */
  async addChild(node) {
    if (!(node instanceof globalType.Model)) {
      throw new Error(
        "Cannot add a child witch is not an instance of SpinalNode or Model."
      );
    } else if (!(node instanceof SpinalNode)) {
      node = new SpinalNode(undefined, undefined, node);
    }
    if (this.getChildrenIds().includes(node.getId().get())) {
      throw new Error("Cannot add a child twice to the same relation.");
    }

    this.children.push(node);
    node._addParent(this);
    return node;
  }

  /**
   * Removes a child from the relation.
   * @param {SpinalNode} node Child to remove
   * @returns {Promise<nothing>} An empty promise
   */
  removeChild(node) {
    this.children.remove(node);
    node._removeParent(this);

    return Promise.resolve();
  }
}

spinalCore.register_models([SpinalRelationRef]);
export default SpinalRelationRef;
