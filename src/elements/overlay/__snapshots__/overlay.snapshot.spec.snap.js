/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-overlay renders DOM"] = 
`<sbb-overlay
  id="sbb-overlay-0"
  popover="manual"
>
</sbb-overlay>
`;
/* end snapshot sbb-overlay renders DOM */

snapshots["sbb-overlay renders Shadow DOM"] = 
`<div class="sbb-overlay__container">
  <div class="sbb-overlay">
    <div class="sbb-overlay__wrapper">
      <div class="sbb-overlay__header">
        <sbb-secondary-button
          aria-label="Close secondary window"
          class="sbb-overlay__close"
          icon-name="cross-small"
          sbb-overlay-close=""
          size="m"
          tabindex="0"
          type="button"
        >
        </sbb-secondary-button>
      </div>
      <div class="sbb-overlay__content">
        <sbb-container
          class="sbb-overlay__content-container"
          color="transparent"
        >
          <slot>
          </slot>
        </sbb-container>
      </div>
    </div>
  </div>
</div>
<sbb-screen-reader-only aria-live="polite">
</sbb-screen-reader-only>
`;
/* end snapshot sbb-overlay renders Shadow DOM */

snapshots["sbb-overlay renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "group",
      "name": ""
    }
  ]
}
</p>
`;
/* end snapshot sbb-overlay renders A11y tree Chrome */

