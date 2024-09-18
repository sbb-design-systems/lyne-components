/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-tertiary-button renders a sbb-tertiary-button without icon DOM"] = 
`<sbb-tertiary-button
  aria-disabled="true"
  data-action=""
  data-button=""
  data-sbb-button=""
  data-slot-names="unnamed"
  disabled=""
  form="formid"
  name="name"
  negative=""
  role="button"
  size="m"
  tabindex="0"
  type="button"
  value="value"
>
  Label Text
</sbb-tertiary-button>
`;
/* end snapshot sbb-tertiary-button renders a sbb-tertiary-button without icon DOM */

snapshots["sbb-tertiary-button renders a sbb-tertiary-button without icon Shadow DOM"] = 
`<span class="sbb-action-base sbb-tertiary-button">
  <slot name="icon">
  </slot>
  <span class="sbb-button__label">
    <slot>
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-tertiary-button renders a sbb-tertiary-button without icon Shadow DOM */

snapshots["sbb-tertiary-button renders a sbb-tertiary-button with slotted icon DOM"] = 
`<sbb-tertiary-button
  data-action=""
  data-button=""
  data-sbb-button=""
  data-slot-names="icon unnamed"
  role="button"
  size="l"
  tabindex="0"
>
  <sbb-icon
    aria-hidden="true"
    data-namespace="default"
    name="chevron-small-left-small"
    role="img"
    slot="icon"
  >
  </sbb-icon>
  Label Text
</sbb-tertiary-button>
`;
/* end snapshot sbb-tertiary-button renders a sbb-tertiary-button with slotted icon DOM */

snapshots["sbb-tertiary-button renders a sbb-tertiary-button with slotted icon Shadow DOM"] = 
`<span class="sbb-action-base sbb-tertiary-button">
  <slot name="icon">
  </slot>
  <span class="sbb-button__label">
    <slot>
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-tertiary-button renders a sbb-tertiary-button with slotted icon Shadow DOM */

snapshots["sbb-tertiary-button renders a sbb-tertiary-button with slotted icon A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Label Text"
    }
  ]
}
</p>
`;
/* end snapshot sbb-tertiary-button renders a sbb-tertiary-button with slotted icon A11y tree Chrome */

snapshots["sbb-tertiary-button renders a sbb-tertiary-button with slotted icon A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Label Text"
    }
  ]
}
</p>
`;
/* end snapshot sbb-tertiary-button renders a sbb-tertiary-button with slotted icon A11y tree Firefox */

