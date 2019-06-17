"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../src");
const assert = require("assert");
const DEFAULT_NODE = new src_1.SpinalNode();
const DEFAULT_RELATION_NAME = 'duh';
describe('SpinalRelationFactory', () => {
    describe('How to use getNewRelation', () => {
        it('should return a SpinalRelationRef', () => {
            const rel = src_1.SpinalRelationFactory
                .getNewRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE);
            assert(rel instanceof src_1.SpinalRelationRef);
        });
        it('should return a SpinalRelationLstPtr', () => {
            const rel = src_1.SpinalRelationFactory
                .getNewRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_LST_PTR_TYPE);
            assert(rel instanceof src_1.SpinalRelationLstPtr);
        });
        it('should return a SpinalRelationPtrLst', () => {
            const rel = src_1.SpinalRelationFactory
                .getNewRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_PTR_LST_TYPE);
            assert(rel instanceof src_1.SpinalRelationPtrLst);
        });
        it('should throw an error if the type is invalid', () => {
            assert.throws(() => {
                src_1.SpinalRelationFactory
                    .getNewRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME, -1);
            }, Error);
        });
    });
});
//# sourceMappingURL=SpinalRelationFactoryTest.js.map