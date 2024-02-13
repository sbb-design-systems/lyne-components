/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-tooltip-trigger renders"] = 
`<span class="sbb-tooltip-trigger">
  <slot>
    <sbb-icon
      aria-hidden="true"
      data-namespace="default"
      name="circle-information-small"
      role="img"
    >
    </sbb-icon>
  </slot>
</span>
`;
/* end snapshot sbb-tooltip-trigger renders */

snapshots["sbb-tooltip-trigger renders with custom content"] = 
`<span class="sbb-tooltip-trigger">
  <slot>
    <sbb-icon
      aria-hidden="true"
      data-namespace="default"
      name="circle-information-small"
      role="img"
    >
    </sbb-icon>
  </slot>
</span>
`;
/* end snapshot sbb-tooltip-trigger renders with custom content */

snapshots["sbb-tooltip-trigger A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": ""
    }
  ]
}
</p>
`;
/* end snapshot sbb-tooltip-trigger A11y tree Chrome */

snapshots["sbb-tooltip-trigger A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": ""
    }
  ]
}
</p>
`;
/* end snapshot sbb-tooltip-trigger A11y tree Firefox */

snapshots["sbb-tooltip-trigger A11y tree Safari"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": ""
    }
  ]
}
</p>
`;
/* end snapshot sbb-tooltip-trigger A11y tree Safari */

