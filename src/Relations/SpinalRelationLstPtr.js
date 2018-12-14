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
import {
  SPINAL_RELATION_LST_PTR_TYPE
} from "./SpinalRelationFactory";
import SpinalNode from "../Nodes/SpinalNode";
import SpinalNodePointer from "../SpinalNodePointer";
import spinalCore from "spinal-core-connectorjs";

const globalType = typeof window === "undefined" ? global : window;

class SpinalRelationLstPtr extends BaseSpinalRelation {
  /**
   * Constructor for the SpinalRelationLstPtr class.
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
   */
  async getChildrenInContext(context) {
    const promises = [];
    let children;

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
      return Promise.reject(Error("Invalid node"));
    }

    node._removeParent(this);
    return Promise.resolve();
  }
}

spinalCore.register_models([SpinalRelationLstPtr]);
export default SpinalRelationLstPtr;
