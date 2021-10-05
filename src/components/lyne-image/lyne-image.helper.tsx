/**
 * we check the structure of the data manually, so it's save to use `any`
 * as return type
 */
export default (jsonString: string): any => {

  if (!jsonString || jsonString.length === 0) {
    return [];
  }

  // make sure that we have `breakpoints` key in object
  const errorMessage = 'lyne-image error: attribute breakpoints has wrong data format. Reference the documentation to see how you should format the data for this attribute.';
  const jsonObject = JSON.parse(jsonString);
  const jsonObjectKeys = Object.keys(jsonObject);

  if (!jsonObjectKeys.includes('breakpoints')) {
    console.warn(errorMessage);

    return [];
  }

  // make sure we get an array of breakpoints
  const {
    breakpoints
  } = jsonObject;

  if (!Array.isArray(breakpoints)) {
    console.warn(errorMessage);

    return [];
  }

  /**
   * 1. make sure that each entry within the breakpoints object
   * contains only allowed keys
   * 2. make sure that all necessary keys are present
   */
  let wrongKeyDetected = false;
  let missingKeyDetected = false;

  const allowedKeys = [
    'image',
    'mediaQueries'
  ];

  breakpoints.forEach((breakpoint) => {
    const breakpointKeys = Object.keys(breakpoint);

    breakpointKeys.forEach((breakpointKey) => {
      if (!allowedKeys.includes(breakpointKey)) {
        wrongKeyDetected = true;
      }
    });

    allowedKeys.forEach((allowedKey) => {
      if (!breakpointKeys.includes(allowedKey)) {
        missingKeyDetected = true;
      }
    });

  });

  if (wrongKeyDetected || missingKeyDetected) {
    console.warn(errorMessage);

    return [];
  }

  // make sure there are at least 1 breakpoint
  if (breakpoints.length < 1) {
    console.warn(errorMessage);

    return [];
  }

  return breakpoints as any;
};
