/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-icon-sidebar-link renders DOM"] = 
`<sbb-icon-sidebar-link
  accessibility-label="Go to the party"
  data-action=""
  data-link=""
  href="https://www.sbb.ch"
  icon-name="glass-cocktail-small"
>
</sbb-icon-sidebar-link>
`;
/* end snapshot sbb-icon-sidebar-link renders DOM */

snapshots["sbb-icon-sidebar-link renders Shadow DOM"] = 
`<slot name="icon">
  <sbb-icon
    aria-hidden="true"
    data-namespace="default"
    name="glass-cocktail-small"
    role="img"
  >
  </sbb-icon>
</slot>
`;
/* end snapshot sbb-icon-sidebar-link renders Shadow DOM */

snapshots["sbb-icon-sidebar-link renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-icon-sidebar-link renders A11y tree Chrome */

snapshots["sbb-icon-sidebar-link renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": ""
}
</p>
`;
/* end snapshot sbb-icon-sidebar-link renders A11y tree Firefox */

