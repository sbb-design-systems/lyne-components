import transportationTimeData from '../lyne-timetable-transportation-time/lyne-timetable-transportation-time.sample-data';
import durationData from '../lyne-timetable-duration/lyne-timetable-duration.sample-data';
import occupancyItemsData from '../lyne-timetable-occupancy/lyne-timetable-occupancy.sample-data';
import pearlChainData from '../lyne-pearl-chain/lyne-pearl-chain.sample-data';
import platformData from '../lyne-timetable-platform/lyne-timetable-platform.sample-data';
import transportationNumberData from '../lyne-timetable-transportation-number/lyne-timetable-transportation-number.sample-data';

export default [
  {
    duration: durationData[0],
    occupancy: occupancyItemsData[3],
    platform: platformData[0],
    details: {
      arrival: transportationTimeData[1],
      departure: transportationTimeData[0],
      pearlChain: {
        legs: pearlChainData.stop3,
        status: 'future'
      },
      transportationNumber: transportationNumberData['train']
    }
  },
  {
    duration: durationData[1],
    occupancy: occupancyItemsData[5],
    platform: platformData[1],
    details: {
      arrival: transportationTimeData[3],
      departure: transportationTimeData[2],
      pearlChain: {
        legs: pearlChainData.stop1,
        status: 'future'
      },
      transportationNumber: transportationNumberData['cableCar']
    }
  }
];
