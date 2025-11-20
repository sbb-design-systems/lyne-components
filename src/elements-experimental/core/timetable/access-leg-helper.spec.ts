import { expect } from '@open-wc/testing';

import {
  connectionTrip,
  defaultTrip,
  extendedEnterTimeTrip,
} from '../../timetable-row/timetable-row.sample-data.private.ts';

import { getDepartureArrivalTimeAttribute } from './access-leg-helper.ts';
import type { Leg } from './timetable-properties.ts';

describe('getDepartureArrivalTimeAttribute', () => {
  it('should returns correct departure time attribute', () => {
    const { departureTimeAttribute } = getDepartureArrivalTimeAttribute(
      defaultTrip.legs as Leg[],
      10,
      0,
      'en',
    );

    expect(departureTimeAttribute).to.be.deep.equal({
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

    expect(arrivalTimeAttribute).to.be.deep.equal({
      duration: 10,
      icon: 'walk-small',
      text: 'minutes of walking time after arrival:',
    });
  });

  it('should return correct a11y time attributes', () => {
    const { departureTimeAttribute, arrivalTimeAttribute } = getDepartureArrivalTimeAttribute(
      defaultTrip.legs as Leg[],
      10,
      10,
      'en',
      true,
    );

    expect(departureTimeAttribute).to.be.deep.equal({
      duration: 10,
      icon: 'wheelchair-small',
      text: 'minutes of walking time before departure:',
    });
    expect(arrivalTimeAttribute).to.be.deep.equal({
      duration: 10,
      icon: 'wheelchair-small',
      text: 'minutes of walking time after arrival:',
    });
  });

  it('should return correct time attribute for connection-leg', () => {
    const { departureTimeAttribute } = getDepartureArrivalTimeAttribute(
      connectionTrip.legs as Leg[],
      10,
      0,
      'en',
      true,
    );

    expect(departureTimeAttribute).to.be.deep.equal({
      duration: 30,
      icon: 'walk-small',
      text: 'Zu Fuss',
    });
  });

  it('should returns extended departure time attribute', () => {
    const { departureTimeAttribute } = getDepartureArrivalTimeAttribute(
      extendedEnterTimeTrip.legs as Leg[],
      0,
      0,
      'en',
    );

    expect(departureTimeAttribute).to.be.deep.equal({
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

    expect(departureTimeAttribute).to.be.deep.equal({
      duration: 65,
      icon: 'sa-ci',
      text: 'Extended boarding time ',
    });
  });

  it('should return correct a11y time attribute with extended departure time', () => {
    const { departureTimeAttribute } = getDepartureArrivalTimeAttribute(
      extendedEnterTimeTrip.legs as Leg[],
      0,
      0,
      'en',
      true,
    );

    expect(departureTimeAttribute).to.be.deep.equal({
      duration: 45,
      icon: 'wheelchair-small',
      text: 'minutes of walking time before departure:',
    });
  });
});
