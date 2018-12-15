"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _spinalCoreConnectorjs = _interopRequireDefault(require("spinal-core-connectorjs"));

var _Utilities = require("../Utilities");

var _SpinalNodePointer = _interopRequireDefault(require("../SpinalNodePointer"));

var _SpinalRelationFactory = require("../Relations/SpinalRelationFactory");

var _SpinalMap = _interopRequireDefault(require("../SpinalMap"));

var _SpinalSet = _interopRequireDefault(require("../SpinalSet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const globalType = typeof window === "undefined" ? global : window;

const DEFAULT_PREDICATE = () => true;

class SpinalNode extends globalType.Model {
  /**
   * Constructor for the SpinalNode class.
   * @param {String} name Name of the node
   * @param {String} type Type of the node
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
    let nodeChildrenIds = [];
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
    const names = [];
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = this.children[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        let relationMap = _step3.value;
        names.push(...relationMap.keys());
      } // Removes all duplicates

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

    return Array.from(new Set(names));
  }
  /**
   * Add the node as child of the relation.
   * @param {SpinalNode | Model} child Element to add as child
   * @param {String} relationName Name of the relation
   * @param {String} relationType Type of the relation
   * @returns {Promise<SpinalNode>} The child node in a promise
   */


  addChild(child, relationName, relationType) {
    var _this = this;

    return _asyncToGenerator(function* () {
      let relation;

      if (!(child instanceof globalType.Model)) {
        throw new Error("Cannot add a child witch is not an instance of SpinalNode or Model.");
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
   * @param {String} relationName Name of the relation
   * @param {String} relationType Type of the relation
   * @param {SpinalContext} context Context to update
   * @returns {Promise<SpinalNode>} The child node in a promise
   */


  addChildInContext(child, relationName, relationType, context) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      let relation;

      if (!(child instanceof globalType.Model)) {
        throw new Error("Cannot add a child witch is not an instance of SpinalNode or Model.");
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
   * @param {String} relationName Name of the relation to wich the node belongs
   * @param {String} relationType Type of the relation to wich the node belongs
   * @returns {Promise<nothing>} An empty promise
   * @throws {Error} If Relation doesn't exist
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
   * @param {Array<String>} relationNames Names of the relations to empty
   * @returns {Promise<Array<Boolean>>} A promise containing an array of boolean
   * @throws {Error} If one of the nodes is not a child
   */


  removeChildren(relationNames) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      if (relationNames === undefined || relationNames.length === 0) {
        relationNames = _this3.getRelationNames();
      } else if (typeof relationNames === "string") {
        relationNames = [relationNames];
      }

      const promises = [];
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = _this3.children[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          let relationMap = _step4.value;
          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (var _iterator5 = relationNames[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              let relationName = _step5.value;

              if (relationMap.has(relationName)) {
                const relation = relationMap.getElement(relationName);
                promises.push(relation.removeChildren());
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
        }
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
   */


  getChildren(relationNames) {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      if (typeof relationNames === "undefined" || relationNames.length === 0) {
        relationNames = _this5.getRelationNames();
      } else if (typeof relationNames === "string") {
        relationNames = [relationNames];
      }

      const promises = [];
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = _this5.children[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          let relationMap = _step6.value;

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
   */


  getChildrenInContext(context) {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      if (typeof context === "undefined") {
        throw new Error("You must give a context");
      }

      const promises = [];
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = _this6.children[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          let relationMap = _step8.value;
          var _iteratorNormalCompletion10 = true;
          var _didIteratorError10 = false;
          var _iteratorError10 = undefined;

          try {
            for (var _iterator10 = relationMap[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
              let relation = _step10.value;

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
   * @param {Array<String>} relationNames Array containing the relation names of the desired parents
   * @returns {Promise<Array<SpinalNode>>} Promise containing the parents that were found
   */


  getParents(relationNames) {
    const promises = [];

    if (typeof relationNames === "undefined" || relationNames.length === 0) {
      relationNames = this.parents.keys();
    }

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
      var _iteratorNormalCompletion20 = true;
      var _didIteratorError20 = false;
      var _iteratorError20 = undefined;

      try {
        for (var _iterator20 = _this13.parents[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
          let parent = _step20.value;

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
      const list = new globalType.Lst();
      list.push(new _SpinalNodePointer.default(relation));
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
          let relationMap = _step21.value;
          var _iteratorNormalCompletion22 = true;
          var _didIteratorError22 = false;
          var _iteratorError22 = undefined;

          try {
            for (var _iterator22 = relationMap[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
              let relation = _step22.value;
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

_spinalCoreConnectorjs.default.register_models([SpinalNode]);

var _default = SpinalNode;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Ob2Rlcy9TcGluYWxOb2RlLmpzIl0sIm5hbWVzIjpbImdsb2JhbFR5cGUiLCJ3aW5kb3ciLCJnbG9iYWwiLCJERUZBVUxUX1BSRURJQ0FURSIsIlNwaW5hbE5vZGUiLCJNb2RlbCIsImNvbnN0cnVjdG9yIiwibmFtZSIsInR5cGUiLCJlbGVtZW50IiwiYWRkX2F0dHIiLCJpbmZvIiwiaWQiLCJwYXJlbnRzIiwiU3BpbmFsTWFwIiwiY2hpbGRyZW4iLCJ1bmRlZmluZWQiLCJTcGluYWxOb2RlUG9pbnRlciIsImNvbnRleHRJZHMiLCJTcGluYWxTZXQiLCJnZXRJZCIsImdldE5hbWUiLCJnZXRUeXBlIiwiZ2V0RWxlbWVudCIsImxvYWQiLCJnZXRDaGlsZHJlbklkcyIsIm5vZGVDaGlsZHJlbklkcyIsInJlbGF0aW9uTWFwIiwicmVsYXRpb24iLCJyZWxDaGlsZHJlbklkcyIsImkiLCJsZW5ndGgiLCJwdXNoIiwiZ2V0TmJDaGlsZHJlbiIsImNoaWxkcmVuSWRzIiwiYWRkQ29udGV4dElkIiwiaGFzIiwiYWRkIiwiZ2V0Q29udGV4dElkcyIsInZhbHVlcyIsImJlbG9uZ3NUb0NvbnRleHQiLCJjb250ZXh0IiwiZ2V0IiwiaGFzUmVsYXRpb24iLCJyZWxhdGlvbk5hbWUiLCJyZWxhdGlvblR5cGUiLCJ0eXBlTWFwIiwiX2dldENoaWxkcmVuVHlwZSIsImhhc1JlbGF0aW9ucyIsInJlbGF0aW9uTmFtZXMiLCJyZXMiLCJnZXRSZWxhdGlvbk5hbWVzIiwibmFtZXMiLCJrZXlzIiwiQXJyYXkiLCJmcm9tIiwiU2V0IiwiYWRkQ2hpbGQiLCJjaGlsZCIsIkVycm9yIiwiX2NyZWF0ZVJlbGF0aW9uIiwiX2dldFJlbGF0aW9uIiwiYWRkQ2hpbGRJbkNvbnRleHQiLCJyZW1vdmVDaGlsZCIsIm5vZGUiLCJyZWwiLCJyZW1vdmVDaGlsZHJlbiIsInByb21pc2VzIiwiUHJvbWlzZSIsImFsbCIsInJlbW92ZUZyb21HcmFwaCIsIl9yZW1vdmVGcm9tUGFyZW50cyIsIl9yZW1vdmVGcm9tQ2hpbGRyZW4iLCJnZXRDaGlsZHJlbiIsImoiLCJjaGlsZHJlbkxzdCIsImdldENoaWxkcmVuSW5Db250ZXh0IiwiZ2V0UGFyZW50cyIsImxpc3QiLCJ0aGVuIiwiZ2V0UGFyZW50IiwiZmluZCIsInByZWRpY2F0ZSIsInNlZW4iLCJuZXh0R2VuIiwiY3VycmVudEdlbiIsImZvdW5kIiwiY2hpbGRyZW5BcnJheXMiLCJmaW5kSW5Db250ZXh0IiwiZm9yRWFjaCIsImNhbGxiYWNrIiwibm9kZXMiLCJmb3JFYWNoSW5Db250ZXh0IiwibWFwIiwicmVzdWx0cyIsIm1hcEluQ29udGV4dCIsIl9yZW1vdmVQYXJlbnQiLCJwYXJlbnRMc3QiLCJpbmRleFRvUmVtb3ZlIiwiaW5kZXhPZiIsInBhcmVudFB0ciIsInNwbGljZSIsInBhcmVudCIsInBhcmVudFJlbCIsIl9hZGRQYXJlbnQiLCJMc3QiLCJzZXRFbGVtZW50IiwiU3BpbmFsUmVsYXRpb25GYWN0b3J5IiwiZ2V0TmV3UmVsYXRpb24iLCJzcGluYWxDb3JlIiwicmVnaXN0ZXJfbW9kZWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBd0JBOztBQUNBOztBQUdBOztBQUlBOztBQUdBOztBQUNBOzs7Ozs7OztBQU5BLE1BQU1BLFVBQVUsR0FBRyxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDQyxNQUFoQyxHQUF5Q0QsTUFBNUQ7O0FBUUEsTUFBTUUsaUJBQWlCLEdBQUcsTUFBTSxJQUFoQzs7QUFFQSxNQUFNQyxVQUFOLFNBQXlCSixVQUFVLENBQUNLLEtBQXBDLENBQTBDO0FBQ3hDOzs7Ozs7QUFNQUMsRUFBQUEsV0FBVyxDQUFDQyxJQUFJLEdBQUcsV0FBUixFQUFxQkMsSUFBSSxHQUFHLFlBQTVCLEVBQTBDQyxPQUExQyxFQUFtRDtBQUM1RDtBQUNBLFNBQUtDLFFBQUwsQ0FBYztBQUNaQyxNQUFBQSxJQUFJLEVBQUU7QUFDSkMsUUFBQUEsRUFBRSxFQUFFLHFCQUFLLEtBQUtOLFdBQUwsQ0FBaUJDLElBQXRCLENB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QyxHQUFSLENBQVlGLFFBQVosQ0FBTjtBQVIwQjtBQVMzQjs7QUFwb0J1Qzs7QUF1b0IxQzBDLCtCQUFXQyxlQUFYLENBQTJCLENBQUMxRyxVQUFELENBQTNCOztlQUNlQSxVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4IFNwaW5hbENvbSAtIHd3dy5zcGluYWxjb20uY29tXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgU3BpbmFsQ29yZS5cbiAqXG4gKiBQbGVhc2UgcmVhZCBhbGwgb2YgdGhlIGZvbGxvd2luZyB0ZXJtcyBhbmQgY29uZGl0aW9uc1xuICogb2YgdGhlIEZyZWUgU29mdHdhcmUgbGljZW5zZSBBZ3JlZW1lbnQgKFwiQWdyZWVtZW50XCIpXG4gKiBjYXJlZnVsbHkuXG4gKlxuICogVGhpcyBBZ3JlZW1lbnQgaXMgYSBsZWdhbGx5IGJpbmRpbmcgY29udHJhY3QgYmV0d2VlblxuICogdGhlIExpY2Vuc2VlIChhcyBkZWZpbmVkIGJlbG93KSBhbmQgU3BpbmFsQ29tIHRoYXRcbiAqIHNldHMgZm9ydGggdGhlIHRlcm1zIGFuZCBjb25kaXRpb25zIHRoYXQgZ292ZXJuIHlvdXJcbiAqIHVzZSBvZiB0aGUgUHJvZ3JhbS4gQnkgaW5zdGFsbGluZyBhbmQvb3IgdXNpbmcgdGhlXG4gKiBQcm9ncmFtLCB5b3UgYWdyZWUgdG8gYWJpZGUgYnkgYWxsIHRoZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMgc3RhdGVkIG9yIHJlZmVyZW5jZWQgaGVyZWluLlxuICpcbiAqIElmIHlvdSBkbyBub3QgYWdyZWUgdG8gYWJpZGUgYnkgdGhlc2UgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zLCBkbyBub3QgZGVtb25zdHJhdGUgeW91ciBhY2NlcHRhbmNlIGFuZCBkb1xuICogbm90IGluc3RhbGwgb3IgdXNlIHRoZSBQcm9ncmFtLlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbG9uZ1xuICogd2l0aCB0aGlzIGZpbGUuIElmIG5vdCwgc2VlXG4gKiA8aHR0cDovL3Jlc291cmNlcy5zcGluYWxjb20uY29tL2xpY2Vuc2VzLnBkZj4uXG4gKi9cblxuaW1wb3J0IHNwaW5hbENvcmUgZnJvbSBcInNwaW5hbC1jb3JlLWNvbm5lY3RvcmpzXCI7XG5pbXBvcnQge1xuICBndWlkXG59IGZyb20gXCIuLi9VdGlsaXRpZXNcIjtcbmltcG9ydCBTcGluYWxOb2RlUG9pbnRlciBmcm9tIFwiLi4vU3BpbmFsTm9kZVBvaW50ZXJcIjtcblxuY29uc3QgZ2xvYmFsVHlwZSA9IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB3aW5kb3c7XG5cbmltcG9ydCB7XG4gIFNwaW5hbFJlbGF0aW9uRmFjdG9yeVxufSBmcm9tIFwiLi4vUmVsYXRpb25zL1NwaW5hbFJlbGF0aW9uRmFjdG9yeVwiO1xuaW1wb3J0IFNwaW5hbE1hcCBmcm9tIFwiLi4vU3BpbmFsTWFwXCI7XG5pbXBvcnQgU3BpbmFsU2V0IGZyb20gXCIuLi9TcGluYWxTZXRcIjtcblxuY29uc3QgREVGQVVMVF9QUkVESUNBVEUgPSAoKSA9PiB0cnVlO1xuXG5jbGFzcyBTcGluYWxOb2RlIGV4dGVuZHMgZ2xvYmFsVHlwZS5Nb2RlbCB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIFNwaW5hbE5vZGUgY2xhc3MuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIE5hbWUgb2YgdGhlIG5vZGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgVHlwZSBvZiB0aGUgbm9kZVxuICAgKiBAcGFyYW0ge1NwaW5hbE5vZGUgfCBNb2RlbH0gZWxlbWVudCBFbGVtZW50IG9mIHRoZSBub2RlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihuYW1lID0gXCJ1bmRlZmluZWRcIiwgdHlwZSA9IFwiU3BpbmFsTm9kZVwiLCBlbGVtZW50KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmFkZF9hdHRyKHtcbiAgICAgIGluZm86IHtcbiAgICAgICAgaWQ6IGd1aWQodGhpcy5jb25zdHJ1Y3Rvci5uYW1lKSxcbiAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgIH0sXG4gICAgICBwYXJlbnRzOiBuZXcgU3BpbmFsTWFwKCksXG4gICAgICBjaGlsZHJlbjogbmV3IFNwaW5hbE1hcCgpLFxuICAgICAgZWxlbWVudDogKGVsZW1lbnQgIT09IHVuZGVmaW5lZCkgPyBuZXcgU3BpbmFsTm9kZVBvaW50ZXIoZWxlbWVudCkgOiB1bmRlZmluZWQsXG4gICAgICBjb250ZXh0SWRzOiBuZXcgU3BpbmFsU2V0KClcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBpZC5cbiAgICogQHJldHVybnMge1N0cn0gSWQgb2YgdGhlIG5vZGVcbiAgICovXG4gIGdldElkKCkge1xuICAgIHJldHVybiB0aGlzLmluZm8uaWQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbmFtZS5cbiAgICogQHJldHVybnMge1N0cn0gTmFtZSBvZiB0aGUgbm9kZVxuICAgKi9cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbmZvLm5hbWU7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdHlwZS5cbiAgICogQHJldHVybnMge1N0cn0gVHlwZSBvZiB0aGUgbm9kZVxuICAgKi9cbiAgZ2V0VHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbmZvLnR5cGU7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZWxlbWVudC5cbiAgICogQHJldHVybnMge1Byb21pc2U8Kj59IEEgcHJvbWlzZSB3aGVyZSB0aGUgcGFyYW1ldGVyIG9mIHRoZSByZXNvbHZlIG1ldGhvZCBpcyB0aGUgZWxlbWVudFxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuZWxlbWVudCA9IG5ldyBTcGluYWxOb2RlUG9pbnRlcihuZXcgZ2xvYmFsVHlwZS5Nb2RlbCgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5lbGVtZW50LmxvYWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFsbCB0aGUgY2hpbGRyZW4gaWRzIGluIGFuIGFycmF5LlxuICAgKiBAcmV0dXJucyB7QXJyYXk8U3RyaW5nPn0gSWRzIG9mIHRoZSBjaGlsZHJlblxuICAgKi9cbiAgZ2V0Q2hpbGRyZW5JZHMoKSB7XG4gICAgbGV0IG5vZGVDaGlsZHJlbklkcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgcmVsYXRpb25NYXAgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgZm9yIChsZXQgcmVsYXRpb24gb2YgcmVsYXRpb25NYXApIHtcbiAgICAgICAgbGV0IHJlbENoaWxkcmVuSWRzID0gcmVsYXRpb24uZ2V0Q2hpbGRyZW5JZHMoKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlbENoaWxkcmVuSWRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgbm9kZUNoaWxkcmVuSWRzLnB1c2gocmVsQ2hpbGRyZW5JZHNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub2RlQ2hpbGRyZW5JZHM7XG4gIH1cblxuICAvKipcbiAgICogQ29tcHV0ZXMgYW5kIHJldHVybnMgdGhlIG51bWJlciBvZiBjaGlsZHJlbiBvZiB0aGUgbm9kZS5cbiAgICogQHJldHVybnMge051bWJlcn0gVGhlIG51bWJlciBvZiBjaGlsZHJlblxuICAgKi9cbiAgZ2V0TmJDaGlsZHJlbigpIHtcbiAgICBsZXQgY2hpbGRyZW5JZHMgPSB0aGlzLmdldENoaWxkcmVuSWRzKCk7XG5cbiAgICByZXR1cm4gY2hpbGRyZW5JZHMubGVuZ3RoO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYW4gaWQgdG8gdGhlIGNvbnRleHQgaWRzIG9mIHRoZSBub2RlLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gaWQgSWQgb2YgdGhlIGNvbnRleHRcbiAgICovXG4gIGFkZENvbnRleHRJZChpZCkge1xuICAgIGlmICghdGhpcy5jb250ZXh0SWRzLmhhcyhpZCkpIHtcbiAgICAgIHRoaXMuY29udGV4dElkcy5hZGQoaWQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbGlzdCBvZiB0aGUgY29udGV4dHMgdGhlIG5vZGUgaXMgYXNzb2NpYXRlZCB0by5cbiAgICogQHJldHVybnMge0FycmF5PFN0cmluZz59IEFuIGFycmF5IG9mIGlkcyBvZiB0aGUgYXNzb2NpYXRlZCBjb250ZXh0c1xuICAgKi9cbiAgZ2V0Q29udGV4dElkcygpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0SWRzLnZhbHVlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgbm9kZSBiZWxvbmdzIHRvIHRoZSBjb250ZXh0LlxuICAgKiBAcGFyYW0ge1NwaW5hbENvbnRleHR9IGNvbnRleHQgVGhlIGNvbnRleHQgdGhhdCBtaWdodCBvd24gdGhlIG5vZGVcbiAgICogQHJldHVybnMge0Jvb2xlYW59IEEgYm9vbGVhblxuICAgKi9cbiAgYmVsb25nc1RvQ29udGV4dChjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGV4dElkcy5oYXMoY29udGV4dC5nZXRJZCgpLmdldCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWZXJpZnkgaWYgdGhlIG5vZGUgY29udGFpbnMgdGhlIHJlbGF0aW9uIG5hbWUuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSByZWxhdGlvbk5hbWUgTmFtZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHJlbGF0aW9uVHlwZSBUeXBlIG9mIHRoZSByZWxhdGlvblxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJuIHRydWUgaXMgdGhlIHJlbGF0aW9uIGlzIGNvbnRhaW5lZCBpbiB0aGUgbm9kZSBhbmQgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKi9cbiAgaGFzUmVsYXRpb24ocmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpIHtcbiAgICBjb25zdCB0eXBlTWFwID0gdGhpcy5fZ2V0Q2hpbGRyZW5UeXBlKHJlbGF0aW9uVHlwZSk7XG5cbiAgICBpZiAodHlwZW9mIHR5cGVNYXAgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHR5cGVNYXAuaGFzKHJlbGF0aW9uTmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogVmVyaWZ5IGlmIHRoZSBub2RlIGNvbnRhaW5zIGFsbCB0aGUgcmVsYXRpb24gbmFtZXMuXG4gICAqIEBwYXJhbSB7QXJyYXk8U3RyaW5nPn0gcmVsYXRpb25OYW1lcyBBcnJheSBjb250YWluaW5nIGFsbCB0aGUgcmVsYXRpb24gbmFtZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gcmVsYXRpb25UeXBlIFR5cGUgb2YgdGhlIHJlbGF0aW9uc1xuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJuIHRydWUgaWYgdGhlIG5vZGUgY29udGFpbnMgYWxsIHRoZSByZWxhdGlvbnMgaW4gcmVsYXRpb25OYW1lcywgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKi9cbiAgaGFzUmVsYXRpb25zKHJlbGF0aW9uTmFtZXMsIHJlbGF0aW9uVHlwZSkge1xuICAgIGxldCByZXMgPSB0cnVlO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZWxhdGlvbk5hbWVzLmxlbmd0aCAmJiByZXM7IGkrKykge1xuICAgICAgcmVzID0gdGhpcy5oYXNSZWxhdGlvbihyZWxhdGlvbk5hbWVzW2ldLCByZWxhdGlvblR5cGUpO1xuICAgIH1cblxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbGwgdGhlIHJlbGF0aW9uIG5hbWVzIG9mIHRoZSBub2RlLlxuICAgKiBAcmV0dXJucyB7QXJyYXk8U3RyaW5nPn0gVGhlIG5hbWVzIG9mIHRoZSByZWxhdGlvbnMgb2YgdGhlIG5vZGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGdldFJlbGF0aW9uTmFtZXMoKSB7XG4gICAgY29uc3QgbmFtZXMgPSBbXTtcblxuICAgIGZvciAobGV0IHJlbGF0aW9uTWFwIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgIG5hbWVzLnB1c2goLi4ucmVsYXRpb25NYXAua2V5cygpKTtcbiAgICB9XG5cbiAgICAvLyBSZW1vdmVzIGFsbCBkdXBsaWNhdGVzXG4gICAgcmV0dXJuIEFycmF5LmZyb20obmV3IFNldChuYW1lcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCB0aGUgbm9kZSBhcyBjaGlsZCBvZiB0aGUgcmVsYXRpb24uXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZSB8IE1vZGVsfSBjaGlsZCBFbGVtZW50IHRvIGFkZCBhcyBjaGlsZFxuICAgKiBAcGFyYW0ge1N0cmluZ30gcmVsYXRpb25OYW1lIE5hbWUgb2YgdGhlIHJlbGF0aW9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSByZWxhdGlvblR5cGUgVHlwZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHJldHVybnMge1Byb21pc2U8U3BpbmFsTm9kZT59IFRoZSBjaGlsZCBub2RlIGluIGEgcHJvbWlzZVxuICAgKi9cbiAgYXN5bmMgYWRkQ2hpbGQoY2hpbGQsIHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKSB7XG4gICAgbGV0IHJlbGF0aW9uO1xuXG4gICAgaWYgKCEoY2hpbGQgaW5zdGFuY2VvZiBnbG9iYWxUeXBlLk1vZGVsKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcIkNhbm5vdCBhZGQgYSBjaGlsZCB3aXRjaCBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgU3BpbmFsTm9kZSBvciBNb2RlbC5cIlxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKCEoY2hpbGQgaW5zdGFuY2VvZiBTcGluYWxOb2RlKSkge1xuICAgICAgY2hpbGQgPSBuZXcgU3BpbmFsTm9kZSh1bmRlZmluZWQsIHVuZGVmaW5lZCwgY2hpbGQpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5oYXNSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSkpIHtcbiAgICAgIHJlbGF0aW9uID0gdGhpcy5fY3JlYXRlUmVsYXRpb24ocmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZWxhdGlvbiA9IHRoaXMuX2dldFJlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKTtcbiAgICB9XG5cbiAgICBhd2FpdCByZWxhdGlvbi5hZGRDaGlsZChjaGlsZCk7XG4gICAgcmV0dXJuIGNoaWxkO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjaGlsZCBhbmQgbm90aWNlcyB0aGUgY29udGV4dCBpZiBhIG5ldyByZWxhdGlvbiB3YXMgY3JlYXRlZC5cbiAgICogQHBhcmFtIHtTcGluYWxOb2RlIHwgTW9kZWx9IGNoaWxkIE5vZGUgdG8gYWRkIGFzIGNoaWxkXG4gICAqIEBwYXJhbSB7U3RyaW5nfSByZWxhdGlvbk5hbWUgTmFtZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHJlbGF0aW9uVHlwZSBUeXBlIG9mIHRoZSByZWxhdGlvblxuICAgKiBAcGFyYW0ge1NwaW5hbENvbnRleHR9IGNvbnRleHQgQ29udGV4dCB0byB1cGRhdGVcbiAgICogQHJldHVybnMge1Byb21pc2U8U3BpbmFsTm9kZT59IFRoZSBjaGlsZCBub2RlIGluIGEgcHJvbWlzZVxuICAgKi9cbiAgYXN5bmMgYWRkQ2hpbGRJbkNvbnRleHQoY2hpbGQsIHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlLCBjb250ZXh0KSB7XG4gICAgbGV0IHJlbGF0aW9uO1xuXG4gICAgaWYgKCEoY2hpbGQgaW5zdGFuY2VvZiBnbG9iYWxUeXBlLk1vZGVsKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcIkNhbm5vdCBhZGQgYSBjaGlsZCB3aXRjaCBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgU3BpbmFsTm9kZSBvciBNb2RlbC5cIlxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKCEoY2hpbGQgaW5zdGFuY2VvZiBTcGluYWxOb2RlKSkge1xuICAgICAgY2hpbGQgPSBuZXcgU3BpbmFsTm9kZSh1bmRlZmluZWQsIHVuZGVmaW5lZCwgY2hpbGQpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5oYXNSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSkpIHtcbiAgICAgIHJlbGF0aW9uID0gdGhpcy5fY3JlYXRlUmVsYXRpb24ocmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZWxhdGlvbiA9IHRoaXMuX2dldFJlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKTtcbiAgICB9XG5cbiAgICBjaGlsZC5hZGRDb250ZXh0SWQoY29udGV4dC5nZXRJZCgpLmdldCgpKTtcbiAgICByZWxhdGlvbi5hZGRDb250ZXh0SWQoY29udGV4dC5nZXRJZCgpLmdldCgpKTtcblxuICAgIGF3YWl0IHJlbGF0aW9uLmFkZENoaWxkKGNoaWxkKTtcbiAgICByZXR1cm4gY2hpbGQ7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgbm9kZSBmcm9tIHRoZSByZWxhdGlvbiBjaGlsZHJlbi5cbiAgICogQHBhcmFtIHtTcGluYWxOb2RlfSBub2RlIE5vZGUgdG8gcmVtb3ZlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSByZWxhdGlvbk5hbWUgTmFtZSBvZiB0aGUgcmVsYXRpb24gdG8gd2ljaCB0aGUgbm9kZSBiZWxvbmdzXG4gICAqIEBwYXJhbSB7U3RyaW5nfSByZWxhdGlvblR5cGUgVHlwZSBvZiB0aGUgcmVsYXRpb24gdG8gd2ljaCB0aGUgbm9kZSBiZWxvbmdzXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPG5vdGhpbmc+fSBBbiBlbXB0eSBwcm9taXNlXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiBSZWxhdGlvbiBkb2Vzbid0IGV4aXN0XG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgY2hpbGQgZG9lc24ndCBleGlzdFxuICAgKi9cbiAgcmVtb3ZlQ2hpbGQobm9kZSwgcmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpIHtcbiAgICBpZiAoIXRoaXMuaGFzUmVsYXRpb24ocmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpKSB7XG4gICAgICB0aHJvdyBFcnJvcihcIlRoZSByZWxhdGlvbiBkb2Vzbid0IGV4aXN0XCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbCA9IHRoaXMuX2dldFJlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKTtcbiAgICByZXR1cm4gcmVsLnJlbW92ZUNoaWxkKG5vZGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgY2hpbGRyZW4gd2l0aCB0aGUgcmVsYXRpb24gbmFtZXMuXG4gICAqIEBwYXJhbSB7QXJyYXk8U3RyaW5nPn0gcmVsYXRpb25OYW1lcyBOYW1lcyBvZiB0aGUgcmVsYXRpb25zIHRvIGVtcHR5XG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PEJvb2xlYW4+Pn0gQSBwcm9taXNlIGNvbnRhaW5pbmcgYW4gYXJyYXkgb2YgYm9vbGVhblxuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgb25lIG9mIHRoZSBub2RlcyBpcyBub3QgYSBjaGlsZFxuICAgKi9cbiAgYXN5bmMgcmVtb3ZlQ2hpbGRyZW4ocmVsYXRpb25OYW1lcykge1xuICAgIGlmIChyZWxhdGlvbk5hbWVzID09PSB1bmRlZmluZWQgfHwgcmVsYXRpb25OYW1lcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJlbGF0aW9uTmFtZXMgPSB0aGlzLmdldFJlbGF0aW9uTmFtZXMoKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiByZWxhdGlvbk5hbWVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICByZWxhdGlvbk5hbWVzID0gW3JlbGF0aW9uTmFtZXNdO1xuICAgIH1cblxuICAgIGNvbnN0IHByb21pc2VzID0gW107XG5cbiAgICBmb3IgKGxldCByZWxhdGlvbk1hcCBvZiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICBmb3IgKGxldCByZWxhdGlvbk5hbWUgb2YgcmVsYXRpb25OYW1lcykge1xuICAgICAgICBpZiAocmVsYXRpb25NYXAuaGFzKHJlbGF0aW9uTmFtZSkpIHtcbiAgICAgICAgICBjb25zdCByZWxhdGlvbiA9IHJlbGF0aW9uTWFwLmdldEVsZW1lbnQocmVsYXRpb25OYW1lKTtcbiAgICAgICAgICBwcm9taXNlcy5wdXNoKHJlbGF0aW9uLnJlbW92ZUNoaWxkcmVuKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSB0aGUgbm9kZSBmcm9tIHRoZSBncmFwaCBpLmUgcmVtb3ZlIHRoZSBub2RlIGZyb20gYWxsIHRoZSBwYXJlbnQgcmVsYXRpb25zIGFuZCByZW1vdmUgYWxsIHRoZSBjaGlsZHJlbiByZWxhdGlvbnMuXG4gICAqIFRoaXMgb3BlcmF0aW9uIG1pZ2h0IGRlbGV0ZSBhbGwgdGhlIHN1Yi1ncmFwaCB1bmRlciB0aGlzIG5vZGUuXG4gICAqIEFmdGVyIHRoaXMgb3BlcmF0aW9uIHRoZSBub2RlIGNhbiBiZSBkZWxldGVkIHdpdGhvdXQgZmVhci5cbiAgICogQHJldHVybnMge1Byb21pc2U8bm90aGluZz59IEFuIGVtcHR5IHByb21pc2VcbiAgICovXG4gIGFzeW5jIHJlbW92ZUZyb21HcmFwaCgpIHtcbiAgICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICB0aGlzLl9yZW1vdmVGcm9tUGFyZW50cygpLFxuICAgICAgdGhpcy5fcmVtb3ZlRnJvbUNoaWxkcmVuKClcbiAgICBdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjaGlsZHJlbiBvZiB0aGUgbm9kZSBmb3IgdGhlIHJlbGF0aW9uIG5hbWVzLlxuICAgKiBAcGFyYW0ge0FycmF5PFN0cmluZz59IHJlbGF0aW9uTmFtZXMgQXJyYXkgY29udGFpbmluZyB0aGUgcmVsYXRpb24gbmFtZXMgb2YgdGhlIGRlc2lyZWQgY2hpbGRyZW5cbiAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8U3BpbmFsTm9kZT4+fSBUaGUgY2hpbGRyZW4gdGhhdCB3ZXJlIGZvdW5kXG4gICAqL1xuICBhc3luYyBnZXRDaGlsZHJlbihyZWxhdGlvbk5hbWVzKSB7XG4gICAgaWYgKHR5cGVvZiByZWxhdGlvbk5hbWVzID09PSBcInVuZGVmaW5lZFwiIHx8IHJlbGF0aW9uTmFtZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZWxhdGlvbk5hbWVzID0gdGhpcy5nZXRSZWxhdGlvbk5hbWVzKCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcmVsYXRpb25OYW1lcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgcmVsYXRpb25OYW1lcyA9IFtyZWxhdGlvbk5hbWVzXTtcbiAgICB9XG5cbiAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgcmVsYXRpb25NYXAgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByZWxhdGlvbk5hbWVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChyZWxhdGlvbk1hcC5oYXMocmVsYXRpb25OYW1lc1tqXSkpIHtcbiAgICAgICAgICBjb25zdCByZWxhdGlvbiA9IHJlbGF0aW9uTWFwLmdldEVsZW1lbnQocmVsYXRpb25OYW1lc1tqXSk7XG4gICAgICAgICAgcHJvbWlzZXMucHVzaChyZWxhdGlvbi5nZXRDaGlsZHJlbigpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNoaWxkcmVuTHN0ID0gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIGxldCByZXMgPSBbXTtcblxuICAgIGZvciAobGV0IGNoaWxkcmVuIG9mIGNoaWxkcmVuTHN0KSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlcy5wdXNoKGNoaWxkcmVuW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgY2hpbGRyZW4gb2YgdGhlIG5vZGUgdGhhdCBhcmUgcmVnaXN0ZXJlZCBpbiB0aGUgY29udGV4dFxuICAgKiBAcGFyYW0ge1NwaW5hbENvbnRleHR9IGNvbnRleHQgQ29udGV4dCB0byB1c2UgZm9yIHRoZSBzZWFyY2hcbiAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8U3BpbmFsTm9kZT4+fSBUaGUgY2hpbGRyZW4gdGhhdCB3ZXJlIGZvdW5kXG4gICAqL1xuICBhc3luYyBnZXRDaGlsZHJlbkluQ29udGV4dChjb250ZXh0KSB7XG4gICAgaWYgKHR5cGVvZiBjb250ZXh0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJZb3UgbXVzdCBnaXZlIGEgY29udGV4dFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgcmVsYXRpb25NYXAgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgZm9yIChsZXQgcmVsYXRpb24gb2YgcmVsYXRpb25NYXApIHtcbiAgICAgICAgaWYgKHJlbGF0aW9uLmJlbG9uZ3NUb0NvbnRleHQoY29udGV4dCkpIHtcbiAgICAgICAgICBwcm9taXNlcy5wdXNoKHJlbGF0aW9uLmdldENoaWxkcmVuSW5Db250ZXh0KGNvbnRleHQpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNoaWxkcmVuTHN0ID0gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIGxldCByZXMgPSBbXTtcblxuICAgIGZvciAobGV0IGNoaWxkcmVuIG9mIGNoaWxkcmVuTHN0KSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlcy5wdXNoKGNoaWxkcmVuW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhbGwgcGFyZW50cyBmb3IgdGhlIHJlbGF0aW9uIG5hbWVzIG5vIG1hdHRlciB0aGUgdHlwZSBvZiByZWxhdGlvblxuICAgKiBAcGFyYW0ge0FycmF5PFN0cmluZz59IHJlbGF0aW9uTmFtZXMgQXJyYXkgY29udGFpbmluZyB0aGUgcmVsYXRpb24gbmFtZXMgb2YgdGhlIGRlc2lyZWQgcGFyZW50c1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxTcGluYWxOb2RlPj59IFByb21pc2UgY29udGFpbmluZyB0aGUgcGFyZW50cyB0aGF0IHdlcmUgZm91bmRcbiAgICovXG4gIGdldFBhcmVudHMocmVsYXRpb25OYW1lcykge1xuICAgIGNvbnN0IHByb21pc2VzID0gW107XG5cbiAgICBpZiAodHlwZW9mIHJlbGF0aW9uTmFtZXMgPT09IFwidW5kZWZpbmVkXCIgfHwgcmVsYXRpb25OYW1lcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJlbGF0aW9uTmFtZXMgPSB0aGlzLnBhcmVudHMua2V5cygpO1xuICAgIH1cbiAgICBmb3IgKGxldCBuYW1lIG9mIHJlbGF0aW9uTmFtZXMpIHtcbiAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLnBhcmVudHMuZ2V0RWxlbWVudChuYW1lKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHByb21pc2VzLnB1c2gobGlzdFtpXS5sb2FkKCkudGhlbihyZWxhdGlvbiA9PiB7XG4gICAgICAgICAgcmV0dXJuIHJlbGF0aW9uLmdldFBhcmVudCgpO1xuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gIH1cblxuICAvKipcbiAgICogUmVjdXJzaXZlbHkgZmluZHMgYWxsIHRoZSBjaGlsZHJlbiBub2RlcyBmb3Igd2hpY2ggdGhlIHByZWRpY2F0ZSBpcyB0cnVlLlxuICAgKiBAcGFyYW0ge0FycmF5PFN0cmluZz59IHJlbGF0aW9uTmFtZXMgQXJyYXkgY29udGFpbmluZyB0aGUgcmVsYXRpb24gbmFtZXMgdG8gZm9sbG93XG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IHByZWRpY2F0ZSBGdW5jdGlvbiByZXR1cm5pbmcgdHJ1ZSBpZiB0aGUgbm9kZSBuZWVkcyB0byBiZSByZXR1cm5lZFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxTcGluYWxOb2RlPj59IFRoZSBub2RlcyB0aGF0IHdlcmUgZm91bmRcbiAgICovXG4gIGFzeW5jIGZpbmQocmVsYXRpb25OYW1lcywgcHJlZGljYXRlID0gREVGQVVMVF9QUkVESUNBVEUpIHtcbiAgICBpZiAodHlwZW9mIHByZWRpY2F0ZSAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJwcmVkaWNhdGUgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICAgIH1cblxuICAgIGxldCBzZWVuID0gbmV3IFNldChbdGhpc10pO1xuICAgIGxldCBwcm9taXNlcyA9IFtdO1xuICAgIGxldCBuZXh0R2VuID0gW3RoaXNdO1xuICAgIGxldCBjdXJyZW50R2VuID0gW107XG4gICAgbGV0IGZvdW5kID0gW107XG5cbiAgICB3aGlsZSAobmV4dEdlbi5sZW5ndGgpIHtcbiAgICAgIGN1cnJlbnRHZW4gPSBuZXh0R2VuO1xuICAgICAgcHJvbWlzZXMgPSBbXTtcbiAgICAgIG5leHRHZW4gPSBbXTtcblxuICAgICAgZm9yIChsZXQgbm9kZSBvZiBjdXJyZW50R2VuKSB7XG4gICAgICAgIHByb21pc2VzLnB1c2gobm9kZS5nZXRDaGlsZHJlbihyZWxhdGlvbk5hbWVzKSk7XG5cbiAgICAgICAgaWYgKHByZWRpY2F0ZShub2RlKSkge1xuICAgICAgICAgIGZvdW5kLnB1c2gobm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGV0IGNoaWxkcmVuQXJyYXlzID0gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuXG4gICAgICBmb3IgKGxldCBjaGlsZHJlbiBvZiBjaGlsZHJlbkFycmF5cykge1xuICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBjaGlsZHJlbikge1xuICAgICAgICAgIGlmICghc2Vlbi5oYXMoY2hpbGQpKSB7XG4gICAgICAgICAgICBuZXh0R2VuLnB1c2goY2hpbGQpO1xuICAgICAgICAgICAgc2Vlbi5hZGQoY2hpbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmb3VuZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWN1cnNpdmVseSBmaW5kcyBhbGwgdGhlIGNoaWxkcmVuIG5vZGVzIGluIHRoZSBjb250ZXh0IGZvciB3aGljaCB0aGUgcHJlZGljYXRlIGlzIHRydWUuLlxuICAgKiBAcGFyYW0ge1NwaW5hbENvbnRleHR9IGNvbnRleHQgQ29udGV4dCB0byB1c2UgZm9yIHRoZSBzZWFyY2hcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gcHJlZGljYXRlIEZ1bmN0aW9uIHJldHVybmluZyB0cnVlIGlmIHRoZSBub2RlIG5lZWRzIHRvIGJlIHJldHVybmVkXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PFNwaW5hbE5vZGU+Pn0gVGhlIG5vZGVzIHRoYXQgd2VyZSBmb3VuZFxuICAgKi9cbiAgYXN5bmMgZmluZEluQ29udGV4dChjb250ZXh0LCBwcmVkaWNhdGUgPSBERUZBVUxUX1BSRURJQ0FURSkge1xuICAgIGlmICh0eXBlb2YgcHJlZGljYXRlICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBwcmVkaWNhdGUgZnVuY3Rpb24gbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICAgIH1cblxuICAgIGxldCBzZWVuID0gbmV3IFNldChbdGhpc10pO1xuICAgIGxldCBwcm9taXNlcyA9IFtdO1xuICAgIGxldCBuZXh0R2VuID0gW3RoaXNdO1xuICAgIGxldCBjdXJyZW50R2VuID0gW107XG4gICAgbGV0IGZvdW5kID0gW107XG5cbiAgICB3aGlsZSAobmV4dEdlbi5sZW5ndGgpIHtcbiAgICAgIGN1cnJlbnRHZW4gPSBuZXh0R2VuO1xuICAgICAgcHJvbWlzZXMgPSBbXTtcbiAgICAgIG5leHRHZW4gPSBbXTtcblxuICAgICAgZm9yIChsZXQgbm9kZSBvZiBjdXJyZW50R2VuKSB7XG4gICAgICAgIHByb21pc2VzLnB1c2gobm9kZS5nZXRDaGlsZHJlbkluQ29udGV4dChjb250ZXh0KSk7XG5cbiAgICAgICAgaWYgKHByZWRpY2F0ZShub2RlKSkge1xuICAgICAgICAgIGZvdW5kLnB1c2gobm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGV0IGNoaWxkcmVuQXJyYXlzID0gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuXG4gICAgICBmb3IgKGxldCBjaGlsZHJlbiBvZiBjaGlsZHJlbkFycmF5cykge1xuICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBjaGlsZHJlbikge1xuICAgICAgICAgIGlmICghc2Vlbi5oYXMoY2hpbGQpKSB7XG4gICAgICAgICAgICBuZXh0R2VuLnB1c2goY2hpbGQpO1xuICAgICAgICAgICAgc2Vlbi5hZGQoY2hpbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmb3VuZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWN1cnNpdmVseSBhcHBsaWVzIGEgZnVuY3Rpb24gdG8gYWxsIHRoZSBjaGlsZHJlbiBub2Rlcy5cbiAgICogQHBhcmFtIHtBcnJheTxTdHJpbmc+fSByZWxhdGlvbk5hbWVzIEFycmF5IGNvbnRhaW5pbmcgdGhlIHJlbGF0aW9uIG5hbWVzIHRvIGZvbGxvd1xuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBGdW5jdGlvbiB0byBhcHBseSB0byB0aGUgbm9kZXNcbiAgICovXG4gIGFzeW5jIGZvckVhY2gocmVsYXRpb25OYW1lcywgY2FsbGJhY2spIHtcbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aHJvdyBFcnJvcihcIllvdSBtdXN0IGdpdmUgYSBjYWxsYmFjayBmdW5jdGlvblwiKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgY2FsbGJhY2sgZnVuY3Rpb24gbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICAgIH1cblxuICAgIGxldCBub2RlcyA9IGF3YWl0IHRoaXMuZmluZChyZWxhdGlvbk5hbWVzKTtcblxuICAgIGZvciAobGV0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgIGNhbGxiYWNrKG5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWN1cnNpdmVseSBhcHBsaWVzIGEgZnVuY3Rpb24gdG8gYWxsIHRoZSBjaGlsZHJlbiBub2RlcyBpbiB0aGUgY29udGV4dC5cbiAgICogQHBhcmFtIHtTcGluYWxDb250ZXh0fSBjb250ZXh0IENvbnRleHQgdG8gdXNlIGZvciB0aGUgc2VhcmNoXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIEZ1bmN0aW9uIHRvIGFwcGx5IHRvIHRoZSBub2Rlc1xuICAgKi9cbiAgYXN5bmMgZm9yRWFjaEluQ29udGV4dChjb250ZXh0LCBjYWxsYmFjaykge1xuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRocm93IEVycm9yKFwiWW91IG11c3QgZ2l2ZSBhIGNhbGxiYWNrIGZ1bmN0aW9uXCIpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBjYWxsYmFjayBmdW5jdGlvbiBtdXN0IGJlIGEgZnVuY3Rpb25cIik7XG4gICAgfVxuXG4gICAgbGV0IG5vZGVzID0gYXdhaXQgdGhpcy5maW5kSW5Db250ZXh0KGNvbnRleHQpO1xuXG4gICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xuICAgICAgY2FsbGJhY2sobm9kZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlY3Vyc2l2ZWx5IGFwcGxpZXMgYSBmdW5jdGlvbiB0byBhbGwgdGhlIGNoaWxkcmVuIG5vZGVzIGFuZCByZXR1cm5zIHRoZSByZXN1bHRzIGluIGFuIGFycmF5LlxuICAgKiBAcGFyYW0ge0FycmF5PFN0cmluZz59IHJlbGF0aW9uTmFtZXMgQXJyYXkgY29udGFpbmluZyB0aGUgcmVsYXRpb24gbmFtZXMgdG8gZm9sbG93XG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIEZ1bmN0aW9uIHRvIGFwcGx5IHRvIHRoZSBub2Rlc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTwqPj59IFRoZSByZXN1bHRzIG9mIHRoZSBjYWxsYmFjayBmb3IgZWFjaCBub2RlXG4gICAqL1xuICBhc3luYyBtYXAocmVsYXRpb25OYW1lcywgY2FsbGJhY2spIHtcbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aHJvdyBFcnJvcihcIllvdSBtdXN0IGdpdmUgYSBjYWxsYmFjayBmdW5jdGlvblwiKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgY2FsbGJhY2sgZnVuY3Rpb24gbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICAgIH1cblxuICAgIGxldCBub2RlcyA9IGF3YWl0IHRoaXMuZmluZChyZWxhdGlvbk5hbWVzKTtcbiAgICBsZXQgcmVzdWx0cyA9IFtdO1xuXG4gICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xuICAgICAgcmVzdWx0cy5wdXNoKGNhbGxiYWNrKG5vZGUpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWN1cnNpdmVseSBhcHBsaWVzIGEgZnVuY3Rpb24gdG8gYWxsIHRoZSBjaGlsZHJlbiBub2RlcyBpbiB0aGUgY29udGV4dCBhbmQgcmV0dXJucyB0aGUgcmVzdWx0cyBpbiBhbiBhcnJheS5cbiAgICogQHBhcmFtIHtTcGluYWxDb250ZXh0fSBjb250ZXh0IENvbnRleHQgdG8gdXNlIGZvciB0aGUgc2VhcmNoXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIEZ1bmN0aW9uIHRvIGFwcGx5IHRvIHRoZSBub2Rlc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTwqPj59IFRoZSByZXN1bHRzIG9mIHRoZSBjYWxsYmFjayBmb3IgZWFjaCBub2RlXG4gICAqL1xuICBhc3luYyBtYXBJbkNvbnRleHQoY29udGV4dCwgY2FsbGJhY2spIHtcbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aHJvdyBFcnJvcihcIllvdSBtdXN0IGdpdmUgYSBjYWxsYmFjayBmdW5jdGlvblwiKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgY2FsbGJhY2sgZnVuY3Rpb24gbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICAgIH1cblxuICAgIGxldCBub2RlcyA9IGF3YWl0IHRoaXMuZmluZEluQ29udGV4dChjb250ZXh0KTtcbiAgICBsZXQgcmVzdWx0cyA9IFtdO1xuXG4gICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xuICAgICAgcmVzdWx0cy5wdXNoKGNhbGxiYWNrKG5vZGUpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIHJlbGF0aW9uIGxpc3QgY29ycmVzcG9uZGluZyB0byB0aGUgcmVsYXRpb24gdHlwZS5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHJlbGF0aW9uVHlwZSBUeXBlIG9mIHRoZSByZWxhdGlvblxuICAgKiBAcmV0dXJucyB7U3BpbmFsTWFwfSBSZXR1cm4gdGhlIHJlbGF0aW9uIGxpc3QgY29ycmVzcG9uZGluZyB0byB0aGUgcmVsYXRpb24gdHlwZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2dldENoaWxkcmVuVHlwZShyZWxhdGlvblR5cGUpIHtcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5nZXRFbGVtZW50KHJlbGF0aW9uVHlwZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSByZWxhdGlvbiBjb3JyZXNwb25kaW5nLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcmVsYXRpb25OYW1lIE5hbWUgb2YgdGhlIHJlbGF0aW9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSByZWxhdGlvblR5cGUgVHlwZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHJldHVybnMge1NwaW5hbFJlbGF0aW9ufSBUaGUgcmVsYXRpb24gY29ycmVzcG9uZGluZ1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2dldFJlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldENoaWxkcmVuVHlwZShyZWxhdGlvblR5cGUpLmdldEVsZW1lbnQocmVsYXRpb25OYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgcGFyZW50IHJlbGF0aW9uIG9mIHRoZSBub2RlLlxuICAgKiBAcGFyYW0ge1NwaW5hbFJlbGF0aW9ufSByZWxhdGlvbiBSZWxhdGlvbiB0byByZW1vdmVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9yZW1vdmVQYXJlbnQocmVsYXRpb24pIHtcbiAgICBjb25zdCBwYXJlbnRMc3QgPSB0aGlzLnBhcmVudHMuZ2V0RWxlbWVudChyZWxhdGlvbi5nZXROYW1lKCkuZ2V0KCkpO1xuXG4gICAgY29uc3QgaW5kZXhUb1JlbW92ZSA9IHBhcmVudExzdC5pbmRleE9mKHBhcmVudFB0ciA9PlxuICAgICAgcGFyZW50UHRyLmdldElkKCkuZ2V0KCkgPT09IHJlbGF0aW9uLmdldElkKCkuZ2V0KClcbiAgICApO1xuXG4gICAgcGFyZW50THN0LnNwbGljZShpbmRleFRvUmVtb3ZlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBub2RlIGZyb20gYWxsIHBhcmVudCByZWxhdGlvbiB0aGUgcHJvcGVydHkgcGFyZW50cy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFzeW5jIF9yZW1vdmVGcm9tUGFyZW50cygpIHtcbiAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgcGFyZW50IG9mIHRoaXMucGFyZW50cykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJlbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcGFyZW50W2ldLmxvYWQoKS50aGVuKHBhcmVudFJlbCA9PiB7XG4gICAgICAgICAgcHJvbWlzZXMucHVzaChwYXJlbnRSZWwucmVtb3ZlQ2hpbGQodGhpcykpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgdGhlIHJlbGF0aW9uIGFzIHBhcmVudCBvZiB0aGUgbm9kZS5cbiAgICogQHBhcmFtIHtTcGluYWxSZWxhdGlvbn0gcmVsYXRpb24gUGFyZW50IHJlbGF0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfYWRkUGFyZW50KHJlbGF0aW9uKSB7XG4gICAgY29uc3QgcmVsYXRpb25OYW1lID0gcmVsYXRpb24uZ2V0TmFtZSgpLmdldCgpO1xuXG4gICAgaWYgKHRoaXMucGFyZW50cy5oYXMocmVsYXRpb25OYW1lKSkge1xuICAgICAgdGhpcy5wYXJlbnRzLmdldEVsZW1lbnQocmVsYXRpb25OYW1lKS5wdXNoKG5ldyBTcGluYWxOb2RlUG9pbnRlcihyZWxhdGlvbikpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBsaXN0ID0gbmV3IGdsb2JhbFR5cGUuTHN0KCk7XG4gICAgICBsaXN0LnB1c2gobmV3IFNwaW5hbE5vZGVQb2ludGVyKHJlbGF0aW9uKSk7XG4gICAgICB0aGlzLnBhcmVudHMuc2V0RWxlbWVudChyZWxhdGlvbk5hbWUsIGxpc3QpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgcmVsYXRpb24gZm9yIHRoaXMgbm9kZS5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHJlbGF0aW9uTmFtZSBOYW1lIG9mIHRoZSByZWxhdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gcmVsYXRpb25UeXBlIFR5cGUgb2YgdGhlIHJlbGF0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfY3JlYXRlUmVsYXRpb24ocmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpIHtcbiAgICBjb25zdCByZWxhdGlvbiA9IFNwaW5hbFJlbGF0aW9uRmFjdG9yeS5nZXROZXdSZWxhdGlvbih0aGlzLCByZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSk7XG5cbiAgICBpZiAoIXRoaXMuY2hpbGRyZW4uaGFzKHJlbGF0aW9uVHlwZSkpIHtcbiAgICAgIHRoaXMuY2hpbGRyZW4uc2V0RWxlbWVudChyZWxhdGlvblR5cGUsIG5ldyBTcGluYWxNYXAoKSk7XG4gICAgfVxuXG4gICAgdGhpcy5fZ2V0Q2hpbGRyZW5UeXBlKHJlbGF0aW9uVHlwZSkuc2V0RWxlbWVudChyZWxhdGlvbk5hbWUsIHJlbGF0aW9uKTtcbiAgICByZXR1cm4gcmVsYXRpb247XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFsbCBjaGlsZHJlbiByZWxhdGlvbiBmcm9tIHRoZSBncmFwaC5cbiAgICogQHJldHVybnMge1Byb21pc2U8bm90aGluZz59IEFuIGVtcHR5IHByb21pc2VcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFzeW5jIF9yZW1vdmVGcm9tQ2hpbGRyZW4oKSB7XG4gICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcblxuICAgIGZvciAobGV0IHJlbGF0aW9uTWFwIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgIGZvciAobGV0IHJlbGF0aW9uIG9mIHJlbGF0aW9uTWFwKSB7XG4gICAgICAgIHByb21pc2VzLnB1c2gocmVsYXRpb24ucmVtb3ZlRnJvbUdyYXBoKCkpO1xuICAgICAgfVxuICAgIH1cbiAgICBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gIH1cbn1cblxuc3BpbmFsQ29yZS5yZWdpc3Rlcl9tb2RlbHMoW1NwaW5hbE5vZGVdKTtcbmV4cG9ydCBkZWZhdWx0IFNwaW5hbE5vZGU7XG4iXX0=