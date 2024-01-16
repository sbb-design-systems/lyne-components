/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-dialog renders"] = 
`<div class="sbb-dialog__container">
  <div
    class="sbb-dialog"
    id="sbb-dialog-0"
  >
    <div class="sbb-dialog__wrapper">
      <div class="sbb-dialog__header">
        <sbb-title
          aria-level="1"
          class="sbb-dialog__title"
          id="title"
          level="1"
          role="heading"
          visual-level="3"
        >
          <slot name="title">
          </slot>
        </sbb-title>
        <sbb-button
          aria-label="Close secondary window"
          class="sbb-dialog__close"
          dir="ltr"
          icon-name="cross-small"
          role="button"
          sbb-dialog-close=""
          size="m"
          tabindex="0"
          type="button"
          variant="secondary"
        >
        </sbb-button>
      </div>
      <div class="sbb-dialog__content">
        <slot>
        </slot>
      </div>
      <div class="sbb-dialog__footer">
        <slot name="action-group">
        </slot>
      </div>
    </div>
  </div>
</div>
<span
  aria-live="polite"
  class="sbb-screen-reader-only"
>
</span>
`;
/* end snapshot sbb-dialog renders */

