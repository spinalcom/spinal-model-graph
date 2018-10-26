import SpinalRelation from "./SpinalRelation";
import SpinalRelationLstPtr from "./SpinalRelationLstPtr"
import SpinalRelationPtrLst from "./SpinalRelationPtrLst"

const SPINAL_RELATION_TYPE = 0;
const SPINAL_RELATION_LST_PTR_TYPE = 1;
const SPINAL_RELATION_PTR_LST_TYPE = 2;

class SpinalRelationFactory {
    constructor() {

    }

    /**
     * Create a new relation of relationType with the relationName
     * @param relationName {string} name of the relation
     * @param relationType {string} type of the relation
     * @return {SpinalRelation|SpinalRelationLstPtr|SpinalRelationPtrLst}
     */
    static getNewRelation(relationName, relationType) {

        let relation;
        switch (relationType) {
            case SPINAL_RELATION_TYPE:
                relation = new SpinalRelation(relationName);
                break;
            case SPINAL_RELATION_LST_PTR_TYPE:
                relation = new SpinalRelationLstPtr(relationName);
                break;
            case SPINAL_RELATION_PTR_LST_TYPE:
                relation = new SpinalRelationPtrLst(relationName);
                break;
            default:
                throw new Error("Unknown relationType");
        }

        return relation;
    }
}

spinalCore.register_models([SpinalRelationFactory]);
export {
    SPINAL_RELATION_TYPE,
    SPINAL_RELATION_LST_PTR_TYPE,
    SPINAL_RELATION_PTR_LST_TYPE,
    SpinalRelationFactory
}
