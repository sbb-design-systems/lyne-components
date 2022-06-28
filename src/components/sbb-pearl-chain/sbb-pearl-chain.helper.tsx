/**
 * we check the structure of the data manually, so it's save to use `any`
 * as return type
 */
export default (jsonString: string): any => {
  if (!jsonString || jsonString.length === 0) {
    return [];
  }

  // make sure that we have `leg` key in object
  const errorMessage =
    'sbb-pearl-chain error: attribute legs has wrong data format. Reference the documentation to see how you should format the data for this attribute.';
  const jsonObject = JSON.parse(jsonString);
  const jsonObjectKeys = Object.keys(jsonObject);

  if (!jsonObjectKeys.includes('legs')) {
    console.warn(errorMessage);

    return [];
  }

  // make sure we get an array of legs
  const { legs } = jsonObject;

  if (!Array.isArray(legs)) {
    console.warn(errorMessage);

    return [];
  }

  /**
   * 1. make sure that legs objects only contain allowed key
   * 2. make sure that legs object contains key `duration`
   * 3. make sure that sum of durations equals to 100
   */
  let wrongKeyDetected = false;
  let durationIsMissing = false;
  let sum = 0;
  const allowedKeys = ['cancellation', 'duration'];

  legs.forEach((leg) => {
    const legKeys = Object.keys(leg);

    legKeys.forEach((legKey) => {
      if (allowedKeys.indexOf(legKey) === -1) {
        wrongKeyDetected = true;
      }
    });

    if (legKeys.indexOf('duration') === -1) {
      durationIsMissing = true;
    } else {
      sum += leg['duration'];
    }
  });

  if (wrongKeyDetected || durationIsMissing) {
    console.warn(errorMessage);

    return [];
  }

  // make sure there are at least 1 leg
  if (legs.length < 1) {
    console.warn(errorMessage);

    return [];
  }

  if (sum !== 100) {
    console.warn('sbb-pearl-chain error: the sum of all durations should be equal to 100.');

    return [];
  }

  return legs as any;
};
