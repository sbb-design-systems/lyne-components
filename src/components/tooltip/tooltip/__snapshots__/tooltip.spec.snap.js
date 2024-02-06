/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-tooltip renders"] = 
`<div class="sbb-tooltip__container">
  <div
    class="sbb-tooltip"
    role="tooltip"
  >
    <div class="sbb-tooltip__content">
      <span class="sbb-tooltip__close">
        <sbb-button
          aria-label="Close note"
          dir="ltr"
          icon-name="cross-small"
          role="button"
          sbb-tooltip-close=""
          size="m"
          tabindex="0"
          type="button"
          variant="secondary"
        >
        </sbb-button>
      </span>
      <span>
        <slot>
          No content
        </slot>
      </span>
    </div>
  </div>
</div>
`;
/* end snapshot sbb-tooltip renders */

