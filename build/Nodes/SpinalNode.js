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

const DEFAULT_PREDICATE = () => true;
/**
 * Node of a graph.
 * @extends Model
 */


class SpinalNode extends _spinalCoreConnectorjs_type.Model {
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
        let relationMap = _step.value;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = relationMap[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            let relation = _step2.value;
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
   * @returns {Boolean} A boolean
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
   * @returns {Boolean} Return true is the relation is contained in the node and false otherwise.
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
   * @returns {Boolean} Return true if the node contains all the relations in relationNames, false otherwise.
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
        let relationMap = _step4.value;
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
   * Returns the children of the node for the relation names.
   * @param {Array<String>} relationNames Array containing the relation names of the desired children
   * @returns {Promise<Array<SpinalNode>>} The children that were found
   * @throws {TypeError} If relationNames is neither an array, a string or omitted
   * @throws {TypeError} If an element of relationNames is not a string
   */


  getChildren(relationNames) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      if (Array.isArray(relationNames)) {
        if (relationNames.length === 0) {
          relationNames = _this4.getRelationNames();
        }
      } else if (relationNames === undefined) {
        relationNames = _this4.getRelationNames();
      } else if (typeof relationNames === "string") {
        relationNames = [relationNames];
      } else {
        throw TypeError("relationNames must be an array, a string or omitted");
      }

      const promises = [];
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = _this4.children[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          let relationMap = _step5.value;

          for (let j = 0; j < relationNames.length; j++) {
            if (relationMap.has(relationNames[j])) {
              const relation = relationMap.getElement(relationNames[j]);
              promises.push(relation.getChildren());
            }
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

      const childrenLst = yield Promise.all(promises);
      let res = [];
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = childrenLst[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          let children = _step6.value;

          for (let i = 0; i < children.length; i++) {
            res.push(children[i]);
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
    var _this5 = this;

    return _asyncToGenerator(function* () {
      if (!(context instanceof _index.SpinalContext)) {
        throw TypeError("context must be a SpinalContext");
      }

      const promises = [];
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = _this5.children[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          let relationMap = _step7.value;
          var _iteratorNormalCompletion9 = true;
          var _didIteratorError9 = false;
          var _iteratorError9 = undefined;

          try {
            for (var _iterator9 = relationMap[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
              let relation = _step9.value;

              if (relation.belongsToContext(context)) {
                promises.push(relation.getChildrenInContext(context));
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

      const childrenLst = yield Promise.all(promises);
      let res = [];
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = childrenLst[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          let children = _step8.value;

          for (let i = 0; i < children.length; i++) {
            res.push(children[i]);
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

      return res;
    })();
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
    var _iteratorNormalCompletion10 = true;
    var _didIteratorError10 = false;
    var _iteratorError10 = undefined;

    try {
      for (var _iterator10 = relationNames[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
        let name = _step10.value;
        const list = this.parents.getElement(name);

        for (let i = 0; i < list.length; i++) {
          promises.push(list[i].load().then(relation => {
            return relation.getParent();
          }));
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


  find(relationNames, predicate = DEFAULT_PREDICATE) {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      if (!Array.isArray(relationNames) && relationNames !== undefined && typeof relationNames !== "string") {
        throw TypeError("relationNames must be an array, a string or omitted");
      }

      if (typeof predicate !== "function") {
        throw TypeError("predicate must be a function");
      }

      const seen = new Set([_this6]);
      let promises = [];
      let nextGen = [_this6];
      let currentGen = [];
      const found = [];

      while (nextGen.length) {
        currentGen = nextGen;
        promises = [];
        nextGen = [];

        for (var _i = 0; _i < currentGen.length; _i++) {
          let node = currentGen[_i];
          promises.push(node.getChildren(relationNames));

          if (predicate(node)) {
            found.push(node);
          }
        }

        let childrenArrays = yield Promise.all(promises);
        var _iteratorNormalCompletion11 = true;
        var _didIteratorError11 = false;
        var _iteratorError11 = undefined;

        try {
          for (var _iterator11 = childrenArrays[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
            let children = _step11.value;
            var _iteratorNormalCompletion12 = true;
            var _didIteratorError12 = false;
            var _iteratorError12 = undefined;

            try {
              for (var _iterator12 = children[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                let child = _step12.value;

                if (!seen.has(child)) {
                  nextGen.push(child);
                  seen.add(child);
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
      }

      return found;
    })();
  }
  /**
   * Recursively finds all the children nodes in the context for which the predicate is true..
   * @param {SpinalContext} context Context to use for the search
   * @param {function} predicate Function returning true if the node needs to be returned
   * @returns {Promise<Array<SpinalNode>>} The nodes that were found
   * @throws {TypeError} If context is not a SpinalContext
   * @throws {TypeError} If the predicate is not a function
   */


  findInContext(context, predicate = DEFAULT_PREDICATE) {
    var _this7 = this;

    return _asyncToGenerator(function* () {
      if (typeof predicate !== "function") {
        throw new Error("The predicate function must be a function");
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
          promises.push(node.getChildrenInContext(context));

          if (predicate(node)) {
            found.push(node);
          }
        }

        let childrenArrays = yield Promise.all(promises);
        var _iteratorNormalCompletion13 = true;
        var _didIteratorError13 = false;
        var _iteratorError13 = undefined;

        try {
          for (var _iterator13 = childrenArrays[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
            let children = _step13.value;
            var _iteratorNormalCompletion14 = true;
            var _didIteratorError14 = false;
            var _iteratorError14 = undefined;

            try {
              for (var _iterator14 = children[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                let child = _step14.value;

                if (!seen.has(child)) {
                  nextGen.push(child);
                  seen.add(child);
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

      return found;
    })();
  }
  /**
   * Recursively applies a function to all the children nodes.
   * @param {Array<String>} relationNames Array containing the relation names to follow
   * @param {function} callback Function to apply to the nodes
   * @throws {TypeError} If the relationNames are neither an array, a string or omitted
   * @throws {TypeError} If an element of relationNames is not a string
   * @throws {TypeError} If the callback is not a function
   */


  forEach(relationNames, callback) {
    var _this8 = this;

    return _asyncToGenerator(function* () {
      if (typeof callback !== "function") {
        throw TypeError("callback must be a function");
      }

      const nodes = yield _this8.find(relationNames);
      var _iteratorNormalCompletion15 = true;
      var _didIteratorError15 = false;
      var _iteratorError15 = undefined;

      try {
        for (var _iterator15 = nodes[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
          let node = _step15.value;
          callback(node);
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
    })();
  }
  /**
   * Recursively applies a function to all the children nodes in the context.
   * @param {SpinalContext} context Context to use for the search
   * @param {function} callback Function to apply to the nodes
   * @throws {TypeError} If context is not a SpinalContext
   * @throws {TypeError} If the callback is not a function
   */


  forEachInContext(context, callback) {
    var _this9 = this;

    return _asyncToGenerator(function* () {
      if (typeof callback !== "function") {
        throw TypeError("callback must be a function");
      }

      const nodes = yield _this9.findInContext(context);
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
   * Recursively applies a function to all the children nodes and returns the results in an array.
   * @param {Array<String>} relationNames Array containing the relation names to follow
   * @param {function} callback Function to apply to the nodes
   * @returns {Promise<Array<*>>} The results of the callback for each node
   * @throws {TypeError} If the relationNames are neither an array, a string or omitted
   * @throws {TypeError} If an element of relationNames is not a string
   * @throws {TypeError} If the callback is not a function
   */


  map(relationNames, callback) {
    var _this10 = this;

    return _asyncToGenerator(function* () {
      if (typeof callback !== "function") {
        throw TypeError("The callback function must be a function");
      }

      const nodes = yield _this10.find(relationNames);
      const results = [];
      var _iteratorNormalCompletion17 = true;
      var _didIteratorError17 = false;
      var _iteratorError17 = undefined;

      try {
        for (var _iterator17 = nodes[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
          let node = _step17.value;
          results.push(callback(node));
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
    var _this11 = this;

    return _asyncToGenerator(function* () {
      if (typeof callback !== "function") {
        throw TypeError("The callback function must be a function");
      }

      const nodes = yield _this11.findInContext(context);
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
    var _this12 = this;

    return _asyncToGenerator(function* () {
      const promises = [];
      var _iteratorNormalCompletion19 = true;
      var _didIteratorError19 = false;
      var _iteratorError19 = undefined;

      try {
        for (var _iterator19 = _this12.parents[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
          let parent = _step19.value;

          for (let i = 0; i < parent.length; i++) {
            parent[i].load().then(parentRel => {
              promises.push(parentRel.removeChild(_this12));
            });
          }
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
    var _this13 = this;

    return _asyncToGenerator(function* () {
      const promises = [];
      var _iteratorNormalCompletion20 = true;
      var _didIteratorError20 = false;
      var _iteratorError20 = undefined;

      try {
        for (var _iterator20 = _this13.children[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
          let relationMap = _step20.value;
          var _iteratorNormalCompletion21 = true;
          var _didIteratorError21 = false;
          var _iteratorError21 = undefined;

          try {
            for (var _iterator21 = relationMap[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
              let relation = _step21.value;
              promises.push(relation.removeFromGraph());
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

}

_spinalCoreConnectorjs_type.spinalCore.register_models([SpinalNode]);

var _default = SpinalNode;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Ob2Rlcy9TcGluYWxOb2RlLmpzIl0sIm5hbWVzIjpbIkRFRkFVTFRfUFJFRElDQVRFIiwiU3BpbmFsTm9kZSIsIk1vZGVsIiwiY29uc3RydWN0b3IiLCJuYW1lIiwidHlwZSIsImVsZW1lbnQiLCJhZGRfYXR0ciIsImluZm8iLCJpZCIsInBhcmVudHMiLCJTcGluYWxNYXAiLCJjaGlsZHJlbiIsInVuZGVmaW5lZCIsIlNwaW5hbE5vZGVQb2ludGVyIiwiY29udGV4dElkcyIsIlNwaW5hbFNldCIsImdldElkIiwiZ2V0TmFtZSIsImdldFR5cGUiLCJnZXRFbGVtZW50IiwibG9hZCIsImdldENoaWxkcmVuSWRzIiwibm9kZUNoaWxkcmVuSWRzIiwicmVsYXRpb25NYXAiLCJyZWxhdGlvbiIsInJlbENoaWxkcmVuSWRzIiwiaSIsImxlbmd0aCIsInB1c2giLCJnZXROYkNoaWxkcmVuIiwiY2hpbGRyZW5JZHMiLCJhZGRDb250ZXh0SWQiLCJUeXBlRXJyb3IiLCJoYXMiLCJhZGQiLCJnZXRDb250ZXh0SWRzIiwidmFsdWVzIiwiYmVsb25nc1RvQ29udGV4dCIsImNvbnRleHQiLCJTcGluYWxDb250ZXh0IiwiZ2V0IiwiaGFzUmVsYXRpb24iLCJyZWxhdGlvbk5hbWUiLCJyZWxhdGlvblR5cGUiLCJSRUxBVElPTl9UWVBFX0xJU1QiLCJpbmNsdWRlcyIsIkVycm9yIiwidHlwZU1hcCIsIl9nZXRDaGlsZHJlblR5cGUiLCJoYXNSZWxhdGlvbnMiLCJyZWxhdGlvbk5hbWVzIiwiQXJyYXkiLCJpc0FycmF5IiwiZ2V0UmVsYXRpb25OYW1lcyIsIm5hbWVzIiwia2V5cyIsImZyb20iLCJTZXQiLCJhZGRDaGlsZCIsImNoaWxkIiwiX2NyZWF0ZVJlbGF0aW9uIiwiX2dldFJlbGF0aW9uIiwiYWRkQ2hpbGRJbkNvbnRleHQiLCJyZW1vdmVDaGlsZCIsIm5vZGUiLCJyZWwiLCJyZW1vdmVDaGlsZHJlbiIsIm5vZGVzIiwicmVtb3ZlUmVsYXRpb24iLCJyZW1vdmVGcm9tR3JhcGgiLCJQcm9taXNlIiwiYWxsIiwiX3JlbW92ZUZyb21QYXJlbnRzIiwiX3JlbW92ZUZyb21DaGlsZHJlbiIsImdldENoaWxkcmVuIiwicHJvbWlzZXMiLCJqIiwiY2hpbGRyZW5Mc3QiLCJyZXMiLCJnZXRDaGlsZHJlbkluQ29udGV4dCIsImdldFBhcmVudHMiLCJsaXN0IiwidGhlbiIsImdldFBhcmVudCIsImZpbmQiLCJwcmVkaWNhdGUiLCJzZWVuIiwibmV4dEdlbiIsImN1cnJlbnRHZW4iLCJmb3VuZCIsImNoaWxkcmVuQXJyYXlzIiwiZmluZEluQ29udGV4dCIsImZvckVhY2giLCJjYWxsYmFjayIsImZvckVhY2hJbkNvbnRleHQiLCJtYXAiLCJyZXN1bHRzIiwibWFwSW5Db250ZXh0IiwiX3JlbW92ZVBhcmVudCIsInBhcmVudExzdCIsInNwbGljZSIsInBhcmVudCIsInBhcmVudFJlbCIsIl9hZGRQYXJlbnQiLCJMc3QiLCJzZXRFbGVtZW50IiwiU3BpbmFsUmVsYXRpb25GYWN0b3J5IiwiZ2V0TmV3UmVsYXRpb24iLCJzcGluYWxDb3JlIiwicmVnaXN0ZXJfbW9kZWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBd0JBOztBQU1BOztBQUlBOztBQUlBOztBQUNBOztBQUdBOztBQUNBOztBQUNBOzs7Ozs7OztBQUlBLE1BQU1BLGlCQUFpQixHQUFHLE1BQU0sSUFBaEM7QUFFQTs7Ozs7O0FBSUEsTUFBTUMsVUFBTixTQUF5QkMsaUNBQXpCLENBQStCO0FBQzdCOzs7Ozs7O0FBT0FDLEVBQUFBLFdBQVcsQ0FBQ0MsSUFBSSxHQUFHLFdBQVIsRUFBcUJDLElBQUksR0FBRyxZQUE1QixFQUEwQ0MsT0FBMUMsRUFBbUQ7QUFDNUQ7QUFFQSxTQUFLQyxRQUFMLENBQWM7QUFDWkMsTUFBQUEsSUFBSSxFQUFFO0FBQ0pDLFFBQUFBLEVBQUUsRUFBRSxxQkFBSyxLQUFLTixXQUFMLENBQWlCQyxJQUF0QixDQURBO0FBRUpBLFFBQUFBLElBQUksRUFBRUEsSUFGRjtBQUdKQyxRQUFB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QWNzQixHQUFkLENBQWtCVSxZQUFsQixDQUFMLEVBQXNDO0FBQ3BDLFdBQUtoQyxRQUFMLENBQWM4RixVQUFkLENBQXlCOUQsWUFBekIsRUFBdUMsSUFBSWpDLGtCQUFKLEVBQXZDO0FBQ0Q7O0FBRUQsU0FBS3NDLGdCQUFMLENBQXNCTCxZQUF0QixFQUFvQzhELFVBQXBDLENBQStDL0QsWUFBL0MsRUFBNkRsQixRQUE3RDs7QUFDQSxXQUFPQSxRQUFQO0FBQ0Q7QUFFRDs7Ozs7OztBQUtNaUQsRUFBQUEsbUJBQU4sR0FBNEI7QUFBQTs7QUFBQTtBQUMxQixZQUFNRSxRQUFRLEdBQUcsRUFBakI7QUFEMEI7QUFBQTtBQUFBOztBQUFBO0FBRzFCLCtCQUF3QixPQUFJLENBQUNoRSxRQUE3Qix3SUFBdUM7QUFBQSxjQUE5QlksV0FBOEI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDckMsbUNBQXFCQSxXQUFyQix3SUFBa0M7QUFBQSxrQkFBekJDLFFBQXlCO0FBQ2hDbUQsY0FBQUEsUUFBUSxDQUFDL0MsSUFBVCxDQUFjSixRQUFRLENBQUM2QyxlQUFULEVBQWQ7QUFDRDtBQUhvQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSXRDO0FBUHlCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBUzFCLFlBQU1DLE9BQU8sQ0FBQ0MsR0FBUixDQUFZSSxRQUFaLENBQU47QUFUMEI7QUFVM0I7O0FBbHZCNEI7O0FBcXZCL0JpQyx1Q0FBV0MsZUFBWCxDQUEyQixDQUFDN0csVUFBRCxDQUEzQjs7ZUFDZUEsVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOCBTcGluYWxDb20gLSB3d3cuc3BpbmFsY29tLmNvbVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFNwaW5hbENvcmUuXG4gKlxuICogUGxlYXNlIHJlYWQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgdGVybXMgYW5kIGNvbmRpdGlvbnNcbiAqIG9mIHRoZSBGcmVlIFNvZnR3YXJlIGxpY2Vuc2UgQWdyZWVtZW50IChcIkFncmVlbWVudFwiKVxuICogY2FyZWZ1bGx5LlxuICpcbiAqIFRoaXMgQWdyZWVtZW50IGlzIGEgbGVnYWxseSBiaW5kaW5nIGNvbnRyYWN0IGJldHdlZW5cbiAqIHRoZSBMaWNlbnNlZSAoYXMgZGVmaW5lZCBiZWxvdykgYW5kIFNwaW5hbENvbSB0aGF0XG4gKiBzZXRzIGZvcnRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyB0aGF0IGdvdmVybiB5b3VyXG4gKiB1c2Ugb2YgdGhlIFByb2dyYW0uIEJ5IGluc3RhbGxpbmcgYW5kL29yIHVzaW5nIHRoZVxuICogUHJvZ3JhbSwgeW91IGFncmVlIHRvIGFiaWRlIGJ5IGFsbCB0aGUgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zIHN0YXRlZCBvciByZWZlcmVuY2VkIGhlcmVpbi5cbiAqXG4gKiBJZiB5b3UgZG8gbm90IGFncmVlIHRvIGFiaWRlIGJ5IHRoZXNlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucywgZG8gbm90IGRlbW9uc3RyYXRlIHlvdXIgYWNjZXB0YW5jZSBhbmQgZG9cbiAqIG5vdCBpbnN0YWxsIG9yIHVzZSB0aGUgUHJvZ3JhbS5cbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYWxvbmdcbiAqIHdpdGggdGhpcyBmaWxlLiBJZiBub3QsIHNlZVxuICogPGh0dHA6Ly9yZXNvdXJjZXMuc3BpbmFsY29tLmNvbS9saWNlbnNlcy5wZGY+LlxuICovXG5cbmltcG9ydCB7XG4gIHNwaW5hbENvcmUsXG4gIE1vZGVsLFxuICBMc3Rcbn0gZnJvbSBcInNwaW5hbC1jb3JlLWNvbm5lY3RvcmpzX3R5cGVcIjtcblxuaW1wb3J0IHtcbiAgZ3VpZFxufSBmcm9tIFwiLi4vVXRpbGl0aWVzXCI7XG5cbmltcG9ydCB7XG4gIFNwaW5hbENvbnRleHRcbn0gZnJvbSBcIi4uL2luZGV4XCI7XG5cbmltcG9ydCBTcGluYWxOb2RlUG9pbnRlciBmcm9tIFwiLi4vU3BpbmFsTm9kZVBvaW50ZXJcIjtcbmltcG9ydCB7XG4gIFNwaW5hbFJlbGF0aW9uRmFjdG9yeVxufSBmcm9tIFwiLi4vUmVsYXRpb25zL1NwaW5hbFJlbGF0aW9uRmFjdG9yeVwiO1xuaW1wb3J0IFNwaW5hbE1hcCBmcm9tIFwiLi4vU3BpbmFsTWFwXCI7XG5pbXBvcnQgU3BpbmFsU2V0IGZyb20gXCIuLi9TcGluYWxTZXRcIjtcbmltcG9ydCB7XG4gIFJFTEFUSU9OX1RZUEVfTElTVFxufSBmcm9tIFwiLi4vLi4vYnVpbGQvUmVsYXRpb25zL1NwaW5hbFJlbGF0aW9uRmFjdG9yeVwiO1xuXG5jb25zdCBERUZBVUxUX1BSRURJQ0FURSA9ICgpID0+IHRydWU7XG5cbi8qKlxuICogTm9kZSBvZiBhIGdyYXBoLlxuICogQGV4dGVuZHMgTW9kZWxcbiAqL1xuY2xhc3MgU3BpbmFsTm9kZSBleHRlbmRzIE1vZGVsIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yIGZvciB0aGUgU3BpbmFsTm9kZSBjbGFzcy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgTmFtZSBvZiB0aGUgbm9kZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBUeXBlIG9mIHRoZSBub2RlXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZSB8IE1vZGVsfSBlbGVtZW50IEVsZW1lbnQgb2YgdGhlIG5vZGVcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgZWxlbWVudCBpcyBub3QgYSBNb2RlbFxuICAgKi9cbiAgY29uc3RydWN0b3IobmFtZSA9IFwidW5kZWZpbmVkXCIsIHR5cGUgPSBcIlNwaW5hbE5vZGVcIiwgZWxlbWVudCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmFkZF9hdHRyKHtcbiAgICAgIGluZm86IHtcbiAgICAgICAgaWQ6IGd1aWQodGhpcy5jb25zdHJ1Y3Rvci5uYW1lKSxcbiAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgdHlwZTogdHlwZVxuICAgICAgfSxcbiAgICAgIHBhcmVudHM6IG5ldyBTcGluYWxNYXAoKSxcbiAgICAgIGNoaWxkcmVuOiBuZXcgU3BpbmFsTWFwKCksXG4gICAgICBlbGVtZW50OiBlbGVtZW50ICE9PSB1bmRlZmluZWQgPyBuZXcgU3BpbmFsTm9kZVBvaW50ZXIoZWxlbWVudCkgOiB1bmRlZmluZWQsXG4gICAgICBjb250ZXh0SWRzOiBuZXcgU3BpbmFsU2V0KClcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBpZC5cbiAgICogQHJldHVybnMge1N0cn0gSWQgb2YgdGhlIG5vZGVcbiAgICovXG4gIGdldElkKCkge1xuICAgIHJldHVybiB0aGlzLmluZm8uaWQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbmFtZS5cbiAgICogQHJldHVybnMge1N0cn0gTmFtZSBvZiB0aGUgbm9kZVxuICAgKi9cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbmZvLm5hbWU7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdHlwZS5cbiAgICogQHJldHVybnMge1N0cn0gVHlwZSBvZiB0aGUgbm9kZVxuICAgKi9cbiAgZ2V0VHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbmZvLnR5cGU7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZWxlbWVudC5cbiAgICogQHJldHVybnMge1Byb21pc2U8Kj59IEEgcHJvbWlzZSB3aGVyZSB0aGUgcGFyYW1ldGVyIG9mIHRoZSByZXNvbHZlIG1ldGhvZCBpcyB0aGUgZWxlbWVudFxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuZWxlbWVudCA9IG5ldyBTcGluYWxOb2RlUG9pbnRlcihuZXcgTW9kZWwoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC5sb2FkKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbGwgdGhlIGNoaWxkcmVuIGlkcyBpbiBhbiBhcnJheS5cbiAgICogQHJldHVybnMge0FycmF5PFN0cmluZz59IElkcyBvZiB0aGUgY2hpbGRyZW5cbiAgICovXG4gIGdldENoaWxkcmVuSWRzKCkge1xuICAgIGNvbnN0IG5vZGVDaGlsZHJlbklkcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgcmVsYXRpb25NYXAgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgZm9yIChsZXQgcmVsYXRpb24gb2YgcmVsYXRpb25NYXApIHtcbiAgICAgICAgbGV0IHJlbENoaWxkcmVuSWRzID0gcmVsYXRpb24uZ2V0Q2hpbGRyZW5JZHMoKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlbENoaWxkcmVuSWRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgbm9kZUNoaWxkcmVuSWRzLnB1c2gocmVsQ2hpbGRyZW5JZHNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub2RlQ2hpbGRyZW5JZHM7XG4gIH1cblxuICAvKipcbiAgICogQ29tcHV0ZXMgYW5kIHJldHVybnMgdGhlIG51bWJlciBvZiBjaGlsZHJlbiBvZiB0aGUgbm9kZS5cbiAgICogQHJldHVybnMge051bWJlcn0gVGhlIG51bWJlciBvZiBjaGlsZHJlblxuICAgKi9cbiAgZ2V0TmJDaGlsZHJlbigpIHtcbiAgICBsZXQgY2hpbGRyZW5JZHMgPSB0aGlzLmdldENoaWxkcmVuSWRzKCk7XG5cbiAgICByZXR1cm4gY2hpbGRyZW5JZHMubGVuZ3RoO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYW4gaWQgdG8gdGhlIGNvbnRleHQgaWRzIG9mIHRoZSBub2RlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgSWQgb2YgdGhlIGNvbnRleHRcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgaWQgaXMgbm90IGEgc3RyaW5nXG4gICAqL1xuICBhZGRDb250ZXh0SWQoaWQpIHtcbiAgICBpZiAodHlwZW9mIGlkICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJpZCBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5jb250ZXh0SWRzLmhhcyhpZCkpIHtcbiAgICAgIHRoaXMuY29udGV4dElkcy5hZGQoaWQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbGlzdCBvZiB0aGUgY29udGV4dHMgdGhlIG5vZGUgaXMgYXNzb2NpYXRlZCB0by5cbiAgICogQHJldHVybnMge0FycmF5PFN0cmluZz59IEFuIGFycmF5IG9mIGlkcyBvZiB0aGUgYXNzb2NpYXRlZCBjb250ZXh0c1xuICAgKi9cbiAgZ2V0Q29udGV4dElkcygpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0SWRzLnZhbHVlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgbm9kZSBiZWxvbmdzIHRvIHRoZSBjb250ZXh0LlxuICAgKiBAcGFyYW0ge1NwaW5hbENvbnRleHR9IGNvbnRleHQgVGhlIGNvbnRleHQgdGhhdCBtaWdodCBvd24gdGhlIG5vZGVcbiAgICogQHJldHVybnMge0Jvb2xlYW59IEEgYm9vbGVhblxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGNvbnRleHQgaXMgbm90IGEgU3BpbmFsQ29udGV4dFxuICAgKi9cbiAgYmVsb25nc1RvQ29udGV4dChjb250ZXh0KSB7XG4gICAgaWYgKCEoY29udGV4dCBpbnN0YW5jZW9mIFNwaW5hbENvbnRleHQpKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJjb250ZXh0IG11c3QgYmUgYSBTcGluYWxDb250ZXh0XCIpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNvbnRleHRJZHMuaGFzKGNvbnRleHQuZ2V0SWQoKS5nZXQoKSk7XG4gIH1cblxuICAvKipcbiAgICogVmVyaWZ5IGlmIHRoZSBub2RlIGNvbnRhaW5zIHRoZSByZWxhdGlvbiBuYW1lLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25OYW1lIE5hbWUgb2YgdGhlIHJlbGF0aW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvblR5cGUgVHlwZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybiB0cnVlIGlzIHRoZSByZWxhdGlvbiBpcyBjb250YWluZWQgaW4gdGhlIG5vZGUgYW5kIGZhbHNlIG90aGVyd2lzZS5cbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgcmVsYXRpb24gbmFtZSBpcyBub3QgYSBzdHJpbmdcbiAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSByZWxhdGlvbiB0eXBlIGRvZXNuJ3QgZXhpc3RcbiAgICovXG4gIGhhc1JlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKSB7XG4gICAgaWYgKHR5cGVvZiByZWxhdGlvbk5hbWUgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcInRoZSByZWxhdGlvbiBuYW1lIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgfVxuXG4gICAgaWYgKCFSRUxBVElPTl9UWVBFX0xJU1QuaW5jbHVkZXMocmVsYXRpb25UeXBlKSkge1xuICAgICAgdGhyb3cgRXJyb3IoXCJpbnZhbGlkIHJlbGF0aW9uIHR5cGVcIik7XG4gICAgfVxuXG4gICAgY29uc3QgdHlwZU1hcCA9IHRoaXMuX2dldENoaWxkcmVuVHlwZShyZWxhdGlvblR5cGUpO1xuXG4gICAgaWYgKHR5cGVvZiB0eXBlTWFwID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHR5cGVNYXAuaGFzKHJlbGF0aW9uTmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogVmVyaWZ5IGlmIHRoZSBub2RlIGNvbnRhaW5zIGFsbCB0aGUgcmVsYXRpb24gbmFtZXMuXG4gICAqIEBwYXJhbSB7QXJyYXk8U3RyaW5nPn0gcmVsYXRpb25OYW1lcyBBcnJheSBjb250YWluaW5nIGFsbCB0aGUgcmVsYXRpb24gbmFtZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25UeXBlIFR5cGUgb2YgdGhlIHJlbGF0aW9uc1xuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJuIHRydWUgaWYgdGhlIG5vZGUgY29udGFpbnMgYWxsIHRoZSByZWxhdGlvbnMgaW4gcmVsYXRpb25OYW1lcywgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSByZWxhdGlvbiBuYW1lcyBhcmUgbm90IGluIGFuIGFycmF5XG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgb25lIG9mIHRoZSByZWxhdGlvbiBuYW1lcyBpcyBub3QgYSBzdHJpbmdcbiAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSByZWxhdGlvbiB0eXBlIGRvZXNuJ3QgZXhpc3RcbiAgICovXG4gIGhhc1JlbGF0aW9ucyhyZWxhdGlvbk5hbWVzLCByZWxhdGlvblR5cGUpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkocmVsYXRpb25OYW1lcykpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcIlRoZSByZWxhdGlvbiBuYW1lcyBtdXN0IGJlIGluIGFuIGFycmF5XCIpO1xuICAgIH1cblxuICAgIGlmICghUkVMQVRJT05fVFlQRV9MSVNULmluY2x1ZGVzKHJlbGF0aW9uVHlwZSkpIHtcbiAgICAgIHRocm93IEVycm9yKFwiaW52YWxpZCByZWxhdGlvbiB0eXBlXCIpO1xuICAgIH1cblxuICAgIGZvciAobGV0IHJlbGF0aW9uTmFtZSBvZiByZWxhdGlvbk5hbWVzKSB7XG4gICAgICBpZiAoIXRoaXMuaGFzUmVsYXRpb24ocmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFsbCB0aGUgcmVsYXRpb24gbmFtZXMgb2YgdGhlIG5vZGUuXG4gICAqIEByZXR1cm5zIHtBcnJheTxTdHJpbmc+fSBUaGUgbmFtZXMgb2YgdGhlIHJlbGF0aW9ucyBvZiB0aGUgbm9kZVxuICAgKi9cbiAgZ2V0UmVsYXRpb25OYW1lcygpIHtcbiAgICBjb25zdCBuYW1lcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgcmVsYXRpb25NYXAgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgbmFtZXMucHVzaCguLi5yZWxhdGlvbk1hcC5rZXlzKCkpO1xuICAgIH1cblxuICAgIC8vIFJlbW92ZXMgYWxsIGR1cGxpY2F0ZXNcbiAgICByZXR1cm4gQXJyYXkuZnJvbShuZXcgU2V0KG5hbWVzKSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIHRoZSBub2RlIGFzIGNoaWxkIG9mIHRoZSByZWxhdGlvbi5cbiAgICogQHBhcmFtIHtTcGluYWxOb2RlIHwgTW9kZWx9IGNoaWxkIEVsZW1lbnQgdG8gYWRkIGFzIGNoaWxkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk5hbWUgTmFtZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uVHlwZSBUeXBlIG9mIHRoZSByZWxhdGlvblxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxTcGluYWxOb2RlPn0gVGhlIGNoaWxkIG5vZGUgaW4gYSBwcm9taXNlXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIGNoaWxkIGlzIG5vdCBhIG1vZGVsXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIHJlbGF0aW9uIG5hbWUgaXMgbm90IGEgc3RyaW5nXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcmVsYXRpb24gdHlwZSBpcyBpbnZhbGlkXG4gICAqL1xuICBhc3luYyBhZGRDaGlsZChjaGlsZCwgcmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpIHtcbiAgICBsZXQgcmVsYXRpb247XG5cbiAgICBpZiAoIShjaGlsZCBpbnN0YW5jZW9mIE1vZGVsKSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFxuICAgICAgICBcIkNhbm5vdCBhZGQgYSBjaGlsZCB3aXRjaCBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgU3BpbmFsTm9kZSBvciBNb2RlbC5cIlxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKCEoY2hpbGQgaW5zdGFuY2VvZiBTcGluYWxOb2RlKSkge1xuICAgICAgY2hpbGQgPSBuZXcgU3BpbmFsTm9kZSh1bmRlZmluZWQsIHVuZGVmaW5lZCwgY2hpbGQpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5oYXNSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSkpIHtcbiAgICAgIHJlbGF0aW9uID0gdGhpcy5fY3JlYXRlUmVsYXRpb24ocmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZWxhdGlvbiA9IHRoaXMuX2dldFJlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKTtcbiAgICB9XG5cbiAgICBhd2FpdCByZWxhdGlvbi5hZGRDaGlsZChjaGlsZCk7XG4gICAgcmV0dXJuIGNoaWxkO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjaGlsZCBhbmQgbm90aWNlcyB0aGUgY29udGV4dCBpZiBhIG5ldyByZWxhdGlvbiB3YXMgY3JlYXRlZC5cbiAgICogQHBhcmFtIHtTcGluYWxOb2RlIHwgTW9kZWx9IGNoaWxkIE5vZGUgdG8gYWRkIGFzIGNoaWxkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk5hbWUgTmFtZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uVHlwZSBUeXBlIG9mIHRoZSByZWxhdGlvblxuICAgKiBAcGFyYW0ge1NwaW5hbENvbnRleHR9IGNvbnRleHQgQ29udGV4dCB0byB1cGRhdGVcbiAgICogQHJldHVybnMge1Byb21pc2U8U3BpbmFsTm9kZT59IFRoZSBjaGlsZCBub2RlIGluIGEgcHJvbWlzZVxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBjaGlsZCBpcyBub3QgYSBtb2RlbFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSByZWxhdGlvbiBuYW1lIGlzIG5vdCBhIHN0cmluZ1xuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBjb250ZXh0IGlzIG5vdCBhIFNwaW5hbENvbnRleHRcbiAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSByZWxhdGlvbiB0eXBlIGlzIGludmFsaWRcbiAgICovXG4gIGFzeW5jIGFkZENoaWxkSW5Db250ZXh0KGNoaWxkLCByZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSwgY29udGV4dCkge1xuICAgIGxldCByZWxhdGlvbjtcblxuICAgIGlmICghKGNvbnRleHQgaW5zdGFuY2VvZiBTcGluYWxDb250ZXh0KSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwiY29udGV4dCBtdXN0IGJlIGEgU3BpbmFDb250ZXh0XCIpO1xuICAgIH1cblxuICAgIGlmICghKGNoaWxkIGluc3RhbmNlb2YgTW9kZWwpKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXG4gICAgICAgIFwiQ2Fubm90IGFkZCBhIGNoaWxkIHdpdGNoIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBTcGluYWxOb2RlIG9yIE1vZGVsLlwiXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoIShjaGlsZCBpbnN0YW5jZW9mIFNwaW5hbE5vZGUpKSB7XG4gICAgICBjaGlsZCA9IG5ldyBTcGluYWxOb2RlKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBjaGlsZCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmhhc1JlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKSkge1xuICAgICAgcmVsYXRpb24gPSB0aGlzLl9jcmVhdGVSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbGF0aW9uID0gdGhpcy5fZ2V0UmVsYXRpb24ocmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpO1xuICAgIH1cblxuICAgIGNoaWxkLmFkZENvbnRleHRJZChjb250ZXh0LmdldElkKCkuZ2V0KCkpO1xuICAgIHJlbGF0aW9uLmFkZENvbnRleHRJZChjb250ZXh0LmdldElkKCkuZ2V0KCkpO1xuXG4gICAgYXdhaXQgcmVsYXRpb24uYWRkQ2hpbGQoY2hpbGQpO1xuICAgIHJldHVybiBjaGlsZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBub2RlIGZyb20gdGhlIHJlbGF0aW9uIGNoaWxkcmVuLlxuICAgKiBAcGFyYW0ge1NwaW5hbE5vZGV9IG5vZGUgTm9kZSB0byByZW1vdmVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uTmFtZSBOYW1lIG9mIHRoZSByZWxhdGlvbiB0byB3aWNoIHRoZSBub2RlIGJlbG9uZ3NcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uVHlwZSBUeXBlIG9mIHRoZSByZWxhdGlvbiB0byB3aWNoIHRoZSBub2RlIGJlbG9uZ3NcbiAgICogQHJldHVybnMge1Byb21pc2U8bm90aGluZz59IEFuIGVtcHR5IHByb21pc2VcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiByZWxhdGlvbiBuYW1lIGlzIG5vdCBhIHN0cmluZ1xuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgcmVsYXRpb24gdHlwZSBpcyBpbnZhbGlkXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiByZWxhdGlvbiBkb2Vzbid0IGV4aXN0XG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgY2hpbGQgZG9lc24ndCBleGlzdFxuICAgKi9cbiAgcmVtb3ZlQ2hpbGQobm9kZSwgcmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpIHtcbiAgICBpZiAoIXRoaXMuaGFzUmVsYXRpb24ocmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpKSB7XG4gICAgICB0aHJvdyBFcnJvcihcIlRoZSByZWxhdGlvbiBkb2Vzbid0IGV4aXN0XCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbCA9IHRoaXMuX2dldFJlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKTtcbiAgICByZXR1cm4gcmVsLnJlbW92ZUNoaWxkKG5vZGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgY2hpbGRyZW4gaW4gdGhlIGdpdmVuIHJlbGF0aW9uLlxuICAgKiBAcGFyYW0ge0FycmF5PFNwaW5hbE5vZGU+fSBub2RlcyBOb2RlcyB0byBkZWxldGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uTmFtZSBOYW1lIG9mIHRoZSByZWxhdGlvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25UeXBlIFR5cGUgb2YgdGhlIHJlbGF0aW9uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPG5vdGhpbmc+fSBBbiBlbXB0eSBwcm9taXNlXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgbm9kZXMgaXMgbm90IGFuIGFycmF5XG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgYW4gZWxlbWVudCBvZiBub2RlcyBpcyBub3QgYSBTcGluYWxOb2RlXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgcmVsYXRpb24gbmFtZSBpcyBub3QgYSBzdHJpbmdcbiAgICogQHRocm93cyB7RXJyb3J9IElmIHJlbGF0aW9uIHR5cGUgaXMgaW52YWxpZFxuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHJlbGF0aW9uIGRvZXNuJ3QgZXhpc3RcbiAgICogQHRocm93cyB7RXJyb3J9IElmIG9uZSBvZiB0aGUgbm9kZXMgaXMgbm90IGEgY2hpbGRcbiAgICovXG4gIHJlbW92ZUNoaWxkcmVuKG5vZGVzLCByZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShub2RlcykpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcIm5vZGVzIG11c3QgYmUgYW4gYXJyYXlcIik7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmhhc1JlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKSkge1xuICAgICAgdGhyb3cgRXJyb3IoXCJUaGUgcmVsYXRpb24gZG9lc24ndCBleGlzdFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCByZWwgPSB0aGlzLl9nZXRSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSk7XG4gICAgcmV0dXJuIHJlbC5yZW1vdmVDaGlsZHJlbihub2Rlcyk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNoaWxkIHJlbGF0aW9uIG9mIHRoZSBub2RlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25OYW1lIE5hbWUgb2YgdGhlIHJlbGF0aW9uIHRvIHJlbW92ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25UeXBlIFR5cGUgb2YgdGhlIHJlbGF0aW9uIHRvIHJlbW92ZVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxub3RoaW5nPn0gQW4gZW1wdHkgcHJvbWlzZVxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSByZWxhdGlvbk5hbWUgaXMgbm90IGEgc3RyaW5nXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcmVsYXRpb25UeXBlIGlzIGludmFsaWRcbiAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSByZWxhdGlvbiBkb2Vzbid0IGV4aXN0XG4gICAqL1xuICByZW1vdmVSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSkge1xuICAgIGlmICghdGhpcy5oYXNSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSkpIHtcbiAgICAgIHRocm93IEVycm9yKFwiVGhlIHJlbGF0aW9uIGRvZXNuJ3QgZXhpc3RcIik7XG4gICAgfVxuXG4gICAgY29uc3QgcmVsID0gdGhpcy5fZ2V0UmVsYXRpb24ocmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpO1xuICAgIHJldHVybiByZWwucmVtb3ZlRnJvbUdyYXBoKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIHRoZSBub2RlIGZyb20gdGhlIGdyYXBoIGkuZSByZW1vdmUgdGhlIG5vZGUgZnJvbSBhbGwgdGhlIHBhcmVudCByZWxhdGlvbnMgYW5kIHJlbW92ZSBhbGwgdGhlIGNoaWxkcmVuIHJlbGF0aW9ucy5cbiAgICogVGhpcyBvcGVyYXRpb24gbWlnaHQgZGVsZXRlIGFsbCB0aGUgc3ViLWdyYXBoIHVuZGVyIHRoaXMgbm9kZS5cbiAgICogQWZ0ZXIgdGhpcyBvcGVyYXRpb24gdGhlIG5vZGUgY2FuIGJlIGRlbGV0ZWQgd2l0aG91dCBmZWFyLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxub3RoaW5nPn0gQW4gZW1wdHkgcHJvbWlzZVxuICAgKi9cbiAgYXN5bmMgcmVtb3ZlRnJvbUdyYXBoKCkge1xuICAgIGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21QYXJlbnRzKCksXG4gICAgICB0aGlzLl9yZW1vdmVGcm9tQ2hpbGRyZW4oKVxuICAgIF0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGNoaWxkcmVuIG9mIHRoZSBub2RlIGZvciB0aGUgcmVsYXRpb24gbmFtZXMuXG4gICAqIEBwYXJhbSB7QXJyYXk8U3RyaW5nPn0gcmVsYXRpb25OYW1lcyBBcnJheSBjb250YWluaW5nIHRoZSByZWxhdGlvbiBuYW1lcyBvZiB0aGUgZGVzaXJlZCBjaGlsZHJlblxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxTcGluYWxOb2RlPj59IFRoZSBjaGlsZHJlbiB0aGF0IHdlcmUgZm91bmRcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiByZWxhdGlvbk5hbWVzIGlzIG5laXRoZXIgYW4gYXJyYXksIGEgc3RyaW5nIG9yIG9taXR0ZWRcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBhbiBlbGVtZW50IG9mIHJlbGF0aW9uTmFtZXMgaXMgbm90IGEgc3RyaW5nXG4gICAqL1xuICBhc3luYyBnZXRDaGlsZHJlbihyZWxhdGlvbk5hbWVzKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocmVsYXRpb25OYW1lcykpIHtcbiAgICAgIGlmIChyZWxhdGlvbk5hbWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZWxhdGlvbk5hbWVzID0gdGhpcy5nZXRSZWxhdGlvbk5hbWVzKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChyZWxhdGlvbk5hbWVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlbGF0aW9uTmFtZXMgPSB0aGlzLmdldFJlbGF0aW9uTmFtZXMoKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiByZWxhdGlvbk5hbWVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICByZWxhdGlvbk5hbWVzID0gW3JlbGF0aW9uTmFtZXNdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJyZWxhdGlvbk5hbWVzIG11c3QgYmUgYW4gYXJyYXksIGEgc3RyaW5nIG9yIG9taXR0ZWRcIik7XG4gICAgfVxuXG4gICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcblxuICAgIGZvciAobGV0IHJlbGF0aW9uTWFwIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcmVsYXRpb25OYW1lcy5sZW5ndGg7IGorKykge1xuICAgICAgICBpZiAocmVsYXRpb25NYXAuaGFzKHJlbGF0aW9uTmFtZXNbal0pKSB7XG4gICAgICAgICAgY29uc3QgcmVsYXRpb24gPSByZWxhdGlvbk1hcC5nZXRFbGVtZW50KHJlbGF0aW9uTmFtZXNbal0pO1xuICAgICAgICAgIHByb21pc2VzLnB1c2gocmVsYXRpb24uZ2V0Q2hpbGRyZW4oKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjaGlsZHJlbkxzdCA9IGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICBsZXQgcmVzID0gW107XG5cbiAgICBmb3IgKGxldCBjaGlsZHJlbiBvZiBjaGlsZHJlbkxzdCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICByZXMucHVzaChjaGlsZHJlbltpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGNoaWxkcmVuIG9mIHRoZSBub2RlIHRoYXQgYXJlIHJlZ2lzdGVyZWQgaW4gdGhlIGNvbnRleHRcbiAgICogQHBhcmFtIHtTcGluYWxDb250ZXh0fSBjb250ZXh0IENvbnRleHQgdG8gdXNlIGZvciB0aGUgc2VhcmNoXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PFNwaW5hbE5vZGU+Pn0gVGhlIGNoaWxkcmVuIHRoYXQgd2VyZSBmb3VuZFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBjb250ZXh0IGlzIG5vdCBhIFNwaW5hbENvbnRleHRcbiAgICovXG4gIGFzeW5jIGdldENoaWxkcmVuSW5Db250ZXh0KGNvbnRleHQpIHtcbiAgICBpZiAoIShjb250ZXh0IGluc3RhbmNlb2YgU3BpbmFsQ29udGV4dCkpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcImNvbnRleHQgbXVzdCBiZSBhIFNwaW5hbENvbnRleHRcIik7XG4gICAgfVxuXG4gICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcblxuICAgIGZvciAobGV0IHJlbGF0aW9uTWFwIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgIGZvciAobGV0IHJlbGF0aW9uIG9mIHJlbGF0aW9uTWFwKSB7XG4gICAgICAgIGlmIChyZWxhdGlvbi5iZWxvbmdzVG9Db250ZXh0KGNvbnRleHQpKSB7XG4gICAgICAgICAgcHJvbWlzZXMucHVzaChyZWxhdGlvbi5nZXRDaGlsZHJlbkluQ29udGV4dChjb250ZXh0KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjaGlsZHJlbkxzdCA9IGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICBsZXQgcmVzID0gW107XG5cbiAgICBmb3IgKGxldCBjaGlsZHJlbiBvZiBjaGlsZHJlbkxzdCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICByZXMucHVzaChjaGlsZHJlbltpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYWxsIHBhcmVudHMgZm9yIHRoZSByZWxhdGlvbiBuYW1lcyBubyBtYXR0ZXIgdGhlIHR5cGUgb2YgcmVsYXRpb25cbiAgICogQHBhcmFtIHtBcnJheTxTdHJpbmc+fSByZWxhdGlvbk5hbWVzIEFycmF5IGNvbnRhaW5pbmcgdGhlIHJlbGF0aW9uIG5hbWVzIG9mIHRoZSBkZXNpcmVkIHBhcmVudHNcbiAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8U3BpbmFsTm9kZT4+fSBQcm9taXNlIGNvbnRhaW5pbmcgdGhlIHBhcmVudHMgdGhhdCB3ZXJlIGZvdW5kXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIHJlbGF0aW9uTmFtZXMgYXJlIG5laXRoZXIgYW4gYXJyYXksIGEgc3RyaW5nIG9yIG9taXR0ZWRcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBhbiBlbGVtZW50IG9mIHJlbGF0aW9uTmFtZXMgaXMgbm90IGEgc3RyaW5nXG4gICAqL1xuICBnZXRQYXJlbnRzKHJlbGF0aW9uTmFtZXMpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShyZWxhdGlvbk5hbWVzKSkge1xuICAgICAgaWYgKHJlbGF0aW9uTmFtZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJlbGF0aW9uTmFtZXMgPSB0aGlzLnBhcmVudHMua2V5cygpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocmVsYXRpb25OYW1lcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZWxhdGlvbk5hbWVzID0gdGhpcy5wYXJlbnRzLmtleXMoKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiByZWxhdGlvbk5hbWVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICByZWxhdGlvbk5hbWVzID0gW3JlbGF0aW9uTmFtZXNdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJyZWxhdGlvbk5hbWVzIG11c3QgYmUgYW4gYXJyYXksIGEgc3RyaW5nIG9yIG9taXR0ZWRcIik7XG4gICAgfVxuXG4gICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcblxuICAgIGZvciAobGV0IG5hbWUgb2YgcmVsYXRpb25OYW1lcykge1xuICAgICAgY29uc3QgbGlzdCA9IHRoaXMucGFyZW50cy5nZXRFbGVtZW50KG5hbWUpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcHJvbWlzZXMucHVzaChcbiAgICAgICAgICBsaXN0W2ldLmxvYWQoKS50aGVuKHJlbGF0aW9uID0+IHtcbiAgICAgICAgICAgIHJldHVybiByZWxhdGlvbi5nZXRQYXJlbnQoKTtcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gIH1cblxuICAvKipcbiAgICogUmVjdXJzaXZlbHkgZmluZHMgYWxsIHRoZSBjaGlsZHJlbiBub2RlcyBmb3Igd2hpY2ggdGhlIHByZWRpY2F0ZSBpcyB0cnVlLlxuICAgKiBAcGFyYW0ge0FycmF5PFN0cmluZz59IHJlbGF0aW9uTmFtZXMgQXJyYXkgY29udGFpbmluZyB0aGUgcmVsYXRpb24gbmFtZXMgdG8gZm9sbG93XG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IHByZWRpY2F0ZSBGdW5jdGlvbiByZXR1cm5pbmcgdHJ1ZSBpZiB0aGUgbm9kZSBuZWVkcyB0byBiZSByZXR1cm5lZFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxTcGluYWxOb2RlPj59IFRoZSBub2RlcyB0aGF0IHdlcmUgZm91bmRcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgcmVsYXRpb25OYW1lcyBhcmUgbmVpdGhlciBhbiBhcnJheSwgYSBzdHJpbmcgb3Igb21pdHRlZFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGFuIGVsZW1lbnQgb2YgcmVsYXRpb25OYW1lcyBpcyBub3QgYSBzdHJpbmdcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgcHJlZGljYXRlIGlzIG5vdCBhIGZ1bmN0aW9uXG4gICAqL1xuICBhc3luYyBmaW5kKHJlbGF0aW9uTmFtZXMsIHByZWRpY2F0ZSA9IERFRkFVTFRfUFJFRElDQVRFKSB7XG4gICAgaWYgKFxuICAgICAgIUFycmF5LmlzQXJyYXkocmVsYXRpb25OYW1lcykgJiZcbiAgICAgIHJlbGF0aW9uTmFtZXMgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgdHlwZW9mIHJlbGF0aW9uTmFtZXMgIT09IFwic3RyaW5nXCJcbiAgICApIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcInJlbGF0aW9uTmFtZXMgbXVzdCBiZSBhbiBhcnJheSwgYSBzdHJpbmcgb3Igb21pdHRlZFwiKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHByZWRpY2F0ZSAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJwcmVkaWNhdGUgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHNlZW4gPSBuZXcgU2V0KFt0aGlzXSk7XG4gICAgbGV0IHByb21pc2VzID0gW107XG4gICAgbGV0IG5leHRHZW4gPSBbdGhpc107XG4gICAgbGV0IGN1cnJlbnRHZW4gPSBbXTtcbiAgICBjb25zdCBmb3VuZCA9IFtdO1xuXG4gICAgd2hpbGUgKG5leHRHZW4ubGVuZ3RoKSB7XG4gICAgICBjdXJyZW50R2VuID0gbmV4dEdlbjtcbiAgICAgIHByb21pc2VzID0gW107XG4gICAgICBuZXh0R2VuID0gW107XG5cbiAgICAgIGZvciAobGV0IG5vZGUgb2YgY3VycmVudEdlbikge1xuICAgICAgICBwcm9taXNlcy5wdXNoKG5vZGUuZ2V0Q2hpbGRyZW4ocmVsYXRpb25OYW1lcykpO1xuXG4gICAgICAgIGlmIChwcmVkaWNhdGUobm9kZSkpIHtcbiAgICAgICAgICBmb3VuZC5wdXNoKG5vZGUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxldCBjaGlsZHJlbkFycmF5cyA9IGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcblxuICAgICAgZm9yIChsZXQgY2hpbGRyZW4gb2YgY2hpbGRyZW5BcnJheXMpIHtcbiAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgY2hpbGRyZW4pIHtcbiAgICAgICAgICBpZiAoIXNlZW4uaGFzKGNoaWxkKSkge1xuICAgICAgICAgICAgbmV4dEdlbi5wdXNoKGNoaWxkKTtcbiAgICAgICAgICAgIHNlZW4uYWRkKGNoaWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZm91bmQ7XG4gIH1cblxuICAvKipcbiAgICogUmVjdXJzaXZlbHkgZmluZHMgYWxsIHRoZSBjaGlsZHJlbiBub2RlcyBpbiB0aGUgY29udGV4dCBmb3Igd2hpY2ggdGhlIHByZWRpY2F0ZSBpcyB0cnVlLi5cbiAgICogQHBhcmFtIHtTcGluYWxDb250ZXh0fSBjb250ZXh0IENvbnRleHQgdG8gdXNlIGZvciB0aGUgc2VhcmNoXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IHByZWRpY2F0ZSBGdW5jdGlvbiByZXR1cm5pbmcgdHJ1ZSBpZiB0aGUgbm9kZSBuZWVkcyB0byBiZSByZXR1cm5lZFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxTcGluYWxOb2RlPj59IFRoZSBub2RlcyB0aGF0IHdlcmUgZm91bmRcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBjb250ZXh0IGlzIG5vdCBhIFNwaW5hbENvbnRleHRcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgcHJlZGljYXRlIGlzIG5vdCBhIGZ1bmN0aW9uXG4gICAqL1xuICBhc3luYyBmaW5kSW5Db250ZXh0KGNvbnRleHQsIHByZWRpY2F0ZSA9IERFRkFVTFRfUFJFRElDQVRFKSB7XG4gICAgaWYgKHR5cGVvZiBwcmVkaWNhdGUgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHByZWRpY2F0ZSBmdW5jdGlvbiBtdXN0IGJlIGEgZnVuY3Rpb25cIik7XG4gICAgfVxuXG4gICAgY29uc3Qgc2VlbiA9IG5ldyBTZXQoW3RoaXNdKTtcbiAgICBsZXQgcHJvbWlzZXMgPSBbXTtcbiAgICBsZXQgbmV4dEdlbiA9IFt0aGlzXTtcbiAgICBsZXQgY3VycmVudEdlbiA9IFtdO1xuICAgIGNvbnN0IGZvdW5kID0gW107XG5cbiAgICB3aGlsZSAobmV4dEdlbi5sZW5ndGgpIHtcbiAgICAgIGN1cnJlbnRHZW4gPSBuZXh0R2VuO1xuICAgICAgcHJvbWlzZXMgPSBbXTtcbiAgICAgIG5leHRHZW4gPSBbXTtcblxuICAgICAgZm9yIChsZXQgbm9kZSBvZiBjdXJyZW50R2VuKSB7XG4gICAgICAgIHByb21pc2VzLnB1c2gobm9kZS5nZXRDaGlsZHJlbkluQ29udGV4dChjb250ZXh0KSk7XG5cbiAgICAgICAgaWYgKHByZWRpY2F0ZShub2RlKSkge1xuICAgICAgICAgIGZvdW5kLnB1c2gobm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGV0IGNoaWxkcmVuQXJyYXlzID0gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuXG4gICAgICBmb3IgKGxldCBjaGlsZHJlbiBvZiBjaGlsZHJlbkFycmF5cykge1xuICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBjaGlsZHJlbikge1xuICAgICAgICAgIGlmICghc2Vlbi5oYXMoY2hpbGQpKSB7XG4gICAgICAgICAgICBuZXh0R2VuLnB1c2goY2hpbGQpO1xuICAgICAgICAgICAgc2Vlbi5hZGQoY2hpbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmb3VuZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWN1cnNpdmVseSBhcHBsaWVzIGEgZnVuY3Rpb24gdG8gYWxsIHRoZSBjaGlsZHJlbiBub2Rlcy5cbiAgICogQHBhcmFtIHtBcnJheTxTdHJpbmc+fSByZWxhdGlvbk5hbWVzIEFycmF5IGNvbnRhaW5pbmcgdGhlIHJlbGF0aW9uIG5hbWVzIHRvIGZvbGxvd1xuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBGdW5jdGlvbiB0byBhcHBseSB0byB0aGUgbm9kZXNcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgcmVsYXRpb25OYW1lcyBhcmUgbmVpdGhlciBhbiBhcnJheSwgYSBzdHJpbmcgb3Igb21pdHRlZFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGFuIGVsZW1lbnQgb2YgcmVsYXRpb25OYW1lcyBpcyBub3QgYSBzdHJpbmdcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgY2FsbGJhY2sgaXMgbm90IGEgZnVuY3Rpb25cbiAgICovXG4gIGFzeW5jIGZvckVhY2gocmVsYXRpb25OYW1lcywgY2FsbGJhY2spIHtcbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcImNhbGxiYWNrIG11c3QgYmUgYSBmdW5jdGlvblwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBub2RlcyA9IGF3YWl0IHRoaXMuZmluZChyZWxhdGlvbk5hbWVzKTtcblxuICAgIGZvciAobGV0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgIGNhbGxiYWNrKG5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWN1cnNpdmVseSBhcHBsaWVzIGEgZnVuY3Rpb24gdG8gYWxsIHRoZSBjaGlsZHJlbiBub2RlcyBpbiB0aGUgY29udGV4dC5cbiAgICogQHBhcmFtIHtTcGluYWxDb250ZXh0fSBjb250ZXh0IENvbnRleHQgdG8gdXNlIGZvciB0aGUgc2VhcmNoXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIEZ1bmN0aW9uIHRvIGFwcGx5IHRvIHRoZSBub2Rlc1xuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGNvbnRleHQgaXMgbm90IGEgU3BpbmFsQ29udGV4dFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBjYWxsYmFjayBpcyBub3QgYSBmdW5jdGlvblxuICAgKi9cbiAgYXN5bmMgZm9yRWFjaEluQ29udGV4dChjb250ZXh0LCBjYWxsYmFjaykge1xuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwiY2FsbGJhY2sgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IG5vZGVzID0gYXdhaXQgdGhpcy5maW5kSW5Db250ZXh0KGNvbnRleHQpO1xuXG4gICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xuICAgICAgY2FsbGJhY2sobm9kZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlY3Vyc2l2ZWx5IGFwcGxpZXMgYSBmdW5jdGlvbiB0byBhbGwgdGhlIGNoaWxkcmVuIG5vZGVzIGFuZCByZXR1cm5zIHRoZSByZXN1bHRzIGluIGFuIGFycmF5LlxuICAgKiBAcGFyYW0ge0FycmF5PFN0cmluZz59IHJlbGF0aW9uTmFtZXMgQXJyYXkgY29udGFpbmluZyB0aGUgcmVsYXRpb24gbmFtZXMgdG8gZm9sbG93XG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIEZ1bmN0aW9uIHRvIGFwcGx5IHRvIHRoZSBub2Rlc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTwqPj59IFRoZSByZXN1bHRzIG9mIHRoZSBjYWxsYmFjayBmb3IgZWFjaCBub2RlXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIHJlbGF0aW9uTmFtZXMgYXJlIG5laXRoZXIgYW4gYXJyYXksIGEgc3RyaW5nIG9yIG9taXR0ZWRcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBhbiBlbGVtZW50IG9mIHJlbGF0aW9uTmFtZXMgaXMgbm90IGEgc3RyaW5nXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIGNhbGxiYWNrIGlzIG5vdCBhIGZ1bmN0aW9uXG4gICAqL1xuICBhc3luYyBtYXAocmVsYXRpb25OYW1lcywgY2FsbGJhY2spIHtcbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcIlRoZSBjYWxsYmFjayBmdW5jdGlvbiBtdXN0IGJlIGEgZnVuY3Rpb25cIik7XG4gICAgfVxuXG4gICAgY29uc3Qgbm9kZXMgPSBhd2FpdCB0aGlzLmZpbmQocmVsYXRpb25OYW1lcyk7XG4gICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuXG4gICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xuICAgICAgcmVzdWx0cy5wdXNoKGNhbGxiYWNrKG5vZGUpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWN1cnNpdmVseSBhcHBsaWVzIGEgZnVuY3Rpb24gdG8gYWxsIHRoZSBjaGlsZHJlbiBub2RlcyBpbiB0aGUgY29udGV4dCBhbmQgcmV0dXJucyB0aGUgcmVzdWx0cyBpbiBhbiBhcnJheS5cbiAgICogQHBhcmFtIHtTcGluYWxDb250ZXh0fSBjb250ZXh0IENvbnRleHQgdG8gdXNlIGZvciB0aGUgc2VhcmNoXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIEZ1bmN0aW9uIHRvIGFwcGx5IHRvIHRoZSBub2Rlc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTwqPj59IFRoZSByZXN1bHRzIG9mIHRoZSBjYWxsYmFjayBmb3IgZWFjaCBub2RlXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgY29udGV4dCBpcyBub3QgYSBTcGluYWxDb250ZXh0XG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIGNhbGxiYWNrIGlzIG5vdCBhIGZ1bmN0aW9uXG4gICAqL1xuICBhc3luYyBtYXBJbkNvbnRleHQoY29udGV4dCwgY2FsbGJhY2spIHtcbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcIlRoZSBjYWxsYmFjayBmdW5jdGlvbiBtdXN0IGJlIGEgZnVuY3Rpb25cIik7XG4gICAgfVxuXG4gICAgY29uc3Qgbm9kZXMgPSBhd2FpdCB0aGlzLmZpbmRJbkNvbnRleHQoY29udGV4dCk7XG4gICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuXG4gICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xuICAgICAgcmVzdWx0cy5wdXNoKGNhbGxiYWNrKG5vZGUpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIHJlbGF0aW9uIGxpc3QgY29ycmVzcG9uZGluZyB0byB0aGUgcmVsYXRpb24gdHlwZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uVHlwZSBUeXBlIG9mIHRoZSByZWxhdGlvblxuICAgKiBAcmV0dXJucyB7U3BpbmFsTWFwfSBSZXR1cm4gdGhlIHJlbGF0aW9uIGxpc3QgY29ycmVzcG9uZGluZyB0byB0aGUgcmVsYXRpb24gdHlwZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2dldENoaWxkcmVuVHlwZShyZWxhdGlvblR5cGUpIHtcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5nZXRFbGVtZW50KHJlbGF0aW9uVHlwZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSByZWxhdGlvbiBjb3JyZXNwb25kaW5nLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25OYW1lIE5hbWUgb2YgdGhlIHJlbGF0aW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvblR5cGUgVHlwZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHJldHVybnMge1NwaW5hbFJlbGF0aW9ufSBUaGUgcmVsYXRpb24gY29ycmVzcG9uZGluZ1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2dldFJlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldENoaWxkcmVuVHlwZShyZWxhdGlvblR5cGUpLmdldEVsZW1lbnQocmVsYXRpb25OYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgcGFyZW50IHJlbGF0aW9uIG9mIHRoZSBub2RlLlxuICAgKiBAcGFyYW0ge1NwaW5hbFJlbGF0aW9ufSByZWxhdGlvbiBSZWxhdGlvbiB0byByZW1vdmVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9yZW1vdmVQYXJlbnQocmVsYXRpb24pIHtcbiAgICBjb25zdCBwYXJlbnRMc3QgPSB0aGlzLnBhcmVudHMuZ2V0RWxlbWVudChyZWxhdGlvbi5nZXROYW1lKCkuZ2V0KCkpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJlbnRMc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChwYXJlbnRMc3RbaV0uZ2V0SWQoKS5nZXQoKSA9PT0gcmVsYXRpb24uZ2V0SWQoKS5nZXQoKSkge1xuICAgICAgICBwYXJlbnRMc3Quc3BsaWNlKGkpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgbm9kZSBmcm9tIGFsbCBwYXJlbnQgcmVsYXRpb24gdGhlIHByb3BlcnR5IHBhcmVudHMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhc3luYyBfcmVtb3ZlRnJvbVBhcmVudHMoKSB7XG4gICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcblxuICAgIGZvciAobGV0IHBhcmVudCBvZiB0aGlzLnBhcmVudHMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBhcmVudFtpXS5sb2FkKCkudGhlbihwYXJlbnRSZWwgPT4ge1xuICAgICAgICAgIHByb21pc2VzLnB1c2gocGFyZW50UmVsLnJlbW92ZUNoaWxkKHRoaXMpKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgdGhlIHJlbGF0aW9uIGFzIHBhcmVudCBvZiB0aGUgbm9kZS5cbiAgICogQHBhcmFtIHtTcGluYWxSZWxhdGlvbn0gcmVsYXRpb24gUGFyZW50IHJlbGF0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfYWRkUGFyZW50KHJlbGF0aW9uKSB7XG4gICAgY29uc3QgcmVsYXRpb25OYW1lID0gcmVsYXRpb24uZ2V0TmFtZSgpLmdldCgpO1xuXG4gICAgaWYgKHRoaXMucGFyZW50cy5oYXMocmVsYXRpb25OYW1lKSkge1xuICAgICAgdGhpcy5wYXJlbnRzXG4gICAgICAgIC5nZXRFbGVtZW50KHJlbGF0aW9uTmFtZSlcbiAgICAgICAgLnB1c2gobmV3IFNwaW5hbE5vZGVQb2ludGVyKHJlbGF0aW9uKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGxpc3QgPSBuZXcgTHN0KCk7XG4gICAgICBsaXN0LnB1c2gobmV3IFNwaW5hbE5vZGVQb2ludGVyKHJlbGF0aW9uKSk7XG4gICAgICB0aGlzLnBhcmVudHMuc2V0RWxlbWVudChyZWxhdGlvbk5hbWUsIGxpc3QpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgcmVsYXRpb24gZm9yIHRoaXMgbm9kZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uTmFtZSBOYW1lIG9mIHRoZSByZWxhdGlvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25UeXBlIFR5cGUgb2YgdGhlIHJlbGF0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfY3JlYXRlUmVsYXRpb24ocmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpIHtcbiAgICBjb25zdCByZWxhdGlvbiA9IFNwaW5hbFJlbGF0aW9uRmFjdG9yeS5nZXROZXdSZWxhdGlvbihcbiAgICAgIHRoaXMsXG4gICAgICByZWxhdGlvbk5hbWUsXG4gICAgICByZWxhdGlvblR5cGVcbiAgICApO1xuXG4gICAgaWYgKCF0aGlzLmNoaWxkcmVuLmhhcyhyZWxhdGlvblR5cGUpKSB7XG4gICAgICB0aGlzLmNoaWxkcmVuLnNldEVsZW1lbnQocmVsYXRpb25UeXBlLCBuZXcgU3BpbmFsTWFwKCkpO1xuICAgIH1cblxuICAgIHRoaXMuX2dldENoaWxkcmVuVHlwZShyZWxhdGlvblR5cGUpLnNldEVsZW1lbnQocmVsYXRpb25OYW1lLCByZWxhdGlvbik7XG4gICAgcmV0dXJuIHJlbGF0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbGwgY2hpbGRyZW4gcmVsYXRpb24gZnJvbSB0aGUgZ3JhcGguXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPG5vdGhpbmc+fSBBbiBlbXB0eSBwcm9taXNlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhc3luYyBfcmVtb3ZlRnJvbUNoaWxkcmVuKCkge1xuICAgIGNvbnN0IHByb21pc2VzID0gW107XG5cbiAgICBmb3IgKGxldCByZWxhdGlvbk1hcCBvZiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICBmb3IgKGxldCByZWxhdGlvbiBvZiByZWxhdGlvbk1hcCkge1xuICAgICAgICBwcm9taXNlcy5wdXNoKHJlbGF0aW9uLnJlbW92ZUZyb21HcmFwaCgpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gIH1cbn1cblxuc3BpbmFsQ29yZS5yZWdpc3Rlcl9tb2RlbHMoW1NwaW5hbE5vZGVdKTtcbmV4cG9ydCBkZWZhdWx0IFNwaW5hbE5vZGU7XG4iXX0=