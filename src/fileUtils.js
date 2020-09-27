/**
 * File utilities module.
 * @module fileUtils
 */

const path = require("path");
const fs = require("fs");
const readJsonLines = require("read-json-lines-sync").default;

/**
 * Reads a file in JSON lines format.
 *
 * @param {string} filePath - The file path
 * @returns {Array} Array of objects
 */
const readFile = (filePath) => {
  const absolutePath = path.join(process.cwd(), filePath);
  return readJsonLines(fs.readFileSync(absolutePath, "utf-8"));
};

/**
 * Writes to a file in JSON lines format.
 *
 * @param {string} filePath - The file path
 * @param {Array} data - An array of objects
 */
const writeFile = (filePath, data) => {
  const absolutePath = path.join(process.cwd(), filePath);
  fs.writeFileSync(absolutePath, data.map((c) => JSON.stringify(c)).join("\n"));
};

module.exports = { readFile, writeFile };
