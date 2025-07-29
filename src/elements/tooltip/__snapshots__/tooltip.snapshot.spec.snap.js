/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Button"
    }
  ]
}
</p>
`;
/* end snapshot A11y tree Firefox */

snapshots["A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Button"
    }
  ]
}
</p>
`;
/* end snapshot A11y tree Chrome */

snapshots["sbb-tooltip DOM"] = 
`<div>
  <button id="trigger">
    Button
  </button>
  <sbb-tooltip
    data-state="closed"
    id="sbb-tooltip-1"
    popover="manual"
    trigger="trigger"
  >
    Tooltip
  </sbb-tooltip>
</div>
`;
/* end snapshot sbb-tooltip DOM */

snapshots["sbb-tooltip A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Button"
    }
  ]
}
</p>
`;
/* end snapshot sbb-tooltip A11y tree Chrome */

snapshots["sbb-tooltip A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Button"
    }
  ]
}
</p>
`;
/* end snapshot sbb-tooltip A11y tree Firefox */

snapshots["sbb-tooltip Shadow DOM"] = 
`<div class="sbb-tooltip__container">
  <div
    class="sbb-tooltip"
    role="tooltip"
  >
    <slot>
    </slot>
  </div>
</div>
`;
/* end snapshot sbb-tooltip Shadow DOM */

