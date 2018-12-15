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

const globalType = typeof window === "undefined" ? global : window;
import spinalCore from "spinal-core-connectorjs";

import {
  guid
} from "../Utilities";

import {
  SpinalContext
} from "../index";

import SpinalNodePointer from "../SpinalNodePointer";
import {
  SpinalRelationFactory
} from "../Relations/SpinalRelationFactory";
import SpinalMap from "../SpinalMap";
import SpinalSet from "../SpinalSet";
import {
  RELATION_TYPE_LIST
} from "../../build/Relations/SpinalRelationFactory";

const DEFAULT_PREDICATE = () => true;

class SpinalNode extends globalType.Model {
  /**
   * Constructor for the SpinalNode class.
   * @param {string} name Name of the node
   * @param {string} type Type of the node
   * @param {SpinalNode | Model} element Element of the node
   * @throws {TypeError} If the element is not a Model
   */
  constructor(name = "undefined", type = "SpinalNode", element) {
    super();

    this.add_attr({
      info: {
        id: guid(this.constructor.name),
        name: name,
        type: type
      },
      parents: new SpinalMap(),
      children: new SpinalMap(),
      element: element !== undefined ? new SpinalNodePointer(element) : undefined,
      contextIds: new SpinalSet()
    });
  }

  /**
   * Returns the id.
   * @returns {Str} Id of the node
   */
  getId() {
    return this.info.id;
  }

  /**
   * Returns the name.
   * @returns {Str} Name of the node
   */
  getName() {
    return this.info.name;
  }

  /**
   * Returns the type.
   * @returns {Str} Type of the node
   */
  getType() {
    return this.info.type;
  }

  /**
   * Returns the element.
   * @returns {Promise<*>} A promise where the parameter of the resolve method is the element
   */
  getElement() {
    if (this.element === undefined) {
      this.element = new SpinalNodePointer(new globalType.Model());
    }

    return this.element.load();
  }

  /**
   * Returns all the children ids in an array.
   * @returns {Array<String>} Ids of the children
   */
  getChildrenIds() {
    const nodeChildrenIds = [];

    for (let relationMap of this.children) {
      for (let relation of relationMap) {
        let relChildrenIds = relation.getChildrenIds();

        for (let i = 0; i < relChildrenIds.length; i++) {
          nodeChildrenIds.push(relChildrenIds[i]);
        }
      }
    }
    return nodeChildrenIds;
  }

  /**
   * Computes and returns the number of children of the node.
   * @returns {Number} The number of children
   */
  getNbChildren() {
    let childrenIds = this.getChildrenIds();

    return childrenIds.length;
  }

  /**
   * Adds an id to the context ids of the node.
   * @param {string} id Id of the context
   * @throws {TypeError} If the id is not a string
   */
  addContextId(id) {
    if (typeof id !== "string") {
      throw TypeError("id must be a string");
    }

    if (!this.contextIds.has(id)) {
      this.contextIds.add(id);
    }
  }

  /**
   * Returns a list of the contexts the node is associated to.
   * @returns {Array<String>} An array of ids of the associated contexts
   */
  getContextIds() {
    return this.contextIds.values();
  }

  /**
   * Returns true if the node belongs to the context.
   * @param {SpinalContext} context The context that might own the node
   * @returns {Boolean} A boolean
   * @throws {TypeError} If context is not a SpinalContext
   */
  belongsToContext(context) {
    if (!(context instanceof SpinalContext)) {
      throw TypeError("context must be a SpinalContext");
    }

    return this.contextIds.has(context.getId().get());
  }

  /**
   * Verify if the node contains the relation name.
   * @param {string} relationName Name of the relation
   * @param {string} relationType Type of the relation
   * @returns {Boolean} Return true is the relation is contained in the node and false otherwise.
   * @throws {TypeError} If the relation name is not a string
   * @throws {Error} If the relation type doesn't exist
   */
  hasRelation(relationName, relationType) {
    if (typeof relationName !== "string") {
      throw TypeError("the relation name must be a string");
    }

    if (!RELATION_TYPE_LIST.includes(relationType)) {
      throw Error("invalid relation type");
    }

    const typeMap = this._getChildrenType(relationType);

    if (typeof typeMap === "undefined") {
      return false;
    }

    return typeMap.has(relationName);
  }

