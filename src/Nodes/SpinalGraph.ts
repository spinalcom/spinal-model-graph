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
import { SpinalNode } from './SpinalNode';
import { FileSystem, Lst, spinalCore } from 'spinal-core-connectorjs_type';
import {
  SPINAL_RELATION_TYPE,
} from '..';
import {
  guid,
} from '../Utilities';
import { SpinalContext } from './SpinalContext';

const HAS_CONTEXT_RELATION_NAME = 'hasContext';

/**
 * Starting node of a graph.
 * @extends SpinalNode
 */
class SpinalGraph<T extends spinal.Model> extends SpinalNode<T> {
  /**
   * Constructor for the SpinalGraph class.
   * @param {String} [name="undefined"] Name of the graph, usually unused
   * @param {String} [type="SpinalGraph"] Type of the graph, usually unused
   * @param {SpinalNode | Model} [element] Element of the graph
   * @throws {TypeError} If the element is not a Model
   */
  constructor(name: string = 'undefined', type: string = 'SpinalGraph', element?: T) {
    super(name, type, element);
    if (FileSystem._sig_server === false) return;

    this.info.id.set(guid(this.constructor.name));
    this.info.add_attr({ graph_types: new Lst() });
  }

  /**
   * Adds a context to the graph.
   * @param {SpinalContext} context Context to be added
   * @returns {Promise<SpinalContext>} The added context
   * @throws {TypeError} If the context is not a context
   */
  async addContext<K extends spinal.Model>(context: SpinalContext<K>): Promise<SpinalContext<K>> {
    if (!(context instanceof SpinalContext)) {
      throw new TypeError('context must be a context');
    }

    return this.addChild(context, HAS_CONTEXT_RELATION_NAME, SPINAL_RELATION_TYPE);
  }

  /**
   * Searches for a context using its name.
   * @param {String} name Name of the context
   * @returns {SpinalContext | undefined} The wanted context or undefined
   * @throws {TypeError} If name is not a string
   */
  async getContext(name) {
    if (typeof name !== 'string') {
      throw TypeError('name must be string');
    }

    const children = await this.getChildren([HAS_CONTEXT_RELATION_NAME]);
    return children.find(child => child.info.name.get() === name);
  }

  /**
   * Empty override of the SpinalNode method.
   * @override
   * @returns {Promise<nothing>} An empty promise
   */
  async removeFromGraph() {

  }

  addTypeToGraph(type: String) {
    if (typeof this.info.graph_types === "undefined") this.info.add_attr({ graph_types: new Lst() });

    if (this.info.graph_types && this.info.graph_types.indexOf(type) !== -1)
      this.info.graph_types.push(type);

  }

  getGraphTypes() {
    return this.info.graph_types;
  }

}

spinalCore.register_models([SpinalGraph]);
export default SpinalGraph;
export { SpinalGraph };
