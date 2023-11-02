import { getDepartureArrivalTimeAttribute } from './access-leg-helper';
import {
  defaultTrip,
  extendedEnterTimeTrip,
} from '../../sbb-timetable-row/sbb-timetable-row.sample-data';
import { Leg } from './timetable-properties';

describe('getDepartureArrivalTimeAttribute', () => {
  it('should returns correct departure time attribute', () => {
    const { departureTimeAttribute } = getDepartureArrivalTimeAttribute(
      defaultTrip.legs as Leg[],
      10,
      0,
      'en',
    );

    expect(departureTimeAttribute).toStrictEqual({
      duration: 10,
      icon: 'walk-small',
      text: 'minutes of walking time before departure:',
    });
  });

  it('should returns correct arrival time attribute', () => {
    const { arrivalTimeAttribute } = getDepartureArrivalTimeAttribute(
      defaultTrip.legs as Leg[],
      0,
      10,
      'en',
    );

    expect(arrivalTimeAttribute).toStrictEqual({
      duration: 10,
      icon: 'walk-small',
      text: 'minutes of walking time after arrival:',
    });
  });

  it('should returns extended departure time attribute', () => {
    const { departureTimeAttribute } = getDepartureArrivalTimeAttribute(
      extendedEnterTimeTrip.legs as Leg[],
      0,
      0,
      'en',
    );

    expect(departureTimeAttribute).toStrictEqual({
      duration: 45,
      icon: 'sa-ci',
      text: 'Extended boarding time ',
    });
  });

  it('should returns extended departure time attribute and add departureWalk', () => {
    const { departureTimeAttribute } = getDepartureArrivalTimeAttribute(
      extendedEnterTimeTrip.legs as Leg[],
      20,
      0,
      'en',
    );

    expect(departureTimeAttribute).toStrictEqual({
      duration: 65,
      icon: 'sa-ci',
      text: 'Extended boarding time ',
    });
  });
});
