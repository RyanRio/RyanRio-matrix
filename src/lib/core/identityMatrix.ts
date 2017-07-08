import { Matrix, matrix } from './matrix';

export function identityMatrix(rows: number, cols: number): Matrix {
    const elements: number[][] = [];
    let zeroIterator = 0;
    for (let i = 0; i < rows; i++) {
        const row: number[] = [];
        for (let j = 0; j < cols; j++) {
            let value;
            if (zeroIterator % (rows + 1) === 0) {
                value = 1;
            }
            else {
                value = 0;
            }
            row.push(value);
            zeroIterator++;
        }
        elements.push(row);
    }
    return matrix(elements);
}
