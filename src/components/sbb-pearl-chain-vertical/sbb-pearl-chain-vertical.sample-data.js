export default [
  {
    duration: 60,
    id: 'test',
    arrival: { time: '2022-09-01T11:00' },
    departure: { time: '2022-09-01T10:00' },
    serviceJourney: {
      serviceAlteration: {
        cancelled: false,
      },
    },
  },
  {
    duration: 120,
    id: 'test',
    arrival: { time: '2022-09-01T14:00' },
    departure: { time: '2022-09-01T11:00' },
    serviceJourney: {
      serviceAlteration: {
        cancelled: false,
      },
    },
  },
];
