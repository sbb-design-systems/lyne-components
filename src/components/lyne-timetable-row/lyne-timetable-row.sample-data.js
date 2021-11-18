import lyneIcons from 'lyne-icons/dist/icons.json';
import durationData from '../lyne-timetable-duration/lyne-timetable-duration.sample-data';
import occupancyItemsData from '../lyne-timetable-occupancy/lyne-timetable-occupancy.sample-data';
import platformData from '../lyne-timetable-platform/lyne-timetable-platform.sample-data';
import transportationNumberData from '../lyne-timetable-transportation-number/lyne-timetable-transportation-number.sample-data';

export default [
  {
    duration: durationData[0],
    occupancy: occupancyItemsData[3],
    platform: platformData[0],
    transportationNumber: transportationNumberData['train']
  },
  {
    duration: durationData[1],
    occupancy: occupancyItemsData[5],
    platform: platformData[1],
    transportationNumber: transportationNumberData['cableCar']
  }
];
