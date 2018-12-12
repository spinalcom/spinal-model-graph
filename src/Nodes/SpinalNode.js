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

import spinalCore from "spinal-core-connectorjs";
import {
  guid
} from "../Utilities";
import SpinalNodePointer from "../SpinalNodePointer";

const globalType = typeof window === "undefined" ? global : window;

import {
  SpinalRelationFactory
} from "../Relations/SpinalRelationFactory";
import SpinalMap from "../SpinalMap";
import SpinalSet from "../SpinalSet";

const DEFAULT_PREDICATE = () => true;

class SpinalNode extends globalType.Model {
  /**
   * Constructor for the SpinalNode class.
   * @param {String} name Name of the node
   * @param {String} type Type of the node
   * @param {SpinalNode | Model} element Element of the node
   */
  constructor(name = "undefined", type = "SpinalNode", element = new globalType
    .Model) {
    super();
    this.add_attr({
      info: {
        id: guid(this.constructor.name),
        name: name,
        type: type,
      },
      parents: new SpinalMap(),
      children: new SpinalMap(),
      element: new SpinalNodePointer(element),
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
    return this.element.load();
  }

  /**
   * Returns all the children ids in an array.
   * @returns {Array<String>} Ids of the children
   */
  getChildrenIds() {
    let nodeChildrenIds = [];

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
   * @param {String} id Id of the context
   */
  addContextId(id) {
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
   */
  belongsToContext(context) {
    return this.contextIds.has(context.getId().get());
  }

  /**
   * Verify if the node contains the relation name.
   * @param {String} relationName Name of the relation
   * @param {String} relationType Type of the relation
   * @returns {Boolean} Return true is the relation is contained in the node and false otherwise.
   */
  hasRelation(relationName, relationType) {
    const typeMap = this._getChildrenType(relationType);

    if (typeof typeMap === "undefined") {
      return false;
    }
    return typeMap.has(relationName);
  }

  /**
   * Verify if the node contains all the relation names.
   * @param {Array<String>} relationNames Array containing all the relation name
   * @param {String} relationType Type of the relations
   * @returns {Boolean} Return true if the node contains all the relations in relationNames, false otherwise.
   */
  hasRelations(relationNames, relationType) {
    let res = true;

    for (let i = 0; i < relationNames.length && res; i++) {
      res = this.hasRelation(relationNames[i], relationType);
    }

    return res;
  }

  /**
   * Returns all the relation names of the node.
   * @returns {Array<String>} The names of the relations of the node
   * @private
   */
  getRelationNames() {
    let names = [];

    for (let relationMap of this.children) {
      names.push(...relationMap.keys());
    }
    return names;
  }

  /**
   * Add the node as child of the relation.
   * @param {SpinalNode | Model} child Element to add as child
   * @param {String} relationName Name of the relation
   * @param {String} relationType Type of the relation
   * @returns {Promise<SpinalNode>} The child node in a promise
   */
  async addChild(child, relationName, relationType) {
    let relation;

    if (!(child instanceof globalType.Model)) {
      throw new Error(
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
   * @param {String} relationName Name of the relation
   * @param {String} relationType Type of the relation
   * @param {SpinalContext} context Context to update
   * @returns {Promise<SpinalNode>} The child node in a promise
   */
  async addChildInContext(child, relationName, relationType, context) {
    let relation;

    if (!(child instanceof globalType.Model)) {
      throw new Error(
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
   * Remove the node from the relation children.
   * @param {SpinalNode} node Node to remove
   * @param {String} relationName Name of the relation to wich the node belongs
   * @param {String} relationType Type of the relation to wich the node belongs
   * @returns {Promise<nothing>} An empty promise
   */
  removeChild(node, relationName, relationType) {
    if (this.hasRelation(relationName, relationType)) {
      let rel = this._getRelation(relationName, relationType);
      rel.removeChild(node);
    }
    return Promise.resolve();
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
   */
  async getChildren(relationNames) {
    if (typeof relationNames === "undefined" || relationNames.length === 0) {
      relationNames = this.getRelationNames();
    } else if (typeof relationNames === "string") {
      relationNames = [relationNames];
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
   */
  async getChildrenInContext(context) {
    if (typeof context === "undefined") {
      throw new Error("You must give a context");
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
   */
  getParents(relationNames) {
    const promises = [];

    if (typeof relationNames === "undefined" || relationNames.length === 0) {
      relationNames = this.parents.keys();
    }
    for (let name of relationNames) {
      const list = this.parents.getElement(name);

      for (let i = 0; i < list.length; i++) {
        promises.push(list[i].load().then(relation => {
          return relation.getParent();
        }));
      }
    }
    return Promise.all(promises);
  }

  /**
   * Recursively finds all the children nodes for which the predicate is true.
   * @param {Array<String>} relationNames Array containing the relation names to follow
   * @param {function} predicate Function returning true if the node needs to be returned
   * @returns {Promise<Array<SpinalNode>>} The nodes that were found
   */
  async find(relationNames, predicate = DEFAULT_PREDICATE) {
    if (typeof predicate !== "function") {
      throw new Error("predicate must be a function");
    }

    let seen = new Set([this]);
    let promises = [];
    let nextGen = [this];
    let currentGen = [];
    let found = [];

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
    let found = [];

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
   * @param {String} relationType Type of the relation
   * @returns {SpinalMap} Return the relation list corresponding to the relation type
   * @private
   */
  _getChildrenType(relationType) {
    return this.children.getElement(relationType);
  }

  /**
   * Return the relation corresponding.
   * @param {String} relationName Name of the relation
   * @param {String} relationType Type of the relation
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

    const indexTORemove = parentLst.indexOf(parentPtr =>
      parentPtr.getId().get() === relation.getId().get()
    );

    parentLst.splice(indexTORemove);
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
    const relationName = relation.getName();

    if (this.parents.has(relationName.get())) {
      this.parents.getElement(relationName).push(new SpinalNodePointer(
        relation));
    } else {
      const list = new globalType.Lst();
      list.push(new SpinalNodePointer(relation));
      this.parents.setElement(relationName, list);
    }
  }

  /**
   * Create a new relation for this node.
   * @param {String} relationName Name of the relation
   * @param {String} relationType Type of the relation
   * @private
   */
  _createRelation(relationName, relationType) {
    const relation = SpinalRelationFactory.getNewRelation(relationName,
      relationType);
    relation.setParent(this);

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
