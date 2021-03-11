import {timesTwo} from "./functions.js"

test("Multiplies by 2", () => {
    expect(timesTwo(4)).toBe(8);
})