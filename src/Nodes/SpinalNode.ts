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

import {
  guid,
} from '../Utilities';

import {
  SpinalContext,
} from '../index';
import { SpinalRelationRef, SpinalRelationLstPtr, SpinalRelationPtrLst } from '..';

import { SpinalNodePointer } from '../SpinalNodePointer';
import {
  RELATION_TYPE_LIST,
  SpinalRelationFactory,
} from '../Relations/SpinalRelationFactory';
import { SpinalMap } from '../SpinalMap';
import { SpinalSet } from '../SpinalSet';


/**
 * A function that takes a node and returns a boolean.
 * @callback SpinalNodeFindPredicateFunc
 * @param {SpinalNode<any>} node
 * @returns {boolean}
 */
type SpinalNodeFindPredicateFunc = (node: SpinalNode<any>) => boolean;
type SpinalNodeForEachFunc = (node: SpinalNode<any>) => void;
type SpinalNodeMapFunc = (node: SpinalNode<any>) => any;
type AnySpinalRelation = SpinalRelationRef | SpinalRelationLstPtr| SpinalRelationPtrLst;

const DEFAULT_PREDICATE: SpinalNodeFindPredicateFunc = () => true;

interface SpinalNodeInfoModel extends spinal.Model {
  id: spinal.Str;
  name: spinal.Str;
  type: spinal.Str;
}

/**
 * Node of a graph.
 * @extends Model
 * @template T extends spinal.Model = ElementType
 */
class SpinalNode<T extends spinal.Model> extends Model {
  info: SpinalNodeInfoModel;
  parents: SpinalMap<spinal.Lst<SpinalNodePointer<AnySpinalRelation>>>;
  children: SpinalMap<SpinalMap<AnySpinalRelation>>;
  element: SpinalNodePointer<T>;
  contextIds: SpinalSet;
  /**
   * Constructor for the SpinalNode class.
   * @param {string} [name="undefined"] Name of the node
   * @param {string} [type="undefined"] Type of the node
   * @param {spinal.Model} [element] Element of the node
   * @throws {TypeError} If the element is not a Model
   */
  constructor(name: string = 'undefined', type: string = 'SpinalNode', element?: T) {
    super();
    if (FileSystem._sig_server === false) return;

    this.add_attr({
      info: {
        name,
        type,
        id: guid(this.constructor.name),
      },
      parents: new SpinalMap(),
      children: new SpinalMap(),
      element: element !== undefined ? new SpinalNodePointer(element) : undefined,
      contextIds: new SpinalSet(),
    });
  }

  /**
   * Returns the id.
   * @returns {spinal.Str} Id of the node
   */
  getId(): spinal.Str {
    return this.info.id;
  }

  /**
   * Returns the name.
   * @returns {spinal.Str} Name of the node
   */
  getName(): spinal.Str {
    return this.info.name;
  }

  /**
   * Returns the type.
   * @returns {spinal.Str} Type of the node
   */
  getType(): spinal.Str {
    return this.info.type;
  }

  /**
   * Returns the element.
   * @returns {Promise<T>} A promise where the parameter of the resolve method is the element
   */
  getElement(): Promise<T> {
    if (this.element === undefined) {
      this.element = <SpinalNodePointer<T>>(new SpinalNodePointer(new Model()));
    }

    return this.element.load();
  }

  /**
   * Returns all the children ids in an array.
   * @returns {string[]} Ids of the children
   */
  getChildrenIds(): string[] {
    const nodeChildrenIds = [];

    for (const [, relationMap] of this.children) {
      for (const [, relation] of relationMap) {
        const relChildrenIds: string[] = relation.getChildrenIds();

        for (let i: number = 0; i < relChildrenIds.length; i += 1) {
          nodeChildrenIds.push(relChildrenIds[i]);
        }
      }
    }
    return nodeChildrenIds;
  }

  /**
   * Computes and returns the number of children of the node.
   * @returns {number} The number of children
   */
  getNbChildren(): number {
    let count: number = 0;
    for (const [, relationMap] of this.children) {
      for (const [, relation] of relationMap) {
        count += relation.getNbChildren();
      }
    }

    return count;
  }

  /**
   * Adds an id to the context ids of the node.
   * @param {string} id Id of the context
   * @throws {TypeError} If the id is not a string
   */
  addContextId(id: string): void {
    if (typeof id !== 'string') {
      throw TypeError('id must be a string');
    }

    if (!this.contextIds.has(id)) {
      this.contextIds.add(id);
    }
  }

