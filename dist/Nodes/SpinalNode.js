"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpinalNode = exports.DEFAULT_FINDONE_PREDICATE = exports.DEFAULT_FIND_PREDICATE = void 0;
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const SpinalRelationFactory_1 = require("../Relations/SpinalRelationFactory");
const SpinalMap_1 = require("../SpinalMap");
const SpinalNodePointer_1 = require("../SpinalNodePointer");
const SpinalSet_1 = require("../SpinalSet");
const Utilities_1 = require("../Utilities");
const SpinalContext_1 = require("./SpinalContext");
const DEFAULT_FIND_PREDICATE = () => true;
exports.DEFAULT_FIND_PREDICATE = DEFAULT_FIND_PREDICATE;
const DEFAULT_FINDONE_PREDICATE = () => true;
exports.DEFAULT_FINDONE_PREDICATE = DEFAULT_FINDONE_PREDICATE;
/**
 * Node of a graph.
 * @extends Model
 * @template T extends spinal.Model = ElementType
 */
class SpinalNode extends spinal_core_connectorjs_type_1.Model {
    /**
     * Constructor for the SpinalNode class.
     * @param {string} [name="undefined"] Name of the node
     * @param {string} [type="undefined"] Type of the node
     * @param {date} [directModificationDate="undefined"] Type of the node
     * @param {date} [indirectModificationDate="undefined"] Type of the node
     * @param {spinal.Model} [element] Element of the node
     * @throws {TypeError} If the element is not a Model
     */
    constructor(name = 'undefined', type = 'SpinalNode', element) {
        super();
        if (spinal_core_connectorjs_type_1.FileSystem._sig_server === false)
            return;
        this.add_attr({
            info: {
                name,
                type,
                id: (0, Utilities_1.guid)(),
                directModificationDate: Date.now(),
                indirectModificationDate: Date.now(),
            },
            parents: new SpinalMap_1.SpinalMap(),
            children: new SpinalMap_1.SpinalMap(),
            element: element !== undefined ? new SpinalNodePointer_1.SpinalNodePointer(element) : undefined,
            contextIds: new SpinalSet_1.SpinalSet(),
        });
    }
    /**
     * Returns the id.
     * @returns {spinal.Str} Id of the node
     */
    getId() {
        return this.info.id;
    }
    /**
     * Returns the name.
     * @returns {spinal.Str} Name of the node
     */
    getName() {
        return this.info.name;
    }
    /**
     * Returns the type.
     * @returns {spinal.Str} Type of the node
     */
    getType() {
        return this.info.type;
    }
    /**
   * Returns the DirectModificationDate.
   * @returns {Date} Direct Modification Date of the node
   */
    getDirectModificationDate() {
        return this.info.directModificationDate;
    }
    /**
   * Returns the IndirectModificationDate.
   * @returns {Date} Indirect Modification Date of the node
   */
    getIndirectModificationDate() {
        return this.info.indirectModificationDate;
    }
    /**
      * Sets the value corresponding to the key.
      * @param {Date} date Key to the value
      * @throws {TypeError} If the date is not of type Date
      * @memberof SpinalNode
      */
    setIndirectModificationDate(date = Date.now()) {
        if (typeof date !== 'number') {
            throw TypeError('The date must be a number');
        }
        if (this.info.directModificationDate) {
            this.info.directModificationDate.set(date);
        }
        else
            this.info.add_attr("directModificationDate", date);
    }
    /**
    * Sets the value corresponding to the key.
    * @param {Date} date Key to the value
    * @throws {TypeError} If the date is not of type Date
    * @memberof SpinalNode
    */
    setDirectModificationDate(date = Date.now()) {
        if (typeof date !== 'number') {
            throw TypeError('The date must be a number');
        }
        if (this.info.directModificationDate) {
            this.info.directModificationDate.set(date);
        }
        else
            this.info.add_attr("directModificationDate", date);
    }
    /**
     * Returns the element. if not present will create one
     * @param {boolean} [noCreate=false] if true will not create a element and if element doesn't exist will return undefined
     * @returns {Promise<T>} A promise where the parameter of the resolve method is the element
     * @memberof SpinalNode
     */
    getElement(noCreate = false) {
        if (this.element === undefined) {
            if (noCreate === true)
                return undefined;
            const model = new spinal_core_connectorjs_type_1.Model();
            this.add_attr('element', (new SpinalNodePointer_1.SpinalNodePointer(model)));
            return Promise.resolve(model);
        }
        return this.element.load();
    }
    /**
     * Returns all the children ids in an array.
     * @returns {string[]} Ids of the children
     */
    getChildrenIds() {
        const nodeChildrenIds = [];
        for (const [, relationMap] of this.children) {
            for (const [, relation] of relationMap) {
                const relChildrenIds = relation.getChildrenIds();
                for (let i = 0; i < relChildrenIds.length; i += 1) {
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
    getNbChildren() {
        let count = 0;
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
    addContextId(id) {
        if (typeof id !== 'string') {
            throw TypeError('id must be a string');
        }
        if (!this.contextIds.has(id)) {
            this.contextIds.add(id);
            this.setDirectModificationDate();
        }
    }
    /**
     * Returns a list of the contexts the node is associated to.
     * @returns {string[]} An array of ids of the associated contexts
     */
    getContextIds() {
        return this.contextIds.values();
    }
    /**
     * Returns true if the node belongs to the context.
     * @param {SpinalContext} context The context that might own the node
     * @returns {boolean} A boolean
     * @throws {TypeError} If context is not a SpinalContext
     */
    belongsToContext(context) {
        if (!(context instanceof SpinalContext_1.SpinalContext)) {
            throw TypeError('context must be a SpinalContext');
        }
        return this.contextIds.has(context.getId().get());
    }
    /**
     * Verify if the node contains the relation name.
     * @param {string} relationName Name of the relation
     * @param {string} [relationType] Type of the relation
     * @returns {boolean} Return true is the relation is contained in the node and false otherwise.
     * @throws {TypeError} If the relation name is not a string
     * @throws {Error} If the relation type doesn't exist
     */
    hasRelation(relationName, relationType) {
        if (typeof relationName !== 'string') {
            throw TypeError('the relation name must be a string');
        }
        if (relationType) {
            if (SpinalRelationFactory_1.RELATION_TYPE_LIST.indexOf(relationType) === -1) {
                throw Error('invalid relation type');
            }
            const typeMap = this._getChildrenType(relationType);
            if (typeof typeMap === 'undefined') {
                return false;
            }
            return typeMap.has(relationName);
        }
        for (const [, relationMap] of this.children) {
            for (const [relname,] of relationMap) {
                if (relname === relationName)
                    return true;
            }
        }
        return false;
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
    hasRelations(relationNames, relationType) {
        if (!Array.isArray(relationNames)) {
            throw TypeError('The relation names must be in an array');
        }
        if (relationType && SpinalRelationFactory_1.RELATION_TYPE_LIST.indexOf(relationType) === -1) {
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
    getRelationNames() {
        const names = [];
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
    addChild(child, relationName, relationType) {
        return __awaiter(this, void 0, void 0, function* () {
            let relation;
            if (!(child instanceof spinal_core_connectorjs_type_1.Model)) {
                throw TypeError('Cannot add a child witch is not an instance of SpinalNode or Model.');
            }
            if (!this.hasRelation(relationName, relationType)) {
                relation = this._createRelation(relationName, relationType);
                this.setDirectModificationDate();
            }
            else {
                relation = this._getRelation(relationName, relationType);
            }
            //change the return way
            let res = relation.addChild(child);
            this.setDirectModificationDate();
            return res;
        });
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
    addChildInContext(child, relationName, relationType, context) {
        return __awaiter(this, void 0, void 0, function* () {
            let relation;
            let childCreate = child;
            if (!(context instanceof SpinalContext_1.SpinalContext)) {
                throw TypeError('context must be a SpinaContext');
            }
            if (!(child instanceof spinal_core_connectorjs_type_1.Model)) {
                throw TypeError('Cannot add a child witch is not an instance of SpinalNode or Model.');
            }
            else if (!(child instanceof SpinalNode)) {
                childCreate = new SpinalNode(undefined, undefined, child);
            }
            const tmpchildCreate = childCreate;
            if (!this.hasRelation(relationName, relationType)) {
                relation = this._createRelation(relationName, relationType);
            }
            else {
                relation = this._getRelation(relationName, relationType);
            }
            tmpchildCreate.addContextId(context.getId().get());
            relation.addContextId(context.getId().get());
            yield relation.addChild(tmpchildCreate);
            this.setDirectModificationDate();
            return tmpchildCreate;
        });
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
    removeChild(node, relationName, relationType) {
        if (!this.hasRelation(relationName, relationType)) {
            throw Error("The relation doesn't exist");
        }
        const rel = this._getRelation(relationName, relationType);
        let res = rel.removeChild(node);
        // change the res way
        this.setDirectModificationDate();
        return res;
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
    removeChildren(nodes, relationName, relationType) {
        if (!Array.isArray(nodes)) {
            throw TypeError('nodes must be an array');
        }
        if (!this.hasRelation(relationName, relationType)) {
            throw Error("The relation doesn't exist");
        }
        const rel = this._getRelation(relationName, relationType);
        let res = rel.removeChildren(nodes);
        // change the res way
        this.setDirectModificationDate();
        return res;
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
    removeRelation(relationName, relationType) {
        if (!this.hasRelation(relationName, relationType)) {
            throw Error("The relation doesn't exist");
        }
        const rel = this._getRelation(relationName, relationType);
        let res = rel.removeFromGraph();
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
    removeFromGraph() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all([
                this._removeFromParents(),
                this._removeFromChildren(),
            ]);
        });
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
    getChild(predicate, relationName, relationType) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof predicate !== 'function') {
                throw TypeError('the predicate must be a function');
            }
            if (!this.hasRelation(relationName, relationType)) {
                throw Error("The relation doesn't exist");
            }
            const relation = this._getRelation(relationName, relationType);
            const children = yield relation.getChildren();
            for (const child of children) {
                if (predicate(child)) {
                    return child;
                }
            }
        });
    }
    /**
     * Returns the children of the node for the relation names.
     * @param {string[]} [relationNames=[]]
     * Array containing the relation names of the desired children
     * @returns {Promise<SpinalNode[]>} The children that were found
     * @throws {TypeError} If relationNames is neither an array, a string or omitted
     * @throws {TypeError} If an element of relationNames is not a string
     */
    getChildren(relationNames = []) {
        return __awaiter(this, void 0, void 0, function* () {
            let relName = this._getValidRelations(relationNames);
            const promises = [];
            const tmpRelName = relName;
            for (const [, relationMap] of this.children) {
                for (let j = 0; j < tmpRelName.length; j += 1) {
                    if (relationMap.has(tmpRelName[j])) {
                        const relation = relationMap.getElement(tmpRelName[j]);
                        promises.push(relation.getChildren());
                    }
                }
            }
            const childrenLst = yield Promise.all(promises);
            const res = [];
            let children;
            for (children of childrenLst) {
                for (let i = 0; i < children.length; i += 1) {
                    res.push(children[i]);
                }
            }
            return res;
        });
    }
    /**
     * Return the children of the node that are registered in the context
     * @param {SpinalContext} context Context to use for the search
     * @returns {Promise<SpinalNode[]>} The children that were found
     * @throws {TypeError} If the context is not a SpinalContext
     */
    getChildrenInContext(context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(context instanceof SpinalContext_1.SpinalContext)) {
                throw TypeError('context must be a SpinalContext');
            }
            const promises = [];
            for (const [, relationMap] of this.children) {
                for (const [, relation] of relationMap) {
                    if (relation.belongsToContext(context)) {
                        promises.push(relation.getChildrenInContext(context));
                    }
                }
            }
            const childrenLst = yield Promise.all(promises);
            const res = [];
            for (const children of childrenLst) {
                for (let i = 0; i < children.length; i += 1) {
                    res.push(children[i]);
                }
            }
            return res;
        });
    }
    /**
     * Return all parents for the relation names no matter the type of relation
     * @param {(string | RegExp | (string | RegExp)[])} [relationNames=[]] Array containing the relation names of the desired parents
     * @returns {Promise<Array<SpinalNode<any>>>} Promise containing the parents that were found
     * @throws {TypeError} If the relationNames are neither an array, a string or omitted
     * @throws {TypeError} If an element of relationNames is not a string
     * @memberof SpinalNode
     */
    getParents(relationNames = []) {
        return __awaiter(this, void 0, void 0, function* () {
            const relNames = this._getValidRelations(relationNames, true);
            const prom = [];
            for (const [parentRelationName, nodeRelation] of this.parents) {
                for (const searchRelation of relNames) {
                    if (parentRelationName === searchRelation) {
                        for (var i = 0; i < nodeRelation.length; i++) {
                            prom.push((0, Utilities_1.loadParentRelation)(nodeRelation[i]));
                        }
                    }
                }
            }
            const res = yield Promise.all(prom);
            return res.filter((e) => e !== undefined);
        });
    }
    /**
   * Recursively finds and return the FIRST FOUND parent nodes for which the predicate is true
   * @param {string[]} relationNames Arry of relation
   * @param {(node)=> boolean} predicate function stop search if return true
   */
    findOneParent(relationNames = [], predicate = exports.DEFAULT_FINDONE_PREDICATE) {
        return __awaiter(this, void 0, void 0, function* () {
            if (predicate(this)) {
                return this;
            }
            const seen = new Set([this]);
            let promises = [];
            let nextGen = [this];
            let currentGen = [];
            while (nextGen.length) {
                currentGen = nextGen;
                promises = [];
                nextGen = [];
                for (const node of currentGen) {
                    promises.push(node.getParents(relationNames));
                    if (predicate(node)) {
                        return node;
                    }
                }
                const childrenArrays = yield Promise.all(promises);
                for (const children of childrenArrays) {
                    for (const child of children) {
                        if (!seen.has(child)) {
                            nextGen.push(child);
                            seen.add(child);
                        }
                    }
                }
            }
        });
    }
    /**
   * Recursively finds all the parent nodes for which the predicate is true
   * @export
   * @param {string[]} relationNames Arry of relation
   * @param {(node)=> boolean} predicate Function returning true if the node needs to be returned
   */
    findParents(relationNames = [], predicate = exports.DEFAULT_FIND_PREDICATE) {
        return __awaiter(this, void 0, void 0, function* () {
            let stop = false;
            function stopFct() {
                stop = true;
            }
            let found = [];
            const seen = new Set([this]);
            let promises = [];
            let nextGen = [this];
            let currentGen = [];
            if (predicate(this, stopFct)) {
                found.push(this);
            }
            while (!stop && nextGen.length) {
                currentGen = nextGen;
                promises = [];
                nextGen = [];
                for (const node of currentGen) {
                    promises.push(node.getParents(node, relationNames));
                    if (predicate(node, stopFct)) {
                        found.push(node);
                    }
                }
                // eslint-disable-next-line no-await-in-loop
                const childrenArrays = yield Promise.all(promises);
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
        });
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
    find(relationNames, predicate = exports.DEFAULT_FIND_PREDICATE) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(relationNames) &&
                relationNames !== undefined &&
                typeof relationNames !== 'string') {
                throw TypeError('relationNames must be an array, a string or omitted');
            }
            if (typeof predicate !== 'function') {
                throw TypeError('predicate must be a function');
            }
            let stop = false;
            function stopFct() {
                stop = true;
            }
            const seen = new Set([this]);
            let promises = [];
            let nextGen = [this];
            let currentGen = [];
            const found = [];
            while (!stop && nextGen.length) {
                currentGen = nextGen;
                promises = [];
                nextGen = [];
                for (const node of currentGen) {
                    promises.push(node.getChildren(relationNames));
                    if (predicate(node, stopFct)) {
                        found.push(node);
                    }
                }
                const childrenArrays = yield Promise.all(promises);
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
        });
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
    findByType(relationNames, nodeType) {
        return this.find(relationNames, (node) => {
            return node.getType().get() === nodeType;
        });
    }
    /**
    * Recursively finds all the children nodes and classify them by type.
    * @param {string|string[]} relationNames Array containing the relation names to follow
    * @returns {Object<{types : string[], data : Object<string : SpinalNode[]>}>}
    * @throws {TypeError} If the relationNames are neither an array, a string or omitted
    * @throws {TypeError} If an element of relationNames is not a string
    * @throws {TypeError} If the predicate is not a function
    */
    browseAnClassifyByType(relationNames) {
        return __awaiter(this, void 0, void 0, function* () {
            let dataStructure = {
                types: [],
                data: {}
            };
            yield this.find(relationNames, (node) => {
                let type = node.getType().get();
                if (dataStructure.types.indexOf(type) === -1) {
                    dataStructure.types.push(type);
                }
                if (typeof dataStructure.data[type] === "undefined") {
                    dataStructure.data[type] = [];
                }
                dataStructure.data[type].push(node);
                return false;
            });
            return dataStructure;
        });
    }
    /**
     * Recursively finds all the children nodes in the context for which the predicate is true..
     * @param {SpinalContext} context Context to use for the search
     * @param {findPredicate} predicate Function returning true if the node needs to be returned
     * @returns {Promise<Array<SpinalNode>>} The nodes that were found
     * @throws {TypeError} If context is not a SpinalContext
     * @throws {TypeError} If the predicate is not a function
     */
    findInContext(context, predicate = exports.DEFAULT_FIND_PREDICATE) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof predicate !== 'function') {
                throw new Error('The predicate function must be a function');
            }
            let stop = false;
            function stopFct() {
                stop = true;
            }
            const seen = new Set([this]);
            let promises = [];
            let nextGen = [this];
            let currentGen = [];
            const found = [];
            while (!stop && nextGen.length) {
                currentGen = nextGen;
                promises = [];
                nextGen = [];
                for (const node of currentGen) {
                    promises.push(node.getChildrenInContext(context));
                    if (predicate(node, stopFct)) {
                        found.push(node);
                    }
                }
                const childrenArrays = yield Promise.all(promises);
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
        });
    }
    /**
     * Recursively finds all the children nodes in the context for which the predicate is true..
     * @param {SpinalContext} context Context to use for the search
     * @param {string} nodeType Type of node to find in children
     * @returns {Promise<Array<SpinalNode>>} The nodes that were found
     * @throws {TypeError} If context is not a SpinalContext
     * @throws {TypeError} If the predicate is not a function
     */
    findInContextByType(context, nodeType) {
        return this.findInContext(context, (node) => {
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
    browseAndClassifyByTypeInContext(context) {
        return __awaiter(this, void 0, void 0, function* () {
            let dataStructure = {
                types: [],
                data: {}
            };
            yield this.findInContext(context, (node) => {
                let type = node.getType().get();
                if (dataStructure.types.indexOf(type) === -1) {
                    dataStructure.types.push(type);
                }
                if (typeof dataStructure.data[type] === "undefined") {
                    dataStructure.data[type] = [];
                }
                dataStructure.data[type].push(node);
                return false;
            });
            return dataStructure;
        });
    }
    /**
     * Recursively applies a function to all the children nodes.
     * @param {string|string[]} relationNames Array containing the relation names to follow
     * @param {SpinalNodeForEachFunc<SpinalNode<any>>} callback Function to apply to the nodes
     * @throws {TypeError} If the relationNames are neither an array, a string or omitted
     * @throws {TypeError} If an element of relationNames is not a string
     * @throws {TypeError} If the callback is not a function
     */
    forEach(relationNames, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof callback !== 'function') {
                throw TypeError('callback must be a function');
            }
            const nodes = yield this.find(relationNames);
            for (const node of nodes) {
                callback(node);
            }
        });
    }
    /**
     * Recursively applies a function to all the children nodes in the context.
     * @param {SpinalContext} context Context to use for the search
     * @param {forEachCallback} callback Function to apply to the nodes
     * @throws {TypeError} If context is not a SpinalContext
     * @throws {TypeError} If the callback is not a function
     */
    forEachInContext(context, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof callback !== 'function') {
                throw TypeError('callback must be a function');
            }
            const nodes = yield this.findInContext(context);
            for (const node of nodes) {
                callback(node);
            }
        });
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
    map(relationNames, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof callback !== 'function') {
                throw TypeError('The callback function must be a function');
            }
            const nodes = yield this.find(relationNames);
            const results = [];
            for (const node of nodes) {
                results.push(callback(node));
            }
            return results;
        });
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
    mapInContext(context, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof callback !== 'function') {
                throw TypeError('The callback function must be a function');
            }
            const nodes = yield this.findInContext(context);
            const results = [];
            for (const node of nodes) {
                results.push(callback(node));
            }
            return results;
        });
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
     * @protected
     */
    _getRelation(relationName, relationType) {
        return this._getChildrenType(relationType).getElement(relationName);
    }
    /**
     * Removes a parent relation of the node.
     * @param {AnySpinalRelation} relation Relation to remove
     * @protected
     */
    _removeParent(relation) {
        const parentLst = this.parents.getElement(relation.getName().get());
        for (let i = 0; i < parentLst.length; i += 1) {
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
    _removeFromParents() {
        return __awaiter(this, void 0, void 0, function* () {
            const promises = [];
            for (const [, parent] of this.parents) {
                for (let i = 0; i < parent.length; i += 1) {
                    parent[i].load().then((parentRel) => {
                        promises.push(parentRel.removeChild(this));
                    });
                }
            }
            yield Promise.all(promises);
        });
    }
    /**
     * Adds the relation as parent of the node.
     * @param {AnySpinalRelation} relation Parent relation
     * @protected
     */
    _addParent(relation) {
        const relationName = relation.getName().get();
        if (this.parents.has(relationName)) {
            this.parents
                .getElement(relationName)
                .push(new SpinalNodePointer_1.SpinalNodePointer(relation, true));
        }
        else {
            const list = new spinal_core_connectorjs_type_1.Lst();
            list.push(new SpinalNodePointer_1.SpinalNodePointer(relation, true));
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
    _createRelation(relationName, relationType) {
        const relation = SpinalRelationFactory_1.SpinalRelationFactory.getNewRelation(this, relationName, relationType);
        if (!this.children.has(relationType)) {
            this.children.setElement(relationType, new SpinalMap_1.SpinalMap());
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
    _removeFromChildren() {
        return __awaiter(this, void 0, void 0, function* () {
            const promises = [];
            for (const [, relationMap] of this.children) {
                for (const [, relation] of relationMap) {
                    promises.push(relation.removeFromGraph());
                }
            }
            yield Promise.all(promises);
        });
    }
    /**
     *
     * @param relationNames
     */
    _getValidRelations(relationNames = [], getParent = false) {
        let nodeRelations = !getParent ? this.getRelationNames() : this.parents.keys();
        if (!Array.isArray(relationNames)) {
            if (relationNames instanceof RegExp) {
                return nodeRelations.filter((relationName) => {
                    return relationName.match(relationNames);
                });
            }
            return [relationNames];
        }
        else if (Array.isArray(relationNames) && relationNames.length === 0) {
            return nodeRelations;
        }
        else if (Array.isArray(relationNames) && relationNames.length > 0) {
            return nodeRelations.filter((relationName) => {
                for (let index = 0; index < relationNames.length; index++) {
                    const regex = relationNames[index];
                    if (relationName.match(regex)) {
                        return true;
                    }
                }
                return false;
            });
        }
    }
}
exports.SpinalNode = SpinalNode;
spinal_core_connectorjs_type_1.spinalCore.register_models([SpinalNode]);
exports.default = SpinalNode;
//# sourceMappingURL=SpinalNode.js.map