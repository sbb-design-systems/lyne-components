/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-icon-sidebar-link renders DOM"] = 
`<sbb-icon-sidebar-link
  accessibility-label="Go to the party"
  href="https://www.sbb.ch"
  icon-name="glass-cocktail-small"
>
</sbb-icon-sidebar-link>
`;
/* end snapshot sbb-icon-sidebar-link renders DOM */

snapshots["sbb-icon-sidebar-link renders Shadow DOM"] = 
`<a
  aria-label="Go to the party"
  class="sbb-action-base sbb-icon-sidebar-link"
  href="https://www.sbb.ch"
>
  <slot name="icon">
    <sbb-icon name="glass-cocktail-small">
    </sbb-icon>
  </slot>
</a>
`;
/* end snapshot sbb-icon-sidebar-link renders Shadow DOM */

snapshots["sbb-icon-sidebar-link renders A11y tree Chrome"] = 
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
/* end snapshot sbb-icon-sidebar-link renders A11y tree Chrome */

