/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-dialog-close-button renders DOM"] = 
`<sbb-dialog-close-button
  size="s"
  tabindex="0"
>
</sbb-dialog-close-button>
`;
/* end snapshot sbb-dialog-close-button renders DOM */

snapshots["sbb-dialog-close-button renders Shadow DOM"] = 
`<span class="sbb-action-base sbb-dialog-close-button">
  <slot name="icon">
    <sbb-icon name="cross-small">
    </sbb-icon>
  </slot>
</span>
`;
/* end snapshot sbb-dialog-close-button renders Shadow DOM */

snapshots["sbb-dialog-close-button renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "button",
      "name": "Close secondary window",
      "invalid": false,
      "focusable": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-dialog-close-button renders A11y tree Chrome */

