import { Matrix } from './matrix';
import { init } from './init';

/**
 * Returns a matrix with each element as a one
 * @param rows number of rows
 * @param cols number of columns
 */
export function ones(rows: number, cols: number): Matrix {
    return init(rows, cols, 1);
}
