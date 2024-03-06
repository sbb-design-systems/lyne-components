/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["Dom"] = 
`<sbb-button-static
  data-slot-names="unnamed"
  dir="ltr"
  disabled=""
  negative=""
  size="m"
>
  Label Text
</sbb-button-static>
`;
/* end snapshot Dom */

snapshots["ShadowDom"] = 
`<span class="sbb-action-base sbb-button-static">
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

snapshots["sbb-button-static renders a sbb-button-static with slotted icon Dom"] = 
`<sbb-button-static
  data-slot-names="icon unnamed"
  dir="ltr"
  size="l"
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
</sbb-button-static>
`;
/* end snapshot sbb-button-static renders a sbb-button-static with slotted icon Dom */

snapshots["sbb-button-static renders a sbb-button-static with slotted icon ShadowDom"] = 
`<span class="sbb-action-base sbb-button-static">
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
/* end snapshot sbb-button-static renders a sbb-button-static with slotted icon ShadowDom */

snapshots["sbb-button-static A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-button-static A11y tree Chrome */

snapshots["sbb-button-static A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": ""
}
</p>
`;
/* end snapshot sbb-button-static A11y tree Firefox */

snapshots["sbb-button-static A11y tree Safari"] = 
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-button-static A11y tree Safari */

snapshots["sbb-button-static renders a sbb-button-static with slotted icon A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "Label Text"
    }
  ]
}
</p>
`;
/* end snapshot sbb-button-static renders a sbb-button-static with slotted icon A11y tree Chrome */

snapshots["sbb-button-static renders a sbb-button-static with slotted icon A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "text leaf",
      "name": "Label Text "
    }
  ]
}
</p>
`;
/* end snapshot sbb-button-static renders a sbb-button-static with slotted icon A11y tree Firefox */

snapshots["sbb-button-static renders a sbb-button-static with slotted icon A11y tree Safari"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "Label Text"
    }
  ]
}
</p>
`;
/* end snapshot sbb-button-static renders a sbb-button-static with slotted icon A11y tree Safari */

