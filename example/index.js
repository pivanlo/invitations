const invitations = require("../");

const parameters = {
  officeLatitude: 53.339428,
  officeLongitude: -6.257664,
  maxDistanceToOffice: 100,
};

invitations.createInvitations(parameters);
