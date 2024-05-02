import {
  SbbBreakpointLargeMin,
  SbbBreakpointMediumMin,
  SbbBreakpointMicroMin,
  SbbBreakpointSmallMin,
  SbbBreakpointUltraMin,
  SbbBreakpointWideMin,
} from '@sbb-esta/lyne-design-tokens';
import { setViewport } from '@web/test-runner-commands';

const viewportSizes = {
  zero: 320,
  micro: SbbBreakpointMicroMin,
  small: SbbBreakpointSmallMin,
  medium: SbbBreakpointMediumMin,
  large: SbbBreakpointLargeMin,
  wide: SbbBreakpointWideMin,
  ultra: SbbBreakpointUltraMin,
};

export function describeViewports(fn: (this: Mocha.Suite) => void, viewportHeight = 400): void {
  for (const [size, value] of Object.entries(viewportSizes)) {
    describe(`viewport=${size}`, function () {
      before(async () => {
        await setViewport({ width: value, height: viewportHeight });
      });

      fn.call(this);
    });
  }
}