  /**
   * Verify if the node contains all the relation names.
   * @param {Array<String>} relationNames Array containing all the relation name
   * @param {string} relationType Type of the relations
   * @returns {Boolean} Return true if the node contains all the relations in relationNames, false otherwise.
   * @throws {TypeError} If the relation names are not in an array
   * @throws {TypeError} If one of the relation names is not a string
   * @throws {Error} If the relation type doesn't exist
   */
  hasRelations(relationNames, relationType) {
    if (!Array.isArray(relationNames)) {
      throw TypeError("The relation names must be in an array");
    }

    if (!RELATION_TYPE_LIST.includes(relationType)) {
      throw Error("invalid relation type");
    }

    for (let relationName of relationNames) {
      if (!this.hasRelation(relationName, relationType)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Returns all the relation names of the node.
   * @returns {Array<String>} The names of the relations of the node
   */
  getRelationNames() {
    const names = [];

    for (let relationMap of this.children) {
      names.push(...relationMap.keys());
    }

    // Removes all duplicates
    return Array.from(new Set(names));
  }

  /**
   * Add the node as child of the relation.
   * @param {SpinalNode | Model} child Element to add as child
   * @param {string} relationName Name of the relation
   * @param {string} relationType Type of the relation
   * @returns {Promise<SpinalNode>} The child node in a promise
   * @throws {TypeError} If the child is not a model
   * @throws {TypeError} If the relation name is not a string
   * @throws {Error} If the relation type is invalid
   */
  async addChild(child, relationName, relationType) {
    let relation;

    if (!(child instanceof globalType.Model)) {
      throw TypeError(
        "Cannot add a child witch is not an instance of SpinalNode or Model."
      );
    } else if (!(child instanceof SpinalNode)) {
      child = new SpinalNode(undefined, undefined, child);
    }

    if (!this.hasRelation(relationName, relationType)) {
      relation = this._createRelation(relationName, relationType);
    } else {
      relation = this._getRelation(relationName, relationType);
    }

    await relation.addChild(child);
    return child;
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
  async addChildInContext(child, relationName, relationType, context) {
    let relation;

    if (!(context instanceof SpinalContext)) {
      throw TypeError("context must be a SpinaContext");
    }

    if (!(child instanceof globalType.Model)) {
      throw TypeError(
        "Cannot add a child witch is not an instance of SpinalNode or Model."
      );
    } else if (!(child instanceof SpinalNode)) {
      child = new SpinalNode(undefined, undefined, child);
    }

    if (!this.hasRelation(relationName, relationType)) {
      relation = this._createRelation(relationName, relationType);
    } else {
      relation = this._getRelation(relationName, relationType);
    }

    child.addContextId(context.getId().get());
    relation.addContextId(context.getId().get());

    await relation.addChild(child);
    return child;
  }

  /**
   * Removes the node from the relation children.
   * @param {SpinalNode} node Node to remove
   * @param {string} relationName Name of the relation to wich the node belongs
   * @param {string} relationType Type of the relation to wich the node belongs
   * @returns {Promise<nothing>} An empty promise
   * @throws {TypeError} If relation name is not a string
   * @throws {Error} If relation type is invalid
   * @throws {Error} If relation doesn't exist
   * @throws {Error} If the child doesn't exist
   */
  removeChild(node, relationName, relationType) {
    if (!this.hasRelation(relationName, relationType)) {
      throw Error("The relation doesn't exist");
    }

    const rel = this._getRelation(relationName, relationType);
    return rel.removeChild(node);
  }

  /**
   * Removes children with the relation names.
   * @param {Array<String> | String | undefined} relationNames Names of the relations to empty
   * @returns {Promise<Array<Boolean>>} A promise containing an array of boolean
   * @throws {TypeError} If relationNames is neither an array, a string or omitted
   * @throws {TypeError} If an element of relationNames is not a string
   */
  async removeChildren(relationNames) {
    if (Array.isArray(relationNames)) {
      if (relationNames.length === 0) {
        relationNames = this.getRelationNames();
      }
    } else if (relationNames === undefined) {
      relationNames = this.getRelationNames();
    } else if (typeof relationNames === "string") {
      relationNames = [relationNames];
    } else {
      throw TypeError("relationNames must be an array, a string or omitted");
    }

    const promises = [];

    for (let relationMap of this.children) {
      for (let relationName of relationNames) {
        if (relationMap.has(relationName)) {
          const relation = relationMap.getElement(relationName);
          promises.push(relation.removeChildren());
        }
      }
    }

    await Promise.all(promises);
  }

  /**
   * Remove the node from the graph i.e remove the node from all the parent relations and remove all the children relations.
   * This operation might delete all the sub-graph under this node.
   * After this operation the node can be deleted without fear.
   * @returns {Promise<nothing>} An empty promise
   */
  async removeFromGraph() {
    await Promise.all([
      this._removeFromParents(),
      this._removeFromChildren()
    ]);
  }

  /**
   * Returns the children of the node for the relation names.
   * @param {Array<String>} relationNames Array containing the relation names of the desired children
   * @returns {Promise<Array<SpinalNode>>} The children that were found
   * @throws {TypeError} If relationNames is neither an array, a string or omitted
   * @throws {TypeError} If an element of relationNames is not a string
   */
  async getChildren(relationNames) {
    if (Array.isArray(relationNames)) {
      if (relationNames.length === 0) {
        relationNames = this.getRelationNames();
      }
    } else if (relationNames === undefined) {
      relationNames = this.getRelationNames();
    } else if (typeof relationNames === "string") {
      relationNames = [relationNames];
    } else {
      throw TypeError("relationNames must be an array, a string or omitted");
    }

    const promises = [];

    for (let relationMap of this.children) {
      for (let j = 0; j < relationNames.length; j++) {
        if (relationMap.has(relationNames[j])) {
          const relation = relationMap.getElement(relationNames[j]);
          promises.push(relation.getChildren());
        }
      }
    }

    const childrenLst = await Promise.all(promises);
    let res = [];

    for (let children of childrenLst) {
      for (let i = 0; i < children.length; i++) {
        res.push(children[i]);
      }
    }

    return res;
  }

  /**
   * Return the children of the node that are registered in the context
   * @param {SpinalContext} context Context to use for the search
   * @returns {Promise<Array<SpinalNode>>} The children that were found
   * @throws {TypeError} If the context is not a SpinalContext
   */
  async getChildrenInContext(context) {
    if (!(context instanceof SpinalContext)) {
      throw TypeError("context must be a SpinalContext");
    }

    const promises = [];

    for (let relationMap of this.children) {
      for (let relation of relationMap) {
        if (relation.belongsToContext(context)) {
          promises.push(relation.getChildrenInContext(context));
        }
      }
    }

    const childrenLst = await Promise.all(promises);
    let res = [];

    for (let children of childrenLst) {
      for (let i = 0; i < children.length; i++) {
        res.push(children[i]);
      }
    }

    return res;
  }

  /**
   * Return all parents for the relation names no matter the type of relation
   * @param {Array<String>} relationNames Array containing the relation names of the desired parents
   * @returns {Promise<Array<SpinalNode>>} Promise containing the parents that were found
   * @throws {TypeError} If the relationNames are neither an array, a string or omitted
   * @throws {TypeError} If an element of relationNames is not a string
   */
  getParents(relationNames) {
    if (Array.isArray(relationNames)) {
      if (relationNames.length === 0) {
        relationNames = this.parents.keys();
      }
    } else if (relationNames === undefined) {
      relationNames = this.parents.keys();
    } else if (typeof relationNames === "string") {
      relationNames = [relationNames];
    } else {
      throw TypeError("relationNames must be an array, a string or omitted");
    }

    const promises = [];

    for (let name of relationNames) {
      const list = this.parents.getElement(name);

      for (let i = 0; i < list.length; i++) {
        promises.push(
          list[i].load().then(relation => {
            return relation.getParent();
          })
        );
      }
    }

    return Promise.all(promises);
  }

  /**
   * Recursively finds all the children nodes for which the predicate is true.
   * @param {Array<String>} relationNames Array containing the relation names to follow
   * @param {function} predicate Function returning true if the node needs to be returned
   * @returns {Promise<Array<SpinalNode>>} The nodes that were found
   * @throws {TypeError} If the relationNames are neither an array, a string or omitted
   * @throws {TypeError} If an element of relationNames is not a string
   * @throws {TypeError} If the predicate is not a function
   */
  async find(relationNames, predicate = DEFAULT_PREDICATE) {
    if (!Array.isArray(relationNames) &&
      relationNames !== undefined &&
      typeof relationNames !== "string") {
      throw TypeError("relationNames must be an array, a string or omitted");
    }

    if (typeof predicate !== "function") {
      throw TypeError("predicate must be a function");
    }

    let seen = new Set([this]);
    let promises = [];
    let nextGen = [this];
    let currentGen = [];
    const found = [];

    while (nextGen.length) {
      currentGen = nextGen;
      promises = [];
      nextGen = [];

      for (let node of currentGen) {
        promises.push(node.getChildren(relationNames));

        if (predicate(node)) {
          found.push(node);
        }
      }

      let childrenArrays = await Promise.all(promises);

      for (let children of childrenArrays) {
        for (let child of children) {
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
   * @param {function} predicate Function returning true if the node needs to be returned
   * @returns {Promise<Array<SpinalNode>>} The nodes that were found
   */
  async findInContext(context, predicate = DEFAULT_PREDICATE) {
    if (typeof predicate !== "function") {
      throw new Error("The predicate function must be a function");
    }

    let seen = new Set([this]);
    let promises = [];
    let nextGen = [this];
    let currentGen = [];
    const found = [];

    while (nextGen.length) {
      currentGen = nextGen;
      promises = [];
      nextGen = [];

      for (let node of currentGen) {
        promises.push(node.getChildrenInContext(context));

        if (predicate(node)) {
          found.push(node);
        }
      }

      let childrenArrays = await Promise.all(promises);

      for (let children of childrenArrays) {
        for (let child of children) {
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
   * @param {Array<String>} relationNames Array containing the relation names to follow
   * @param {function} callback Function to apply to the nodes
   */
  async forEach(relationNames, callback) {
    if (typeof callback === "undefined") {
      throw Error("You must give a callback function");
    } else if (typeof callback !== "function") {
      throw new Error("The callback function must be a function");
    }

    let nodes = await this.find(relationNames);

    for (let node of nodes) {
      callback(node);
    }
  }

  /**
   * Recursively applies a function to all the children nodes in the context.
   * @param {SpinalContext} context Context to use for the search
   * @param {function} callback Function to apply to the nodes
   */
  async forEachInContext(context, callback) {
    if (typeof callback === "undefined") {
      throw Error("You must give a callback function");
    } else if (typeof callback !== "function") {
      throw new Error("The callback function must be a function");
    }

    let nodes = await this.findInContext(context);

    for (let node of nodes) {
      callback(node);
    }
  }

  /**
   * Recursively applies a function to all the children nodes and returns the results in an array.
   * @param {Array<String>} relationNames Array containing the relation names to follow
   * @param {function} callback Function to apply to the nodes
   * @returns {Promise<Array<*>>} The results of the callback for each node
   */
  async map(relationNames, callback) {
    if (typeof callback === "undefined") {
      throw Error("You must give a callback function");
    } else if (typeof callback !== "function") {
      throw new Error("The callback function must be a function");
    }

    let nodes = await this.find(relationNames);
    let results = [];

    for (let node of nodes) {
      results.push(callback(node));
    }

    return results;
  }

  /**
   * Recursively applies a function to all the children nodes in the context and returns the results in an array.
   * @param {SpinalContext} context Context to use for the search
   * @param {function} callback Function to apply to the nodes
   * @returns {Promise<Array<*>>} The results of the callback for each node
   */
  async mapInContext(context, callback) {
    if (typeof callback === "undefined") {
      throw Error("You must give a callback function");
    } else if (typeof callback !== "function") {
      throw new Error("The callback function must be a function");
    }

    let nodes = await this.findInContext(context);
    let results = [];

    for (let node of nodes) {
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
  _getChildrenType(relationType) {
    return this.children.getElement(relationType);
  }

  /**
   * Return the relation corresponding.
   * @param {string} relationName Name of the relation
   * @param {string} relationType Type of the relation
   * @returns {SpinalRelation} The relation corresponding
   * @private
   */
  _getRelation(relationName, relationType) {
    return this._getChildrenType(relationType).getElement(relationName);
  }

  /**
   * Removes a parent relation of the node.
   * @param {SpinalRelation} relation Relation to remove
   * @private
   */
  _removeParent(relation) {
    const parentLst = this.parents.getElement(relation.getName().get());

    const indexToRemove = parentLst.indexOf(
      parentPtr => parentPtr.getId().get() === relation.getId().get()
    );

    parentLst.splice(indexToRemove);
  }

  /**
   * Removes the node from all parent relation the property parents.
   * @private
   */
  async _removeFromParents() {
    const promises = [];

    for (let parent of this.parents) {
      for (let i = 0; i < parent.length; i++) {
        parent[i].load().then(parentRel => {
          promises.push(parentRel.removeChild(this));
        });
      }
    }
    await Promise.all(promises);
  }

  /**
   * Adds the relation as parent of the node.
   * @param {SpinalRelation} relation Parent relation
   * @private
   */
  _addParent(relation) {
    const relationName = relation.getName().get();

    if (this.parents.has(relationName)) {
      this.parents
        .getElement(relationName)
        .push(new SpinalNodePointer(relation));
    } else {
      const list = new globalType.Lst();
      list.push(new SpinalNodePointer(relation));
      this.parents.setElement(relationName, list);
    }
  }

  /**
   * Create a new relation for this node.
   * @param {string} relationName Name of the relation
   * @param {string} relationType Type of the relation
   * @private
   */
  _createRelation(relationName, relationType) {
    const relation = SpinalRelationFactory.getNewRelation(
      this,
      relationName,
      relationType
    );

    if (!this.children.has(relationType)) {
      this.children.setElement(relationType, new SpinalMap());
    }

    this._getChildrenType(relationType).setElement(relationName, relation);
    return relation;
  }

  /**
   * Remove all children relation from the graph.
   * @returns {Promise<nothing>} An empty promise
   * @private
   */
  async _removeFromChildren() {
    const promises = [];

    for (let relationMap of this.children) {
      for (let relation of relationMap) {
        promises.push(relation.removeFromGraph());
      }
    }
    await Promise.all(promises);
  }
}

spinalCore.register_models([SpinalNode]);
export default SpinalNode;
