import transportationNumberData from '../lyne-timetable-transportation-number/lyne-timetable-transportation-number.sample-data';
import pearlChainData from '../lyne-pearl-chain/lyne-pearl-chain.sample-data';

export default [
  {
    pearlChain: {
      legs: pearlChainData.stop1,
      status: 'future'
    },
    transportationNumber: transportationNumberData['train']
  }
];
