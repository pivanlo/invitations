const path = require("path");
const fs = require("fs");
const fileUtils = require("../src/fileUtils");

jest.mock("fs");

describe("fileUtils", () => {
  test("readFile returns an array of objects", () => {
    const filePath = "./the/path";
    const data = [
      { a: 1, b: 2 },
      { c: 3, d: 4 },
    ];

    fs.readFileSync.mockReturnValue('{"a":1,"b":2}\n{"c":3,"d":4}');

    expect(fileUtils.readFile(filePath)).toEqual(data);
  });

  test("writeFile writes data in JSON lines format", () => {
    const filePath = "./the/path";
    const data = [
      { a: 1, b: 2 },
      { c: 3, d: 4 },
    ];

    fileUtils.writeFile(filePath, data);

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      path.join(process.cwd(), filePath),
      '{"a":1,"b":2}\n{"c":3,"d":4}'
    );
  });
});
