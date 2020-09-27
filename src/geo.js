/**
 * Geolocation module.
 * @module geo
 */

const DEG2RAD = Math.PI / 180;
const EARTH_RADIUS_KM = 6371;

/**
 * Converts degrees to radians.
 *
 * @param {number} degrees - Angle in degrees
 * @returns {number} Angle in radians
 */
const degToRad = (degrees) => {
  return degrees * DEG2RAD;
};

/**
 * Returns the arcLength between 2 coordinate positions.
 *
 * @param {number} latA - Latitude of point A in degrees
 * @param {number} longA - Longitude of point A in degrees
 * @param {number} latB - Latitude of point B in degrees
 * @param {number} longB - Longitude of point B in degrees
 * @returns {number} Arc length
 */
const getArcLength = (latA, longA, latB, longB) => {
  if (
    typeof latA !== "number" ||
    typeof longA !== "number" ||
    typeof latB !== "number" ||
    typeof longB !== "number"
  ) {
    throw new TypeError("All arguments to getArcLength must be numbers");
  }

  const latARad = degToRad(latA);
  const longARad = degToRad(longA);
  const latBRad = degToRad(latB);
  const longBRad = degToRad(longB);

  const centralAngle = Math.acos(
    Math.sin(latARad) * Math.sin(latBRad) +
      Math.cos(latARad) *
        Math.cos(latBRad) *
        Math.cos(Math.abs(longARad - longBRad))
  );

  return EARTH_RADIUS_KM * centralAngle;
};

module.exports = { degToRad, getArcLength };
