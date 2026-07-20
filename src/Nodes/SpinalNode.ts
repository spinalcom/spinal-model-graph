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
  Val,
} from 'spinal-core-connectorjs';
import { spinalEventEmitter } from 'spinal-env-viewer-plugin-event-emitter';
import {
  ADD_CHILD_EVENT,
  ADD_CHILD_IN_CONTEXT_EVENT,
  REMOVE_CHILDREN_EVENT,
  REMOVE_CHILD_EVENT,
  SPINAL_RELATION_PTR_LST_TYPE,
} from '../constants';
import type { AnySpinalRelation } from '../interfaces/AnySpinalRelation';
import { EventData } from '../interfaces/EventData';
import { RelationSearch } from '../interfaces/RelationSearch';
import type { SpinalNodeFindOnePredicateFunc } from '../interfaces/SpinalNodeFindOnePredicateFunc';
import type { SpinalNodeFindPredicateFunc } from '../interfaces/SpinalNodeFindPredicateFunc';
import type { SpinalNodeForEachFunc } from '../interfaces/SpinalNodeForEachFunc';
import type { SpinalNodeInfoModel } from '../interfaces/SpinalNodeInfoModel';
import type { SpinalNodeMapFunc } from '../interfaces/SpinalNodeMapFunc';
import { SpinalRelationFactory } from '../Relations/SpinalRelationFactory';
import { SpinalMap } from '../SpinalMap';
import { SpinalNodePointer } from '../SpinalNodePointer';
import { SpinalSet } from '../SpinalSet';
import {
  consumeBatch,
  guid,
  loadParentRelation,
  validateGetChildrenOptions,
} from '../Utilities';
import { SpinalContext } from './SpinalContext';
import type {
  IGetChildrenGenOpt,
  IGetChildrenOpt,
} from '../interfaces/IGetChildrenOpt';
export const DEFAULT_FIND_PREDICATE: SpinalNodeFindPredicateFunc = () => true;

/**
 * Node of a graph.
 * @extends Model
 * @template T extends Model = ElementType
 */
class SpinalNode<T extends Model = any> extends Model {
  info!: SpinalNodeInfoModel;
  parents!: SpinalMap<Lst<SpinalNodePointer<AnySpinalRelation>>>;
  children!: SpinalMap<SpinalMap<AnySpinalRelation>>;
  element?: SpinalNodePointer<T>;
  contextIds!: SpinalSet;

  /**
   * Constructor for the SpinalNode class.
   * @param {string} [name="undefined"] Name of the node
   * @param {string} [type="undefined"] Type of the node
   * @param {Model} [element] Element of the node
   * @throws {TypeError} If the element is not a Model
   */
  constructor(
    name: string = 'undefined',
    type: string = 'SpinalNode',
    element?: T
  ) {
    super();
    if (FileSystem._sig_server === false) return;

    this.add_attr({
      info: {
        name,
        type,
        id: guid(),
        directModificationDate: Date.now(),
        indirectModificationDate: Date.now(),
      },
      parents: new SpinalMap(),
      children: new SpinalMap(),
      contextIds: new SpinalSet(),
    });
    if (element) this.add_attr('element', new SpinalNodePointer(element));
  }

  /**
   * Returns the id.
   * @returns {Str} Id of the node
   */
  getId(): Str {
    return this.info.id;
  }

  /**
   * Returns the name.
   * @returns {Str} Name of the node
   */
  getName(): Str {
    return this.info.name;
  }

  /**
   * Returns the type.
   * @returns {Str} Type of the node
   */
  getType(): Str {
    return this.info.type;
  }

  /**
   * Returns the DirectModificationDate.
   * @returns {Date} Direct Modification Date of the node
   */
  getDirectModificationDate(): Val {
    if (typeof this.info.directModificationDate === 'undefined') {
      this.info.add_attr('directModificationDate', Date.now());
    }
    return this.info.directModificationDate;
  }
  /**
   * Returns the IndirectModificationDate.
   * @returns {Date} Indirect Modification Date of the node
   */
  getIndirectModificationDate(): Val {
    if (typeof this.info.indirectModificationDate === 'undefined') {
      this.info.add_attr('indirectModificationDate', Date.now());
    }
    return this.info.indirectModificationDate;
  }
  /**
   * Sets the value corresponding to the key.
   * @param {Date} date Key to the value
   * @throws {TypeError} If the date is not of type Date
   */
  setIndirectModificationDate(date: number = Date.now()): void {
    if (typeof date !== 'number') {
      throw new TypeError('The date must be a number');
    }
    if (this.info.indirectModificationDate) {
      this.info.indirectModificationDate.set(date);
    } else this.info.add_attr('indirectModificationDate', date);
  }
  /**
   * Sets the value corresponding to the key.
   * @param {Date} date Key to the value
   * @throws {TypeError} If the date is not of type Date
   */
  setDirectModificationDate(date: number = Date.now()): void {
    if (typeof date !== 'number') {
      throw new TypeError('The date must be a number');
    }
    if (this.info.directModificationDate) {
      this.info.directModificationDate.set(date);
    } else this.info.add_attr('directModificationDate', date);
    this.setIndirectModificationDate(date);
  }

  /**
   * Returns the element. if noCreate is true and the element is not present, it will not create one
   * @param {boolean} [noCreate=false] if true will not create a element and if element doesn't exist will return undefined
   * @returns {Promise<T> | undefined} A promise where the parameter of the resolve method is the element
   */
  async getElement(noCreate = false): Promise<T | undefined> {
    if (this.element === undefined) {
      if (noCreate === true) return undefined;
      const model = new Model();
      this.add_attr(
        'element',
        <SpinalNodePointer<T>>new SpinalNodePointer(model)
      );
      return <T>model;
    }
    return await this.element.load();
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
        for (const relChildrenId of relChildrenIds) {
          nodeChildrenIds.push(relChildrenId);
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
      throw new TypeError('id must be a string');
    }

    if (!this.contextIds.has(id)) {
      this.contextIds.add(id);
      this.setDirectModificationDate();
    }
  }

