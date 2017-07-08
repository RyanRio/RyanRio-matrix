"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function computeColumns(elements) {
    for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
        var row = elements_1[_i];
        return row.length;
    }
    throw new Error("elements must contain at least one row.");
}
function add(lhs, rhs) {
    var rows = lhs.rows;
    var cols = lhs.cols;
    var elements = [];
    for (var i = 0; i < rows; i++) {
        var row = [];
        for (var j = 0; j < cols; j++) {
            row.push(lhs.getElement(i + 1, j + 1) + rhs.getElement(i + 1, j + 1));
        }
        elements.push(row);
    }
    return matrix(elements);
}
function minorMatrix(input) {
    var elements = [];
    var rows = input.rows;
    var cols = input.cols;
    for (var i = 0; i < rows; i++) {
        var row = [];
        for (var j = 0; j < cols; j++) {
            var dMatrix = setupDeterminant(input, j, i);
            if (dMatrix) {
                var value = dMatrix.__determinant__();
                if (value)
                    row.push(value);
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
function cofactorMatrix(input) {
    var elements = [];
    var rows = input.rows;
    var cols = input.cols;
    var oddoneout = 1;
    for (var i = 0; i < rows; i++) {
        var row = [];
        for (var j = 0; j < cols; j++) {
            var value = input.getElement(i + 1, j + 1);
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
function setupDeterminant(toSet, ignoreColumn, ignoreRow) {
    if (toSet.square === false) {
        return undefined;
    }
    else {
        if (ignoreRow === undefined) {
            ignoreRow = 0;
        } // always ignore row 0
        var elements = [];
        for (var rowIterator = 0; rowIterator < toSet.rows; rowIterator++) {
            var row = [];
            if (rowIterator !== ignoreRow) {
                for (var columnIterator = 0; columnIterator < toSet.cols; columnIterator++) {
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
exports.setupDeterminant = setupDeterminant;
function determinant(input) {
    var rows = input.rows;
    var cols = input.cols;
    var determinantValue = 0;
    /**
     * When the matrix gets down to 2 rows and 2 columns
     */
    if (rows === 2 && cols === 2) {
        determinantValue = (input.getElement(1, 1) * input.getElement(2, 2)) - (input.getElement(2, 1) * input.getElement(1, 2));
        return determinantValue;
    }
    else if (rows === cols) {
        for (var i = 0; i < cols; i++) {
            if (i % 2 === 0) {
                var dMatrix = setupDeterminant(input, i);
                if (dMatrix) {
                    determinantValue = determinantValue + (input.getElement(1, i + 1) * determinant(dMatrix));
                }
            }
            else {
                var dMatrix = setupDeterminant(input, i);
                if (dMatrix) {
                    determinantValue = determinantValue - (input.getElement(1, i + 1) * determinant(dMatrix));
                }
            }
        }
    }
    return determinantValue;
}
function transpose(input) {
    var rows = input.rows;
    var cols = input.cols;
    var elements = [];
    // Reverse rows and columns
    for (var i = 0; i < cols; i++) {
        var row = [];
        for (var j = 0; j < rows; j++) {
            row.push(input.getElement(j + 1, i + 1));
        }
        elements.push(row);
    }
    return matrix(elements);
}
function inverse(input) {
    var determinant = input.__determinant__();
    var minorMatrix = input.__minorMatrix__();
    if (minorMatrix) {
        var cofactorMatrix_1 = minorMatrix.__cofactorMatrix__();
        if (cofactorMatrix_1) {
            var adjugateMatrix = cofactorMatrix_1.__transpose__();
            if (adjugateMatrix && determinant) {
                var inverseMatrix = adjugateMatrix.__scalar__(1.0 / determinant);
                if (inverseMatrix) {
                    return inverseMatrix;
                }
            }
        }
    }
    throw new Error("Failed");
}
function scalar(lhs, scalar) {
    var rows = lhs.rows;
    var cols = lhs.cols;
    var elements = [];
    for (var i = 0; i < rows; i++) {
        var row = [];
        for (var j = 0; j < cols; j++) {
            row.push(lhs.getElement(i + 1, j + 1) * scalar);
        }
        elements.push(row);
    }
    return matrix(elements);
}
function matrix(elements) {
    var rows = elements.length;
    var cols = computeColumns(elements);
    var square;
    if (rows === cols) {
        square = true;
    }
    function getElement(row, column) {
        return elements[row - 1][column - 1];
    }
    function toString() {
        return elements.map(function (row) { return row.join(", "); }).join("\n");
    }
    var m = {
        rows: rows,
        cols: cols,
        getElement: getElement,
        toString: toString,
        __add__: function (rhs) {
            return add(m, rhs);
        },
        __determinant__: function () {
            if (m.square === true) {
                return determinant(m);
            }
            else {
                return NaN;
            }
        },
        __minorMatrix__: function () {
            if (m.square === true) {
                return minorMatrix(m);
            }
            else {
                return null;
            }
        },
        __cofactorMatrix__: function () {
            if (m.square === true) {
                return cofactorMatrix(m);
            }
            else {
                return undefined;
            }
        },
        __transpose__: function () {
            if (m.square === true) {
                return transpose(m);
            }
            else {
                return undefined;
            }
        },
        __scalar__: function (toscalar) {
            return scalar(m, toscalar);
        },
        __inverse__: function () {
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
        }
    };
    return m;
}
exports.matrix = matrix;
//# sourceMappingURL=matrix.js.map