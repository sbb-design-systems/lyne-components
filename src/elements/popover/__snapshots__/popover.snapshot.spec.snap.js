/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-popover renders DOM"] = 
`<sbb-popover
  id="sbb-popover-1"
  popover="manual"
>
</sbb-popover>
`;
/* end snapshot sbb-popover renders DOM */

snapshots["sbb-popover renders Shadow DOM"] = 
`<div class="sbb-popover__container">
  <div
    class="sbb-popover"
    role="tooltip"
  >
    <div class="sbb-popover__content">
      <sbb-secondary-button
        aria-label="Close note"
        icon-name="cross-small"
        sbb-popover-close=""
        size="s"
        tabindex="0"
        type="button"
      >
      </sbb-secondary-button>
      <span class="sbb-popover__scrollable-content">
        <slot>
          No content
        </slot>
      </span>
    </div>
  </div>
</div>
`;
/* end snapshot sbb-popover renders Shadow DOM */

snapshots["sbb-popover renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "ignored": true,
      "role": "none",
      "children": [
        {
          "ignored": true,
          "role": "none",
          "children": [
            {
              "ignored": true,
              "role": "none"
            }
          ]
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-popover renders A11y tree Chrome */

