export default {
  price: '% ab CHF 39.90',
  legs: [
    {
      duration: 360,
      id: 'test',
      arrival: { time: new Date('2022-08-09T15:00:00+02:00') },
      departure: { time: new Date('2022-08-09T09:00:00+02:00') },
      serviceJourney: {
        serviceAlteration: {
          cancelled: false,
        },
      },
    },
    {
      duration: 60,
      id: 'test',
      arrival: { time: new Date('2022-08-09T16:01:00+02:00') },
      departure: { time: new Date('2022-08-09T15:01:00+02:00') },
      serviceJourney: {
        serviceAlteration: {
          cancelled: false,
        },
      },
    },
  ],
  notices: [
    {
      name: 'sa-z',
      text: {
        template: 'Tilting train',
        arguments: null,
      },
      type: 'ATTRIBUTE',
      priority: 10,
      routeIndexFrom: 6,
      routeIndexTo: 9,
    },
    {
      name: 'sa-rr',
      text: {
        template: 'Tilting train',
        arguments: null,
      },
      type: 'ATTRIBUTE',
      priority: 100,
      routeIndexFrom: 6,
      routeIndexTo: 9,
    },
    {
      name: 'sa-om',
      text: {
        template: 'Tilting train',
        arguments: null,
      },
      type: 'ATTRIBUTE',
      priority: 40,
      routeIndexFrom: 6,
      routeIndexTo: 9,
    },
    {
      name: 'sa-fs',
      text: {
        template: 'Tilting train',
        arguments: null,
      },
      type: 'ATTRIBUTE',
      priority: 20,
      routeIndexFrom: 6,
      routeIndexTo: 9,
    },
    {
      name: 'sa-z',
      text: {
        template: 'Tilting train',
        arguments: null,
      },
      type: 'ATTRIBUTE',
      priority: 100,
      routeIndexFrom: 6,
      routeIndexTo: 9,
    },
  ],
  situations: [{ cause: 'delay', broadcastMessages: 'test', priority: 60 }],
  summary: {
    arrival: {
      delay: 0,
      quayChanged: false,
      quayName: 'Gl. 88',
      time: new Date('2022-07-28T13:48:00+02:00'),
    },
    arrivalWalk: 5,
    departure: {
      delay: 0,
      quayChanged: false,
      quayName: '7',
      time: new Date('2022-07-28T13:16:00+02:00'),
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
      vehicleMode: 'train-small',
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
};
