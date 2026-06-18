import type { Model } from 'spinal-core-connectorjs';
/**
 * @type SpinalMapForEachFunc
 * @template T
 */
export type SpinalMapForEachFunc<T extends Model> = (value: T, key: string) => void;
