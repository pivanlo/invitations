const geo = require("../src/geo");

describe("geo", () => {
  test("degToRad converts degrees to radians", () => {
    expect(geo.degToRad(0)).toBe(0);
    expect(geo.degToRad(45)).toBe(Math.PI / 4);
    expect(geo.degToRad(90)).toBe(Math.PI / 2);
    expect(geo.degToRad(180)).toBe(Math.PI);
    expect(geo.degToRad(270)).toBe((3 * Math.PI) / 2);
  });

  test("getArcLength throws a TypeError if any parameter is not a number", () => {
    expect(() => {
      geo.getArcLength(1, 2, 3, "a");
    }).toThrow(TypeError);
  });
});
