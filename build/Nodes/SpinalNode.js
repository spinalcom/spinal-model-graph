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
  constructor(name = "undefined", type = "SpinalNode", element = new globalType.Model()) {
    super();
    this.add_attr({
      info: {
        id: (0, _Utilities.guid)(this.constructor.name),
        name: name,
        type: type
      },
      parents: new _SpinalMap.default(),
      children: new _SpinalMap.default(),
      element: new _SpinalNodePointer.default(element),
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
    let names = [];
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = this.children[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        let relationMap = _step3.value;
        names.push(...relationMap.keys());
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

    return names;
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
   * Remove the node from the relation children.
   * @param {SpinalNode} node Node to remove
   * @param {String} relationName Name of the relation to wich the node belongs
   * @param {String} relationType Type of the relation to wich the node belongs
   * @returns {Promise<Boolean>} A promise containing true if the node was a child
   */


  removeChild(node, relationName, relationType) {
    if (!this.hasRelation(relationName, relationType)) {
      return Promise.resolve(false);
    }

    const rel = this._getRelation(relationName, relationType);

    return rel.removeChild(node);
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
   */


  getChildren(relationNames) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      if (typeof relationNames === "undefined" || relationNames.length === 0) {
        relationNames = _this4.getRelationNames();
      } else if (typeof relationNames === "string") {
        relationNames = [relationNames];
      }

      const promises = [];
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = _this4.children[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          let relationMap = _step4.value;

          for (let j = 0; j < relationNames.length; j++) {
            if (relationMap.has(relationNames[j])) {
              const relation = relationMap.getElement(relationNames[j]);
              promises.push(relation.getChildren());
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

      const childrenLst = yield Promise.all(promises);
      let res = [];
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = childrenLst[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          let children = _step5.value;

          for (let i = 0; i < children.length; i++) {
            res.push(children[i]);
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

      return res;
    })();
  }
  /**
   * Return the children of the node that are registered in the context
   * @param {SpinalContext} context Context to use for the search
   * @returns {Promise<Array<SpinalNode>>} The children that were found
   */


  getChildrenInContext(context) {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      if (typeof context === "undefined") {
        throw new Error("You must give a context");
      }

      const promises = [];
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = _this5.children[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          let relationMap = _step6.value;
          var _iteratorNormalCompletion8 = true;
          var _didIteratorError8 = false;
          var _iteratorError8 = undefined;

          try {
            for (var _iterator8 = relationMap[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
              let relation = _step8.value;

              if (relation.belongsToContext(context)) {
                promises.push(relation.getChildrenInContext(context));
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
   * Return all parents for the relation names no matter the type of relation
   * @param {Array<String>} relationNames Array containing the relation names of the desired parents
   * @returns {Promise<Array<SpinalNode>>} Promise containing the parents that were found
   */


  getParents(relationNames) {
    const promises = [];

    if (typeof relationNames === "undefined" || relationNames.length === 0) {
      relationNames = this.parents.keys();
    }

    var _iteratorNormalCompletion9 = true;
    var _didIteratorError9 = false;
    var _iteratorError9 = undefined;

    try {
      for (var _iterator9 = relationNames[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
        let name = _step9.value;
        const list = this.parents.getElement(name);

        for (let i = 0; i < list.length; i++) {
          promises.push(list[i].load().then(relation => {
            return relation.getParent();
          }));
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

    return Promise.all(promises);
  }
  /**
   * Recursively finds all the children nodes for which the predicate is true.
   * @param {Array<String>} relationNames Array containing the relation names to follow
   * @param {function} predicate Function returning true if the node needs to be returned
   * @returns {Promise<Array<SpinalNode>>} The nodes that were found
   */


  find(relationNames, predicate = DEFAULT_PREDICATE) {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      if (typeof predicate !== "function") {
        throw new Error("predicate must be a function");
      }

      let seen = new Set([_this6]);
      let promises = [];
      let nextGen = [_this6];
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
        var _iteratorNormalCompletion10 = true;
        var _didIteratorError10 = false;
        var _iteratorError10 = undefined;

        try {
          for (var _iterator10 = childrenArrays[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
            let children = _step10.value;
            var _iteratorNormalCompletion11 = true;
            var _didIteratorError11 = false;
            var _iteratorError11 = undefined;

            try {
              for (var _iterator11 = children[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                let child = _step11.value;

                if (!seen.has(child)) {
                  nextGen.push(child);
                  seen.add(child);
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
    var _this7 = this;

    return _asyncToGenerator(function* () {
      if (typeof predicate !== "function") {
        throw new Error("The predicate function must be a function");
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

        for (var _i2 = 0; _i2 < currentGen.length; _i2++) {
          let node = currentGen[_i2];
          promises.push(node.getChildrenInContext(context));

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
   * Recursively applies a function to all the children nodes.
   * @param {Array<String>} relationNames Array containing the relation names to follow
   * @param {function} callback Function to apply to the nodes
   */


  forEach(relationNames, callback) {
    var _this8 = this;

    return _asyncToGenerator(function* () {
      if (typeof callback === "undefined") {
        throw Error("You must give a callback function");
      } else if (typeof callback !== "function") {
        throw new Error("The callback function must be a function");
      }

      let nodes = yield _this8.find(relationNames);
      var _iteratorNormalCompletion14 = true;
      var _didIteratorError14 = false;
      var _iteratorError14 = undefined;

      try {
        for (var _iterator14 = nodes[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
          let node = _step14.value;
          callback(node);
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
    })();
  }
  /**
   * Recursively applies a function to all the children nodes in the context.
   * @param {SpinalContext} context Context to use for the search
   * @param {function} callback Function to apply to the nodes
   */


  forEachInContext(context, callback) {
    var _this9 = this;

    return _asyncToGenerator(function* () {
      if (typeof callback === "undefined") {
        throw Error("You must give a callback function");
      } else if (typeof callback !== "function") {
        throw new Error("The callback function must be a function");
      }

      let nodes = yield _this9.findInContext(context);
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
   * Recursively applies a function to all the children nodes and returns the results in an array.
   * @param {Array<String>} relationNames Array containing the relation names to follow
   * @param {function} callback Function to apply to the nodes
   * @returns {Promise<Array<*>>} The results of the callback for each node
   */


  map(relationNames, callback) {
    var _this10 = this;

    return _asyncToGenerator(function* () {
      if (typeof callback === "undefined") {
        throw Error("You must give a callback function");
      } else if (typeof callback !== "function") {
        throw new Error("The callback function must be a function");
      }

      let nodes = yield _this10.find(relationNames);
      let results = [];
      var _iteratorNormalCompletion16 = true;
      var _didIteratorError16 = false;
      var _iteratorError16 = undefined;

      try {
        for (var _iterator16 = nodes[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
          let node = _step16.value;
          results.push(callback(node));
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
    var _this11 = this;

    return _asyncToGenerator(function* () {
      if (typeof callback === "undefined") {
        throw Error("You must give a callback function");
      } else if (typeof callback !== "function") {
        throw new Error("The callback function must be a function");
      }

      let nodes = yield _this11.findInContext(context);
      let results = [];
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
    var _this12 = this;

    return _asyncToGenerator(function* () {
      const promises = [];
      var _iteratorNormalCompletion18 = true;
      var _didIteratorError18 = false;
      var _iteratorError18 = undefined;

      try {
        for (var _iterator18 = _this12.parents[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
          let parent = _step18.value;

          for (let i = 0; i < parent.length; i++) {
            parent[i].load().then(parentRel => {
              promises.push(parentRel.removeChild(_this12));
            });
          }
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

      yield Promise.all(promises);
    })();
  }
  /**
   * Adds the relation as parent of the node.
   * @param {SpinalRelation} relation Parent relation
   * @private
   */


  _addParent(relation) {
    const relationName = relation.getName();

    if (this.parents.has(relationName.get())) {
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
    const relation = _SpinalRelationFactory.SpinalRelationFactory.getNewRelation(relationName, relationType);

    relation.setParent(this);

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
      var _iteratorNormalCompletion19 = true;
      var _didIteratorError19 = false;
      var _iteratorError19 = undefined;

      try {
        for (var _iterator19 = _this13.children[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
          let relationMap = _step19.value;
          var _iteratorNormalCompletion20 = true;
          var _didIteratorError20 = false;
          var _iteratorError20 = undefined;

          try {
            for (var _iterator20 = relationMap[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
              let relation = _step20.value;
              promises.push(relation.removeFromGraph());
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

}

_spinalCoreConnectorjs.default.register_models([SpinalNode]);

var _default = SpinalNode;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Ob2Rlcy9TcGluYWxOb2RlLmpzIl0sIm5hbWVzIjpbImdsb2JhbFR5cGUiLCJ3aW5kb3ciLCJnbG9iYWwiLCJERUZBVUxUX1BSRURJQ0FURSIsIlNwaW5hbE5vZGUiLCJNb2RlbCIsImNvbnN0cnVjdG9yIiwibmFtZSIsInR5cGUiLCJlbGVtZW50IiwiYWRkX2F0dHIiLCJpbmZvIiwiaWQiLCJwYXJlbnRzIiwiU3BpbmFsTWFwIiwiY2hpbGRyZW4iLCJTcGluYWxOb2RlUG9pbnRlciIsImNvbnRleHRJZHMiLCJTcGluYWxTZXQiLCJnZXRJZCIsImdldE5hbWUiLCJnZXRUeXBlIiwiZ2V0RWxlbWVudCIsImxvYWQiLCJnZXRDaGlsZHJlbklkcyIsIm5vZGVDaGlsZHJlbklkcyIsInJlbGF0aW9uTWFwIiwicmVsYXRpb24iLCJyZWxDaGlsZHJlbklkcyIsImkiLCJsZW5ndGgiLCJwdXNoIiwiZ2V0TmJDaGlsZHJlbiIsImNoaWxkcmVuSWRzIiwiYWRkQ29udGV4dElkIiwiaGFzIiwiYWRkIiwiZ2V0Q29udGV4dElkcyIsInZhbHVlcyIsImJlbG9uZ3NUb0NvbnRleHQiLCJjb250ZXh0IiwiZ2V0IiwiaGFzUmVsYXRpb24iLCJyZWxhdGlvbk5hbWUiLCJyZWxhdGlvblR5cGUiLCJ0eXBlTWFwIiwiX2dldENoaWxkcmVuVHlwZSIsImhhc1JlbGF0aW9ucyIsInJlbGF0aW9uTmFtZXMiLCJyZXMiLCJnZXRSZWxhdGlvbk5hbWVzIiwibmFtZXMiLCJrZXlzIiwiYWRkQ2hpbGQiLCJjaGlsZCIsIkVycm9yIiwidW5kZWZpbmVkIiwiX2NyZWF0ZVJlbGF0aW9uIiwiX2dldFJlbGF0aW9uIiwiYWRkQ2hpbGRJbkNvbnRleHQiLCJyZW1vdmVDaGlsZCIsIm5vZGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlbCIsInJlbW92ZUZyb21HcmFwaCIsImFsbCIsIl9yZW1vdmVGcm9tUGFyZW50cyIsIl9yZW1vdmVGcm9tQ2hpbGRyZW4iLCJnZXRDaGlsZHJlbiIsInByb21pc2VzIiwiaiIsImNoaWxkcmVuTHN0IiwiZ2V0Q2hpbGRyZW5JbkNvbnRleHQiLCJnZXRQYXJlbnRzIiwibGlzdCIsInRoZW4iLCJnZXRQYXJlbnQiLCJmaW5kIiwicHJlZGljYXRlIiwic2VlbiIsIlNldCIsIm5leHRHZW4iLCJjdXJyZW50R2VuIiwiZm91bmQiLCJjaGlsZHJlbkFycmF5cyIsImZpbmRJbkNvbnRleHQiLCJmb3JFYWNoIiwiY2FsbGJhY2siLCJub2RlcyIsImZvckVhY2hJbkNvbnRleHQiLCJtYXAiLCJyZXN1bHRzIiwibWFwSW5Db250ZXh0IiwiX3JlbW92ZVBhcmVudCIsInBhcmVudExzdCIsImluZGV4VG9SZW1vdmUiLCJpbmRleE9mIiwicGFyZW50UHRyIiwic3BsaWNlIiwicGFyZW50IiwicGFyZW50UmVsIiwiX2FkZFBhcmVudCIsIkxzdCIsInNldEVsZW1lbnQiLCJTcGluYWxSZWxhdGlvbkZhY3RvcnkiLCJnZXROZXdSZWxhdGlvbiIsInNldFBhcmVudCIsInNwaW5hbENvcmUiLCJyZWdpc3Rlcl9tb2RlbHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUF3QkE7O0FBQ0E7O0FBR0E7O0FBSUE7O0FBR0E7O0FBQ0E7Ozs7Ozs7O0FBTkEsTUFBTUEsVUFBVSxHQUFHLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NDLE1BQWhDLEdBQXlDRCxNQUE1RDs7QUFRQSxNQUFNRSxpQkFBaUIsR0FBRyxNQUFNLElBQWhDOztBQUVBLE1BQU1DLFVBQU4sU0FBeUJKLFVBQVUsQ0FBQ0ssS0FBcEMsQ0FBMEM7QUFDeEM7Ozs7OztBQU1BQyxFQUFBQSxXQUFXLENBQUNDLElBQUksR0FBRyxXQUFSLEVBQXFCQyxJQUFJLEdBQUcsWUFBNUIsRUFBMENDLE9BQU8sR0FBRyxJQUFJVCxVQUFVLENBQUNLLEtBQWYsRUFBcEQsRUFBMEU7QUFDbkY7QUFDQSxTQUFLSyxRQUFMLENBQWM7QUFDWkMsTUFBQUEsSUFBSSxFQUFFO0FBQ0pDLFFBQUFBLEVBQUUsRUFBRSxxQkFBSyxLQUFL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XG4gKiBDb3B5cmlnaHQgMjAxOCBTcGluYWxDb20gLSB3d3cuc3BpbmFsY29tLmNvbVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFNwaW5hbENvcmUuXG4gKlxuICogUGxlYXNlIHJlYWQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgdGVybXMgYW5kIGNvbmRpdGlvbnNcbiAqIG9mIHRoZSBGcmVlIFNvZnR3YXJlIGxpY2Vuc2UgQWdyZWVtZW50IChcIkFncmVlbWVudFwiKVxuICogY2FyZWZ1bGx5LlxuICpcbiAqIFRoaXMgQWdyZWVtZW50IGlzIGEgbGVnYWxseSBiaW5kaW5nIGNvbnRyYWN0IGJldHdlZW5cbiAqIHRoZSBMaWNlbnNlZSAoYXMgZGVmaW5lZCBiZWxvdykgYW5kIFNwaW5hbENvbSB0aGF0XG4gKiBzZXRzIGZvcnRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyB0aGF0IGdvdmVybiB5b3VyXG4gKiB1c2Ugb2YgdGhlIFByb2dyYW0uIEJ5IGluc3RhbGxpbmcgYW5kL29yIHVzaW5nIHRoZVxuICogUHJvZ3JhbSwgeW91IGFncmVlIHRvIGFiaWRlIGJ5IGFsbCB0aGUgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zIHN0YXRlZCBvciByZWZlcmVuY2VkIGhlcmVpbi5cbiAqXG4gKiBJZiB5b3UgZG8gbm90IGFncmVlIHRvIGFiaWRlIGJ5IHRoZXNlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucywgZG8gbm90IGRlbW9uc3RyYXRlIHlvdXIgYWNjZXB0YW5jZSBhbmQgZG9cbiAqIG5vdCBpbnN0YWxsIG9yIHVzZSB0aGUgUHJvZ3JhbS5cbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYWxvbmdcbiAqIHdpdGggdGhpcyBmaWxlLiBJZiBub3QsIHNlZVxuICogPGh0dHA6Ly9yZXNvdXJjZXMuc3BpbmFsY29tLmNvbS9saWNlbnNlcy5wZGY+LlxuICovXG5cbmltcG9ydCBzcGluYWxDb3JlIGZyb20gXCJzcGluYWwtY29yZS1jb25uZWN0b3Jqc1wiO1xuaW1wb3J0IHtcbiAgZ3VpZFxufSBmcm9tIFwiLi4vVXRpbGl0aWVzXCI7XG5pbXBvcnQgU3BpbmFsTm9kZVBvaW50ZXIgZnJvbSBcIi4uL1NwaW5hbE5vZGVQb2ludGVyXCI7XG5cbmNvbnN0IGdsb2JhbFR5cGUgPSB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogd2luZG93O1xuXG5pbXBvcnQge1xuICBTcGluYWxSZWxhdGlvbkZhY3Rvcnlcbn0gZnJvbSBcIi4uL1JlbGF0aW9ucy9TcGluYWxSZWxhdGlvbkZhY3RvcnlcIjtcbmltcG9ydCBTcGluYWxNYXAgZnJvbSBcIi4uL1NwaW5hbE1hcFwiO1xuaW1wb3J0IFNwaW5hbFNldCBmcm9tIFwiLi4vU3BpbmFsU2V0XCI7XG5cbmNvbnN0IERFRkFVTFRfUFJFRElDQVRFID0gKCkgPT4gdHJ1ZTtcblxuY2xhc3MgU3BpbmFsTm9kZSBleHRlbmRzIGdsb2JhbFR5cGUuTW9kZWwge1xuICAvKipcbiAgICogQ29uc3RydWN0b3IgZm9yIHRoZSBTcGluYWxOb2RlIGNsYXNzLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBOYW1lIG9mIHRoZSBub2RlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIFR5cGUgb2YgdGhlIG5vZGVcbiAgICogQHBhcmFtIHtTcGluYWxOb2RlIHwgTW9kZWx9IGVsZW1lbnQgRWxlbWVudCBvZiB0aGUgbm9kZVxuICAgKi9cbiAgY29uc3RydWN0b3IobmFtZSA9IFwidW5kZWZpbmVkXCIsIHR5cGUgPSBcIlNwaW5hbE5vZGVcIiwgZWxlbWVudCA9IG5ldyBnbG9iYWxUeXBlLk1vZGVsKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmFkZF9hdHRyKHtcbiAgICAgIGluZm86IHtcbiAgICAgICAgaWQ6IGd1aWQodGhpcy5jb25zdHJ1Y3Rvci5uYW1lKSxcbiAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgIH0sXG4gICAgICBwYXJlbnRzOiBuZXcgU3BpbmFsTWFwKCksXG4gICAgICBjaGlsZHJlbjogbmV3IFNwaW5hbE1hcCgpLFxuICAgICAgZWxlbWVudDogbmV3IFNwaW5hbE5vZGVQb2ludGVyKGVsZW1lbnQpLFxuICAgICAgY29udGV4dElkczogbmV3IFNwaW5hbFNldCgpXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaWQuXG4gICAqIEByZXR1cm5zIHtTdHJ9IElkIG9mIHRoZSBub2RlXG4gICAqL1xuICBnZXRJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5pbmZvLmlkO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIG5hbWUuXG4gICAqIEByZXR1cm5zIHtTdHJ9IE5hbWUgb2YgdGhlIG5vZGVcbiAgICovXG4gIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5mby5uYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHR5cGUuXG4gICAqIEByZXR1cm5zIHtTdHJ9IFR5cGUgb2YgdGhlIG5vZGVcbiAgICovXG4gIGdldFR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5mby50eXBlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGVsZW1lbnQuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPCo+fSBBIHByb21pc2Ugd2hlcmUgdGhlIHBhcmFtZXRlciBvZiB0aGUgcmVzb2x2ZSBtZXRob2QgaXMgdGhlIGVsZW1lbnRcbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC5sb2FkKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbGwgdGhlIGNoaWxkcmVuIGlkcyBpbiBhbiBhcnJheS5cbiAgICogQHJldHVybnMge0FycmF5PFN0cmluZz59IElkcyBvZiB0aGUgY2hpbGRyZW5cbiAgICovXG4gIGdldENoaWxkcmVuSWRzKCkge1xuICAgIGxldCBub2RlQ2hpbGRyZW5JZHMgPSBbXTtcblxuICAgIGZvciAobGV0IHJlbGF0aW9uTWFwIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgIGZvciAobGV0IHJlbGF0aW9uIG9mIHJlbGF0aW9uTWFwKSB7XG4gICAgICAgIGxldCByZWxDaGlsZHJlbklkcyA9IHJlbGF0aW9uLmdldENoaWxkcmVuSWRzKCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZWxDaGlsZHJlbklkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIG5vZGVDaGlsZHJlbklkcy5wdXNoKHJlbENoaWxkcmVuSWRzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbm9kZUNoaWxkcmVuSWRzO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXB1dGVzIGFuZCByZXR1cm5zIHRoZSBudW1iZXIgb2YgY2hpbGRyZW4gb2YgdGhlIG5vZGUuXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBudW1iZXIgb2YgY2hpbGRyZW5cbiAgICovXG4gIGdldE5iQ2hpbGRyZW4oKSB7XG4gICAgbGV0IGNoaWxkcmVuSWRzID0gdGhpcy5nZXRDaGlsZHJlbklkcygpO1xuXG4gICAgcmV0dXJuIGNoaWxkcmVuSWRzLmxlbmd0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGFuIGlkIHRvIHRoZSBjb250ZXh0IGlkcyBvZiB0aGUgbm9kZS5cbiAgICogQHBhcmFtIHtTdHJpbmd9IGlkIElkIG9mIHRoZSBjb250ZXh0XG4gICAqL1xuICBhZGRDb250ZXh0SWQoaWQpIHtcbiAgICBpZiAoIXRoaXMuY29udGV4dElkcy5oYXMoaWQpKSB7XG4gICAgICB0aGlzLmNvbnRleHRJZHMuYWRkKGlkKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGxpc3Qgb2YgdGhlIGNvbnRleHRzIHRoZSBub2RlIGlzIGFzc29jaWF0ZWQgdG8uXG4gICAqIEByZXR1cm5zIHtBcnJheTxTdHJpbmc+fSBBbiBhcnJheSBvZiBpZHMgb2YgdGhlIGFzc29jaWF0ZWQgY29udGV4dHNcbiAgICovXG4gIGdldENvbnRleHRJZHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGV4dElkcy52YWx1ZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIG5vZGUgYmVsb25ncyB0byB0aGUgY29udGV4dC5cbiAgICogQHBhcmFtIHtTcGluYWxDb250ZXh0fSBjb250ZXh0IFRoZSBjb250ZXh0IHRoYXQgbWlnaHQgb3duIHRoZSBub2RlXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBBIGJvb2xlYW5cbiAgICovXG4gIGJlbG9uZ3NUb0NvbnRleHQoY29udGV4dCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHRJZHMuaGFzKGNvbnRleHQuZ2V0SWQoKS5nZXQoKSk7XG4gIH1cblxuICAvKipcbiAgICogVmVyaWZ5IGlmIHRoZSBub2RlIGNvbnRhaW5zIHRoZSByZWxhdGlvbiBuYW1lLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcmVsYXRpb25OYW1lIE5hbWUgb2YgdGhlIHJlbGF0aW9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSByZWxhdGlvblR5cGUgVHlwZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybiB0cnVlIGlzIHRoZSByZWxhdGlvbiBpcyBjb250YWluZWQgaW4gdGhlIG5vZGUgYW5kIGZhbHNlIG90aGVyd2lzZS5cbiAgICovXG4gIGhhc1JlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKSB7XG4gICAgY29uc3QgdHlwZU1hcCA9IHRoaXMuX2dldENoaWxkcmVuVHlwZShyZWxhdGlvblR5cGUpO1xuXG4gICAgaWYgKHR5cGVvZiB0eXBlTWFwID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0eXBlTWFwLmhhcyhyZWxhdGlvbk5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFZlcmlmeSBpZiB0aGUgbm9kZSBjb250YWlucyBhbGwgdGhlIHJlbGF0aW9uIG5hbWVzLlxuICAgKiBAcGFyYW0ge0FycmF5PFN0cmluZz59IHJlbGF0aW9uTmFtZXMgQXJyYXkgY29udGFpbmluZyBhbGwgdGhlIHJlbGF0aW9uIG5hbWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IHJlbGF0aW9uVHlwZSBUeXBlIG9mIHRoZSByZWxhdGlvbnNcbiAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybiB0cnVlIGlmIHRoZSBub2RlIGNvbnRhaW5zIGFsbCB0aGUgcmVsYXRpb25zIGluIHJlbGF0aW9uTmFtZXMsIGZhbHNlIG90aGVyd2lzZS5cbiAgICovXG4gIGhhc1JlbGF0aW9ucyhyZWxhdGlvbk5hbWVzLCByZWxhdGlvblR5cGUpIHtcbiAgICBsZXQgcmVzID0gdHJ1ZTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVsYXRpb25OYW1lcy5sZW5ndGggJiYgcmVzOyBpKyspIHtcbiAgICAgIHJlcyA9IHRoaXMuaGFzUmVsYXRpb24ocmVsYXRpb25OYW1lc1tpXSwgcmVsYXRpb25UeXBlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYWxsIHRoZSByZWxhdGlvbiBuYW1lcyBvZiB0aGUgbm9kZS5cbiAgICogQHJldHVybnMge0FycmF5PFN0cmluZz59IFRoZSBuYW1lcyBvZiB0aGUgcmVsYXRpb25zIG9mIHRoZSBub2RlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBnZXRSZWxhdGlvbk5hbWVzKCkge1xuICAgIGxldCBuYW1lcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgcmVsYXRpb25NYXAgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgbmFtZXMucHVzaCguLi5yZWxhdGlvbk1hcC5rZXlzKCkpO1xuICAgIH1cbiAgICByZXR1cm4gbmFtZXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkIHRoZSBub2RlIGFzIGNoaWxkIG9mIHRoZSByZWxhdGlvbi5cbiAgICogQHBhcmFtIHtTcGluYWxOb2RlIHwgTW9kZWx9IGNoaWxkIEVsZW1lbnQgdG8gYWRkIGFzIGNoaWxkXG4gICAqIEBwYXJhbSB7U3RyaW5nfSByZWxhdGlvbk5hbWUgTmFtZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHJlbGF0aW9uVHlwZSBUeXBlIG9mIHRoZSByZWxhdGlvblxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxTcGluYWxOb2RlPn0gVGhlIGNoaWxkIG5vZGUgaW4gYSBwcm9taXNlXG4gICAqL1xuICBhc3luYyBhZGRDaGlsZChjaGlsZCwgcmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpIHtcbiAgICBsZXQgcmVsYXRpb247XG5cbiAgICBpZiAoIShjaGlsZCBpbnN0YW5jZW9mIGdsb2JhbFR5cGUuTW9kZWwpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIFwiQ2Fubm90IGFkZCBhIGNoaWxkIHdpdGNoIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBTcGluYWxOb2RlIG9yIE1vZGVsLlwiXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoIShjaGlsZCBpbnN0YW5jZW9mIFNwaW5hbE5vZGUpKSB7XG4gICAgICBjaGlsZCA9IG5ldyBTcGluYWxOb2RlKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBjaGlsZCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmhhc1JlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKSkge1xuICAgICAgcmVsYXRpb24gPSB0aGlzLl9jcmVhdGVSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbGF0aW9uID0gdGhpcy5fZ2V0UmVsYXRpb24ocmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpO1xuICAgIH1cblxuICAgIGF3YWl0IHJlbGF0aW9uLmFkZENoaWxkKGNoaWxkKTtcbiAgICByZXR1cm4gY2hpbGQ7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGNoaWxkIGFuZCBub3RpY2VzIHRoZSBjb250ZXh0IGlmIGEgbmV3IHJlbGF0aW9uIHdhcyBjcmVhdGVkLlxuICAgKiBAcGFyYW0ge1NwaW5hbE5vZGUgfCBNb2RlbH0gY2hpbGQgTm9kZSB0byBhZGQgYXMgY2hpbGRcbiAgICogQHBhcmFtIHtTdHJpbmd9IHJlbGF0aW9uTmFtZSBOYW1lIG9mIHRoZSByZWxhdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gcmVsYXRpb25UeXBlIFR5cGUgb2YgdGhlIHJlbGF0aW9uXG4gICAqIEBwYXJhbSB7U3BpbmFsQ29udGV4dH0gY29udGV4dCBDb250ZXh0IHRvIHVwZGF0ZVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxTcGluYWxOb2RlPn0gVGhlIGNoaWxkIG5vZGUgaW4gYSBwcm9taXNlXG4gICAqL1xuICBhc3luYyBhZGRDaGlsZEluQ29udGV4dChjaGlsZCwgcmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUsIGNvbnRleHQpIHtcbiAgICBsZXQgcmVsYXRpb247XG5cbiAgICBpZiAoIShjaGlsZCBpbnN0YW5jZW9mIGdsb2JhbFR5cGUuTW9kZWwpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIFwiQ2Fubm90IGFkZCBhIGNoaWxkIHdpdGNoIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBTcGluYWxOb2RlIG9yIE1vZGVsLlwiXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoIShjaGlsZCBpbnN0YW5jZW9mIFNwaW5hbE5vZGUpKSB7XG4gICAgICBjaGlsZCA9IG5ldyBTcGluYWxOb2RlKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBjaGlsZCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmhhc1JlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKSkge1xuICAgICAgcmVsYXRpb24gPSB0aGlzLl9jcmVhdGVSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbGF0aW9uID0gdGhpcy5fZ2V0UmVsYXRpb24ocmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpO1xuICAgIH1cblxuICAgIGNoaWxkLmFkZENvbnRleHRJZChjb250ZXh0LmdldElkKCkuZ2V0KCkpO1xuICAgIHJlbGF0aW9uLmFkZENvbnRleHRJZChjb250ZXh0LmdldElkKCkuZ2V0KCkpO1xuXG4gICAgYXdhaXQgcmVsYXRpb24uYWRkQ2hpbGQoY2hpbGQpO1xuICAgIHJldHVybiBjaGlsZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgdGhlIG5vZGUgZnJvbSB0aGUgcmVsYXRpb24gY2hpbGRyZW4uXG4gICAqIEBwYXJhbSB7U3BpbmFsTm9kZX0gbm9kZSBOb2RlIHRvIHJlbW92ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gcmVsYXRpb25OYW1lIE5hbWUgb2YgdGhlIHJlbGF0aW9uIHRvIHdpY2ggdGhlIG5vZGUgYmVsb25nc1xuICAgKiBAcGFyYW0ge1N0cmluZ30gcmVsYXRpb25UeXBlIFR5cGUgb2YgdGhlIHJlbGF0aW9uIHRvIHdpY2ggdGhlIG5vZGUgYmVsb25nc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCb29sZWFuPn0gQSBwcm9taXNlIGNvbnRhaW5pbmcgdHJ1ZSBpZiB0aGUgbm9kZSB3YXMgYSBjaGlsZFxuICAgKi9cbiAgcmVtb3ZlQ2hpbGQobm9kZSwgcmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpIHtcbiAgICBpZiAoIXRoaXMuaGFzUmVsYXRpb24ocmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKTtcbiAgICB9XG5cbiAgICBjb25zdCByZWwgPSB0aGlzLl9nZXRSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSk7XG4gICAgcmV0dXJuIHJlbC5yZW1vdmVDaGlsZChub2RlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgdGhlIG5vZGUgZnJvbSB0aGUgZ3JhcGggaS5lIHJlbW92ZSB0aGUgbm9kZSBmcm9tIGFsbCB0aGUgcGFyZW50IHJlbGF0aW9ucyBhbmQgcmVtb3ZlIGFsbCB0aGUgY2hpbGRyZW4gcmVsYXRpb25zLlxuICAgKiBUaGlzIG9wZXJhdGlvbiBtaWdodCBkZWxldGUgYWxsIHRoZSBzdWItZ3JhcGggdW5kZXIgdGhpcyBub2RlLlxuICAgKiBBZnRlciB0aGlzIG9wZXJhdGlvbiB0aGUgbm9kZSBjYW4gYmUgZGVsZXRlZCB3aXRob3V0IGZlYXIuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPG5vdGhpbmc+fSBBbiBlbXB0eSBwcm9taXNlXG4gICAqL1xuICBhc3luYyByZW1vdmVGcm9tR3JhcGgoKSB7XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbVBhcmVudHMoKSxcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21DaGlsZHJlbigpXG4gICAgXSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY2hpbGRyZW4gb2YgdGhlIG5vZGUgZm9yIHRoZSByZWxhdGlvbiBuYW1lcy5cbiAgICogQHBhcmFtIHtBcnJheTxTdHJpbmc+fSByZWxhdGlvbk5hbWVzIEFycmF5IGNvbnRhaW5pbmcgdGhlIHJlbGF0aW9uIG5hbWVzIG9mIHRoZSBkZXNpcmVkIGNoaWxkcmVuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PFNwaW5hbE5vZGU+Pn0gVGhlIGNoaWxkcmVuIHRoYXQgd2VyZSBmb3VuZFxuICAgKi9cbiAgYXN5bmMgZ2V0Q2hpbGRyZW4ocmVsYXRpb25OYW1lcykge1xuICAgIGlmICh0eXBlb2YgcmVsYXRpb25OYW1lcyA9PT0gXCJ1bmRlZmluZWRcIiB8fCByZWxhdGlvbk5hbWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmVsYXRpb25OYW1lcyA9IHRoaXMuZ2V0UmVsYXRpb25OYW1lcygpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlbGF0aW9uTmFtZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHJlbGF0aW9uTmFtZXMgPSBbcmVsYXRpb25OYW1lc107XG4gICAgfVxuXG4gICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcblxuICAgIGZvciAobGV0IHJlbGF0aW9uTWFwIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcmVsYXRpb25OYW1lcy5sZW5ndGg7IGorKykge1xuICAgICAgICBpZiAocmVsYXRpb25NYXAuaGFzKHJlbGF0aW9uTmFtZXNbal0pKSB7XG4gICAgICAgICAgY29uc3QgcmVsYXRpb24gPSByZWxhdGlvbk1hcC5nZXRFbGVtZW50KHJlbGF0aW9uTmFtZXNbal0pO1xuICAgICAgICAgIHByb21pc2VzLnB1c2gocmVsYXRpb24uZ2V0Q2hpbGRyZW4oKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjaGlsZHJlbkxzdCA9IGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICBsZXQgcmVzID0gW107XG5cbiAgICBmb3IgKGxldCBjaGlsZHJlbiBvZiBjaGlsZHJlbkxzdCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICByZXMucHVzaChjaGlsZHJlbltpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGNoaWxkcmVuIG9mIHRoZSBub2RlIHRoYXQgYXJlIHJlZ2lzdGVyZWQgaW4gdGhlIGNvbnRleHRcbiAgICogQHBhcmFtIHtTcGluYWxDb250ZXh0fSBjb250ZXh0IENvbnRleHQgdG8gdXNlIGZvciB0aGUgc2VhcmNoXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEFycmF5PFNwaW5hbE5vZGU+Pn0gVGhlIGNoaWxkcmVuIHRoYXQgd2VyZSBmb3VuZFxuICAgKi9cbiAgYXN5bmMgZ2V0Q2hpbGRyZW5JbkNvbnRleHQoY29udGV4dCkge1xuICAgIGlmICh0eXBlb2YgY29udGV4dCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWW91IG11c3QgZ2l2ZSBhIGNvbnRleHRcIik7XG4gICAgfVxuXG4gICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcblxuICAgIGZvciAobGV0IHJlbGF0aW9uTWFwIG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgIGZvciAobGV0IHJlbGF0aW9uIG9mIHJlbGF0aW9uTWFwKSB7XG4gICAgICAgIGlmIChyZWxhdGlvbi5iZWxvbmdzVG9Db250ZXh0KGNvbnRleHQpKSB7XG4gICAgICAgICAgcHJvbWlzZXMucHVzaChyZWxhdGlvbi5nZXRDaGlsZHJlbkluQ29udGV4dChjb250ZXh0KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjaGlsZHJlbkxzdCA9IGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICBsZXQgcmVzID0gW107XG5cbiAgICBmb3IgKGxldCBjaGlsZHJlbiBvZiBjaGlsZHJlbkxzdCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICByZXMucHVzaChjaGlsZHJlbltpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYWxsIHBhcmVudHMgZm9yIHRoZSByZWxhdGlvbiBuYW1lcyBubyBtYXR0ZXIgdGhlIHR5cGUgb2YgcmVsYXRpb25cbiAgICogQHBhcmFtIHtBcnJheTxTdHJpbmc+fSByZWxhdGlvbk5hbWVzIEFycmF5IGNvbnRhaW5pbmcgdGhlIHJlbGF0aW9uIG5hbWVzIG9mIHRoZSBkZXNpcmVkIHBhcmVudHNcbiAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8U3BpbmFsTm9kZT4+fSBQcm9taXNlIGNvbnRhaW5pbmcgdGhlIHBhcmVudHMgdGhhdCB3ZXJlIGZvdW5kXG4gICAqL1xuICBnZXRQYXJlbnRzKHJlbGF0aW9uTmFtZXMpIHtcbiAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuXG4gICAgaWYgKHR5cGVvZiByZWxhdGlvbk5hbWVzID09PSBcInVuZGVmaW5lZFwiIHx8IHJlbGF0aW9uTmFtZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZWxhdGlvbk5hbWVzID0gdGhpcy5wYXJlbnRzLmtleXMoKTtcbiAgICB9XG4gICAgZm9yIChsZXQgbmFtZSBvZiByZWxhdGlvbk5hbWVzKSB7XG4gICAgICBjb25zdCBsaXN0ID0gdGhpcy5wYXJlbnRzLmdldEVsZW1lbnQobmFtZSk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBwcm9taXNlcy5wdXNoKGxpc3RbaV0ubG9hZCgpLnRoZW4ocmVsYXRpb24gPT4ge1xuICAgICAgICAgIHJldHVybiByZWxhdGlvbi5nZXRQYXJlbnQoKTtcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlY3Vyc2l2ZWx5IGZpbmRzIGFsbCB0aGUgY2hpbGRyZW4gbm9kZXMgZm9yIHdoaWNoIHRoZSBwcmVkaWNhdGUgaXMgdHJ1ZS5cbiAgICogQHBhcmFtIHtBcnJheTxTdHJpbmc+fSByZWxhdGlvbk5hbWVzIEFycmF5IGNvbnRhaW5pbmcgdGhlIHJlbGF0aW9uIG5hbWVzIHRvIGZvbGxvd1xuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcmVkaWNhdGUgRnVuY3Rpb24gcmV0dXJuaW5nIHRydWUgaWYgdGhlIG5vZGUgbmVlZHMgdG8gYmUgcmV0dXJuZWRcbiAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8U3BpbmFsTm9kZT4+fSBUaGUgbm9kZXMgdGhhdCB3ZXJlIGZvdW5kXG4gICAqL1xuICBhc3luYyBmaW5kKHJlbGF0aW9uTmFtZXMsIHByZWRpY2F0ZSA9IERFRkFVTFRfUFJFRElDQVRFKSB7XG4gICAgaWYgKHR5cGVvZiBwcmVkaWNhdGUgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwicHJlZGljYXRlIG11c3QgYmUgYSBmdW5jdGlvblwiKTtcbiAgICB9XG5cbiAgICBsZXQgc2VlbiA9IG5ldyBTZXQoW3RoaXNdKTtcbiAgICBsZXQgcHJvbWlzZXMgPSBbXTtcbiAgICBsZXQgbmV4dEdlbiA9IFt0aGlzXTtcbiAgICBsZXQgY3VycmVudEdlbiA9IFtdO1xuICAgIGxldCBmb3VuZCA9IFtdO1xuXG4gICAgd2hpbGUgKG5leHRHZW4ubGVuZ3RoKSB7XG4gICAgICBjdXJyZW50R2VuID0gbmV4dEdlbjtcbiAgICAgIHByb21pc2VzID0gW107XG4gICAgICBuZXh0R2VuID0gW107XG5cbiAgICAgIGZvciAobGV0IG5vZGUgb2YgY3VycmVudEdlbikge1xuICAgICAgICBwcm9taXNlcy5wdXNoKG5vZGUuZ2V0Q2hpbGRyZW4ocmVsYXRpb25OYW1lcykpO1xuXG4gICAgICAgIGlmIChwcmVkaWNhdGUobm9kZSkpIHtcbiAgICAgICAgICBmb3VuZC5wdXNoKG5vZGUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxldCBjaGlsZHJlbkFycmF5cyA9IGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcblxuICAgICAgZm9yIChsZXQgY2hpbGRyZW4gb2YgY2hpbGRyZW5BcnJheXMpIHtcbiAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgY2hpbGRyZW4pIHtcbiAgICAgICAgICBpZiAoIXNlZW4uaGFzKGNoaWxkKSkge1xuICAgICAgICAgICAgbmV4dEdlbi5wdXNoKGNoaWxkKTtcbiAgICAgICAgICAgIHNlZW4uYWRkKGNoaWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZm91bmQ7XG4gIH1cblxuICAvKipcbiAgICogUmVjdXJzaXZlbHkgZmluZHMgYWxsIHRoZSBjaGlsZHJlbiBub2RlcyBpbiB0aGUgY29udGV4dCBmb3Igd2hpY2ggdGhlIHByZWRpY2F0ZSBpcyB0cnVlLi5cbiAgICogQHBhcmFtIHtTcGluYWxDb250ZXh0fSBjb250ZXh0IENvbnRleHQgdG8gdXNlIGZvciB0aGUgc2VhcmNoXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IHByZWRpY2F0ZSBGdW5jdGlvbiByZXR1cm5pbmcgdHJ1ZSBpZiB0aGUgbm9kZSBuZWVkcyB0byBiZSByZXR1cm5lZFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxTcGluYWxOb2RlPj59IFRoZSBub2RlcyB0aGF0IHdlcmUgZm91bmRcbiAgICovXG4gIGFzeW5jIGZpbmRJbkNvbnRleHQoY29udGV4dCwgcHJlZGljYXRlID0gREVGQVVMVF9QUkVESUNBVEUpIHtcbiAgICBpZiAodHlwZW9mIHByZWRpY2F0ZSAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgcHJlZGljYXRlIGZ1bmN0aW9uIG11c3QgYmUgYSBmdW5jdGlvblwiKTtcbiAgICB9XG5cbiAgICBsZXQgc2VlbiA9IG5ldyBTZXQoW3RoaXNdKTtcbiAgICBsZXQgcHJvbWlzZXMgPSBbXTtcbiAgICBsZXQgbmV4dEdlbiA9IFt0aGlzXTtcbiAgICBsZXQgY3VycmVudEdlbiA9IFtdO1xuICAgIGxldCBmb3VuZCA9IFtdO1xuXG4gICAgd2hpbGUgKG5leHRHZW4ubGVuZ3RoKSB7XG4gICAgICBjdXJyZW50R2VuID0gbmV4dEdlbjtcbiAgICAgIHByb21pc2VzID0gW107XG4gICAgICBuZXh0R2VuID0gW107XG5cbiAgICAgIGZvciAobGV0IG5vZGUgb2YgY3VycmVudEdlbikge1xuICAgICAgICBwcm9taXNlcy5wdXNoKG5vZGUuZ2V0Q2hpbGRyZW5JbkNvbnRleHQoY29udGV4dCkpO1xuXG4gICAgICAgIGlmIChwcmVkaWNhdGUobm9kZSkpIHtcbiAgICAgICAgICBmb3VuZC5wdXNoKG5vZGUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxldCBjaGlsZHJlbkFycmF5cyA9IGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcblxuICAgICAgZm9yIChsZXQgY2hpbGRyZW4gb2YgY2hpbGRyZW5BcnJheXMpIHtcbiAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgY2hpbGRyZW4pIHtcbiAgICAgICAgICBpZiAoIXNlZW4uaGFzKGNoaWxkKSkge1xuICAgICAgICAgICAgbmV4dEdlbi5wdXNoKGNoaWxkKTtcbiAgICAgICAgICAgIHNlZW4uYWRkKGNoaWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZm91bmQ7XG4gIH1cblxuICAvKipcbiAgICogUmVjdXJzaXZlbHkgYXBwbGllcyBhIGZ1bmN0aW9uIHRvIGFsbCB0aGUgY2hpbGRyZW4gbm9kZXMuXG4gICAqIEBwYXJhbSB7QXJyYXk8U3RyaW5nPn0gcmVsYXRpb25OYW1lcyBBcnJheSBjb250YWluaW5nIHRoZSByZWxhdGlvbiBuYW1lcyB0byBmb2xsb3dcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgRnVuY3Rpb24gdG8gYXBwbHkgdG8gdGhlIG5vZGVzXG4gICAqL1xuICBhc3luYyBmb3JFYWNoKHJlbGF0aW9uTmFtZXMsIGNhbGxiYWNrKSB7XG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhyb3cgRXJyb3IoXCJZb3UgbXVzdCBnaXZlIGEgY2FsbGJhY2sgZnVuY3Rpb25cIik7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIG11c3QgYmUgYSBmdW5jdGlvblwiKTtcbiAgICB9XG5cbiAgICBsZXQgbm9kZXMgPSBhd2FpdCB0aGlzLmZpbmQocmVsYXRpb25OYW1lcyk7XG5cbiAgICBmb3IgKGxldCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICBjYWxsYmFjayhub2RlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVjdXJzaXZlbHkgYXBwbGllcyBhIGZ1bmN0aW9uIHRvIGFsbCB0aGUgY2hpbGRyZW4gbm9kZXMgaW4gdGhlIGNvbnRleHQuXG4gICAqIEBwYXJhbSB7U3BpbmFsQ29udGV4dH0gY29udGV4dCBDb250ZXh0IHRvIHVzZSBmb3IgdGhlIHNlYXJjaFxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBGdW5jdGlvbiB0byBhcHBseSB0byB0aGUgbm9kZXNcbiAgICovXG4gIGFzeW5jIGZvckVhY2hJbkNvbnRleHQoY29udGV4dCwgY2FsbGJhY2spIHtcbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aHJvdyBFcnJvcihcIllvdSBtdXN0IGdpdmUgYSBjYWxsYmFjayBmdW5jdGlvblwiKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgY2FsbGJhY2sgZnVuY3Rpb24gbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICAgIH1cblxuICAgIGxldCBub2RlcyA9IGF3YWl0IHRoaXMuZmluZEluQ29udGV4dChjb250ZXh0KTtcblxuICAgIGZvciAobGV0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgIGNhbGxiYWNrKG5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWN1cnNpdmVseSBhcHBsaWVzIGEgZnVuY3Rpb24gdG8gYWxsIHRoZSBjaGlsZHJlbiBub2RlcyBhbmQgcmV0dXJucyB0aGUgcmVzdWx0cyBpbiBhbiBhcnJheS5cbiAgICogQHBhcmFtIHtBcnJheTxTdHJpbmc+fSByZWxhdGlvbk5hbWVzIEFycmF5IGNvbnRhaW5pbmcgdGhlIHJlbGF0aW9uIG5hbWVzIHRvIGZvbGxvd1xuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBGdW5jdGlvbiB0byBhcHBseSB0byB0aGUgbm9kZXNcbiAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8Kj4+fSBUaGUgcmVzdWx0cyBvZiB0aGUgY2FsbGJhY2sgZm9yIGVhY2ggbm9kZVxuICAgKi9cbiAgYXN5bmMgbWFwKHJlbGF0aW9uTmFtZXMsIGNhbGxiYWNrKSB7XG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhyb3cgRXJyb3IoXCJZb3UgbXVzdCBnaXZlIGEgY2FsbGJhY2sgZnVuY3Rpb25cIik7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIG11c3QgYmUgYSBmdW5jdGlvblwiKTtcbiAgICB9XG5cbiAgICBsZXQgbm9kZXMgPSBhd2FpdCB0aGlzLmZpbmQocmVsYXRpb25OYW1lcyk7XG4gICAgbGV0IHJlc3VsdHMgPSBbXTtcblxuICAgIGZvciAobGV0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgIHJlc3VsdHMucHVzaChjYWxsYmFjayhub2RlKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cblxuICAvKipcbiAgICogUmVjdXJzaXZlbHkgYXBwbGllcyBhIGZ1bmN0aW9uIHRvIGFsbCB0aGUgY2hpbGRyZW4gbm9kZXMgaW4gdGhlIGNvbnRleHQgYW5kIHJldHVybnMgdGhlIHJlc3VsdHMgaW4gYW4gYXJyYXkuXG4gICAqIEBwYXJhbSB7U3BpbmFsQ29udGV4dH0gY29udGV4dCBDb250ZXh0IHRvIHVzZSBmb3IgdGhlIHNlYXJjaFxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBGdW5jdGlvbiB0byBhcHBseSB0byB0aGUgbm9kZXNcbiAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8Kj4+fSBUaGUgcmVzdWx0cyBvZiB0aGUgY2FsbGJhY2sgZm9yIGVhY2ggbm9kZVxuICAgKi9cbiAgYXN5bmMgbWFwSW5Db250ZXh0KGNvbnRleHQsIGNhbGxiYWNrKSB7XG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhyb3cgRXJyb3IoXCJZb3UgbXVzdCBnaXZlIGEgY2FsbGJhY2sgZnVuY3Rpb25cIik7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIG11c3QgYmUgYSBmdW5jdGlvblwiKTtcbiAgICB9XG5cbiAgICBsZXQgbm9kZXMgPSBhd2FpdCB0aGlzLmZpbmRJbkNvbnRleHQoY29udGV4dCk7XG4gICAgbGV0IHJlc3VsdHMgPSBbXTtcblxuICAgIGZvciAobGV0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgIHJlc3VsdHMucHVzaChjYWxsYmFjayhub2RlKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSByZWxhdGlvbiBsaXN0IGNvcnJlc3BvbmRpbmcgdG8gdGhlIHJlbGF0aW9uIHR5cGUuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSByZWxhdGlvblR5cGUgVHlwZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHJldHVybnMge1NwaW5hbE1hcH0gUmV0dXJuIHRoZSByZWxhdGlvbiBsaXN0IGNvcnJlc3BvbmRpbmcgdG8gdGhlIHJlbGF0aW9uIHR5cGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9nZXRDaGlsZHJlblR5cGUocmVsYXRpb25UeXBlKSB7XG4gICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4uZ2V0RWxlbWVudChyZWxhdGlvblR5cGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgcmVsYXRpb24gY29ycmVzcG9uZGluZy5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHJlbGF0aW9uTmFtZSBOYW1lIG9mIHRoZSByZWxhdGlvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gcmVsYXRpb25UeXBlIFR5cGUgb2YgdGhlIHJlbGF0aW9uXG4gICAqIEByZXR1cm5zIHtTcGluYWxSZWxhdGlvbn0gVGhlIHJlbGF0aW9uIGNvcnJlc3BvbmRpbmdcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9nZXRSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSkge1xuICAgIHJldHVybiB0aGlzLl9nZXRDaGlsZHJlblR5cGUocmVsYXRpb25UeXBlKS5nZXRFbGVtZW50KHJlbGF0aW9uTmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIHBhcmVudCByZWxhdGlvbiBvZiB0aGUgbm9kZS5cbiAgICogQHBhcmFtIHtTcGluYWxSZWxhdGlvbn0gcmVsYXRpb24gUmVsYXRpb24gdG8gcmVtb3ZlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcmVtb3ZlUGFyZW50KHJlbGF0aW9uKSB7XG4gICAgY29uc3QgcGFyZW50THN0ID0gdGhpcy5wYXJlbnRzLmdldEVsZW1lbnQocmVsYXRpb24uZ2V0TmFtZSgpLmdldCgpKTtcblxuICAgIGNvbnN0IGluZGV4VG9SZW1vdmUgPSBwYXJlbnRMc3QuaW5kZXhPZihwYXJlbnRQdHIgPT5cbiAgICAgIHBhcmVudFB0ci5nZXRJZCgpLmdldCgpID09PSByZWxhdGlvbi5nZXRJZCgpLmdldCgpXG4gICAgKTtcblxuICAgIHBhcmVudExzdC5zcGxpY2UoaW5kZXhUb1JlbW92ZSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgbm9kZSBmcm9tIGFsbCBwYXJlbnQgcmVsYXRpb24gdGhlIHByb3BlcnR5IHBhcmVudHMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhc3luYyBfcmVtb3ZlRnJvbVBhcmVudHMoKSB7XG4gICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcblxuICAgIGZvciAobGV0IHBhcmVudCBvZiB0aGlzLnBhcmVudHMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBhcmVudFtpXS5sb2FkKCkudGhlbihwYXJlbnRSZWwgPT4ge1xuICAgICAgICAgIHByb21pc2VzLnB1c2gocGFyZW50UmVsLnJlbW92ZUNoaWxkKHRoaXMpKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIHRoZSByZWxhdGlvbiBhcyBwYXJlbnQgb2YgdGhlIG5vZGUuXG4gICAqIEBwYXJhbSB7U3BpbmFsUmVsYXRpb259IHJlbGF0aW9uIFBhcmVudCByZWxhdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2FkZFBhcmVudChyZWxhdGlvbikge1xuICAgIGNvbnN0IHJlbGF0aW9uTmFtZSA9IHJlbGF0aW9uLmdldE5hbWUoKTtcblxuICAgIGlmICh0aGlzLnBhcmVudHMuaGFzKHJlbGF0aW9uTmFtZS5nZXQoKSkpIHtcbiAgICAgIHRoaXMucGFyZW50cy5nZXRFbGVtZW50KHJlbGF0aW9uTmFtZSkucHVzaChuZXcgU3BpbmFsTm9kZVBvaW50ZXIoXG4gICAgICAgIHJlbGF0aW9uKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGxpc3QgPSBuZXcgZ2xvYmFsVHlwZS5Mc3QoKTtcbiAgICAgIGxpc3QucHVzaChuZXcgU3BpbmFsTm9kZVBvaW50ZXIocmVsYXRpb24pKTtcbiAgICAgIHRoaXMucGFyZW50cy5zZXRFbGVtZW50KHJlbGF0aW9uTmFtZSwgbGlzdCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyByZWxhdGlvbiBmb3IgdGhpcyBub2RlLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcmVsYXRpb25OYW1lIE5hbWUgb2YgdGhlIHJlbGF0aW9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSByZWxhdGlvblR5cGUgVHlwZSBvZiB0aGUgcmVsYXRpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9jcmVhdGVSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSkge1xuICAgIGNvbnN0IHJlbGF0aW9uID0gU3BpbmFsUmVsYXRpb25GYWN0b3J5LmdldE5ld1JlbGF0aW9uKHJlbGF0aW9uTmFtZSxcbiAgICAgIHJlbGF0aW9uVHlwZSk7XG4gICAgcmVsYXRpb24uc2V0UGFyZW50KHRoaXMpO1xuXG4gICAgaWYgKCF0aGlzLmNoaWxkcmVuLmhhcyhyZWxhdGlvblR5cGUpKSB7XG4gICAgICB0aGlzLmNoaWxkcmVuLnNldEVsZW1lbnQocmVsYXRpb25UeXBlLCBuZXcgU3BpbmFsTWFwKCkpO1xuICAgIH1cbiAgICB0aGlzLl9nZXRDaGlsZHJlblR5cGUocmVsYXRpb25UeXBlKS5zZXRFbGVtZW50KHJlbGF0aW9uTmFtZSwgcmVsYXRpb24pO1xuICAgIHJldHVybiByZWxhdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYWxsIGNoaWxkcmVuIHJlbGF0aW9uIGZyb20gdGhlIGdyYXBoLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxub3RoaW5nPn0gQW4gZW1wdHkgcHJvbWlzZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYXN5bmMgX3JlbW92ZUZyb21DaGlsZHJlbigpIHtcbiAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgcmVsYXRpb25NYXAgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgZm9yIChsZXQgcmVsYXRpb24gb2YgcmVsYXRpb25NYXApIHtcbiAgICAgICAgcHJvbWlzZXMucHVzaChyZWxhdGlvbi5yZW1vdmVGcm9tR3JhcGgoKSk7XG4gICAgICB9XG4gICAgfVxuICAgIGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgfVxufVxuXG5zcGluYWxDb3JlLnJlZ2lzdGVyX21vZGVscyhbU3BpbmFsTm9kZV0pO1xuZXhwb3J0IGRlZmF1bHQgU3BpbmFsTm9kZTtcbiJdfQ==