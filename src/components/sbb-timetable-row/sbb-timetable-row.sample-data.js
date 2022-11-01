export const config = {
  loadingPrice: false,
  loadingTrip: false,
  trip: {
    legs: [
      {
        duration: 360,
      },
      {
        duration: 100,
      },
      {
        duration: 300,
      },
      {
        duration: 400,
      },
    ],
    notices: [
      {
        name: 'z',
        text: 'Tilting train',
        type: 'ATTRIBUTE',
        priority: 10,
        routeIndexFrom: 6,
        routeIndexTo: 9,
      },
      {
        name: 'rr',
        text: 'Tilting train',
        type: 'ATTRIBUTE',
        priority: 100,
        routeIndexFrom: 6,
        routeIndexTo: 9,
      },
      {
        name: 'om',
        text: 'Tilting train',
        textArguments: [
          {
            values: ['www.swiss.com/airrail'],
          },
        ],
        type: 'ATTRIBUTE',
        priority: 40,
        routeIndexFrom: 6,
        routeIndexTo: 9,
      },
      {
        name: 'fs',
        text: 'Tilting train',
        type: 'ATTRIBUTE',
        priority: 20,
        routeIndexFrom: 6,
        routeIndexTo: 9,
      },
      {
        name: 'z',
        text: 'Tilting train',
        type: 'ATTRIBUTE',
        priority: 100,
        routeIndexFrom: 6,
        routeIndexTo: 9,
      },
    ],
    situations: [{ cause: 'DELAY', broadcastMessages: 'test', priority: 60 }],
    summary: {
      arrival: {
        delay: 0,
        quayChanged: false,
        quayRtName: '88',
        time: '2022-10-28T21:16:00+02:00',
      },
      arrivalWalk: 5,
      departure: {
        delay: 0,
        quayChanged: false,
        quayRtName: '7',
        time: '2022-10-28T02:48:00+02:00',
      },
      departureWalk: 8,
      direction: 'Luzern',
      duration: 1172,
      occupancy: {
        firstClass: 'high',
        secondClass: 'high',
      },
      product: {
        number: '27',
        vehicleMode: 'train',
        name: 'IR 27 2473',
        line: 27,
        vehicleSubModeShortName: 'IR',
      },
      tripStatus: {
        quayChanged: true,
      },
    },
    tripId: 'id-1',
    valid: true,
  },
  price: {
    price: '12',
    text: 'ab CHF',
    isDiscount: true,
  },
};

export const configPosition = {
  trip: {
    legs: [
      {
        duration: 60,
        id: 'test',
        arrival: { time: '2023-08-18T05:00' },
        departure: { time: '2021-08-18T04:00' },
        serviceJourney: {
          serviceAlteration: {
            cancelled: false,
          },
        },
      },
      {
        duration: 780,
        id: 'test',
        arrival: { time: '2024-08-18T18:00' },
        departure: { time: '2023-08-18T05:00' },
        serviceJourney: {
          serviceAlteration: {
            cancelled: false,
          },
        },
      },
    ],
    notices: [
      {
        name: 'Z',
        text: {
          template: 'hint 1',
          arguments: null,
        },
        type: 'ATTRIBUTE',
        priority: 10,
        routeIndexFrom: 6,
        routeIndexTo: 9,
      },
      {
        name: 'RR',
        text: {
          template: 'hint 2',
          arguments: null,
        },
        type: 'ATTRIBUTE',
        priority: 100,
        routeIndexFrom: 6,
        routeIndexTo: 9,
      },
      {
        name: 'om',
        text: {
          template: 'hint 3',
          arguments: null,
        },
        type: 'ATTRIBUTE',
        priority: 40,
        routeIndexFrom: 6,
        routeIndexTo: 9,
      },
      {
        name: 'FS',
        text: {
          template: 'hint 4',
          arguments: null,
        },
        type: 'ATTRIBUTE',
        priority: 20,
        routeIndexFrom: 6,
        routeIndexTo: 9,
      },
      {
        name: 'Z',
        text: {
          template: 'hint 5',
          arguments: null,
        },
        type: 'ATTRIBUTE',
        priority: 100,
        routeIndexFrom: 6,
        routeIndexTo: 9,
      },
    ],
    situations: [{ cause: 'DELAY', broadcastMessages: 'test', priority: 60 }],
    summary: {
      arrival: {
        delay: 0,
        quayChanged: false,
        quayRtName: '88',
        time: '2022-07-28T13:48:00+02:00',
      },
      arrivalWalk: 5,
      departure: {
        delay: 0,
        quayChanged: false,
        quayRtName: '88',
        time: '2022-07-28T13:16:00+02:00',
      },
      departureWalk: 8,
      direction: 'Luzern',
      duration: 60 * 48 + 130,
      occupancy: {
        firstClass: 'low',
        secondClass: 'low',
      },
      product: {
        number: '27',
        vehicleMode: 'train',
        name: 'IR 27 2473',
        line: 27,
        vehicleSubModeShortName: 'IR',
      },
      tripStatus: {
        quayChanged: false,
      },
    },
    tripId: 'id-1',
    valid: true,
  },
};

