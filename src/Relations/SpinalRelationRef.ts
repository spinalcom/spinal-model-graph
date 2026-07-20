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

import { FileSystem, Lst, Model, spinalCore } from 'spinal-core-connectorjs';
import { SpinalNode } from '../Nodes/SpinalNode';
import { BaseSpinalRelation } from './BaseSpinalRelation';
import { SPINAL_RELATION_TYPE } from './SpinalRelationFactory';
import { SpinalContext } from '../Nodes/SpinalContext';

/**
 * Relation where the children are in a Lst.
 * @class SpinalRelationRef
 * @extends {BaseSpinalRelation}
 * @property {Str} name
 * @property {Str} id
 * @property {SpinalNodePointer<SpinalNode>} parent
 * @property {SpinalMap<Val>} contextIds
 * @property {Lst<SpinalNode>} children
 */
class SpinalRelationRef extends BaseSpinalRelation {
  public _constructorName = 'SpinalRelationRef';
  public static _constructorName = 'SpinalRelationRef';
  children!: Lst<SpinalNode<any>>;
  /**
   * Constructor for the SpinalRelationRef class.
   * @param {SpinalNode} parent Parent of the relation
   * @param {string} name Name of the relation
   * @throws {TypeError} If the parent is not a node
   * @throws {TypeError} If the name is not a string
   */
  constructor(parent?: SpinalNode<any>, name?: string) {
    super(parent, name);

    if (FileSystem._sig_server === false) return;

    this.add_attr({
      children: new Lst(),
    });
  }

  /**
   * Retrieves all the ids of the children of the relation and return them inside an array.
   * @returns {String[]} Array containing all the children ids of the relation
   */
  getChildrenIds(): string[] {
    const res: string[] = [];

    for (let i: number = 0; i < this.children.length; i += 1) {
      res.push(this.children[i].getId().get());
    }
    return res;
  }

  /**
   * returns the number of children of the relation.
   * @returns {number}
   */
  getNbChildren(): number {
    return this.children.length;
  }

  /**
   * Return all the children of the relation one by one, depending of the configuration.
   * @param {number} offset
   * @param {boolean} reverse
   * @param {SpinalContext} [context]
   * @param {number} [counter=0] Counter to keep track of the number of children already processed in other relations
   * @return {*}  {AsyncGenerator<SpinalNode<any>, void, unknown>}
   */
  async *getChildrenGen(
    offset: number,
    reverse: boolean,
    context?: SpinalContext,
    counter: number = 0
  ): AsyncGenerator<SpinalNode<any>, void, unknown> {
    if (!(context instanceof SpinalContext) && context !== undefined) {
      throw new TypeError('The context must be an instance of SpinalContext.');
    }
    const realOffset = Math.max(0, offset - counter);
    if (realOffset >= this.children.length) {
      return;
    }

    if (reverse) {
      let i: number = this.children.length - 1 - realOffset;
      for (; i >= 0; i -= 1) {
        const child: SpinalNode<any> = this.children[i];

        if (context && !child.belongsToContext(context)) {
          continue;
        }
        yield child;
      }
    } else {
      let i: number = realOffset;
      for (; i < this.children.length; i += 1) {
        const child: SpinalNode<any> = this.children[i];

        if (context && !child.belongsToContext(context)) {
          continue;
        }
        yield child;
      }
    }
  }

  /**
   * Returns the type of the relation.
   * @returns {string} Type of the relation
   */
  getType(): string {
    return SPINAL_RELATION_TYPE;
  }

  /**
   * Adds a child to the relation.
   * @template T extends Model = Node Element Type
   * @param {(T|SpinalNode<T>)} node Node or model to add
   * @throws {TypeError} If the node is not a Model
   * @throws {Error} If the node is already a child of the relation
   * @returns {Promise<SpinalNode<T>>} Promise containing the node that was added
   */
  async addChild<T extends Model>(
    node: T | SpinalNode<T>
  ): Promise<SpinalNode<T>> {
    let nodeCreate: T | SpinalNode<T> = node;
    if (!(node instanceof Model)) {
      throw new TypeError(
        'Cannot add a child witch is not an instance of SpinalNode or Model.'
      );
    } else if (!(node instanceof SpinalNode)) {
      nodeCreate = new SpinalNode(undefined, undefined, node);
    }
    const tmpNodeCreate: SpinalNode<T> = <SpinalNode<T>>nodeCreate;

    if (this.getChildrenIds().indexOf(tmpNodeCreate.getId().get()) !== -1) {
      throw new Error('Cannot add a child twice to the same relation.');
    }

    this.children.push(tmpNodeCreate);
    tmpNodeCreate._addParent(this);
    return tmpNodeCreate;
  }

  /**
   * Removes a child from the relation.
   * @param {SpinalNode} node Child to remove
   * @returns {Promise<void>} An empty promise
   * @throws {Error} If the given node is not a child
   */
  removeChild(node: SpinalNode<any>): Promise<void> {
    if (!this.children.contains(node)) {
      return Promise.reject(Error('The node is not a child'));
    }

    node._removeParent(this);
    this.children.remove(node);
    return Promise.resolve();
  }
}

spinalCore.register_models(SpinalRelationRef, 'SpinalRelationRef');
export default SpinalRelationRef;
export { SpinalRelationRef };
