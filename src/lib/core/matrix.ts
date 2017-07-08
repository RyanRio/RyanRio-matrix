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

function computeColumns(elements: number[][]): number {
    for (const row of elements) {
        return row.length;
    }
    throw new Error("elements must contain at least one row.");
}

function add(lhs: Matrix, rhs: Matrix): Matrix {
    const rows = lhs.rows;
    const cols = lhs.cols;
    const elements: number[][] = [];
    for (let i = 0; i < rows; i++) {
        const row: number[] = [];
        for (let j = 0; j < cols; j++) {
            row.push(lhs.getElement(i + 1, j + 1) + rhs.getElement(i + 1, j + 1));
        }
        elements.push(row);
    }
    return matrix(elements);
}


function minorMatrix(input: Matrix): Matrix {
    const elements: number[][] = [];
    const rows = input.rows;
    const cols = input.cols;
    for (let i = 0; i < rows; i++) {
        const row: number[] = [];
        for (let j = 0; j < cols; j++) {
            const dMatrix = setupDeterminant(input, j, i);
            if (dMatrix) {
                const value = dMatrix.__determinant__();
                if (value) row.push(value);
            }

        }
        elements.push(row);
    }
    return matrix(elements);
}

/**
 * Applies a checkerboard of minuses.
 * Should always operate on a matrix of minors to be technically called a cofactor matrix
 * @param input
 */
function cofactorMatrix(input: Matrix): Matrix {
    const elements: number[][] = [];
    const rows = input.rows;
    const cols = input.cols;
    let oddoneout = 1;
    for (let i = 0; i < rows; i++) {
        const row: number[] = [];
        for (let j = 0; j < cols; j++) {
            let value = input.getElement(i + 1, j + 1);
            if (oddoneout % 2 === 0) {
                value = value * -1;
            }
            row.push(value);
            oddoneout++;
        }
        elements.push(row);
    }
    return matrix(elements);
}

export function setupDeterminant(toSet: Matrix, ignoreColumn: number, ignoreRow?: number): Matrix | undefined {
    if (toSet.square === false) {
        return undefined;
    }
    else {
        if (ignoreRow === undefined) {
            ignoreRow = 0;
        } // always ignore row 0

        const elements: number[][] = [];
        for (let rowIterator = 0; rowIterator < toSet.rows; rowIterator++) {
            const row: number[] = [];

            if (rowIterator !== ignoreRow) {
                for (let columnIterator = 0; columnIterator < toSet.cols; columnIterator++) {
                    if (columnIterator !== ignoreColumn) {
                        row.push(toSet.getElement(rowIterator + 1, columnIterator + 1));
                    }
                }
                elements.push(row);
            }


        }
        return matrix(elements);
    }

}

function determinant(input: Matrix): number {

    const rows = input.rows;
    const cols = input.cols;
    let determinantValue = 0;
    /**
     * When the matrix gets down to 2 rows and 2 columns
     */
    if (rows === 2 && cols === 2) {
        determinantValue = (input.getElement(1, 1) * input.getElement(2, 2)) - (input.getElement(2, 1) * input.getElement(1, 2));
        return determinantValue;
    }
    /**
     * recursively achieve a 2 row and 2 column matrix
     */
    else if (rows === cols) {
        for (let i = 0; i < cols; i++) {
            if (i % 2 === 0) {
                let dMatrix = setupDeterminant(input, i);
                if (dMatrix) {
                    determinantValue = determinantValue + (input.getElement(1, i + 1) * determinant(dMatrix));
                }
            }
            else {
                let dMatrix = setupDeterminant(input, i);
                if (dMatrix) {
                    determinantValue = determinantValue - (input.getElement(1, i + 1) * determinant(dMatrix));
                }
            }

        }
    }
    return determinantValue;

}

function transpose(input: Matrix): Matrix {
    const rows = input.rows;
    const cols = input.cols;

    const elements: number[][] = [];

    // Reverse rows and columns
    for (let i = 0; i < cols; i++) {
        const row: number[] = [];

        for (let j = 0; j < rows; j++) {
            row.push(input.getElement(j + 1, i + 1));
        }
        elements.push(row);
    }

    return matrix(elements);
}

function inverse(input: Matrix): Matrix {
    const determinant = input.__determinant__();
    const minorMatrix = input.__minorMatrix__();
    if (minorMatrix) {
        const cofactorMatrix = minorMatrix.__cofactorMatrix__();
        if (cofactorMatrix) {
            const adjugateMatrix = cofactorMatrix.__transpose__();
            if (adjugateMatrix && determinant) {
                const inverseMatrix = adjugateMatrix.__scalar__(1.0 / determinant);
                if (inverseMatrix) {
                    return inverseMatrix;
                }
            }
        }
    }

    throw new Error("Failed");


}

function scalar(lhs: Matrix, scalar: number) {
    const rows = lhs.rows;
    const cols = lhs.cols;
    const elements: number[][] = [];
    for (let i = 0; i < rows; i++) {
        const row: number[] = [];
        for (let j = 0; j < cols; j++) {
            row.push(lhs.getElement(i + 1, j + 1) * scalar);
        }
        elements.push(row);
    }
    return matrix(elements);
}
export function matrix(elements: number[][]): Matrix {
    const rows = elements.length;
    const cols = computeColumns(elements);
    let square: boolean;
    if (rows === cols) {
        square = true;
    }
    function getElement(row: number, column: number): number {
        return elements[row - 1][column - 1];
    }

    function toString(): string {
        return elements.map(function (row) { return row.join(", "); }).join("\n");
    }

    const m: Matrix = {
        rows,
        cols,
        getElement,
        toString,
        __add__(rhs: Matrix) {
            return add(m, rhs);
        },
        __determinant__() {
            if (m.square === true) {
                return determinant(m);
            }
            else {
                return NaN;
            }
        },
        __minorMatrix__() {
            if (m.square === true) {
                return minorMatrix(m);
            }
            else {
                return null;
            }

        },
        __cofactorMatrix__() {
            if (m.square === true) {
                return cofactorMatrix(m);
            }
            else {
                return undefined;
            }

        },
        __transpose__() {
            if (m.square === true) {
                return transpose(m);
            }
            else {
                return undefined;
            }

        },
        __scalar__(toscalar: number) {
            return scalar(m, toscalar);
        },
        __inverse__() {
            if (m.square === true) {
                return inverse(m);
            }
            else {
                return undefined;
            }

        },
        get square() {
            if (square) {
                return square;
            }
            else {
                return undefined;
            }
        },
        elements
    };
    return m;
}
