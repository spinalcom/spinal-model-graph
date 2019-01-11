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
// tslint:disable:function-name

import {
  FileSystem,
  spinalCore,
  Model,
  Val,
} from 'spinal-core-connectorjs_type';

import {
  guid,
} from '../Utilities';

import {
  SpinalNode,
  SpinalContext,
} from '../index';
import { SpinalNodePointer } from '../SpinalNodePointer';
import { SpinalMap } from '../SpinalMap';

/**
 * Base for all relation in a SpinalGraph.
 * @extends Model
 * @abstract
 * @property {spinal.Str} name
 * @property {spinal.Str} id
 * @property {SpinalNodePointer<SpinalNode>} parent
 * @property {SpinalMap<spinal.Val>} contextIds
 */
class BaseSpinalRelation extends Model {
  name: spinal.Str;
  id: spinal.Str;
  parent: SpinalNodePointer<SpinalNode<any>>;
  contextIds: SpinalMap<spinal.Val>;

  /**
   * Constructor for the BaseSpinalRelation class.
   * @param {SpinalNode<spinal.Model>} parent Parent of the relation
   * @param {string} name Name of the relation
   * @throws {TypeError} If the parent is not a node
   * @throws {TypeError} If the name is not a string
   */
  constructor(parent?: SpinalNode<any>, name?: string) {
    super();

    if (FileSystem._sig_server === false) return;

    // instanceof doesn't work here
    if (!SpinalNode.prototype.isPrototypeOf(parent)) {
      throw TypeError('parent must be a node');
    }

    if (typeof name !== 'string') {
      throw TypeError('name must be a string');
    }

    this.add_attr({
      name,
      id: guid(name),
      parent: new SpinalNodePointer(parent),
      contextIds: new SpinalMap(),
    });
  }

  /**
   * Shortcut to id.
   * @returns {spinal.Str} Id of the relation
   * @memberof BaseSpinalRelation
   */
  getId(): spinal.Str {
    return this.id;
  }

  /**
   * Returns the name of the relation.
   * @returns {spinal.Str} Name of the relation
   * @memberof BaseSpinalRelation
   */
  getName(): spinal.Str {
    return this.name;
  }

  /**
   * Returns the parent of the relation.
   * @returns {Promise<SpinalNode<spinal.Model>>} Returns a promise where the resolve is the parent
   * @memberof BaseSpinalRelation
   */
  getParent(): Promise<SpinalNode<spinal.Model>> {
    return this.parent.load();
  }

  /**
   * Adds an id to the context ids of the relation.
   * @param {string} id Id of the context
   * @throws {TypeError} If the id is not a string
   * @memberof BaseSpinalRelation
   */
  addContextId(id: string): void {
    if (typeof id !== 'string') {
      throw TypeError('id must be a string');
    }

    if (!this.contextIds.has(id)) {
      this.contextIds.setElement(id, new Val(0));
    }
  }

  /**
   * Returns a list of the contexts the relation is associated to.
   * @returns {Array<string>} A list of ids of the associated contexts
   * @memberof BaseSpinalRelation
   */
  getContextIds(): string[] {
    return this.contextIds.keys();
  }

  /**
   * Returns true if the relation belongs to the context.
   * @param {SpinalContext<T>} context The context that might own the node
   * @returns {boolean} A boolean
   * @throws {TypeError} If the context is not a SpinalContext
   * @memberof BaseSpinalRelation
   */
  belongsToContext(context: SpinalContext<any>): boolean {
    if (!(context instanceof SpinalContext)) {
      throw TypeError('context must be a SpinalContext');
    }

    return this.contextIds.has(context.getId().get());
  }

  /**
   * Removes children from the relation.
   * @param {Array<SpinalNode<spinal.Model>>} [nodesToDelete=[]] Childs to remove
   * @returns {Promise<void>} An empty promise
   * @throws {TypeError} If nodes is not an array or omitted
   * @throws {Error} If one of the nodes is not a child
   * @memberof BaseSpinalRelation
   */
  async removeChildren(nodesToDelete: SpinalNode<any>[] = []): Promise<void> {
    let nodes: SpinalNode<any>[] = nodesToDelete;
    const promises: Promise<void>[] = [];

    if (!Array.isArray(nodes)) {
      throw TypeError('node must be an array');
    }

    if (nodes.length === 0) {
      nodes = await this.getChildren();
    }

    for (const node of nodes) {
      promises.push(this.removeChild(node));
    }

    try {
      await Promise.all(promises);
    } catch {
      throw Error('Could not remove all nodes');
    }
  }

  /**
   * Removes the relation from the graph.
   * @returns {Promise<void>} An empty promise
   * @memberof BaseSpinalRelation
   */
  async removeFromGraph(): Promise<void> {
    await Promise.all([
      this._removeFromParent(),
      this.removeChildren(),
    ]);
  }

  /**
   * Removes the relation from the parent.
   * @returns {Promise<void>} An empty promise
   * @private
   * @memberof BaseSpinalRelation
   */
  async _removeFromParent(): Promise<void> {
    const parent = await this.getParent();
    const relationMap = parent._getChildrenType(this.getType());

    relationMap.delete(this.getName().get());
    this.parent.unset();
  }
}

spinalCore.register_models([BaseSpinalRelation]);
export default BaseSpinalRelation;
export { BaseSpinalRelation };
