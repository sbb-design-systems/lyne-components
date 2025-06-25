/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-transparent-button-static renders without icon DOM"] = 
`<sbb-transparent-button-static
  data-action=""
  data-sbb-button=""
  data-slot-names="unnamed"
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
`<sbb-transparent-button-static
  data-action=""
  data-sbb-button=""
  data-slot-names="icon unnamed"
  size="l"
>
  <sbb-icon
    data-namespace="default"
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
/* end snapshot sbb-transparent-button-static renders with slotted icon A11y tree Chrome */

snapshots["sbb-transparent-button-static renders with slotted icon A11y tree Firefox"] = 
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
/* end snapshot sbb-transparent-button-static renders with slotted icon A11y tree Firefox */