  /**
   * Remove an id to the context ids of the node.
   * @param {string} id
   */
  removeContextId(id: string): void {
    if (typeof id !== 'string') {
      throw new TypeError('id must be a string');
    }

    if (this.contextIds.has(id)) {
      this.contextIds.delete(id);
      this.setDirectModificationDate();
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
   * Returns true if the node has the context id.
   * @param {string} id
   * @return {*}  {boolean}
   */
  hasContextId(id: string): boolean {
    if (typeof id !== 'string') {
      throw new TypeError('id must be a string');
    }

    if (this.contextIds.has(id)) {
      return true;
    }
    return false;
  }

  /**
   * Returns true if the node belongs to the context.
   * @param {SpinalContext} context The context that might own the node
   * @returns {boolean} A boolean
   * @throws {TypeError} If context is not a SpinalContext
   */
  belongsToContext(context: SpinalContext<any>): boolean {
    if (!(context instanceof SpinalContext)) {
      throw new TypeError('context must be a SpinalContext');
    }

    return this.contextIds.has(context.getId().get());
  }

  /**
   * Verify if the node contains the relation name.
   * @param {string} relationName Name of the relation
   * @returns {boolean} Return true is the relation is contained in the node and false otherwise.
   * @throws {TypeError} If the relation name is not a string
   * @throws {Error} If the relation type doesn't exist
   */
  hasRelation(relationName: string): boolean;
  /**
   * Verify if the node contains the relation name.
   * @deprecated Use relationType is not used anymore, use hasRelation(relationName) instead
   */
  hasRelation(relationName: string, relationType: string): boolean;
  hasRelation(relationName: string): boolean {
    if (typeof relationName !== 'string') {
      throw new TypeError('the relation name must be a string');
    }
    for (const [, relationMap] of this.children) {
      for (const [relname] of relationMap) {
        if (relname === relationName) return true;
      }
    }
    return false;
  }

  /**
   * Verify if the node contains the relation name in the context.
   * @param {string} relationName
   * @param {SpinalContext} context
   * @return {*}  {boolean}
   */
  hasRelationInContext(relationName: string, context: SpinalContext): boolean {
    if (typeof relationName !== 'string') {
      throw new TypeError('the relation name must be a string');
    }
    if (!(context instanceof SpinalContext)) {
      throw new TypeError('context must be a SpinalContext');
    }
    for (const [, relationMap] of this.children) {
      for (const [relname, rel] of relationMap) {
        if (relname === relationName && rel.belongsToContext(context))
          return true;
      }
    }
    return false;
  }

  /**
   * Verify if the node contains all the relation names.
   * @param {string[]} relationNames Array containing all the relation name
   * @returns {boolean} Return true if the node contains
   * all the relations in relationNames,false otherwise.
   * @throws {TypeError} If the relation names are not in an array
   * @throws {TypeError} If one of the relation names is not a string
   * @throws {Error} If the relation type doesn't exist
   */
  hasRelations(relationNames: string[]): boolean;
  /**
   * Verify if the node contains all the relation names.
   * @deprecated Use relationType is not used anymore, use hasRelations(relationNames) instead
   */
  hasRelations(relationNames: string[], relationType: string): boolean;
  hasRelations(relationNames: string[]): boolean {
    if (!Array.isArray(relationNames)) {
      throw new TypeError('The relation names must be in an array');
    }

    for (const relationName of relationNames) {
      if (!this.hasRelation(relationName)) {
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
    const names = new Set<string>();
    for (const [, relationMap] of this.children) {
      for (const relname of relationMap.keys()) {
        names.add(relname);
      }
    }
    return Array.from(names);
  }

  /**
   * Add the node as child of the relation.
   * @param {T|SpinalNode<T>} child Element to add as child
   * @param {string} relationName Name of the relation
   * @param {string} [relationType=SPINAL_RELATION_PTR_LST_TYPE] Type of the relation
   * @returns {Promise<SpinalNode>} The child node in a promise
   * @throws {TypeError} If the child is not a model
   * @throws {TypeError} If the relation name is not a string
   * @throws {Error} If the relation type is invalid
   * @throws {Error} If the child is itself
   */
  async addChild<K extends Model>(
    child: K | SpinalNode<K>,
    relationName: string,
    relationType: string | string = SPINAL_RELATION_PTR_LST_TYPE
  ): Promise<SpinalNode<K>> {
    if (!(child instanceof Model)) {
      throw new TypeError(
        'Cannot add a child witch is not an instance of SpinalNode or Model.'
      );
    }
    if (child === <any>this) {
      throw new Error('Cannot add a node as child of itself.');
    }
    let relation: AnySpinalRelation | undefined =
      this._getRelation(relationName);
    if (!relation) {
      relation = this._createRelation(relationName, relationType);
      this.setDirectModificationDate();
    }

    if (SpinalRelationFactory.canUpgradeRelation(relation)) {
      relation = await SpinalRelationFactory.upgradeRelationToLstPtrLst(
        relation,
        this
      );
    }
    const res = await relation.addChild(child);

    this.setDirectModificationDate();

    // Send add child event via spinal-event-emitter
    this.sendEventFunc(ADD_CHILD_EVENT, <SpinalNode<any>>child);

    return res;
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
   * @throws {Error} If the child is itself
   */
  async addChildInContext<K extends Model>(
    child: K | SpinalNode<K>,
    relationName: string,
    relationType: string,
    context: SpinalContext<any>
  ): Promise<SpinalNode<K>>;
  /**
   * @template K
   * @param {(K | SpinalNode<K>)} child
   * @param {string} relationName
   * @param {SpinalContext<any>} context
   * @return {*}  {Promise<SpinalNode<K>>}
   */
  async addChildInContext<K extends Model>(
    child: K | SpinalNode<K>,
    relationName: string,
    context: SpinalContext<any>
  ): Promise<SpinalNode<K>>;
  async addChildInContext<K extends Model>(
    child: K | SpinalNode<K>,
    relationName: string,
    relationTypeOrContext: string | SpinalContext,
    context?: SpinalContext<any>
  ): Promise<SpinalNode<K>> {
    let relation: AnySpinalRelation;
    let childCreate: K | SpinalNode<K> = child;
    let relationType: string = SPINAL_RELATION_PTR_LST_TYPE;
    if (
      context === undefined &&
      relationTypeOrContext instanceof SpinalContext
    ) {
      context = relationTypeOrContext;
      relationType = SPINAL_RELATION_PTR_LST_TYPE;
    } else if (relationTypeOrContext !== undefined) {
      relationType = relationTypeOrContext as string;
    }

    if (typeof relationName !== 'string') {
      throw new TypeError('relationName must be a string');
    }

    if (!(context instanceof SpinalContext)) {
      throw new TypeError('context must be a SpinalContext');
    }
    if (child === <any>this) {
      throw new Error('Cannot add a node as child of itself.');
    }
    if (!(child instanceof Model)) {
      throw new TypeError(
        'Cannot add a child witch is not an instance of SpinalNode or Model.'
      );
    } else if (!(child instanceof SpinalNode)) {
      childCreate = new SpinalNode(undefined, undefined, child);
    }
    const tmpchildCreate: SpinalNode<K> = <SpinalNode<K>>childCreate;

    if (!this.hasRelation(relationName)) {
      relation = this._createRelation(relationName, relationType);
    } else {
      relation = this._getRelation(relationName)!;
    }

    tmpchildCreate.addContextId(context.getId().get());
    relation.addContextId(context.getId().get());

    await relation.addChild(tmpchildCreate);
    this.setDirectModificationDate();

    // Send add child event via spinal-event-emitter
    this.sendEventFunc(
      ADD_CHILD_IN_CONTEXT_EVENT,
      <SpinalNode<any>>childCreate,
      context
    );

    return tmpchildCreate;
  }
  /**
   * Removes the node from the relation children.
   * @param {SpinalNode} node Node to remove
   * @param {string} relationName Name of the relation to wich the node belongs
   * @returns {Promise<void>} An empty promise
   * @throws {TypeError} If relation name is not a string
   * @throws {Error} If relation type is invalid
   * @throws {Error} If relation doesn't exist
   * @throws {Error} If the child doesn't exist
   */
  removeChild(node: SpinalNode<any>, relationName: string): Promise<void>;
  /**
   * Removes the node from the relation children.
   * @deprecated Use relationType is not used anymore, use removeChild(node, relationName) instead
   */
  removeChild(
    node: SpinalNode<any>,
    relationName: string,
    relationType: string
  ): Promise<void>;
  removeChild(node: SpinalNode<any>, relationName: string): Promise<void> {
    if (!this.hasRelation(relationName)) {
      throw Error("The relation doesn't exist");
    }

    const rel = this._getRelation(relationName)!;
    const res = rel.removeChild(node);
    // change the res way
    this.setDirectModificationDate();

    // Send add child event via spinal-event-emitter
    this.sendEventFunc(REMOVE_CHILD_EVENT, node);

    return res;
  }

  /**
   * Removes children in the given relation.
   * @param {SpinalNode[]} nodes Nodes to delete
   * @param {string} relationName Name of the relation
   * @returns {Promise<void>} An empty promise
   * @throws {TypeError} If nodes is not an array
   * @throws {TypeError} If an element of nodes is not a SpinalNode
   * @throws {TypeError} If relation name is not a string
   * @throws {Error} If relation type is invalid
   * @throws {Error} If the relation doesn't exist
   * @throws {Error} If one of the nodes is not a child
   */
  async removeChildren(
    nodes: SpinalNode<any>[],
    relationName: string
  ): Promise<void>;
  /**
   * Removes children in the given relation.
   * @deprecated Use relationType is not used anymore, use removeChildren(nodes, relationName) instead
   */
  async removeChildren(
    nodes: SpinalNode<any>[],
    relationName: string,
    relationType: string
  ): Promise<void>;
  async removeChildren(
    nodes: SpinalNode<any>[],
    relationName: string
  ): Promise<void> {
    if (!Array.isArray(nodes)) {
      throw new TypeError('nodes must be an array');
    }

    if (!this.hasRelation(relationName)) {
      throw Error("The relation doesn't exist");
    }

    const rel = this._getRelation(relationName)!;
    const res = await rel.removeChildren(nodes);
    // change the res way
    this.setDirectModificationDate();

    // Send add child event via spinal-event-emitter
    this.sendEventFunc(REMOVE_CHILDREN_EVENT, nodes);

    return res;
  }

  /**
   * Removes a child relation of the node.
   * @param {string} relationName Name of the relation to remove
   * @returns {Promise<void>} An empty promise
   * @throws {TypeError} If the relationName is not a string
   * @throws {Error} If the relationType is invalid
   * @throws {Error} If the relation doesn't exist
   */
  async removeRelation(relationName: string): Promise<void>;
  /**
   * Removes a child relation of the node.
   * @deprecated Use relationType is not used anymore, use removeRelation(relationName) instead
   */
  async removeRelation(
    relationName: string,
    relationType: string
  ): Promise<void>;
  async removeRelation(relationName: string): Promise<void> {
    if (!this.hasRelation(relationName)) {
      throw Error("The relation doesn't exist");
    }

    const rel = this._getRelation(relationName)!;
    let res = await rel.removeFromGraph();
    // change the res way
    this.setDirectModificationDate();
    return res;
  }

  /**
   * Remove the node from the graph
   * i.e remove the node from all the parent relations and remove all the children relations.
   * This operation might delete all the sub-graph under this node.
   * After this operation the node can be deleted without fear.
   * @returns {Promise<void>} An empty promise
   */
  async removeFromGraph(): Promise<void> {
    await Promise.all([this._removeFromParents(), this._removeFromChildren()]);
  }

  /**
   * Returns the first child in the given relation for which the predicate is true.
   * @param {SpinalNodeFindPredicateFunc} predicate
   * Functions that takes a node and returns a boolean
   * @param {string} relationName Name of the relation
   * @returns {Promise<SpinalNode<any> | undefined>}
   * The first child for which the predicate is true, undefined if no child verify the predicate
   * @throws {TypeError} If predicate is not a function
   * @throws {TypeError} If relation name is not a string
   * @throws {Error} If relation type is invalid
   * @throws {Error} If relation doesn't exist
   */
  async getChild(
    predicate: SpinalNodeFindPredicateFunc,
    relationName: string
  ): Promise<SpinalNode<any> | undefined>;
  /**
   * Returns the first child in the given relation for which the predicate is true.
   * @deprecated Use relationType is not used anymore, use getChild(predicate, relationName) instead
   */ async getChild(
    predicate: SpinalNodeFindPredicateFunc,
    relationName: string,
    relationType: string
  ): Promise<SpinalNode<any> | undefined>;
  async getChild(
    predicate: SpinalNodeFindPredicateFunc,
    relationName: string
  ): Promise<SpinalNode<any> | undefined> {
    if (typeof predicate !== 'function') {
      throw new TypeError('the predicate must be a function');
    }

    if (!this.hasRelation(relationName)) {
      throw Error("The relation doesn't exist");
    }

    const relation = this._getRelation(relationName)!;

    for await (const child of relation.getChildrenGen(0, false)) {
      if (predicate(child)) {
        return child;
      }
    }
    return undefined;
  }

  /**
   * Returns the children of the node for the relation names.
   * @param {string[]} [relationNames=[]]
   * Array containing the relation names of the desired children
   * @returns {Promise<SpinalNode[]>} The children that were found
   * @throws {TypeError} If relationNames is neither an array, a string or omitted
   * @throws {TypeError} If an element of relationNames is not a string
   */
  async getChildren(
    relationNames: string | RegExp | (string | RegExp)[] = [],
    options: Partial<IGetChildrenOpt> = {}
  ): Promise<SpinalNode<any>[]> {
    // check option maxNbrChildren
    const maxNbrChildren = options.maxNbrChildren ?? 0;
    if (typeof maxNbrChildren !== 'number' || maxNbrChildren < 0) {
      throw new TypeError('maxNbrChildren must be a non-negative number');
    }
    const res: SpinalNode<any>[] = [];
    for await (const child of this.getChildrenGen(relationNames, options)) {
      res.push(child);
      if (maxNbrChildren && res.length >= maxNbrChildren) {
        break;
      }
    }
    return res;
  }

  /**
   * Return the children of the node that are registered in the context
   * @param {SpinalContext} context Context to use for the search
   * @param {(string | RegExp | (string | RegExp)[])} [relationNames=[]] Relation names to filter the children. If empty or undefined all the relations will be used
   * @param {Partial<IGetChildrenGenOpt>} [options={}] Options to filter the children
   * @returns {Promise<SpinalNode[]>} The children that were found
   * @throws {TypeError} If the context is not a SpinalContext
   */
  async getChildrenInContext(
    context: SpinalContext<any>,
    relationNames: string | RegExp | (string | RegExp)[] = [],
    options: Partial<IGetChildrenOpt> = {}
  ): Promise<SpinalNode<any>[]> {
    if (!(context instanceof SpinalContext)) {
      throw new TypeError('context must be a SpinalContext');
    }
    options.context = context;
    return this.getChildren(relationNames, options);
  }

  async *getChildrenGen(
    relationNames: string | RegExp | (string | RegExp)[] = [],
    options: Partial<IGetChildrenGenOpt> = {}
  ): AsyncGenerator<SpinalNode<T>, void, void> {
    const validatedOptions = validateGetChildrenOptions(options);
    const matchingRelations: AnySpinalRelation[] =
      this._getValidRelationsChildren(relationNames, validatedOptions.context);
    if (validatedOptions.reverse) matchingRelations.reverse();
    let counter = 0;
    for (const relation of matchingRelations) {
      for await (const child of relation.getChildrenGen(
        validatedOptions.offset,
        validatedOptions.reverse,
        validatedOptions.context,
        counter
      )) {
        counter++;
        yield child;
      }
    }
  }

  /**
   * Return all parents for the relation names no matter the type of relation
   * @param {(string | RegExp | (string | RegExp)[])} [relationNames=[]] Array containing the relation names of the desired parents
   * @returns {Promise<Array<SpinalNode<any>>>} Promise containing the parents that were found
   * @throws {TypeError} If the relationNames are neither an array, a string or omitted
   * @throws {TypeError} If an element of relationNames is not a string
   */
  public async getParents(
    relationNames: string | RegExp | (string | RegExp)[] = []
  ): Promise<SpinalNode<any>[]> {
    const ptrRelations = await this._getValidPtrRelationsParents(relationNames);
    const prom: Promise<SpinalNode<Model> | undefined>[] = [];

    for (const ptrRelation of ptrRelations) {
      prom.push(loadParentRelation(ptrRelation));
    }
    const res = await Promise.all(prom);
    return res.filter(
      (e: SpinalNode<Model> | undefined): e is SpinalNode<Model> =>
        e !== undefined
    );
  }

  public async getParentsInContext(
    context: SpinalContext<any>,
    relationNames: string | RegExp | (string | RegExp)[] = []
  ): Promise<SpinalNode<any>[]> {
    if (!(context instanceof SpinalContext)) {
      throw new TypeError('context must be a SpinalContext');
    }
    const ptrRelations = await this._getValidPtrRelationsParents(relationNames);
    const prom: Promise<SpinalNode<Model> | undefined>[] = [];

    for (const ptrRelation of ptrRelations) {
      prom.push(loadParentRelation(ptrRelation, context));
    }
    const res = await Promise.all(prom);
    return res.filter(
      (e: SpinalNode<Model> | undefined): e is SpinalNode<Model> =>
        e !== undefined
    );
  }

  /**
   * Recursively finds and return the FIRST FOUND parent nodes for which the predicate is true
   * @param {string[]} relationNames Arry of relation
   * @param {(node)=> boolean} predicate function stop search if return true
   */
  public async findOneParent(
    relationNames: string | RegExp | (string | RegExp)[] = [],
    predicate: SpinalNodeFindOnePredicateFunc = DEFAULT_FIND_PREDICATE
  ): Promise<SpinalNode<any>> {
    return this.findParents(
      relationNames,
      (node: SpinalNode<any>, stopFct): boolean => {
        const res = predicate(node);
        if (res) stopFct!();
        return res;
      }
    ).then((e: SpinalNode<any>[]): SpinalNode<any> => e[0]); // can do that because it stop to fist find
  }

  /**
   * Recursively finds all the parent nodes for which the predicate is true
   * @param {(string | RegExp | (string | RegExp)[])} [relationNames=[]] Arry of relation
   * @param {SpinalNodeFindPredicateFunc} [predicate=DEFAULT_FIND_PREDICATE]
   * @return {*}  {Promise<SpinalNode<any>[]>}
   */
  public async findParents(
    relationNames: string | RegExp | (string | RegExp)[] = [],
    predicate: SpinalNodeFindPredicateFunc = DEFAULT_FIND_PREDICATE
  ): Promise<SpinalNode<any>[]> {
    let stop = false;
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    function stopFct(): void {
      stop = true;
    }
    let found = [];
    for await (const node of this.visitParents(relationNames)) {
      if (predicate(node, stopFct)) found.push(node);
      if (stop) break;
    }
    return found;
  }

  public async findParentsInContext(
    context: SpinalContext<any>,
    predicate: SpinalNodeFindPredicateFunc = DEFAULT_FIND_PREDICATE
  ): Promise<SpinalNode<any>[]> {
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    let stop = false;
    function stopFct(): void {
      stop = true;
    }
    let found = [];
    for await (const node of this.visitParentsInContext(context)) {
      if (predicate(node, stopFct)) found.push(node);
      if (stop) break;
    }
    return found;
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
  async find(
    relationNames: RelationSearch,
    predicate: SpinalNodeFindPredicateFunc = DEFAULT_FIND_PREDICATE
  ): Promise<SpinalNode<any>[]> {
    if (
      !Array.isArray(relationNames) &&
      relationNames !== undefined &&
      !(typeof relationNames === 'string' || relationNames instanceof RegExp)
    ) {
      throw new TypeError(
        'relationNames must be an array, a string or omitted'
      );
    }

    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }

    const found: SpinalNode<any>[] = [];
    let stop = false;
    function stopFct(): void {
      stop = true;
    }
    for await (const node of this.visitChildren(relationNames)) {
      if (predicate(node, stopFct)) found.push(node);
      if (stop) break;
    }
    return found;
  }

  /**
   * @param {RelationSearch} relations
   * @param {(node: SpinalNode<any>, stopFct?: () => void) => Promise<boolean>} predicate
   * @return {*}  {Promise<SpinalNode<any>[]>}
   */
  async findAsyncPredicate(
    relations: RelationSearch,
    predicate: (node: SpinalNode<any>, stopFct?: () => void) => Promise<boolean>
  ): Promise<SpinalNode<any>[]> {
    const seen: Set<SpinalNode<any>> = new Set([this]);
    let promises: (() => Promise<SpinalNode<any>[]>)[] = [];
    let nextGen: SpinalNode<any>[] = [this];
    let currentGen: SpinalNode<any>[] = [];
    const result: SpinalNode[] = [];
    let stop = false;
    function stopFct(): void {
      stop = true;
    }
    while (nextGen.length) {
      currentGen = nextGen;
      promises = [];
      nextGen = [];

      for (const curNode of currentGen) {
        promises.push(async (): Promise<SpinalNode<any>[]> => {
          const arr = await curNode.getChildren(relations);
          const resProm = [];
          for (const child of arr) {
            // @ts-ignore
            if (stop === true) break;
            resProm.push(async (): Promise<void> => {
              // @ts-ignore
              if (stop === true) return;
              const res = await predicate(child, stopFct);
              if (res) result.push(child);
            });
          }
          await consumeBatch(resProm, 30);
          return arr;
        });
      }

      const childrenArrays = await consumeBatch(promises, 30);
      // @ts-ignore
      if (stop === true) break;
      for (const children of childrenArrays) {
        for (const child of children) {
          if (!seen.has(child)) {
            nextGen.push(child);
            seen.add(child);
          }
        }
      }
    }
    return result;
  }

  /**
   * @param {SpinalContext<any>} context
   * @param {(node: SpinalNode<any>, stopFct?: () => void) => Promise<boolean>} predicate
   * @return {*}  {Promise<SpinalNode<any>[]>}
   */
  async findInContextAsyncPredicate(
    context: SpinalContext<any>,
    predicate: (node: SpinalNode<any>, stopFct?: () => void) => Promise<boolean>
  ): Promise<SpinalNode<any>[]> {
    const seen: Set<SpinalNode<any>> = new Set([this]);
    let promises: (() => Promise<SpinalNode<any>[]>)[] = [];
    let nextGen: SpinalNode<any>[] = [this];
    let currentGen: SpinalNode<any>[] = [];
    const result: SpinalNode<any>[] = [];
    let stop = false;
    function stopFct(): void {
      stop = true;
    }

    while (nextGen.length) {
      currentGen = nextGen;
      promises = [];
      nextGen = [];

      for (const curNode of currentGen) {
        promises.push(async (): Promise<SpinalNode<any>[]> => {
          const arr = await curNode.getChildrenInContext(context);
          const resProm = [];
          for (const child of arr) {
            resProm.push(async (): Promise<void> => {
              if (stop === true) return;
              const res = await predicate(child, stopFct);
              if (res) result.push(child);
            });
          }
          await consumeBatch(resProm);
          return arr;
        });
      }
      const childrenArrays = await consumeBatch(promises, 30);
      // @ts-ignore
      if (stop === true) break;
      for (const children of childrenArrays) {
        for (const child of children) {
          if (!seen.has(child)) {
            nextGen.push(child);
            seen.add(child);
          }
        }
      }
    }
    return result;
  }

  /**
   * Recursively finds all the children nodes with type "nodeType".
   * @param {string|string[]} relationNames Array containing the relation names to follow
   * @param {string} nodeType Type of node to find in children
   * @returns {Promise<Array<SpinalNode<any>>>} The nodes that were found
   * @throws {TypeError} If the relationNames are neither an array, a string or omitted
   * @throws {TypeError} If an element of relationNames is not a string
   * @throws {TypeError} If the predicate is not a function
   */
  findByType(
    relationNames: string | string[],
    nodeType: string
  ): Promise<SpinalNode<any>[]> {
    return this.find(relationNames, (node: SpinalNode<any>): boolean => {
      return node.getType().get() === nodeType;
    });
  }

  /**
   * Recursively finds all the children nodes and classify them by type.
   * @param {string|string[]} relationNames Array containing the relation names to follow
   * @return {*}  {Promise<{ types: string[]; data: { [type: string]: SpinalNode<any>[] } }>}
   * @throws {TypeError} If the relationNames are neither an array, a string or omitted
   * @throws {TypeError} If an element of relationNames is not a string
   * @throws {TypeError} If the predicate is not a function
   */
  async browseAndClassifyByType(
    relationNames: string | string[]
  ): Promise<{ types: string[]; data: { [type: string]: SpinalNode<any>[] } }> {
    let dataStructure = {
      types: [] as string[],
      data: {} as { [type: string]: SpinalNode<any>[] },
    };
    for await (const node of this.visitChildren(relationNames)) {
      let type = node.getType().get();

      if (dataStructure.types.indexOf(type) === -1) {
        dataStructure.types.push(type);
      }
      if (typeof dataStructure.data[type] === 'undefined') {
        dataStructure.data[type] = [];
      }
      dataStructure.data[type].push(node);
    }
    return dataStructure;
  }

  /**
   * Recursively finds all the children nodes in the context for which the predicate is true..
   * @param {SpinalContext} context Context to use for the search
   * @param {findPredicate} predicate Function returning true if the node needs to be returned
   * @returns {Promise<Array<SpinalNode>>} The nodes that were found
   * @throws {TypeError} If context is not a SpinalContext
   * @throws {TypeError} If the predicate is not a function
   */
  async findInContext(
    context: SpinalContext<any>,
    predicate: SpinalNodeFindPredicateFunc = DEFAULT_FIND_PREDICATE
  ): Promise<SpinalNode<any>[]> {
    if (typeof predicate !== 'function') {
      throw new TypeError('The predicate function must be a function');
    }
    const found: SpinalNode<any>[] = [];
    let stop = false;
    function stopFct(): void {
      stop = true;
    }
    for await (const node of this.visitChildrenInContext(context)) {
      if (predicate(node, stopFct)) found.push(node);
      if (stop) break;
    }
    return found;
  }

  /**
   * Recursively finds the first child node in the context for which the predicate is true.
   * @param {SpinalContext} context Context to use for the search
   * @param {findPredicate} predicate Function returning true if the node needs to be returned
   * @returns {Promise<SpinalNode | undefined>} The node that was found or undefined if no node was found
   * @throws {TypeError} If context is not a SpinalContext
   * @throws {TypeError} If the predicate is not a function
   */
  async findOneInContext(
    context: SpinalContext<any>,
    predicate: SpinalNodeFindPredicateFunc = DEFAULT_FIND_PREDICATE
  ): Promise<SpinalNode<any> | undefined> {
    if (typeof predicate !== 'function') {
      throw new TypeError('The predicate function must be a function');
    }
    for await (const node of this.visitChildrenInContext(context)) {
      if (predicate(node)) return node;
    }
    return undefined;
  }

  /**
   * Recursively finds all the children nodes in the context for which the predicate is true..
   * @param {SpinalContext} context Context to use for the search
   * @param {string} nodeType Type of node to find in children
   * @returns {Promise<Array<SpinalNode>>} The nodes that were found
   * @throws {TypeError} If context is not a SpinalContext
   * @throws {TypeError} If the predicate is not a function
   */
  findInContextByType(
    context: SpinalContext<any>,
    nodeType: string
  ): Promise<SpinalNode<any>[]> {
    return this.findInContext(context, (node: SpinalNode<any>): boolean => {
      return node.getType().get() === nodeType;
    });
  }

  /**
   * Recursively finds all the children nodes in the context and classify them by type.
   * @param {SpinalContext} context Context to use for the search
   * @returns {Object<{types : string[], data : Object<string : SpinalNode[]>}>}
   * @throws {TypeError} If the relationNames are neither an array, a string or omitted
   * @throws {TypeError} If an element of relationNames is not a string
   * @throws {TypeError} If the predicate is not a function
   */
  async browseAndClassifyByTypeInContext(
    context: SpinalContext<any>
  ): Promise<{ types: string[]; data: { [type: string]: SpinalNode<any>[] } }> {
    const dataStructure = {
      types: [] as string[],
      data: {} as { [type: string]: SpinalNode<any>[] },
    };

    for await (const node of this.visitChildrenInContext(context)) {
      const type = node.getType().get();

      if (dataStructure.types.indexOf(type) === -1) {
        dataStructure.types.push(type);
      }
      if (typeof dataStructure.data[type] === 'undefined') {
        dataStructure.data[type] = [];
      }
      dataStructure.data[type].push(node);
    }

    return dataStructure;
  }

  /**
   * Recursively applies a function to all the children nodes.
   * @param {string|string[]} relationNames Array containing the relation names to follow
   * @param {SpinalNodeForEachFunc<SpinalNode<any>>} callback Function to apply to the nodes
   * @throws {TypeError} If the relationNames are neither an array, a string or omitted
   * @throws {TypeError} If an element of relationNames is not a string
   * @throws {TypeError} If the callback is not a function
   */
  async forEach(
    relationNames: string | string[],
    callback: SpinalNodeForEachFunc
  ): Promise<void> {
    if (typeof callback !== 'function') {
      throw new TypeError('callback must be a function');
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
  async forEachInContext(
    context: SpinalContext<any>,
    callback: SpinalNodeForEachFunc
  ): Promise<void> {
    if (typeof callback !== 'function') {
      throw new TypeError('callback must be a function');
    }

    const nodes: SpinalNode<any>[] = await this.findInContext(context);

    for (const node of nodes) {
      callback(node);
    }
  }

  /**
   * Recursively applies a function to all the children nodes and returns the results in an array.
   * @template T
   * @param {string|string[]} relationNames Array containing the relation names to follow
   * @param {SpinalNodeMapFunc} callback Function to apply to the nodes
   * @returns {Promise<T[]>} The results of the callback for each node
   * @throws {TypeError} If the relationNames are neither an array, a string or omitted
   * @throws {TypeError} If an element of relationNames is not a string
   * @throws {TypeError} If the callback is not a function
   */
  async map<T>(
    relationNames: string | string[],
    callback: SpinalNodeMapFunc<T>
  ): Promise<T[]> {
    if (typeof callback !== 'function') {
      throw new TypeError('The callback function must be a function');
    }

    const nodes = await this.find(relationNames);
    const results: T[] = [];

    for (const node of nodes) {
      results.push(callback(node));
    }

    return results;
  }

  /**
   * Recursively applies a function to all the children nodes in the context
   * and returns the results in an array.
   * @template T
   * @param {SpinalContext} context Context to use for the search
   * @param {function} callback Function to apply to the nodes
   * @returns {Promise<Array<*>>} The results of the callback for each node
   * @throws {TypeError} If context is not a SpinalContext
   * @throws {TypeError} If the callback is not a function
   */
  async mapInContext<T>(
    context: SpinalContext<any>,
    callback: SpinalNodeMapFunc<T>
  ): Promise<T[]> {
    if (typeof callback !== 'function') {
      throw new TypeError('The callback function must be a function');
    }

    const nodes: SpinalNode<any>[] = await this.findInContext(context);
    const results: T[] = [];

    for (const node of nodes) {
      results.push(callback(node));
    }

    return results;
  }

  /**
   * @param {RelationSearch} relationNames
   * @return {*}  {AsyncGenerator<SpinalNode<any>, void, void>}
   */
  async *visitParents(
    relationNames: RelationSearch
  ): AsyncGenerator<SpinalNode<any>, void, void> {
    const seen: Set<SpinalNode<any>> = new Set([this]);
    let promises: Promise<SpinalNode<any>[]>[] = [];
    let nextGen: SpinalNode<any>[] = [this];
    let currentGen: SpinalNode<any>[] = [];

    while (nextGen.length) {
      currentGen = nextGen;
      promises = [];
      nextGen = [];

      for (const node of currentGen) {
        yield node;
        promises.push(node.getParents(relationNames));
      }

      // eslint-disable-next-line no-await-in-loop
      const childrenArrays = await Promise.all(promises);
      for (const children of childrenArrays) {
        for (const child of children) {
          if (!seen.has(child)) {
            nextGen.push(child);
            seen.add(child);
          }
        }
      }
    }
  }

  /**
   * @param {SpinalContext<any>} context
   * @return {*}  {AsyncGenerator<SpinalNode<any>, void, void>}
   */
  async *visitParentsInContext(
    context: SpinalContext<any>,
    relationNames: string | RegExp | (string | RegExp)[] = [new RegExp('.*')]
  ): AsyncGenerator<SpinalNode<any>, void, void> {
    const seen: Set<SpinalNode<any>> = new Set([this]);
    let promises: Promise<SpinalNode<any>[]>[] = [];
    let nextGen: SpinalNode<any>[] = [this];
    let currentGen: SpinalNode<any>[] = [];

    while (nextGen.length) {
      currentGen = nextGen;
      promises = [];
      nextGen = [];

      for (const node of currentGen) {
        yield node;
        promises.push(node.getParentsInContext(context, relationNames));
      }

      // eslint-disable-next-line no-await-in-loop
      const childrenArrays = await Promise.all(promises);
      for (const children of childrenArrays) {
        for (const child of children) {
          if (!seen.has(child)) {
            nextGen.push(child);
            seen.add(child);
          }
        }
      }
    }
  }

  /**
   * @param {RelationSearch} relationNames
   * @return {*}  {AsyncGenerator<SpinalNode<any>, void, void>}
   */
  async *visitChildren(
    relationNames: RelationSearch
  ): AsyncGenerator<SpinalNode<any>, void, void> {
    const seen: Set<SpinalNode<any>> = new Set([this]);
    let promises: (() => Promise<SpinalNode<any>[]>)[] = [];
    let nextGen: SpinalNode<any>[] = [this];
    let currentGen: SpinalNode<any>[] = [];

    while (nextGen.length) {
      currentGen = nextGen;
      promises = [];
      nextGen = [];

      for (const node of currentGen) {
        yield node;
        promises.push(
          (): Promise<SpinalNode<any>[]> => node.getChildren(relationNames)
        );
      }

      const childrenArrays: SpinalNode<any>[][] = await consumeBatch(
        promises,
        30
      );

      for (const children of childrenArrays) {
        for (const child of children) {
          if (!seen.has(child)) {
            nextGen.push(child);
            seen.add(child);
          }
        }
      }
    }
  }

  /**
   * @param {SpinalContext<any>} context
   * @return {*}  {AsyncGenerator<SpinalNode<any>, void, void>}
   */
  async *visitChildrenInContext(
    context: SpinalContext<any>,
    relationNames: string | RegExp | (string | RegExp)[] = [new RegExp('.*')]
  ): AsyncGenerator<SpinalNode<any>, void, void> {
    if (!(context instanceof SpinalContext)) {
      throw new TypeError('context must be a SpinalContext');
    }
    const seen: Set<SpinalNode<any>> = new Set([this]);
    let promises: (() => Promise<SpinalNode<any>[]>)[] = [];
    let nextGen: SpinalNode<any>[] = [this];
    let currentGen: SpinalNode<any>[] = [];

    while (nextGen.length) {
      currentGen = nextGen;
      promises = [];
      nextGen = [];

      for (const node of currentGen) {
        yield node;
        promises.push(
          (): Promise<SpinalNode<any>[]> =>
            node.getChildrenInContext(context, relationNames)
        );
      }

      const childrenArrays: SpinalNode<any>[][] = await consumeBatch(
        promises,
        30
      );

      for (const children of childrenArrays) {
        for (const child of children) {
          if (!seen.has(child)) {
            nextGen.push(child);
            seen.add(child);
          }
        }
      }
    }
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
   * @returns {SpinalRelation} The relation corresponding
   * @protected
   */
  _getRelation(relationName: string): AnySpinalRelation | undefined {
    for (const [, relationMap] of this.children) {
      for (const [name, relation] of relationMap) {
        if (name === relationName) {
          return relation;
        }
      }
    }
  }

  /**
   * Removes a parent relation of the node.
   * @param {AnySpinalRelation} relation Relation to remove
   * @protected
   */
  _removeParent(relation: AnySpinalRelation): void {
    const parentLst: Lst<SpinalNodePointer<AnySpinalRelation>> =
      this.parents.getElement(relation.getName().get());
    if (parentLst === undefined) return;
    for (let i: number = 0; i < parentLst.length; i += 1) {
      if (parentLst[i].getId().get() === relation.getId().get()) {
        parentLst.splice(i);
        // change the res way
        this.setDirectModificationDate();
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
        parent[i].load().then((parentRel: AnySpinalRelation): void => {
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
        .push(new SpinalNodePointer(relation, true));
    } else {
      const list = new Lst();
      list.push(new SpinalNodePointer(relation, true));
      this.parents.setElement(relationName, list);
      // change the res way
      this.setDirectModificationDate();
    }
  }

  /**
   * Create a new relation for this node.
   * @param {string} relationName Name of the relation
   * @param {string} relationType Type of the relation
   * @protected
   */
  _createRelation(
    relationName: string,
    relationType: string
  ): AnySpinalRelation {
    const relation = SpinalRelationFactory.getNewRelation(
      this,
      relationName,
      relationType
    );

    if (!this.children.has(relationType)) {
      this.children.setElement(relationType, new SpinalMap());
      // change the res way
      this.setDirectModificationDate();
    }

    this._getChildrenType(relationType).setElement(relationName, relation);
    // change the res way
    this.setDirectModificationDate();
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

  /**
   * Return all the children relations for the relation names no matter the type of relation
   * @private
   * @param {RelationSearch} [relationNames=[]]
   * @param {SpinalContext} [context] if provided, only relations belonging to this context will be returned
   * @return {*}
   */
  private _getValidRelationsChildren(
    relationNames: RelationSearch = [],
    context?: SpinalContext
  ) {
    if (!Array.isArray(relationNames)) {
      relationNames = [relationNames];
    }
    for (const searchRelation of relationNames) {
      if (
        typeof searchRelation !== 'string' &&
        !(searchRelation instanceof RegExp)
      ) {
        throw new TypeError(
          'The RelationNames must be string | RegExp | (string | RegExp)[]'
        );
      }
    }
    const relations: Set<AnySpinalRelation> = new Set();
    for (const [, relationMap] of this.children) {
      for (const [name, relation] of relationMap) {
        // if no relation names are provided, return all relations
        if (relationNames.length === 0) {
          if (context && !relation.belongsToContext(context)) continue;
          relations.add(relation);
          continue;
        }
        // if relation names are provided,
        // check if the relation name matches any of them
        for (const searchRelation of relationNames) {
          if (typeof searchRelation === 'string') {
            if (name === searchRelation) {
              if (context && !relation.belongsToContext(context)) continue;
              relations.add(relation);
            }
          } else if (searchRelation instanceof RegExp) {
            if (name.match(searchRelation)) {
              if (context && !relation.belongsToContext(context)) continue;
              relations.add(relation);
            }
          }
        }
      }
    }
    return Array.from(relations);
  }

  private async _getValidPtrRelationsParents(
    relationNames: RelationSearch = []
  ) {
    if (!Array.isArray(relationNames)) {
      relationNames = [relationNames];
    }
    for (const searchRelation of relationNames) {
      if (
        typeof searchRelation !== 'string' &&
        !(searchRelation instanceof RegExp)
      ) {
        throw new TypeError(
          'The RelationNames must be string | RegExp | (string | RegExp)[]'
        );
      }
    }
    const ptrParents: Set<SpinalNodePointer<AnySpinalRelation>> = new Set();
    for (const [name, nodeRelationLst] of this.parents) {
      if (relationNames.length === 0) {
        for (const nodeRelation of nodeRelationLst) {
          ptrParents.add(nodeRelation);
        }
      } else {
        for (const searchRelation of relationNames) {
          if (typeof searchRelation === 'string') {
            if (name === searchRelation) {
              for (const nodeRelation of nodeRelationLst) {
                ptrParents.add(nodeRelation);
              }
            }
          } else if (searchRelation instanceof RegExp) {
            if (name.match(searchRelation)) {
              for (const nodeRelation of nodeRelationLst) {
                ptrParents.add(nodeRelation);
              }
            }
          }
        }
      }
    }
    return Array.from(ptrParents);
  }

  private sendEventFunc(
    eventName: string,
    childNode?: SpinalNode<any> | SpinalNode<any>[],
    contextNode?: SpinalContext<any>
  ) {
    if (this.info.activeEventSender && this.info.activeEventSender.get()) {
      const data: EventData = {
        nodeId: this.getId().get(),
        ...(childNode &&
          !Array.isArray(childNode) && { childId: childNode.getId().get() }),
        ...(childNode &&
          Array.isArray(childNode) && {
            childrenIds: childNode.map((node) => node.getId().get()),
          }),
        contextId: contextNode && contextNode.getId().get(),
      };
      spinalEventEmitter.emit(eventName, data);
    }
  }
}

spinalCore.register_models([SpinalNode]);
export default SpinalNode;
export { SpinalNode };
