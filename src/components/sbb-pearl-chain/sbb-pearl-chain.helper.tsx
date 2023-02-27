// eslint-disable-next-line @typescript-eslint/naming-convention
export const isRideLeg = (leg: any): leg is Extract<any, { __typename: 'PTRideLeg' }> => {
  if (leg?.__typename === 'PTRideLeg') return true;
  return false;
};
