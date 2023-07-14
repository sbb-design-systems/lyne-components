import { h, JSX } from '@stencil/core';

export type SbbOverlayState = 'closed' | 'opening' | 'opened' | 'closing';

/**
 * Used to create the "wrapping" effect around the anchor for overlays (es. autocomplete)
 * Works in conjuction with the 'overlayGapFixCorners()' function in 'overlay.tsx'
 */
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
