export default [
  {
    duration: 60,
    id: 'test',
    arrival: { time: new Date('2022-08-18T05:00') },
    departure: { time: new Date('2022-08-18T04:00') },
    serviceJourney: {
      serviceAlteration: {
        cancelled: false,
      },
    },
  },
  {
    duration: 660,
    id: 'test',
    arrival: { time: new Date('2022-08-18T16:00') },
    departure: { time: new Date('2022-08-18T05:00') },
    serviceJourney: {
      serviceAlteration: {
        cancelled: false,
      },
    },
  },
];
