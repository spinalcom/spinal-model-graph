"use strict";
exports.__esModule = true;
var src_1 = require("../../src");
var assert = require("assert");
var DEFAULT_NODE = new src_1.SpinalNode();
var DEFAULT_RELATION_NAME = 'duh';
describe('SpinalRelationFactory', function () {
    describe('How to use getNewRelation', function () {
        it('should return a SpinalRelationRef', function () {
            var rel = src_1.SpinalRelationFactory
                .getNewRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_TYPE);
            assert(rel instanceof src_1.SpinalRelationRef);
        });
        it('should return a SpinalRelationLstPtr', function () {
            var rel = src_1.SpinalRelationFactory
                .getNewRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_LST_PTR_TYPE);
            assert(rel instanceof src_1.SpinalRelationLstPtr);
        });
        it('should return a SpinalRelationPtrLst', function () {
            var rel = src_1.SpinalRelationFactory
                .getNewRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME, src_1.SPINAL_RELATION_PTR_LST_TYPE);
            assert(rel instanceof src_1.SpinalRelationPtrLst);
        });
        it('should throw an error if the type is invalid', function () {
            assert.throws(function () {
                src_1.SpinalRelationFactory
                    .getNewRelation(DEFAULT_NODE, DEFAULT_RELATION_NAME, -1);
            }, Error);
        });
    });
});
//# sourceMappingURL=SpinalRelationFactoryTest.js.map