"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _spinalCoreConnectorjs = _interopRequireDefault(require("spinal-core-connectorjs"));

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
      this.element = new _SpinalNodePointer.default(new globalType.Model());
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

      if (!(child instanceof globalType.Model)) {
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

      if (!(child instanceof globalType.Model)) {
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
   * Removes children with the relation names.
   * @param {Array<String> | String | undefined} relationNames Names of the relations to empty
   * @returns {Promise<Array<Boolean>>} A promise containing an array of boolean
   * @throws {TypeError} If relationNames is neither an array, a string or omitted
   * @throws {TypeError} If an element of relationNames is not a string
   */


  removeChildren(relationNames) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      if (Array.isArray(relationNames)) {
        if (relationNames.length === 0) {
          relationNames = _this3.getRelationNames();
        }
      } else if (relationNames === undefined) {
        relationNames = _this3.getRelationNames();
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
        for (var _iterator5 = _this3.children[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          let relationMap = _step5.value;
          var _iteratorNormalCompletion6 = true;
          var _didIteratorError6 = false;
          var _iteratorError6 = undefined;

          try {
            for (var _iterator6 = relationNames[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
              let relationName = _step6.value;

              if (relationMap.has(relationName)) {
                const relation = relationMap.getElement(relationName);
                promises.push(relation.removeChildren());
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

      yield Promise.all(promises);
    })();
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
    var _this4 = this;

    return _asyncToGenerator(function* () {
      yield Promise.all([_this4._removeFromParents(), _this4._removeFromChildren()]);
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
    var _this5 = this;

    return _asyncToGenerator(function* () {
      if (Array.isArray(relationNames)) {
        if (relationNames.length === 0) {
          relationNames = _this5.getRelationNames();
        }
      } else if (relationNames === undefined) {
        relationNames = _this5.getRelationNames();
      } else if (typeof relationNames === "string") {
        relationNames = [relationNames];
      } else {
        throw TypeError("relationNames must be an array, a string or omitted");
      }

      const promises = [];
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = _this5.children[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          let relationMap = _step7.value;

          for (let j = 0; j < relationNames.length; j++) {
            if (relationMap.has(relationNames[j])) {
              const relation = relationMap.getElement(relationNames[j]);
              promises.push(relation.getChildren());
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
      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = _this6.children[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          let relationMap = _step9.value;
          var _iteratorNormalCompletion11 = true;
          var _didIteratorError11 = false;
          var _iteratorError11 = undefined;

          try {
            for (var _iterator11 = relationMap[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
              let relation = _step11.value;

              if (relation.belongsToContext(context)) {
                promises.push(relation.getChildrenInContext(context));
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

      const childrenLst = yield Promise.all(promises);
      let res = [];
      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = childrenLst[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          let children = _step10.value;

          for (let i = 0; i < children.length; i++) {
            res.push(children[i]);
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
    var _iteratorNormalCompletion12 = true;
    var _didIteratorError12 = false;
    var _iteratorError12 = undefined;

    try {
      for (var _iterator12 = relationNames[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
        let name = _step12.value;
        const list = this.parents.getElement(name);

        for (let i = 0; i < list.length; i++) {
          promises.push(list[i].load().then(relation => {
            return relation.getParent();
          }));
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

        for (var _i = 0; _i < currentGen.length; _i++) {
          let node = currentGen[_i];
          promises.push(node.getChildren(relationNames));

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
   * Recursively finds all the children nodes in the context for which the predicate is true..
   * @param {SpinalContext} context Context to use for the search
   * @param {function} predicate Function returning true if the node needs to be returned
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

        for (var _i2 = 0; _i2 < currentGen.length; _i2++) {
          let node = currentGen[_i2];
          promises.push(node.getChildrenInContext(context));

          if (predicate(node)) {
            found.push(node);
          }
        }

        let childrenArrays = yield Promise.all(promises);
        var _iteratorNormalCompletion15 = true;
        var _didIteratorError15 = false;
        var _iteratorError15 = undefined;

        try {
          for (var _iterator15 = childrenArrays[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
            let children = _step15.value;
            var _iteratorNormalCompletion16 = true;
            var _didIteratorError16 = false;
            var _iteratorError16 = undefined;

            try {
              for (var _iterator16 = children[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
                let child = _step16.value;

                if (!seen.has(child)) {
                  nextGen.push(child);
                  seen.add(child);
                }
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
    var _this9 = this;

    return _asyncToGenerator(function* () {
      if (typeof callback !== "function") {
        throw TypeError("callback must be a function");
      }

      const nodes = yield _this9.find(relationNames);
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
   * Recursively applies a function to all the children nodes in the context.
   * @param {SpinalContext} context Context to use for the search
   * @param {function} callback Function to apply to the nodes
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
      var _iteratorNormalCompletion18 = true;
      var _didIteratorError18 = false;
      var _iteratorError18 = undefined;

      try {
        for (var _iterator18 = nodes[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
          let node = _step18.value;
          callback(node);
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
    var _this11 = this;

    return _asyncToGenerator(function* () {
      if (typeof callback !== "function") {
        throw TypeError("The callback function must be a function");
      }

      const nodes = yield _this11.find(relationNames);
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
      var _iteratorNormalCompletion20 = true;
      var _didIteratorError20 = false;
      var _iteratorError20 = undefined;

      try {
        for (var _iterator20 = nodes[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
          let node = _step20.value;
          results.push(callback(node));
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
    const indexToRemove = parentLst.indexOf(parentPtr => parentPtr.getId().get() === relation.getId().get());
    parentLst.splice(indexToRemove);
  }
  /**
   * Removes the node from all parent relation the property parents.
   * @private
   */


  _removeFromParents() {
    var _this13 = this;

    return _asyncToGenerator(function* () {
      const promises = [];
      var _iteratorNormalCompletion21 = true;
      var _didIteratorError21 = false;
      var _iteratorError21 = undefined;

      try {
        for (var _iterator21 = _this13.parents[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
          let parent = _step21.value;

          for (let i = 0; i < parent.length; i++) {
            parent[i].load().then(parentRel => {
              promises.push(parentRel.removeChild(_this13));
            });
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
      const list = new globalType.Lst();
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
      var _iteratorNormalCompletion22 = true;
      var _didIteratorError22 = false;
      var _iteratorError22 = undefined;

      try {
        for (var _iterator22 = _this14.children[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
          let relationMap = _step22.value;
          var _iteratorNormalCompletion23 = true;
          var _didIteratorError23 = false;
          var _iteratorError23 = undefined;

          try {
            for (var _iterator23 = relationMap[Symbol.iterator](), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
              let relation = _step23.value;
              promises.push(relation.removeFromGraph());
            }
          } catch (err) {
            _didIteratorError23 = true;
            _iteratorError23 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion23 && _iterator23.return != null) {
                _iterator23.return();
              }
            } finally {
              if (_didIteratorError23) {
                throw _iteratorError23;
              }
            }
          }
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

      yield Promise.all(promises);
    })();
  }

}

_spinalCoreConnectorjs.default.register_models([SpinalNode]);

var _default = SpinalNode;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Ob2Rlcy9TcGluYWxOb2RlLmpzIl0sIm5hbWVzIjpbImdsb2JhbFR5cGUiLCJ3aW5kb3ciLCJnbG9iYWwiLCJERUZBVUxUX1BSRURJQ0FURSIsIlNwaW5hbE5vZGUiLCJNb2RlbCIsImNvbnN0cnVjdG9yIiwibmFtZSIsInR5cGUiLCJlbGVtZW50IiwiYWRkX2F0dHIiLCJpbmZvIiwiaWQiLCJwYXJlbnRzIiwiU3BpbmFsTWFwIiwiY2hpbGRyZW4iLCJ1bmRlZmluZWQiLCJTcGluYWxOb2RlUG9pbnRlciIsImNvbnRleHRJZHMiLCJTcGluYWxTZXQiLCJnZXRJZCIsImdldE5hbWUiLCJnZXRUeXBlIiwiZ2V0RWxlbWVudCIsImxvYWQiLCJnZXRDaGlsZHJlbklkcyIsIm5vZGVDaGlsZHJlbklkcyIsInJlbGF0aW9uTWFwIiwicmVsYXRpb24iLCJyZWxDaGlsZHJlbklkcyIsImkiLCJsZW5ndGgiLCJwdXNoIiwiZ2V0TmJDaGlsZHJlbiIsImNoaWxkcmVuSWRzIiwiYWRkQ29udGV4dElkIiwiVHlwZUVycm9yIiwiaGFzIiwiYWRkIiwiZ2V0Q29udGV4dElkcyIsInZhbHVlcyIsImJlbG9uZ3NUb0NvbnRleHQiLCJjb250ZXh0IiwiU3BpbmFsQ29udGV4dCIsImdldCIsImhhc1JlbGF0aW9uIiwicmVsYXRpb25OYW1lIiwicmVsYXRpb25UeXBlIiwiUkVMQVRJT05fVFlQRV9MSVNUIiwiaW5jbHVkZXMiLCJFcnJvciIsInR5cGVNYXAiLCJfZ2V0Q2hpbGRyZW5UeXBlIiwiaGFzUmVsYXRpb25zIiwicmVsYXRpb25OYW1lcyIsIkFycmF5IiwiaXNBcnJheSIsImdldFJlbGF0aW9uTmFtZXMiLCJuYW1lcyIsImtleXMiLCJmcm9tIiwiU2V0IiwiYWRkQ2hpbGQiLCJjaGlsZCIsIl9jcmVhdGVSZWxhdGlvbiIsIl9nZXRSZWxhdGlvbiIsImFkZENoaWxkSW5Db250ZXh0IiwicmVtb3ZlQ2hpbGQiLCJub2RlIiwicmVsIiwicmVtb3ZlQ2hpbGRyZW4iLCJwcm9taXNlcyIsIlByb21pc2UiLCJhbGwiLCJyZW1vdmVSZWxhdGlvbiIsInJlbW92ZUZyb21HcmFwaCIsIl9yZW1vdmVGcm9tUGFyZW50cyIsIl9yZW1vdmVGcm9tQ2hpbGRyZW4iLCJnZXRDaGlsZHJlbiIsImoiLCJjaGlsZHJlbkxzdCIsInJlcyIsImdldENoaWxkcmVuSW5Db250ZXh0IiwiZ2V0UGFyZW50cyIsImxpc3QiLCJ0aGVuIiwiZ2V0UGFyZW50IiwiZmluZCIsInByZWRpY2F0ZSIsInNlZW4iLCJuZXh0R2VuIiwiY3VycmVudEdlbiIsImZvdW5kIiwiY2hpbGRyZW5BcnJheXMiLCJmaW5kSW5Db250ZXh0IiwiZm9yRWFjaCIsImNhbGxiYWNrIiwibm9kZXMiLCJmb3JFYWNoSW5Db250ZXh0IiwibWFwIiwicmVzdWx0cyIsIm1hcEluQ29udGV4dCIsIl9yZW1vdmVQYXJlbnQiLCJwYXJlbnRMc3QiLCJpbmRleFRvUmVtb3ZlIiwiaW5kZXhPZiIsInBhcmVudFB0ciIsInNwbGljZSIsInBhcmVudCIsInBhcmVudFJlbCIsIl9hZGRQYXJlbnQiLCJMc3QiLCJzZXRFbGVtZW50IiwiU3BpbmFsUmVsYXRpb25GYWN0b3J5IiwiZ2V0TmV3UmVsYXRpb24iLCJzcGluYWxDb3JlIiwicmVnaXN0ZXJfbW9kZWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBeUJBOztBQUVBOztBQUlBOztBQUlBOztBQUNBOztBQUdBOztBQUNBOztBQUNBOzs7Ozs7OztBQXpDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsTUFBTUEsVUFBVSxHQUFHLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NDLE1BQWhDLEdBQXlDRCxNQUE1RDs7QUFxQkEsTUFBTUUsaUJBQWlCLEdBQUcsTUFBTSxJQUFoQzs7QUFFQSxNQUFNQyxVQUFOLFNBQXlCSixVQUFVLENBQUNLLEtBQXBDLENBQTBDO0FBQ3hDOzs7Ozs7O0FBT0FDLEVBQUFBLFdBQVcsQ0FBQ0MsSUFBSSxHQUFHLFdBQVIsRUFBcUJDLElBQUksR0FB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LEVBQW9DaUUsVUFBcEMsQ0FBK0NsRSxZQUEvQyxFQUE2RGxCLFFBQTdEOztBQUNBLFdBQU9BLFFBQVA7QUFDRDtBQUVEOzs7Ozs7O0FBS01pRCxFQUFBQSxtQkFBTixHQUE0QjtBQUFBOztBQUFBO0FBQzFCLFlBQU1OLFFBQVEsR0FBRyxFQUFqQjtBQUQwQjtBQUFBO0FBQUE7O0FBQUE7QUFHMUIsK0JBQXdCLE9BQUksQ0FBQ3hELFFBQTdCLHdJQUF1QztBQUFBLGNBQTlCWSxXQUE4QjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUNyQyxtQ0FBcUJBLFdBQXJCLHdJQUFrQztBQUFBLGtCQUF6QkMsUUFBeUI7QUFDaEMyQyxjQUFBQSxRQUFRLENBQUN2QyxJQUFULENBQWNKLFFBQVEsQ0FBQytDLGVBQVQsRUFBZDtBQUNEO0FBSG9DO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJdEM7QUFQeUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFRMUIsWUFBTUgsT0FBTyxDQUFDQyxHQUFSLENBQVlGLFFBQVosQ0FBTjtBQVIwQjtBQVMzQjs7QUFydkJ1Qzs7QUF3dkIxQzRDLCtCQUFXQyxlQUFYLENBQTJCLENBQUNoSCxVQUFELENBQTNCOztlQUNlQSxVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4IFNwaW5hbENvbSAtIHd3dy5zcGluYWxjb20uY29tXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgU3BpbmFsQ29yZS5cbiAqXG4gKiBQbGVhc2UgcmVhZCBhbGwgb2YgdGhlIGZvbGxvd2luZyB0ZXJtcyBhbmQgY29uZGl0aW9uc1xuICogb2YgdGhlIEZyZWUgU29mdHdhcmUgbGljZW5zZSBBZ3JlZW1lbnQgKFwiQWdyZWVtZW50XCIpXG4gKiBjYXJlZnVsbHkuXG4gKlxuICogVGhpcyBBZ3JlZW1lbnQgaXMgYSBsZWdhbGx5IGJpbmRpbmcgY29udHJhY3QgYmV0d2VlblxuICogdGhlIExpY2Vuc2VlIChhcyBkZWZpbmVkIGJlbG93KSBhbmQgU3BpbmFsQ29tIHRoYXRcbiAqIHNldHMgZm9ydGggdGhlIHRlcm1zIGFuZCBjb25kaXRpb25zIHRoYXQgZ292ZXJuIHlvdXJcbiAqIHVzZSBvZiB0aGUgUHJvZ3JhbS4gQnkgaW5zdGFsbGluZyBhbmQvb3IgdXNpbmcgdGhlXG4gKiBQcm9ncmFtLCB5b3UgYWdyZWUgdG8gYWJpZGUgYnkgYWxsIHRoZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMgc3RhdGVkIG9yIHJlZmVyZW5jZWQgaGVyZWluLlxuICpcbiAqIElmIHlvdSBkbyBub3QgYWdyZWUgdG8gYWJpZGUgYnkgdGhlc2UgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zLCBkbyBub3QgZGVtb25zdHJhdGUgeW91ciBhY2NlcHRhbmNlIGFuZCBkb1xuICogbm90IGluc3RhbGwgb3IgdXNlIHRoZSBQcm9ncmFtLlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbG9uZ1xuICogd2l0aCB0aGlzIGZpbGUuIElmIG5vdCwgc2VlXG4gKiA8aHR0cDovL3Jlc291cmNlcy5zcGluYWxjb20uY29tL2xpY2Vuc2VzLnBkZj4uXG4gKi9cblxuY29uc3QgZ2xvYmFsVHlwZSA9IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB3aW5kb3c7XG5pbXBvcnQgc3BpbmFsQ29yZSBmcm9tIFwic3BpbmFsLWNvcmUtY29ubmVjdG9yanNcIjtcblxuaW1wb3J0IHtcbiAgZ3VpZFxufSBmcm9tIFwiLi4vVXRpbGl0aWVzXCI7XG5cbmltcG9ydCB7XG4gIFNwaW5hbENvbnRleHRcbn0gZnJvbSBcIi4uL2luZGV4XCI7XG5cbmltcG9ydCBTcGluYWxOb2RlUG9pbnRlciBmcm9tIFwiLi4vU3BpbmFsTm9kZVBvaW50ZXJcIjtcbmltcG9ydCB7XG4gIFNwaW5hbFJlbGF0aW9uRmFjdG9yeVxufSBmcm9tIFwiLi4vUmVsYXRpb25zL1NwaW5hbFJlbGF0aW9uRmFjdG9yeVwiO1xuaW1wb3J0IFNwaW5hbE1hcCBmcm9tIFwiLi4vU3BpbmFsTWFwXCI7XG5pbXBvcnQgU3BpbmFsU2V0IGZyb20gXCIuLi9TcGluYWxTZXRcIjtcbmltcG9ydCB7XG4gIFJFTEFUSU9OX1RZUEVfTElTVFxufSBmcm9tIFwiLi4vLi4vYnVpbGQvUmVsYXRpb25zL1NwaW5hbFJlbGF0aW9uRmFjdG9yeVwiO1xuXG5jb25zdCBERUZBVUxUX1BSRURJQ0FURSA9ICgpID0+IHRydWU7XG5cbmNsYXNzIFNwaW5hbE5vZGUgZXh0ZW5kcyBnbG9iYWxUeXBlLk1vZGVsIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yIGZvciB0aGUgU3BpbmFsTm9kZSBjbGFzcy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgTmFtZSBvZiB0aGUgbm9kZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBUeXBlIG9mIHRoZSBub2RlXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZSB8IE1vZGVsfSBlbGVtZW50IEVsZW1lbnQgb2YgdGhlIG5vZGVcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgZWxlbWVudCBpcyBub3QgYSBNb2RlbFxuICAgKi9cbiAgY29uc3RydWN0b3IobmFtZSA9IFwidW5kZWZpbmVkXCIsIHR5cGUgPSBcIlNwaW5hbE5vZGVcIiwgZWxlbWVudCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmFkZF9hdHRyKHtcbiAgICAgIGluZm86IHtcbiAgICAgICAgaWQ6IGd1aWQodGhpcy5jb25zdHJ1Y3Rvci5uYW1lKSxcbiAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgdHlwZTogdHlwZVxuICAgICAgfSxcbiAgICAgIHBhcmVudHM6IG5ldyBTcGluYWxNYXAoKSxcbiAgICAgIGNoaWxkcmVuOiBuZXcgU3BpbmFsTWFwKCksXG4gICAgICBlbGVtZW50OiBlbGVtZW50ICE9PSB1bmRlZmluZWQgPyBuZXcgU3BpbmFsTm9kZVBvaW50ZXIoZWxlbWVudCkgOiB1bmRlZmluZWQsXG4gICAgICBjb250ZXh0SWRzOiBuZXcgU3BpbmFsU2V0KClcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBpZC5cbiAgICogQHJldHVybnMge1N0cn0gSWQgb2YgdGhlIG5vZGVcbiAgICovXG4gIGdldElkKCkge1xuICAgIHJldHVybiB0aGlzLmluZm8uaWQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbmFtZS5cbiAgICogQHJldHVybnMge1N0cn0gTmFtZSBvZiB0aGUgbm9kZVxuICAgKi9cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbmZvLm5hbWU7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdHlwZS5cbiAgICogQHJldHVybnMge1N0cn0gVHlwZSBvZiB0aGUgbm9kZVxuICAgKi9cbiAgZ2V0VHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbmZvLnR5cGU7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZWxlbWVudC5cbiAgICogQHJldHVybnMge1Byb21pc2U8Kj59IEEgcHJvbWlzZSB3aGVyZSB0aGUgcGFyYW1ldGVyIG9mIHRoZSByZXNvbHZlIG1ldGhvZCBpcyB0aGUgZWxlbWVudFxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuZWxlbWVudCA9IG5ldyBTcGluYWxOb2RlUG9pbnRlcihuZXcgZ2xvYmFsVHlwZS5Nb2RlbCgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5lbGVtZW50LmxvYWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFsbCB0aGUgY2hpbGRyZW4gaWRzIGluIGFuIGFycmF5LlxuICAgKiBAcmV0dXJucyB7QXJyYXk8U3RyaW5nPn0gSWRzIG9mIHRoZSBjaGlsZHJlblxuICAgKi9cbiAgZ2V0Q2hpbGRyZW5JZHMoKSB7XG4gICAgY29uc3Qgbm9kZUNoaWxkcmVuSWRzID0gW107XG5cbiAgICBmb3IgKGxldCByZWxhdGlvbk1hcCBvZiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICBmb3IgKGxldCByZWxhdGlvbiBvZiByZWxhdGlvbk1hcCkge1xuICAgICAgICBsZXQgcmVsQ2hpbGRyZW5JZHMgPSByZWxhdGlvbi5nZXRDaGlsZHJlbklkcygpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVsQ2hpbGRyZW5JZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBub2RlQ2hpbGRyZW5JZHMucHVzaChyZWxDaGlsZHJlbklkc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5vZGVDaGlsZHJlbklkcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wdXRlcyBhbmQgcmV0dXJucyB0aGUgbnVtYmVyIG9mIGNoaWxkcmVuIG9mIHRoZSBub2RlLlxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgbnVtYmVyIG9mIGNoaWxkcmVuXG4gICAqL1xuICBnZXROYkNoaWxkcmVuKCkge1xuICAgIGxldCBjaGlsZHJlbklkcyA9IHRoaXMuZ2V0Q2hpbGRyZW5JZHMoKTtcblxuICAgIHJldHVybiBjaGlsZHJlbklkcy5sZW5ndGg7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhbiBpZCB0byB0aGUgY29udGV4dCBpZHMgb2YgdGhlIG5vZGUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBJZCBvZiB0aGUgY29udGV4dFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBpZCBpcyBub3QgYSBzdHJpbmdcbiAgICovXG4gIGFkZENvbnRleHRJZChpZCkge1xuICAgIGlmICh0eXBlb2YgaWQgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcImlkIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmNvbnRleHRJZHMuaGFzKGlkKSkge1xuICAgICAgdGhpcy5jb250ZXh0SWRzLmFkZChpZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBsaXN0IG9mIHRoZSBjb250ZXh0cyB0aGUgbm9kZSBpcyBhc3NvY2lhdGVkIHRvLlxuICAgKiBAcmV0dXJucyB7QXJyYXk8U3RyaW5nPn0gQW4gYXJyYXkgb2YgaWRzIG9mIHRoZSBhc3NvY2lhdGVkIGNvbnRleHRzXG4gICAqL1xuICBnZXRDb250ZXh0SWRzKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHRJZHMudmFsdWVzKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBub2RlIGJlbG9uZ3MgdG8gdGhlIGNvbnRleHQuXG4gICAqIEBwYXJhbSB7U3BpbmFsQ29udGV4dH0gY29udGV4dCBUaGUgY29udGV4dCB0aGF0IG1pZ2h0IG93biB0aGUgbm9kZVxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gQSBib29sZWFuXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgY29udGV4dCBpcyBub3QgYSBTcGluYWxDb250ZXh0XG4gICAqL1xuICBiZWxvbmdzVG9Db250ZXh0KGNvbnRleHQpIHtcbiAgICBpZiAoIShjb250ZXh0IGluc3RhbmNlb2YgU3BpbmFsQ29udGV4dCkpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcImNvbnRleHQgbXVzdCBiZSBhIFNwaW5hbENvbnRleHRcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY29udGV4dElkcy5oYXMoY29udGV4dC5nZXRJZCgpLmdldCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWZXJpZnkgaWYgdGhlIG5vZGUgY29udGFpbnMgdGhlIHJlbGF0aW9uIG5hbWUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk5hbWUgTmFtZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uVHlwZSBUeXBlIG9mIHRoZSByZWxhdGlvblxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJuIHRydWUgaXMgdGhlIHJlbGF0aW9uIGlzIGNvbnRhaW5lZCBpbiB0aGUgbm9kZSBhbmQgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSByZWxhdGlvbiBuYW1lIGlzIG5vdCBhIHN0cmluZ1xuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHJlbGF0aW9uIHR5cGUgZG9lc24ndCBleGlzdFxuICAgKi9cbiAgaGFzUmVsYXRpb24ocmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpIHtcbiAgICBpZiAodHlwZW9mIHJlbGF0aW9uTmFtZSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwidGhlIHJlbGF0aW9uIG5hbWUgbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICB9XG5cbiAgICBpZiAoIVJFTEFUSU9OX1RZUEVfTElTVC5pbmNsdWRlcyhyZWxhdGlvblR5cGUpKSB7XG4gICAgICB0aHJvdyBFcnJvcihcImludmFsaWQgcmVsYXRpb24gdHlwZVwiKTtcbiAgICB9XG5cbiAgICBjb25zdCB0eXBlTWFwID0gdGhpcy5fZ2V0Q2hpbGRyZW5UeXBlKHJlbGF0aW9uVHlwZSk7XG5cbiAgICBpZiAodHlwZW9mIHR5cGVNYXAgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHlwZU1hcC5oYXMocmVsYXRpb25OYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWZXJpZnkgaWYgdGhlIG5vZGUgY29udGFpbnMgYWxsIHRoZSByZWxhdGlvbiBuYW1lcy5cbiAgICogQHBhcmFtIHtBcnJheTxTdHJpbmc+fSByZWxhdGlvbk5hbWVzIEFycmF5IGNvbnRhaW5pbmcgYWxsIHRoZSByZWxhdGlvbiBuYW1lXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvblR5cGUgVHlwZSBvZiB0aGUgcmVsYXRpb25zXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm4gdHJ1ZSBpZiB0aGUgbm9kZSBjb250YWlucyBhbGwgdGhlIHJlbGF0aW9ucyBpbiByZWxhdGlvbk5hbWVzLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIHJlbGF0aW9uIG5hbWVzIGFyZSBub3QgaW4gYW4gYXJyYXlcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBvbmUgb2YgdGhlIHJlbGF0aW9uIG5hbWVzIGlzIG5vdCBhIHN0cmluZ1xuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHJlbGF0aW9uIHR5cGUgZG9lc24ndCBleGlzdFxuICAgKi9cbiAgaGFzUmVsYXRpb25zKHJlbGF0aW9uTmFtZXMsIHJlbGF0aW9uVHlwZSkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShyZWxhdGlvbk5hbWVzKSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwiVGhlIHJlbGF0aW9uIG5hbWVzIG11c3QgYmUgaW4gYW4gYXJyYXlcIik7XG4gICAgfVxuXG4gICAgaWYgKCFSRUxBVElPTl9UWVBFX0xJU1QuaW5jbHVkZXMocmVsYXRpb25UeXBlKSkge1xuICAgICAgdGhyb3cgRXJyb3IoXCJpbnZhbGlkIHJlbGF0aW9uIHR5cGVcIik7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgcmVsYXRpb25OYW1lIG9mIHJlbGF0aW9uTmFtZXMpIHtcbiAgICAgIGlmICghdGhpcy5oYXNSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYWxsIHRoZSByZWxhdGlvbiBuYW1lcyBvZiB0aGUgbm9kZS5cbiAgICogQHJldHVybnMge0FycmF5PFN0cmluZz59IFRoZSBuYW1lcyBvZiB0aGUgcmVsYXRpb25zIG9mIHRoZSBub2RlXG4gICAqL1xuICBnZXRSZWxhdGlvbk5hbWVzKCkge1xuICAgIGNvbnN0IG5hbWVzID0gW107XG5cbiAgICBmb3IgKGxldCByZWxhdGlvbk1hcCBvZiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICBuYW1lcy5wdXNoKC4uLnJlbGF0aW9uTWFwLmtleXMoKSk7XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlcyBhbGwgZHVwbGljYXRlc1xuICAgIHJldHVybiBBcnJheS5mcm9tKG5ldyBTZXQobmFtZXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgdGhlIG5vZGUgYXMgY2hpbGQgb2YgdGhlIHJlbGF0aW9uLlxuICAgKiBAcGFyYW0ge1NwaW5hbE5vZGUgfCBNb2RlbH0gY2hpbGQgRWxlbWVudCB0byBhZGQgYXMgY2hpbGRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uTmFtZSBOYW1lIG9mIHRoZSByZWxhdGlvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25UeXBlIFR5cGUgb2YgdGhlIHJlbGF0aW9uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFNwaW5hbE5vZGU+fSBUaGUgY2hpbGQgbm9kZSBpbiBhIHByb21pc2VcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgY2hpbGQgaXMgbm90IGEgbW9kZWxcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgcmVsYXRpb24gbmFtZSBpcyBub3QgYSBzdHJpbmdcbiAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSByZWxhdGlvbiB0eXBlIGlzIGludmFsaWRcbiAgICovXG4gIGFzeW5jIGFkZENoaWxkKGNoaWxkLCByZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSkge1xuICAgIGxldCByZWxhdGlvbjtcblxuICAgIGlmICghKGNoaWxkIGluc3RhbmNlb2YgZ2xvYmFsVHlwZS5Nb2RlbCkpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcbiAgICAgICAgXCJDYW5ub3QgYWRkIGEgY2hpbGQgd2l0Y2ggaXMgbm90IGFuIGluc3RhbmNlIG9mIFNwaW5hbE5vZGUgb3IgTW9kZWwuXCJcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmICghKGNoaWxkIGluc3RhbmNlb2YgU3BpbmFsTm9kZSkpIHtcbiAgICAgIGNoaWxkID0gbmV3IFNwaW5hbE5vZGUodW5kZWZpbmVkLCB1bmRlZmluZWQsIGNoaWxkKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuaGFzUmVsYXRpb24ocmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpKSB7XG4gICAgICByZWxhdGlvbiA9IHRoaXMuX2NyZWF0ZVJlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVsYXRpb24gPSB0aGlzLl9nZXRSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSk7XG4gICAgfVxuXG4gICAgYXdhaXQgcmVsYXRpb24uYWRkQ2hpbGQoY2hpbGQpO1xuICAgIHJldHVybiBjaGlsZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgY2hpbGQgYW5kIG5vdGljZXMgdGhlIGNvbnRleHQgaWYgYSBuZXcgcmVsYXRpb24gd2FzIGNyZWF0ZWQuXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZSB8IE1vZGVsfSBjaGlsZCBOb2RlIHRvIGFkZCBhcyBjaGlsZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25OYW1lIE5hbWUgb2YgdGhlIHJlbGF0aW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvblR5cGUgVHlwZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHBhcmFtIHtTcGluYWxDb250ZXh0fSBjb250ZXh0IENvbnRleHQgdG8gdXBkYXRlXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFNwaW5hbE5vZGU+fSBUaGUgY2hpbGQgbm9kZSBpbiBhIHByb21pc2VcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgY2hpbGQgaXMgbm90IGEgbW9kZWxcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgcmVsYXRpb24gbmFtZSBpcyBub3QgYSBzdHJpbmdcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgY29udGV4dCBpcyBub3QgYSBTcGluYWxDb250ZXh0XG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcmVsYXRpb24gdHlwZSBpcyBpbnZhbGlkXG4gICAqL1xuICBhc3luYyBhZGRDaGlsZEluQ29udGV4dChjaGlsZCwgcmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUsIGNvbnRleHQpIHtcbiAgICBsZXQgcmVsYXRpb247XG5cbiAgICBpZiAoIShjb250ZXh0IGluc3RhbmNlb2YgU3BpbmFsQ29udGV4dCkpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcImNvbnRleHQgbXVzdCBiZSBhIFNwaW5hQ29udGV4dFwiKTtcbiAgICB9XG5cbiAgICBpZiAoIShjaGlsZCBpbnN0YW5jZW9mIGdsb2JhbFR5cGUuTW9kZWwpKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXG4gICAgICAgIFwiQ2Fubm90IGFkZCBhIGNoaWxkIHdpdGNoIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBTcGluYWxOb2RlIG9yIE1vZGVsLlwiXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoIShjaGlsZCBpbnN0YW5jZW9mIFNwaW5hbE5vZGUpKSB7XG4gICAgICBjaGlsZCA9IG5ldyBTcGluYWxOb2RlKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBjaGlsZCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmhhc1JlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKSkge1xuICAgICAgcmVsYXRpb24gPSB0aGlzLl9jcmVhdGVSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbGF0aW9uID0gdGhpcy5fZ2V0UmVsYXRpb24ocmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpO1xuICAgIH1cblxuICAgIGNoaWxkLmFkZENvbnRleHRJZChjb250ZXh0LmdldElkKCkuZ2V0KCkpO1xuICAgIHJlbGF0aW9uLmFkZENvbnRleHRJZChjb250ZXh0LmdldElkKCkuZ2V0KCkpO1xuXG4gICAgYXdhaXQgcmVsYXRpb24uYWRkQ2hpbGQoY2hpbGQpO1xuICAgIHJldHVybiBjaGlsZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBub2RlIGZyb20gdGhlIHJlbGF0aW9uIGNoaWxkcmVuLlxuICAgKiBAcGFyYW0ge1NwaW5hbE5vZGV9IG5vZGUgTm9kZSB0byByZW1vdmVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uTmFtZSBOYW1lIG9mIHRoZSByZWxhdGlvbiB0byB3aWNoIHRoZSBub2RlIGJlbG9uZ3NcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uVHlwZSBUeXBlIG9mIHRoZSByZWxhdGlvbiB0byB3aWNoIHRoZSBub2RlIGJlbG9uZ3NcbiAgICogQHJldHVybnMge1Byb21pc2U8bm90aGluZz59IEFuIGVtcHR5IHByb21pc2VcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiByZWxhdGlvbiBuYW1lIGlzIG5vdCBhIHN0cmluZ1xuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgcmVsYXRpb24gdHlwZSBpcyBpbnZhbGlkXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiByZWxhdGlvbiBkb2Vzbid0IGV4aXN0XG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgY2hpbGQgZG9lc24ndCBleGlzdFxuICAgKi9cbiAgcmVtb3ZlQ2hpbGQobm9kZSwgcmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpIHtcbiAgICBpZiAoIXRoaXMuaGFzUmVsYXRpb24ocmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpKSB7XG4gICAgICB0aHJvdyBFcnJvcihcIlRoZSByZWxhdGlvbiBkb2Vzbid0IGV4aXN0XCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbCA9IHRoaXMuX2dldFJlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKTtcbiAgICByZXR1cm4gcmVsLnJlbW92ZUNoaWxkKG5vZGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgY2hpbGRyZW4gd2l0aCB0aGUgcmVsYXRpb24gbmFtZXMuXG4gICAqIEBwYXJhbSB7QXJyYXk8U3RyaW5nPiB8IFN0cmluZyB8IHVuZGVmaW5lZH0gcmVsYXRpb25OYW1lcyBOYW1lcyBvZiB0aGUgcmVsYXRpb25zIHRvIGVtcHR5XG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PEJvb2xlYW4+Pn0gQSBwcm9taXNlIGNvbnRhaW5pbmcgYW4gYXJyYXkgb2YgYm9vbGVhblxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHJlbGF0aW9uTmFtZXMgaXMgbmVpdGhlciBhbiBhcnJheSwgYSBzdHJpbmcgb3Igb21pdHRlZFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGFuIGVsZW1lbnQgb2YgcmVsYXRpb25OYW1lcyBpcyBub3QgYSBzdHJpbmdcbiAgICovXG4gIGFzeW5jIHJlbW92ZUNoaWxkcmVuKHJlbGF0aW9uTmFtZXMpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShyZWxhdGlvbk5hbWVzKSkge1xuICAgICAgaWYgKHJlbGF0aW9uTmFtZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJlbGF0aW9uTmFtZXMgPSB0aGlzLmdldFJlbGF0aW9uTmFtZXMoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHJlbGF0aW9uTmFtZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVsYXRpb25OYW1lcyA9IHRoaXMuZ2V0UmVsYXRpb25OYW1lcygpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlbGF0aW9uTmFtZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHJlbGF0aW9uTmFtZXMgPSBbcmVsYXRpb25OYW1lc107XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcInJlbGF0aW9uTmFtZXMgbXVzdCBiZSBhbiBhcnJheSwgYSBzdHJpbmcgb3Igb21pdHRlZFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgcmVsYXRpb25NYXAgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgZm9yIChsZXQgcmVsYXRpb25OYW1lIG9mIHJlbGF0aW9uTmFtZXMpIHtcbiAgICAgICAgaWYgKHJlbGF0aW9uTWFwLmhhcyhyZWxhdGlvbk5hbWUpKSB7XG4gICAgICAgICAgY29uc3QgcmVsYXRpb24gPSByZWxhdGlvbk1hcC5nZXRFbGVtZW50KHJlbGF0aW9uTmFtZSk7XG4gICAgICAgICAgcHJvbWlzZXMucHVzaChyZWxhdGlvbi5yZW1vdmVDaGlsZHJlbigpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgY2hpbGQgcmVsYXRpb24gb2YgdGhlIG5vZGUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk5hbWUgTmFtZSBvZiB0aGUgcmVsYXRpb24gdG8gcmVtb3ZlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvblR5cGUgVHlwZSBvZiB0aGUgcmVsYXRpb24gdG8gcmVtb3ZlXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPG5vdGhpbmc+fSBBbiBlbXB0eSBwcm9taXNlXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIHJlbGF0aW9uTmFtZSBpcyBub3QgYSBzdHJpbmdcbiAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSByZWxhdGlvblR5cGUgaXMgaW52YWxpZFxuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHJlbGF0aW9uIGRvZXNuJ3QgZXhpc3RcbiAgICovXG4gIHJlbW92ZVJlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKSB7XG4gICAgaWYgKCF0aGlzLmhhc1JlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKSkge1xuICAgICAgdGhyb3cgRXJyb3IoXCJUaGUgcmVsYXRpb24gZG9lc24ndCBleGlzdFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCByZWwgPSB0aGlzLl9nZXRSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSk7XG4gICAgcmV0dXJuIHJlbC5yZW1vdmVGcm9tR3JhcGgoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgdGhlIG5vZGUgZnJvbSB0aGUgZ3JhcGggaS5lIHJlbW92ZSB0aGUgbm9kZSBmcm9tIGFsbCB0aGUgcGFyZW50IHJlbGF0aW9ucyBhbmQgcmVtb3ZlIGFsbCB0aGUgY2hpbGRyZW4gcmVsYXRpb25zLlxuICAgKiBUaGlzIG9wZXJhdGlvbiBtaWdodCBkZWxldGUgYWxsIHRoZSBzdWItZ3JhcGggdW5kZXIgdGhpcyBub2RlLlxuICAgKiBBZnRlciB0aGlzIG9wZXJhdGlvbiB0aGUgbm9kZSBjYW4gYmUgZGVsZXRlZCB3aXRob3V0IGZlYXIuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPG5vdGhpbmc+fSBBbiBlbXB0eSBwcm9taXNlXG4gICAqL1xuICBhc3luYyByZW1vdmVGcm9tR3JhcGgoKSB7XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbVBhcmVudHMoKSxcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21DaGlsZHJlbigpXG4gICAgXSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY2hpbGRyZW4gb2YgdGhlIG5vZGUgZm9yIHRoZSByZWxhdGlvbiBuYW1lcy5cbiAgICogQHBhcmFtIHtBcnJheTxTdHJpbmc+fSByZWxhdGlvbk5hbWVzIEFycmF5IGNvbnRhaW5pbmcgdGhlIHJlbGF0aW9uIG5hbWVzIG9mIHRoZSBkZXNpcmVkIGNoaWxkcmVuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PFNwaW5hbE5vZGU+Pn0gVGhlIGNoaWxkcmVuIHRoYXQgd2VyZSBmb3VuZFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHJlbGF0aW9uTmFtZXMgaXMgbmVpdGhlciBhbiBhcnJheSwgYSBzdHJpbmcgb3Igb21pdHRlZFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGFuIGVsZW1lbnQgb2YgcmVsYXRpb25OYW1lcyBpcyBub3QgYSBzdHJpbmdcbiAgICovXG4gIGFzeW5jIGdldENoaWxkcmVuKHJlbGF0aW9uTmFtZXMpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShyZWxhdGlvbk5hbWVzKSkge1xuICAgICAgaWYgKHJlbGF0aW9uTmFtZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJlbGF0aW9uTmFtZXMgPSB0aGlzLmdldFJlbGF0aW9uTmFtZXMoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHJlbGF0aW9uTmFtZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVsYXRpb25OYW1lcyA9IHRoaXMuZ2V0UmVsYXRpb25OYW1lcygpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlbGF0aW9uTmFtZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHJlbGF0aW9uTmFtZXMgPSBbcmVsYXRpb25OYW1lc107XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcInJlbGF0aW9uTmFtZXMgbXVzdCBiZSBhbiBhcnJheSwgYSBzdHJpbmcgb3Igb21pdHRlZFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgcmVsYXRpb25NYXAgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByZWxhdGlvbk5hbWVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChyZWxhdGlvbk1hcC5oYXMocmVsYXRpb25OYW1lc1tqXSkpIHtcbiAgICAgICAgICBjb25zdCByZWxhdGlvbiA9IHJlbGF0aW9uTWFwLmdldEVsZW1lbnQocmVsYXRpb25OYW1lc1tqXSk7XG4gICAgICAgICAgcHJvbWlzZXMucHVzaChyZWxhdGlvbi5nZXRDaGlsZHJlbigpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNoaWxkcmVuTHN0ID0gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIGxldCByZXMgPSBbXTtcblxuICAgIGZvciAobGV0IGNoaWxkcmVuIG9mIGNoaWxkcmVuTHN0KSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlcy5wdXNoKGNoaWxkcmVuW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgY2hpbGRyZW4gb2YgdGhlIG5vZGUgdGhhdCBhcmUgcmVnaXN0ZXJlZCBpbiB0aGUgY29udGV4dFxuICAgKiBAcGFyYW0ge1NwaW5hbENvbnRleHR9IGNvbnRleHQgQ29udGV4dCB0byB1c2UgZm9yIHRoZSBzZWFyY2hcbiAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8U3BpbmFsTm9kZT4+fSBUaGUgY2hpbGRyZW4gdGhhdCB3ZXJlIGZvdW5kXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIGNvbnRleHQgaXMgbm90IGEgU3BpbmFsQ29udGV4dFxuICAgKi9cbiAgYXN5bmMgZ2V0Q2hpbGRyZW5JbkNvbnRleHQoY29udGV4dCkge1xuICAgIGlmICghKGNvbnRleHQgaW5zdGFuY2VvZiBTcGluYWxDb250ZXh0KSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwiY29udGV4dCBtdXN0IGJlIGEgU3BpbmFsQ29udGV4dFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgcmVsYXRpb25NYXAgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgZm9yIChsZXQgcmVsYXRpb24gb2YgcmVsYXRpb25NYXApIHtcbiAgICAgICAgaWYgKHJlbGF0aW9uLmJlbG9uZ3NUb0NvbnRleHQoY29udGV4dCkpIHtcbiAgICAgICAgICBwcm9taXNlcy5wdXNoKHJlbGF0aW9uLmdldENoaWxkcmVuSW5Db250ZXh0KGNvbnRleHQpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNoaWxkcmVuTHN0ID0gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIGxldCByZXMgPSBbXTtcblxuICAgIGZvciAobGV0IGNoaWxkcmVuIG9mIGNoaWxkcmVuTHN0KSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlcy5wdXNoKGNoaWxkcmVuW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhbGwgcGFyZW50cyBmb3IgdGhlIHJlbGF0aW9uIG5hbWVzIG5vIG1hdHRlciB0aGUgdHlwZSBvZiByZWxhdGlvblxuICAgKiBAcGFyYW0ge0FycmF5PFN0cmluZz59IHJlbGF0aW9uTmFtZXMgQXJyYXkgY29udGFpbmluZyB0aGUgcmVsYXRpb24gbmFtZXMgb2YgdGhlIGRlc2lyZWQgcGFyZW50c1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxTcGluYWxOb2RlPj59IFByb21pc2UgY29udGFpbmluZyB0aGUgcGFyZW50cyB0aGF0IHdlcmUgZm91bmRcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgcmVsYXRpb25OYW1lcyBhcmUgbmVpdGhlciBhbiBhcnJheSwgYSBzdHJpbmcgb3Igb21pdHRlZFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGFuIGVsZW1lbnQgb2YgcmVsYXRpb25OYW1lcyBpcyBub3QgYSBzdHJpbmdcbiAgICovXG4gIGdldFBhcmVudHMocmVsYXRpb25OYW1lcykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHJlbGF0aW9uTmFtZXMpKSB7XG4gICAgICBpZiAocmVsYXRpb25OYW1lcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmVsYXRpb25OYW1lcyA9IHRoaXMucGFyZW50cy5rZXlzKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChyZWxhdGlvbk5hbWVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlbGF0aW9uTmFtZXMgPSB0aGlzLnBhcmVudHMua2V5cygpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlbGF0aW9uTmFtZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHJlbGF0aW9uTmFtZXMgPSBbcmVsYXRpb25OYW1lc107XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcInJlbGF0aW9uTmFtZXMgbXVzdCBiZSBhbiBhcnJheSwgYSBzdHJpbmcgb3Igb21pdHRlZFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgbmFtZSBvZiByZWxhdGlvbk5hbWVzKSB7XG4gICAgICBjb25zdCBsaXN0ID0gdGhpcy5wYXJlbnRzLmdldEVsZW1lbnQobmFtZSk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBwcm9taXNlcy5wdXNoKFxuICAgICAgICAgIGxpc3RbaV0ubG9hZCgpLnRoZW4ocmVsYXRpb24gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJlbGF0aW9uLmdldFBhcmVudCgpO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWN1cnNpdmVseSBmaW5kcyBhbGwgdGhlIGNoaWxkcmVuIG5vZGVzIGZvciB3aGljaCB0aGUgcHJlZGljYXRlIGlzIHRydWUuXG4gICAqIEBwYXJhbSB7QXJyYXk8U3RyaW5nPn0gcmVsYXRpb25OYW1lcyBBcnJheSBjb250YWluaW5nIHRoZSByZWxhdGlvbiBuYW1lcyB0byBmb2xsb3dcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gcHJlZGljYXRlIEZ1bmN0aW9uIHJldHVybmluZyB0cnVlIGlmIHRoZSBub2RlIG5lZWRzIHRvIGJlIHJldHVybmVkXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PFNwaW5hbE5vZGU+Pn0gVGhlIG5vZGVzIHRoYXQgd2VyZSBmb3VuZFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSByZWxhdGlvbk5hbWVzIGFyZSBuZWl0aGVyIGFuIGFycmF5LCBhIHN0cmluZyBvciBvbWl0dGVkXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgYW4gZWxlbWVudCBvZiByZWxhdGlvbk5hbWVzIGlzIG5vdCBhIHN0cmluZ1xuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBwcmVkaWNhdGUgaXMgbm90IGEgZnVuY3Rpb25cbiAgICovXG4gIGFzeW5jIGZpbmQocmVsYXRpb25OYW1lcywgcHJlZGljYXRlID0gREVGQVVMVF9QUkVESUNBVEUpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkocmVsYXRpb25OYW1lcykgJiZcbiAgICAgIHJlbGF0aW9uTmFtZXMgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgdHlwZW9mIHJlbGF0aW9uTmFtZXMgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcInJlbGF0aW9uTmFtZXMgbXVzdCBiZSBhbiBhcnJheSwgYSBzdHJpbmcgb3Igb21pdHRlZFwiKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHByZWRpY2F0ZSAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXCJwcmVkaWNhdGUgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHNlZW4gPSBuZXcgU2V0KFt0aGlzXSk7XG4gICAgbGV0IHByb21pc2VzID0gW107XG4gICAgbGV0IG5leHRHZW4gPSBbdGhpc107XG4gICAgbGV0IGN1cnJlbnRHZW4gPSBbXTtcbiAgICBjb25zdCBmb3VuZCA9IFtdO1xuXG4gICAgd2hpbGUgKG5leHRHZW4ubGVuZ3RoKSB7XG4gICAgICBjdXJyZW50R2VuID0gbmV4dEdlbjtcbiAgICAgIHByb21pc2VzID0gW107XG4gICAgICBuZXh0R2VuID0gW107XG5cbiAgICAgIGZvciAobGV0IG5vZGUgb2YgY3VycmVudEdlbikge1xuICAgICAgICBwcm9taXNlcy5wdXNoKG5vZGUuZ2V0Q2hpbGRyZW4ocmVsYXRpb25OYW1lcykpO1xuXG4gICAgICAgIGlmIChwcmVkaWNhdGUobm9kZSkpIHtcbiAgICAgICAgICBmb3VuZC5wdXNoKG5vZGUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxldCBjaGlsZHJlbkFycmF5cyA9IGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcblxuICAgICAgZm9yIChsZXQgY2hpbGRyZW4gb2YgY2hpbGRyZW5BcnJheXMpIHtcbiAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgY2hpbGRyZW4pIHtcbiAgICAgICAgICBpZiAoIXNlZW4uaGFzKGNoaWxkKSkge1xuICAgICAgICAgICAgbmV4dEdlbi5wdXNoKGNoaWxkKTtcbiAgICAgICAgICAgIHNlZW4uYWRkKGNoaWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZm91bmQ7XG4gIH1cblxuICAvKipcbiAgICogUmVjdXJzaXZlbHkgZmluZHMgYWxsIHRoZSBjaGlsZHJlbiBub2RlcyBpbiB0aGUgY29udGV4dCBmb3Igd2hpY2ggdGhlIHByZWRpY2F0ZSBpcyB0cnVlLi5cbiAgICogQHBhcmFtIHtTcGluYWxDb250ZXh0fSBjb250ZXh0IENvbnRleHQgdG8gdXNlIGZvciB0aGUgc2VhcmNoXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IHByZWRpY2F0ZSBGdW5jdGlvbiByZXR1cm5pbmcgdHJ1ZSBpZiB0aGUgbm9kZSBuZWVkcyB0byBiZSByZXR1cm5lZFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxTcGluYWxOb2RlPj59IFRoZSBub2RlcyB0aGF0IHdlcmUgZm91bmRcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBjb250ZXh0IGlzIG5vdCBhIFNwaW5hbENvbnRleHRcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgcHJlZGljYXRlIGlzIG5vdCBhIGZ1bmN0aW9uXG4gICAqL1xuICBhc3luYyBmaW5kSW5Db250ZXh0KGNvbnRleHQsIHByZWRpY2F0ZSA9IERFRkFVTFRfUFJFRElDQVRFKSB7XG4gICAgaWYgKHR5cGVvZiBwcmVkaWNhdGUgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHByZWRpY2F0ZSBmdW5jdGlvbiBtdXN0IGJlIGEgZnVuY3Rpb25cIik7XG4gICAgfVxuXG4gICAgY29uc3Qgc2VlbiA9IG5ldyBTZXQoW3RoaXNdKTtcbiAgICBsZXQgcHJvbWlzZXMgPSBbXTtcbiAgICBsZXQgbmV4dEdlbiA9IFt0aGlzXTtcbiAgICBsZXQgY3VycmVudEdlbiA9IFtdO1xuICAgIGNvbnN0IGZvdW5kID0gW107XG5cbiAgICB3aGlsZSAobmV4dEdlbi5sZW5ndGgpIHtcbiAgICAgIGN1cnJlbnRHZW4gPSBuZXh0R2VuO1xuICAgICAgcHJvbWlzZXMgPSBbXTtcbiAgICAgIG5leHRHZW4gPSBbXTtcblxuICAgICAgZm9yIChsZXQgbm9kZSBvZiBjdXJyZW50R2VuKSB7XG4gICAgICAgIHByb21pc2VzLnB1c2gobm9kZS5nZXRDaGlsZHJlbkluQ29udGV4dChjb250ZXh0KSk7XG5cbiAgICAgICAgaWYgKHByZWRpY2F0ZShub2RlKSkge1xuICAgICAgICAgIGZvdW5kLnB1c2gobm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGV0IGNoaWxkcmVuQXJyYXlzID0gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuXG4gICAgICBmb3IgKGxldCBjaGlsZHJlbiBvZiBjaGlsZHJlbkFycmF5cykge1xuICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBjaGlsZHJlbikge1xuICAgICAgICAgIGlmICghc2Vlbi5oYXMoY2hpbGQpKSB7XG4gICAgICAgICAgICBuZXh0R2VuLnB1c2goY2hpbGQpO1xuICAgICAgICAgICAgc2Vlbi5hZGQoY2hpbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmb3VuZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWN1cnNpdmVseSBhcHBsaWVzIGEgZnVuY3Rpb24gdG8gYWxsIHRoZSBjaGlsZHJlbiBub2Rlcy5cbiAgICogQHBhcmFtIHtBcnJheTxTdHJpbmc+fSByZWxhdGlvbk5hbWVzIEFycmF5IGNvbnRhaW5pbmcgdGhlIHJlbGF0aW9uIG5hbWVzIHRvIGZvbGxvd1xuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBGdW5jdGlvbiB0byBhcHBseSB0byB0aGUgbm9kZXNcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgcmVsYXRpb25OYW1lcyBhcmUgbmVpdGhlciBhbiBhcnJheSwgYSBzdHJpbmcgb3Igb21pdHRlZFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGFuIGVsZW1lbnQgb2YgcmVsYXRpb25OYW1lcyBpcyBub3QgYSBzdHJpbmdcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgY2FsbGJhY2sgaXMgbm90IGEgZnVuY3Rpb25cbiAgICovXG4gIGFzeW5jIGZvckVhY2gocmVsYXRpb25OYW1lcywgY2FsbGJhY2spIHtcbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcImNhbGxiYWNrIG11c3QgYmUgYSBmdW5jdGlvblwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBub2RlcyA9IGF3YWl0IHRoaXMuZmluZChyZWxhdGlvbk5hbWVzKTtcblxuICAgIGZvciAobGV0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgIGNhbGxiYWNrKG5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWN1cnNpdmVseSBhcHBsaWVzIGEgZnVuY3Rpb24gdG8gYWxsIHRoZSBjaGlsZHJlbiBub2RlcyBpbiB0aGUgY29udGV4dC5cbiAgICogQHBhcmFtIHtTcGluYWxDb250ZXh0fSBjb250ZXh0IENvbnRleHQgdG8gdXNlIGZvciB0aGUgc2VhcmNoXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIEZ1bmN0aW9uIHRvIGFwcGx5IHRvIHRoZSBub2Rlc1xuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGNvbnRleHQgaXMgbm90IGEgU3BpbmFsQ29udGV4dFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBjYWxsYmFjayBpcyBub3QgYSBmdW5jdGlvblxuICAgKi9cbiAgYXN5bmMgZm9yRWFjaEluQ29udGV4dChjb250ZXh0LCBjYWxsYmFjaykge1xuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwiY2FsbGJhY2sgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IG5vZGVzID0gYXdhaXQgdGhpcy5maW5kSW5Db250ZXh0KGNvbnRleHQpO1xuXG4gICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xuICAgICAgY2FsbGJhY2sobm9kZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlY3Vyc2l2ZWx5IGFwcGxpZXMgYSBmdW5jdGlvbiB0byBhbGwgdGhlIGNoaWxkcmVuIG5vZGVzIGFuZCByZXR1cm5zIHRoZSByZXN1bHRzIGluIGFuIGFycmF5LlxuICAgKiBAcGFyYW0ge0FycmF5PFN0cmluZz59IHJlbGF0aW9uTmFtZXMgQXJyYXkgY29udGFpbmluZyB0aGUgcmVsYXRpb24gbmFtZXMgdG8gZm9sbG93XG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIEZ1bmN0aW9uIHRvIGFwcGx5IHRvIHRoZSBub2Rlc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTwqPj59IFRoZSByZXN1bHRzIG9mIHRoZSBjYWxsYmFjayBmb3IgZWFjaCBub2RlXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIHJlbGF0aW9uTmFtZXMgYXJlIG5laXRoZXIgYW4gYXJyYXksIGEgc3RyaW5nIG9yIG9taXR0ZWRcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBhbiBlbGVtZW50IG9mIHJlbGF0aW9uTmFtZXMgaXMgbm90IGEgc3RyaW5nXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIGNhbGxiYWNrIGlzIG5vdCBhIGZ1bmN0aW9uXG4gICAqL1xuICBhc3luYyBtYXAocmVsYXRpb25OYW1lcywgY2FsbGJhY2spIHtcbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcIlRoZSBjYWxsYmFjayBmdW5jdGlvbiBtdXN0IGJlIGEgZnVuY3Rpb25cIik7XG4gICAgfVxuXG4gICAgY29uc3Qgbm9kZXMgPSBhd2FpdCB0aGlzLmZpbmQocmVsYXRpb25OYW1lcyk7XG4gICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuXG4gICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xuICAgICAgcmVzdWx0cy5wdXNoKGNhbGxiYWNrKG5vZGUpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWN1cnNpdmVseSBhcHBsaWVzIGEgZnVuY3Rpb24gdG8gYWxsIHRoZSBjaGlsZHJlbiBub2RlcyBpbiB0aGUgY29udGV4dCBhbmQgcmV0dXJucyB0aGUgcmVzdWx0cyBpbiBhbiBhcnJheS5cbiAgICogQHBhcmFtIHtTcGluYWxDb250ZXh0fSBjb250ZXh0IENvbnRleHQgdG8gdXNlIGZvciB0aGUgc2VhcmNoXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIEZ1bmN0aW9uIHRvIGFwcGx5IHRvIHRoZSBub2Rlc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTwqPj59IFRoZSByZXN1bHRzIG9mIHRoZSBjYWxsYmFjayBmb3IgZWFjaCBub2RlXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgY29udGV4dCBpcyBub3QgYSBTcGluYWxDb250ZXh0XG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIGNhbGxiYWNrIGlzIG5vdCBhIGZ1bmN0aW9uXG4gICAqL1xuICBhc3luYyBtYXBJbkNvbnRleHQoY29udGV4dCwgY2FsbGJhY2spIHtcbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcIlRoZSBjYWxsYmFjayBmdW5jdGlvbiBtdXN0IGJlIGEgZnVuY3Rpb25cIik7XG4gICAgfVxuXG4gICAgY29uc3Qgbm9kZXMgPSBhd2FpdCB0aGlzLmZpbmRJbkNvbnRleHQoY29udGV4dCk7XG4gICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuXG4gICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xuICAgICAgcmVzdWx0cy5wdXNoKGNhbGxiYWNrKG5vZGUpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIHJlbGF0aW9uIGxpc3QgY29ycmVzcG9uZGluZyB0byB0aGUgcmVsYXRpb24gdHlwZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uVHlwZSBUeXBlIG9mIHRoZSByZWxhdGlvblxuICAgKiBAcmV0dXJucyB7U3BpbmFsTWFwfSBSZXR1cm4gdGhlIHJlbGF0aW9uIGxpc3QgY29ycmVzcG9uZGluZyB0byB0aGUgcmVsYXRpb24gdHlwZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2dldENoaWxkcmVuVHlwZShyZWxhdGlvblR5cGUpIHtcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5nZXRFbGVtZW50KHJlbGF0aW9uVHlwZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSByZWxhdGlvbiBjb3JyZXNwb25kaW5nLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25OYW1lIE5hbWUgb2YgdGhlIHJlbGF0aW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvblR5cGUgVHlwZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHJldHVybnMge1NwaW5hbFJlbGF0aW9ufSBUaGUgcmVsYXRpb24gY29ycmVzcG9uZGluZ1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2dldFJlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldENoaWxkcmVuVHlwZShyZWxhdGlvblR5cGUpLmdldEVsZW1lbnQocmVsYXRpb25OYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgcGFyZW50IHJlbGF0aW9uIG9mIHRoZSBub2RlLlxuICAgKiBAcGFyYW0ge1NwaW5hbFJlbGF0aW9ufSByZWxhdGlvbiBSZWxhdGlvbiB0byByZW1vdmVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9yZW1vdmVQYXJlbnQocmVsYXRpb24pIHtcbiAgICBjb25zdCBwYXJlbnRMc3QgPSB0aGlzLnBhcmVudHMuZ2V0RWxlbWVudChyZWxhdGlvbi5nZXROYW1lKCkuZ2V0KCkpO1xuXG4gICAgY29uc3QgaW5kZXhUb1JlbW92ZSA9IHBhcmVudExzdC5pbmRleE9mKFxuICAgICAgcGFyZW50UHRyID0+IHBhcmVudFB0ci5nZXRJZCgpLmdldCgpID09PSByZWxhdGlvbi5nZXRJZCgpLmdldCgpXG4gICAgKTtcblxuICAgIHBhcmVudExzdC5zcGxpY2UoaW5kZXhUb1JlbW92ZSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgbm9kZSBmcm9tIGFsbCBwYXJlbnQgcmVsYXRpb24gdGhlIHByb3BlcnR5IHBhcmVudHMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhc3luYyBfcmVtb3ZlRnJvbVBhcmVudHMoKSB7XG4gICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcblxuICAgIGZvciAobGV0IHBhcmVudCBvZiB0aGlzLnBhcmVudHMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBhcmVudFtpXS5sb2FkKCkudGhlbihwYXJlbnRSZWwgPT4ge1xuICAgICAgICAgIHByb21pc2VzLnB1c2gocGFyZW50UmVsLnJlbW92ZUNoaWxkKHRoaXMpKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIHRoZSByZWxhdGlvbiBhcyBwYXJlbnQgb2YgdGhlIG5vZGUuXG4gICAqIEBwYXJhbSB7U3BpbmFsUmVsYXRpb259IHJlbGF0aW9uIFBhcmVudCByZWxhdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2FkZFBhcmVudChyZWxhdGlvbikge1xuICAgIGNvbnN0IHJlbGF0aW9uTmFtZSA9IHJlbGF0aW9uLmdldE5hbWUoKS5nZXQoKTtcblxuICAgIGlmICh0aGlzLnBhcmVudHMuaGFzKHJlbGF0aW9uTmFtZSkpIHtcbiAgICAgIHRoaXMucGFyZW50c1xuICAgICAgICAuZ2V0RWxlbWVudChyZWxhdGlvbk5hbWUpXG4gICAgICAgIC5wdXNoKG5ldyBTcGluYWxOb2RlUG9pbnRlcihyZWxhdGlvbikpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBsaXN0ID0gbmV3IGdsb2JhbFR5cGUuTHN0KCk7XG4gICAgICBsaXN0LnB1c2gobmV3IFNwaW5hbE5vZGVQb2ludGVyKHJlbGF0aW9uKSk7XG4gICAgICB0aGlzLnBhcmVudHMuc2V0RWxlbWVudChyZWxhdGlvbk5hbWUsIGxpc3QpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgcmVsYXRpb24gZm9yIHRoaXMgbm9kZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uTmFtZSBOYW1lIG9mIHRoZSByZWxhdGlvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25UeXBlIFR5cGUgb2YgdGhlIHJlbGF0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfY3JlYXRlUmVsYXRpb24ocmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpIHtcbiAgICBjb25zdCByZWxhdGlvbiA9IFNwaW5hbFJlbGF0aW9uRmFjdG9yeS5nZXROZXdSZWxhdGlvbihcbiAgICAgIHRoaXMsXG4gICAgICByZWxhdGlvbk5hbWUsXG4gICAgICByZWxhdGlvblR5cGVcbiAgICApO1xuXG4gICAgaWYgKCF0aGlzLmNoaWxkcmVuLmhhcyhyZWxhdGlvblR5cGUpKSB7XG4gICAgICB0aGlzLmNoaWxkcmVuLnNldEVsZW1lbnQocmVsYXRpb25UeXBlLCBuZXcgU3BpbmFsTWFwKCkpO1xuICAgIH1cblxuICAgIHRoaXMuX2dldENoaWxkcmVuVHlwZShyZWxhdGlvblR5cGUpLnNldEVsZW1lbnQocmVsYXRpb25OYW1lLCByZWxhdGlvbik7XG4gICAgcmV0dXJuIHJlbGF0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbGwgY2hpbGRyZW4gcmVsYXRpb24gZnJvbSB0aGUgZ3JhcGguXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPG5vdGhpbmc+fSBBbiBlbXB0eSBwcm9taXNlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhc3luYyBfcmVtb3ZlRnJvbUNoaWxkcmVuKCkge1xuICAgIGNvbnN0IHByb21pc2VzID0gW107XG5cbiAgICBmb3IgKGxldCByZWxhdGlvbk1hcCBvZiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICBmb3IgKGxldCByZWxhdGlvbiBvZiByZWxhdGlvbk1hcCkge1xuICAgICAgICBwcm9taXNlcy5wdXNoKHJlbGF0aW9uLnJlbW92ZUZyb21HcmFwaCgpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICB9XG59XG5cbnNwaW5hbENvcmUucmVnaXN0ZXJfbW9kZWxzKFtTcGluYWxOb2RlXSk7XG5leHBvcnQgZGVmYXVsdCBTcGluYWxOb2RlO1xuIl19