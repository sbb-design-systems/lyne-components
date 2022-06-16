import cusHimData from '../sbb-timetable-cus-him/sbb-timetable-cus-him.sample-data';
import durationData from '../sbb-timetable-duration/sbb-timetable-duration.sample-data';
import occupancyItemsData from '../sbb-timetable-occupancy/sbb-timetable-occupancy.sample-data';
import parkAndRailData from '../sbb-timetable-park-and-rail/sbb-timetable-park-and-rail.sample-data';
import pearlChainData from '../sbb-pearl-chain/sbb-pearl-chain.sample-data';
import platformData from '../sbb-timetable-platform/sbb-timetable-platform.sample-data';
import rowHeaderData from '../sbb-timetable-row-header/sbb-timetable-row-header.sample-data';
import transportationNumberData from '../sbb-timetable-transportation-number/sbb-timetable-transportation-number.sample-data';
import transportationTimeData from '../sbb-timetable-transportation-time/sbb-timetable-transportation-time.sample-data';
import transportationWalkData from '../sbb-timetable-transportation-walk/sbb-timetable-transportation-walk.sample-data';
import travelHintsData from '../sbb-timetable-travel-hints/sbb-timetable-travel-hints.sample-data';

export default [
  {
    cusHim: cusHimData[2],
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
    parkAndRail: parkAndRailData[0],
    platform: platformData[0],
    rowHeader: rowHeaderData[0],
    travelHints: travelHintsData[0]
  },
  {
    cusHim: cusHimData[2],
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
    parkAndRail: parkAndRailData[0],
    platform: platformData[1],
    rowHeader: rowHeaderData[1],
    travelHints: travelHintsData[0]
  },
  {
    cusHim: {
      cusHimItems: []
    },
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
    parkAndRail: parkAndRailData[0],
    platform: platformData[1],
    rowHeader: rowHeaderData[1],
    travelHints: travelHintsData[1]
  },
  {
    cusHim: cusHimData[2],
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
    parkAndRail: parkAndRailData[0],
    platform: platformData[1],
    rowHeader: rowHeaderData[1],
    travelHints: travelHintsData[1]
  }
];
