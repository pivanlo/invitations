const fileUtils = require("./fileUtils");
const geo = require("./geo");

/**
 * For each customer, calculates its distance to the office and
 * returns a new list of customer objects that include distances.
 *
 * @param {Array} customers - Array of customer objects
 * @param {number} officeLatitude - The office latitude in degrees
 * @param {number} officeLongitude - The office longitude in degrees
 * @returns {Array} Customer objects
 */
const getDistancesToOffice = (customers, officeLatitude, officeLongitude) => {
  return customers.map((c) => {
    const distance = geo.getArcLength(
      officeLatitude,
      officeLongitude,
      parseFloat(c.latitude),
      parseFloat(c.longitude)
    );
    return { ...c, distance };
  });
};

/**
 * Returns the list of customers whose distance to the office
 * is below a maximum.
 *
 * @param {Array} customers - Customer objects
 * @param {number} maxDistanceToOffice - Maximum distance to the office in km
 * @returns {number} Distance in km
 */
const getNearbyCustomers = (customers, maxDistanceToOffice) => {
  return customers.filter((c) => c.distance <= maxDistanceToOffice);
};

/**
 * Creates invitations for a given list of customers.
 *
 * @param {Array} customers - Customer objects
 * @returns {Array} Invitation objects
 */
const getInvitations = (customers) => {
  return customers
    .map((c) => {
      return {
        name: c.name,
        user_id: c.user_id,
      };
    })
    .sort((a, b) => a.user_id - b.user_id);
};

/**
 * Writes to a file a list of customers whose distance to the office
 * is below a maximum.
 *
 * @param {Array} customers - Customer objects
 * @param {Object} parameters - The parameters
 * @param {number} parameters.officeLatitude - The office latitude in degrees
 * @param {number} parameters.officeLongitude - The office longitude in degrees
 * @param {number} parameters.maxDistanceToOffice - Maximum distance to the office in km
 * @param {string} [parameters.customersFilePath=customers.txt] - Customers file relative path
 * @param {string} [parameters.outputFilePath=output.txt] - Output file relative path
 */
const createInvitations = (parameters) => {
  const { officeLatitude, officeLongitude, maxDistanceToOffice } = parameters;

  if (officeLatitude === undefined) {
    throw new Error("Function argument officeLatitude is missing");
  }
  if (officeLongitude === undefined) {
    throw new Error("Function argument officeLongitude is missing");
  }
  if (maxDistanceToOffice === undefined) {
    throw new Error("Function argument maxDistanceToOffice is missing");
  }

  const customersFilePath = parameters.customersFilePath || "customers.txt";
  const outputFilePath = parameters.customersFilePath || "output.txt";

  const customerList = fileUtils.readFile(customersFilePath);

  const customersWithDistanceData = getDistancesToOffice(
    customerList,
    officeLatitude,
    officeLongitude
  );

  const nearbyCustomers = getNearbyCustomers(
    customersWithDistanceData,
    maxDistanceToOffice
  );

  const invitations = getInvitations(nearbyCustomers);
  fileUtils.writeFile(outputFilePath, invitations);
};

module.exports = {
  createInvitations,
  getDistancesToOffice,
  getNearbyCustomers,
  getInvitations,
};
