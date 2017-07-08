"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var matrix_1 = require("./matrix");
function identityMatrix(rows, cols) {
    var elements = [];
    var zeroIterator = 0;
    for (var i = 0; i < rows; i++) {
        var row = [];
        for (var j = 0; j < cols; j++) {
            var value = void 0;
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
    return matrix_1.matrix(elements);
}
exports.identityMatrix = identityMatrix;
//# sourceMappingURL=identityMatrix.js.map