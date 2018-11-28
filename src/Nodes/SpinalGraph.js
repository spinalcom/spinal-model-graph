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
import SpinalNode from "./SpinalNode";
import spinalCore from "spinal-core-connectorjs";
import {SPINAL_RELATION_TYPE} from "../Relations/SpinalRelationFactory";
import {guid} from "../Utilities";
import SpinalContext from "./SpinalContext";

const globalType = typeof window === "undefined" ? global : window;
const HAS_CONTEXT_RELATION_NAME = "hasContext";

class SpinalGraph extends SpinalNode {
  /**
   * Constructor for the SpinalGraph class.
   * @param {String} name Name of the graph, usually unused
   * @param {String} type Type of the graph, usually unused
   * @param {SpinalNode | Model} element Element of the graph, usually unused
   */
  constructor(name = "undefined", type = "SpinalGraph", element = new globalType
    .Model) {
    super(name, type, element);

    this._createRelation(HAS_CONTEXT_RELATION_NAME, SPINAL_RELATION_TYPE);
    this.info.id.set(guid(this.constructor.name));
  }

  /**
   * Adds a context to the graph.
   * @param {SpinalContext} context Context to be added
   * @return {Promise<nothing>} An empty promise
   */
  async addContext(context) {
    if (context instanceof SpinalContext) {
      return this.addChild(context, HAS_CONTEXT_RELATION_NAME,
        SPINAL_RELATION_TYPE);
    } else {
      throw new Error("Cannot add an element which is not a context");
    }
  }

  /**
   * Searches for a context using its name.
   * @param {String} name Name of the context
   * @return {SpinalContext | undefined} The wanted context or undefined
   */
  async getContext(name) {
    let children = await this.getChildren([HAS_CONTEXT_RELATION_NAME]);

    return children.find(child => child.info.name.get() === name);
  }

  /**
   * Empty override of the SpinalNode method.
   * @return {Promise<nothing>} An empty promise
   */
  async removeFromGraph() {

  }
}

spinalCore.register_models([SpinalGraph]);
export default SpinalGraph;
