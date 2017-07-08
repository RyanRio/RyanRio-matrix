import { matrix } from './matrix';
import { setupDeterminant } from './matrix';

describe("matrix", function () {
    describe("constructor", function () {
        const elements = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
        const M = matrix(elements);
        it("should have correct rows", function () {
            expect(M.rows).toBe(3);
        });
        it("should have correct columns", function () {
            expect(M.cols).toBe(3);
        });
        it("should have correct elements", function () {
            expect(M.getElement(1, 1)).toBe(1);
            expect(M.getElement(1, 2)).toBe(2);
            expect(M.getElement(1, 3)).toBe(3);
            expect(M.getElement(2, 1)).toBe(4);
            expect(M.getElement(2, 2)).toBe(5);
            expect(M.getElement(2, 3)).toBe(6);
        });
    });
    describe("toString", function () {
        const elements = [[1, 2, 3], [4, 5, 6]];
        const M = matrix(elements);
        it("should be comma-space delimited on columns and newline on rows", function () {
            expect(typeof M.toString()).toBe('string');
            expect(`${M.toString()}`).toBe("1, 2, 3\n4, 5, 6");
        });
    });
    describe("__add__", function () {
        const A = matrix([[1, 2, 3], [4, 5, 6]]);
        const B = matrix([[2, 3, 5], [7, 11, 13]]);
        const M = A.__add__(B);
        if (!M) {
            throw new Error("Bad Matrix");
        }
        it("should have correct rows", function () {
            expect(M.rows).toBe(A.rows);
        });
        it("should have correct columns", function () {
            expect(M.cols).toBe(A.cols);
        });
        it("should have correct elements", function () {
            expect(M.getElement(1, 1)).toBe(3);
            expect(M.getElement(1, 2)).toBe(5);
            expect(M.getElement(1, 3)).toBe(8);
            expect(M.getElement(2, 1)).toBe(11);
            expect(M.getElement(2, 2)).toBe(16);
            expect(M.getElement(2, 3)).toBe(19);
        });
    });
    describe("__determinant__ of 3x3", function () {
        const A = matrix([[1, 2, 3], [4, 5, 6], [7, 8, 10]]);
        const D = A.__determinant__();
        it("determinant should be correct", function () {
            expect(D).toBe(-3);
        });
    });
    describe("__determinant__ of non-square matrix", function () {
        const A = matrix([[1, 2], [3, 4]]);
        const N = matrix([[1, 2], [3]]);
        const DN = N.__determinant__();
        const D = A.__determinant__();
        it("determinant should not be NaN", function () {
            expect(D).not.toEqual(NaN);
        });
        it("determinant should be NaN", function () {
            expect(DN).toEqual(NaN);
        });
    });
    describe("__determinant__ of 4x4", function () {
        const A = matrix([[1, 2, 3, 4], [4, 5, 6, 7], [7, 8, 10, 11], [12, 13, 14, 16]]);
        const D = A.__determinant__();
        it("determinant should be correct", function () {
            expect(D).toBe(-3);
        });
    });
    describe("__setupDeterminant__ of 3x3", function () {
        const A = matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
        const D = setupDeterminant(A, 0);
        if (!D) {
            throw new Error("Bad Matrix");
        }
        it("should create 2 x 2 matrix", function () {
            expect(D.rows).toBe(2);
            expect(D.cols).toBe(2);
        });
        it("elements should be correct", function () {
            expect(D.getElement(1, 1)).toBe(5);
            expect(D.getElement(1, 2)).toBe(6);
            expect(D.getElement(2, 1)).toBe(8);
            expect(D.getElement(2, 2)).toBe(9);
        });

    });
    describe("__setupDeterminant__ of 4x4", function () {
        const A = matrix([[1, 2, 3, 4], [4, 5, 6, 7], [7, 8, 10, 11], [12, 13, 14, 16]]);
        const D = setupDeterminant(A, 0);
        if (!D) {
            throw new Error("Bad Matrix");
        }
        it("should create 3 x 3 matrix", function () {
            expect(D.rows).toBe(3);
            expect(D.cols).toBe(3);
        });
        it("elements should be correct", function () {
            expect(D.getElement(1, 1)).toBe(5);
            expect(D.getElement(1, 2)).toBe(6);
            expect(D.getElement(1, 3)).toBe(7);

            expect(D.getElement(2, 1)).toBe(8);
            expect(D.getElement(2, 2)).toBe(10);
            expect(D.getElement(2, 3)).toBe(11);

            expect(D.getElement(3, 1)).toBe(13);
            expect(D.getElement(3, 2)).toBe(14);
            expect(D.getElement(3, 3)).toBe(16);
        });

    });
    describe("__minorMatrix__ of 3x3", function () {
        const A = matrix([[3, 0, 2], [2, 0, -2], [0, 1, 1]]);
        const M = A.__minorMatrix__();
        if (!M) {
            throw new Error("Bad Matrix");
        }
        const C = M.__cofactorMatrix__();
        if (!C) {
            throw new Error("Bad Matrix");
        }
        const T = C.__transpose__();
        if (!T) {
            throw new Error("Bad Matrix");
        }
        const determinant = A.__determinant__();
        if (!determinant) {
            throw new Error("Bad Matrix");
        }
        // const S = T.__scalar__(determinant);
        it("should still be a 3 x 3 matrix", function () {
            expect(M.rows).toBe(3);
            expect(M.cols).toBe(3);
        });

        it("elements should be correct", function () {
            expect(M.getElement(1, 1)).toBe(2);
            expect(M.getElement(1, 2)).toBe(2);
            expect(M.getElement(1, 3)).toBe(2);

            expect(M.getElement(2, 1)).toBe(-2);
            expect(M.getElement(2, 2)).toBe(3);
            expect(M.getElement(2, 3)).toBe(3);

            expect(M.getElement(3, 1)).toBe(0);
            expect(M.getElement(3, 2)).toBe(-10);
            expect(M.getElement(3, 3)).toBe(0);
        });

        it("Matrix of cofactors", function () {
            expect(C.getElement(1, 1)).toBe(2);
            expect(C.getElement(1, 2)).toBe(-2);
            expect(C.getElement(1, 3)).toBe(2);

            expect(C.getElement(2, 1)).toBe(2);
            expect(C.getElement(2, 2)).toBe(3);
            expect(C.getElement(2, 3)).toBe(-3);

            expect(C.getElement(3, 1)).toBe(0);
            expect(C.getElement(3, 2)).toBe(10);
            expect(C.getElement(3, 3)).toBe(0);
        });

        it("Transposed Matrix", function () {
            expect(T.getElement(1, 1)).toBe(2);
            expect(T.getElement(1, 2)).toBe(2);
            expect(T.getElement(1, 3)).toBe(0);

            expect(T.getElement(2, 1)).toBe(-2);
            expect(T.getElement(2, 2)).toBe(3);
            expect(T.getElement(2, 3)).toBe(10);

            expect(T.getElement(3, 1)).toBe(2);
            expect(T.getElement(3, 2)).toBe(-3);
            expect(T.getElement(3, 3)).toBe(0);
        });

        it("Determinant should be correct", function () {
            expect(1 / determinant).toBe(1 / 10);
        });

    });
    describe("Inverted Matrix", function () {
        const A = matrix([[3, 0, 2], [2, 0, -2], [0, 1, 1]]);
        const I = A.__inverse__();
        if (!I) {
            throw new Error("Bad Matrix");
        }
        it("Matrix should be inverted", function () {
            expect(I.getElement(1, 1)).toBe(0.2);
            expect(I.getElement(1, 2)).toBe(0.2);
            expect(I.getElement(1, 3)).toBe(0);

            expect(I.getElement(2, 1)).toBe(-0.2);
            expect(I.getElement(2, 2)).toBe(0.3);
            expect(I.getElement(2, 3)).toBe(1);

            expect(I.getElement(3, 1)).toBe(0.2);
            expect(I.getElement(3, 2)).toBe(-0.3);
            expect(I.getElement(3, 3)).toBe(0);
        });
    });
});
