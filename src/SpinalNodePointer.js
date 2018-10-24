import "spinal-core-connectorjs"
import SpinalNode from "./Nodes/SpinalNode";

const globalType = typeof window === "undefined" ? global : window;

/**
 * Wrapper over SpinalNodePointer containing some information about the pointed element
 */
class SpinalNodePointer extends globalType.Model {
    constructor(element) {
        super();
        this.setUp(element);
    }

    setUp(element) {
        this.add_attr({
            ptr: new globalType.Ptr(),
            info: {
                pointed_id: "undefined",
            }
        });

        if ((typeof element !== "undefined")) {
            this.set(element);
        }

    }

    /**
     * Set pointer to point this element
     * @param element {*}
     */
    set(element) {
        if (element instanceof SpinalNode){
            this.info.pointed_id = element.id;
            this.info.pointed_type = element.getType();
        }
        this.ptr.set(element);
    }

    /**
     * This function return the id of the pointed element
     * @return {string}
     */
    getId(){
        return this.info.pointed_id;
    }


}

export default SpinalNodePointer