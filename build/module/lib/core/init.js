import { matrix } from './matrix';
export function init(rows, cols, value) {
    var elements = [];
    for (var i = 0; i < rows; i++) {
        var row = [];
        for (var j = 0; j < cols; j++) {
            row.push(value);
        }
        elements.push(row);
    }
    return matrix(elements);
}
//# sourceMappingURL=init.js.map