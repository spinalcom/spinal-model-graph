"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const SpinalNode_1 = require("./SpinalNode");
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const __1 = require("..");
const Utilities_1 = require("../Utilities");
const SpinalContext_1 = require("./SpinalContext");
const HAS_CONTEXT_RELATION_NAME = 'hasContext';
/**
 * Starting node of a graph.
 * @extends SpinalNode
 */
class SpinalGraph extends SpinalNode_1.SpinalNode {
    /**
     * Constructor for the SpinalGraph class.
     * @param {String} [name="undefined"] Name of the graph, usually unused
     * @param {String} [type="SpinalGraph"] Type of the graph, usually unused
     * @param {SpinalNode | Model} [element] Element of the graph
     * @throws {TypeError} If the element is not a Model
     */
    constructor(name = 'undefined', type = 'SpinalGraph', element) {
        super(name, type, element);
        if (spinal_core_connectorjs_type_1.FileSystem._sig_server === false)
            return;
        this.info.id.set(Utilities_1.guid(this.constructor.name));
    }
    /**
     * Adds a context to the graph.
     * @param {SpinalContext} context Context to be added
     * @returns {Promise<SpinalContext>} The added context
     * @throws {TypeError} If the context is not a context
     */
    async addContext(context) {
        if (!(context instanceof SpinalContext_1.SpinalContext)) {
            throw new TypeError('context must be a context');
        }
        return this.addChild(context, HAS_CONTEXT_RELATION_NAME, __1.SPINAL_RELATION_TYPE);
    }
    /**
     * Searches for a context using its name.
     * @param {String} name Name of the context
     * @returns {SpinalContext | undefined} The wanted context or undefined
     * @throws {TypeError} If name is not a string
     */
    async getContext(name) {
        if (typeof name !== 'string') {
            throw TypeError('name must be string');
        }
        const children = await this.getChildren([HAS_CONTEXT_RELATION_NAME]);
        return children.find(child => child.info.name.get() === name);
    }
    /**
     * Empty override of the SpinalNode method.
     * @override
     * @returns {Promise<nothing>} An empty promise
     */
    async removeFromGraph() {
    }
}
exports.SpinalGraph = SpinalGraph;
spinal_core_connectorjs_type_1.spinalCore.register_models([SpinalGraph]);
exports.default = SpinalGraph;
//# sourceMappingURL=SpinalGraph.js.map