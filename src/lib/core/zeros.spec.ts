import { zeros } from './zeros';

describe("matrix", function () {
    it("zeros", function () {
        const M = zeros(2, 3);
        expect(M.rows).toBe(2);
        expect(M.cols).toBe(3);
        expect(M.getElement(1, 1)).toBe(0);
        expect(M.getElement(1, 2)).toBe(0);
        expect(M.getElement(1, 3)).toBe(0);
        expect(M.getElement(2, 1)).toBe(0);
        expect(M.getElement(2, 2)).toBe(0);
        expect(M.getElement(2, 3)).toBe(0);
    });
});
