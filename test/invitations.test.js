const invitations = require("../src/invitations");

describe("invitations", () => {
  test("getDistancesToOffice returns objects that include a distance property", () => {
    const customers = [
      {
        user_id: 1,
        name: "John",
        latitude: 52.9,
        longitude: -6.0,
      },
      {
        user_id: 2,
        name: "Alice",
        latitude: 51.9,
        longitude: -10.2,
      },
      {
        user_id: 3,
        name: "Peter",
        latitude: 51.8,
        longitude: -10.4,
      },
    ];
    const officeLatitude = 53.4;
    const officeLongitude = -10.5;

    invitations
      .getDistancesToOffice(customers, officeLatitude, officeLongitude)
      .forEach((customer) => {
        expect(customer).toHaveProperty("distance");
      });
  });

  test("getNearbyCustomers filters out customers whose distance is above the maximum", () => {
    const customers = [
      {
        user_id: 1,
        name: "John",
        latitude: 52.9,
        longitude: -6.0,
        distance: 9,
      },
      {
        user_id: 2,
        name: "Alice",
        latitude: 51.9,
        longitude: -10.2,
        distance: 10,
      },
      {
        user_id: 3,
        name: "Peter",
        latitude: 51.8,
        longitude: -10.4,
        distance: 11,
      },
    ];
    const maxDistanceToOffice = 10;

    expect(
      invitations.getNearbyCustomers(customers, maxDistanceToOffice)
    ).toEqual([
      {
        user_id: 1,
        name: "John",
        latitude: 52.9,
        longitude: -6.0,
        distance: 9,
      },
      {
        user_id: 2,
        name: "Alice",
        latitude: 51.9,
        longitude: -10.2,
        distance: 10,
      },
    ]);
  });

  test("getInvitations returns name and user_id properties", () => {
    const customers = [
      {
        user_id: 1,
        name: "John",
        latitude: 52.9,
        longitude: -6.0,
        distance: 9,
      },
      {
        user_id: 2,
        name: "Alice",
        latitude: 51.9,
        longitude: -10.2,
        distance: 10,
      },
      {
        user_id: 3,
        name: "Peter",
        latitude: 51.8,
        longitude: -10.4,
        distance: 11,
      },
    ];

    expect(invitations.getInvitations(customers)).toEqual([
      {
        user_id: 1,
        name: "John",
      },
      {
        user_id: 2,
        name: "Alice",
      },
      {
        user_id: 3,
        name: "Peter",
      },
    ]);
  });

  test("getInvitations sorts by user_id ascendingly", () => {
    const customers = [
      {
        user_id: 1,
        name: "John",
        latitude: 52.9,
        longitude: -6.0,
        distance: 9,
      },
      {
        user_id: 3,
        name: "Peter",
        latitude: 51.8,
        longitude: -10.4,
        distance: 11,
      },
      {
        user_id: 2,
        name: "Alice",
        latitude: 51.9,
        longitude: -10.2,
        distance: 10,
      },
    ];

    expect(invitations.getInvitations(customers)).toEqual([
      {
        user_id: 1,
        name: "John",
      },
      {
        user_id: 2,
        name: "Alice",
      },
      {
        user_id: 3,
        name: "Peter",
      },
    ]);
  });

  test("createInvitations throws an error if argument officeLatitude is missing", () => {
    expect(() => {
      invitations.createInvitations({
        officeLongitude: -6.257664,
        maxDistanceToOffice: 100,
      });
    }).toThrow("officeLatitude");
  });

  test("createInvitations throws an error if argument officeLongitude is missing", () => {
    expect(() => {
      invitations.createInvitations({
        officeLatitude: 53.339428,
        maxDistanceToOffice: -6.257664,
      });
    }).toThrow("officeLongitude");
  });

  test("createInvitations throws an error if argument maxDistanceToOffice is missing", () => {
    expect(() => {
      invitations.createInvitations({
        officeLatitude: 53.339428,
        officeLongitude: -6.257664,
      });
    }).toThrow("maxDistanceToOffice");
  });
});
