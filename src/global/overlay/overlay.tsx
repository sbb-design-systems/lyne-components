import { TemplateResult, html } from 'lit';

export type SbbOverlayState = 'closed' | 'opening' | 'opened' | 'closing';

/**
 * Used to create the "wrapping" effect around the anchor for overlays (es. autocomplete)
 * Works in conjunction with the 'overlayGapFixCorners()' function in 'overlay.tsx'
 */
export function overlayGapFixCorners(): TemplateResult {
  return html`
    <div class="sbb-gap-fix-wrapper">
      <div class="sbb-gap-fix-corner" id="left"></div>
    </div>
    <div class="sbb-gap-fix-wrapper">
      <div class="sbb-gap-fix-corner" id="right"></div>
    </div>
  `;
}
