import { ones } from './ones';

describe("matrix", function () {
    it("ones", function () {
        const M = ones(2, 3);
        expect(M.rows).toBe(2);
        expect(M.cols).toBe(3);
        expect(M.getElement(1, 1)).toBe(1);
        expect(M.getElement(1, 2)).toBe(1);
        expect(M.getElement(1, 3)).toBe(1);
        expect(M.getElement(2, 1)).toBe(1);
        expect(M.getElement(2, 2)).toBe(1);
        expect(M.getElement(2, 3)).toBe(1);
    });
});
