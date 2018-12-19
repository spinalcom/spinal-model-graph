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
  SPINAL_RELATION_PTR_LST_TYPE
} from "./SpinalRelationFactory";
import {
  SpinalNode,
  SpinalContext
} from "../index";
import SpinalNodePointer from "../SpinalNodePointer";

class SpinalRelationPtrLst extends BaseSpinalRelation {
  /**
   * Constructor for the SpinalRelationPtrLst class.
   * @param {SpinalNode} parent Parent of the relation
   * @param {String} name Name of the relation
   * @throws {TypeError} If the parent is not a node
   * @throws {TypeError} If the name is not a string
   */
  constructor(parent, name) {
    super(parent, name);

    this.add_attr({
      children: new SpinalNodePointer(new Lst())
    });

    this.children.info.add_attr("ids", new Lst());
  }

  /**
   * Retrieves all the ids of the children of the relation and return them inside an array.
   * @returns {Array<String>} Array containing all the children ids of the relation
   */
  getChildrenIds() {
    const idLst = this.children.info.ids;
    const ids = [];

    for (let i = 0; i < idLst.length; i++) {
      ids.push(idLst[i].get());
    }

    return ids;
  }

  /**
   * Return all the children of the relation.
   * @returns {Promise<Array<SpinalNode>>} The children of the relation
   */
  async getChildren() {
    const childrenLst = await this.children.load();
    const children = [];

    for (let i = 0; i < childrenLst.length; i++) {
      children.push(childrenLst[i]);
    }

    return children;
  }

  /**
   * Return all the children of the relation associated to a certain context.
   * @param {SpinalContext} context Context to use for the search
   * @returns {Promise<Array<SpinalNode>>} The children associated to the context
   * @throws {TypeError} If the context is not a SpinalContext
   */
  async getChildrenInContext(context) {
    const childrenLst = await this.children.load();
    const children = [];

    if (!(context instanceof SpinalContext)) {
      throw TypeError("context must be a SpinalContext");
    }

    for (let i = 0; i < childrenLst.length; i++) {
      let child = childrenLst[i];

      if (child.belongsToContext(context)) {
        children.push(child);
      }
    }

    return children;
  }

  /**
   * Returns the type of the relation.
   * @returns {Number} Type of the relation
   */
  getType() {
    return SPINAL_RELATION_PTR_LST_TYPE;
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

    this.children.info.ids.push(node.getId());
    node._addParent(this);

    await this.children.load().then((children) => {
      children.push(node);
    });

    return node;
  }

  /**
   * Removes a child from the relation.
   * @param {SpinalNode} node Child to remove
   * @returns {Promise<nothing>} An empty promise
   * @throws {Error} If the given node is not a child
   */
  async removeChild(node) {
    const childrenLst = await this.children.load();

    if (!childrenLst.contains(node)) {
      throw Error("The node is not a child");
    }

    childrenLst.remove(node);
    this.children.info.ids.remove(node.getId());
    node._removeParent(this);
  }

  /**
   * Removes children from the relation.
   * @param {Array<SpinalNode>} nodes Childs to remove
   * @returns {Promise<nothing>} An empty promise
   * @throws {Error} If one of the nodes is not a child
   */
  async removeChildren(nodes) {
    const childrenLst = await this.children.load();
    let error = false;

    if (nodes === undefined || nodes.length === 0) {
      childrenLst.clear();
      this.children.info.ids.clear();
      return;
    }

    for (let node of nodes) {
      let index = childrenLst.indexOf(node);

      if (index !== -1) {
        childrenLst.remove(node);
        this.children.info.ids.remove(node.getId());
        node._removeParent(this);
      } else {
        error = true;
      }
    }

    if (error) {
      throw Error("Could not remove all nodes");
    }
  }
}

spinalCore.register_models([SpinalRelationPtrLst]);
export default SpinalRelationPtrLst;
