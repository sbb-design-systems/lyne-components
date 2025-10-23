import {
  SbbBreakpointLargeMin,
  SbbBreakpointSmallMin,
  SbbBreakpointUltraMin,
} from '@sbb-esta/lyne-design-tokens';

const viewportSizes = {
  zero: 320,
  small: SbbBreakpointSmallMin,
  large: SbbBreakpointLargeMin,
  ultra: SbbBreakpointUltraMin,
} as const;

export interface DescribeViewportOptions {
  viewports?: (keyof typeof viewportSizes)[];
  viewportHeight?: number;
}

export function describeViewports(
  options: DescribeViewportOptions,
  fn: (this: Mocha.Suite) => void,
): void;
export function describeViewports(fn: (this: Mocha.Suite) => void): void;
export function describeViewports(
  optionsOrFn: DescribeViewportOptions | ((this: Mocha.Suite) => void),
  fn?: (this: Mocha.Suite) => void,
): void {
  const options = typeof optionsOrFn === 'object' ? optionsOrFn : {};
  fn ??= optionsOrFn as (this: Mocha.Suite) => void;
  let viewportSizeTests = Object.entries(viewportSizes);
  if (options.viewports?.length) {
    viewportSizeTests = viewportSizeTests.filter(([key, _value]) =>
      options.viewports?.includes(key as keyof typeof viewportSizes),
    );
  }

  for (const [size, value] of viewportSizeTests) {
    describe(`viewport=${size}`, function () {
      this.ctx['requestViewport'] = { width: value, height: options.viewportHeight ?? 2500 };
      fn.call(this);
    });
  }
}