  /**
   * Returns a list of the contexts the node is associated to.
   * @returns {string[]} An array of ids of the associated contexts
   */
  getContextIds(): string[] {
    return this.contextIds.values();
  }

  /**
   * Returns true if the node belongs to the context.
   * @param {SpinalContext} context The context that might own the node
   * @returns {boolean} A boolean
   * @throws {TypeError} If context is not a SpinalContext
   */
  belongsToContext(context: SpinalContext<any>): boolean {
    if (!(context instanceof SpinalContext)) {
      throw TypeError('context must be a SpinalContext');
    }

    return this.contextIds.has(context.getId().get());
  }

  /**
   * Verify if the node contains the relation name.
   * @param {string} relationName Name of the relation
   * @param {string} relationType Type of the relation
   * @returns {boolean} Return true is the relation is contained in the node and false otherwise.
   * @throws {TypeError} If the relation name is not a string
   * @throws {Error} If the relation type doesn't exist
   */
  hasRelation(relationName: string, relationType: string): boolean {
    if (typeof relationName !== 'string') {
      throw TypeError('the relation name must be a string');
    }

    if (RELATION_TYPE_LIST.indexOf(relationType) === -1) {
      throw Error('invalid relation type');
    }

    const typeMap = this._getChildrenType(relationType);

    if (typeof typeMap === 'undefined') {
      return false;
    }

    return typeMap.has(relationName);
  }

