import { identityMatrix } from './identityMatrix';

describe("matrix", function () {
    it("2 x 2 Identity", function () {
        const M = identityMatrix(2, 2);
        expect(M.rows).toBe(2);
        expect(M.cols).toBe(2);
        expect(M.getElement(1, 1)).toBe(1);
        expect(M.getElement(1, 2)).toBe(0);

        expect(M.getElement(2, 1)).toBe(0);
        expect(M.getElement(2, 2)).toBe(1);
    });
    it("3 x 3 Identity", function () {
        const M = identityMatrix(3, 3);
        expect(M.rows).toBe(3);
        expect(M.cols).toBe(3);
        expect(M.getElement(1, 1)).toBe(1);
        expect(M.getElement(1, 2)).toBe(0);
        expect(M.getElement(1, 3)).toBe(0);

        expect(M.getElement(2, 1)).toBe(0);
        expect(M.getElement(2, 2)).toBe(1);
        expect(M.getElement(2, 3)).toBe(0);

        expect(M.getElement(3, 1)).toBe(0);
        expect(M.getElement(3, 2)).toBe(0);
        expect(M.getElement(3, 3)).toBe(1);
    });
});
