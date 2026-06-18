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
  type Val,
} from 'spinal-core-connectorjs';
import { SpinalContext } from '../Nodes/SpinalContext';
import { SpinalNode } from '../Nodes/SpinalNode';
import { SpinalNodePointer } from '../SpinalNodePointer';
import { BaseSpinalRelation } from './BaseSpinalRelation';
import {
  LST_PTR_LST_SIZE,
  SPINAL_RELATION_LST_PTR_LST_TYPE,
} from '../constants';
import { debounce } from '../Utilities';

/**
 * Relation where the children are in Lst of Ptr of Lst.
 * @extends BaseSpinalRelation
 * @property {Str} name
 * @property {Str} id
 * @property {SpinalNodePointer<SpinalNode<any>>} parent
 * @property {SpinalMap<Val>} contextIds
 * @property {Lst<SpinalNodePointer<Lst<SpinalNode<any>>>>} children
 */
class SpinalRelationLstPtrLst extends BaseSpinalRelation {
  public _constructorName = 'SpinalRelationLstPtrLst';
  public static _constructorName = 'SpinalRelationLstPtrLst';
  lastRestructure!: Val;
  children!: Lst<SpinalNodePointer<Lst<SpinalNode<any>>>>;

  private debouncedRestructureChildren = debounce(
    () => this.restructureChildren(),
    5000
  );

  /**
   * Constructor for the SpinalRelationLstPtrLst class.
   * @param {SpinalNode<any>} parent Parent of the relation
   * @param {string} name Name of the relation
   * @throws {TypeError} If the parent is not a node
   * @throws {TypeError} If the name is not a string
   * @memberof SpinalRelationLstPtrLst
   */
  constructor(parent?: SpinalNode<any>, name?: string) {
    super(parent, name);
    if (FileSystem._sig_server === false) return;

    this.add_attr({
      children: new Lst(),
      lastRestructure: Date.now(),
    });
  }

  /**
   * Retrieves all the ids of the children of the relation and return them inside an array.
   * @returns {string[]} Array containing all the children ids of the relation
   * @memberof SpinalRelationLstPtrLst
   */
  getChildrenIds(): string[] {
    const res: string[] = [];

    for (let ptrLst of this.children) {
      const ids: string[] | undefined = ptrLst.info.ids?.get();
      if (ids) {
        res.push(...ids);
      }
    }
    return res;
  }

  /**
   * returns the number of children of the relation.
   * @returns {number}
   * @memberof SpinalRelationLstPtrLst
   */
  getNbChildren(): number {
    let counter = 0;
    for (let ptrLst of this.children) {
      const ids: string[] | undefined = ptrLst.info.ids?.get();
      if (ids) {
        counter += ids.length;
      }
    }
    return counter;
  }

