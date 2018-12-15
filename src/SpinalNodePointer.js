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

import spinalCore from "spinal-core-connectorjs";
import SpinalNode from "./Nodes/SpinalNode";

const globalType = typeof window === "undefined" ? global : window;

/**
 * Wrapper over SpinalNodePointer containing some information about the pointed element
 */
class SpinalNodePointer extends globalType.Model {
  /**
   * Constructor for the SpinalNodePointer class.
   * @param {SpinalNode | Model} element Element to wich the SpinalNodePointer will point
   */
  constructor(element) {
    super();

    this.add_attr({
      ptr: new globalType.Ptr(),
      info: {}
    });

    this.setElement(element);
  }

  /**
   * Sets pointer to point to an element.
   * @param {SpinalNode | Model} element
   * @throws {Error} If the element is not a Model
   */
  setElement(element) {
    if (!(element instanceof globalType.Model)) {
      console.log("element: ", element);
      throw Error("The pointed value must be a Model");
    }

    if (element instanceof SpinalNode) {
      this.info.mod_attr("pointedId", element.getId());
      this.info.mod_attr("pointedType", element.getType());
    }

    this.ptr.set(element);
  }

  /**
   * Loads the model to which the pointer is pointing.
   * @returns {Model} The model to which the pointer is pointing
   */
  load() {
    return new Promise(resolve => {
      this.ptr.load(resolve);
    });
  }

  /**
   * Unsets the pointer.
   */
  unset() {
    this.info.rem_attr("pointedId");
    this.info.rem_attr("pointedType");
    this.ptr.set(0);
  }

  /**
   * Returns the id of the pointed element.
   * @returns {Str} Id of the pointed element
   */
  getId() {
    return this.info.pointedId;
  }

  /**
   * This function returns the type of the pointed element.
   * @returns {Str} Type of the pointed element
   */
  getType() {
    return this.info.pointedType;
  }
}

spinalCore.register_models([SpinalNodePointer]);
export default SpinalNodePointer;
