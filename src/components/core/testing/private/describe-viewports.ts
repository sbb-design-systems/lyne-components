import {
  SbbBreakpointLargeMax,
  SbbBreakpointMediumMax,
  SbbBreakpointMicroMax,
  SbbBreakpointSmallMax,
  SbbBreakpointUltraMax,
  SbbBreakpointWideMax,
  SbbBreakpointZeroMax,
} from '@sbb-esta/lyne-design-tokens';
import { setViewport } from '@web/test-runner-commands';

const viewportSizes = {
  zero: SbbBreakpointZeroMax,
  micro: SbbBreakpointMicroMax,
  small: SbbBreakpointSmallMax,
  medium: SbbBreakpointMediumMax,
  large: SbbBreakpointLargeMax,
  wide: SbbBreakpointWideMax,
  ultra: SbbBreakpointUltraMax,
};

export function describeViewports(fn: (this: Mocha.Suite) => void): void {
  for (const [size, value] of Object.entries(viewportSizes)) {
    describe(`viewport=${size}`, function () {
      before(async () => {
        await setViewport({ width: value, height: 400 });
      });

      fn.call(this);
    });
  }
}
