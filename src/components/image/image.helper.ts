export interface InterfaceImageAttributes {
  copyrightHolder?: 'Organization' | 'Person';
  decoding?: 'sync' | 'async' | 'auto';
  importance?: 'auto' | 'high' | 'low';
  loading?: 'eager' | 'lazy';
  aspectRatio?:
    | 'free'
    | '1-1'
    | '1-2'
    | '2-1'
    | '2-3'
    | '3-2'
    | '3-4'
    | '4-3'
    | '4-5'
    | '5-4'
    | '9-16'
    | '16-9';
  pictureSizesConfig?: InterfaceImageAttributesSizesConfig;
}

export interface InterfaceImageAttributesSizesConfig {
  breakpoints: InterfaceImageAttributesSizesConfigBreakpoint[];
}

export interface InterfaceImageAttributesSizesConfigBreakpoint {
  image: {
    height: number;
    width: number;
  };
  mediaQueries: InterfaceImageAttributesSizesConfigMediaQuery[];
}

export interface InterfaceImageAttributesSizesConfigMediaQuery {
  conditionFeature: string;
  conditionFeatureValue: {
    lyneDesignToken: boolean;
    value: string;
  };
  conditionOperator: false;
}

/**
 * we check the structure of the data manually, so it's safe to use `any` as return type
 */
export default (jsonString: string): InterfaceImageAttributesSizesConfigBreakpoint[] => {
  if (!jsonString || jsonString.length === 0) {
    return [];
  }

  // make sure that we have `breakpoints` key in object
  const logWarning = import.meta.env.DEV
    ? () =>
        console.warn(
          'sbb-image error: attribute breakpoints has wrong data format. Reference the documentation to see how you should format the data for this attribute.',
        )
    : null;
  let jsonObject: InterfaceImageAttributesSizesConfig;

  try {
    jsonObject = JSON.parse(jsonString);
  } catch (error) {
    logWarning?.();
    return [];
  }

  if (!jsonObject.breakpoints || jsonObject.breakpoints.length === 0) {
    logWarning?.();
    return [];
  }

  // make sure we get an array of breakpoints
  if (!Array.isArray(jsonObject.breakpoints)) {
    logWarning?.();
    return [];
  }

  /**
   * 1. make sure that each entry within the breakpoints object contains only allowed keys
   * 2. make sure that all necessary keys are present
   */
  let wrongKeyDetected = false;
  let missingKeyDetected = false;

  const allowedKeys = ['image', 'mediaQueries'];

  jsonObject.breakpoints.forEach((breakpoint) => {
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
    logWarning?.();
    return [];
  }

  return jsonObject.breakpoints;
};
