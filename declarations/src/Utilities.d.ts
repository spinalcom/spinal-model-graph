/**
 * Creates a unique id based on a name.
 * @param {string} name Name from wich the id is generated
 * @returns {string} Generated id
 */
declare function guid(name: string): string;
declare function loadRelation(spinalNodePointer: any): Promise<any>;
export { guid, loadRelation };
