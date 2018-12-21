"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _spinalCoreConnectorjs_type = require("spinal-core-connectorjs_type");

var _Utilities = require("../Utilities");

var _index = require("../index");

var _SpinalNodePointer = _interopRequireDefault(require("../SpinalNodePointer"));

var _SpinalRelationFactory = require("../Relations/SpinalRelationFactory");

var _SpinalMap = _interopRequireDefault(require("../SpinalMap"));

var _SpinalSet = _interopRequireDefault(require("../SpinalSet"));

var _SpinalRelationFactory2 = require("../../build/Relations/SpinalRelationFactory");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

const DEFAULT_PREDICATE = () => true;
/**
 * Node of a graph.
 * @extends Model
 */


class SpinalNode extends _spinalCoreConnectorjs_type.Model {
  /**
   * Constructor for the SpinalNode class.
   * @param {string} [name="undefined"] Name of the node
   * @param {string} [type="undefined"] Type of the node
   * @param {SpinalNode | Model} [element] Element of the node
   * @throws {TypeError} If the element is not a Model
   */
  constructor(name = "undefined", type = "SpinalNode", element) {
    super();
    this.add_attr({
      info: {
        id: (0, _Utilities.guid)(this.constructor.name),
        name: name,
        type: type
      },
      parents: new _SpinalMap.default(),
      children: new _SpinalMap.default(),
      element: element !== undefined ? new _SpinalNodePointer.default(element) : undefined,
      contextIds: new _SpinalSet.default()
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
      this.element = new _SpinalNodePointer.default(new _spinalCoreConnectorjs_type.Model());
    }

    return this.element.load();
  }
  /**
   * Returns all the children ids in an array.
   * @returns {Array<String>} Ids of the children
   */


  getChildrenIds() {
    const nodeChildrenIds = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = this.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        let _step$value = _slicedToArray(_step.value, 2),
            relationMap = _step$value[1];

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = relationMap[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            let _step2$value = _slicedToArray(_step2.value, 2),
                relation = _step2$value[1];

            let relChildrenIds = relation.getChildrenIds();

            for (let i = 0; i < relChildrenIds.length; i++) {
              nodeChildrenIds.push(relChildrenIds[i]);
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
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
   * @returns {boolean} A boolean
   * @throws {TypeError} If context is not a SpinalContext
   */


  belongsToContext(context) {
    if (!(context instanceof _index.SpinalContext)) {
      throw TypeError("context must be a SpinalContext");
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


  hasRelation(relationName, relationType) {
    if (typeof relationName !== "string") {
      throw TypeError("the relation name must be a string");
    }

    if (!_SpinalRelationFactory2.RELATION_TYPE_LIST.includes(relationType)) {
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
   * @returns {boolean} Return true if the node contains all the relations in relationNames, false otherwise.
   * @throws {TypeError} If the relation names are not in an array
   * @throws {TypeError} If one of the relation names is not a string
   * @throws {Error} If the relation type doesn't exist
   */


  hasRelations(relationNames, relationType) {
    if (!Array.isArray(relationNames)) {
      throw TypeError("The relation names must be in an array");
    }

    if (!_SpinalRelationFactory2.RELATION_TYPE_LIST.includes(relationType)) {
      throw Error("invalid relation type");
    }

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = relationNames[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        let relationName = _step3.value;

        if (!this.hasRelation(relationName, relationType)) {
          return false;
        }
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
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
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = this.children[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        let _step4$value = _slicedToArray(_step4.value, 2),
            relationMap = _step4$value[1];

        names.push(...relationMap.keys());
      } // Removes all duplicates

    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }

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


  addChild(child, relationName, relationType) {
    var _this = this;

    return _asyncToGenerator(function* () {
      let relation;

      if (!(child instanceof _spinalCoreConnectorjs_type.Model)) {
        throw TypeError("Cannot add a child witch is not an instance of SpinalNode or Model.");
      } else if (!(child instanceof SpinalNode)) {
        child = new SpinalNode(undefined, undefined, child);
      }

      if (!_this.hasRelation(relationName, relationType)) {
        relation = _this._createRelation(relationName, relationType);
      } else {
        relation = _this._getRelation(relationName, relationType);
      }

      yield relation.addChild(child);
      return child;
    })();
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
    var _this2 = this;

    return _asyncToGenerator(function* () {
      let relation;

      if (!(context instanceof _index.SpinalContext)) {
        throw TypeError("context must be a SpinaContext");
      }

      if (!(child instanceof _spinalCoreConnectorjs_type.Model)) {
        throw TypeError("Cannot add a child witch is not an instance of SpinalNode or Model.");
      } else if (!(child instanceof SpinalNode)) {
        child = new SpinalNode(undefined, undefined, child);
      }

      if (!_this2.hasRelation(relationName, relationType)) {
        relation = _this2._createRelation(relationName, relationType);
      } else {
        relation = _this2._getRelation(relationName, relationType);
      }

      child.addContextId(context.getId().get());
      relation.addContextId(context.getId().get());
      yield relation.addChild(child);
      return child;
    })();
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
   * Removes children in the given relation.
   * @param {Array<SpinalNode>} nodes Nodes to delete
   * @param {string} relationName Name of the relation
   * @param {string} relationType Type of the relation
   * @returns {Promise<nothing>} An empty promise
   * @throws {TypeError} If nodes is not an array
   * @throws {TypeError} If an element of nodes is not a SpinalNode
   * @throws {TypeError} If relation name is not a string
   * @throws {Error} If relation type is invalid
   * @throws {Error} If the relation doesn't exist
   * @throws {Error} If one of the nodes is not a child
   */


  removeChildren(nodes, relationName, relationType) {
    if (!Array.isArray(nodes)) {
      throw TypeError("nodes must be an array");
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
   * @returns {Promise<nothing>} An empty promise
   * @throws {TypeError} If the relationName is not a string
   * @throws {Error} If the relationType is invalid
   * @throws {Error} If the relation doesn't exist
   */


  removeRelation(relationName, relationType) {
    if (!this.hasRelation(relationName, relationType)) {
      throw Error("The relation doesn't exist");
    }

    const rel = this._getRelation(relationName, relationType);

    return rel.removeFromGraph();
  }
  /**
   * Remove the node from the graph i.e remove the node from all the parent relations and remove all the children relations.
   * This operation might delete all the sub-graph under this node.
   * After this operation the node can be deleted without fear.
   * @returns {Promise<nothing>} An empty promise
   */


  removeFromGraph() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      yield Promise.all([_this3._removeFromParents(), _this3._removeFromChildren()]);
    })();
  }
  /**
   * A function that takes a node and returns a boolean.
   * @callback getChildPredicate
   * @param {SpinalNode} node
   * @returns {boolean}
   */

  /**
   * Returns the first child in the given relation for which the predicate is true.
   * @param {getChildPredicate} predicate Functions that takes a node and returns a boolean
   * @param {string} relationName Name of the relation
   * @param {string} relationType Type of the relation
   * @returns {SpinalNode | undefined} The first child for which the predicate is true or undefined
   * @throws {TypeError} If predicate is not a function
   * @throws {TypeError} If relation name is not a string
   * @throws {Error} If relation type is invalid
   * @throws {Error} If relation doesn't exist
   */


  getChild(predicate, relationName, relationType) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      if (typeof predicate !== "function") {
        throw TypeError("the predicate must be a function");
      }

      if (!_this4.hasRelation(relationName, relationType)) {
        throw Error("The relation doesn't exist");
      }

      const relation = _this4._getRelation(relationName, relationType);

      const children = yield relation.getChildren();
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = children[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          let child = _step5.value;

          if (predicate(child)) {
            return child;
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }
    })();
  }
  /**
   * Returns the children of the node for the relation names.
   * @param {Array<String>} [relationNames=[]] Array containing the relation names of the desired children
   * @returns {Promise<Array<SpinalNode>>} The children that were found
   * @throws {TypeError} If relationNames is neither an array, a string or omitted
   * @throws {TypeError} If an element of relationNames is not a string
   */


  getChildren(relationNames = []) {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      if (Array.isArray(relationNames)) {
        if (relationNames.length === 0) {
          relationNames = _this5.getRelationNames();
        }
      } else if (typeof relationNames === "string") {
        relationNames = [relationNames];
      } else {
        throw TypeError("relationNames must be an array, a string or omitted");
      }

      const promises = [];
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = _this5.children[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          let _step6$value = _slicedToArray(_step6.value, 2),
              relationMap = _step6$value[1];

          for (let j = 0; j < relationNames.length; j++) {
            if (relationMap.has(relationNames[j])) {
              const relation = relationMap.getElement(relationNames[j]);
              promises.push(relation.getChildren());
            }
          }
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      const childrenLst = yield Promise.all(promises);
      let res = [];
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = childrenLst[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          let children = _step7.value;

          for (let i = 0; i < children.length; i++) {
            res.push(children[i]);
          }
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7.return != null) {
            _iterator7.return();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      return res;
    })();
  }
  /**
   * Return the children of the node that are registered in the context
   * @param {SpinalContext} context Context to use for the search
   * @returns {Promise<Array<SpinalNode>>} The children that were found
   * @throws {TypeError} If the context is not a SpinalContext
   */


  getChildrenInContext(context) {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      if (!(context instanceof _index.SpinalContext)) {
        throw TypeError("context must be a SpinalContext");
      }

      const promises = [];
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = _this6.children[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          let _step8$value = _slicedToArray(_step8.value, 2),
              relationMap = _step8$value[1];

          var _iteratorNormalCompletion10 = true;
          var _didIteratorError10 = false;
          var _iteratorError10 = undefined;

          try {
            for (var _iterator10 = relationMap[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
              let _step10$value = _slicedToArray(_step10.value, 2),
                  relation = _step10$value[1];

              if (relation.belongsToContext(context)) {
                promises.push(relation.getChildrenInContext(context));
              }
            }
          } catch (err) {
            _didIteratorError10 = true;
            _iteratorError10 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion10 && _iterator10.return != null) {
                _iterator10.return();
              }
            } finally {
              if (_didIteratorError10) {
                throw _iteratorError10;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8.return != null) {
            _iterator8.return();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      const childrenLst = yield Promise.all(promises);
      let res = [];
      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = childrenLst[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          let children = _step9.value;

          for (let i = 0; i < children.length; i++) {
            res.push(children[i]);
          }
        }
      } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion9 && _iterator9.return != null) {
            _iterator9.return();
          }
        } finally {
          if (_didIteratorError9) {
            throw _iteratorError9;
          }
        }
      }

      return res;
    })();
  }
  /**
   * Return all parents for the relation names no matter the type of relation
   * @param {Array<String>} [relationNames=[]] Array containing the relation names of the desired parents
   * @returns {Promise<Array<SpinalNode>>} Promise containing the parents that were found
   * @throws {TypeError} If the relationNames are neither an array, a string or omitted
   * @throws {TypeError} If an element of relationNames is not a string
   */


  getParents(relationNames = []) {
    if (Array.isArray(relationNames)) {
      if (relationNames.length === 0) {
        relationNames = this.parents.keys();
      }
    } else if (typeof relationNames === "string") {
      relationNames = [relationNames];
    } else {
      throw TypeError("relationNames must be an array, a string or omitted");
    }

    const promises = [];
    var _iteratorNormalCompletion11 = true;
    var _didIteratorError11 = false;
    var _iteratorError11 = undefined;

    try {
      for (var _iterator11 = relationNames[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
        let name = _step11.value;
        const list = this.parents.getElement(name);

        for (let i = 0; i < list.length; i++) {
          promises.push(list[i].load().then(relation => {
            return relation.getParent();
          }));
        }
      }
    } catch (err) {
      _didIteratorError11 = true;
      _iteratorError11 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion11 && _iterator11.return != null) {
          _iterator11.return();
        }
      } finally {
        if (_didIteratorError11) {
          throw _iteratorError11;
        }
      }
    }

    return Promise.all(promises);
  }
  /**
   * Function that takes a node as argument and returns a boolean.
   * @callback findPredicate
   * @param {SpinalNode} node
   * @returns {boolean}
   */

  /**
   * Recursively finds all the children nodes for which the predicate is true.
   * @param {Array<String>} relationNames Array containing the relation names to follow
   * @param {findPredicate} predicate Function returning true if the node needs to be returned
   * @returns {Promise<Array<SpinalNode>>} The nodes that were found
   * @throws {TypeError} If the relationNames are neither an array, a string or omitted
   * @throws {TypeError} If an element of relationNames is not a string
   * @throws {TypeError} If the predicate is not a function
   */


  find(relationNames, predicate = DEFAULT_PREDICATE) {
    var _this7 = this;

    return _asyncToGenerator(function* () {
      if (!Array.isArray(relationNames) && relationNames !== undefined && typeof relationNames !== "string") {
        throw TypeError("relationNames must be an array, a string or omitted");
      }

      if (typeof predicate !== "function") {
        throw TypeError("predicate must be a function");
      }

      const seen = new Set([_this7]);
      let promises = [];
      let nextGen = [_this7];
      let currentGen = [];
      const found = [];

      while (nextGen.length) {
        currentGen = nextGen;
        promises = [];
        nextGen = [];

        for (var _i2 = 0; _i2 < currentGen.length; _i2++) {
          let node = currentGen[_i2];
          promises.push(node.getChildren(relationNames));

          if (predicate(node)) {
            found.push(node);
          }
        }

        let childrenArrays = yield Promise.all(promises);
        var _iteratorNormalCompletion12 = true;
        var _didIteratorError12 = false;
        var _iteratorError12 = undefined;

        try {
          for (var _iterator12 = childrenArrays[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
            let children = _step12.value;
            var _iteratorNormalCompletion13 = true;
            var _didIteratorError13 = false;
            var _iteratorError13 = undefined;

            try {
              for (var _iterator13 = children[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                let child = _step13.value;

                if (!seen.has(child)) {
                  nextGen.push(child);
                  seen.add(child);
                }
              }
            } catch (err) {
              _didIteratorError13 = true;
              _iteratorError13 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion13 && _iterator13.return != null) {
                  _iterator13.return();
                }
              } finally {
                if (_didIteratorError13) {
                  throw _iteratorError13;
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError12 = true;
          _iteratorError12 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion12 && _iterator12.return != null) {
              _iterator12.return();
            }
          } finally {
            if (_didIteratorError12) {
              throw _iteratorError12;
            }
          }
        }
      }

      return found;
    })();
  }
  /**
   * Recursively finds all the children nodes in the context for which the predicate is true..
   * @param {SpinalContext} context Context to use for the search
   * @param {findPredicate} predicate Function returning true if the node needs to be returned
   * @returns {Promise<Array<SpinalNode>>} The nodes that were found
   * @throws {TypeError} If context is not a SpinalContext
   * @throws {TypeError} If the predicate is not a function
   */


  findInContext(context, predicate = DEFAULT_PREDICATE) {
    var _this8 = this;

    return _asyncToGenerator(function* () {
      if (typeof predicate !== "function") {
        throw new Error("The predicate function must be a function");
      }

      const seen = new Set([_this8]);
      let promises = [];
      let nextGen = [_this8];
      let currentGen = [];
      const found = [];

      while (nextGen.length) {
        currentGen = nextGen;
        promises = [];
        nextGen = [];

        for (var _i3 = 0; _i3 < currentGen.length; _i3++) {
          let node = currentGen[_i3];
          promises.push(node.getChildrenInContext(context));

          if (predicate(node)) {
            found.push(node);
          }
        }

        let childrenArrays = yield Promise.all(promises);
        var _iteratorNormalCompletion14 = true;
        var _didIteratorError14 = false;
        var _iteratorError14 = undefined;

        try {
          for (var _iterator14 = childrenArrays[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
            let children = _step14.value;
            var _iteratorNormalCompletion15 = true;
            var _didIteratorError15 = false;
            var _iteratorError15 = undefined;

            try {
              for (var _iterator15 = children[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                let child = _step15.value;

                if (!seen.has(child)) {
                  nextGen.push(child);
                  seen.add(child);
                }
              }
            } catch (err) {
              _didIteratorError15 = true;
              _iteratorError15 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion15 && _iterator15.return != null) {
                  _iterator15.return();
                }
              } finally {
                if (_didIteratorError15) {
                  throw _iteratorError15;
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError14 = true;
          _iteratorError14 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion14 && _iterator14.return != null) {
              _iterator14.return();
            }
          } finally {
            if (_didIteratorError14) {
              throw _iteratorError14;
            }
          }
        }
      }

      return found;
    })();
  }
  /**
   * Function that takes a SpinalNode and returns nothing.
   * @callback forEachCallback
   * @param {SpinalNode} node
   */

  /**
   * Recursively applies a function to all the children nodes.
   * @param {Array<String>} relationNames Array containing the relation names to follow
   * @param {forEachCallback} callback Function to apply to the nodes
   * @throws {TypeError} If the relationNames are neither an array, a string or omitted
   * @throws {TypeError} If an element of relationNames is not a string
   * @throws {TypeError} If the callback is not a function
   */


  forEach(relationNames, callback) {
    var _this9 = this;

    return _asyncToGenerator(function* () {
      if (typeof callback !== "function") {
        throw TypeError("callback must be a function");
      }

      const nodes = yield _this9.find(relationNames);
      var _iteratorNormalCompletion16 = true;
      var _didIteratorError16 = false;
      var _iteratorError16 = undefined;

      try {
        for (var _iterator16 = nodes[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
          let node = _step16.value;
          callback(node);
        }
      } catch (err) {
        _didIteratorError16 = true;
        _iteratorError16 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion16 && _iterator16.return != null) {
            _iterator16.return();
          }
        } finally {
          if (_didIteratorError16) {
            throw _iteratorError16;
          }
        }
      }
    })();
  }
  /**
   * Recursively applies a function to all the children nodes in the context.
   * @param {SpinalContext} context Context to use for the search
   * @param {forEachCallback} callback Function to apply to the nodes
   * @throws {TypeError} If context is not a SpinalContext
   * @throws {TypeError} If the callback is not a function
   */


  forEachInContext(context, callback) {
    var _this10 = this;

    return _asyncToGenerator(function* () {
      if (typeof callback !== "function") {
        throw TypeError("callback must be a function");
      }

      const nodes = yield _this10.findInContext(context);
      var _iteratorNormalCompletion17 = true;
      var _didIteratorError17 = false;
      var _iteratorError17 = undefined;

      try {
        for (var _iterator17 = nodes[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
          let node = _step17.value;
          callback(node);
        }
      } catch (err) {
        _didIteratorError17 = true;
        _iteratorError17 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion17 && _iterator17.return != null) {
            _iterator17.return();
          }
        } finally {
          if (_didIteratorError17) {
            throw _iteratorError17;
          }
        }
      }
    })();
  }
  /**
   * Function that takes a SpinalNode and returns a result.
   * @callback mapCallback
   * @param {SpinalNode} node
   * @returns {*}
   */

  /**
   * Recursively applies a function to all the children nodes and returns the results in an array.
   * @param {Array<String>} relationNames Array containing the relation names to follow
   * @param {function} callback Function to apply to the nodes
   * @returns {Promise<Array<*>>} The results of the callback for each node
   * @throws {TypeError} If the relationNames are neither an array, a string or omitted
   * @throws {TypeError} If an element of relationNames is not a string
   * @throws {TypeError} If the callback is not a function
   */


  map(relationNames, callback) {
    var _this11 = this;

    return _asyncToGenerator(function* () {
      if (typeof callback !== "function") {
        throw TypeError("The callback function must be a function");
      }

      const nodes = yield _this11.find(relationNames);
      const results = [];
      var _iteratorNormalCompletion18 = true;
      var _didIteratorError18 = false;
      var _iteratorError18 = undefined;

      try {
        for (var _iterator18 = nodes[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
          let node = _step18.value;
          results.push(callback(node));
        }
      } catch (err) {
        _didIteratorError18 = true;
        _iteratorError18 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion18 && _iterator18.return != null) {
            _iterator18.return();
          }
        } finally {
          if (_didIteratorError18) {
            throw _iteratorError18;
          }
        }
      }

      return results;
    })();
  }
  /**
   * Recursively applies a function to all the children nodes in the context and returns the results in an array.
   * @param {SpinalContext} context Context to use for the search
   * @param {function} callback Function to apply to the nodes
   * @returns {Promise<Array<*>>} The results of the callback for each node
   * @throws {TypeError} If context is not a SpinalContext
   * @throws {TypeError} If the callback is not a function
   */


  mapInContext(context, callback) {
    var _this12 = this;

    return _asyncToGenerator(function* () {
      if (typeof callback !== "function") {
        throw TypeError("The callback function must be a function");
      }

      const nodes = yield _this12.findInContext(context);
      const results = [];
      var _iteratorNormalCompletion19 = true;
      var _didIteratorError19 = false;
      var _iteratorError19 = undefined;

      try {
        for (var _iterator19 = nodes[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
          let node = _step19.value;
          results.push(callback(node));
        }
      } catch (err) {
        _didIteratorError19 = true;
        _iteratorError19 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion19 && _iterator19.return != null) {
            _iterator19.return();
          }
        } finally {
          if (_didIteratorError19) {
            throw _iteratorError19;
          }
        }
      }

      return results;
    })();
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

    for (let i = 0; i < parentLst.length; i++) {
      if (parentLst[i].getId().get() === relation.getId().get()) {
        parentLst.splice(i);
        break;
      }
    }
  }
  /**
   * Removes the node from all parent relation the property parents.
   * @private
   */


  _removeFromParents() {
    var _this13 = this;

    return _asyncToGenerator(function* () {
      const promises = [];
      var _iteratorNormalCompletion20 = true;
      var _didIteratorError20 = false;
      var _iteratorError20 = undefined;

      try {
        for (var _iterator20 = _this13.parents[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
          let _step20$value = _slicedToArray(_step20.value, 2),
              parent = _step20$value[1];

          for (let i = 0; i < parent.length; i++) {
            parent[i].load().then(parentRel => {
              promises.push(parentRel.removeChild(_this13));
            });
          }
        }
      } catch (err) {
        _didIteratorError20 = true;
        _iteratorError20 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion20 && _iterator20.return != null) {
            _iterator20.return();
          }
        } finally {
          if (_didIteratorError20) {
            throw _iteratorError20;
          }
        }
      }

      yield Promise.all(promises);
    })();
  }
  /**
   * Adds the relation as parent of the node.
   * @param {SpinalRelation} relation Parent relation
   * @private
   */


  _addParent(relation) {
    const relationName = relation.getName().get();

    if (this.parents.has(relationName)) {
      this.parents.getElement(relationName).push(new _SpinalNodePointer.default(relation));
    } else {
      const list = new _spinalCoreConnectorjs_type.Lst();
      list.push(new _SpinalNodePointer.default(relation));
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
    const relation = _SpinalRelationFactory.SpinalRelationFactory.getNewRelation(this, relationName, relationType);

    if (!this.children.has(relationType)) {
      this.children.setElement(relationType, new _SpinalMap.default());
    }

    this._getChildrenType(relationType).setElement(relationName, relation);

    return relation;
  }
  /**
   * Remove all children relation from the graph.
   * @returns {Promise<nothing>} An empty promise
   * @private
   */


  _removeFromChildren() {
    var _this14 = this;

    return _asyncToGenerator(function* () {
      const promises = [];
      var _iteratorNormalCompletion21 = true;
      var _didIteratorError21 = false;
      var _iteratorError21 = undefined;

      try {
        for (var _iterator21 = _this14.children[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
          let _step21$value = _slicedToArray(_step21.value, 2),
              relationMap = _step21$value[1];

          var _iteratorNormalCompletion22 = true;
          var _didIteratorError22 = false;
          var _iteratorError22 = undefined;

          try {
            for (var _iterator22 = relationMap[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
              let _step22$value = _slicedToArray(_step22.value, 2),
                  relation = _step22$value[1];

              promises.push(relation.removeFromGraph());
            }
          } catch (err) {
            _didIteratorError22 = true;
            _iteratorError22 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion22 && _iterator22.return != null) {
                _iterator22.return();
              }
            } finally {
              if (_didIteratorError22) {
                throw _iteratorError22;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError21 = true;
        _iteratorError21 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion21 && _iterator21.return != null) {
            _iterator21.return();
          }
        } finally {
          if (_didIteratorError21) {
            throw _iteratorError21;
          }
        }
      }

      yield Promise.all(promises);
    })();
  }

}

_spinalCoreConnectorjs_type.spinalCore.register_models([SpinalNode]);

var _default = SpinalNode;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Ob2Rlcy9TcGluYWxOb2RlLmpzIl0sIm5hbWVzIjpbIkRFRkFVTFRfUFJFRElDQVRFIiwiU3BpbmFsTm9kZSIsIk1vZGVsIiwiY29uc3RydWN0b3IiLCJuYW1lIiwidHlwZSIsImVsZW1lbnQiLCJhZGRfYXR0ciIsImluZm8iLCJpZCIsInBhcmVudHMiLCJTcGluYWxNYXAiLCJjaGlsZHJlbiIsInVuZGVmaW5lZCIsIlNwaW5hbE5vZGVQb2ludGVyIiwiY29udGV4dElkcyIsIlNwaW5hbFNldCIsImdldElkIiwiZ2V0TmFtZSIsImdldFR5cGUiLCJnZXRFbGVtZW50IiwibG9hZCIsImdldENoaWxkcmVuSWRzIiwibm9kZUNoaWxkcmVuSWRzIiwicmVsYXRpb25NYXAiLCJyZWxhdGlvbiIsInJlbENoaWxkcmVuSWRzIiwiaSIsImxlbmd0aCIsInB1c2giLCJnZXROYkNoaWxkcmVuIiwiY2hpbGRyZW5JZHMiLCJhZGRDb250ZXh0SWQiLCJUeXBlRXJyb3IiLCJoYXMiLCJhZGQiLCJnZXRDb250ZXh0SWRzIiwidmFsdWVzIiwiYmVsb25nc1RvQ29udGV4dCIsImNvbnRleHQiLCJTcGluYWxDb250ZXh0IiwiZ2V0IiwiaGFzUmVsYXRpb24iLCJyZWxhdGlvbk5hbWUiLCJyZWxhdGlvblR5cGUiLCJSRUxBVElPTl9UWVBFX0xJU1QiLCJpbmNsdWRlcyIsIkVycm9yIiwidHlwZU1hcCIsIl9nZXRDaGlsZHJlblR5cGUiLCJoYXNSZWxhdGlvbnMiLCJyZWxhdGlvbk5hbWVzIiwiQXJyYXkiLCJpc0FycmF5IiwiZ2V0UmVsYXRpb25OYW1lcyIsIm5hbWVzIiwia2V5cyIsImZyb20iLCJTZXQiLCJhZGRDaGlsZCIsImNoaWxkIiwiX2NyZWF0ZVJlbGF0aW9uIiwiX2dldFJlbGF0aW9uIiwiYWRkQ2hpbGRJbkNvbnRleHQiLCJyZW1vdmVDaGlsZCIsIm5vZGUiLCJyZWwiLCJyZW1vdmVDaGlsZHJlbiIsIm5vZGVzIiwicmVtb3ZlUmVsYXRpb24iLCJyZW1vdmVGcm9tR3JhcGgiLCJQcm9taXNlIiwiYWxsIiwiX3JlbW92ZUZyb21QYXJlbnRzIiwiX3JlbW92ZUZyb21DaGlsZHJlbiIsImdldENoaWxkIiwicHJlZGljYXRlIiwiZ2V0Q2hpbGRyZW4iLCJwcm9taXNlcyIsImoiLCJjaGlsZHJlbkxzdCIsInJlcyIsImdldENoaWxkcmVuSW5Db250ZXh0IiwiZ2V0UGFyZW50cyIsImxpc3QiLCJ0aGVuIiwiZ2V0UGFyZW50IiwiZmluZCIsInNlZW4iLCJuZXh0R2VuIiwiY3VycmVudEdlbiIsImZvdW5kIiwiY2hpbGRyZW5BcnJheXMiLCJmaW5kSW5Db250ZXh0IiwiZm9yRWFjaCIsImNhbGxiYWNrIiwiZm9yRWFjaEluQ29udGV4dCIsIm1hcCIsInJlc3VsdHMiLCJtYXBJbkNvbnRleHQiLCJfcmVtb3ZlUGFyZW50IiwicGFyZW50THN0Iiwic3BsaWNlIiwicGFyZW50IiwicGFyZW50UmVsIiwiX2FkZFBhcmVudCIsIkxzdCIsInNldEVsZW1lbnQiLCJTcGluYWxSZWxhdGlvbkZhY3RvcnkiLCJnZXROZXdSZWxhdGlvbiIsInNwaW5hbENvcmUiLCJyZWdpc3Rlcl9tb2RlbHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUF3QkE7O0FBTUE7O0FBSUE7O0FBSUE7O0FBQ0E7O0FBR0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQSxNQUFNQSxpQkFBaUIsR0FBRyxNQUFNLElBQWhDO0FBRUE7Ozs7OztBQUlBLE1BQU1DLFVBQU4sU0FBeUJDLGlDQUF6QixDQUErQjtBQUM3Qjs7Ozs7OztBQU9BQyxFQUFBQSxXQUFXLENBQUNDLElBQUksR0FBRyxXQUFSLEVBQXFCQyxJQUFJLEdBQUcsWUFBNUIsRUFBMENDLE9BQTFDLEVBQW1EO0FBQzVEO0FBRUEsU0FBS0MsUUFBTCxDQUFjO0FBQ1pDLE1BQUFBLElBQUksRUFBRTtBQUNKQyxRQUFBQSxFQUFFLEVBQUUscUJBQUssS0FBS04sV0FBTCxDQUFpQkMsSUFBdEIsQ0FEQTtBQUVKQSxRQUFBQSxJQUFJLEVB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Y0FBL0JZLFdBQStCOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUN6QyxtQ0FBeUJBLFdBQXpCLHdJQUFzQztBQUFBO0FBQUEsa0JBQTFCQyxRQUEwQjs7QUFDcENxRCxjQUFBQSxRQUFRLENBQUNqRCxJQUFULENBQWNKLFFBQVEsQ0FBQzZDLGVBQVQsRUFBZDtBQUNEO0FBSHdDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJMUM7QUFQeUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFTMUIsWUFBTUMsT0FBTyxDQUFDQyxHQUFSLENBQVlNLFFBQVosQ0FBTjtBQVQwQjtBQVUzQjs7QUFueUI0Qjs7QUFzeUIvQmdDLHVDQUFXQyxlQUFYLENBQTJCLENBQUM5RyxVQUFELENBQTNCOztlQUNlQSxVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4IFNwaW5hbENvbSAtIHd3dy5zcGluYWxjb20uY29tXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgU3BpbmFsQ29yZS5cbiAqXG4gKiBQbGVhc2UgcmVhZCBhbGwgb2YgdGhlIGZvbGxvd2luZyB0ZXJtcyBhbmQgY29uZGl0aW9uc1xuICogb2YgdGhlIEZyZWUgU29mdHdhcmUgbGljZW5zZSBBZ3JlZW1lbnQgKFwiQWdyZWVtZW50XCIpXG4gKiBjYXJlZnVsbHkuXG4gKlxuICogVGhpcyBBZ3JlZW1lbnQgaXMgYSBsZWdhbGx5IGJpbmRpbmcgY29udHJhY3QgYmV0d2VlblxuICogdGhlIExpY2Vuc2VlIChhcyBkZWZpbmVkIGJlbG93KSBhbmQgU3BpbmFsQ29tIHRoYXRcbiAqIHNldHMgZm9ydGggdGhlIHRlcm1zIGFuZCBjb25kaXRpb25zIHRoYXQgZ292ZXJuIHlvdXJcbiAqIHVzZSBvZiB0aGUgUHJvZ3JhbS4gQnkgaW5zdGFsbGluZyBhbmQvb3IgdXNpbmcgdGhlXG4gKiBQcm9ncmFtLCB5b3UgYWdyZWUgdG8gYWJpZGUgYnkgYWxsIHRoZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMgc3RhdGVkIG9yIHJlZmVyZW5jZWQgaGVyZWluLlxuICpcbiAqIElmIHlvdSBkbyBub3QgYWdyZWUgdG8gYWJpZGUgYnkgdGhlc2UgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zLCBkbyBub3QgZGVtb25zdHJhdGUgeW91ciBhY2NlcHRhbmNlIGFuZCBkb1xuICogbm90IGluc3RhbGwgb3IgdXNlIHRoZSBQcm9ncmFtLlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbG9uZ1xuICogd2l0aCB0aGlzIGZpbGUuIElmIG5vdCwgc2VlXG4gKiA8aHR0cDovL3Jlc291cmNlcy5zcGluYWxjb20uY29tL2xpY2Vuc2VzLnBkZj4uXG4gKi9cblxuaW1wb3J0IHtcbiAgc3BpbmFsQ29yZSxcbiAgTW9kZWwsXG4gIExzdFxufSBmcm9tIFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNfdHlwZVwiO1xuXG5pbXBvcnQge1xuICBndWlkXG59IGZyb20gXCIuLi9VdGlsaXRpZXNcIjtcblxuaW1wb3J0IHtcbiAgU3BpbmFsQ29udGV4dFxufSBmcm9tIFwiLi4vaW5kZXhcIjtcblxuaW1wb3J0IFNwaW5hbE5vZGVQb2ludGVyIGZyb20gXCIuLi9TcGluYWxOb2RlUG9pbnRlclwiO1xuaW1wb3J0IHtcbiAgU3BpbmFsUmVsYXRpb25GYWN0b3J5XG59IGZyb20gXCIuLi9SZWxhdGlvbnMvU3BpbmFsUmVsYXRpb25GYWN0b3J5XCI7XG5pbXBvcnQgU3BpbmFsTWFwIGZyb20gXCIuLi9TcGluYWxNYXBcIjtcbmltcG9ydCBTcGluYWxTZXQgZnJvbSBcIi4uL1NwaW5hbFNldFwiO1xuaW1wb3J0IHtcbiAgUkVMQVRJT05fVFlQRV9MSVNUXG59IGZyb20gXCIuLi8uLi9idWlsZC9SZWxhdGlvbnMvU3BpbmFsUmVsYXRpb25GYWN0b3J5XCI7XG5cbmNvbnN0IERFRkFVTFRfUFJFRElDQVRFID0gKCkgPT4gdHJ1ZTtcblxuLyoqXG4gKiBOb2RlIG9mIGEgZ3JhcGguXG4gKiBAZXh0ZW5kcyBNb2RlbFxuICovXG5jbGFzcyBTcGluYWxOb2RlIGV4dGVuZHMgTW9kZWwge1xuICAvKipcbiAgICogQ29uc3RydWN0b3IgZm9yIHRoZSBTcGluYWxOb2RlIGNsYXNzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW25hbWU9XCJ1bmRlZmluZWRcIl0gTmFtZSBvZiB0aGUgbm9kZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3R5cGU9XCJ1bmRlZmluZWRcIl0gVHlwZSBvZiB0aGUgbm9kZVxuICAgKiBAcGFyYW0ge1NwaW5hbE5vZGUgfCBNb2RlbH0gW2VsZW1lbnRdIEVsZW1lbnQgb2YgdGhlIG5vZGVcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgZWxlbWVudCBpcyBub3QgYSBNb2RlbFxuICAgKi9cbiAgY29uc3RydWN0b3IobmFtZSA9IFwidW5kZWZpbmVkXCIsIHR5cGUgPSBcIlNwaW5hbE5vZGVcIiwgZWxlbWVudCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmFkZF9hdHRyKHtcbiAgICAgIGluZm86IHtcbiAgICAgICAgaWQ6IGd1aWQodGhpcy5jb25zdHJ1Y3Rvci5uYW1lKSxcbiAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgdHlwZTogdHlwZVxuICAgICAgfSxcbiAgICAgIHBhcmVudHM6IG5ldyBTcGluYWxNYXAoKSxcbiAgICAgIGNoaWxkcmVuOiBuZXcgU3BpbmFsTWFwKCksXG4gICAgICBlbGVtZW50OiBlbGVtZW50ICE9PSB1bmRlZmluZWQgPyBuZXcgU3BpbmFsTm9kZVBvaW50ZXIoZWxlbWVudCkgOiB1bmRlZmluZWQsXG4gICAgICBjb250ZXh0SWRzOiBuZXcgU3BpbmFsU2V0KClcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBpZC5cbiAgICogQHJldHVybnMge1N0cn0gSWQgb2YgdGhlIG5vZGVcbiAgICovXG4gIGdldElkKCkge1xuICAgIHJldHVybiB0aGlzLmluZm8uaWQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbmFtZS5cbiAgICogQHJldHVybnMge1N0cn0gTmFtZSBvZiB0aGUgbm9kZVxuICAgKi9cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbmZvLm5hbWU7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdHlwZS5cbiAgICogQHJldHVybnMge1N0cn0gVHlwZSBvZiB0aGUgbm9kZVxuICAgKi9cbiAgZ2V0VHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbmZvLnR5cGU7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZWxlbWVudC5cbiAgICogQHJldHVybnMge1Byb21pc2U8Kj59IEEgcHJvbWlzZSB3aGVyZSB0aGUgcGFyYW1ldGVyIG9mIHRoZSByZXNvbHZlIG1ldGhvZCBpcyB0aGUgZWxlbWVudFxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuZWxlbWVudCA9IG5ldyBTcGluYWxOb2RlUG9pbnRlcihuZXcgTW9kZWwoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC5sb2FkKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbGwgdGhlIGNoaWxkcmVuIGlkcyBpbiBhbiBhcnJheS5cbiAgICogQHJldHVybnMge0FycmF5PFN0cmluZz59IElkcyBvZiB0aGUgY2hpbGRyZW5cbiAgICovXG4gIGdldENoaWxkcmVuSWRzKCkge1xuICAgIGNvbnN0IG5vZGVDaGlsZHJlbklkcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgWywgcmVsYXRpb25NYXBdIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgIGZvciAobGV0IFssIHJlbGF0aW9uXSBvZiByZWxhdGlvbk1hcCkge1xuICAgICAgICBsZXQgcmVsQ2hpbGRyZW5JZHMgPSByZWxhdGlvbi5nZXRDaGlsZHJlbklkcygpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVsQ2hpbGRyZW5JZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBub2RlQ2hpbGRyZW5JZHMucHVzaChyZWxDaGlsZHJlbklkc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5vZGVDaGlsZHJlbklkcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wdXRlcyBhbmQgcmV0dXJucyB0aGUgbnVtYmVyIG9mIGNoaWxkcmVuIG9mIHRoZSBub2RlLlxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgbnVtYmVyIG9mIGNoaWxkcmVuXG4gICAqL1xuICBnZXROYkNoaWxkcmVuKCkge1xuICAgIGxldCBjaGlsZHJlbklkcyA9IHRoaXMuZ2V0Q2hpbGRyZW5JZHMoKTtcblxuICAgIHJldHVybiBjaGlsZHJlbklkcy5sZW5ndGg7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhbiBpZCB0byB0aGUgY29udGV4dCBpZHMgb2YgdGhlIG5vZGUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBJZCBvZiB0aGUgY29udGV4dFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBpZCBpcyBub3QgYSBzdHJpbmdcbiAgICovXG4gIGFkZENvbnRleHRJZChpZCkge1xuICAgIGlmICh0eXBlb2YgaWQgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcImlkIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmNvbnRleHRJZHMuaGFzKGlkKSkge1xuICAgICAgdGhpcy5jb250ZXh0SWRzLmFkZChpZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBsaXN0IG9mIHRoZSBjb250ZXh0cyB0aGUgbm9kZSBpcyBhc3NvY2lhdGVkIHRvLlxuICAgKiBAcmV0dXJucyB7QXJyYXk8U3RyaW5nPn0gQW4gYXJyYXkgb2YgaWRzIG9mIHRoZSBhc3NvY2lhdGVkIGNvbnRleHRzXG4gICAqL1xuICBnZXRDb250ZXh0SWRzKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHRJZHMudmFsdWVzKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBub2RlIGJlbG9uZ3MgdG8gdGhlIGNvbnRleHQuXG4gICAqIEBwYXJhbSB7U3BpbmFsQ29udGV4dH0gY29udGV4dCBUaGUgY29udGV4dCB0aGF0IG1pZ2h0IG93biB0aGUgbm9kZVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gQSBib29sZWFuXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgY29udGV4dCBpcyBub3QgYSBTcGluYWxDb250ZXh0XG4gICAqL1xuICBiZWxvbmdzVG9Db250ZXh0KGNvbnRleHQpIHtcbiAgICBpZiAoIShjb250ZXh0IGluc3RhbmNlb2YgU3BpbmFsQ29udGV4dCkpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcImNvbnRleHQgbXVzdCBiZSBhIFNwaW5hbENvbnRleHRcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY29udGV4dElkcy5oYXMoY29udGV4dC5nZXRJZCgpLmdldCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWZXJpZnkgaWYgdGhlIG5vZGUgY29udGFpbnMgdGhlIHJlbGF0aW9uIG5hbWUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk5hbWUgTmFtZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uVHlwZSBUeXBlIG9mIHRoZSByZWxhdGlvblxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJuIHRydWUgaXMgdGhlIHJlbGF0aW9uIGlzIGNvbnRhaW5lZCBpbiB0aGUgbm9kZSBhbmQgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSByZWxhdGlvbiBuYW1lIGlzIG5vdCBhIHN0cmluZ1xuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHJlbGF0aW9uIHR5cGUgZG9lc24ndCBleGlzdFxuICAgKi9cbiAgaGFzUmVsYXRpb24ocmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpIHtcbiAgICBpZiAodHlwZW9mIHJlbGF0aW9uTmFtZSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwidGhlIHJlbGF0aW9uIG5hbWUgbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICB9XG5cbiAgICBpZiAoIVJFTEFUSU9OX1RZUEVfTElTVC5pbmNsdWRlcyhyZWxhdGlvblR5cGUpKSB7XG4gICAgICB0aHJvdyBFcnJvcihcImludmFsaWQgcmVsYXRpb24gdHlwZVwiKTtcbiAgICB9XG5cbiAgICBjb25zdCB0eXBlTWFwID0gdGhpcy5fZ2V0Q2hpbGRyZW5UeXBlKHJlbGF0aW9uVHlwZSk7XG5cbiAgICBpZiAodHlwZW9mIHR5cGVNYXAgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHlwZU1hcC5oYXMocmVsYXRpb25OYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWZXJpZnkgaWYgdGhlIG5vZGUgY29udGFpbnMgYWxsIHRoZSByZWxhdGlvbiBuYW1lcy5cbiAgICogQHBhcmFtIHtBcnJheTxTdHJpbmc+fSByZWxhdGlvbk5hbWVzIEFycmF5IGNvbnRhaW5pbmcgYWxsIHRoZSByZWxhdGlvbiBuYW1lXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvblR5cGUgVHlwZSBvZiB0aGUgcmVsYXRpb25zXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm4gdHJ1ZSBpZiB0aGUgbm9kZSBjb250YWlucyBhbGwgdGhlIHJlbGF0aW9ucyBpbiByZWxhdGlvbk5hbWVzLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIHJlbGF0aW9uIG5hbWVzIGFyZSBub3QgaW4gYW4gYXJyYXlcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBvbmUgb2YgdGhlIHJlbGF0aW9uIG5hbWVzIGlzIG5vdCBhIHN0cmluZ1xuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHJlbGF0aW9uIHR5cGUgZG9lc24ndCBleGlzdFxuICAgKi9cbiAgaGFzUmVsYXRpb25zKHJlbGF0aW9uTmFtZXMsIHJlbGF0aW9uVHlwZSkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShyZWxhdGlvbk5hbWVzKSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwiVGhlIHJlbGF0aW9uIG5hbWVzIG11c3QgYmUgaW4gYW4gYXJyYXlcIik7XG4gICAgfVxuXG4gICAgaWYgKCFSRUxBVElPTl9UWVBFX0xJU1QuaW5jbHVkZXMocmVsYXRpb25UeXBlKSkge1xuICAgICAgdGhyb3cgRXJyb3IoXCJpbnZhbGlkIHJlbGF0aW9uIHR5cGVcIik7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgcmVsYXRpb25OYW1lIG9mIHJlbGF0aW9uTmFtZXMpIHtcbiAgICAgIGlmICghdGhpcy5oYXNSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYWxsIHRoZSByZWxhdGlvbiBuYW1lcyBvZiB0aGUgbm9kZS5cbiAgICogQHJldHVybnMge0FycmF5PFN0cmluZz59IFRoZSBuYW1lcyBvZiB0aGUgcmVsYXRpb25zIG9mIHRoZSBub2RlXG4gICAqL1xuICBnZXRSZWxhdGlvbk5hbWVzKCkge1xuICAgIGNvbnN0IG5hbWVzID0gW107XG5cbiAgICBmb3IgKGxldCBbLCByZWxhdGlvbk1hcF0gb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgbmFtZXMucHVzaCguLi5yZWxhdGlvbk1hcC5rZXlzKCkpO1xuICAgIH1cblxuICAgIC8vIFJlbW92ZXMgYWxsIGR1cGxpY2F0ZXNcbiAgICByZXR1cm4gQXJyYXkuZnJvbShuZXcgU2V0KG5hbWVzKSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIHRoZSBub2RlIGFzIGNoaWxkIG9mIHRoZSByZWxhdGlvbi5cbiAgICogQHBhcmFtIHtTcGluYWxOb2RlIHwgTW9kZWx9IGNoaWxkIEVsZW1lbnQgdG8gYWRkIGFzIGNoaWxkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk5hbWUgTmFtZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uVHlwZSBUeXBlIG9mIHRoZSByZWxhdGlvblxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxTcGluYWxOb2RlPn0gVGhlIGNoaWxkIG5vZGUgaW4gYSBwcm9taXNlXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIGNoaWxkIGlzIG5vdCBhIG1vZGVsXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIHJlbGF0aW9uIG5hbWUgaXMgbm90IGEgc3RyaW5nXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcmVsYXRpb24gdHlwZSBpcyBpbnZhbGlkXG4gICAqL1xuICBhc3luYyBhZGRDaGlsZChjaGlsZCwgcmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpIHtcbiAgICBsZXQgcmVsYXRpb247XG5cbiAgICBpZiAoIShjaGlsZCBpbnN0YW5jZW9mIE1vZGVsKSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFxuICAgICAgICBcIkNhbm5vdCBhZGQgYSBjaGlsZCB3aXRjaCBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgU3BpbmFsTm9kZSBvciBNb2RlbC5cIlxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKCEoY2hpbGQgaW5zdGFuY2VvZiBTcGluYWxOb2RlKSkge1xuICAgICAgY2hpbGQgPSBuZXcgU3BpbmFsTm9kZSh1bmRlZmluZWQsIHVuZGVmaW5lZCwgY2hpbGQpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5oYXNSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSkpIHtcbiAgICAgIHJlbGF0aW9uID0gdGhpcy5fY3JlYXRlUmVsYXRpb24ocmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZWxhdGlvbiA9IHRoaXMuX2dldFJlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKTtcbiAgICB9XG5cbiAgICBhd2FpdCByZWxhdGlvbi5hZGRDaGlsZChjaGlsZCk7XG4gICAgcmV0dXJuIGNoaWxkO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjaGlsZCBhbmQgbm90aWNlcyB0aGUgY29udGV4dCBpZiBhIG5ldyByZWxhdGlvbiB3YXMgY3JlYXRlZC5cbiAgICogQHBhcmFtIHtTcGluYWxOb2RlIHwgTW9kZWx9IGNoaWxkIE5vZGUgdG8gYWRkIGFzIGNoaWxkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk5hbWUgTmFtZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uVHlwZSBUeXBlIG9mIHRoZSByZWxhdGlvblxuICAgKiBAcGFyYW0ge1NwaW5hbENvbnRleHR9IGNvbnRleHQgQ29udGV4dCB0byB1cGRhdGVcbiAgICogQHJldHVybnMge1Byb21pc2U8U3BpbmFsTm9kZT59IFRoZSBjaGlsZCBub2RlIGluIGEgcHJvbWlzZVxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBjaGlsZCBpcyBub3QgYSBtb2RlbFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSByZWxhdGlvbiBuYW1lIGlzIG5vdCBhIHN0cmluZ1xuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBjb250ZXh0IGlzIG5vdCBhIFNwaW5hbENvbnRleHRcbiAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSByZWxhdGlvbiB0eXBlIGlzIGludmFsaWRcbiAgICovXG4gIGFzeW5jIGFkZENoaWxkSW5Db250ZXh0KGNoaWxkLCByZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSwgY29udGV4dCkge1xuICAgIGxldCByZWxhdGlvbjtcblxuICAgIGlmICghKGNvbnRleHQgaW5zdGFuY2VvZiBTcGluYWxDb250ZXh0KSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwiY29udGV4dCBtdXN0IGJlIGEgU3BpbmFDb250ZXh0XCIpO1xuICAgIH1cblxuICAgIGlmICghKGNoaWxkIGluc3RhbmNlb2YgTW9kZWwpKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXG4gICAgICAgIFwiQ2Fubm90IGFkZCBhIGNoaWxkIHdpdGNoIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBTcGluYWxOb2RlIG9yIE1vZGVsLlwiXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoIShjaGlsZCBpbnN0YW5jZW9mIFNwaW5hbE5vZGUpKSB7XG4gICAgICBjaGlsZCA9IG5ldyBTcGluYWxOb2RlKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBjaGlsZCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmhhc1JlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKSkge1xuICAgICAgcmVsYXRpb24gPSB0aGlzLl9jcmVhdGVSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbGF0aW9uID0gdGhpcy5fZ2V0UmVsYXRpb24ocmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpO1xuICAgIH1cblxuICAgIGNoaWxkLmFkZENvbnRleHRJZChjb250ZXh0LmdldElkKCkuZ2V0KCkpO1xuICAgIHJlbGF0aW9uLmFkZENvbnRleHRJZChjb250ZXh0LmdldElkKCkuZ2V0KCkpO1xuXG4gICAgYXdhaXQgcmVsYXRpb24uYWRkQ2hpbGQoY2hpbGQpO1xuICAgIHJldHVybiBjaGlsZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBub2RlIGZyb20gdGhlIHJlbGF0aW9uIGNoaWxkcmVuLlxuICAgKiBAcGFyYW0ge1NwaW5hbE5vZGV9IG5vZGUgTm9kZSB0byByZW1vdmVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uTmFtZSBOYW1lIG9mIHRoZSByZWxhdGlvbiB0byB3aWNoIHRoZSBub2RlIGJlbG9uZ3NcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uVHlwZSBUeXBlIG9mIHRoZSByZWxhdGlvbiB0byB3aWNoIHRoZSBub2RlIGJlbG9uZ3NcbiAgICogQHJldHVybnMge1Byb21pc2U8bm90aGluZz59IEFuIGVtcHR5IHByb21pc2VcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiByZWxhdGlvbiBuYW1lIGlzIG5vdCBhIHN0cmluZ1xuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgcmVsYXRpb24gdHlwZSBpcyBpbnZhbGlkXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiByZWxhdGlvbiBkb2Vzbid0IGV4aXN0XG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgY2hpbGQgZG9lc24ndCBleGlzdFxuICAgKi9cbiAgcmVtb3ZlQ2hpbGQobm9kZSwgcmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpIHtcbiAgICBpZiAoIXRoaXMuaGFzUmVsYXRpb24ocmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpKSB7XG4gICAgICB0aHJvdyBFcnJvcihcIlRoZSByZWxhdGlvbiBkb2Vzbid0IGV4aXN0XCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbCA9IHRoaXMuX2dldFJlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKTtcbiAgICByZXR1cm4gcmVsLnJlbW92ZUNoaWxkKG5vZGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgY2hpbGRyZW4gaW4gdGhlIGdpdmVuIHJlbGF0aW9uLlxuICAgKiBAcGFyYW0ge0FycmF5PFNwaW5hbE5vZGU+fSBub2RlcyBOb2RlcyB0byBkZWxldGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uTmFtZSBOYW1lIG9mIHRoZSByZWxhdGlvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25UeXBlIFR5cGUgb2YgdGhlIHJlbGF0aW9uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPG5vdGhpbmc+fSBBbiBlbXB0eSBwcm9taXNlXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgbm9kZXMgaXMgbm90IGFuIGFycmF5XG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgYW4gZWxlbWVudCBvZiBub2RlcyBpcyBub3QgYSBTcGluYWxOb2RlXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgcmVsYXRpb24gbmFtZSBpcyBub3QgYSBzdHJpbmdcbiAgICogQHRocm93cyB7RXJyb3J9IElmIHJlbGF0aW9uIHR5cGUgaXMgaW52YWxpZFxuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHJlbGF0aW9uIGRvZXNuJ3QgZXhpc3RcbiAgICogQHRocm93cyB7RXJyb3J9IElmIG9uZSBvZiB0aGUgbm9kZXMgaXMgbm90IGEgY2hpbGRcbiAgICovXG4gIHJlbW92ZUNoaWxkcmVuKG5vZGVzLCByZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShub2RlcykpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcIm5vZGVzIG11c3QgYmUgYW4gYXJyYXlcIik7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmhhc1JlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKSkge1xuICAgICAgdGhyb3cgRXJyb3IoXCJUaGUgcmVsYXRpb24gZG9lc24ndCBleGlzdFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCByZWwgPSB0aGlzLl9nZXRSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSk7XG4gICAgcmV0dXJuIHJlbC5yZW1vdmVDaGlsZHJlbihub2Rlcyk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNoaWxkIHJlbGF0aW9uIG9mIHRoZSBub2RlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25OYW1lIE5hbWUgb2YgdGhlIHJlbGF0aW9uIHRvIHJlbW92ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25UeXBlIFR5cGUgb2YgdGhlIHJlbGF0aW9uIHRvIHJlbW92ZVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxub3RoaW5nPn0gQW4gZW1wdHkgcHJvbWlzZVxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSByZWxhdGlvbk5hbWUgaXMgbm90IGEgc3RyaW5nXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcmVsYXRpb25UeXBlIGlzIGludmFsaWRcbiAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSByZWxhdGlvbiBkb2Vzbid0IGV4aXN0XG4gICAqL1xuICByZW1vdmVSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSkge1xuICAgIGlmICghdGhpcy5oYXNSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSkpIHtcbiAgICAgIHRocm93IEVycm9yKFwiVGhlIHJlbGF0aW9uIGRvZXNuJ3QgZXhpc3RcIik7XG4gICAgfVxuXG4gICAgY29uc3QgcmVsID0gdGhpcy5fZ2V0UmVsYXRpb24ocmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpO1xuICAgIHJldHVybiByZWwucmVtb3ZlRnJvbUdyYXBoKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIHRoZSBub2RlIGZyb20gdGhlIGdyYXBoIGkuZSByZW1vdmUgdGhlIG5vZGUgZnJvbSBhbGwgdGhlIHBhcmVudCByZWxhdGlvbnMgYW5kIHJlbW92ZSBhbGwgdGhlIGNoaWxkcmVuIHJlbGF0aW9ucy5cbiAgICogVGhpcyBvcGVyYXRpb24gbWlnaHQgZGVsZXRlIGFsbCB0aGUgc3ViLWdyYXBoIHVuZGVyIHRoaXMgbm9kZS5cbiAgICogQWZ0ZXIgdGhpcyBvcGVyYXRpb24gdGhlIG5vZGUgY2FuIGJlIGRlbGV0ZWQgd2l0aG91dCBmZWFyLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxub3RoaW5nPn0gQW4gZW1wdHkgcHJvbWlzZVxuICAgKi9cbiAgYXN5bmMgcmVtb3ZlRnJvbUdyYXBoKCkge1xuICAgIGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21QYXJlbnRzKCksXG4gICAgICB0aGlzLl9yZW1vdmVGcm9tQ2hpbGRyZW4oKVxuICAgIF0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIG5vZGUgYW5kIHJldHVybnMgYSBib29sZWFuLlxuICAgKiBAY2FsbGJhY2sgZ2V0Q2hpbGRQcmVkaWNhdGVcbiAgICogQHBhcmFtIHtTcGluYWxOb2RlfSBub2RlXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGZpcnN0IGNoaWxkIGluIHRoZSBnaXZlbiByZWxhdGlvbiBmb3Igd2hpY2ggdGhlIHByZWRpY2F0ZSBpcyB0cnVlLlxuICAgKiBAcGFyYW0ge2dldENoaWxkUHJlZGljYXRlfSBwcmVkaWNhdGUgRnVuY3Rpb25zIHRoYXQgdGFrZXMgYSBub2RlIGFuZCByZXR1cm5zIGEgYm9vbGVhblxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25OYW1lIE5hbWUgb2YgdGhlIHJlbGF0aW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvblR5cGUgVHlwZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHJldHVybnMge1NwaW5hbE5vZGUgfCB1bmRlZmluZWR9IFRoZSBmaXJzdCBjaGlsZCBmb3Igd2hpY2ggdGhlIHByZWRpY2F0ZSBpcyB0cnVlIG9yIHVuZGVmaW5lZFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHByZWRpY2F0ZSBpcyBub3QgYSBmdW5jdGlvblxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHJlbGF0aW9uIG5hbWUgaXMgbm90IGEgc3RyaW5nXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiByZWxhdGlvbiB0eXBlIGlzIGludmFsaWRcbiAgICogQHRocm93cyB7RXJyb3J9IElmIHJlbGF0aW9uIGRvZXNuJ3QgZXhpc3RcbiAgICovXG4gIGFzeW5jIGdldENoaWxkKHByZWRpY2F0ZSwgcmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpIHtcbiAgICBpZiAodHlwZW9mIHByZWRpY2F0ZSAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJ0aGUgcHJlZGljYXRlIG11c3QgYmUgYSBmdW5jdGlvblwiKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuaGFzUmVsYXRpb24ocmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpKSB7XG4gICAgICB0aHJvdyBFcnJvcihcIlRoZSByZWxhdGlvbiBkb2Vzbid0IGV4aXN0XCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbGF0aW9uID0gdGhpcy5fZ2V0UmVsYXRpb24ocmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpXG4gICAgY29uc3QgY2hpbGRyZW4gPSBhd2FpdCByZWxhdGlvbi5nZXRDaGlsZHJlbigpO1xuXG4gICAgZm9yIChsZXQgY2hpbGQgb2YgY2hpbGRyZW4pIHtcbiAgICAgIGlmIChwcmVkaWNhdGUoY2hpbGQpKSB7XG4gICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY2hpbGRyZW4gb2YgdGhlIG5vZGUgZm9yIHRoZSByZWxhdGlvbiBuYW1lcy5cbiAgICogQHBhcmFtIHtBcnJheTxTdHJpbmc+fSBbcmVsYXRpb25OYW1lcz1bXV0gQXJyYXkgY29udGFpbmluZyB0aGUgcmVsYXRpb24gbmFtZXMgb2YgdGhlIGRlc2lyZWQgY2hpbGRyZW5cbiAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8U3BpbmFsTm9kZT4+fSBUaGUgY2hpbGRyZW4gdGhhdCB3ZXJlIGZvdW5kXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgcmVsYXRpb25OYW1lcyBpcyBuZWl0aGVyIGFuIGFycmF5LCBhIHN0cmluZyBvciBvbWl0dGVkXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgYW4gZWxlbWVudCBvZiByZWxhdGlvbk5hbWVzIGlzIG5vdCBhIHN0cmluZ1xuICAgKi9cbiAgYXN5bmMgZ2V0Q2hpbGRyZW4ocmVsYXRpb25OYW1lcyA9IFtdKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocmVsYXRpb25OYW1lcykpIHtcbiAgICAgIGlmIChyZWxhdGlvbk5hbWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZWxhdGlvbk5hbWVzID0gdGhpcy5nZXRSZWxhdGlvbk5hbWVzKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcmVsYXRpb25OYW1lcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgcmVsYXRpb25OYW1lcyA9IFtyZWxhdGlvbk5hbWVzXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwicmVsYXRpb25OYW1lcyBtdXN0IGJlIGFuIGFycmF5LCBhIHN0cmluZyBvciBvbWl0dGVkXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHByb21pc2VzID0gW107XG5cbiAgICBmb3IgKGxldCBbLCByZWxhdGlvbk1hcF0gb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByZWxhdGlvbk5hbWVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChyZWxhdGlvbk1hcC5oYXMocmVsYXRpb25OYW1lc1tqXSkpIHtcbiAgICAgICAgICBjb25zdCByZWxhdGlvbiA9IHJlbGF0aW9uTWFwLmdldEVsZW1lbnQocmVsYXRpb25OYW1lc1tqXSk7XG4gICAgICAgICAgcHJvbWlzZXMucHVzaChyZWxhdGlvbi5nZXRDaGlsZHJlbigpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNoaWxkcmVuTHN0ID0gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIGxldCByZXMgPSBbXTtcblxuICAgIGZvciAobGV0IGNoaWxkcmVuIG9mIGNoaWxkcmVuTHN0KSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlcy5wdXNoKGNoaWxkcmVuW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgY2hpbGRyZW4gb2YgdGhlIG5vZGUgdGhhdCBhcmUgcmVnaXN0ZXJlZCBpbiB0aGUgY29udGV4dFxuICAgKiBAcGFyYW0ge1NwaW5hbENvbnRleHR9IGNvbnRleHQgQ29udGV4dCB0byB1c2UgZm9yIHRoZSBzZWFyY2hcbiAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8U3BpbmFsTm9kZT4+fSBUaGUgY2hpbGRyZW4gdGhhdCB3ZXJlIGZvdW5kXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIGNvbnRleHQgaXMgbm90IGEgU3BpbmFsQ29udGV4dFxuICAgKi9cbiAgYXN5bmMgZ2V0Q2hpbGRyZW5JbkNvbnRleHQoY29udGV4dCkge1xuICAgIGlmICghKGNvbnRleHQgaW5zdGFuY2VvZiBTcGluYWxDb250ZXh0KSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwiY29udGV4dCBtdXN0IGJlIGEgU3BpbmFsQ29udGV4dFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgWywgcmVsYXRpb25NYXBdIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgIGZvciAobGV0IFssIHJlbGF0aW9uXSBvZiByZWxhdGlvbk1hcCkge1xuICAgICAgICBpZiAocmVsYXRpb24uYmVsb25nc1RvQ29udGV4dChjb250ZXh0KSkge1xuICAgICAgICAgIHByb21pc2VzLnB1c2gocmVsYXRpb24uZ2V0Q2hpbGRyZW5JbkNvbnRleHQoY29udGV4dCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2hpbGRyZW5Mc3QgPSBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgbGV0IHJlcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgY2hpbGRyZW4gb2YgY2hpbGRyZW5Mc3QpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzLnB1c2goY2hpbGRyZW5baV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGFsbCBwYXJlbnRzIGZvciB0aGUgcmVsYXRpb24gbmFtZXMgbm8gbWF0dGVyIHRoZSB0eXBlIG9mIHJlbGF0aW9uXG4gICAqIEBwYXJhbSB7QXJyYXk8U3RyaW5nPn0gW3JlbGF0aW9uTmFtZXM9W11dIEFycmF5IGNvbnRhaW5pbmcgdGhlIHJlbGF0aW9uIG5hbWVzIG9mIHRoZSBkZXNpcmVkIHBhcmVudHNcbiAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8U3BpbmFsTm9kZT4+fSBQcm9taXNlIGNvbnRhaW5pbmcgdGhlIHBhcmVudHMgdGhhdCB3ZXJlIGZvdW5kXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIHJlbGF0aW9uTmFtZXMgYXJlIG5laXRoZXIgYW4gYXJyYXksIGEgc3RyaW5nIG9yIG9taXR0ZWRcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBhbiBlbGVtZW50IG9mIHJlbGF0aW9uTmFtZXMgaXMgbm90IGEgc3RyaW5nXG4gICAqL1xuICBnZXRQYXJlbnRzKHJlbGF0aW9uTmFtZXMgPSBbXSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHJlbGF0aW9uTmFtZXMpKSB7XG4gICAgICBpZiAocmVsYXRpb25OYW1lcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmVsYXRpb25OYW1lcyA9IHRoaXMucGFyZW50cy5rZXlzKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcmVsYXRpb25OYW1lcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgcmVsYXRpb25OYW1lcyA9IFtyZWxhdGlvbk5hbWVzXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwicmVsYXRpb25OYW1lcyBtdXN0IGJlIGFuIGFycmF5LCBhIHN0cmluZyBvciBvbWl0dGVkXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHByb21pc2VzID0gW107XG5cbiAgICBmb3IgKGxldCBuYW1lIG9mIHJlbGF0aW9uTmFtZXMpIHtcbiAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLnBhcmVudHMuZ2V0RWxlbWVudChuYW1lKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHByb21pc2VzLnB1c2goXG4gICAgICAgICAgbGlzdFtpXS5sb2FkKCkudGhlbihyZWxhdGlvbiA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcmVsYXRpb24uZ2V0UGFyZW50KCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRoYXQgdGFrZXMgYSBub2RlIGFzIGFyZ3VtZW50IGFuZCByZXR1cm5zIGEgYm9vbGVhbi5cbiAgICogQGNhbGxiYWNrIGZpbmRQcmVkaWNhdGVcbiAgICogQHBhcmFtIHtTcGluYWxOb2RlfSBub2RlXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgLyoqXG4gICAqIFJlY3Vyc2l2ZWx5IGZpbmRzIGFsbCB0aGUgY2hpbGRyZW4gbm9kZXMgZm9yIHdoaWNoIHRoZSBwcmVkaWNhdGUgaXMgdHJ1ZS5cbiAgICogQHBhcmFtIHtBcnJheTxTdHJpbmc+fSByZWxhdGlvbk5hbWVzIEFycmF5IGNvbnRhaW5pbmcgdGhlIHJlbGF0aW9uIG5hbWVzIHRvIGZvbGxvd1xuICAgKiBAcGFyYW0ge2ZpbmRQcmVkaWNhdGV9IHByZWRpY2F0ZSBGdW5jdGlvbiByZXR1cm5pbmcgdHJ1ZSBpZiB0aGUgbm9kZSBuZWVkcyB0byBiZSByZXR1cm5lZFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxTcGluYWxOb2RlPj59IFRoZSBub2RlcyB0aGF0IHdlcmUgZm91bmRcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgcmVsYXRpb25OYW1lcyBhcmUgbmVpdGhlciBhbiBhcnJheSwgYSBzdHJpbmcgb3Igb21pdHRlZFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGFuIGVsZW1lbnQgb2YgcmVsYXRpb25OYW1lcyBpcyBub3QgYSBzdHJpbmdcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgcHJlZGljYXRlIGlzIG5vdCBhIGZ1bmN0aW9uXG4gICAqL1xuICBhc3luYyBmaW5kKHJlbGF0aW9uTmFtZXMsIHByZWRpY2F0ZSA9IERFRkFVTFRfUFJFRElDQVRFKSB7XG4gICAgaWYgKFxuICAgICAgIUFycmF5LmlzQXJyYXkocmVsYXRpb25OYW1lcykgJiZcbiAgICAgIHJlbGF0aW9uTmFtZXMgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgdHlwZW9mIHJlbGF0aW9uTmFtZXMgIT09IFwic3RyaW5nXCJcbiAgICApIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcInJlbGF0aW9uTmFtZXMgbXVzdCBiZSBhbiBhcnJheSwgYSBzdHJpbmcgb3Igb21pdHRlZFwiKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHByZWRpY2F0ZSAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJwcmVkaWNhdGUgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHNlZW4gPSBuZXcgU2V0KFt0aGlzXSk7XG4gICAgbGV0IHByb21pc2VzID0gW107XG4gICAgbGV0IG5leHRHZW4gPSBbdGhpc107XG4gICAgbGV0IGN1cnJlbnRHZW4gPSBbXTtcbiAgICBjb25zdCBmb3VuZCA9IFtdO1xuXG4gICAgd2hpbGUgKG5leHRHZW4ubGVuZ3RoKSB7XG4gICAgICBjdXJyZW50R2VuID0gbmV4dEdlbjtcbiAgICAgIHByb21pc2VzID0gW107XG4gICAgICBuZXh0R2VuID0gW107XG5cbiAgICAgIGZvciAobGV0IG5vZGUgb2YgY3VycmVudEdlbikge1xuICAgICAgICBwcm9taXNlcy5wdXNoKG5vZGUuZ2V0Q2hpbGRyZW4ocmVsYXRpb25OYW1lcykpO1xuXG4gICAgICAgIGlmIChwcmVkaWNhdGUobm9kZSkpIHtcbiAgICAgICAgICBmb3VuZC5wdXNoKG5vZGUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxldCBjaGlsZHJlbkFycmF5cyA9IGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcblxuICAgICAgZm9yIChsZXQgY2hpbGRyZW4gb2YgY2hpbGRyZW5BcnJheXMpIHtcbiAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgY2hpbGRyZW4pIHtcbiAgICAgICAgICBpZiAoIXNlZW4uaGFzKGNoaWxkKSkge1xuICAgICAgICAgICAgbmV4dEdlbi5wdXNoKGNoaWxkKTtcbiAgICAgICAgICAgIHNlZW4uYWRkKGNoaWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZm91bmQ7XG4gIH1cblxuICAvKipcbiAgICogUmVjdXJzaXZlbHkgZmluZHMgYWxsIHRoZSBjaGlsZHJlbiBub2RlcyBpbiB0aGUgY29udGV4dCBmb3Igd2hpY2ggdGhlIHByZWRpY2F0ZSBpcyB0cnVlLi5cbiAgICogQHBhcmFtIHtTcGluYWxDb250ZXh0fSBjb250ZXh0IENvbnRleHQgdG8gdXNlIGZvciB0aGUgc2VhcmNoXG4gICAqIEBwYXJhbSB7ZmluZFByZWRpY2F0ZX0gcHJlZGljYXRlIEZ1bmN0aW9uIHJldHVybmluZyB0cnVlIGlmIHRoZSBub2RlIG5lZWRzIHRvIGJlIHJldHVybmVkXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PFNwaW5hbE5vZGU+Pn0gVGhlIG5vZGVzIHRoYXQgd2VyZSBmb3VuZFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGNvbnRleHQgaXMgbm90IGEgU3BpbmFsQ29udGV4dFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBwcmVkaWNhdGUgaXMgbm90IGEgZnVuY3Rpb25cbiAgICovXG4gIGFzeW5jIGZpbmRJbkNvbnRleHQoY29udGV4dCwgcHJlZGljYXRlID0gREVGQVVMVF9QUkVESUNBVEUpIHtcbiAgICBpZiAodHlwZW9mIHByZWRpY2F0ZSAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgcHJlZGljYXRlIGZ1bmN0aW9uIG11c3QgYmUgYSBmdW5jdGlvblwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBzZWVuID0gbmV3IFNldChbdGhpc10pO1xuICAgIGxldCBwcm9taXNlcyA9IFtdO1xuICAgIGxldCBuZXh0R2VuID0gW3RoaXNdO1xuICAgIGxldCBjdXJyZW50R2VuID0gW107XG4gICAgY29uc3QgZm91bmQgPSBbXTtcblxuICAgIHdoaWxlIChuZXh0R2VuLmxlbmd0aCkge1xuICAgICAgY3VycmVudEdlbiA9IG5leHRHZW47XG4gICAgICBwcm9taXNlcyA9IFtdO1xuICAgICAgbmV4dEdlbiA9IFtdO1xuXG4gICAgICBmb3IgKGxldCBub2RlIG9mIGN1cnJlbnRHZW4pIHtcbiAgICAgICAgcHJvbWlzZXMucHVzaChub2RlLmdldENoaWxkcmVuSW5Db250ZXh0KGNvbnRleHQpKTtcblxuICAgICAgICBpZiAocHJlZGljYXRlKG5vZGUpKSB7XG4gICAgICAgICAgZm91bmQucHVzaChub2RlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsZXQgY2hpbGRyZW5BcnJheXMgPSBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcyk7XG5cbiAgICAgIGZvciAobGV0IGNoaWxkcmVuIG9mIGNoaWxkcmVuQXJyYXlzKSB7XG4gICAgICAgIGZvciAobGV0IGNoaWxkIG9mIGNoaWxkcmVuKSB7XG4gICAgICAgICAgaWYgKCFzZWVuLmhhcyhjaGlsZCkpIHtcbiAgICAgICAgICAgIG5leHRHZW4ucHVzaChjaGlsZCk7XG4gICAgICAgICAgICBzZWVuLmFkZChjaGlsZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZvdW5kO1xuICB9XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRoYXQgdGFrZXMgYSBTcGluYWxOb2RlIGFuZCByZXR1cm5zIG5vdGhpbmcuXG4gICAqIEBjYWxsYmFjayBmb3JFYWNoQ2FsbGJhY2tcbiAgICogQHBhcmFtIHtTcGluYWxOb2RlfSBub2RlXG4gICAqL1xuICAvKipcbiAgICogUmVjdXJzaXZlbHkgYXBwbGllcyBhIGZ1bmN0aW9uIHRvIGFsbCB0aGUgY2hpbGRyZW4gbm9kZXMuXG4gICAqIEBwYXJhbSB7QXJyYXk8U3RyaW5nPn0gcmVsYXRpb25OYW1lcyBBcnJheSBjb250YWluaW5nIHRoZSByZWxhdGlvbiBuYW1lcyB0byBmb2xsb3dcbiAgICogQHBhcmFtIHtmb3JFYWNoQ2FsbGJhY2t9IGNhbGxiYWNrIEZ1bmN0aW9uIHRvIGFwcGx5IHRvIHRoZSBub2Rlc1xuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSByZWxhdGlvbk5hbWVzIGFyZSBuZWl0aGVyIGFuIGFycmF5LCBhIHN0cmluZyBvciBvbWl0dGVkXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgYW4gZWxlbWVudCBvZiByZWxhdGlvbk5hbWVzIGlzIG5vdCBhIHN0cmluZ1xuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBjYWxsYmFjayBpcyBub3QgYSBmdW5jdGlvblxuICAgKi9cbiAgYXN5bmMgZm9yRWFjaChyZWxhdGlvbk5hbWVzLCBjYWxsYmFjaykge1xuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwiY2FsbGJhY2sgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IG5vZGVzID0gYXdhaXQgdGhpcy5maW5kKHJlbGF0aW9uTmFtZXMpO1xuXG4gICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xuICAgICAgY2FsbGJhY2sobm9kZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlY3Vyc2l2ZWx5IGFwcGxpZXMgYSBmdW5jdGlvbiB0byBhbGwgdGhlIGNoaWxkcmVuIG5vZGVzIGluIHRoZSBjb250ZXh0LlxuICAgKiBAcGFyYW0ge1NwaW5hbENvbnRleHR9IGNvbnRleHQgQ29udGV4dCB0byB1c2UgZm9yIHRoZSBzZWFyY2hcbiAgICogQHBhcmFtIHtmb3JFYWNoQ2FsbGJhY2t9IGNhbGxiYWNrIEZ1bmN0aW9uIHRvIGFwcGx5IHRvIHRoZSBub2Rlc1xuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGNvbnRleHQgaXMgbm90IGEgU3BpbmFsQ29udGV4dFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBjYWxsYmFjayBpcyBub3QgYSBmdW5jdGlvblxuICAgKi9cbiAgYXN5bmMgZm9yRWFjaEluQ29udGV4dChjb250ZXh0LCBjYWxsYmFjaykge1xuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwiY2FsbGJhY2sgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IG5vZGVzID0gYXdhaXQgdGhpcy5maW5kSW5Db250ZXh0KGNvbnRleHQpO1xuXG4gICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xuICAgICAgY2FsbGJhY2sobm9kZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRoYXQgdGFrZXMgYSBTcGluYWxOb2RlIGFuZCByZXR1cm5zIGEgcmVzdWx0LlxuICAgKiBAY2FsbGJhY2sgbWFwQ2FsbGJhY2tcbiAgICogQHBhcmFtIHtTcGluYWxOb2RlfSBub2RlXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgLyoqXG4gICAqIFJlY3Vyc2l2ZWx5IGFwcGxpZXMgYSBmdW5jdGlvbiB0byBhbGwgdGhlIGNoaWxkcmVuIG5vZGVzIGFuZCByZXR1cm5zIHRoZSByZXN1bHRzIGluIGFuIGFycmF5LlxuICAgKiBAcGFyYW0ge0FycmF5PFN0cmluZz59IHJlbGF0aW9uTmFtZXMgQXJyYXkgY29udGFpbmluZyB0aGUgcmVsYXRpb24gbmFtZXMgdG8gZm9sbG93XG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIEZ1bmN0aW9uIHRvIGFwcGx5IHRvIHRoZSBub2Rlc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTwqPj59IFRoZSByZXN1bHRzIG9mIHRoZSBjYWxsYmFjayBmb3IgZWFjaCBub2RlXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIHJlbGF0aW9uTmFtZXMgYXJlIG5laXRoZXIgYW4gYXJyYXksIGEgc3RyaW5nIG9yIG9taXR0ZWRcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBhbiBlbGVtZW50IG9mIHJlbGF0aW9uTmFtZXMgaXMgbm90IGEgc3RyaW5nXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIGNhbGxiYWNrIGlzIG5vdCBhIGZ1bmN0aW9uXG4gICAqL1xuICBhc3luYyBtYXAocmVsYXRpb25OYW1lcywgY2FsbGJhY2spIHtcbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcIlRoZSBjYWxsYmFjayBmdW5jdGlvbiBtdXN0IGJlIGEgZnVuY3Rpb25cIik7XG4gICAgfVxuXG4gICAgY29uc3Qgbm9kZXMgPSBhd2FpdCB0aGlzLmZpbmQocmVsYXRpb25OYW1lcyk7XG4gICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuXG4gICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xuICAgICAgcmVzdWx0cy5wdXNoKGNhbGxiYWNrKG5vZGUpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWN1cnNpdmVseSBhcHBsaWVzIGEgZnVuY3Rpb24gdG8gYWxsIHRoZSBjaGlsZHJlbiBub2RlcyBpbiB0aGUgY29udGV4dCBhbmQgcmV0dXJucyB0aGUgcmVzdWx0cyBpbiBhbiBhcnJheS5cbiAgICogQHBhcmFtIHtTcGluYWxDb250ZXh0fSBjb250ZXh0IENvbnRleHQgdG8gdXNlIGZvciB0aGUgc2VhcmNoXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIEZ1bmN0aW9uIHRvIGFwcGx5IHRvIHRoZSBub2Rlc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTwqPj59IFRoZSByZXN1bHRzIG9mIHRoZSBjYWxsYmFjayBmb3IgZWFjaCBub2RlXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgY29udGV4dCBpcyBub3QgYSBTcGluYWxDb250ZXh0XG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIGNhbGxiYWNrIGlzIG5vdCBhIGZ1bmN0aW9uXG4gICAqL1xuICBhc3luYyBtYXBJbkNvbnRleHQoY29udGV4dCwgY2FsbGJhY2spIHtcbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcIlRoZSBjYWxsYmFjayBmdW5jdGlvbiBtdXN0IGJlIGEgZnVuY3Rpb25cIik7XG4gICAgfVxuXG4gICAgY29uc3Qgbm9kZXMgPSBhd2FpdCB0aGlzLmZpbmRJbkNvbnRleHQoY29udGV4dCk7XG4gICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuXG4gICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xuICAgICAgcmVzdWx0cy5wdXNoKGNhbGxiYWNrKG5vZGUpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIHJlbGF0aW9uIGxpc3QgY29ycmVzcG9uZGluZyB0byB0aGUgcmVsYXRpb24gdHlwZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uVHlwZSBUeXBlIG9mIHRoZSByZWxhdGlvblxuICAgKiBAcmV0dXJucyB7U3BpbmFsTWFwfSBSZXR1cm4gdGhlIHJlbGF0aW9uIGxpc3QgY29ycmVzcG9uZGluZyB0byB0aGUgcmVsYXRpb24gdHlwZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2dldENoaWxkcmVuVHlwZShyZWxhdGlvblR5cGUpIHtcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5nZXRFbGVtZW50KHJlbGF0aW9uVHlwZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSByZWxhdGlvbiBjb3JyZXNwb25kaW5nLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25OYW1lIE5hbWUgb2YgdGhlIHJlbGF0aW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvblR5cGUgVHlwZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHJldHVybnMge1NwaW5hbFJlbGF0aW9ufSBUaGUgcmVsYXRpb24gY29ycmVzcG9uZGluZ1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2dldFJlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldENoaWxkcmVuVHlwZShyZWxhdGlvblR5cGUpLmdldEVsZW1lbnQocmVsYXRpb25OYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgcGFyZW50IHJlbGF0aW9uIG9mIHRoZSBub2RlLlxuICAgKiBAcGFyYW0ge1NwaW5hbFJlbGF0aW9ufSByZWxhdGlvbiBSZWxhdGlvbiB0byByZW1vdmVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9yZW1vdmVQYXJlbnQocmVsYXRpb24pIHtcbiAgICBjb25zdCBwYXJlbnRMc3QgPSB0aGlzLnBhcmVudHMuZ2V0RWxlbWVudChyZWxhdGlvbi5nZXROYW1lKCkuZ2V0KCkpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJlbnRMc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChwYXJlbnRMc3RbaV0uZ2V0SWQoKS5nZXQoKSA9PT0gcmVsYXRpb24uZ2V0SWQoKS5nZXQoKSkge1xuICAgICAgICBwYXJlbnRMc3Quc3BsaWNlKGkpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgbm9kZSBmcm9tIGFsbCBwYXJlbnQgcmVsYXRpb24gdGhlIHByb3BlcnR5IHBhcmVudHMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhc3luYyBfcmVtb3ZlRnJvbVBhcmVudHMoKSB7XG4gICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcblxuICAgIGZvciAobGV0IFssIHBhcmVudF0gb2YgdGhpcy5wYXJlbnRzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcmVudC5sZW5ndGg7IGkrKykge1xuICAgICAgICBwYXJlbnRbaV0ubG9hZCgpLnRoZW4ocGFyZW50UmVsID0+IHtcbiAgICAgICAgICBwcm9taXNlcy5wdXNoKHBhcmVudFJlbC5yZW1vdmVDaGlsZCh0aGlzKSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIHRoZSByZWxhdGlvbiBhcyBwYXJlbnQgb2YgdGhlIG5vZGUuXG4gICAqIEBwYXJhbSB7U3BpbmFsUmVsYXRpb259IHJlbGF0aW9uIFBhcmVudCByZWxhdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2FkZFBhcmVudChyZWxhdGlvbikge1xuICAgIGNvbnN0IHJlbGF0aW9uTmFtZSA9IHJlbGF0aW9uLmdldE5hbWUoKS5nZXQoKTtcblxuICAgIGlmICh0aGlzLnBhcmVudHMuaGFzKHJlbGF0aW9uTmFtZSkpIHtcbiAgICAgIHRoaXMucGFyZW50c1xuICAgICAgICAuZ2V0RWxlbWVudChyZWxhdGlvbk5hbWUpXG4gICAgICAgIC5wdXNoKG5ldyBTcGluYWxOb2RlUG9pbnRlcihyZWxhdGlvbikpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBsaXN0ID0gbmV3IExzdCgpO1xuICAgICAgbGlzdC5wdXNoKG5ldyBTcGluYWxOb2RlUG9pbnRlcihyZWxhdGlvbikpO1xuICAgICAgdGhpcy5wYXJlbnRzLnNldEVsZW1lbnQocmVsYXRpb25OYW1lLCBsaXN0KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHJlbGF0aW9uIGZvciB0aGlzIG5vZGUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk5hbWUgTmFtZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uVHlwZSBUeXBlIG9mIHRoZSByZWxhdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2NyZWF0ZVJlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKSB7XG4gICAgY29uc3QgcmVsYXRpb24gPSBTcGluYWxSZWxhdGlvbkZhY3RvcnkuZ2V0TmV3UmVsYXRpb24oXG4gICAgICB0aGlzLFxuICAgICAgcmVsYXRpb25OYW1lLFxuICAgICAgcmVsYXRpb25UeXBlXG4gICAgKTtcblxuICAgIGlmICghdGhpcy5jaGlsZHJlbi5oYXMocmVsYXRpb25UeXBlKSkge1xuICAgICAgdGhpcy5jaGlsZHJlbi5zZXRFbGVtZW50KHJlbGF0aW9uVHlwZSwgbmV3IFNwaW5hbE1hcCgpKTtcbiAgICB9XG5cbiAgICB0aGlzLl9nZXRDaGlsZHJlblR5cGUocmVsYXRpb25UeXBlKS5zZXRFbGVtZW50KHJlbGF0aW9uTmFtZSwgcmVsYXRpb24pO1xuICAgIHJldHVybiByZWxhdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYWxsIGNoaWxkcmVuIHJlbGF0aW9uIGZyb20gdGhlIGdyYXBoLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxub3RoaW5nPn0gQW4gZW1wdHkgcHJvbWlzZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYXN5bmMgX3JlbW92ZUZyb21DaGlsZHJlbigpIHtcbiAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgWywgcmVsYXRpb25NYXBdIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgIGZvciAobGV0IFssIHJlbGF0aW9uXSBvZiByZWxhdGlvbk1hcCkge1xuICAgICAgICBwcm9taXNlcy5wdXNoKHJlbGF0aW9uLnJlbW92ZUZyb21HcmFwaCgpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gIH1cbn1cblxuc3BpbmFsQ29yZS5yZWdpc3Rlcl9tb2RlbHMoW1NwaW5hbE5vZGVdKTtcbmV4cG9ydCBkZWZhdWx0IFNwaW5hbE5vZGU7XG4iXX0=