  /**
   * Verify if the node contains all the relation names.
   * @param {string[]} relationNames Array containing all the relation name
   * @param {string} relationType Type of the relations
   * @returns {boolean} Return true if the node contains
   * all the relations in relationNames,false otherwise.
   * @throws {TypeError} If the relation names are not in an array
   * @throws {TypeError} If one of the relation names is not a string
   * @throws {Error} If the relation type doesn't exist
   */
  hasRelations(relationNames: string[], relationType: string): boolean {
    if (!Array.isArray(relationNames)) {
      throw TypeError('The relation names must be in an array');
    }

    if (RELATION_TYPE_LIST.indexOf(relationType) === -1) {
      throw Error('invalid relation type');
    }

    for (const relationName of relationNames) {
      if (!this.hasRelation(relationName, relationType)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Returns all the relation names of the node.
   * @returns {string[]} The names of the relations of the node
   */
  getRelationNames(): string[] {
    const names: string[] = [];

    for (const [, relationMap] of this.children) {
      names.push(...relationMap.keys());
    }

    // Removes all duplicates
    return Array.from(new Set(names));
  }

  /**
   * Add the node as child of the relation.
   * @param {T|SpinalNode<T>} child Element to add as child
   * @param {string} relationName Name of the relation
   * @param {string} relationType Type of the relation
   * @returns {Promise<SpinalNode>} The child node in a promise
   * @throws {TypeError} If the child is not a model
   * @throws {TypeError} If the relation name is not a string
   * @throws {Error} If the relation type is invalid
   */
  async addChild<K extends spinal.Model>(
    child: K|SpinalNode<K>, relationName: string,
    relationType: string): Promise<SpinalNode<K>> {
    let relation : AnySpinalRelation;
    if (!(child instanceof Model)) {
      throw TypeError(
        'Cannot add a child witch is not an instance of SpinalNode or Model.',
      );
    }
    if (!this.hasRelation(relationName, relationType)) {
      relation = this._createRelation(relationName, relationType);
    } else {
      relation = this._getRelation(relationName, relationType);
    }

    return relation.addChild(child);
  }

  /**
   * Adds a child and notices the context if a new relation was created.
   * @param {SpinalNode | Model} child Node to add as child
   * @param {string} relationName Name of the relation
   * @param {string} relationType Type of the relation
   * @param {SpinalContext} context Context to update
   * @returns {Promise<SpinalNode>} The child node in a promise
   * @throws {TypeError} If the child is not a model
   * @throws {TypeError} If the relation name is not a string
   * @throws {TypeError} If the context is not a SpinalContext
   * @throws {Error} If the relation type is invalid
   */
  async addChildInContext<K extends spinal.Model>(
      child: K|SpinalNode<K>, relationName: string,
      relationType: string, context: SpinalContext<any>): Promise<SpinalNode<K>> {
    let relation : AnySpinalRelation;
    let childCreate: K|SpinalNode<K> = child;

    if (!(context instanceof SpinalContext)) {
      throw TypeError('context must be a SpinaContext');
    }

    if (!(child instanceof Model)) {
      throw TypeError(
        'Cannot add a child witch is not an instance of SpinalNode or Model.',
      );
    } else if (!(child instanceof SpinalNode)) {
      childCreate = new SpinalNode(undefined, undefined, child);
    }
    const tmpchildCreate: SpinalNode<K> = <SpinalNode<K>>childCreate;

    if (!this.hasRelation(relationName, relationType)) {
      relation = this._createRelation(relationName, relationType);
    } else {
      relation = this._getRelation(relationName, relationType);
    }

    tmpchildCreate.addContextId(context.getId().get());
    relation.addContextId(context.getId().get());

    await relation.addChild(tmpchildCreate);
    return tmpchildCreate;
  }

  /**
   * Removes the node from the relation children.
   * @param {SpinalNode} node Node to remove
   * @param {string} relationName Name of the relation to wich the node belongs
   * @param {string} relationType Type of the relation to wich the node belongs
   * @returns {Promise<void>} An empty promise
   * @throws {TypeError} If relation name is not a string
   * @throws {Error} If relation type is invalid
   * @throws {Error} If relation doesn't exist
   * @throws {Error} If the child doesn't exist
   */
  removeChild(node: SpinalNode<any>, relationName: string, relationType: string): Promise<void> {
    if (!this.hasRelation(relationName, relationType)) {
      throw Error("The relation doesn't exist");
    }

    const rel = this._getRelation(relationName, relationType);
    return rel.removeChild(node);
  }

  /**
   * Removes children in the given relation.
   * @param {SpinalNode[]} nodes Nodes to delete
   * @param {string} relationName Name of the relation
   * @param {string} relationType Type of the relation
   * @returns {Promise<void>} An empty promise
   * @throws {TypeError} If nodes is not an array
   * @throws {TypeError} If an element of nodes is not a SpinalNode
   * @throws {TypeError} If relation name is not a string
   * @throws {Error} If relation type is invalid
   * @throws {Error} If the relation doesn't exist
   * @throws {Error} If one of the nodes is not a child
   */
  removeChildren(nodes: SpinalNode< any>[], relationName: string,
                 relationType: string): Promise <void> {
    if (!Array.isArray(nodes)) {
      throw TypeError('nodes must be an array');
    }

    if (!this.hasRelation(relationName, relationType)) {
      throw Error("The relation doesn't exist");
    }

    const rel = this._getRelation(relationName, relationType);
    return rel.removeChildren(nodes);
  }

  /**
   * Removes a child relation of the node.
   * @param {string} relationName Name of the relation to remove
   * @param {string} relationType Type of the relation to remove
   * @returns {Promise<void>} An empty promise
   * @throws {TypeError} If the relationName is not a string
   * @throws {Error} If the relationType is invalid
   * @throws {Error} If the relation doesn't exist
   */
  removeRelation(relationName: string , relationType: string): Promise<void> {
    if (!this.hasRelation(relationName, relationType)) {
      throw Error("The relation doesn't exist");
    }

    const rel = this._getRelation(relationName, relationType);
    return rel.removeFromGraph();
  }

  /**
   * Remove the node from the graph
   * i.e remove the node from all the parent relations and remove all the children relations.
   * This operation might delete all the sub-graph under this node.
   * After this operation the node can be deleted without fear.
   * @returns {Promise<void>} An empty promise
   */
  async removeFromGraph(): Promise<void> {
    await Promise.all([
      this._removeFromParents(),
      this._removeFromChildren(),
    ]);
  }

  /**
   * Returns the first child in the given relation for which the predicate is true.
   * @param {SpinalNodeFindPredicateFunc} predicate
   * Functions that takes a node and returns a boolean
   * @param {string} relationName Name of the relation
   * @param {string} relationType Type of the relation
   * @returns {Promise<SpinalNode<any>>}
   * The first child for which the predicate is true or undefined
   * @throws {TypeError} If predicate is not a function
   * @throws {TypeError} If relation name is not a string
   * @throws {Error} If relation type is invalid
   * @throws {Error} If relation doesn't exist
   */
  async getChild(predicate: SpinalNodeFindPredicateFunc,
                 relationName: string, relationType: string): Promise<SpinalNode<any>> {
    if (typeof predicate !== 'function') {
      throw TypeError('the predicate must be a function');
    }

    if (!this.hasRelation(relationName, relationType)) {
      throw Error("The relation doesn't exist");
    }

    const relation = this._getRelation(relationName, relationType);
    const children = await relation.getChildren();

    for (const child of children) {
      if (predicate(child)) {
        return child;
      }
    }
  }

  /**
   * Returns the children of the node for the relation names.
   * @param {string[]} [relationNames=[]]
   * Array containing the relation names of the desired children
   * @returns {Promise<SpinalNode[]>} The children that were found
   * @throws {TypeError} If relationNames is neither an array, a string or omitted
   * @throws {TypeError} If an element of relationNames is not a string
   */
  async getChildren(relationNames: string|string[] = []): Promise<SpinalNode<any>[]> {
    let relName: string|string[] = relationNames;
    if (Array.isArray(relationNames)) {
      if (relationNames.length === 0) {
        relName = this.getRelationNames();
      }
    } else if (typeof relationNames === 'string') {
      relName = [relationNames];
    } else {
      throw TypeError('relationNames must be an array, a string or omitted');
    }

    const promises: Promise<SpinalNode<any>[]>[] = [];
    const tmpRelName: string[] = <string[]>relName;
    for (const [, relationMap] of this.children) {
      for (let j: number = 0; j < tmpRelName.length; j += 1) {
        if (relationMap.has(tmpRelName[j])) {
          const relation = relationMap.getElement(tmpRelName[j]);
          promises.push(relation.getChildren());
        }
      }
    }

    const childrenLst = await Promise.all(promises);
    const res: SpinalNode<any>[] = [];

    let children: SpinalNode<any>[];
    for (children of childrenLst) {
      for (let i = 0; i < children.length; i += 1) {
        res.push(children[i]);
      }
    }

    return res;
  }

  /**
   * Return the children of the node that are registered in the context
   * @param {SpinalContext} context Context to use for the search
   * @returns {Promise<SpinalNode[]>} The children that were found
   * @throws {TypeError} If the context is not a SpinalContext
   */
  async getChildrenInContext(context: SpinalContext<any>): Promise<SpinalNode<any>[]> {
    if (!(context instanceof SpinalContext)) {
      throw TypeError('context must be a SpinalContext');
    }

    const promises: Promise<SpinalNode<any>[]>[] = [];

    for (const [, relationMap] of this.children) {
      for (const [, relation] of relationMap) {
        if (relation.belongsToContext(context)) {
          promises.push(relation.getChildrenInContext(context));
        }
      }
    }

    const childrenLst: (SpinalNode<spinal.Model>[])[] = await Promise.all(promises);
    const res: SpinalNode<any>[] = [];

    for (const children of childrenLst) {
      for (let i = 0; i < children.length; i += 1) {
        res.push(children[i]);
      }
    }

    return res;
  }

  /**
   * Return all parents for the relation names no matter the type of relation
   * @param {String[]} [relationNames=[]] Array containing the relation names of the desired parents
   * @returns {Promise<Array<SpinalNode<any>>>} Promise containing the parents that were found
   * @throws {TypeError} If the relationNames are neither an array, a string or omitted
   * @throws {TypeError} If an element of relationNames is not a string
   */
  getParents(relationNames: string|string[] = []): Promise<SpinalNode<any>[]> {
    let relNames: string|string[] = relationNames;
    if (Array.isArray(relationNames)) {
      if (relationNames.length === 0) {
        relNames = this.parents.keys();
      }
    } else if (typeof relationNames === 'string') {
      relNames = [relationNames];
    } else {
      throw TypeError('relationNames must be an array, a string or omitted');
    }
    const promises:Promise<SpinalNode<any>>[] = [];
    const tmpRelNames = <string[]>relNames;
    for (const name of tmpRelNames) {
      const list: spinal.Lst<SpinalNodePointer<AnySpinalRelation>> = this.parents.getElement(name);
      if (list === undefined) continue;

      for (let i: number = 0; i < list.length; i += 1) {
        promises.push(
          list[i].load().then(
            (relation: AnySpinalRelation) => {
              return relation.getParent();
            },
          ),
        );
      }
    }

    return Promise.all(promises);
  }

  /**
   * Recursively finds all the children nodes for which the predicate is true.
   * @param {string|string[]} relationNames Array containing the relation names to follow
   * @param {SpinalNodeFindPredicateFunc} predicate
   * Function returning true if the node needs to be returned
   * @returns {Promise<Array<SpinalNode<any>>>} The nodes that were found
   * @throws {TypeError} If the relationNames are neither an array, a string or omitted
   * @throws {TypeError} If an element of relationNames is not a string
   * @throws {TypeError} If the predicate is not a function
   */
  async find(relationNames: string|string[],
             predicate: SpinalNodeFindPredicateFunc = DEFAULT_PREDICATE)
             : Promise<SpinalNode<any>[]> {
    if (
      ! Array.isArray(relationNames) &&
      relationNames !== undefined &&
      typeof relationNames !== 'string'
    ) {
      throw TypeError('relationNames must be an array, a string or omitted');
    }

    if (typeof predicate !== 'function') {
      throw TypeError('predicate must be a function');
    }

    const seen: Set<SpinalNode<any>> = new Set([this]);
    let promises: Promise<SpinalNode<any>[]>[] = [];
    let nextGen: SpinalNode<any>[] = [this];
    let currentGen: SpinalNode<any>[] = [];
    const found: SpinalNode<any>[] = [];

    while (nextGen.length) {
      currentGen = nextGen;
      promises = [];
      nextGen = [];

      for (const node of currentGen) {
        promises.push(node.getChildren(relationNames));

        if (predicate(node)) {
          found.push(node);
        }
      }

      const childrenArrays: SpinalNode<any>[][] = await Promise.all(promises);

      for (const children of childrenArrays) {
        for (const child of children) {
          if (!seen.has(child)) {
            nextGen.push(child);
            seen.add(child);
          }
        }
      }
    }

    return found;
  }

  /**
   * Recursively finds all the children nodes in the context for which the predicate is true..
   * @param {SpinalContext} context Context to use for the search
   * @param {findPredicate} predicate Function returning true if the node needs to be returned
   * @returns {Promise<Array<SpinalNode>>} The nodes that were found
   * @throws {TypeError} If context is not a SpinalContext
   * @throws {TypeError} If the predicate is not a function
   */
  async findInContext(context: SpinalContext<any>,
                      predicate: SpinalNodeFindPredicateFunc = DEFAULT_PREDICATE,
                      ): Promise<SpinalNode<any>[]> {
    if (typeof predicate !== 'function') {
      throw new Error('The predicate function must be a function');
    }

    const seen: Set<SpinalNode<any>> = new Set([this]);
    let promises: Promise<SpinalNode<any>[]>[] = [];
    let nextGen: SpinalNode<any>[] = [this];
    let currentGen: SpinalNode<any>[] = [];
    const found: SpinalNode<any>[] = [];

    while (nextGen.length) {
      currentGen = nextGen;
      promises = [];
      nextGen = [];

      for (const node of currentGen) {
        promises.push(node.getChildrenInContext(context));

        if (predicate(node)) {
          found.push(node);
        }
      }

      const childrenArrays: SpinalNode<any>[][] = await Promise.all(promises);

      for (const children of childrenArrays) {
        for (const child of children) {
          if (!seen.has(child)) {
            nextGen.push(child);
            seen.add(child);
          }
        }
      }
    }

    return found;
  }

  /**
   * Recursively applies a function to all the children nodes.
   * @param {string|string[]} relationNames Array containing the relation names to follow
   * @param {SpinalNodeForEachFunc<SpinalNode<any>>} callback Function to apply to the nodes
   * @throws {TypeError} If the relationNames are neither an array, a string or omitted
   * @throws {TypeError} If an element of relationNames is not a string
   * @throws {TypeError} If the callback is not a function
   */
  async forEach(relationNames: string|string[], callback: SpinalNodeForEachFunc): Promise<void> {
    if (typeof callback !== 'function') {
      throw TypeError('callback must be a function');
    }

    const nodes = await this.find(relationNames);

    for (const node of nodes) {
      callback(node);
    }
  }

  /**
   * Recursively applies a function to all the children nodes in the context.
   * @param {SpinalContext} context Context to use for the search
   * @param {forEachCallback} callback Function to apply to the nodes
   * @throws {TypeError} If context is not a SpinalContext
   * @throws {TypeError} If the callback is not a function
   */
  async forEachInContext(context: SpinalContext<any>,
                         callback: SpinalNodeForEachFunc): Promise<void> {
    if (typeof callback !== 'function') {
      throw TypeError('callback must be a function');
    }

    const nodes: SpinalNode<any>[] = await this.findInContext(context);

    for (const node of nodes) {
      callback(node);
    }
  }

  /**
   * Recursively applies a function to all the children nodes and returns the results in an array.
   * @param {string|string[]} relationNames Array containing the relation names to follow
   * @param {SpinalNodeMapFunc} callback Function to apply to the nodes
   * @returns {Promise<any[]>} The results of the callback for each node
   * @throws {TypeError} If the relationNames are neither an array, a string or omitted
   * @throws {TypeError} If an element of relationNames is not a string
   * @throws {TypeError} If the callback is not a function
   */
  async map(relationNames: string|string[], callback: SpinalNodeMapFunc): Promise<any[]> {
    if (typeof callback !== 'function') {
      throw TypeError('The callback function must be a function');
    }

    const nodes = await this.find(relationNames);
    const results = [];

    for (const node of nodes) {
      results.push(callback(node));
    }

    return results;
  }

  /**
   * Recursively applies a function to all the children nodes in the context
   * and returns the results in an array.
   * @param {SpinalContext} context Context to use for the search
   * @param {function} callback Function to apply to the nodes
   * @returns {Promise<Array<*>>} The results of the callback for each node
   * @throws {TypeError} If context is not a SpinalContext
   * @throws {TypeError} If the callback is not a function
   */
  async mapInContext(context: SpinalContext<any>, callback: SpinalNodeMapFunc): Promise<any[]> {
    if (typeof callback !== 'function') {
      throw TypeError('The callback function must be a function');
    }

    const nodes: SpinalNode<any>[] = await this.findInContext(context);
    const results: any[] = [];

    for (const node of nodes) {
      results.push(callback(node));
    }

    return results;
  }

  /**
   * Return the relation list corresponding to the relation type.
   * @param {string} relationType Type of the relation
   * @returns {SpinalMap} Return the relation list corresponding to the relation type
   * @private
   */
  _getChildrenType(relationType: string): SpinalMap<AnySpinalRelation> {
    return this.children.getElement(relationType);
  }

  /**
   * Return the relation corresponding.
   * @param {string} relationName Name of the relation
   * @param {string} relationType Type of the relation
   * @returns {SpinalRelation} The relation corresponding
   * @protected
   */
  _getRelation(relationName: string, relationType: string): AnySpinalRelation {
    return this._getChildrenType(relationType).getElement(relationName);
  }

  /**
   * Removes a parent relation of the node.
   * @param {AnySpinalRelation} relation Relation to remove
   * @protected
   */
  _removeParent(relation: AnySpinalRelation): void {
    const parentLst: spinal.Lst<SpinalNodePointer<AnySpinalRelation>>
      = this.parents.getElement(relation.getName().get());
    if (parentLst === undefined) return;

    for (let i: number = 0; i < parentLst.length; i += 1) {
      if (parentLst[i].getId().get() === relation.getId().get()) {
        parentLst.splice(i);
        break;
      }
    }
  }

  /**
   * Removes the node from all parent relation the property parents.
   * @protected
   */
  async _removeFromParents(): Promise<void> {
    const promises: Promise<void>[] = [];

    for (const [, parent] of this.parents) {
      for (let i = 0; i < parent.length; i += 1) {
        parent[i].load().then((parentRel: AnySpinalRelation) => {
          promises.push(parentRel.removeChild(this));
        });
      }
    }

    await Promise.all(promises);
  }

  /**
   * Adds the relation as parent of the node.
   * @param {AnySpinalRelation} relation Parent relation
   * @protected
   */
  _addParent(relation: AnySpinalRelation): void {
    const relationName = relation.getName().get();

    if (this.parents.has(relationName)) {
      this.parents
        .getElement(relationName)
        .push(new SpinalNodePointer(relation));
    } else {
      const list = new Lst();
      list.push(new SpinalNodePointer(relation));
      this.parents.setElement(relationName, list);
    }
  }

  /**
   * Create a new relation for this node.
   * @param {string} relationName Name of the relation
   * @param {string} relationType Type of the relation
   * @protected
   */
  _createRelation(relationName: string, relationType: string): AnySpinalRelation {
    const relation = SpinalRelationFactory.getNewRelation(
      this,
      relationName,
      relationType,
    );

    if (!this.children.has(relationType)) {
      this.children.setElement(relationType, new SpinalMap());
    }

    this._getChildrenType(relationType).setElement(relationName, relation);
    return relation;
  }

  /**
   * Remove all children relation from the graph.
   * @returns {Promise<void>} An empty promise
   * @protected
   */
  async _removeFromChildren(): Promise<void> {
    const promises = [];

    for (const [, relationMap] of this.children) {
      for (const [, relation] of relationMap) {
        promises.push(relation.removeFromGraph());
      }
    }

    await Promise.all(promises);
  }
}

spinalCore.register_models([SpinalNode]);
export default SpinalNode;
export { SpinalNode };
