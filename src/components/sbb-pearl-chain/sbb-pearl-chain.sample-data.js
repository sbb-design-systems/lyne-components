export default [
  {
    duration: 300,
    id: 'test',
    arrival: { time: new Date('2022-08-11T15:00:00+02:00') },
    departure: { time: new Date('2022-08-10T09:00:00+02:00') },
    serviceJourney: {
      serviceAlteration: {
        cancelled: false,
      },
    },
  },
  {
    duration: 60,
    id: 'test',
    arrival: { time: new Date('2022-08-11T16:01:00+02:00') },
    departure: { time: new Date('2022-08-11T15:01:00+02:00') },
    serviceJourney: {
      serviceAlteration: {
        cancelled: false,
      },
    },
  },
  {
    duration: 120,
    id: 'test',
    arrival: { time: new Date('2022-08-11T18:01:00+02:00') },
    departure: { time: new Date('2022-08-11T16:01:00+02:00') },
    serviceJourney: {
      serviceAlteration: {
        cancelled: false,
      },
    },
  },
];
