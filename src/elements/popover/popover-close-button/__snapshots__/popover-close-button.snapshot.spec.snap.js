/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-popover-close-button renders DOM"] = 
`<sbb-popover-close-button
  size="s"
  slot="close-button"
  tabindex="0"
>
</sbb-popover-close-button>
`;
/* end snapshot sbb-popover-close-button renders DOM */

snapshots["sbb-popover-close-button renders Shadow DOM"] = 
`<span class="sbb-action-base sbb-popover-close-button">
  <slot name="icon">
    <sbb-icon name="cross-small">
    </sbb-icon>
  </slot>
</span>
`;
/* end snapshot sbb-popover-close-button renders Shadow DOM */

snapshots["sbb-popover-close-button renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "button",
      "name": "Close note",
      "invalid": false,
      "focusable": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-popover-close-button renders A11y tree Chrome */

