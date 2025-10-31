/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-secondary-button-static renders without icon DOM"] = 
`<sbb-secondary-button-static
  disabled=""
  negative=""
  size="m"
>
  Label Text
</sbb-secondary-button-static>
`;
/* end snapshot sbb-secondary-button-static renders without icon DOM */

snapshots["sbb-secondary-button-static renders without icon Shadow DOM"] = 
`<span class="sbb-action-base sbb-secondary-button-static">
  <slot name="icon">
  </slot>
  <span class="sbb-button__label">
    <slot>
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-secondary-button-static renders without icon Shadow DOM */

snapshots["sbb-secondary-button-static renders with slotted icon DOM"] = 
`<sbb-secondary-button-static size="l">
  <sbb-icon
    name="chevron-small-left-small"
    slot="icon"
  >
  </sbb-icon>
  Label Text
</sbb-secondary-button-static>
`;
/* end snapshot sbb-secondary-button-static renders with slotted icon DOM */

snapshots["sbb-secondary-button-static renders with slotted icon Shadow DOM"] = 
`<span class="sbb-action-base sbb-secondary-button-static">
  <slot name="icon">
  </slot>
  <span class="sbb-button__label">
    <slot>
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-secondary-button-static renders with slotted icon Shadow DOM */

snapshots["sbb-secondary-button-static renders with slotted icon A11y tree Chrome"] = 
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
/* end snapshot sbb-secondary-button-static renders with slotted icon A11y tree Chrome */

snapshots["sbb-secondary-button-static renders with slotted icon A11y tree Firefox"] = 
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
/* end snapshot sbb-secondary-button-static renders with slotted icon A11y tree Firefox */

