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
   */


  find(relationNames, predicate = DEFAULT_PREDICATE) {
    var _this7 = this;

    return _asyncToGenerator(function* () {
      if (typeof predicate !== "function") {
        throw new Error("predicate must be a function");
      }

      let seen = new Set([_this7]);
      let promises = [];
      let nextGen = [_this7];
      let currentGen = [];
      let found = [];

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
   */


  findInContext(context, predicate = DEFAULT_PREDICATE) {
    var _this8 = this;

    return _asyncToGenerator(function* () {
      if (typeof predicate !== "function") {
        throw new Error("The predicate function must be a function");
      }

      let seen = new Set([_this8]);
      let promises = [];
      let nextGen = [_this8];
      let currentGen = [];
      let found = [];

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
   */


  forEach(relationNames, callback) {
    var _this9 = this;

    return _asyncToGenerator(function* () {
      if (typeof callback === "undefined") {
        throw Error("You must give a callback function");
      } else if (typeof callback !== "function") {
        throw new Error("The callback function must be a function");
      }

      let nodes = yield _this9.find(relationNames);
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
   */


  forEachInContext(context, callback) {
    var _this10 = this;

    return _asyncToGenerator(function* () {
      if (typeof callback === "undefined") {
        throw Error("You must give a callback function");
      } else if (typeof callback !== "function") {
        throw new Error("The callback function must be a function");
      }

      let nodes = yield _this10.findInContext(context);
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
   */


  map(relationNames, callback) {
    var _this11 = this;

    return _asyncToGenerator(function* () {
      if (typeof callback === "undefined") {
        throw Error("You must give a callback function");
      } else if (typeof callback !== "function") {
        throw new Error("The callback function must be a function");
      }

      let nodes = yield _this11.find(relationNames);
      let results = [];
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
   */


  mapInContext(context, callback) {
    var _this12 = this;

    return _asyncToGenerator(function* () {
      if (typeof callback === "undefined") {
        throw Error("You must give a callback function");
      } else if (typeof callback !== "function") {
        throw new Error("The callback function must be a function");
      }

      let nodes = yield _this12.findInContext(context);
      let results = [];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Ob2Rlcy9TcGluYWxOb2RlLmpzIl0sIm5hbWVzIjpbImdsb2JhbFR5cGUiLCJ3aW5kb3ciLCJnbG9iYWwiLCJERUZBVUxUX1BSRURJQ0FURSIsIlNwaW5hbE5vZGUiLCJNb2RlbCIsImNvbnN0cnVjdG9yIiwibmFtZSIsInR5cGUiLCJlbGVtZW50IiwiYWRkX2F0dHIiLCJpbmZvIiwiaWQiLCJwYXJlbnRzIiwiU3BpbmFsTWFwIiwiY2hpbGRyZW4iLCJ1bmRlZmluZWQiLCJTcGluYWxOb2RlUG9pbnRlciIsImNvbnRleHRJZHMiLCJTcGluYWxTZXQiLCJnZXRJZCIsImdldE5hbWUiLCJnZXRUeXBlIiwiZ2V0RWxlbWVudCIsImxvYWQiLCJnZXRDaGlsZHJlbklkcyIsIm5vZGVDaGlsZHJlbklkcyIsInJlbGF0aW9uTWFwIiwicmVsYXRpb24iLCJyZWxDaGlsZHJlbklkcyIsImkiLCJsZW5ndGgiLCJwdXNoIiwiZ2V0TmJDaGlsZHJlbiIsImNoaWxkcmVuSWRzIiwiYWRkQ29udGV4dElkIiwiVHlwZUVycm9yIiwiaGFzIiwiYWRkIiwiZ2V0Q29udGV4dElkcyIsInZhbHVlcyIsImJlbG9uZ3NUb0NvbnRleHQiLCJjb250ZXh0IiwiU3BpbmFsQ29udGV4dCIsImdldCIsImhhc1JlbGF0aW9uIiwicmVsYXRpb25OYW1lIiwicmVsYXRpb25UeXBlIiwiUkVMQVRJT05fVFlQRV9MSVNUIiwiaW5jbHVkZXMiLCJFcnJvciIsInR5cGVNYXAiLCJfZ2V0Q2hpbGRyZW5UeXBlIiwiaGFzUmVsYXRpb25zIiwicmVsYXRpb25OYW1lcyIsIkFycmF5IiwiaXNBcnJheSIsImdldFJlbGF0aW9uTmFtZXMiLCJuYW1lcyIsImtleXMiLCJmcm9tIiwiU2V0IiwiYWRkQ2hpbGQiLCJjaGlsZCIsIl9jcmVhdGVSZWxhdGlvbiIsIl9nZXRSZWxhdGlvbiIsImFkZENoaWxkSW5Db250ZXh0IiwicmVtb3ZlQ2hpbGQiLCJub2RlIiwicmVsIiwicmVtb3ZlQ2hpbGRyZW4iLCJwcm9taXNlcyIsIlByb21pc2UiLCJhbGwiLCJyZW1vdmVGcm9tR3JhcGgiLCJfcmVtb3ZlRnJvbVBhcmVudHMiLCJfcmVtb3ZlRnJvbUNoaWxkcmVuIiwiZ2V0Q2hpbGRyZW4iLCJqIiwiY2hpbGRyZW5Mc3QiLCJyZXMiLCJnZXRDaGlsZHJlbkluQ29udGV4dCIsImdldFBhcmVudHMiLCJsaXN0IiwidGhlbiIsImdldFBhcmVudCIsImZpbmQiLCJwcmVkaWNhdGUiLCJzZWVuIiwibmV4dEdlbiIsImN1cnJlbnRHZW4iLCJmb3VuZCIsImNoaWxkcmVuQXJyYXlzIiwiZmluZEluQ29udGV4dCIsImZvckVhY2giLCJjYWxsYmFjayIsIm5vZGVzIiwiZm9yRWFjaEluQ29udGV4dCIsIm1hcCIsInJlc3VsdHMiLCJtYXBJbkNvbnRleHQiLCJfcmVtb3ZlUGFyZW50IiwicGFyZW50THN0IiwiaW5kZXhUb1JlbW92ZSIsImluZGV4T2YiLCJwYXJlbnRQdHIiLCJzcGxpY2UiLCJwYXJlbnQiLCJwYXJlbnRSZWwiLCJfYWRkUGFyZW50IiwiTHN0Iiwic2V0RWxlbWVudCIsIlNwaW5hbFJlbGF0aW9uRmFjdG9yeSIsImdldE5ld1JlbGF0aW9uIiwic3BpbmFsQ29yZSIsInJlZ2lzdGVyX21vZGVscyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQXlCQTs7QUFFQTs7QUFJQTs7QUFJQTs7QUFDQTs7QUFHQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUF6Q0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLE1BQU1BLFVBQVUsR0FBRyxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDQyxNQUFoQyxHQUF5Q0QsTUFBNUQ7O0FBcUJBLE1BQU1FLGlCQUFpQixHQUFHLE1BQU0sSUFBaEM7O0FBRUEsTUFBTUMsVUFBTixTQUF5QkosVUFBVSxDQUFDSyxLQUFwQyxDQUEwQztBQUN4Qzs7Ozs7O0FBTUFDLEVBQUFBLFdBQVcsQ0FBQ0MsSUFBSSxHQUFHLFdBQVIsRUFBcUJDLElBQUksR0FBRyxZQUE1QixFQUEwQ0MsT0FBMUMsRUFBbUQ7QUFDNUQ7QUFFQSxTQUFLQyxRQUFMLENBQWM7QUFDWkMsTUFBQUEsSUFBSSxFQUFFO0FBQ0pDLFFBQUFBLEVBQUUsRUFBRSxxQkFBSyxLQUFLTixXQUFMLENBQWlCQyxJQUF0QixDQURBO0FBRUpBLFFBQUFBLElBQUksRUFBRUEsSUFGRjtBQUdKQyxRQUFBQSxJQUFJLEVBQUVBO0FBSEYsT0FETTtBQU1aSyxNQUFBQSxPQUFPLEVBQUUsSUFBSUMsa0JBQUosRUFORztBQU9aQyxNQUFBQSxRQUFRLEVBQUUsSUFBSUQsa0JBQUosRUFQRTtBQVFaTCxNQUFBQSxPQUFPLEVBQUVBLE9BQU8sS0FBS08sU0FBWixHQUF3QixJQUFJQywwQkFBSixDQUFzQlIsT0FBdEIsQ0FBeEIsR0FBeURPLFNBUnREO0FBU1pFLE1BQUFBLFVBQVUsRUFBRSxJQUFJQyxrQkFBSjtBQVRBLEtBQWQ7QUFXRDtBQUVEOzs7Ozs7QUFJQUMsRUFBQUEsS0FBSyxHQUFHO0FBQ04sV0FBTyxLQUFLVCxJQUFMLENBQVVDLEVBQWpCO0FBQ0Q7QUFFRDs7Ozs7O0FBSUFTLEVBQUFBLE9BQU8sR0FBRztBQUNSLFdBQU8sS0FBS1YsSUFBTCxDQUFVSixJQUFqQjtBQUNEO0FBRUQ7Ozs7OztBQUlBZSxFQUFBQSxPQUFPLEdBQUc7QUFDUixXQUFPLEtBQUtYLElBQUwsQ0FBVUgsSUFBakI7QUFDRDtBQUVEOzs7Ozs7QUFJQWUsRUFBQUEsVUFBVSxHQUFHO0FBQ1gsUUFBSSxLQUFLZCxPQUFMLEtBQWlCTyxTQUFyQixFQUFnQztBQUM5QixXQUFLUCxPQUFMLEdBQWUsSUFBSVEsMEJBQUosQ0FBc0IsSUFBSWpCLFVBQVUsQ0FBQ0ssS0FBZixFQUF0QixDQUFmO0FBQ0Q7O0FBRUQsV0FBTyxLQUFLSSxPQUFMLENBQWFlLElBQWIsRUFBUDtBQUNEO0FBRUQ7Ozs7OztBQUlBQyxFQUFBQSxjQUFjLEdBQUc7QUFDZixVQUFNQyxlQUFlLEdBQUcsRUFBeEI7QUFEZTtBQUFBO0FBQUE7O0FBQUE7QUFHZiwyQkFBd0IsS0FBS1gsUUFBN0IsOEhBQXVDO0FBQUEsWUFBOUJZLFdBQThCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQ3JDLGdDQUFxQkEsV0FBckIsbUlBQWtDO0FBQUEsZ0JBQXpCQyxRQUF5QjtBQUNoQyxnQkFBSUMsY0FBYyxHQUFHRCxRQUFRLENBQUNILGNBQVQsRUFBckI7O0FBRUEsaUJBQUssSUFBSUssQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0QsY0FBYyxDQUFDRSxNQUFuQyxFQUEyQ0QsQ0FBQyxFQUE1QyxFQUFnRDtBQUM5Q0osY0FBQUEsZUFBZSxDQUFDTSxJQUFoQixDQUFxQkgsY0FBYyxDQUFDQyxDQUFELENBQW5DO0FBQ0Q7QUFDRjtBQVBvQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBUXRDO0FBWGM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFZZixXQUFPSixlQUFQO0FBQ0Q7QUFFRDs7Ozs7O0FBSUFPLEVBQUFBLGFBQWEsR0FBRztBQUNkLFFBQUlDLFdBQVcsR0FBRyxLQUFLVCxjQUFMLEVBQWxCO0FBRUEsV0FBT1MsV0FBVyxDQUFDSCxNQUFuQjtBQUNEO0FBRUQ7Ozs7Ozs7QUFLQUksRUFBQUEsWUFBWSxDQUFDdkIsRUFBRCxFQUFLO0FBQ2YsUUFBSSxPQUFPQSxFQUFQLEtBQWMsUUFBbEIsRUFBNEI7QUFDMUIsWUFBTXdCLFNBQVMsQ0FBQyxxQkFBRCxDQUFmO0FBQ0Q7O0FBRUQsUUFBSSxDQUFDLEtBQUtsQixVQUFMLENBQWdCbUIsR0FBaEIsQ0FBb0J6QixFQUFwQixDQUFMLEVBQThCO0FBQzVCLFdBQUtNLFVBQUwsQ0FBZ0JvQixHQUFoQixDQUFvQjFCLEVBQXBCO0FBQ0Q7QUFDRjtBQUVEOzs7Ozs7QUFJQTJCLEVBQUFBLGFBQWEsR0FBRztBQUNkLFdBQU8sS0FBS3JCLFVBQUwsQ0FBZ0JzQixNQUFoQixFQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7QUFNQUMsRUFBQUEsZ0JBQWdCLENBQUNDLE9BQUQsRUFBVTtBQUN4QixRQUFJLEVBQUVBLE9BQU8sWUFBWUMsb0JBQXJCLENBQUosRUFBeUM7QUFDdkMsWUFBTVAsU0FBUyxDQUFDLGlDQUFELENBQWY7QUFDRDs7QUFFRCxXQUFPLEtBQUtsQixVQUFMLENBQWdCbUIsR0FBaEIsQ0FBb0JLLE9BQU8sQ0FBQ3RCLEtBQVIsR0FBZ0J3QixHQUFoQixFQUFwQixDQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7OztBQVFBQyxFQUFBQSxXQUFXLENBQUNDLFlBQUQsRUFBZUMsWUFBZixFQUE2QjtBQUN0QyxRQUFJLE9BQU9ELFlBQVAsS0FBd0IsUUFBNUIsRUFBc0M7QUFDcEMsWUFBTVYsU0FBUyxDQUFDLG9DQUFELENBQWY7QUFDRDs7QUFFRCxRQUFJLENBQUNZLDJDQUFtQkMsUUFBbkIsQ0FBNEJGLFlBQTVCLENBQUwsRUFBZ0Q7QUFDOUMsWUFBTUcsS0FBSyxDQUFDLHVCQUFELENBQVg7QUFDRDs7QUFFRCxVQUFNQyxPQUFPLEdBQUcsS0FBS0MsZ0JBQUwsQ0FBc0JMLFlBQXRCLENBQWhCOztBQUVBLFFBQUksT0FBT0ksT0FBUCxLQUFtQixXQUF2QixFQUFvQztBQUNsQyxhQUFPLEtBQVA7QUFDRDs7QUFFRCxXQUFPQSxPQUFPLENBQUNkLEdBQVIsQ0FBWVMsWUFBWixDQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7Ozs7QUFTQU8sRUFBQUEsWUFBWSxDQUFDQyxhQUFELEVBQWdCUCxZQUFoQixFQUE4QjtBQUN4QyxRQUFJLENBQUNRLEtBQUssQ0FBQ0MsT0FBTixDQUFjRixhQUFkLENBQUwsRUFBbUM7QUFDakMsWUFBTWxCLFNBQVMsQ0FBQyx3Q0FBRCxDQUFmO0FBQ0Q7O0FBRUQsUUFBSSxDQUFDWSwyQ0FBbUJDLFFBQW5CLENBQTRCRixZQUE1QixDQUFMLEVBQWdEO0FBQzlDLFlBQU1HLEtBQUssQ0FBQyx1QkFBRCxDQUFYO0FBQ0Q7O0FBUHVDO0FBQUE7QUFBQTs7QUFBQTtBQVN4Qyw0QkFBeUJJLGFBQXpCLG1JQUF3QztBQUFBLFlBQS9CUixZQUErQjs7QUFDdEMsWUFBSSxDQUFDLEtBQUtELFdBQUwsQ0FBaUJDLFlBQWpCLEVBQStCQyxZQUEvQixDQUFMLEVBQW1EO0FBQ2pELGlCQUFPLEtBQVA7QUFDRDtBQUNGO0FBYnVDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBZXhDLFdBQU8sSUFBUDtBQUNEO0FBRUQ7Ozs7OztBQUlBVSxFQUFBQSxnQkFBZ0IsR0FBRztBQUNqQixVQUFNQyxLQUFLLEdBQUcsRUFBZDtBQURpQjtBQUFBO0FBQUE7O0FBQUE7QUFHakIsNEJBQXdCLEtBQUszQyxRQUE3QixtSUFBdUM7QUFBQSxZQUE5QlksV0FBOEI7QUFDckMrQixRQUFBQSxLQUFLLENBQUMxQixJQUFOLENBQVcsR0FBR0wsV0FBVyxDQUFDZ0MsSUFBWixFQUFkO0FBQ0QsT0FMZ0IsQ0FPakI7O0FBUGlCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBUWpCLFdBQU9KLEtBQUssQ0FBQ0ssSUFBTixDQUFXLElBQUlDLEdBQUosQ0FBUUgsS0FBUixDQUFYLENBQVA7QUFDRDtBQUVEOzs7Ozs7Ozs7Ozs7QUFVTUksRUFBQUEsUUFBTixDQUFlQyxLQUFmLEVBQXNCakIsWUFBdEIsRUFBb0NDLFlBQXBDLEVBQWtEO0FBQUE7O0FBQUE7QUFDaEQsVUFBSW5CLFFBQUo7O0FBRUEsVUFBSSxFQUFFbUMsS0FBSyxZQUFZL0QsVUFBVSxDQUFDSyxLQUE5QixDQUFKLEVBQTBDO0FBQ3hDLGNBQU0rQixTQUFTLENBQ2IscUVBRGEsQ0FBZjtBQUdELE9BSkQsTUFJTyxJQUFJLEVBQUUyQixLQUFLLFlBQVkzRCxVQUFuQixDQUFKLEVBQW9DO0FBQ3pDMkQsUUFBQUEsS0FBSyxHQUFHLElBQUkzRCxVQUFKLENBQWVZLFNBQWYsRUFBMEJBLFNBQTFCLEVBQXFDK0MsS0FBckMsQ0FBUjtBQUNEOztBQUVELFVBQUksQ0FBQyxLQUFJLENBQUNsQixXQUFMLENBQWlCQyxZQUFqQixFQUErQkMsWUFBL0IsQ0FBTCxFQUFtRDtBQUNqRG5CLFFBQUFBLFFBQVEsR0FBRyxLQUFJLENBQUNvQyxlQUFMLENBQXFCbEIsWUFBckIsRUFBbUNDLFlBQW5DLENBQVg7QUFDRCxPQUZELE1BRU87QUFDTG5CLFFBQUFBLFFBQVEsR0FBRyxLQUFJLENBQUNxQyxZQUFMLENBQWtCbkIsWUFBbEIsRUFBZ0NDLFlBQWhDLENBQVg7QUFDRDs7QUFFRCxZQUFNbkIsUUFBUSxDQUFDa0MsUUFBVCxDQUFrQkMsS0FBbEIsQ0FBTjtBQUNBLGFBQU9BLEtBQVA7QUFsQmdEO0FBbUJqRDtBQUVEOzs7Ozs7Ozs7Ozs7OztBQVlNRyxFQUFBQSxpQkFBTixDQUF3QkgsS0FBeEIsRUFBK0JqQixZQUEvQixFQUE2Q0MsWUFBN0MsRUFBMkRMLE9BQTNELEVBQW9FO0FBQUE7O0FBQUE7QUFDbEUsVUFBSWQsUUFBSjs7QUFFQSxVQUFJLEVBQUVjLE9BQU8sWUFBWUMsb0JBQXJCLENBQUosRUFBeUM7QUFDdkMsY0FBTVAsU0FBUyxDQUFDLGdDQUFELENBQWY7QUFDRDs7QUFFRCxVQUFJLEVBQUUyQixLQUFLLFlBQVkvRCxVQUFVLENBQUNLLEtBQTlCLENBQUosRUFBMEM7QUFDeEMsY0FBTStCLFNBQVMsQ0FDYixxRUFEYSxDQUFmO0FBR0QsT0FKRCxNQUlPLElBQUksRUFBRTJCLEtBQUssWUFBWTNELFVBQW5CLENBQUosRUFBb0M7QUFDekMyRCxRQUFBQSxLQUFLLEdBQUcsSUFBSTNELFVBQUosQ0FBZVksU0FBZixFQUEwQkEsU0FBMUIsRUFBcUMrQyxLQUFyQyxDQUFSO0FBQ0Q7O0FBRUQsVUFBSSxDQUFDLE1BQUksQ0FBQ2xCLFdBQUwsQ0FBaUJDLFlBQWpCLEVBQStCQyxZQUEvQixDQUFMLEVBQW1EO0FBQ2pEbkIsUUFBQUEsUUFBUSxHQUFHLE1BQUksQ0FBQ29DLGVBQUwsQ0FBcUJsQixZQUFyQixFQUFtQ0MsWUFBbkMsQ0FBWDtBQUNELE9BRkQsTUFFTztBQUNMbkIsUUFBQUEsUUFBUSxHQUFHLE1BQUksQ0FBQ3FDLFlBQUwsQ0FBa0JuQixZQUFsQixFQUFnQ0MsWUFBaEMsQ0FBWDtBQUNEOztBQUVEZ0IsTUFBQUEsS0FBSyxDQUFDNUIsWUFBTixDQUFtQk8sT0FBTyxDQUFDdEIsS0FBUixHQUFnQndCLEdBQWhCLEVBQW5CO0FBQ0FoQixNQUFBQSxRQUFRLENBQUNPLFlBQVQsQ0FBc0JPLE9BQU8sQ0FBQ3RCLEtBQVIsR0FBZ0J3QixHQUFoQixFQUF0QjtBQUVBLFlBQU1oQixRQUFRLENBQUNrQyxRQUFULENBQWtCQyxLQUFsQixDQUFOO0FBQ0EsYUFBT0EsS0FBUDtBQXpCa0U7QUEwQm5FO0FBRUQ7Ozs7Ozs7Ozs7Ozs7QUFXQUksRUFBQUEsV0FBVyxDQUFDQyxJQUFELEVBQU90QixZQUFQLEVBQXFCQyxZQUFyQixFQUFtQztBQUM1QyxRQUFJLENBQUMsS0FBS0YsV0FBTCxDQUFpQkMsWUFBakIsRUFBK0JDLFlBQS9CLENBQUwsRUFBbUQ7QUFDakQsWUFBTUcsS0FBSyxDQUFDLDRCQUFELENBQVg7QUFDRDs7QUFFRCxVQUFNbUIsR0FBRyxHQUFHLEtBQUtKLFlBQUwsQ0FBa0JuQixZQUFsQixFQUFnQ0MsWUFBaEMsQ0FBWjs7QUFDQSxXQUFPc0IsR0FBRyxDQUFDRixXQUFKLENBQWdCQyxJQUFoQixDQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7O0FBT01FLEVBQUFBLGNBQU4sQ0FBcUJoQixhQUFyQixFQUFvQztBQUFBOztBQUFBO0FBQ2xDLFVBQUlDLEtBQUssQ0FBQ0MsT0FBTixDQUFjRixhQUFkLENBQUosRUFBa0M7QUFDaEMsWUFBSUEsYUFBYSxDQUFDdkIsTUFBZCxLQUF5QixDQUE3QixFQUFnQztBQUM5QnVCLFVBQUFBLGFBQWEsR0FBRyxNQUFJLENBQUNHLGdCQUFMLEVBQWhCO0FBQ0Q7QUFDRixPQUpELE1BSU8sSUFBSUgsYUFBYSxLQUFLdEMsU0FBdEIsRUFBaUM7QUFDdENzQyxRQUFBQSxhQUFhLEdBQUcsTUFBSSxDQUFDRyxnQkFBTCxFQUFoQjtBQUNELE9BRk0sTUFFQSxJQUFJLE9BQU9ILGFBQVAsS0FBeUIsUUFBN0IsRUFBdUM7QUFDNUNBLFFBQUFBLGFBQWEsR0FBRyxDQUFDQSxhQUFELENBQWhCO0FBQ0QsT0FGTSxNQUVBO0FBQ0wsY0FBTWxCLFNBQVMsQ0FBQyxxREFBRCxDQUFmO0FBQ0Q7O0FBRUQsWUFBTW1DLFFBQVEsR0FBRyxFQUFqQjtBQWJrQztBQUFBO0FBQUE7O0FBQUE7QUFlbEMsOEJBQXdCLE1BQUksQ0FBQ3hELFFBQTdCLG1JQUF1QztBQUFBLGNBQTlCWSxXQUE4QjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUNyQyxrQ0FBeUIyQixhQUF6QixtSUFBd0M7QUFBQSxrQkFBL0JSLFlBQStCOztBQUN0QyxrQkFBSW5CLFdBQVcsQ0FBQ1UsR0FBWixDQUFnQlMsWUFBaEIsQ0FBSixFQUFtQztBQUNqQyxzQkFBTWxCLFFBQVEsR0FBR0QsV0FBVyxDQUFDSixVQUFaLENBQXVCdUIsWUFBdkIsQ0FBakI7QUFDQXlCLGdCQUFBQSxRQUFRLENBQUN2QyxJQUFULENBQWNKLFFBQVEsQ0FBQzBDLGNBQVQsRUFBZDtBQUNEO0FBQ0Y7QUFOb0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU90QztBQXRCaUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUF3QmxDLFlBQU1FLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRixRQUFaLENBQU47QUF4QmtDO0FBeUJuQztBQUVEOzs7Ozs7OztBQU1NRyxFQUFBQSxlQUFOLEdBQXdCO0FBQUE7O0FBQUE7QUFDdEIsWUFBTUYsT0FBTyxDQUFDQyxHQUFSLENBQVksQ0FDaEIsTUFBSSxDQUFDRSxrQkFBTCxFQURnQixFQUVoQixNQUFJLENBQUNDLG1CQUFMLEVBRmdCLENBQVosQ0FBTjtBQURzQjtBQUt2QjtBQUVEOzs7Ozs7Ozs7QUFPTUMsRUFBQUEsV0FBTixDQUFrQnZCLGFBQWxCLEVBQWlDO0FBQUE7O0FBQUE7QUFDL0IsVUFBSUMsS0FBSyxDQUFDQyxPQUFOLENBQWNGLGFBQWQsQ0FBSixFQUFrQztBQUNoQyxZQUFJQSxhQUFhLENBQUN2QixNQUFkLEtBQXlCLENBQTdCLEVBQWdDO0FBQzlCdUIsVUFBQUEsYUFBYSxHQUFHLE1BQUksQ0FBQ0csZ0JBQUwsRUFBaEI7QUFDRDtBQUNGLE9BSkQsTUFJTyxJQUFJSCxhQUFhLEtBQUt0QyxTQUF0QixFQUFpQztBQUN0Q3NDLFFBQUFBLGFBQWEsR0FBRyxNQUFJLENBQUNHLGdCQUFMLEVBQWhCO0FBQ0QsT0FGTSxNQUVBLElBQUksT0FBT0gsYUFBUCxLQUF5QixRQUE3QixFQUF1QztBQUM1Q0EsUUFBQUEsYUFBYSxHQUFHLENBQUNBLGFBQUQsQ0FBaEI7QUFDRCxPQUZNLE1BRUE7QUFDTCxjQUFNbEIsU0FBUyxDQUFDLHFEQUFELENBQWY7QUFDRDs7QUFFRCxZQUFNbUMsUUFBUSxHQUFHLEVBQWpCO0FBYitCO0FBQUE7QUFBQTs7QUFBQTtBQWUvQiw4QkFBd0IsTUFBSSxDQUFDeEQsUUFBN0IsbUlBQXVDO0FBQUEsY0FBOUJZLFdBQThCOztBQUNyQyxlQUFLLElBQUltRCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHeEIsYUFBYSxDQUFDdkIsTUFBbEMsRUFBMEMrQyxDQUFDLEVBQTNDLEVBQStDO0FBQzdDLGdCQUFJbkQsV0FBVyxDQUFDVSxHQUFaLENBQWdCaUIsYUFBYSxDQUFDd0IsQ0FBRCxDQUE3QixDQUFKLEVBQXVDO0FBQ3JDLG9CQUFNbEQsUUFBUSxHQUFHRCxXQUFXLENBQUNKLFVBQVosQ0FBdUIrQixhQUFhLENBQUN3QixDQUFELENBQXBDLENBQWpCO0FBQ0FQLGNBQUFBLFFBQVEsQ0FBQ3ZDLElBQVQsQ0FBY0osUUFBUSxDQUFDaUQsV0FBVCxFQUFkO0FBQ0Q7QUFDRjtBQUNGO0FBdEI4QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQXdCL0IsWUFBTUUsV0FBVyxTQUFTUCxPQUFPLENBQUNDLEdBQVIsQ0FBWUYsUUFBWixDQUExQjtBQUNBLFVBQUlTLEdBQUcsR0FBRyxFQUFWO0FBekIrQjtBQUFBO0FBQUE7O0FBQUE7QUEyQi9CLDhCQUFxQkQsV0FBckIsbUlBQWtDO0FBQUEsY0FBekJoRSxRQUF5Qjs7QUFDaEMsZUFBSyxJQUFJZSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHZixRQUFRLENBQUNnQixNQUE3QixFQUFxQ0QsQ0FBQyxFQUF0QyxFQUEwQztBQUN4Q2tELFlBQUFBLEdBQUcsQ0FBQ2hELElBQUosQ0FBU2pCLFFBQVEsQ0FBQ2UsQ0FBRCxDQUFqQjtBQUNEO0FBQ0Y7QUEvQjhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBaUMvQixhQUFPa0QsR0FBUDtBQWpDK0I7QUFrQ2hDO0FBRUQ7Ozs7Ozs7O0FBTU1DLEVBQUFBLG9CQUFOLENBQTJCdkMsT0FBM0IsRUFBb0M7QUFBQTs7QUFBQTtBQUNsQyxVQUFJLEVBQUVBLE9BQU8sWUFBWUMsb0JBQXJCLENBQUosRUFBeUM7QUFDdkMsY0FBTVAsU0FBUyxDQUFDLGlDQUFELENBQWY7QUFDRDs7QUFFRCxZQUFNbUMsUUFBUSxHQUFHLEVBQWpCO0FBTGtDO0FBQUE7QUFBQTs7QUFBQTtBQU9sQyw4QkFBd0IsTUFBSSxDQUFDeEQsUUFBN0IsbUlBQXVDO0FBQUEsY0FBOUJZLFdBQThCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQ3JDLG1DQUFxQkEsV0FBckIsd0lBQWtDO0FBQUEsa0JBQXpCQyxRQUF5Qjs7QUFDaEMsa0JBQUlBLFFBQVEsQ0FBQ2EsZ0JBQVQsQ0FBMEJDLE9BQTFCLENBQUosRUFBd0M7QUFDdEM2QixnQkFBQUEsUUFBUSxDQUFDdkMsSUFBVCxDQUFjSixRQUFRLENBQUNxRCxvQkFBVCxDQUE4QnZDLE9BQTlCLENBQWQ7QUFDRDtBQUNGO0FBTG9DO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNdEM7QUFiaUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFlbEMsWUFBTXFDLFdBQVcsU0FBU1AsT0FBTyxDQUFDQyxHQUFSLENBQVlGLFFBQVosQ0FBMUI7QUFDQSxVQUFJUyxHQUFHLEdBQUcsRUFBVjtBQWhCa0M7QUFBQTtBQUFBOztBQUFBO0FBa0JsQywrQkFBcUJELFdBQXJCLHdJQUFrQztBQUFBLGNBQXpCaEUsUUFBeUI7O0FBQ2hDLGVBQUssSUFBSWUsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR2YsUUFBUSxDQUFDZ0IsTUFBN0IsRUFBcUNELENBQUMsRUFBdEMsRUFBMEM7QUFDeENrRCxZQUFBQSxHQUFHLENBQUNoRCxJQUFKLENBQVNqQixRQUFRLENBQUNlLENBQUQsQ0FBakI7QUFDRDtBQUNGO0FBdEJpQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQXdCbEMsYUFBT2tELEdBQVA7QUF4QmtDO0FBeUJuQztBQUVEOzs7Ozs7Ozs7QUFPQUUsRUFBQUEsVUFBVSxDQUFDNUIsYUFBRCxFQUFnQjtBQUN4QixRQUFJQyxLQUFLLENBQUNDLE9BQU4sQ0FBY0YsYUFBZCxDQUFKLEVBQWtDO0FBQ2hDLFVBQUlBLGFBQWEsQ0FBQ3ZCLE1BQWQsS0FBeUIsQ0FBN0IsRUFBZ0M7QUFDOUJ1QixRQUFBQSxhQUFhLEdBQUcsS0FBS3pDLE9BQUwsQ0FBYThDLElBQWIsRUFBaEI7QUFDRDtBQUNGLEtBSkQsTUFJTyxJQUFJTCxhQUFhLEtBQUt0QyxTQUF0QixFQUFpQztBQUN0Q3NDLE1BQUFBLGFBQWEsR0FBRyxLQUFLekMsT0FBTCxDQUFhOEMsSUFBYixFQUFoQjtBQUNELEtBRk0sTUFFQSxJQUFJLE9BQU9MLGFBQVAsS0FBeUIsUUFBN0IsRUFBdUM7QUFDNUNBLE1BQUFBLGFBQWEsR0FBRyxDQUFDQSxhQUFELENBQWhCO0FBQ0QsS0FGTSxNQUVBO0FBQ0wsWUFBTWxCLFNBQVMsQ0FBQyxxREFBRCxDQUFmO0FBQ0Q7O0FBRUQsVUFBTW1DLFFBQVEsR0FBRyxFQUFqQjtBQWJ3QjtBQUFBO0FBQUE7O0FBQUE7QUFleEIsNkJBQWlCakIsYUFBakIsd0lBQWdDO0FBQUEsWUFBdkIvQyxJQUF1QjtBQUM5QixjQUFNNEUsSUFBSSxHQUFHLEtBQUt0RSxPQUFMLENBQWFVLFVBQWIsQ0FBd0JoQixJQUF4QixDQUFiOztBQUVBLGFBQUssSUFBSXVCLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdxRCxJQUFJLENBQUNwRCxNQUF6QixFQUFpQ0QsQ0FBQyxFQUFsQyxFQUFzQztBQUNwQ3lDLFVBQUFBLFFBQVEsQ0FBQ3ZDLElBQVQsQ0FDRW1ELElBQUksQ0FBQ3JELENBQUQsQ0FBSixDQUFRTixJQUFSLEdBQWU0RCxJQUFmLENBQW9CeEQsUUFBUSxJQUFJO0FBQzlCLG1CQUFPQSxRQUFRLENBQUN5RCxTQUFULEVBQVA7QUFDRCxXQUZELENBREY7QUFLRDtBQUNGO0FBekJ1QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQTJCeEIsV0FBT2IsT0FBTyxDQUFDQyxHQUFSLENBQVlGLFFBQVosQ0FBUDtBQUNEO0FBRUQ7Ozs7Ozs7O0FBTU1lLEVBQUFBLElBQU4sQ0FBV2hDLGFBQVgsRUFBMEJpQyxTQUFTLEdBQUdwRixpQkFBdEMsRUFBeUQ7QUFBQTs7QUFBQTtBQUN2RCxVQUFJLE9BQU9vRixTQUFQLEtBQXFCLFVBQXpCLEVBQXFDO0FBQ25DLGNBQU0sSUFBSXJDLEtBQUosQ0FBVSw4QkFBVixDQUFOO0FBQ0Q7O0FBRUQsVUFBSXNDLElBQUksR0FBRyxJQUFJM0IsR0FBSixDQUFRLENBQUMsTUFBRCxDQUFSLENBQVg7QUFDQSxVQUFJVSxRQUFRLEdBQUcsRUFBZjtBQUNBLFVBQUlrQixPQUFPLEdBQUcsQ0FBQyxNQUFELENBQWQ7QUFDQSxVQUFJQyxVQUFVLEdBQUcsRUFBakI7QUFDQSxVQUFJQyxLQUFLLEdBQUcsRUFBWjs7QUFFQSxhQUFPRixPQUFPLENBQUMxRCxNQUFmLEVBQXVCO0FBQ3JCMkQsUUFBQUEsVUFBVSxHQUFHRCxPQUFiO0FBQ0FsQixRQUFBQSxRQUFRLEdBQUcsRUFBWDtBQUNBa0IsUUFBQUEsT0FBTyxHQUFHLEVBQVY7O0FBRUEsOEJBQWlCQyxVQUFqQixlQUE2QjtBQUF4QixjQUFJdEIsSUFBSSxHQUFJc0IsVUFBSixJQUFSO0FBQ0huQixVQUFBQSxRQUFRLENBQUN2QyxJQUFULENBQWNvQyxJQUFJLENBQUNTLFdBQUwsQ0FBaUJ2QixhQUFqQixDQUFkOztBQUVBLGNBQUlpQyxTQUFTLENBQUNuQixJQUFELENBQWIsRUFBcUI7QUFDbkJ1QixZQUFBQSxLQUFLLENBQUMzRCxJQUFOLENBQVdvQyxJQUFYO0FBQ0Q7QUFDRjs7QUFFRCxZQUFJd0IsY0FBYyxTQUFTcEIsT0FBTyxDQUFDQyxHQUFSLENBQVlGLFFBQVosQ0FBM0I7QUFicUI7QUFBQTtBQUFBOztBQUFBO0FBZXJCLGlDQUFxQnFCLGNBQXJCLHdJQUFxQztBQUFBLGdCQUE1QjdFLFFBQTRCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQ25DLHFDQUFrQkEsUUFBbEIsd0lBQTRCO0FBQUEsb0JBQW5CZ0QsS0FBbUI7O0FBQzFCLG9CQUFJLENBQUN5QixJQUFJLENBQUNuRCxHQUFMLENBQVMwQixLQUFULENBQUwsRUFBc0I7QUFDcEIwQixrQkFBQUEsT0FBTyxDQUFDekQsSUFBUixDQUFhK0IsS0FBYjtBQUNBeUIsa0JBQUFBLElBQUksQ0FBQ2xELEdBQUwsQ0FBU3lCLEtBQVQ7QUFDRDtBQUNGO0FBTmtDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPcEM7QUF0Qm9CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUF1QnRCOztBQUVELGFBQU80QixLQUFQO0FBcEN1RDtBQXFDeEQ7QUFFRDs7Ozs7Ozs7QUFNTUUsRUFBQUEsYUFBTixDQUFvQm5ELE9BQXBCLEVBQTZCNkMsU0FBUyxHQUFHcEYsaUJBQXpDLEVBQTREO0FBQUE7O0FBQUE7QUFDMUQsVUFBSSxPQUFPb0YsU0FBUCxLQUFxQixVQUF6QixFQUFxQztBQUNuQyxjQUFNLElBQUlyQyxLQUFKLENBQVUsMkNBQVYsQ0FBTjtBQUNEOztBQUVELFVBQUlzQyxJQUFJLEdBQUcsSUFBSTNCLEdBQUosQ0FBUSxDQUFDLE1BQUQsQ0FBUixDQUFYO0FBQ0EsVUFBSVUsUUFBUSxHQUFHLEVBQWY7QUFDQSxVQUFJa0IsT0FBTyxHQUFHLENBQUMsTUFBRCxDQUFkO0FBQ0EsVUFBSUMsVUFBVSxHQUFHLEVBQWpCO0FBQ0EsVUFBSUMsS0FBSyxHQUFHLEVBQVo7O0FBRUEsYUFBT0YsT0FBTyxDQUFDMUQsTUFBZixFQUF1QjtBQUNyQjJELFFBQUFBLFVBQVUsR0FBR0QsT0FBYjtBQUNBbEIsUUFBQUEsUUFBUSxHQUFHLEVBQVg7QUFDQWtCLFFBQUFBLE9BQU8sR0FBRyxFQUFWOztBQUVBLGdDQUFpQkMsVUFBakIsZ0JBQTZCO0FBQXhCLGNBQUl0QixJQUFJLEdBQUlzQixVQUFKLEtBQVI7QUFDSG5CLFVBQUFBLFFBQVEsQ0FBQ3ZDLElBQVQsQ0FBY29DLElBQUksQ0FBQ2Esb0JBQUwsQ0FBMEJ2QyxPQUExQixDQUFkOztBQUVBLGNBQUk2QyxTQUFTLENBQUNuQixJQUFELENBQWIsRUFBcUI7QUFDbkJ1QixZQUFBQSxLQUFLLENBQUMzRCxJQUFOLENBQVdvQyxJQUFYO0FBQ0Q7QUFDRjs7QUFFRCxZQUFJd0IsY0FBYyxTQUFTcEIsT0FBTyxDQUFDQyxHQUFSLENBQVlGLFFBQVosQ0FBM0I7QUFicUI7QUFBQTtBQUFBOztBQUFBO0FBZXJCLGlDQUFxQnFCLGNBQXJCLHdJQUFxQztBQUFBLGdCQUE1QjdFLFFBQTRCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQ25DLHFDQUFrQkEsUUFBbEIsd0lBQTRCO0FBQUEsb0JBQW5CZ0QsS0FBbUI7O0FBQzFCLG9CQUFJLENBQUN5QixJQUFJLENBQUNuRCxHQUFMLENBQVMwQixLQUFULENBQUwsRUFBc0I7QUFDcEIwQixrQkFBQUEsT0FBTyxDQUFDekQsSUFBUixDQUFhK0IsS0FBYjtBQUNBeUIsa0JBQUFBLElBQUksQ0FBQ2xELEdBQUwsQ0FBU3lCLEtBQVQ7QUFDRDtBQUNGO0FBTmtDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPcEM7QUF0Qm9CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUF1QnRCOztBQUVELGFBQU80QixLQUFQO0FBcEMwRDtBQXFDM0Q7QUFFRDs7Ozs7OztBQUtNRyxFQUFBQSxPQUFOLENBQWN4QyxhQUFkLEVBQTZCeUMsUUFBN0IsRUFBdUM7QUFBQTs7QUFBQTtBQUNyQyxVQUFJLE9BQU9BLFFBQVAsS0FBb0IsV0FBeEIsRUFBcUM7QUFDbkMsY0FBTTdDLEtBQUssQ0FBQyxtQ0FBRCxDQUFYO0FBQ0QsT0FGRCxNQUVPLElBQUksT0FBTzZDLFFBQVAsS0FBb0IsVUFBeEIsRUFBb0M7QUFDekMsY0FBTSxJQUFJN0MsS0FBSixDQUFVLDBDQUFWLENBQU47QUFDRDs7QUFFRCxVQUFJOEMsS0FBSyxTQUFTLE1BQUksQ0FBQ1YsSUFBTCxDQUFVaEMsYUFBVixDQUFsQjtBQVBxQztBQUFBO0FBQUE7O0FBQUE7QUFTckMsK0JBQWlCMEMsS0FBakIsd0lBQXdCO0FBQUEsY0FBZjVCLElBQWU7QUFDdEIyQixVQUFBQSxRQUFRLENBQUMzQixJQUFELENBQVI7QUFDRDtBQVhvQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFZdEM7QUFFRDs7Ozs7OztBQUtNNkIsRUFBQUEsZ0JBQU4sQ0FBdUJ2RCxPQUF2QixFQUFnQ3FELFFBQWhDLEVBQTBDO0FBQUE7O0FBQUE7QUFDeEMsVUFBSSxPQUFPQSxRQUFQLEtBQW9CLFdBQXhCLEVBQXFDO0FBQ25DLGNBQU03QyxLQUFLLENBQUMsbUNBQUQsQ0FBWDtBQUNELE9BRkQsTUFFTyxJQUFJLE9BQU82QyxRQUFQLEtBQW9CLFVBQXhCLEVBQW9DO0FBQ3pDLGNBQU0sSUFBSTdDLEtBQUosQ0FBVSwwQ0FBVixDQUFOO0FBQ0Q7O0FBRUQsVUFBSThDLEtBQUssU0FBUyxPQUFJLENBQUNILGFBQUwsQ0FBbUJuRCxPQUFuQixDQUFsQjtBQVB3QztBQUFBO0FBQUE7O0FBQUE7QUFTeEMsK0JBQWlCc0QsS0FBakIsd0lBQXdCO0FBQUEsY0FBZjVCLElBQWU7QUFDdEIyQixVQUFBQSxRQUFRLENBQUMzQixJQUFELENBQVI7QUFDRDtBQVh1QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFZekM7QUFFRDs7Ozs7Ozs7QUFNTThCLEVBQUFBLEdBQU4sQ0FBVTVDLGFBQVYsRUFBeUJ5QyxRQUF6QixFQUFtQztBQUFBOztBQUFBO0FBQ2pDLFVBQUksT0FBT0EsUUFBUCxLQUFvQixXQUF4QixFQUFxQztBQUNuQyxjQUFNN0MsS0FBSyxDQUFDLG1DQUFELENBQVg7QUFDRCxPQUZELE1BRU8sSUFBSSxPQUFPNkMsUUFBUCxLQUFvQixVQUF4QixFQUFvQztBQUN6QyxjQUFNLElBQUk3QyxLQUFKLENBQVUsMENBQVYsQ0FBTjtBQUNEOztBQUVELFVBQUk4QyxLQUFLLFNBQVMsT0FBSSxDQUFDVixJQUFMLENBQVVoQyxhQUFWLENBQWxCO0FBQ0EsVUFBSTZDLE9BQU8sR0FBRyxFQUFkO0FBUmlDO0FBQUE7QUFBQTs7QUFBQTtBQVVqQywrQkFBaUJILEtBQWpCLHdJQUF3QjtBQUFBLGNBQWY1QixJQUFlO0FBQ3RCK0IsVUFBQUEsT0FBTyxDQUFDbkUsSUFBUixDQUFhK0QsUUFBUSxDQUFDM0IsSUFBRCxDQUFyQjtBQUNEO0FBWmdDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBY2pDLGFBQU8rQixPQUFQO0FBZGlDO0FBZWxDO0FBRUQ7Ozs7Ozs7O0FBTU1DLEVBQUFBLFlBQU4sQ0FBbUIxRCxPQUFuQixFQUE0QnFELFFBQTVCLEVBQXNDO0FBQUE7O0FBQUE7QUFDcEMsVUFBSSxPQUFPQSxRQUFQLEtBQW9CLFdBQXhCLEVBQXFDO0FBQ25DLGNBQU03QyxLQUFLLENBQUMsbUNBQUQsQ0FBWDtBQUNELE9BRkQsTUFFTyxJQUFJLE9BQU82QyxRQUFQLEtBQW9CLFVBQXhCLEVBQW9DO0FBQ3pDLGNBQU0sSUFBSTdDLEtBQUosQ0FBVSwwQ0FBVixDQUFOO0FBQ0Q7O0FBRUQsVUFBSThDLEtBQUssU0FBUyxPQUFJLENBQUNILGFBQUwsQ0FBbUJuRCxPQUFuQixDQUFsQjtBQUNBLFVBQUl5RCxPQUFPLEdBQUcsRUFBZDtBQVJvQztBQUFBO0FBQUE7O0FBQUE7QUFVcEMsK0JBQWlCSCxLQUFqQix3SUFBd0I7QUFBQSxjQUFmNUIsSUFBZTtBQUN0QitCLFVBQUFBLE9BQU8sQ0FBQ25FLElBQVIsQ0FBYStELFFBQVEsQ0FBQzNCLElBQUQsQ0FBckI7QUFDRDtBQVptQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQWNwQyxhQUFPK0IsT0FBUDtBQWRvQztBQWVyQztBQUVEOzs7Ozs7OztBQU1BL0MsRUFBQUEsZ0JBQWdCLENBQUNMLFlBQUQsRUFBZTtBQUM3QixXQUFPLEtBQUtoQyxRQUFMLENBQWNRLFVBQWQsQ0FBeUJ3QixZQUF6QixDQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7O0FBT0FrQixFQUFBQSxZQUFZLENBQUNuQixZQUFELEVBQWVDLFlBQWYsRUFBNkI7QUFDdkMsV0FBTyxLQUFLSyxnQkFBTCxDQUFzQkwsWUFBdEIsRUFBb0N4QixVQUFwQyxDQUErQ3VCLFlBQS9DLENBQVA7QUFDRDtBQUVEOzs7Ozs7O0FBS0F1RCxFQUFBQSxhQUFhLENBQUN6RSxRQUFELEVBQVc7QUFDdEIsVUFBTTBFLFNBQVMsR0FBRyxLQUFLekYsT0FBTCxDQUFhVSxVQUFiLENBQXdCSyxRQUFRLENBQUNQLE9BQVQsR0FBbUJ1QixHQUFuQixFQUF4QixDQUFsQjtBQUVBLFVBQU0yRCxhQUFhLEdBQUdELFNBQVMsQ0FBQ0UsT0FBVixDQUNwQkMsU0FBUyxJQUFJQSxTQUFTLENBQUNyRixLQUFWLEdBQWtCd0IsR0FBbEIsT0FBNEJoQixRQUFRLENBQUNSLEtBQVQsR0FBaUJ3QixHQUFqQixFQURyQixDQUF0QjtBQUlBMEQsSUFBQUEsU0FBUyxDQUFDSSxNQUFWLENBQWlCSCxhQUFqQjtBQUNEO0FBRUQ7Ozs7OztBQUlNNUIsRUFBQUEsa0JBQU4sR0FBMkI7QUFBQTs7QUFBQTtBQUN6QixZQUFNSixRQUFRLEdBQUcsRUFBakI7QUFEeUI7QUFBQTtBQUFBOztBQUFBO0FBR3pCLCtCQUFtQixPQUFJLENBQUMxRCxPQUF4Qix3SUFBaUM7QUFBQSxjQUF4QjhGLE1BQXdCOztBQUMvQixlQUFLLElBQUk3RSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHNkUsTUFBTSxDQUFDNUUsTUFBM0IsRUFBbUNELENBQUMsRUFBcEMsRUFBd0M7QUFDdEM2RSxZQUFBQSxNQUFNLENBQUM3RSxDQUFELENBQU4sQ0FBVU4sSUFBVixHQUFpQjRELElBQWpCLENBQXNCd0IsU0FBUyxJQUFJO0FBQ2pDckMsY0FBQUEsUUFBUSxDQUFDdkMsSUFBVCxDQUFjNEUsU0FBUyxDQUFDekMsV0FBVixDQUFzQixPQUF0QixDQUFkO0FBQ0QsYUFGRDtBQUdEO0FBQ0Y7QUFUd0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFVekIsWUFBTUssT0FBTyxDQUFDQyxHQUFSLENBQVlGLFFBQVosQ0FBTjtBQVZ5QjtBQVcxQjtBQUVEOzs7Ozs7O0FBS0FzQyxFQUFBQSxVQUFVLENBQUNqRixRQUFELEVBQVc7QUFDbkIsVUFBTWtCLFlBQVksR0FBR2xCLFFBQVEsQ0FBQ1AsT0FBVCxHQUFtQnVCLEdBQW5CLEVBQXJCOztBQUVBLFFBQUksS0FBSy9CLE9BQUwsQ0FBYXdCLEdBQWIsQ0FBaUJTLFlBQWpCLENBQUosRUFBb0M7QUFDbEMsV0FBS2pDLE9BQUwsQ0FDR1UsVUFESCxDQUNjdUIsWUFEZCxFQUVHZCxJQUZILENBRVEsSUFBSWYsMEJBQUosQ0FBc0JXLFFBQXRCLENBRlI7QUFHRCxLQUpELE1BSU87QUFDTCxZQUFNdUQsSUFBSSxHQUFHLElBQUluRixVQUFVLENBQUM4RyxHQUFmLEVBQWI7QUFDQTNCLE1BQUFBLElBQUksQ0FBQ25ELElBQUwsQ0FBVSxJQUFJZiwwQkFBSixDQUFzQlcsUUFBdEIsQ0FBVjtBQUNBLFdBQUtmLE9BQUwsQ0FBYWtHLFVBQWIsQ0FBd0JqRSxZQUF4QixFQUFzQ3FDLElBQXRDO0FBQ0Q7QUFDRjtBQUVEOzs7Ozs7OztBQU1BbkIsRUFBQUEsZUFBZSxDQUFDbEIsWUFBRCxFQUFlQyxZQUFmLEVBQTZCO0FBQzFDLFVBQU1uQixRQUFRLEdBQUdvRiw2Q0FBc0JDLGNBQXRCLENBQ2YsSUFEZSxFQUVmbkUsWUFGZSxFQUdmQyxZQUhlLENBQWpCOztBQU1BLFFBQUksQ0FBQyxLQUFLaEMsUUFBTCxDQUFjc0IsR0FBZCxDQUFrQlUsWUFBbEIsQ0FBTCxFQUFzQztBQUNwQyxXQUFLaEMsUUFBTCxDQUFjZ0csVUFBZCxDQUF5QmhFLFlBQXpCLEVBQXVDLElBQUlqQyxrQkFBSixFQUF2QztBQUNEOztBQUVELFNBQUtzQyxnQkFBTCxDQUFzQkwsWUFBdEIsRUFBb0NnRSxVQUFwQyxDQUErQ2pFLFlBQS9DLEVBQTZEbEIsUUFBN0Q7O0FBQ0EsV0FBT0EsUUFBUDtBQUNEO0FBRUQ7Ozs7Ozs7QUFLTWdELEVBQUFBLG1CQUFOLEdBQTRCO0FBQUE7O0FBQUE7QUFDMUIsWUFBTUwsUUFBUSxHQUFHLEVBQWpCO0FBRDBCO0FBQUE7QUFBQTs7QUFBQTtBQUcxQiwrQkFBd0IsT0FBSSxDQUFDeEQsUUFBN0Isd0lBQXVDO0FBQUEsY0FBOUJZLFdBQThCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQ3JDLG1DQUFxQkEsV0FBckIsd0lBQWtDO0FBQUEsa0JBQXpCQyxRQUF5QjtBQUNoQzJDLGNBQUFBLFFBQVEsQ0FBQ3ZDLElBQVQsQ0FBY0osUUFBUSxDQUFDOEMsZUFBVCxFQUFkO0FBQ0Q7QUFIb0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUl0QztBQVB5QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVExQixZQUFNRixPQUFPLENBQUNDLEdBQVIsQ0FBWUYsUUFBWixDQUFOO0FBUjBCO0FBUzNCOztBQXJ0QnVDOztBQXd0QjFDMkMsK0JBQVdDLGVBQVgsQ0FBMkIsQ0FBQy9HLFVBQUQsQ0FBM0I7O2VBQ2VBLFUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTggU3BpbmFsQ29tIC0gd3d3LnNwaW5hbGNvbS5jb21cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBTcGluYWxDb3JlLlxuICpcbiAqIFBsZWFzZSByZWFkIGFsbCBvZiB0aGUgZm9sbG93aW5nIHRlcm1zIGFuZCBjb25kaXRpb25zXG4gKiBvZiB0aGUgRnJlZSBTb2Z0d2FyZSBsaWNlbnNlIEFncmVlbWVudCAoXCJBZ3JlZW1lbnRcIilcbiAqIGNhcmVmdWxseS5cbiAqXG4gKiBUaGlzIEFncmVlbWVudCBpcyBhIGxlZ2FsbHkgYmluZGluZyBjb250cmFjdCBiZXR3ZWVuXG4gKiB0aGUgTGljZW5zZWUgKGFzIGRlZmluZWQgYmVsb3cpIGFuZCBTcGluYWxDb20gdGhhdFxuICogc2V0cyBmb3J0aCB0aGUgdGVybXMgYW5kIGNvbmRpdGlvbnMgdGhhdCBnb3Zlcm4geW91clxuICogdXNlIG9mIHRoZSBQcm9ncmFtLiBCeSBpbnN0YWxsaW5nIGFuZC9vciB1c2luZyB0aGVcbiAqIFByb2dyYW0sIHlvdSBhZ3JlZSB0byBhYmlkZSBieSBhbGwgdGhlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucyBzdGF0ZWQgb3IgcmVmZXJlbmNlZCBoZXJlaW4uXG4gKlxuICogSWYgeW91IGRvIG5vdCBhZ3JlZSB0byBhYmlkZSBieSB0aGVzZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMsIGRvIG5vdCBkZW1vbnN0cmF0ZSB5b3VyIGFjY2VwdGFuY2UgYW5kIGRvXG4gKiBub3QgaW5zdGFsbCBvciB1c2UgdGhlIFByb2dyYW0uXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFsb25nXG4gKiB3aXRoIHRoaXMgZmlsZS4gSWYgbm90LCBzZWVcbiAqIDxodHRwOi8vcmVzb3VyY2VzLnNwaW5hbGNvbS5jb20vbGljZW5zZXMucGRmPi5cbiAqL1xuXG5jb25zdCBnbG9iYWxUeXBlID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHdpbmRvdztcbmltcG9ydCBzcGluYWxDb3JlIGZyb20gXCJzcGluYWwtY29yZS1jb25uZWN0b3Jqc1wiO1xuXG5pbXBvcnQge1xuICBndWlkXG59IGZyb20gXCIuLi9VdGlsaXRpZXNcIjtcblxuaW1wb3J0IHtcbiAgU3BpbmFsQ29udGV4dFxufSBmcm9tIFwiLi4vaW5kZXhcIjtcblxuaW1wb3J0IFNwaW5hbE5vZGVQb2ludGVyIGZyb20gXCIuLi9TcGluYWxOb2RlUG9pbnRlclwiO1xuaW1wb3J0IHtcbiAgU3BpbmFsUmVsYXRpb25GYWN0b3J5XG59IGZyb20gXCIuLi9SZWxhdGlvbnMvU3BpbmFsUmVsYXRpb25GYWN0b3J5XCI7XG5pbXBvcnQgU3BpbmFsTWFwIGZyb20gXCIuLi9TcGluYWxNYXBcIjtcbmltcG9ydCBTcGluYWxTZXQgZnJvbSBcIi4uL1NwaW5hbFNldFwiO1xuaW1wb3J0IHtcbiAgUkVMQVRJT05fVFlQRV9MSVNUXG59IGZyb20gXCIuLi8uLi9idWlsZC9SZWxhdGlvbnMvU3BpbmFsUmVsYXRpb25GYWN0b3J5XCI7XG5cbmNvbnN0IERFRkFVTFRfUFJFRElDQVRFID0gKCkgPT4gdHJ1ZTtcblxuY2xhc3MgU3BpbmFsTm9kZSBleHRlbmRzIGdsb2JhbFR5cGUuTW9kZWwge1xuICAvKipcbiAgICogQ29uc3RydWN0b3IgZm9yIHRoZSBTcGluYWxOb2RlIGNsYXNzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBOYW1lIG9mIHRoZSBub2RlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIFR5cGUgb2YgdGhlIG5vZGVcbiAgICogQHBhcmFtIHtTcGluYWxOb2RlIHwgTW9kZWx9IGVsZW1lbnQgRWxlbWVudCBvZiB0aGUgbm9kZVxuICAgKi9cbiAgY29uc3RydWN0b3IobmFtZSA9IFwidW5kZWZpbmVkXCIsIHR5cGUgPSBcIlNwaW5hbE5vZGVcIiwgZWxlbWVudCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmFkZF9hdHRyKHtcbiAgICAgIGluZm86IHtcbiAgICAgICAgaWQ6IGd1aWQodGhpcy5jb25zdHJ1Y3Rvci5uYW1lKSxcbiAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgdHlwZTogdHlwZVxuICAgICAgfSxcbiAgICAgIHBhcmVudHM6IG5ldyBTcGluYWxNYXAoKSxcbiAgICAgIGNoaWxkcmVuOiBuZXcgU3BpbmFsTWFwKCksXG4gICAgICBlbGVtZW50OiBlbGVtZW50ICE9PSB1bmRlZmluZWQgPyBuZXcgU3BpbmFsTm9kZVBvaW50ZXIoZWxlbWVudCkgOiB1bmRlZmluZWQsXG4gICAgICBjb250ZXh0SWRzOiBuZXcgU3BpbmFsU2V0KClcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBpZC5cbiAgICogQHJldHVybnMge1N0cn0gSWQgb2YgdGhlIG5vZGVcbiAgICovXG4gIGdldElkKCkge1xuICAgIHJldHVybiB0aGlzLmluZm8uaWQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbmFtZS5cbiAgICogQHJldHVybnMge1N0cn0gTmFtZSBvZiB0aGUgbm9kZVxuICAgKi9cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbmZvLm5hbWU7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdHlwZS5cbiAgICogQHJldHVybnMge1N0cn0gVHlwZSBvZiB0aGUgbm9kZVxuICAgKi9cbiAgZ2V0VHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbmZvLnR5cGU7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZWxlbWVudC5cbiAgICogQHJldHVybnMge1Byb21pc2U8Kj59IEEgcHJvbWlzZSB3aGVyZSB0aGUgcGFyYW1ldGVyIG9mIHRoZSByZXNvbHZlIG1ldGhvZCBpcyB0aGUgZWxlbWVudFxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuZWxlbWVudCA9IG5ldyBTcGluYWxOb2RlUG9pbnRlcihuZXcgZ2xvYmFsVHlwZS5Nb2RlbCgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5lbGVtZW50LmxvYWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFsbCB0aGUgY2hpbGRyZW4gaWRzIGluIGFuIGFycmF5LlxuICAgKiBAcmV0dXJucyB7QXJyYXk8U3RyaW5nPn0gSWRzIG9mIHRoZSBjaGlsZHJlblxuICAgKi9cbiAgZ2V0Q2hpbGRyZW5JZHMoKSB7XG4gICAgY29uc3Qgbm9kZUNoaWxkcmVuSWRzID0gW107XG5cbiAgICBmb3IgKGxldCByZWxhdGlvbk1hcCBvZiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICBmb3IgKGxldCByZWxhdGlvbiBvZiByZWxhdGlvbk1hcCkge1xuICAgICAgICBsZXQgcmVsQ2hpbGRyZW5JZHMgPSByZWxhdGlvbi5nZXRDaGlsZHJlbklkcygpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVsQ2hpbGRyZW5JZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBub2RlQ2hpbGRyZW5JZHMucHVzaChyZWxDaGlsZHJlbklkc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5vZGVDaGlsZHJlbklkcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wdXRlcyBhbmQgcmV0dXJucyB0aGUgbnVtYmVyIG9mIGNoaWxkcmVuIG9mIHRoZSBub2RlLlxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgbnVtYmVyIG9mIGNoaWxkcmVuXG4gICAqL1xuICBnZXROYkNoaWxkcmVuKCkge1xuICAgIGxldCBjaGlsZHJlbklkcyA9IHRoaXMuZ2V0Q2hpbGRyZW5JZHMoKTtcblxuICAgIHJldHVybiBjaGlsZHJlbklkcy5sZW5ndGg7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhbiBpZCB0byB0aGUgY29udGV4dCBpZHMgb2YgdGhlIG5vZGUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBJZCBvZiB0aGUgY29udGV4dFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSBpZCBpcyBub3QgYSBzdHJpbmdcbiAgICovXG4gIGFkZENvbnRleHRJZChpZCkge1xuICAgIGlmICh0eXBlb2YgaWQgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcImlkIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmNvbnRleHRJZHMuaGFzKGlkKSkge1xuICAgICAgdGhpcy5jb250ZXh0SWRzLmFkZChpZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBsaXN0IG9mIHRoZSBjb250ZXh0cyB0aGUgbm9kZSBpcyBhc3NvY2lhdGVkIHRvLlxuICAgKiBAcmV0dXJucyB7QXJyYXk8U3RyaW5nPn0gQW4gYXJyYXkgb2YgaWRzIG9mIHRoZSBhc3NvY2lhdGVkIGNvbnRleHRzXG4gICAqL1xuICBnZXRDb250ZXh0SWRzKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHRJZHMudmFsdWVzKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBub2RlIGJlbG9uZ3MgdG8gdGhlIGNvbnRleHQuXG4gICAqIEBwYXJhbSB7U3BpbmFsQ29udGV4dH0gY29udGV4dCBUaGUgY29udGV4dCB0aGF0IG1pZ2h0IG93biB0aGUgbm9kZVxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gQSBib29sZWFuXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgY29udGV4dCBpcyBub3QgYSBTcGluYWxDb250ZXh0XG4gICAqL1xuICBiZWxvbmdzVG9Db250ZXh0KGNvbnRleHQpIHtcbiAgICBpZiAoIShjb250ZXh0IGluc3RhbmNlb2YgU3BpbmFsQ29udGV4dCkpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcImNvbnRleHQgbXVzdCBiZSBhIFNwaW5hbENvbnRleHRcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY29udGV4dElkcy5oYXMoY29udGV4dC5nZXRJZCgpLmdldCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWZXJpZnkgaWYgdGhlIG5vZGUgY29udGFpbnMgdGhlIHJlbGF0aW9uIG5hbWUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk5hbWUgTmFtZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uVHlwZSBUeXBlIG9mIHRoZSByZWxhdGlvblxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJuIHRydWUgaXMgdGhlIHJlbGF0aW9uIGlzIGNvbnRhaW5lZCBpbiB0aGUgbm9kZSBhbmQgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHRoZSByZWxhdGlvbiBuYW1lIGlzIG5vdCBhIHN0cmluZ1xuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHJlbGF0aW9uIHR5cGUgZG9lc24ndCBleGlzdFxuICAgKi9cbiAgaGFzUmVsYXRpb24ocmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpIHtcbiAgICBpZiAodHlwZW9mIHJlbGF0aW9uTmFtZSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwidGhlIHJlbGF0aW9uIG5hbWUgbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICB9XG5cbiAgICBpZiAoIVJFTEFUSU9OX1RZUEVfTElTVC5pbmNsdWRlcyhyZWxhdGlvblR5cGUpKSB7XG4gICAgICB0aHJvdyBFcnJvcihcImludmFsaWQgcmVsYXRpb24gdHlwZVwiKTtcbiAgICB9XG5cbiAgICBjb25zdCB0eXBlTWFwID0gdGhpcy5fZ2V0Q2hpbGRyZW5UeXBlKHJlbGF0aW9uVHlwZSk7XG5cbiAgICBpZiAodHlwZW9mIHR5cGVNYXAgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHlwZU1hcC5oYXMocmVsYXRpb25OYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWZXJpZnkgaWYgdGhlIG5vZGUgY29udGFpbnMgYWxsIHRoZSByZWxhdGlvbiBuYW1lcy5cbiAgICogQHBhcmFtIHtBcnJheTxTdHJpbmc+fSByZWxhdGlvbk5hbWVzIEFycmF5IGNvbnRhaW5pbmcgYWxsIHRoZSByZWxhdGlvbiBuYW1lXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvblR5cGUgVHlwZSBvZiB0aGUgcmVsYXRpb25zXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm4gdHJ1ZSBpZiB0aGUgbm9kZSBjb250YWlucyBhbGwgdGhlIHJlbGF0aW9ucyBpbiByZWxhdGlvbk5hbWVzLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIHJlbGF0aW9uIG5hbWVzIGFyZSBub3QgaW4gYW4gYXJyYXlcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiBvbmUgb2YgdGhlIHJlbGF0aW9uIG5hbWVzIGlzIG5vdCBhIHN0cmluZ1xuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHJlbGF0aW9uIHR5cGUgZG9lc24ndCBleGlzdFxuICAgKi9cbiAgaGFzUmVsYXRpb25zKHJlbGF0aW9uTmFtZXMsIHJlbGF0aW9uVHlwZSkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShyZWxhdGlvbk5hbWVzKSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwiVGhlIHJlbGF0aW9uIG5hbWVzIG11c3QgYmUgaW4gYW4gYXJyYXlcIik7XG4gICAgfVxuXG4gICAgaWYgKCFSRUxBVElPTl9UWVBFX0xJU1QuaW5jbHVkZXMocmVsYXRpb25UeXBlKSkge1xuICAgICAgdGhyb3cgRXJyb3IoXCJpbnZhbGlkIHJlbGF0aW9uIHR5cGVcIik7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgcmVsYXRpb25OYW1lIG9mIHJlbGF0aW9uTmFtZXMpIHtcbiAgICAgIGlmICghdGhpcy5oYXNSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYWxsIHRoZSByZWxhdGlvbiBuYW1lcyBvZiB0aGUgbm9kZS5cbiAgICogQHJldHVybnMge0FycmF5PFN0cmluZz59IFRoZSBuYW1lcyBvZiB0aGUgcmVsYXRpb25zIG9mIHRoZSBub2RlXG4gICAqL1xuICBnZXRSZWxhdGlvbk5hbWVzKCkge1xuICAgIGNvbnN0IG5hbWVzID0gW107XG5cbiAgICBmb3IgKGxldCByZWxhdGlvbk1hcCBvZiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICBuYW1lcy5wdXNoKC4uLnJlbGF0aW9uTWFwLmtleXMoKSk7XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlcyBhbGwgZHVwbGljYXRlc1xuICAgIHJldHVybiBBcnJheS5mcm9tKG5ldyBTZXQobmFtZXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgdGhlIG5vZGUgYXMgY2hpbGQgb2YgdGhlIHJlbGF0aW9uLlxuICAgKiBAcGFyYW0ge1NwaW5hbE5vZGUgfCBNb2RlbH0gY2hpbGQgRWxlbWVudCB0byBhZGQgYXMgY2hpbGRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uTmFtZSBOYW1lIG9mIHRoZSByZWxhdGlvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25UeXBlIFR5cGUgb2YgdGhlIHJlbGF0aW9uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFNwaW5hbE5vZGU+fSBUaGUgY2hpbGQgbm9kZSBpbiBhIHByb21pc2VcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgY2hpbGQgaXMgbm90IGEgbW9kZWxcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgcmVsYXRpb24gbmFtZSBpcyBub3QgYSBzdHJpbmdcbiAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSByZWxhdGlvbiB0eXBlIGlzIGludmFsaWRcbiAgICovXG4gIGFzeW5jIGFkZENoaWxkKGNoaWxkLCByZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSkge1xuICAgIGxldCByZWxhdGlvbjtcblxuICAgIGlmICghKGNoaWxkIGluc3RhbmNlb2YgZ2xvYmFsVHlwZS5Nb2RlbCkpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcbiAgICAgICAgXCJDYW5ub3QgYWRkIGEgY2hpbGQgd2l0Y2ggaXMgbm90IGFuIGluc3RhbmNlIG9mIFNwaW5hbE5vZGUgb3IgTW9kZWwuXCJcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmICghKGNoaWxkIGluc3RhbmNlb2YgU3BpbmFsTm9kZSkpIHtcbiAgICAgIGNoaWxkID0gbmV3IFNwaW5hbE5vZGUodW5kZWZpbmVkLCB1bmRlZmluZWQsIGNoaWxkKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuaGFzUmVsYXRpb24ocmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpKSB7XG4gICAgICByZWxhdGlvbiA9IHRoaXMuX2NyZWF0ZVJlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVsYXRpb24gPSB0aGlzLl9nZXRSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSk7XG4gICAgfVxuXG4gICAgYXdhaXQgcmVsYXRpb24uYWRkQ2hpbGQoY2hpbGQpO1xuICAgIHJldHVybiBjaGlsZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgY2hpbGQgYW5kIG5vdGljZXMgdGhlIGNvbnRleHQgaWYgYSBuZXcgcmVsYXRpb24gd2FzIGNyZWF0ZWQuXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZSB8IE1vZGVsfSBjaGlsZCBOb2RlIHRvIGFkZCBhcyBjaGlsZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25OYW1lIE5hbWUgb2YgdGhlIHJlbGF0aW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvblR5cGUgVHlwZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHBhcmFtIHtTcGluYWxDb250ZXh0fSBjb250ZXh0IENvbnRleHQgdG8gdXBkYXRlXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFNwaW5hbE5vZGU+fSBUaGUgY2hpbGQgbm9kZSBpbiBhIHByb21pc2VcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgY2hpbGQgaXMgbm90IGEgbW9kZWxcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgcmVsYXRpb24gbmFtZSBpcyBub3QgYSBzdHJpbmdcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgY29udGV4dCBpcyBub3QgYSBTcGluYWxDb250ZXh0XG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgcmVsYXRpb24gdHlwZSBpcyBpbnZhbGlkXG4gICAqL1xuICBhc3luYyBhZGRDaGlsZEluQ29udGV4dChjaGlsZCwgcmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUsIGNvbnRleHQpIHtcbiAgICBsZXQgcmVsYXRpb247XG5cbiAgICBpZiAoIShjb250ZXh0IGluc3RhbmNlb2YgU3BpbmFsQ29udGV4dCkpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcImNvbnRleHQgbXVzdCBiZSBhIFNwaW5hQ29udGV4dFwiKTtcbiAgICB9XG5cbiAgICBpZiAoIShjaGlsZCBpbnN0YW5jZW9mIGdsb2JhbFR5cGUuTW9kZWwpKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXG4gICAgICAgIFwiQ2Fubm90IGFkZCBhIGNoaWxkIHdpdGNoIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBTcGluYWxOb2RlIG9yIE1vZGVsLlwiXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoIShjaGlsZCBpbnN0YW5jZW9mIFNwaW5hbE5vZGUpKSB7XG4gICAgICBjaGlsZCA9IG5ldyBTcGluYWxOb2RlKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBjaGlsZCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmhhc1JlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKSkge1xuICAgICAgcmVsYXRpb24gPSB0aGlzLl9jcmVhdGVSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbGF0aW9uID0gdGhpcy5fZ2V0UmVsYXRpb24ocmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpO1xuICAgIH1cblxuICAgIGNoaWxkLmFkZENvbnRleHRJZChjb250ZXh0LmdldElkKCkuZ2V0KCkpO1xuICAgIHJlbGF0aW9uLmFkZENvbnRleHRJZChjb250ZXh0LmdldElkKCkuZ2V0KCkpO1xuXG4gICAgYXdhaXQgcmVsYXRpb24uYWRkQ2hpbGQoY2hpbGQpO1xuICAgIHJldHVybiBjaGlsZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBub2RlIGZyb20gdGhlIHJlbGF0aW9uIGNoaWxkcmVuLlxuICAgKiBAcGFyYW0ge1NwaW5hbE5vZGV9IG5vZGUgTm9kZSB0byByZW1vdmVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uTmFtZSBOYW1lIG9mIHRoZSByZWxhdGlvbiB0byB3aWNoIHRoZSBub2RlIGJlbG9uZ3NcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uVHlwZSBUeXBlIG9mIHRoZSByZWxhdGlvbiB0byB3aWNoIHRoZSBub2RlIGJlbG9uZ3NcbiAgICogQHJldHVybnMge1Byb21pc2U8bm90aGluZz59IEFuIGVtcHR5IHByb21pc2VcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiByZWxhdGlvbiBuYW1lIGlzIG5vdCBhIHN0cmluZ1xuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgcmVsYXRpb24gdHlwZSBpcyBpbnZhbGlkXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiByZWxhdGlvbiBkb2Vzbid0IGV4aXN0XG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgY2hpbGQgZG9lc24ndCBleGlzdFxuICAgKi9cbiAgcmVtb3ZlQ2hpbGQobm9kZSwgcmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpIHtcbiAgICBpZiAoIXRoaXMuaGFzUmVsYXRpb24ocmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpKSB7XG4gICAgICB0aHJvdyBFcnJvcihcIlRoZSByZWxhdGlvbiBkb2Vzbid0IGV4aXN0XCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbCA9IHRoaXMuX2dldFJlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKTtcbiAgICByZXR1cm4gcmVsLnJlbW92ZUNoaWxkKG5vZGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgY2hpbGRyZW4gd2l0aCB0aGUgcmVsYXRpb24gbmFtZXMuXG4gICAqIEBwYXJhbSB7QXJyYXk8U3RyaW5nPiB8IFN0cmluZyB8IHVuZGVmaW5lZH0gcmVsYXRpb25OYW1lcyBOYW1lcyBvZiB0aGUgcmVsYXRpb25zIHRvIGVtcHR5XG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PEJvb2xlYW4+Pn0gQSBwcm9taXNlIGNvbnRhaW5pbmcgYW4gYXJyYXkgb2YgYm9vbGVhblxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHJlbGF0aW9uTmFtZXMgaXMgbmVpdGhlciBhbiBhcnJheSwgYSBzdHJpbmcgb3Igb21pdHRlZFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGFuIGVsZW1lbnQgb2YgcmVsYXRpb25OYW1lcyBpcyBub3QgYSBzdHJpbmdcbiAgICovXG4gIGFzeW5jIHJlbW92ZUNoaWxkcmVuKHJlbGF0aW9uTmFtZXMpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShyZWxhdGlvbk5hbWVzKSkge1xuICAgICAgaWYgKHJlbGF0aW9uTmFtZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJlbGF0aW9uTmFtZXMgPSB0aGlzLmdldFJlbGF0aW9uTmFtZXMoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHJlbGF0aW9uTmFtZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVsYXRpb25OYW1lcyA9IHRoaXMuZ2V0UmVsYXRpb25OYW1lcygpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlbGF0aW9uTmFtZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHJlbGF0aW9uTmFtZXMgPSBbcmVsYXRpb25OYW1lc107XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcInJlbGF0aW9uTmFtZXMgbXVzdCBiZSBhbiBhcnJheSwgYSBzdHJpbmcgb3Igb21pdHRlZFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgcmVsYXRpb25NYXAgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgZm9yIChsZXQgcmVsYXRpb25OYW1lIG9mIHJlbGF0aW9uTmFtZXMpIHtcbiAgICAgICAgaWYgKHJlbGF0aW9uTWFwLmhhcyhyZWxhdGlvbk5hbWUpKSB7XG4gICAgICAgICAgY29uc3QgcmVsYXRpb24gPSByZWxhdGlvbk1hcC5nZXRFbGVtZW50KHJlbGF0aW9uTmFtZSk7XG4gICAgICAgICAgcHJvbWlzZXMucHVzaChyZWxhdGlvbi5yZW1vdmVDaGlsZHJlbigpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgdGhlIG5vZGUgZnJvbSB0aGUgZ3JhcGggaS5lIHJlbW92ZSB0aGUgbm9kZSBmcm9tIGFsbCB0aGUgcGFyZW50IHJlbGF0aW9ucyBhbmQgcmVtb3ZlIGFsbCB0aGUgY2hpbGRyZW4gcmVsYXRpb25zLlxuICAgKiBUaGlzIG9wZXJhdGlvbiBtaWdodCBkZWxldGUgYWxsIHRoZSBzdWItZ3JhcGggdW5kZXIgdGhpcyBub2RlLlxuICAgKiBBZnRlciB0aGlzIG9wZXJhdGlvbiB0aGUgbm9kZSBjYW4gYmUgZGVsZXRlZCB3aXRob3V0IGZlYXIuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPG5vdGhpbmc+fSBBbiBlbXB0eSBwcm9taXNlXG4gICAqL1xuICBhc3luYyByZW1vdmVGcm9tR3JhcGgoKSB7XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbVBhcmVudHMoKSxcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21DaGlsZHJlbigpXG4gICAgXSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY2hpbGRyZW4gb2YgdGhlIG5vZGUgZm9yIHRoZSByZWxhdGlvbiBuYW1lcy5cbiAgICogQHBhcmFtIHtBcnJheTxTdHJpbmc+fSByZWxhdGlvbk5hbWVzIEFycmF5IGNvbnRhaW5pbmcgdGhlIHJlbGF0aW9uIG5hbWVzIG9mIHRoZSBkZXNpcmVkIGNoaWxkcmVuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PFNwaW5hbE5vZGU+Pn0gVGhlIGNoaWxkcmVuIHRoYXQgd2VyZSBmb3VuZFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIHJlbGF0aW9uTmFtZXMgaXMgbmVpdGhlciBhbiBhcnJheSwgYSBzdHJpbmcgb3Igb21pdHRlZFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGFuIGVsZW1lbnQgb2YgcmVsYXRpb25OYW1lcyBpcyBub3QgYSBzdHJpbmdcbiAgICovXG4gIGFzeW5jIGdldENoaWxkcmVuKHJlbGF0aW9uTmFtZXMpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShyZWxhdGlvbk5hbWVzKSkge1xuICAgICAgaWYgKHJlbGF0aW9uTmFtZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJlbGF0aW9uTmFtZXMgPSB0aGlzLmdldFJlbGF0aW9uTmFtZXMoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHJlbGF0aW9uTmFtZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVsYXRpb25OYW1lcyA9IHRoaXMuZ2V0UmVsYXRpb25OYW1lcygpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlbGF0aW9uTmFtZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHJlbGF0aW9uTmFtZXMgPSBbcmVsYXRpb25OYW1lc107XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcInJlbGF0aW9uTmFtZXMgbXVzdCBiZSBhbiBhcnJheSwgYSBzdHJpbmcgb3Igb21pdHRlZFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgcmVsYXRpb25NYXAgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByZWxhdGlvbk5hbWVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChyZWxhdGlvbk1hcC5oYXMocmVsYXRpb25OYW1lc1tqXSkpIHtcbiAgICAgICAgICBjb25zdCByZWxhdGlvbiA9IHJlbGF0aW9uTWFwLmdldEVsZW1lbnQocmVsYXRpb25OYW1lc1tqXSk7XG4gICAgICAgICAgcHJvbWlzZXMucHVzaChyZWxhdGlvbi5nZXRDaGlsZHJlbigpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNoaWxkcmVuTHN0ID0gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIGxldCByZXMgPSBbXTtcblxuICAgIGZvciAobGV0IGNoaWxkcmVuIG9mIGNoaWxkcmVuTHN0KSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlcy5wdXNoKGNoaWxkcmVuW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgY2hpbGRyZW4gb2YgdGhlIG5vZGUgdGhhdCBhcmUgcmVnaXN0ZXJlZCBpbiB0aGUgY29udGV4dFxuICAgKiBAcGFyYW0ge1NwaW5hbENvbnRleHR9IGNvbnRleHQgQ29udGV4dCB0byB1c2UgZm9yIHRoZSBzZWFyY2hcbiAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8U3BpbmFsTm9kZT4+fSBUaGUgY2hpbGRyZW4gdGhhdCB3ZXJlIGZvdW5kXG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIGNvbnRleHQgaXMgbm90IGEgU3BpbmFsQ29udGV4dFxuICAgKi9cbiAgYXN5bmMgZ2V0Q2hpbGRyZW5JbkNvbnRleHQoY29udGV4dCkge1xuICAgIGlmICghKGNvbnRleHQgaW5zdGFuY2VvZiBTcGluYWxDb250ZXh0KSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFwiY29udGV4dCBtdXN0IGJlIGEgU3BpbmFsQ29udGV4dFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgcmVsYXRpb25NYXAgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgZm9yIChsZXQgcmVsYXRpb24gb2YgcmVsYXRpb25NYXApIHtcbiAgICAgICAgaWYgKHJlbGF0aW9uLmJlbG9uZ3NUb0NvbnRleHQoY29udGV4dCkpIHtcbiAgICAgICAgICBwcm9taXNlcy5wdXNoKHJlbGF0aW9uLmdldENoaWxkcmVuSW5Db250ZXh0KGNvbnRleHQpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNoaWxkcmVuTHN0ID0gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIGxldCByZXMgPSBbXTtcblxuICAgIGZvciAobGV0IGNoaWxkcmVuIG9mIGNoaWxkcmVuTHN0KSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlcy5wdXNoKGNoaWxkcmVuW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhbGwgcGFyZW50cyBmb3IgdGhlIHJlbGF0aW9uIG5hbWVzIG5vIG1hdHRlciB0aGUgdHlwZSBvZiByZWxhdGlvblxuICAgKiBAcGFyYW0ge0FycmF5PFN0cmluZz59IHJlbGF0aW9uTmFtZXMgQXJyYXkgY29udGFpbmluZyB0aGUgcmVsYXRpb24gbmFtZXMgb2YgdGhlIGRlc2lyZWQgcGFyZW50c1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxTcGluYWxOb2RlPj59IFByb21pc2UgY29udGFpbmluZyB0aGUgcGFyZW50cyB0aGF0IHdlcmUgZm91bmRcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgcmVsYXRpb25OYW1lcyBhcmUgbmVpdGhlciBhbiBhcnJheSwgYSBzdHJpbmcgb3Igb21pdHRlZFxuICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IElmIGFuIGVsZW1lbnQgb2YgcmVsYXRpb25OYW1lcyBpcyBub3QgYSBzdHJpbmdcbiAgICovXG4gIGdldFBhcmVudHMocmVsYXRpb25OYW1lcykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHJlbGF0aW9uTmFtZXMpKSB7XG4gICAgICBpZiAocmVsYXRpb25OYW1lcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmVsYXRpb25OYW1lcyA9IHRoaXMucGFyZW50cy5rZXlzKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChyZWxhdGlvbk5hbWVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlbGF0aW9uTmFtZXMgPSB0aGlzLnBhcmVudHMua2V5cygpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlbGF0aW9uTmFtZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHJlbGF0aW9uTmFtZXMgPSBbcmVsYXRpb25OYW1lc107XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihcInJlbGF0aW9uTmFtZXMgbXVzdCBiZSBhbiBhcnJheSwgYSBzdHJpbmcgb3Igb21pdHRlZFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgbmFtZSBvZiByZWxhdGlvbk5hbWVzKSB7XG4gICAgICBjb25zdCBsaXN0ID0gdGhpcy5wYXJlbnRzLmdldEVsZW1lbnQobmFtZSk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBwcm9taXNlcy5wdXNoKFxuICAgICAgICAgIGxpc3RbaV0ubG9hZCgpLnRoZW4ocmVsYXRpb24gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJlbGF0aW9uLmdldFBhcmVudCgpO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWN1cnNpdmVseSBmaW5kcyBhbGwgdGhlIGNoaWxkcmVuIG5vZGVzIGZvciB3aGljaCB0aGUgcHJlZGljYXRlIGlzIHRydWUuXG4gICAqIEBwYXJhbSB7QXJyYXk8U3RyaW5nPn0gcmVsYXRpb25OYW1lcyBBcnJheSBjb250YWluaW5nIHRoZSByZWxhdGlvbiBuYW1lcyB0byBmb2xsb3dcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gcHJlZGljYXRlIEZ1bmN0aW9uIHJldHVybmluZyB0cnVlIGlmIHRoZSBub2RlIG5lZWRzIHRvIGJlIHJldHVybmVkXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PFNwaW5hbE5vZGU+Pn0gVGhlIG5vZGVzIHRoYXQgd2VyZSBmb3VuZFxuICAgKi9cbiAgYXN5bmMgZmluZChyZWxhdGlvbk5hbWVzLCBwcmVkaWNhdGUgPSBERUZBVUxUX1BSRURJQ0FURSkge1xuICAgIGlmICh0eXBlb2YgcHJlZGljYXRlICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInByZWRpY2F0ZSBtdXN0IGJlIGEgZnVuY3Rpb25cIik7XG4gICAgfVxuXG4gICAgbGV0IHNlZW4gPSBuZXcgU2V0KFt0aGlzXSk7XG4gICAgbGV0IHByb21pc2VzID0gW107XG4gICAgbGV0IG5leHRHZW4gPSBbdGhpc107XG4gICAgbGV0IGN1cnJlbnRHZW4gPSBbXTtcbiAgICBsZXQgZm91bmQgPSBbXTtcblxuICAgIHdoaWxlIChuZXh0R2VuLmxlbmd0aCkge1xuICAgICAgY3VycmVudEdlbiA9IG5leHRHZW47XG4gICAgICBwcm9taXNlcyA9IFtdO1xuICAgICAgbmV4dEdlbiA9IFtdO1xuXG4gICAgICBmb3IgKGxldCBub2RlIG9mIGN1cnJlbnRHZW4pIHtcbiAgICAgICAgcHJvbWlzZXMucHVzaChub2RlLmdldENoaWxkcmVuKHJlbGF0aW9uTmFtZXMpKTtcblxuICAgICAgICBpZiAocHJlZGljYXRlKG5vZGUpKSB7XG4gICAgICAgICAgZm91bmQucHVzaChub2RlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsZXQgY2hpbGRyZW5BcnJheXMgPSBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcyk7XG5cbiAgICAgIGZvciAobGV0IGNoaWxkcmVuIG9mIGNoaWxkcmVuQXJyYXlzKSB7XG4gICAgICAgIGZvciAobGV0IGNoaWxkIG9mIGNoaWxkcmVuKSB7XG4gICAgICAgICAgaWYgKCFzZWVuLmhhcyhjaGlsZCkpIHtcbiAgICAgICAgICAgIG5leHRHZW4ucHVzaChjaGlsZCk7XG4gICAgICAgICAgICBzZWVuLmFkZChjaGlsZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZvdW5kO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlY3Vyc2l2ZWx5IGZpbmRzIGFsbCB0aGUgY2hpbGRyZW4gbm9kZXMgaW4gdGhlIGNvbnRleHQgZm9yIHdoaWNoIHRoZSBwcmVkaWNhdGUgaXMgdHJ1ZS4uXG4gICAqIEBwYXJhbSB7U3BpbmFsQ29udGV4dH0gY29udGV4dCBDb250ZXh0IHRvIHVzZSBmb3IgdGhlIHNlYXJjaFxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcmVkaWNhdGUgRnVuY3Rpb24gcmV0dXJuaW5nIHRydWUgaWYgdGhlIG5vZGUgbmVlZHMgdG8gYmUgcmV0dXJuZWRcbiAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8U3BpbmFsTm9kZT4+fSBUaGUgbm9kZXMgdGhhdCB3ZXJlIGZvdW5kXG4gICAqL1xuICBhc3luYyBmaW5kSW5Db250ZXh0KGNvbnRleHQsIHByZWRpY2F0ZSA9IERFRkFVTFRfUFJFRElDQVRFKSB7XG4gICAgaWYgKHR5cGVvZiBwcmVkaWNhdGUgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHByZWRpY2F0ZSBmdW5jdGlvbiBtdXN0IGJlIGEgZnVuY3Rpb25cIik7XG4gICAgfVxuXG4gICAgbGV0IHNlZW4gPSBuZXcgU2V0KFt0aGlzXSk7XG4gICAgbGV0IHByb21pc2VzID0gW107XG4gICAgbGV0IG5leHRHZW4gPSBbdGhpc107XG4gICAgbGV0IGN1cnJlbnRHZW4gPSBbXTtcbiAgICBsZXQgZm91bmQgPSBbXTtcblxuICAgIHdoaWxlIChuZXh0R2VuLmxlbmd0aCkge1xuICAgICAgY3VycmVudEdlbiA9IG5leHRHZW47XG4gICAgICBwcm9taXNlcyA9IFtdO1xuICAgICAgbmV4dEdlbiA9IFtdO1xuXG4gICAgICBmb3IgKGxldCBub2RlIG9mIGN1cnJlbnRHZW4pIHtcbiAgICAgICAgcHJvbWlzZXMucHVzaChub2RlLmdldENoaWxkcmVuSW5Db250ZXh0KGNvbnRleHQpKTtcblxuICAgICAgICBpZiAocHJlZGljYXRlKG5vZGUpKSB7XG4gICAgICAgICAgZm91bmQucHVzaChub2RlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsZXQgY2hpbGRyZW5BcnJheXMgPSBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcyk7XG5cbiAgICAgIGZvciAobGV0IGNoaWxkcmVuIG9mIGNoaWxkcmVuQXJyYXlzKSB7XG4gICAgICAgIGZvciAobGV0IGNoaWxkIG9mIGNoaWxkcmVuKSB7XG4gICAgICAgICAgaWYgKCFzZWVuLmhhcyhjaGlsZCkpIHtcbiAgICAgICAgICAgIG5leHRHZW4ucHVzaChjaGlsZCk7XG4gICAgICAgICAgICBzZWVuLmFkZChjaGlsZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZvdW5kO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlY3Vyc2l2ZWx5IGFwcGxpZXMgYSBmdW5jdGlvbiB0byBhbGwgdGhlIGNoaWxkcmVuIG5vZGVzLlxuICAgKiBAcGFyYW0ge0FycmF5PFN0cmluZz59IHJlbGF0aW9uTmFtZXMgQXJyYXkgY29udGFpbmluZyB0aGUgcmVsYXRpb24gbmFtZXMgdG8gZm9sbG93XG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIEZ1bmN0aW9uIHRvIGFwcGx5IHRvIHRoZSBub2Rlc1xuICAgKi9cbiAgYXN5bmMgZm9yRWFjaChyZWxhdGlvbk5hbWVzLCBjYWxsYmFjaykge1xuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRocm93IEVycm9yKFwiWW91IG11c3QgZ2l2ZSBhIGNhbGxiYWNrIGZ1bmN0aW9uXCIpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBjYWxsYmFjayBmdW5jdGlvbiBtdXN0IGJlIGEgZnVuY3Rpb25cIik7XG4gICAgfVxuXG4gICAgbGV0IG5vZGVzID0gYXdhaXQgdGhpcy5maW5kKHJlbGF0aW9uTmFtZXMpO1xuXG4gICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xuICAgICAgY2FsbGJhY2sobm9kZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlY3Vyc2l2ZWx5IGFwcGxpZXMgYSBmdW5jdGlvbiB0byBhbGwgdGhlIGNoaWxkcmVuIG5vZGVzIGluIHRoZSBjb250ZXh0LlxuICAgKiBAcGFyYW0ge1NwaW5hbENvbnRleHR9IGNvbnRleHQgQ29udGV4dCB0byB1c2UgZm9yIHRoZSBzZWFyY2hcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgRnVuY3Rpb24gdG8gYXBwbHkgdG8gdGhlIG5vZGVzXG4gICAqL1xuICBhc3luYyBmb3JFYWNoSW5Db250ZXh0KGNvbnRleHQsIGNhbGxiYWNrKSB7XG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhyb3cgRXJyb3IoXCJZb3UgbXVzdCBnaXZlIGEgY2FsbGJhY2sgZnVuY3Rpb25cIik7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIG11c3QgYmUgYSBmdW5jdGlvblwiKTtcbiAgICB9XG5cbiAgICBsZXQgbm9kZXMgPSBhd2FpdCB0aGlzLmZpbmRJbkNvbnRleHQoY29udGV4dCk7XG5cbiAgICBmb3IgKGxldCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICBjYWxsYmFjayhub2RlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVjdXJzaXZlbHkgYXBwbGllcyBhIGZ1bmN0aW9uIHRvIGFsbCB0aGUgY2hpbGRyZW4gbm9kZXMgYW5kIHJldHVybnMgdGhlIHJlc3VsdHMgaW4gYW4gYXJyYXkuXG4gICAqIEBwYXJhbSB7QXJyYXk8U3RyaW5nPn0gcmVsYXRpb25OYW1lcyBBcnJheSBjb250YWluaW5nIHRoZSByZWxhdGlvbiBuYW1lcyB0byBmb2xsb3dcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgRnVuY3Rpb24gdG8gYXBwbHkgdG8gdGhlIG5vZGVzXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PCo+Pn0gVGhlIHJlc3VsdHMgb2YgdGhlIGNhbGxiYWNrIGZvciBlYWNoIG5vZGVcbiAgICovXG4gIGFzeW5jIG1hcChyZWxhdGlvbk5hbWVzLCBjYWxsYmFjaykge1xuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRocm93IEVycm9yKFwiWW91IG11c3QgZ2l2ZSBhIGNhbGxiYWNrIGZ1bmN0aW9uXCIpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBjYWxsYmFjayBmdW5jdGlvbiBtdXN0IGJlIGEgZnVuY3Rpb25cIik7XG4gICAgfVxuXG4gICAgbGV0IG5vZGVzID0gYXdhaXQgdGhpcy5maW5kKHJlbGF0aW9uTmFtZXMpO1xuICAgIGxldCByZXN1bHRzID0gW107XG5cbiAgICBmb3IgKGxldCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICByZXN1bHRzLnB1c2goY2FsbGJhY2sobm9kZSkpO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlY3Vyc2l2ZWx5IGFwcGxpZXMgYSBmdW5jdGlvbiB0byBhbGwgdGhlIGNoaWxkcmVuIG5vZGVzIGluIHRoZSBjb250ZXh0IGFuZCByZXR1cm5zIHRoZSByZXN1bHRzIGluIGFuIGFycmF5LlxuICAgKiBAcGFyYW0ge1NwaW5hbENvbnRleHR9IGNvbnRleHQgQ29udGV4dCB0byB1c2UgZm9yIHRoZSBzZWFyY2hcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgRnVuY3Rpb24gdG8gYXBwbHkgdG8gdGhlIG5vZGVzXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PCo+Pn0gVGhlIHJlc3VsdHMgb2YgdGhlIGNhbGxiYWNrIGZvciBlYWNoIG5vZGVcbiAgICovXG4gIGFzeW5jIG1hcEluQ29udGV4dChjb250ZXh0LCBjYWxsYmFjaykge1xuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRocm93IEVycm9yKFwiWW91IG11c3QgZ2l2ZSBhIGNhbGxiYWNrIGZ1bmN0aW9uXCIpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBjYWxsYmFjayBmdW5jdGlvbiBtdXN0IGJlIGEgZnVuY3Rpb25cIik7XG4gICAgfVxuXG4gICAgbGV0IG5vZGVzID0gYXdhaXQgdGhpcy5maW5kSW5Db250ZXh0KGNvbnRleHQpO1xuICAgIGxldCByZXN1bHRzID0gW107XG5cbiAgICBmb3IgKGxldCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICByZXN1bHRzLnB1c2goY2FsbGJhY2sobm9kZSkpO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgcmVsYXRpb24gbGlzdCBjb3JyZXNwb25kaW5nIHRvIHRoZSByZWxhdGlvbiB0eXBlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25UeXBlIFR5cGUgb2YgdGhlIHJlbGF0aW9uXG4gICAqIEByZXR1cm5zIHtTcGluYWxNYXB9IFJldHVybiB0aGUgcmVsYXRpb24gbGlzdCBjb3JyZXNwb25kaW5nIHRvIHRoZSByZWxhdGlvbiB0eXBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZ2V0Q2hpbGRyZW5UeXBlKHJlbGF0aW9uVHlwZSkge1xuICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLmdldEVsZW1lbnQocmVsYXRpb25UeXBlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIHJlbGF0aW9uIGNvcnJlc3BvbmRpbmcuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk5hbWUgTmFtZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uVHlwZSBUeXBlIG9mIHRoZSByZWxhdGlvblxuICAgKiBAcmV0dXJucyB7U3BpbmFsUmVsYXRpb259IFRoZSByZWxhdGlvbiBjb3JyZXNwb25kaW5nXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZ2V0UmVsYXRpb24ocmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0Q2hpbGRyZW5UeXBlKHJlbGF0aW9uVHlwZSkuZ2V0RWxlbWVudChyZWxhdGlvbk5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBwYXJlbnQgcmVsYXRpb24gb2YgdGhlIG5vZGUuXG4gICAqIEBwYXJhbSB7U3BpbmFsUmVsYXRpb259IHJlbGF0aW9uIFJlbGF0aW9uIHRvIHJlbW92ZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3JlbW92ZVBhcmVudChyZWxhdGlvbikge1xuICAgIGNvbnN0IHBhcmVudExzdCA9IHRoaXMucGFyZW50cy5nZXRFbGVtZW50KHJlbGF0aW9uLmdldE5hbWUoKS5nZXQoKSk7XG5cbiAgICBjb25zdCBpbmRleFRvUmVtb3ZlID0gcGFyZW50THN0LmluZGV4T2YoXG4gICAgICBwYXJlbnRQdHIgPT4gcGFyZW50UHRyLmdldElkKCkuZ2V0KCkgPT09IHJlbGF0aW9uLmdldElkKCkuZ2V0KClcbiAgICApO1xuXG4gICAgcGFyZW50THN0LnNwbGljZShpbmRleFRvUmVtb3ZlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBub2RlIGZyb20gYWxsIHBhcmVudCByZWxhdGlvbiB0aGUgcHJvcGVydHkgcGFyZW50cy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFzeW5jIF9yZW1vdmVGcm9tUGFyZW50cygpIHtcbiAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgcGFyZW50IG9mIHRoaXMucGFyZW50cykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJlbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcGFyZW50W2ldLmxvYWQoKS50aGVuKHBhcmVudFJlbCA9PiB7XG4gICAgICAgICAgcHJvbWlzZXMucHVzaChwYXJlbnRSZWwucmVtb3ZlQ2hpbGQodGhpcykpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgdGhlIHJlbGF0aW9uIGFzIHBhcmVudCBvZiB0aGUgbm9kZS5cbiAgICogQHBhcmFtIHtTcGluYWxSZWxhdGlvbn0gcmVsYXRpb24gUGFyZW50IHJlbGF0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfYWRkUGFyZW50KHJlbGF0aW9uKSB7XG4gICAgY29uc3QgcmVsYXRpb25OYW1lID0gcmVsYXRpb24uZ2V0TmFtZSgpLmdldCgpO1xuXG4gICAgaWYgKHRoaXMucGFyZW50cy5oYXMocmVsYXRpb25OYW1lKSkge1xuICAgICAgdGhpcy5wYXJlbnRzXG4gICAgICAgIC5nZXRFbGVtZW50KHJlbGF0aW9uTmFtZSlcbiAgICAgICAgLnB1c2gobmV3IFNwaW5hbE5vZGVQb2ludGVyKHJlbGF0aW9uKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGxpc3QgPSBuZXcgZ2xvYmFsVHlwZS5Mc3QoKTtcbiAgICAgIGxpc3QucHVzaChuZXcgU3BpbmFsTm9kZVBvaW50ZXIocmVsYXRpb24pKTtcbiAgICAgIHRoaXMucGFyZW50cy5zZXRFbGVtZW50KHJlbGF0aW9uTmFtZSwgbGlzdCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyByZWxhdGlvbiBmb3IgdGhpcyBub2RlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25OYW1lIE5hbWUgb2YgdGhlIHJlbGF0aW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvblR5cGUgVHlwZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9jcmVhdGVSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSkge1xuICAgIGNvbnN0IHJlbGF0aW9uID0gU3BpbmFsUmVsYXRpb25GYWN0b3J5LmdldE5ld1JlbGF0aW9uKFxuICAgICAgdGhpcyxcbiAgICAgIHJlbGF0aW9uTmFtZSxcbiAgICAgIHJlbGF0aW9uVHlwZVxuICAgICk7XG5cbiAgICBpZiAoIXRoaXMuY2hpbGRyZW4uaGFzKHJlbGF0aW9uVHlwZSkpIHtcbiAgICAgIHRoaXMuY2hpbGRyZW4uc2V0RWxlbWVudChyZWxhdGlvblR5cGUsIG5ldyBTcGluYWxNYXAoKSk7XG4gICAgfVxuXG4gICAgdGhpcy5fZ2V0Q2hpbGRyZW5UeXBlKHJlbGF0aW9uVHlwZSkuc2V0RWxlbWVudChyZWxhdGlvbk5hbWUsIHJlbGF0aW9uKTtcbiAgICByZXR1cm4gcmVsYXRpb247XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFsbCBjaGlsZHJlbiByZWxhdGlvbiBmcm9tIHRoZSBncmFwaC5cbiAgICogQHJldHVybnMge1Byb21pc2U8bm90aGluZz59IEFuIGVtcHR5IHByb21pc2VcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFzeW5jIF9yZW1vdmVGcm9tQ2hpbGRyZW4oKSB7XG4gICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcblxuICAgIGZvciAobGV0IHJlbGF0aW9uTWFwIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgIGZvciAobGV0IHJlbGF0aW9uIG9mIHJlbGF0aW9uTWFwKSB7XG4gICAgICAgIHByb21pc2VzLnB1c2gocmVsYXRpb24ucmVtb3ZlRnJvbUdyYXBoKCkpO1xuICAgICAgfVxuICAgIH1cbiAgICBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gIH1cbn1cblxuc3BpbmFsQ29yZS5yZWdpc3Rlcl9tb2RlbHMoW1NwaW5hbE5vZGVdKTtcbmV4cG9ydCBkZWZhdWx0IFNwaW5hbE5vZGU7XG4iXX0=