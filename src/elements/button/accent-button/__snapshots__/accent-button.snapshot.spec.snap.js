/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-accent-button renders a sbb-accent-button without icon DOM"] = 
`<sbb-accent-button
  disabled=""
  form="formid"
  name="name"
  negative=""
  size="m"
  type="button"
  value="value"
>
  Label Text
</sbb-accent-button>
`;
/* end snapshot sbb-accent-button renders a sbb-accent-button without icon DOM */

snapshots["sbb-accent-button renders a sbb-accent-button without icon Shadow DOM"] = 
`<span class="sbb-accent-button sbb-action-base">
  <slot name="icon">
  </slot>
  <span class="sbb-button__label">
    <slot>
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-accent-button renders a sbb-accent-button without icon Shadow DOM */

snapshots["sbb-accent-button renders a sbb-accent-button with slotted icon DOM"] = 
`<sbb-accent-button
  size="l"
  tabindex="0"
>
  <sbb-icon
    name="chevron-small-left-small"
    slot="icon"
  >
  </sbb-icon>
  Label Text
</sbb-accent-button>
`;
/* end snapshot sbb-accent-button renders a sbb-accent-button with slotted icon DOM */

snapshots["sbb-accent-button renders a sbb-accent-button with slotted icon Shadow DOM"] = 
`<span class="sbb-accent-button sbb-action-base">
  <slot name="icon">
  </slot>
  <span class="sbb-button__label">
    <slot>
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-accent-button renders a sbb-accent-button with slotted icon Shadow DOM */

snapshots["sbb-accent-button renders a sbb-accent-button with slotted icon A11y tree Chrome"] = 
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
/* end snapshot sbb-accent-button renders a sbb-accent-button with slotted icon A11y tree Chrome */

