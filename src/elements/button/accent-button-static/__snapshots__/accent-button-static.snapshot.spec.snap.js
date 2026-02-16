/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-accent-button-static renders without icon DOM"] = 
`<sbb-accent-button-static
  disabled=""
  negative=""
  size="m"
>
  Label Text
</sbb-accent-button-static>
`;
/* end snapshot sbb-accent-button-static renders without icon DOM */

snapshots["sbb-accent-button-static renders without icon Shadow DOM"] = 
`<span class="sbb-accent-button-static sbb-action-base">
  <slot name="icon">
  </slot>
  <span class="sbb-button__label">
    <slot>
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-accent-button-static renders without icon Shadow DOM */

snapshots["sbb-accent-button-static renders with slotted icon DOM"] = 
`<sbb-accent-button-static size="l">
  <sbb-icon
    name="chevron-small-left-small"
    slot="icon"
  >
  </sbb-icon>
  Label Text
</sbb-accent-button-static>
`;
/* end snapshot sbb-accent-button-static renders with slotted icon DOM */

snapshots["sbb-accent-button-static renders with slotted icon Shadow DOM"] = 
`<span class="sbb-accent-button-static sbb-action-base">
  <slot name="icon">
  </slot>
  <span class="sbb-button__label">
    <slot>
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-accent-button-static renders with slotted icon Shadow DOM */

snapshots["sbb-accent-button-static renders with slotted icon A11y tree Chrome"] = 
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
        },
        {
          "ignored": true,
          "role": "none",
          "children": [
            {
              "role": "StaticText",
              "name": "Label Text"
            }
          ]
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-accent-button-static renders with slotted icon A11y tree Chrome */