export const configMinimal = {
  trip: {
    legs: [
      {
        duration: 360,
        id: 'test',
        arrival: { time: '2022-08-31T15:00:00+02:00' },
        departure: { time: '2022-04-30T15:00:00+02:00' },
        serviceJourney: {
          serviceAlteration: {
            cancelled: false,
          },
        },
      },
    ],
    summary: {
      arrival: {
        delay: 0,
        quayChanged: false,
        quayRtName: '88',
        time: '2022-07-28T13:48:00+02:00',
      },
      departure: {
        delay: 0,
        quayChanged: false,
        quayRtName: '7',
        time: '2022-07-28T13:16:00+02:00',
      },
      direction: 'Mars',
      duration: 20,
      product: {
        number: '27',
        vehicleMode: 'train',
        name: 'ISS 27 2473',
        line: 27,
        vehicleSubModeShortName: 'ISS',
      },
    },
  },
};

export const configCancelled = {
  trip: {
    legs: [
      {
        duration: 360,
        serviceJourney: {
          serviceAlteration: {
            cancelled: true,
          },
        },
      },
    ],
    summary: {
      arrival: {
        delay: 0,
        quayChanged: false,
        quayRtName: '88',
        time: '2022-07-28T13:48:00+02:00',
      },
      departure: {
        delay: 0,
        quayChanged: false,
        quayRtName: '7',
        time: '2022-07-28T13:16:00+02:00',
      },
      direction: 'Mars',
      duration: 20,
      product: {
        number: '27',
        vehicleMode: 'train',
        name: 'ISS 27 2473',
        line: 27,
        vehicleSubModeShortName: 'ISS',
      },
    },
  },
};

export const configCancelledStops = {
  trip: {
    legs: [
      {
        duration: 100,
        serviceJourney: {
          serviceAlteration: {
            cancelled: false,
          },
        },
      },
      {
        duration: 300,
        serviceJourney: {
          serviceAlteration: {
            cancelled: true,
          },
        },
      },
      {
        duration: 150,
      },
      {
        duration: 150,
        serviceJourney: {
          serviceAlteration: {
            cancelled: true,
          },
        },
      },
      {
        duration: 150,
        serviceJourney: {
          serviceAlteration: {
            cancelled: false,
          },
        },
      },
      {
        duration: 400,
      },
    ],
    summary: {
      arrival: {
        delay: 0,
        quayChanged: false,
        quayRtName: '88',
        time: '2022-07-28T13:48:00+02:00',
      },
      departure: {
        delay: 0,
        quayChanged: false,
        quayRtName: '7',
        time: '2022-07-28T13:16:00+02:00',
      },
      direction: 'Mars',
      duration: 20,
      product: {
        number: '27',
        vehicleMode: 'train',
        name: 'ISS 27 2473',
        line: 27,
        vehicleSubModeShortName: 'ISS',
      },
    },
  },
};

export const configPast = {
  trip: {
    legs: [
      {
        duration: 360,
        id: 'test',
        arrival: { time: '2022-07-30T17:00:00+02:00' },
        departure: { time: '2022-07-01T05:00:00+02:00' },
        serviceJourney: {
          serviceAlteration: {
            cancelled: false,
          },
        },
      },
      {
        duration: 360,
        id: 'test',
        arrival: { time: '2022-07-30T17:00:00+02:00' },
        departure: { time: '2022-07-01T05:00:00+02:00' },
        serviceJourney: {
          serviceAlteration: {
            cancelled: false,
          },
        },
      },
      {
        duration: 360,
        id: 'test',
        arrival: { time: '2022-07-30T17:00:00+02:00' },
        departure: { time: '2022-07-01T05:00:00+02:00' },
        serviceJourney: {
          serviceAlteration: {
            cancelled: false,
          },
        },
      },
    ],
    summary: {
      arrival: {
        delay: 0,
        quayChanged: false,
        quayRtName: '88',
        time: '2021-08-04T20:00:00+02:00',
      },
      departure: {
        delay: 0,
        quayChanged: false,
        quayRtName: '7',
        time: '2020-08-04T15:00:00+02:00',
      },
      direction: 'Mars',
      duration: 20,
      product: {
        number: '27',
        vehicleMode: 'train',
        name: 'ISS 27 2473',
        line: 27,
        vehicleSubModeShortName: 'ISS',
      },
    },
  },
};
