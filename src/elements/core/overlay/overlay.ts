import type { TemplateResult } from 'lit';
import { html } from 'lit';

/**
 * Used to create the "wrapping" effect around the anchor for overlays (es. autocomplete)
 * Works in conjunction with the 'overlayGapFixCorners()' function in 'overlay.ts'
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

declare global {
  interface GlobalEventHandlersEventMap {
    willOpen: CustomEvent<void>;
    willClose: CustomEvent<void>;
    didOpen: CustomEvent<void>;
    didClose: CustomEvent<void>;
  }
}
