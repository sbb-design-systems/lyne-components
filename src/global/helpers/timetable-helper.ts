/* eslint-disable @typescript-eslint/naming-convention */

import { Leg } from '../interfaces/timetable-properties';

export const isRideLeg = (leg: any): leg is Extract<Leg, { __typename: 'PTRideLeg' }> => {
  return leg?.__typename === 'PTRideLeg';
};

export const isConnectionLeg = (
  leg: any
): leg is Extract<Leg, { __typename: 'PTConnectionLeg' }> => {
  return leg?.__typename === 'PTConnectionLeg';
};
