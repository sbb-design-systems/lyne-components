import cusHimData from '../lyne-timetable-cus-him/lyne-timetable-cus-him.sample-data';
import durationData from '../lyne-timetable-duration/lyne-timetable-duration.sample-data';
import occupancyItemsData from '../lyne-timetable-occupancy/lyne-timetable-occupancy.sample-data';
import pearlChainData from '../lyne-pearl-chain/lyne-pearl-chain.sample-data';
import platformData from '../lyne-timetable-platform/lyne-timetable-platform.sample-data';
import transportationNumberData from '../lyne-timetable-transportation-number/lyne-timetable-transportation-number.sample-data';
import transportationTimeData from '../lyne-timetable-transportation-time/lyne-timetable-transportation-time.sample-data';
import transportationWalkData from '../lyne-timetable-transportation-walk/lyne-timetable-transportation-walk.sample-data';

export default [
  {
    cusHim: cusHimData[0],
    details: {
      arrivalTime: transportationTimeData[1],
      arrivalWalk: transportationWalkData[1],
      departureTime: transportationTimeData[0],
      departureWalk: transportationWalkData[0],
      pearlChain: {
        legs: pearlChainData.stop3,
        status: 'future'
      },
      transportationNumber: transportationNumberData['train']
    },
    duration: durationData[0],
    occupancy: occupancyItemsData[3],
    platform: platformData[0]
  },
  {
    cusHim: cusHimData[0],
    details: {
      arrivalTime: transportationTimeData[3],
      arrivalWalk: transportationWalkData[3],
      departureTime: transportationTimeData[2],
      departureWalk: transportationWalkData[2],
      pearlChain: {
        legs: pearlChainData.stop1,
        status: 'future'
      },
      transportationNumber: transportationNumberData['cableCar']
    },
    duration: durationData[1],
    occupancy: occupancyItemsData[5],
    platform: platformData[1]
  }
];
