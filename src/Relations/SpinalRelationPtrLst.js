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
import BaseSpinalRelation from "./BaseSpinalRelation"
import { SPINAL_RELATION_PTR_LST_TYPE } from "./SpinalRelationFactory"
import SpinalNode from "../Nodes/SpinalNode"
import { promiseLoad } from "../Utilities";
import SpinalNodePointer from "../SpinalNodePointer";
import spinalCore from "spinal-core-connectorjs";

const globalType = typeof window === "undefined" ? global : window;

class SpinalRelationPtrLst extends BaseSpinalRelation {
    /**
     * 
     * @param {String} name Name of the relation 
     */
    constructor(name) {
        super(name);
        this.add_attr({
            children: new SpinalNodePointer(new globalType.Lst())
        });

        this.children.info.add_attr("ids", []);
    }

    /**
     * Retrieves all the ids of the children of the relation and return them inside an array.
     * @return {Array<String>} Array containing all the children ids of the relation
     */
    getChildrenIds() {
        const idLst = this.children.info.ids;
        let ids = [];

        for (let i = 0; i < idLst.length; i++) {
            ids.push(idLst[0].get());
        }
        return ids;
    }

    /**
     * Return all the children of the relation.
     * @return {Promise<Array<SpinalNode>>} Promise containing a list of all the children of the relation
     */
    async getChildren() {
        const childrenLst = await promiseLoad(this.children);
        let children = [];

        for (let i = 0; i < childrenLst.length; i++) {
            children.push(childrenLst[i]);
        }
        return children;
    }

    /**
     * Returns the type of the relation.
     * @return {Number} Type of the relation
     */
    getType() {
        return SPINAL_RELATION_PTR_LST_TYPE;
    }

    /**
     * Adds a child to the relation.
     * @param {SpinalNode | Model} node Node to be added
     */
    addChild(node) {
        if (node instanceof SpinalNode && !this.children.info.ids.contains(node.getId())) {
            this.children.info.ids.push(node.getId());
            promiseLoad(this.children).then((children) => {
                children.push(node);
            });
        }
        else if (node instanceof globalType.Model) {
            const tmpNode = new SpinalNode(undefined, this.name, node);
            this.addChild(tmpNode);
        }
        else {
            throw new Error("Cannot add a child witch is not an instance of SpinalNode or Model.");
        }
    }

    /**
     * Removes a child from the relation.
     * @param {SpinalNode} node Child to remove
     */
    async removeChild(node) {
        const childrenLst = await promiseLoad(this.children);

        childrenLst.remove(node);
    }
}

spinalCore.register_models([SpinalRelationPtrLst]);
export default SpinalRelationPtrLst;