  /**
   * Checks if the relation has a child with a certain id.
   * @param {string} id Id to check
   * @returns {boolean} True if the relation has a child with the given id, false otherwise
   * @memberof SpinalRelationLstPtrLst
   */
  hasId(id: string): boolean {
    for (let lstPtr of this.children) {
      const ids: string[] | undefined = lstPtr.info.ids?.get();
      if (ids && ids.includes(id)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Generator that yields all the children of the relation one by one.
   * @return {*}  {AsyncGenerator<SpinalNode<any>, void, unknown>}
   * @memberof SpinalRelationLstPtrLst
   */
  async *getChildrenGen(): AsyncGenerator<SpinalNode<any>, void, unknown> {
    for (let ptrLst of this.children) {
      const lst: Lst<SpinalNode<any>> = await ptrLst.load();
      for (let node of lst) {
        yield node;
      }
    }
  }

  /**
   * Return all the children of the relation associated to a certain context.
   * @returns {Promise<SpinalNode<any>[]>} The children of the relation
   * @throws {TypeError} If the context is not a SpinalContext
   * @memberof SpinalRelationLstPtrLst
   */
  async *getChildrenInContextGen(
    context: SpinalContext<any>
  ): AsyncGenerator<SpinalNode<any>, void, unknown> {
    if (!(context instanceof SpinalContext)) {
      return Promise.reject(TypeError('context must be a SpinalContext'));
    }
    for (let ptrLst of this.children) {
      const lst: Lst<SpinalNode<any>> = await ptrLst.load();
      for (let node of lst) {
        if (node.belongsToContext(context)) {
          yield node;
        }
      }
    }
  }

  /**
   * Returns the type of the relation.
   * @returns {string} Type of the relation
   * @memberof SpinalRelationLstPtrLst
   */
  getType(): string {
    return SPINAL_RELATION_LST_PTR_LST_TYPE;
  }

  /**
   * Adds a child to the relation.
   * @template T extends Model = Node Element Type
   * @param {(T|SpinalNode<T>)} node Node or model to add
   * @throws {TypeError} If the node is not a Model
   * @throws {Error} If the node is already a child of the relation
   * @returns {Promise<SpinalNode<T>>} Promise containing the node that was added
   * @memberof SpinalRelationLstPtrLst
   */
  async addChild<T extends Model>(
    node: T | SpinalNode<T>
  ): Promise<SpinalNode<T>> {
    let nodeCreate: T | SpinalNode<T> = node;
    if (!(node instanceof Model)) {
      throw new Error(
        'Cannot add a child witch is not an instance of SpinalNode or Model.'
      );
    } else if (!(node instanceof SpinalNode)) {
      nodeCreate = new SpinalNode(undefined, undefined, node);
    }

    if (this.hasId(nodeCreate.info?.id?.get())) {
      throw new Error('Cannot add a child twice to the same relation.');
    }
    const tmpNodeCreate: SpinalNode<T> = <SpinalNode<T>>nodeCreate;
    tmpNodeCreate._addParent(this);
    // get the last lstPtr or create a new one if the last one is full
    let ptrLst: SpinalNodePointer<Lst<SpinalNode<any>>>;
    let lst: Lst<SpinalNode<any>>;
    if (this.children.length === 0) {
      lst = new Lst();
      ptrLst = new SpinalNodePointer(lst);
      ptrLst.info.add_attr('ids', new Lst());
      this.children.push(ptrLst);
      ptrLst.info.ids?.push(tmpNodeCreate.info.id.get());
    } else {
      ptrLst = this.children[this.children.length - 1];
      if (ptrLst.info.ids && ptrLst.info.ids.length >= LST_PTR_LST_SIZE) {
        lst = new Lst();
        ptrLst = new SpinalNodePointer(lst);
        ptrLst.info.add_attr('ids', new Lst());
        this.children.push(ptrLst);
        ptrLst.info.ids?.push(tmpNodeCreate.info.id.get());
      } else {
        ptrLst.info.ids?.push(tmpNodeCreate.info.id.get());
        lst = await ptrLst.load();
      }
    }
    // ptrLst.info.ids?.push(tmpNodeCreate.info.id.get());
    lst.push(tmpNodeCreate);
    this.debouncedRestructureChildren();
    return tmpNodeCreate;
  }

  /**
   * Removes a child from the relation.
   * @param {SpinalNode<any>} node Child to remove
   * @returns {Promise<void>} An empty promise
   * @throws {Error} If the given node is not a child
   * @memberof SpinalRelationLstPtrLst
   */
  async removeChild(node: SpinalNode<any>): Promise<void> {
    let found: boolean = false;
    for (let i: number = 0; i < this.children.length; i += 1) {
      const ptrLst: SpinalNodePointer<Lst<SpinalNode<any>>> = this.children[i];
      const ids: string[] | undefined = ptrLst.info.ids?.get();
      if (ids && ids.includes(node.info.id.get())) {
        found = true;
        ptrLst.info.ids.remove(node.info.id.get());
        const lst = await ptrLst.load();
        lst.remove(node);
        if (lst.length === 0) {
          this.children.remove(ptrLst);
        }
        break;
      }
    }

    if (!found) {
      return Promise.reject(Error('The node is not a child'));
    }

    node._removeParent(this);
    this.debouncedRestructureChildren();
    return Promise.resolve();
  }

  async restructureChildren(force = false) {
    function set_or_push(lst: Lst, index: number, value: any) {
      if (index < lst.length) {
        lst[index] = value;
      } else {
        lst.push(value);
      }
    }

    const timeout = this.lastRestructure.get() + 20 * 24 * 60 * 60 * 1000; // 20 days
    if (timeout < Date.now() || force === true) {
      const startTime = Date.now();
      // restructure the children
      // 1 - get all the children in a single array
      const allChildren = await this.getChildren();

      const ptrLstToRemove: SpinalNodePointer<Lst<SpinalNode<any>>>[] = [];
      // 2 - restructure the children in Lst of Ptr of Lst
      for (let i = 0; i < this.children.length; i += 1) {
        const normalizedChildren = allChildren.slice(
          i * LST_PTR_LST_SIZE,
          (i + 1) * LST_PTR_LST_SIZE
        );
        const ptrLst: SpinalNodePointer<Lst<SpinalNode<any>>> =
          this.children[i];
        if (normalizedChildren.length === 0) {
          ptrLstToRemove.push(ptrLst);
          continue;
        }

        const lst = await ptrLst.load();
        for (let j = 0; j < normalizedChildren.length; j += 1) {
          const child = normalizedChildren[j];
          if (ptrLst.info.ids?.[j]?.get() !== child.info.id.get()) {
            set_or_push(ptrLst.info.ids, j, child.info.id.get());
            set_or_push(lst, j, child);
          }
        }
        lst.trim(normalizedChildren.length);
        ptrLst.info.ids?.trim(normalizedChildren.length);
      }

      // 3 - remove all empty ptrLst
      for (const ptrLst of ptrLstToRemove) {
        this.children.remove(ptrLst);
      }
      this.lastRestructure.set(startTime);
    }
  }
}

spinalCore.register_models(SpinalRelationLstPtrLst, 'SpinalRelationLstPtrLst');
export default SpinalRelationLstPtrLst;
export { SpinalRelationLstPtrLst };
