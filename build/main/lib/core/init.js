"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var matrix_1 = require("./matrix");
function init(rows, cols, value) {
    var elements = [];
    for (var i = 0; i < rows; i++) {
        var row = [];
        for (var j = 0; j < cols; j++) {
            row.push(value);
        }
        elements.push(row);
    }
    return matrix_1.matrix(elements);
}
exports.init = init;
//# sourceMappingURL=init.js.map