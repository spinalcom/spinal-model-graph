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
  Model,
  Lst
} from "spinal-core-connectorjs_type";

import BaseSpinalRelation from "./BaseSpinalRelation";
import {
  SPINAL_RELATION_LST_PTR_TYPE
} from "./SpinalRelationFactory";
import {
  SpinalNode,
  SpinalContext
} from "../index";
import SpinalNodePointer from "../SpinalNodePointer";

/**
 * Relation where the children are in Lst of Ptr.
 * @extends BaseSpinalRelation
 */
class SpinalRelationLstPtr extends BaseSpinalRelation {
  /**
   * Constructor for the SpinalRelationLstPtr class.
   * @param {SpinalNode} parent Parent of the relation
   * @param {String} name Name of the relation
   * @throws {TypeError} If the parent is not a node
   * @throws {TypeError} If the name is not a string
   */
  constructor(parent, name) {
    super(parent, name);

    this.add_attr({
      children: new Lst()
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
    const promises = [];

    for (let i = 0; i < this.children.length; i++) {
      let ptr = this.children[i];
      promises.push(ptr.load());
    }

    return Promise.all(promises);
  }

  /**
   * Return all the children of the relation associated to a certain context.
   * @returns {Promise<Array<SpinalNode>>} The children of the relation
   * @throws {TypeError} If the context is not a SpinalContext
   */
  async getChildrenInContext(context) {
    const promises = [];
    let children;

    if (!(context instanceof SpinalContext)) {
      return Promise.reject(TypeError("context must be a SpinalContext"));
    }

    for (let i = 0; i < this.children.length; i++) {
      let ptr = this.children[i];

      promises.push(ptr.load());
    }

    children = await Promise.all(promises);
    return children.filter(child => child.belongsToContext(context));
  }

  /**
   * Returns the type of the relation.
   * @returns {Number} Type of the relation
   */
  getType() {
    return SPINAL_RELATION_LST_PTR_TYPE;
  }

  /**
   * Adds a child to the relation.
   * @param {SpinalNode | Model} node Node or model to add
   * @returns {Promise<SpinalNode>} Promise containing the node that was added
   * @throws {TypeError} If the node is not a Model
   * @throws {Error} If the node is already a child of the relation
   */
  async addChild(node) {
    if (!(node instanceof Model)) {
      throw new Error(
        "Cannot add a child witch is not an instance of SpinalNode or Model."
      );
    } else if (!(node instanceof SpinalNode)) {
      node = new SpinalNode(undefined, undefined, node);
    }

    if (this.getChildrenIds().includes(node.getId().get())) {
      throw new Error("Cannot add a child twice to the same relation.");
    }

    node._addParent(this);
    this.children.push(new SpinalNodePointer(node));
    return node;
  }

  /**
   * Removes a child from the relation.
   * @param {SpinalNode} node Child to remove
   * @returns {Promise<nothing>} An empty promise
   * @throws {Error} If the given node is not a child
   */
  removeChild(node) {
    let found = false;

    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].getId() === node.getId()) {
        this.children.splice(i, 1);
        found = true;
        break;
      }
    }

    if (!found) {
      return Promise.reject(Error("The node is not a child"));
    }

    node._removeParent(this);
    return Promise.resolve();
  }
}

spinalCore.register_models([SpinalRelationLstPtr]);
export default SpinalRelationLstPtr;
