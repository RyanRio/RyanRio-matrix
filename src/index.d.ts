// Type definitions for davinci-matrix 1.0.0
// Project: https://github.com/RyanRio/ryanrio-matrix
//
// This file was created manually in order to support the davinci-matrix library.

export interface Matrix {
    readonly rows: number;
    readonly cols: number;
    getElement(row: number, column: number): number;
    readonly square?: boolean;
}

export function matrix(elements: number[][]): Matrix;
export function ones(rows: number, cols: number): Matrix;
export function zeros(rows: number, cols: number): Matrix;
export function identityMatrix(rows: number, cols: number): Matrix;
