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
import "spinal-core-connectorjs";

const globalType = typeof window === "undefined" ? global : window;

/**
 * Loads the element pointed by the pointer.
 * @param {SpinalNodePointer} nodePointer SpinalNodePointer to load
 * @return {Promise<*>} Element to wich the pointer pointed
 */
function promiseLoad(nodePointer) {
    if (
        nodePointer.ptr instanceof globalType.Ptr &&
        nodePointer.ptr.data.value !== 0 &&
        typeof FileSystem._objects[nodePointer.ptr.data.value] !== "undefined"
    )
        return Promise.resolve(FileSystem._objects[nodePointer.ptr.data.value]);
    else
        return new Promise(resolve => {
            nodePointer.ptr.load(resolve);
        });
}

/**
 * Generates a random number and returns in a string.
 * @returns {String} Random number in a string
 */
function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

/**
 * Creates a unique id based on a name.
 * @param {String} name Name from wich the id is generated
 * @return {String} Generated id
 */
function guid(name) {
    return (
        name + "-" + s4() + s4() + "-" + s4() + "-" + s4() + "-" +
        s4() + "-" + s4() + s4() + s4() + "-" + Date.now().toString(16)
    );
}

export {
    promiseLoad,
    guid
}
