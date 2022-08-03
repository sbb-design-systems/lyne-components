export default {
  legs: [{ duration: 90, id: 'test' }],
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
    duration: 48,
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
