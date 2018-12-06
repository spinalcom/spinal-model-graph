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
   * @return {Str} Id of the node
   */


  getId() {
    return this.info.id;
  }
  /**
   * Returns the name.
   * @return {Str} Name of the node
   */


  getName() {
    return this.info.name;
  }
  /**
   * Returns the type.
   * @return {Str} Type of the node
   */


  getType() {
    return this.info.type;
  }
  /**
   * Returns the element.
   * @return {Promise<*>} A promise where the parameter of the resolve method is the element
   */


  getElement() {
    return (0, _Utilities.promiseLoad)(this.element);
  }
  /**
  * Returns all the children ids in an array.
  * @return {Array<String>} Ids of the children
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

            for (let i = 0; i < relChildrenIds.length; i++) nodeChildrenIds.push(relChildrenIds[i]);
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
   * @return {Number} The number of children
   */


  getNbChildren() {
    let childrenIds = this.getChildrenIds();
    return childrenIds.length;
  }
  /**
   * Returns a list of the contexts the node is associated to.
   * @return {Array<String>} An array of ids of the associated contexts
   */


  getContextIds() {
    return this.contextIds.values();
  }
  /**
   * Adds an id to the context ids of the node.
   * @param {String} id Id of the context
   */


  addContextId(id) {
    if (!this.contextIds.has(id)) this.contextIds.add(id);
  }
  /**
   * Returns true if the node belongs to the context.
   * @param {SpinalContext} context The context that might own the node
   * @return {Boolean} A boolean
   */


  belongsToContext(context) {
    return this.contextIds.has(context.getId().get());
  }
  /**
   * Verify if the node contains the relation name.
   * @param {String} relationName Name of the relation
   * @param {String} relationType Type of the relation
   * @return {Boolean} Return true is the relation is contained in the node and false otherwise.
   */


  hasRelation(relationName, relationType) {
    const typeMap = this._getChildrenType(relationType);

    if (typeof typeMap === "undefined") return false;
    return typeMap.has(relationName);
  }
  /**
   * Verify if the node contains all the relation names.
   * @param {Array<String>} relationNames Array containing all the relation name
   * @param {String} relationType Type of the relations
   * @return {Boolean} Return true if the node contains all the relations in relationNames, false otherwise.
   */


  hasRelations(relationNames, relationType) {
    let res = true;

    for (let i = 0; i < relationNames.length && res; i++) {
      res = this.hasRelation(relationNames[i], relationType);
    }

    return res;
  }
  /**
   * Add the node as child of the relation.
   * @param {SpinalNode | Model} child Element to add as child
   * @param {String} relationName Name of the relation
   * @param {String} relationType Type of the relation
   * @return {Promise<SpinalNode>} The child node in a promise
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

      if (!_this.hasRelation(relationName, relationType)) relation = _this._createRelation(relationName, relationType);else relation = _this._getRelation(relationName, relationType);
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
   * @return {Promise<SpinalNode>} The child node in a promise
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

      if (!_this2.hasRelation(relationName, relationType)) relation = _this2._createRelation(relationName, relationType);else relation = _this2._getRelation(relationName, relationType);
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
   * @return {Promise<nothing>} An empty promise
   */


  removeChild(node, relationName, relationType) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      if (_this3.hasRelation(relationName, relationType)) {
        let rel = _this3._getRelation(relationName, relationType);

        rel.removeChild(node);
      }
    })();
  }
  /**
   * Remove the node from the graph i.e remove the node from all the parent relations and remove all the children relations.
   * This operation might delete all the sub-graph under this node.
   * After this operation the node can be deleted without fear.
   * @return {Promise<nothing>} An empty promise
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
   * @return {Promise<Array<SpinalNode>>} The children that were found
   */


  getChildren(relationNames) {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      if (typeof relationNames === "undefined" || relationNames.length === 0) {
        relationNames = _this5._getRelationNames();
      } else if (typeof relationNames === "string") relationNames = [relationNames];

      const promises = [];
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = _this5.children[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          let relationMap = _step3.value;

          for (let j = 0; j < relationNames.length; j++) {
            if (relationMap.has(relationNames[j])) {
              const relation = relationMap.getElement(relationNames[j]);
              promises.push(relation.getChildren());
            }
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

      const childrenLst = yield Promise.all(promises);
      let res = [];
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = childrenLst[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          let children = _step4.value;

          for (let i = 0; i < children.length; i++) {
            res.push(children[i]);
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

      return res;
    })();
  }
  /**
   * Return the children of the node that are registered in the context
   * @param {SpinalContext} context Context to use for the search
   * @return {Promise<Array<SpinalNode>>} The children that were found
   */


  getChildrenInContext(context) {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      if (typeof context === "undefined") {
        throw new Error("You must give a context");
      }

      const promises = [];
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = _this6.children[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          let relationMap = _step5.value;
          var _iteratorNormalCompletion7 = true;
          var _didIteratorError7 = false;
          var _iteratorError7 = undefined;

          try {
            for (var _iterator7 = relationMap[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
              let relation = _step7.value;

              if (relation.belongsToContext(context)) {
                promises.push(relation.getChildrenInContext(context));
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
   * Return all parents for the relation names no matter the type of relation
   * @param {Array<String>} relationNames Array containing the relation name of the desired parents
   * @return {Promise<Array<SpinalNode>>} Promise containing the parents that were found
   */


  getParents(relationNames) {
    const promises = [];
    if (typeof relationNames === "undefined" || relationNames.length === 0) relationNames = this.parents.keys();
    var _iteratorNormalCompletion8 = true;
    var _didIteratorError8 = false;
    var _iteratorError8 = undefined;

    try {
      for (var _iterator8 = relationNames[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
        let name = _step8.value;
        const list = this.parents.getElement(name);

        for (let i = 0; i < list.length; i++) {
          promises.push((0, _Utilities.promiseLoad)(list[i]).then(relation => {
            return relation.getParent();
          }));
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

    return Promise.all(promises);
  }
  /**
   * Return the relation list corresponding to the relation type.
   * @param {String} relationType Type of the relation
   * @return {SpinalMap} Return the relation list corresponding to the relation type
   * @private
   */


  _getChildrenType(relationType) {
    return this.children.getElement(relationType);
  }
  /**
   * Return the relation corresponding.
   * @param {String} relationName Name of the relation
   * @param {String} relationType Type of the relation
   * @return {SpinalRelation} The relation corresponding
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
    const indexTORemove = parentLst.indexOf(parentPtr => parentPtr.getId().get() === relation.getId().get());
    parentLst.splice(indexTORemove);
  }
  /**
   * Removes the node from all parent relation the property parents.
   * @private
   */


  _removeFromParents() {
    var _this7 = this;

    return _asyncToGenerator(function* () {
      const promises = [];
      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = _this7.parents[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          let parent = _step9.value;

          for (let i = 0; i < parent.length; i++) {
            (0, _Utilities.promiseLoad)(parent[i]).then(parentRel => {
              promises.push(parentRel.removeChild(_this7));
            });
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
   * @return {Promise<nothing>} An empty promise
   * @private
   */


  _removeFromChildren() {
    var _this8 = this;

    return _asyncToGenerator(function* () {
      const promises = [];
      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = _this8.children[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          let relationMap = _step10.value;
          var _iteratorNormalCompletion11 = true;
          var _didIteratorError11 = false;
          var _iteratorError11 = undefined;

          try {
            for (var _iterator11 = relationMap[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
              let relation = _step11.value;
              promises.push(relation.removeFromGraph());
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

      yield Promise.all(promises);
    })();
  }
  /**
   * Returns all the relation names of the node.
   * @return {Array<String>} The names of the relations of the node
   * @private
   */


  _getRelationNames() {
    let names = [];
    var _iteratorNormalCompletion12 = true;
    var _didIteratorError12 = false;
    var _iteratorError12 = undefined;

    try {
      for (var _iterator12 = this.children[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
        let relationMap = _step12.value;
        names.push(...relationMap.keys());
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

    return names;
  }

}

_spinalCoreConnectorjs.default.register_models([SpinalNode]);

var _default = SpinalNode;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Ob2Rlcy9TcGluYWxOb2RlLmpzIl0sIm5hbWVzIjpbImdsb2JhbFR5cGUiLCJ3aW5kb3ciLCJnbG9iYWwiLCJTcGluYWxOb2RlIiwiTW9kZWwiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJ0eXBlIiwiZWxlbWVudCIsImFkZF9hdHRyIiwiaW5mbyIsImlkIiwicGFyZW50cyIsIlNwaW5hbE1hcCIsImNoaWxkcmVuIiwiU3BpbmFsTm9kZVBvaW50ZXIiLCJjb250ZXh0SWRzIiwiU3BpbmFsU2V0IiwiZ2V0SWQiLCJnZXROYW1lIiwiZ2V0VHlwZSIsImdldEVsZW1lbnQiLCJnZXRDaGlsZHJlbklkcyIsIm5vZGVDaGlsZHJlbklkcyIsInJlbGF0aW9uTWFwIiwicmVsYXRpb24iLCJyZWxDaGlsZHJlbklkcyIsImkiLCJsZW5ndGgiLCJwdXNoIiwiZ2V0TmJDaGlsZHJlbiIsImNoaWxkcmVuSWRzIiwiZ2V0Q29udGV4dElkcyIsInZhbHVlcyIsImFkZENvbnRleHRJZCIsImhhcyIsImFkZCIsImJlbG9uZ3NUb0NvbnRleHQiLCJjb250ZXh0IiwiZ2V0IiwiaGFzUmVsYXRpb24iLCJyZWxhdGlvbk5hbWUiLCJyZWxhdGlvblR5cGUiLCJ0eXBlTWFwIiwiX2dldENoaWxkcmVuVHlwZSIsImhhc1JlbGF0aW9ucyIsInJlbGF0aW9uTmFtZXMiLCJyZXMiLCJhZGRDaGlsZCIsImNoaWxkIiwiRXJyb3IiLCJ1bmRlZmluZWQiLCJfY3JlYXRlUmVsYXRpb24iLCJfZ2V0UmVsYXRpb24iLCJhZGRDaGlsZEluQ29udGV4dCIsInJlbW92ZUNoaWxkIiwibm9kZSIsInJlbCIsInJlbW92ZUZyb21HcmFwaCIsIlByb21pc2UiLCJhbGwiLCJfcmVtb3ZlRnJvbVBhcmVudHMiLCJfcmVtb3ZlRnJvbUNoaWxkcmVuIiwiZ2V0Q2hpbGRyZW4iLCJfZ2V0UmVsYXRpb25OYW1lcyIsInByb21pc2VzIiwiaiIsImNoaWxkcmVuTHN0IiwiZ2V0Q2hpbGRyZW5JbkNvbnRleHQiLCJnZXRQYXJlbnRzIiwia2V5cyIsImxpc3QiLCJ0aGVuIiwiZ2V0UGFyZW50IiwiX3JlbW92ZVBhcmVudCIsInBhcmVudExzdCIsImluZGV4VE9SZW1vdmUiLCJpbmRleE9mIiwicGFyZW50UHRyIiwic3BsaWNlIiwicGFyZW50IiwicGFyZW50UmVsIiwiX2FkZFBhcmVudCIsIkxzdCIsInNldEVsZW1lbnQiLCJTcGluYWxSZWxhdGlvbkZhY3RvcnkiLCJnZXROZXdSZWxhdGlvbiIsInNldFBhcmVudCIsIm5hbWVzIiwic3BpbmFsQ29yZSIsInJlZ2lzdGVyX21vZGVscyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQXVCQTs7QUFDQTs7QUFDQTs7QUFJQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFKQSxNQUFNQSxVQUFVLEdBQUcsT0FBT0MsTUFBUCxLQUFrQixXQUFsQixHQUFnQ0MsTUFBaEMsR0FBeUNELE1BQTVEOztBQU1BLE1BQU1FLFVBQU4sU0FBeUJILFVBQVUsQ0FBQ0ksS0FBcEMsQ0FBMEM7QUFDdEM7Ozs7OztBQU1BQyxFQUFBQSxXQUFXLENBQUNDLElBQUksR0FBRyxXQUFSLEVBQXFCQyxJQUFJLEdBQUcsWUFBNUIsRUFBMENDLE9BQU8sR0FBRyxJQUFJUixVQUFVLENBQUNJLEtBQWYsRUFBcEQsRUFBMEU7QUFDakY7QUFDQSxTQUFLSyxRQUFMLENBQWM7QUFDVkMsTUFBQUEsSUFBSSxFQUFFO0FBQ0ZDLFFBQUFBLEVBQUUsRUFBRSxxQkFBSyxLQUFLTixXQUFMLENBQWlCQyxJQUF0QixDQURGO0FBRUZBLFFBQUFBLElBQUksRUFBRUEsSUFGSjtBQUdGQyxRQUFBQSxJQUFJLEVBQUVBO0FBSEosT0FESTtBQU1WSyxNQUFBQSxPQUFPLEVBQUUsSUFBSUMsa0JBQUosRUFOQztBQU9WQyxNQUFBQSxRQUFRLEVBQUUsSUFBSUQsa0JBQUosRUFQQTtBQVFWTCxNQUFBQSxPQUFPLEVBQUUsSUFBSU8sMEJBQUosQ0FBc0JQLE9BQXRCLENBUkM7QUFTVlEsTUFBQUEsVUFBVSxFQUFFLElBQUlDLGtC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UndCO0FBUzNCO0FBRUQ7Ozs7Ozs7QUFLQUQsRUFBQUEsaUJBQWlCLEdBQUc7QUFDaEIsUUFBSXdCLEtBQUssR0FBRyxFQUFaO0FBRGdCO0FBQUE7QUFBQTs7QUFBQTtBQUdoQiw2QkFBd0IsS0FBSzFFLFFBQTdCLHdJQUF1QztBQUFBLFlBQTlCVSxXQUE4QjtBQUNuQ2dFLFFBQUFBLEtBQUssQ0FBQzNELElBQU4sQ0FBVyxHQUFHTCxXQUFXLENBQUM4QyxJQUFaLEVBQWQ7QUFDSDtBQUxlO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBTWhCLFdBQU9rQixLQUFQO0FBQ0g7O0FBemFxQzs7QUE0YTFDQywrQkFBV0MsZUFBWCxDQUEyQixDQUFDdkYsVUFBRCxDQUEzQjs7ZUFDZUEsVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOCBTcGluYWxDb20gLSB3d3cuc3BpbmFsY29tLmNvbVxuICogXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBTcGluYWxDb3JlLlxuICogXG4gKiBQbGVhc2UgcmVhZCBhbGwgb2YgdGhlIGZvbGxvd2luZyB0ZXJtcyBhbmQgY29uZGl0aW9uc1xuICogb2YgdGhlIEZyZWUgU29mdHdhcmUgbGljZW5zZSBBZ3JlZW1lbnQgKFwiQWdyZWVtZW50XCIpXG4gKiBjYXJlZnVsbHkuXG4gKiBcbiAqIFRoaXMgQWdyZWVtZW50IGlzIGEgbGVnYWxseSBiaW5kaW5nIGNvbnRyYWN0IGJldHdlZW5cbiAqIHRoZSBMaWNlbnNlZSAoYXMgZGVmaW5lZCBiZWxvdykgYW5kIFNwaW5hbENvbSB0aGF0XG4gKiBzZXRzIGZvcnRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyB0aGF0IGdvdmVybiB5b3VyXG4gKiB1c2Ugb2YgdGhlIFByb2dyYW0uIEJ5IGluc3RhbGxpbmcgYW5kL29yIHVzaW5nIHRoZVxuICogUHJvZ3JhbSwgeW91IGFncmVlIHRvIGFiaWRlIGJ5IGFsbCB0aGUgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zIHN0YXRlZCBvciByZWZlcmVuY2VkIGhlcmVpbi5cbiAqIFxuICogSWYgeW91IGRvIG5vdCBhZ3JlZSB0byBhYmlkZSBieSB0aGVzZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMsIGRvIG5vdCBkZW1vbnN0cmF0ZSB5b3VyIGFjY2VwdGFuY2UgYW5kIGRvXG4gKiBub3QgaW5zdGFsbCBvciB1c2UgdGhlIFByb2dyYW0uXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFsb25nXG4gKiB3aXRoIHRoaXMgZmlsZS4gSWYgbm90LCBzZWVcbiAqIDxodHRwOi8vcmVzb3VyY2VzLnNwaW5hbGNvbS5jb20vbGljZW5zZXMucGRmPi5cbiAqL1xuaW1wb3J0IHNwaW5hbENvcmUgZnJvbSBcInNwaW5hbC1jb3JlLWNvbm5lY3RvcmpzXCI7XG5pbXBvcnQgeyBwcm9taXNlTG9hZCwgZ3VpZCB9IGZyb20gXCIuLi9VdGlsaXRpZXNcIjtcbmltcG9ydCBTcGluYWxOb2RlUG9pbnRlciBmcm9tIFwiLi4vU3BpbmFsTm9kZVBvaW50ZXJcIjtcblxuY29uc3QgZ2xvYmFsVHlwZSA9IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB3aW5kb3c7XG5cbmltcG9ydCB7IFNwaW5hbFJlbGF0aW9uRmFjdG9yeSB9IGZyb20gXCIuLi9SZWxhdGlvbnMvU3BpbmFsUmVsYXRpb25GYWN0b3J5XCI7XG5pbXBvcnQgU3BpbmFsTWFwIGZyb20gXCIuLi9TcGluYWxNYXBcIjtcbmltcG9ydCBTcGluYWxTZXQgZnJvbSBcIi4uL1NwaW5hbFNldFwiO1xuXG5jbGFzcyBTcGluYWxOb2RlIGV4dGVuZHMgZ2xvYmFsVHlwZS5Nb2RlbCB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3IgZm9yIHRoZSBTcGluYWxOb2RlIGNsYXNzLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIE5hbWUgb2YgdGhlIG5vZGVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSBUeXBlIG9mIHRoZSBub2RlXG4gICAgICogQHBhcmFtIHtTcGluYWxOb2RlIHwgTW9kZWx9IGVsZW1lbnQgRWxlbWVudCBvZiB0aGUgbm9kZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUgPSBcInVuZGVmaW5lZFwiLCB0eXBlID0gXCJTcGluYWxOb2RlXCIsIGVsZW1lbnQgPSBuZXcgZ2xvYmFsVHlwZS5Nb2RlbCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmFkZF9hdHRyKHtcbiAgICAgICAgICAgIGluZm86IHtcbiAgICAgICAgICAgICAgICBpZDogZ3VpZCh0aGlzLmNvbnN0cnVjdG9yLm5hbWUpLFxuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXJlbnRzOiBuZXcgU3BpbmFsTWFwKCksXG4gICAgICAgICAgICBjaGlsZHJlbjogbmV3IFNwaW5hbE1hcCgpLFxuICAgICAgICAgICAgZWxlbWVudDogbmV3IFNwaW5hbE5vZGVQb2ludGVyKGVsZW1lbnQpLFxuICAgICAgICAgICAgY29udGV4dElkczogbmV3IFNwaW5hbFNldCgpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGlkLlxuICAgICAqIEByZXR1cm4ge1N0cn0gSWQgb2YgdGhlIG5vZGVcbiAgICAgKi9cbiAgICBnZXRJZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5mby5pZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBuYW1lLlxuICAgICAqIEByZXR1cm4ge1N0cn0gTmFtZSBvZiB0aGUgbm9kZVxuICAgICAqL1xuICAgIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmluZm8ubmFtZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSB0eXBlLlxuICAgICAqIEByZXR1cm4ge1N0cn0gVHlwZSBvZiB0aGUgbm9kZVxuICAgICAqL1xuICAgIGdldFR5cGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmluZm8udHlwZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBlbGVtZW50LlxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8Kj59IEEgcHJvbWlzZSB3aGVyZSB0aGUgcGFyYW1ldGVyIG9mIHRoZSByZXNvbHZlIG1ldGhvZCBpcyB0aGUgZWxlbWVudFxuICAgICAqL1xuICAgIGdldEVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiBwcm9taXNlTG9hZCh0aGlzLmVsZW1lbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogUmV0dXJucyBhbGwgdGhlIGNoaWxkcmVuIGlkcyBpbiBhbiBhcnJheS5cbiAgICAqIEByZXR1cm4ge0FycmF5PFN0cmluZz59IElkcyBvZiB0aGUgY2hpbGRyZW5cbiAgICAqL1xuICAgIGdldENoaWxkcmVuSWRzKCkge1xuICAgICAgICBsZXQgbm9kZUNoaWxkcmVuSWRzID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgcmVsYXRpb25NYXAgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgICAgICAgZm9yIChsZXQgcmVsYXRpb24gb2YgcmVsYXRpb25NYXApIHtcbiAgICAgICAgICAgICAgICBsZXQgcmVsQ2hpbGRyZW5JZHMgPSByZWxhdGlvbi5nZXRDaGlsZHJlbklkcygpO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZWxDaGlsZHJlbklkcy5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgICAgICAgICAgbm9kZUNoaWxkcmVuSWRzLnB1c2gocmVsQ2hpbGRyZW5JZHNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlQ2hpbGRyZW5JZHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29tcHV0ZXMgYW5kIHJldHVybnMgdGhlIG51bWJlciBvZiBjaGlsZHJlbiBvZiB0aGUgbm9kZS5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBudW1iZXIgb2YgY2hpbGRyZW5cbiAgICAgKi9cbiAgICBnZXROYkNoaWxkcmVuKCkge1xuICAgICAgICBsZXQgY2hpbGRyZW5JZHMgPSB0aGlzLmdldENoaWxkcmVuSWRzKCk7XG5cbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuSWRzLmxlbmd0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbGlzdCBvZiB0aGUgY29udGV4dHMgdGhlIG5vZGUgaXMgYXNzb2NpYXRlZCB0by5cbiAgICAgKiBAcmV0dXJuIHtBcnJheTxTdHJpbmc+fSBBbiBhcnJheSBvZiBpZHMgb2YgdGhlIGFzc29jaWF0ZWQgY29udGV4dHNcbiAgICAgKi9cbiAgICBnZXRDb250ZXh0SWRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0SWRzLnZhbHVlcygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYW4gaWQgdG8gdGhlIGNvbnRleHQgaWRzIG9mIHRoZSBub2RlLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZCBJZCBvZiB0aGUgY29udGV4dFxuICAgICAqL1xuICAgIGFkZENvbnRleHRJZChpZCkge1xuICAgICAgICBpZiAoIXRoaXMuY29udGV4dElkcy5oYXMoaWQpKVxuICAgICAgICAgICAgdGhpcy5jb250ZXh0SWRzLmFkZChpZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBub2RlIGJlbG9uZ3MgdG8gdGhlIGNvbnRleHQuXG4gICAgICogQHBhcmFtIHtTcGluYWxDb250ZXh0fSBjb250ZXh0IFRoZSBjb250ZXh0IHRoYXQgbWlnaHQgb3duIHRoZSBub2RlXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gQSBib29sZWFuXG4gICAgICovXG4gICAgYmVsb25nc1RvQ29udGV4dChjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHRJZHMuaGFzKGNvbnRleHQuZ2V0SWQoKS5nZXQoKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVmVyaWZ5IGlmIHRoZSBub2RlIGNvbnRhaW5zIHRoZSByZWxhdGlvbiBuYW1lLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSByZWxhdGlvbk5hbWUgTmFtZSBvZiB0aGUgcmVsYXRpb25cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcmVsYXRpb25UeXBlIFR5cGUgb2YgdGhlIHJlbGF0aW9uXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gUmV0dXJuIHRydWUgaXMgdGhlIHJlbGF0aW9uIGlzIGNvbnRhaW5lZCBpbiB0aGUgbm9kZSBhbmQgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIGhhc1JlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKSB7XG4gICAgICAgIGNvbnN0IHR5cGVNYXAgPSB0aGlzLl9nZXRDaGlsZHJlblR5cGUocmVsYXRpb25UeXBlKTtcblxuICAgICAgICBpZiAodHlwZW9mIHR5cGVNYXAgPT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiB0eXBlTWFwLmhhcyhyZWxhdGlvbk5hbWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFZlcmlmeSBpZiB0aGUgbm9kZSBjb250YWlucyBhbGwgdGhlIHJlbGF0aW9uIG5hbWVzLlxuICAgICAqIEBwYXJhbSB7QXJyYXk8U3RyaW5nPn0gcmVsYXRpb25OYW1lcyBBcnJheSBjb250YWluaW5nIGFsbCB0aGUgcmVsYXRpb24gbmFtZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSByZWxhdGlvblR5cGUgVHlwZSBvZiB0aGUgcmVsYXRpb25zXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gUmV0dXJuIHRydWUgaWYgdGhlIG5vZGUgY29udGFpbnMgYWxsIHRoZSByZWxhdGlvbnMgaW4gcmVsYXRpb25OYW1lcywgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIGhhc1JlbGF0aW9ucyhyZWxhdGlvbk5hbWVzLCByZWxhdGlvblR5cGUpIHtcbiAgICAgICAgbGV0IHJlcyA9IHRydWU7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZWxhdGlvbk5hbWVzLmxlbmd0aCAmJiByZXM7IGkrKykge1xuICAgICAgICAgICAgcmVzID0gdGhpcy5oYXNSZWxhdGlvbihyZWxhdGlvbk5hbWVzW2ldLCByZWxhdGlvblR5cGUpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCB0aGUgbm9kZSBhcyBjaGlsZCBvZiB0aGUgcmVsYXRpb24uXG4gICAgICogQHBhcmFtIHtTcGluYWxOb2RlIHwgTW9kZWx9IGNoaWxkIEVsZW1lbnQgdG8gYWRkIGFzIGNoaWxkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHJlbGF0aW9uTmFtZSBOYW1lIG9mIHRoZSByZWxhdGlvblxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSByZWxhdGlvblR5cGUgVHlwZSBvZiB0aGUgcmVsYXRpb25cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPFNwaW5hbE5vZGU+fSBUaGUgY2hpbGQgbm9kZSBpbiBhIHByb21pc2VcbiAgICAgKi9cbiAgICBhc3luYyBhZGRDaGlsZChjaGlsZCwgcmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpIHtcbiAgICAgICAgbGV0IHJlbGF0aW9uO1xuXG4gICAgICAgIGlmICghKGNoaWxkIGluc3RhbmNlb2YgZ2xvYmFsVHlwZS5Nb2RlbCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBhZGQgYSBjaGlsZCB3aXRjaCBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgU3BpbmFsTm9kZSBvciBNb2RlbC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIShjaGlsZCBpbnN0YW5jZW9mIFNwaW5hbE5vZGUpKSB7XG4gICAgICAgICAgICBjaGlsZCA9IG5ldyBTcGluYWxOb2RlKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBjaGlsZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuaGFzUmVsYXRpb24ocmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpKVxuICAgICAgICAgICAgcmVsYXRpb24gPSB0aGlzLl9jcmVhdGVSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJlbGF0aW9uID0gdGhpcy5fZ2V0UmVsYXRpb24ocmVsYXRpb25OYW1lLCByZWxhdGlvblR5cGUpO1xuXG4gICAgICAgIGF3YWl0IHJlbGF0aW9uLmFkZENoaWxkKGNoaWxkKTtcbiAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBjaGlsZCBhbmQgbm90aWNlcyB0aGUgY29udGV4dCBpZiBhIG5ldyByZWxhdGlvbiB3YXMgY3JlYXRlZC5cbiAgICAgKiBAcGFyYW0ge1NwaW5hbE5vZGUgfCBNb2RlbH0gY2hpbGQgTm9kZSB0byBhZGQgYXMgY2hpbGRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcmVsYXRpb25OYW1lIE5hbWUgb2YgdGhlIHJlbGF0aW9uXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHJlbGF0aW9uVHlwZSBUeXBlIG9mIHRoZSByZWxhdGlvblxuICAgICAqIEBwYXJhbSB7U3BpbmFsQ29udGV4dH0gY29udGV4dCBDb250ZXh0IHRvIHVwZGF0ZVxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8U3BpbmFsTm9kZT59IFRoZSBjaGlsZCBub2RlIGluIGEgcHJvbWlzZVxuICAgICAqL1xuICAgIGFzeW5jIGFkZENoaWxkSW5Db250ZXh0KGNoaWxkLCByZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSwgY29udGV4dCkge1xuICAgICAgICBsZXQgcmVsYXRpb247XG5cbiAgICAgICAgaWYgKCEoY2hpbGQgaW5zdGFuY2VvZiBnbG9iYWxUeXBlLk1vZGVsKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGFkZCBhIGNoaWxkIHdpdGNoIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBTcGluYWxOb2RlIG9yIE1vZGVsLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghKGNoaWxkIGluc3RhbmNlb2YgU3BpbmFsTm9kZSkpIHtcbiAgICAgICAgICAgIGNoaWxkID0gbmV3IFNwaW5hbE5vZGUodW5kZWZpbmVkLCB1bmRlZmluZWQsIGNoaWxkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5oYXNSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSkpXG4gICAgICAgICAgICByZWxhdGlvbiA9IHRoaXMuX2NyZWF0ZVJlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmVsYXRpb24gPSB0aGlzLl9nZXRSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSk7XG5cbiAgICAgICAgY2hpbGQuYWRkQ29udGV4dElkKGNvbnRleHQuZ2V0SWQoKS5nZXQoKSk7XG4gICAgICAgIHJlbGF0aW9uLmFkZENvbnRleHRJZChjb250ZXh0LmdldElkKCkuZ2V0KCkpO1xuXG4gICAgICAgIGF3YWl0IHJlbGF0aW9uLmFkZENoaWxkKGNoaWxkKTtcbiAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSB0aGUgbm9kZSBmcm9tIHRoZSByZWxhdGlvbiBjaGlsZHJlbi5cbiAgICAgKiBAcGFyYW0ge1NwaW5hbE5vZGV9IG5vZGUgTm9kZSB0byByZW1vdmVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcmVsYXRpb25OYW1lIE5hbWUgb2YgdGhlIHJlbGF0aW9uIHRvIHdpY2ggdGhlIG5vZGUgYmVsb25nc1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSByZWxhdGlvblR5cGUgVHlwZSBvZiB0aGUgcmVsYXRpb24gdG8gd2ljaCB0aGUgbm9kZSBiZWxvbmdzXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxub3RoaW5nPn0gQW4gZW1wdHkgcHJvbWlzZVxuICAgICAqL1xuICAgIGFzeW5jIHJlbW92ZUNoaWxkKG5vZGUsIHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKSB7XG4gICAgICAgIGlmICh0aGlzLmhhc1JlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKSkge1xuICAgICAgICAgICAgbGV0IHJlbCA9IHRoaXMuX2dldFJlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKTtcbiAgICAgICAgICAgIHJlbC5yZW1vdmVDaGlsZChub2RlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSB0aGUgbm9kZSBmcm9tIHRoZSBncmFwaCBpLmUgcmVtb3ZlIHRoZSBub2RlIGZyb20gYWxsIHRoZSBwYXJlbnQgcmVsYXRpb25zIGFuZCByZW1vdmUgYWxsIHRoZSBjaGlsZHJlbiByZWxhdGlvbnMuXG4gICAgICogVGhpcyBvcGVyYXRpb24gbWlnaHQgZGVsZXRlIGFsbCB0aGUgc3ViLWdyYXBoIHVuZGVyIHRoaXMgbm9kZS5cbiAgICAgKiBBZnRlciB0aGlzIG9wZXJhdGlvbiB0aGUgbm9kZSBjYW4gYmUgZGVsZXRlZCB3aXRob3V0IGZlYXIuXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxub3RoaW5nPn0gQW4gZW1wdHkgcHJvbWlzZVxuICAgICAqL1xuICAgIGFzeW5jIHJlbW92ZUZyb21HcmFwaCgpIHtcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgdGhpcy5fcmVtb3ZlRnJvbVBhcmVudHMoKSxcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZUZyb21DaGlsZHJlbigpXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNoaWxkcmVuIG9mIHRoZSBub2RlIGZvciB0aGUgcmVsYXRpb24gbmFtZXMuXG4gICAgICogQHBhcmFtIHtBcnJheTxTdHJpbmc+fSByZWxhdGlvbk5hbWVzIEFycmF5IGNvbnRhaW5pbmcgdGhlIHJlbGF0aW9uIG5hbWVzIG9mIHRoZSBkZXNpcmVkIGNoaWxkcmVuXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxBcnJheTxTcGluYWxOb2RlPj59IFRoZSBjaGlsZHJlbiB0aGF0IHdlcmUgZm91bmRcbiAgICAgKi9cbiAgICBhc3luYyBnZXRDaGlsZHJlbihyZWxhdGlvbk5hbWVzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVsYXRpb25OYW1lcyA9PT0gXCJ1bmRlZmluZWRcIiB8fCByZWxhdGlvbk5hbWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmVsYXRpb25OYW1lcyA9IHRoaXMuX2dldFJlbGF0aW9uTmFtZXMoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcmVsYXRpb25OYW1lcyA9PT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgIHJlbGF0aW9uTmFtZXMgPSBbcmVsYXRpb25OYW1lc107XG5cbiAgICAgICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCByZWxhdGlvbk1hcCBvZiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJlbGF0aW9uTmFtZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAocmVsYXRpb25NYXAuaGFzKHJlbGF0aW9uTmFtZXNbal0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlbGF0aW9uID0gcmVsYXRpb25NYXAuZ2V0RWxlbWVudChyZWxhdGlvbk5hbWVzW2pdKTtcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChyZWxhdGlvbi5nZXRDaGlsZHJlbigpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjaGlsZHJlbkxzdCA9IGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICAgICAgbGV0IHJlcyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGNoaWxkcmVuIG9mIGNoaWxkcmVuTHN0KSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcmVzLnB1c2goY2hpbGRyZW5baV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIGNoaWxkcmVuIG9mIHRoZSBub2RlIHRoYXQgYXJlIHJlZ2lzdGVyZWQgaW4gdGhlIGNvbnRleHRcbiAgICAgKiBAcGFyYW0ge1NwaW5hbENvbnRleHR9IGNvbnRleHQgQ29udGV4dCB0byB1c2UgZm9yIHRoZSBzZWFyY2hcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlPEFycmF5PFNwaW5hbE5vZGU+Pn0gVGhlIGNoaWxkcmVuIHRoYXQgd2VyZSBmb3VuZFxuICAgICAqL1xuICAgIGFzeW5jIGdldENoaWxkcmVuSW5Db250ZXh0KGNvbnRleHQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjb250ZXh0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJZb3UgbXVzdCBnaXZlIGEgY29udGV4dFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByb21pc2VzID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgcmVsYXRpb25NYXAgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgICAgICAgZm9yIChsZXQgcmVsYXRpb24gb2YgcmVsYXRpb25NYXApIHtcbiAgICAgICAgICAgICAgICBpZiAocmVsYXRpb24uYmVsb25nc1RvQ29udGV4dChjb250ZXh0KSkge1xuICAgICAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKHJlbGF0aW9uLmdldENoaWxkcmVuSW5Db250ZXh0KGNvbnRleHQpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjaGlsZHJlbkxzdCA9IGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICAgICAgbGV0IHJlcyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGNoaWxkcmVuIG9mIGNoaWxkcmVuTHN0KSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcmVzLnB1c2goY2hpbGRyZW5baV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYWxsIHBhcmVudHMgZm9yIHRoZSByZWxhdGlvbiBuYW1lcyBubyBtYXR0ZXIgdGhlIHR5cGUgb2YgcmVsYXRpb25cbiAgICAgKiBAcGFyYW0ge0FycmF5PFN0cmluZz59IHJlbGF0aW9uTmFtZXMgQXJyYXkgY29udGFpbmluZyB0aGUgcmVsYXRpb24gbmFtZSBvZiB0aGUgZGVzaXJlZCBwYXJlbnRzXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxBcnJheTxTcGluYWxOb2RlPj59IFByb21pc2UgY29udGFpbmluZyB0aGUgcGFyZW50cyB0aGF0IHdlcmUgZm91bmRcbiAgICAgKi9cbiAgICBnZXRQYXJlbnRzKHJlbGF0aW9uTmFtZXMpIHtcbiAgICAgICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcblxuICAgICAgICBpZiAodHlwZW9mIHJlbGF0aW9uTmFtZXMgPT09IFwidW5kZWZpbmVkXCIgfHwgcmVsYXRpb25OYW1lcy5sZW5ndGggPT09IDApXG4gICAgICAgICAgICByZWxhdGlvbk5hbWVzID0gdGhpcy5wYXJlbnRzLmtleXMoKTtcbiAgICAgICAgZm9yIChsZXQgbmFtZSBvZiByZWxhdGlvbk5hbWVzKSB7XG4gICAgICAgICAgICBjb25zdCBsaXN0ID0gdGhpcy5wYXJlbnRzLmdldEVsZW1lbnQobmFtZSk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2gocHJvbWlzZUxvYWQobGlzdFtpXSkudGhlbihyZWxhdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWxhdGlvbi5nZXRQYXJlbnQoKTtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIHJlbGF0aW9uIGxpc3QgY29ycmVzcG9uZGluZyB0byB0aGUgcmVsYXRpb24gdHlwZS5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcmVsYXRpb25UeXBlIFR5cGUgb2YgdGhlIHJlbGF0aW9uXG4gICAgICogQHJldHVybiB7U3BpbmFsTWFwfSBSZXR1cm4gdGhlIHJlbGF0aW9uIGxpc3QgY29ycmVzcG9uZGluZyB0byB0aGUgcmVsYXRpb24gdHlwZVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2dldENoaWxkcmVuVHlwZShyZWxhdGlvblR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4uZ2V0RWxlbWVudChyZWxhdGlvblR5cGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgcmVsYXRpb24gY29ycmVzcG9uZGluZy5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcmVsYXRpb25OYW1lIE5hbWUgb2YgdGhlIHJlbGF0aW9uXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHJlbGF0aW9uVHlwZSBUeXBlIG9mIHRoZSByZWxhdGlvblxuICAgICAqIEByZXR1cm4ge1NwaW5hbFJlbGF0aW9ufSBUaGUgcmVsYXRpb24gY29ycmVzcG9uZGluZ1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2dldFJlbGF0aW9uKHJlbGF0aW9uTmFtZSwgcmVsYXRpb25UeXBlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRDaGlsZHJlblR5cGUocmVsYXRpb25UeXBlKS5nZXRFbGVtZW50KHJlbGF0aW9uTmFtZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhIHBhcmVudCByZWxhdGlvbiBvZiB0aGUgbm9kZS5cbiAgICAgKiBAcGFyYW0ge1NwaW5hbFJlbGF0aW9ufSByZWxhdGlvbiBSZWxhdGlvbiB0byByZW1vdmVcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9yZW1vdmVQYXJlbnQocmVsYXRpb24pIHtcbiAgICAgICAgY29uc3QgcGFyZW50THN0ID0gdGhpcy5wYXJlbnRzLmdldEVsZW1lbnQocmVsYXRpb24uZ2V0TmFtZSgpLmdldCgpKTtcblxuICAgICAgICBjb25zdCBpbmRleFRPUmVtb3ZlID0gcGFyZW50THN0LmluZGV4T2YocGFyZW50UHRyID0+XG4gICAgICAgICAgICBwYXJlbnRQdHIuZ2V0SWQoKS5nZXQoKSA9PT0gcmVsYXRpb24uZ2V0SWQoKS5nZXQoKVxuICAgICAgICApO1xuXG4gICAgICAgIHBhcmVudExzdC5zcGxpY2UoaW5kZXhUT1JlbW92ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgbm9kZSBmcm9tIGFsbCBwYXJlbnQgcmVsYXRpb24gdGhlIHByb3BlcnR5IHBhcmVudHMuXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBhc3luYyBfcmVtb3ZlRnJvbVBhcmVudHMoKSB7XG4gICAgICAgIGNvbnN0IHByb21pc2VzID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgcGFyZW50IG9mIHRoaXMucGFyZW50cykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJlbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwcm9taXNlTG9hZChwYXJlbnRbaV0pLnRoZW4ocGFyZW50UmVsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChwYXJlbnRSZWwucmVtb3ZlQ2hpbGQodGhpcykpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIHRoZSByZWxhdGlvbiBhcyBwYXJlbnQgb2YgdGhlIG5vZGUuXG4gICAgICogQHBhcmFtIHtTcGluYWxSZWxhdGlvbn0gcmVsYXRpb24gUGFyZW50IHJlbGF0aW9uXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfYWRkUGFyZW50KHJlbGF0aW9uKSB7XG4gICAgICAgIGNvbnN0IHJlbGF0aW9uTmFtZSA9IHJlbGF0aW9uLmdldE5hbWUoKTtcblxuICAgICAgICBpZiAodGhpcy5wYXJlbnRzLmhhcyhyZWxhdGlvbk5hbWUuZ2V0KCkpKSB7XG4gICAgICAgICAgICB0aGlzLnBhcmVudHMuZ2V0RWxlbWVudChyZWxhdGlvbk5hbWUpLnB1c2gobmV3IFNwaW5hbE5vZGVQb2ludGVyKHJlbGF0aW9uKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBsaXN0ID0gbmV3IGdsb2JhbFR5cGUuTHN0KCk7XG4gICAgICAgICAgICBsaXN0LnB1c2gobmV3IFNwaW5hbE5vZGVQb2ludGVyKHJlbGF0aW9uKSk7XG4gICAgICAgICAgICB0aGlzLnBhcmVudHMuc2V0RWxlbWVudChyZWxhdGlvbk5hbWUsIGxpc3QpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IHJlbGF0aW9uIGZvciB0aGlzIG5vZGUuXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHJlbGF0aW9uTmFtZSBOYW1lIG9mIHRoZSByZWxhdGlvblxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSByZWxhdGlvblR5cGUgVHlwZSBvZiB0aGUgcmVsYXRpb25cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9jcmVhdGVSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSkge1xuICAgICAgICBjb25zdCByZWxhdGlvbiA9IFNwaW5hbFJlbGF0aW9uRmFjdG9yeS5nZXROZXdSZWxhdGlvbihyZWxhdGlvbk5hbWUsIHJlbGF0aW9uVHlwZSk7XG4gICAgICAgIHJlbGF0aW9uLnNldFBhcmVudCh0aGlzKTtcblxuICAgICAgICBpZiAoIXRoaXMuY2hpbGRyZW4uaGFzKHJlbGF0aW9uVHlwZSkpIHtcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4uc2V0RWxlbWVudChyZWxhdGlvblR5cGUsIG5ldyBTcGluYWxNYXAoKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZ2V0Q2hpbGRyZW5UeXBlKHJlbGF0aW9uVHlwZSkuc2V0RWxlbWVudChyZWxhdGlvbk5hbWUsIHJlbGF0aW9uKTtcbiAgICAgICAgcmV0dXJuIHJlbGF0aW9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhbGwgY2hpbGRyZW4gcmVsYXRpb24gZnJvbSB0aGUgZ3JhcGguXG4gICAgICogQHJldHVybiB7UHJvbWlzZTxub3RoaW5nPn0gQW4gZW1wdHkgcHJvbWlzZVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgYXN5bmMgX3JlbW92ZUZyb21DaGlsZHJlbigpIHtcbiAgICAgICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCByZWxhdGlvbk1hcCBvZiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBmb3IgKGxldCByZWxhdGlvbiBvZiByZWxhdGlvbk1hcCkge1xuICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2gocmVsYXRpb24ucmVtb3ZlRnJvbUdyYXBoKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCB0aGUgcmVsYXRpb24gbmFtZXMgb2YgdGhlIG5vZGUuXG4gICAgICogQHJldHVybiB7QXJyYXk8U3RyaW5nPn0gVGhlIG5hbWVzIG9mIHRoZSByZWxhdGlvbnMgb2YgdGhlIG5vZGVcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9nZXRSZWxhdGlvbk5hbWVzKCkge1xuICAgICAgICBsZXQgbmFtZXMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCByZWxhdGlvbk1hcCBvZiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBuYW1lcy5wdXNoKC4uLnJlbGF0aW9uTWFwLmtleXMoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5hbWVzO1xuICAgIH1cbn1cblxuc3BpbmFsQ29yZS5yZWdpc3Rlcl9tb2RlbHMoW1NwaW5hbE5vZGVdKTtcbmV4cG9ydCBkZWZhdWx0IFNwaW5hbE5vZGU7XG4iXX0=