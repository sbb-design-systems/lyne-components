/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["Dom"] = 
`<sbb-secondary-button
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
</sbb-secondary-button>
`;
/* end snapshot Dom */

snapshots["ShadowDom"] = 
`<span class="sbb-action-base sbb-secondary-button">
  <span class="sbb-button__icon">
    <slot name="icon">
    </slot>
  </span>
  <span class="sbb-button__label">
    <slot>
    </slot>
  </span>
</span>
`;
/* end snapshot ShadowDom */

snapshots["sbb-secondary-button renders a sbb-secondary-button with slotted icon Dom"] = 
`<sbb-secondary-button
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
</sbb-secondary-button>
`;
/* end snapshot sbb-secondary-button renders a sbb-secondary-button with slotted icon Dom */

snapshots["sbb-secondary-button renders a sbb-secondary-button with slotted icon ShadowDom"] = 
`<span class="sbb-action-base sbb-secondary-button">
  <span class="sbb-button__icon">
    <slot name="icon">
    </slot>
  </span>
  <span class="sbb-button__label">
    <slot>
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-secondary-button renders a sbb-secondary-button with slotted icon ShadowDom */

snapshots["sbb-secondary-button A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-secondary-button A11y tree Chrome */

snapshots["sbb-secondary-button A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": ""
}
</p>
`;
/* end snapshot sbb-secondary-button A11y tree Firefox */

snapshots["sbb-secondary-button A11y tree Safari"] = 
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-secondary-button A11y tree Safari */

snapshots["sbb-secondary-button renders a sbb-secondary-button with slotted icon A11y tree Chrome"] = 
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
/* end snapshot sbb-secondary-button renders a sbb-secondary-button with slotted icon A11y tree Chrome */

snapshots["sbb-secondary-button renders a sbb-secondary-button with slotted icon A11y tree Firefox"] = 
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
/* end snapshot sbb-secondary-button renders a sbb-secondary-button with slotted icon A11y tree Firefox */

snapshots["sbb-secondary-button renders a sbb-secondary-button with slotted icon A11y tree Safari"] = 
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
/* end snapshot sbb-secondary-button renders a sbb-secondary-button with slotted icon A11y tree Safari */

