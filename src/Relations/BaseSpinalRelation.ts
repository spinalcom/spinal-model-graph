/*
 * Copyright 2026 SpinalCom - www.spinalcom.com
 *
 * This file is part of SpinalCore.
 *
 * Please read all of the following terms and conditions
 * of the Software license Agreement ("Agreement")
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

import { FileSystem, Model, Str, Val } from 'spinal-core-connectorjs';
import { SpinalContext } from '../Nodes/SpinalContext';
import { SpinalNode } from '../Nodes/SpinalNode';
import { SpinalMap } from '../SpinalMap';
import { SpinalNodePointer } from '../SpinalNodePointer';
import { guid } from '../Utilities';

/**
 * Base for all relation in a SpinalGraph.
 * @abstract
 * @class BaseSpinalRelation
 * @abstract
 * @property {Str} name
 * @property {Str} id
 * @property {SpinalNodePointer<SpinalNode>} parent
 * @property {SpinalMap<Val>} contextIds
 * @extends {Model}
 */
abstract class BaseSpinalRelation extends Model {
  name!: Str;
  id!: Str;
  parent!: SpinalNodePointer<SpinalNode<any>>;
  contextIds!: SpinalMap<Val>;

  /**
   * Constructor for the BaseSpinalRelation class.
   * @param {SpinalNode<Model>} parent Parent of the relation
   * @param {string} name Name of the relation
   * @throws {TypeError} If the parent is not a node
   * @throws {TypeError} If the name is not a string
   */
  constructor(parent?: SpinalNode<any>, name?: string) {
    super();

    if (FileSystem._sig_server === false) return;

    // instanceof doesn't work here
    if (!SpinalNode.prototype.isPrototypeOf(parent!)) {
      throw new TypeError('parent must be a node');
    }

    if (typeof name !== 'string') {
      throw new TypeError('name must be a string');
    }

    this.add_attr({
      name,
      id: guid(),
      parent: new SpinalNodePointer(parent!, true),
      contextIds: new SpinalMap(),
    });
  }

  /**
   * Shortcut to id.
   * @returns {Str} Id of the relation
   */
  getId(): Str {
    return this.id;
  }

  /**
   * Returns the name of the relation.
   * @returns {Str} Name of the relation
   */
  getName(): Str {
    return this.name;
  }

  // /**
  //  * @returns {Promise<SpinalNode<Model>>} Returns a promise where the resolve is the parent
  //  */
  /**
   * Returns the parent of the relation.
   * @template T
   * @return {*}  {Promise<SpinalNode<T>>} Returns a promise where the resolve is the parent
   */
  getParent<T extends Model>(): Promise<SpinalNode<T>> {
    return this.parent.load();
  }

  /**
   * Adds an id to the context ids of the relation.
   * @param {string} id Id of the context
   * @throws {TypeError} If the id is not a string
   */
  addContextId(id: string): void {
    if (typeof id !== 'string') {
      throw new TypeError('id must be a string');
    }

    if (!this.contextIds.has(id)) {
      this.contextIds.setElement(id, new Val(0));
    }
  }

  /**
   * Returns a list of the contexts the relation is associated to.
   * @returns {Array<string>} A list of ids of the associated contexts
   */
  getContextIds(): string[] {
    return this.contextIds.keys();
  }

  /**
   * Returns true if the relation belongs to the context.
   * @param {SpinalContext<T>} context The context that might own the node
   * @returns {boolean} A boolean
   * @throws {TypeError} If the context is not a SpinalContext
   */
  belongsToContext(context: SpinalContext<any>): boolean {
    if (!(context instanceof SpinalContext)) {
      throw new TypeError('context must be a SpinalContext');
    }

    return this.contextIds.has(context.getId().get());
  }

  /**
   * Remove an id to the context ids of the relation.
   * @param {string} id Id of the context
   * @throws {TypeError} If the id is not a string
   */
  removeContextId(id: string): void {
    if (typeof id !== 'string') {
      throw new TypeError('id must be a string');
    }

    if (this.contextIds.has(id)) {
      this.contextIds.delete(id);
    }
  }

  /**
   * Removes children from the relation.
   * @param {Array<SpinalNode<Model>>} [nodesToDelete=[]] Childs to remove
   * @returns {Promise<void>} An empty promise
   * @throws {TypeError} If nodes is not an array or omitted
   * @throws {Error} If one of the nodes is not a child
   */
  async removeChildren(nodesToDelete: SpinalNode<any>[] = []): Promise<void> {
    let nodes: SpinalNode<any>[] = nodesToDelete;
    const promises: Promise<void>[] = [];

    if (!Array.isArray(nodes)) {
      throw new TypeError('node must be an array');
    }

    if (nodes.length === 0) {
      nodes = await this.getChildren(0, false);
    }
    for (const node of nodes) {
      promises.push(this.removeChild(node));
    }

    const res = await Promise.allSettled(promises);
    const rejected = res.filter((r) => r.status === 'rejected');
    if (rejected.length > 0) {
      throw Error('Could not remove all nodes');
    }
  }

  /**
   * Removes a child from the relation.
   * @abstract
   * @param {SpinalNode<any>} node Child to remove
   * @return {*}  {Promise<void>} An empty promise
   */
  abstract removeChild(node: SpinalNode<any>): Promise<void>;

  /**
   * Return all the children of the relation.
   * @return {*}  {Promise<SpinalNode<any>[]>} The children of the relation
   */
  async getChildren(
    offset: number,
    reverse: boolean,
    context?: SpinalContext,
    counter: number = 0
  ): Promise<SpinalNode<any>[]> {
    const results: SpinalNode<any>[] = [];
    const gen = this.getChildrenGen(offset, reverse, context, counter);

    for await (let node of gen) {
      results.push(node);
    }
    return results;
  }

  /**
   * Return an async generator that yields each children of the relation.
   * @abstract
   * @param {number} offset
   * @param {boolean} reverse
   * @param {SpinalContext} [context]
   * @param {number} [counter]
   * @return {*}  {AsyncGenerator<SpinalNode<any>, void, unknown>}
   */
  abstract getChildrenGen(
    offset: number,
    reverse: boolean,
    context?: SpinalContext,
    counter?: number
  ): AsyncGenerator<SpinalNode<any>, void, unknown>;

  /**
   * Returns the type of the relation.
   * @abstract
   * @return {*}  {string} Type of the relation
   */
  abstract getType(): string;

  /**
   * returns the number of children of the relation.
   * @abstract
   * @return {*}  {number}
   */
  abstract getNbChildren(): number;

  /**
   * Retrieves all the ids of the children of the relation and return them inside an array.
   * @abstract
   * @return {*}  {string[]} Array containing all the children ids of the relation
   */
  abstract getChildrenIds(): string[];

  /**
   * Removes the relation from the graph.
   * @returns {Promise<void>} An empty promise
   */
  async removeFromGraph(): Promise<void> {
    await Promise.all([this._removeFromParent(), this.removeChildren()]);
  }

  /**
   * Removes the relation from the parent.
   * @returns {Promise<void>} An empty promise
   * @private
   */
  async _removeFromParent(): Promise<void> {
    const parent = await this.getParent();
    const relationMap = parent._getChildrenType(this.getType());

    relationMap.delete(this.getName().get());
    this.parent.unset();
  }
}

export default BaseSpinalRelation;
export { BaseSpinalRelation };
