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

        for (var _i2 = 0, _currentGen = currentGen; _i2 < _currentGen.length; _i2++) {
          let node = _currentGen[_i2];
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

        for (var _i3 = 0, _currentGen2 = currentGen; _i3 < _currentGen2.length; _i3++) {
          let node = _currentGen2[_i3];
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

      let nodes = yield _this10.findInContext(context);
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
      this.parents.getElement(relationName).push(new _SpinalNodePointer.default(relation, true));
    } else {
      const list = new _spinalCoreConnectorjs_type.Lst();
      list.push(new _SpinalNodePointer.default(relation, true));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Ob2Rlcy9TcGluYWxOb2RlLmpzIl0sIm5hbWVzIjpbIkRFRkFVTFRfUFJFRElDQVRFIiwiU3BpbmFsTm9kZSIsIk1vZGVsIiwiY29uc3RydWN0b3IiLCJuYW1lIiwidHlwZSIsImVsZW1lbnQiLCJhZGRfYXR0ciIsImluZm8iLCJpZCIsInBhcmVudHMiLCJTcGluYWxNYXAiLCJjaGlsZHJlbiIsInVuZGVmaW5lZCIsIlNwaW5hbE5vZGVQb2ludGVyIiwiY29udGV4dElkcyIsIlNwaW5hbFNldCIsImdldElkIiwiZ2V0TmFtZSIsImdldFR5cGUiLCJnZXRFbGVtZW50IiwibG9hZCIsImdldENoaWxkcmVuSWRzIiwibm9kZUNoaWxkcmVuSWRzIiwicmVsYXRpb25NYXAiLCJyZWxhdGlvbiIsInJlbENoaWxkcmVuSWRzIiwiaSIsImxlbmd0aCIsInB1c2giLCJnZXROYkNoaWxkcmVuIiwiY2hpbGRyZW5JZHMiLCJhZGRDb250ZXh0SWQiLCJUeXBlRXJyb3IiLCJoYXMiLCJhZGQiLCJnZXRDb250ZXh0SWRzIiwidmFsdWVzIiwiYmVsb25nc1RvQ29udGV4dCIsImNvbnRleHQiLCJTcGluYWxDb250ZXh0IiwiZ2V0IiwiaGFzUmVsYXRpb24iLCJyZWxhdGlvbk5hbWUiLCJyZWxhdGlvblR5cGUiLCJSRUxBVElPTl9UWVBFX0xJU1QiLCJpbmNsdWRlcyIsIkVycm9yIiwidHlwZU1hcCIsIl9nZXRDaGlsZHJlblR5cGUiLCJoYXNSZWxhdGlvbnMiLCJyZWxhdGlvbk5hbWVzIiwiQXJyYXkiLCJpc0FycmF5IiwiZ2V0UmVsYXRpb25OYW1lcyIsIm5hbWVzIiwia2V5cyIsImZyb20iLCJTZXQiLCJhZGRDaGlsZCIsImNoaWxkIiwiX2NyZWF0ZVJlbGF0aW9uIiwiX2dldFJlbGF0aW9uIiwiYWRkQ2hpbGRJbkNvbnRleHQiLCJyZW1vdmVDaGlsZCIsIm5vZGUiLCJyZWwiLCJyZW1vdmVDaGlsZHJlbiIsIm5vZGVzIiwicmVtb3ZlUmVsYXRpb24iLCJyZW1vdmVGcm9tR3JhcGgiLCJQcm9taXNlIiwiYWxsIiwiX3JlbW92ZUZyb21QYXJlbnRzIiwiX3JlbW92ZUZyb21DaGlsZHJlbiIsImdldENoaWxkIiwicHJlZGljYXRlIiwiZ2V0Q2hpbGRyZW4iLCJwcm9taXNlcyIsImoiLCJjaGlsZHJlbkxzdCIsInJlcyIsImdldENoaWxkcmVuSW5Db250ZXh0IiwiZ2V0UGFyZW50cyIsImxpc3QiLCJ0aGVuIiwiZ2V0UGFyZW50IiwiZmluZCIsInNlZW4iLCJuZXh0R2VuIiwiY3VycmVudEdlbiIsImZvdW5kIiwiY2hpbGRyZW5BcnJheXMiLCJmaW5kSW5Db250ZXh0IiwiZm9yRWFjaCIsImNhbGxiYWNrIiwiZm9yRWFjaEluQ29udGV4dCIsIm1hcCIsInJlc3VsdHMiLCJtYXBJbkNvbnRleHQiLCJfcmVtb3ZlUGFyZW50IiwicGFyZW50THN0Iiwic3BsaWNlIiwicGFyZW50IiwicGFyZW50UmVsIiwiX2FkZFBhcmVudCIsIkxzdCIsInNldEVsZW1lbnQiLCJTcGluYWxSZWxhdGlvbkZhY3RvcnkiLCJnZXROZXdSZWxhdGlvbiIsInNwaW5hbENvcmUiLCJyZWdpc3Rlcl9tb2RlbHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUF3QkE7O0FBTUE7O0FBSUE7O0FBSUE7O0FBQ0E7O0FBR0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQSxNQUFNQSxpQkFBaUIsR0FBRyxNQUFNLElBQWhDO0FBRUE7Ozs7OztBQUlBLE1BQU1DLFVBQU4sU0FBeUJDLGlDQUF6QixDQUErQjtBQUM3Qjs7Ozs7OztBQU9BQyxFQUFBQSxXQUFXLENBQUNDLElBQUksR0FBRyxXQUFSLEVBQXFCQyxJQUFJLEdBQUcsWUFBNUIsRUFBMENDLE9BQTFDLEVBQW1EO0FBQzVEO0FBRUEsU0FBS0MsUUFBTCxDQUFjO0FBQ1pDLE1BQUFBLElBQUksRUFBRTtBQUNKQyxRQUFBQSxFQUFFLEVBQUUscUJBQUssS0FBS04sV0FBTCxDQUFpQkMsSUFBdEIsQ0FEQTtBQUVKQSxRQUFBQSxJQUFJLEVB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QUFBQTtBQUFBOztBQUFBO0FBQ3pDLG1DQUF5QkEsV0FBekIsd0lBQXNDO0FBQUE7QUFBQSxrQkFBMUJDLFFBQTBCOztBQUNwQ3FELGNBQUFBLFFBQVEsQ0FBQ2pELElBQVQsQ0FBY0osUUFBUSxDQUFDNkMsZUFBVCxFQUFkO0FBQ0Q7QUFId0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUkxQztBQVB5QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVMxQixZQUFNQyxPQUFPLENBQUNDLEdBQVIsQ0FBWU0sUUFBWixDQUFOO0FBVDBCO0FBVTNCOztBQXh4QjRCOztBQTJ4Qi9CZ0MsdUNBQVdDLGVBQVgsQ0FBMkIsQ0FBQzlHLFVBQUQsQ0FBM0I7O2VBQ2VBLFUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTggU3BpbmFsQ29tIC0gd3d3LnNwaW5hbGNvbS5jb21cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBTcGluYWxDb3JlLlxuICpcbiAqIFBsZWFzZSByZWFkIGFsbCBvZiB0aGUgZm9sbG93aW5nIHRlcm1zIGFuZCBjb25kaXRpb25zXG4gKiBvZiB0aGUgRnJlZSBTb2Z0d2FyZSBsaWNlbnNlIEFncmVlbWVudCAoXCJBZ3JlZW1lbnRcIilcbiAqIGNhcmVmdWxseS5cbiAqXG4gKiBUaGlzIEFncmVlbWVudCBpcyBhIGxlZ2FsbHkgYmluZGluZyBjb250cmFjdCBiZXR3ZWVuXG4gKiB0aGUgTGljZW5zZWUgKGFzIGRlZmluZWQgYmVsb3cpIGFuZCBTcGluYWxDb20gdGhhdFxuICogc2V0cyBmb3J0aCB0aGUgdGVybXMgYW5kIGNvbmRpdGlvbnMgdGhhdCBnb3Zlcm4geW91clxuICogdXNlIG9mIHRoZSBQcm9ncmFtLiBCeSBpbnN0YWxsaW5nIGFuZC9vciB1c2luZyB0aGVcbiAqIFByb2dyYW0sIHlvdSBhZ3JlZSB0byBhYmlkZSBieSBhbGwgdGhlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucyBzdGF0ZWQgb3IgcmVmZXJlbmNlZCBoZXJlaW4uXG4gKlxuICogSWYgeW91IGRvIG5vdCBhZ3JlZSB0byBhYmlkZSBieSB0aGVzZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMsIGRvIG5vdCBkZW1vbnN0cmF0ZSB5b3VyIGFjY2VwdGFuY2UgYW5kIGRvXG4gKiBub3QgaW5zdGFsbCBvciB1c2UgdGhlIFByb2dyYW0uXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFsb25nXG4gKiB3aXRoIHRoaXMgZmlsZS4gSWYgbm90LCBzZWVcbiAqIDxodHRwOi8vcmVzb3VyY2VzLnNwaW5hbGNvbS5jb20vbGljZW5zZXMucGRmPi5cbiAqL1xuXG5pbXBvcnQge1xuICBzcGluYWxDb3JlLFxuICBNb2RlbCxcbiAgTHN0XG59IGZyb20gXCJzcGluYWwtY29yZS1jb25uZWN0b3Jqc190eXBlXCI7XG5cbmltcG9ydCB7XG4gIGd1aWRcbn0gZnJvbSBcIi4uL1V0aWxpdGllc1wiO1xuXG5pbXBvcnQge1xuICBTcGluYWxDb250ZXh0XG59IGZyb20gXCIuLi9pbmRleFwiO1xuXG5pbXBvcnQgU3BpbmFsTm9kZVBvaW50ZXIgZnJvbSBcIi4uL1NwaW5hbE5vZGVQb2ludGVyXCI7XG5pbXBvcnQge1xuICBTcGluYWxSZWxhdGlvbkZhY3Rvcnlcbn0gZnJvbSBcIi4uL1JlbGF0aW9ucy9TcGluYWxSZWxhdGlvbkZhY3RvcnlcIjtcbmltcG9ydCBTcGluYWxNYXAgZnJvbSBcIi4uL1NwaW5hbE1hcFwiO1xuaW1wb3J0IFNwaW5hbFNldCBmcm9tIFwiLi4vU3BpbmFsU2V0XCI7XG5pbXBvcnQge1xuICBSRUxBVElPTl9UWVBFX0xJU1Rcbn0gZnJvbSBcIi4uLy4uL2J1aWxkL1JlbGF0aW9ucy9TcGluYWxSZWxhdGlvbkZhY3RvcnlcIjtcblxuY29uc3QgREVGQVVMVF9QUkVESUNBVEUgPSAoKSA9PiB0cnVlO1xuXG4vKipcbiAqIE5vZGUgb2YgYSBncmFwaC5cbiAqIEBleHRlbmRzIE1vZGVsXG4gKi9cbmNsYXNzIFNwaW5hbE5vZGUgZXh0ZW5kcyBNb2RlbCB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIFNwaW5hbE5vZGUgY2xhc3MuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbbmFtZT1cInVuZGVmaW5lZFwiXSBOYW1lIG9mIHRoZSBub2RlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbdHlwZT1cInVuZGVmaW5lZFwiXSBUeXBlIG9mIHRoZSBub2RlXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZSB8IE1vZGVsfSBbZWxlbWVudF0gRWxlbWVudCBvZiB0aGUgbm9kZVxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBlbGVtZW50IGlzIG5vdCBhIE1vZGVsXG4gICAqL1xuICBjb25zdHJ1Y3RvcihuYW1lID0gXCJ1bmRlZmluZWRcIiwgdHlwZSA9IFwiU3BpbmFsTm9kZVwiLCBlbGVtZW50KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuYWRkX2F0dHIoe1xuICAgICAgaW5mbzoge1xuICAgICAgICBpZDogZ3VpZCh0aGlzLmNvbnN0cnVjdG9yLm5hbWUpLFxuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICB0eXBlOiB0eXBlXG4gICAgICB9LFxuICAgICAgcGFyZW50czogbmV3IFNwaW5hbE1hcCgpLFxuICAgICAgY2hpbGRyZW46IG5ldyBTcGluYWxNYXAoKSxcbiAgICAgIGVsZW1lbnQ6IGVsZW1lbnQgIT09IHVuZGVmaW5lZCA/IG5ldyBTcGluYWxOb2RlUG9pbnRlcihlbGVtZW50KSA6IHVuZGVmaW5lZCxcbiAgICAgIGNvbnRleHRJZHM6IG5ldyBTcGluYWxTZXQoKVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGlkLlxuICAgKiBAcmV0dXJucyB7U3RyfSBJZCBvZiB0aGUgbm9kZVxuICAgKi9cbiAgZ2V0SWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5mby5pZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBuYW1lLlxuICAgKiBAcmV0dXJucyB7U3RyfSBOYW1lIG9mIHRoZSBub2RlXG4gICAqL1xuICBnZXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLmluZm8ubmFtZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB0eXBlLlxuICAgKiBAcmV0dXJucyB7U3RyfSBUeXBlIG9mIHRoZSBub2RlXG4gICAqL1xuICBnZXRUeXBlKCkge1xuICAgIHJldHVybiB0aGlzLmluZm8udHlwZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBlbGVtZW50LlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTwqPn0gQSBwcm9taXNlIHdoZXJlIHRoZSBwYXJhbWV0ZXIgb2YgdGhlIHJlc29sdmUgbWV0aG9kIGlzIHRoZSBlbGVtZW50XG4gICAqL1xuICBnZXRFbGVtZW50KCkge1xuICAgIGlmICh0aGlzLmVsZW1lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5lbGVtZW50ID0gbmV3IFNwaW5hbE5vZGVQb2ludGVyKG5ldyBNb2RlbCgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5lbGVtZW50LmxvYWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFsbCB0aGUgY2hpbGRyZW4gaWRzIGluIGFuIGFycmF5LlxuICAgKiBAcmV0dXJucyB7QXJyYXk8U3RyaW5nPn0gSWRzIG9mIHRoZSBjaGlsZHJlblxuICAgKi9cbiAgZ2V0Q2hpbGRyZW5JZHMoKSB7XG4gICAgY29uc3Qgbm9kZUNoaWxkcmVuSWRzID0gW107XG5cbiAgICBmb3IgKGxldCBbLCByZWxhdGlvbk1hcF0gb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgZm9yIChsZXQgWywgcmVsYXRpb25dIG9mIHJlbGF0aW9uTWFwKSB7XG4gICAgICAgIGxldCByZWxDaGlsZHJlbklkcyA9IHJlbGF0aW9uLmdldENoaWxkcmVuSWRzKCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZWxDaGlsZHJlbklkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIG5vZGVDaGlsZHJlbklkcy5wdXNoKHJlbENoaWxkcmVuSWRzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbm9kZUNoaWxkcmVuSWRzO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXB1dGVzIGFuZCByZXR1cm5zIHRoZSBudW1iZXIgb2YgY2hpbGRyZW4gb2YgdGhlIG5vZGUuXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBudW1iZXIgb2YgY2hpbGRyZW5cbiAgICovXG4gIGdldE5iQ2hpbGRyZW4oKSB7XG4gICAgbGV0IGNoaWxkcmVuSWRzID0gdGhpcy5nZXRDaGlsZHJlbklkcygpO1xuXG4gICAgcmV0dXJuIGNoaWxkcmVuSWRzLmxlbmd0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGFuIGlkIHRvIHRoZSBjb250ZXh0IGlkcyBvZiB0aGUgbm9kZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkIElkIG9mIHRoZSBjb250ZXh0XG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIGlkIGlzIG5vdCBhIHN0cmluZ1xuICAgKi9cbiAgYWRkQ29udGV4dElkKGlkKSB7XG4gICAgaWYgKHR5cGVvZiBpZCAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwiaWQgbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuY29udGV4dElkcy5oYXMoaWQpKSB7XG4gICAgICB0aGlzLmNvbnRleHRJZHMuYWRkKGlkKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGxpc3Qgb2YgdGhlIGNvbnRleHRzIHRoZSBub2RlIGlzIGFzc29jaWF0ZWQgdG8uXG4gICAqIEByZXR1cm5zIHtBcnJheTxTdHJpbmc+fSBBbiBhcnJheSBvZiBpZHMgb2YgdGhlIGFzc29jaWF0ZWQgY29udGV4dHNcbiAgICovXG4gIGdldENvbnRleHRJZHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGV4dElkcy52YWx1ZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIG5vZGUgYmVsb25ncyB0byB0aGUgY29udGV4dC5cbiAgICogQHBhcmFtIHtTcGluYWxDb250ZXh0fSBjb250ZXh0IFRoZSBjb250ZXh0IHRoYXQgbWlnaHQgb3duIHRoZSBub2RlXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBBIGJvb2xlYW5cbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBjb250ZXh0IGlzIG5vdCBhIFNwaW5hbENvbnRleHRcbiAgICovXG4gIGJlbG9uZ3NUb0NvbnRleHQoY29udGV4dCkge1xuICAgIGlmICghKGNvbnRleHQgaW5zdGFuY2VvZiBTcGluYWxDb250ZXh0KSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwiY29udGV4dCBtdXN0IGJlIGEgU3BpbmFsQ29udGV4dFwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jb250ZXh0SWRzLmhhcyhjb250ZXh0LmdldElkKCkuZ2V0KCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFZlcmlmeSBpZiB0aGUgbm9kZSBjb250YWlucyB0aGUgcmVsYXRpb24gbmFtZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uTmFtZSBOYW1lIG9mIHRoZSByZWxhdGlvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25UeXBlIFR5cGUgb2YgdGhlIHJlbGF0aW9uXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm4gdHJ1ZSBpcyB0aGUgcmVsYXRpb24gaXMgY29udGFpbmVkIGluIHRoZSBub2RlIGFuZCBmYWxzZSBvdGhlcndpc2UuXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIHJlbGF0aW9uIG5hbWUgaXMgbm90IGEgc3RyaW5nXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcmVsYXRpb24gdHlwZSBkb2Vzbid0IGV4aXN0XG4gICAqL1xuICBoYXNSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSkge1xuICAgIGlmICh0eXBlb2YgcmVsYXRpb25OYW1lICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJ0aGUgcmVsYXRpb24gbmFtZSBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIH1cblxuICAgIGlmICghUkVMQVRJT05fVFlQRV9MSVNULmluY2x1ZGVzKHJlbGF0aW9uVHlwZSkpIHtcbiAgICAgIHRocm93IEVycm9yKFwiaW52YWxpZCByZWxhdGlvbiB0eXBlXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHR5cGVNYXAgPSB0aGlzLl9nZXRDaGlsZHJlblR5cGUocmVsYXRpb25UeXBlKTtcblxuICAgIGlmICh0eXBlb2YgdHlwZU1hcCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0eXBlTWFwLmhhcyhyZWxhdGlvbk5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFZlcmlmeSBpZiB0aGUgbm9kZSBjb250YWlucyBhbGwgdGhlIHJlbGF0aW9uIG5hbWVzLlxuICAgKiBAcGFyYW0ge0FycmF5PFN0cmluZz59IHJlbGF0aW9uTmFtZXMgQXJyYXkgY29udGFpbmluZyBhbGwgdGhlIHJlbGF0aW9uIG5hbWVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uVHlwZSBUeXBlIG9mIHRoZSByZWxhdGlvbnNcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybiB0cnVlIGlmIHRoZSBub2RlIGNvbnRhaW5zIGFsbCB0aGUgcmVsYXRpb25zIGluIHJlbGF0aW9uTmFtZXMsIGZhbHNlIG90aGVyd2lzZS5cbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgcmVsYXRpb24gbmFtZXMgYXJlIG5vdCBpbiBhbiBhcnJheVxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIG9uZSBvZiB0aGUgcmVsYXRpb24gbmFtZXMgaXMgbm90IGEgc3RyaW5nXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcmVsYXRpb24gdHlwZSBkb2Vzbid0IGV4aXN0XG4gICAqL1xuICBoYXNSZWxhdGlvbnMocmVsYXRpb25OYW1lcywgcmVsYXRpb25UeXBlKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHJlbGF0aW9uTmFtZXMpKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJUaGUgcmVsYXRpb24gbmFtZXMgbXVzdCBiZSBpbiBhbiBhcnJheVwiKTtcbiAgICB9XG5cbiAgICBpZiAoIVJFTEFUSU9OX1RZUEVfTElTVC5pbmNsdWRlcyhyZWxhdGlvblR5cGUpKSB7XG4gICAgICB0aHJvdyBFcnJvcihcImludmFsaWQgcmVsYXRpb24gdHlwZVwiKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCByZWxhdGlvbk5hbWUgb2YgcmVsYXRpb25OYW1lcykge1xuICAgICAgaWYgKCF0aGlzLmhhc1JlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbGwgdGhlIHJlbGF0aW9uIG5hbWVzIG9mIHRoZSBub2RlLlxuICAgKiBAcmV0dXJucyB7QXJyYXk8U3RyaW5nPn0gVGhlIG5hbWVzIG9mIHRoZSByZWxhdGlvbnMgb2YgdGhlIG5vZGVcbiAgICovXG4gIGdldFJlbGF0aW9uTmFtZXMoKSB7XG4gICAgY29uc3QgbmFtZXMgPSBbXTtcblxuICAgIGZvciAobGV0IFssIHJlbGF0aW9uTWFwXSBvZiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICBuYW1lcy5wdXNoKC4uLnJlbGF0aW9uTWFwLmtleXMoKSk7XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlcyBhbGwgZHVwbGljYXRlc1xuICAgIHJldHVybiBBcnJheS5mcm9tKG5ldyBTZXQobmFtZXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgdGhlIG5vZGUgYXMgY2hpbGQgb2YgdGhlIHJlbGF0aW9uLlxuICAgKiBAcGFyYW0ge1NwaW5hbE5vZGUgfCBNb2RlbH0gY2hpbGQgRWxlbWVudCB0byBhZGQgYXMgY2hpbGRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uTmFtZSBOYW1lIG9mIHRoZSByZWxhdGlvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25UeXBlIFR5cGUgb2YgdGhlIHJlbGF0aW9uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFNwaW5hbE5vZGU+fSBUaGUgY2hpbGQgbm9kZSBpbiBhIHByb21pc2VcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgY2hpbGQgaXMgbm90IGEgbW9kZWxcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgcmVsYXRpb24gbmFtZSBpcyBub3QgYSBzdHJpbmdcbiAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSByZWxhdGlvbiB0eXBlIGlzIGludmFsaWRcbiAgICovXG4gIGFzeW5jIGFkZENoaWxkKGNoaWxkLCByZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSkge1xuICAgIGxldCByZWxhdGlvbjtcblxuICAgIGlmICghKGNoaWxkIGluc3RhbmNlb2YgTW9kZWwpKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXG4gICAgICAgIFwiQ2Fubm90IGFkZCBhIGNoaWxkIHdpdGNoIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBTcGluYWxOb2RlIG9yIE1vZGVsLlwiXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoIShjaGlsZCBpbnN0YW5jZW9mIFNwaW5hbE5vZGUpKSB7XG4gICAgICBjaGlsZCA9IG5ldyBTcGluYWxOb2RlKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBjaGlsZCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmhhc1JlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKSkge1xuICAgICAgcmVsYXRpb24gPSB0aGlzLl9jcmVhdGVSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbGF0aW9uID0gdGhpcy5fZ2V0UmVsYXRpb24ocmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpO1xuICAgIH1cblxuICAgIGF3YWl0IHJlbGF0aW9uLmFkZENoaWxkKGNoaWxkKTtcbiAgICByZXR1cm4gY2hpbGQ7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGNoaWxkIGFuZCBub3RpY2VzIHRoZSBjb250ZXh0IGlmIGEgbmV3IHJlbGF0aW9uIHdhcyBjcmVhdGVkLlxuICAgKiBAcGFyYW0ge1NwaW5hbE5vZGUgfCBNb2RlbH0gY2hpbGQgTm9kZSB0byBhZGQgYXMgY2hpbGRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uTmFtZSBOYW1lIG9mIHRoZSByZWxhdGlvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25UeXBlIFR5cGUgb2YgdGhlIHJlbGF0aW9uXG4gICAqIEBwYXJhbSB7U3BpbmFsQ29udGV4dH0gY29udGV4dCBDb250ZXh0IHRvIHVwZGF0ZVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxTcGluYWxOb2RlPn0gVGhlIGNoaWxkIG5vZGUgaW4gYSBwcm9taXNlXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIGNoaWxkIGlzIG5vdCBhIG1vZGVsXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIHJlbGF0aW9uIG5hbWUgaXMgbm90IGEgc3RyaW5nXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIGNvbnRleHQgaXMgbm90IGEgU3BpbmFsQ29udGV4dFxuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHJlbGF0aW9uIHR5cGUgaXMgaW52YWxpZFxuICAgKi9cbiAgYXN5bmMgYWRkQ2hpbGRJbkNvbnRleHQoY2hpbGQsIHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlLCBjb250ZXh0KSB7XG4gICAgbGV0IHJlbGF0aW9uO1xuXG4gICAgaWYgKCEoY29udGV4dCBpbnN0YW5jZW9mIFNwaW5hbENvbnRleHQpKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJjb250ZXh0IG11c3QgYmUgYSBTcGluYUNvbnRleHRcIik7XG4gICAgfVxuXG4gICAgaWYgKCEoY2hpbGQgaW5zdGFuY2VvZiBNb2RlbCkpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcbiAgICAgICAgXCJDYW5ub3QgYWRkIGEgY2hpbGQgd2l0Y2ggaXMgbm90IGFuIGluc3RhbmNlIG9mIFNwaW5hbE5vZGUgb3IgTW9kZWwuXCJcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmICghKGNoaWxkIGluc3RhbmNlb2YgU3BpbmFsTm9kZSkpIHtcbiAgICAgIGNoaWxkID0gbmV3IFNwaW5hbE5vZGUodW5kZWZpbmVkLCB1bmRlZmluZWQsIGNoaWxkKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuaGFzUmVsYXRpb24ocmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpKSB7XG4gICAgICByZWxhdGlvbiA9IHRoaXMuX2NyZWF0ZVJlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVsYXRpb24gPSB0aGlzLl9nZXRSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSk7XG4gICAgfVxuXG4gICAgY2hpbGQuYWRkQ29udGV4dElkKGNvbnRleHQuZ2V0SWQoKS5nZXQoKSk7XG4gICAgcmVsYXRpb24uYWRkQ29udGV4dElkKGNvbnRleHQuZ2V0SWQoKS5nZXQoKSk7XG5cbiAgICBhd2FpdCByZWxhdGlvbi5hZGRDaGlsZChjaGlsZCk7XG4gICAgcmV0dXJuIGNoaWxkO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIG5vZGUgZnJvbSB0aGUgcmVsYXRpb24gY2hpbGRyZW4uXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZX0gbm9kZSBOb2RlIHRvIHJlbW92ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25OYW1lIE5hbWUgb2YgdGhlIHJlbGF0aW9uIHRvIHdpY2ggdGhlIG5vZGUgYmVsb25nc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25UeXBlIFR5cGUgb2YgdGhlIHJlbGF0aW9uIHRvIHdpY2ggdGhlIG5vZGUgYmVsb25nc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxub3RoaW5nPn0gQW4gZW1wdHkgcHJvbWlzZVxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHJlbGF0aW9uIG5hbWUgaXMgbm90IGEgc3RyaW5nXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiByZWxhdGlvbiB0eXBlIGlzIGludmFsaWRcbiAgICogQHRocm93cyB7RXJyb3J9IElmIHJlbGF0aW9uIGRvZXNuJ3QgZXhpc3RcbiAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBjaGlsZCBkb2Vzbid0IGV4aXN0XG4gICAqL1xuICByZW1vdmVDaGlsZChub2RlLCByZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSkge1xuICAgIGlmICghdGhpcy5oYXNSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSkpIHtcbiAgICAgIHRocm93IEVycm9yKFwiVGhlIHJlbGF0aW9uIGRvZXNuJ3QgZXhpc3RcIik7XG4gICAgfVxuXG4gICAgY29uc3QgcmVsID0gdGhpcy5fZ2V0UmVsYXRpb24ocmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpO1xuICAgIHJldHVybiByZWwucmVtb3ZlQ2hpbGQobm9kZSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBjaGlsZHJlbiBpbiB0aGUgZ2l2ZW4gcmVsYXRpb24uXG4gICAqIEBwYXJhbSB7QXJyYXk8U3BpbmFsTm9kZT59IG5vZGVzIE5vZGVzIHRvIGRlbGV0ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25OYW1lIE5hbWUgb2YgdGhlIHJlbGF0aW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvblR5cGUgVHlwZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHJldHVybnMge1Byb21pc2U8bm90aGluZz59IEFuIGVtcHR5IHByb21pc2VcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBub2RlcyBpcyBub3QgYW4gYXJyYXlcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBhbiBlbGVtZW50IG9mIG5vZGVzIGlzIG5vdCBhIFNwaW5hbE5vZGVcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiByZWxhdGlvbiBuYW1lIGlzIG5vdCBhIHN0cmluZ1xuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgcmVsYXRpb24gdHlwZSBpcyBpbnZhbGlkXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcmVsYXRpb24gZG9lc24ndCBleGlzdFxuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgb25lIG9mIHRoZSBub2RlcyBpcyBub3QgYSBjaGlsZFxuICAgKi9cbiAgcmVtb3ZlQ2hpbGRyZW4obm9kZXMsIHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG5vZGVzKSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwibm9kZXMgbXVzdCBiZSBhbiBhcnJheVwiKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuaGFzUmVsYXRpb24ocmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpKSB7XG4gICAgICB0aHJvdyBFcnJvcihcIlRoZSByZWxhdGlvbiBkb2Vzbid0IGV4aXN0XCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbCA9IHRoaXMuX2dldFJlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKTtcbiAgICByZXR1cm4gcmVsLnJlbW92ZUNoaWxkcmVuKG5vZGVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgY2hpbGQgcmVsYXRpb24gb2YgdGhlIG5vZGUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk5hbWUgTmFtZSBvZiB0aGUgcmVsYXRpb24gdG8gcmVtb3ZlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvblR5cGUgVHlwZSBvZiB0aGUgcmVsYXRpb24gdG8gcmVtb3ZlXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPG5vdGhpbmc+fSBBbiBlbXB0eSBwcm9taXNlXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIHJlbGF0aW9uTmFtZSBpcyBub3QgYSBzdHJpbmdcbiAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSByZWxhdGlvblR5cGUgaXMgaW52YWxpZFxuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHJlbGF0aW9uIGRvZXNuJ3QgZXhpc3RcbiAgICovXG4gIHJlbW92ZVJlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKSB7XG4gICAgaWYgKCF0aGlzLmhhc1JlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKSkge1xuICAgICAgdGhyb3cgRXJyb3IoXCJUaGUgcmVsYXRpb24gZG9lc24ndCBleGlzdFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCByZWwgPSB0aGlzLl9nZXRSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSk7XG4gICAgcmV0dXJuIHJlbC5yZW1vdmVGcm9tR3JhcGgoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgdGhlIG5vZGUgZnJvbSB0aGUgZ3JhcGggaS5lIHJlbW92ZSB0aGUgbm9kZSBmcm9tIGFsbCB0aGUgcGFyZW50IHJlbGF0aW9ucyBhbmQgcmVtb3ZlIGFsbCB0aGUgY2hpbGRyZW4gcmVsYXRpb25zLlxuICAgKiBUaGlzIG9wZXJhdGlvbiBtaWdodCBkZWxldGUgYWxsIHRoZSBzdWItZ3JhcGggdW5kZXIgdGhpcyBub2RlLlxuICAgKiBBZnRlciB0aGlzIG9wZXJhdGlvbiB0aGUgbm9kZSBjYW4gYmUgZGVsZXRlZCB3aXRob3V0IGZlYXIuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPG5vdGhpbmc+fSBBbiBlbXB0eSBwcm9taXNlXG4gICAqL1xuICBhc3luYyByZW1vdmVGcm9tR3JhcGgoKSB7XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbVBhcmVudHMoKSxcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21DaGlsZHJlbigpXG4gICAgXSk7XG4gIH1cblxuICAvKipcbiAgICogQSBmdW5jdGlvbiB0aGF0IHRha2VzIGEgbm9kZSBhbmQgcmV0dXJucyBhIGJvb2xlYW4uXG4gICAqIEBjYWxsYmFjayBnZXRDaGlsZFByZWRpY2F0ZVxuICAgKiBAcGFyYW0ge1NwaW5hbE5vZGV9IG5vZGVcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICAvKipcbiAgICogUmV0dXJucyB0aGUgZmlyc3QgY2hpbGQgaW4gdGhlIGdpdmVuIHJlbGF0aW9uIGZvciB3aGljaCB0aGUgcHJlZGljYXRlIGlzIHRydWUuXG4gICAqIEBwYXJhbSB7Z2V0Q2hpbGRQcmVkaWNhdGV9IHByZWRpY2F0ZSBGdW5jdGlvbnMgdGhhdCB0YWtlcyBhIG5vZGUgYW5kIHJldHVybnMgYSBib29sZWFuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk5hbWUgTmFtZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uVHlwZSBUeXBlIG9mIHRoZSByZWxhdGlvblxuICAgKiBAcmV0dXJucyB7U3BpbmFsTm9kZSB8IHVuZGVmaW5lZH0gVGhlIGZpcnN0IGNoaWxkIGZvciB3aGljaCB0aGUgcHJlZGljYXRlIGlzIHRydWUgb3IgdW5kZWZpbmVkXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgcHJlZGljYXRlIGlzIG5vdCBhIGZ1bmN0aW9uXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgcmVsYXRpb24gbmFtZSBpcyBub3QgYSBzdHJpbmdcbiAgICogQHRocm93cyB7RXJyb3J9IElmIHJlbGF0aW9uIHR5cGUgaXMgaW52YWxpZFxuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgcmVsYXRpb24gZG9lc24ndCBleGlzdFxuICAgKi9cbiAgYXN5bmMgZ2V0Q2hpbGQocHJlZGljYXRlLCByZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSkge1xuICAgIGlmICh0eXBlb2YgcHJlZGljYXRlICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcInRoZSBwcmVkaWNhdGUgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5oYXNSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSkpIHtcbiAgICAgIHRocm93IEVycm9yKFwiVGhlIHJlbGF0aW9uIGRvZXNuJ3QgZXhpc3RcIik7XG4gICAgfVxuXG4gICAgY29uc3QgcmVsYXRpb24gPSB0aGlzLl9nZXRSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSlcbiAgICBjb25zdCBjaGlsZHJlbiA9IGF3YWl0IHJlbGF0aW9uLmdldENoaWxkcmVuKCk7XG5cbiAgICBmb3IgKGxldCBjaGlsZCBvZiBjaGlsZHJlbikge1xuICAgICAgaWYgKHByZWRpY2F0ZShjaGlsZCkpIHtcbiAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjaGlsZHJlbiBvZiB0aGUgbm9kZSBmb3IgdGhlIHJlbGF0aW9uIG5hbWVzLlxuICAgKiBAcGFyYW0ge0FycmF5PFN0cmluZz59IFtyZWxhdGlvbk5hbWVzPVtdXSBBcnJheSBjb250YWluaW5nIHRoZSByZWxhdGlvbiBuYW1lcyBvZiB0aGUgZGVzaXJlZCBjaGlsZHJlblxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxTcGluYWxOb2RlPj59IFRoZSBjaGlsZHJlbiB0aGF0IHdlcmUgZm91bmRcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiByZWxhdGlvbk5hbWVzIGlzIG5laXRoZXIgYW4gYXJyYXksIGEgc3RyaW5nIG9yIG9taXR0ZWRcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBhbiBlbGVtZW50IG9mIHJlbGF0aW9uTmFtZXMgaXMgbm90IGEgc3RyaW5nXG4gICAqL1xuICBhc3luYyBnZXRDaGlsZHJlbihyZWxhdGlvbk5hbWVzID0gW10pIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShyZWxhdGlvbk5hbWVzKSkge1xuICAgICAgaWYgKHJlbGF0aW9uTmFtZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJlbGF0aW9uTmFtZXMgPSB0aGlzLmdldFJlbGF0aW9uTmFtZXMoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiByZWxhdGlvbk5hbWVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICByZWxhdGlvbk5hbWVzID0gW3JlbGF0aW9uTmFtZXNdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJyZWxhdGlvbk5hbWVzIG11c3QgYmUgYW4gYXJyYXksIGEgc3RyaW5nIG9yIG9taXR0ZWRcIik7XG4gICAgfVxuXG4gICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcblxuICAgIGZvciAobGV0IFssIHJlbGF0aW9uTWFwXSBvZiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJlbGF0aW9uTmFtZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKHJlbGF0aW9uTWFwLmhhcyhyZWxhdGlvbk5hbWVzW2pdKSkge1xuICAgICAgICAgIGNvbnN0IHJlbGF0aW9uID0gcmVsYXRpb25NYXAuZ2V0RWxlbWVudChyZWxhdGlvbk5hbWVzW2pdKTtcbiAgICAgICAgICBwcm9taXNlcy5wdXNoKHJlbGF0aW9uLmdldENoaWxkcmVuKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2hpbGRyZW5Mc3QgPSBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgbGV0IHJlcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgY2hpbGRyZW4gb2YgY2hpbGRyZW5Mc3QpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzLnB1c2goY2hpbGRyZW5baV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBjaGlsZHJlbiBvZiB0aGUgbm9kZSB0aGF0IGFyZSByZWdpc3RlcmVkIGluIHRoZSBjb250ZXh0XG4gICAqIEBwYXJhbSB7U3BpbmFsQ29udGV4dH0gY29udGV4dCBDb250ZXh0IHRvIHVzZSBmb3IgdGhlIHNlYXJjaFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxTcGluYWxOb2RlPj59IFRoZSBjaGlsZHJlbiB0aGF0IHdlcmUgZm91bmRcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgY29udGV4dCBpcyBub3QgYSBTcGluYWxDb250ZXh0XG4gICAqL1xuICBhc3luYyBnZXRDaGlsZHJlbkluQ29udGV4dChjb250ZXh0KSB7XG4gICAgaWYgKCEoY29udGV4dCBpbnN0YW5jZW9mIFNwaW5hbENvbnRleHQpKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJjb250ZXh0IG11c3QgYmUgYSBTcGluYWxDb250ZXh0XCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHByb21pc2VzID0gW107XG5cbiAgICBmb3IgKGxldCBbLCByZWxhdGlvbk1hcF0gb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgZm9yIChsZXQgWywgcmVsYXRpb25dIG9mIHJlbGF0aW9uTWFwKSB7XG4gICAgICAgIGlmIChyZWxhdGlvbi5iZWxvbmdzVG9Db250ZXh0KGNvbnRleHQpKSB7XG4gICAgICAgICAgcHJvbWlzZXMucHVzaChyZWxhdGlvbi5nZXRDaGlsZHJlbkluQ29udGV4dChjb250ZXh0KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjaGlsZHJlbkxzdCA9IGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICBsZXQgcmVzID0gW107XG5cbiAgICBmb3IgKGxldCBjaGlsZHJlbiBvZiBjaGlsZHJlbkxzdCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICByZXMucHVzaChjaGlsZHJlbltpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYWxsIHBhcmVudHMgZm9yIHRoZSByZWxhdGlvbiBuYW1lcyBubyBtYXR0ZXIgdGhlIHR5cGUgb2YgcmVsYXRpb25cbiAgICogQHBhcmFtIHtBcnJheTxTdHJpbmc+fSBbcmVsYXRpb25OYW1lcz1bXV0gQXJyYXkgY29udGFpbmluZyB0aGUgcmVsYXRpb24gbmFtZXMgb2YgdGhlIGRlc2lyZWQgcGFyZW50c1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxTcGluYWxOb2RlPj59IFByb21pc2UgY29udGFpbmluZyB0aGUgcGFyZW50cyB0aGF0IHdlcmUgZm91bmRcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgcmVsYXRpb25OYW1lcyBhcmUgbmVpdGhlciBhbiBhcnJheSwgYSBzdHJpbmcgb3Igb21pdHRlZFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGFuIGVsZW1lbnQgb2YgcmVsYXRpb25OYW1lcyBpcyBub3QgYSBzdHJpbmdcbiAgICovXG4gIGdldFBhcmVudHMocmVsYXRpb25OYW1lcyA9IFtdKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocmVsYXRpb25OYW1lcykpIHtcbiAgICAgIGlmIChyZWxhdGlvbk5hbWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZWxhdGlvbk5hbWVzID0gdGhpcy5wYXJlbnRzLmtleXMoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiByZWxhdGlvbk5hbWVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICByZWxhdGlvbk5hbWVzID0gW3JlbGF0aW9uTmFtZXNdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJyZWxhdGlvbk5hbWVzIG11c3QgYmUgYW4gYXJyYXksIGEgc3RyaW5nIG9yIG9taXR0ZWRcIik7XG4gICAgfVxuXG4gICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcblxuICAgIGZvciAobGV0IG5hbWUgb2YgcmVsYXRpb25OYW1lcykge1xuICAgICAgY29uc3QgbGlzdCA9IHRoaXMucGFyZW50cy5nZXRFbGVtZW50KG5hbWUpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcHJvbWlzZXMucHVzaChcbiAgICAgICAgICBsaXN0W2ldLmxvYWQoKS50aGVuKHJlbGF0aW9uID0+IHtcbiAgICAgICAgICAgIHJldHVybiByZWxhdGlvbi5nZXRQYXJlbnQoKTtcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gIH1cblxuICAvKipcbiAgICogUmVjdXJzaXZlbHkgZmluZHMgYWxsIHRoZSBjaGlsZHJlbiBub2RlcyBmb3Igd2hpY2ggdGhlIHByZWRpY2F0ZSBpcyB0cnVlLlxuICAgKiBAcGFyYW0ge0FycmF5PFN0cmluZz59IHJlbGF0aW9uTmFtZXMgQXJyYXkgY29udGFpbmluZyB0aGUgcmVsYXRpb24gbmFtZXMgdG8gZm9sbG93XG4gICAqIEBwYXJhbSB7ZmluZFByZWRpY2F0ZX0gcHJlZGljYXRlIEZ1bmN0aW9uIHJldHVybmluZyB0cnVlIGlmIHRoZSBub2RlIG5lZWRzIHRvIGJlIHJldHVybmVkXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PFNwaW5hbE5vZGU+Pn0gVGhlIG5vZGVzIHRoYXQgd2VyZSBmb3VuZFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSByZWxhdGlvbk5hbWVzIGFyZSBuZWl0aGVyIGFuIGFycmF5LCBhIHN0cmluZyBvciBvbWl0dGVkXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgYW4gZWxlbWVudCBvZiByZWxhdGlvbk5hbWVzIGlzIG5vdCBhIHN0cmluZ1xuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBwcmVkaWNhdGUgaXMgbm90IGEgZnVuY3Rpb25cbiAgICovXG4gIGFzeW5jIGZpbmQocmVsYXRpb25OYW1lcywgcHJlZGljYXRlID0gREVGQVVMVF9QUkVESUNBVEUpIHtcbiAgICBpZiAoXG4gICAgICAhQXJyYXkuaXNBcnJheShyZWxhdGlvbk5hbWVzKSAmJlxuICAgICAgcmVsYXRpb25OYW1lcyAhPT0gdW5kZWZpbmVkICYmXG4gICAgICB0eXBlb2YgcmVsYXRpb25OYW1lcyAhPT0gXCJzdHJpbmdcIlxuICAgICkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwicmVsYXRpb25OYW1lcyBtdXN0IGJlIGFuIGFycmF5LCBhIHN0cmluZyBvciBvbWl0dGVkXCIpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcHJlZGljYXRlICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcInByZWRpY2F0ZSBtdXN0IGJlIGEgZnVuY3Rpb25cIik7XG4gICAgfVxuXG4gICAgY29uc3Qgc2VlbiA9IG5ldyBTZXQoW3RoaXNdKTtcbiAgICBsZXQgcHJvbWlzZXMgPSBbXTtcbiAgICBsZXQgbmV4dEdlbiA9IFt0aGlzXTtcbiAgICBsZXQgY3VycmVudEdlbiA9IFtdO1xuICAgIGNvbnN0IGZvdW5kID0gW107XG5cbiAgICB3aGlsZSAobmV4dEdlbi5sZW5ndGgpIHtcbiAgICAgIGN1cnJlbnRHZW4gPSBuZXh0R2VuO1xuICAgICAgcHJvbWlzZXMgPSBbXTtcbiAgICAgIG5leHRHZW4gPSBbXTtcblxuICAgICAgZm9yIChsZXQgbm9kZSBvZiBjdXJyZW50R2VuKSB7XG4gICAgICAgIHByb21pc2VzLnB1c2gobm9kZS5nZXRDaGlsZHJlbihyZWxhdGlvbk5hbWVzKSk7XG5cbiAgICAgICAgaWYgKHByZWRpY2F0ZShub2RlKSkge1xuICAgICAgICAgIGZvdW5kLnB1c2gobm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGV0IGNoaWxkcmVuQXJyYXlzID0gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuXG4gICAgICBmb3IgKGxldCBjaGlsZHJlbiBvZiBjaGlsZHJlbkFycmF5cykge1xuICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBjaGlsZHJlbikge1xuICAgICAgICAgIGlmICghc2Vlbi5oYXMoY2hpbGQpKSB7XG4gICAgICAgICAgICBuZXh0R2VuLnB1c2goY2hpbGQpO1xuICAgICAgICAgICAgc2Vlbi5hZGQoY2hpbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmb3VuZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWN1cnNpdmVseSBmaW5kcyBhbGwgdGhlIGNoaWxkcmVuIG5vZGVzIGluIHRoZSBjb250ZXh0IGZvciB3aGljaCB0aGUgcHJlZGljYXRlIGlzIHRydWUuLlxuICAgKiBAcGFyYW0ge1NwaW5hbENvbnRleHR9IGNvbnRleHQgQ29udGV4dCB0byB1c2UgZm9yIHRoZSBzZWFyY2hcbiAgICogQHBhcmFtIHtmaW5kUHJlZGljYXRlfSBwcmVkaWNhdGUgRnVuY3Rpb24gcmV0dXJuaW5nIHRydWUgaWYgdGhlIG5vZGUgbmVlZHMgdG8gYmUgcmV0dXJuZWRcbiAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8U3BpbmFsTm9kZT4+fSBUaGUgbm9kZXMgdGhhdCB3ZXJlIGZvdW5kXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgY29udGV4dCBpcyBub3QgYSBTcGluYWxDb250ZXh0XG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIHByZWRpY2F0ZSBpcyBub3QgYSBmdW5jdGlvblxuICAgKi9cbiAgYXN5bmMgZmluZEluQ29udGV4dChjb250ZXh0LCBwcmVkaWNhdGUgPSBERUZBVUxUX1BSRURJQ0FURSkge1xuICAgIGlmICh0eXBlb2YgcHJlZGljYXRlICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBwcmVkaWNhdGUgZnVuY3Rpb24gbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHNlZW4gPSBuZXcgU2V0KFt0aGlzXSk7XG4gICAgbGV0IHByb21pc2VzID0gW107XG4gICAgbGV0IG5leHRHZW4gPSBbdGhpc107XG4gICAgbGV0IGN1cnJlbnRHZW4gPSBbXTtcbiAgICBjb25zdCBmb3VuZCA9IFtdO1xuXG4gICAgd2hpbGUgKG5leHRHZW4ubGVuZ3RoKSB7XG4gICAgICBjdXJyZW50R2VuID0gbmV4dEdlbjtcbiAgICAgIHByb21pc2VzID0gW107XG4gICAgICBuZXh0R2VuID0gW107XG5cbiAgICAgIGZvciAobGV0IG5vZGUgb2YgY3VycmVudEdlbikge1xuICAgICAgICBwcm9taXNlcy5wdXNoKG5vZGUuZ2V0Q2hpbGRyZW5JbkNvbnRleHQoY29udGV4dCkpO1xuXG4gICAgICAgIGlmIChwcmVkaWNhdGUobm9kZSkpIHtcbiAgICAgICAgICBmb3VuZC5wdXNoKG5vZGUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxldCBjaGlsZHJlbkFycmF5cyA9IGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcblxuICAgICAgZm9yIChsZXQgY2hpbGRyZW4gb2YgY2hpbGRyZW5BcnJheXMpIHtcbiAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgY2hpbGRyZW4pIHtcbiAgICAgICAgICBpZiAoIXNlZW4uaGFzKGNoaWxkKSkge1xuICAgICAgICAgICAgbmV4dEdlbi5wdXNoKGNoaWxkKTtcbiAgICAgICAgICAgIHNlZW4uYWRkKGNoaWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZm91bmQ7XG4gIH1cblxuICAvKipcbiAgICogUmVjdXJzaXZlbHkgYXBwbGllcyBhIGZ1bmN0aW9uIHRvIGFsbCB0aGUgY2hpbGRyZW4gbm9kZXMuXG4gICAqIEBwYXJhbSB7QXJyYXk8U3RyaW5nPn0gcmVsYXRpb25OYW1lcyBBcnJheSBjb250YWluaW5nIHRoZSByZWxhdGlvbiBuYW1lcyB0byBmb2xsb3dcbiAgICogQHBhcmFtIHtmb3JFYWNoQ2FsbGJhY2t9IGNhbGxiYWNrIEZ1bmN0aW9uIHRvIGFwcGx5IHRvIHRoZSBub2Rlc1xuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSByZWxhdGlvbk5hbWVzIGFyZSBuZWl0aGVyIGFuIGFycmF5LCBhIHN0cmluZyBvciBvbWl0dGVkXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgYW4gZWxlbWVudCBvZiByZWxhdGlvbk5hbWVzIGlzIG5vdCBhIHN0cmluZ1xuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBjYWxsYmFjayBpcyBub3QgYSBmdW5jdGlvblxuICAgKi9cbiAgYXN5bmMgZm9yRWFjaChyZWxhdGlvbk5hbWVzLCBjYWxsYmFjaykge1xuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwiY2FsbGJhY2sgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IG5vZGVzID0gYXdhaXQgdGhpcy5maW5kKHJlbGF0aW9uTmFtZXMpO1xuXG4gICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xuICAgICAgY2FsbGJhY2sobm9kZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlY3Vyc2l2ZWx5IGFwcGxpZXMgYSBmdW5jdGlvbiB0byBhbGwgdGhlIGNoaWxkcmVuIG5vZGVzIGluIHRoZSBjb250ZXh0LlxuICAgKiBAcGFyYW0ge1NwaW5hbENvbnRleHR9IGNvbnRleHQgQ29udGV4dCB0byB1c2UgZm9yIHRoZSBzZWFyY2hcbiAgICogQHBhcmFtIHtmb3JFYWNoQ2FsbGJhY2t9IGNhbGxiYWNrIEZ1bmN0aW9uIHRvIGFwcGx5IHRvIHRoZSBub2Rlc1xuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGNvbnRleHQgaXMgbm90IGEgU3BpbmFsQ29udGV4dFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBjYWxsYmFjayBpcyBub3QgYSBmdW5jdGlvblxuICAgKi9cbiAgYXN5bmMgZm9yRWFjaEluQ29udGV4dChjb250ZXh0LCBjYWxsYmFjaykge1xuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwiY2FsbGJhY2sgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICAgIH1cblxuICAgIGxldCBub2RlcyA9IGF3YWl0IHRoaXMuZmluZEluQ29udGV4dChjb250ZXh0KTtcblxuICAgIGZvciAobGV0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgIGNhbGxiYWNrKG5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0aGF0IHRha2VzIGEgU3BpbmFsTm9kZSBhbmQgcmV0dXJucyBhIHJlc3VsdC5cbiAgICogQGNhbGxiYWNrIG1hcENhbGxiYWNrXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZX0gbm9kZVxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIC8qKlxuICAgKiBSZWN1cnNpdmVseSBhcHBsaWVzIGEgZnVuY3Rpb24gdG8gYWxsIHRoZSBjaGlsZHJlbiBub2RlcyBhbmQgcmV0dXJucyB0aGUgcmVzdWx0cyBpbiBhbiBhcnJheS5cbiAgICogQHBhcmFtIHtBcnJheTxTdHJpbmc+fSByZWxhdGlvbk5hbWVzIEFycmF5IGNvbnRhaW5pbmcgdGhlIHJlbGF0aW9uIG5hbWVzIHRvIGZvbGxvd1xuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBGdW5jdGlvbiB0byBhcHBseSB0byB0aGUgbm9kZXNcbiAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8Kj4+fSBUaGUgcmVzdWx0cyBvZiB0aGUgY2FsbGJhY2sgZm9yIGVhY2ggbm9kZVxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSByZWxhdGlvbk5hbWVzIGFyZSBuZWl0aGVyIGFuIGFycmF5LCBhIHN0cmluZyBvciBvbWl0dGVkXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgYW4gZWxlbWVudCBvZiByZWxhdGlvbk5hbWVzIGlzIG5vdCBhIHN0cmluZ1xuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBjYWxsYmFjayBpcyBub3QgYSBmdW5jdGlvblxuICAgKi9cbiAgYXN5bmMgbWFwKHJlbGF0aW9uTmFtZXMsIGNhbGxiYWNrKSB7XG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJUaGUgY2FsbGJhY2sgZnVuY3Rpb24gbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IG5vZGVzID0gYXdhaXQgdGhpcy5maW5kKHJlbGF0aW9uTmFtZXMpO1xuICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcblxuICAgIGZvciAobGV0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgIHJlc3VsdHMucHVzaChjYWxsYmFjayhub2RlKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cblxuICAvKipcbiAgICogUmVjdXJzaXZlbHkgYXBwbGllcyBhIGZ1bmN0aW9uIHRvIGFsbCB0aGUgY2hpbGRyZW4gbm9kZXMgaW4gdGhlIGNvbnRleHQgYW5kIHJldHVybnMgdGhlIHJlc3VsdHMgaW4gYW4gYXJyYXkuXG4gICAqIEBwYXJhbSB7U3BpbmFsQ29udGV4dH0gY29udGV4dCBDb250ZXh0IHRvIHVzZSBmb3IgdGhlIHNlYXJjaFxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBGdW5jdGlvbiB0byBhcHBseSB0byB0aGUgbm9kZXNcbiAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8Kj4+fSBUaGUgcmVzdWx0cyBvZiB0aGUgY2FsbGJhY2sgZm9yIGVhY2ggbm9kZVxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGNvbnRleHQgaXMgbm90IGEgU3BpbmFsQ29udGV4dFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBjYWxsYmFjayBpcyBub3QgYSBmdW5jdGlvblxuICAgKi9cbiAgYXN5bmMgbWFwSW5Db250ZXh0KGNvbnRleHQsIGNhbGxiYWNrKSB7XG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJUaGUgY2FsbGJhY2sgZnVuY3Rpb24gbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IG5vZGVzID0gYXdhaXQgdGhpcy5maW5kSW5Db250ZXh0KGNvbnRleHQpO1xuICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcblxuICAgIGZvciAobGV0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgIHJlc3VsdHMucHVzaChjYWxsYmFjayhub2RlKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSByZWxhdGlvbiBsaXN0IGNvcnJlc3BvbmRpbmcgdG8gdGhlIHJlbGF0aW9uIHR5cGUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvblR5cGUgVHlwZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHJldHVybnMge1NwaW5hbE1hcH0gUmV0dXJuIHRoZSByZWxhdGlvbiBsaXN0IGNvcnJlc3BvbmRpbmcgdG8gdGhlIHJlbGF0aW9uIHR5cGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9nZXRDaGlsZHJlblR5cGUocmVsYXRpb25UeXBlKSB7XG4gICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4uZ2V0RWxlbWVudChyZWxhdGlvblR5cGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgcmVsYXRpb24gY29ycmVzcG9uZGluZy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uTmFtZSBOYW1lIG9mIHRoZSByZWxhdGlvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25UeXBlIFR5cGUgb2YgdGhlIHJlbGF0aW9uXG4gICAqIEByZXR1cm5zIHtTcGluYWxSZWxhdGlvbn0gVGhlIHJlbGF0aW9uIGNvcnJlc3BvbmRpbmdcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9nZXRSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSkge1xuICAgIHJldHVybiB0aGlzLl9nZXRDaGlsZHJlblR5cGUocmVsYXRpb25UeXBlKS5nZXRFbGVtZW50KHJlbGF0aW9uTmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIHBhcmVudCByZWxhdGlvbiBvZiB0aGUgbm9kZS5cbiAgICogQHBhcmFtIHtTcGluYWxSZWxhdGlvbn0gcmVsYXRpb24gUmVsYXRpb24gdG8gcmVtb3ZlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcmVtb3ZlUGFyZW50KHJlbGF0aW9uKSB7XG4gICAgY29uc3QgcGFyZW50THN0ID0gdGhpcy5wYXJlbnRzLmdldEVsZW1lbnQocmVsYXRpb24uZ2V0TmFtZSgpLmdldCgpKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyZW50THN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocGFyZW50THN0W2ldLmdldElkKCkuZ2V0KCkgPT09IHJlbGF0aW9uLmdldElkKCkuZ2V0KCkpIHtcbiAgICAgICAgcGFyZW50THN0LnNwbGljZShpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIG5vZGUgZnJvbSBhbGwgcGFyZW50IHJlbGF0aW9uIHRoZSBwcm9wZXJ0eSBwYXJlbnRzLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYXN5bmMgX3JlbW92ZUZyb21QYXJlbnRzKCkge1xuICAgIGNvbnN0IHByb21pc2VzID0gW107XG5cbiAgICBmb3IgKGxldCBbLCBwYXJlbnRdIG9mIHRoaXMucGFyZW50cykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJlbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcGFyZW50W2ldLmxvYWQoKS50aGVuKHBhcmVudFJlbCA9PiB7XG4gICAgICAgICAgcHJvbWlzZXMucHVzaChwYXJlbnRSZWwucmVtb3ZlQ2hpbGQodGhpcykpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyB0aGUgcmVsYXRpb24gYXMgcGFyZW50IG9mIHRoZSBub2RlLlxuICAgKiBAcGFyYW0ge1NwaW5hbFJlbGF0aW9ufSByZWxhdGlvbiBQYXJlbnQgcmVsYXRpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9hZGRQYXJlbnQocmVsYXRpb24pIHtcbiAgICBjb25zdCByZWxhdGlvbk5hbWUgPSByZWxhdGlvbi5nZXROYW1lKCkuZ2V0KCk7XG5cbiAgICBpZiAodGhpcy5wYXJlbnRzLmhhcyhyZWxhdGlvbk5hbWUpKSB7XG4gICAgICB0aGlzLnBhcmVudHNcbiAgICAgICAgLmdldEVsZW1lbnQocmVsYXRpb25OYW1lKVxuICAgICAgICAucHVzaChuZXcgU3BpbmFsTm9kZVBvaW50ZXIocmVsYXRpb24sIHRydWUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbGlzdCA9IG5ldyBMc3QoKTtcbiAgICAgIGxpc3QucHVzaChuZXcgU3BpbmFsTm9kZVBvaW50ZXIocmVsYXRpb24sIHRydWUpKTtcbiAgICAgIHRoaXMucGFyZW50cy5zZXRFbGVtZW50KHJlbGF0aW9uTmFtZSwgbGlzdCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyByZWxhdGlvbiBmb3IgdGhpcyBub2RlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25OYW1lIE5hbWUgb2YgdGhlIHJlbGF0aW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvblR5cGUgVHlwZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9jcmVhdGVSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSkge1xuICAgIGNvbnN0IHJlbGF0aW9uID0gU3BpbmFsUmVsYXRpb25GYWN0b3J5LmdldE5ld1JlbGF0aW9uKFxuICAgICAgdGhpcyxcbiAgICAgIHJlbGF0aW9uTmFtZSxcbiAgICAgIHJlbGF0aW9uVHlwZVxuICAgICk7XG5cbiAgICBpZiAoIXRoaXMuY2hpbGRyZW4uaGFzKHJlbGF0aW9uVHlwZSkpIHtcbiAgICAgIHRoaXMuY2hpbGRyZW4uc2V0RWxlbWVudChyZWxhdGlvblR5cGUsIG5ldyBTcGluYWxNYXAoKSk7XG4gICAgfVxuXG4gICAgdGhpcy5fZ2V0Q2hpbGRyZW5UeXBlKHJlbGF0aW9uVHlwZSkuc2V0RWxlbWVudChyZWxhdGlvbk5hbWUsIHJlbGF0aW9uKTtcbiAgICByZXR1cm4gcmVsYXRpb247XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFsbCBjaGlsZHJlbiByZWxhdGlvbiBmcm9tIHRoZSBncmFwaC5cbiAgICogQHJldHVybnMge1Byb21pc2U8bm90aGluZz59IEFuIGVtcHR5IHByb21pc2VcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFzeW5jIF9yZW1vdmVGcm9tQ2hpbGRyZW4oKSB7XG4gICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcblxuICAgIGZvciAobGV0IFssIHJlbGF0aW9uTWFwXSBvZiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICBmb3IgKGxldCBbLCByZWxhdGlvbl0gb2YgcmVsYXRpb25NYXApIHtcbiAgICAgICAgcHJvbWlzZXMucHVzaChyZWxhdGlvbi5yZW1vdmVGcm9tR3JhcGgoKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICB9XG59XG5cbnNwaW5hbENvcmUucmVnaXN0ZXJfbW9kZWxzKFtTcGluYWxOb2RlXSk7XG5leHBvcnQgZGVmYXVsdCBTcGluYWxOb2RlO1xuIl19