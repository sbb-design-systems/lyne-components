import { h, JSX } from '@stencil/core';

export type SbbOverlayState = 'closed' | 'opening' | 'opened' | 'closing';

export function overlayGapFixCorners(): JSX.Element {
  return [
    <div class="gap-fix-wrapper">
      <div class="gap-fix-corner" id="left"></div>
    </div>,
    <div class="gap-fix-wrapper">
      <div class="gap-fix-corner" id="right"></div>
    </div>,
  ];
}
