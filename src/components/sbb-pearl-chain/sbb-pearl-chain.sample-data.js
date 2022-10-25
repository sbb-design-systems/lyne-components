import { formatDateForDepartureAndArrivalTime } from '../sbb-pearl-chain-time/sbb-pearl-chain-time.helper';
import { addDays, subDays } from 'date-fns';

const today = new Date().setHours(13, 0, 0, 0);

export default [
  {
    duration: 60,
    id: 'test',
    arrival: {
      time: formatDateForDepartureAndArrivalTime(today),
    },
    departure: {
      time: formatDateForDepartureAndArrivalTime(subDays(today, 7).setHours(0, 0, 0, 0)),
    },
    serviceJourney: {
      serviceAlteration: {
        cancelled: false,
      },
    },
  },
  {
    duration: 60,
    id: 'test',
    arrival: {
      time: formatDateForDepartureAndArrivalTime(addDays(today, 2).setHours(13, 0, 0, 0)),
    },
    departure: {
      time: formatDateForDepartureAndArrivalTime(today),
    },
    serviceJourney: {
      serviceAlteration: {
        cancelled: false,
      },
    },
  },
];
