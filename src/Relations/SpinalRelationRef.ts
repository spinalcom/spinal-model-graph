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
  FileSystem,
  spinalCore,
  Model,
  Lst,
} from 'spinal-core-connectorjs_type';

import { BaseSpinalRelation } from './BaseSpinalRelation';
import {
  SPINAL_RELATION_TYPE,
} from './SpinalRelationFactory';
import {
  SpinalNode,
  SpinalContext,
} from '../index';

type SpinalNodeAny = SpinalNode<any>;

/**
 * Relation where the children are in a Lst.
 * @class SpinalRelationRef
 * @extends {BaseSpinalRelation}
 * @property {spinal.Str} name
 * @property {spinal.Str} id
 * @property {SpinalNodePointer<SpinalNode>} parent
 * @property {SpinalMap<spinal.Val>} contextIds
 * @property {spinal.Lst<SpinalNode>} children
 */
class SpinalRelationRef extends BaseSpinalRelation {
  children: spinal.Lst<SpinalNodeAny>;
  /**
   * Constructor for the SpinalRelationRef class.
   * @param {SpinalNode} parent Parent of the relation
   * @param {string} name Name of the relation
   * @throws {TypeError} If the parent is not a node
   * @throws {TypeError} If the name is not a string
   * @memberof SpinalRelationRef
   */
  constructor(parent?: SpinalNodeAny, name?: string) {
    super(parent, name);

    if (FileSystem._sig_server === false) return;

    this.add_attr({
      children: new Lst(),
    });
  }

  /**
   * Retrieves all the ids of the children of the relation and return them inside an array.
   * @returns {String[]} Array containing all the children ids of the relation
   * @memberof SpinalRelationRef
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
   * @memberof SpinalRelationRef
   */
  getNbChildren(): number {
    return this.children.length;
  }

  /**
   * Return all the children of the relation.
   * @returns {Promise<Array<SpinalNodeAny>>} The children of the relation
   * @memberof SpinalRelationRef
   */
  getChildren(): Promise<SpinalNodeAny[]> {
    const children: SpinalNodeAny[] = [];

    for (let i: number = 0; i < this.children.length; i += 1) {
      children.push(this.children[i]);
    }
    return Promise.resolve(children);
  }

  /**
   * Return all the children of the relation associated to a certain context.
   * @param {SpinalContext} context The context to use for the search
   * @returns {Promise<SpinalNode[]>} The children of the relation associated to the context
   * @throws {TypeError} If the context is not a SpinalContext
   * @memberof SpinalRelationRef
   */
  getChildrenInContext(context: SpinalContext<any>): Promise<SpinalNodeAny[]> {
    const children: SpinalNodeAny[] = [];

    if (!(context instanceof SpinalContext)) {
      return Promise.reject(TypeError('context must be a SpinalContext'));
    }

    for (let i: number = 0; i < this.children.length; i += 1) {
      const child: SpinalNodeAny = this.children[i];

      if (child.belongsToContext(context)) {
        children.push(child);
      }
    }

    return Promise.resolve(children);
  }

  /**
   * Returns the type of the relation.
   * @returns {string} Type of the relation
   * @memberof SpinalRelationRef
   */
  getType(): string {
    return SPINAL_RELATION_TYPE;
  }

  /**
   * Adds a child to the relation.
   * @template T extends spinal.Model = Node Element Type
   * @param {(T|SpinalNode<T>)} node Node or model to add
   * @throws {TypeError} If the node is not a Model
   * @throws {Error} If the node is already a child of the relation
   * @returns {Promise<SpinalNode<T>>} Promise containing the node that was added
   * @memberof SpinalRelationRef
   */
  async addChild<T extends spinal.Model>(node: T|SpinalNode<T>): Promise<SpinalNode<T>> {
    let nodeCreate: T|SpinalNode<T> = node;
    if (!(node instanceof Model)) {
      throw new TypeError(
        'Cannot add a child witch is not an instance of SpinalNode or Model.',
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
   * @memberof SpinalRelationRef
   */
  removeChild(node: SpinalNodeAny): Promise<void> {
    if (!this.children.contains(node)) {
      return Promise.reject(Error('The node is not a child'));
    }

    node._removeParent(this);
    this.children.remove(node);
    return Promise.resolve();
  }
}

spinalCore.register_models([SpinalRelationRef]);
export default SpinalRelationRef;
export { SpinalRelationRef };
