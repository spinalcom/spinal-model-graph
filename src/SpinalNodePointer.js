import spinalCore from "spinal-core-connectorjs"
import SpinalNode from "./Nodes/SpinalNode";

const globalType = typeof window === "undefined" ? global : window;

/**
 * Wrapper over SpinalNodePointer containing some information about the pointed element
 */
class SpinalNodePointer extends globalType.Model {
    /**
     * 
     * @param {SpinalNode | Model} element Element to wich the SpinalNodePointer will point
     */
    constructor(element) {
        super();

        this.add_attr({
            ptr: new globalType.Ptr(),
            info: {
                pointed_id: "undefined",
                pointed_type: "undefined"
            }
        });

        if (typeof element !== "undefined") {
            this.setElement(element);
        }
    }

    /**
     * Sets pointer to point to an element.
     * @param {SpinalNode | Model} element
     */
    setElement(element) {
        if (element instanceof SpinalNode) {
            this.info.pointed_id.set(element.getId());
            this.info.pointed_type.set(element.getType());
        }
        this.ptr.set(element);
    }

    /**
     * Returns the id of the pointed element.
     * @return {Str} Id of the pointed element
     */
    getId() {
        return this.info.pointed_id;
    }

    /**
     * This function returns the type of the pointed element.
     * @return {Str} Type of the pointed element
     */
    getId() {
        return this.info.pointed_type;
    }
}

spinalCore.register_models([SpinalNodePointer]);
export default SpinalNodePointer
