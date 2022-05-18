import transportationNumberData from '../sbb-timetable-transportation-number/sbb-timetable-transportation-number.sample-data';
import transportationTimeData from '../sbb-timetable-transportation-time/sbb-timetable-transportation-time.sample-data';
import transportationWalkData from '../sbb-timetable-transportation-walk/sbb-timetable-transportation-walk.sample-data';
import pearlChainData from '../sbb-pearl-chain/sbb-pearl-chain.sample-data';

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
