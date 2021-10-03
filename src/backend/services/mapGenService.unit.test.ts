import { square } from "./mapGenService";

describe("square()", () => {
  it("squares a number", () => {
    expect(square(2)).toBe(4);
    expect(square(3)).toBe(9);
  });
});
