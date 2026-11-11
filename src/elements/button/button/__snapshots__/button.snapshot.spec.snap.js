/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-button renders a sbb-button without icon DOM"] = 
`<sbb-button
  disabled=""
  form="formid"
  name="name"
  negative=""
  size="m"
  type="button"
  value="value"
>
  Label Text
</sbb-button>
`;
/* end snapshot sbb-button renders a sbb-button without icon DOM */

snapshots["sbb-button renders a sbb-button without icon Shadow DOM"] = 
`<span class="sbb-action-base sbb-button">
  <slot name="icon">
  </slot>
  <span class="sbb-button__label">
    <slot>
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-button renders a sbb-button without icon Shadow DOM */

snapshots["sbb-button renders a sbb-button with slotted icon DOM"] = 
`<sbb-button tabindex="0">
  <sbb-icon
    name="chevron-small-left-small"
    slot="icon"
  >
  </sbb-icon>
  Label Text
</sbb-button>
`;
/* end snapshot sbb-button renders a sbb-button with slotted icon DOM */

snapshots["sbb-button renders a sbb-button with slotted icon Shadow DOM"] = 
`<span class="sbb-action-base sbb-button">
  <slot name="icon">
  </slot>
  <span class="sbb-button__label">
    <slot>
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-button renders a sbb-button with slotted icon Shadow DOM */

snapshots["sbb-button renders a sbb-button with slotted icon A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "button",
      "name": "Label Text",
      "invalid": false,
      "focusable": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-button renders a sbb-button with slotted icon A11y tree Chrome */

