import transportationNumberData from '../lyne-timetable-transportation-number/lyne-timetable-transportation-number.sample-data';
import transportationTimeData from '../lyne-timetable-transportation-time/lyne-timetable-transportation-time.sample-data';
import transportationWalkData from '../lyne-timetable-transportation-walk/lyne-timetable-transportation-walk.sample-data';
import pearlChainData from '../lyne-pearl-chain/lyne-pearl-chain.sample-data';

export default [
  {
    arrivalTime: transportationTimeData[1],
    arrivalWalk: transportationWalkData[1],
    departureTime: transportationTimeData[0],
    departureWalk: transportationWalkData[0],
    pearlChain: {
      legs: pearlChainData.stop1,
      status: 'future'
    },
    transportationNumber: transportationNumberData['train']
  }
];
