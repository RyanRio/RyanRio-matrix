import { Matrix } from './matrix';
import { matrix } from './matrix';

export function init(rows: number, cols: number, value: number): Matrix {
    const elements: number[][] = [];
    for (let i = 0; i < rows; i++) {
        const row: number[] = [];
        for (let j = 0; j < cols; j++) {
            row.push(value);
        }
        elements.push(row);
    }
    return matrix(elements);
}
