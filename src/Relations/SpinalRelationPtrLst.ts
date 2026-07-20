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

import {
  FileSystem,
  Lst,
  Model,
  spinalCore,
  Str,
} from 'spinal-core-connectorjs';
import type { SpinalRelationPtrLstNodePointer } from '../interfaces/SpinalRelationPtrLstNodePointer';
import { SpinalContext } from '../Nodes/SpinalContext';
import { SpinalNode } from '../Nodes/SpinalNode';
import { SpinalNodePointer } from '../SpinalNodePointer';
import { BaseSpinalRelation } from './BaseSpinalRelation';
import { SPINAL_RELATION_PTR_LST_TYPE } from './SpinalRelationFactory';
import type SpinalRelationLstPtrLst from './SpinalRelationLstPtrLst';

/**
 * Relation where the children are in Ptr to a Lst.
 * @class SpinalRelationPtrLst
 * @extends {BaseSpinalRelation}
 * @property {Str} name
 * @property {Str} id
 * @property {SpinalNodePointer<SpinalNode<any>>} parent
 * @property {SpinalMap<Val>} contextIds
 * @property {SpinalRelationPtrLstNodePointer} children
 */
class SpinalRelationPtrLst extends BaseSpinalRelation {
  public _constructorName = 'SpinalRelationPtrLst';
  public static _constructorName = 'SpinalRelationPtrLst';
  children!: SpinalRelationPtrLstNodePointer;
  isInUpgradeProcess?: Promise<SpinalRelationLstPtrLst>;

  /**
   * Constructor for the SpinalRelationPtrLst class.
   * @param {SpinalNode} [parent] Parent of the relation
   * @param {string} [name] Name of the relation
   * @throws {TypeError} If the parent is not a node
   * @throws {TypeError} If the name is not a string
   */
  constructor(parent?: SpinalNode<any>, name?: string) {
    super(parent, name);

    if (FileSystem._sig_server === false) return;

    this.add_attr({
      children: new SpinalNodePointer(new Lst()),
    });

    this.children.info.add_attr('ids', new Lst());
  }

  /**
   * Retrieves all the ids of the children of the relation and return them inside an array.
   * @returns {String[]} Array containing all the children ids of the relation
   */
  getChildrenIds(): string[] {
    const idLst: Lst<Str> = this.children.info.ids;
    const ids: string[] = [];

    for (let i: number = 0; i < idLst.length; i += 1) {
      ids.push(idLst[i].get());
    }

    return ids;
  }

  /**
   * returns the number of children of the relation.
   * @returns {number}
   */
  getNbChildren(): number {
    return this.children.info.ids.length;
  }

  /**
   * Return the children of the relation.
   * @param {number} offset
   * @param {boolean} reverse
   * @param {SpinalContext} [context]
   * @param {number} [counter=0]
   * @return {*}  {AsyncGenerator<SpinalNode<any>, void, unknown>}
   */
  async *getChildrenGen(
    offset: number,
    reverse: boolean,
    context?: SpinalContext,
    counter: number = 0
  ): AsyncGenerator<SpinalNode<any>, void, unknown> {
    if (context && !(context instanceof SpinalContext)) {
      throw new TypeError('context must be a SpinalContext');
    }
    const realOffset = Math.max(0, offset - counter);
    if (realOffset >= this.getNbChildren()) {
      return;
    }
    const childrenLst: Lst<SpinalNode<any>> = await this.children.load();

    if (reverse) {
      let i: number = childrenLst.length - 1 - realOffset;
      for (; i >= 0; i -= 1) {
        const child: SpinalNode<any> = childrenLst[i];

        if (context && !child.belongsToContext(context)) {
          continue;
        }
        yield child;
      }
    } else {
      let i: number = realOffset;
      for (; i < childrenLst.length; i += 1) {
        const child: SpinalNode<any> = childrenLst[i];

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
    return SPINAL_RELATION_PTR_LST_TYPE;
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
    let nodeCreate: SpinalNode<T> | Model = node;
    if (!(node instanceof Model)) {
      throw new Error(
        'Cannot add a child witch is not an instance of SpinalNode or Model.'
      );
    } else if (!(node instanceof SpinalNode)) {
      nodeCreate = new SpinalNode(undefined, undefined, node);
    }

    const tmpNodeCreate: SpinalNode<T> = <SpinalNode<T>>nodeCreate;
    if (this.getChildrenIds().indexOf(tmpNodeCreate.getId().get()) !== -1) {
      throw new Error('Cannot add a child twice to the same relation.');
    }
    this.children.info.ids.push(tmpNodeCreate.getId());
    const children = await this.children.load();
    tmpNodeCreate._addParent(this);
    children.push(tmpNodeCreate);

    return tmpNodeCreate;
  }

  /**
   * Removes a child from the relation.
   * @param {SpinalNode<any>} node Child to remove
   * @returns {Promise<void>} An empty promise
   * @throws {Error} If the given node is not a child
   */
  async removeChild(node: SpinalNode<any>): Promise<void> {
    const childrenLst: Lst<SpinalNode<any>> = await this.children.load();

    if (!childrenLst.contains(node)) {
      throw Error('The node is not a child');
    }

    childrenLst.remove(node);
    this.children.info.ids.remove(node.getId());
    node._removeParent(this);
  }

  /**
   * Removes children from the relation.
   * @override
   * @param {SpinalNode<any>[]} [nodes=[]] Childs to remove, if empty or missing all the children will be removed
   * @returns {Promise<void>} An empty promise
   * @throws {TypeError} If nodes is not an array or omitted
   * @throws {Error} If one of the nodes is not a child
   */
  async removeChildren(nodes: SpinalNode<any>[] = []): Promise<void> {
    if (!Array.isArray(nodes)) {
      throw new TypeError('node must be an array');
    }

    const childrenLst: Lst<SpinalNode<any>> = await this.children.load();

    if (nodes.length === 0) {
      for (let idx = 0; idx < childrenLst.length; idx++) {
        childrenLst[idx]._removeParent(this);
      }
      childrenLst.clear();
      this.children.info.ids.clear();
      return;
    }

    for (const node of nodes) {
      // const index: number = childrenLst.indexOf(node);
      childrenLst.remove(node);
      this.children.info.ids.remove(node.getId());
      node._removeParent(this);
    }
  }
}

spinalCore.register_models(SpinalRelationPtrLst, 'SpinalRelationPtrLst');
export default SpinalRelationPtrLst;

export { SpinalRelationPtrLst };
