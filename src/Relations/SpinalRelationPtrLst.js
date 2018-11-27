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
import {SPINAL_RELATION_PTR_LST_TYPE} from "./SpinalRelationFactory";
import SpinalNode from "../Nodes/SpinalNode";
import {promiseLoad} from "../Utilities";
import SpinalNodePointer from "../SpinalNodePointer";
import spinalCore from "spinal-core-connectorjs";

const globalType = typeof window === "undefined" ? global : window;

class SpinalRelationPtrLst extends BaseSpinalRelation {
  /**
   * Constructor for the SpinalRelationPtrLst class.
   * @param {String} name Name of the relation
   */
  constructor(name) {
    super(name);
    this.add_attr({
      children: new SpinalNodePointer(new globalType.Lst())
    });

    this.children.info.add_attr("ids", new globalType.Lst());
  }

  /**
   * Retrieves all the ids of the children of the relation and return them inside an array.
   * @return {Array<String>} Array containing all the children ids of the relation
   */
  getChildrenIds() {
    const idLst = this.children.info.ids;
    let ids = [];

    for (let i = 0; i < idLst.length; i++) {
      ids.push(idLst[i].get());
    }
    return ids;
  }

  /**
   * Return all the children of the relation.
   * @return {Promise<Array<SpinalNode>>} The children of the relation
   */
  async getChildren() {
    const childrenLst = await promiseLoad(this.children);
    let children = [];

    for (let i = 0; i < childrenLst.length; i++) {
      children.push(childrenLst[i]);
    }
    return children;
  }

  /**
   * Return all the children of the relation associated to a certain context.
   * @param {SpinalContext} context Context to use for the search
   * @return {Promise<Array<SpinalNode>>} The children associated to the context
   */
  async getChildrenInContext(context) {
    const childrenLst = await promiseLoad(this.children);
    let children = [];

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
   * @return {Number} Type of the relation
   */
  getType() {
    return SPINAL_RELATION_PTR_LST_TYPE;
  }

  /**
   * Adds a child to the relation.
   * @param {SpinalNode | Model} node Node or model to add
   * @return {Promise<SpinalNode>} Promise containing the node that was added
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

    this.children.info.ids.push(node.getId());
    node._addParent(this);
    await promiseLoad(this.children).then((children) => {
      children.push(node);
    });
    return node;
  }

  /**
   * Removes a child from the relation.
   * @param {SpinalNode} node Child to remove
   * @return {Promise<nothing>} An empty promise
   */
  async removeChild(node) {
    const childrenLst = await promiseLoad(this.children);

    childrenLst.remove(node);
    this.children.info.ids.remove(node.getId());
    node._removeParent(this);
  }
}

spinalCore.register_models([SpinalRelationPtrLst]);
export default SpinalRelationPtrLst;
