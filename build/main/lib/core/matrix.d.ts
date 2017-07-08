export interface Matrix {
    readonly rows: number;
    readonly cols: number;
    getElement(row: number, column: number): number;
    __add__(rhs: any): Matrix | undefined;
    __determinant__(): number | undefined;
    __minorMatrix__(): Matrix | null;
    __cofactorMatrix__(): Matrix | undefined;
    __transpose__(): Matrix | undefined;
    __scalar__(toscalar: number): Matrix | undefined;
    toString(): string;
    __inverse__(): Matrix | undefined;
    square?: boolean;
    elements: number[][];
}
export declare function setupDeterminant(toSet: Matrix, ignoreColumn: number, ignoreRow?: number): Matrix | undefined;
export declare function matrix(elements: number[][]): Matrix;
