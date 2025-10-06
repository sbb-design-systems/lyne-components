/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-tooltip DOM"] = 
`<div>
  <button
    aria-describedby="sbb-tooltip-1"
    id="trigger"
  >
    Button
  </button>
  <sbb-tooltip
    data-position="block-end span-inline-end"
    data-state="opened"
    id="sbb-tooltip-1"
    popover="manual"
    trigger="trigger"
  >
    Tooltip
  </sbb-tooltip>
</div>
`;
/* end snapshot sbb-tooltip DOM */

snapshots["sbb-tooltip Shadow DOM"] = 
`<div class="sbb-tooltip">
  <slot>
  </slot>
</div>
`;
/* end snapshot sbb-tooltip Shadow DOM */

snapshots["sbb-tooltip A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Button",
      "description": "Tooltip"
    },
    {
      "role": "text leaf",
      "name": "Tooltip"
    }
  ]
}
</p>
`;
/* end snapshot sbb-tooltip A11y tree Firefox */

snapshots["sbb-tooltip A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Button",
      "description": "Tooltip"
    },
    {
      "role": "text",
      "name": "Tooltip"
    }
  ]
}
</p>
`;
/* end snapshot sbb-tooltip A11y tree Chrome */

