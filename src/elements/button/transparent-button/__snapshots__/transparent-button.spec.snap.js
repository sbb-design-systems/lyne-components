/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-transparent-button renders a sbb-transparent-button without icon Dom"] = 
`<sbb-transparent-button
  aria-disabled="true"
  data-action=""
  data-button=""
  data-sbb-button=""
  data-slot-names="unnamed"
  dir="ltr"
  disabled=""
  form="formid"
  name="name"
  negative=""
  role="button"
  size="m"
  type="button"
  value="value"
>
  Label Text
</sbb-transparent-button>
`;
/* end snapshot sbb-transparent-button renders a sbb-transparent-button without icon Dom */

snapshots["sbb-transparent-button renders a sbb-transparent-button without icon ShadowDom"] = 
`<span class="sbb-action-base sbb-transparent-button">
  <slot name="icon">
  </slot>
  <span class="sbb-button__label">
    <slot>
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-transparent-button renders a sbb-transparent-button without icon ShadowDom */

snapshots["sbb-transparent-button renders a sbb-transparent-button with slotted icon Dom"] = 
`<sbb-transparent-button
  data-action=""
  data-button=""
  data-sbb-button=""
  data-slot-names="icon unnamed"
  dir="ltr"
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
</sbb-transparent-button>
`;
/* end snapshot sbb-transparent-button renders a sbb-transparent-button with slotted icon Dom */

snapshots["sbb-transparent-button renders a sbb-transparent-button with slotted icon ShadowDom"] = 
`<span class="sbb-action-base sbb-transparent-button">
  <slot name="icon">
  </slot>
  <span class="sbb-button__label">
    <slot>
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-transparent-button renders a sbb-transparent-button with slotted icon ShadowDom */

snapshots["sbb-transparent-button renders a sbb-transparent-button with slotted icon A11y tree Chrome"] = 
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
/* end snapshot sbb-transparent-button renders a sbb-transparent-button with slotted icon A11y tree Chrome */

snapshots["sbb-transparent-button renders a sbb-transparent-button with slotted icon A11y tree Firefox"] = 
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
/* end snapshot sbb-transparent-button renders a sbb-transparent-button with slotted icon A11y tree Firefox */

