/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-icon-sidebar-button renders DOM"] = 
`<sbb-icon-sidebar-button
  aria-label="Go to the party"
  icon-name="glass-cocktail-small"
  tabindex="0"
>
</sbb-icon-sidebar-button>
`;
/* end snapshot sbb-icon-sidebar-button renders DOM */

snapshots["sbb-icon-sidebar-button renders Shadow DOM"] = 
`<span class="sbb-action-base sbb-icon-sidebar-button">
  <slot name="icon">
    <sbb-icon name="glass-cocktail-small">
    </sbb-icon>
  </slot>
</span>
`;
/* end snapshot sbb-icon-sidebar-button renders Shadow DOM */

snapshots["sbb-icon-sidebar-button renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "button",
      "name": "Go to the party",
      "invalid": false,
      "focusable": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-icon-sidebar-button renders A11y tree Chrome */

