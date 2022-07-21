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
