/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-tooltip DOM"] = 
`<div>
  <button
    aria-describedby=""
    id="trigger"
  >
    Button
  </button>
  <sbb-tooltip
    data-position="block-end"
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

snapshots["sbb-tooltip A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "generic",
      "name": ""
    }
  ]
}
</p>
`;
/* end snapshot sbb-tooltip A11y tree Chrome */

