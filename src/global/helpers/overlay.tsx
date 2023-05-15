import { h, JSX } from '@stencil/core';

export type SbbOverlayState = 'closed' | 'opening' | 'opened' | 'closing';

export function overlayGapFixCorners(): JSX.Element {
  return [
    <div class="sbb-gap-fix-wrapper">
      <div class="sbb-gap-fix-corner" id="left"></div>
    </div>,
    <div class="sbb-gap-fix-wrapper">
      <div class="sbb-gap-fix-corner" id="right"></div>
    </div>,
  ];
}
