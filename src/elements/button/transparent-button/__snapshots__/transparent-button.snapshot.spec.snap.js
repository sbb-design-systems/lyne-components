/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-transparent-button renders a sbb-transparent-button without icon DOM"] = 
`<sbb-transparent-button
  disabled=""
  form="formid"
  name="name"
  negative=""
  size="m"
  type="button"
  value="value"
>
  Label Text
</sbb-transparent-button>
`;
/* end snapshot sbb-transparent-button renders a sbb-transparent-button without icon DOM */

snapshots["sbb-transparent-button renders a sbb-transparent-button without icon Shadow DOM"] = 
`<span class="sbb-action-base sbb-transparent-button">
  <slot name="icon">
  </slot>
  <span class="sbb-button__label">
    <slot>
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-transparent-button renders a sbb-transparent-button without icon Shadow DOM */

snapshots["sbb-transparent-button renders a sbb-transparent-button with slotted icon DOM"] = 
`<sbb-transparent-button
  size="l"
  tabindex="0"
>
  <sbb-icon
    name="chevron-small-left-small"
    slot="icon"
  >
  </sbb-icon>
  Label Text
</sbb-transparent-button>
`;
/* end snapshot sbb-transparent-button renders a sbb-transparent-button with slotted icon DOM */

snapshots["sbb-transparent-button renders a sbb-transparent-button with slotted icon Shadow DOM"] = 
`<span class="sbb-action-base sbb-transparent-button">
  <slot name="icon">
  </slot>
  <span class="sbb-button__label">
    <slot>
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-transparent-button renders a sbb-transparent-button with slotted icon Shadow DOM */

snapshots["sbb-transparent-button renders a sbb-transparent-button with slotted icon A11y tree Chrome"] = 
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
/* end snapshot sbb-transparent-button renders a sbb-transparent-button with slotted icon A11y tree Chrome */

