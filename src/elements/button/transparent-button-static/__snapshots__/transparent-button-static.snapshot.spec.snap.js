/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-transparent-button-static renders without icon DOM"] = 
`<sbb-transparent-button-static
  disabled=""
  negative=""
  size="m"
>
  Label Text
</sbb-transparent-button-static>
`;
/* end snapshot sbb-transparent-button-static renders without icon DOM */

snapshots["sbb-transparent-button-static renders without icon Shadow DOM"] = 
`<span class="sbb-action-base sbb-transparent-button-static">
  <slot name="icon">
  </slot>
  <span class="sbb-button__label">
    <slot>
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-transparent-button-static renders without icon Shadow DOM */

snapshots["sbb-transparent-button-static renders with slotted icon DOM"] = 
`<sbb-transparent-button-static size="l">
  <sbb-icon
    name="chevron-small-left-small"
    slot="icon"
  >
  </sbb-icon>
  Label Text
</sbb-transparent-button-static>
`;
/* end snapshot sbb-transparent-button-static renders with slotted icon DOM */

snapshots["sbb-transparent-button-static renders with slotted icon Shadow DOM"] = 
`<span class="sbb-action-base sbb-transparent-button-static">
  <slot name="icon">
  </slot>
  <span class="sbb-button__label">
    <slot>
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-transparent-button-static renders with slotted icon Shadow DOM */

snapshots["sbb-transparent-button-static renders with slotted icon A11y tree Chrome"] = 
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
/* end snapshot sbb-transparent-button-static renders with slotted icon A11y tree Chrome */

