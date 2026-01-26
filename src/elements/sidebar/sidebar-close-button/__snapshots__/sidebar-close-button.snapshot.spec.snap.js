/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-sidebar-close-button renders DOM"] = 
`<sbb-sidebar-close-button
  size="s"
  slot="title-section"
  tabindex="0"
>
</sbb-sidebar-close-button>
`;
/* end snapshot sbb-sidebar-close-button renders DOM */

snapshots["sbb-sidebar-close-button renders Shadow DOM"] = 
`<span class="sbb-action-base sbb-sidebar-close-button">
  <slot name="icon">
    <sbb-icon name="cross-small">
    </sbb-icon>
  </slot>
</span>
`;
/* end snapshot sbb-sidebar-close-button renders Shadow DOM */

snapshots["sbb-sidebar-close-button renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "button",
      "name": "Close sidebar",
      "invalid": false,
      "focusable": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-sidebar-close-button renders A11y tree Chrome */

